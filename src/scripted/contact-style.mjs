export function contactStyle(session,actor,jinDefault){return session?.chatStyles?.[actor]??(actor==='jin'?(session?.chatStyle||jinDefault):'像熟悉的朋友自然聊天，保留自己的性格和生活，不套用其他联系人的称呼与恋爱关系。少讲大道理，接住上下文，不每句加句号')}
export function saveContactStyle(session,actor,text){if(!actor||!session)return;session.chatStyles=session.chatStyles||{};session.chatStyles[actor]=String(text).slice(0,2500)}
