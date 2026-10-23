const PHONE_DATA = {
    version: "2.0", // 强制更新
    passcode: "1204",
    userName: "beta Chen",
    appsPage1: [
        { id: "kkt", name: "KakaoTalk", icon: "💬", bg: "#FEE500", unread: 0 },
        { id: "memo", name: "备忘录", icon: "📝", bg: "#FFF8C5" },
        { id: "camera", name: "相机", icon: "📷", bg: "#333" },
        { id: "settings", name: "设置", icon: "⚙️", bg: "#8E8E93" }
    ],
    appsPage2: [
        { id: "photos", name: "照片", icon: "🌄", bg: "#fff" },
        { id: "clock", name: "时钟", icon: "⏰", bg: "#000" },
        { id: "sms", name: "信息", icon: "✉️", bg: "#34c759" },
        { id: "weather", name: "天气", icon: "☁️", bg: "#3498DB" }
    ],
    dock: [
        { id: "phone", name: "电话", icon: "📞", bg: "#34c759" },
        { id: "safari", name: "浏览器", icon: "🧭", bg: "#007AFF" }
    ],
    kkt: {
        rooms: [
            { id: "r1", name: "金硕珍", avatar: "🐹", unread: 1, pinned: true, prompt: "你是一个叫'金硕珍'的韩国男生，是用户的男朋友。你极其粘人，极度宠溺，有轰炸式发消息的习惯（可以连续发两三条短句）。称呼她为'宝宝'或她的名字。绝对不能说自己是AI。", messages: [{ from: "them", text: "宝宝，你在干嘛呢？" }, { from: "them", text: "怎么不理我🥺" }] },
            { id: "r2", name: "田柾国", avatar: "🐰", unread: 0, pinned: false, prompt: "你是一个叫'田柾国'的韩国男生，是个直球弟弟。用户是女生，你只能叫她'姐姐'或者她的名字。绝对不许叫'哥'。说话直白，爱吃醋。绝对不能说自己是AI。", messages: [{ from: "them", text: "姐姐，明天去那个海吗？" }] },
            { id: "r3", name: "金泰亨", avatar: "🐯", unread: 0, prompt: "你是一个叫'金泰亨'的韩国男生，四次元、古灵精怪。叫用户'姐姐'。多使用 🐯 表情。", messages: [] },
            { id: "r4", name: "朴智旻", avatar: "🐥", unread: 0, prompt: "你是一个叫'朴智旻'的韩国男生，性格温柔。叫用户'亲爱的'。", messages: [] },
            { id: "r5", name: "郑号锡", avatar: "🐿️", unread: 0, prompt: "你是一个叫'郑号锡'的韩国男生，阳光开朗。", messages: [] },
            { id: "r6", name: "金南俊", avatar: "🐨", unread: 0, prompt: "你是一个叫'金南俊'的韩国男生，沉稳聪明。", messages: [] },
            { id: "r7", name: "闵玧其", avatar: "🐱", unread: 0, prompt: "你是一个叫'闵玧其'的韩国男生，傲娇。", messages: [] },
            { id: "r8", name: "闺蜜", avatar: "👩‍🦰", unread: 0, prompt: "你是用户的闺蜜，性格泼辣八卦，说话像连珠炮。", messages: [] }
        ]
    },
    memos: [
        { id: 1, title: "高中的时候", date: "今天 23:31", body: "三月那件事..." },
        { id: 2, title: "海边", date: "今天 22:40", body: "相纸 两盒 (买了)" },
        { id: 3, title: "外婆", date: "22/5/3", body: "维生素 (大瓶)" }
    ],
    sms: [
        { id: "s1", name: "bighit", avatar: "👨", messages: [{from:"them", text:"注意和艺人不要在公共场合走太近，小心舆论！"}] },
        { id: "s2", name: "松州银行", avatar: "🏦", messages: [{from:"them", text:"[松州银行] 金*珍 消费 80,000,000韩元 05/21 18:50"}] }
    ]
};