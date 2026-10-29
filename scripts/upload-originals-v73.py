import concurrent.futures,getpass,hashlib,json,pathlib,urllib.request,sys
base='https://with-seokjin-phone.sacredzebra262144.chatgpt.site'
ua='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
token=getpass.getpass('Media upload token (hidden): ')
files=[p for p in pathlib.Path('assets').rglob('*') if p.suffix.lower() in ['.jpg','.jpeg','.png','.mp3'] and (not sys.argv[1:] or p.name in sys.argv[1:])]
def upload(p):
 data=p.read_bytes();req=urllib.request.Request(base+'/api/original-media/'+str(p),data=data,method='PUT',headers={'X-Media-Upload-Token':token,'Content-Type':'application/octet-stream','User-Agent':ua})
 with urllib.request.urlopen(req,timeout=60) as r:result=json.load(r)
 if result.get('bytes')!=len(data):raise RuntimeError('Size verification failed: '+str(p))
 return str(p)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 done=0
 for f in concurrent.futures.as_completed([pool.submit(upload,p) for p in files]):
  f.result();done+=1
  if done%10==0 or done==len(files):print('Uploaded',done,'/',len(files),flush=True)
for name in (sys.argv[1:] or ['afterglow-hamster-v73.jpg','afterglow-gift-v73.jpg','background-7308-v69.jpg','piano.jpg']):
 p=pathlib.Path('assets/story')/name
 with urllib.request.urlopen(urllib.request.Request(base+'/'+str(p)+'?verify=73',headers={'User-Agent':ua}),timeout=60) as r:remote=r.read()
 if hashlib.sha256(remote).digest()!=hashlib.sha256(p.read_bytes()).digest():raise RuntimeError('Original byte verification failed: '+name)
 print('Original bytes verified:',name,flush=True)
