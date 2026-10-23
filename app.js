const $ = (selector) => document.querySelector(selector);
let inputCode = "";

// ================= 1. 本地存储初始化 =================
// 如果本地没有数据，就用 data.js 的；如果有，就读取本地的
let savedData = localStorage.getItem("phoneData");
if (savedData) {
    // 把保存的字符串转回对象，合并到 PHONE_DATA
    const parsed = JSON.parse(savedData);
    PHONE_DATA.kkt = parsed.kkt;
    PHONE_DATA.appsPage1 = parsed.appsPage1;
}

function saveData() {
    localStorage.setItem("phoneData", JSON.stringify({
        kkt: PHONE_DATA.kkt,
        appsPage1: PHONE_DATA.appsPage1
    }));
}

// ================= 2. 时钟与时间 =================
function updateClock() {
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    $("#status-time").textContent = timeStr;
    $("#lock-time").textContent = timeStr;
    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    $("#lock-date").textContent = `${now.getMonth() + 1}月${now.getDate()}日 星期${weekdays[now.getDay()]}`;
}
setInterval(updateClock, 1000);
updateClock();

// ================= 3. 锁屏与密码逻辑 =================
$("#swipe-up-trigger").addEventListener("click", () => {
    $("#lock-screen").classList.remove("active");
    $("#passcode-screen").classList.add("active");
});
$("#swipe-down-trigger").addEventListener("click", () => {
    $("#passcode-screen").classList.remove("active");
    $("#lock-screen").classList.add("active");
});

const keypad = $("#keypad");
[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].forEach(k => {
    const btn = document.createElement("button");
    btn.textContent = k;
    if (k === "") btn.className = "empty";
    btn.onclick = () => handleKeyPress(k);
    keypad.appendChild(btn);
});

function handleKeyPress(k) {
    if (k === "⌫") inputCode = inputCode.slice(0, -1);
    else if (k !== "" && inputCode.length < 4) inputCode += k;
    
    $("#dots").innerHTML = Array.from({ length: 4 }, (_, i) => 
        `<span class="dot ${i < inputCode.length ? "filled" : ""}"></span>`
    ).join("");

    if (inputCode.length === 4) {
        if (inputCode === PHONE_DATA.passcode) {
            $("#passcode-screen").classList.remove("active");
            $("#home-screen").classList.add("active");
            renderHome();
            setTimeout(showBanner, 1500); 
        } else {
            $("#passcode-screen").classList.add("shake");
            setTimeout(() => {
                $("#passcode-screen").classList.remove("shake");
                inputCode = ""; $("#dots").innerHTML = ""; 
            }, 400);
        }
    }
}

// ================= 4. 通知横幅 =================
let bannerTimeout;
function showBanner() {
    const banner = $("#banner-notification");
    // 获取最新的一条通知
    const n = PHONE_DATA.notifications[0]; 
    $("#banner-icon").textContent = n.icon;
    $("#banner-icon").style.background = n.bg;
    $("#banner-title").textContent = n.title;
    $("#banner-msg").textContent = n.message;
    banner.classList.add("show");
    banner.dataset.target = "kkt"; 

    bannerTimeout = setTimeout(hideBanner, 4000);
}

function hideBanner() {
    $("#banner-notification").classList.remove("show");
    clearTimeout(bannerTimeout);
}

let touchStartY = 0;
$("#banner-notification").addEventListener("touchstart", e => touchStartY = e.touches[0].clientY);
$("#banner-notification").addEventListener("touchend", e => {
    let touchEndY = e.changedTouches[0].clientY;
    if (touchStartY - touchEndY > 30) hideBanner();
});

// ================= 5. 渲染主屏幕 =================
function renderHome() {
    renderPage("page-1", PHONE_DATA.appsPage1);
    renderPage("page-2", PHONE_DATA.appsPage2);
    $("#dock").innerHTML = "";
    PHONE_DATA.dock.forEach(app => $("#dock").appendChild(createIcon(app)));
}

function renderPage(pageId, apps) {
    const container = $(`#${pageId}`);
    container.innerHTML = "";
    apps.forEach(app => container.appendChild(createIcon(app)));
}

function createIcon(app) {
    const btn = document.createElement("button");
    btn.className = "app-icon";
    btn.innerHTML = `
        <div class="icon-wrapper">
            <div class="icon-bg" style="background: ${app.bg}">${app.icon}</div>
            ${app.unread ? `<div class="badge">${app.unread}</div>` : ""}
        </div>
        <span class="app-name">${app.name}</span>
    `;
    btn.onclick = () => openApp(app.id);
    return btn;
}

