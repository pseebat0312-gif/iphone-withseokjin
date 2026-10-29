import test from 'node:test';import assert from 'node:assert/strict';
import {CINEMA_TERRACE_V62 as data,installCinemaTerraceV62,migrateCinemaTerraceV62} from '../src/scripted/cinema-terrace-v62.mjs';
import {LONG_CHAPTERS,QUIET_PAGES,TAE_PAGES,JK_TERRACE,JIN_TERRACE} from '../src/scripted/long-scenes.mjs';
import {NODES} from '../src/scripted/story-data.mjs';import {installContinuity} from '../src/scripted/continuity-data.mjs';
import {applyEditorialV50} from '../src/scripted/editorial-v50.mjs';import {AUTHORED_TRUTH} from '../src/scripted/truth-authored.mjs';import fs from 'node:fs';
installContinuity();
function setup(){const chapters=structuredClone(LONG_CHAPTERS);for(const[key,rows]of Object.entries({studio:QUIET_PAGES.studio,jkTerrace:JK_TERRACE,taehyung:TAE_PAGES,jinTerrace:JIN_TERRACE}))chapters[key]={music:key==='studio'?'astronaut':'taehyung',pages:rows.map(([title,...lines])=>({title,lines,place:key,options:null}))};const nodes=structuredClone(NODES);applyEditorialV50(nodes,chapters,JSON.parse(fs.readFileSync('src/editorial-v50.json')),AUTHORED_TRUTH);return {nodes,chapters}}
test('all four chapters replace whole page arrays, preserving retained media and score',()=>{
 const {nodes,chapters}=setup(),before=structuredClone(chapters);installCinemaTerraceV62(nodes,chapters);
 assert.deepEqual(Object.fromEntries(Object.keys(data.pages).map(k=>[k,chapters[k].pages.length])),{studio:8,jkTerrace:9,taehyung:10,jinTerrace:10});
 for(const[key,rows]of Object.entries(data.pages)){assert.equal(chapters[key].music,before[key].music);rows.forEach(([old,title,...lines],i)=>{const p=chapters[key].pages[i];assert.equal(p.title,title);assert.deepEqual(p.lines,lines);assert.equal(p.place,before[key].pages[old].place);assert.ok(p.lines.length>0)});}
 for(const[id,lines]of Object.entries(data.nodes))assert.deepEqual(nodes[id].messages,lines);
 for(const[id,cs]of Object.entries(data.choices)){assert.deepEqual(nodes[id].choices.map(c=>c.id),Object.keys(cs));for(const c of nodes[id].choices)assert.ok(c.next.length);}
 assert.equal(nodes['r-movie'].choices[0].reply[1],'“是你主动让我牵的哦”');assert.equal(nodes['r-party'].messages.length,2);assert.equal(nodes['r-alone'].messages.length,1);
 const text=JSON.stringify(chapters);installCinemaTerraceV62(nodes,chapters);assert.equal(JSON.stringify(chapters),text);
});
test('active old saves shift only retained chapter pages once, preserving all unrelated progress',()=>{
 for(const key of Object.keys(data.pages))for(let index=0;index<12;index++){
 const story={flags:{couple:true},channels:{jin:[{text:'keep'}]},sceneChapter:{key,index,furthest:11,readingPart:4,choices:{0:'a',11:'b'},undo:{0:{x:1},11:{x:2}}}};
 migrateCinemaTerraceV62(story);assert.ok(story.sceneChapter.index<data.pages[key].length);assert.ok(story.sceneChapter.furthest<data.pages[key].length);assert.equal(story.sceneChapter.readingPart,0);assert.equal(story.channels.jin[0].text,'keep');assert.equal(story.flags.couple,true);const snapshot=JSON.stringify(story);migrateCinemaTerraceV62(story);assert.equal(JSON.stringify(story),snapshot);
 }
 const story={sceneChapter:{key:'confession',index:14,readingPart:2}};migrateCinemaTerraceV62(story);assert.equal(story.sceneChapter.index,14);assert.equal(story.sceneChapter.readingPart,2);
});
