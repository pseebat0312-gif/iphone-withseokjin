// Public reporting index; not an Instagram/Weverse authenticated mirror.
let newsMemory=null,newsPending=null;
const NEWS_OBJECT='public/news-index-v1.json';
const decodeXML=s=>String(s||'').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/<[^>]+>/g,'').replace(/&(amp|lt|gt|quot|apos);/g,(_,n)=>({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"}[n])).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Math.min(0x10ffff,Number(n)))).trim();
export function parseNewsFeed(xml,now=Date.now()) {if(xml.length>1200000)throw Error('feed too large');const items=[];for(const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)){const item=match[1],tag=n=>decodeXML(item.match(new RegExp('<'+n+'(?:\\s[^>]*)?>([\\s\\S]*?)</'+n+'>'))?.[1]);const title=tag('title'),url=tag('link'),published=Date.parse(tag('pubDate'));if(!title||title.length>500||!/^https:\/\//.test(url)||!Number.isFinite(published)||now-published>8*86400000||published>now+86400000)continue;items.push({title,url,source:tag('source')||'公开报道',publishedAt:new Date(published).toISOString(),kind:'媒体标题 · 未独立核验'});}return items;}
export async function publicNews(env={}) {
 const now=Date.now();if(newsMemory&&now-Date.parse(newsMemory.checkedAt)<15*60000)return newsMemory;
 if(!env.BUCKET)return {ok:false,items:[],error:'公开新闻索引在已发布服务器运行。'};
 if(newsPending)return newsPending;
 newsPending=(async()=>{let previous=newsMemory;try{if(!previous){const obj=await env.BUCKET.get(NEWS_OBJECT);if(obj)previous=await obj.json();if(previous&&now-Date.parse(previous.checkedAt)<15*60000){newsMemory=previous;return previous}}}catch{}
 const queries=[['BTS (Instagram OR Weverse) when:7d','en-US','US','US:en'],['방탄소년단 (위버스 OR 인스타그램) when:7d','ko','KR','KR:ko']];
 const results=await Promise.allSettled(queries.map(async([q,hl,gl,ceid])=>{const url='https://news.google.com/rss/search?'+new URLSearchParams({q,hl,gl,ceid});const r=await fetch(url,{headers:{Accept:'application/rss+xml, application/xml'},signal:AbortSignal.timeout(7000)});if(!r.ok)throw Error('source unavailable');return parseNewsFeed(await r.text(),now)}));
 const items=[...new Map(results.flatMap(r=>r.status==='fulfilled'?r.value:[]).map(x=>[x.title,x])).values()].sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)).slice(0,30);
 if(!items.length){if(previous&&now-Date.parse(previous.checkedAt)<2*86400000)return {...previous,stale:true,error:'本次刷新未取得新内容，以下为旧索引。'};return {ok:false,items:[],error:'暂时未取得可读取的新报道。没有生成或编造动态。'};}
 const digest={ok:true,checkedAt:new Date(now).toISOString(),items,coverage:'Google News 英语 / 韩语公开报道索引，非逐帖同步'};newsMemory=digest;try{await env.BUCKET.put(NEWS_OBJECT,JSON.stringify(digest),{httpMetadata:{contentType:'application/json'}})}catch{}return digest;
 })();try{return await newsPending}finally{newsPending=null}
}
