import test from 'node:test';import assert from 'node:assert/strict';
import {LONG_CHAPTERS,SCENE_CHOICE_ECHO} from '../src/scripted/long-scenes.mjs';
import {installConfessionV61,confessionLinesV61,CONFESSION_V61} from '../src/scripted/confession-v61.mjs';
test('all 20 authored pages, extra confession lines and deleted lines apply with existing media/options',()=>{
 const c=structuredClone(LONG_CHAPTERS),e=structuredClone(SCENE_CHOICE_ECHO),before=structuredClone(c.confession);installConfessionV61(c,e);
 assert.equal(c.confession.pages.length,20);c.confession.pages.forEach((p,i)=>{assert.deepEqual(p.lines,CONFESSION_V61.pages[i].slice(1));assert.equal(p.place,before.pages[i].place)});
 assert.equal(c.confession.pages[11].lines.length,5);assert.ok(c.confession.pages[11].lines.includes('“我…我喜欢你。你愿意和我交往吗？”'));
 assert.equal(c.confession.pages[6].lines.length,1);assert.equal(e.confession.inside.length,1);
 assert.equal(confessionLinesV61(c,e,14,{11:'accept'}).filter(t=>t.includes('命中注定')).length,1);
 assert.ok(!confessionLinesV61(c,e,14,{}).some(t=>t.includes('命中注定')));
 assert.ok(confessionLinesV61(c,e,18,{kiss:'cheek'})[1].includes('嘿嘿😈'));
 assert.ok(!confessionLinesV61(c,e,18,{kiss:'no'}).some(t=>t.includes('吻落')||t.includes('吻上')));
 assert.ok(!confessionLinesV61(c,e,16,{hug:'lean'}).some(t=>t.includes('双手绕过')));
});
