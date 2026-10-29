export const BACKGROUNDS69={intro:7308,earlyStore:7309,studio:7314,home:7311,cafeDate:7313,safe:7310,cafe:7315,street:7312};
export function installBackgrounds69(scenes,chapters){
 const missing=s=>!s?.image||/\.svg(?:$|\?)/.test(s.image);
 const photo=n=>'/assets/story/background-'+n+'-v69.jpg';
 // Only illustrative/empty backgrounds are eligible. Existing photos keep priority.
 for(const[key,c]of Object.entries(chapters)){
  const n=BACKGROUNDS69[key];if(!n)continue;
  c.pages.forEach((p,i)=>{const base=scenes[p.place||key];if(!missing(base))return;const id='background69-'+key+'-'+i;scenes[id]={...(base||scenes.home),image:photo(n)};p.place=id;});
 }
 for(const[key,n]of Object.entries(BACKGROUNDS69))if(scenes[key]&&missing(scenes[key]))scenes[key]={...scenes[key],image:photo(n)};
}
