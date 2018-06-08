if (self.CavalryLogger) { CavalryLogger.start_js(["IBYFG"]); }

__d("ChannelConnection",["Arbiter","ChannelConstants","ChannelManager","JSLogger","Run","SystemEvents","Visibility","clearTimeout","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){__p&&__p();var g=b("JSLogger").create("channel_connection"),h=null,i=null,j=null,k=null,l=0;b("ChannelManager").startChannelManager();var m=Object.assign(new(b("Arbiter"))(),{CONNECTED:"chat-connection/connected",RECONNECTING:"chat-connection/reconnecting",SHUTDOWN:"chat-connection/shutdown",MUTE_WARNING:"chat-connection/mute",UNMUTE_WARNING:"chat-connection/unmute"});b("Run").onBeforeUnload(function(){});function n(){i&&(b("clearTimeout")(i),i=null)}function o(){n(),g.log("unmute_warning"),m.inform(m.UNMUTE_WARNING)}function p(a){n(),i=b("setTimeoutAcrossTransitions")(o,a),g.log("mute_warning",{time:a}),m.inform(m.MUTE_WARNING)}function q(){j&&(b("clearTimeout")(j),j=null)}function r(a,c){__p&&__p();q();if(a===b("ChannelConstants").ON_ENTER_STATE&&(c.nextState||c.state)==="pull"){if(k!==m.CONNECTED){g.log("connected");var d=!k;k=m.CONNECTED;l=0;m.inform(m.CONNECTED,{init:d})}}else a===b("ChannelConstants").ON_ENTER_STATE&&((c.nextState||c.state)==="ping"||!c.nextState&&c.state==="idle")?j=b("setTimeoutAcrossTransitions")(function(){var b=null;c.state==="idle"&&!c.nextState||(b=c.delay||0);g.log("reconnecting",{delay:b});m.disconnected()&&g.log("reconnecting_ui",{delay:b});k=m.RECONNECTING;c.state==="idle"&&l++;l>1?m.inform(m.RECONNECTING,b):!c.nextState&&c.state==="idle"&&r(a,c)},500):a===b("ChannelConstants").ON_SHUTDOWN&&(g.log("shutdown",{reason:c.reason}),k=m.SHUTDOWN,l=0,m.inform(m.SHUTDOWN,c.reason))}function s(){b("ChannelManager").isShutdown()?r(b("ChannelConstants").ON_SHUTDOWN,b("ChannelManager")._shutdownHint):r(b("ChannelConstants").ON_ENTER_STATE,{state:b("ChannelManager").state,nextState:b("ChannelManager").nextState,delay:0}),b("Visibility").addListener(b("Visibility").VISIBLE,m.reconnect)}b("Run").onAfterLoad(s);Object.assign(m,{disconnected:function(){return k===m.SHUTDOWN||k===m.RECONNECTING&&!i&&l>1},isShutdown:function(){return k===m.SHUTDOWN},reconnect:function(a){if(b("ChannelManager").state==="ping"||b("ChannelManager").state==="pull"||b("ChannelManager").isShutdown())return;g.log("reconnect",{now:a});m.inform(m.RECONNECTING,0);a?(h!==null&&(b("clearTimeout")(h),h=null),b("ChannelManager").enterState("ping!")):h||(h=b("setTimeoutAcrossTransitions")(function(){b("ChannelManager").enterState("ping!"),h=null},b("ChannelConstants").CHANNEL_MANUAL_RECONNECT_DEFER_MSEC));b("ChannelManager").resetDelay()},unmuteWarning:o});function t(){b("Arbiter").subscribe([b("ChannelConstants").ON_ENTER_STATE,b("ChannelConstants").ON_SHUTDOWN],r),b("Arbiter").subscribe(b("ChannelConstants").ATTEMPT_RECONNECT,function(){m.disconnected()&&m.reconnect()}),b("SystemEvents").subscribe(b("SystemEvents").TIME_TRAVEL,function(){m.reconnect(),p(b("ChannelConstants").MUTE_WARNING_TIME_MSEC)}),b("Run").onBeforeUnload(q,!1)}b("Run").onAfterLoad(t);m.mockAfterLoad=function(){s(),t()};b("Arbiter").subscribe(b("JSLogger").DUMP_EVENT,function(a,b){b.channel_connected=!m.disconnected()});e.exports=m}),3);
__d("XPymkFunnelLoggingController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/pymk/funnel_logging/",{event_ts:{type:"Int",required:!0},query_id:{type:"Int"},candidate_id:{type:"Int"},signature:{type:"Int"},loc:{type:"String",required:!0},ref:{type:"String"},action:{type:"Enum",required:!0,enumType:1}})}),null);
__d("PymkFunnelLogger",["AsyncRequest","DOMQuery","XPymkFunnelLoggingController"],(function(a,b,c,d,e,f){__p&&__p();a={setupListeners:function(a,b,c,d,e){this._setupForSingleElement(a,b,c,"add"),this._setupForSingleElement(a,b,d,"click"),this._setupForSingleElement(a,b,e,"click")},logImpression:function(a,b,c){this._logEvent(a,"impression",b,c)},logXOut:function(a,b,c){this._logEvent(a,"hide",b,c)},_logEvent:function(a,event,c,d){a=b("XPymkFunnelLoggingController").getURIBuilder().setInt("candidate_id",a).setInt("signature",c).setInt("event_ts",Math.floor(Date.now()/1e3)).setEnum("action",event).setString("loc",d).getURI();new(b("AsyncRequest"))(a).setMethod("POST").send()},_setupForSingleElement:function(a,c,d,e){Event.listen(d,"click",function(event){var d=a.getAttribute("data-signature"),f=b("DOMQuery").find(a,"input.friendBrowserID");f=parseInt(f.value,10);this._logEvent(f,e,d,c)}.bind(this))}};e.exports=a}),null);
__d("XFriendRequestIHEventLoggingController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/requests/interaction_history_logging/",{target_id:{type:"FBID",required:!0},log_event:{type:"String",required:!0}})}),null);
__d("FriendRequestIHEventLogger",["Event","AsyncRequest","XFriendRequestIHEventLoggingController"],(function(a,b,c,d,e,f){__p&&__p();a={setupJewelListeners:function(a,b,c){this._setupForJewelSingleElement(a,b,"click"),c&&this._setupForJewelSingleElement(a,c,"click")},logImpression:function(a){this._logEvent(a,"impression")},_logEvent:function(a,event){if(isNaN(a))return;a=b("XFriendRequestIHEventLoggingController").getURIBuilder().setFBID("target_id",a).setString("log_event",event).getURI();new(b("AsyncRequest"))(a).setMethod("POST").send()},_setupForJewelSingleElement:function(a,c,d){b("Event").listen(c,"click",function(event){var b=a.getAttribute("id");if(!b)return;b=b.substring(0,b.length-6);this._logEvent(b,d)}.bind(this))}};e.exports=a}),null);
__d("QPEventHandling",[],(function(a,b,c,d,e,f){"use strict";a={registerClickListener:function(a,b,c){a.addEventListener("click",c)}};e.exports=a}),null);
__d("XQuickPromotionSimpleLoggingController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/qp/action/log/",{qp_id:{type:"Int",required:!0},qp_action:{type:"Enum",enumType:1},qp_instance_log_data:{type:"StringToStringMap",defaultValue:{}},qp_event:{type:"String"}})}),null);
__d("QPRenderer",["csx","CSS","FBLogger","Parent","QPEventHandling","XAsyncRequest","XQuickPromotionSimpleLoggingController","ge"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();function h(a,event,c){a=b("XQuickPromotionSimpleLoggingController").getURIBuilder().setInt("qp_id",a).setString("qp_event",event).setStringToStringMap("qp_instance_log_data",c).getURI();new(b("XAsyncRequest"))(a).send()}function a(a,c,d){a=b("XQuickPromotionSimpleLoggingController").getURIBuilder().setInt("qp_id",a).setEnum("qp_action",c).setStringToStringMap("qp_instance_log_data",d).getURI();new(b("XAsyncRequest"))(a).send()}function c(a,c,d,e,f,g){e=b("ge")(e);e!==null?i(a,d,e,g,function(){f&&b("CSS").hide(c)}):b("FBLogger")("quick_promotion").mustfix("Quick Promotion %s is missing %s action element.",a,d)}function d(a,c,d,e,f){i(a,c,d,f,function(){if(e){var a=b("Parent").bySelector(d,"._5jmm");a instanceof HTMLElement&&b("CSS").hide(a)}})}function e(a,c,d){c.show();h(a,"view",{});c.subscribe("cancel",function(){h(a,"dialog_cancel",{})});for(var e=0;e<d.length;e++){var f=d[e],g=b("ge")(f.element_id);g!==null?(i(a,f.action,g,f.extra_log_data,f.should_close?function(){c.hide()}:function(){}),f.action=="primary"&&g.focus()):b("FBLogger")("quick_promotion").mustfix("Quick Promotion %s is missing %s action element.",a,f.action)}}function i(a,c,d,e,f){b("QPEventHandling").registerClickListener(d,c,function(){var d=b("XQuickPromotionSimpleLoggingController").getURIBuilder().setInt("qp_id",a).setEnum("qp_action",c).setStringToStringMap("qp_instance_log_data",e).getURI();new(b("XAsyncRequest"))(d).send();f()})}f.setAction=c;f.setComponentActionForFeedUnitQP=d;f.setDialogActionsAndShow=e;f.logAction=a;f.logEvent=h}),null);
__d("JewelQPLogging",["QPRenderer"],(function(a,b,c,d,e,f){var g=!1,h=null,i=!1;function j(){if(i)return;g&&h&&(i=!0,b("QPRenderer").logEvent(String(h.promotion_id),"view",h.instance_log_data?h.instance_log_data:{}))}a={onJewelOpened:function(){g=!0,j()},updateQPLogData:function(a){h=a,j()}};e.exports=a}),null);
__d("RequestsJewelStore",["Arbiter","ArbiterMixin","ChannelConstants"],(function(a,b,c,d,e,f){__p&&__p();a=babelHelpers["extends"]({},b("ArbiterMixin"),{_initialized:!1,_count:0,_requestList:{},addFriendRequests:function(a){Object.assign(this._requestList,a)},getRequestListKeys:function(){return Object.keys(this._requestList)},removeRequest:function(a){delete this._requestList[a]},getRequestCount:function(a){return this.getRequestListKeys().length},decrementCount:function(){this.setCount(Math.max(0,this._count-1))},setCount:function(a){b("Arbiter").inform("jewel/count-updated",{jewel:"requests",count:a},b("Arbiter").BEHAVIOR_STATE)},setupListeners:function(){__p&&__p();if(this._initialized)return;this._initialized=!0;b("Arbiter").subscribe("jewel/count-updated",function(a,b){b.jewel==="requests"&&this._updateCount(b.count)}.bind(this));b("Arbiter").subscribe(b("ChannelConstants").getArbiterType("jewel_requests_add"),function(a,b){return this._addRequest(b)}.bind(this));b("Arbiter").subscribe(b("ChannelConstants").getArbiterType("jewel_friending_notifs"),function(a,b){return this._addNotification(b)}.bind(this));b("Arbiter").subscribe(b("ChannelConstants").getArbiterType("mobile_requests_count"),function(a,b){return this._updateBadgeCountFromObject(b)}.bind(this));b("Arbiter").subscribe(b("ChannelConstants").getArbiterType("jewel_requests_remove_old"),function(a,b){return this._removeOldRequest(b)}.bind(this));b("Arbiter").subscribe(b("ChannelConstants").getArbiterType("friend_requests_expired"),function(a,b){return this._refreshJewel(b)}.bind(this));b("Arbiter").subscribe(b("ChannelConstants").getArbiterType("friend_requests_seen"),function(a,b){return this.setCount(0)}.bind(this))},_updateCount:function(a){var b=this._count!==a;this._count=a;b&&this.inform("countUpdated",a)},_addRequest:function(a){__p&&__p();if(!a)return;a=a.obj;var b=a.from;a=a.suggester;b=this._requestList[b];b||this.setCount(this._count+1);b=b?b.type:null;a=b===19&&!a;this.inform("addRequest",{shouldReplace:a,previousType:b})},_updateBadgeCountFromObject:function(a){if(!a)return;a=a.obj;a=a.num_unseen+a.num_friend_confirmed_unseen+a.num_expire_highlight_unseen;this._refreshJewel();this.setCount(a)},_addNotification:function(a){if(!a||a.obj.notif_type!=="friend_confirmed")return;this.inform("addNotification")},_removeOldRequest:function(a){if(!a)return;a=this._requestList[a.obj.from];if(!a)return;this.inform("removeOldRequest",a)},_refreshJewel:function(a){this.inform("refreshJewel")}});e.exports=a}),null);
__d("XExpireFriendRequestsMutationController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/ajax/requests/expire/",{from_m_jewel:{type:"Bool",defaultValue:!1}})}),null);
__d("XGigaboxxUpdateSeenTimeAsyncController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/ajax/gigaboxx/endpoint/writesafe/update_last_seen_time/",{})}),null);
__d("RequestsJewelController",["invariant","Promise","Arbiter","AsyncRequest","AsyncSignal","CSS","DOM","DOMQuery","Event","EventProfiler","FriendRequestIHEventLogger","JewelQPLogging","MarauderLogger","Parent","PymkFunnelLogger","RequestsJewelStore","ScrollableArea","TimeSlice","XUIBadge","XExpireFriendRequestsMutationController","XGigaboxxUpdateSeenTimeAsyncController","ge","getElementPosition","getViewportDimensions","promiseDone","requireWeak","throttle"],(function(a,b,c,d,e,f,g){__p&&__p();var h=null;b("requireWeak")("FriendBrowserCheckboxController",function(a){return h=a});var i=31,j=600,k=30,l=160;m.getInstance=function(){"use strict";return this.$13};m.updateFromDOM=function(){"use strict";var a=this.getInstance();a&&a.fromDom()};m.setupScroll=function(){"use strict";var a=this.getInstance();a&&a.setupScroll()};m.setInitialHeight=function(){"use strict";var a=this.getInstance();a&&a.updateHeight()};m.maybeLoadJewel=function(){"use strict";var a=this.getInstance();a&&a.maybeLoadJewel()};m.setTitleBadgeCount=function(a){"use strict";this.$12&&this.$12.setCount(a)};m.initTitleBadge=function(a,c){"use strict";this.$12||b("Arbiter").subscribe(["FriendRequest/delete","FriendRequest/confirm","FriendSuggestion/accepting","FriendSuggestion/ignoring"],function(a,b){return this.decrementTitleBadgeCount(b)}.bind(this)),this.$12=c};m.decrementTitleBadgeCount=function(a){"use strict";this.$12&&this.$12.setCount(this.$12.getCount()-1)};m.isOpen=function(){"use strict";var a=this.getInstance();return a?a.$3():!1};m.create=function(a,b,c){"use strict";this.$13&&g(0);return this.$13=new m(a,b,c)};m.setupJewelRefresh=function(){"use strict";b("Arbiter").subscribe(["FriendRequest/confirmFromProfile","FriendRequest/deleteFromProfile"],function(a,c){a={};a.reloadcontent=!0;new(b("AsyncRequest"))().setURI("/ajax/requests/loader/").setData(a).setAllowCrossPageTransition(!0).send()})};function m(a,c,d){"use strict";this.$3=c,this.$2=d,this.$1=a,this.$5=-1,this.$6=-1,this.$11=b("Promise").resolve(!0),this.$9=b("throttle").acrossTransitionsWithBlocking(function(){return this.$14({log_impressions:!0})}.bind(this),5e3),b("RequestsJewelStore").subscribe("addRequest",this.$15.bind(this)),b("RequestsJewelStore").subscribe("addNotification",function(){return this.$16()}.bind(this)),b("RequestsJewelStore").subscribe("removeOldRequest",this.$17.bind(this)),b("RequestsJewelStore").subscribe("refreshJewel",function(){return this.$18()}.bind(this)),b("RequestsJewelStore").setupListeners(),this.setupScroll(),this.$19(),this.$20(),this.$21()}m.prototype.fromDom=function(){"use strict";__p&&__p();var a={};b("DOMQuery").scry(this.$1,"li.objectListItem").forEach(function(b){b=b.getAttribute("id");if(b){b=this.$22(b);b&&b.requester&&(a[b.requester]=b)}}.bind(this));b("RequestsJewelStore").addFriendRequests(a);this.$23()};m.prototype.maybeLoadJewel=function(){"use strict";this.$10&&(this.$10(function(){this.openHandler()}.bind(this)),this.$10=null)};m.prototype.updateHeight=function(){"use strict";var a=this.$24();a&&(a.style.height=this.$25()+"px")};m.prototype.markSeen=function(){"use strict";b("promiseDone")(this.$11,function(){b("DOMQuery").scry(this.$1,"li[id]")[0],new(b("AsyncRequest"))(b("XGigaboxxUpdateSeenTimeAsyncController").getURIBuilder().getURI()).setMethod("POST").setData({folder:this.$2}).send()}.bind(this))};m.prototype.openHandler=function(){"use strict";__p&&__p();!this.$7&&this.$3()&&(this.$7=!0,b("EventProfiler").tagCurrentActiveInteractionsAs("FirstRequestsJewelOpen"));b("Arbiter").inform("requestsJewel/opened");var a=b("ge")("fbRequestsJewelLoading"),c=this.$24();new(b("AsyncRequest"))().setURI(b("XExpireFriendRequestsMutationController").getURIBuilder().getURI()).send();if(!a&&!c)this.$10=b("TimeSlice").getGuardedContinuation("RequestsJewelController clickBeforeE2E continuation");else if(a)this.$9();else{a=b("RequestsJewelStore").getRequestListKeys();a.length>0&&new(b("AsyncRequest"))().setAllowCrossPageTransition(!0).setURI("/friends/requests/log_impressions").setData({ids:a.join(","),ref:"jewel"}).send()}c&&b("ScrollableArea").poke(c);b("JewelQPLogging").onJewelOpened()};m.prototype.closeHandler=function(){"use strict";b("Arbiter").inform("requestsJewel/closed"),b("DOMQuery").scry(this.$1,"li.jewelItemNew").forEach(function(a){b("CSS").removeClass(a,"jewelItemNew")}),b("DOMQuery").scry(this.$1,"span.highlightedExpireText").forEach(function(a){b("CSS").removeClass(a,"highlightedExpireText")})};m.prototype.setupScroll=function(){"use strict";var a=this.$24();a&&(this.$8=this.$26(),this.$4=0,b("ScrollableArea").getInstance(a).subscribe("scroll",this.$27.bind(this)),this.$28(),this.$29())};m.prototype.$19=function(){"use strict";b("Event").listen(this.$1,"submit",function(a){a=b("Parent").byClass(a.getTarget(),"objectListItem");a&&(b("CSS").removeClass(a,"jewelItemNew"),b("CSS").addClass(a,"jewelItemResponded"))})};m.prototype.$20=function(){"use strict";b("Event").listen(window,"resize",b("throttle").acrossTransitions(function(){this.updateHeight()}.bind(this)))};m.prototype.$21=function(){"use strict";b("Arbiter").subscribe("pymk-x-out",function(a,b){a=b.location;(a==="pymk_jewel_first_page"||a==="pymk_jewel")&&this.$28()}.bind(this))};m.prototype.$30=function(a){"use strict";a=parseInt(a,10);return isNaN(a)?null:a};m.prototype.$22=function(a){"use strict";a=a.match(/^(\d+)_(\d+)/);return!a?null:{requester:this.$30(a[1]),type:this.$30(a[2])}};m.prototype.$31=function(a,b){"use strict";return a==null||b==null?null:a+"_"+b};m.prototype.$32=function(a,b){"use strict";return a==null||b==null?null:a+"_"+b+"_req"};m.prototype.$24=function(){"use strict";return b("DOMQuery").scry(this.$1,".uiScrollableArea")[0]};m.prototype.$26=function(){"use strict";return b("DOMQuery").scry(this.$1,".uiScrollableAreaWrap")[0]};m.prototype.$27=function(){"use strict";__p&&__p();var a=b("DOMQuery").scry(this.$8,".uiMorePager").pop();if(a){var c=b("getElementPosition")(a).y,d=this.$24();c>0&&d&&b("CSS").addClass(d,"contentAfter");c=b("DOMQuery").find(a,"a");if(!c)return;d=b("getElementPosition")(c).y;if(d===this.$4)return;a=b("getElementPosition")(this.$8);a=a.y+a.height;if(d-300<a&&d>0){this.$4=d;a=c.getAttribute("ajaxify");a?new(b("AsyncRequest"))(a).setRelativeTo(c).setStatusElement(b("Parent").byClass(c,"stat_elem")).send():h&&h.getInstance("jewel").showMore()}}this.$28();this.$29()};m.prototype.$28=function(){"use strict";__p&&__p();if(!this.$8)return;var a=b("getElementPosition")(this.$8);a=a.y+a.height;var c=b("DOMQuery").scry(this.$1,"li.friendBrowserListUnit"),d=c.length-1;while(d>this.$5){var e=b("getElementPosition")(c[d]),f=e.y;e=f+e.height;if(f>0&&e<=a)break;d-=1}f=d;while(d>this.$5){e=b("DOMQuery").find(c[d],"input.friendBrowserID");a=parseInt(e.value,10);e=parseInt(c[d].getAttribute("data-signature"),10);b("PymkFunnelLogger").logImpression(a,e,"pymk_jewel");d--}this.$5=Math.max(this.$5,f)};m.prototype.$29=function(){"use strict";__p&&__p();if(!this.$8)return;var a=b("getElementPosition")(this.$8);a=a.y+a.height;var c=b("DOMQuery").scry(this.$1,"li.objectListItem"),d=c.length-1;while(d>this.$6){var e=b("getElementPosition")(c[d]),f=e.y;e=f+e.height;if(f>0&&e<=a)break;d-=1}f=d;while(d>this.$6){e=c[d].getAttribute("id");e=e.substring(0,e.length-6);b("MarauderLogger").log("request_seen","friend_request_waterfall",{request_id:e,request_location:"requests_jewel"});b("FriendRequestIHEventLogger").logImpression(e);d-=1}this.$6=Math.max(this.$6,f)};m.prototype.$14=function(){var a=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];this.$11=new(b("Promise"))(function(c,d){var e=!b("ge")("fbRequestsJewelLoading");new(b("AsyncRequest"))().setURI("/ajax/requests/loader/").setData(babelHelpers["extends"]({},a,{reloadcontent:e})).setFinallyHandler(function(a){!a.getError()?c(!0):d()}).send()})};m.prototype.$16=function(){"use strict";if(this.$3())return;this.$14()};m.prototype.$15=function(a,b){a=b.shouldReplace;b=b.previousType;if(!a&&(b||this.$3()))return;this.$14()};m.prototype.$17=function(a,c){a=c.requester;c=c.type;if(this.$3()||b("ge")("fbRequestsJewelLoading")!=null)return;var d=this.$31(a,c),e=d&&b("ge")(d);e||(d=this.$32(a,c),e=b("ge")(d));e&&(b("CSS").hasClass(e,"jewelItemNew")&&b("RequestsJewelStore").decrementCount(),b("CSS").hasClass(e,"jewelItemResponded")||(b("DOM").remove(e),b("RequestsJewelStore").removeRequest(a),this.$23()))};m.prototype.$18=function(){"use strict";if(this.$3())return;this.$14()};m.prototype.$23=function(){"use strict";b("DOMQuery").scry(this.$1,"li.empty").forEach(function(a){b("CSS").conditionShow(a,b("RequestsJewelStore").getRequestCount()<=0)})};m.prototype.$25=function(){"use strict";return Math.min(Math.max(b("getViewportDimensions")().height-l,k),j)+i};m.$13=null;e.exports=m}),null);
__d("RTCWebUserActionsTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(){this.clear()}a.prototype.log=function(){b("GeneratedLoggerUtils").log("logger:RTCWebUserActionsLoggerConfig",this.$1,b("Banzai").BASIC)};a.prototype.logVital=function(){b("GeneratedLoggerUtils").log("logger:RTCWebUserActionsLoggerConfig",this.$1,b("Banzai").VITAL)};a.prototype.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:RTCWebUserActionsLoggerConfig",this.$1,{signal:!0})};a.prototype.clear=function(){this.$1={};return this};a.prototype.getData=function(){return babelHelpers["extends"]({},this.$1)};a.prototype.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};a.prototype.setCallID=function(a){this.$1.call_id=a;return this};a.prototype.setCallType=function(a){this.$1.call_type=a;return this};a.prototype.setClientTime=function(a){this.$1.client_time=a;return this};a.prototype.setComponent=function(a){this.$1.component=a;return this};a.prototype.setConferenceName=function(a){this.$1.conference_name=a;return this};a.prototype.setConferenceState=function(a){this.$1.conference_state=a;return this};a.prototype.setErrorDomain=function(a){this.$1.error_domain=a;return this};a.prototype.setErrorType=function(a){this.$1.error_type=a;return this};a.prototype.setEvent=function(a){this.$1.event=a;return this};a.prototype.setMediaType=function(a){this.$1.media_type=a;return this};a.prototype.setPage=function(a){this.$1.page=a;return this};a.prototype.setSurface=function(a){this.$1.surface=a;return this};a.prototype.setVC=function(a){this.$1.vc=a;return this};c={call_id:!0,call_type:!0,client_time:!0,component:!0,conference_name:!0,conference_state:!0,error_domain:!0,error_type:!0,event:!0,media_type:!0,page:!0,surface:!0,vc:!0};e.exports=a}),null);
__d("DeviceBasedLoginWWWQP",["CSS","Event","tidyEvent"],(function(a,b,c,d,e,f){"use strict";a={swapWithShadowMessageOnClick:function(a,c,d){b("tidyEvent")(b("Event").listen(a,"click",function(a){b("CSS").hide(c),b("CSS").show(d)}))}};e.exports=a}),null);
__d("MNCommerceDialogStateStore",["FluxStore","MessengerDispatcher","MNCommerceActionTypes"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g;c=babelHelpers.inherits(a,b("FluxStore"));g=c&&c.prototype;function a(){g.constructor.call(this,b("MessengerDispatcher")),this.$MNCommerceDialogStateStore1=null,this.$MNCommerceDialogStateStore2=null}a.prototype.__onDispatch=function(a){__p&&__p();var c=a.type;switch(c){case b("MNCommerceActionTypes").DIALOG.SHOW:this.$MNCommerceDialogStateStore1=a.dialogContainer;this.$MNCommerceDialogStateStore2=a.state;this.__emitChange();break;case b("MNCommerceActionTypes").DIALOG.HIDE:this.$MNCommerceDialogStateStore1=null;this.$MNCommerceDialogStateStore2=null;this.__emitChange();break}};a.prototype.getDialogContainer=function(){return this.$MNCommerceDialogStateStore1};a.prototype.getState=function(){return this.$MNCommerceDialogStateStore2};a.__moduleID=e.id;e.exports=new a()}),null);
__d("PureStoreBasedStateMixin",["invariant","FluxMixinLegacyInstrumentation","StoreBasedStateMixinHelper","setImmediate"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();a=function(){__p&&__p();for(var a=arguments.length,c=Array(a),d=0;d<a;d++)c[d]=arguments[d];return b("FluxMixinLegacyInstrumentation").addInstrumentation({_callCalculateState:function(){return this.constructor.calculateState()},getInitialState:function(){this._onInitialStateForInstrumentation&&this._onInitialStateForInstrumentation();return this._callCalculateState()},UNSAFE_componentWillMount:function(){__p&&__p();this.constructor.calculateState||g(0);this._recalculateStateID=null;var a=function(){var a=this;this.isMounted()&&(function(){var b=a._collectStoreEmitsForInstrumentation?a._collectStoreEmitsForInstrumentation():null,c=a._callCalculateState();a.setState(a._logStoreEmitsForInstrumentation!=null?function(){b!=null&&this._logStoreEmitsForInstrumentation&&this._logStoreEmitsForInstrumentation(b);return c}.bind(a):c)})();this._recalculateStateID=null}.bind(this);this._mixin=new(b("StoreBasedStateMixinHelper"))(c);this._mixin.subscribeCallback(function(){this._recalculateStateID===null&&(this._recalculateStateID=b("setImmediate")(a))}.bind(this),this._addStoreEmitForInstrumentation)},componentWillUnmount:function(){this._mixin.release(),this._mixin=null}})}.bind(this);e.exports=a}),null);
__d("MNCommerceDialogContainer.react",["MNCommerceDialogStateStore","PureStoreBasedStateMixin","React"],(function(a,b,c,d,e,f){"use strict";a=b("React").createClass({displayName:"MNCommerceDialogContainer",mixins:[b("PureStoreBasedStateMixin")(b("MNCommerceDialogStateStore"))],statics:{calculateState:function(){var a=b("MNCommerceDialogStateStore").getDialogContainer();return{dialogContainer:a}}},render:function(){var a=this.state.dialogContainer;return!a?null:b("React").createElement(a,null)}});e.exports=a}),null);
__d("RTWebLoggingCallType",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({P2P:"p2p",MW:"mw",ESCALATED:"escalated"})}),null);
__d("RTWebLoggingComponent",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({AUDIO_CALL:"audio_button",VIDEO_CALL:"video_button",START_CALL:"start_call_button",END_CALL:"end_call_button",CANCEL:"cancel_button",CALL_BACK:"call_back",CALL_AGAIN:"call_again",REDIAL:"redial",SCREENSHARING:"screensharing",TOGGLE_VIDEO:"toggle_video",TOGGLE_AUDIO:"toggle_audio",TOGGLE_CHAT:"toggle_chat",ADD_PARTICIPANT:"add_participant",VIDEO_FILTER:"video_filter",FULLSCREEN:"fullscreen",CLOSE_WINDOW:"close_window",ACCEPT:"accept_button",DECLINE:"decline_button",NOT_NOW:"rating_not_now"})}),null);
__d("RTWebLoggingEvent",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({TAP:"tap",IMPRESSION:"impression",ERROR:"error"})}),null);
__d("RTWebLoggingMediaType",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({VIDEO:"video",AUDIO:"audio",ESCALATED:"escalated"})}),null);
__d("RTWebLoggingPage",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({MESSENGER_DOT_COM:"messenger_dot_com",FACEBOOK:"facebook",FB_MESSENGER:"fb_messenger",POPUP_WINDOW:"popup_window",P2P_CALL:"p2p_call"})}),null);
__d("RTWebUserActionLogger",["FBRTCConsoleLogger","RTCWebUserActionsTypedLogger","RTWebLoggingCallType","RTWebLoggingComponent","RTWebLoggingEvent","RTWebLoggingMediaType","RTWebLoggingPage"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a.prototype.logImpression=function(a){this.logEvent(babelHelpers["extends"]({eventName:b("RTWebLoggingEvent").IMPRESSION},a))};a.prototype.logClick=function(a){this.logEvent(babelHelpers["extends"]({eventName:b("RTWebLoggingEvent").TAP},a))};a.prototype.logError=function(a){this.logEvent(babelHelpers["extends"]({eventName:b("RTWebLoggingEvent").ERROR},a))};a.prototype.logEvent=function(event){var a=new(b("RTCWebUserActionsTypedLogger"))().setCallType(event.callType).setClientTime(Date.now()).setErrorDomain(event.errorDomain).setErrorType(event.errorType).setComponent(event.component).setConferenceState(event.conferenceState).setEvent(event.eventName).setMediaType(event.mediaType).setPage(event.page).setCallID(event.callID).setConferenceName(event.conferenceName).setSurface(event.surface),c=a.getData();a.log()};a.prototype.getCallType=function(a){var c=arguments.length<=1||arguments[1]===undefined?!1:arguments[1];if(a===null)return null;if(a)return b("RTWebLoggingCallType").MW;else if(c)return b("RTWebLoggingCallType").ESCALATED;else return b("RTWebLoggingCallType").P2P};a.prototype.getAudioVideoComponent=function(a){return a===null?null:a?b("RTWebLoggingComponent").AUDIO_CALL:b("RTWebLoggingComponent").VIDEO_CALL};a.prototype.getMediaType=function(a){var c=arguments.length<=1||arguments[1]===undefined?!1:arguments[1];if(c)return b("RTWebLoggingMediaType").ESCALATED;else if(a)return b("RTWebLoggingMediaType").AUDIO;else return b("RTWebLoggingMediaType").VIDEO};a.prototype.getPage=function(){var a=window.location.hostname;if(a.search("facebook")!==-1)return b("RTWebLoggingPage").FACEBOOK;else if(a.search("messenger")!==-1)return b("RTWebLoggingPage").MESSENGER_DOT_COM;return null};function a(){}e.exports=new a()}),null);
__d("P2PDialogStore",["EventEmitter","P2PActionConstants","P2PDispatcher"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g;void 0;var h={};c=babelHelpers.inherits(a,b("EventEmitter"));g=c&&c.prototype;function a(){g.constructor.call(this),b("P2PDispatcher").register(this.onEventDispatched.bind(this)),h={dialogClass:null,dialogProps:null}}a.prototype.getState=function(){return h};a.prototype.onEventDispatched=function(a){__p&&__p();var c=a.type;a=a.data;switch(c){case b("P2PActionConstants").DIALOG_SHOWN:h.dialogClass=a.dialogClass;h.dialogProps=a.dialogProps;this.emit("change");break;case b("P2PActionConstants").DIALOG_CLOSED:h.dialogClass=null;h.dialogProps=null;this.emit("change");break}};e.exports=new a()}),null);
__d("P2PDialogContainer.react",["P2PDialogStore","React"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g;c=babelHelpers.inherits(a,b("React").Component);g=c&&c.prototype;function a(){var a,c;for(var d=arguments.length,e=Array(d),f=0;f<d;f++)e[f]=arguments[f];return c=(a=g.constructor).call.apply(a,[this].concat(e)),this.state=b("P2PDialogStore").getState(),this.onDialogStoreChange=function(){this.setState(b("P2PDialogStore").getState())}.bind(this),c}a.prototype.componentDidMount=function(){this.dialogStoreSub=b("P2PDialogStore").addListener("change",this.onDialogStoreChange)};a.prototype.componentWillUnmount=function(){this.dialogStoreSub&&(this.dialogStoreSub.remove(),this.dialogStoreSub=null)};a.prototype.render=function(){if(!this.state.dialogClass)return null;var a=this.state.dialogClass;return b("React").createElement(a,babelHelpers["extends"]({},this.state.dialogProps,{key:"dialog"}))};e.exports=a}),null);
__d("PagesPlatformActionConstants",[],(function(a,b,c,d,e,f){"use strict";a=Object.freeze({BOOKING_REQUEST_ACCEPT_ERROR:"booking_request_accept_error",BOOKING_REQUEST_ACCEPT_INITIATED:"booking_request_accept_initiated",BOOKING_REQUEST_ACCEPTED:"booking_request_accepted",BOOKING_REQUEST_CREATED:"booking_request_created",BOOKING_REQUEST_DECLINE_ERROR:"booking_request_decline_error",BOOKING_REQUEST_DECLINE_INITIATED:"booking_request_decline_initiated",BOOKING_REQUEST_DECLINED:"booking_request_declined",BOOKING_REQUEST_RESCHEDULE_INITIATED:"booking_request_reschedule_initiated",BOOKING_REQUEST_RESCHEULED:"booking_request_reschedule",DIALOG_CLOSED:"dialog_closed",DIALOG_SHOWN:"dialog_shown",NEW_TIME_CHOSEN:"new_time_chosen"});e.exports=a}),null);
__d("PagesPlatformRequestDispatcher",["Dispatcher_DEPRECATED"],(function(a,b,c,d,e,f){"use strict";e.exports=new(b("Dispatcher_DEPRECATED"))()}),null);
__d("PagesPlatformDialogStore",["EventEmitter","PagesPlatformActionConstants","PagesPlatformRequestDispatcher"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g,h={};c=babelHelpers.inherits(a,b("EventEmitter"));g=c&&c.prototype;function a(){g.constructor.call(this),b("PagesPlatformRequestDispatcher").register(this.onEventDispatched.bind(this)),h={dialogClass:null,dialogProps:null}}a.prototype.getState=function(){return h};a.prototype.onEventDispatched=function(a){__p&&__p();var c=a.type;a=a.data;switch(c){case b("PagesPlatformActionConstants").DIALOG_SHOWN:h.dialogClass=a.dialogClass;h.dialogProps=a.dialogProps;this.emit("change");break;case b("PagesPlatformActionConstants").DIALOG_CLOSED:h.dialogClass=null;h.dialogProps=null;this.emit("change");break}};e.exports=new a()}),null);
__d("PagesPlatformDialogContainer.react",["PagesPlatformDialogStore","PureStoreBasedStateMixin","React"],(function(a,b,c,d,e,f){"use strict";a=b("React").createClass({displayName:"PagesPlatformDialogContainer",mixins:[b("PureStoreBasedStateMixin")(b("PagesPlatformDialogStore"))],statics:{calculateState:function(){return b("PagesPlatformDialogStore").getState()}},render:function(){if(!this.state.dialogClass)return null;var a=this.state.dialogClass;return b("React").createElement(a,babelHelpers["extends"]({},this.state.dialogProps,{key:"dialog"}))}});e.exports=a}),null);
__d("FBPaymentsDispatcher",["ExplicitRegistrationReactDispatcher"],(function(a,b,c,d,e,f){"use strict";var g;c=babelHelpers.inherits(a,b("ExplicitRegistrationReactDispatcher"));g=c&&c.prototype;function a(a){g.constructor.call(this,a),this.dispatch=this.dispatch.bind(this)}e.exports=new a({strict:!1})}),null);
__d("FBPaymentsDialogActions",["FBPaymentsDispatcher","keyMirror"],(function(a,b,c,d,e,f){"use strict";var g={types:b("keyMirror")({SHOW_DIALOG:null,HIDE_DIALOG:null}),showDialog:function(a,c){b("FBPaymentsDispatcher").dispatch({type:g.types.SHOW_DIALOG,data:{dialogClass:a,dialogProps:c}})},hideDialog:function(){b("FBPaymentsDispatcher").dispatch({type:g.types.HIDE_DIALOG,data:{}})}};e.exports=g}),null);
__d("FBPaymentsDialogStore",["FBPaymentsDialogActions","FBPaymentsDispatcher","FluxStore"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g;c=babelHelpers.inherits(a,b("FluxStore"));g=c&&c.prototype;function a(){g.constructor.call(this,b("FBPaymentsDispatcher")),this.$FBPaymentsDialogStore1={dialogClass:null,dialogProps:null}}a.prototype.__onDispatch=function(a){var c=a.type;a=a.data;switch(c){case b("FBPaymentsDialogActions").types.SHOW_DIALOG:this.$FBPaymentsDialogStore1={dialogClass:a.dialogClass,dialogProps:a.dialogProps};this.__emitChange();break;case b("FBPaymentsDialogActions").types.HIDE_DIALOG:this.$FBPaymentsDialogStore1={dialogClass:null,dialogProps:null};this.__emitChange();break}};a.prototype.getState=function(){return this.$FBPaymentsDialogStore1};a.__moduleID=e.id;e.exports=new a()}),null);
__d("FBPaymentsDialogContainer.react",["FBPaymentsDialogStore","FBPaymentsDispatcher","FluxContainer","React"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g;g=babelHelpers.inherits(a,b("React").Component);g&&g.prototype;a.calculateState=function(){return b("FBPaymentsDialogStore").getState()};a.getStores=function(){return[b("FBPaymentsDialogStore")]};a.prototype.UNSAFE_componentWillMount=function(){b("FBPaymentsDispatcher").explicitlyRegisterStore(b("FBPaymentsDialogStore"))};a.prototype.render=function(){if(!this.state.dialogClass)return null;var a=this.state.dialogClass;return b("React").createElement(a,babelHelpers["extends"]({},this.state.dialogProps,{key:"dialog"}))};function a(){g.apply(this,arguments)}e.exports=b("FluxContainer").create(a)}),null);
__d("RTWebLoggingSurface",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({CALL_CONTROLS:"call_controls",CHAT_TAB:"chat_tab",MESSENGER_HEADER:"messenger_header",INCOMING_DIALOG:"incoming_call_dialog",CALL_HEADER:"call_header",GROUP_CALL_PARTICIPANT_PICKER_DIALOG:"GROUP_CALL_PARTICIPANT_PICKER_DIALOG",P2P_CALL_CONTAINER:"p2p_call_container",TIMELINE_TOP_SECTION:"timeline_top_section",DROPDOWN_CALL_MENU:"dropdown_call_menu"})}),null);