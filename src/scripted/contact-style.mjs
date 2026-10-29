import {PUBLIC_CHAT_STYLE} from './public-personas.mjs';
export function contactStyle(session,actor,jinDefault){return session?.chatStyles?.[actor]??(actor==='jin'?(session?.chatStyle||jinDefault):(PUBLIC_CHAT_STYLE[actor]||'自然的朋友聊天，不套用其他联系人的关系和称呼'))}
export function saveContactStyle(session,actor,text){if(!actor||!session)return;session.chatStyles=session.chatStyles||{};session.chatStyles[actor]=String(text).slice(0,2500)}
