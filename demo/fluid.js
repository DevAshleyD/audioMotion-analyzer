!function(t){var e={};function i(s){if(e[s])return e[s].exports;var a=e[s]={i:s,l:!1,exports:{}};return t[s].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(s,a,function(e){return t[e]}.bind(null,a));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));class s{constructor(t,e={}){this._initDone=!1;this._gradients={classic:{bgColor:"#111",colorStops:["hsl( 0, 100%, 50% )",{pos:.6,color:"hsl( 60, 100%, 50% )"},"hsl( 120, 100%, 50% )"]},prism:{bgColor:"#111",colorStops:["hsl( 0, 100%, 50% )","hsl( 60, 100%, 50% )","hsl( 120, 100%, 50% )","hsl( 180, 100%, 50% )","hsl( 240, 100%, 50% )"]},rainbow:{bgColor:"#111",dir:"h",colorStops:["hsl( 0, 100%, 50% )","hsl( 60, 100%, 50% )","hsl( 120, 100%, 50% )","hsl( 180, 100%, 47% )","hsl( 240, 100%, 58% )","hsl( 300, 100%, 50% )","hsl( 360, 100%, 50% )"]}},this._container=t||document.body,this._defaultWidth=this._container.clientWidth||640,this._defaultHeight=this._container.clientHeight||270;const i=window.AudioContext||window.webkitAudioContext;if(e.hasOwnProperty("audioCtx")){if(!(e.audioCtx instanceof i))throw new a("ERR_INVALID_AUDIO_CONTEXT","Provided audio context is not valid");this._audioCtx=e.audioCtx}else try{this._audioCtx=new i}catch(t){throw new a("ERR_AUDIO_CONTEXT_FAIL","Could not create audio context. Web Audio API not supported?")}this._analyzer=this._audioCtx.createAnalyser(),this._audioSource=e.source?this.connectAudio(e.source):void 0,this._analyzer.connect(this._audioCtx.destination),this._canvas=document.createElement("canvas"),this._canvas.style="max-width: 100%;",this._container.appendChild(this._canvas),this._canvasCtx=this._canvas.getContext("2d"),this._ledsMask=document.createElement("canvas"),this._ledsCtx=this._ledsMask.getContext("2d"),this._labels=document.createElement("canvas"),this._labelsCtx=this._labels.getContext("2d"),window.addEventListener("resize",()=>{this._width&&this._height||this._setCanvas("resize")}),this._canvas.addEventListener("fullscreenchange",()=>this._setCanvas("fschange")),this._setProperties(e,{mode:0,fftSize:8192,minFreq:20,maxFreq:22e3,smoothing:.5,gradient:"classic",minDecibels:-85,maxDecibels:-25,showBgColor:!0,showLeds:!1,showScale:!0,showPeaks:!0,showFPS:!1,lumiBars:!1,loRes:!1,reflexRatio:0,reflexAlpha:.15,reflexBright:1,reflexFit:!0,lineWidth:0,fillAlpha:1,barSpace:.1,overlay:!1,bgAlpha:.7,radial:!1,start:!0}),this._initDone=!0,this._setCanvas("create")}get barSpace(){return this._barSpace}set barSpace(t){this._barSpace=Number(t),this._calculateBarSpacePx(),this._createLedMask()}get fftSize(){return this._analyzer.fftSize}set fftSize(t){this._analyzer.fftSize=t,this._dataArray=new Uint8Array(this._analyzer.frequencyBinCount),this._precalculateBarPositions()}get gradient(){return this._gradient}set gradient(t){if(!this._gradients.hasOwnProperty(t))throw new a("ERR_UNKNOWN_GRADIENT",`Unknown gradient: '${t}'`);this._gradient=t}get height(){return this._height}set height(t){this._height=t,this._setCanvas("user")}get width(){return this._width}set width(t){this._width=t,this._setCanvas("user")}get mode(){return this._mode}set mode(t){const e=Number(t);if(!(e>=0&&e<=10&&9!=e))throw new a("ERR_INVALID_MODE","Invalid mode: "+e);this._mode=e,this._precalculateBarPositions(),this._reflexRatio>0&&this._generateGradients()}get loRes(){return this._loRes}set loRes(t){this._loRes=Boolean(t),this._setCanvas("lores")}get lumiBars(){return this._lumiBars}set lumiBars(t){this._lumiBars=Boolean(t),this._reflexRatio>0&&(this._generateGradients(),this._createLedMask())}get reflexRatio(){return this._reflexRatio}set reflexRatio(t){if((t=Number(t))<0||t>=1)throw new a("ERR_REFLEX_OUT_OF_RANGE","Reflex ratio must be >= 0 and < 1");this._reflexRatio=t,this._generateGradients(),this._createLedMask()}get minFreq(){return this._minFreq}set minFreq(t){if(t<1)throw new a("ERR_FREQUENCY_TOO_LOW","Frequency values must be >= 1");this._minFreq=t,this._precalculateBarPositions()}get maxFreq(){return this._maxFreq}set maxFreq(t){if(t<1)throw new a("ERR_FREQUENCY_TOO_LOW","Frequency values must be >= 1");this._maxFreq=t,this._precalculateBarPositions()}get minDecibels(){return this._analyzer.minDecibels}set minDecibels(t){this._analyzer.minDecibels=t}get maxDecibels(){return this._analyzer.maxDecibels}set maxDecibels(t){this._analyzer.maxDecibels=t}get smoothing(){return this._analyzer.smoothingTimeConstant}set smoothing(t){this._analyzer.smoothingTimeConstant=t}get analyzer(){return this._analyzer}get audioCtx(){return this._audioCtx}get audioSource(){return this._audioSource}get canvas(){return this._canvas}get canvasCtx(){return this._canvasCtx}get dataArray(){return this._dataArray}get fsWidth(){return this._fsWidth}get fsHeight(){return this._fsHeight}get fps(){return this._fps}get isFullscreen(){return document.fullscreenElement?document.fullscreenElement===this._canvas:!!document.webkitFullscreenElement&&document.webkitFullscreenElement===this._canvas}get isOn(){return void 0!==this._animationReq}get pixelRatio(){return this._pixelRatio}get version(){return"2.4.0-dev"}connectAudio(t){const e=this._audioCtx.createMediaElementSource(t);return e.connect(this._analyzer),e}binToFreq(t){return t*this._audioCtx.sampleRate/this._analyzer.fftSize}freqToBin(t,e){["floor","ceil"].includes(e)||(e="round");const i=Math[e](t*this._analyzer.fftSize/this._audioCtx.sampleRate);return i<this._analyzer.frequencyBinCount?i:this._analyzer.frequencyBinCount-1}registerGradient(t,e){if("string"!=typeof t||0==t.trim().length)throw new a("ERR_GRADIENT_INVALID_NAME","Gradient name must be a non-empty string");if("object"!=typeof e)throw new a("ERR_GRADIENT_NOT_AN_OBJECT","Gradient options must be an object");if(void 0===e.colorStops||e.colorStops.length<2)throw new a("ERR_GRADIENT_MISSING_COLOR","Gradient must define at least two colors");this._gradients[t]={},void 0!==e.bgColor?this._gradients[t].bgColor=e.bgColor:this._gradients[t].bgColor="#111",void 0!==e.dir&&(this._gradients[t].dir=e.dir),this._gradients[t].colorStops=e.colorStops,this._generateGradients()}setCanvasSize(t,e){this._width=t,this._height=e,this._setCanvas("user")}setFreqRange(t,e){if(t<1||e<1)throw new a("ERR_FREQUENCY_TOO_LOW","Frequency values must be >= 1");this._minFreq=Math.min(t,e),this._maxFreq=Math.max(t,e),this._precalculateBarPositions()}setOptions(t){this._setProperties(t)}setSensitivity(t,e){this._analyzer.minDecibels=Math.min(t,e),this._analyzer.maxDecibels=Math.max(t,e)}toggleAnalyzer(t){const e=this.isOn;return void 0===t&&(t=!e),e&&!t?(cancelAnimationFrame(this._animationReq),this._animationReq=void 0):!e&&t&&(this._frame=this._fps=0,this._time=performance.now(),this._animationReq=requestAnimationFrame(t=>this._draw(t))),this.isOn}toggleFullscreen(){this.isFullscreen?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen&&document.webkitExitFullscreen():this._canvas.requestFullscreen?this._canvas.requestFullscreen():this._canvas.webkitRequestFullscreen&&this._canvas.webkitRequestFullscreen()}_calculateBarSpacePx(){this._barSpacePx=Math.min(this._barWidth-1,this._barSpace>0&&this._barSpace<1?this._barWidth*this._barSpace:this._barSpace)}_createLedMask(){if(this._mode%10==0||!this._initDone)return;const t=this._lumiBars?this._canvas.height:this._canvas.height*(1-this._reflexRatio)|0;let e,i=Math.min(6,t/(90*this._pixelRatio)|0);switch(this._mode){case 8:i=Math.min(16,t/(33*this._pixelRatio)|0),e=24;break;case 7:i=Math.min(8,t/(67*this._pixelRatio)|0),e=48;break;case 6:e=64;break;case 5:case 4:e=80;break;case 3:e=96;break;case 2:i=Math.min(4,t/(135*this._pixelRatio)|0),e=128;break;case 1:i=Math.min(3,Math.max(2,t/(180*this._pixelRatio)|0)),e=128}i*=this._pixelRatio,e=Math.min(e,(t+i)/(2*i)|0),this._ledOptions={nLeds:e,spaceH:this._barWidth*(1==this._mode?.45:this._mode<5?.225:.125),spaceV:i,ledHeight:(t+i)/e-i};const s=Math.max(this._ledOptions.spaceH,this._barSpacePx);this._ledsMask.width|=0,this._analyzerBars.forEach(e=>this._ledsCtx.fillRect(e.posX-s/2,0,s,t)),this._ledsCtx.fillRect(this._analyzerBars[this._analyzerBars.length-1].posX+this._barWidth-s/2,0,s,t);for(let e=this._ledOptions.ledHeight;e<t;e+=this._ledOptions.ledHeight+this._ledOptions.spaceV)this._ledsCtx.fillRect(0,e,this._canvas.width,this._ledOptions.spaceV)}_draw(t){const e=this._mode%10!=0,i=this.showLeds&&e,s=this._lumiBars&&e,a=this._canvas.height*(1-this._reflexRatio)|0,n=this._canvas.height>>2,h=(t,e)=>{const i=this._canvas.width>>1,s=this._canvas.height>>1,a=n+e,h=2*Math.PI*(t/this._canvas.width)-Math.PI/2;return[i+a*Math.cos(h),s+a*Math.sin(h)]};this.overlay&&(this._canvasCtx.clearRect(0,0,this._canvas.width,this._canvas.height),this._canvasCtx.globalAlpha=this.bgAlpha),this.showBgColor?this._canvasCtx.fillStyle=i?"#111":this._gradients[this._gradient].bgColor:this._canvasCtx.fillStyle="#000",this.overlay&&!this.showBgColor||this._canvasCtx.fillRect(0,0,this._canvas.width,!s&&(i||this.overlay&&1==this.reflexAlpha)?a:this._canvas.height),this._canvasCtx.globalAlpha=1,this._analyzer.getByteFrequencyData(this._dataArray),this._canvasCtx.fillStyle=this._gradients[this._gradient].gradient,(10==this._mode||this.radial)&&(this._canvasCtx.beginPath(),this.radial?this._canvasCtx.moveTo(...h(0,0)):this._canvasCtx.moveTo(-this.lineWidth,a));let r,o,l=this._barWidth-(e?Math.max(i?this._ledOptions.spaceH:0,this._barSpacePx):0);0!=this._barSpace||i||(l|=0);const c=this._analyzerBars.length;for(let t=0;t<c;t++){if(r=this._analyzerBars[t],0==r.endIdx)o=this._dataArray[r.dataIdx],r.factor&&(o+=(this._dataArray[r.dataIdx+1]-o)*r.factor);else{o=0;for(let t=r.dataIdx;t<=r.endIdx;t++)o=Math.max(o,this._dataArray[t])}o/=255,s&&(this._canvasCtx.globalAlpha=o),i?(o=(o*this._ledOptions.nLeds|0)*(this._ledOptions.ledHeight+this._ledOptions.spaceV)-this._ledOptions.spaceV,o<0&&(o=0)):o=this.radial?o*n|0:o*a|0,o>=r.peak&&(r.peak=o,r.hold=30,r.accel=0);let e=r.posX,c=l;10==this._mode?this.radial?r.posX>=0&&this._canvasCtx.lineTo(...h(r.posX,o)):this._canvasCtx.lineTo(r.posX,a-o):(this._mode>0&&(i?e+=Math.max(this._ledOptions.spaceH/2,this._barSpacePx/2):0==this._barSpace?(e|=0,t>0&&e>this._analyzerBars[t-1].posX+l&&(e--,c++)):e+=this._barSpacePx/2),s?(this._canvasCtx.fillRect(e,0,c,this._canvas.height),this._canvasCtx.globalAlpha=1):this.radial?r.posX>=0&&(this._canvasCtx.moveTo(...h(e,0)),this._canvasCtx.lineTo(...h(e,o)),this._canvasCtx.lineTo(...h(e+c,o)),this._canvasCtx.lineTo(...h(e+c,0))):this._canvasCtx.fillRect(e,a,c,-o)),r.peak>0&&(this.showPeaks&&!s&&(i?this._canvasCtx.fillRect(e,(this._ledOptions.nLeds-r.peak/(a+this._ledOptions.spaceV)*this._ledOptions.nLeds|0)*(this._ledOptions.ledHeight+this._ledOptions.spaceV),l,this._ledOptions.ledHeight):this._canvasCtx.fillRect(e,a-r.peak,c,2)),r.hold?r.hold--:(r.accel++,r.peak-=r.accel))}if(10==this._mode?(this.radial?this._canvasCtx.closePath():this._canvasCtx.lineTo(r.posX+this.lineWidth,a),this.lineWidth>0&&(this._canvasCtx.lineWidth=this.lineWidth,this._canvasCtx.strokeStyle=this._canvasCtx.fillStyle,this._canvasCtx.stroke()),this.fillAlpha>0&&(this._canvasCtx.globalAlpha=this.fillAlpha,this._canvasCtx.fill(),this._canvasCtx.globalAlpha=1)):i?(this.overlay&&(this._canvasCtx.globalCompositeOperation="destination-out"),this._canvasCtx.drawImage(this._ledsMask,0,0),this._canvasCtx.globalCompositeOperation="source-over"):this.radial&&(this._canvasCtx.fillStyle=this._canvasCtx.fillStyle,this._canvasCtx.fill()),this._reflexRatio>0&&!s){let t,e;this.reflexFit?(t=0,e=this._canvas.height-a):(t=this._canvas.height-2*a,e=a),!this.overlay&&i&&(this._canvasCtx.fillStyle="#000",this._canvasCtx.fillRect(0,a,this._canvas.width,this._canvas.height-a)),this._canvasCtx.globalAlpha=this.reflexAlpha,1!=this.reflexBright&&(this._canvasCtx.filter=`brightness(${this.reflexBright})`),this._canvasCtx.setTransform(1,0,0,-1,0,this._canvas.height),this._canvasCtx.drawImage(this._canvas,0,0,this._canvas.width,a,0,t,this._canvas.width,e),this._canvasCtx.setTransform(),this._canvasCtx.filter="none",this._canvasCtx.globalAlpha=1}this.showScale&&this._canvasCtx.drawImage(this._labels,0,this._canvas.height-this._labels.height),this._frame++;const d=t-this._time;if(d>=1e3&&(this._fps=this._frame/(d/1e3),this._frame=0,this._time=t),this.showFPS){const t=20*this._pixelRatio;this._canvasCtx.font=`bold ${t}px sans-serif`,this._canvasCtx.fillStyle="#0f0",this._canvasCtx.textAlign="right",this._canvasCtx.fillText(Math.round(this._fps),this._canvas.width-t,2*t)}this.onCanvasDraw&&(this._canvasCtx.save(),this.onCanvasDraw(this),this._canvasCtx.restore()),this._animationReq=requestAnimationFrame(t=>this._draw(t))}_generateGradients(){let t;const e=this._lumiBars&&this._mode%10?this._canvas.height:this._canvas.height*(1-this._reflexRatio)|0;Object.keys(this._gradients).forEach(i=>{t=this._gradients[i].dir&&"h"==this._gradients[i].dir?this._canvasCtx.createLinearGradient(0,0,this._canvas.width,0):this._canvasCtx.createLinearGradient(0,0,0,e),this._gradients[i].colorStops&&this._gradients[i].colorStops.forEach((e,s)=>{"object"==typeof e?t.addColorStop(e.pos,e.color):t.addColorStop(s/(this._gradients[i].colorStops.length-1),e)}),this._gradients[i].gradient=t})}_precalculateBarPositions(){if(!this._initDone)return;let t,e;if(this._analyzerBars=[],this._mode%10==0){this._barWidth=1,t=Math.log10(this._minFreq),e=this._canvas.width/(Math.log10(this._maxFreq)-t);const i=this.freqToBin(this._minFreq,"floor"),s=this.freqToBin(this._maxFreq);let a=-999;for(let n=i;n<=s;n++){const i=this.binToFreq(n),s=Math.round(e*(Math.log10(i)-t));s>a?(this._analyzerBars.push({posX:s,dataIdx:n,endIdx:0,factor:0,peak:0,hold:0,accel:0}),a=s):this._analyzerBars.length&&(this._analyzerBars[this._analyzerBars.length-1].endIdx=n)}}else{let i;i=8==this._mode?24:7==this._mode?12:6==this._mode?8:5==this._mode?6:this._mode;const s=2**(1/24),a=440*s**-114;let n,h=[],r=0;for(;(n=a*s**r)<=this._maxFreq;)n>=this._minFreq&&r%i==0&&h.push(n),r++;t=Math.log10(h[0]),e=this._canvas.width/(Math.log10(h[h.length-1])-t),this._barWidth=this._canvas.width/h.length,this._calculateBarSpacePx();let o=0,l=-1,c=0;h.forEach((t,e)=>{const i=this.freqToBin(t);let s,a;if(s=o>0&&o+1<=i?o+1:i,s==l)c++;else{if(c>1)for(let t=1;t<=c;t++)this._analyzerBars[this._analyzerBars.length-t].factor=(c-t)/c;l=s,c=1}o=a=i,void 0!==h[e+1]&&(a=this.freqToBin(h[e+1]),a-i>1&&(o+=Math.round((a-i)/2)));const n=o-s>0?o:0;this._analyzerBars.push({posX:e*this._barWidth,dataIdx:s,endIdx:n,factor:0,peak:0,hold:0,accel:0})})}this._createLedMask(),this._labels.width|=0,this._labelsCtx.fillStyle="#000c",this._labelsCtx.fillRect(0,0,this._labels.width,this._labels.height),this._labelsCtx.fillStyle="#fff",this._labelsCtx.font=this._labels.height/2+"px sans-serif",this._labelsCtx.textAlign="center";const i=[16,31,63,125,250,500,1e3,2e3,4e3,8e3,16e3];for(const s of i)this._labelsCtx.fillText(s>=1e3?s/1e3+"k":s,e*(Math.log10(s)-t),.75*this._labels.height)}_setCanvas(t){this._initDone&&(this._pixelRatio=window.devicePixelRatio,this._loRes&&(this._pixelRatio/=2),this._fsWidth=Math.max(window.screen.width,window.screen.height)*this._pixelRatio,this._fsHeight=Math.min(window.screen.height,window.screen.width)*this._pixelRatio,this.isFullscreen?(this._canvas.width=this._fsWidth,this._canvas.height=this._fsHeight):(this._canvas.width=(this._width||this._container.clientWidth||this._defaultWidth)*this._pixelRatio,this._canvas.height=(this._height||this._container.clientHeight||this._defaultHeight)*this._pixelRatio),2==this._pixelRatio&&window.screen.height<=540&&(this._pixelRatio=1),this.overlay||(this._canvasCtx.fillStyle="#000",this._canvasCtx.fillRect(0,0,this._canvas.width,this._canvas.height)),this._canvasCtx.lineJoin="bevel",this._generateGradients(),this._ledsMask.width=this._canvas.width,this._ledsMask.height=this._canvas.height,this._labels.width=this._canvas.width,this._labels.height=this._pixelRatio*(this.isFullscreen?40:20),this._precalculateBarPositions(),this.onCanvasResize&&this.onCanvasResize(t,this))}_setProperties(t,e){const i=["onCanvasDraw","onCanvasResize"],s=["audioCtx","start"];e&&(t=Object.assign(e,t));for(const e of Object.keys(t))-1!==i.indexOf(e)&&"function"!=typeof t[e]?this[e]=void 0:-1===s.indexOf(e)&&(this[e]=t[e]);void 0!==t.start&&this.toggleAnalyzer(t.start)}}class a extends Error{constructor(t,e){super(e),this.name="AudioMotionError",this.code=t}}},function(t,e,i){"use strict";i.r(e);var s=i(0);const a=[-70,-80,-85,-90,-100],n=[-10,-20,-25,-30,-40],h=document.getElementById("audio");try{var r=new s.a(document.getElementById("container"),{source:h,showFPS:!0,onCanvasDraw:function(){if(!r.showLogo)return;let t=20*r.pixelRatio;r.isFullscreen&&(t*=2);const e=r.freqToBin(140);r.canvasCtx.font=t+r.dataArray[e]/16*r.pixelRatio+"px Orbitron,sans-serif",r.canvasCtx.fillStyle="#fff8",r.canvasCtx.textAlign="center",r.canvasCtx.fillText("audioMotion",r.canvas.width-8*t,2*t)},onCanvasResize:(t,e)=>{console.log(`[${t}] set: ${e.width} x ${e.height} | actual: ${e.canvas.width} x ${e.canvas.height}`),"fschange"==t&&_()}})}catch(t){document.getElementById("container").innerHTML=`<p>audioMotion-analyzer failed with error: <em>${t}</em></p>`}document.getElementById("version").innerText=r.version,r.showLogo=!0;const o=r.audioCtx,l=o.createOscillator(),c=o.createGain();function d(t){const e=t.nextElementSibling;e&&"value"==e.className&&(e.innerText=t.value)}function _(){document.querySelectorAll("[data-setting]").forEach(t=>t.value=r[t.dataset.setting]),document.getElementById("area_options").disabled=10!=r.mode,document.getElementById("bar_options").disabled=0==r.mode||10==r.mode,document.getElementById("range").selectedIndex=[20,30,100].indexOf(r.minFreq),document.getElementById("sensitivity").value=n.indexOf(r.maxDecibels),document.querySelectorAll('input[type="range"]').forEach(t=>d(t)),document.querySelectorAll("button[data-prop]").forEach(t=>{const e=r[t.dataset.prop];t.classList.toggle("active","isOn"==t.dataset.prop?!e:e)})}l.frequency.setValueAtTime(0,o.currentTime),l.connect(c),l.start(),c.connect(r.analyzer),document.querySelectorAll("button[data-prop]").forEach(t=>{t.addEventListener("click",()=>{t.dataset.func?r[t.dataset.func]():r[t.dataset.prop]=!r[t.dataset.prop],t.classList.toggle("active")})}),document.querySelectorAll("[data-setting]").forEach(t=>{t.addEventListener("change",()=>{r[t.dataset.setting]=t.value,"mode"==t.dataset.setting&&(document.getElementById("area_options").disabled=10!=r.mode,document.getElementById("bar_options").disabled=0==r.mode||10==r.mode)})}),document.getElementById("range").addEventListener("change",t=>{const e=t.target[t.target.selectedIndex];r.setFreqRange(e.dataset.min,e.dataset.max)}),document.getElementById("sensitivity").addEventListener("change",t=>r.setSensitivity(a[t.target.value],n[t.target.value])),document.querySelectorAll('input[type="range"]').forEach(t=>t.addEventListener("change",()=>d(t))),document.querySelectorAll("#wave, #note, #frequency").forEach(t=>{t.addEventListener("input",()=>{"frequency"==t.id&&(document.getElementById("note").selectedIndex=0),document.getElementById("btn_play").dispatchEvent(new Event("click"))})}),document.getElementById("btn_play").addEventListener("click",()=>{l.type=document.getElementById("wave").value,l.frequency.setValueAtTime(document.getElementById("note").value||document.getElementById("frequency").value,o.currentTime),c.gain.setValueAtTime(.2,o.currentTime)}),document.getElementById("btn_soundoff").addEventListener("click",()=>c.gain.setValueAtTime(0,o.currentTime)),document.getElementById("uploadFile").addEventListener("change",t=>function(t){const e=new FileReader;e.readAsDataURL(t.files[0]),e.onload=()=>{h.src=e.result,h.play()}}(t.target)),document.getElementById("loadFromURL").addEventListener("click",()=>{h.src=document.getElementById("remoteURL").value,h.play()}),_(),window.addEventListener("click",()=>{"suspended"==r.audioCtx.state&&r.audioCtx.resume()})}]);