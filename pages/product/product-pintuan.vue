<template>
	<view class="container">
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<swiper class="carousel" circular duration="400" @change="swiperChange">
				<swiper-item class="carousel-item" v-for="(item,index) in goodsInfo.thumb_url" :key="index" >
					<image :src="item" class="loaded" mode="aspectFill"/>
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">{{swiperCurrent+1}}/{{swiperLength}}</view>
		</view>
		<view class="introduce-section">
			<text class="title fl">{{goodsInfo.title}}{{goodsInfo.description}}</text>
			<view class="proXq-share flexBox fr">
				<view class="proShareItem" :class="{active: favorite}" @click="toFavorite">
					<uni-icons type="star"></uni-icons>收藏
				</view>
				<view class="proShareItem" @click="share">
					<uni-icons type="upload"></uni-icons>分享
				</view>
			</view>
			<view class="clear"></view>
			<view class="price-box fl">
				<text class="price-tip">¥</text>
				<text class="price">{{goodsInfo.groupsprice}}</text>
				<text class="price-tip">起</text>
				<text class="m-price">¥{{goodsInfo.price}}</text>
			</view>
			<view class="proXq-yishou fr">
				已有{{goodsInfo.fightnum}}人参团，销量{{goodsInfo.sales}}件
			</view>
			<view class="clear"></view>
		</view>
		<view class="proXqKuai" v-if="teams.length>0">
			<view class="d-header">
				<text style="padding: 0;">{{teams.length}}人在拼单，可直接参与</text>
			</view>
			<view class="ptXqItem flexBox between" v-for="(item,index) in teams">
				<block  v-if="item.residualtime>0">
					<view class="proXqShop-int ptXq-int flexBox">
						<view class="proShop-tx ptXq-tx"><image :src="item.avatar" mode=""></image></view>
						<view class="proShop-int">
							<view class="proShop-title ellipsis-1">{{item.realname?item.realname:item.nickname}}</view>
						</view>
					</view>
					<view class="proXqShop-jt flexBox">
						<view class="ptXq-people">
							<view class="ptDjs flexBox">还差{{item.num}}人拼成</view>
							<view class="ptDjs flexBox">
								剩余
								<uni-countdown :show-day="false" :hour="item.hour" :minute="item.minite" :second="item.second" />
							</view>
						</view>
						<button class="ptItem-btn buy-now-btn" type="default" @click="gototeam(item.id)" hover-class="none">去拼单</button>
					</view>
				</block>
			</view>
		</view>
		<view class="proXqKuai flexBox between" @click="ptgz">
			<view class="proXqShop-int flexBox">
				<view class="proShop-int">
					<view class="proShop-title ellipsis-1">拼团规则</view>
				</view>
			</view>
			<view class="proXqShop-jt">
				<text class="proXqShop-tit">查看</text>
				<text class="yticon icon-you"></text>
			</view>
		</view>
		<view class="proXqKuai flexBox between" @click="goShop(shop.id)">
			<view class="proXqShop-int flexBox">
				<view class="proShop-tx"><image :src="shop.logo" mode=""></image></view>
				<view class="proShop-int">
					<view class="proShop-title ellipsis-1">{{shop.shopname}}</view>
					<view class="proShop-number clear">
						<view class="proShopTel flexBox fl" v-if="shop.mobile">
							<text class="uni-icon uni-icon-phone-filled">{{shop.mobile}}</text>
							
						</view>
						
					</view>
				</view>
			</view>
			<view class="proXqShop-jt">
				<text class="proXqShop-tit">进入店铺</text>
				<text class="yticon icon-you"></text>
			</view>
		</view>

		<view class="detail-desc">
			<view class="d-header">
				<text>商品详情</text>
			</view>
			<rich-text :nodes="goodsInfo.description"></rich-text>
		</view>
		
		<!-- 底部操作菜单 -->
		<view class="pageBottomDiy flexBox between">
			<view class="flexBox">
				<navigator url="../shop/shop" class="p-b-btn pageBtnOrange" hover-class="none">
					<uni-icons type="shop"></uni-icons>
					<text>店铺</text>
				</navigator>
				<navigator url="/pages/cart/cart" hover-class="none" open-type="switchTab" class="p-b-btn" @click="toggleSpec">
					<uni-icons type="cart"></uni-icons>
					<text>购物车</text>
				</navigator>
			</view>
			<view class="action-btn-group flexBox">
				<view type="primary" class="ptXq-czBtn action-btn no-border" @click="buy">￥{{goodsInfo.singleprice}}<br>单独购买</view>
				<view type="primary" class="ptXq-czBtn action-btn no-border buy-now-btn" @click="buypt">￥{{goodsInfo.groupsprice}}<br>发起拼单</view>
			</view>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view 
			class="popup spec" 
			:class="specClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleSpec"
		>
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image src="https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg"></image>
					<view class="right">
						<text class="price">¥328.00</text>
						<text class="textHuiLineThough">￥54</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{sItem.name}}
							</text>
						</view>
					</view>
				</view>
				<view v-for="(item,index) in specList" :key="index" class="attr-list">
					<text>{{item.name}}</text>
					<view class="item-list">
						<text 
							v-for="(childItem, childIndex) in specChildList" 
							v-if="childItem.pid === item.id"
							:key="childIndex" class="tit"
							:class="{selected: childItem.selected}"
							@click="selectSpec(childIndex, childItem.pid)"
						>
							{{childItem.name}}
						</text>
					</view>
				</view>
				<view class="attr-list flexBox between" style="flex-direction:row">
					<text>购买数量</text>
					<uni-number-box border-radius min="1" />
				</view>
				<button class="yhqAlt-btn" @click="toggleSpec">确定</button>
			</view>
		</view>
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
						<view class="yhqAltIt-icon"><image src="../../static/img/yilingqu@2x.png" mode=""></image></view>
					</view>
					<view class="yhqAltItem flexBox between cur">
						<view class="yhqAltIt-price"><text>￥</text>50</view>
						<view class="yhqAltIt-int">
							<text class="textOrange">满999使用</text>
							<text>店铺优惠券</text>
							<text>2020.02.28-2020.03.28</text>
						</view>
						<view class="yhqAltIt-btn">立即领取</view>
						<view class="yhqAltIt-icon"><image src="../../static/img/yilingqu@2x.png" mode=""></image></view>
					</view>
				</view>
				<view class="proYh flexBox">
					<view class="proYh-tip">金币</view>
					购买可得39金币
				</view>
				<button class="yhqAlt-btn" @click="toggleYhq">关闭</button>
			</view>
		</view>
		<!-- 分享 -->
		<share 
			ref="share" 
			:contentHeight="580"
			:shareList="shareList"
		></share>
	</view>
