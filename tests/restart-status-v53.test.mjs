import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
import {storyProgressState,createStory} from '../src/scripted/story-engine.mjs';
const ui=fs.readFileSync('src/scripted/story-ui.js','utf8'),hybrid=fs.readFileSync('src/scripted/hybrid-ui.js','utf8');
const guide=ui.slice(ui.indexOf('function decorateScriptDestination()'),ui.indexOf('function queueSocialReactionPreset'));
test('real app guide and desktop never infer completion from an empty live node',()=>{
 for(const page of ['setting:help','instagram','mentions','notes','home'])for(const status of ['setup','ready','active','complete']){
  const story=status==='setup'?null:{started:status!=='ready',queue:[],events:[],delivered:status==='complete'?['ending']:[],checkpoint:status==='complete'?{id:'ending'}:null};
  const els={};function element(){return {dataset:{},textContent:'',removeAttribute(){},querySelector(){return null},remove(){delete els['#script-guide']}}}
  const ctx={campaign:story,page,storyProgressState:s=>storyProgressState(s,{ending:{checkpoint:true}}),liveNode:()=>null,$:sel=>els[sel]||null,screen:{append(el){els['#'+el.id]=el}},document:{createElement:element},scriptSave(){},scriptDestination:()=>'',NODES:{}};
  vm.runInNewContext(guide,ctx);ctx.decorateScriptDestination();
  if(status!=='setup'&&page!=='home')assert.equal(els['#script-guide'].textContent.includes('主线已完成'),status==='complete',page+status);
  if(page==='home'){ctx.renderScriptLauncher();assert.equal(els['#story-launcher'].textContent.includes('情侣日常'),status==='complete')}
 }
});
test('completion requires a valid delivered ending and not an unstarted profile',()=>{const s=createStory('introduced');s.queue=[];assert.equal(storyProgressState(s),'active');s.checkpoint={id:'fake'};assert.equal(storyProgressState(s),'active');s.started=false;assert.equal(storyProgressState(s),'ready');assert.equal(storyProgressState(null),'setup')});
function storage(entries){const values=new Map(entries);return {values,clear(){values.clear()},getItem(k){return values.get(k)||null},setItem(k,v){values.set(k,v)}}}
test('confirmed restart clears all persisted local and session data and prevents old-state saves before reload',()=>{
 const local=storage(['withyou-phone-scripted-v1','withyou-v2','withyou-preset-story-v1','withyou-previous-story','withyou-ui-preferences-v1'].map(k=>[k,'old data'])),session=storage([['withyou-deepseek','old'],['withyou-gemini','old']]);let reloaded=0,aborted=0,shown='';
 const ctx={localResetting:false,campaign:{old:true},state:{uploads:['photo'],threads:{posts:['post']}},hybridAbort:new Map([['jin',{abort(){aborted++}}]]),hybridBusy:new Set(['jin']),hybridErrors:{},hybridDrafts:{},localStorage:local,sessionStorage:session,stopSceneAudio(){},stopCamera(){},defaultState:()=>({fresh:true}),location:{reload(){reloaded++}},modal(title,body){shown=body},toast(){throw Error('unexpected failure')}};
 const fn=hybrid.slice(hybrid.indexOf('function hybridRestart('),hybrid.indexOf('\nconst hybridOriginalActions'));
 vm.runInNewContext(fn,ctx);ctx.hybridRestart();assert.match(shown,/清空本站在当前浏览器的全部本地数据/);assert.equal(local.values.size,5);assert.equal(reloaded,0);
 ctx.hybridRestart(true);assert.equal(local.values.size,0);assert.equal(session.values.size,0);assert.equal(ctx.campaign,null);assert.equal(ctx.localResetting,true);assert.equal(aborted,1);assert.equal(reloaded,1);assert.deepEqual(ctx.state,{fresh:true});
 assert.match(ui,/if\(localResetting\)return;if\(campaign\)/);assert.match(fs.readFileSync('src/app.js','utf8'),/const save=\(\)=>\{if\(localResetting\)return false/);
});
test('another open tab reloads after a full clear instead of writing its old state back',()=>{let receive,reloads=0;const ctx={localResetting:false,location:{reload(){reloads++}},window:{addEventListener(type,handler){assert.equal(type,'storage');receive=handler}}};const app=fs.readFileSync('src/app.js','utf8');vm.runInNewContext(app.slice(app.lastIndexOf("window.addEventListener('storage'")),ctx);receive({key:'withyou-preset-story-v1'});assert.equal(reloads,0);receive({key:null});assert.equal(ctx.localResetting,true);assert.equal(reloads,1)});
