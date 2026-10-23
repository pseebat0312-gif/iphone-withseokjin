const PHONE_DATA = {
    passcode: "1204",
    // 第一页的 App
    appsPage1: [
        { id: "kkt", name: "KakaoTalk", icon: "💬", bg: "#FEE500", unread: 4 },
        { id: "memo", name: "备忘录", icon: "📝", bg: "#FFF8C5" },
        { id: "camera", name: "相机", icon: "📷", bg: "#333333" },
        { id: "settings", name: "设置", icon: "⚙️", bg: "#8E8E93" }
    ],
    // 第二页的 App
    appsPage2: [
        { id: "photos", name: "照片", icon: "🌄", bg: "#ffffff" },
        { id: "calendar", name: "日历", icon: "📅", bg: "#FF3B30" },
        { id: "weather", name: "天气", icon: "☁️", bg: "#3498DB" }
    ],
    // Dock 栏固定的 App
    dock: [
        { id: "phone", name: "电话", icon: "📞", bg: "#34c759" },
        { id: "sms", name: "信息", icon: "✉️", bg: "#34c759" },
        { id: "safari", name: "浏览器", icon: "🧭", bg: "#007AFF" }
    ],
    
    // 锁屏和横幅通知数据
    notifications: [
        { id: "n1", app: "KakaoTalk", icon: "💬", bg: "#FEE500", title: "柾国", message: "6月12号那个", time: "35分钟前" },
        { id: "n2", app: "KakaoTalk", icon: "💬", bg: "#FEE500", title: "柾国", message: "哥 明天去的那个海", time: "36分钟前" },
        { id: "n3", app: "短信", icon: "✉️", bg: "#34c759", title: "俊昊叔叔", message: "25号（周三）晚上7点家里吃饭。你父亲交代的，别迟到。", time: "19:32" }
    ],

    // 聊天数据预留
    kkt: {
        rooms: [
            {
                id: "r1",
                name: "Mollyzhao",
                avatar: "🐻",
                unread: 2,
                messages: [
                    { from: "me", text: "在哪儿发情不是发情", time: "0:37" },
                    { from: "them", text: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", time: "0:38" },
                    { from: "me", text: "我发现 osh 的首字母这样好可爱", time: "0:38" },
                    { from: "them", text: "정말 한국스럽네요.", time: "0:38" }
                ]
            }
        ]
    }
};