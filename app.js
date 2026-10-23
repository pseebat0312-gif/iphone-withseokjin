const $ = (selector) => document.querySelector(selector);
let inputCode = "";
let currentRoomId = null;
let isBannerHovered = false;

// 清理 Netlify 残留
setInterval(() => {
    document.querySelectorAll('*').forEach(el => {
        if (el.id && el.id.includes('netlify')) el.remove();
        if (el.className && typeof el.className === 'string' && el.className.includes('netlify')) el.remove();
        if (el.tagName === 'IFRAME' && el.src && el.src.includes('netlify')) el.remove();
        if (el.tagName === 'A' && el.innerHTML.includes('Netlify')) el.remove();
    });
}, 1000);

// 🚨 终极必杀：抛弃旧版大框缓存，使用全新 V_FINAL_999！
localStorage.removeItem("phoneDataV10"); 
localStorage.removeItem("phoneDataV9");
localStorage.removeItem("phoneDataV8");

let savedData = localStorage.getItem("phoneData_V_FINAL_999");
if (savedData) {
    const parsed = JSON.parse(savedData);
    PHONE_DATA.kkt = parsed.kkt || PHONE_DATA.kkt;
    PHONE_DATA.appsPage1 = parsed.appsPage1 || PHONE_DATA.appsPage1;
    PHONE_DATA.appsPage2 = parsed.appsPage2 || PHONE_DATA.appsPage2;
    PHONE_DATA.memos = parsed.memos || PHONE_DATA.memos;
    PHONE_DATA.sms = parsed.sms || PHONE_DATA.sms;
    PHONE_DATA.userName = parsed.userName || PHONE_DATA.userName;
    if(parsed.wallpaper) {
        $("#wallpaper-layer").style.backgroundImage = `url(${parsed.wallpaper})`;
        $("#lock-wallpaper-layer").style.backgroundImage = `url(${parsed.wallpaper})`;
    }
} else {
    localStorage.setItem("phoneData_V_FINAL_999", JSON.stringify({
        kkt: PHONE_DATA.kkt, appsPage1: PHONE_DATA.appsPage1, appsPage2: PHONE_DATA.appsPage2, memos: PHONE_DATA.memos,
        sms: PHONE_DATA.sms, userName: PHONE_DATA.userName, wallpaper: ""
    }));
}

function saveData() {
    const bg = $("#wallpaper-layer").style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    localStorage.setItem("phoneData_V_FINAL_999", JSON.stringify({
        kkt: PHONE_DATA.kkt, appsPage1: PHONE_DATA.appsPage1, appsPage2: PHONE_DATA.appsPage2, memos: PHONE_DATA.memos,
        sms: PHONE_DATA.sms, userName: PHONE_DATA.userName, wallpaper: bg
    }));
}

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

let touchStartY = 0;
$("#lock-screen").addEventListener("touchstart", e => touchStartY = e.touches[0].clientY);
$("#lock-screen").addEventListener("touchend", e => {
    if (touchStartY - e.changedTouches[0].clientY > 50) {
        $("#lock-screen").classList.remove("active");
        $("#passcode-screen").classList.add("active");
    }
});
$("#swipe-down-trigger").addEventListener("click", () => {
    $("#passcode-screen").classList.remove("active");
    $("#lock-screen").classList.add("active");
});
$("#lock-screen").addEventListener("click", () => {
    $("#lock-screen").classList.remove("active");
    $("#passcode-screen").classList.add("active");
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
            startProactiveMessages(); 
        } else {
            $("#passcode-screen").classList.add("shake");
            setTimeout(() => { $("#passcode-screen").classList.remove("shake"); inputCode = ""; $("#dots").innerHTML = ""; }, 400);
        }
    }
}

let bannerTimeout;
$("#banner-notification").addEventListener("touchstart", e => { 
    touchStartY = e.touches[0].clientY; 
    isBannerHovered = true; 
});
$("#banner-notification").addEventListener("touchend", e => { 
    if (touchStartY - e.changedTouches[0].clientY > 20) { 
        hideBanner(); 
    } else { 
        isBannerHovered = false; 
    } 
});

