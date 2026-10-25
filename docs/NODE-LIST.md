# 第一阶段已实现节点

## stranger

幕：1；故事线：A；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 你好，刚才那条评论是我留的。
- 朋友转给我的公开照片，我认出了那家店。原本想问店名，结果评论发出去了。

选项与后果：

- ask「你认出店了，为什么又删掉？」 → explain；条件 无；变化 {"trust":1}
- boundary「先说好，我不希望被陌生账号围观。」 → boundary；条件 无；变化 {"secrecy":2}

跨 App：instagram: 你保存的一张街景；igdm: jin 的评论；igdm: 评论已删除

## acquaintance

幕：1；故事线：D；联系人：friend；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 我是书妍，今晚替我跟硕珍说声谢谢？他帮我搬了展板。
- 我只介绍你们认识。感情上的事，你们自己决定，别让我当快递。

选项与后果：

- intro「可以，把介绍说清楚再拉群。」 → known；条件 无；变化 {"friendship":2}
- direct「我自己向他道谢，不拉群。」 → known-private；条件 无；变化 {"secrecy":1}

跨 App：instagram: 你保存的一张街景；igdm: jin 的评论；igdm: 评论已删除

## explain

幕：1；故事线：B；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 我删掉是因为那条评论能把别人引到你主页。
- 但先不问你就留下痕迹，是我考虑不周。店名不用告诉我，我已经知道自己该先道歉。

选项与后果：

- tease「道歉收到了，下次先走私信通道。」 → coffee；条件 无；变化 {"trust":2,"humor":1}
- clear「谢谢解释。以后公开互动先问我。」 → coffee；条件 无；变化 {"trust":2,"secrecy":1}

跨 App：KakaoTalk

## boundary

幕：1；故事线：B；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 好，你不需要为了跟我聊天承担围观。
- 我不会转发照片，也不会问你住哪。你愿意聊什么，我们就从那里聊。

选项与后果：

- warm「那就从那家店的咖啡聊起。」 → coffee；条件 无；变化 {"trust":2}
- independent「我先忙，晚一点再聊。」 → later；条件 无；变化 {"personalLife":2}

跨 App：KakaoTalk

## later

幕：1；故事线：E；联系人：jin；类型：延续节点。

前置条件：由上游事件解锁

对白：

- 好，我也该去排练了。
- 晚一点我来发消息，你不用守着手机。

选项与后果：

- back「现在有空了，刚才说到咖啡。」 → coffee；条件 无；变化 {"independent":1}

跨 App：KakaoTalk

## known

幕：1；故事线：D；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 书妍把群名改成了“搬展板售后服务”。
- 服务内容目前只有问候。我是硕珍，你好。

选项与后果：

- joke「请问售后包咖啡吗？」 → coffee；条件 无；变化 {"humor":2}
- thanks「听说你帮了她很久，谢谢。」 → coffee；条件 无；变化 {"trust":2}

跨 App：KakaoTalk

## known-private

幕：1；故事线：B；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 书妍说你会来道谢，还特地加了一句“本人会说话”。
- 我姑且相信她不是在评价我。你好。

选项与后果：

- tease「她对谁都这样，你习惯一下。」 → coffee；条件 无；变化 {"humor":1}
- sincere「谢谢你帮忙，改天我请咖啡。」 → coffee；条件 无；变化 {"trust":2,"active":1}

跨 App：KakaoTalk

## coffee

幕：2；故事线：F；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 先声明，我喝无糖的。
- 这是为以后可能出现的请客打基础，不是暗示。……好吧，最后半句说得不太诚实。

选项与后果：

- remember「无糖，我记住了。」 → invite, friend-side；条件 无；变化 {"rememberSugar":true,"trust":1}
- joke「先记账，请客得看你表现。」 → invite, friend-side；条件 无；变化 {"humor":2}

跨 App：KakaoTalk

## friend-side

幕：2；故事线：D；联系人：friend；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 展览出了点麻烦，场地方临时少给了两面墙。
- 我想改成小型展，不想硬撑。你愿意帮我看新方案，还是我们改天单纯吃饭？

选项与后果：

