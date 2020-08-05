<template>
	<view>
		<view class="moneyRecordList" v-if="show">
			<view class="usMessItem">
				<view class="usMessIt-tit fl">头像</view>
				<view class="usMessIt-con fr flexBox" @tap="chooseImage">
					<image mode="" :src="member.avatar?member.avatar:tempFilePaths"></image>
				</view>
				<view class="clear"></view>
			</view>
			<view class="usMessItem">
				<view class="usMessIt-tit fl">昵称</view>
				<view class="usMessIt-con fr flexBox">
					<input type="text" :value="member.realname" placeholder="请填写昵称" />
					<uni-icons type="arrowright"></uni-icons>
				</view>
				<view class="clear"></view>
			</view>
			<view class="usMessItem">
				<view class="usMessIt-tit fl">性别</view>
				<view class="usMessIt-con fr flexBox" >
					<picker :value="index" :range="array" range-key="name" @change="bindPickerChange">
						<text>{{array[index].name}}</text>
					</picker>
					<uni-icons type="arrowright"></uni-icons>
				</view>
				<view class="clear"></view>
			</view>
			<view class="usMessItem">
				<view class="usMessIt-tit fl">生日</view>
				<view class="usMessIt-con fr flexBox">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
					<uni-icons type="arrowright"></uni-icons>
				</view>
				<view class="clear"></view>
			</view>
			<view class="usMessItem">
				<view class="usMessIt-tit fl">手机号</view>
				<view class="usMessIt-con fr flexBox">
					<text v-if="member.mobile">{{member.mobile}}</text>
					<button v-else class="kjUsMs-name ellipsis-1" type="default" open-type="getPhoneNumber" @getphonenumber="getphone">授权登录</button>
				</view>
				<view class="clear"></view>
			</view>
			<view class="usMessItem">
				<view class="usMessIt-tit fl">微信账号绑定</view>
				<view class="usMessIt-con fr flexBox">
					<uni-icons type="arrowright"></uni-icons>
				</view>
				<view class="clear"></view>
			</view>
		</view>
		<view class="bottomFixed"></view>
		<!--view class="bottom_box">
			<view class="bottom_service"> <a href="http://h5.ilishige.com/user_policy.html">用户服务协议</a> </view>
			<view class="bottom_left"> <a href="http://h5.ilishige.com/privacy_policy.html">隐私政策</a></view>
		</view-->
		<view class="bottomFixedBtn">
			<button class="myMoneyGoBtn yhqAlt-btn buy-now-btn" type="default" @click="goLogin">退出登录</button>
		</view>
	</view>
</template>

<script>
	import {userinfo,decodephone,bindPhone,login} from "@/api/user";
	var sourceType = [
		['camera'], //拍照
		['album'], //相册
		['camera', 'album'] //拍照或相册
	]
	var sizeType = [
		['compressed'], //压缩
		['original'], //原图
		['compressed', 'original'] //压缩或原图
	]
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				tempFilePaths: '../../static/missing-face.png', //保存图片路径集合
				sourceTypeIndex: 2, //添加方式限制
				sizeTypeIndex: 2, //图片尺寸限制
				index: 0,
				show : !1,
				array: [{name:'女'},{name: '男'}],
				date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
				info:'',
				member:{}
			}
		},
		onLoad(){
			this.getinfo();
			//#ifdef MP-WEIXIN
			this.setSessionKey();
			//#endif	
		},
		methods: {
			//选择图片
			getinfo: function(){
				userinfo().then(res => {
					
					this.member = res.member;
					this.show = !0;
				})
			},
			getphone(e) {
				let formdata={data:e.detail.encryptedData,iv:e.detail.iv,sessionKey:this.logininfo.session_key};
				decodephone(formdata).then(res =>{
					this.phone = res.phoneNumber;
					bindPhone(this.phone).then(k => {
						uni.showToast({
							title:"绑定成功"
						})
						this.show = !1;
						this.getinfo();
					})
					/*this.authLogin();*/
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
			chooseImage: async function() {
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					// #ifdef MP-WEIXIN
					sizeType: sizeType[this.sizeTypeIndex],
					// #endif
					count: 1,
					success: (res) => {
						this.tempFilePaths = res.tempFilePaths[0];
						console.log(this.tempFilePaths);
					}
				})
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			goLogin () {
				this.$store.commit("LOGOUT");
				uni.navigateTo({
					url: '/pages/public/login'
				});
			}
		}
	}
</script>

<style lang="scss">
	page { background-color: #fff;}
	.bottom_box{
		display: flex;
		justify-content: center;
		.bottom_service:after{
			content: '|';
			margin:0 20rpx;
		}
		.bottom_service,.bottom_left{
			text-decoration: underline;
		}
	}
</style>

