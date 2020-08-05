<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">收货人</text>
			<input class="input" type="text" v-model="addressData.realname" placeholder="请填写收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号码</text>
			<input class="input" type="number" v-model="addressData.mobile" placeholder="请填写收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">所在地区</text>
			<text @click="chooseLocation" class="input">
				{{addressData.addressName}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b"> 
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.area" placeholder="街道楼牌号等" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.defaule" color="#24BC47" @change="switchChange" />
		</view>
		<view class="bottomFixedBtn">
			<button class="myMoneyGoBtn yhqAlt-btn buy-now-btn" type="default" @click="confirm">提交</button>
		</view>
	</view>
</template>

<script>
	import {userAddressAdd,userAddressDelete} from "@/api/user";
	export default {
		data() {
			return {
				addressData: {
					realname: '',
					mobile: '',
					addressName: '在地图选择',
					address: '',
					area: '',
					default: false,
					lng:'',
					lat:'',
					id:0
				}
			}
		},
		onLoad(option){
			let title = '添加收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				
				this.addressData = JSON.parse(option.data)
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				this.addressData.default = e.detail;
			},
			//地图选择地址
			chooseLocation(){
				let that = this;
				uni.chooseLocation({
					success: (data) => {
						this.addressData.addressName =data.address ;
						this.addressData.address =data.address;
						this.addressData.area = data.name;
						this.addressData.lng = data.longitude;
						this.addressData.lat = data.latitude;
					},
					fail: () => {
						uni.getSetting({
							success: function(res) {
								var statu = res.authSetting;
								console.log(statu);
								if (!statu['scope.userLocation']) {
									console.log(123);
									uni.showModal({
										title: '是否授权当前位置',
										content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
										success(tip) {
											if (tip.confirm) {
												uni.openSetting({
													success: function(data) {
														if (data.authSetting["scope.userLocation"] === true) {
															uni.showToast({
																title: '授权成功',
																icon: 'success',
																duration: 1000
															})
															//授权成功之后，再调用chooseLocation选择地方
															setTimeout(function(){
																uni.chooseLocation({
																	success: (data) => {
																		that.addressData.addressName =data.address ;
																		that.addressData.address =data.address;
																		that.addressData.area = data.name;
																		that.addressData.lng = data.longitude;
																		that.addressData.lat = data.latitude;
																	}
																})
															},1000)
														}
													}
												})
											} else {
												uni.showToast({
													title: '授权失败',
													icon: 'none',
													duration: 1000
												})
											}
										}
									})

								}
							}
						})
					}
				})
				
				
			},
			//提交
			confirm(){
				let data = this.addressData;
				if(!data.realname){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if(!data.address){
					this.$api.msg('请在地图选择所在位置');
					return;
				}
				if(!data.area){
					this.$api.msg('请填写门牌号信息');
					return;
				}
				userAddressAdd(data).then(res => {
				
				
					this.addressData.id = res.addressid;
					this.$api.prePage().refreshList(data, this.manageType);
				
					this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
					setTimeout(()=>{
						uni.navigateBack()
					}, 800)
				})
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				
			},
			onNavigationBarButtonTap(e) {
				let id  = this.addressData.id;
				userAddressDelete(id).then(res => {
					this.$api.prePage().getAddress();
					uni.showToast({
						title:"删除成功",
						success() {
							uni.navigateBack()
						}
					})
				}).catch(e => {
					
				})
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		padding-top: 1px;
		background: $page-color-base;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 150rpx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
