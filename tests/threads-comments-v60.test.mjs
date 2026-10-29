import {test} from 'node:test';
import assert from 'node:assert/strict';
import {THREADS_FIXED_NPCS,THREADS_COMMENT_RULES,applyFixedThreadsComments} from '../src/scripted/threads-npc.mjs';
import {visibleThreadsComments} from '../src/scripted/threads-metrics.mjs';
test('all 37 pools migrate, preserve player replies, randomize accounts and distinct likes',()=>{
 for(const def of THREADS_FIXED_NPCS){
 const p={...def,at:0,comments:[{author:'me',text:'keep'},{author:'old',text:'placeholder'}],growth:[{afterSeconds:0,likes:55,replies:80,reposts:2,shares:3}]};
 applyFixedThreadsComments(p);const rule=THREADS_COMMENT_RULES[def.number],pool=rule.echo?[def.text]:rule.pool;
 const comments=visibleThreadsComments(p,100000).filter(c=>c.author!=='me');
 assert.equal(visibleThreadsComments(p,100000).at(-1).text,'keep');
 assert.equal(comments.length,pool.length?(rule.finite?pool.length:80):0);
 for(const c of comments){assert.ok(pool.includes(c.text)||c.text===rule.first);assert.match(c.author,/^[a-z0-9]+$/);}
 assert.equal(new Set(comments.map(c=>c.likes)).size,comments.length);
 assert.equal(new Set(comments.map(c=>c.author)).size,comments.length);
 if(rule.finite)assert.deepEqual(new Set(comments.map(c=>c.text)),new Set(pool));
 if(rule.first)assert.equal(comments.filter(c=>c.text===rule.first).length,1);
 const before=JSON.stringify(p.comments);applyFixedThreadsComments(p);assert.equal(JSON.stringify(p.comments),before);
 }
});
test('different posts have different randomized pool ordering',()=>{
 const sequences=[2,22,27,28,31].map(n=>{const p={...THREADS_FIXED_NPCS[n-1],at:0,growth:[{afterSeconds:0,replies:40}]};applyFixedThreadsComments(p);return visibleThreadsComments(p,1000).map(c=>c.text)});
 for(const list of sequences) assert.ok(new Set(list).size>1);
});
