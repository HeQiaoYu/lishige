<template>
	<view>
		<view class="indProList myCollectList">
			<view class="indProItem uni-media-list" v-for="(item,key) in myCollect" :key="key" @click="navToDetailPage">
				<view class="indProIt-image">
					<image :src="item.thumb"></image>
				</view>
				<view class="indProIt-int uni-media-list-body">
					<view class="indPro-tit ellipsis-2">{{item.title}}</view>
					<view class="indPro-dibu">
						<view class="indProDbKuai flexBox between">
							<view class="indPro-money">
								<text class="indProPri"><text class="indProPriSml">￥</text>{{item.marketprice}}</text>
								<text class="indProProOld">￥{{item.productprice}}</text>
							</view>
						</view>
						<view class="indProDbKuai flexBox between">
							<view class="indPro-money">
								<text>{{item.merchname}}</text>
								<text class="indPro-blackText">进店&gt;</text>
							</view>
							<view class="indPro-money">
								<text>已售{{item.sales}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {userfavorite} from "@/api/user";
	export default {
		data() {
			return {
				page: 1,
				myCollect:[]
			}
		},
		onLoad() {
			this.getlist();
		},
		methods: {
			getlist (){
				userfavorite(this.page).then(res => {
					this.myCollect = this.myCollect.concat(res.list);
					
				}).catch(res => {
					
				})
			}
		}
	}
</script>

<style>
	page { background-color: #fff;}
</style>
