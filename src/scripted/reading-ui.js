/* Presentation-only dialogue emphasis and a non-destructive call ledger. */
(function(){
 // The full confession renderer used to consume these short nodes invisibly.
 // Carry the user's exact edited lines into their corresponding performed beat.
 const bridge={'r-arrive':0,'r-order':3,'r-door':7,'r-confess':11,'r-first-couple':12};
 for(const [id,index]of Object.entries(bridge)){const target=LONG_CHAPTERS.confession.pages[index],lines=Object.entries(REVIEWED_TEXT).filter(([path])=>path.startsWith('node/'+id+'/messages/')).map(([,text])=>text);if(lines.length)target.lines.push(...lines.filter(text=>!target.lines.includes(text)));}
 const labels=[['r-order','sugar',3,'remember'],['r-confess','yes',11,'accept'],['r-first-couple','home',19,'finish']];for(const [id,choice,index,option]of labels){const text=REVIEWED_TEXT['choice/'+id+'/'+choice+'/label'],o=LONG_CHAPTERS.confession.pages[index].options?.find(o=>o[0]===option);if(text&&o)o[1]=text}
 const previousLong=renderLongScene;renderLongScene=function(){const s=campaign?.sceneChapter;if(s?.active&&s.index===0&&!Object.hasOwn(bridge,s.node)){const p=LONG_CHAPTERS[s.key]?.pages[0];if(p){const lines=Object.entries(REVIEWED_TEXT).filter(([path])=>path.startsWith('node/'+s.node+'/messages/')).map(([,text])=>text);if(lines.length){const original=p.lines;p.lines=[...lines,...original.filter(t=>!lines.includes(t))];try{return previousLong()}finally{p.lines=original}}}}return previousLong()};

 function emphasize(){for(const p of screen.querySelectorAll('.story-scene .scene-dialogue p,.story-scene .scene-script p,.cinema-beat p,.auto-words p')){if(p.querySelector('strong,button,input'))continue;const text=p.textContent;if(p.dataset.emphasisText===text)continue;p.dataset.emphasisText=text;const re=/“[^”]*”|「[^」]*」|"[^"\n]+"/gu;let at=0,match,fragment=document.createDocumentFragment();while((match=re.exec(text))){fragment.append(document.createTextNode(text.slice(at,match.index)));const b=document.createElement('strong');b.className='scene-spoken';b.textContent=match[0];fragment.append(b);at=re.lastIndex}if(at){fragment.append(document.createTextNode(text.slice(at)));p.replaceChildren(fragment)}}}
 let scheduled=false;new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;emphasize()})}).observe(screen,{childList:true,subtree:true,characterData:true});
 const priorDial=renderDial;renderDial=function(){priorDial();const target=$('.page-scroll');if(target)target.insertAdjacentHTML('afterbegin','<button class="secondary" data-call-ledger>最近通话</button>')};
 function ledger(){const calls=(campaign?.unknownCalls||[]).slice().reverse();modal('最近通话',calls.length?calls.map(c=>`<div class="call-ledger-row"><strong>${escape(c.name||'陌生号码')}</strong><span>${c.answer===true?'已接听':c.answer===false?'已拒接':'未接来电'}</span><small>${new Date(c.at||Date.now()).toLocaleString('zh-CN')}</small>${c.answer===undefined?'<button class="secondary" data-hybrid-call="'+escape(c.id)+'">查看这通来电</button>':''}</div>`).join(''):'<p>还没有来电记录</p>');}
 document.addEventListener('click',e=>{if(!e.target.closest('[data-call-ledger]'))return;e.preventDefault();ledger()});
 emphasize();
})();
