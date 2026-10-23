const PHONE_DATA = {
    passcode: "1204",
    appsPage1: [
        { id: "kkt", name: "KakaoTalk", icon: "💬", bg: "#FEE500", unread: 2 },
        { id: "memo", name: "备忘录", icon: "📝", bg: "#FFF8C5" },
        { id: "camera", name: "相机", icon: "📷", bg: "#333" },
        { id: "settings", name: "设置", icon: "⚙️", bg: "#8E8E93" }
    ],
    appsPage2: [
        { id: "photos", name: "照片", icon: "🌄", bg: "#fff" },
        { id: "calendar", name: "日历", icon: "📅", bg: "#FF3B30" },
        { id: "weather", name: "天气", icon: "☁️", bg: "#3498DB" }
    ],
    dock: [
        { id: "phone", name: "电话", icon: "📞", bg: "#34c759" },
        { id: "sms", name: "信息", icon: "✉️", bg: "#34c759" },
        { id: "safari", name: "浏览器", icon: "🧭", bg: "#007AFF" }
    ],
    // 所有消息通知都从这里取
    notifications: [
        { id: "n1", app: "KakaoTalk", icon: "💬", bg: "#FEE500", title: "柾国", message: "6月12号那个", time: "35分钟前" },
        { id: "n2", app: "KakaoTalk", icon: "💬", bg: "#FEE500", title: "柾国", message: "哥 明天去的那个海", time: "36分钟前" },
        { id: "n3", app: "信息", icon: "✉️", bg: "#34c759", title: "俊昊叔叔", message: "25号晚上7点家里吃饭。别迟到。", time: "19:32" }
    ],
    kkt: {
        rooms: [
            {
                id: "r1",
                name: "Mollyzhao",
                avatar: "🐻",
                unread: 2, // 初始未读
                messages: [
                    { from: "me", text: "在哪儿发情不是发情", time: "0:37" },
                    { from: "them", text: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", time: "0:38" },
                    { from: "me", text: "我发现 osh 的首字母这样好可爱", time: "0:38" },
                    { from: "them", text: "정말 한국스럽네요.", time: "0:38" }
                ]
            }
        ]
    },
    memos: [
        { id: 1, title: "2022年5月21日", body: "今天天气不错，但无日程。" },
        { id: 2, title: "关于海的计划", body: "明天要去那个海，是不是以前去过的那个？" }
    ]
};