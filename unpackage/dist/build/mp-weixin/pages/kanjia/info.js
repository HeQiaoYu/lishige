(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/kanjia/info"],{"15d3":function(t,i,e){"use strict";(function(t){e("969c");n(e("66fd"));var i=n(e("6318"));function n(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,e("543d")["createPage"])},"481d":function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=e("4d01"),r=function(){e.e("components/countdown-timer/countdown-timer").then(function(){return resolve(e("8fd0"))}.bind(null,e)).catch(e.oe)},a={components:{countdowmTimer:r},data:function(){return{isIpx:!0,showtab:"family",bargainid:"",layer:!1,cutPrice:"",error_hint:!1,error_hint_title:"",list:{},bargain:{},time:0,bargain_set:{},istimeTitle:"剩余时间",bargain_record:{},bargain_actor:{},swi:"",trade_swi:"",myself_swi:"",mid:"",randomHint:{0:"大王，您即将触及我的价格底线，不要放弃继续砍价吧～",1:"主人，达到价格底线就可以带我回家啦！等你哦～",2:"加把劲，再砍一刀，马上就到底价了哦～",3:"砍到底价才能购买哦，邀请小伙伴来帮忙吧！",4:"叫上您的小伙伴来砍价，我们的的目标是底价买买买！"},marked_words:"",arrived:"",timeout:0,bargain_share:{},istime:1}},onLoad:function(i){t.setStorageSync("back","1"),this.options=i,this.loadData()},onShareAppMessage:function(t){"button"===t.from&&console.log(t.target);var i=this.bargainid,e=this.mid,n=this.bargain_share;console.log(i.bargain);var r=getCurrentPages(),a=r[r.length-1].route;return console.log(a),{title:i.title||"帮砍价",path:a+"?id="+i+"&mid="+e,content:n.content,imageUrl:i.thumb}},methods:{loadData:function(){var t=this,i=t.options;(0,n.bargainInfo)(i).then((function(i){if(1!=i.error&&0==i.error){if(1==i.unequalMid){var e=[];e["id"]=i.id,e["mid"]=i.mid,t.options=e,t.loadData()}t.list=i.list,t.bargain=i.bargain,t.bargain_set=i.bargain_set,t.bargain_record=i.bargain_record,t.bargain_actor=i.bargain_actor,t.swi=i.swi,t.trade_swi=i.trade_swi,t.myself_swi=i.myself_swi,t.bargainid=i.list.id,t.mid=i.mid,t.arrived=i.arrived,t.timeout=i.timeout,t.bargain_share=i.bargain_share,t.countDown(1e3*i.bargain.start_time,1e3*i.bargain.end_time,"istime"),clearInterval(t.timer),t.timer=setInterval((function(){t.countDown(1e3*i.bargain.start_time,1e3*i.bargain.end_time,"istime")}),1e3)}}))},countDown:function(t,i,e){var n=this,r=parseInt(Date.now()),a=parseInt((t>r?t:i)-r);n.time=a;var o="";t>r?(o="未开始",n.istime=0):t<=r&&i>r?(o="剩余时间",n.istime=1):(o="活动已经结束，下次早点来~",this.istime=2),this.istimeTitle=o},goodsTab:function(t){this.showtab=t},tocutPrice:function(){var i=this,e="/pages/public/login",r=i,a=r.bargainid,o=r.mid;(0,n.bargainBargain)(a,o).then((function(n){-1!=n.error?1!=n.error?0==n.error&&n.cutPrice?(r.layer=!0,r.cutPrice=n.cutPrice):t.navigateTo({url:e}):(r.error_hint=!0,r.error_hint_title=n.message):t.navigateTo({url:e}),i.loadData()})).catch((function(t){i.loadData()}))},closeError:function(){this.error_hint=!1},onFinish:function(){},closeLayer:function(){this.layer=!1,this.loadData()},seekHelp:function(){var i=this.bargainid,e=this.mid,n=this.bargain_share,r=getCurrentPages(),a=r[r.length-1].route;t.share({provider:"weixin",scene:"WXSceneSession",type:0,href:"http://h5.ilishige.com/"+a+"?id="+i+"&mid="+e,title:n.title||"帮砍价",summary:n.content,imageUrl:n.logo,success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){console.log("fail:"+JSON.stringify(t))}})}}};i.default=a}).call(this,e("543d")["default"])},6318:function(t,i,e){"use strict";e.r(i);var n=e("6765"),r=e("b0ee");for(var a in r)"default"!==a&&function(t){e.d(i,t,(function(){return r[t]}))}(a);e("ec39");var o,s=e("f0c5"),c=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);i["default"]=c.exports},6765:function(t,i,e){"use strict";var n,r=function(){var t=this,i=t.$createElement;t._self._c},a=[];e.d(i,"b",(function(){return r})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){return n}))},b0ee:function(t,i,e){"use strict";e.r(i);var n=e("481d"),r=e.n(n);for(var a in n)"default"!==a&&function(t){e.d(i,t,(function(){return n[t]}))}(a);i["default"]=r.a},ec39:function(t,i,e){"use strict";var n=e("f488"),r=e.n(n);r.a},f488:function(t,i,e){}},[["15d3","common/runtime","common/vendor"]]]);