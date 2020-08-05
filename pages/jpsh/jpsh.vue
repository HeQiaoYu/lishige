<template>
	<view>
		<view class="proXqKuai flexBox between" @click="goShop">
			<view class="proXqShop-int flexBox">
				<view class="proShop-tx"><image :src="url+'static/img/indProductImg1.jpg'" mode=""></image></view>
				<view class="proShop-int">
					<view class="proShop-title ellipsis-1">热风官方旗舰店</view>
					<view class="proShop-number clear">
						<view class="proShopTel flexBox fl">
							居家生活
						</view>
					</view>
				</view>
			</view>
			<view class="proXqShop-jt">
				<text class="proXqShop-tit">进入店铺</text>
				<text class="yticon icon-you"></text>
			</view>
		</view>
		<view class="proXqKuai flexBox between" @click="goShop">
			<view class="proXqShop-int flexBox">
				<view class="proShop-tx"><image :src="url+'static/img/indProductImg1.jpg'" mode=""></image></view>
				<view class="proShop-int">
					<view class="proShop-title ellipsis-1">热风官方旗舰店</view>
					<view class="proShop-number clear">
						<view class="proShopTel flexBox fl">
							居家生活
						</view>
					</view>
				</view>
			</view>
			<view class="proXqShop-jt">
				<text class="proXqShop-tit">进入店铺</text>
				<text class="yticon icon-you"></text>
			</view>
		</view>
		<view class="proXqKuai flexBox between" @click="goShop">
			<view class="proXqShop-int flexBox">
				<view class="proShop-tx"><image :src="url+'static/img/indProductImg1.jpg'" mode=""></image></view>
				<view class="proShop-int">
					<view class="proShop-title ellipsis-1">热风官方旗舰店</view>
					<view class="proShop-number clear">
						<view class="proShopTel flexBox fl">
							居家生活
						</view>
					</view>
				</view>
			</view>
			<view class="proXqShop-jt">
				<text class="proXqShop-tit">进入店铺</text>
				<text class="yticon icon-you"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goShop() {
				uni.navigateTo({
					url: `/pages/shop/shop`
				})
			},
		}
	}
</script>

<style>
	page { background-color: #fff;}
	.proXqKuai { margin: 0;border-top: 1px solid #F2F2F2;}
	.proXqShop-int { padding: 30rpx 0;}
</style>
