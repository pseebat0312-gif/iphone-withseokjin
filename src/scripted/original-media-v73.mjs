export async function originalMediaApi73(request,env){
 const u=new URL(request.url),path=u.pathname.slice('/api/original-media'.length);
 if(!/^\/assets\/[a-zA-Z0-9_./-]+\.(?:jpe?g|png|mp3)$/i.test(path)||path.includes('..'))return new Response('Not found',{status:404});
 if(request.method!=='PUT')return new Response('Method not allowed',{status:405});
 if(!env.MEDIA_UPLOAD_TOKEN||request.headers.get('X-Media-Upload-Token')!==env.MEDIA_UPLOAD_TOKEN)return new Response('Unauthorized',{status:401});
 if(!env.BUCKET)return new Response('Storage unavailable',{status:503});
 const bytes=await request.arrayBuffer();if(bytes.byteLength>20*1024*1024)return new Response('Too large',{status:413});
 const sig=new Uint8Array(bytes),isMp4=sig[4]===102&&sig[5]===116&&sig[6]===121&&sig[7]===112;if(!(sig[0]===255&&sig[1]===216)&&!(sig[0]===137&&sig[1]===80)&&!(/\.mp3$/i.test(path)&&(isMp4||(sig[0]===73&&sig[1]===68&&sig[2]===51)||(sig[0]===255&&(sig[1]&224)===224))))return new Response('Invalid image',{status:400});
 await env.BUCKET.put('public-original-v73'+path,bytes,{httpMetadata:{contentType:/\.mp3$/i.test(path)?(isMp4?'audio/mp4':'audio/mpeg'):/\.png$/i.test(path)?'image/png':'image/jpeg'}});
 return Response.json({ok:true,path,bytes:bytes.byteLength});
}
export async function originalMediaGet73(request,env){
 const path=new URL(request.url).pathname;if(!/^\/assets\/[a-zA-Z0-9_./-]+\.(?:jpe?g|png|mp3)$/i.test(path)||!env.BUCKET)return null;
 const obj=await env.BUCKET.get('public-original-v73'+path);if(!obj)return null;
 const headers={'Content-Type':obj.httpMetadata?.contentType||'image/jpeg','Accept-Ranges':'bytes','Cache-Control':'public,max-age=300'};const range=request.headers.get('Range');if(range){const m=/^bytes=(\d+)-(\d*)$/.exec(range);if(!m)return new Response(null,{status:416});const start=Number(m[1]),end=m[2]?Math.min(Number(m[2]),obj.size-1):obj.size-1;if(start>=obj.size||end<start)return new Response(null,{status:416,headers:{'Content-Range':'bytes */'+obj.size}});const part=await env.BUCKET.get('public-original-v73'+path,{range:{offset:start,length:end-start+1}});return new Response(request.method==='HEAD'?null:part.body,{status:206,headers:{...headers,'Content-Length':String(end-start+1),'Content-Range':'bytes '+start+'-'+end+'/'+obj.size}})}return new Response(request.method==='HEAD'?null:obj.body,{headers:{'Content-Type':obj.httpMetadata?.contentType||'image/jpeg','Content-Length':String(obj.size),'Cache-Control':'public,max-age=300','X-Content-Type-Options':'nosniff'}});
}
