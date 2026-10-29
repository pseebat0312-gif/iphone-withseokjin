// A fresh document or restored browser page always requires the phone code.
(()=>{let authenticated=false;const priorNavigate=navigate,priorHome=enterHome;
 navigate=function(next){if(next==='lock'){authenticated=false;pass=''}if(!authenticated&&!['lock','passcode'].includes(next))next='passcode';return priorNavigate(next)};
 enterHome=function(){authenticated=true;return priorHome()};
 unlock=function(){pass='';if(!/^\d{4}$/.test(state.passcode||'')){state.passcode='1204';save()}navigate('passcode')};
 window.addEventListener('pageshow',e=>{if(e.persisted)navigate('lock')});
})();
// Separate continuous weather bus: music retains its own player and position.
(()=>{let ctx,bus,sources=[],weather='',fade;
 function stop(){weather='';if(bus&&ctx){bus.gain.cancelScheduledValues(ctx.currentTime);bus.gain.setTargetAtTime(0,ctx.currentTime,.35)}clearTimeout(fade);const old=sources;sources=[];fade=setTimeout(()=>old.forEach(s=>{try{s.stop()}catch{}}),1500)}
 function update(){const s=campaign?.sceneChapter,d=campaign?.sweetDate;let text='';if(page==='story-scene'&&s?.active)text=LONG_CHAPTERS[s.key]?.pages.map(p=>p.lines.join(' ')).join(' ')||'';else if(page==='story-scene'&&d?.active)text=SWEET_DATES[d.key]?.[d.variant]?.pages.map(p=>p.lines.join(' ')).join(' ')||'';
 const type=(/雨|淋湿/.test(text)?'rain':'')+(/海风|夜风|风吹|背风|迎风|风大/.test(text)?'wind':'');
 if(!type){if(weather)stop();return}if(weather===type){if(bus)bus.gain.setTargetAtTime(campaign?.media?.muted?0:.075,ctx.currentTime,.3);return}stop();try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();ctx.resume().catch(()=>{});bus=ctx.createGain();bus.gain.value=0;bus.connect(ctx.destination);weather=type;for(const kind of ['rain','wind'])if(type.includes(kind)){const b=ctx.createBuffer(1,ctx.sampleRate*4,ctx.sampleRate),a=b.getChannelData(0);let smooth=0;for(let i=0;i<a.length;i++){const n=Math.random()*2-1;smooth=.985*smooth+.015*n;a[i]=kind==='wind'?smooth*8:n*.45}const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter();source.buffer=b;source.loop=true;filter.type=kind==='rain'?'lowpass':'lowpass';filter.frequency.value=kind==='rain'?2400:450;source.connect(filter);filter.connect(bus);source.start();sources.push(source)}bus.gain.setTargetAtTime(campaign?.media?.muted?0:.075,ctx.currentTime,.6)}catch{weather=''}}
 const old=render;render=function(){old();update()};const oldLong=renderLongScene;renderLongScene=function(){oldLong();update()};const oldSweet=renderSweetDate;renderSweetDate=function(){oldSweet();update()};document.addEventListener('click',()=>{if(ctx?.state==='suspended')ctx.resume().catch(()=>{});update()});window.addEventListener('pagehide',stop);
})();
