(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/list"],{"027e":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("4795")),o=n("4d01");function a(t){return t&&t.__esModule?t:{default:t}}function i(t,e){return l(t)||d(t,e)||c(t,e)||u()}function u(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,e){if(t){if("string"===typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(t,e):void 0}}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function d(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=t[Symbol.iterator]();!(r=(i=u.next()).done);r=!0)if(n.push(i.value),e&&n.length===e)break}catch(c){o=!0,a=c}finally{try{r||null==u["return"]||u["return"]()}finally{if(o)throw a}}return n}}function l(t){if(Array.isArray(t))return t}function f(t,e,n,r,o,a,i){try{var u=t[a](i),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(r,o)}function h(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){f(a,r,o,i,u,"next",t)}function u(t){f(a,r,o,i,u,"throw",t)}i(void 0)}))}}var p=function(){n.e("components/uni-load-more/uni-load-more").then(function(){return resolve(n("ab1b"))}.bind(null,n)).catch(n.oe)},g={components:{uniLoadMore:p},data:function(){return{cateMaskState:0,headerPosition:"fixed",headerTop:"0px",loadingType:"more",filterIndex:0,cateId:0,priceOrder:0,cateList:[],goodsList:[],page:0}},onLoad:function(t){this.cateId=t.id,this.loadCateList(t.id),this.loadData()},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},onPullDownRefresh:function(){this.loadData("refresh")},onReachBottom:function(){this.loadData()},methods:{loadCateList:function(t,e){var n=this;return h(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:(0,o.getCategory)().then((function(t){var e=i(t,2),r=(e[0],e[1]);n.cateList=r.data.category}));case 1:case"end":return t.stop()}}),t)})))()},loadData:function(){var e=arguments,n=this;return h(r.default.mark((function a(){var u,c,s;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(u=e.length>0&&void 0!==e[0]?e[0]:"add",c=e.length>1?e[1]:void 0,s=n,"add"!==u){r.next=10;break}if("nomore"!==s.loadingType){r.next=6;break}return r.abrupt("return");case 6:s.loadingType="loading",s.page++,r.next=11;break;case 10:s.loadingType="more";case 11:"refresh"===u&&(s.goodsList=[],s.page=1),(0,o.getCategoryGoods)(s.cateId,s.page).then((function(t){var e=i(t,2),r=(e[0],e[1]),o=r.data;n.loadingType=o.pagesize>20?"nomore":"more";var a=o.list;1===n.filterIndex&&a.sort((function(t,e){return e.sales-t.sales})),2===n.filterIndex&&a.sort((function(t,e){return 1==n.priceOrder?t.price-e.price:e.price-t.price})),n.goodsList=n.goodsList.concat(a)})),"refresh"===u&&(1==c?t.hideLoading():t.stopPullDownRefresh());case 14:case"end":return r.stop()}}),a)})))()},tabClick:function(e){this.filterIndex===e&&2!==e||(this.filterIndex=e,this.priceOrder=2===e?1===this.priceOrder?2:1:0,t.pageScrollTo({duration:300,scrollTop:0}),this.loadData("refresh",1),t.showLoading({title:"正在加载"}))},toggleCateMask:function(t){var e=this,n="show"===t?10:300,r="show"===t?1:0;this.cateMaskState=2,setTimeout((function(){e.cateMaskState=r}),n)},changeCate:function(e){this.cateId=e.id,this.toggleCateMask(),t.pageScrollTo({duration:300,scrollTop:0}),this.loadData("refresh",1),t.showLoading({title:"正在加载"})},navToDetailPage:function(e){var n=e.id,r="";r=parseInt(e.bargain)>0?"/pages/product/product-kanjia?id=".concat(n):"/pages/product/product?id=".concat(n),t.navigateTo({url:r})},stopPrevent:function(){}}};e.default=g}).call(this,n("543d")["default"])},"5e34":function(t,e,n){"use strict";var r={uniLoadMore:function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"ab1b"))}},o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}))},ae89:function(t,e,n){"use strict";var r=n("fdb7"),o=n.n(r);o.a},b0a3:function(t,e,n){"use strict";n.r(e);var r=n("027e"),o=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=o.a},b3a9:function(t,e,n){"use strict";n.r(e);var r=n("5e34"),o=n("b0a3");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("ae89");var i,u=n("f0c5"),c=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);e["default"]=c.exports},d27d:function(t,e,n){"use strict";(function(t){n("969c");r(n("66fd"));var e=r(n("b3a9"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},fdb7:function(t,e,n){}},[["d27d","common/runtime","common/vendor"]]]);