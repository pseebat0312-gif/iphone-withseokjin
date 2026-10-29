// The public account mistake follows the piano and next-morning conversation.
export function installCommentFlow(nodes){
 for(const c of nodes['intro-days'].choices)c.next=['a-music'];
 for(const c of nodes['a-next-morning'].choices)c.next=['spark'];
 for(const c of nodes.spark.choices)c.next=['a-comment-care'];
 const followup=nodes['r-invite'].messages;
 nodes['a-comment-care']={id:'a-comment-care',act:2,line:'A',actor:'jin',app:'kkt',messages:followup.slice(0,3),choices:[{id:'continue',label:'好，我知道了',next:['r-invite'],effects:{commentComforted:true},reply:[]}],requires:[],events:[],key:true};
 nodes['r-invite'].messages=followup.slice(3);
 // Identification and deletion arrive first; reassurance follows the player's reaction.
 nodes.spark.messages=nodes.spark.messages.slice(0,2);
}
export function repairCommentFlow(story){
 if(!story||story.commentFlowRevision===70)return story;
 if(!story.done.includes('spark')&&!story.delivered.includes('spark')&&!story.flags.pianoHeard&&story.queue?.includes('spark'))story.queue=story.queue.map(id=>id==='spark'?'a-music':id);
 if(story.commentResumeNode&&story.done.includes(story.commentResumeNode))delete story.commentResumeNode;
 story.commentFlowRevision=70;return story;
}
