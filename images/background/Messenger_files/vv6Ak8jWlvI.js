if (self.CavalryLogger) { CavalryLogger.start_js(["L5PjN"]); }

__d("rayInterceptsBox",["invariant"],(function(a,b,c,d,e,f,g){__p&&__p();function h(a,b){var c=Object.keys(a);b.forEach(function(b){c.indexOf(b)!==-1||g(0),typeof a[b]==="number"||g(0)})}a={check:function(a,b){__p&&__p();h(a,["minX","maxX","minY","maxY"]);h(b,["x","y","dx","dy"]);a.maxX>a.minX&&a.maxY>a.minY||g(0);if(b.dx===0&&b.dy===0)return!1;if(b.x>=a.minX&&b.x<=a.maxX&&b.y>=a.minY&&b.y<=a.maxY)return!0;var c=(a.minX-b.x)/b.dx,d=(a.maxX-b.x)/b.dx,e=(a.minY-b.y)/b.dy;a=(a.maxY-b.y)/b.dy;b=Math.max(Math.min(c,d),Math.min(e,a));c=Math.min(Math.max(c,d),Math.max(e,a));if(b<0)return!1;return b>c?!1:!0}};e.exports=a}),null);
__d("AdsMouseStateStore",["invariant","$","Arbiter","Event","EventEmitter","Run","SubscriptionsHandler","Vector","ge","keyMirror","rayInterceptsBox","throttle"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();var h,i=30,j=500,k="pagelet_ego_pane",l=b("keyMirror")({STATIONARY:null,INTENT:null,HOVER:null,NO_INTENT:null});function m(event){try{return{x:event.clientX||event.x,y:event.clientY||event.y}}catch(b){var a=Math.random()*1e3;return{x:a,y:a}}}a=babelHelpers.inherits(n,b("EventEmitter"));h=a&&a.prototype;function n(){__p&&__p();var a=arguments.length<=0||arguments[0]===undefined?k:arguments[0],c=arguments.length<=1||arguments[1]===undefined?j:arguments[1];h.constructor.call(this);this.destroy=function(){this.$AdsMouseStateStore8&&this.$AdsMouseStateStore8.release(),this.removeAllListeners()}.bind(this);this.onPageTransition=function(event){this.$AdsMouseStateStore9()}.bind(this);this.onMouseMove=function(event){this.calculateState(m(event))}.bind(this);this.$AdsMouseStateStore7=a;this.$AdsMouseStateStore9();this.$AdsMouseStateStore8=new(b("SubscriptionsHandler"))().addSubscriptions(b("Event").listen(document,"mousemove",b("throttle")(this.onMouseMove,c)),b("Arbiter").subscribe("page_transition",this.onPageTransition));b("Run").onLeave(this.destroy)}n.prototype.$AdsMouseStateStore9=function(){this.$AdsMouseStateStore1=l.STATIONARY,this.$AdsMouseStateStore2=this.$AdsMouseStateStore3=0,this.$AdsMouseStateStore4=Date.now(),this.$AdsMouseStateStore5=this.$AdsMouseStateStore7,this.$AdsMouseStateStore6=Infinity};n.prototype.getState=function(){return this.$AdsMouseStateStore1};n.prototype.updateRhcID=function(a){b("$")(a)||g(0),this.$AdsMouseStateStore5=a};n.prototype.getRhcID=function(){return this.$AdsMouseStateStore5};n.prototype.__updateMousePos=function(a){this.$AdsMouseStateStore2=a.x,this.$AdsMouseStateStore3=a.y};n.prototype.isRhcPresent=function(){if(!b("ge")(this.$AdsMouseStateStore5))return!1;var a=this.getRhcDimensions();return a.y>0&&a.x>0};n.prototype.getRhc=function(){return b("$")(this.$AdsMouseStateStore5)};n.prototype.getRhcPosition=function(){return b("Vector").getElementPosition(this.getRhc())};n.prototype.getRhcScreenPos=function(){var a=b("Vector").getScrollPosition(),c=this.getRhcPosition();return{x:c.x-a.x,y:c.y-a.y}};n.prototype.getRhcDimensions=function(){return b("Vector").getElementDimensions(this.getRhc())};n.prototype.getPointToRectSquareDist=function(){return this.$AdsMouseStateStore6};n.prototype.isPointWithinDist=function(a){var b=this.getPointToRectSquareDist();return b<=a*a};n.prototype.getRhcBoundingBox=function(){var a=this.getRhcDimensions(),b=this.getRhcScreenPos();return{minX:b.x,maxX:b.x+a.x,minY:b.y,maxY:b.y+a.y}};n.prototype.$AdsMouseStateStore10=function(a){var b=this.getRhcBoundingBox(),c={x:(b.minX+b.maxX)/2,y:(b.minY+b.maxY)/2},d=Math.abs(b.minX-b.maxX);b=Math.abs(b.minY-b.maxY);d=Math.max(Math.abs(a.x-c.x)-d/2,0);a=Math.max(Math.abs(a.y-c.y)-b/2,0);this.$AdsMouseStateStore6=d*d+a*a};n.prototype.isPosContainedInRhc=function(a){var b=this.getRhcBoundingBox();return a.x>=b.minX&&a.x<=b.maxX&&a.y>=b.minY&&a.y<=b.maxY};n.prototype.hasMovedMinDistance=function(a){var b=a.x-this.$AdsMouseStateStore2;a=a.y-this.$AdsMouseStateStore3;return b*b+a*a>=i*i};n.prototype.tooSoon=function(){return Date.now()-this.$AdsMouseStateStore4<j};n.prototype.$AdsMouseStateStore11=function(){this.$AdsMouseStateStore4=Date.now()};n.prototype.calculateState=function(a){__p&&__p();if(this.tooSoon())return;this.$AdsMouseStateStore11();if(!this.isRhcPresent())return;if(this.isPosContainedInRhc(a)){this.transitionToState(l.HOVER);this.$AdsMouseStateStore6=0;this.__updateMousePos(a);this.scheduleCheckup();return}else if(!this.hasMovedMinDistance(a)){this.transitionToState(l.STATIONARY);return}this.$AdsMouseStateStore10(a);var b=this.isMovingTowardsRhc(a)?l.INTENT:l.NO_INTENT;this.transitionToState(b);this.__updateMousePos(a);this.scheduleCheckup()};n.prototype.isMovingTowardsRhc=function(a){var c={x:this.$AdsMouseStateStore2,y:this.$AdsMouseStateStore3};if(this.isPosContainedInRhc(c))return!0;c=this.getRhcBoundingBox();a={x:this.$AdsMouseStateStore2,y:this.$AdsMouseStateStore3,dx:a.x-this.$AdsMouseStateStore2,dy:a.y-this.$AdsMouseStateStore3};return b("rayInterceptsBox").check(c,a)};n.prototype.scheduleCheckup=function(){var a={x:this.$AdsMouseStateStore2,y:this.$AdsMouseStateStore3};setTimeout(function(){this.calculateState(a)}.bind(this),j*1.5)};n.prototype.transitionToState=function(a){if(a===this.$AdsMouseStateStore1)return;this.$AdsMouseStateStore1=a;this.emit("change")};n.get=function(){n.$AdsMouseStateStore12||(n.$AdsMouseStateStore12=new n());return n.$AdsMouseStateStore12};n.STATES=l;n.MIN_MOVE_DISTANCE=i;n.THROTTLE_TIME=j;e.exports=n}),null);
__d("AdsPagerConstants",["keyMirror"],(function(a,b,c,d,e,f){a=b("keyMirror")({ADD_PAGE:null,PAGE_TRANSITION:null,REQUEST_PAGE:null});c=b("keyMirror")({VIEW_ACTION:null,SERVER_ACTION:null});e.exports={ActionTypes:a,PayloadSources:c}}),null);
__d("AdsPagerDispatcher",["AdsPagerConstants","Dispatcher_DEPRECATED"],(function(a,b,c,d,e,f){"use strict";c=b("AdsPagerConstants").PayloadSources;function a(a){return function(b){this.dispatch({payloadSource:a,action:b})}}d=Object.assign(new(b("Dispatcher_DEPRECATED"))(),{handleUpdateFromViewAction:a(c.VIEW_ACTION),handleUpdateFromServerAction:a(c.SERVER_ACTION)});e.exports=d}),null);
__d("AdsRefreshHandler",["csx","AdsMouseStateStore","AdsPagerConstants","AdsPagerDispatcher","Arbiter","CSSFade","DataAttributeUtils","DOM","Event","SubscriptionsHandler","Toggler","UIPagelet","VideoPlayerExperiments","IntersectionObserver","gkx","cxodecode","debounceAcrossTransitions","getOrCreateDOMID"],(function(a,b,c,d,e,f,g){__p&&__p();var h=b("AdsMouseStateStore").STATES,i=600,j=b("AdsMouseStateStore").get(),k=void 0;function a(a,c,d){"use strict";__p&&__p();if(!d.data||!d.pid)return;c.nonce&&(k=b("cxodecode")(c.nonce));this.$1=a;this.$2=Date.now();this.$3=c;this.$4=d;this.$5=b("VideoPlayerExperiments").rhcWNSPauseAds||b("VideoPlayerExperiments").responsiveRHC;this.$6=0;this.$7=!1;this.$8=!0;this.$9=0;this.$10=null;this.$11=b("debounceAcrossTransitions")(this.reloadAdsIfNeeded.bind(this),this.$3.delay);b("gkx")("AT5faHuTXKr90iQwQKl1SHVCLgelfdAiBTCM36IPmo0GpzqIzCnjZnLR1Z3bKshckAh3Qyf5nBK8Tx24wdaBxId759A18-wpvcHmqYjRWjymzA")&&(this.$12=new(b("IntersectionObserver"))(function(a){this.$11()}.bind(this),{threshold:[0,1]}));this.$13=new(b("SubscriptionsHandler"))();this.$13.addSubscriptions(b("Event").listen(this.$1,"mouseenter",this.setMouseOver.bind(this,!0)),b("Event").listen(this.$1,"mouseleave",this.setMouseOver.bind(this,!1)),j.addListener("change",this.onMouseStateStoreChange.bind(this)),b("Arbiter").subscribe("AdsPreferencesDialog/opened",this.stopRefreshingRHC.bind(this)),b("Arbiter").subscribe("AdsPreferencesDialog/closed",this.startRefreshingRHC.bind(this)),b("Arbiter").subscribe("VideoChannelView/opened",this.stopRefreshingRHC.bind(this)),b("Arbiter").subscribe("VideoChannelView/closed",this.startRefreshingRHC.bind(this)));b("VideoPlayerExperiments").rhcWNSPauseAds&&this.$13.addSubscriptions(b("Arbiter").subscribe("VideoWatchAndScrollController/init",this.stopRefreshingRHC.bind(this)),b("Arbiter").subscribe("VideoWatchAndScrollController/exit",this.startRefreshingRHC.bind(this)));b("VideoPlayerExperiments").responsiveRHC&&this.$13.addSubscriptions(b("Arbiter").subscribe("ResponsiveRHCColumns/openDrawer",this.startRefreshingRHC.bind(this)),b("Arbiter").subscribe("ResponsiveRHCColumns/closeDrawer",this.stopRefreshingRHC.bind(this)),b("Arbiter").subscribe("ResponsiveRHCColumns/enableDrawer",this.stopRefreshingRHC.bind(this)),b("Arbiter").subscribe("ResponsiveRHCColumns/disableDrawer",this.startRefreshingRHC.bind(this)));this.$14();b("AdsPagerDispatcher").register(this.handlePageDispatch.bind(this))}a.prototype.$14=function(){"use strict";this.$15&&this.$15.release();this.$15=new(b("SubscriptionsHandler"))();var a=b("DOM").scry(this.$1,".uiToggle");for(var c=0;c<a.length;c++)this.$15.addSubscriptions(b("Toggler").listen("show",a[c],this.stopRefreshingRHC.bind(this)),b("Toggler").listen("hide",a[c],this.startRefreshingRHC.bind(this)))};a.prototype.handlePageDispatch=function(a){"use strict";a=a.action||{};a.actionType===b("AdsPagerConstants").ActionTypes.REQUEST_PAGE&&this.reloadAds()};a.prototype.setMouseOver=function(a){"use strict";this.$16=a,a&&this.$10!=null&&(this.$10.cancel(),this.$10=null)};a.prototype.subscribeDefaultEventsForRefresh=function(){"use strict";b("gkx")("AT5faHuTXKr90iQwQKl1SHVCLgelfdAiBTCM36IPmo0GpzqIzCnjZnLR1Z3bKshckAh3Qyf5nBK8Tx24wdaBxId759A18-wpvcHmqYjRWjymzA")?(this.$17(),this.$13.addSubscriptions(b("Event").listen(window,"resize",this.$11))):this.$13.addSubscriptions(b("Event").listen(window,"scroll",this.$11),b("Event").listen(window,"resize",this.$11));return this};a.prototype.$17=function(){"use strict";this.$12.disconnect(),this.$12.observe(this.$1)};a.prototype.reloadWithDebounce=function(){"use strict";this.$11()};a.prototype.reloadWithoutDebounce=function(){"use strict";this.reloadAdsIfNeeded()};a.prototype.stopRefreshingRHC=function(a,b){"use strict";this.$5?this.$9++:this.$8=!1};a.prototype.startRefreshingRHC=function(a,b){"use strict";this.$2=Date.now(),this.$5?--this.$9<0&&(this.$9=0):this.$8=!0};a.prototype.forceLoadIfEnoughTimePassed=function(a){"use strict";Date.now()-this.$2>a&&this.reloadAds()};a.prototype.containsPremium=function(){"use strict";var a=b("DOM").scry(this.$1,k||"div._4u8");return!!a.filter(function(a){return JSON.parse(b("DataAttributeUtils").getDataAttribute(a,"data-ad")).segment==="premium"}).length};a.prototype.reloadAdsIfNeeded=function(){"use strict";__p&&__p();if(!this.$1)return;b("Arbiter").inform("AdsRefreshHandler/CheckingReload");if(this.$3.stateRefresh){this.reloadAdsIfNeededStateBased();return}if(this.containsPremium()||this.$16||!this.$3.interval)return;Date.now()-this.$2>=this.$3.interval&&this.reloadAds()};a.prototype.reloadAdsIfNeededStateBased=function(){"use strict";__p&&__p();if(Date.now()-this.$2<this.$3.interval)return;if(this.containsPremium())return;if(!this.$3.interval)return;this.$7=!0;b("Arbiter").inform("AdsRefreshHandler/RefreshScheduled");this.checkScheduledRefresh()};a.prototype.getRefreshScheduled=function(){"use strict";return this.$7};a.prototype.onMouseStateStoreChange=function(){"use strict";this.checkScheduledRefresh()};a.prototype.checkScheduledRefresh=function(){"use strict";__p&&__p();if(!this.$7)return;if(this.$16)return;var a=j.getState(),b=!1;switch(a){case h.HOVER:case h.NO_INTENT:b=!0;break;default:break}if(!b)return;this.$7=!1;this.reloadAds()};a.prototype.reloadAds=function(){"use strict";__p&&__p();if(!this.$1)return;this.$2=Date.now();if(this.$5){if(this.$9)return}else if(!this.$8)return;var a=this.$4&&this.$4.data;a=babelHelpers["extends"]({},a,{refresh_num:++this.$6});this.$10=b("UIPagelet").loadFromEndpoint("WebEgoPane",this.$1,{dom_id:b("getOrCreateDOMID")(this.$1),pid:this.$4.pid,data:a},{bundle:!1,handler:this.onLoadHandler.bind(this)});b("Arbiter").inform("AdsRefreshHandler/AdsLoading")};a.prototype.onLoadHandler=function(){"use strict";b("Arbiter").inform("AdsRefreshHandler/AdsLoaded");this.$10=null;this.$14();if(!this.$3.fade)return;b("CSSFade").show(this.$1,{duration:i})};a.prototype.cleanup=function(){"use strict";this.$1=null,this.$13.release(),this.$11.reset(),this.$12&&(this.$12.disconnect(),this.$12=null)};e.exports=a}),null);
__d("XFeedSeeFirstStoryController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/feed/control/see_first/story/",{})}),null);
__d("SeeFirstStoryLogger",["AsyncRequest","XFeedSeeFirstStoryController"],(function(a,b,c,d,e,f){a=function(){var a=b("XFeedSeeFirstStoryController").getURIBuilder().getURI();new(b("AsyncRequest"))(a).send()};e.exports={log:a}}),null);
__d("DOMClone",[],(function(a,b,c,d,e,f){a={shallowClone:function(a){return g(a,!1)},deepClone:function(a){return g(a,!0)}};function g(a,b){a=a.cloneNode(b);typeof a.__FB_TOKEN!=="undefined"&&delete a.__FB_TOKEN;typeof a.__FB_STORE!=="undefined"&&delete a.__FB_STORE;return a}e.exports=a}),null);
__d("FileInput",["cx","ArbiterMixin","DOM","DOMClone","Event","Focus","Keys","UserAgent_DEPRECATED","mixin"],(function(a,b,c,d,e,f,g){__p&&__p();var h,i=b("UserAgent_DEPRECATED").ie();c=babelHelpers.inherits(a,b("mixin")(b("ArbiterMixin")));h=c&&c.prototype;function a(a,c,d){"use strict";__p&&__p();h.constructor.call(this);this.container=a;this.control=c;a=b("DOM").scry(this.container,"a")[0];a&&a.removeAttribute("href");c=b("DOM").create("div",{className:"_3jk"},d);b("DOM").appendContent(this.control,c);this._boundHandleChange=this._handleChange.bind(this);i&&(this._boundHandleIEKeyDown=this._handleIEKeyDown.bind(this));this._setInputElement(d)}a.prototype.getValue=function(){"use strict";return this.input.value};a.prototype.getInput=function(){"use strict";return this.input};a.prototype.getContainer=function(){"use strict";return this.container};a.prototype.getControl=function(){"use strict";return this.control};a.prototype.clear=function(){"use strict";this.input.value="";if(this.input.value!==""){var a=b("DOMClone").deepClone(this.input);b("DOM").replace(this.input,a);this._setInputElement(a)}};a.prototype.destroy=function(){"use strict";this._focus.remove(),this._focus=null,this._listener.remove(),this._listener=null,i&&(this._IEKeyDownListener.remove(),this._IEKeyDownListener=null),this.container=null,this.control=null,this.input=null};a.prototype._setInputElement=function(a){"use strict";this.input=a,this._focus&&this._focus.remove(),this._focus=b("Focus").relocate(a,this.control),this._listener&&this._listener.remove(),this._listener=b("Event").listen(a,"change",this._boundHandleChange),i&&(this._IEKeyDownListener&&this._IEKeyDownListener.remove(),this._IEKeyDownListener=b("Event").listen(a,"keydown",this._boundHandleIEKeyDown))};a.prototype._handleChange=function(event){"use strict";this.inform("change",event);if(this.input){var a=this.input.form;a&&i<9&&b("Event").fire(a,"change",event)}};a.prototype._handleIEKeyDown=function(event){"use strict";if(event.keyCode===b("Keys").RETURN){event.preventDefault();var a=document.createEvent("MouseEvents");a.initEvent("click",!0,!0);this.input.dispatchEvent(a)}};e.exports=a}),null);
__d("PagesBrowserUtils",["Event","QE2Logger","tidyEvent"],(function(a,b,c,d,e,f){var g="pages_browser_your_pages_tab_redesign",h="navItem_2530096808";a={init:function(){var a=document.getElementById(h);b("tidyEvent")(b("Event").listen(a,"click",function(a){b("QE2Logger").logExposureForUser(g)}))}};e.exports=a}),null);
__d("PhotosUploadWaterfallMixin",["PhotosUploadWaterfall","emptyFunction"],(function(a,b,c,d,e,f){a=b("emptyFunction");c={getUploaderApp:a,getWaterfallID:a,getAdditionalData:function(){return{}},logWaterfallStep:function(a,c,d){b("PhotosUploadWaterfall").sendSignal(babelHelpers["extends"]({qn:this.getWaterfallID(),uploader:this.getUploaderApp(),step:a,ref:this.getWaterfallSource&&this.getWaterfallSource()},this.getAdditionalData(),c),d)},logWaterfallStepUsingBanzai:function(a,c,d){b("PhotosUploadWaterfall").sendBanzai(babelHelpers["extends"]({qn:this.getWaterfallID(),uploader:this.getUploaderApp(),step:a,ref:this.getWaterfallSource&&this.getWaterfallSource()},this.getAdditionalData(),c),d)}};e.exports=c}),null);
__d("PhotoSourceTypes",["keyMirror"],(function(a,b,c,d,e,f){e.exports=b("keyMirror")({COMPUTER:null,POSTED_PHOTOS:null,SYNCED_PHOTOS:null,SUGGESTIONS:null,PAGES_POSTED_PHOTOS:null})}),null);
__d("BaseSelectionContainer",[],(function(a,b,c,d,e,f){__p&&__p();var g=0;function a(){"use strict";this.$1=(g++).toString()}a.prototype.getSelectionContainerID=function(){"use strict";return this.$1};a.prototype.getSource=function(){"use strict";throw new Error("This must be implemented by the child class")};a.prototype.getName=function(){"use strict";return null};a.prototype.getSize=function(){"use strict";return null};a.prototype.hasPlaceholderUI=function(){"use strict";throw new Error("This must be implemented by the child class")};e.exports=a}),null);
__d("SelectionSource",["PhotoSourceTypes"],(function(a,b,c,d,e,f){var g={FILE:"file",FLASH:"flash",VAULT:"vault",SUGGESTIONS:"suggestions",POSTED_PHOTOS:"posted_photos",PAGES_POSTED_PHOTOS:"pages_posted_photos",toPhotoSourceType:function(a){switch(a){case g.FILE:case g.FLASH:return b("PhotoSourceTypes").COMPUTER;case g.VAULT:return b("PhotoSourceTypes").SYNCED_PHOTOS;case g.SUGGESTIONS:return b("PhotoSourceTypes").SUGGESTIONS;case g.POSTED_PHOTOS:return b("PhotoSourceTypes").POSTED_PHOTOS;case g.PAGES_POSTED_PHOTOS:return b("PhotoSourceTypes").PAGES_POSTED_PHOTOS;default:throw new Error("No mapping for SelectionSource: "+a)}}};e.exports=g}),null);
__d("FileSelectionContainer",["BaseSelectionContainer","SelectionSource"],(function(a,b,c,d,e,f){__p&&__p();var g;c=babelHelpers.inherits(a,b("BaseSelectionContainer"));g=c&&c.prototype;function a(a){"use strict";g.constructor.call(this),this.$FileSelectionContainer1=a}a.prototype.getFile=function(){"use strict";return this.$FileSelectionContainer1};a.prototype.getSource=function(){"use strict";return b("SelectionSource").FILE};a.prototype.getName=function(){"use strict";return this.$FileSelectionContainer1.fileName||this.$FileSelectionContainer1.name};a.prototype.getSize=function(){"use strict";return this.$FileSelectionContainer1.fileSize||this.$FileSelectionContainer1.size};a.prototype.hasPlaceholderUI=function(){"use strict";return!1};e.exports=a}),null);
__d("AlbumMediaUploadUtils",["VideoUploadConfig"],(function(a,b,c,d,e,f){__p&&__p();a={isVideoFile:function(a){a=a.name;var c=b("VideoUploadConfig").videoExtensions;a=a.indexOf(".")!==-1?a.split(".").pop().toLowerCase():"";return c[a]},hasVideos:function(a){return this._filterVideos(a).length>0},_filterVideos:function(a){return this._filterFileOfSupportedType(a,b("VideoUploadConfig").videoExtensions)},_filterFileOfSupportedType:function(a,b){return a.filter(function(a){a=a.indexOf(".")!==-1?a.split(".").pop().toLowerCase():"";return b[a]})}};e.exports=a}),null);
__d("FilePickerEvent",[],(function(a,b,c,d,e,f){e.exports={BEGIN:"FilePickerEvent/BEGIN",SELECT_START:"FilePickerEvent/SELECT_START",SELECTED:"FilePickerEvent/SELECTED_FILES",ALBUM_LIMIT_EXCEEDED:"FilePickerEvent/ALBUM_LIMIT_EXCEEDED",SESSION_LIMIT_EXCEEDED:"FilePickerEvent/SESSION_LIMIT_EXCEEDED",SELECT_CANCELED:"FilePickerEvent/SELECT_CANCELED",FALLBACK:"FilePickerEvent/FALLBACK"}}),null);
__d("PUWApplications",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({WEB_SIMPLE:"web_simple",WEB_FLASH:"web_flash",WEB_HTML5:"web_html5",WEB_COMPOSER:"web_composer",WEB_ARCHIVE:"web_archive",WEB_MESSENGER:"web_messenger",WEB_OMNIPICKER:"web_omnipicker",WEB_MUSE_OMNIPICKER:"web_muse_omnipicker",WEB_SAY_THANKS:"web_say_thanks",WEB_GOODWILL_CAMPAIGN_OMNIPICKER:"web_goodwill_campaign_omnipicker",WEB_PRODUCT_PHOTO_OMNIPICKER:"web_product_photo_omnipicker",WEB_PAGES_MESSENGER:"web_pages_messenger",WEB_M_ZERO:"web_m_zero",WEB_M_BASIC:"web_m_basic",WEB_M_TOUCH:"web_m_touch",WEB_REACT_COMPOSER:"web_react_composer",MOBILE_FB4IOS:"mobile_fb4ios",MOBILE_FB4IOS_SNAP:"mobile_fb4ios_snap",MOBILE_FB4A:"mobile_fb4a",MOBILE_PMA_ANDROID:"mobile_pma_android",MOBILE_PMA_IOS:"mobile_pma_ios",THIRD_PARTY:"third_party"})}),null);
__d("PUWSteps",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({CLIENT_FLOW_BEGIN:"client_flow_begin",CLIENT_SELECT_BEGIN:"client_select_begin",CLIENT_SELECT_SUCCESS:"client_select_success",CLIENT_SELECT_CANCEL:"client_select_cancel",CLIENT_SELECT_FAIL:"client_select_fail",CLIENT_FLOW_POST:"client_flow_post",CLIENT_TRANSFER_BATCH_BEGIN:"client_transfer_batch_begin",CLIENT_UPLOAD_BEGIN:"client_upload_begin",CLIENT_ATTACH_PHOTO:"client_attach_photo",CLIENT_PROCESS_BEGIN:"client_process_begin",CLIENT_PROCESS_SUCCESS:"client_process_success",CLIENT_PROCESS_CANCEL:"client_process_cancel",CLIENT_PROCESS_SKIP:"client_process_skip",CLIENT_PROCESS_FAIL:"client_process_fail",CLIENT_PROCESS_UNAVAILABLE:"client_process_unavailable",CLIENT_SPHERICAL_CHECK_SUCCESS:"client_spherical_check_success",CLIENT_SPHERICAL_CHECK_FAIL:"client_spherical_check_fail",CLIENT_TRANSFER_ENQUEUE:"client_transfer_enqueue",CLIENT_TRANSFER_BEGIN:"client_transfer_begin",CLIENT_TRANSFER_SUCCESS:"client_transfer_success",CLIENT_TRANSFER_CANCEL:"client_transfer_cancel",CLIENT_TRANSFER_FAIL:"client_transfer_fail",CLIENT_TRANSFER_MANUAL_RETRY:"client_transfer_manual_retry",CLIENT_UPLOAD_SUCCESS:"client_upload_success",CLIENT_UPLOAD_FAIL:"client_upload_fail",CLIENT_UPLOAD_CANCEL:"client_upload_cancel",CLIENT_UPLOAD_REMOVE:"client_upload_remove",CLIENT_FACEREC_BEGIN:"client_facerec_begin",CLIENT_FACEREC_SUCCESS:"client_facerec_success",CLIENT_FACEREC_FAIL:"client_facerec_fail",CLIENT_PHOTO_PREVIEW_OPEN:"client_photo_preview_open",CLIENT_PHOTO_PREVIEW_CLOSE:"client_photo_preview_close",CLIENT_TRANSFER_BATCH_SUCCESS:"client_transfer_batch_success",CLIENT_TRANSFER_BATCH_CANCEL:"client_transfer_batch_cancel",CLIENT_TRANSFER_BATCH_FAIL:"client_transfer_batch_fail",CLIENT_PUBLISH_ENQUEUE:"client_publish_enqueue",CLIENT_PUBLISH_BEGIN:"client_publish_begin",CLIENT_PUBLISH_SUCCESS:"client_publish_success",CLIENT_PUBLISH_FAIL:"client_publish_fail",CLIENT_ATTEMPT_FAIL:"client_attempt_fail",CLIENT_FLOW_SUCCESS:"client_flow_success",CLIENT_FLOW_FATAL:"client_flow_fatal",CLIENT_FLOW_GIVEUP:"client_flow_giveup",CLIENT_FLOW_CANCEL:"client_flow_cancel",CLIENT_FLOW_FAIL:"client_flow_fail",CLIENT_FLOW_INCOMPLETE:"client_flow_incomplete",CLIENT_ATTEMPT_INCOMPLETE:"client_attempt_incomplete",CLIENT_FLOW_RETRY:"client_flow_retry",CLIENT_ATTEMPT_RETRY:"client_attempt_retry",CLIENT_DIAGNOSTIC:"client_diagnostic",CLIENT_QUALITY_SWITCH:"client_quality_switch",CLIENT_CANCEL_SURVEY:"client_cancel_survey",CLIENT_PHOTO_EDIT_BEGIN:"client_photo_edit_begin",CLIENT_PHOTO_EDIT_SUCCESS:"client_photo_edit_success",SERVER_UPLOAD_BEGIN:"server_upload_begin",SERVER_UPLOAD_SUCCESS:"server_upload_success",SERVER_UPLOAD_FAIL:"server_upload_fail",SERVER_PUBLISH_BEGIN:"server_publish_begin",SERVER_PUBLISH_SUCCESS:"server_publish_success",SERVER_PUBLISH_FAIL:"server_publish_fail",SERVER_RECEIVER_BEGIN:"server_receiver_begin",SERVER_RECEIVER_PUBLISH_BEGIN:"server_receiver_publish_begin",SERVER_SENTRY_RESTRICTION:"server_sentry_restriction"})}),null);
__d("PhotosUploadWaterfallXMixin",["invariant","AsyncSignal","Banzai","PhotosUploadWaterfallXConfig","randomInt"],(function(a,b,c,d,e,f,g){__p&&__p();var h=new Map();function i(a,c){var d={};a.client_time=Math.round(Date.now()/1e3);b("PhotosUploadWaterfallXConfig").retryBanzai&&(d.retry=!0,a.nonce=b("randomInt")(4294967296));b("Banzai").post(b("PhotosUploadWaterfallXConfig").banzaiRoute,a,d);c&&setTimeout(c,0)}function j(a,c){if(b("PhotosUploadWaterfallXConfig").useBanzai)i(a,c);else{a=new(b("AsyncSignal"))(b("PhotosUploadWaterfallXConfig").loggingEndpoint,{data:JSON.stringify(a)}).setHandler(c);b("PhotosUploadWaterfallXConfig").timeout&&a.setTimeout(10*1e3);a.send()}}e.exports={logStep:function(a,b,c){var d=this.getWaterfallID&&this.getWaterfallID(),e=this.getWaterfallAppName&&this.getWaterfallAppName();if(!d||!e)return;j(babelHelpers["extends"]({step:a,qn:d,uploader:e,ref:this.getWaterfallSource&&this.getWaterfallSource()},b),c)},logPUWStep:function(a,b,c,d,e,f,g){if(f&&f.logOncePerSession){h.has(b)||h.set(b,new Set());if(h.get(b).has(a))return;h.get(b).add(a)}j(Object.assign({step:a,qn:b,uploader:c,ref:d},e),g)}}}),null);
__d("HTML5FilePicker",["cx","ArbiterMixin","BrowserSupport","CSS","DOM","FilePickerEvent","FileSelectionContainer","Keys","Parent","PhotosUploadID","PhotosUploadWaterfall","PhotosUploadWaterfallMixin","PhotosUploadWaterfallXMixin","PUWApplications","PUWSteps","URI","getOrCreateDOMID"],(function(a,b,c,d,e,f,g){__p&&__p();function a(a,c){__p&&__p();this._config=babelHelpers["extends"]({accept:undefined,multiple:undefined},c);this._button=a;this._beginInformed=!1;if(!b("BrowserSupport").hasFileAPI()){this.logStep(b("PUWSteps").CLIENT_PROCESS_UNAVAILABLE,{error:"no_file_api"});if(Object.prototype.hasOwnProperty.call(this._config,"fallbackFunction")){this._config.fallbackFunction.call(this);return}return}this._subscriptions=[];c=this._config.input||b("DOM").create("input",{type:"file",className:"_n",tabindex:"-1"});Object.prototype.hasOwnProperty.call(this._config,"accept")&&(c.accept=this._config.accept);Object.prototype.hasOwnProperty.call(this._config,"multiple")&&(c.multiple=this._config.multiple);Object.prototype.hasOwnProperty.call(this._config,"title")&&(c.title=this._config.title);a=b("DOM").create("label",{className:"accessible_elem","for":b("getOrCreateDOMID")(c)},c.title);a=b("DOM").create("div",{className:"_3jk"},[a,c]);b("CSS").addClass(this._button,"_m");b("DOM").appendContent(this._button,a);this._button.setAttribute("rel","ignore");this._bindInput(c);this._button.onkeydown=function(event){event.keyCode===b("Keys").RETURN&&(this._input.click(),event&&event.stopPropagation&&event.stopPropagation())}.bind(this);a=b("Parent").byClass(this._button,"addPhotosDisabled");a&&(b("CSS").removeClass(a,"addPhotosDisabled"),b("CSS").addClass(a,"addPhotosEnabled"))}Object.assign(a.prototype,b("ArbiterMixin"),b("PhotosUploadWaterfallMixin"),b("PhotosUploadWaterfallXMixin"),{getUploaderApp:function(){return b("PhotosUploadWaterfall").APP_HTML5},getWaterfallID:function(){return this._config.qn},getWaterfallAppName:function(){return b("PUWApplications").WEB_HTML5},getWaterfallSource:function(){return this._config.ref},getSwfID:function(){return null},_constructFileList:function(){var a=Array.from(this._input.files);a.forEach(function(a){a.uploadID=b("PhotosUploadID").getNewID()});return a},_constructFileSelectionContainerList:function(){var a=Array.from(this._input.files);return a.map(function(a){return new(b("FileSelectionContainer"))(a)})},cleanup:function(){this._input&&(this._input.onclick=null,this._input.onchange=null),this._button&&(this._button.onkeydown=null)},_bindInput:function(a){this.cleanup(),a.onclick=function(){this.logWaterfallStep(b("PhotosUploadWaterfall").SELECT_START),this._beginInformed||(this._beginInformed=!0,this.inform(b("FilePickerEvent").BEGIN||"FilePickerEvent/BEGIN")),this.inform(b("FilePickerEvent").SELECT_START)}.bind(this),a.onchange=function(){this.inform(b("FilePickerEvent").SELECTED,{sender:this,files:this._constructFileList(),selections:this._constructFileSelectionContainerList()}),this._bindInput(this._input.cloneNode(!1))}.bind(this),this._input&&b("DOM").replace(this._input,a),this._input=a}});e.exports=a}),null);
__d("UploadSession",["invariant","AlbumMediaUploadUtils","AsyncRequest","FilePickerEvent","SubscriptionsHandler","PhotosUploadWaterfall","PUWSteps","URI"],(function(a,b,c,d,e,f,g){__p&&__p();var h={};function i(a){"use strict";this._sessionID=a,this._asyncBootstrapped=!1,this._controller=null,this._overlay=null,this._pickers=[],this._pendingPhotoFileLists=[],this._pendingVideoFileLists=[],this._beginLogged=!1,this._albumLimitWasExceeded=!1,this._sessionLimitWasExceeded=!1,this._subscriptions=new(b("SubscriptionsHandler"))()}i.prototype.addFilePicker=function(a){"use strict";__p&&__p();this._pickers.includes(a)||(this._pickers.push(a),this._controller&&a.getSwfID&&a.getSwfID()&&(this._controller.preregisterSwf&&this._controller.preregisterSwf(a.getSwfID())),this._subscriptions.addSubscriptions(a.subscribe(b("FilePickerEvent").BEGIN,function(c,d){this._beginLogged||(this._beginLogged=!0,a.logWaterfallStep(b("PhotosUploadWaterfall").BEGIN),a.logStep(b("PUWSteps").CLIENT_FLOW_BEGIN))}.bind(this)),a.subscribe(b("FilePickerEvent").SELECTED,function(c,d){__p&&__p();a.logStep(b("PUWSteps").CLIENT_SELECT_SUCCESS,{volume:d.files.length});var e=[],f=[];d.files.forEach(function(a){b("AlbumMediaUploadUtils").isVideoFile(a)?e.push(a):f.push(a)});this._controller?(f.length>0&&this._controller.uploadFiles(f),this._videoController&&e.length>0&&this._videoController.uploadFiles(e)):(f.length>0&&this._pendingPhotoFileLists.push(f),e.length>0&&this._pendingVideoFileLists.push(e));if(this._asyncBootstrapped)return;c=a._button;var g=new(b("URI"))(c.getAttribute("ajaxify"));g.addQueryData("num_selected",d.files.length);b("AsyncRequest").bootstrap(g.toString(),c,!0);this._asyncBootstrapped=!0}.bind(this)),a.subscribe(b("FilePickerEvent").SELECT_START,function(){a.logStep(b("PUWSteps").CLIENT_SELECT_BEGIN)}.bind(this)),a.subscribe(b("FilePickerEvent").SELECT_CANCELED,function(){a.logStep(b("PUWSteps").CLIENT_SELECT_CANCEL),this._overlay||(a.logStep(b("PUWSteps").CLIENT_FLOW_CANCEL),this._beginLogged=!1)}.bind(this)),a.subscribe(b("FilePickerEvent").ALBUM_LIMIT_EXCEEDED,function(){this._controller?this._controller.albumLimitExceeded():this._albumLimitWasExceeded=!0}.bind(this)),a.subscribe(b("FilePickerEvent").SESSION_LIMIT_EXCEEDED,function(){this._controller?this._controller.sessionLimitExceeded():this._sessionLimitWasExceeded=!0}.bind(this))))};i.prototype.addController=function(a,c){"use strict";__p&&__p();this._controller=a;this._videoController=c;this._asyncBootstrapped=!0;a=this._controller.getWaterfallID?this._controller.getWaterfallID():this._controller.getWaterfallConfig().waterfallID;c=this._controller.getUploaderApp?this._controller.getUploaderApp():this._controller.getWaterfallConfig().waterfallApp;this._beginLogged||(this._beginLogged=!0,b("PhotosUploadWaterfall").sendSignal({qn:a,step:b("PhotosUploadWaterfall").BEGIN,uploader:c}));if(this._pendingPhotoFileLists.length>0||this._pendingVideoFileLists.length>0){var d=[],e=[];this._pendingVideoFileLists.forEach(function(a){e=e.concat(a)});this._pendingPhotoFileLists.forEach(function(a){d=d.concat(a)});d.length>0&&this._controller.uploadFiles(d);e.length>0&&this._videoController.uploadFiles(e)}else b("PhotosUploadWaterfall").sendSignal({qn:a,step:b("PhotosUploadWaterfall").OVERLAY_FIRST,uploader:c});this._albumLimitWasExceeded&&this._controller.albumLimitExceeded();this._sessionLimitWasExceeded&&this._controller.sessionLimitExceeded()};i.prototype.addOverlay=function(a){"use strict";this._overlay=a};i.prototype.addOverlayAndController=function(a,b){"use strict";this.addOverlay(a),this.addController(b,null)};i.prototype.getFilePickers=function(){"use strict";return this._pickers};i.prototype.cleanup=function(){"use strict";this._subscriptions&&this._subscriptions.release()};i.addFilePickerToSession=function(a,b){"use strict";j(a).addFilePicker(b)};i.addControllerToSession=function(a,b,c){"use strict";j(a).addController(b,c)};i.addOverlayToSession=function(a,b){"use strict";j(a).addOverlay(b)};i.addOverlayAndControllerToSession=function(a,b,c){"use strict";j(a).addOverlayAndController(b,c)};i.restartSessionPersistingFilePickers=function(a){"use strict";var b=j(a),c=new i(a);b.getFilePickers().forEach(function(a){c.addFilePicker(a)});k(a,c)};function j(a){h[a]||(h[a]=new i(a));return h[a]}function k(a,b){h[a]||g(0),h[a].cleanup(),delete h[a],h[a]=b}e.exports=i}),null);