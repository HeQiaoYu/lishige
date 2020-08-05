<template>
	<view>
		<view class="kjTitle">正在进行</view>

		<block v-if="list">
			<block v-for="(item, index) in list"> 
				<view class="indProList ptList" :style="index==0 ? 'margin-top: -20rpx;' : 'margin-top: 20rpx;'">
					<view class="indProItem uni-media-list ptLiItem" @click="goKjInfo(item.id)">
						<view class="indProIt-image">
							<image :src="item.thumb"></image>
						</view>
						<view class="indProIt-int uni-media-list-body">
							<view class="indPro-tit ellipsis-2">{{item.title}}</view>
							<!--view class="kjItem-price">已砍<text class="textOrange">289.23</text>元，还差<text class="textOrange">22.18</text>元</view>
							<view class="kjItem-progress flexBox">
								<progress percent="92%" show-info backgroundColor="#FFAB91" activeColor="#FF5722" />
							</view-->
							<view class="indPro-dibu">
								<view class="indProDbKuai flexBox between">
							
									<view class="lsgDjs flexBox">
										<uni-countdown :day="item.losertimer['day']" :hour="item.losertimer.hour" :minute="item.losertimer.minute" :second="item.losertimer.second" color="#FFFFFF" background-color="#333"/>后结束
									</view>
									<button class="ptItem-btn buy-now-btn" type="default" hover-class="none">免费拿</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</block>
	</view>
</template>

<script>
	import {bargainList} from '@/api/public';
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			loadData() {
				let that = this;
				bargainList().then((res) => {
					console.log(res);
					 for(let key  in res.list){
					       	res.list[key]['losertimer'] = that.getRemainderTime(res.list[key]['end_time']);;
					  }
					
			
					that.list = res.list;
					
				})
			},
			goKjInfo(id) {
				uni.navigateTo({
					url: '/pages/product/product-kanjia?id=' + id,
				});
			},
			getRemainderTime (startTime){
			    var s1 = new Date(startTime.replace(/-/g, "/")),
			    s2 = new Date(),
			    runTime = parseInt((s1.getTime() - s2.getTime()) / 1000);
			    var year = Math.floor(runTime / 86400 / 365);
			    runTime = runTime % (86400 * 365);
			    var month = Math.floor(runTime / 86400 / 30);
			    runTime = runTime % (86400 * 30);
			    var day = Math.floor(runTime / 86400);
			    runTime = runTime % 86400;
			    var hour = Math.floor(runTime / 3600);
			    runTime = runTime % 3600;
			    var minute = Math.floor(runTime / 60);
			    runTime = runTime % 60;
			    var second = runTime;
		
				let arr = {
					year : year,
					month : month,
					day : day,
					hour : hour,
					minute : minute,
					second : second
				};
				
	
			　　return arr;
			 
			}
		}
	}
</script>

<style>
	page { background-color: #F2F2F2;}
</style>
