if (self.CavalryLogger) { CavalryLogger.start_js(["RMB2J"]); }

__d("FBSiteWhiteOps",["ControlledReferer","Style","URI"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g={appendToWindow:function(a,b){g.render(a,b,window.document.body)},appendToComponent:function(a,b,c){g.render(a,b,c)},render:function(a,c,d){__p&&__p();var e;try{var e=function(){__p&&__p();var e="fbsbx-sig-iframe-detection";if(d.getElementsByClassName(e).length!==0)return{v:void 0};var f=window.document.createElement("iframe");b("Style").apply(f,{height:"1px",width:"1px",opacity:"0",position:"relative",zIndex:"-9999999"});f.id="fbsbx-sig-iframe-"+a;f.className=e;f.referrerPolicy="no-referrer";b("ControlledReferer").useFacebookReferer(f,function(){__p&&__p();f.sandbox="allow-scripts allow-same-origin";var d=new(b("URI"))("https://s.update.fbsbx.com/2/843748/analytics.html?ti="+a+"&di=facebook.com&bt="+c+"&dt=8437481520966594402012"),e=f.contentWindow.document,g="fbsbx-sig-iframe-form-"+a;e.body.innerHTML='<form method="GET" id='+g+"></form>";var h=e.getElementById(g);h.action=d.toString();d=d.getQueryData();for(var i in d)if(Object.prototype.hasOwnProperty.call(d,i)){var j=e.createElement("input");j.name=i;j.value=d[i];j.autocomplete="off";j.type="hidden";h.appendChild(j)}e.body.innerHTML+='<iframe height="100%" width="100%" onload=\'document.getElementById("'+g+"\").submit()'/>;"});d.appendChild(f)}();if(typeof e==="object")return e.v}catch(a){}}};e.exports=g}),null);
__d("CommercialBreakFraudDetectorWhiteOps",["FBSiteWhiteOps"],(function(a,b,c,d,e,f){__p&&__p();function a(a){"use strict";this.$1=a,this.$2=this.$1.addListener("optionsChange",function(){return this.$3()}.bind(this)),this.$3()}a.prototype.$3=function(){"use strict";var a=this.$1.getOption("VideoWithCommercialBreak","controller");if(!a)return;this.$2.remove();a.addListener("commercialBreak/runFraudDetector",function(a){b("FBSiteWhiteOps").appendToComponent(a,"AD_BREAKS",this.$1.getVideoNode())}.bind(this))};e.exports=a}),null);