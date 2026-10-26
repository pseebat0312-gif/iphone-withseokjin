// User-authored text is applied last, preserving exact punctuation and line breaks.
export function applyReviewedText(nodes,entries){
 for(const [id,text]of Object.entries(entries)){
  const p=id.split('/');let target,key;
  if(p[0]==='node'){
   const n=nodes[p[1]];if(!n)throw Error('Unknown reviewed node '+id);
   if(p[2]==='messages'){target=n.messages;key=Number(p[3]);}
   else if(p[2]==='occupation'){target=n.occupationMessages?.[p[3]];key=Number(p[4]);}
  }else if(p[0]==='choice'){
   const c=nodes[p[1]]?.choices.find(c=>c.id===p[2]);
   if(p[3]==='label'){target=c;key='label';}
   else if(p[3]==='reply'){target=c?.reply;key=Number(p[4]);}
  }
  if(!target||(!Object.hasOwn(target,key)&&!(Array.isArray(target)&&key===target.length)))throw Error('Invalid reviewed text path '+id);
  target[key]=text;
 }
}
