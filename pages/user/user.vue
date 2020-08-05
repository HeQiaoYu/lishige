<template>  
    <view class="container">
		<view class="userHeader flexBox between" v-if="hasLogin">
			<view class="usHea-mess flexBox">
				<view class="usMess-tx"><image :src="userInfo.avatar ? userInfo.avatar :'../../static/missing-face.png'" mode=""></image></view>
				<view class="usMess-int">
					<view class="kjUsMs-name ellipsis-1">{{userInfo.nickname}}</view>
					<view class="usMess-level" v-if="userInfo.mobile">{{userInfo.mobile}}</view>
					<view class="usMess-level" v-else>
						<button  class="btn-default" open-type="getPhoneNumber" @getphonenumber="getphone">绑定手机号</button>
					</view>
				</view>
			</view>
			<navigator url="/pages/userMess/userMess" hover-class="none" class="usHea-more textOrange">个人资料</navigator>
		</view>
		<view class="userHeader flexBox between" v-else>
			<view class="usHea-mess flexBox">
				<view class="usMess-tx"><image src="'../../static/missing-face.png" mode=""></image></view>
				<view class="usMess-int">
					<button  class="kjUsMs-name ellipsis-1" open-type="getUserInfo" @getuserinfo="authLogin">授权登录</button>
					<!--button class="kjUsMs-name ellipsis-1" type="default" open-type="getPhoneNumber" @getphonenumber="getphone">授权登录</button-->
				</view>
			</view>
		</view>
		<view class="userYue flexBox around">
			<navigator url="/pages/myGold/myGold" hover-class="none" class="usyeItem">
				<text class="textOrange">{{userInfo.credit2}}</text>
				<text>{{userInfo.credittext}}</text>
			</navigator>
			<navigator url="/pages/money/money" hover-class="none" class="usyeItem">
				<text class="textOrange">{{userInfo.credit1}}</text>
				<text>{{userInfo.moneytext}}</text>
			</navigator>
			<navigator url="/pages/myCollect/myCollect" hover-class="none" class="usyeItem">
				<text class="textOrange">{{userfavorite}}</text>
				<text>收藏夹</text>
			</navigator>
			<navigator url="/pages/myQuan/myQuan" hover-class="none" class="usyeItem">
				<text class="textOrange">0</text>
				<text>优惠券</text>
			</navigator>
		</view>
		<view class="userBox">
			<view class="userOrder">
				<view class="usOd-header flexBox between" @click="navTo('/pages/order/order?state=0')" :hover-stay-time="50">
					<view class="usOdHea-tit">全部订单</view>
					<view class="usOdHea-more flexBox">
						<text>查看全部</text>
						<uni-icons type="arrowright"></uni-icons>
					</view>
				</view>
				<view class="usOdList clear">
					<view class="usOdItem fl"  @click="navTo('/pages/order/order?state=1')" :hover-stay-time="50">
						<view class="usOd-icon">
							<image src="../../static/img/odIcon1.png" mode=""></image>
						</view>
						<view class="usOd-name">待付款</view>
					</view>
					<view class="usOdItem fl" @click="navTo('/pages/order/order?state=2')" :hover-stay-time="50">
						<view class="usOd-icon">
							<image src="../../static/img/odIcon1.png" mode=""></image>
						</view>
						<view class="usOd-name">待发货</view>
					</view>
					<view class="usOdItem fl" @click="navTo('/pages/order/order?state=4')" :hover-stay-time="50">
						<view class="usOd-icon">
							<image src="../../static/img/odIcon1.png" mode=""></image>
						</view>
						<view class="usOd-name">已完成</view>
					</view>
					<view class="usOdItem fl" @click="navTo('/pages/order/order?state=5')" :hover-stay-time="50">
						<view class="usOd-icon">
							<image src="../../static/img/odIcon1.png" mode=""></image>
						</view>
						<view class="usOd-name">退款</view>
					</view>
				</view>
			</view>
			<view class="userOrder">
				<view class="usOd-header flexBox between" @click="navTo('/pages/mygroups/groupsorder?state=0')" :hover-stay-time="50">
					<view class="usOdHea-tit">拼团订单</view>
					<view class="usOdHea-more flexBox">
						<text>查看全部</text>
						<uni-icons type="arrowright"></uni-icons>
					</view>
				</view>
				<view class="usOdList clear">
					<view class="usOdItem fl"  @click="navTo('/pages/mygroups/groupsorder?state=1')" :hover-stay-time="50">
						<view class="usOd-icon">
							<image src="../../static/img/odIcon1.png" mode=""></image>
						</view>
						<view class="usOd-name">待付款</view>
					</view>
					<view class="usOdItem fl" @click="navTo('/pages/mygroups/groupsorder?state=2')" :hover-stay-time="50">
						<view class="usOd-icon">
							<image src="../../static/img/odIcon1.png" mode=""></image>
						</view>
						<view class="usOd-name">待发货</view>
					</view>
					<view class="usOdItem fl" @click="navTo('/pages/mygroups/groupsorder?state=4')" :hover-stay-time="50">
						<view class="usOd-icon">
							<image src="../../static/img/odIcon1.png" mode=""></image>
						</view>
						<view class="usOd-name">已完成</view>
					</view>
					<view class="usOdItem fl" @click="navTo('/pages/mygroups/mygroups?state=5')" :hover-stay-time="50">
						<view class="usOd-icon">
							<image src="../../static/img/odIcon1.png" mode=""></image>
						</view>
						<view class="usOd-name">退款</view>
					</view>
				</view>
			</view>
			<view class="userOrder">
				<view  class="usOd-header flexBox between">
					<view class="usOdHea-tit">服务与工具</view>
				</view>
				<view class="usOdList clear usSerList">
					<navigator url="/pages/address/address" hover-class="none" class="usOdItem fl">
						<view class="usOd-icon">
							<image src="../../static/img/fwgjIcon1.png" mode=""></image>
						</view>
						<view class="usOd-name usSerName">收货地址</view>
					</navigator>
					<navigator url="" hover-class="none" class="usOdItem fl">
						<view class="usOd-icon">
							<image src="../../static/img/fwgjIcon1.png" mode=""></image>
						</view>
						<view class="usOd-name usSerName">我的分销</view>
					</navigator>
					<navigator url="" hover-class="none" class="usOdItem fl">
						<view class="usOd-icon">
							<image src="../../static/img/fwgjIcon1.png" mode=""></image>
						</view>
						<view class="usOd-name usSerName">商家管理</view>
					</navigator>
					<navigator url="/pages/shq/shq" hover-class="none" class="usOdItem fl">
						<view class="usOd-icon">
							<image src="../../static/img/fwgjIcon1.png" mode=""></image>
						</view>
						<view class="usOd-name usSerName">生活圈</view>
					</navigator>
					<navigator url="" hover-class="none" class="usOdItem fl">
						<view class="usOd-icon">
							<image src="../../static/img/fwgjIcon1.png" mode=""></image>
						</view>
						<view class="usOd-name usSerName">联系客服</view>
					</navigator>
					<navigator url="" hover-class="none" class="usOdItem fl">
						<view class="usOd-icon">
							<image src="../../static/img/fwgjIcon1.png" mode=""></image>
						</view>
						<view class="usOd-name usSerName">在线客服</view>
					</navigator>
					<view class="usOdItem fl" @click="scan">
						<view class="usOd-icon">
							<image src="../../static/img/fwgjIcon1.png" mode=""></image>
						</view>
						<view class="usOd-name usSerName" >订单核销</view>
					</view>
				</view>
			</view>
		</view>
		
		<uni-popup  ref="popup" type="center" :custom="true" :mask-click="false">
			<view class="popup-box">
				<view class="title flex">
					<view class="image">
						<image src="../../static/img/logo.png"></image>
					</view>
					黎氏阁手机号授权
				</view>
				<view class="text">
					黎氏阁申请使用你的手机号码用于购物下单。
				</view>
				<button class="kjUsMs-name ellipsis-1" type="default" open-type="getPhoneNumber" @getphonenumber="getphone">确定授权</button>
			</view>
			
		</uni-popup>
    </view>
	
