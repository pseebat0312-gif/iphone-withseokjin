# Deployment copies only: originals remain available for source downloads.
from PIL import Image
import os,subprocess,hashlib,json
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cache=os.path.join(root,'.media-build');os.makedirs(cache,exist_ok=True)
for p,_,files in os.walk(os.path.join(root,'assets')):
 for name in files:
  src=os.path.join(p,name);rel=os.path.relpath(src,root);dst=os.path.join(cache,rel);os.makedirs(os.path.dirname(dst),exist_ok=True)
  digest=('jpeg-webp-v1-' if name.lower().endswith(('.jpg','.jpeg')) else 'trim13-v1-' if name=='astronaut.mp3' else 'jk-slide-v2-' if name.startswith('jk-performance-') else 'v3-' if name in ['taehyung-scene.jpg','jungkook-scene.jpg'] else 'v2-')+hashlib.sha256(open(src,'rb').read()).hexdigest();stamp=dst+'.sha'
  if os.path.isfile(stamp) and open(stamp).read()==digest:continue
  if name.endswith('.mp3') and '/story/' in src:
   subprocess.run(['ffmpeg','-v','error','-y','-i',src,*(['-ss','13'] if name=='astronaut.mp3' else []),'-map_metadata','-1','-ac','1','-ar','24000','-b:a','24k' if name in ['ocean.mp3','taehyung.mp3','rainydays.mp3'] else '32k',dst],check=True)
  elif name.lower().endswith(('.jpg','.jpeg')):
   im=Image.open(src).convert('RGB');cast=name in ['taehyung-scene.jpg','jungkook-scene.jpg'];slide=name.startswith('jk-performance-');hq=name.startswith('jk-revised-');im.thumbnail((1024,1536) if hq else (440,600) if slide else (800,800) if cast else (1024,1024));im.save(dst,quality=89 if hq else 49 if slide else 72 if cast else 79,optimize=True)
   webp=dst+'.webp';im.save(webp,format='WEBP',quality=84,method=6)
   if os.path.getsize(webp)>=os.path.getsize(dst):os.remove(webp)
  else:continue
  open(stamp,'w').write(digest)
print('Deployment media prepared; originals retained')