function showBanner(n) {
    const banner = $("#banner-notification");
    $("#banner-icon").textContent = n.icon;
    $("#banner-icon").style.background = n.bg;
    $("#banner-title").textContent = n.title;
    $("#banner-msg").textContent = n.message;
    banner.classList.add("show");
    banner.onclick = () => { if (!isBannerHovered) { hideBanner(); openApp("kkt"); openChat(n.roomId); } };
    if (navigator.vibrate) navigator.vibrate(100);
    clearTimeout(bannerTimeout);
    bannerTimeout = setTimeout(hideBanner, 2500); 
}
function hideBanner() { $("#banner-notification").classList.remove("show"); isBannerHovered = false; clearTimeout(bannerTimeout); }

function startProactiveMessages() {
    setTimeout(() => {
        triggerRandomMessage();
        setInterval(triggerRandomMessage, 60000); 
    }, 15000);
}

function triggerRandomMessage() {
    if ($("#app-view").classList.contains("active") && currentRoomId !== null) return; 
    const randomRoom = PHONE_DATA.kkt.rooms[Math.floor(Math.random() * PHONE_DATA.kkt.rooms.length)];
    const texts = randomRoom.proactiveTexts || ["在干嘛", "理理我"];
    const textToSend = texts[Math.floor(Math.random() * texts.length)];
    
    randomRoom.messages.push({ from: "them", text: textToSend });
    randomRoom.unread = (randomRoom.unread || 0) + 1;
    const kktApp = PHONE_DATA.appsPage1.find(a => a.id === 'kkt');
    kktApp.unread = (kktApp.unread || 0) + 1;
    saveData();
    
    showBanner({ icon: randomRoom.avatar, bg: "#FEE500", title: randomRoom.name, message: textToSend, roomId: randomRoom.id });
    renderHomeNotifications();
    
    if ($("#app-view").classList.contains("active") && currentRoomId === null) {
        renderKKT($("#app-body-content")); 
    }
}

function renderHomeNotifications() {
    const wrapper = $("#home-notifications-wrapper");
    const kktApp = PHONE_DATA.appsPage1.find(a => a.id === 'kkt');
    if (kktApp.unread > 0) {
        const latestRoom = PHONE_DATA.kkt.rooms.find(r => r.unread > 0) || PHONE_DATA.kkt.rooms[0];
        const lastMsg = latestRoom.messages[latestRoom.messages.length-1].text;
        wrapper.innerHTML = `
            <div class="home-notif-card" onclick="openApp('kkt'); openChat('${latestRoom.id}')">
                <div class="notif-icon" style="background:#FEE500; color:#000;">${latestRoom.avatar}</div>
                <div class="notif-content" style="color:#fff;">
                    <div class="notif-header" style="color:#aaa;"><span>${latestRoom.name}</span><span>现在</span></div>
                    <div class="notif-msg">${lastMsg}</div>
                </div>
            </div>
        `;
        wrapper.style.display = 'flex';
    } else { wrapper.style.display = 'none'; }
}

function renderHome() {
    renderPage("page-1", PHONE_DATA.appsPage1);
    renderPage("page-2", PHONE_DATA.appsPage2);
    $("#dock").innerHTML = "";
    PHONE_DATA.dock.forEach(app => $("#dock").appendChild(createIcon(app)));
    renderHomeNotifications(); 
}
function renderPage(pageId, apps) {
    const container = $(`#${pageId}`);
    container.innerHTML = "";
    apps.forEach(app => container.appendChild(createIcon(app)));
}
function createIcon(app) {
    const btn = document.createElement("button");
    btn.className = "app-icon";
    
    let iconContent = "";
    if (app.icon.includes("images/") || app.icon.includes(".jpg") || app.icon.includes(".png")) {
        iconContent = `<div class="icon-bg" style="background: ${app.bg}; overflow: hidden;"><img src="${app.icon}" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'; this.parentNode.style.background='#ff3b30';"></div>`;
    } else {
        iconContent = `<div class="icon-bg" style="background: ${app.bg}">${app.icon}</div>`;
    }

    btn.innerHTML = `
        <div class="icon-wrapper">
            ${iconContent}
            ${app.unread ? `<div class="badge">${app.unread}</div>` : ""}
        </div>
        <span class="app-name">${app.name}</span>
    `;
    btn.onclick = () => openApp(app.id);
    return btn;
}

