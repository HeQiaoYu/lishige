<template>
	<view>
		<view class="moneyRecordList">
			<view class="monRecItem flexBox between" v-for="(item,key) in recordList" :key="key">
				<view class="monRec-name">
					<text>在线支付</text>
					余额：0.00
				</view>
				<view class="monRec-num">
					<text>-20.00</text>
					2020-02-12
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordList:[{},{},{},{},{},{},{}]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page { background-color: #fff;}
</style>
