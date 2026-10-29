/* User supplied full revision: keep existing scene metadata and soundtrack. */
(()=>{
 const data=AUTHORED86;
 for(const key of ['home','ocean']){const chapter=LONG_CHAPTERS[key];if(chapter.pages.length!==data[key].length)throw Error('Authored chapter page mismatch: '+key);chapter.pages=chapter.pages.map((p,i)=>({...p,title:data[key][i].title,lines:data[key][i].lines,...(key==='ocean'?{options:data[key][i].options}: {})}));}
 // Retain the optional shoulder branch alongside the new authored hug invitation.
 LONG_CHAPTERS.ocean.pages[7].options=[['hug','走近，让他抱住'],['shoulder','先靠在他肩边，看一会儿海']];
 const previous=scenePageLines;
 scenePageLines=function(key,index,choices={}){
  if(!['home','ocean'].includes(key))return previous(key,index,choices);
  let lines=LONG_CHAPTERS[key].pages[index].lines;
  if(key==='ocean'){
   if(index===8&&choices.hug==='lean')lines=data.variants.lean;
   if(index===10&&['no','cheek'].includes(choices.kiss))lines=data.variants[choices.kiss];
   const echo=data.echo[choices[index-1]];if(echo)lines=[...echo,...lines];
  }
  return lines;
 };
 if(campaign&&campaign.authoredRevision!==86){const s=campaign.sceneChapter;if(s&&['home','ocean'].includes(s.key)){s.readingPart=0;s.readingPage=null;s.index=Math.min(s.index,LONG_CHAPTERS[s.key].pages.length-1);}campaign.authoredRevision=86;scriptSave();}
})();
