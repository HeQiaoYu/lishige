<template>
    <view>
        <view class="ptType">
			<view class="ptTypeItem" v-for="(item,index) in category" :class="current==index?'cur':''" @click="onClickItem(index)">
				{{item.name}}<text></text>
			</view>
		</view>
		<block v-for="(item,index) in category">
			<view class="indProList ptList" v-if="current==index">
				<view class="indProItem uni-media-list ptLiItem" v-for="(goods,key) in item.goodslist" :key="key" :id="goods.id" @click="goPtInfo">
					<view class="indProIt-image">
						<image :src="goods.thumb"></image>
					</view>
					<view class="indProIt-int uni-media-list-body">
						<view class="indPro-tit ellipsis-2">{{goods.title}}</view>
						<view class="indPro-dibu">
							<view class="indProDbKuai flexBox between">
								<view class="indPro-money">
									<text class="indProPri"><text class="indProPriSml">{{goods.is_ladder==1?'阶梯团':goods.groupnum+'人团'}} ￥</text>{{goods.groupsprice}}</text>
									<text class="indProProOld">￥{{goods.price}}</text>
								</view>
							</view>
							<view class="indProDbKuai flexBox between">
								<view class="indPro-money">
									<text>{{sysset.shopname}}</text>
									<text class="indPro-blackText">进店&gt;</text>
								</view>
								<button class="ptItem-btn buy-now-btn" type="default" hover-class="none">马上拼</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>
<script>
	import {getGroups, getGroupsCate} from '@/api/public';
    export default {
        data() {
            return {
				current: 0,
				category: [
					
				],
				pintuanList:[{},{},{}],
				sysset:{}
            }
        },
        onLoad() {
            this.getGroupsCategory();
        },
		onShow(){
			
		},
        methods: {
			getGroupsCategory(){
				let that = this;
				getGroups().then(data => {
					
	
					let categoryList = data.category.map( (res) => {
						res.goodslist = [];
						res.page = 1;
						return res;
					})
					that.category = categoryList;
					that.sysset = data.sysset;
					that.getList();
				})
			},
			getList(){
				let that = this;
				let cate = that.category[that.current];
				getGroupsCate(cate.page,cate.id).then(data => {
					
					cate.goodslist = data.list;
				})
			},
			onClickItem(e) {
			
				this.current = e,
			
				this.getList();
			},
            goPtInfo(e){
				let id = e.currentTarget.id;
				uni.navigateTo({
					url: '/pages/product/product-pintuan?id='+id,
				});
			}
        }
    }
</script>

<style>
   
</style>
