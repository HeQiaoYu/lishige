<template>
	<view>
		<view class="page" v-if="show">
			<view class="fui-cell-group shop">
				<view class="fui-list" v-for="(item,index) in list" >
					<view class="fui-list-media">
						<text class="icox icox-dianpu1" style="font-size:40rpx"></text>
					</view>
					<view @click="select(item)" class="fui-list-inner" >
						<view class="subtitle">{{item.storename}}</view>
						<view class="text">{{item.realname}} {{item.mobile}}</view>
						<view class="text">地址：{{item.address}}</view>
					</view>
					<view class="fui-list-angle">
						<navigator @click="phone" >
							<text class="icox icox-dianhua"></text>
						</navigator>
						<!--navigator hoverClass="none" openType="redirect" url="/pages/order/store/map?id={{item.id}}">
							<text class="icox icox-dingwei1"></text>
						</navigator-->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getstorelist} from '@/api/public';
	export default {
		data() {
			return {
				options:{},
				show:!1,
				list:[]
			}
		},
		onLoad(e){
			this.options = e;
			this.getlist();
		},
		methods: {
			phone(){},
			getlist(){
				let s  = this;
				let i  = {
					ids: s.options.ids?s.options.ids:0,
					type: s.options.type,
					merchid: s.options.merchid
				} 
				getstorelist(i).then(res => {
					s.list = res.list;
					s.show = !0;
				})
			},
			select(item){
				
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().list.carrierInfo = item;
					this.$api.prePage().list.storeInfo = item;
					uni.navigateBack();
			
			}
		}
	}
</script>

<style>
.fui-nav {
    height: 90rpx;
    background: rgba(0,0,0,0.1);
}

.image-48 {
    margin-right: 30rpx;
}

.local,.tel {
    margin: 8rpx 0;
}

.fui-header {
    background: #efefef;
    z-index: 10002;
    display: flex;
    padding: 0 15rpx;
}

.fui-header .searchbar {
    flex: 1;
    background: #fff;
    border-radius: 8rpx;
    margin-right: 15rpx;
    display: flex;
    overflow: hidden;
    align-items: center;
}

.fui-header .searchbar icon {
    height: 36rpx;
    margin: 0 10rpx;
    vertical-align: middle;
}

.fui-header .searchbar input {
    border-radius: 8rpx;
    padding: 0 10rpx;
    width: 100%;
    font-size: 30rpx;
    background: transparent;
    color: #444;
    height: 60rpx;
    line-height: 60rpx;
    border: none;
}

.shop {
    width: 100%;
    overflow: auto;
    
}

.none {
    display: none;
}

.block {
    font-size: 30rpx;
    color: #999;
}
</style>
