const $ = (selector) => document.querySelector(selector);
let inputCode = "";

// ================= 1. 本地存储与初始化 =================
let savedData = localStorage.getItem("phoneData");
if (savedData) {
    const parsed = JSON.parse(savedData);
    PHONE_DATA.kkt = parsed.kkt;
    PHONE_DATA.appsPage1 = parsed.appsPage1;
    if(parsed.memos) PHONE_DATA.memos = parsed.memos;
    if(parsed.wallpaper) $("#wallpaper-layer").style.backgroundImage = `url(${parsed.wallpaper})`;
}

function saveData() {
    localStorage.setItem("phoneData", JSON.stringify({
        kkt: PHONE_DATA.kkt,
        appsPage1: PHONE_DATA.appsPage1,
        memos: PHONE_DATA.memos,
        wallpaper: $("#wallpaper-layer").style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '')
    }));
}

// ================= 2. 时钟 =================
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

// ================= 3. 滑动解锁与密码 =================
let touchStartY = 0;
$("#lock-screen").addEventListener("touchstart", e => touchStartY = e.touches[0].clientY);
$("#lock-screen").addEventListener("touchend", e => {
    if (touchStartY - e.changedTouches[0].clientY > 50) {
        $("#lock-screen").classList.remove("active");
        $("#passcode-screen").classList.add("active");
    }
});
$("#lock-screen").addEventListener("click", () => {
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
            startNotificationTimer(); // 解锁后开启随机弹窗
        } else {
            $("#passcode-screen").classList.add("shake");
            setTimeout(() => {
                $("#passcode-screen").classList.remove("shake");
                inputCode = ""; $("#dots").innerHTML = ""; 
            }, 400);
        }
    }
}

// ================= 4. 随机弹窗通知与横幅 =================
let bannerTimeout;
let notifInterval;

function startNotificationTimer() {
    if (notifInterval) clearInterval(notifInterval);
    // 每 20 秒随机弹一次
    notifInterval = setInterval(() => {
        if (!$("#app-view").classList.contains("active")) {
            const randomNotif = PHONE_DATA.notifications[Math.floor(Math.random() * PHONE_DATA.notifications.length)];
            showBanner(randomNotif);
        }
    }, 20000);
}

function showBanner(n = null) {
    if (!n) n = PHONE_DATA.notifications[0];
    const banner = $("#banner-notification");
    $("#banner-icon").textContent = n.icon;
    $("#banner-icon").style.background = n.bg;
    $("#banner-title").textContent = n.title;
    $("#banner-msg").textContent = n.message;
    banner.classList.add("show");
    
    if (navigator.vibrate) navigator.vibrate(100);

    clearTimeout(bannerTimeout);
    bannerTimeout = setTimeout(hideBanner, 4000);
}

