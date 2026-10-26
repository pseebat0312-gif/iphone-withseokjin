// Author-editable draft; unlocks follow the existing story, never wall-clock guesses.
export const THREADS_DRAFT=[
 {id:'th-welcome',node:null,author:'soyeon',name:'素妍',text:'刚把晚饭做成了两顿的量。明天的我最好懂得感恩😤',comments:[{author:'mimi',text:'明天的你：今天已经全吃完了'},{author:'soyeon',text:'你先别预言'}]},
 {id:'th-comment',node:'spark',author:'filmroom',name:'胶片房间',text:'等等，刚才那个评论是他本人发的？我刷新一下就没了',comments:[{author:'peach',text:'看到了，但是别去翻女生的账号吧'},{author:'night',text:'会不会只是回错人了？'}]},
 {id:'th-date',node:'r-date-invite',author:'soyeon',name:'素妍',text:'朋友最近一收到消息就低头笑。问她笑什么，她说没什么。行😏',comments:[{author:'mimi',text:'你问的时候她是不是笑得更厉害了'},{author:'soyeon',text:'对，她还不承认'}]},
 {id:'th-attention',node:'r-unknown',author:'filmroom',name:'胶片房间',text:'喜欢一个人，和给陌生女生打电话，是两回事吧。后者已经越界了',comments:[{author:'peach',text:'别转号码和照片了，真的'},{author:'night',text:'谁知道截图是不是完整的，先别下结论'}]},
 {id:'th-after',node:'r-resolution',author:'soyeon',name:'素妍',text:'今天终于一起吃了顿没被电话打断的饭。她把手机扣在桌上那一刻，我都松了口气',comments:[{author:'mimi',text:'下次带上我，我负责多点两道菜'}]}
];
export function threadsUnlocked(entry,story){return !entry.node||Boolean(story&&story.started!==false&&(story.delivered?.includes(entry.node)||story.done?.includes(entry.node)))}
