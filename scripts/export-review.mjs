import fs from 'node:fs';
const root=new URL('../',import.meta.url),read=p=>fs.readFileSync(new URL(p,root),'utf8');
const combined=read('dist-client-check.js');
const types={jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',mp3:'audio/mpeg',mp4:'video/mp4'};const assets={};
function scan(dir){for(const e of fs.readdirSync(new URL(dir,root),{withFileTypes:true})){const p=dir+'/'+e.name;if(e.isDirectory()){scan(p);continue}const type=types[p.split('.').at(-1)];if(type)assets['/'+p]='data:'+type+';base64,'+fs.readFileSync(new URL(p,root)).toString('base64')}}scan('assets');
let js=combined,css=read('src/style.css');for(const[path,url]of Object.entries(assets)){js=js.split(path).join(url);css=css.split(path).join(url)}
js+='\nconst REVIEW_ASSETS='+JSON.stringify(assets)+';\nofficialIcon=function(id){const name=nativeIcons[id];return name?\'<img class="official-app-icon" src="\'+REVIEW_ASSETS[\'/assets/icons/\'+name+\'.jpg\']+\'" alt="">\':\'\'};\nmusicCatalog='+read('src/catalog.json')+';\n';
const shim=`const reviewFetch=window.fetch.bind(window);window.fetch=(input,options)=>{const path=typeof input==='string'?input:input.url;if(path.startsWith('/api/'))return Promise.resolve(Response.json({ready:false,error:'此预设剧本版本无需实时模型'}, {status:path==='/api/config'?200:410}));return reviewFetch(input,options)};`;
let html=read('src/index.html').replace('<link rel="stylesheet" href="/style.css">','<style>'+css+'</style>').replace('<script src="/app.js" defer></script>','<script>'+shim+'\n'+js.replace(/<\/script/gi,'<\\/script')+'</script>');
const output=process.argv[2]||'/workspace/scratch/with-you-preset-review.html';fs.writeFileSync(output,html);console.log(output);
