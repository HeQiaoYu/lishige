<template>
	<view class="container">
		<block v-for="(item,key) in diypages.items">
			<uni-search-bar v-if="item.id == 'search'" :placeholder="item.params.placeholder" bgColor="#F2F2F2" @confirm="search" cancelButton="none" class="indSearchInput"/>
			<swiper v-if="item.id == 'banner'" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="indBanner">
				<swiper-item v-for="(v,k) in item.data">
					<view class="swiper-item"><image :src="v.imgurl" mode=""></image></view>
				</swiper-item>
			</swiper>
			<view class="indServeList clear" v-if="item.id == 'menu'">
		
				<view class="indSerItem fl" v-for="(v,k) in item.data" :key="k" >
					<!-- #ifdef MP-WEIXIN --> 
					<navigator hover-class="none" :url="v.linkurl" v-if="v.text!='餐饮美食'&&v.text!='物业服务'">
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<navigator hover-class="none" :url="v.linkurl">
					<!-- #endif -->
						<view class="indSer-icon"><image :src="v.imgurl" mode=""></image></view>
						<view class="indSer-name">{{v.text}}</view>
					</navigator>
				</view>
			</view>
			<view class="indYhBanner" v-if="item.id == 'picture'">
				<navigator :url="v.linkurl" hover-class="none"  v-for="(v,k) in item.data" :key="k">
					<image :src="v.imgurl" mode=""></image>
				</navigator>
			</view>
				<view class="indBkmsBox" v-if="item.id  == 'goods'">
					<navigator url="/pages/bkms/bkms" class="indBkms fl" hover-class="none">
						<view class="indBkmsHeader flexBox">
							<view class="indBkmsHea-tit">爆款秒杀</view>
							<view class="indBkmsHea-line"></view>
							<view class="indBkmsHea-time">16点场</view>
						</view>
						<view class="lsgDjs flexBox">
							<uni-countdown :show-day="false" :hour="2" :minute="21" :second="24" color="#FFFFFF" background-color="#333"/>后结束
						</view>
						<view class="indBkms-xsqg fl">限时抢购</view>
						<view class="indBkms-image fr"><image :src="url+'attachment/images/ewei_shop/static/img/indBkms_img1.jpg'" mode=""></image></view>
						<view class="clear"></view>
					</navigator>
					<navigator class="indJphd fl" hover-class="none">
						<view class="indJphd-tit">金牌好店</view>
						<view class="indJphd-p">品质新生活</view>
						<view class="indJphd-image"><image :src="url+'attachment/images/ewei_shop/static/img/indBkms_img2.jpg'" mode=""></image></view>
					</navigator>
					<navigator class="indJphd fl" hover-class="none">
						<view class="indJphd-tit indTjspTitle">特价商品</view>
						<view class="indJphd-p">便宜好用物</view>
						<view class="indJphd-image"><image :src="url+'attachment/images/ewei_shop/static/img/indBkms_img3.jpg'" mode=""></image></view>
					</navigator>
					<view class="clear"></view>
				</view>
				<view class="indTitle" v-if="item.id  == 'goods'">
					<view class="indTit-hea flexBox jusCenter">
						<view class="indTit-line flexBox">
							<text class="indTitLine-oranges"></text>
							<text></text>
						</view>
						<view class="indTit-name">为你推荐</view>
						<view class="indTit-line flexBox">
							<text></text>
							<text class="indTitLine-oranges"></text>
						</view>
					</view>
					<view class="indTit-p">爆款商品 亲情推荐</view>
				</view>
				<view class="indProList" v-if="item.id  == 'goods'">
					<view class="indProItem uni-media-list" v-for="(v,k) in item.data" :key="k" :id="v.gid" @click="navToDetailPage">
						<view class="indProIt-image">
							<image :src="v.thumb"></image>
						</view>
						<view class="indProIt-int uni-media-list-body">
							<view class="indPro-tit ellipsis-2">{{v.title}}</view>
							<view class="indPro-dibu">
								<view class="indProDbKuai flexBox between">
									<view class="indPro-money">
										<text class="indProPri"><text class="indProPriSml">￥</text>{{v.price}}</text>
										<text class="indProProOld">￥{{v.productprice}}</text>
									</view>
									<view class="indPro-gwc" @click="joinGwc"><image :src="url+'attachment/images/static/img/icon_gwcOrange.png'" mode=""></image></view>
								</view>
								<view class="indProDbKuai flexBox between">
									<view class="indPro-money">
										<text>{{v.merchname}}</text>
										<text class="indPro-blackText">进店&gt;</text>
									</view>
									<view class="indPro-money">
										<text>已售{{v.sales}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</block>
		<!-- #ifndef MP-WEIXIN -->
		<view class="indTitle">
			<view class="indTit-hea flexBox jusCenter">
				<view class="indTit-line flexBox">
					<text class="indTitLine-blues"></text>
					<text class="indTitLine-blue"></text>
				</view>
				<view class="indTit-name indTit-name-blue">生活圈</view>
				<view class="indTit-line flexBox">
					<text class="indTitLine-blue"></text>
					<text class="indTitLine-blues"></text>
				</view>
			</view>
			<view class="indTit-p">你要的生活小妙招都在这里</view>
		</view>
		<view class="indProList">
			<view class="indProItem uni-media-list" v-for="(item,key) in indShqList" :key="key" @click="navToDetailPage">
				<view class="indProIt-image">
					<image :src="url+'attachment/images/ewei_shop/static/img/indProductImg2.jpg'"></image>
				</view>
				<view class="indProIt-int uni-media-list-body">
					<view class="indPro-tit ellipsis-2">糖尿病的人最适合吃哪些食物，越吃血糖越稳。</view>
					<view class="indPro-dibu">
						<view class="indProDbKuai flexBox between">
							<view class="indPro-money">
								<text>张小虎</text>
								<text>2019.05.10</text>
							</view>
							<view class="indPro-money">
								<text class="indPro-blackText">查看详情&gt;</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<!-- 隐私协议 -->
		<uni-popup ref="showtip" :type="type" :mask-click="false">
			<view class="uni-tip">
				<image src="../../static/img/xieyi.png" mode="widthFix"></image>
				<text class="uni-tip-title">用户协议和隐私条款</text>
				<text class="uni-tip-content">
					感谢您的下载！当您开始使用本软件时，我们可能会对您的部分个人信息进行收集、使用、共享和保护。为了让您更好地了解我们对您的信息使用和保护，请认准阅读
					<text class="xieyi-index"><a href="http://h5.ilishige.com/user_policy.html">《用户协议》</a></text>及<text class="xieyi-index"><a href="http://h5.ilishige.com/privacy_policy.html">《隐私条款》</a></text>全部条款。</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel('0')">不同意</text>
					<text style="opacity: 0;color: #fff;">112</text>
					<text class="uni-tip-button xieyi-index-btn" @click="cancel('1')">同意</text>
				</view>
			</view>
		</uni-popup>
		<!-- #endif -->
	</view>
</template>

<script>
	import { getHomeData,getGroupsCate } from "@/api/public";
	export default {

		data() {
			return {
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: [],
				indServeList:[

				],
				indTuijianList:[{},{},{}],
				indShqList:[{},{},{}],
				diypages:[],
				url:this.url
			};
		},
		// #ifndef MP-WEIXIN 
		onShow() {
			var xieyi = uni.getStorageSync('xieyi');
			if(xieyi<1){
				this.type = 'center'
				this.$nextTick(() => {
					this.$refs['showtip'].open()
				})
				uni.hideTabBar()
			}
		},
		// #endif
		onLoad() {
			this.loadData();
			this.getHomeData();
			console.log(this.url)
		},
		methods: {
			// #ifndef MP-WEIXIN 
			// 协议跳转
			clickXY(e,i){
				uni.navigateTo({
					
				});
			},
			// 同意协议
			cancel(e){
				if(e==1){
					this.$refs['showtip'].close()
					uni.setStorageSync("xieyi", 1);
					uni.showTabBar()
				}else{
					uni.hideTabBar()
					
					
					
					plus.runtime.quit();  
					
					// const threadClass = plus.ios.importClass("NSThread");
					// const mainThread = plus.ios.invoke(threadClass, "mainThread");
					// plus.ios.invoke(mainThread, "exit");
					//上面的不行就用下面的
					//plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
				}
			},
			// 协议结束
			// #endif
			search(){
				
			},
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			async loadData() {
				let carouselList = await this.$api.json('carouselList');
				this.titleNViewBackground = carouselList[0].background;
				this.swiperLength = carouselList.length;
				this.carouselList = carouselList;
				let goodsList = await this.$api.json('goodsList');
				this.goodsList = goodsList || [];
			},
			/**
			 * 获取首页所有信息
			 */
			getHomeData(){
				let that = this;
				getHomeData().then(ondata => {
					if (0 == ondata.error) {
						var e = [];
						for (var i in ondata.diypage.items) e.push(ondata.diypage.items[i]);
						var s = new Object();
						for (var r in e) s[r] = e[r], "topmenu" == e[r].id && (e[r].status = n);
						ondata.diypage.items = s,that.$set(that, "diypages", ondata.diypage);
					}
				}).catch(res => {
					console.log(res)
				})
			},
			joinGwc(e){
				
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].background;
			},
			//详情页
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.currentTarget.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
		},
	}
