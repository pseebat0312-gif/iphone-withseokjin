// Reading progress is independent of the audio clock. Original prose stays intact.
export function cinemaPages(def){return def.cues.flatMap((cue,beat)=>{const pages=[];for(let i=0;i<cue.lines.length;i+=2)pages.push({title:cue.title,lines:cue.lines.slice(i,i+2),at:cue.at,beat});return pages})}
export const CINEMA_TOUCH={
 piano:[{at:.3,options:[['near','把椅子挪近一点','椅脚轻轻响了一声。他抬眼看见你坐近，嘴角便弯了一点，手上的旋律没有停'],['listen','留在原处，安静听','你没有打断。他在一个换气的间隙看向你，确认你还在听，才安心唱下去']]},{at:.72,options:[['smile','迎着他的目光笑一下','他看见你的笑，耳尖慢慢红了，低头看琴键时，嘴角却没收回去'],['quiet','不出声，陪他把歌唱完','你们的目光碰了一瞬。他没急着说话，把还没唱完的心意留在歌里']]}],
 truth:[{at:.28,options:[['name','轻轻叫一声他的名字','“嗯”他应了，却没有立刻看你。握着袖口的手慢慢松开，“我在听，你说”'],['space','给他一点说下去的空间','你没有替他把话说完。他停了一会儿，终于把藏了很久的后半句接下去']]},{at:.76,options:[['honest','告诉他：我听见了，但不能给你同样的回应','他垂下眼，点头很慢。“知道了，谢谢你没有拿别的话哄我”'],['kind','告诉他：不用急着装作没事','他用手背挡了一下眼睛，再放下时勉强笑了。“那今天先不装，下次再努力”']]}]
};
export function cinemaTouch(key,index,total){return (CINEMA_TOUCH[key]||[]).find(x=>Math.floor((total-1)*x.at)===index)}
export function restoreCinemaReader(c,def){const pages=cinemaPages(def);if(!Number.isInteger(c.readerIndex)){c.readerIndex=Math.max(0,pages.findIndex(p=>p.beat===(c.shown||0)));}c.readerIndex=Math.min(pages.length-1,Math.max(0,c.readerIndex));c.readerChoices=c.readerChoices||{};return pages}
