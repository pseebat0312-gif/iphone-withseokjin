import {SPEAKER_LINES93} from './speaker-data-v93.mjs';
// Media-only revision. Dialogue text and player decisions are intentionally separate.
export const CAST_SCENE_IMAGES={v:'/assets/story/taehyung-scene.jpg',jk:'/assets/story/jk-revised-4.jpg',jinTerrace:'/assets/story/jin-terrace-v65.png'};
export const SCENE_MUSIC={taehyung:'rainydays',jinTerrace:'rainydays',jkTerrace:'rainydays',intro:'foryou',studio:'astronaut',exhibition:'pluto',safe:'holdmetight',home:'loveisnotover',cafeDate:'moon'};
export function scenePortraitFor(n){if(n.scene?.startsWith('intro92-'))return null;if(n.id?.startsWith('long:jinTerrace:'))return CAST_SCENE_IMAGES.jinTerrace;if(CAST_SCENE_IMAGES[n.actor])return CAST_SCENE_IMAGES[n.actor];if(n.actor==='jin'&&(n.scene==='riverside'||n.id==='r-jin-terrace'))return CAST_SCENE_IMAGES.jinTerrace;return null}
export function scoreForScene(n,key,fallback){if(key==='earlyStore')return 'awake';if(key==='earlyRain')return 'rain';return SCENE_MUSIC[key]||fallback}
// Speaker identity is independent of scene ownership. Final authored scripts have reviewed line tags.
export function sceneSpeakerFor({chapter,index,fallback,text='',spoken=true,part,profile={}}){
 const norm=t=>String(t).replace(/[\s\p{P}]/gu,'');
 const rows=typeof SPEAKER_LINES93!=='undefined'?SPEAKER_LINES93[chapter]?.[index]:null;
 const same=row=>row&&(norm(row.text)===norm(text)||(row.text==='{{INTRO_NAME}}'&&/^“哥/.test(text)));
 if(rows){if(Number.isInteger(part)&&same(rows[part]))return rows[part].speaker;const matches=rows.filter(same);if(matches.length&&matches.every(r=>r.speaker===matches[0].speaker))return matches[0].speaker;}
 if(!spoken)return null;
 const owner=chapter==='taehyung'?'v':chapter==='jkTerrace'?'jk':chapter==='jinTerrace'?'jin':chapter==='exhibition'?'friend':fallback||'jin';
 // A remembered quotation is narration, not someone speaking in the present.
 if(/(?:想起|回想|回忆|脑海|那句|说过的)/u.test(text)&&!/^\s*[“「]/u.test(text))return null;
 const outside=text.replace(/[“「][^”」]*[”」]/gu,'');
 const action='(?:轻声|低声|笑着|小声|又|才|先|忽然|轻轻|认真地|转头|回头|低头|抬头|看着[^，。：“”]*|向[^，。：“”]*|对[^，。：“”]*|忍不住|随后|便|也|回答|应|开口|问道|说道|说|问|答|叫|喊|嘟囔|补充|接话|接着){1,}';
 const aliases={金硕珍:'jin',硕珍:'jin',金泰亨:'v',泰亨:'v',田柾国:'jk',柾国:'jk',书妍:'friend'};
 const explicit=outside.match(new RegExp('(金硕珍|硕珍|金泰亨|泰亨|田柾国|柾国|书妍)'+action,'u'));
 if(explicit)return aliases[explicit[1]];
 if(new RegExp('你'+action,'u').test(outside)&&/[说问答叫喊：]/u.test(outside))return 'me';
 // Neutral unquoted prose stays narration even if it happens to mention a character.
 if(!/^\s*[“「"]/u.test(text)&&!/(?:他|她).*(?:说|问|喊|叫|答|开口|笑道)/u.test(outside))return null;
 return owner;
}
