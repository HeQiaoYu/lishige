<template>
	<view>
		<view class="tab-nav flexBox between">
			<view class="nav_item" :class="active==0 ? 'hot':''" @click="navClick(0)">快递</view>
			<view class="nav_item" v-if="list.iscycelbuy!=1" :class="active==1 ? 'hot':''" @click="navClick(1)">到店自取</view>
		</view>
		<view class="tab_content" v-if="active==0">
			<!-- 地址 -->
			<navigator url="/pages/address/address?source=1" class="address-section">
				<view class="order-content" v-if="addressData.id != null">
					<text class="yticon icon-shouhuodizhi"></text>
					<view class="cen">
						<view class="top">
							<text class="name">{{addressData.realname}}</text>
							<text class="mobile">{{addressData.mobile}}</text>
						</view>
						<text class="address">{{addressData.address}} {{addressData.area}}</text>
					</view>
					<text class="yticon icon-you"></text>
				</view>
				<view class="order-content" v-else> 
				<text class="yticon icon-shouhuodizhi"></text>暂无收货地址 请添加
				<view class="cen"></view>
				<text class="yticon icon-you"></text></view>
				<image class="a-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"></image>
			</navigator>
			<view class="goods-section" v-if="list.goods" v-for="(item, index) in list.goods">
				<view class="g-header b-b">
					<image class="logo" :src="item.logo"></image>
					<text class="name">{{item.shopname}}</text>
				</view>
				<!-- 商品列表 -->
				<block v-for="(i, k) in item.goods">	
					<view class="g-item" >
						<image :src="i.thumb"></image>
						<view class="right">
							<text class="title clamp">{{i.title}}</text>
							<text class="spec" v-if="i.optionid!=0">{{i.optiontitle}}</text>
							<view class="price-box">
								<text class="price">￥<span v-if="list.isdiscountprice>0">{{i.promotionprice}}</span><span v-else>{{i.price}}</span></text>
								<text class="number">x {{i.total}}</text>
							</view>
						</view>
					</view>
				</block>
			</view>
			<!-- 优惠明细 -->
			<view class="yt-list" >
				<view class="yt-list-cell b-b" v-if="list.couponcount>0" @click="toggleMask('show')">
					<view class="cell-icon">
						券
					</view>
					<text class="cell-tit clamp">优惠券</text>
					<text class="cell-tip active">
						{{!data.couponname?'选择优惠券':'已选择优惠券：'+data.couponname}}
					</text>
					<text class="cell-more wanjia wanjia-gengduo-d"></text>
				</view>
				<view class="yt-list-cell b-b" >
					<view class="cell-icon hb">
						减
					</view>
					<text class="cell-tit clamp">商城促销</text>
					<text class="cell-tip " v-if="list.showenough">商城单笔满{{list.enoughmoney}}元立减-¥{{list.enoughdeduct}}</text>
					<text class="cell-tip disabled" v-else>暂无可用优惠</text>
				</view>
				<view class="yt-list-cell b-b" >
					<view class="cell-icon hb">
						减
					</view>
					<text class="cell-tit clamp">商户促销</text>
					<text class="cell-tip " v-if="list.merch_enoughmoney">商户单笔满{{list.merch_enoughmoney}}元立减-¥{{list.merch_enoughdeduct}}</text>
					<text class="cell-tip disabled" v-else>暂无可用优惠</text>
				</view>
				<view class="yt-list-cell b-b"v-if="list.seckill_price>0">
					<view class="cell-icon hb">
						减
					</view>
					<text class="cell-tit clamp">秒杀优惠</text>
					<text class="cell-tip " >-¥{{list.seckill_price}}</text>
				</view>
			</view>
			<!-- 金额明细 -->
			<view class="yt-list">
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">商品金额</text>
					<text class="cell-tip">￥{{list.goodsprice}}</text>
				</view>
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">优惠金额</text>
					<text class="cell-tip red">-￥{{alldownprice}}</text>
				</view>
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">运费</text>
					<text class="cell-tip">{{list.freight}}</text>
				</view>
				<view class="yt-list-cell desc-cell">
					<text class="cell-tit clamp">备注</text>
					<input class="desc" type="text" v-model="desc" placeholder="请填写备注信息" placeholder-class="placeholder" />
				</view>
			</view>
		</view>
		
		<view class="tab_content" v-if="active==1">
			<!-- 地址 -->
			<navigator :url="'/pages/order/store/store?merchid='+merchid+'&type=1'" class="address-section">
				<view class="order-content" v-if="list.carrierInfo">
					<text class="yticon icon-shouhuodizhi"></text>
					<view class="cen">
						<text class="address">{{list.carrierInfo.storename}} {{list.carrierInfo.address}}</text>
					</view>
					<text class="yticon icon-you"></text>
				</view>
				<view class="order-content" v-else> 
				<text class="yticon icon-shouhuodizhi"></text>暂无选择门店信息，请选择
				<view class="cen"></view>
				<text class="yticon icon-you"></text></view>
				<image class="a-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"></image>
			</navigator>
			<view class="goods-section" v-if="list.goods" v-for="(item, index) in list.goods">
				<view class="g-header b-b">
					<image class="logo" :src="item.logo"></image>
					<text class="name">{{item.shopname}}</text>
				</view>
				<!-- 商品列表 -->
				<block v-for="(i, k) in item.goods">
					<view class="g-item" >
						<image :src="i.thumb"></image>
						<view class="right">
							<text class="title clamp">{{i.title}}</text>
							<text class="spec" v-if="i.optionid!=0">{{i.optiontitle}}</text>
							<view class="price-box">
								<text class="price">￥<span v-if="list.isdiscountprice>0">{{i.promotionprice}}</span><span v-else>{{i.price}}</span></text>
								<text class="number">x {{i.total}}</text>
							</view>
						</view>
					</view>
				</block>
			</view>
			<!-- 优惠明细 -->
			<view class="yt-list" >
				<view class="yt-list-cell b-b" v-if="list.couponcount>0" @click="toggleMask('show')">
					<view class="cell-icon">
						券
					</view>
					<text class="cell-tit clamp">优惠券</text>
					<text class="cell-tip active">
						{{!data.couponname?'选择优惠券':'已选择优惠券：'+data.couponname}}
					</text>
					<text class="cell-more wanjia wanjia-gengduo-d"></text>
				</view>
				<view class="yt-list-cell b-b" >
					<view class="cell-icon hb">
						减
					</view>
					<text class="cell-tit clamp">商城促销</text>
					<text class="cell-tip " v-if="list.showenough">商城单笔满{{list.enoughmoney}}元立减-¥{{list.enoughdeduct}}</text>
					<text class="cell-tip disabled" v-else>暂无可用优惠</text>
				</view>
				<view class="yt-list-cell b-b" >
					<view class="cell-icon hb">
						减
					</view>
					<text class="cell-tit clamp">商户促销</text>
					<text class="cell-tip " v-if="list.merch_enoughmoney">商户单笔满{{list.merch_enoughmoney}}元立减-¥{{list.merch_enoughdeduct}}</text>
					<text class="cell-tip disabled" v-else>暂无可用优惠</text>
				</view>
				<view class="yt-list-cell b-b"v-if="list.seckill_price>0">
					<view class="cell-icon hb">
						减
					</view>
					<text class="cell-tit clamp">秒杀优惠</text>
					<text class="cell-tip " >-¥{{list.seckill_price}}</text>
				</view>
			</view>
			<!-- 金额明细 -->
			<view class="yt-list">
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">商品金额</text>
					<text class="cell-tip">￥{{list.goodsprice}}</text>
				</view>
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">优惠金额</text>
					<text class="cell-tip red">-￥{{alldownprice}}</text>
				</view>
				<view class="yt-list-cell b-b">
					<text class="cell-tit clamp">运费</text>
					<text class="cell-tip">{{list.freight}}</text>
				</view>
				<view class="yt-list-cell desc-cell">
					<text class="cell-tit clamp">备注</text>
					<input class="desc" type="text" v-model="desc" placeholder="请填写备注信息" placeholder-class="placeholder" />
				</view>
			</view>
		</view>
		
		
		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">￥</text>
				<text class="price">{{list.realprice}}</text>
			</view>
			<text class="submit" @click="submit">提交订单</text>
		</view>
		
		<!-- 优惠券面板 -->
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon-item" v-for="(item,index) in couponList" :key="index">
					<view class="con">
						<view class="left">
							<text class="title">{{item.title}}</text>
							<text class="time">有效期至2019-06-30</text>
						</view>
						<view class="right">
							<text class="price">{{item.price}}</text>
							<text>满30可用</text>
						</view>
						
						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<text class="tips">限新用户使用</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {createOrder, orderSubmit,createcaculate} from "@/api/public";
	import js from "@/utils/jquery";
	import { VUE_APP_API_URL } from "@/utils/index";
	export default {
		data() {
			return {
				maskState: 0, //优惠券面板显示状态
				desc: '', //备注
				payType: 1, //1微信 2支付宝
				couponList: [
					{
						title: '新用户专享优惠券',
						price: 5,
					},
					{
						title: '庆五一发一波优惠券',
						price: 10,
					},
					{
						title: '优惠券优惠券优惠券优惠券',
						price: 15,
					}
				],
				 data: {
					dispatchtype: 0,
					remark: ""
				},
				addressData: {
				},
				list:[],
				alldownprice:0,
				active:0,
				merchid : 0,
				coupon:{
					deductprice:0
				}
			}
		},
		onLoad(option){
			//获取商品
			let that = this;
			that.options = option;
			that.createOrder();
			
		},
		methods: {
			navClick(e){
				this.active=e;
				this.caculate(this.list);
			},
			caculate (t){
				let e  = this, i = 0;
				
				e.data && 0 != e.data.couponid && (i =e.data.couponid),createcaculate(e.convertModelToFormData({
					goods:e.goodslist,
					dflag:e.active,
					addressid:e.list.address? e.list.address.id :0,
					packageid :e.list.packageid,
					bargain_id: e.options.bargainid,
					discountprice: e.list.discountprice,
					cardid:e.cardid,
					couponid:i
				})).then(a => {
					t.dispatch_price = a.price, t.enoughdeduct = a.deductenough_money, t.enoughmoney = a.deductenough_enough, 
					t.taskdiscountprice = a.taskdiscountprice, t.discountprice = a.discountprice, t.isdiscountprice = a.isdiscountprice, 
					t.seckill_price = a.seckill_price, t.deductcredit2 = a.deductcredit2, t.deductmoney = a.deductmoney, 
					t.deductcredit = a.deductcredit, t.gifts = a.gifts, e.data.deduct && (a.realprice -= a.deductmoney), 
					e.data.deduct2 && (a.realprice -= a.deductcredit2), e.coupon && void 0 !== e.coupon.deductprice && (e.$set(
						e.coupon, 'deductprice',a.coupon_deductprice
					), a.realprice -= a.coupon_deductprice), a.card_info && (t.card_free_dispatch = a.card_free_dispatch), 
					0 == e.goods.giftid && e.$set(this.goods,'gifts',a.gifts), 
					t.realprice <= 0 && (t.realprice = 1e-6), t.realprice = a.realprice.toFixed(2), 
					"-0.00" == t.realprice && (t.realprice = 0),(e.list= t,e.cardid=a.card_info.cardid,e.cardname=a.card_info.cardname,
					e.goodsprice=a.card_info.goodsprice ? a.card_info.goodsprice : 0,e.carddiscountprice=a.card_info.carddiscountprice,
					e.city_express_state=a.city_express_state);
				})
				
			},
			createOrder(){
				let that = this,s = [];
				s = that.options;
				createOrder(s).then(res => {
					let r = (that.originalprice - res.goodsprice).toFixed(2);
					if(res.address) {
						let addressData = {
							realname : res.address.realname,
							mobile : res.address.mobile,
							addressName : res.address.province + res.address.city + res.address.area + res.address.street,
							address : res.address.province + res.address.city + res.address.area + res.address.street,
							area : res.address.address,
							default : res.address.isdefault=="1"?true:false,
							lng : res.address.lng,
							lat : res.address.lat,
							id : res.address.id
						}
						that.addressData = addressData;
					}
					that.list = res,
					that.goods = res,
					that.goodslist = that.getGoodsList(res.goods),
					that.merchid= res.merchid,
					that.card_info = res.card_info || {},
                    that.cardid = res.card_info.cardid || "",
                    that.cardname = res.card_info.cardname || "",
					that.carddiscountprice = res.card_info.carddiscountprice,
					that.comboprice = r,
					that.city_express_state = res.city_express_state,
                    that.cycelbuy_showdate = res.selectDate,
                    that.receipttime = res.receipttime,
                    that.iscycel = res.iscycel,
                    that.scope = res.scope,
                    that.fromquick = res.fromquick,
                    that.hasinvoice = res.hasinvoice,
                    that.credittext = res.sysset.texts.credit
				})
			},
			//显示优惠券面板
			toggleMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(()=>{
					this.maskState = state;
				}, timer)
			},
			numberChange(data) {
				this.number = data.number;
			},
			changePayType(type){
				this.payType = type;
			},
			submit(){
				let t = this,d = t.goods.giftid || t.giftid;
				
				let data = {
					id: t.options.goodsid ? t.options.goodsid : 0,
					goods: t.goodslist, 
					gdid: t.options.gdid,
					dispatchtype: t.active,
					fromcart: t.list.fromcart,
					carrierid: 1 == t.active && t.list.carrierInfo ? t.list.carrierInfo.id : 0,
					addressid: t.list.address ? t.list.address.id : 0,
					carriers: 1 == t.active || t.list.isvirtual || t.list.isverify ? {
						carrier_realname: t.list.member.realname,
						carrier_mobile: t.list.member.mobile,
						realname: t.list.carrierInfo.realname,
						mobile: t.list.carrierInfo.mobile,
						storename: t.list.carrierInfo.storename,
						address: t.list.carrierInfo.address
					} : "",
					remark: t.data.remark,
					deduct: t.data.deduct,
					deduct2: t.data.deduct2,
					couponid: t.data.couponid,
					cardid: t.cardid,
					invoicename: t.list.invoicename,
					submit: !0,
					packageid: t.list.packageid,
					giftid: d,
					receipttime: t.receipttime,
					bargain_id: t.options.bargainid,
					fromquick: t.fromquick,
					addressid:t.addressData.id,
					isverify:t.active,
				}
				data = t.convertModelToFormData(data)
				orderSubmit(data).then(res => {
					
					uni.redirectTo({
						url: `/pages/money/pay?orderid=${res.orderid}`
					})
				}).catch(res => {
					console.log(res);
				})
			},
			convertModelToFormData(val, formData = new Object(), namespace = '') {
				if((typeof val !== 'undefined') && (val !== null)) {
					if(val instanceof Date) {
						formData[namespace] = val.toISOString();
					//	Object.assign(formData,{ namespace:val.toISOString()})
						//formData.append(namespace, val.toISOString());
					} else if(val instanceof Array) {
						for(let i = 0; i < val.length ; i++){
							this.convertModelToFormData(val[i], formData, namespace + '['+i+']');
						}
					} else if(typeof val === 'object') {
						for (let propertyName in val) {
							if(val.hasOwnProperty(propertyName)) {
								this.convertModelToFormData(val[propertyName], formData, namespace ? namespace + '[' + propertyName + ']' : propertyName);
							}
						}
					} else {
						formData[namespace] = val.toString();
					//	Object.assign(formData,{namespace:val.toString()})
						//formData.append(namespace, val.toString());
					}
				}
				return formData;
			},
			dataChange: function(t) {
				var e = this.data, a = this.list;
				switch (t.target.id) {
				  case "remark":
					e.remark = t.detail.value;
					break;

				  case "deduct":
					if (e.deduct = t.detail.value, e.deduct2) return;
					var i = parseFloat(a.realprice);
					i += e.deduct ? -parseFloat(a.deductmoney) : parseFloat(a.deductmoney), a.realprice = i;
					break;

				  case "deduct2":
					if (e.deduct2 = t.detail.value, e.deduct) return;
					i = parseFloat(a.realprice);
					i += e.deduct2 ? -parseFloat(a.deductcredit2) : parseFloat(a.deductcredit2), a.realprice = i;
				}
				a.realprice <= 0 && (a.realprice = 1e-6), a.realprice = r.toFixed(a.realprice, 2), 
				this.$set(this,'data',e);
				this.$set(this,'list',a);
			},
			stopPrevent(){},
			getGoodsList: function(t) {

				var e = [];
				t.map((item) => {
					item.goods.map((key) => {
						e.push(key);
					})
				})
				for (var a = 0, i = 0; i < e.length; i++) a += e[i].price;
				this.originalprice = a;
				return e;
			},
		}
	}