- help「发来吧，我今晚能帮你看。」 → friend-help；条件 无；变化 {"friendship":2,"helpedFriend":true}
- honest「今晚有约，明天陪你吃饭聊。」 → friend-dinner；条件 无；变化 {"friendship":1,"friendDinner":true}

跨 App：KakaoTalk

## friend-help

幕：2；故事线：D；联系人：friend；类型：延续节点。

前置条件：由上游事件解锁

对白：

- 谢谢。我把不想展出的那组撤掉了，反而松了口气。
- 我会记得你认真看过，不只在需要我时找我。

选项与后果：

- promise「下次布展也叫我。」 → 支线收束；条件 无；变化 {"friendship":1}

跨 App：KakaoTalk

## friend-dinner

幕：2；故事线：D；联系人：friend；类型：延续节点。

前置条件：由上游事件解锁

对白：

- 好，诚实说忙比敷衍我强。
- 明天我选店，这次不让你边吃边帮我改排版。

选项与后果：

- confirm「说定了，我把明晚空出来。」 → 支线收束；条件 无；变化 {"friendship":1}

跨 App：calendar: 书妍的晚餐

## invite

幕：2；故事线：A；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 今晚临时空出一个小时。想去那家店，但不是要你迁就临时通知。
- 你愿意一起坐坐，还是留到双方都提前安排好的时候？

选项与后果：

- yes「我有空，今晚见。」 → meet；条件 无；变化 {"met":true,"relationship":1}
- no「今晚不行，我们提前约另一天。」 → decline；条件 无；变化 {"declined":true,"personalLife":1}

跨 App：KakaoTalk

## meet

幕：2；故事线：A；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 我到店了，坐在窗边。
- 路上看到南俊，他也来买书。我还没提你，你希望怎么介绍？

选项与后果：

- friend「正常介绍名字，就说是朋友。」 → rm-meet；条件 无；变化 {"rmKnowsName":true,"secrecy":1}
- privacy「今天想安静一点，换个地方吧。」 → walk；条件 无；变化 {"privateMeet":true,"secrecy":2}

跨 App：calendar: 今晚：书店咖啡

## rm-meet

幕：2；故事线：D；联系人：rm；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 你好，我是南俊。硕珍刚才把菜单看反了，你来了他才发现。
- 别担心，我今天只打算买一本书。通常最后会买三本。

选项与后果：

- talk「你在看什么书？」 → rm-talk；条件 无；变化 {"friendship":1}
- space「那就不打扰你挑书了。」 → date-end；条件 无；变化 {"secrecy":1}

跨 App：KakaoTalk

## rm-talk

幕：2；故事线：D；联系人：rm；类型：延续节点。

前置条件：由上游事件解锁

对白：

- 一本关于城市空间的。你有兴趣的话，下次借你。
- 我记得你不把“名人的朋友”当作一个职业。这点很好。

选项与后果：

- accept「好，下次听你推荐。」 → date-end；条件 无；变化 {"rmAlly":true,"friendship":1}

跨 App：KakaoTalk

## walk

幕：2；故事线：B；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 好，我们去街角散步。换地方的理由我来解释，不让你显得像在躲人。
- 你看，我连独自买咖啡都能临时变成路线规划。

选项与后果：

- tease「路线规划合格，聊天继续努力。」 → date-end；条件 无；变化 {"humor":1}
- thanks「谢谢你没有让我为难。」 → date-end；条件 无；变化 {"trust":2}

跨 App：KakaoTalk

## date-end

幕：2；故事线：A；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 今天很开心。不是礼貌性售后回访。
- 下次我提前约你，不拿临时空档当诚意。

选项与后果：

- warm「我也开心。下次留一个完整晚上。」 → life；条件 无；变化 {"trust":2}
- direct「那就现在约下次，别只说下次。」 → life；条件 无；变化 {"active":2}

跨 App：KakaoTalk

## decline

幕：2；故事线：E；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 收到，那今天就不见。
- 我不把拒绝临时安排理解成拒绝我。去做你的事，之后我们认真挑个日子。

选项与后果：

