// Allocate the remaining audio by authored line length. No cuts, text omissions or playback-rate changes.
export function authoredLineWeight88(text){return 9+Array.from(String(text)).length+2*(String(text).match(/[，。！？；…,.!?]/gu)||[]).length}
export function authoredLineScreens88(lines){return lines.flatMap(t=>String(t).split(/\n|（换页）/u)).map(t=>t.trim()).filter(Boolean)}
export function authoredReadingDelay88(lines,index,remainingSeconds){const weights=lines.slice(index).map(authoredLineWeight88),total=weights.reduce((a,b)=>a+b,0);return total>0?Math.max(0,remainingSeconds)*1000*weights[0]/total:0}

export function readingDwell90(text){return Math.min(2500,Math.max(1300,1050+Array.from(String(text)).length*30))}
