(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/money/pay"],{"29fa":function(e,t,n){"use strict";n.r(t);var r=n("a221"),o=n("b330");for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);n("5eae");var a,i=n("f0c5"),u=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);t["default"]=u.exports},5549:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=c(n("4795")),o=n("4d01");function c(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n,r,o,c,a){try{var i=e[c](a),u=i.value}catch(s){return void n(s)}i.done?t(u):Promise.resolve(u).then(r,o)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var c=e.apply(t,n);function i(e){a(c,r,o,i,u,"next",e)}function u(e){a(c,r,o,i,u,"throw",e)}i(void 0)}))}}var u={data:function(){return{payType:1,orderInfo:{},show:!1,wechat:{success:!1},alipay:{success:!1},credit:{success:!1,current:0},list:{}}},computed:{},onLoad:function(e){this.orderId=e.orderid,this.getPayInfo()},methods:{getPayInfo:function(){var t=this;this.$store.state.app.openid;(0,o.pay)(this.orderId).then((function(n){e.hideLoading(),t.show=1,1==n.error&&e.redirectTo({url:"/pages/mygroups/orderDetails?id="+t.orderId}),t.wechat=n.xcxpay.payinfo,n.xcxpay.success||(e.showToast(n.xcxpay.message),t.complete("wechat")),t.orderInfo=n.order,t.list=n}))},changePayType:function(e){this.payType=e},complete:function(t,n){var r=this;(0,o.complete)(r.orderId,t,n).then((function(t){0!=t.error?e.showToast({title:t.message,duration:2e3,success:function(){e.redirectTo({url:"/pages/order/orderDetails?id="+r.orderId})}}):e.showToast({title:t.order.status,duration:2e3,icon:"none",success:function(){e.redirectTo({url:"/pages/order/orderDetails?id="+r.orderId})}})})).catch((function(t){e.redirectTo({url:"/pages/order/orderDetails?id="+r.orderId})}))},confirm:function(){var t=i(r.default.mark((function t(){var n,c;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=this,c=this.payType,(0,o.checkstock)(n.orderId).then((function(t){1==c?e.requestPayment({provider:"wxpay",timeStamp:n.wechat.timeStamp,nonceStr:n.wechat.nonceStr,package:n.wechat.package,signType:"MD5",paySign:n.wechat.paySign,success:function(e){n.complete("xcxwechat")},fail:function(e){n.complete("xcxwechat"),console.log("fail:"+JSON.stringify(e))}}):3==c?n.complete("credit"):e.requestPayment({provider:"wxpay",orderInfo:n.wechat.payinfo,success:function(e){console.log(e),n.complete("xcxwechat")},fail:function(e){n.complete("xcxwechat"),console.log("fail:"+JSON.stringify(e))}})})).catch((function(t){e.showToast("未开通")}));case 3:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}()}};t.default=u}).call(this,n("543d")["default"])},"5eae":function(e,t,n){"use strict";var r=n("ee2c"),o=n.n(r);o.a},a221:function(e,t,n){"use strict";var r,o=function(){var e=this,t=e.$createElement;e._self._c},c=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return r}))},b330:function(e,t,n){"use strict";n.r(t);var r=n("5549"),o=n.n(r);for(var c in r)"default"!==c&&function(e){n.d(t,e,(function(){return r[e]}))}(c);t["default"]=o.a},ceaa:function(e,t,n){"use strict";(function(e){n("969c");r(n("66fd"));var t=r(n("29fa"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},ee2c:function(e,t,n){}},[["ceaa","common/runtime","common/vendor"]]]);