- friend「我今晚想去帮书妍处理展览。」 → home-friend；条件 无；变化 {"friendship":1}
- rest「我今晚需要自己待一会儿。」 → home-rest；条件 无；变化 {"personalLife":2}

跨 App：KakaoTalk

## home-friend

幕：2；故事线：D；联系人：friend；类型：延续节点。

前置条件：由上游事件解锁

对白：

- 你来了，我正好敢把那两幅画撤掉。
- 不是所有事情都需要做大一点。有时做小一点才像自己。

选项与后果：

- listen「把你想留下的那幅讲给我听。」 → life；条件 无；变化 {"helpedFriend":true,"friendship":2}

跨 App：instagram: 书妍的小展

## home-rest

幕：2；故事线：F；联系人：jin；类型：延续节点。

前置条件：由上游事件解锁

对白：

- 我也回来了。今天不继续问你在干嘛。
- 留一条消息：明天如果精神好一点，我们再挑见面时间。晚安。

选项与后果：

- return「休息好了，明天我有个机会想和你聊。」 → life；条件 无；变化 {"independent":2}

跨 App：KakaoTalk

## life

幕：3；故事线：E；联系人：friend；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 有个短期项目在找人。不是替谁做免费宣传，有正式预算。
- 学生可以交作品集、上班族可以投短期合作、自由职业者可以谈报价。你愿意争取，还是这阵子先留一点余地？

选项与后果：

- career「我想争取，帮我转发正式资料。」 → work；条件 无；变化 {"personalLife":3,"career":true}
- balance「我想先把已有安排做好。」 → balance；条件 无；变化 {"personalLife":1,"restPlan":true}

跨 App：KakaoTalk

## work

幕：3；故事线：E；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 听说你在准备自己的项目，挺好。
- 约会可以改时间，不用为了证明在意我放弃机会。你需要我帮什么，还是只想有人听你说？

选项与后果：

- listen「陪我练一遍介绍就好。」 → rehearsal；条件 无；变化 {"trust":2}
- space「我想自己先准备完，再给你看。」 → work-space；条件 无；变化 {"independent":2}

跨 App：KakaoTalk

## rehearsal

幕：3；故事线：A；联系人：jin；类型：延续节点。

前置条件：由上游事件解锁

对白：

- 可以，我先当不认识你的面试官。
- 第一题：请解释为什么一个小时里偷看了三次我的消息。……这题不计分。

选项与后果：

- laugh「因为面试官不太守规矩。」 → public-met, public-home；条件 无；变化 {"humor":2}

跨 App：KakaoTalk

## work-space

幕：3；故事线：A；联系人：jin；类型：延续节点。

前置条件：由上游事件解锁

对白：

- 好。等你想展示的时候再给我看。
- 我把原来那晚空着，改成你忙完后的第二天。不是临时插队，是正式预约。

选项与后果：

- book「第二天可以，记下来。」 → public-met, public-home；条件 无；变化 {"trust":2}

跨 App：KakaoTalk

## balance

幕：3；故事线：F；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 你没有接新项目，那也不意味着空下来的时间归我。
- 我们选个你真的想出门的晚上，好不好？

选项与后果：

- yes「周五吧，我想见你。」 → public-met, public-home；条件 无；变化 {"active":2}
- own「周末更好，周五留给我的朋友。」 → public-met, public-home；条件 无；变化 {"friendship":1,"independent":1}

跨 App：KakaoTalk

## public-met

幕：3；故事线：C；联系人：jin；类型：关键选择。

前置条件：met

对白：

- 我看见那张店外照片了。我们见过面，所以我先来跟你对齐事实。
- 它没有拍到我们同框。你想公开说一句、只跟我商量，还是先不参与？

选项与后果：

- public「我只澄清照片，不回应私人关系。」 → public-answer；条件 无；变化 {"publicAttention":2,"publicReply":true}
- private「我们私下约好边界，不加入讨论。」 → private-answer；条件 无；变化 {"secrecy":2,"trust":1}
- ignore「先不回应，别替我发任何声明。」 → ignore-answer；条件 无；变化 {"independent":1}
- rm「先问南俊，他当时也在场。」 → rm-context；条件 rmAlly；变化 {"rmConsulted":true}

