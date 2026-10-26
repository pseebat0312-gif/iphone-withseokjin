// Media-only revision. Dialogue text and player decisions are intentionally separate.
export const CAST_SCENE_IMAGES={v:'/assets/story/taehyung-scene.jpg',jk:'/assets/story/jungkook-scene.jpg',jinTerrace:'/assets/story/photo-07.jpg'};
export const SCENE_MUSIC={taehyung:'rainydays',jinTerrace:'astronaut',jkTerrace:'silence',intro:'silence',studio:'silence',exhibition:'silence',safe:'awake',home:'moon',cafeDate:'moon'};
export function scenePortraitFor(n){if(CAST_SCENE_IMAGES[n.actor])return CAST_SCENE_IMAGES[n.actor];if(n.actor==='jin'&&(n.scene==='riverside'||n.id==='r-jin-terrace'))return CAST_SCENE_IMAGES.jinTerrace;return null}
export function scoreForScene(n,key,fallback){if(key==='home'&&n.act<6&&!n.id?.startsWith('moment:'))return 'silence';return SCENE_MUSIC[key]||fallback}
