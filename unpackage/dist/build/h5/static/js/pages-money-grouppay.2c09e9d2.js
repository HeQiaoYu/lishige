(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-money-grouppay"],{"0276":function(t,e,n){"use strict";n.r(e);var r=n("e494"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},"0fc1":function(t,e,n){"use strict";var r=n("c5ba"),i=n.n(r);i.a},"88ce":function(t,e,n){"use strict";var r,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"app"},[n("v-uni-view",{staticClass:"price-box"},[n("v-uni-text",[t._v("支付金额")]),n("v-uni-text",{staticClass:"price"},[t._v(t._s(t.orderInfo.money))])],1),n("v-uni-view",{staticClass:"pay-type-list"},[n("v-uni-view",{staticClass:"type-item b-b",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changePayType(1)}}},[n("v-uni-text",{staticClass:"icon yticon icon-weixinzhifu"}),n("v-uni-view",{staticClass:"con"},[n("v-uni-text",{staticClass:"tit"},[t._v("微信支付")]),n("v-uni-text",[t._v("推荐使用微信支付")])],1),n("v-uni-label",{staticClass:"radio"},[n("v-uni-radio",{attrs:{value:"",color:"#FF5722",checked:1==t.payType}})],1)],1),n("v-uni-view",{staticClass:"type-item b-b",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changePayType(2)}}},[n("v-uni-text",{staticClass:"icon yticon icon-alipay"}),n("v-uni-view",{staticClass:"con"},[n("v-uni-text",{staticClass:"tit"},[t._v("支付宝支付")])],1),n("v-uni-label",{staticClass:"radio"},[n("v-uni-radio",{attrs:{value:"",color:"#FF5722",checked:2==t.payType}})],1)],1),t.credit.success?n("v-uni-view",{staticClass:"type-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changePayType(3)}}},[n("v-uni-text",{staticClass:"icon yticon icon-erjiye-yucunkuan"}),n("v-uni-view",{staticClass:"con"},[n("v-uni-text",{staticClass:"tit"},[t._v("预存款支付")]),n("v-uni-text",[t._v("可用余额 ¥"+t._s(t.credit.current))])],1),n("v-uni-label",{staticClass:"radio"},[n("v-uni-radio",{attrs:{value:"",color:"#FF5722",checked:3==t.payType}})],1)],1):t._e()],1),n("v-uni-text",{staticClass:"mix-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.confirm.apply(void 0,arguments)}}},[t._v("确认支付")])],1)},a=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}))},"96cf":function(t,e){!function(e){"use strict";var n,r=Object.prototype,i=r.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag",u="object"===typeof t,l=e.regeneratorRuntime;if(l)u&&(t.exports=l);else{l=e.regeneratorRuntime=u?t.exports:{},l.wrap=b;var f="suspendedStart",p="suspendedYield",d="executing",h="completed",y={},v={};v[o]=function(){return this};var w=Object.getPrototypeOf,g=w&&w(w(F([])));g&&g!==r&&i.call(g,o)&&(v=g);var m=L.prototype=k.prototype=Object.create(v);_.prototype=m.constructor=L,L.constructor=_,L[s]=_.displayName="GeneratorFunction",l.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===_||"GeneratorFunction"===(e.displayName||e.name))},l.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,L):(t.__proto__=L,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(m),t},l.awrap=function(t){return{__await:t}},E(j.prototype),j.prototype[c]=function(){return this},l.AsyncIterator=j,l.async=function(t,e,n,r){var i=new j(b(t,e,n,r));return l.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},E(m),m[s]="Generator",m[o]=function(){return this},m.toString=function(){return"[object Generator]"},l.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},l.values=F,P.prototype={constructor:P,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(I),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,i){return c.type="throw",c.arg=t,e.next=r,i&&(e.method="next",e.arg=n),!!i}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],c=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var s=i.call(o,"catchLoc"),u=i.call(o,"finallyLoc");if(s&&u){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var a=r;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=e,a?(this.method="next",this.next=a.finallyLoc,y):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),I(n),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;I(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:F(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),y}}}function b(t,e,n,r){var i=e&&e.prototype instanceof k?e:k,a=Object.create(i.prototype),o=new P(r||[]);return a._invoke=C(t,n,o),a}function x(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}function k(){}function _(){}function L(){}function E(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function j(t){function e(n,r,a,o){var c=x(t[n],t,r);if("throw"!==c.type){var s=c.arg,u=s.value;return u&&"object"===typeof u&&i.call(u,"__await")?Promise.resolve(u.__await).then((function(t){e("next",t,a,o)}),(function(t){e("throw",t,a,o)})):Promise.resolve(u).then((function(t){s.value=t,a(s)}),(function(t){return e("throw",t,a,o)}))}o(c.arg)}var n;function r(t,r){function i(){return new Promise((function(n,i){e(t,r,n,i)}))}return n=n?n.then(i,i):i()}this._invoke=r}function C(t,e,n){var r=f;return function(i,a){if(r===d)throw new Error("Generator is already running");if(r===h){if("throw"===i)throw a;return O()}n.method=i,n.arg=a;while(1){var o=n.delegate;if(o){var c=S(o,n);if(c){if(c===y)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===f)throw r=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=d;var s=x(t,e,n);if("normal"===s.type){if(r=n.done?h:p,s.arg===y)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r=h,n.method="throw",n.arg=s.arg)}}}function S(t,e){var r=t.iterator[e.method];if(r===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=n,S(t,e),"throw"===e.method))return y;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var i=x(r,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,y;var a=i.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,y):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,y)}function T(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function I(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function F(t){if(t){var e=t[o];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var r=-1,a=function e(){while(++r<t.length)if(i.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=n,e.done=!0,e};return a.next=a}}return{next:O}}function O(){return{value:n,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},c5ba:function(t,e,n){var r=n("d3f2");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("4f06").default;i("4aef8fa9",r,!0,{sourceMap:!1,shadowMode:!1})},c964:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return i}));n("d3b7"),n("e6cf");function r(t,e,n,r,i,a,o){try{var c=t[a](o),s=c.value}catch(u){return void n(u)}c.done?e(s):Promise.resolve(s).then(r,i)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(i,a){var o=t.apply(e,n);function c(t){r(o,i,a,c,s,"next",t)}function s(t){r(o,i,a,c,s,"throw",t)}c(void 0)}))}}},d3f2:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */.app[data-v-2a826513]{width:100%}.price-box[data-v-2a826513]{background-color:#fff;height:%?265?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?28?%;color:#909399}.price-box .price[data-v-2a826513]{font-size:%?50?%;color:#303133;margin-top:%?12?%}.price-box .price[data-v-2a826513]:before{content:"￥";font-size:%?40?%}.pay-type-list[data-v-2a826513]{margin-top:%?20?%;background-color:#fff;padding-left:%?60?%}.pay-type-list .type-item[data-v-2a826513]{height:%?120?%;padding:%?20?% 0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding-right:%?60?%;font-size:%?30?%;position:relative}.pay-type-list .icon[data-v-2a826513]{width:%?100?%;font-size:%?52?%}.pay-type-list .icon-erjiye-yucunkuan[data-v-2a826513]{color:#fe8e2e}.pay-type-list .icon-weixinzhifu[data-v-2a826513]{color:#36cb59}.pay-type-list .icon-alipay[data-v-2a826513]{color:#01aaef}.pay-type-list .tit[data-v-2a826513]{font-size:%?32?%;color:#303133;margin-bottom:%?4?%}.pay-type-list .con[data-v-2a826513]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;font-size:%?24?%;color:#909399}.mix-btn[data-v-2a826513]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?630?%;height:%?80?%;margin:%?80?% auto %?30?%;font-size:%?32?%;color:#fff;background-color:#ff5722;border-radius:%?10?%;-webkit-box-shadow:1px 2px 5px rgba(219,63,96,.4);box-shadow:1px 2px 5px rgba(219,63,96,.4)}',""]),t.exports=e},e494:function(t,e,n){"use strict";var r=n("ee27");n("99af"),n("ac1f"),n("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var i=r(n("c964")),a=r(n("d0af")),o=n("bfd6"),c=n("1cdcb"),s={data:function(){return{payType:1,orderInfo:{},wechat:{success:!1},alipay:{success:!1},credit:{success:!1,current:0},list:{},show:0}},computed:{},onLoad:function(t){var e=this;this.orderId=t.id,this.teamid=t.teamid,uni.showLoading({title:"加载中"});var n=encodeURIComponent(window.location.href.split("#")[0]);(0,o.config)(n).then((function(t){var r=(0,a.default)(t,2),i=(r[0],r[1]),s=i;if(c.config({debug:!1,appId:s.data.appId,timestamp:s.data.timestamp,nonceStr:s.data.nonceStr,signature:s.data.signature,surl:s.data.surl,jsApiList:["updateAppMessageShareData","updateTimelineShareData","chooseWXPay"]}),uni.getStorageSync("openids"))e.getPayInfo();else{var u=(0,o.parseQuery)(),l=u.code;if(l)(0,o.getopenid)(l).then((function(t){var n=(0,a.default)(t,2),r=(n[0],n[1]),i=r.data;console.log(i.data),uni.setStorageSync("openids",i.data),e.getPayInfo()}));else{var f=n,p=encodeURIComponent((""+Math.random()).split(".")[1]+"authorizestate");location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=".concat(s.data.appId,"&redirect_uri=").concat(f,"&response_type=code&scope=snsapi_userinfo&state=").concat(p,"#wechat_redirect")}}}))},methods:{getPayInfo:function(){var t=this,e=this.$store.state.app.openid,n=uni.getStorageSync("openids");(0,o.grouppay)(this.orderId,this.teamid,e,n).then((function(e){var n=(0,a.default)(e,2),r=(n[0],n[1]),i=r.data;uni.hideLoading(),t.show=1,1==i.error&&(t.$api.msg(e.message),uni.redirectTo({url:"/pages/mygroups/orderDetails?id="+t.orderId})),t.wechat=i.data.wechat.payinfo,i.data.wechat.success||(uni.showToast(i.data.wechat.message),t.complete("wechat")),t.orderInfo=i.data,t.alipay=i.data.alipay,t.credit=i.data.credit,t.list=i}))},changePayType:function(t){this.payType=t},complete:function(t,e){var n=this,r=this.$store.state.app.openid;(0,o.groupcomplete)(n.orderId,t,r).then((function(t){var e=(0,a.default)(t,2),r=(e[0],e[1]),i=r.data;i.error,uni.redirectTo({url:"/pages/mygroups/orderDetails?id="+n.orderId})}))},confirm:function(){var t=(0,i.default)(regeneratorRuntime.mark((function t(){var e,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e=this,n=this.payType,this.$store.state.app.openid,1==n?c.ready((function(){console.log(e.wechat.paySign),c.chooseWXPay({timestamp:e.wechat.timestamp,nonceStr:e.wechat.nonceStr,package:e.wechat.package,signType:"HMAC-SHA256",paySign:e.wechat.paySign,success:function(t){e.complete("wechat")}})})):3==n?e.complete("credit"):uni.showToast("未开通");case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}};e.default=s},fccb:function(t,e,n){"use strict";n.r(e);var r=n("88ce"),i=n("0276");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("0fc1");var o,c=n("f0c5"),s=Object(c["a"])(i["default"],r["b"],r["c"],!1,null,"2a826513",null,!1,r["a"],o);e["default"]=s.exports}}]);