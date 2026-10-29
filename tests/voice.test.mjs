import test from 'node:test';
import assert from 'node:assert/strict';
import {api} from '../src/server.mjs';
test('removed voice endpoints cannot generate audio or charge a configured TTS account',async()=>{const old=globalThis.fetch;let called=false;globalThis.fetch=async()=>{called=true;throw Error('must not call')};try{for(const path of ['/api/voice','/api/voice/config']){const r=await api(new Request('https://phone.test'+path,{method:path.endsWith('config')?'GET':'POST'}),{TTS_API_KEY:'test'});assert.equal(r.status,404);assert.match((await r.json()).error,/移除/)}assert.equal(called,false)}finally{globalThis.fetch=old}});
