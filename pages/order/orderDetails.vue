<template>
	<view>
		<view class="yhItem myOdItem">
			<view class="odShop flexBox between" v-if="orderInfo.stores == false" >
				<view class="proXqShop-int flexBox odShop-int" @click="goShop">
					<uni-icons class="odShop-icon" type="shop"></uni-icons>
					<view class="proShop-int flexBox">
						<view class="proShop-title ellipsis-1">{{orderInfo.shop.name}}</view>
						<uni-icons type="arrowright"></uni-icons>
					</view>
				</view>
				<view class="proXqShop-jt" @click="goOdInfo">
					<text class="proXqShop-tit">{{orderInfo.order.statusstr}}</text>
				</view>
			</view>
			<view class="indProItem uni-media-list odProItem" v-for="(item,key) in orderInfo.goods" @click="goOdInfo">
				<view class="indProIt-image odProIt-image">
					<image :src="item.thumb"></image>
				</view>
				<view class="indProIt-int uni-media-list-body">
					<view class="">
						<view class="indPro-tit ellipsis-2">{{item.title}}</view>
						<view class="indProDbKuai flexBox between">
							<view class="indPro-money">
								<text>{{item.optionname}}</text>
							</view>
						</view>
					</view>
					<view class="indPro-dibu clear">
						<view class="indPro-money fr">
							<text class="indProPri"><text class="indProPriSml">￥</text>{{item.price}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="odItem-cd flexBox between">
				<text>商品总价</text>
				<text>￥{{orderInfo.order.goodsprice}}</text>
			</view>
			<block v-if="orderInfo.order.ispackage!='1'">
				<view class="odItem-cd flexBox between" v-if="orderInfo.order.deductenough>0">
					<text>满额立减</text>
					<text>￥ -{{orderInfo.order.deductenough}}</text>
				</view>
				<view class="odItem-cd flexBox between" v-if="orderInfo.order.couponprice>0">
					<text>优惠券优惠</text>
					<text>￥ -{{orderInfo.order.couponprice}}</text>
				</view>
				<view class="odItem-cd flexBox between" v-if="orderInfo.order.buyagainprice>0">
					<text>重复购买优惠</text>
					<text>￥ -{{orderInfo.order.buyagainprice}}</text>
				</view>
				<view class="odItem-cd flexBox between" v-if="orderInfo.order.discountprice>0">
					<text>会员优惠</text>
					<text>￥ -{{orderInfo.order.discountprice}}</text>
				</view>
				<view class="odItem-cd flexBox between" v-if="orderInfo.order.isdiscountprice>0">
					<text>促销优惠</text>
					<text>￥ -{{orderInfo.order.isdiscountprice}}</text>
				</view>
				<view class="odItem-cd flexBox between" v-if="orderInfo.order.deductprice>0">
					<text>积分抵扣</text>
					<text>￥ -{{orderInfo.order.deductprice}}</text>
				</view>
				<view class="odItem-cd flexBox between" v-if="orderInfo.order.deductcredit2>0">
					<text>余额抵扣</text>
					<text>￥ -{{orderInfo.order.deductcredit2}}</text>
				</view>
				<view class="odItem-cd flexBox between" v-if="orderInfo.order.seckilldiscountprice>0">
					<text>秒杀优惠</text>
					<text>￥ -{{orderInfo.order.seckilldiscountprice}}</text>
				</view>
			</block>
			<view class="odItem-cd flexBox between">
				<view class="item_order">
					<text>实付款</text>
					<text class="textOrange big">￥{{orderInfo.order.price}}</text>
				</view>
			</view>
		</view>
		<view class="yhItem myOdItem order_info">
			<!-- <view class="ddxx">订单信息</view> -->
			<view class="odItem-cd flexBox order_info">
				<text>订单编号：{{orderInfo.order.ordersn}}</text>
				<!-- <text class="textOrange">复制</text> -->
			</view>
			<view class="odItem-cd flexBox order_info">
				<text>下单时间：{{orderInfo.order.createtime}}</text>
			</view>
			<view class="odItem-cd flexBox order_info">
				<text>支付方式： 微信</text>
			</view>
			<view class="odItem-cd flexBox order_info">
				<text>订单金额：<text class="pay_money" style="color:#ff5722;">{{orderInfo.order.price}}</text></text>
			</view>
			<view class="odItem-cd flexBox order_info">
				<text>支付时间：{{orderInfo.order.createtime}}</text>
			</view>
		</view>
		<!-- 送货上门 -->
		<view class="yhItem myOdItem order_info" v-if="!orderInfo.order.verifyinfo">
			<!-- <view class="ddxx">订单信息</view> -->
			<view class="odItem-cd flexBox order_info">
				<text>订单状态：<text style="color:#ff5722;font-weight: bold;">{{orderInfo.order.statusstr}}</text></text>
				<!-- <text class="textOrange">复制</text> -->
			</view>
			<view class="odItem-cd flexBox order_info">
				<text>配送方式：送货上门</text>
			</view>
			<view class="odItem-cd flexBox order_info">
				<text>收货人：{{orderInfo.address.realname}} &nbsp;&nbsp;{{orderInfo.address.mobile}}</text>
			</view>
			<view class="odItem-cd flexBox order_info">
				<text>收货地址： {{orderInfo.address.province+orderInfo.address.city+orderInfo.address.area+orderInfo.address.street+orderInfo.address.address}}</text>
			</view>
			
		</view>
		<!-- 自提 -->
 		<view class="yhItem myOdItem order_info" v-else>
			<view class="odItem-cd flexBox order_info">
				<text>订单状态：<text style="color:#ff5722;font-weight: bold;">{{orderInfo.order.statusstr}}</text></text>
			</view>
			<view class="odItem-cd flexBox order_info">
				<text>配送方式：自提</text>
			</view>
			<view class="odItem-cd flexBox order_info">
				<text>自提地点： {{orderInfo.carrier.address}}</text>
			</view>
			<view class="odItem-cd " v-if="orderInfo.order.status>0">
				<block v-for="(item,index) in orderInfo.order.verifyinfo">
				<text>提货码：</text><text>{{item.verifycode}}</text>
				<view class="Rcode">
					<image :src="qrcode"></image>
				</view>
				</block>
			</view>
		</view> 
		
		<view class="odXqCaozuoZhan order_info"></view>
		<view class="odXqCaozuo">
			<view class="odItem-caozuo flexBox" v-if="orderInfo.order.status == 0" >
				<button class="odItBtn">取消订单</button>
				<button class="odItBtn signBtn-orangeBorder" @click="goPay">付款</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {orderdetail,getOrdercode} from '@/api/public';
	export default {
		data() {
			return {
				id :0,
				code:0,
				qrcode:'',
				orderInfo : {
					address : {
						realname : '',
						mobile : '',
						province : '',
						city : '',
						area : '',
						street : '',
						address : ''
					},
					order:{
						id: "",
						ordersn: "",
						createtime: "",
						paytime: "",
						sendtime: "",
						finishtime: "",
						status: 0,
						statusstr: "",
						price: "",
						goodsprice: "",
						dispatchprice: "",
						ispackage: "",
						seckilldiscountprice: "0.00",
						deductenough: "0.00",
						couponprice: "0.00",
						discountprice: "0.00",
						isdiscountprice: "0.00",
						deductprice: "0.00",
						deductcredit2: "0.00",
						diyformfields: [],
						diyformdata: [],
						showverify: false,
						verifytitle: "",
						dispatchtype: "0",
						verifyinfo: false,
						invoicename: null,
						merchid: 0,
						virtual: "0",
						virtual_str: "",
						virtual_info: "",
						isvirtualsend: "0",
						virtualsend_info: "",
						canrefund: false,
						is_single_refund: false,
						refundtext: "",
						refundtext_btn: "",
						cancancel: true,
						canpay: true,
						canverify: false,
						candelete: false,
						cancomment: false,
						cancomment2: false,
						cancomplete: false,
						cancancelrefund: false,
						candelete2: false,
						canrestore: false,
						verifytype: "0",
						refundstate: "0",
						icon: "e711",
						city_express_state: "0",
						iscycelbuy: "0",
						isonlyverifygoods: false,
						ramark: "",
					},
					shop:{
						name:'黎氏阁商城',
					}
				},
			}
		},
		onLoad(options){
			this.id = options.id
			console.log(options);
			this.info();
			this.getcode();
		},
		onShow(){
			
		},
		methods: {
			info(){
				let that = this;
				orderdetail(that.id).then(data => {
					if(data.error == 0){
						that.orderInfo = data;
						
					}else{
						this.$api.msg(data)
					}
				})
			},
			goPay() {
				let that = this;
				uni.navigateTo({
					url: '/pages/money/pay?orderid='+that.id
				});
			},
			goOdInfo(){
				
			},
			goShop(){
				
			},
			getcode(){
				let that = this;
				getOrdercode({id:that.id}).then(res => {
					that.qrcode = res.url
				})
			}
		}
	}
</script>

<style>
	page { background-color: #F2F2F2;}
	.myOdItem { margin: 20rpx 0;border-radius: 0;padding: 28rpx 30rpx;}
	.odItem-cd text { color: #888;line-height: 1.9;}
	.odItem-cd text.textOrange.big { font-size: 28rpx;}
	.ddxx { font-size: 32rpx;}
	.Rcode{
		width:260rpx;
		height:260rpx;
		margin-left: 115rpx;
		border:1px solid #f2f2f2;
	}
	.Rcode image{
		width:100%;
		height:100%;
	}
	.order_info{
		border-bottom: 1px solid #F2F2F2;
	}
	.order_info text{
		width:100%;
		height:100rpx;
		color:#333;
		font-size: 28rpx;
	}
</style>
