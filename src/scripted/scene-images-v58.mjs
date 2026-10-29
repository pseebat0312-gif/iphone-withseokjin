export const SCENE_IMAGE_POOLS={rain:['/assets/story/rain-night-1.jpg','/assets/story/rain-night-2.jpg','/assets/story/rain-night-3.jpg'],firstCafe:['/assets/story/cafe-first-1.jpg','/assets/story/jin-album-8.jpg','/assets/story/cafe-first-3.jpg'],confession:['/assets/story/cafe-confession-1.jpg','/assets/story/cafe-confession-2.jpg']};
export function installSceneImages(scenes,chapters){
 for(const[key,c]of Object.entries(chapters))if(key==='earlyRain'||key==='confession')c.pages.forEach((p,index)=>{const group=key==='earlyRain'?'rain':index<10?'firstCafe':'confession',pool=SCENE_IMAGE_POOLS[group],id='scene58-'+key+'-'+index;scenes[id]={...(scenes[key==='earlyRain'?'earlyRain':index<10?'cafe':'street']||scenes.cafe),image:pool[key==='earlyRain'?Math.min(pool.length-1,Math.floor(index*pool.length/c.pages.length)):Math.min(pool.length-1,Math.floor((index>=10?index-10:index)*pool.length/(index>=10?c.pages.length-10:10)))]};p.place=id;});
 // Every other chapter holds each unique existing photo for one consecutive block.
 for(const[key,c]of Object.entries(chapters))if(!['earlyRain','confession'].includes(key)){
  const pool=[...new Set(c.pages.map(p=>scenes[p.place||key]?.image).filter(Boolean))];
  if(!pool.length)continue;
  c.pages.forEach((p,index)=>{const id='scene64-'+key+'-'+index;scenes[id]={...(scenes[key==='cafeDate'?'cafe':key]||scenes[p.place||key]||{}),image:pool[Math.min(pool.length-1,Math.floor(index*pool.length/c.pages.length))]};p.place=id;});
 }
 if(scenes.earlyRain)scenes.earlyRain.image=SCENE_IMAGE_POOLS.rain[0];if(scenes.cafe)scenes.cafe.image=SCENE_IMAGE_POOLS.firstCafe[0];if(scenes.street)scenes.street.image=SCENE_IMAGE_POOLS.confession[0];
}
