!function(t){var e={};function i(s){if(e[s])return e[s].exports;var a=e[s]={i:s,l:!1,exports:{}};return t[s].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(s,a,function(e){return t[e]}.bind(null,a));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=2)}([function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));class s{constructor(t,e={}){this._initDone=!1;this._gradients={classic:{bgColor:"#111",colorStops:["hsl( 0, 100%, 50% )",{pos:.6,color:"hsl( 60, 100%, 50% )"},"hsl( 120, 100%, 50% )"]},prism:{bgColor:"#111",colorStops:["hsl( 0, 100%, 50% )","hsl( 60, 100%, 50% )","hsl( 120, 100%, 50% )","hsl( 180, 100%, 50% )","hsl( 240, 100%, 50% )"]},rainbow:{bgColor:"#111",dir:"h",colorStops:["hsl( 0, 100%, 50% )","hsl( 60, 100%, 50% )","hsl( 120, 100%, 50% )","hsl( 180, 100%, 47% )","hsl( 240, 100%, 58% )","hsl( 300, 100%, 50% )","hsl( 360, 100%, 50% )"]}},this._container=t||document.body,this._defaultWidth=this._container.clientWidth||640,this._defaultHeight=this._container.clientHeight||270;const i=window.AudioContext||window.webkitAudioContext;if(e.hasOwnProperty("audioCtx")){if(!(e.audioCtx instanceof i))throw new a("ERR_INVALID_AUDIO_CONTEXT","Provided audio context is not valid");this._audioCtx=e.audioCtx}else try{this._audioCtx=new i}catch(t){throw new a("ERR_AUDIO_CONTEXT_FAIL","Could not create audio context. Web Audio API not supported?")}this._analyzer=this._audioCtx.createAnalyser(),this._audioSource=e.source?this.connectAudio(e.source):void 0,this._analyzer.connect(this._audioCtx.destination),this._canvas=document.createElement("canvas"),this._canvas.style="max-width: 100%;",this._container.appendChild(this._canvas),this._canvasCtx=this._canvas.getContext("2d",{alpha:!1}),this._ledsMask=document.createElement("canvas"),this._ledsCtx=this._ledsMask.getContext("2d"),this._labels=document.createElement("canvas"),this._labelsCtx=this._labels.getContext("2d"),window.addEventListener("resize",()=>{this._width&&this._height||this._setCanvas("resize")}),this._canvas.addEventListener("fullscreenchange",()=>this._setCanvas("fschange")),this._setProperties(e,{mode:0,fftSize:8192,minFreq:20,maxFreq:22e3,smoothing:.5,gradient:"classic",minDecibels:-85,maxDecibels:-25,showBgColor:!0,showLeds:!1,showScale:!0,showPeaks:!0,showFPS:!1,lumiBars:!1,loRes:!1,lineWidth:0,fillAlpha:1,barSpace:.1,start:!0}),this._initDone=!0,this._setCanvas("create")}get barSpace(){return this._barSpace}set barSpace(t){this._barSpace=Number(t),this._calculateBarSpacePx(),this._createLedMask()}get fftSize(){return this._analyzer.fftSize}set fftSize(t){this._analyzer.fftSize=t,this._dataArray=new Uint8Array(this._analyzer.frequencyBinCount),this._precalculateBarPositions()}get gradient(){return this._gradient}set gradient(t){if(!this._gradients.hasOwnProperty(t))throw new a("ERR_UNKNOWN_GRADIENT",`Unknown gradient: '${t}'`);this._gradient=t}get height(){return this._height}set height(t){this._height=t,this._setCanvas("user")}get width(){return this._width}set width(t){this._width=t,this._setCanvas("user")}get mode(){return this._mode}set mode(t){const e=Number(t);if(!(e>=0&&e<=10&&9!=e))throw new a("ERR_INVALID_MODE",`Invalid mode: ${e}`);this._mode=e,this._precalculateBarPositions()}get loRes(){return this._loRes}set loRes(t){this._loRes=Boolean(t),this._setCanvas("lores")}get minFreq(){return this._minFreq}set minFreq(t){if(t<1)throw new a("ERR_FREQUENCY_TOO_LOW","Frequency values must be >= 1");this._minFreq=t,this._precalculateBarPositions()}get maxFreq(){return this._maxFreq}set maxFreq(t){if(t<1)throw new a("ERR_FREQUENCY_TOO_LOW","Frequency values must be >= 1");this._maxFreq=t,this._precalculateBarPositions()}get minDecibels(){return this._analyzer.minDecibels}set minDecibels(t){this._analyzer.minDecibels=t}get maxDecibels(){return this._analyzer.maxDecibels}set maxDecibels(t){this._analyzer.maxDecibels=t}get smoothing(){return this._analyzer.smoothingTimeConstant}set smoothing(t){this._analyzer.smoothingTimeConstant=t}get analyzer(){return this._analyzer}get audioCtx(){return this._audioCtx}get audioSource(){return this._audioSource}get canvas(){return this._canvas}get canvasCtx(){return this._canvasCtx}get dataArray(){return this._dataArray}get fsWidth(){return this._fsWidth}get fsHeight(){return this._fsHeight}get fps(){return this._fps}get isFullscreen(){return document.fullscreenElement?document.fullscreenElement===this._canvas:!!document.webkitFullscreenElement&&document.webkitFullscreenElement===this._canvas}get isOn(){return void 0!==this._animationReq}get pixelRatio(){return this._pixelRatio}get version(){return"2.0.0"}connectAudio(t){const e=this._audioCtx.createMediaElementSource(t);return e.connect(this._analyzer),e}registerGradient(t,e){if("string"!=typeof t||0==t.trim().length)throw new a("ERR_GRADIENT_INVALID_NAME","Gradient name must be a non-empty string");if("object"!=typeof e)throw new a("ERR_GRADIENT_NOT_AN_OBJECT","Gradient options must be an object");if(void 0===e.colorStops||e.colorStops.length<2)throw new a("ERR_GRADIENT_MISSING_COLOR","Gradient must define at least two colors");this._gradients[t]={},void 0!==e.bgColor?this._gradients[t].bgColor=e.bgColor:this._gradients[t].bgColor="#111",void 0!==e.dir&&(this._gradients[t].dir=e.dir),this._gradients[t].colorStops=e.colorStops,this._generateGradients()}setCanvasSize(t,e){this._width=t,this._height=e,this._setCanvas("user")}setFreqRange(t,e){if(t<1||e<1)throw new a("ERR_FREQUENCY_TOO_LOW","Frequency values must be >= 1");this._minFreq=Math.min(t,e),this._maxFreq=Math.max(t,e),this._precalculateBarPositions()}setOptions(t){this._setProperties(t)}setSensitivity(t,e){this._analyzer.minDecibels=Math.min(t,e),this._analyzer.maxDecibels=Math.max(t,e)}toggleAnalyzer(t){const e=this.isOn;return void 0===t&&(t=!e),e&&!t?(cancelAnimationFrame(this._animationReq),this._animationReq=void 0):!e&&t&&(this._frame=this._fps=0,this._time=performance.now(),this._animationReq=requestAnimationFrame(()=>this._draw())),this.isOn}toggleFullscreen(){this.isFullscreen?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen&&document.webkitExitFullscreen():this._canvas.requestFullscreen?this._canvas.requestFullscreen():this._canvas.webkitRequestFullscreen&&this._canvas.webkitRequestFullscreen()}_calculateBarSpacePx(){this._barSpacePx=Math.min(this._barWidth-1,this._barSpace>0&&this._barSpace<1?this._barWidth*this._barSpace:this._barSpace)}_createLedMask(){if(this._mode%10==0||!this._initDone)return;let t,e=Math.min(6,this._canvas.height/(90*this._pixelRatio)|0);switch(this._mode){case 8:e=Math.min(16,this._canvas.height/(33*this._pixelRatio)|0),t=24;break;case 7:e=Math.min(8,this._canvas.height/(67*this._pixelRatio)|0),t=48;break;case 6:t=64;break;case 5:case 4:t=80;break;case 3:t=96;break;case 2:e=Math.min(4,this._canvas.height/(135*this._pixelRatio)|0),t=128;break;case 1:e=Math.min(3,Math.max(2,this._canvas.height/(180*this._pixelRatio)|0)),t=128}e*=this._pixelRatio,t=Math.min(t,(this._canvas.height+e)/(2*e)|0),this._ledOptions={nLeds:t,spaceH:this._barWidth*(1==this._mode?.45:this._mode<5?.225:.125),spaceV:e,ledHeight:(this._canvas.height+e)/t-e};const i=Math.max(this._ledOptions.spaceH,this._barSpacePx);this._ledsMask.width|=0,this._analyzerBars.forEach(t=>this._ledsCtx.fillRect(t.posX-i/2,0,i,this._canvas.height)),this._ledsCtx.fillRect(this._analyzerBars[this._analyzerBars.length-1].posX+this._barWidth-i/2,0,i,this._canvas.height);for(let t=this._ledOptions.ledHeight;t<this._canvas.height;t+=this._ledOptions.ledHeight+this._ledOptions.spaceV)this._ledsCtx.fillRect(0,t,this._canvas.width,this._ledOptions.spaceV)}_draw(){const t=this.showLeds&&this._mode>0&&this._mode<10,e=this.lumiBars&&this._mode>0&&this._mode<10;this.showBgColor?this._canvasCtx.fillStyle=t?"#111":this._gradients[this._gradient].bgColor:this._canvasCtx.fillStyle="#000",this._canvasCtx.fillRect(0,0,this._canvas.width,this._canvas.height),this._analyzer.getByteFrequencyData(this._dataArray),this._canvasCtx.fillStyle=this._gradients[this._gradient].gradient,10==this._mode&&(this._canvasCtx.beginPath(),this._canvasCtx.moveTo(-this.lineWidth,this._canvas.height));let i,s,a=this._barWidth-(this._mode%10?Math.max(t?this._ledOptions.spaceH:0,this._barSpacePx):0);0!=this._barSpace||t||(a|=0);const n=this._analyzerBars.length;for(let h=0;h<n;h++){if(i=this._analyzerBars[h],0==i.endIdx)s=this._dataArray[i.dataIdx],i.factor&&(s+=(this._dataArray[i.dataIdx+1]-s)*i.factor);else{s=0;for(let t=i.dataIdx;t<=i.endIdx;t++)s=Math.max(s,this._dataArray[t])}e&&(this._canvasCtx.globalAlpha=s/255),s=t?(s/255*this._ledOptions.nLeds|0)*(this._ledOptions.ledHeight+this._ledOptions.spaceV)-this._ledOptions.spaceV:s/255*this._canvas.height|0,s>=i.peak&&(i.peak=s,i.hold=30,i.accel=0);let n=i.posX,r=a;10==this._mode?this._canvasCtx.lineTo(i.posX,this._canvas.height-s):(this._mode>0&&(t?n+=Math.max(this._ledOptions.spaceH/2,this._barSpacePx/2):0==this._barSpace?(n|=0,h>0&&n>this._analyzerBars[h-1].posX+a&&(n--,r++)):n+=this._barSpacePx/2),e?(this._canvasCtx.fillRect(n,0,r,this._canvas.height),this._canvasCtx.globalAlpha=1):this._canvasCtx.fillRect(n,this._canvas.height,r,-s)),i.peak>0&&(this.showPeaks&&!e&&(t?this._canvasCtx.fillRect(n,(this._ledOptions.nLeds-i.peak/(this._canvas.height+this._ledOptions.spaceV)*this._ledOptions.nLeds|0)*(this._ledOptions.ledHeight+this._ledOptions.spaceV),a,this._ledOptions.ledHeight):this._canvasCtx.fillRect(n,this._canvas.height-i.peak,r,2)),i.hold?i.hold--:(i.accel++,i.peak-=i.accel))}10==this._mode?(this._canvasCtx.lineTo(i.posX+this.lineWidth,this._canvas.height),this.lineWidth>0&&(this._canvasCtx.lineWidth=this.lineWidth,this._canvasCtx.strokeStyle=this._canvasCtx.fillStyle,this._canvasCtx.stroke()),this.fillAlpha>0&&(this._canvasCtx.globalAlpha=this.fillAlpha,this._canvasCtx.fill(),this._canvasCtx.globalAlpha=1)):t&&this._canvasCtx.drawImage(this._ledsMask,0,0),this.showScale&&this._canvasCtx.drawImage(this._labels,0,this._canvas.height-this._labels.height),this._frame++;const h=performance.now(),r=h-this._time;if(r>=1e3&&(this._fps=this._frame/(r/1e3),this._frame=0,this._time=h),this.showFPS){const t=20*this._pixelRatio;this._canvasCtx.font=`bold ${t}px sans-serif`,this._canvasCtx.fillStyle="#0f0",this._canvasCtx.textAlign="right",this._canvasCtx.fillText(Math.round(this._fps),this._canvas.width-t,2*t)}this.onCanvasDraw&&(this._canvasCtx.save(),this.onCanvasDraw(this),this._canvasCtx.restore()),this._animationReq=requestAnimationFrame(()=>this._draw())}_findFrequencyBin(t,e){let i=t*this._analyzer.fftSize/this._audioCtx.sampleRate;return["floor","ceil"].includes(e)||(e="round"),Math[e](i)}_findBinFrequency(t){return t*this._audioCtx.sampleRate/this._analyzer.fftSize}_generateGradients(){let t;Object.keys(this._gradients).forEach(e=>{t=this._gradients[e].dir&&"h"==this._gradients[e].dir?this._canvasCtx.createLinearGradient(0,0,this._canvas.width,0):this._canvasCtx.createLinearGradient(0,0,0,this._canvas.height),this._gradients[e].colorStops&&this._gradients[e].colorStops.forEach((i,s)=>{"object"==typeof i?t.addColorStop(i.pos,i.color):t.addColorStop(s/(this._gradients[e].colorStops.length-1),i)}),this._gradients[e].gradient=t})}_precalculateBarPositions(){if(!this._initDone)return;let t,e;if(this._analyzerBars=[],this._mode%10==0){this._barWidth=1,t=Math.log10(this._minFreq),e=this._canvas.width/(Math.log10(this._maxFreq)-t);const i=this._findFrequencyBin(this._minFreq,"floor"),s=Math.min(this._findFrequencyBin(this._maxFreq),this._analyzer.frequencyBinCount-1);let a=-999;for(let n=i;n<=s;n++){let i=this._findBinFrequency(n),s=Math.round(e*(Math.log10(i)-t));s>a?(this._analyzerBars.push({posX:s,dataIdx:n,endIdx:0,factor:0,peak:0,hold:0,accel:0}),a=s):this._analyzerBars.length&&(this._analyzerBars[this._analyzerBars.length-1].endIdx=n)}}else{let i;i=8==this._mode?24:7==this._mode?12:6==this._mode?8:5==this._mode?6:this._mode;const s=2**(1/24),a=440*s**-114;let n,h=[],r=0;for(;(n=a*s**r)<=this._maxFreq;)n>=this._minFreq&&r%i==0&&h.push(n),r++;t=Math.log10(h[0]),e=this._canvas.width/(Math.log10(h[h.length-1])-t),this._barWidth=this._canvas.width/h.length,this._calculateBarSpacePx();let o=0,l=-1,c=0;h.forEach((t,e)=>{const i=this._findFrequencyBin(t);let s,a;if(s=o>0&&o+1<=i?o+1:i,s==l)c++;else{if(c>1)for(let t=1;t<=c;t++)this._analyzerBars[this._analyzerBars.length-t].factor=(c-t)/c;l=s,c=1}o=a=i,void 0!==h[e+1]&&(a=this._findFrequencyBin(h[e+1]),a-i>1&&(o+=Math.round((a-i)/2)));const n=o-s>0?o:0;this._analyzerBars.push({posX:e*this._barWidth,dataIdx:s,endIdx:n,factor:0,peak:0,hold:0,accel:0})})}this._createLedMask(),this._labels.width|=0,this._labelsCtx.fillStyle="#000c",this._labelsCtx.fillRect(0,0,this._labels.width,this._labels.height),this._labelsCtx.fillStyle="#fff",this._labelsCtx.font=`${this._labels.height/2}px sans-serif`,this._labelsCtx.textAlign="center";const i=[16,31,63,125,250,500,1e3,2e3,4e3,8e3,16e3];for(const s of i)this._labelsCtx.fillText(s>=1e3?`${s/1e3}k`:s,e*(Math.log10(s)-t),.75*this._labels.height)}_setCanvas(t){this._initDone&&(this._pixelRatio=window.devicePixelRatio,this._loRes&&(this._pixelRatio/=2),this._fsWidth=Math.max(window.screen.width,window.screen.height)*this._pixelRatio,this._fsHeight=Math.min(window.screen.height,window.screen.width)*this._pixelRatio,this.isFullscreen?(this._canvas.width=this._fsWidth,this._canvas.height=this._fsHeight):(this._canvas.width=(this._width||this._container.clientWidth||this._defaultWidth)*this._pixelRatio,this._canvas.height=(this._height||this._container.clientHeight||this._defaultHeight)*this._pixelRatio),2==this._pixelRatio&&window.screen.height<=540&&(this._pixelRatio=1),this._canvasCtx.fillStyle="#000",this._canvasCtx.fillRect(0,0,this._canvas.width,this._canvas.height),this._canvasCtx.lineJoin="bevel",this._generateGradients(),this._ledsMask.width=this._canvas.width,this._ledsMask.height=this._canvas.height,this._labels.width=this._canvas.width,this._labels.height=this._pixelRatio*(this.isFullscreen?40:20),this._precalculateBarPositions(),this.onCanvasResize&&this.onCanvasResize(t,this))}_setProperties(t,e){const i=["onCanvasDraw","onCanvasResize"],s=["audioCtx","start"];e&&(t=Object.assign(e,t));for(let e of Object.keys(t))-1!==i.indexOf(e)&&"function"!=typeof t[e]?this[e]=void 0:-1===s.indexOf(e)&&(this[e]=t[e]);void 0!==t.start&&this.toggleAnalyzer(t.start)}}class a extends Error{constructor(t,e){super(e),this.name="AudioMotionError",this.code=t}}},,function(t,e,i){"use strict";i.r(e);var s=i(0);const a=[-70,-80,-85,-90,-100],n=[-10,-20,-25,-30,-40],h=document.getElementById("audio");var r,o,l=[],c=0;try{r=new(window.AudioContext||window.webkitAudioContext);for(let t=0;t<3;t++)l[t]=new s.a(document.getElementById(`container${t}`),{audioCtx:r,onCanvasDraw:d,onCanvasResize:(t,e)=>{"fschange"==t&&u()}}),0==t?o=l[0].connectAudio(h):o.connect(l[t].analyzer)}catch(t){document.getElementById("container0").innerHTML=`<p>audioMotion-analyzer failed with error: <em>${t}</em></p>`}function d(t){if(!t.showLogo)return;let e=20*t.pixelRatio;t.isFullscreen&&(e*=2);let i=Math.round(140*t.analyzer.fftSize/t.audioCtx.sampleRate);t.canvasCtx.font=`${e+t.dataArray[i]/16*t.pixelRatio}px Orbitron,sans-serif`,t.canvasCtx.fillStyle="#fff8",t.canvasCtx.textAlign="center",t.canvasCtx.fillText("audioMotion",t.canvas.width-8*e,2*e)}function _(t){let e=t.nextElementSibling;e&&"value"==e.className&&(e.innerText=t.value)}function u(){document.querySelectorAll("canvas").forEach(t=>t.classList.toggle("selected",t.parentNode.id.slice(-1)==c)),document.querySelectorAll("[data-setting]").forEach(t=>t.value=l[c][t.dataset.setting]),document.getElementById("area_options").disabled=10!=l[c].mode,document.getElementById("bar_options").disabled=0==l[c].mode||10==l[c].mode,document.getElementById("range").selectedIndex=[20,30,100].indexOf(l[c].minFreq),document.getElementById("sensitivity").value=n.indexOf(l[c].maxDecibels),document.querySelectorAll('input[type="range"]').forEach(t=>_(t)),document.querySelectorAll("button[data-prop]").forEach(t=>{let e=l[c][t.dataset.prop];t.classList.toggle("active","isOn"==t.dataset.prop?!e:e)})}document.getElementById("version").innerText=l[0].version,l[0].setOptions({mode:3,showLeds:!0,showFPS:!0,barSpace:.5,width:640,height:270}),l[0].showLogo=!0,l[1].setOptions({mode:10,gradient:"rainbow",minFreq:30,maxFreq:16e3,showScale:!1,showPeaks:!1,lineWidth:2,fillAlpha:.3,width:320,height:145}),l[1].showLogo=!1,l[2].setOptions({mode:2,gradient:"prism",minFreq:30,maxFreq:16e3,showBgColor:!1,showScale:!1,showPeaks:!1,lumiBars:!0,minDecibels:-80,maxDecibels:-20,width:320,height:145}),l[2].showLogo=!1,document.querySelectorAll('[name="analyzer"]').forEach(t=>{t.addEventListener("click",()=>{c=document.querySelector('[name="analyzer"]:checked').value,u()})}),document.querySelectorAll("canvas").forEach(t=>{t.addEventListener("click",()=>{c=t.parentNode.id.slice(-1),document.querySelector(`[name="analyzer"][value="${c}"`).checked=!0,u()})}),document.querySelectorAll("button[data-prop]").forEach(t=>{t.addEventListener("click",()=>{t.dataset.func?l[c][t.dataset.func]():l[c][t.dataset.prop]=!l[c][t.dataset.prop],t.classList.toggle("active")})}),document.querySelectorAll("[data-setting]").forEach(t=>{t.addEventListener("change",()=>{l[c][t.dataset.setting]=t.value,"mode"==t.dataset.setting&&(document.getElementById("area_options").disabled=10!=l[c].mode,document.getElementById("bar_options").disabled=0==l[c].mode||10==l[c].mode)})}),document.getElementById("range").addEventListener("change",t=>{let e=t.target[t.target.selectedIndex];l[c].setFreqRange(e.dataset.min,e.dataset.max)}),document.getElementById("sensitivity").addEventListener("change",t=>l[c].setSensitivity(a[t.target.value],n[t.target.value])),document.querySelectorAll('input[type="range"]').forEach(t=>t.addEventListener("change",()=>_(t))),document.getElementById("uploadFile").addEventListener("change",t=>function(t){let e=new FileReader;e.readAsDataURL(t.files[0]),e.onload=()=>{h.src=e.result,h.play()}}(t.target)),document.getElementById("loadFromURL").addEventListener("click",()=>{h.src=document.getElementById("remoteURL").value,h.play()}),u(),window.addEventListener("click",()=>{"suspended"==l[0].audioCtx.state&&l[0].audioCtx.resume()})}]);