</template>  
<script>  
	import {getUser,userfavorite,authLogin,login,decodephone,bindPhone} from '@/api/user';
	import listCell from '@/components/mix-list-cell';
	import uniPopup from "@/components/uni-popup/uni-popup"
    import {  
        mapState,
		mapMutations
    } from 'vuex';  
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			listCell,
			uniPopup
		},
		data(){
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				userInfo:{
					credit2: 0,
					credit1: 0,
					credittext: '积分',
					moneytext: '余额'
					
				},
				userFeedbackHidden:true,
				show:true,
				hasLogin:this.$store.state.app.hasLogin,
				logininfo: {},
				userfavorite:0,
			}
		},
		onLoad(){
			
		},
		onShow(){
			this.hasLogin = this.$store.state.app.hasLogin;
			//#ifdef H5 || APP-PLUS
		
			if(!this.hasLogin) {
				
				uni.navigateTo({
					url:'/pages/public/login?back=2'
				})
			}else{
				this.User();
			}
			//#endif
			/*小程序需要先判断一下是否存在用户*/
			//#ifdef MP-WEIXIN
		//	this.authLogin();
			this.setSessionKey();
			if(this.$store.state.app.hasLogin){
				this.hasLogin = true;
				this.User();
			}
			//#endif	
		},
		//#ifdef MP-WEIXIN
	
		
		// #endif
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			}else if(index === 1){
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
        computed: {
			
		},
        methods: {
			...mapMutations(['LOGIN']),
			User: function() {
			  let that = this;
			  getUser().then(res =>{
				  that.userInfo = res;
				  if(res.mobile == ''){
					  this.$refs.popup.open();
				  }
				  userfavorite().then(res => {
				  		that.userfavorite = res.total; 
				  })
			  }).catch(res => {
				  
			  })
			},
			scan() {
			
	
				// 允许从相机和相册扫码
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						uni.navigateTo({
							url: '/pages/order/orderCancelAv'+res.result
						})
				    }
				});
			},
			getphone(e) {
				
				let formdata={data:e.detail.encryptedData,iv:e.detail.iv,sessionKey:this.logininfo.session_key};
				decodephone(formdata).then(res =>{
					
					bindPhone(res.phoneNumber).then(k => {
						uni.showToast({
							title:"绑定成功"
						})
						this.User();
					})
					this.$refs.popup.close();
					/*开始绑定手机 代*/
				}).catch(res => {
					console.log(res)
				});
			},
			setSessionKey(){
				let that = this;
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					let js_code=loginRes.code;
					login({code:js_code}).then(res => {
						that.logininfo = res;
					})
				  }
				})
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url){
				uni.navigateTo({  
					url
				}) 
			}, 
			/**
			 * 点击授权和普通授权
			*/
			hauthLogin() {
				var t = this;
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					  
				  }, fail:function(res){}
				  
				})
			},
			/**
			 * 小程序的授权登录
			 */
			authLogin(e) {
				var t = this;
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					let js_code=loginRes.code;//js_code可以给后台获取unionID或openID作为用户标识
					// 获取用户信息
						login({code:js_code}).then(res => {
							let formdata={data:e.detail.encryptedData,iv:e.detail.iv,sessionKey:res.session_key};
							authLogin(formdata).then(res => {
								const datas = {
								  expires_time: res.watermark.timestamp,
								  openid: res.openId,
								  token: ''
								};
								
								t.LOGIN(datas);
								t.User();
								t.hasLogin = t.$store.state.app.hasLogin;
							//	t.$refs.popup.close();
							}).catch(res =>{
								console.log(res);
							})
						})
				  },
				  fail:function(res){}
				})
			},
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e){
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if(moveDistance < 0){
					this.moving = false;
					return;
				}
				this.moving = true;
				if(moveDistance >= 80 && moveDistance < 100){
					moveDistance = 80;
				}
		
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
        }  
    }  
