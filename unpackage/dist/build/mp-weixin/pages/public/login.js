(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/public/login"],{"23ee":function(e,t,n){"use strict";n.r(t);var o=n("75de"),r=n("3622");for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n("3989");var a,c=n("f0c5"),u=Object(c["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);t["default"]=u.exports},3622:function(e,t,n){"use strict";n.r(t);var o=n("58d7"),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},3989:function(e,t,n){"use strict";var o=n("f081"),r=n.n(o);r.a},"58d7":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=u(n("4795")),r=n("302f"),i=n("2f62"),a=n("7638"),c=n("08ad");function u(e){return e&&e.__esModule?e:{default:e}}function s(e,t){return g(e)||p(e,t)||l(e,t)||f()}function f(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e,t){if(e){if("string"===typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function p(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(o=(a=c.next()).done);o=!0)if(n.push(a.value),t&&n.length===t)break}catch(u){r=!0,i=u}finally{try{o||null==c["return"]||c["return"]()}finally{if(r)throw i}}return n}}function g(e){if(Array.isArray(e))return e}function h(e,t,n,o,r,i,a){try{var c=e[i](a),u=c.value}catch(s){return void n(s)}c.done?t(u):Promise.resolve(u).then(o,r)}function v(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var i=e.apply(t,n);function a(e){h(i,o,r,a,c,"next",e)}function c(e){h(i,o,r,a,c,"throw",e)}a(void 0)}))}}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){y(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w={data:function(){return{codeText:{getCode:"获取验证码",countDown:"s重新获取",getAgain:"重新获取"},codeTextShow:0,count:59,code:a.VUE_APP_API_URL+"app/ewei_shopv2_api.php?i=1&r=sms.captcha&comefrom=wxapp&openid=sns_wa_&mid=&merchid=&authkey=&s="+(new Date).getTime(),disabled:!1,mobile:"",verificationcode:"",password:"",logining:!1,isCanUse:e.getStorageSync("isCanUse")||!0,phonecode:"",logininfo:{},back:1}},onLoad:function(e){this.login()},onBackPress:function(t){return 1!=this.back&&(e.switchTab({url:"/pages/index/index"}),!0)},methods:m({},(0,i.mapMutations)(["LOGIN"]),{inputChange:function(e){var t=e.currentTarget.dataset.key;this[t]=e.detail.value},backs:function(){e.navigateBack({delta:2})},navBack:function(){e.navigateBack()},toRegist:function(){this.$api.msg("去注册")},btn_imgUpdate:function(){var e=this;console.log(123),e.$set(e,"code",(0,c.changeURLArg)(this.code,"s",(new Date).getTime()))},wxGetUserInfo:function(){var t=this;e.getUserInfo({provider:"weixin",success:function(n){t.encryptedData=n.encryptedData,t.iv=n.iv;try{e.setStorageSync("isCanUse",!1),t.updateUserInfo()}catch(o){}},fail:function(e){}})},login:function(){var t=this;e.showLoading({title:"登录中..."}),e.login({provider:"weixin",success:function(n){var o=n.code;t.isCanUse||e.getUserInfo({provider:"weixin",success:function(e){(0,r.login)({code:o}).then((function(n){t.logininfo=n,t.encryptedData=e.encryptedData,t.iv=e.iv,t.updateUserInfo()}))}}),(0,r.login)({code:o}).then((function(n){t.logininfo=n,e.hideLoading()}))}})},updateUserInfo:function(){var t=this,n=this.logininfo,o={data:t.encryptedData,iv:t.iv,sessionKey:n.session_key,phone:t.mobile};(0,r.authLogin)(o).then((function(n){var o={expires_time:n.watermark.timestamp,openid:n.openId,token:""};t.LOGIN(o),""!=e.getStorageSync("back")?e.navigateBack():e.switchTab({url:"/pages/user/user"})})).catch((function(e){console.log(e)}))},toLogin:function(){var t=this;return v(o.default.mark((function n(){var i,a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.logining=!0,i=t.mobile,a=t.phonecode,(0,r.userLogin)(i,a).then((function(n){var o=s(n,2),r=(o[0],o[1]),i=r.data;if(t.logining=!1,0==i.error){var a={token:i.token,expires_time:i.expire,openid:i.member.openid};t.LOGIN(a),""!=e.getStorageSync("back")?e.navigateBack():e.switchTab({url:"/pages/user/user"})}else e.showToast({title:Error.msg,duration:500,icon:"none"})})).catch((function(n){e.showToast({title:n.msg,duration:500,icon:"none"}),t.logining=!1}));case 3:case"end":return n.stop()}}),n)})))()},getCode:function(){var t=this,n=this.mobile,o=this.verificationcode;(0,r.smsphone)(n,o).then((function(n){var o=s(n,2),r=(o[0],o[1]),i=r.data;if(0==i.error||""==i){t.codeTextShow=1,t.disabled=!0;var a=setInterval((function(){--t.count}),1e3);setTimeout((function(){clearInterval(a),t.count=59,t.codeTextShow=2,t.disabled=!1}),6e4)}else e.showToast({title:i.message?i.message:i.error,duration:500,icon:"none"})})).catch((function(t){console.log(t),e.showToast({title:t.msg,duration:500,icon:"none"})}))}})};t.default=w}).call(this,n("543d")["default"])},"75de":function(e,t,n){"use strict";var o,r=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}))},a0d8:function(e,t,n){"use strict";(function(e){n("969c");o(n("66fd"));var t=o(n("23ee"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},f081:function(e,t,n){}},[["a0d8","common/runtime","common/vendor"]]]);