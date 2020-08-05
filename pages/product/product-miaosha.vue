<template>
	<view class="container" v-if="show">
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<swiper class="carousel" circular duration="400" @change="swiperChange">
				<swiper-item class="carousel-item" v-for="(item,index) in goods.thumbs" :key="index" >
					<image :src="item" class="loaded" mode="aspectFill"/>
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">{{swiperCurrent+1}}/{{swiperLength}}</view>
		</view>
		<block v-if="goods.seckillinfo">
			<view class="msXq-Header buy-now-btn flexBox between">
				<view class="msXq-price">
					<text class="msPri-dw">¥</text>
					<text class="msPri-mon">{{goods.seckillinfo.price}}</text>
					<text class="msPri-dw">起</text>
					<text class="msPri-ed">¥{{goods.marketprice}}</text>
				</view>
				<view class="msXq-dsj" >
					{{goods.seckillinfo.status == 1 ?'距开始':'距结束'}}
					<view class="lsgDjs msDjs">
						<uni-countdown :show-day="false" :hour="hour" :minute="min" :second="sec" color="#FFFFFF" background-color="rgba(0,0,0,.2)"/>
					</view>
				</view>
			</view>
			
			<view class="introduce-section">
				<text class="title fl">{{goods.title}}</text>
				<view class="proXq-share flexBox fr">
					<view class="proShareItem" :class="{active: favorite}" @click="toFavorite">
						<uni-icons type="star"></uni-icons>收藏
					</view>
					<view class="proShareItem" @click="share">
						<uni-icons type="upload"></uni-icons>分享
					</view>
				</view>
				<view class="clear"></view>
			</view>
		</block>
		<view class="proXqKuai flexBox between" @click="toggleYhq" v-if="activity!= ''">
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
		</view>
				
		<view class="proXqKuai flexBox between" @click="goShop">
			<view class="proXqShop-int flexBox">
				<view class="proShop-tx"><image :src="goods.shopdetail.logo" mode=""></image></view>
				<view class="proShop-int">
					<view class="proShop-title ellipsis-1">{{goods.shopdetail.shopname}}</view>
					<view class="proShop-number clear">
						<view class="proShopTel flexBox fl" v-if="goods.shopdetail.mobile">
							<text class="uni-icon uni-icon-phone-filled"></text>
							{{goods.shopdetail.mobile}}
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
			<rich-text :nodes="goods.content"></rich-text>
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
				<view type="primary" class="action-btn no-border add-cart-btn" :data-id="goods.id" data-buytype="cart" :data-tap="active" @click="buy" v-if="goods.canAddCart&&goods.type!=9">加入购物车</view>
				<view type="primary" class="action-btn no-border buy-now-btn" :data-id="goods.id"  data-buytype="buy" :data-tap="active"  v-if="!goods.access_time&&!goods.timeout" @click="buy">立即购买</view>
				<view type="primary" class="action-btn no-border buy-now-btn" v-if="goods.access_time" data-buytype="buy" :data-id="goods.id" :data-tap="active" data-time="access_time" @click="buy">立即购买</view>
				<view type="primary" class="action-btn no-border buy-now-btn" :data-tap="active" data-buytype="buy" :data-id="goods.id" data-time="timeout" data-timeout="false" v-if="goods.timeout" @click="buy">立即购买</view>
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
				<view class="a-t" v-if="minpicker == 'goodsdetail'">
					<image :src="goods.thumb"></image>
					<view class="right">
						<text class="price">
							<block v-if="goods.ispresell>0&&(goods.preselltimeend==0||goods.preselltimeend>goods.thistime)">{{goods.presellprice}}
							</block>
							<block v-else-if="goods.isdiscount!=0&&goods.isdiscount_time>=now">
								{{goods.minprice}}
							</block>
							<block v-else>
								<block v-if="goods.maxprice==goods.minprice">
									{{goods.marketprice}}
								</block>
								<block v-else>
									{{goods.minprice}}~{{goods.maxprice}}
								</block>
							</block>
						</text>
						<text class="textHuiLineThough">￥54</text>
						<view class="selected">
							<block v-if="pickerOption.specs.length>0">
								{{specsTitle==''?'请选择规格':'已选 '+specsTitle}}
							</block>
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{sItem.name}}
							</text>
						</view>
					</view>
				</view>
				<view class="a-t" v-else>
					<image :src="goods.thumb"></image>
					<view class="right">
						<text class="price">
							<block v-if="goods.ispresell>0&&(goods.preselltimeend==0||goods.preselltimeend>goods.thistime)">{{goods.presellprice}}
							</block>
							<block v-else-if="goods.isdiscount!=0&&goods.isdiscount_time>=now">
								{{goods.minprice}}
							</block>
							<block v-else>
								<block v-if="goods.maxprice==goods.minprice">
									{{goods.marketprice}}
								</block>
								<block v-else>
									{{goods.minprice}}~{{goods.maxprice}}
								</block>
							</block>
						</text>
						<text class="textHuiLineThough">￥{{goods.marketprice}}</text>
					</view>
				</view>
				<view v-for="(item,index) in pickerOption.specs" :key="index" class="attr-list">
					<text>{{item.title}}</text>
					<view class="item-list">
						<text 
							v-for="(childItem, childIndex) in spec.items" 
							:key="childIndex" class="tit"
							:class="{selected: specsData[index].id === item.id ?true :false}"
							@click="selectSpec(index, childItem)"
						>
							{{childItem.title}}
						</text>
					</view>
				</view>
				<view class="attr-list flexBox between" style="flex-direction:row">
					<text>购买数量</text>
					<uni-number-box border-radius :value="total" @change="updatenumber"  :min="goods.maxbuy<0?1:goods.maxbuy" :max="goods.minbuy<total&&total == 1?total:goods.minbuy" />
				</view>
				<button class="yhqAlt-btn"  v-if="pagepicker!='goodslist'&&pagepicker!='quickbuy'" @click="submit">确定</button>
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
	import {getGoodDetaill,getGoodsComments,getMaps} from "@/api/public";
	import {getCurrentDayString} from '@/utils/help.js';
	import d from "@/utils/biz/goodspicker"
	import share from '@/components/share';
	
	export default{
		components: {
			share
		},
		data() {
			return {
				num:1,
				show: !1,
				diypages: {},
				usediypage: !1,
				specs: [],
				options: [],
				goods: {},
				indicatorDots: !0,
				autoplay: !0,
				interval: 5e3,
				duration: 500,
				circular: !0,
				play: "/static/images/video_play.png",
				mute: "/static/images/icon/mute.png",
				voice: "/static/images/icon/voice.png",
				active: "",
				slider: "",
				tempname: "",
				info: "active",
				preselltimeend: "",
				presellsendstatrttime: "",
				advWidth: 0,
				dispatchpriceObj: 0,
				now: parseInt(Date.now() / 1e3),
				day: 0,
				hour: 0,
				minute: 0,
				min:0,
				sec: 0,
				second: 0,
				timer: 0,
				discountTitle: "",
				istime: 1,
				istimeTitle: "",
				isSelected: !1,
				params: {},
				total: 1,
				optionid: 0,
				audios: {},
				audiosObj: {},
				defaults: { 
					id: 0,
					merchid: 0
				},
				buyType: "",
				pickerOption: {},
				specsData: [],
				specsTitle: "",
				canBuy: "",
				diyform: {},
				showPicker: !1,
				showcoupon: !1,
				pvalOld: [ 0, 0, 0 ],
				pval: [ 0, 0, 0 ],
				areas: [],
				noArea: !0,
				commentObj: {},
				commentObjTab: 1,
				loading: !1,
				commentEmpty: !1,
				commentPage: 1,
				commentTotal: 1,
				commentLevel: "all",
				commentList: [],
				closeBtn: !1,
				soundpic: !0,
				animationData: {},
				uid: "",
				stararr: [ "all", "good", "normal", "bad", "pic" ],
				nav_mask: !1,
				nav_mask2: !1,
				nav: 0,
				giftid: "",
				limits: !0,
				modelShow: !1,
				showgoods: !0,
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
				imgList: [
				],
				desc: `
					
				`,
			};
		},
		async onLoad(options){
			
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			this.id = options.id;
			this.options = options;
			this.loadData();
			
			
			//规格 默认选中第一条
		/*	this.specList.forEach(item=>{
				for(let cItem of this.specChildList){
					if(cItem.pid === item.id){
						this.$set(cItem, 'selected', true);
						this.specSelected.push(cItem);
						break; //forEach不能使用break
					}
				}
			})
			this.shareList = await this.$api.json('shareList');*/
		},
		methods:{
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			async loadData() {
				let that = this, a = parseInt(Date.now() / 1e3);
				
				getGoodDetaill(that.id).then(t => {
					that.show =  !0,
					that.showgoods =  !1;
					let o = t.goods.coupons, n = t.goods.thumbMaxHeight, r = (t.goods.thumbMaxWidth,t.goods.goodscircle);
					if(that.coupon = o,that.coupon_l = o.length,that.packagegoods = t.goods.packagegoods,that.packagegoodsid = t.goods.packagegoods.goodsid ||0,
					that.credittext = t.goods.credittext,that.activity = t.goods.activity,that.bottomFixedImageUrls = t.goods.bottomFixedImageUrls,that.phonenumber = t.goods.phonenumber,
					that.showDate = t.goods.showDate,that.scope = t.goods.scope|| "",that.show_goods = t.goods.show_goods,that.goodscircle = r,that.goods = t.goods,that.minprice = t.goods.minprice,
					that.maxprice = t.goods.maxprice,that.preselltimeend = t.goods.preselltimeend,that.style = t.goods.labelstyle.style || "",that.navbar = t.goods.navbar,that.labels =t.goods.labels,
					t.goods.gifts&& 1 == t.goods.gifts.length && that.$set(that,'giftid',t.goods.gifts[0].id),
					(JSON.stringify(t.goods.dispatchprice) == "{}" || "string" == typeof t.goods.dispatchprice) ?that.$set(that,'dispatchpriceObj',0):that.$set(that,'dispatchpriceObj',1),
					t.goods.isdiscount > 0 && t.goods.isdiscount_time >= a){
						clearInterval(that.timer);
						let d = setInterval(function() {
							that.countDown(0, t.goods.isdiscount_time,"istime");
						}, 1e3);
						that.timer = d;
					
					}else{
						that.discountTitle = "活动已结束";
					}
					that.swiperLength = that.goods.thumbs.length;
					if(t.goods.istime > 0){
						clearInterval(that.timer);
					    d = setInterval(function() {
							that.countDown(t.goods.timestart, t.goods.timeend,"istime");
						}, 1e3);
						that.timer = d;
					}
					if(t.goods.ispresell > 0) {
						d = setInterval(function() {
							0 == t.goods.canbuy ? e.countDown(a, t.goods.preselltimestart, "istime") : 1 == t.goods.canbuy && e.countDown(a, t.goods.preselltimeend, "istime");
						}, 1e3);
						that.timer = d,that.presellisstart = t.goods.presellisstart,
						that.preselltimeend = t.goods.preselltimeend || t.goods.preselltimeend.getMonth() + "月" + t.goods.preselltimeend || t.goods.preselltimeend.getDate() + "日 " + t.goods.preselltimeend || t.goods.preselltimeend.getHours() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getMinutes() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getSeconds(),
						that.presellsendstatrttime = t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getMonth() + "月" + t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getDate() + "日";
					}
					t.goods.getComments > 0 && getGoodsComments({id:that.options.id}).then(res => {
						that.commentObj = t;
					}),t.goods.fullbackgoods && that.$set(that,'fullbackgoods',t.goods.fullbackgoods);
					let g = that.fullbackgoods;
					if(null != g){
						let m = g.maxfullbackratio,h = g.maxallfullbackallratio;
						m = Math.round(m), h = Math.round(h);
						that.maxfullbackratio = m, that.maxallfullbackallratio = h;
					}
					9 == t.goods.type && (that.checkedDate = t.goods.nowDate,that.show_cycelbuydate()),t.goods.seckillinfo&&that.initSeckill(t.goods);
					
				})
				
			/*	
				.catch(e => {
					uni.navigateBack();
				})
				let carouselList = await this.$api.json('carouselList');
				this.titleNViewBackground = carouselList[0].background;
				this.swiperLength = carouselList.length;
				this.carouselList = carouselList;
				
				let goodsList = await this.$api.json('goodsList');
				this.goodsList = goodsList || [];*/
			},
			initSeckill(t){
				var e = this, a = parseInt(t.seckillinfo.status), i = t.seckillinfo.starttime, s = t.seckillinfo.endtime;
				if(-1 != a){
					 var n = 0, r = 0;
					
					 getMaps().then(o => {
						
						 let d = parseInt(new Date() / 1e3);
					
						 n = 0 == a ? s - d : i - d,
						 e.lasttime = n,clearInterval(e.timer),r = e.setTimer(t.seckillinfo),
						 e.timer = r;
					 })
					 
				}
			},
			/*setTimerInterval(t){
				let e = this;
				return setInterval(function() {
					e.setTimer(t);
			
				}, 1e3);
			},*/
			updatenumber(event){
				
				let that = this;
				var o = a.goods.maxbuy, d = a.goods.minbuy,i = event;
				if (i > 0) {
				  if (o > 0 && o <= parseInt(t.detail.value) && (i = o,uni.showToast({title:"单次最多购买" + o + "件",duration:600})),
				  d > 0 && d > parseInt(t.detail.value) && (i = d, uni.showToast({title:"单次最少购买" + d + "件",duration:600} )), 
				  parseInt(a.stock) < parseInt(i)) return void uni.showToast({title:'库存不足',duration:600});
				} else i = d > 0 ? d : 1;
				that.total = i ;
				
			},
			setTimer(t){
			
				let e = this,a = 0;
				 if (-1 != t.status && parseInt(e.lasttime) % 10 == 0) {
					var i = parseInt(t.status), s = t.starttime, n = t.endtime;
				
					if (-1 != i) {
					 getMaps().then(t => {
						let o = parseInt(new Date() / 1e3);
						
						a = 0 == i ? n - o : s - o, e.lasttime = a;
						 
					 })
					}
				 }
				 
				 a = parseInt(e.lasttime) - 1;
				 
				 var d = e.formatSeconds(a);
				 
				 e.lasttime = a,e.hour = d.hour,e.min = d.min,e.sec = d.sec,a <=0 &&e.onLoad();
			},
			formatSeconds(t){
				var e = parseInt(t), a = 0, o = 0;
				return e > 60 && (a = parseInt(e / 60), e = parseInt(e % 60), a > 60 && (o = parseInt(a / 60), 
				a = parseInt(a % 60))), {
					hour:  o,
					min: a,
					sec: e
				};
			},
			show_cycelbuydate(){
				let t = getCurrentDayString(this, this.showDate);
				this.currentObj = t,
				this.currentDate = t.getFullYear() + "年" + (t.getMonth() + 1) + "月" + t.getDate() + "日 " + [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ][t.getDay()],
				this.currentYear = t.getFullYear(),
				this.currentMonth =  t.getMonth() + 1,
				this.currentDay = t.getDate(),
				this.initDate = Date.parse(t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate()),
				this.checkedDate = Date.parse(t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate()),
				this.maxday = this.scope;
			},
			countDown(t, e, a){
				 var o = parseInt(Date.now() / 1e3), i = parseInt((t > o ? t : e) - o), s = Math.floor(i / 86400), n = Math.floor((i - 24 * s * 60 * 60) / 3600), r = Math.floor((i - 24 * s * 60 * 60 - 3600 * n) / 60), d = [ s, n, r, Math.floor(i - 24 * s * 60 * 60 - 3600 * n - 60 * r) ];
				 if(this.time = d){
					var c = "";
					t > o ? c = "距离限时购开始" : t <= o && e > o ? c = "距离限时购结束" : (c = "活动已经结束，下次早点来~", that.istime = 0),that.istimeTitle = c ;
				 }
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				
			},
			submit(){
				let t = {};
				if(this.canBuy == '' &&this.buyType == 'cart'){
					
					d.getCart(t, this);
				}
				if(this.canBuy == '' &&this.buyType == 'buy'){
					
					d.buyNow(t, this, "goods_detail");
				}
				if(this.canBuy == '' && this.buyType == 'select'){
					
				}
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
			selectSpec(index, item){
				let t = {idx:index,info:childItem};
				d.specsTap(t,this);
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
			buy(t){
				
				let that = this,e = t.currentTarget.dataset.time, a = t.currentTarget.dataset.timeout;
				if ("timeout" == e || "access_time" == e) {
					if ("false" == a) {
						that.goods_hint_show = !0;
					}
					if ("true" == a) {
						if ("access_time" == e) {
							that.goods_hint_show = !1;
							
							var i = "goodsdetail";
							return void d.selectpicker(t, that, i);
						}
						if ("timeout" == e) return void that.$set(that,'goods_hint_show',!1);
					}
				}
				i = "goodsdetail";
				d.selectpicker(t, this, i);
				
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