// ================= 6. App 路由 =================
function openApp(id) {
    const view = $("#app-view");
    view.classList.add("active");
    view.innerHTML = "";

    if (id === "camera") {
        view.innerHTML = `<video autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover;background:#111;"></video>`;
        return;
    }

    const header = document.createElement("div");
    header.className = "app-header";
    header.innerHTML = `
        <button class="back-btn" onclick="closeApp()">‹ 返回</button>
        <span class="app-title">${id === 'kkt' ? 'KakaoTalk' : id}</span>
        <span style="width: 60px;"></span>
    `;
    view.appendChild(header);

    const body = document.createElement("div");
    body.className = "app-body";
    view.appendChild(body);

    if (id === "kkt") renderKKT(body);
    else if (id === "memo") renderMemo(body);
    else body.innerHTML = `<div style="color:#888;text-align:center;padding:20px;">功能开发中</div>`;
}

function closeApp() {
    $("#app-view").classList.remove("active");
    $("#app-view").innerHTML = "";
    renderHome(); 
}
$("#home-indicator").onclick = closeApp;

// ================= 7. KKT 核心逻辑 =================
let currentRoomId = null;

function renderKKT(container) {
    container.innerHTML = `
        <div class="kkt-list">
            ${PHONE_DATA.kkt.rooms.map(room => `
                <div class="kkt-room" onclick="openChat('${room.id}')">
                    <div class="avatar">${room.avatar}</div>
                    <div class="room-info">
                        <div class="room-name">${room.name}</div>
                        <div class="room-preview">${room.messages[room.messages.length-1].text}</div>
                    </div>
                    ${room.unread ? `<div class="kkt-unread">${room.unread}</div>` : ""}
                </div>
            `).join("")}
        </div>
        <div class="kkt-bottom-nav">
            <div class="nav-item">👤<br>好友</div>
            <div class="nav-item active">💬<br>聊天</div>
            <div class="nav-item">🔍<br>搜索</div>
            <div class="nav-item">⚙️<br>更多</div>
        </div>
    `;
}

function openChat(roomId) {
    currentRoomId = roomId;
    const room = PHONE_DATA.kkt.rooms.find(r => r.id === roomId);
    
    // 标记已读并保存到本地
    room.unread = 0; 
    PHONE_DATA.appsPage1.find(a => a.id === 'kkt').unread = 0;
    saveData();

    document.querySelector(".app-header").innerHTML = `
        <button class="back-btn" onclick="renderKKT(document.querySelector('.app-body'))">‹ 聊天</button>
        <span class="app-title" id="chat-title">${room.name}</span>
        <span style="width: 60px;"></span>
    `;

    const body = document.querySelector(".app-body");
    body.innerHTML = `
        <div class="chat-area" id="chat-area">
            ${room.messages.map(m => `<div class="msg ${m.from}">${m.text}</div>`).join("")}
        </div>
        <div class="chat-input-area">
            <div class="chat-input-box">
                <span class="plus-icon">+</span>
                <input type="text" id="chat-input" placeholder="输入消息..." onkeypress="if(event.key==='Enter') sendMessage()">
            </div>
            <button class="send-btn" onclick="sendMessage()">发送</button>
        </div>
    `;
    scrollToBottom();
}

function scrollToBottom() {
    const chatArea = document.getElementById("chat-area");
    if (chatArea) chatArea.scrollTop = chatArea.scrollHeight;
}

// 发送消息并请求真实 AI
async function sendMessage() {
    const input = document.getElementById("chat-input");
    const text = input.value.trim();
    if (!text) return;

    const room = PHONE_DATA.kkt.rooms.find(r => r.id === currentRoomId);
    
    // 1. 渲染我的消息并保存
    room.messages.push({ from: "me", text: text });
    saveData();
    document.getElementById("chat-area").innerHTML += `<div class="msg me">${text}</div>`;
    input.value = "";
    scrollToBottom();

    // 2. 显示对方正在输入
    document.getElementById("chat-title").textContent = "对方正在输入...";

    try {
        // 组装历史记录发给后台
        const history = room.messages.map(m => ({
            role: m.from === 'me' ? 'user' : 'assistant',
            content: m.text
        }));

        // 请求 Netlify 部署的云函数 (注意：如果你在本地 Live Server 测试，这里会报错，因为本地没有 /netlify/functions 环境)
        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: history })
        });

        const data = await response.json();
        
        // 3. 收到回复，渲染并保存
        document.getElementById("chat-title").textContent = room.name;
        const replyText = data.reply;
        
        room.messages.push({ from: "them", text: replyText });
        saveData();
        document.getElementById("chat-area").innerHTML += `<div class="msg them">${replyText}</div>`;
        scrollToBottom();

    } catch (error) {
        document.getElementById("chat-title").textContent = "连接失败";
        console.error(error);
    }
}

// ================= 8. 备忘录 =================
function renderMemo(container) {
    container.innerHTML = PHONE_DATA.memos.map(m => `
        <div class="memo-item">
            <div class="memo-title">${m.title}</div>
            <div class="memo-body">${m.body}</div>
        </div>
    `).join("");
}