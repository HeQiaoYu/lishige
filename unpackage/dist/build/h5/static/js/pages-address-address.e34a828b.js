(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-address-address"],{"0e10":function(t,e,a){"use strict";var i=a("ee27");a("99af"),a("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("d0af")),r=a("0082"),s={data:function(){return{source:0,addressList:[]}},onLoad:function(t){this.source=t.source,this.getAddress()},methods:{getAddress:function(){var t=this;(0,r.userAddress)().then((function(e){var a=(0,n.default)(e,2),i=(a[0],a[1]),r=i.data,s=r.list.map((function(t,e,a){var i={id:t.id,realname:t.realname,mobile:t.mobile,address:t.province+t.city+t.area+t.street,addressName:t.province+t.city+t.area+t.street,area:t.address,lng:t.lng,lat:t.lat,default:"1"==t.isdefault};return i}));t.addressList=s})).catch((function(t){}))},checkAddress:function(t){1==this.source&&(this.$api.prePage().addressData=t,uni.navigateBack())},addAddress:function(t,e){uni.navigateTo({url:"/pages/address/addressManage?type=".concat(t,"&data=").concat(JSON.stringify(e))})},refreshList:function(t,e){"edit"==e?this.getAddress():"add"==e&&this.getAddress()}}};e.default=s},"16b8":function(t,e,a){"use strict";a.r(e);var i=a("9774"),n=a("5b7e");for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);a("d383");var s,d=a("f0c5"),o=Object(d["a"])(n["default"],i["b"],i["c"],!1,null,"03f5c97c",null,!1,i["a"],s);e["default"]=o.exports},"5b7e":function(t,e,a){"use strict";a.r(e);var i=a("0e10"),n=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a},"5b89":function(t,e,a){var i=a("6239");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("6a0e02ad",i,!0,{sourceMap:!1,shadowMode:!1})},6239:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-03f5c97c]{padding-top:1px;background:#f8f8f8}.content[data-v-03f5c97c]{position:relative}.list[data-v-03f5c97c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?20?% %?30?%;background:#fff;position:relative}.wrapper[data-v-03f5c97c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-webkit-flex:1;flex:1}.address-box[data-v-03f5c97c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.address-box .tag[data-v-03f5c97c]{font-size:%?24?%;color:#ff5722;margin-right:%?10?%;background:#fffafb;border:1px solid #ffb4c7;border-radius:%?4?%;padding:%?4?% %?10?%;line-height:1}.address-box .address[data-v-03f5c97c]{font-size:%?30?%;color:#303133}.u-box[data-v-03f5c97c]{font-size:%?28?%;color:#909399;margin-top:%?16?%}.u-box .name[data-v-03f5c97c]{margin-right:%?30?%}.icon-bianji[data-v-03f5c97c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?80?%;font-size:%?40?%;color:#909399;padding-left:%?30?%}.add-btn[data-v-03f5c97c]{position:fixed;left:%?30?%;right:%?30?%;bottom:%?16?%;z-index:95;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?690?%;height:%?80?%;font-size:%?32?%;color:#fff;background-color:#ff5722;border-radius:%?10?%;-webkit-box-shadow:1px 2px 5px rgba(219,63,96,.4);box-shadow:1px 2px 5px rgba(219,63,96,.4)}body.?%PAGE?%[data-v-03f5c97c]{background:#f8f8f8}',""]),t.exports=e},9774:function(t,e,a){"use strict";var i,n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"content b-t"},[t._l(t.addressList,(function(e,i){return a("v-uni-view",{key:i,staticClass:"list b-b",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.checkAddress(e)}}},[a("v-uni-view",{staticClass:"wrapper"},[a("v-uni-view",{staticClass:"address-box"},[e.default?a("v-uni-text",{staticClass:"proYh-tip buy-now-btn"},[t._v("默认")]):t._e(),a("v-uni-text",{staticClass:"address"},[t._v(t._s(e.realname)+" "+t._s(e.mobile))])],1),a("v-uni-view",{staticClass:"u-box"},[a("v-uni-text",{staticClass:"name"},[t._v(t._s(e.addressName)+t._s(e.area))])],1)],1),a("v-uni-text",{staticClass:"yticon icon-bianji",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.addAddress("edit",e)}}})],1)})),a("v-uni-view",{staticClass:"bottomFixed"}),a("v-uni-view",{staticClass:"bottomFixedBtn"},[a("v-uni-button",{staticClass:"myMoneyGoBtn yhqAlt-btn buy-now-btn",attrs:{type:"default"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.addAddress("add")}}},[t._v("+ 新增地址")])],1)],2)},r=[];a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return i}))},d0af:function(t,e,a){"use strict";function i(t){if(Array.isArray(t))return t}a.r(e);a("a4d3"),a("e01a"),a("d28b"),a("e260"),a("d3b7"),a("3ca3"),a("ddb0");function n(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var a=[],i=!0,n=!1,r=void 0;try{for(var s,d=t[Symbol.iterator]();!(i=(s=d.next()).done);i=!0)if(a.push(s.value),e&&a.length===e)break}catch(o){n=!0,r=o}finally{try{i||null==d["return"]||d["return"]()}finally{if(n)throw r}}return a}}var r=a("dde1");function s(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(t,e){return i(t)||n(t,e)||Object(r["a"])(t,e)||s()}a.d(e,"default",(function(){return d}))},d383:function(t,e,a){"use strict";var i=a("5b89"),n=a.n(i);n.a}}]);