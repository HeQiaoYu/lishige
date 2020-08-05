<template>
	<view class="app" v-if="show">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{orderInfo.price}}</text>
		</view>
		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#FF5722" :checked='payType == 1' />
					</radio>
				</label>
			</view>
			<view class="type-item b-b" v-if="alipay.success" @click="changePayType(2)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#FF5722" :checked='payType == 2' />
					</radio>
				</label>
			</view>
			<view class="type-item" v-if="credit.success" @click="changePayType(3)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 ¥{{credit.current}}</text>
				</view>
				<label class="radio">
					<radio value="" color="#FF5722" :checked='payType == 3' />
					</radio>
				</label>
			</view>
		</view>
		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script>
	import {pay, wxpay, complete, checkstock,config,parseQuery,getopenid} from "@/api/public";
	//#ifdef H5
	var jweixin = require('jweixin-module');
	//#endif
	export default {
		data() {
			return {
				payType: 1,
				orderInfo: {},
				show:!1,
				wechat:{
					success:false,
				},
				alipay:{
					success:false,
				},
				credit:{
					success:false,
					current:0.00
				},
				list:{},
			};
		},
		computed: {
		
		},
		onLoad(options) {
			this.orderId = options.orderid;
			//#ifdef H5
			var surl = encodeURIComponent(window.location.href.split('#')[0]);
			config(surl).then(res => {
				let [error ,on] = res, data = on;
				jweixin.config({  
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
					appId: data.data.appId, // 必填，公众号的唯一标识  
					timestamp: data.data.timestamp, // 必填，生成签名的时间戳  
					nonceStr: data.data.nonceStr, // 必填，生成签名的随机串  
					signature: data.data.signature, // 必填，签名，见附录1  
					surl: data.data.surl, //自己添加的，debug为true的时候可以网页打印出对应的URL是否正确  
					jsApiList: ["updateAppMessageShareData", "updateTimelineShareData","chooseWXPay"]  
				});
				if(!uni.getStorageSync('openids')){
					const { code } = parseQuery();
					if(!code) {
						const redirect_uri = surl;
						const state = encodeURIComponent(
						  ("" + Math.random()).split(".")[1] + "authorizestate"
						);
						location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${data.data.appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
					}else{
						getopenid(code).then(data =>{
							uni.setStorageSync('openids',data.data);
							this.getPayInfo();
						})
					}
				}else{
					this.getPayInfo();
				}
			})
			//#endif
			//app支付
			//#ifdef APP-PLUS || MP-WEIXIN 
			this.getPayInfo();
			//#endif
		},
		methods: {
			getPayInfo(){
				let openid = this.$store.state.app.openid;
				//#ifdef H5
				let openids = uni.getStorageSync('openids');
				pay(this.orderId,openids).then(res => {
					uni.hideLoading(); 
					this.show = 1;
					if(res.error == 1){
						uni.redirectTo({
							url: "/pages/mygroups/orderDetails?id="+this.orderId
						});
					}
					//h5支付
					this.wechat = res.wechat.payinfo
					if(!res.wechat.success){
						uni.showToast(res.wechat.message);
						this.complete('wechat');
					}
				//#endif
				//#ifdef MP-WEIXIN 
				pay(this.orderId).then(res => {
					uni.hideLoading(); 
					this.show = 1;
					if(res.error == 1){
						uni.redirectTo({
							url: "/pages/mygroups/orderDetails?id="+this.orderId
						});
					}
					//小程序支付
					this.wechat = res.xcxpay.payinfo
					if(!res.xcxpay.success){
						uni.showToast(res.xcxpay.message);
						this.complete('wechat');
					}
				//#endif
				//app支付
				//#ifdef APP-PLUS
				pay(this.orderId).then(res => {
					
					
					uni.hideLoading(); 
					this.show = 1;
					
					
					this.wechat = res.appwechat
					//#endif
					this.orderInfo = res.order;
					//#ifndef MP-WEIXIN 
					this.alipay = res.alipay
					this.credit = res.credit
					//#endif
					this.list = res
				
				})
			},
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			complete:function(t, a){
				let o = this;
				complete(o.orderId, t, a).then(data => {
					
					if(0 != data.error){
						uni.showToast({
							title: data.message,
							duration: 2000,
							success: () => {
								uni.redirectTo({
									url: "/pages/order/orderDetails?id="+o.orderId
								});
							}
						})
					}else{
					
						uni.showToast({
							title: data.order.status,
							duration: 2000,
							icon: 'none',
							success: () => {
								uni.redirectTo({
									url: "/pages/order/orderDetails?id="+o.orderId
								});
							}
						})
					}
				}).catch(res=> {
					uni.redirectTo({
						url: "/pages/order/orderDetails?id="+o.orderId
					});
				})
			},
			//确认支付
			confirm: async function() {
				//先判断订单是否可下单
				let that = this;
				let payType = this.payType;
				checkstock(that.orderId).then(data => {
					
					//#ifdef H5
					//h5支付
					 1 == payType ? jweixin.ready(function(){  
						console.log(that.wechat.paySign)
						jweixin.chooseWXPay({
						  timestamp: that.wechat.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						  nonceStr: that.wechat.nonceStr, // 支付签名随机串，不长于 32 位
						  package: that.wechat.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
						  signType: 'HMAC-SHA256', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						  paySign: that.wechat.paySign, // 支付签名
						  success: function (res) {
							that.complete('wechat');
						  }
						})
					}):3 == payType ? that.complete('credit'):uni.showToast('未开通');
			　　　	//#endif
					//#ifdef MP-WEIXIN
						
						1 == payType ? uni.requestPayment({
							provider: 'wxpay',
							timeStamp: that.wechat.timeStamp,
							nonceStr: that.wechat.nonceStr,
							package: that.wechat.package,
							signType: 'MD5',
							paySign:that.wechat.paySign,
							success: function (t) {
								that.complete('xcxwechat');
							},
							fail: function (err) {
								that.complete('xcxwechat');
								console.log('fail:' + JSON.stringify(err));
							}
						}) : 3 == payType ? that.complete('credit') : uni.requestPayment({
							provider: 'wxpay',
							orderInfo: that.wechat.payinfo, //微信、支付宝订单数据
							success: function (t) {
								console.log(t);
							
								that.complete('xcxwechat');
							},
							fail: function (err) {
								that.complete('xcxwechat');
								console.log('fail:' + JSON.stringify(err));
							}
						})　　　　　　　　　　　
					//#endif
					//#ifdef APP-PLUS　　　　　　　　　　
						0 == data.error ? 1 == payType ? uni.requestPayment({
							provider: 'wxpay',
							orderInfo: that.wechat.payinfo, //微信、支付宝订单数据
							success: function (t) {
								console.log(t);
								var e = [];
								"accept" == t[that.list.subscribetmp.pay] && e.push("pay"), "accept" == t[that.list.subscribetmp.send] && e.push("send"), 
								"accept" == t[that.list.subscribetmp.autosend] && e.push("autosend"), "accept" == t[that.list.subscribetmp.receive] && e.push("receive"), 
								that.complete('appwechat', e);
							},
							fail: function (err) {
								that.complete('appwechat');
								console.log('fail:' + JSON.stringify(err));
							}
						}) : 3 == payType ? that.complete('credit') : uni.requestPayment({
							provider: 'wxpay',
							orderInfo: that.wechat.payinfo, //微信、支付宝订单数据
							success: function (t) {
								console.log(t);
								var e = [];
								"accept" == t[that.list.subscribetmp.pay] && e.push("pay"), "accept" == t[that.list.subscribetmp.send] && e.push("send"), 
								"accept" == t[that.list.subscribetmp.autosend] && e.push("autosend"), "accept" == t[that.list.subscribetmp.receive] && e.push("receive"), 
								that.complete('wechat', e);
							},
							fail: function (err) {
								that.complete('wechat');
								console.log('fail:' + JSON.stringify(err));
							}
						}) : uni.showToast('未开通');　　　　　　　　　　　　
					//#endif
				}).catch(res => {
					uni.showToast('未开通');　
				})
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

</style>
