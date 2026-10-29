// Additive pre-relationship story. Existing authored chat, IDs and media remain separate.
const chat=(id,messages,choices,extra={})=>({id,act:2,line:'A',actor:'jin',messages,choices:choices.map(([id,label,next,effects={},reply=[]])=>({id,label,next:[next],effects,reply})),events:[],requires:[],key:true,...extra});
export const PACING_NODES={
 'a-habit':chat('a-habit',['刚才把菜单发错群了','泰亨问我是不是要请所有人吃饭😤','我说不是，他问那是请谁','我现在暂时不想回他'],[['laugh','哈哈哈哈那你打算怎么回','a-snack',{menuJoke:true,humor:1},['说手机自己发的','它最近很有主意，老想找你ㅋㅋ']],['soft','那菜单先发我看看','a-snack',{menuSaved:true,trust:1},['发你了','你慢慢挑，我看你最后选哪个']]]),
 'a-snack':chat('a-snack',['今天提前收工了','本来约的店还没开，旁边便利店倒是亮着','我想买点东西垫一下，最后拿了两份','你要是在附近，来帮我消灭一份？'],[['meet','我过来，先别把我的也吃了','a-store',{snackMeet:true,active:1},['你好，那一份我留着。','到了走侧门，门口有台饮料机']],['later','今天走不开，给我留一张空盘照片吧😋','a-snack-away',{snackApart:true,personalLife:1},['那可能只剩包装袋了','下次换你挑，我保证不提前吃完']]]),
 'a-store':chat('a-store',['门口的冰柜轻轻响着。他拎着袋子，正低头研究两份长得一模一样的饭团。'],[['closer','下次还有这种临时饭局，记得叫我','a-recap',{storeClose:true,trust:2}],['quiet','吃完一起走到路口','a-recap',{storeQuiet:true,independent:1}]],{app:'scene',scene:'home',pacingChapter:'earlyStore'}),
 'a-snack-away':chat('a-snack-away',['空袋子，拍好了','还有一个很严肃的问题：我买的两份居然都是辣的','刚才结账的时候光顾着想你到底吃不吃辣了，结果拿反ㅋㅋ','你下次提醒我看包装，别光顾着笑'],[['remember','记住啦，下次我来挑','a-recap',{snackMemory:true},['好，挑饭团这件事交给你','我负责到场']],['joke','这位哥哥，你先把包装翻过来😤','a-recap',{wrapperJoke:true,humor:1},['现在翻了','下次见面我先递包装给你检查，满意再吃']]]),
 'a-recap':chat('a-recap',['忙完了？','我刚才又路过那台饮料机','想起你了，顺手拍了一张。拍完才发现把自己倒影也拍进去了ㅋㅋ'],[['photo','发来，我看看拍成什么样了','a-life',{askedReflection:true,active:1},['帽子歪得很明显','见面再给你看，省得你存下来笑一整年']],['reserved','那你这次有没有把菜单发错群','a-life',{menuCallback:true,humor:1},['没有，认真看了名字才发','你看，我也是会进步的']]]),
 'a-life':chat('a-life',['你今天是不是还有事要忙','我这边也得进棚一会儿，手机先交出去了','你忙完留一句给我，我出来看'],[['study','我去忙自己的，出来再聊','a-return',{ownSchedule:true,personalLife:2},['嗯，我收工来接着聊']],['care','你先忙，出来再聊','a-return',{savedFunnyStory:true,trust:1},['好，出来找你']]]),
 'a-return':chat('a-return',['手机回来了，我也回来了','刚才在里面想了个笑话，现在想不起来','但记得出来要找你','你那边结束了吗？'],[['walk','刚结束。想出去透口气','a-rain',{rainMeet:true,active:1},['那一起走一小段？我正好也要往外走']],['talk','还没有，先陪我说两句就行','a-night-chat',{respectSchedule:true,independent:1},['行，手机先放这儿','你不回的时候我也去做点自己的事']]]),
 'a-rain':chat('a-rain',['雨不大，屋檐把路灯的光截成两半。他站在干的那一边，朝你抬了抬伞。'],[['closer','一起走到下一个路口','a-night-chat',{sharedUmbrella:true,trust:2}],['quiet','雨停了，再一起走吧','a-night-chat',{waitedRain:true,trust:1}]],{app:'scene',scene:'riverside',pacingChapter:'earlyRain'}),
 'a-night-chat':chat('a-night-chat',['刚洗完脸','水溅到镜子上了，擦半天还以为自己眼花','你有过这种时候吗？东西明明在手里，还到处找'],[['story','有，我边打电话边找手机🥲','a-music',{phoneJoke:true,humor:2},['ㅋㅋㅋㅋ这个我服','先看看现在手机还在不在你手上']],['soft','有。但你现在是不是困了','a-music',{noticedTired:true,trust:2},['有一点','不过还想跟你说几句，等下再困']]]),
 'a-music':chat('a-music',['今天听见一首以前唱过的歌','有一小段，忽然很想找个人听听','你这周哪天晚上有空？','我先问时间，地点等我确认好再告诉你'],[['yes','周五晚上。你该不会要考我听后感吧','a-music-wait',{pianoEvening:true,humor:1},['不考','我自己先别弹错再说ㅋㅋ']],['warm','可以，想听你当面唱','a-music-wait',{pianoPersonal:true,active:2},['好','那我认真准备一下']]]),
 'a-music-wait':chat('a-music-wait',['地方问好了，周五那晚人不多','我会早点到，你慢慢来','地址单独发你，别走正门排队','还有，刚才那个笑话我想起来了……算了，当面说，发文字显得更冷'],[['go','好，周五见。笑话也给我留着','r-piano-invite',{savedBadJoke:true}],['ask','你怎么比上次还认真😏','r-piano-invite',{noticedSpecial:true},['被你看出来了','那我也不装随便路过了']]]),
 'a-bar-door':chat('a-bar-door',['酒吧侧门边没有招牌，只有一盏小壁灯。他听见门响，先从琴边抬起头。'],[['closer','坐到他留出的那把椅子上','r-piano-invite',{barNear:true,trust:2}],['quiet','先在旁边听他试完这几个音','r-piano-invite',{barPatient:true,trust:2}]],{app:'scene',scene:'piano',pacingChapter:'earlyBar'}),
 'a-after-piano':chat('a-after-piano',['到家了吗','刚才你坐在那里，我忘了本来要说的笑话','现在想起来了，又不想讲了','怕你明天见我，只记得那个冷笑话'],[['tomorrow','明天见？你刚才怎么没说','a-next-morning',{caughtNextDate:true,active:1},['嗯，我想再见你一次','这回不唱歌，带你去你挑过的那家店']],['tease','我记得的是你弹错以后笑了一下','a-next-morning',{rememberedWrongNote:true,trust:2},['就一小下，也被你抓住了🥲','那明天见面让我补个好印象？']]]),
 'a-next-morning':chat('a-next-morning',['早','刚把昨晚那件衬衫收好了，手放到袖口又想起你坐在旁边','下午咖啡馆，还是你喜欢的靠里那边？','本来想私信问你，等等，我先确认一下账号'],[['go','你先看清楚再发ㅋㅋ','spark',{accountJoke:true,humor:1}],['warm','嗯，下午见。我还想听那首歌的事','spark',{pianoCallback:true,trust:1}]]),
};
const pacingPage=(title,a,b,options=null)=>({title,lines:[a,b],options,place:'home'});
export const PACING_CHAPTERS={
 earlyStore:{title:'两份一样的饭团',music:'silence',pages:[
 pacingPage('侧门旁边','你到时，他正在袋子里翻找筷子。听见脚步声，抬头先笑了，手里的袋口还捏着。','“来了？我刚才差点把另一份也热了。差一点，真的。”'),
 pacingPage('让出的座位','靠窗只有两个高脚凳。他把自己的袋子拿下来，纸巾铺到桌面，给你腾出干净的位置。','你坐下后，他才拉开旁边那张椅子，中间还留着放外套的一点距离。'),
 pacingPage('买错的口味','拆到一半，他看了看包装，又看你一眼。两份的颜色一样，辣度却写在背面，他刚才根本没翻过去看。','“等一下。现在重新选，还来得及假装我一开始就买对了吧？”'),
 pacingPage('分到哪一份','他把两份都推到桌子中间，手指点了点背面的小字，像认真交出一份特别不难的答卷。','“你先选。我刚才已经跟它们熟悉过了。”',[['spicy','我吃辣的，你拿另一份'],['plain','我要清淡那份，你别逞强']]),
 pacingPage('筷子没拆开','你拆开包装时，他还在跟塑料膜较劲。越想利落一点，筷子越不肯出来，他自己也觉得好笑。','“今天手不听话。平时……也没好到哪里去，你别期待太高ㅋㅋ。”'),
 pacingPage('倒映在玻璃里','玻璃上有你们的倒影，叠在外面来往的车灯上。他看见自己帽檐歪了，抬手扶正，又偷偷从倒影里看你的反应。','“笑什么？我知道，已经扶好了。”'),
 pacingPage('聊到忘了吃','他讲起刚才收工时的一件小事，讲到一半，发现自己举着筷子停了很久。你面前的饭团也还剩一半。','他把话头收了收，先咬了一口。几秒之后，又忍不住接着讲。'),
 pacingPage('响起的手机','手机在桌上震了两声。他低头回了一句，手指停在屏幕边上，确认不需要走开才放下。','“他们问我吃了没。我说正在吃。差点又把坐对面的人写上了。”'),
 pacingPage('一小段空白','话题自然地停了一会儿。外面有人推门进来，带来一阵冷风，他伸手压住你差点被吹走的包装袋。','他的手背擦过你的手指，停了很短一下。袋子压稳了，他才慢慢把手收回去。'),
 pacingPage('饮料机前','吃完以后，他站在饮料机前，让你先挑。机器咕噜一声吐出罐子，他弯腰拿出来，转了转，把拉环朝向你。','“今天这顿不太像样。下次你挑，我认真跟着走。”'),
 pacingPage('到了路口','到了要分开的路口，他还提着两人的包装袋。你说可以扔进旁边的垃圾桶，他才反应过来自己一直没松手。','“对，拿一路了。刚才光顾着听你说话。”'),
 pacingPage('不是吃完就散','绿灯亮起时，他没有先走。等你看过来，才低头笑了一下，把没说完的话接上。','“下次有空，还一起吃点东西？”',[['closer','下次还有这种临时饭局，记得叫我'],['quiet','吃完一起走到路口']])]},
 earlyRain:{title:'雨停以前',music:'silence',pages:[
 pacingPage('同一段屋檐','屋檐下的地面只干了一半。他往旁边让，让你站进里面，自己收了收伞，水沿着伞尖滴到鞋边。','“你走里面。我这个鞋，反正已经湿了。”'),
 pacingPage('伞柄的方向','他把伞抖开，试了试两个人站进去的宽度。手腕稍微转了一点，伞面就多遮住你那边。','肩膀离得很近，却还没有碰上。他低头看了看，没急着迈步，等你先站稳。'),
 pacingPage('雨声中的笑话','他终于想起先前没讲完的笑话，自己说到一半就笑了。你还没弄懂哪里好笑，只看见他笑得耳朵有一点红。','“好，失败。这个先不计分，等我换一个。”'),
 pacingPage('再靠近一点','路口有车经过，溅起的水落在鞋尖前面。他握伞的手收紧了一下，另一只手抬起来，停在你手肘旁。','“往这边一点。”他说完，又给你留出自己挪过来的空间。',[['near','往他身边站近一点'],['space','拉住伞柄，自己调整位置']]),
 pacingPage('你说过的小事','走到下一个屋檐，他忽然指向马路对面。你随口提过的那家店就在拐角，他竟然认得。','“是这个吧？你说店门不好找。我刚才专门看了一眼。”'),
 pacingPage('没有急着过街','红灯还亮着。他站在你外侧，伞柄握得不高，方便你们都能看清路。倒计时变了一次，他也没拿手机。','你说起白天忙的事，他偏过一点头。雨点落在伞面上，反而把你们这边隔得安静。'),
 pacingPage('说到一半','你停下来找一个词，他没有替你把话补完。只是看着你，等你把刚才那句说下去。','“嗯，我听着呢。”声音不大，离得近，倒比手机里的字更清楚。'),
 pacingPage('他的袖口','一阵风吹过来，他抬手压住伞。袖口碰到你手背，已经被雨打湿了一小块，布料有点凉。','你提醒他，他低头看一眼，笑着把袖口往上挽了挽，又继续等你讲话。'),
 pacingPage('可以再走一段','到了原本要分开的路口，雨还没停。他看了看另一边的路，没有马上说再见。','“我还没讲今天最好笑的那件事。要不要再走到前面？”'),
 pacingPage('多出来的几步','你们在另一段屋檐下停住。明明没有走多远，他却像把下一个路口也仔细想过了，抬头找哪一边不会淋雨。','他看见你在看他，嘴角动了一下：“怎么了？怕我迷路啊？”'),
 pacingPage('灯亮在伞沿','门口的灯照在伞沿上，他垂下眼，才看见伞大半偏在你这边。没有往回收，只把握柄换了一只手。','“没事，这边也够。”说完自己摸了一下湿了的肩膀，又笑了。'),
 pacingPage('再留一小会儿','雨开始变小。他抬头听了两秒，却没有立刻把伞收起来，手指仍松松握着伞柄。','“现在走，还是……再等一会儿？”',[['closer','一起走到下一个路口'],['quiet','雨停了，再一起走吧']])]},
 earlyBar:{title:'琴房门开着的时候',music:'silence',pages:[
 pacingPage('侧门的灯','壁灯照着窄窄的门框。他在里面听见你的声音，起身时差点碰到琴凳，自己先扶住了。','“到了？我刚才一直看正门。还想你是不是走错了。”'),
 pacingPage('还没开始','吧台那边的人把杯子放下，和他点了点头就离开了。琴边只剩两张椅子，显然有人提前挪过位置。','他没解释那张空椅子，先问你外套放在哪里。接过去时，看了一眼有没有被雨打湿。'),
 pacingPage('忘记的笑话','你提醒他还有个笑话。他刚张嘴，先看见你笑，又把本来准备好的开头忘了。','“……算了。这个笑话从收工活到现在，也该休息了。”'),
 pacingPage('你坐哪边','他把两张椅子拉开一点，给你看琴键那边的视角。自己站在旁边，等你选，而不是替你拉好就要你坐下。','“这边看得到手。那边看得到我，选吧。”',[['face','那我要看得到你的那边'],['keys','我看琴键，你别弹错了😏']]),
 pacingPage('一个短短的音','他坐下来，先按了几个音。屋里太安静，那几个琴音显得格外近。他又把手指放回原位，轻轻试了一次。','你想起他聊天时那句“我自己先别弹错”，忽然发现他是真的有点紧张。'),
 pacingPage('落空的一拍','有个音落得稍重，他自己皱了皱鼻子，转过头看你。你还没有笑出声，他已经抬起手。','“等一下，刚才算调音。你当没听见。”'),
 pacingPage('自己的时间','你说起今天怎么过来的，他没有再按琴键。手指就搭在那里，认真听你讲自己赶完的事。','“还好你没为了我把事情扔一半。”他说完顿了顿，“不过你来了，我确实挺高兴。”'),
 pacingPage('杯子放在一边','你把杯子放到离琴远一点的位置。他看见了，拿了张杯垫递过来，自己的那一只也跟着挪开。','桌面腾出来一点空，他把谱纸放过去。上面有一道折痕，角上还压着他刚摘下的表。'),
 pacingPage('抬头的时候','他试完最后一组音，抬头正好对上你的目光。原本想问声音会不会太大，话到嘴边，却先笑了。','“你一直这么看，我可能真的会弹错。”'),
 pacingPage('没有催答案','这话说完，谁也没有急着把它接成玩笑。他低头看了一眼自己的手，又抬头看你。','房间里的安静没有变难熬。他只是把琴凳挪正，给你多留了一点看他的时间。'),
 pacingPage('留给你的椅子','他起身，把旁边椅子的角度调整了一点。你不用扭头，就能看见他的侧脸和落在琴键上的手。','他试着坐回去，确认你的位置没被挡住，才轻轻点头。这个小动作像已经练过一次。'),
 pacingPage('准备好了吗','琴盖映着那盏暖灯。他没有拿出手机录像，连放在谱架旁的屏幕也扣下了。','“这次认真唱。你要笑也行，别忍着。”',[['closer','坐到他留出的那把椅子上'],['quiet','先在旁边听他试完这几个音']])]}
};
export function installPacing(nodes){Object.assign(nodes,structuredClone(PACING_NODES));for(const c of nodes['intro-jin'].choices)c.next=['a-habit'];for(const c of nodes['a-night-chat'].choices)c.next=['intro-days'];for(const c of nodes['intro-days'].choices)c.next=['spark'];for(const c of nodes.spark.choices)c.next=['a-music'];for(const c of nodes['a-next-morning'].choices)c.next=['r-invite'];for(const c of nodes['r-aftercare'].choices)c.next=['r-jk-invite'];nodes['r-piano-invite'].act=2;nodes['r-piano'].act=2;nodes['r-piano'].messages=["“呼…我有点紧张”", "他掀起大衣在钢琴凳上坐下。", "“欢迎来到硕珍的个人频道….”", "他把手放在琴键上，笑着看你。", "“歌的名字叫i will come to you。”"];nodes['r-piano-invite'].beforeCoupleMessages=['地方是我以前来过的小酒吧','那晚就我们两个，你挑个看得清的位置坐ㅋㅋ','包了一个小酒吧，有首歌想弹给你听🤧','是哥哥的一首solo曲'];nodes['r-piano'].choices[0].next=['a-after-piano'];nodes['r-x-read'].app='kkt';}
export function pianoPreludeMessages(node,story){return !story.flags.couple&&node.beforeCoupleMessages?node.beforeCoupleMessages:node.messages}
export function pianoCueText(def,story){const copy=structuredClone(def);if(story?.flags.couple)return copy;copy.cues[9].lines[1]='还没想好怎么把心事说给你，想让你再多看自己一会儿这种念头，却已经藏不住了';copy.cues[14].lines[2]='门外的夜色还很长。明天还想见你，这一句，他留到送你回去时再问';return copy}