</script>  
<style lang='scss'>
	.popup-box{
		padding:30upx;
		border-radius: 15upx;
		background-color:#fff;
		width:80%;
		margin:0 auto;
		.title {
			align-items: center;
			font-weight: 500;
			font-size: 30upx;
			color: #333333;
			.image{
				border:1px solid #E5E5E5;
				border-radius: 50%;
				width: 100upx;
				height: 100upx;
				margin-right: 15upx;
				image{
					width:100%;
					height:100%;
				}
			}
		}
		.text {
			color: #969696;
			padding: 30upx 0upx;
		}
		button{
			background-color: #FE7537;
			color: #fff;
			line-height: 80upx;
		}
	}
	.popup_overlay {
		position: fixed;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100%;
		background-color: black;
		z-index: 1001;
		-moz-opacity: 0.8;
		opacity: .80;
		filter: alpha(opacity=88);
	}
	.popup_content {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 520upx;
		height: 550upx;
		margin-left: -270upx;
		margin-top: -270upx;
		border: 10px solid white;
		background-color: white;
		z-index: 1002;
		overflow: auto;
		border-radius: 20upx;
	}
 
	.popup_title {
		padding-top: 20upx;
		width: 480upx;
		text-align: center;
		font-size: 32upx;
	}
 
	.popup_textarea_item {
		padding-top: 5upx;
		height: 240upx;
		width: 440upx;
		background-color: #F1F1F1;
		margin-top: 30upx;
		margin-left: 20upx;
	}
 
	.popup_textarea {
		width: 410upx;
		font-size: 26upx;
		margin-left: 20upx;
	}
 
	.popup_button {
		color: white;
		background-color: #4399FC;
		border-radius: 20upx;
	}
		
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}

	.user-section{
		height: 520upx;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
	}

	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			.yticon{
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}
	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.yticon{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.history-section{
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
	page { background-color: #F2F2F2;}
</style>