跨 App：instagram: 书店门口的照片；x: 同一家店？

## public-home

幕：3；故事线：C；联系人：friend；类型：关键选择。

前置条件：declined

对白：

- 有人把你的公开照片和店铺动态放在一起猜。
- 但你那晚根本没去见他。这次你有清楚的事实，不需要编一个解释。

选项与后果：

- public「我只说自己那天没去，不多讲私人安排。」 → public-answer；条件 无；变化 {"publicAttention":1,"publicReply":true}
- private「我私下跟他对齐情况，不回应网友。」 → private-answer；条件 无；变化 {"secrecy":2}
- ignore「我不参与，先继续自己的生活。」 → ignore-answer；条件 无；变化 {"personalLife":1}
- evidence「你之前那份展览文件，能帮我核对日期吗？」 → friend-evidence；条件 helpedFriend；变化 {"evidenceReceived":true}

跨 App：x: 并没有发生的偶遇

## public-answer

幕：3；故事线：C；联系人：friend；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 你只澄清了能证明的部分。有人接受，也有人嫌你回应得太认真。
- 公开发言会留下痕迹。之后我不会替你说“她什么都没回应”。

选项与后果：

- hold「保留原话，不继续争论。」 → confess；条件 无；变化 {"trust":1}
- boundary「补一句请不要猜素人的身份。」 → confess；条件 无；变化 {"secrecy":1}

跨 App：x: 玩家的澄清

## private-answer

幕：3；故事线：B；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 好，我不会要求你用公开回应换取我的安心。
- 如果有人问到你，我先来问你，不抢着替你定义关系。

选项与后果：

- tell「可信的朋友可以知道一点，但要先商量。」 → confess；条件 无；变化 {"shareTrusted":true,"trust":2}
- keep「先只有我们知道，之后再讨论。」 → confess；条件 无；变化 {"secrecy":2}

跨 App：KakaoTalk

## ignore-answer

幕：3；故事线：E；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 明白，沉默不是默认，也不是逃避。
- 我先把自己这边的公开安排看好。我们要谈的话，留在这里。

选项与后果：

- thanks「谢谢，别让我靠解释来证明信任。」 → confess；条件 无；变化 {"trust":2}
- active「那我们现在谈谈彼此到底想怎样。」 → confess；条件 无；变化 {"active":2}

跨 App：KakaoTalk

## confess

幕：4；故事线：A；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 我喜欢你。不是因为你处理舆论的方式“合格”，更不是因为你总有空。
- 我想认真和你交往。保密的麻烦我会一起承担，但决定权不在我一个人手上。

选项与后果：

- yes「我愿意。但我们先约好彼此的边界。」 → couple-boundary；条件 无；变化 {"relationship":3,"couple":true}
- slow「我也有好感，但想再见一次才决定。」 → second-date；条件 无；变化 {"trust":1,"notYet":true}

跨 App：KakaoTalk

## second-date

幕：4；故事线：A；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 可以，喜欢不是限时答题。
- 这次不等临时空档。我们约在你方便的时候，认真见一面；你可以在那之后继续说不。

选项与后果：

- yes「那就见过再说，我愿意认真了解。」 → after-second；条件 无；变化 {"secondDate":true}
- pause「我先处理完自己的安排，再来约。」 → checkpoint-slow；条件 无；变化 {"personalLife":1}

跨 App：KakaoTalk

## after-second

幕：4；故事线：A；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 见面之后，我的答案没变。
- 但我不会替你把“愿意了解”翻译成“已经交往”。你的答案呢？

选项与后果：

- yes「这次是明确答应。我们在一起吧。」 → couple-boundary；条件 无；变化 {"couple":true,"relationship":3}
- wait「还想慢一点，但不消失。」 → checkpoint-slow；条件 无；变化 {"trust":1}

跨 App：KakaoTalk

## couple-boundary

幕：4；故事线：B；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 那从今天开始，是恋人了。
- 我们先约一件最实际的事：临时工作冲突时，要怎么照顾彼此？

选项与后果：

