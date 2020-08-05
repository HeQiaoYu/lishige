<template>
	<view class="container">
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<swiper class="carousel" circular duration="400" @change="swiperChange">
				<swiper-item class="carousel-item" v-for="(item,index) in goodInfo.thumbs" :key="index" >
					<image :src="item" class="loaded" mode="aspectFill"/>
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">{{swiperCurrent+1}}/{{swiperLength}}</view>
		</view>
		
		<view class="introduce-section">
			<text class="title fl">{{goodInfo.title}} </text>
			<view class="proXq-share flexBox fr">
				<view :class="goodInfo['isfavorite']?'proShareItem active':'proShareItem'" @click="toFavorite">
					<uni-icons type="star" :style="goodInfo['isfavorite']?'color:#FF6129':''"></uni-icons>收藏
				</view>
				<view class="proShareItem" @click="share">
					<uni-icons type="upload"></uni-icons>分享
				</view>
			</view>
			<view class="clear"></view>
			<view class="price-box fl">
				<text class="price-tip">¥</text>
				<text class="price">{{goodInfo.marketprice}}</text>
				<text class="m-price">¥{{goodInfo.productprice}}</text>
			</view>
			<view class="proXq-yishou fr">
				已售{{goodInfo.sales}}
			</view>
			<view class="clear"></view>
		</view>
		
		<view class="proXqKuai flexBox between" @click="toggleYhq">
			<view class="proXq-fanxian">
				<block v-if="activity.enough||activity.merch_enough">
					<view class="proYh flexBox"  v-if="activity.enough">
						<view class="proYh-tip">返现</view>
						全场满{{activity.enough[0].enough}}立减{{activity.enough[0].money}}
					</view>
					<view class="proYh flexBox" v-if="activity.merch_enough">
						<view class="proYh-tip">满减</view>
						本店满{{activity.merch_enough[0].enough}}立减{{activity.merch_enough[0].give}}
					</view>
				</block>
				<view v-if="fullbackgoods"class="proYh flexBox">
					<view class="proYh-tip">{{goodInfo.fullbacktext}}</view>
					   该商品享受<span v-if="fullbackgoods.type==0">¥{{fullbackgoods.maxallfullbackallprice}}</span>
					   <span v-if="fullbackgoods.type==1">{{fullbackgoods.maxallfullbackallprice}}%</span>
						 的{{goodInfo.fullbacktext}}
				</view>
				<block v-for="(item,index) in goodInfo.coupons">
					<view class="proYh flexBox" >
						<view class="proYh-tip">领券</view>
						<text v-if="item.backpre">{{item.backmoney}}<text v-if="item.backtype==1">折</text></text>
					</view>
				</block>
			</view>
			<text class="yticon icon-you"></text>
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
			<rich-text :nodes="content"></rich-text>
		</view>
		
		<!-- 底部操作菜单 -->
		<view class="pageBottomDiy flexBox between">
			<view class="flexBox">
				<navigator :url="'/pages/shop/shop?id='+shop.id" class="p-b-btn pageBtnOrange" hover-class="none">
					<uni-icons type="shop"></uni-icons>
					<text>店铺</text>
				</navigator>
				<navigator url="/pages/cart/cart" hover-class="none" open-type="switchTab" class="p-b-btn" @click="toggleSpec">
					<uni-icons type="cart"></uni-icons>
					<text>购物车</text>
				</navigator>
			</view>
			
			<view class="action-btn-group flexBox">
				<button type="primary" class="action-btn no-border add-cart-btn" @click="toggleSpec(0)">加入购物车</button>
				<button type="primary" class="action-btn no-border buy-now-btn" @click="toggleSpec(1)">立即购买</button>
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
					<image :src="goodInfo.thumb"></image>
					<view class="right">
						<text class="price">
							<block v-if="goodInfo.ispresell>0&&(goodInfo.preselltimeend==0||goodInfo.preselltimeend>goodInfo.thistime)">{{goodInfo.presellprice}}
							</block>
							<block v-else-if="goodInfo.isdiscount!=0&&goodInfo.isdiscount_time>=now">
								{{goodInfo.minprice}}
							</block>
							<block v-else>
								<block v-if="goodInfo.maxprice==goodInfo.minprice">
									{{goodInfo.marketprice}}
								</block>
								<block v-else>
									{{goodInfo.minprice}}~{{goodInfo.maxprice}}
								</block>
							</block>
						</text>
						<text class="textHuiLineThough">￥{{goodInfo.marketprice}}</text>
						
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
					<uni-number-box border-radius :min="0" :value="number" v-on:change="onNumberChange($event)" :max="maxnumber"  />
				</view>
				<button class="yhqAlt-btn" @click="tobutton">确定</button>
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
	import t from "@/utils/jquery";
	import {getGoodDetaill, toggle, creatediyform, addcart} from '@/api/public';
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
				goodsList: [],
				specClass: 'none',
				yhqClass: 'none',
				specSelected:[],
				favorite: true,
				shareList: [],
				specList: [
				],
				specChildList: [
				],
				goodsid:0,
				goodInfo:[],
				shop:[],
				activity:[],
				fullbackgoods:[],
				content:'',
				number:1,
				maxnumber:1,
				optionid:0,
				type:0
			};
		},
		async onLoad(options){
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			let id = options.id;
			this.goodsid = id;
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
			onNumberChange(e){
				if(e == this.number){
					return false;
				}
				this.number = e;
			},
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			async loadData() {
				let that = this;
				getGoodDetaill(that.goodsid).then(res => {
					that.$set(that,'goodInfo',res.goods)
					that.$set(that,'shop',res.goods.shopdetail)
					that.$set(that,'activity',res.goods.activity);
					that.$set(that,'fullbackgoods',res.goods.fullbackgoods)
					that.content = res.goods.content;
					that.maxnumber = parseInt(res.goods.total);
					this.swiperLength =res.goods.thumbs.length;
				}).catch(e => {
					
				})
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].background;
			},
			//加入购物车还是下单
			tobutton(){
				let type = this.type;
				if(type == 1){
					this.buy();
				}else{
					this.addcart();
				}
			},
			//加入购物车
			addcart() {
		
				let d = this, i = d.optionid, s = d.goodInfo.hasoption , r = d.diyform;
				if(s > 0 && !i) uni.showtoast({title: '请选择规格' }); else if (d.quickbuy) {
					if(r && r.fields.length > 0) {
						if(!d.verify(r)) return;
						d.formdataval = {diyformdata:r.f_data};
					}
					d.addCartquick(i, d.number);
				}else if (r && r.fields.length > 0){
					if(!d.verify(r)) return;
					creatediyform({id: d.goodsid,diyformdata: r.f_data}).then(res => {
						addcart({id: d.goodsid, total: d.number, optionid: i, diyformdata: r.f_data}).then(resdata => {
							d.goodInfo.cartcount = resdata.cartcount;
							d.active = '';
							d.slider = 'out';
							d.specClass = 'none';
							d.tempname = '';
							uni.showToast({
								title: '添加成功'
							})()
						}).catch(t =>{
							uni.showToast({
								title: t.message
							})
						})
					}).catch(error => {
						
					})
				}else {
					addcart({id: d.goodsid, total: d.number, optionid: i}).then(t => {
						uni.showToast({
							title: '添加成功'
						});
						let a = d.goodInfo;
						d.$set(d.goodInfo, 'cartcount', t.cartcount);
						d.active = '';
						d.slider = '';
						d.goodInfo = a;
					})
				}
			},
			verify(e) {
				for (var r in e.fields) {
					var d = e.fields[r], n = d.diy_type;
					if (1 == d.tp_must) if (5 == d.data_type) {
						if (!e.f_data[n] || e.f_data[n].count < 1) return uni.showToast({titile: "请选择" + d.tp_name}), 
						!1;
					} else if (9 == d.data_type) {
						if (t.isEmptyObject(e.f_data[n]) || !e.f_data[n].province || !e.f_data[n].city) return uni.showToast({titile: "请选择" + d.tp_name}), 
						!1;
					} else if (10 == d.data_type) {
						if (t.isEmptyObject(e.f_data[n]) || !e.f_data[n].name1) return uni.showToast({titile: "请选择" + d.tp_name}), 
						!1;
						if (!e.f_data[n].name2 || "" == e.f_data[n].name2) return uni.showToast({titile: "请选择" + d.tp_name2}), 
						!1;
					} else if (11 == d.data_type) {
						if (!e.f_data[n]) return uni.showToast({titile: "请选择" + d.tp_name}), !1;
					} else if (3 == d.data_type) {
						if (!e.f_data[n] || "{}" == JSON.stringify(e.f_data[n])) return uni.showToast({titile: "请选择" + d.tp_name}), 
						!1;
					} else if (!e.f_data[n]) return uni.showToast({titile: "请选择" + d.tp_name}), !1;
					if (6 == d.data_type) {
						if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(e.f_data[n])) return uni.showToast({titile: "请填写正确的" + d.tp_name}), 
						!1;
					}
					if (10 == d.data_type && (t.isEmptyObject(e.f_data[n]) || e.f_data[n].name1 != e.f_data[n].name2)) return uni.showToast({titile: d.tp_name + "与" + d.tp_name2 + "不一致"}), 
					!1;
				}
				return !0;
			},
			//规格弹窗开关
			toggleSpec(type = 0) {
				this.type = type;
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
				}
			},
			//获取规格
			getpicker(){
				let that = this;
				getPicker(that.goodsid).then(res => {
					console.log(res)
				})
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
				
				toggle(this.goodsid,this.goodInfo.isfavorite?0:1).then(res => {
					this.goodInfo.isfavorite = res.isfavorite
				}).catch(res => {
					
				})
				
			},
			goShop(id) {
				let that = this;
				console.log(id);
				uni.navigateTo({
					url: `/pages/shop/shop?id=`+id
				})
			},
			buy(){
				let that = this, goodsid = that.goodsid, optionid = that.optionid, total = that.number;
				if(total == 0){
					this.$api.msg('库存不足');
					return;
				}
				uni.navigateTo({
					url: `/pages/order/createOrder?id=${goodsid}&optionid=${optionid}&total=${total}`
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
