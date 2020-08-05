<template>
	<view>
		<view class="myMoneyTotal buy-now-btn">
			余额<text>0.00元</text>
		</view>
		<view class="myMoneyBox">
			<form>
			<view class="myMoney-guige clear">
				
				<view class="myMonGgItem fl flexBox jusCenter" :class="current==0?'cur':''" @click="onClickItem(0)">
					<view>
						<text>100元</text>
						售价96元
					</view>
				</view>
				<view class="myMonGgItem fl flexBox jusCenter" :class="current==1?'cur':''" @click="onClickItem(1)">
					<view>
						<text>200元</text>
						售价192元
					</view>
				</view>
				<view class="myMonGgItem fl flexBox jusCenter" :class="current==2?'cur':''" @click="onClickItem(2)">
					<view>
						<text>300元</text>
						售价288元
					</view>
				</view>
				<view class="myMonGgItem fl flexBox jusCenter" :class="current==3?'cur':''" @click="onClickItem(3)">
					<view>
						<text>500元</text>
						售价478元
					</view>
				</view>
				<view class="myMonGgItem fl flexBox jusCenter" :class="current==4?'cur':''" @click="onClickItem(4)">
					<view>
						<text>1000元</text>
						售价950元
					</view>
				</view>
				<view class="myMonGgItem fl flexBox jusCenter" :class="current==5?'cur':''" @click="onClickItem(5)">
					<input type="text" value="" placeholder="自定义" placeholder-style="color:#ff5722" />
				</view>
			</view>
			<button type="default" class="myMoneyGoBtn yhqAlt-btn buy-now-btn">立即充值</button>
			<navigator class="czjl" hover-class="none" url="/pages/moneyRecord/moneyRecord">充值记录</navigator>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
			}
		},
		methods: {
			onClickItem(e) {
				this.current = e
			},
			onNavigationBarButtonTap(e) {
				uni.navigateTo({
					url: '/pages/moneyRecord/moneyRecord'
				});
			}
		}
	}
</script>

<style>
	page { background-color: #F2F2F2;}
</style>
