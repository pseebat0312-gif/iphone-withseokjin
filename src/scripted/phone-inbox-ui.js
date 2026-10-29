/* Inbox order, persistent SMS unread state and queued, clickable banners. */
function refreshSmsBadges(){state.smsUnread=smsUnreadCount(state);for(const app of document.querySelectorAll('[data-app="messages"]')){for(const badge of app.querySelectorAll('.app-badge'))badge.remove();if(state.smsUnread)app.insertAdjacentHTML('beforeend','<span class="app-badge">'+state.smsUnread+'</span>')}}
(function(){initializeSmsReads(state);if(campaign&&reviseSavedChat(campaign,NODES))scriptSave();
 const priorSync=syncScriptApps;syncScriptApps=function(){priorSync();refreshSmsBadges();save()};
 const priorSms=renderSMS;renderSMS=function(id){const t=state.sms.find(t=>t.id===id);if(t){state.smsSeenCounts[id]=t.messages.length;state.smsUnread=smsUnreadCount(state);save()}priorSms(id)};
 const priorList=renderSMSList;renderSMSList=function(){state.sms.sort((a,b)=>(b.messages.at(-1)?.at||0)-(a.messages.at(-1)?.at||0));priorList();for(const t of state.sms){const n=smsUnreadCount(state,t.id),el=screen.querySelector('[data-nav="sms:'+CSS.escape(t.id)+'"]');if(n&&el)el.insertAdjacentHTML('afterbegin','<span class="sms-unread-dot" aria-label="'+n+'条未读信息"></span>')}};
 const originalMessage=notifyIncoming;notifyIncoming=function(...args){const result=originalMessage(...args);refreshSmsBadges();return result};
 const originalBanner=showGameBanner;showGameBanner=function(...args){refreshSmsBadges();return originalBanner(...args)};
 const host=$('#notification-banner'),queue=[];let current=null,rendered='',timer=null,nextTimer=null;
 function draw(item){clearTimeout(timer);current=item;rendered=item.html;host.innerHTML=item.html;host.classList.add('visible');timer=setTimeout(finish,8000)}
 function finish(){clearTimeout(timer);clearTimeout(nextTimer);current=null;host.classList.remove('visible');if(queue.length)nextTimer=setTimeout(()=>{if(queue.length)draw(queue.shift())},180)}
 function observe(){if(typeof decorateNotificationIcon==='function')decorateNotificationIcon(host);clearTimeout(notifyIncoming.timer);clearTimeout(showGameBanner.timer);const button=host.querySelector('button');if(!button){current=null;queue.length=0;clearTimeout(timer);rendered='';return}const html=host.innerHTML;if(html!==rendered&&host.classList.contains('visible')){const item={html,at:Date.now(),text:button.textContent.trim()};state.bannerHistory=state.bannerHistory||[];state.bannerHistory.unshift(item);state.bannerHistory=state.bannerHistory.slice(0,40);save();if(current){if(!queue.some(x=>x.html===html))queue.push(item);rendered=current.html;host.innerHTML=current.html;host.classList.add('visible')}else draw(item)}else if(current&&!host.classList.contains('visible'))finish()}
 new MutationObserver(observe).observe(host,{childList:true,attributes:true,attributeFilter:['class']});
 host.addEventListener('click',()=>finish(),true);
 const after=afterRender;afterRender=function(...args){const result=after(...args);refreshSmsBadges();if((page==='settings'||page==='setting:notifications')&&!screen.querySelector('[data-banner-history]'))($('.page-scroll')||screen).insertAdjacentHTML('beforeend','<button class="secondary" data-banner-history>通知记录</button>');return result};
 document.addEventListener('click',e=>{if(!e.target.closest('[data-banner-history]'))return;modal('通知记录',(state.bannerHistory||[]).map(x=>'<div class="saved-notification"><small>'+new Date(x.at).toLocaleString('zh-CN')+'</small>'+x.html+'</div>').join('')||'<p>还没有新通知。</p>')});
 refreshSmsBadges();save();
})();