function setHeader(title, backAction) {
    document.getElementById("app-title-text").textContent = title;
    document.getElementById("app-back-btn").onclick = backAction;
}

function openApp(id) {
    const view = $("#app-view");
    view.classList.add("active");
    const body = $("#app-body-content");
    body.innerHTML = "";

    if (id === "ig") { window.open("https://www.instagram.com/", "_blank"); view.classList.remove("active"); return; }
    
    if (id === "camera") {
        if (PHONE_DATA.cameraVideo && PHONE_DATA.cameraVideo !== "") {
            // 🚨 相机：视频铺满，底部死死贴住屏幕下沿
            body.innerHTML = `<div style="width:100%; height:100%; background:#000; display:flex; justify-content:center; align-items:center; overflow:hidden;"><video src="${PHONE_DATA.cameraVideo}" autoplay muted loop playsinline style="width:100%; height:100%; object-fit:cover; object-position: bottom;"></video></div>`;
        } else {
            body.innerHTML = `<div style="width:100%; height:100%; background:#111; display:flex; justify-content:center; align-items:center; color:#666;">相机未接入视频</div>`;
        }
        setHeader('相机', closeApp);
        return;
    }

    let title = id;
    if (id === 'kkt') title = 'KakaoTalk';
    if (id === 'memo') title = '备忘录';
    if (id === 'sms') title = '信息';
    if (id === 'photos') title = '图库';

    setHeader(title, closeApp);

    if (id === "kkt") renderKKT(body);
    else if (id === "memo") renderMemoList(body);
    else if (id === "sms") renderSMSList(body);
    else if (id === "photos") renderPhotos(body);
    else if (id === "clock") renderClock(body);
    else body.innerHTML = `<div style="color:#888;text-align:center;padding:20px;">功能开发中</div>`;
}

function closeApp() {
    $("#app-view").classList.remove("active");
    $("#app-body-content").innerHTML = "";
    currentRoomId = null;
    renderHome(); 
}
$("#home-indicator").onclick = closeApp;

function renderKKT(container) {
    const rooms = [...PHONE_DATA.kkt.rooms].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    container.innerHTML = `
        <div class="kkt-wrapper">
            <div class="kkt-list">
                ${rooms.map(room => `
                    <div class="kkt-room" onclick="openChat('${room.id}')">
                        <div class="avatar" ${room.pinned ? 'style="border: 2px solid #FEE500;"' : ''}>${room.avatar}</div>
                        <div class="room-info"><div class="room-name">${room.name}</div><div class="room-preview">${room.messages.length ? (room.messages[room.messages.length-1].text || '[图片]') : '暂无消息'}</div></div>
                        ${room.unread ? `<div class="kkt-unread">${room.unread}</div>` : ""}
                    </div>
                `).join("")}
            </div>
            <div class="kkt-bottom-nav"><div class="nav-item">👤<br>好友</div><div class="nav-item active">💬<br>聊天</div><div class="nav-item">🔍<br>搜索</div><div class="nav-item">⚙️<br>更多</div></div>
        </div>
    `;
}

function openChat(roomId) {
    currentRoomId = roomId;
    const room = PHONE_DATA.kkt.rooms.find(r => r.id === roomId);
    room.unread = 0; 
    PHONE_DATA.appsPage1.find(a => a.id === 'kkt').unread = 0;
    saveData();

    setHeader(room.name, backToChatList);

    const body = $("#app-body-content");
    body.innerHTML = `
        <div class="chat-wrapper">
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
        </div>
    `;
    scrollToBottom();
}

function backToChatList() {
    currentRoomId = null;
    setHeader('KakaoTalk', closeApp);
    renderKKT($("#app-body-content"));
    renderHome();
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
        document.getElementById("app-title-text").textContent = "对方正在输入...";
        setTimeout(() => {
            document.getElementById("app-title-text").textContent = room.name;
            const reply = room.name === "金硕珍" ? "发这图什么意思？" : "看到了。";
            room.messages.push({ from: "them", text: reply });
            saveData();
            document.getElementById("chat-area").innerHTML += `<div class="msg them">${reply}</div>`;
            scrollToBottom();
        }, 1500);
    };
    reader.readAsDataURL(file);
    event.target.value = ""; 
}

