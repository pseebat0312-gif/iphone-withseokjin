import {terraceFinishedForThreads} from '../src/scripted/reading-music-v65.mjs';
import {confessionFinishedForThreads} from '../src/scripted/threads-data.mjs';
import {applyThreads003Revision} from '../src/scripted/content-edits-v59.mjs';
import {installCommentFlow} from '../src/scripted/comment-flow-v58.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {NODES} from '../src/scripted/story-data.mjs';
import {installContinuity} from '../src/scripted/continuity-data.mjs';
import {installPacing} from '../src/scripted/pacing-data.mjs';
import {createStory,deliverNode,choose,available,restoreStory} from '../src/scripted/story-engine.mjs';
import {THREADS_NPC_BATCHES,applyFixedThreadsComments} from '../src/scripted/threads-npc.mjs';
import * as metrics from '../src/scripted/threads-metrics.mjs';
installContinuity();installPacing(NODES);installCommentFlow(NODES);
test('both intro replies deliver the same mandatory IG comment immediately before piano, once',()=>{
 for(const side of [0,1]){
  const s=createStory('introduced');let order=[];
  for(let i=0;i<150;i++){
   const n=available(s)[0];if(!n||n.id==='r-arrive')break;
   deliverNode(s,n.id);order.push(n.id);
   choose(s,n.id,n.choices[Math.min(side,n.choices.length-1)].id);
  }
  assert.ok(order.indexOf('spark')>order.indexOf('intro-days'));
  assert.ok(order.indexOf('spark')<order.indexOf('r-piano'));
  assert.ok(order.includes('a-next-morning'));
  assert.equal(s.events.filter(e=>e.id==='r-comment').length,1);
  assert.equal(s.events.filter(e=>e.id==='r-deleted').length,1);
  assert.equal(order.filter(id=>id==='r-piano').length,1);
 }
});
test('legacy pending music is paused for immediate IG; missing IG before cafe is recovered without replaying piano',()=>{
 const original=createStory('introduced');delete original.commentFlowRevision;original.done=['intro-days'];original.delivered=['intro-days'];original.queue=['a-music'];
 assert.equal(available(restoreStory(JSON.stringify(original)))[0].id,'spark');
 original.queue=['r-invite'];original.flags.pianoHeard=true;const s=restoreStory(JSON.stringify(original));assert.equal(available(s)[0].id,'spark');deliverNode(s,'spark');choose(s,'spark',NODES.spark.choices[0].id);assert.equal(available(s)[0].id,'a-comment-care');deliverNode(s,'a-comment-care');choose(s,'a-comment-care','continue');assert.equal(available(s)[0].id,'r-invite');
});
function threadsRuntime(posts=[],batches=[]){
 let tick;const state={notifications:false,threads:{personalRevision:1,posts,drafts:[],notices:[],npcBatches:batches}};
 const context={...metrics,terraceFinishedForThreads,confessionFinishedForThreads,applyFixedThreadsComments,applyThreads003Revision,state,campaign:{events:[{id:'r-comment'}]},THREADS_NPC_BATCHES,CSS:{escape:s=>s},THREADS_DRAFT:[],threadsUnlocked:()=>false,threadsPublishable:()=>false,threadsFreePosting:()=>false,render(){},renderHome(){},syncScriptApps(){},save(){},page:'settings',setTimeout(){},setInterval(fn,ms){if(ms===2000)tick=fn},document:{addEventListener(){},querySelectorAll(){return []},querySelector(){return null}},$:()=>null};
 vm.runInNewContext(fs.readFileSync('src/scripted/threads-ui.js','utf8'),context);return {state,tick};
}
test('NPC batches recover after restart or partial loss, without duplicate posts or touching player text',()=>{
 const player=['001','002','003'].map(id=>({id:'player-'+id,sourceId:id,author:'me',text:'我的原文 '+id,at:1,comments:[],growth:[]}));
 const {state,tick}=threadsRuntime(player,['initial','001','comment','002','003']);
 for(const [key,texts]of Object.entries(THREADS_NPC_BATCHES)){
  assert.equal(state.threads.posts.filter(p=>p.id.startsWith('npc-'+key+'-')).length,texts.length);
  texts.forEach((text,i)=>assert.equal(state.threads.posts.find(p=>p.id==='npc-'+key+'-'+i).text,text));
 }
 const count=state.threads.posts.length;tick();assert.equal(state.threads.posts.length,count);
 state.threads.posts=state.threads.posts.filter(p=>p.id!=='npc-001-3');tick();assert.equal(state.threads.posts.length,count);
 assert.deepEqual(state.threads.posts.filter(p=>p.author==='me').map(p=>p.text),['我的原文 001','我的原文 002','我的原文 003']);
 for(const p of state.threads.posts.filter(p=>p.author!=='me'))for(const row of p.growth){assert.ok(row.likes>=10&&row.likes<=1000);assert.ok(row.likes>row.shares)}
 assert.ok(state.threads.notices.every(n=>state.threads.posts.find(p=>p.id===n.post)?.author==='me'));
});
test('copy changes use requested words and reset also clears batch generation state',()=>{
 assert.equal(NODES['a-snack'].choices[0].reply[0],'你好，那一份我留着。');
 assert.equal(NODES['a-life'].choices[1].label,'你先忙，出来再聊');
 assert.ok(!JSON.stringify(NODES).includes('糗事攒着'));
 assert.ok(!JSON.stringify(NODES).includes('那份我护着'));
 assert.match(fs.readFileSync('src/scripted/hybrid-ui.js','utf8'),/localStorage\.clear\(\);sessionStorage\.clear\(\)/);
});

test('save already past intro but midway through piano still receives the mandatory comment',()=>{
 const s=createStory('introduced');s.done=['intro-days'];s.delivered=['intro-days'];s.flags.pianoHeard=true;s.queue=['a-next-morning'];
 deliverNode(s,'a-next-morning');choose(s,'a-next-morning',NODES['a-next-morning'].choices[1].id);
 assert.equal(available(s)[0].id,'spark');deliverNode(s,'spark');choose(s,'spark',NODES.spark.choices[1].id);
 assert.equal(available(s)[0].id,'a-comment-care');deliverNode(s,'a-comment-care');choose(s,'a-comment-care','continue');assert.equal(available(s)[0].id,'r-invite');assert.equal(s.events.filter(e=>e.id==='r-comment').length,1);
});
