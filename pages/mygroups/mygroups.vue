<template>
	<view class="content">
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === item.state}"
				@click="tabClick(item.state)"
			>
				{{item.text}}
			</view>
		</view>
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view 
					class="list-scroll-content" 
					scroll-y
					@scrolltolower="loadData"
				>
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
					<!-- 黎氏阁订单列表 -->
					<view class="youhuiBox">
						<view class="yhItem myOdItem" v-for="(item,index) in tabItem.orderList" :key="index">
							<view class="odShop flexBox between">
								<view class="proXqShop-int flexBox odShop-int" @click="goShop">
									<uni-icons class="odShop-icon" type="shop"></uni-icons>
									<view class="proShop-int flexBox">
										<view class="proShop-title ellipsis-1">{{shop.shopname}}</view>
										<uni-icons type="arrowright"></uni-icons>
									</view>
								</view>
								<view class="proXqShop-jt" :id="item.id" @click="goOdInfo">
									<text class="proXqShop-tit">{{item.statusstr}}</text>
								</view>
							</view>
							<view  :id="item.id"  class="indProItem uni-media-list odProItem"  @click="goOdInfo">
								<view class="indProIt-image odProIt-image">
									<image :src="item.thumb"></image>
								</view>
								<view class="indProIt-int uni-media-list-body">
									<view class="">
										<view class="indPro-tit ellipsis-2">{{item.title}}</view>
										<view class="indProDbKuai flexBox between">
											<view class="indPro-money">
												<text>{{goods.specs}}</text>
											</view>
										</view>
									</view>
									<view class="indPro-dibu clear">
										<view class="indPro-money fr">
											<text class="indProPri"><text class="indProPriSml">￥</text>{{goods.price}}</text>
										</view>
									</view>
								</view>
							</view>
							<view class="myGdTaskInt-record odItem-cd">
								<text>已出单</text>
							</view>
							<view class="odItem-cd">
								<text>共计1件商品，合计：￥{{item.price}}</text>
							</view>
							<view class="action-box b-t" v-if="item.status == '0'">
								<button class="action-btn" @click="cancelOrder(item)">取消订单</button>
								<button class="action-btn recom">{{item.nextstatus}}</button>
							</view>
							<view class="odItem-caozuo flexBox" v-if="item.status == '3'">
								<button class="odItBtn">查看物流</button>
								<button class="odItBtn signBtn-orangeBorder">{{item.nextstatus}}</button>
							</view>
						</view>
					</view>
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
					
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '组团中',
						loadingType: 'more',
						orderList: [],
						page:1
					},
					{
						state: 1,
						text: '组团成功',
						loadingType: 'more',
						orderList: [],
						page:1
						
					},
					{
						state: -1,
						text: '组团失败',
						loadingType: 'more',
						orderList: [],
						page:1
					}
				],
				list:{}
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
