(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/category/category"],{5302:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=c(e("4795")),i=e("4d01");function c(t){return t&&t.__esModule?t:{default:t}}function r(t,n,e,a,i,c,r){try{var o=t[c](r),u=o.value}catch(s){return void e(s)}o.done?n(u):Promise.resolve(u).then(a,i)}function o(t){return function(){var n=this,e=arguments;return new Promise((function(a,i){var c=t.apply(n,e);function o(t){r(c,a,i,o,u,"next",t)}function u(t){r(c,a,i,o,u,"throw",t)}o(void 0)}))}}var u={data:function(){return{sizeCalcState:!1,tabScrollTop:0,currentId:1,flist:[],slist:[]}},onLoad:function(){this.loadData()},methods:{loadData:function(){var t=this;return o(a.default.mark((function n(){var e;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e=t,(0,i.getCategory)().then((function(t){e.$set(e,"flist",t.category),e.$set(e,"slist",t.category)}));case 2:case"end":return n.stop()}}),n)})))()},tabtap:function(t){this.sizeCalcState||this.calcSize(),this.currentId=t.id;var n=this.slist.findIndex((function(n){return n.id===t.id}));this.tabScrollTop=this.slist[n].top},asideScroll:function(t){this.sizeCalcState||this.calcSize();var n=t.detail.scrollTop,e=this.slist.filter((function(t){return t.top<=n})).reverse();e.length>0&&(this.currentId=e[0].id)},calcSize:function(){var n=0;this.slist.forEach((function(e){var a=t.createSelectorQuery().select("#main-"+e.id);a.fields({size:!0},(function(t){e.top=n,n+=t.height,e.bottom=n})).exec()})),this.sizeCalcState=!0},navToList:function(n,e){t.navigateTo({url:"/pages/product/list?id=".concat(n,"&name=").concat(e)})},navToDetailPage:function(n){var e=n.title;t.navigateTo({url:"/pages/product/product?id=".concat(e)})}}};n.default=u}).call(this,e("543d")["default"])},"5af6":function(t,n,e){},"5c3a":function(t,n,e){"use strict";var a=e("5af6"),i=e.n(a);i.a},"9b86":function(t,n,e){"use strict";var a={uniSearchBar:function(){return e.e("components/uni-search-bar/uni-search-bar").then(e.bind(null,"0ba5"))}},i=function(){var t=this,n=t.$createElement;t._self._c},c=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return a}))},ccaa:function(t,n,e){"use strict";(function(t){e("969c");a(e("66fd"));var n=a(e("fc73"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},d475:function(t,n,e){"use strict";e.r(n);var a=e("5302"),i=e.n(a);for(var c in a)"default"!==c&&function(t){e.d(n,t,(function(){return a[t]}))}(c);n["default"]=i.a},fc73:function(t,n,e){"use strict";e.r(n);var a=e("9b86"),i=e("d475");for(var c in i)"default"!==c&&function(t){e.d(n,t,(function(){return i[t]}))}(c);e("5c3a");var r,o=e("f0c5"),u=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);n["default"]=u.exports}},[["ccaa","common/runtime","common/vendor"]]]);