</template>

<script>
	import share from '@/components/share';
	import {getGroupInfo, goodsCheck,getGroupTeams,getopenGroups} from '@/api/public';
	export default{
		components: {
			share
		},
		data() {
			return {
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				shop:{},
				goodsList: [],
				id:0,
				teams: [],
				specClass: 'none',
				yhqClass: 'none',
				specSelected:[],
				favorite: true,
				shareList: [],
				goodsInfo:{
					thumb_url:[],
					id: "0",
					gid: "0",
					title: "",
					stock: "0",
					price: "0.00",
					single: "0",
					singleprice: "0.00",
					units: "件",
					freight: "0.00",
					groupsprice: "0.00",
					groupnum: "0",
					endtime: "0",
					sales: 0,
					teamnum: "0",
				},
				specList: [
					{
						id: 1,
						name: '尺寸',
					},
					{	
						id: 2,
						name: '颜色',
					},
				],
				specChildList: [
					{
						id: 1,
						pid: 1,
						name: 'XS',
					},
					{
						id: 2,
						pid: 1,
						name: 'S',
					},
					{
						id: 3,
						pid: 1,
						name: 'M',
					},
					{
						id: 4,
						pid: 1,
						name: 'L',
					},
					{
						id: 5,
						pid: 1,
						name: 'XL',
					},
					{
						id: 6,
						pid: 1,
						name: 'XXL',
					},
					{
						id: 7,
						pid: 2,
						name: '白色',
					},
					{
						id: 8,
						pid: 2,
						name: '珊瑚粉',
					},
					{
						id: 9,
						pid: 2,
						name: '草木绿',
					},
				]
			};
		},
		onShareAppMessage(res){
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			var i = this.bargainid, t = this.mid, r = this.bargain_share
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route
			console.log(curRoute)
			return {
			  title: r.title || "帮砍价",
			  path: curRoute+'?id='+i+"&mid="+t,
			  content:r.content,
			  imageUrl:r.logo
			}
		},
		async onLoad(options){
	
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			let id = options.id;
			console.log(id)
			this.id = id;
			this.loadData();		
			//规格 默认选中第一条
			this.specList.forEach(item=>{
				for(let cItem of this.specChildList){
					if(cItem.pid === item.id){
						this.$set(cItem, 'selected', true);
						this.specSelected.push(cItem);
						break; //forEach不能使用break
					}
				}
			})
			this.shareList = await this.$api.json('shareList');
		},
		methods:{
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			async loadData() {
				let that = this;
				getGroupInfo(this.id).then(data => {
					
					that.goodsInfo = data.data;
					that.$set(that,'shop',data.data.shopdetail)
				})
				getGroupTeams(this.id,0).then(data => {
					that.teams = data.other ? data.other :[] ;
				})
			
				let carouselList = await this.$api.json('carouselList');
				this.titleNViewBackground = carouselList[0].background;
				this.swiperLength = carouselList.length;
				this.carouselList = carouselList;
				
				let goodsList = await this.$api.json('goodsList');
				this.goodsList = goodsList || [];
			},
			gototeam(id){
				uni.navigateTo({
					url: '../mygroups/groups_detail?id='+id
				})
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].background;
			},
			//规格弹窗开关
			toggleSpec() {
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
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
			//选择规格
			selectSpec(index, pid){
				let list = this.specChildList;
				list.forEach(item=>{
					if(item.pid === pid){
						this.$set(item, 'selected', false);
					}
				})

				this.$set(list[index], 'selected', true);
				//存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				this.specSelected = []; 
				list.forEach(item=>{ 
					if(item.selected === true){ 
						this.specSelected.push(item); 
					} 
				})
				
			},
			//分享
			share(){
				this.$refs.share.toggleMask();	
			},
			//收藏
			toFavorite(){
				this.favorite = !this.favorite;
			},
			goShop() {
				uni.navigateTo({
					url: `/pages/shop/shop`
				})
			},
			ptgz() {
				uni.navigateTo({
					url: `/pages/ptgz/ptgz`
				})
			},
			buy(){
				let that = this;
				goodsCheck(that.id, 'single').then(data =>{
					
					
						uni.navigateTo({
							url: `/pages/createPtOrder/createPtOrder?id=`+that.id+"&type=single"
						})
					
				}).catch(res=> {
					return false;
				})
				
				/*uni.navigateTo({
					url: `/pages/order/createOrder`
				})*/
			},
			specsTap:function(t){
				
			},
			buypt(){
				let that=this;
				uni.navigateTo({
					url: `/pages/createPtOrder/createPtOrder?id=`+that.id+"&type=groups&heads=1&option_id="+0
				})
			},
			stopPrevent(){}
		},

	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.carousel {
		height: 700rpx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750rpx;
			overflow: hidden;
		}
		image {
			width: 100%;
			height: 100%;
		}
		
	}
	.carousel-section {
		position: relative;
	}
	.swiper-dots {
		position: absolute;
		right: 30rpx;
		bottom: 28rpx;
		padding: 0 14rpx;
		height: 36rpx;
		line-height: 36rpx;
		background-color: rgba(0,0,0,.5);
		border-radius: 100rpx;
		font-size: 24rpx;
		color: #fff;
		text-align: center;
	}
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20upx 30upx;
		
		.title{
			font-size: 30rpx;
			color: $font-color-dark;
			line-height: 50rpx;
			width: 81%;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 0 0;
			font-size: 20upx;
		}
		.price-tip {
			color:#FF5722;
			font-size: 20rpx;;
		}
		.price{
			font-size: 40rpx;
			color:#FF5722;
		}
		.m-price{
			margin:0 20rpx;
			color: $font-color-light;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
	}
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position:absolute;
				background: $uni-color-primary;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			font-size: $font-base;
			margin-left:10upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}
	
	.c-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 140upx;
		}
		.con{
			flex: 1;
			color: $font-color-dark;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-primary;
		}
	}
	
	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;
		.e-header{
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.tit{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}
			.tip{
				flex: 1;
				text-align: right;
			}
			.icon-you{
				margin-left: 10upx;
			}
		}
	}
	.eva-box{
		display: flex;
		padding: 20upx 0;
		.portrait{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
			.con{
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
		}
	}
	/*  详情 */
	.detail-desc{
		background: #fff;
		margin-top: 16upx;
	}
	.d-header{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		position: relative;
	
		text{
			padding: 0 20upx;
			background: #fff;
			position: relative;
			z-index: 1;
			width: 100%;
		}
		/* &:after{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%);
			width: 300upx;
			height: 0;
			content: '';
			border-bottom: 1px solid #ccc; 
		} */
	}
	
	/* 规格选择弹窗 */
	.attr-content{
		padding: 10upx 30upx;
		.a-t{
			padding: 20rpx 0 30rpx 0;
			display: flex;
			image{
				margin: 0;
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				border-radius: 8upx;
			}
			.right{
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;
				.price{
					font-size: $font-lg;
					color: #FF5722;
					margin-bottom: 10upx;
				}
				.selected-text{
					margin-right: 10upx;
				}
			}
		}
		.attr-list{
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
			border-top: 1px solid #F2F2F2;
		}
		.item-list{
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;
			text{
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 14rpx;
				min-width: 50rpx;
				height: 50rpx;
				padding: 0 30rpx;
				font-size: $font-base;
				font-size: 24rpx;
				color: #333;
			}
			.selected{
				background: #FF5722;
				color: #fff;
			}
		}
	}
	
	/*  弹出层 */
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
	
	/* 底部操作菜单 */
	.page-bottom{
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
		
		.p-b-btn{
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;
			.yticon{
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			&.active, &.active .yticon{
				color: $uni-color-primary;
			}
			.icon-fenxiang2{
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.icon-shoucang{
				font-size: 46upx;
			}
		}
		.action-btn-group{
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30,#fa436a,#F56C6C);
			margin-left: 20upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base ;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
	
</style>
