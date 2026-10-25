# Deployment copies only: originals remain available for source downloads.
from PIL import Image
import os,subprocess,hashlib,json
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cache=os.path.join(root,'.media-build');os.makedirs(cache,exist_ok=True)
for p,_,files in os.walk(os.path.join(root,'assets')):
 for name in files:
  src=os.path.join(p,name);rel=os.path.relpath(src,root);dst=os.path.join(cache,rel);os.makedirs(os.path.dirname(dst),exist_ok=True)
  digest='v2-'+hashlib.sha256(open(src,'rb').read()).hexdigest();stamp=dst+'.sha'
  if os.path.isfile(stamp) and open(stamp).read()==digest:continue
  if name.endswith('.mp3') and '/story/' in src:
   subprocess.run(['ffmpeg','-v','error','-y','-i',src,'-map_metadata','-1','-ac','1','-ar','24000','-b:a','24k' if name in ['ocean.mp3','taehyung.mp3'] else '32k',dst],check=True)
  elif name.lower().endswith(('.jpg','.jpeg')):
   im=Image.open(src).convert('RGB');im.thumbnail((1024,1024));im.save(dst,quality=79,optimize=True)
  else:continue
  open(stamp,'w').write(digest)
print('Deployment media prepared; originals retained')
