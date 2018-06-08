if (self.CavalryLogger) { CavalryLogger.start_js(["KTF4J"]); }

__d("SwapButtonDEPRECATED",["Event","Arbiter","CSS","Focus"],(function(a,b,c,d,e,f){function a(a,c,d){this._swapperButton=a,this._swappeeButton=c,b("Event").listen(a,"click",this.swap.bind(this)),d&&b("Event").listen(c,"click",this.unswap.bind(this)),b("Arbiter").subscribe("SwapButtonDEPRECATED/focusOnJoinButton",this.setFocusOnSwapper.bind(this),b("Arbiter").SUBSCRIBE_ALL)}Object.assign(a.prototype,{_swapperButton:null,_swappeeButton:null,swap:function(a){b("CSS").hide(this._swapperButton),b("CSS").show(this._swappeeButton),a!==!1&&b("Focus").setWithoutOutline(this._swappeeButton)},unswap:function(a){b("CSS").show(this._swapperButton),b("CSS").hide(this._swappeeButton),a!==!1&&b("Focus").setWithoutOutline(this._swapperButton)},toggle:function(){b("CSS").toggle(this._swapperButton),b("CSS").toggle(this._swappeeButton)},setFocusOnSwapper:function(){this._swapperButton.focus()}});e.exports=a}),null);
__d("XFollowPrivacyNuxLogViewAsyncController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/follow/follow_privacy/nux/log/view/",{})}),null);
__d("XPubcontentChainedSuggestionsController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/pubcontent/chained_suggestions/",{pageid:{type:"String"},profileid:{type:"Int"},eh:{type:"Bool",defaultValue:!1},friendid:{type:"Int"}})}),null);
__d("SubscribeButton",["Arbiter","AsyncRequest","Button","CSS","Event","TooltipData","XFollowPrivacyNuxLogViewAsyncController","XPubcontentChainedSuggestionsController"],(function(a,b,c,d,e,f){__p&&__p();var g={SUBSCRIBED:"FollowingUser",UNSUBSCRIBED:"UnfollowingUser",_enable:function(a){b("Button").setEnabled(a,!0),b("TooltipData").remove(a)},_disable:function(a,c){b("Button").setEnabled(a,!1),c&&b("TooltipData").set(a,c)},init:function(a,c,d,e,f,h,i,j,k,l,m,n,o){__p&&__p();var p=!m&&!o,q=!(k===undefined||k===null);q&&!i&&!j&&g._disable(c,k);b("Event").listen(c,"click",function(){b("Arbiter").inform(g.SUBSCRIBED,{profile_id:e,contextID:n,suppress:!0});if(l){l.show();var a=b("XFollowPrivacyNuxLogViewAsyncController").getURIBuilder().getURI();new(b("AsyncRequest"))(a).send()}});b("Arbiter").subscribe(g.SUBSCRIBED,function(k,l){__p&&__p();if(e==l.profile_id){f||d.suppressNextMouseEnter&&d.suppressNextMouseEnter();q&&(typeof l.connected!=="undefined"&&(i=l.connected),(i||j)&&g._enable(c));l.focusOnClick!==undefined&&(p=l.focusOnClick);a.swap(p);if(h===!0&&l.chaining!==!1){k=b("XPubcontentChainedSuggestionsController").getURIBuilder().setInt("profileid",e).getURI();new(b("AsyncRequest"))().setURI(k).send()}}});b("Arbiter").subscribe(g.UNSUBSCRIBED,function(f,h){e==h.profile_id&&(a.unswap(p),d.hideFlyout&&d.hideFlyout(),q&&(typeof h.connected!=="undefined"&&(i=h.connected),!i&&!j&&g._disable(c,k)),b("Arbiter").inform("SubMenu/Reset"))})},initSubscribe:function(a,c){b("Event").listen(a,"click",function(){setTimeout(b("Arbiter").inform.bind(b("Arbiter"),g.SUBSCRIBED,{profile_id:c}),0)})},initUnsubscribe:function(a,c,d){b("Event").listen(a,"click",function(){setTimeout(b("Arbiter").inform.bind(b("Arbiter"),g.UNSUBSCRIBED,{profile_id:c,contextID:d}),0)})},initSubscribeMenuItem:function(a,c,d){b("CSS").hide(c),this._initMenuItem(a,c,d)},initUnsubscribeMenuItem:function(a,c,d){b("CSS").hide(a),this._initMenuItem(a,c,d)},_initMenuItem:function(a,c,d){this.initSubscribe(a,d),this.initUnsubscribe(c,d),b("Arbiter").subscribe(g.SUBSCRIBED,function(d,e){b("CSS").hide(a),b("CSS").show(c)}),b("Arbiter").subscribe(g.UNSUBSCRIBED,function(d,e){b("CSS").hide(c),b("CSS").show(a)})}};e.exports=g}),null);
__d("DialogHideOnSuccess",["csx","cx","CSS"],(function(a,b,c,d,e,f,g,h){__p&&__p();function a(a){"use strict";this._layer=a}a.prototype.enable=function(){"use strict";this._subscription=this._layer.subscribe("success",this._handle.bind(this))};a.prototype.disable=function(){"use strict";this._subscription.unsubscribe(),this._subscription=null};a.prototype._handle=function(a,event){"use strict";b("CSS").matchesSelector(event.getTarget(),"._s")&&this._layer.hide()};Object.assign(a.prototype,{_subscription:null});e.exports=a}),null);
__d("ContextualLayerInlineTabOrder",["DOM","DOMTraverser","Event","Focus","Keys","SubscriptionsHandler","TabbableElements","getOrCreateDOMID"],(function(a,b,c,d,e,f){__p&&__p();function a(a){"use strict";this._layer=a,this._isSetup=!1,this._ignoreFocus=!1,this._layerFocused=!0,this._layerRoot=this._layer.getContentRoot(),this._layerID=b("getOrCreateDOMID")(this._layerRoot),this._mutedTabbables=new Map([]),this._subscriptions=new(b("SubscriptionsHandler"))(),this._tabbableLayerElements=[]}a.prototype.enable=function(){"use strict";this._subscriptions.addSubscriptions(this._layer.subscribe("aftershow",this._onAfterShow.bind(this)),this._layer.subscribe("hide",this._onAfterHide.bind(this))),this._layer.isShown()&&this._onAfterShow()};a.prototype.disable=function(){"use strict";this._subscriptions.release(),this._isSetup=!1};a.prototype._getContext=function(){"use strict";return this._layer.getCausalElement()};a.prototype._getContextOwns=function(){"use strict";var a=this._getContext();if(!a)return[];a=(a.getAttribute("aria-owns")||"").trim();a=a?a.match(/[^ ]+/g):[];return a};a.prototype._identifyTabbableElements=function(){"use strict";this._tabbableLayerElements=b("TabbableElements").find(this._layerRoot),!this._tabbableLayerElements.length&&!this._mutedTabbables.size&&this._layerRoot.setAttribute("tabindex","0"),this._layerRoot.tabIndex>=0&&this._tabbableLayerElements.unshift(this._layerRoot)};a.prototype._onAfterShow=function(){"use strict";this._setupTabBehavior();var a=this._getContext(),b=this._getContextOwns();a&&!b.includes(this._layerID)&&(b.push(this._layerID),a.setAttribute("aria-owns",b.join(" ")))};a.prototype._onAfterHide=function(){"use strict";var a=this._getContext();if(a){var b=this._getContextOwns(),c=b.indexOf(this._layerID);c>-1&&(b.splice(c,1),a.setAttribute("aria-owns",b.join(" ")))}};a.prototype._setupTabBehavior=function(){"use strict";if(!this._isSetup){var a=this._getContext();if(!this._layerRoot||!a)return;this._setupTabTriggers();this._setupTabToggle();this._isSetup=!0}};a.prototype._setupTabTriggers=function(){"use strict";var a=this._getContext();b("TabbableElements").isTabbable(a)||a.setAttribute("tabindex","0");this._subscriptions.addSubscriptions(b("Event").listen(a,"keyup",this._checkNUXFocus.bind(this)),b("Event").listen(a,"keydown",this._checkNUXFocus.bind(this)),b("Event").listen(this._layerRoot,"keydown",this._checkContextFocus.bind(this)),b("Event").listen(this._layerRoot,"layerFocus",this._setNUXFocusStart.bind(this)),b("Event").listen(this._layerRoot,"layerFocusEnd",this._setNUXFocusEnd.bind(this)),b("Event").listen(this._layerRoot,"tempFocusIgnore",this._tempIgnoreFocus.bind(this)))};a.prototype._setupTabToggle=function(){"use strict";this._handleLayerBlur(),this._subscriptions.addSubscriptions(b("Event").listen(document.documentElement,"click",this._checkForFocus.bind(this)),b("Event").listen(document.documentElement,"keydown",this._checkForFocus.bind(this)))};a.prototype._handleLayerBlur=function(){"use strict";__p&&__p();if(!this._layerFocused)return;this._identifyTabbableElements();this._tabbableLayerElements.forEach(function(a){if(!this._mutedTabbables.has(a)){var b=a.getAttribute("tabindex");a.setAttribute("tabindex","-1");this._mutedTabbables.set(a,b)}},this);this._layerFocused=!1};a.prototype._handleLayerFocus=function(){"use strict";__p&&__p();if(this._layerFocused)return;for(var a=this._mutedTabbables,b=Array.isArray(a),c=0,a=b?a:a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var d;if(b){if(c>=a.length)break;d=a[c++]}else{c=a.next();if(c.done)break;d=c.value}d=d;var e=d[0];d=d[1];d===null?e.removeAttribute("tabindex"):e.setAttribute("tabindex",d)}this._mutedTabbables.clear();this._layerFocused=!0};a.prototype._checkNUXFocus=function(event){"use strict";__p&&__p();if(this._ignoreFocus){event.preventDefault();this._ignoreFocus=!1;return}if(event.getTarget()!==this._getContext()||!this._layer.isShown())return;var a=b("Event").getKeyCode(event),c=this._getContextOwns();if(!c.length||a!==b("Keys").TAB)return;a=event.getModifiers();a=a.shift;var d=c[0]===this._layerID;c=c[c.length-1]===this._layerID;(event.type==="keydown"&&a&&c||event.type==="keyup"&&!a&&d)&&(event.preventDefault(),b("Event").fire(this._layerRoot,a?"layerFocusEnd":"layerFocus"))};a.prototype._setNUXFocusStart=function(){"use strict";this._handleLayerFocus(),this._identifyTabbableElements(),b("Focus").set(this._tabbableLayerElements[0])};a.prototype._setNUXFocusEnd=function(){"use strict";this._handleLayerFocus(),this._identifyTabbableElements(),b("Focus").set(this._tabbableLayerElements[this._tabbableLayerElements.length-1])};a.prototype._tempIgnoreFocus=function(){"use strict";this._ignoreFocus=!0};a.prototype._checkContextFocus=function(event){"use strict";__p&&__p();var a=b("Event").getKeyCode(event),c=event.getModifiers();c=c.shift;this._handleLayerFocus();this._identifyTabbableElements();if(!this._tabbableLayerElements.length||a!==b("Keys").TAB||!this._getContext())return;a=this._tabbableLayerElements[0];var d=this._tabbableLayerElements[this._tabbableLayerElements.length-1];event.getTarget()===d&&!c?this._setFocusAfterLayer()&&event.preventDefault():event.getTarget()===a&&c&&(this._setFocusBeforeLayer()&&event.preventDefault())};a.prototype._isTabbableNode=function(a){"use strict";return b("TabbableElements").isTabbable(a)&&!b("DOM").contains(this._layerRoot,a)};a.prototype._setFocusBeforeLayer=function(){"use strict";__p&&__p();var a=this._getContextOwns();if(!a||!a.length)return!1;if(a[0]===this._layerID){var c=b("DOMTraverser").previousFilteredNode(document.body,this._getContext(),this._isTabbableNode.bind(this));b("Focus").set(c);return!0}if(a.includes(this._layerID)){c=a[a.indexOf(this._layerID)-1];return this._focusOnElement(c,!0)}return!1};a.prototype._setFocusAfterLayer=function(){"use strict";__p&&__p();var a=this._getContextOwns();if(!a||!a.length)return!1;if(a[a.length-1]===this._layerID){this._refocusOnContext();return!0}if(a.includes(this._layerID)){a=a[a.indexOf(this._layerID)+1];return this._focusOnElement(a,!1)}return!1};a.prototype._focusOnElement=function(a,c){"use strict";a=document.getElementById(a);if(!a)return!1;b("Event").fire(a,c?"layerFocusEnd":"layerFocus");this._handleLayerBlur();return!0};a.prototype._refocusOnContext=function(event){"use strict";var a=this._getContext(),c=this._getContextOwns();b("Event").fire(document.getElementById(c[0]),"tempFocusIgnore");this._handleLayerBlur();a&&(a.tabIndex===-1?(a.tabIndex=0,b("Focus").setWithoutOutline(a)):b("Focus").set(a))};a.prototype._checkForFocus=function(event){"use strict";var a=event.getTarget(),c=this._layer.getContentRoot();c=b("DOM").contains(c,a);!this._ignoreFocus&&!this._layerFocused&&c&&this._handleLayerFocus();this._layerFocused&&!c&&this._handleLayerBlur()};e.exports=a}),null);
__d("LayerRemoveOnHide",["DOM"],(function(a,b,c,d,e,f){__p&&__p();function a(a){"use strict";this._layer=a}a.prototype.enable=function(){"use strict";this._subscription=this._layer.subscribe("hide",b("DOM").remove.bind(null,this._layer.getRoot()))};a.prototype.disable=function(){"use strict";this._subscription&&(this._subscription.unsubscribe(),this._subscription=null)};Object.assign(a.prototype,{_subscription:null});e.exports=a}),null);