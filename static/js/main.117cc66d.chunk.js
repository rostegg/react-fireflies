(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){e.exports=a(22)},18:function(e,t,a){},22:function(e,t,a){"use strict";a.r(t);var i=a(0),n=a.n(i),s=a(7),r=a.n(s),o=(a(18),a(8)),h=a(5),d=a(4),c=a(6),l=a(2),u=a(3),f=a(11),p=a.n(f),m=(a(21),a(1)),v=a.n(m),g=function(e){function t(){return Object(l.a)(this,t),Object(h.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.data;return n.a.createElement(v.a,{data:e,onUpdate:this.props.onParamChanged},n.a.createElement(m.DatColor,{path:"color",label:"Color"}),n.a.createElement(m.DatNumber,{path:"count",label:"Count",min:0,max:5e3,step:50}),n.a.createElement(m.DatNumber,{path:"blur",label:"Blur",min:0,max:3,step:.1}),n.a.createElement(m.DatNumber,{path:"size",label:"Size",min:.1,max:10,step:.1}),n.a.createElement(m.DatNumber,{path:"speed",label:"Speed",min:0,max:6,step:.1}),n.a.createElement(m.DatNumber,{path:"fadeSpeedRate",label:"Fade speed rate",min:0,max:.4,step:.01}),n.a.createElement(m.DatBoolean,{path:"randomFadeTime",label:"Random fade time"}),n.a.createElement(m.DatBoolean,{path:"differentSize",label:"Different size"}),n.a.createElement(m.DatBoolean,{path:"isGradient",label:"Gradient style"}))}}]),t}(i.Component),w=function(){function e(t,a){Object(l.a)(this,e),this.seed=Math.random()+.4,this.context=t.canvasContext,this.width=t.width,this.height=t.height,this.x=Math.random()*this.width,this.y=Math.random()*this.height,this.speed=a.speed,this.size=a.differentSize?a.size*this.seed:a.size,this.color=a.color,this.isGradient=a.isGradient,this.fadeSpeedRate=a.fadeSpeedRate,this.randomFadeTime=a.randomFadeTime,this.fadeSpeed=0,this.dx=2*Math.random()*(Math.random()<.5?-1:1),this.dy=2*Math.random()*(Math.random()<.5?-1:1)}return Object(u.a)(e,[{key:"move",value:function(){this.x+=this.speed*Math.sin(this.dx),this.y+=this.speed*Math.sin(this.dy),(this.x>this.width||this.x<0)&&(this.dx*=-1),(this.y>this.height||this.y<0)&&(this.dy*=-1)}},{key:"buildGradientStyle",value:function(e){var t=this.context.createRadialGradient(this.x,this.y,0,this.x,this.y,e*e),a=this.hexToRGB(this.color);return t.addColorStop(0,"rgba(".concat(a,",1)")),t.addColorStop(.1,"rgba(".concat(a,",0.3)")),t.addColorStop(1,"rgba(".concat(a,",0)")),t}},{key:"show",value:function(){var e=this.size*Math.abs(Math.cos(this.fadeSpeed));this.context.beginPath(),this.context.arc(this.x,this.y,e,0,2*Math.PI),this.context.closePath(),this.fadeSpeed+=this.fadeSpeedRate*(this.randomFadeTime?this.seed:1),this.context.fillStyle=this.isGradient?this.buildGradientStyle(e):this.color,this.context.fill()}},{key:"updateCanvasSize",value:function(e,t){this.width=e,this.height=t,this.update()}},{key:"updateSettings",value:function(e){this.speed=e.speed,this.size=e.differentSize?e.size*this.seed:e.size,this.color=e.color,this.isGradient=e.isGradient,this.fadeSpeedRate=e.fadeSpeedRate,e.randomFadeTime||(this.fadeSpeed=0),this.randomFadeTime=e.randomFadeTime,this.update()}},{key:"update",value:function(){this.move(),this.show()}},{key:"hexToRGB",value:function(e){return[(e=parseInt(e.replace("#",""),16))>>16&255,e>>8&255,255&e].join(",")}}]),e}(),b={color:"#FF9B00",size:4.7,speed:.1,blur:0,count:300,fadeSpeedRate:.01,differentSize:!0,isGradient:!0,randomFadeTime:!0},y=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(h.a)(this,Object(d.a)(t).call(this,e))).updateFireflies=function(){a.state.firefliesArray.forEach(function(e){e.update()})},a.draw=function(){var e=a.state.canvasContext,t=a.state.width,i=a.state.height;e.clearRect(0,0,t,i),a.updateFireflies()},a.resizeWindow=function(){var e=window.innerWidth,t=window.innerHeight;a.state.firefliesArray.forEach(function(a){a.updateCanvasSize(e,t)}),a.setState({width:e,height:t})},a.addFireflies=function(e,t){for(var i={canvasContext:a.state.canvasContext,width:a.state.width,height:a.state.height},n=a.state.settings,s=0;s<t;s++)e.push(new w(i,n))},a.removeFireflies=function(e,t){e.splice(e.length-t)},a.paramChangedHandler=function(e){var t=a.state.settings.count-e.count,i=a.state.firefliesArray;t<0&&a.addFireflies(i,Math.abs(t)),t>0&&a.removeFireflies(i,t),i.forEach(function(t){t.updateSettings(e)}),a.setState({firefliesArray:i,settings:e})},a.state={canvas:null,canvasContext:null,firefliesArray:[],settings:Object(o.a)({},b,a.props.settings),width:a.props.width,height:a.props.height},a}return Object(c.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=document.getElementById("fireflies-canvas"),a=t.getContext("2d"),i=this.state.width,n=this.state.height;a.fillStyle="rgba(30,30,30,1)",a.fillRect(0,0,i,n),this.setState({canvas:t,canvasContext:a});for(var s={canvasContext:a,width:i,height:n},r=this.state.settings,o=this.state.firefliesArray,h=0;h<r.count;h++)o.push(new w(s,r));this.setState({firefliesArray:o}),this.timerId=setInterval(function(){return e.draw()},this.props.updateInterval),window.addEventListener("resize",this.resizeWindow)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerId)}},{key:"render",value:function(){var e=this.props.displayParamsChanger,t=this.props.displayFpsStats;return n.a.createElement(n.a.Fragment,null,n.a.createElement("canvas",{id:"fireflies-canvas",width:this.state.width,height:this.state.height,style:{WebkitFilter:"blur(".concat(this.state.settings.blur,"px)")}}),e&&n.a.createElement(g,{data:this.state.settings,onParamChanged:this.paramChangedHandler}),t&&n.a.createElement(p.a,null))}}]),t}(i.Component);y.defaultProps=Object(o.a)({},i.Component.defaultProps,{width:window.innerWidth,height:window.innerHeight,updateInterval:15,displayParamsChanger:!0,displayFpsStats:!0});var S=y,x=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function C(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}r.a.render(n.a.createElement(S,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/react-fireflies",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/react-fireflies","/service-worker.js");x?(function(e,t){fetch(e).then(function(a){var i=a.headers.get("content-type");404===a.status||null!=i&&-1===i.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):C(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):C(t,e)})}}()}},[[12,1,2]]]);
//# sourceMappingURL=main.117cc66d.chunk.js.map