function hideBanner() { $("#banner-notification").classList.remove("show"); }
$("#banner-notification").addEventListener("touchstart", e => touchStartY = e.touches[0].clientY);
$("#banner-notification").addEventListener("touchend", e => {
    if (touchStartY - e.changedTouches[0].clientY > 30) hideBanner();
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

    if (id === "settings") {
        $("#settings-screen").style.display = "flex";
        return;
    }

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

// ================= 7. KKT 逻辑 =================
let currentRoomId = null;

function renderKKT(container) {
    const rooms = [...PHONE_DATA.kkt.rooms].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

    container.innerHTML = `
        <div class="kkt-list">
            ${rooms.map(room => `
                <div class="kkt-room" onclick="openChat('${room.id}')">
                    <div class="avatar" ${room.pinned ? 'style="border: 2px solid #FEE500;"' : ''}>${room.avatar}</div>
                    <div class="room-info">
                        <div class="room-name">${room.name}</div>
                        <div class="room-preview">${room.messages.length ? (room.messages[room.messages.length-1].text || '[图片]') : '暂无消息'}</div>
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
            ${room.messages.map(m => `
                <div class="msg ${m.from}">
                    ${m.text || ""}
                    ${m.image ? `<img src="${m.image}">` : ""}
                </div>
            `).join("")}
        </div>
        <div class="chat-input-area">
            <div class="chat-input-box">
                <span class="plus-icon" onclick="document.getElementById('chat-image-input').click()">+</span>
                <input type="text" id="chat-input" placeholder="输入消息..." onkeypress="if(event.key==='Enter') sendMessage()">
            </div>
            <button class="send-btn" onclick="sendMessage()">发送</button>
            <input type="file" id="chat-image-input" accept="image/*" style="display: none;" onchange="sendImage(event)">
        </div>
    `;
    scrollToBottom();
}

function scrollToBottom() {
    const chatArea = document.getElementById("chat-area");
    if (chatArea) chatArea.scrollTop = chatArea.scrollHeight;
}

function sendImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        const room = PHONE_DATA.kkt.rooms.find(r => r.id === currentRoomId);
        
        room.messages.push({ from: "me", image: imageData });
        saveData();
        document.getElementById("chat-area").innerHTML += `<div class="msg me"><img src="${imageData}"></div>`;
        scrollToBottom();

        document.getElementById("chat-title").textContent = "对方正在输入...";
        setTimeout(() => {
            document.getElementById("chat-title").textContent = room.name;
            const reply = "宝宝，照片我看到了，真好看！🥰";
            room.messages.push({ from: "them", text: reply });
            saveData();
            document.getElementById("chat-area").innerHTML += `<div class="msg them">${reply}</div>`;
            scrollToBottom();
        }, 1500);
    };
    reader.readAsDataURL(file);
    event.target.value = ""; 
}

async function sendMessage() {
    const input = document.getElementById("chat-input");
    const text = input.value.trim();
    if (!text) return;

    const room = PHONE_DATA.kkt.rooms.find(r => r.id === currentRoomId);
    room.messages.push({ from: "me", text: text });
    saveData();
    
    const chatArea = document.getElementById("chat-area");
    chatArea.innerHTML += `<div class="msg me">${text}</div>`;
    input.value = "";
    scrollToBottom();

    document.getElementById("chat-title").textContent = "对方正在输入...";

    try {
        const systemPrompt = room.prompt || "你是一个韩国人，正在和用户聊天。";
        const history = room.messages.filter(m => !m.image).map(m => ({
            role: m.from === 'me' ? 'user' : 'assistant',
            content: m.text || "发了一张图片"
        }));

        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: history, systemPrompt: systemPrompt })
        });

        const data = await response.json();
        document.getElementById("chat-title").textContent = room.name;
        room.messages.push({ from: "them", text: data.reply });
        saveData();
        chatArea.innerHTML += `<div class="msg them">${data.reply}</div>`;
        scrollToBottom();

    } catch (error) {
        document.getElementById("chat-title").textContent = "连接失败";
    }
}

// ================= 8. 备忘录 =================
function renderMemo(container) {
    container.innerHTML = `
        <div style="padding-bottom: 20px;">
            ${PHONE_DATA.memos.map((m, index) => `
                <div class="memo-item">
                    <input type="text" value="${m.title}" style="background:transparent; border:none; color:#fff; font-size:16px; font-weight:600; width:100%; outline:none;" onchange="updateMemo(${index}, 'title', this.value)">
                    <textarea style="background:transparent; border:none; color:#888; font-size:14px; width:100%; height:80px; resize:none; outline:none; margin-top:5px;" onchange="updateMemo(${index}, 'body', this.value)">${m.body}</textarea>
                    <button onclick="sendToKKT('${m.title}', '${m.body}')" style="background:#FEE500; color:#000; border:none; padding:5px 10px; border-radius:10px; font-size:12px; margin-top:5px;">发到 KKT</button>
                </div>
            `).join("")}
        </div>
    `;
}

function updateMemo(index, field, value) {
    PHONE_DATA.memos[index][field] = value;
    saveData();
}

function sendToKKT(title, body) {
    const room = PHONE_DATA.kkt.rooms.find(r => r.id === "r1");
    room.messages.push({ from: "me", text: `[备忘录分享] ${title}\n${body}` });
    saveData();
    alert("已发送给金硕珍！");
}

// ================= 9. 设置 =================
function closeSettings() {
    $("#settings-screen").style.display = "none";
}

function changePasscode() {
    let newCode = prompt("请输入新的 4 位数字密码：");
    if (newCode && newCode.length === 4 && !isNaN(newCode)) {
        PHONE_DATA.passcode = newCode;
        localStorage.setItem("phonePasscode", newCode);
        alert("密码修改成功！");
    } else if (newCode) {
        alert("格式错误，请输入 4 位纯数字。");
    }
}

const savedPasscode = localStorage.getItem("phonePasscode");
if (savedPasscode) PHONE_DATA.passcode = savedPasscode;

function uploadWallpaper(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            $("#wallpaper-layer").style.backgroundImage = `url(${e.target.result})`;
            saveData();
            alert("壁纸更换成功！");
        };
        reader.readAsDataURL(file);
    }
}