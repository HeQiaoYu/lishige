<template>
	<view>
		<view class="loginBox">
			<form>
				<!--#ifndef MP-WEIXIN-->
				<view class="loginInput">
					<view class="logInpItem">
						<input type="text" placeholder="请输入手机号" 
						:value="mobile"
						maxlength="11"
						data-key="mobile"
						@input="inputChange" />
					</view>
					<view class="logInpItem">
						<input class="fl" type="text" :value="phonecode"  @input="inputChange"  data-key="phonecode" placeholder="请输入验证码" />
						<button class="yanzhengma fr" type="primary" hover-class="none" @click="getCode" :disabled="disabled">{{codeTextShow == 0 ? codeText.getCode : (codeTextShow == 1 ?count + codeText.countDown:codeText.getAgain)}}</button>
						<view class="clear"></view>
					</view>
					<view class="logInpItem">
						<input class="fl" type="text" :value="verificationcode" @input="inputChange"  data-key="verificationcode" placeholder="请输入图形验证码" />
						<image class="yanzhengmaa fr" :src="code" hover-class="none" @click='btn_imgUpdate'></image>
						<view class="clear" hover-class="none"></view>
					</view>
				</view>
				<button class="myMoneyGoBtn yhqAlt-btn buy-now-btn" form-type="submit" hover-class="none" @click="toLogin" :disabled="logining">登录</button>
				<!--#endif-->
				<!--#ifdef MP-WEIXIN-->
				 <view v-if="isCanUse">
					<view>
						<view class='header'>
							<image src='../../static/img/wx_login.png'></image>
						</view>
						<view class='content'>
							<view>申请获取以下权限</view>
							<text>获得你的公开信息(昵称，头像、地区等)</text>
						</view>
						<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
							授权登录
						</button>
					</view>
				</view>
				
				<!--#endif-->
			</form>
		</view>
	</view>
</template>
<script>
	import { userLogin, smsphone,login,authLogin } from '@/api/user.js';
	import {  
		mapMutations 
	} from 'vuex';
	import { VUE_APP_API_URL } from "@/utils/index";
	import {changeURLArg} from '@/utils/help.js';
	export default {
		data() {
			return {
				codeText :{
					getCode:'获取验证码',
					countDown:'s重新获取',
					getAgain:'重新获取'
				},
				codeTextShow:0,
				count:59,
				code:VUE_APP_API_URL+'app/ewei_shopv2_api.php?i=1&r=sms.captcha&comefrom=wxapp&openid=sns_wa_&mid=&merchid=&authkey=&s='+new Date().getTime(),
				disabled:false,
				mobile: '',
				verificationcode:'',
				password: '',
				logining: false,
				isCanUse:uni.getStorageSync('isCanUse')||true,//默认为true,
				phonecode:'',
				logininfo:{},
				back:1
			}
		},
		onLoad(options){
			// #ifndef MP-WEIXIN
			this.back = options.back?options.back:1;
			// #endif
			// #ifdef MP-WEIXIN
			this.login();
			// #endif
		},
		onBackPress(options) { 
			if(this.back == 1){
				return false;
			}else{
				uni.switchTab({
					url: '/pages/index/index'
				});
				return true;
			}
		},  
		methods: {
			...mapMutations(['LOGIN']),
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			backs() {  
				uni.navigateBack({  
					delta: 2
				});  
			},
			navBack(){
				uni.navigateBack();
			},
			toRegist(){
				this.$api.msg('去注册');
			},
			btn_imgUpdate(){
				let that = this;
				console.log(123)
				that.$set(that,'code',changeURLArg(this.code,'s',new Date().getTime()));
			},
			wxGetUserInfo() {
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						_this.encryptedData = infoRes.encryptedData; //昵称
						_this.iv = infoRes.iv; //头像
						try {
							uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
							_this.updateUserInfo();
						} catch (e) {}
					},
					fail(res) {}
				});
			},
			　//登录
			login() {
				let _this = this;
				uni.showLoading({
					title: '登录中...'
				});
			   // 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						if (!_this.isCanUse) {
							//非第一次授权获取用户信息
							uni.getUserInfo({
								provider: 'weixin',
								success: function(infoRes) {
	　　　　　　　　　　　　　　　　　　//获取用户信息后向调用信息更新方法
									login({code:code}).then(res => {
										_this.logininfo = res;
										_this.encryptedData = infoRes.encryptedData; //昵称
										_this.iv = infoRes.iv; //头像
										_this.updateUserInfo();//调用更新信息方法
									});
									
								}
							});
						}
						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						login({code:code}).then(res => {
							_this.logininfo = res;
							uni.hideLoading();
						});
						
					},
				});
			},
			updateUserInfo() {
				let t = this;
				let res = this.logininfo
				let formdata={data:t.encryptedData,iv:t.iv,sessionKey:res.session_key,phone : t.mobile};
				authLogin(formdata).then(res => {
					const datas = {
					  expires_time: res.watermark.timestamp,
					  openid: res.openId,
					  token: ''
					};
					t.LOGIN(datas);
					if(uni.getStorageSync('back') != ''){
						uni.navigateBack();
					}else{
						uni.switchTab({
							url:'/pages/user/user'
						})
					}
				}).catch(res =>{
					console.log(res);
				})
			},
			async toLogin(){
				this.logining = true;
				const {mobile, phonecode} = this;
				userLogin(mobile,phonecode).then(data =>{
					let [error ,on] = data,res = on.data;
					this.logining = false;
					if(res.error != 0){
						uni.showToast({
							title: Error.msg,
							duration: 500,
							icon:'none'
						})
						return;
					}
					const datas = {
					  token: res.token,
					  expires_time: res.expire,
					  openid: res.member.openid,
					};
					this.LOGIN(datas)
					if(uni.getStorageSync('back') != ''){
						uni.navigateBack();
					}else{
						uni.switchTab({
							url:'/pages/user/user'
						})
					}
					
				}).catch(Error =>{
					uni.showToast({
						title: Error.msg,
						duration: 500,
						icon:'none'
					})
					this.logining = false;
				});
				
			},
			getCode() {
				let that = this;
				const {mobile, verificationcode} = this;
				smsphone(mobile,verificationcode).then(res => {
					let [els ,on] = res,data = on.data;
					if(data.error != 0 && data != ''){
						uni.showToast({
							title: data.message ? data.message : data.error,
							duration: 500,
							icon:'none'
						});
						return;
					}
					this.codeTextShow = 1;
					this.disabled = true;
					var interval = setInterval(()=>{
						--this.count
					},1000)
					setTimeout(()=>{
						clearInterval(interval)
						this.count = 59
						this.codeTextShow = 2
						this.disabled = false
					},60000)
				}).catch(Error =>{
					console.log(Error)
					uni.showToast({
						title: Error.msg,
						duration: 500,
						icon:'none'
					});
				})
				
			}
		}
	}
</script>
<style>
	page { background-color: #fff;}
	.yanzhengmaa{
		width:180upx;
		height:84upx;
	}
	.header {
		text-align: center;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
