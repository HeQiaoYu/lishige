<template>
	<view v-show="show">
		<view class="ptType bkmsType buy-now-btn" v-if="goods_error==0">
			<block v-for="(time,index) in times" :key="time" >
				<view class="ptTypeItem bkmsTyItem" :class="current==index?'cur':''" @click="onClickItem(time.id,index)">
					<view class="bkmsTyIt-title">{{time.time}}:00</view>
					<view class="bkmsTyIt-state"><block v-if="time.status == 0">进行中</block><block v-else-if="time.status===1">即将开始</block><block v-else>已结束</block></view>
				</view>
			</block>
		</view>
		<block v-for="(time,index) in times" >
		<view class="indProList" v-if="current==index">
			<view class="indProItem uni-media-list" v-for="(goods_item,key) in goods" :key="key" @click="goMsInfo(goods_item.goodsid)">
				<view class="indProIt-image">
					<image :src="goods_item.thumb"></image>
				</view>
				<view class="indProIt-int uni-media-list-body">
					<view class="indPro-tit ellipsis-2">{{goods_item.title}}</view>
					<view class="indPro-dibu">
						<view class="indProDbKuai flexBox between">
							<view class="indPro-money">
								<text class="indProPri"><text class="indProPriSml">￥</text>{{goods_item.marketprice}}</text>
								<text class="indProProOld">￥{{goods_item.price}}</text>
							</view>
							<block v-if="time.status == 1">
								<button class="ptItem-btn buy-now-btn" type="default" hover-class="none">等待抢购</button>
							</block>
							<block v-else-if="goods_item.percent >= 100">
								<button class="ptItem-btn buy-now-btn" type="default" hover-class="none">已抢空</button>
							</block>
							<block v-else>
								<button class="ptItem-btn buy-now-btn" type="default" hover-class="none">立即抢购</button>
							</block>
						</view>
						<view class="indProDbKuai flexBox between">
							<view class="indPro-money">
								<text>{{goods_item.shopdetail.shopname}}</text>
								<text class="indPro-blackText">进店&gt;</text>
							</view>
							<view class="kjItem-progress flexBox bkmsProgress">
								<progress :percent="goods_item.percent" show-info backgroundColor="#FFAB91" activeColor="#FF5722" active="true"/>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		</block>
		
	</view>
</template>

<script>
	import {getSeckill,getSeckillgoods} from "@/api/public";
	export default {
		data() {
			return {
				audios: {},
				audiosObj: {},
				roomid: "0",
				timeindex: "0",
				taskid: "0",
				timeid: "0",
				timer: 0,
				goods: "",
				rooms: "",
				room_num: 0,
				times: "",
				time_num: 0,
				advs: "",
				adv_num: 0,
				list_error: 0,
				goods_error: 0,
				message: "",
				lasttime: 0,
				hour: "-",
				min: "-",
				sec: "-",
				diypages: "",
				seckill_style: "",
				seckill_color: "",
				color: {
					red: "#ff5555",
					blue: "#4e87ee",
					purple: "#a839fa",
					orange: "#ff8c1e",
					pink: "#ff7e95"
				},
				swiperheight: "",
				list: [],
				current: 0,
				indTuijianList:[{},{},{}],
				show:!1
			}
		},
		onLoad(){
			this.onload();
		},
		methods: {
			onClickItem(id,e) {
				this.getGoods(id)
				this.current = e
			},
			onload(){
				getSeckill({}).then(e => {
				
					this.show = !0;
					this.rooms = e.rooms,
					this.room_num = e.rooms.length,
					this.times = e.times;
					this.time_num = e.times.length;
					this.timeindex=  e.timeindex,
					this.roomid = e.roomid,
					this.taskid = e.taskid,
					this.timeid = e.timeid,
					this.seckill_style = e.seckill_style,
					this.seckill_color = e.seckill_color,
					this.background_color = e.diypages.background_color;
					this.getGoods(e.timeid);
				}).catch(e => {
					uni.navigateBack();
				})
			},
			getGoods(t){
				let a = this;
				getSeckillgoods({
					taskid: a.taskid,
					roomid: a.roomid,
					timeid: t
				}).then(res => {
					this.goods_error = 0
					this.goods = res.goods;
				}).catch(res=> {
					this.goods_error = 1
				})
			},
			goMsInfo(id) {
				uni.navigateTo({
					url: '/pages/product/product-miaosha?id='+id,
				});
			}
		}
	}
</script>

<style>

</style>
