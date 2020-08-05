<template>
	<view>
		<!-- 优惠券弹窗 -->
		<view class="popup spec" :class="yhqClass">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content">
				<view class="yhqAlt-tit">当前优惠</view>
				<view class="yhqAlt-quan">
					<view class="yhqAltItem flexBox between">
						<view class="yhqAltIt-price"><text>￥</text>50</view>
						<view class="yhqAltIt-int">
							<text class="textOrange">满999使用</text>
							<text>店铺优惠券</text>
							<text>2020.02.28-2020.03.28</text>
						</view>
						<view class="yhqAltIt-btn">立即领取</view>
						<view class="yhqAltIt-icon"><image :src="'../static/img/yilingqu@2x.png'" mode=""></image></view>
					</view>
					<view class="yhqAltItem flexBox between cur">
						<view class="yhqAltIt-price"><text>￥</text>50</view>
						<view class="yhqAltIt-int">
							<text class="textOrange">满999使用</text>
							<text>店铺优惠券</text>
							<text>2020.02.28-2020.03.28</text>
						</view>
						<view class="yhqAltIt-btn">立即领取</view>
						<view class="yhqAltIt-icon"><image :src="'../static/img/yilingqu@2x.png'" mode=""></image></view>
					</view>
				</view>
				<view class="proYh flexBox">
					<view class="proYh-tip">金币</view>
					购买可得39金币
				</view>
				<button class="yhqAlt-btn" @click="toggleYhq">关闭</button>
			</view>
		</view>
		<view class="proXqKuai flexBox between" style="margin-top: 0;border-top: 1px solid #F2F2F2;">
			<view class="proXqShop-int flexBoxNormal">
				<view class="proShop-tx"><image :src="merch.logo" mode=""></image></view>
				<view class="proShop-int">
					<view class="proShop-title ellipsis-1">{{merch.shopname}}</view>
					<view class="proShop-number clear">
						<view class="proShopTel flexBox fl">
							<text class="uni-icon uni-icon-phone-filled"></text>
							{{merch.tel}}
						</view>
						<view class="proShopTel flexBox fl">
							<text class="uni-icon uni-icon-phone-filled"></text>
							{{merch.saletime}}
						</view>
						<view class="proShopTel flexBox fl">
							<text class="uni-icon uni-icon-location-filled"></text>
							{{merch.address}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--view class="proXqKuai flexBox between" @click="toggleYhq">
			<view class="proXq-fanxian">
				<view class="proYh flexBox">
					<view class="proYh-tip">返现</view>
					店铺内拼满98元返5元
				</view>
				<view class="proYh flexBox">
					<view class="proYh-tip">领券</view>
					<text>满64元减5元</text>
				</view>
			</view>
			<text class="yticon icon-you"></text>
		</view-->
		<view class="shopXq-product">
			<view class="showXq-headder">全部商品</view>
			<view class="showXq-type flexBox around">
				<text :class="filterIndex == 0 ?'textOrange':''" @click="orderby(0)">默认</text>
				<text :class="filterIndex == 1 ?'textOrange':''" @click="orderby(1)">销量</text>
				<text :class="filterIndex == 2 ?'textOrange':''" @click="orderby(2)">新品</text>
			</view>
			<view class="indProList">
				<view class="indProItem uni-media-list" v-for="(item,key) in indTuijianList" :key="key"  @click="navToDetailPage(item.id)">
					<view class="indProIt-image">
						<image :src="item.thumb"></image>
					</view>
					<view class="indProIt-int uni-media-list-body">
						<view class="indPro-tit ellipsis-2">{{item.title}}</view>
						<view class="indPro-dibu">
							<view class="indProDbKuai flexBox between">
							</view>
							<view class="indProDbKuai flexBox between">
								<view class="indPro-money">
									<text class="indProPri"><text class="indProPriSml">￥</text>{{item.minprice}}</text>
									<text class="indProProOld">￥{{item.minprice}}</text>
								</view>
								<view class="indPro-money">
									<text>已售{{item.sales}}件</text>
								</view>
							</view>
						</view>
					</view>	
				</view>
				<uni-load-more :status="loadingType"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import {getGoodslist} from "@/api/public";
	export default {
		data() {
			return {
				yhqClass: 'none',
				indTuijianList:[],
				id:0,
				page:0,
				merch:{},
				show: !1,
				filterIndex:0,
				loadingType: 'more', //加载更多状态
				isnew:0,
				by:true,
				order:''
			}
		},
		onLoad(options) {
			this.id = options.id; 
			this.loadData();
		},
		//下拉刷新
		onPullDownRefresh(){
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		methods: {
			loadData(type='add', loading) {
				let that = this;
				if(type === 'add'){
					if(that.loadingType === 'nomore'){
						return;
					}
					that.loadingType = 'loading';
					that.page++;
				}else{
					that.loadingType = 'more'
				}
				if(type === 'refresh'){
					that.indTuijianList = [];
					that.page = 1;
				}
				getGoodslist({
					merchid: this.id,
					page: this.page,
					isnew: this.isnew,
					by: this.by == 1? 'desc' :'asc',
					order: this.order
				}).then(res => {
					this.loadingType  = res.list.length > 10 ? 'nomore' : 'more';
					
					this.indTuijianList = this.indTuijianList.concat(res.list);
					this.merch = res.merch;
					this.show = !0;
				})
				if(type === 'refresh'){
					if(loading == 1){
						uni.hideLoading()
					}else{
						uni.stopPullDownRefresh();
					}
				}
			},
			//优惠券弹窗开关
			toggleYhq() {
				if(this.yhqClass === 'show'){
					this.yhqClass = 'hide';
					setTimeout(() => {
						this.yhqClass = 'none';
					}, 250);
				}else if(this.yhqClass === 'none'){
					this.yhqClass = 'show';
				}
			},
			orderby(index) {
				if(this.filterIndex === index){
					this.by = !this.by;
					return;
				}
				this.filterIndex = index;
				if(index == 2){
					this.isnew = 1;
				}else{
					this.isnew = 0;
				}
				this.order = index == 0 ? '' : index == 1 ? 'sales' :'';
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},
			navToDetailPage(id) {

				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			confirm(){
				
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background: #F2F2F2;
		min-height: 0;
	}
	/*  弹出层 */
	.attr-content{
		padding: 10upx 30upx;
	}
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
			.btn{
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
	
	
</style>