</script>

<style lang="scss">
	.xieyi-index{
		color: #df0104!important;
	}
	.uni-tip-button{
		height: 80rpx;
		line-height: 80rpx;
		width: 40%;
		border-radius: 100rpx;
		border: 1rpx solid #EAEAEA;
		color: #999999!important;
	}
	.xieyi-index-btn{
		background-color: #df0104!important;
		color: #fff!important;
		border: 1rpx solid #df0104;
	}
	/* 提示窗口 */
		.uni-tip {
			/* #ifndef APP-NVUE */
			display: flex;
			flex-direction: column;
			/* #endif */
			padding: 15px;
			width: 300px;
			background-color: #fff;
			border-radius: 10px;
		}
	
		.uni-tip-title {
			margin-bottom: 10px;
			text-align: center;
			font-weight: bold;
			font-size: 16px;
			color: #333;
		}
	
		.uni-tip-content {
			font-size: 14px;
			color: #666;
		}
	
		.uni-tip-group-button {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			margin-top: 20px;
		}
	
		.uni-tip-button {
			flex: 1;
			text-align: center;
			font-size: 14px;
			color: #3b4144;
		}
		
		// 用户协议
		.uni-tip image{
			width: 50%;
			margin: 40rpx auto;
		}
	page{
		.carousel-section{
			padding: 0;
			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}
			.carousel{
				.carousel-item{
					padding: 0;
				}
			}
			.swiper-dots{
				left:45upx;
				bottom:40upx;
			}
		}
	}
	
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
	}
	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
		}
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-color: rgba(0,0,0,.5);
		border-radius: 100rpx;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	

</style>
