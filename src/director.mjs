// Shared validation for the narrative engine. All outputs describe a fictional game.
export function normalizeDirector(raw){
 const str=(x,n=500)=>typeof x==='string'?x.trim().slice(0,n):'';
 const source=typeof raw==='string'?JSON.parse(raw.trim().replace(/^```(?:json)?\s*/,'').replace(/\s*```$/,'')):raw;
 if(!source||typeof source!=='object')throw Error('剧情内容未完整返回');
 const messages=Array.isArray(source.messages)?source.messages.filter(x=>typeof x==='string'&&x.trim()).slice(0,8).map(x=>str(x,1000)):[];
 const comments=Array.isArray(source.comments)?source.comments.filter(x=>['peach','night','blue','paper','day'].includes(x.author)&&str(x.text)).slice(0,4).map(x=>({author:x.author,text:str(x.text,500),repost:Boolean(x.repost)})):[];
 const update=source.publicUpdate&&['instagram','weverse'].includes(source.publicUpdate.platform)&&str(source.publicUpdate.text)?{platform:source.publicUpdate.platform,text:str(source.publicUpdate.text,700)}:null;
 return {title:str(source.title,70),summary:str(source.summary,600),focus:str(source.focus,300),stage:['meeting','closer','confession','secret','happy'].includes(source.stage)?source.stage:null,evidence:str(source.evidence,150),mood:['daily','sweet','tense'].includes(source.mood)?source.mood:'daily',memories:Array.isArray(source.memories)?source.memories.filter(x=>typeof x==='string').slice(0,4).map(x=>str(x,150)):[],messages,comments,publicUpdate:update,sms:str(source.sms,300)};
}
export function acceptedStage(r,plan,userText,assistantText){
 const current=r.stage,next=plan.stage;if(!next||next===current)return current;
 if(/不愿意|不想交往|不喜欢你|不接受|别再表白|not ready|don't want|싫어/i.test(userText))return current;
 const index=['meeting','closer','confession','secret','happy'];if(next!=='secret'&&index.indexOf(next)!==index.indexOf(current)+1)return current;
 if(!plan.evidence||!userText.includes(plan.evidence))return current;
 if(next==='secret'){
  const proposal=/和你在一起|和我在一起|交往|做我.*朋友|做你.*朋友|我喜欢你|我爱你|love you|좋아해/.test(assistantText);
  const consent=/我愿意|我也喜欢你|我也爱你|我们在一起|答应.*交往|好啊|好呀|当然愿意|yes/i.test(userText);
  if(!proposal||!consent)return current;if(current!=='confession'&&!/交往|在一起|做我.*朋友|做你.*朋友/.test(assistantText))return current;
 }
 if(next==='happy'&&(!/一起|未来|一直|永远|forever/.test(userText)||r.eventCount<3))return current;
 return next;
}
