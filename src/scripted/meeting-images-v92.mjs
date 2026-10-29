export const INTRO_IMAGES92=[1,2,3,4,5,6].map(i=>'/assets/story/intro-live-v92-'+i+'.jpg');
export const CAFE_IMAGE92='/assets/story/cafe-live-v92.jpg';
export function installMeetingImages92(scenes,chapters){
 // Keep Tae's entrance image. Reveal the new photos at Jin's first appearance.
 const intro=chapters.intro;
 if(intro)intro.pages.forEach((p,i)=>{if(i===0)return;const id='intro92-'+i,base=scenes[p.place]||scenes.intro;scenes[id]={...base,image:INTRO_IMAGES92[Math.min(5,Math.floor((i-1)*6/(intro.pages.length-1)))]};p.place=id;});
 // The added cafe portrait is the third unique photo, held across five chapters.
 // Preserve the old third cafe photo afterward and all exterior confession photos.
 const cafe=chapters.confession;
 if(cafe)for(let i=0;i<Math.min(10,cafe.pages.length);i++){
  const p=cafe.pages[i],id='cafe92-'+i,base=scenes[p.place]||scenes.cafe;
  const image=i<2?SCENE_IMAGE_POOLS.firstCafe[0]:i<4?SCENE_IMAGE_POOLS.firstCafe[1]:i<9?CAFE_IMAGE92:SCENE_IMAGE_POOLS.firstCafe[2];
  scenes[id]={...base,image};p.place=id;
 }
}