// 保持 AI 与本土兜底双轨并行
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

    document.getElementById("app-title-text").textContent = "对方正在输入...";

    try {
        let finalPrompt = room.prompt + ` 用户的名字是：${PHONE_DATA.userName}。顺着话题聊。严禁提及自己是AI。如果你有多句话要说，必须用竖线 | 分隔开！`;
        
        const recentMessages = room.messages.slice(-15).map(m => ({
            role: m.from === 'me' ? 'user' : 'assistant',
            content: m.text || "发了一张图片"
        }));

        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: recentMessages, systemPrompt: finalPrompt })
        });

        const data = await response.json();
        if (!data.reply) throw new Error("No reply");

        document.getElementById("app-title-text").textContent = room.name;
        
        let replies = data.reply.split('|').map(t => t.trim()).filter(t => t !== '');
        if (replies.length === 1 && replies[0].length > 15) {
            replies = replies[0].split('。').map(t => t.trim() + '。').filter(t => t !== '。');
        }
        replies = replies.slice(0, 4); 

        let delay = 0;
        replies.forEach((replyText) => {
            setTimeout(() => {
                room.messages.push({ from: "them", text: replyText });
                saveData();
                chatArea.innerHTML += `<div class="msg them">${replyText}</div>`;
                scrollToBottom();
            }, delay);
            delay += 800; 
        });

    } catch (error) {
        document.getElementById("app-title-text").textContent = room.name;
        let localReplies = ["嗯嗯", "我在听", "然后呢？"];
        if (room.proactiveTexts && room.proactiveTexts.length >= 2) {
            localReplies = [room.proactiveTexts[0], "怎么啦？", room.proactiveTexts[1]];
        }

        localReplies.forEach((r, i) => {
            setTimeout(() => {
                room.messages.push({ from: "them", text: r });
                saveData();
                chatArea.innerHTML += `<div class="msg them">${r}</div>`;
                scrollToBottom();
            }, i * 800);
        });
    }
}

function renderMemoList(container) {
    container.innerHTML = `<div style="padding: 15px; display: flex; justify-content: space-between;"><span style="font-size: 24px; font-weight: bold;">备忘录</span><span style="color: #FEE500;">➕</span></div><div class="memo-list-group">${PHONE_DATA.memos.map(m => `<div class="memo-list-item" onclick="openMemoDetail(${m.id})"><div class="memo-list-title">${m.title}</div><div class="memo-list-preview">${m.date || ''} ${m.body.replace(/\n/g, ' ')}</div></div>`).join("")}</div>`;
}
function openMemoDetail(memoId) {
    const memo = PHONE_DATA.memos.find(m => m.id === memoId);
    document.getElementById("app-title-text").textContent = "备忘录";
    document.getElementById("app-back-btn").onclick = backToMemoList;
    document.getElementById("app-body-content").innerHTML = `<div style="text-align: center; font-size: 12px; color: #888; margin-top: 10px;">${memo.date || '今天'}</div><div class="memo-detail-content" contenteditable="true" onblur="updateMemoBody(${memo.id}, this.innerText)"><div style="font-size: 24px; font-weight: bold; margin-bottom: 15px;">${memo.title}</div>${memo.body}</div>`;
}
function backToMemoList() { setHeader('备忘录', closeApp); renderMemoList(document.getElementById("app-body-content")); }
function updateMemoBody(id, text) { const memo = PHONE_DATA.memos.find(m => m.id === id); memo.body = text; saveData(); }

