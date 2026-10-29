import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
test('old hint opt-out is cleared, no settings switch or guide-removal hook remains',()=>{
 const source=fs.readFileSync('src/scripted/pacing-ui.js','utf8');assert.ok(!source.includes('data-pacing-hints'));assert.ok(!source.includes("querySelector('#script-guide')?.remove()"));
 const migration=source.match(/if\(campaign\?\.hintsOff\)\{campaign.hintsOff=false;scriptSave\(\)\}/)[0];let saved=0;const c={campaign:{hintsOff:true},scriptSave(){saved++}};vm.runInNewContext(migration,c);assert.equal(c.campaign.hintsOff,false);assert.equal(saved,1);vm.runInNewContext(migration,c);assert.equal(saved,1);
});
