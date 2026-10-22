(() => {
"use strict";
const RATIOS = {"16:9":{w:1200,h:675},"4:3":{w:1200,h:900},"1:1":{w:1000,h:1000},"3:2":{w:1200,h:800},"21:9":{w:1260,h:540}};
const MAX_POINTS = 10;
const STORAGE_KEY = "vectorforge.composition.v1";
const POINT_COLORS = ["#7c3aed","#2563eb","#06b6d4","#db2777","#10b981","#f59e0b","#ef4444","#8b5cf6","#14b8a6","#f43f5e"];
const PRESETS = [
{id:"aurora",name:"Sleek Aurora",caption:"Violet haze / soft crests",ratio:"16:9",background:"#040812",mesh:[{x:.18,y:.22,color:"#7c3aed",spread:72},{x:.62,y:.14,color:"#2563eb",spread:60},{x:.84,y:.42,color:"#06b6d4",spread:58},{x:.32,y:.76,color:"#4f46e5",spread:74},{x:.72,y:.82,color:"#db2777",spread:46}],wave:{frequency:3.4,amplitude:15,layers:3,smoothness:88,opacity:76,tint:"#07162e",top:false,bottom:true}},
{id:"ocean",name:"Ocean Waves",caption:"Teal depth / stacked bands",ratio:"16:9",background:"#03131b",mesh:[{x:.14,y:.26,color:"#0ea5e9",spread:70},{x:.44,y:.12,color:"#06b6d4",spread:62},{x:.72,y:.24,color:"#38bdf8",spread:58},{x:.28,y:.68,color:"#14b8a6",spread:66},{x:.66,y:.74,color:"#0f766e",spread:54}],wave:{frequency:4.6,amplitude:12,layers:4,smoothness:92,opacity:80,tint:"#032437",top:false,bottom:true}},
{id:"tech",name:"Tech Grid Mesh",caption:"Electric mesh / angular cuts",ratio:"16:9",background:"#010308",mesh:[{x:.16,y:.18,color:"#2563eb",spread:62},{x:.52,y:.10,color:"#06b6d4",spread:56},{x:.82,y:.28,color:"#7c3aed",spread:60},{x:.30,y:.72,color:"#3b82f6",spread:58},{x:.70,y:.80,color:"#22d3ee",spread:52}],wave:{frequency:3.6,amplitude:10,layers:2,smoothness:18,opacity:74,tint:"#020510",top:false,bottom:true}},
{id:"sunset",name:"Sunset Dunes",caption:"Warm horizon / smooth dunes",ratio:"4:3",background:"#12060a",mesh:[{x:.20,y:.20,color:"#fb923c",spread:74},{x:.72,y:.16,color:"#f43f5e",spread:64},{x:.86,y:.52,color:"#a855f7",spread:58},{x:.34,y:.78,color:"#ec4899",spread:68},{x:.60,y:.84,color:"#f97316",spread:52}],wave:{frequency:2.8,amplitude:18,layers:3,smoothness:90,opacity:78,tint:"#1a0610",top:false,bottom:true}},
{id:"neon",name:"Neon Horizon",caption:"Pink pulse / top and bottom",ratio:"21:9",background:"#070311",mesh:[{x:.12,y:.24,color:"#ec4899",spread:68},{x:.48,y:.18,color:"#8b5cf6",spread:60},{x:.82,y:.30,color:"#22d3ee",spread:62},{x:.26,y:.72,color:"#f43f5e",spread:56},{x:.74,y:.78,color:"#a855f7",spread:64}],wave:{frequency:3.2,amplitude:14,layers:3,smoothness:76,opacity:82,tint:"#0a0416",top:true,bottom:true}},
{id:"mint",name:"Mint Glass",caption:"Fresh mint / square frame",ratio:"1:1",background:"#03110d",mesh:[{x:.22,y:.20,color:"#34d399",spread:70},{x:.74,y:.24,color:"#14b8a6",spread:62},{x:.82,y:.72,color:"#10b981",spread:58},{x:.28,y:.76,color:"#2dd4bf",spread:66},{x:.52,y:.48,color:"#6ee7b7",spread:48}],wave:{frequency:3.8,amplitude:13,layers:3,smoothness:84,opacity:76,tint:"#031a14",top:false,bottom:true}}
];
const els = {
topbar:document.querySelector(".topbar"),
saveStatus:document.getElementById("saveStatus"),
saveStatusText:document.getElementById("saveStatusText"),
remixBtn:document.getElementById("remixBtn"),
exportTopBtn:document.getElementById("exportTopBtn"),
presetList:document.getElementById("presetList"),
compositionName:document.getElementById("compositionName"),
compositionMeta:document.getElementById("compositionMeta"),
ratioGroup:document.getElementById("ratioGroup"),
toggleHandlesBtn:document.getElementById("toggleHandlesBtn"),
addPointTopBtn:document.getElementById("addPointTopBtn"),
canvasViewport:document.getElementById("canvasViewport"),
stageShell:document.getElementById("stageShell"),
artStage:document.getElementById("artStage"),
artboardHost:document.getElementById("artboardHost"),
pointLayer:document.getElementById("pointLayer"),
footerPoints:document.getElementById("footerPoints"),
footerLayers:document.getElementById("footerLayers"),
canvasDimensions:document.getElementById("canvasDimensions"),
designTab:document.getElementById("designTab"),
exportTab:document.getElementById("exportTab"),
designPanel:document.getElementById("designPanel"),
exportPanel:document.getElementById("exportPanel"),
resetBtn:document.getElementById("resetBtn"),
blendTop:document.getElementById("blendTop"),
blendBottom:document.getElementById("blendBottom"),
blendTopCard:document.getElementById("blendTopCard"),
blendBottomCard:document.getElementById("blendBottomCard"),
waveFrequency:document.getElementById("waveFrequency"),
waveFrequencyValue:document.getElementById("waveFrequencyValue"),
waveAmplitude:document.getElementById("waveAmplitude"),
waveAmplitudeValue:document.getElementById("waveAmplitudeValue"),
layersValue:document.getElementById("layersValue"),
layersMinus:document.getElementById("layersMinus"),
layersPlus:document.getElementById("layersPlus"),
waveSmoothness:document.getElementById("waveSmoothness"),
waveSmoothnessValue:document.getElementById("waveSmoothnessValue"),
waveOpacity:document.getElementById("waveOpacity"),
waveOpacityValue:document.getElementById("waveOpacityValue"),
waveTint:document.getElementById("waveTint"),
waveTintHex:document.getElementById("waveTintHex"),
waveTintDot:document.getElementById("waveTintDot"),
baseColor:document.getElementById("baseColor"),
baseHex:document.getElementById("baseHex"),
baseColorSwatch:document.getElementById("baseColorSwatch"),
selectedPointNumber:document.getElementById("selectedPointNumber"),
removePointBtn:document.getElementById("removePointBtn"),
pointColor:document.getElementById("pointColor"),
pointHex:document.getElementById("pointHex"),
pointColorSwatch:document.getElementById("pointColorSwatch"),
pointSpread:document.getElementById("pointSpread"),
pointSpreadValue:document.getElementById("pointSpreadValue"),
pointX:document.getElementById("pointX"),
pointY:document.getElementById("pointY"),
pointsGrid:document.getElementById("pointsGrid"),
pointCount:document.getElementById("pointCount"),
addPointBtn:document.getElementById("addPointBtn"),
exportFormatList:document.getElementById("exportFormatList"),
exportCode:document.getElementById("exportCode"),
codeFilename:document.getElementById("codeFilename"),
codeMeta:document.getElementById("codeMeta"),
copyActiveBtn:document.getElementById("copyActiveBtn"),
copyActiveLabel:document.getElementById("copyActiveLabel"),
downloadSvgBtn:document.getElementById("downloadSvgBtn"),
toast:document.getElementById("toast"),
toastText:document.getElementById("toastText")
};
let state = null;
let selectedPointId = null;
let handlesVisible = true;
let activePanel = "design";
let activeExport = "svg";
let pointCounter = 0;
let dragSession = null;
let dragFrameId = null;
let exportRefreshTimer = null;
let persistTimer = null;
let toastTimer = null;
let ignoreHandleClickUntil = 0;
function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function finite(v,f){const n=Number(v);return Number.isFinite(n)?n:f}
function round(v,d=0){const f=10**d;return Math.round(v*f)/f}
function sanitizeHex(v){
 if(typeof v!=="string") return null;
 let s=v.trim();
 if(!s.startsWith("#")) s="#"+s;
 if(/^#[0-9a-f]{3}$/i.test(s)){s="#"+s.slice(1).split("").map(c=>c+c).join("")}
 if(/^#[0-9a-f]{6}$/i.test(s)) return s.toLowerCase();
 return null;
}
function hexToRgb(hex){const h=sanitizeHex(hex)||"#000000";return{r:parseInt(h.slice(1,3),16),g:parseInt(h.slice(3,5),16),b:parseInt(h.slice(5,7),16)}}
function rgba(hex,a){const {r,g,b}=hexToRgb(hex);return "rgba("+r+","+g+","+b+","+round(clamp(a,0,1),3)+")"}
function mixHex(a,b,t){const c1=hexToRgb(a),c2=hexToRgb(b);const r=Math.round(c1.r+(c2.r-c1.r)*t),g=Math.round(c1.g+(c2.g-c1.g)*t),b2=Math.round(c1.b+(c2.b-c1.b)*t);return "#"+[r,g,b2].map(v=>clamp(v,0,255).toString(16).padStart(2,"0")).join("")}
function escapeHtml(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
function n(v){return round(v,1)}
function uniquePointId(){pointCounter+=1;return "p"+pointCounter}
function createPoint(x,y,color,spread){return {id:uniquePointId(),x:clamp(x,.02,.98),y:clamp(y,.02,.98),color:sanitizeHex(color)||POINT_COLORS[pointCounter%POINT_COLORS.length],spread:clamp(finite(spread,65),20,100)}}
function normalizeWave(w){
return {
frequency:clamp(finite(w&&w.frequency,3.4),.5,8),
amplitude:clamp(finite(w&&w.amplitude,14),0,28),
layers:clamp(Math.round(finite(w&&w.layers,3)),1,5),
smoothness:clamp(finite(w&&w.smoothness,84),0,100),
opacity:clamp(finite(w&&w.opacity,76),20,100),
tint:sanitizeHex(w&&w.tint)||"#07162e",
top:Boolean(w&&w.top),
bottom:!(w&&w.bottom===false)
};
}
function createStateFromPreset(preset){
const dims=RATIOS[preset.ratio];
return {
ratio:preset.ratio,width:dims.w,height:dims.h,
background:sanitizeHex(preset.background)||"#05070d",
mesh:preset.mesh.map((p,i)=>createPoint(p.x,p.y,p.color,p.spread)),
wave:normalizeWave(preset.wave),
presetId:preset.id
};
}
function normalizeState(raw){
try{
 if(!raw||typeof raw!=="object"||!Array.isArray(raw.mesh)||!raw.mesh.length) return null;
 const ratio=RATIOS[raw.ratio]?raw.ratio:"16:9";
 const dims=RATIOS[ratio];
 const mesh=raw.mesh.slice(0,MAX_POINTS).map((p,i)=>createPoint(finite(p.x,.5),finite(p.y,.5),p.color,p.spread));
 if(!mesh.length) return null;
 const presetId=PRESETS.some(p=>p.id===raw.presetId)?raw.presetId:null;
 return {
 ratio,width:dims.w,height:dims.h,
 background:sanitizeHex(raw.background)||"#05070d",
 mesh,wave:normalizeWave(raw.wave),presetId
 };
}catch(e){return null}
}
function restoreState(){
try{
 const raw=localStorage.getItem(STORAGE_KEY);
 if(!raw) return null;
 const parsed=JSON.parse(raw);
 if(parsed&&parsed.version===1&&parsed.data) return normalizeState(parsed.data);
 return normalizeState(parsed);
}catch(e){return null}
}
function serializeState(){return {version:1,data:{ratio:state.ratio,background:state.background,mesh:state.mesh.map(p=>({x:p.x,y:p.y,color:p.color,spread:p.spread})),wave:state.wave,presetId:state.presetId}}}
function setSaveStatus(mode,text){
 els.saveStatus.dataset.state=mode;
 els.saveStatusText.textContent=text;
}
function schedulePersist(){
 setSaveStatus("saving","Saving…");
 clearTimeout(persistTimer);
 persistTimer=setTimeout(()=>{
 try{localStorage.setItem(STORAGE_KEY,JSON.stringify(serializeState()));setSaveStatus("saved","Saved locally")}
 catch(e){setSaveStatus("error","Save unavailable")}
 },360);
}
function activePreset(){return PRESETS.find(p=>p.id===state.presetId)||null}
function markCustom(){if(state.presetId!==null) state.presetId=null}
function fitStage(){
 const rect=els.canvasViewport.getBoundingClientRect();
 if(rect.width<2||rect.height<2) return;
 const compact=window.innerWidth<=900;
 const hPad=compact?24:Math.min(110,rect.width*.09);
 const vPad=compact?108:112;
 const availW=Math.max(240,rect.width-hPad);
 const availH=Math.max(180,rect.height-vPad);
 const ratio=state.width/state.height;
 let w=availW,h=w/ratio;
 if(h>availH){h=availH;w=h*ratio}
 w=Math.min(w,1080);
 els.stageShell.style.width=Math.floor(w)+"px";
 els.stageShell.style.height=Math.floor(h)+"px";
}
function showToast(message,tone){
 clearTimeout(toastTimer);
 els.toastText.textContent=message;
 els.toast.classList.remove("is-success","is-error");
 els.toast.classList.add(tone==="error"?"is-error":"is-success");
 els.toast.classList.add("is-visible");
 toastTimer=setTimeout(()=>els.toast.classList.remove("is-visible"),2200);
}
function toRgba(hex,a){return rgba(hex,a)}
function meshBackgroundLayers(config){
 const maxDim=Math.max(config.width,config.height);
 const layers=[];
 const vignette="radial-gradient(ellipse 112% 112% at 50% 38%, transparent 36%, rgba(0,0,0,.52) 100%)";
 layers.push(vignette);
 config.mesh.slice().reverse().forEach(p=>{
 const r=maxDim*(.22+clamp(p.spread,20,100)/100*.62);
 const rx=(r/config.width*100).toFixed(1);
 const ry=(r/config.height*100).toFixed(1);
 layers.push("radial-gradient(ellipse "+rx+"% "+ry+"% at "+(p.x*100).toFixed(1)+"% "+(p.y*100).toFixed(1)+"%, "+rgba(p.color,.9)+" 0%, "+rgba(p.color,.5)+" 48%, "+rgba(p.color,0)+" 100%)");
 });
 return layers;
}
function meshBackgroundStyle(config){return "background-color: "+config.background+"; background-image: "+meshBackgroundLayers(config).join(", ")+";"}
function buildWavePathSegments(points,tension){
 let out="";
 for(let i=0;i<points.length-1;i++){
 const p0=i>0?points[i-1]:points[i];
 const p1=points[i];
 const p2=points[i+1];
 const p3=i+2<points.length?points[i+2]:points[points.length-1];
 if(tension<=.01){out+=" L "+n(p2.x)+" "+n(p2.y);continue}
 const c1x=p1.x+(p2.x-p0.x)/6*tension;
 const c1y=p1.y+(p2.y-p0.y)/6*tension;
 const c2x=p2.x-(p3.x-p1.x)/6*tension;
 const c2y=p2.y-(p3.y-p1.y)/6*tension;
 out+=" C "+n(c1x)+" "+n(c1y)+" "+n(c2x)+" "+n(c2y)+" "+n(p2.x)+" "+n(p2.y);
 }
 return out;
}
function buildWaveLayers(config,side,mini){
 const wave=config.wave;
 const W=config.width,H=config.height;
 const layers=clamp(Math.round(wave.layers),1,5);
 const amp=H*clamp(wave.amplitude,0,28)/100;
 const margin=H*.12;
 const outerAvg=side==="top"?margin+amp*.5:H-margin-amp*.5;
 const available=side==="top"?Math.max(0,outerAvg-H*.045):Math.max(0,H*.955-outerAvg);
 const step=layers>1?available/layers:0;
 const direction=side==="top"?-1:1;
 const out=[];
 for(let i=0;i<layers;i++){
 const avgY=outerAvg+direction*step*i;
 const layerAmp=amp*(1-i*.07);
 const cycles=clamp(wave.frequency,.5,8)*(1+i*.015);
 const phase=(side==="top"?1.5:.4)+i*.55;
 const samples=clamp(Math.round(cycles*4)+10,12,48);
 const pts=[];
 for(let j=0;j<=samples;j++){
 const t=j/samples;
 const x=t*W;
 const signal=Math.sin(t*Math.PI*2*cycles+phase);
 const secondary=Math.sin(t*Math.PI*2*cycles*.5+phase*.6+1.2)*.12;
 const y=clamp(avgY+(signal+secondary)*layerAmp*.5,H*.02,H*.98);
 pts.push({x,y});
 }
 const segments=buildWavePathSegments(pts,wave.smoothness/100);
 const lineD="M "+n(pts[0].x)+" "+n(pts[0].y)+segments;
 const fillD="M 0 "+(side==="top"?0:H)+" L "+n(pts[0].x)+" "+n(pts[0].y)+segments+" L "+W+" "+(side==="top"?0:H)+" Z";
 const t=i/Math.max(1,layers-1);
 const fill=mixHex(wave.tint,config.background,.10+t*.42);
 const opacity=clamp(wave.opacity/100*(.94-t*.18),.15,1);
 const stroke=mixHex(wave.tint,"#ffffff",.42);
 const strokeOpacity=clamp(wave.opacity/100*.14,.04,.22);
 let markup='<path d="'+fillD+'" fill="'+fill+'" opacity="'+round(opacity,3)+'"/>';
 if(!mini){
 markup+='\n<path d="'+lineD+'" fill="none" stroke="'+stroke+'" stroke-opacity="'+round(strokeOpacity,3)+'" stroke-width="'+n(Math.max(1,W*.0012))+'"/>';
 }
 out.push(markup);
 }
 return out;
}
function buildWaveMarkup(config,options){
 options=options||{};
 const mini=!!options.mini;
 const wave=config.wave;
 let markup="";
 if(wave.top){
 const layers=buildWaveLayers(config,"top",mini);
 markup+=layers.map((m,layer)=>'<g>'+m+'</g>').join("\n");
 }
 if(wave.bottom){
 const layers=buildWaveLayers(config,"bottom",mini);
 markup+= (markup? "\n":"")+layers.map((m,layer)=>'<g>'+m+'</g>').join("\n");
 }
 return markup;
}
function generateSvg(options){
 options=options||{};
 const preview=!!options.preview;
 const w=state.width,h=state.height;
 const maxDim=Math.max(w,h);
 const blur=round(maxDim*.045,1);
 const pointGradients=state.mesh.map((p,i)=>'    <radialGradient id="vf-mesh-'+(i+1)+'" cx="50%" cy="50%" r="50%">\n      <stop offset="0%" stop-color="'+p.color+'" stop-opacity="0.94"/>\n      <stop offset="52%" stop-color="'+p.color+'" stop-opacity="0.52"/>\n      <stop offset="100%" stop-color="'+p.color+'" stop-opacity="0"/>\n    </radialGradient>').join("\n");
 const filter='    <filter id="vf-soften" x="-30%" y="-30%" width="160%" height="160%">\n      <feGaussianBlur stdDeviation="'+blur+'"/>\n    </filter>';
 const vignette='    <radialGradient id="vf-vignette" cx="50%" cy="38%" r="78%">\n      <stop offset="40%" stop-color="#000000" stop-opacity="0"/>\n      <stop offset="100%" stop-color="#000000" stop-opacity="0.58"/>\n    </radialGradient>';
 const circles=state.mesh.map((p,i)=>{
 const r=maxDim*(.22+clamp(p.spread,20,100)/100*.62);
 return '      <circle cx="'+n(p.x*w)+'" cy="'+n(p.y*h)+'" r="'+n(r)+'" fill="url(#vf-mesh-'+(i+1)+')"/>';
 }).join("\n");
 const waves=buildWaveMarkup(state,{}).split("\n").map(line=>"  "+line).join("\n");
 const defs="  <defs>\n"+pointGradients+"\n"+filter+"\n"+vignette+"\n  </defs>";
 const rootStyle=preview?' style="display:block;width:100%;height:100%"':'';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" preserveAspectRatio="xMidYMid slice" role="img" aria-label="VectorForge mesh gradient with wave dividers"'+rootStyle+'>\n'+defs+'\n  <rect width="'+w+'" height="'+h+'" fill="'+state.background+'"/>\n  <g filter="url(#vf-soften)">\n'+circles+'\n  </g>\n  <rect width="'+w+'" height="'+h+'" fill="url(#vf-vignette)"/>\n'+waves+'\n</svg>';
}
function generateOverlayMarkup(mode){
 const config=state;
 const waves=buildWaveMarkup(config,{});
 if(!waves.trim()) return "";
 const w=config.width,h=config.height;
 const rootAttrs=mode==="tailwind"
 ? ' class="pointer-events-none absolute inset-0 h-full w-full"'
 : ' style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;"';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="none" aria-hidden="true"'+rootAttrs+'>\n'+waves.split("\n").map(line=>"  "+line).join("\n")+'\n</svg>';
}
function generateTailwindMarkup(){
 const w=state.width,h=state.height;
 const layers=meshBackgroundLayers(state);
 const style="background-image: "+layers.join(", ")+";";
 const overlay=generateOverlayMarkup("tailwind");
 return '<section\n  class="relative isolate aspect-['+w+'/'+h+'] w-full overflow-hidden rounded-3xl bg-['+state.background+']"\n  role="img"\n  aria-label="VectorForge gradient artwork"\n  style="'+style+'"\n>\n'+(overlay?overlay.split("\n").map(line=>"  "+line).join("\n")+"\n":"")+'</section>';
}
function generateInlineCssMarkup(){
 const w=state.width,h=state.height;
 const layers=meshBackgroundLayers(state);
 const styleLines=[
 "position: relative;",
 "isolation: isolate;",
 "width: 100%;",
 "aspect-ratio: "+w+" / "+h+";",
 "overflow: hidden;",
 "border-radius: 24px;",
 "background-color: "+state.background+";",
 "background-image:",
 layers.map((layer,i)=>"  "+layer+(i<layers.length-1?",":";")).join("\n"),
 "background-repeat: no-repeat;"
 ];
 const style=styleLines.join("\n");
 const overlay=generateOverlayMarkup("css");
 return '<div\n  role="img"\n  aria-label="VectorForge gradient artwork"\n  style="'+style+'"\n>\n'+(overlay?overlay.split("\n").map(line=>"  "+line).join("\n")+"\n":"")+'</div>';
}
function getExportCode(format){
 if(format==="svg") return generateSvg({});
 if(format==="tailwind") return generateTailwindMarkup();
 return generateInlineCssMarkup();
}
function updateExportPanel(){
 if(activePanel!=="export") return;
 const code=getExportCode(activeExport);
 els.exportCode.textContent=code;
 els.codeFilename.textContent=activeExport==="svg"?"vectorforge.svg":activeExport==="tailwind"?"vectorforge-tailwind.html":"vectorforge-inline.html";
 els.codeMeta.textContent=(activeExport==="svg"?"SVG":activeExport==="tailwind"?"HTML":"HTML")+" · "+code.length.toLocaleString()+" chars";
 els.copyActiveLabel.textContent=activeExport==="svg"?"Copy SVG code":activeExport==="tailwind"?"Copy Tailwind code":"Copy inline CSS code";
 els.exportFormatList.querySelectorAll("[data-format-row]").forEach(row=>{
 row.classList.toggle("is-active",row.dataset.formatRow===activeExport);
 });
}
function switchPanel(panel,shouldFocus){
 activePanel=panel;
 const design=panel==="design";
 els.designPanel.hidden=!design;
 els.exportPanel.hidden=design;
 els.designPanel.classList.toggle("is-visible",design);
 els.exportPanel.classList.toggle("is-visible",!design);
 els.designTab.classList.toggle("is-active",design);
 els.exportTab.classList.toggle("is-active",!design);
 els.designTab.setAttribute("aria-selected",String(design));
 els.exportTab.setAttribute("aria-selected",String(!design));
 if(!design) updateExportPanel();
 if(shouldFocus!==false){
 (design?els.designTab:els.exportTab).focus();
 }
}
function switchExportFormat(format){
 activeExport=format;
 updateExportPanel();
}
function markCopied(button){
 if(!button) return;
 button.classList.add("is-copied");
 const label=button.querySelector("span");
 const original=label?label.textContent:"";
 if(label) label.textContent="Copied";
 clearTimeout(button._copiedTimer);
 button._copiedTimer=setTimeout(()=>{
 button.classList.remove("is-copied");
 if(label) label.textContent=original;
 },1500);
}
function copyText(text){
 return (async()=>{
 if(navigator.clipboard&&window.isSecureContext){
 try{await navigator.clipboard.writeText(text);return}
 catch(e){}
 }
 const ta=document.createElement("textarea");
 ta.value=text;
 ta.style.position="fixed";
 ta.style.left="-9999px";
 ta.style.top="0";
 ta.style.opacity="0";
 document.body.appendChild(ta);
 ta.focus();
 ta.select();
 let ok=false;
 try{ok=document.execCommand("copy")}catch(e){ok=false}
 ta.remove();
 if(!ok) throw new Error("copy failed");
 })();
}
async function copyFormat(format,button){
 const code=getExportCode(format);
 try{
 await copyText(code);
 markCopied(button);
 showToast((format==="svg"?"SVG":format==="tailwind"?"Tailwind markup":"Inline CSS")+" copied to clipboard");
 }catch(e){
 showToast("Copy failed. Select and copy manually.","error");
 }
}
function renderPresetList(){
 els.presetList.innerHTML=PRESETS.map((preset,index)=>{
 const dims=RATIOS[preset.ratio];
 const config={width:dims.w,height:dims.h,background:preset.background,mesh:preset.mesh,wave:preset.wave};
 const style="background-color: "+config.background+"; background-image: "+meshBackgroundLayers(config).join(", ")+";";
 const waves=buildWaveMarkup(config,{mini:true});
 return '<button type="button" class="preset-card" data-preset-id="'+preset.id+'" role="option" aria-selected="false" aria-label="Load '+escapeHtml(preset.name)+' preset">\n'+
 '  <span class="preset-thumb" style="'+style+'">\n'+
 '    <svg viewBox="0 0 '+dims.w+' '+dims.h+'" preserveAspectRatio="none" aria-hidden="true">'+waves+'</svg>\n'+
 '    <span class="preset-thumb-shade"></span>\n'+
 '    <span class="preset-selected-mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>\n'+
 '  </span>\n'+
 '  <span class="preset-copy">\n'+
 '    <span class="preset-row"><span class="preset-name">'+escapeHtml(preset.name)+'</span><span class="preset-ratio">'+preset.ratio+'</span></span>\n'+
 '    <span class="preset-caption">'+escapeHtml(preset.caption)+'</span>\n'+
 '  </span>\n'+
 '</button>';
 }).join("\n");
}
function updatePresetActiveState(){
 els.presetList.querySelectorAll(".preset-card").forEach(card=>{
 const active=state.presetId===card.dataset.presetId;
 card.classList.toggle("is-active",active);
 card.setAttribute("aria-selected",String(active));
 });
}
function renderPreview(){els.artboardHost.innerHTML=generateSvg({preview:true})}
function renderHandles(){
 if(!handlesVisible){els.pointLayer.classList.add("is-hidden");els.pointLayer.innerHTML="";return}
 els.pointLayer.classList.remove("is-hidden");
 els.pointLayer.innerHTML=state.mesh.map((p,i)=>{
 const selected=p.id===selectedPointId;
 return '<button type="button" class="mesh-handle'+(selected?' is-selected':'')+'" data-handle-id="'+p.id+'" style="left:'+(p.x*100).toFixed(2)+'%;top:'+(p.y*100).toFixed(2)+'%;--point-color:'+p.color+'" aria-label="Control point '+(i+1)+'" aria-pressed="'+selected+'">\n'+
 '  <span class="mesh-handle__ring"></span>\n'+
 '  <span class="mesh-handle__core"></span>\n'+
 '  <span class="mesh-handle__tag">'+(i+1)+'</span>\n'+
 '</button>';
 }).join("\n");
}
function updateHeaderMeta(){
 const preset=activePreset();
 els.compositionName.textContent=preset?preset.name:"Custom composition";
 els.compositionMeta.textContent=state.mesh.length+" points · "+state.wave.layers+" layer"+(state.wave.layers===1?"":"s");
 els.footerPoints.textContent=state.mesh.length+" point"+(state.mesh.length===1?"":"s");
 els.footerLayers.textContent=state.wave.layers+" layer"+(state.wave.layers===1?"":"s");
 els.canvasDimensions.textContent=state.width+" × "+state.height;
 document.title="VectorForge — "+(preset?preset.name:"Custom composition");
}
function setElementValue(el,value){
 if(document.activeElement===el) return;
 el.value=value;
}
function setRangeProgress(el){
 const min=parseFloat(el.min),max=parseFloat(el.max);
 const value=parseFloat(el.value);
 const pct=((value-min)/(max-min))*100;
 el.style.setProperty("--progress",clamp(pct,0,100).toFixed(1)+"%");
}
function syncControls(){
 els.ratioGroup.querySelectorAll("button[data-ratio]").forEach(btn=>{
 const active=btn.dataset.ratio===state.ratio;
 btn.classList.toggle("is-active",active);
 btn.setAttribute("aria-pressed",String(active));
 });
 els.waveFrequency.value=state.wave.frequency;
 els.waveFrequencyValue.textContent=round(state.wave.frequency,1)+"×";
 els.waveAmplitude.value=state.wave.amplitude;
 els.waveAmplitudeValue.textContent=round(state.wave.amplitude,1)+"%";
 els.layersValue.value=state.wave.layers;
 els.layersValue.textContent=state.wave.layers;
 els.waveSmoothness.value=state.wave.smoothness;
 els.waveSmoothnessValue.textContent=round(state.wave.smoothness,0)+"%";
 els.waveOpacity.value=state.wave.opacity;
 els.waveOpacityValue.textContent=round(state.wave.opacity,0)+"%";
 els.waveTint.value=state.wave.tint;
 els.waveTintHex.value=state.wave.tint.toUpperCase();
 els.waveTintDot.style.background=state.wave.tint;
 els.baseColor.value=state.background;
 els.baseHex.value=state.background.toUpperCase();
 els.baseColorSwatch.style.background=state.background;
 els.blendTop.checked=state.wave.top;
 els.blendBottom.checked=state.wave.bottom;
 els.blendTopCard.classList.toggle("is-on",state.wave.top);
 els.blendBottomCard.classList.toggle("is-on",state.wave.bottom);
 const selected=state.mesh.find(p=>p.id===selectedPointId)||state.mesh[0];
 if(!selectedPointId||!state.mesh.some(p=>p.id===selectedPointId)){selectedPointId=state.mesh[0].id}
 const sp=state.mesh.find(p=>p.id===selectedPointId);
 selectedPointId=sp.id;
 els.selectedPointNumber.textContent=String(state.mesh.indexOf(sp)+1).padStart(2,"0");
 els.pointColor.value=sp.color;
 els.pointHex.value=sp.color.toUpperCase();
 els.pointColorSwatch.style.background=sp.color;
 els.pointSpread.value=sp.spread;
 els.pointSpreadValue.textContent=round(sp.spread,0)+"%";
 setElementValue(els.pointX,Math.round(sp.x*100));
 setElementValue(els.pointY,Math.round(sp.y*100));
 els.removePointBtn.disabled=state.mesh.length<=1;
 els.addPointBtn.disabled=state.mesh.length>=MAX_POINTS;
 els.addPointTopBtn.disabled=state.mesh.length>=MAX_POINTS;
 els.pointCount.textContent=state.mesh.length+" point"+(state.mesh.length===1?"":"s");
 els.pointsGrid.querySelectorAll(".point-chip").forEach(chip=>{
 const p=state.mesh.find(x=>x.id===chip.dataset.pointId);
 chip.classList.toggle("is-active",!!p&&p.id===selectedPointId);
 });
 [els.waveFrequency,els.waveAmplitude,els.waveSmoothness,els.waveOpacity,els.pointSpread].forEach(setRangeProgress);
 els.toggleHandlesBtn.classList.toggle("is-active",handlesVisible);
 els.toggleHandlesBtn.setAttribute("aria-pressed",String(handlesVisible));
}
function renderPointChips(){
 els.pointsGrid.innerHTML=state.mesh.map((p,i)=>{
 return '<button type="button" class="point-chip'+(p.id===selectedPointId?' is-active':'')+'" data-point-id="'+p.id+'" style="--point-color:'+p.color+'" role="listitem" aria-pressed="'+(p.id===selectedPointId)+'">\n'+
 '  <span class="point-dot"></span>\n'+
 '  <span>'+String(i+1).padStart(2,"0")+'</span>\n'+
 '</button>';
 }).join("\n");
}
function selectPoint(id,options){
 options=options||{};
 const point=state.mesh.find(p=>p.id===id);
 if(!point) return;
 selectedPointId=point.id;
 if(options.renderHandles!==false) renderHandles();
 syncControls();
 renderPointChips();
 if(options.focus){
 const handle=els.pointLayer.querySelector('[data-handle-id="'+id+'"]');
 if(handle) handle.focus({preventScroll:true});
 }
}
function applyChange(options){
 options=options||{};
 markCustom();
 renderPreview();
 if(options.handles!==false) renderHandles();
 syncControls();
 renderPointChips();
 updateHeaderMeta();
 updatePresetActiveState();
 if(activePanel==="export") updateExportPanel();
 if(options.fit) fitStage();
 schedulePersist();
}
function loadPreset(id){
 const preset=PRESETS.find(p=>p.id===id);
 if(!preset) return;
 state=createStateFromPreset(preset);
 selectedPointId=state.mesh[0].id;
 renderPreview();
 renderHandles();
 renderPointChips();
 syncControls();
 updateHeaderMeta();
 updatePresetActiveState();
 if(activePanel==="export") updateExportPanel();
 fitStage();
 schedulePersist();
 showToast(preset.name+" loaded");
}
function addPoint(x,y,color){
 if(state.mesh.length>=MAX_POINTS){showToast("Maximum of "+MAX_POINTS+" control points","error");return}
 const colorChoice=color||POINT_COLORS.find(c=>!state.mesh.some(p=>p.color===c))||POINT_COLORS[state.mesh.length%POINT_COLORS.length];
 const spread=52+Math.round(Math.random()*22);
 const point=createPoint(x==null?(.18+.64*Math.random()):x,y==null?(.18+.64*Math.random()):y,colorChoice,spread);
 state.mesh.push(point);
 selectedPointId=point.id;
 markCustom();
 renderPreview();
 renderHandles();
 renderPointChips();
 syncControls();
 updateHeaderMeta();
 updatePresetActiveState();
 if(activePanel==="export") updateExportPanel();
 fitStage();
 schedulePersist();
 showToast("Control point added");
}
function removeSelectedPoint(){
 if(state.mesh.length<=1){showToast("Keep at least one control point","error");return}
 const index=state.mesh.findIndex(p=>p.id===selectedPointId);
 if(index<0) return;
 state.mesh.splice(index,1);
 selectedPointId=state.mesh[Math.min(index,state.mesh.length-1)].id;
 markCustom();
 renderPreview();
 renderHandles();
 renderPointChips();
 syncControls();
 updateHeaderMeta();
 updatePresetActiveState();
 if(activePanel==="export") updateExportPanel();
 schedulePersist();
 showToast("Control point removed");
}
function remixComposition(){
 const base=PRESETS[Math.floor(Math.random()*PRESETS.length)];
 state=createStateFromPreset(base);
 const dims=RATIOS[state.ratio];
 state.width=dims.w;state.height=dims.h;
 state.presetId=null;
 state.mesh=state.mesh.map((p,i)=>createPoint(clamp(p.x+(Math.random()-.5)*.16,.04,.96),clamp(p.y+(Math.random()-.5)*.16,.04,.96),p.color,clamp(p.spread+(Math.random()-.5)*20,24,96)));
 state.wave.frequency=clamp(state.wave.frequency+(Math.random()-.5)*2.2,.5,8);
 state.wave.amplitude=clamp(state.wave.amplitude+(Math.random()-.5)*8,0,28);
 state.wave.layers=clamp(state.wave.layers+Math.round((Math.random()-.5)*2),1,5);
 state.wave.smoothness=clamp(state.wave.smoothness+(Math.random()-.5)*30,0,100);
 state.wave.opacity=clamp(state.wave.opacity+(Math.random()-.5)*20,20,100);
 state.wave.top=Math.random()>.65;
 selectedPointId=state.mesh[0].id;
 renderPreview();
 renderHandles();
 renderPointChips();
 syncControls();
 updateHeaderMeta();
 updatePresetActiveState();
 if(activePanel==="export") updateExportPanel();
 fitStage();
 schedulePersist();
 showToast("Composition remixed");
}
function handleStageDoubleClick(event){
 if(event.target.closest(".mesh-handle")) return;
 const rect=els.artStage.getBoundingClientRect();
 const x=clamp((event.clientX-rect.left)/rect.width,.02,.98);
 const y=clamp((event.clientY-rect.top)/rect.height,.02,.98);
 addPoint(x,y,null);
}
function startPointDrag(event){
 const handle=event.target.closest(".mesh-handle");
 if(!handle||!handlesVisible) return;
 if(event.button!==0&&event.pointerType==="mouse") return;
 const point=state.mesh.find(p=>p.id===handle.dataset.handleId);
 if(!point) return;
 event.preventDefault();
 event.stopPropagation();
selectPoint(point.id,{renderHandles:false});
els.pointLayer.querySelectorAll(".mesh-handle").forEach(h=>{
h.classList.toggle("is-selected",h.dataset.handleId===point.id);
h.setAttribute("aria-pressed",String(h.dataset.handleId===point.id));
});
 dragSession={pointerId:event.pointerId,pointId:point.id,moved:false,handle,rect,markedCustom:false};
 try{handle.setPointerCapture(event.pointerId)}catch(e){}
 els.artStage.classList.add("is-dragging");
 window.addEventListener("pointermove",movePointDrag,{passive:false});
 window.addEventListener("pointerup",endPointDrag);
 window.addEventListener("pointercancel",endPointDrag);
}
function movePointDrag(event){
 if(!dragSession||event.pointerId!==dragSession.pointerId) return;
 event.preventDefault();
 const x=clamp((event.clientX-dragSession.rect.left)/dragSession.rect.width,.02,.98);
 const y=clamp((event.clientY-dragSession.rect.top)/dragSession.rect.height,.02,.98);
 const point=state.mesh.find(p=>p.id===dragSession.pointId);
 if(!point) return;
 if(!dragSession.moved&&(Math.abs(x-point.x)>.003||Math.abs(y-point.y)>.003)) dragSession.moved=true;
 point.x=x;point.y=y;
 if(dragSession.moved&&!dragSession.markedCustom){
 dragSession.markedCustom=true;
 markCustom();
 updateHeaderMeta();
 updatePresetActiveState();
 }
 dragSession.handle.style.left=(x*100).toFixed(2)+"%";
 dragSession.handle.style.top=(y*100).toFixed(2)+"%";
 els.pointX.value=Math.round(x*100);
 els.pointY.value=Math.round(y*100);
 if(dragFrameId===null) dragFrameId=requestAnimationFrame(()=>{dragFrameId=null;renderPreview()});
 if(activePanel==="export") scheduleExportRefresh(120);
}
function endPointDrag(event){
 if(!dragSession||event.pointerId!==dragSession.pointerId) return;
 const moved=dragSession.moved;
 try{dragSession.handle.releasePointerCapture(event.pointerId)}catch(e){}
 window.removeEventListener("pointermove",movePointDrag);
 window.removeEventListener("pointerup",endPointDrag);
 window.removeEventListener("pointercancel",endPointDrag);
 cancelAnimationFrame(dragFrameId);
 dragFrameId=null;
 renderPreview();
 if(moved){
 markCustom();
 syncControls();
 renderPointChips();
 updateHeaderMeta();
 updatePresetActiveState();
 if(activePanel==="export") updateExportPanel();
 schedulePersist();
 renderHandles();
 }else{
 els.pointLayer.querySelectorAll(".mesh-handle").forEach(handle=>{
 handle.classList.toggle("is-selected",handle.dataset.handleId===selectedPointId);
 });
 syncControls();
 renderPointChips();
 }
 els.artStage.classList.remove("is-dragging");
 ignoreHandleClickUntil=performance.now()+260;
 dragSession=null;
}
function scheduleExportRefresh(delay){
 clearTimeout(exportRefreshTimer);
 exportRefreshTimer=setTimeout(()=>{if(activePanel==="export") updateExportPanel()},delay);
}
function handleHandleKeydown(event){
 const handle=event.target.closest(".mesh-handle");
 if(!handle) return;
 const point=state.mesh.find(p=>p.id===handle.dataset.handleId);
 if(!point) return;
 if(event.key==="Delete"||event.key==="Backspace"){
 event.preventDefault();
 removeSelectedPoint();
 return;
 }
 if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(event.key)) return;
 event.preventDefault();
 const step=event.shiftKey?.05:.01;
 if(event.key==="ArrowLeft") point.x=clamp(point.x-step,.02,.98);
 if(event.key==="ArrowRight") point.x=clamp(point.x+step,.02,.98);
 if(event.key==="ArrowUp") point.y=clamp(point.y-step,.02,.98);
 if(event.key==="ArrowDown") point.y=clamp(point.y+step,.02,.98);
 markCustom();
 renderPreview();
 handle.style.left=(point.x*100).toFixed(2)+"%";
 handle.style.top=(point.y*100).toFixed(2)+"%";
 syncControls();
 renderPointChips();
 updateHeaderMeta();
 updatePresetActiveState();
 if(activePanel==="export") updateExportPanel();
 schedulePersist();
}
function handleHandleFocus(event){
 const handle=event.target.closest(".mesh-handle");
 if(!handle) return;
 const point=state.mesh.find(p=>p.id===handle.dataset.handleId);
 if(!point||point.id===selectedPointId) return;
 selectedPointId=point.id;
 els.pointLayer.querySelectorAll(".mesh-handle").forEach(h=>{
 h.classList.toggle("is-selected",h.dataset.handleId===selectedPointId);
 h.setAttribute("aria-pressed",String(h.dataset.handleId===selectedPointId));
 });
 syncControls();
 renderPointChips();
}
function handleHandleClick(event){
 const handle=event.target.closest(".mesh-handle");
 if(!handle) return;
 if(performance.now()<ignoreHandleClickUntil) return;
 const point=state.mesh.find(p=>p.id===handle.dataset.handleId);
 if(!point) return;
 if(point.id!==selectedPointId) selectPoint(point.id,{renderHandles:false});
}
function bindEvents(){
 els.presetList.addEventListener("click",event=>{
 const card=event.target.closest(".preset-card");
 if(!card) return;
 loadPreset(card.dataset.presetId);
 });
 els.ratioGroup.addEventListener("click",event=>{
 const button=event.target.closest("button[data-ratio]");
 if(!button) return;
 const ratio=button.dataset.ratio;
 if(!RATIOS[ratio]||ratio===state.ratio) return;
 state.ratio=ratio;
 state.width=RATIOS[ratio].w;
 state.height=RATIOS[ratio].h;
 applyChange({fit:true});
 });
 els.toggleHandlesBtn.addEventListener("click",()=>{
 handlesVisible=!handlesVisible;
 renderHandles();
 syncControls();
 });
 els.addPointTopBtn.addEventListener("click",()=>addPoint());
 els.addPointBtn.addEventListener("click",()=>addPoint());
 els.resetBtn.addEventListener("click",()=>{
 const preset=activePreset();
 if(preset){loadPreset(preset.id)}
 else{loadPreset(PRESETS[0].id)}
 });
 els.remixBtn.addEventListener("click",remixComposition);
 els.exportTopBtn.addEventListener("click",()=>{
 switchPanel("export");
 if(window.innerWidth<=900) els.inspector.scrollIntoView({behavior:"smooth",block:"start"});
 });
 els.designTab.addEventListener("click",()=>switchPanel("design"));
 els.exportTab.addEventListener("click",()=>switchPanel("export"));
 els.designTab.addEventListener("keydown",event=>{
 if(event.key==="ArrowRight"){event.preventDefault();els.exportTab.focus()}
 });
 els.exportTab.addEventListener("keydown",event=>{
 if(event.key==="ArrowLeft"){event.preventDefault();els.designTab.focus()}
 });
 els.blendTop.addEventListener("change",()=>{state.wave.top=els.blendTop.checked;applyChange({handles:false})});
 els.blendBottom.addEventListener("change",()=>{state.wave.bottom=els.blendBottom.checked;applyChange({handles:false})});
 els.waveFrequency.addEventListener("input",()=>{state.wave.frequency=parseFloat(els.waveFrequency.value);applyChange({handles:false})});
 els.waveAmplitude.addEventListener("input",()=>{state.wave.amplitude=parseFloat(els.waveAmplitude.value);applyChange({handles:false})});
 els.layersMinus.addEventListener("click",()=>{state.wave.layers=clamp(state.wave.layers-1,1,5);applyChange({handles:false})});
 els.layersPlus.addEventListener("click",()=>{state.wave.layers=clamp(state.wave.layers+1,1,5);applyChange({handles:false})});
 els.waveSmoothness.addEventListener("input",()=>{state.wave.smoothness=parseFloat(els.waveSmoothness.value);applyChange({handles:false})});
 els.waveOpacity.addEventListener("input",()=>{state.wave.opacity=parseFloat(els.waveOpacity.value);applyChange({handles:false})});
 els.waveTint.addEventListener("input",()=>{state.wave.tint=els.waveTint.value;applyChange({handles:false})});
 els.waveTintHex.addEventListener("change",()=>{const h=sanitizeHex(els.waveTintHex.value);if(h){state.wave.tint=h;applyChange({handles:false})}else{syncControls()}});
 els.baseColor.addEventListener("input",()=>{state.background=els.baseColor.value;applyChange({handles:false})});
 els.baseHex.addEventListener("change",()=>{const h=sanitizeHex(els.baseHex.value);if(h){state.background=h;applyChange({handles:false})}else{syncControls()}});
 els.pointColor.addEventListener("input",()=>{const p=state.mesh.find(x=>x.id===selectedPointId);if(!p)return;p.color=els.pointColor.value;applyChange({handles:true})});
 els.pointHex.addEventListener("change",()=>{const p=state.mesh.find(x=>x.id===selectedPointId);if(!p)return;const h=sanitizeHex(els.pointHex.value);if(h){p.color=h;applyChange({handles:true})}else{syncControls()}});
 els.pointSpread.addEventListener("input",()=>{const p=state.mesh.find(x=>x.id===selectedPointId);if(!p)return;p.spread=parseFloat(els.pointSpread.value);applyChange({handles:true})});
 els.pointX.addEventListener("change",()=>{const p=state.mesh.find(x=>x.id===selectedPointId);if(!p)return;const v=clamp(parseFloat(els.pointX.value)/100,.02,.98);if(Number.isFinite(v)){p.x=v;applyChange({handles:true})}else{syncControls()}});
 els.pointY.addEventListener("change",()=>{const p=state.mesh.find(x=>x.id===selectedPointId);if(!p)return;const v=clamp(parseFloat(els.pointY.value)/100,.02,.98);if(Number.isFinite(v)){p.y=v;applyChange({handles:true})}else{syncControls()}});
 els.removePointBtn.addEventListener("click",removeSelectedPoint);
 els.pointsGrid.addEventListener("click",event=>{
 const chip=event.target.closest(".point-chip");
 if(!chip) return;
 selectPoint(chip.dataset.pointId,{renderHandles:true});
 });
 els.artStage.addEventListener("dblclick",handleStageDoubleClick);
 els.pointLayer.addEventListener("pointerdown",startPointDrag);
 els.pointLayer.addEventListener("click",handleHandleClick);
 els.pointLayer.addEventListener("focusin",handleHandleFocus);
 els.pointLayer.addEventListener("keydown",handleHandleKeydown);
 els.exportFormatList.addEventListener("click",event=>{
 const copyBtn=event.target.closest("[data-copy-format]");
 if(copyBtn){
 event.stopPropagation();
 const format=copyBtn.dataset.copyFormat;
 switchExportFormat(format);
 copyFormat(format,copyBtn);
 return;
 }
 const selectBtn=event.target.closest("[data-format-select]");
 if(selectBtn){
 switchExportFormat(selectBtn.dataset.formatSelect);
 }
 });
 els.copyActiveBtn.addEventListener("click",()=>copyFormat(activeExport,els.copyActiveBtn));
 els.downloadSvgBtn.addEventListener("click",()=>{
 const code=generateSvg({});
 const blob=new Blob([code],{type:"image/svg+xml;charset=utf-8"});
 const url=URL.createObjectURL(blob);
 const a=document.createElement("a");
 a.href=url;
 a.download="vectorforge-"+(activePreset()?activePreset().id:"custom")+".svg";
 document.body.appendChild(a);
 a.click();
 a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1200);
 showToast("SVG downloaded");
 });
 const resizeObserver=new ResizeObserver(()=>fitStage());
 resizeObserver.observe(els.canvasViewport);
 window.addEventListener("resize",fitStage);
}
const saved=restoreState();
if(saved){
 state=saved;
 selectedPointId=state.mesh[0].id;
 setSaveStatus("saved","Restored locally");
}else{
 state=createStateFromPreset(PRESETS[0]);
 selectedPointId=state.mesh[0].id;
}
renderPresetList();
bindEvents();
renderPreview();
renderHandles();
renderPointChips();
syncControls();
updateHeaderMeta();
updatePresetActiveState();
fitStage();
requestAnimationFrame(fitStage);
schedulePersist();
})();