function renderPhotos(container) { 
    container.innerHTML = `
        <div style="padding: 15px; display: flex; justify-content: space-between;">
            <span style="font-size: 24px; font-weight: bold;">图库</span>
            <span style="color: #0a84ff;">选择</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;">
            ${PHONE_DATA.photos ? PHONE_DATA.photos.map(p => {
                if (p.url) {
                    return `<div style="aspect-ratio: 1; background: #1c1c1e; cursor: pointer;" onclick="viewPhoto('${p.url}')">
                                <img src="${p.url}" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'; this.parentNode.innerHTML='<div style=\\'display:flex;justify-content:center;align-items:center;width:100%;height:100%;color:#ff3b30;font-size:12px;text-align:center;\\'>图片加载失败<br>${p.url}</div>'">
                            </div>`;
                } else {
                    return `<div style="aspect-ratio: 1; background: #eee; display: flex; justify-content: center; align-items: center; color: #aaa; font-size: 24px;">?</div>`;
                }
            }).join("") : '<div>暂无照片</div>'}
        </div>
        <div style="text-align: center; padding: 20px; color: #888;">${PHONE_DATA.photos ? PHONE_DATA.photos.length : 0} 张照片</div>
    `;
}

function viewPhoto(url) {
    const body = $("#app-body-content");
    const originalContent = body.innerHTML;
    body.innerHTML = `<div style="width: 100%; height: 100%; background: #000; display: flex; justify-content: center; align-items: center;"><img src="${url}" style="max-width: 100%; max-height: 100%; object-fit: contain;" onerror="alert('大图加载失败，请检查文件是否存在！')"></div>`;
    document.getElementById("app-title-text").textContent = "预览";
    document.getElementById("app-back-btn").onclick = function() {
        body.innerHTML = originalContent; 
        setHeader('图库', closeApp); 
    };
}

function renderClock(container) { container.innerHTML = `<div style="padding: 20px; display: flex; justify-content: space-between; color: #F59E0B;"><span>编辑</span> <span>➕</span></div><div style="font-size: 32px; font-weight: bold; padding: 0 20px;">闹钟</div><div style="border-top: 1px solid #333; padding: 20px; margin-top: 20px;"><div style="font-size: 60px; font-weight: 300;">03:30</div><div style="display: flex; justify-content: space-between; align-items: center;"><span>闹钟</span><div style="width: 50px; height: 30px; background: #34c759; border-radius: 15px; position: relative;"><div style="width: 26px; height: 26px; background: #fff; border-radius: 50%; position: absolute; right: 2px; top: 2px;"></div></div></div></div>`; }

function renderSMSList(container) {
    container.innerHTML = `<div style="padding: 15px; display: flex; justify-content: space-between;"><span style="font-size: 24px; font-weight: bold;">信息</span><span style="color: #0a84ff;">编辑</span></div>${PHONE_DATA.sms.map((s, idx) => `<div class="kkt-room" onclick="openSMS(${idx})" style="padding: 15px 20px;"><div class="avatar" style="background: #888;">${s.avatar}</div><div class="room-info"><div class="room-name" style="color: #fff;">${s.name}</div><div class="room-preview">${s.messages[s.messages.length-1].text}</div></div></div>`).join("")}`;
}
function openSMS(index) {
    const sms = PHONE_DATA.sms[index];
    setHeader(sms.name, backToSMSList);
    document.getElementById("app-body-content").innerHTML = `<div class="chat-wrapper"><div class="chat-area" id="sms-area">${sms.messages.map(m => `<div class="msg ${m.from}">${m.text}</div>`).join("")}</div><div class="chat-input-area"><div class="chat-input-box"><input type="text" id="sms-input" placeholder="iMessage" onkeypress="if(event.key==='Enter') sendSMS(${index})"></div><button class="send-btn" onclick="sendSMS(${index})" style="background:#0a84ff; color:#fff;">发送</button></div></div>`;
    setTimeout(()=> { const a = document.getElementById("sms-area"); if(a) a.scrollTop = a.scrollHeight; }, 50);
}
function backToSMSList() { setHeader('信息', closeApp); renderSMSList(document.getElementById("app-body-content")); }
function sendSMS(index) { const input = document.getElementById("sms-input"); const text = input.value.trim(); if(!text) return; const sms = PHONE_DATA.sms[index]; sms.messages.push({ from: "me", text: text }); saveData(); document.getElementById("sms-area").innerHTML += `<div class="msg me">${text}</div>`; input.value = ""; const a = document.getElementById("sms-area"); a.scrollTop = a.scrollHeight; }