// One durable queue for the accidental-comment reveal; no independent banner timers.
export function queueCommentNotices(story){
 if(!story?.events?.some(e=>e.id==='r-comment')||story.commentNoticeRevision===70)return;
 const comment=story.outbox.find(n=>n.event==='r-comment'),chat=story.outbox.find(n=>n.id==='chat:spark');
 if(!comment||!chat)return;comment.title='金硕珍误用认证大号评论，随后删除';
 const trend={id:'comment-threads-discussion',app:'threads',node:'spark',event:'comment-threads-discussion',title:'Threads 正在热议',read:false};
 if(!story.events.some(e=>e.id===trend.event))story.events.push({id:trend.event,app:'threads',node:'spark',title:trend.title,text:'Threads 正在热议，点此查看',at:Date.now()});
 const existing=story.outbox.find(n=>n.id===trend.id)||trend;
 for(const n of [comment,chat,existing])n.commentSequence=true;
 const selected=new Set([comment.id,chat.id,existing.id]);
 story.outbox=[comment,existing,chat,...story.outbox.filter(n=>!selected.has(n.id))];story.commentNoticeRevision=70;
}
export function commentNoticesPending(story){return !!story?.outbox?.some(n=>n.commentSequence&&!n.sent)}
// KKT text is withheld, rather than merely hiding its notification.
export function deferCommentMessages71(story){
 if(!story||story.commentKktReleased71||story.done?.includes('spark'))return;
 if(story.outbox?.find(n=>n.id==='chat:spark')?.sent){story.commentKktReleased71=true;return;}
 const lines=(story.channels?.jin||[]).filter(m=>m.node==='spark'&&m.role==='assistant');
 if(lines.length){story.commentDeferred71=story.commentDeferred71||[];for(const m of lines)if(!story.commentDeferred71.some(x=>x.id===m.id))story.commentDeferred71.push(m);story.channels.jin=story.channels.jin.filter(m=>!lines.includes(m));}
}
export function releaseCommentMessages71(story){
 if(story.commentKktReleased71)return;
 story.commentKktReleased71=true;
 for(const m of story.commentDeferred71||[])if(!story.channels.jin.some(x=>x.id===m.id))story.channels.jin.push({...m,seq:++story.sequence,at:Date.now()});
 delete story.commentDeferred71;
}
