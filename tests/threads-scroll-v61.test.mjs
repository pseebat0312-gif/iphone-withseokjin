import {terraceFinishedForThreads} from '../src/scripted/reading-music-v65.mjs';
import {confessionFinishedForThreads} from '../src/scripted/threads-data.mjs';
import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
import * as metrics from '../src/scripted/threads-metrics.mjs';
import * as npc from '../src/scripted/threads-npc.mjs';
import {applyThreads003Revision} from '../src/scripted/content-edits-v59.mjs';
test('actual Threads renderer restores feed on back and resets only for new posts',()=>{
 let feed=null;const screen={querySelector:s=>s==='.threads-feed'?feed:null,querySelectorAll:()=>[],set innerHTML(html){feed={scrollTop:0}},get innerHTML(){return ''}};
 const c={...metrics,terraceFinishedForThreads,confessionFinishedForThreads,...npc,applyThreads003Revision,screen,phone:{dataset:{}},state:{notifications:false},campaign:null,THREADS_DRAFT:[],CSS:{escape:s=>s},threadsUnlocked:()=>false,threadsPublishable:()=>false,threadsFreePosting:()=>false,render(){},renderHome(){},syncScriptApps(){},save(){},page:'settings',setTimeout(){},setInterval(){},document:{addEventListener(){},querySelectorAll:()=>[],querySelector:()=>null},$:()=>null,styleStatus(){},escape:s=>s,icon:()=>'',applyAppearance(){},updateTime(){},afterRender(){}};
 const src=fs.readFileSync('src/scripted/threads-ui.js','utf8').replace('const oldRender=render;',"globalThis.h={renderThreads,syncThreads,db,show:(v,id='')=>{view=v;selected=id;renderThreads()}};const oldRender=render;");
 vm.runInNewContext(src,c);c.page='threads';c.h.show('home');feed.scrollTop=780;c.h.show('thread','npc-initial-0');assert.equal(feed.scrollTop,0);feed.scrollTop=120;c.h.show('home');assert.equal(feed.scrollTop,780);
 c.h.renderThreads();assert.equal(feed.scrollTop,780);c.h.syncThreads();assert.equal(feed.scrollTop,780);
 c.h.show('thread','npc-initial-0');c.h.db().posts.push({id:'new',author:'me',sourceId:'001',at:0,comments:[]});c.h.show('home');assert.equal(feed.scrollTop,0);
 feed.scrollTop=500;c.h.syncThreads();assert.equal(feed.scrollTop,0); // newly unlocked NPC batch
 feed.scrollTop=400;c.h.syncThreads();assert.equal(feed.scrollTop,400);
});