</script>
<style lang="scss">
	.tab-nav .nav_item.hot{
		background:linear-gradient(bottom,#ff5722,#fd823f);
		color:#fff;
	}
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			margin: 0;
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
				}
				.number{
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}
	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}
			&.red{
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}
	
	/* 支付列表 */
	.pay-list{
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;
		.pay-item{
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;	
			position: relative;
		}
		.icon-weixinzhifu{
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}
		.icon-alipay{
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}
		.icon-xuanzhong2{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}
		.tit{
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}
	
	.footer{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0,0,0,.1);
		.price-content{
			padding-left: 30upx;
		}
		.price-tip{
			color: $base-color;
			margin-left: 8upx;
		}
		.price{
			font-size: 36upx;
			color: $base-color;
		}
		.submit{
			display:flex;
			align-items:center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: $base-color;
		}
	}
	
	/* 优惠券面板 */
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .3s;
		
		.mask-content{
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y:scroll;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.mask-content{
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item{
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;
		.con{
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;
			&:after{
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}
		.left{
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}
		.time{
			font-size: 24upx;
			color: $font-color-light;
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}
		.price{
			font-size: 44upx;
			color: $base-color;
			&:before{
				content: '￥';
				font-size: 34upx;
			}
		}
		.tips{
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}
		.circle{
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;
			&.r{
				left: auto;
				right: -6upx;
			}
		}
	}

</style>