- talk「提前说清楚，再一起找补回来的时间。」 → couple-plan；条件 无；变化 {"trust":2,"communicate":true}
- independent「各自先处理工作，但别失联。」 → couple-space；条件 无；变化 {"personalLife":2,"independent":2}

跨 App：KakaoTalk

## couple-plan

幕：4；故事线：F；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 好。我刚在日历里认真写了“约会”，看起来有点郑重。
- 又加了一句“不要再把菜单拿反”。这下比较像我。

选项与后果：

- sugar「顺便记住：你的无糖咖啡。」 → hidden-coffee；条件 rememberSugar；变化 {"sweet":1}
- new「下一次我挑地方，你挑甜点。」 → checkpoint-couple；条件 无；变化 {"active":1}
- sleep「约会别安排太晚，我要留点睡觉时间。」 → checkpoint-couple；条件 无；变化 {"personalLife":1}

跨 App：calendar: 下一次正式约会

## couple-space

幕：4；故事线：E；联系人：jin；类型：关键选择。

前置条件：由上游事件解锁

对白：

- 好，我不会拿“你怎么没回”当考勤。
- 但忙完之后会告诉你。我想参与你的生活，不接管它。

选项与后果：

- photo「忙完互发一张今天的照片吧。」 → checkpoint-independent；条件 无；变化 {"photoPromise":true}
- dinner「周末留一顿饭给彼此。」 → checkpoint-independent；条件 无；变化 {"weeklyDinner":true}

跨 App：KakaoTalk

## hidden-coffee

幕：4；故事线：F；联系人：jin；类型：延续节点。

前置条件：rememberSugar

对白：

- 当时我以为那句无糖会被你当废话略过去。
- 结果认真记住的人是你。今天这一杯，我会喝得很慢。

选项与后果：

- stay「以后还有很多杯，不急。」 → checkpoint-couple；条件 无；变化 {"trust":1}

跨 App：KakaoTalk

## checkpoint-couple

幕：4；故事线：A；联系人：jin；类型：阶段收束。

前置条件：由上游事件解锁

对白：

- 今天没有需要证明给外人看的东西。
- 我们已经约好下一次，也约好有事直接说。先把日子好好过起来。

选项与后果：

本阶段结局，无占位选项。

跨 App：KakaoTalk

## checkpoint-independent

幕：4；故事线：E；联系人：jin；类型：阶段收束。

前置条件：由上游事件解锁

对白：

- 你继续忙你的计划，我也去做我的工作。
- 这不是退回朋友。是两个都没把自己弄丢的人，开始谈恋爱。

选项与后果：

本阶段结局，无占位选项。

跨 App：KakaoTalk

## checkpoint-slow

幕：4；故事线：A；联系人：jin；类型：阶段收束。

前置条件：由上游事件解锁

对白：

- 好，我记住的是你说的“慢一点”，不是替你补一个答案。
- 我们没有删掉已有的心意。下一次，仍然可以由你来决定。

选项与后果：

本阶段结局，无占位选项。

跨 App：KakaoTalk

## friend-evidence

幕：3；故事线：D；联系人：friend；类型：关键选择。

前置条件：helpedFriend

对白：

- 能。你之前帮我认真看过方案，我留着原始文件。
- 日期可以给你核对，但照片里还有别的朋友。要公开的话，先只用日期，别把她们一起卷进去。

选项与后果：

- date「只用日期澄清，不发别人的照片。」 → public-answer；条件 无；变化 {"publicEvidence":true,"trust":1}
- private「我自己知道就好，不公开文件。」 → private-answer；条件 无；变化 {"secrecy":2}

跨 App：KakaoTalk

## rm-context

幕：3；故事线：D；联系人：rm；类型：关键选择。

前置条件：rmAlly

对白：

- 我记得那晚。但我只能说我亲眼见到的，不替你定义私人关系。
- 你上次愿意正常聊书，我也愿意认真听你的顾虑。需要我做什么，先说明范围。

选项与后果：

- facts「只核对时间，不请你替我声明。」 → private-answer；条件 无；变化 {"trust":1,"secrecy":1}
- none「先不用出面，你知道情况就够了。」 → ignore-answer；条件 无；变化 {"independent":1}

跨 App：KakaoTalk
