(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mygroups/groups_detail"],{"0677":function(t,e,a){"use strict";var o=a("3074"),r=a.n(o);r.a},3074:function(t,e,a){},"4d13":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o("4d01");function n(t,e){return c(t)||u(t,e)||s(t,e)||i()}function i(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t,e){if(t){if("string"===typeof t)return d(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?d(t,e):void 0}}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,o=new Array(e);a<e;a++)o[a]=t[a];return o}function u(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var a=[],o=!0,r=!1,n=void 0;try{for(var i,s=t[Symbol.iterator]();!(o=(i=s.next()).done);o=!0)if(a.push(i.value),e&&a.length===e)break}catch(d){r=!0,n=d}finally{try{o||null==s["return"]||s["return"]()}finally{if(r)throw n}}return a}}function c(t){if(Array.isArray(t))return t}var l={data:function(){return{showtab:"groups",count_down:!0,time:[0,0,0,0],share:1,options:"",layershow:0,show:!1,teamid:0,data:{tuan_first_order:{success:!0}}}},onShareAppMessage:function(t){var e=this.data.tuan_first_order.teamid,a=this.data.shopshare,o=getCurrentPages(),r=o[o.length-1].route;return"button"===t.from&&console.log(t.target),console.log(r),{title:a.title||"拼团",path:r+"?id="+e,content:a.desc,imageUrl:a.imgUrl}},onLoad:function(e){t.setStorageSync("back","1"),this.teamid=e.id,this.get_details()},methods:{get_details:function(){var t=this,e=this;(0,r.groupteamdetails)(this.teamid).then((function(a){if(a.data.goods.content=a.data.goods.content.replace(/data-lazy/g,"src"),t.data=a.data,a.data.lasttime2<=0&&(t.count_down=!1),clearInterval(e.data.timer),0==a.data.tuan_first_order.success)setInterval((function(){e.countDown(a.data.tuan_first_order.createtime,a.data.tuan_first_order.endtime)}),1e3);t.show=!0}))},shares:function(){},countDown:function(t,e,a){var o=parseInt(Date.now()/1e3),r=parseInt((t>o?t:e)-o),n=Math.floor(r/86400),i=Math.floor((r-24*n*60*60)/3600),s=Math.floor((r-24*n*60*60-3600*i)/60),d=Math.floor(r-24*n*60*60-3600*i-60*s);0==n&&0==i&&0==s&&0==d&&this.get_details(this.teamid);var u=[n,i,s,d];this.time=u},close:function(){this.layershow=!1,this.options=!1},tuxedobuy:function(e){var a=this,o=a.data.goods.id;0==a.data.goods.more_spec?a.data.goods.stock>0?(0,r.pintuanCreadOrder)(o,"",a.data.tuan_first_order.ladder_id,"groups",0,a.teamid,a.$store.state.app.openid).then((function(e){var r=n(e,2),i=(r[0],r[1]),s=i.data;1!=s.error?-1!=s.error?t.navigateTo({url:"../createPtOrder/createPtOrder?id="+o+"&heads=0&type=groups&teamid="+a.teamid+"&ladder_id="+a.data.tuan_first_order.ladder_id,success:function(){}}):t.redirectTo({url:"/pages/message/auth/index"}):t.showToast({title:s.message,icon:"none",duration:2e3})})):t.showToast({title:"库存不足",icon:"none",duration:2e3}):(0,r.groupsget_spec)(id,openid)((function(t){var e=n(t,2),o=(e[0],e[1]),r=o.data;a.spec=r.data,a.layershow=!0,a.options=!0,a.optionarr=[],a.selectSpecsarr=[]})),a.data.goods.stock>0?t.navigateTo({url:"../createPtOrder/createPtOrder?id="+o+"&type=groups&teamid="+a.teamid,success:function(){a.layershow=!1,a.chosenum=!1,a.options=!1}}):t.showToast({title:"库存不足",icon:"none",duration:2e3}),a.layershow=!0,a.options=!0},specsTap:function(t){},buy:function(e){var o=this,r=(a.pdata(e).op,o.data.data.goods.id),n=o.data.optiondata;o.data.optiondata?n.stock>0?t.navigateTo({url:"../createPtOrder/CreatePtorder?id="+r+"&type=groups&option_id="+n.id+" &teamid="+o.teamid,success:function(){o.layershow=!1,o.chosenum=!1,o.options=!1}}):t.showToast({title:"库存不足",icon:"none",duration:2e3}):t.showToast({title:"请选择规格",icon:"none",duration:2e3})},goodsTab:function(t){this.showtab=t.target.dataset.tap}}};e.default=l}).call(this,o("543d")["default"])},"55d3":function(t,e,a){"use strict";a.r(e);var o=a("80e1"),r=a("7240");for(var n in r)"default"!==n&&function(t){a.d(e,t,(function(){return r[t]}))}(n);a("0677");var i,s=a("f0c5"),d=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);e["default"]=d.exports},7240:function(t,e,a){"use strict";a.r(e);var o=a("4d13"),r=a.n(o);for(var n in o)"default"!==n&&function(t){a.d(e,t,(function(){return o[t]}))}(n);e["default"]=r.a},"80e1":function(t,e,a){"use strict";var o,r=function(){var t=this,e=t.$createElement;t._self._c},n=[];a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return o}))},c9e0:function(t,e,a){"use strict";(function(t){a("969c");o(a("66fd"));var e=o(a("55d3"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])}},[["c9e0","common/runtime","common/vendor"]]]);