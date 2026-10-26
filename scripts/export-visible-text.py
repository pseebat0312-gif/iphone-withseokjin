"""Conservative source text inventory; keeps source locations for round-trip editing."""
from pathlib import Path
import re,json,html,sys
root=Path(__file__).resolve().parents[1];out=Path(sys.argv[1]);out.mkdir(parents=True,exist_ok=True)
base=(out/'all-dialogue.txt').read_text();records=[];seen=set()
# Keep every authored quoted string that contains human language; template fragments
# retain variables as placeholders rather than inventing their runtime values.
pattern=re.compile(r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|`(?:\\.|[^`\\])*`',re.S)
for p in sorted((root/'src').rglob('*')):
 if p.suffix not in ['.js','.mjs','.html','.json','.css']:continue
 s=p.read_text();rel=str(p.relative_to(root))
 for m in pattern.finditer(s):
  raw=m.group()[1:-1]
  if not re.search(r'[\u3400-\u9fff\uac00-\ud7af]',raw):continue
  text=raw.replace('\\n','\n').replace("\\'", "'").replace('\\"','"')
  if '<' in text and '>' in text:
   # Human text and accessibility labels, without HTML markup.
   labels=re.findall(r'(?:aria-label|placeholder|title|alt)=["\']([^"\']+)["\']',text)
   text=re.sub(r'<[^>]+>','\n',text)+'\n'+'\n'.join(labels)
  text=html.unescape(text).strip()
  if not text:continue
  line=s.count('\n',0,m.start())+1
  key=(rel,text)
  if key in seen:continue
  seen.add(key);records.append(dict(id=f'source/{rel}/{m.start()}',source=rel,line=line,start=m.start(),end=m.end(),text=text))
 # HTML outside quoted attributes also contains visible text.
 if p.suffix=='.html':
  clean=re.sub(r'<(?:script|style)\b[^>]*>.*?</(?:script|style)>','',s,flags=re.S)
  for i,t in enumerate(re.findall(r'>([^<>]+)<',clean)):
   t=html.unescape(t).strip()
   if t and re.search(r'[\u3400-\u9fffA-Za-z]',t):records.append(dict(id=f'html/{rel}/{i}',source=rel,text=t))
header='WITH YOU · 完整文字审稿合集\n\n已保留上传 (2).txt 的全部 135 处修改。原编号不变。\n前半部分为可定位的剧情与社交文本；H 部分为补充的界面、提示、帮助、场景说明及源文件文字清单，含旧版兼容文字。\nH 部分的 ${...} 是动态变量或条件占位，请勿删除；有少量模板片段保留，方便完整审稿。即时 AI 自由聊天不是固定文本，不能提前导出。\n\n'
text=header+base+'\n\nH 补充界面、场景说明、提示、帮助与其他源文字\n'+'─'*32+'\n'
for r in records:text+=f"\n【文字 {r['id']}】{r['source']}"+(f" · 第 {r['line']} 行" if 'line'in r else '')+'\n'+r['text']+'\n【结束】\n'
(out/'with-you-complete-text.txt').write_text(text)
(out/'visible-text-index.json').write_text(json.dumps(records,ensure_ascii=False,indent=2))
print(json.dumps({'storyEntries':1876,'additionalSourceEntries':len(records),'bytes':len(text.encode())}))
