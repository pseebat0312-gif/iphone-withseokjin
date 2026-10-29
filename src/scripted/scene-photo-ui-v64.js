// Keep the same image element across prose beats; fade only when the photo changes.
(()=>{
 function holdPhoto(renderFn){return function(...args){const old=screen.querySelector('.scene-photo, #auto-cinema-image');const result=renderFn.apply(this,args);const next=screen.querySelector('.scene-photo, #auto-cinema-image');if(old&&next&&old!==next){if(old.getAttribute('src')===next.getAttribute('src'))next.replaceWith(old);else if(typeof old.animate==='function'){next.parentNode.insertBefore(old,next.nextSibling);Object.assign(old.style,{position:'absolute',inset:'0',width:'100%',height:'100%',pointerEvents:'none'});const fade=old.animate([{opacity:1},{opacity:0}],{duration:1800,easing:'ease-in-out',fill:'forwards'});fade.onfinish=()=>old.remove();}}return result}}
 renderLongScene=holdPhoto(renderLongScene);renderSweetDate=holdPhoto(renderSweetDate);renderCinema=holdPhoto(renderCinema);
})();
