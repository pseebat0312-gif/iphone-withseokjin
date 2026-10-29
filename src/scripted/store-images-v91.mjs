// Scene-only original images; album catalogs are intentionally independent.
export const STORE_IMAGES91=[1,2,3,4,5].map(i=>'/assets/story/store-live-v91-'+i+'.jpg');
export function installStoreImages91(scenes,chapters){
 const chapter=chapters.earlyStore;if(!chapter)return;
 const base=scenes[chapter.pages[0]?.place]||scenes.earlyStore||scenes.home;
 const old=[...new Set(chapter.pages.map(p=>scenes[p.place]?.image).filter(Boolean))];
 const images=[...old,...STORE_IMAGES91];
 chapter.pages.forEach((p,i)=>{const id='store91-'+i;scenes[id]={...(scenes[p.place]||base),image:images[Math.min(images.length-1,Math.floor(i*images.length/chapter.pages.length))]};p.place=id;});
}
