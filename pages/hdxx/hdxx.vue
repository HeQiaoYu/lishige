<template>
	<view>
		<view class="hdxxList">
			<view class="hdxxItem" v-for="(item,key) in hdxxList" :key="key" @click="goHdxxInfo">
				<view class="hdxxIt-image"><image :src="url+'static/img/shq_pic.png'" mode=""></image></view>
				<view class="hdxxIt-int">
					<view class="hdxxInt-tit ellipsis-1">2020最流行的这几样办公家具</view>
					<view class="hdxxInt-p ellipsis-2">
						一款简约设计的，可以组合的，有2-6人位可以自由调整，适合空间比较大的写字楼使用，多款可以选择，今天都流行一款简约设计的，可以组合的，有2-6人位可以自由调整，适合空间比较大的写字楼使用，多款可以选择
					</view>
					<view class="hdxxInt-date">2020/02/23 08:57</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hdxxList:[{},{},{}]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page { background-color: #F2F2F2;}
</style>
