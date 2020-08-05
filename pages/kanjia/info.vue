<template>
	<view class="page navbar nobuy" style="">
	    <view class="bargain-shop">
	        <view class="user">
	            <image :src="list.head_image"></image>
	            <text>{{list.nickname}}</text>
	        </view>
	        <navigator class="goodsinfo flex" >
	            <view class="image">
	                <image mode="aspectFit" :src="bargain.thumb"></image>
	            </view>
	            <view class="goodsinner">
	                <view class="title">{{bargain.title}}</view>
	                <view class="price">原价:{{bargain.start_price}}</view>
	                <view class="status">库存{{bargain.stock}} | 已售{{bargain.sold}}</view>
	            </view>
	        </navigator>
	        <view class="prices">
	            <view class="current">
	      ￥{{list.now_price}}<text>当前价</text>
	            </view>
	            <view class="cut">
	      已砍金额<text>￥{{list.bargain_price}}</text>
	            </view>
	            <block>
	                <block v-if="istime==1&&timeout==0">
	                    <view class="time">
	      {{istimeTitle}}
		  <countdowmTimer ref="countdown" :time="time" @finish="onFinish">
		  	<template v-slot="{day, hour, minute, second, remain}">
		  		<view>{{day}}天{{hour}}时{{minute}}分{{second}}秒</view>
		  	</template>
		  </countdowmTimer>
	
	                    </view>
	                </block>
	            </block>
	            <block>
	                <block v-if="istime==2||timeout==1">
	                    <view class="time" style="background:#999">
	      活动已结束
	    </view>
	                </block>
	            </block>
	        </view>
	    </view>
	    <view class="fui-cell-group">
	        <view class="title">
	            <view class="fui-tab fui-tab-danger" id="tab">
	                <view @click="goodsTab('family')" class="item" :class='showtab=="family"?"active":""' >亲友团</view>
	                <view @click="goodsTab('info')" class="item" :class='showtab=="info"?"active":""' >商品详情</view>
	                <view @click="goodsTab('rule')" class="item" :class='showtab=="rule"?"active":""' >活动规则</view>
	                <block>
	                    <block v-if="bargain_set.partin>-10000">
	                        <view @click="goodsTab('join')" class="item" :class='showtab=="join"?"active":""'  data-tap="join">参与榜</view>
	                    </block>
	                </block>
	            </view>
	        </view>
	        <view>
	            <block>
	                <block v-if="showtab=='family'">
	                    <view>
	                        <block v-for="(item,index) in bargain_record">
	                            <view class="fui-cell">
	                                <view class="fui-cell-label">
	                                    <image :src="item.head_image"></image>
	                                </view>
	                                <view class="fui-cell-info">
	                                    <view class="title">{{item.nickname}}</view>
	                                    <view class="text">{{item.bargain_time}}</view>
	                                </view>
	                                <view class="fui-cell-remark noremark danger">
	                                    <block>
	                                        <block v-if="item.bargain_price<=0">
	                                            <text>{{item.bargain_price}}</text>
	                                        </block>
	                                    </block>
	                                    <block>
	                                        <block v-if="item.bargain_price>0">
	                                            <text>+{{item.bargain_price}}</text>
	                                        </block>
	                                    </block>
	                                </view>
	                            </view>
	                        </block>
	                    </view>
	                </block>
	            </block>
	            <block>
	                <block v-if="showtab=='info'">
	                    <view>
							<rich-text :nodes="bargain.content"></rich-text>
	                    </view>
	                </block>
	            </block>
	            <block>
	                <block v-if="showtab=='rule'">
	                    <view>
	                        <rich-text :nodes="bargain.content"></rich-text>
	                    </view>
	                </block>
	            </block>
	            <block>
	                <block v-if="showtab=='join'&&bargain_set.partin>-10000">
	                    <view>
	                        <block v-for="(item,index) in bargain_actor" >
	                            <view class="fui-cell">
	                                <view class="fui-cell-label">
	                                    <image :src="item.head_image"></image>
	                                </view>
	                                <view class="fui-cell-info">
	                                    <view class="title">{{item.nickname}}</view>
	                                    <view class="text">{{item.update_time}}</view>
	                                </view>
	                                <view class="fui-cell-remark noremark danger">
	                                    <block>
	                                        <block v-if="item.bargain_price<=0">
	                                            <text>{{item.bargain_price}}</text>
	                                        </block>
	                                    </block>
	                                    <block>
	                                        <block v-if="item.bargain_price>0">
	                                            <text>+{{item.bargain_price}}</text>
	                                        </block>
	                                    </block>
	                                </view>
	                            </view>
	                        </block>
	                    </view>
	                </block>
	            </block>
	        </view>
	    </view>
	    <block>
	        <block v-if="swi==111&&istime==1&&timeout==0">
	            <view class="fui-navbar flex">
	                <block>
	                    <block v-if="trade_swi==5&&trade_swi!=0&&arrived==0">
	                        <navigator class="buybtn" :url="'/pages/order/createOrder?bargainid='+list.id">立即购买</navigator>
	                    </block>
	                </block>
	                <block>
	                    <block v-if="trade_swi==2">
	                        <view class="buybtn">已经结束</view>
	                    </block>
	                </block>
	                <block>
	                    <block v-if="trade_swi==3">
	                        <view class="buybtn">库存不足</view>
	                    </block>
	                </block>
	                <block>
	                    <block v-if="trade_swi==4">
	                        <view class="buybtn">没到底价</view>
	                    </block>
	                </block>
	                <block>
	                    <block v-if="trade_swi!=1&&myself_swi==1">
	                        <view @click="tocutPrice" class="bargainBuy">立即砍价</view>
	                    </block>
	                </block>
	                <block>
	                    <block v-if="trade_swi!=0&&myself_swi==0&&arrived==0">
							<!-- #ifdef MP-WEIXIN -->
								<button class="bargainBuy" open-type="share">邀请好友砍价</button>
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN -->
	                        <button @click="seekHelp" class="bargainBuy" openType="share">找人帮砍</button>
							<!-- #endif -->
	                    </block>
	                </block>
	            </view>
	        </block>
	    </block>
	    <block>
	        <block v-if="swi=='222'&&istime==1&&timeout==0">
	            <view class="fui-navbar flex">
	                <navigator class="buybtn" :url="'../product/product-kanjia?id='+bargain.id">我也要砍</navigator>
				
	                <view @click="tocutPrice" class="bargainBuy">帮砍一刀</view>
	            </view>
	        </block>
	    </block>
	    <block>
	        <block v-if="swi==111&&arrived==1&&(trade_swi==0||trade_swi==5)&&myself_swi==0">
	            <view class="fui-navbar ">
	                <navigator class="bargainBuy" :url="'/pages/order/createOrder?bargainid='+list.id">立即购买</navigator>
	            </view>
	        </block>
	    </block>
	    <block>
	        <block v-if="trade_swi==1">
	            <view class="fui-navbar">
	                <navigator class="bargainBuy" :url="'/pages/order/orderDetails?id='+list.order">查看订单</navigator>
	            </view>
	        </block>
	    </block>
	    <block>
	        <block v-if="layer">
	            <view @click="closeLayer" class="layer">
	                <view class="content">
	                    <view class="icox icox-close"></view>
	                    <image src="/static/img/success.png"></image>
	                    <view style="line-height:82rpx;font-size:28rpx">恭喜你成功砍掉</view>
	                    <view style="line-height:70rpx;font-size:66rpx;font-weight:bold;color:#ff5555">{{cutPrice}}元</view>
	                    <view class="layerbtn">知道了</view>
	                </view>
	            </view>
	        </block>
	    </block>
	    <block>
	        <block v-if="error_hint">
	            <view class="layer">
	                <view class="showModal">
	                    <view class="inner">{{error_hint_title}}</view>
	                    <view class="operate flex">
	                        <view @click="closeError" class="flex1">确定</view>
	                    </view>
	                </view>
	            </view>
	        </block>
	    </block>
	</view>
</template>

<script>
	import countdowmTimer from '@/components/countdown-timer/countdown-timer'
	import {bargainInfo, bargainBargain} from '@/api/public'
	export default {
		components: {
			countdowmTimer
		},
		data() {
			return {
				isIpx: !0,
				showtab: "family",
				bargainid: "",
				layer: !1,
				cutPrice: "",
				error_hint: !1,
				error_hint_title: "",
				list: {},
				bargain: {},
				time: 0,
				bargain_set: {},
				istimeTitle: "剩余时间",
				bargain_record: {},
				bargain_actor: {},
				swi: "",
				trade_swi: "",
				myself_swi: "",
				mid: "",
				randomHint: {
					0: "大王，您即将触及我的价格底线，不要放弃继续砍价吧～",
					1: "主人，达到价格底线就可以带我回家啦！等你哦～",
					2: "加把劲，再砍一刀，马上就到底价了哦～",
					3: "砍到底价才能购买哦，邀请小伙伴来帮忙吧！",
					4: "叫上您的小伙伴来砍价，我们的的目标是底价买买买！"
				},
				marked_words: "",
				arrived: "",
				timeout: 0,
				bargain_share: {},
				istime:1
			}
		},
		onLoad(options) {
			uni.setStorageSync('back','1')
			this.options = options;
			this.loadData();
		},
		onShareAppMessage(res){
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			var i = this.bargainid, t = this.mid, r = this.bargain_share;
			console.log(i.bargain)
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route
			console.log(curRoute)
			return {
			  title: i.title || "帮砍价",
			  path: curRoute+'?id='+i+"&mid="+t,
			  content:r.content,
			  imageUrl:i.thumb
			}
		},
		methods: {
			loadData() {
				let that = this;
				let data = that.options
		
				bargainInfo(data).then(data => {

					if(1 != data.error){
						if(0 == data.error){
							
							if(1 == data.unequalMid){
								let arr = []
								arr['id'] = data.id;
								arr['mid'] = data.mid
								that.options = arr;
								that.loadData();
							}
							that.list = data.list;
							that.bargain = data.bargain;
							that.bargain_set = data.bargain_set,
							that.bargain_record = data.bargain_record,
							that.bargain_actor = data.bargain_actor,
							that.swi = data.swi,
							that.trade_swi = data.trade_swi,
							that.myself_swi = data.myself_swi,
							that.bargainid = data.list.id,
							that.mid = data.mid,
							that.arrived = data.arrived,
							that.timeout = data.timeout,
							that.bargain_share = data.bargain_share;
							that.countDown(data.bargain.start_time* 1000, data.bargain.end_time* 1000, "istime"), clearInterval(that.timer);
							that.timer = setInterval(function() {
								that.countDown(data.bargain.start_time* 1000, data.bargain.end_time* 1000, "istime");
							}, 1e3);
						}
					}
				})
			},
			countDown(a, i, t) {
				let that = this;
				
				var r = parseInt(Date.now()), e = parseInt((a > r ? a : i) - r);
				
				if (that.time = e,"istime") {
					var d = "";
					a > r ? (d = "未开始",that.istime = 0) : a <= r && i > r ? (d = "剩余时间", that.istime = 1):(d = "活动已经结束，下次早点来~",this.istime= 2), this.istimeTitle= d;
				}
			},
			goodsTab (a) {
				this.showtab = a
			},
			tocutPrice () {
				var t = this;
				var a = "/pages/public/login", r = t, e = r.bargainid, n = r.mid;
				bargainBargain(e, n).then(i => {
					
					-1 != i.error ? 1 != i.error ? 0 == i.error && i.cutPrice ? (r.layer = !0,r.cutPrice = i.cutPrice):uni.navigateTo({
						url: a
					}):(r.error_hint = !0, r.error_hint_title = i.message):uni.navigateTo({
						url: a
					})
					t.loadData();
				}).catch(res=> {
					t.loadData();
				})
			},
			closeError () {
				this.error_hint = !1
			},
			onFinish(){},
			closeLayer () {
				this.layer = !1;
				this.loadData();
			},
			seekHelp () {
				var i = this.bargainid, t = this.mid, r = this.bargain_share
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].route
				// #ifdef MP-WEIXIN
								
				uni.share({
                    provider: "weixin",
                    scene: "WXSceneSession",
                    type: 0,
                    href: "http://h5.ilishige.com/"+curRoute+"?id="+i+"&mid="+t,//这地址太长了，就省略了
                    title: r.title || "帮砍价",
                    summary: r.content,                         
                    imageUrl: r.logo,
                    success: function(res) {
                        console.log("success:" + JSON.stringify(res));
                    },
                    fail: function(err) {
                        console.log("fail:" + JSON.stringify(err));
                    }
                });
				// #endif
				// #ifndef MP-WEIXIN
				uni.share({ 
                    provider: "weixin",
                    scene: "WXSceneSession",
                    type: 0,
                    href: "http://ejm.ilishige.com/lishige/index.html?url="+curRoute+"+id="+i+"+mid="+t,//这地址太长了，就省略了
                    title: r.title || "帮砍价",
                    summary: r.content,                         
                    imageUrl: r.logo,
                    success: function(res) {
                        console.log("success:" + JSON.stringify(res));
                    },
                    fail: function(err) {
                        console.log("fail:" + JSON.stringify(err));
                    }
                });
				// #endif

			}
		}
	}
</script>

<style>
	.btn {
	    -moz-appearance: none;
	    background: rgba(0,0,0,0) none repeat scroll 0 0;
	    border-radius: 10rpx;
	    box-sizing: border-box;
	    cursor: pointer;
	    font-family: inherit;
	    font-size: 30rpx;
	    height: 80rpx;
	    line-height: 76rpx;
	    padding: 0 20rpx;
	    position: relative;
	    text-align: center;
	    text-decoration: none;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    border: 1px solid #f90;
	    margin: 0.5em;
	    user-select: none;
	    transition-duration: 300ms;
	    transition-property: background-color;
	    display: inline-block;
	    z-index: 100;
	}
	
	.btn.block {
	    display: block;
	}
	
	.btn.btn-sm {
	    height: 56rpx;
	    line-height: 52rpx;
	    margin: 0;
	    font-size: 26rpx;
	}
	
	.btn.btn-default {
	    background: #f7f7f7;
	    color: #333;
	    border: 1px solid #dfdfdf;
	}
	
	.btn.btn-default:active {
	    background: #dedede;
	    color: #a1a1a1;
	    border: 1px solid #c8c8c8;
	}
	
	.btn.btn-default.disabled {
	    background: #ccc;
	    color: #fff;
	    border: 1px solid #dfdfdf;
	}
	
	.btn.btn-default.disabled:active {
	    background: #f7f7f7;
	    color: #c9c9c9;
	    border: 1px solid #dfdfdf;
	}
	
	.btn.btn-success {
	    background: #04be02;
	    color: #fff;
	    border: 1px solid #04ab02;
	}
	
	.btn.btn-success:active,.btn.btn-success.disabled {
	    background: #039702;
	    color: #9be59a;
	    border: 1px solid #038802;
	}
	
	.btn.btn-primary {
	    background: #0290be;
	    color: #fff;
	    border: 1px solid #0281ab;
	}
	
	.btn.btn-primary:active,.btn.btn-primary.disabled {
	    background: #027297;
	    color: #67abc1;
	    border: 1px solid #026688;
	}
	
	.btn.btn-warning {
	    background: #ff8000;
	    color: #fff;
	    border: 1px solid #ff8000;
	}
	
	.btn.btn-warning:active {
	    background: #e67300;
	    color: #f4a85a;
	    border: 1px solid #ce6600;
	}
	
	.btn.btn-warning.disabled {
	    background: #ccc;
	    color: #fff;
	    border: 1px solid #ccc;
	}
	
	.btn.btn-danger {
	    background: #ff5555;
	    color: #fff;
	    border: 1px solid #ff5555;
	}
	
	.btn.btn-danger:active {
	    background: #c13e3e;
	    color: #d2848b;
	    border: 1px solid #ae3838;
	}
	
	.btn.btn-danger.disabled {
	    background: #ccc;
	    color: #fff;
	    border: 1px solid #ccc;
	}
	
	.btn.btn-default-o {
	    background: transparent;
	    color: #666;
	    border: 1px solid #666;
	}
	
	.btn.btn-default-o:active {
	    background: transparent;
	    color: #666;
	    border: 1px solid #666;
	}
	
	.btn.btn-default-o.disabled,.btn.btn-success-o.disabled,.btn.btn-primary-o.disabled,.btn.btn-warning-o.disabled,.btn.btn-danger-o.disabled {
	    background: transparent;
	    color: #999;
	    border: 1px solid #999;
	}
	
	.btn.btn-success-o {
	    background: transparent;
	    color: #04be02;
	    border: 1px solid #04ab02;
	}
	
	.btn.btn-primary-o {
	    background: transparent;
	    color: #0290be;
	    border: 1px solid #0290be;
	}
	
	.btn.btn-warning-o {
	    background: transparent;
	    color: #ff9326;
	    border: 1px solid #ff9326;
	}
	
	.btn.btn-danger-o {
	    background: transparent;
	    color: #ff5555;
	    border: 1px solid #ff5555;
	}
	
	.fui-header {
	    height: 88rpx;
	    width: 100%;
	    box-sizing: border-box;
	    font-size: 32rpx;
	    position: fixed;
	    top: 0;
	    margin: 0;
	    z-index: 999;
	    backface-visibility: hidden;
	    background: #f7f7f7;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	}
	
	.fui-header:after {
	    content: "";
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    width: 100%;
	    height: 0;
	    border-bottom: 2rpx solid #D9D9D9;
	    transform-origin: 0 100%;
	    transform: scaleY(0.5);
	}
	
	.fui-header .title {
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    height: 88rpx;
	    line-height: 88rpx;
	    color: #333;
	    text-align: center;
	    position: absolute;
	    display: block;
	    width: 100%;
	    padding: 0;
	    top: 0;
	    left: 0;
	    z-index: 1;
	}
	
	.fui-header .fui-header-left {
	    position: absolute;
	    left: 0;
	    padding-left: 12rpx;
	    height: 88rpx;
	    line-height: 88rpx;
	    z-index: 2;
	}
	
	.fui-header .fui-header-right {
	    position: absolute;
	    right: 0;
	    padding-right: 8rpx;
	    height: 88rpx;
	    line-height: 88rpx;
	    z-index: 2;
	}
	
	.fui-header a.back:before {
	    content: " ";
	    display: inline-block;
	    transform: rotate(45deg);
	    height: 20rpx;
	    width: 20rpx;
	    border-width: 0 0 2px 2px;
	    border-color: #999;
	    border-style: solid;
	    position: relative;
	    top: 0;
	}
	
	.fui-header navigator {
	    height: 88rpx;
	    line-height: 88rpx;
	    margin: 0;
	    top: 0;
	    color: #999;
	    display: block;
	    padding: 0 8rpx;
	}
	
	.fui-header.fui-header-success {
	    background-color: #04ab02;
	    border: none;
	}
	
	.fui-header.fui-header-primary {
	    background-color: #0290be;
	    border: none;
	}
	
	.fui-header.fui-header-warning {
	    background-color: #ff9326;
	    border: none;
	}
	
	.fui-header.fui-header-danger {
	    background-color: #ef4f4f;
	    border: none;
	}
	
	.fui-header.fui-header-success .title,.fui-header.fui-header-success .btn,.fui-header.fui-header-primary .title,.fui-header.fui-header-primary .btn,.fui-header.fui-header-warning .title,.fui-header.fui-header-warning .btn,.fui-header.fui-header-danger .title,.fui-header.fui-header-danger .btn {
	    color: #fff;
	}
	
	.fui-header .fui-header-right navigator {
	    float: left;
	}
	
	.fui-header image.icon {
	    vertical-align: middle;
	    height: 42rpx;
	    width: 42rpx;
	}
	
	.fui-loading {
	    width: 65%;
	    margin: 1.5em auto;
	    line-height: 1.6em;
	    font-size: 14px;
	    text-align: center;
	    position: relative;
	}
	
	.fui-loading.line:before,.fui-loading.empty:before {
	    content: "";
	    position: absolute;
	    top: 50%;
	    left: 0;
	    right: 0;
	    border-top: 2rpx solid #E5E5E5;
	}
	
	.fui-loading.line .text,.fui-loading.empty .text {
	    padding: 0 20rpx;
	    background: #f3f3f3;
	    position: relative;
	    text-align: center;
	    z-index: 2;
	}
	
	.fui-loading.empty {
	    color: #999;
	}
	
	.fui-loading .text {
	    display: inline-block;
	    vertical-align: middle;
	}
	
	.fui-loading .icon {
	    margin: 0 5px;
	    width: 20px;
	    height: 20px;
	    display: inline-block;
	    vertical-align: middle;
	    animation: fuiLoading 1s steps(12,end) infinite;
	    background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
	    background-size: 100%;
	}
	
	@-webkit-keyframes fuiLoading {
	    0% {
	        transform: rotate3d(0,0,1,0deg);
	    }
	
	    100% {
	        transform: rotate3d(0,0,1,360deg);
	    }
	}
	
	@keyframes fuiLoading {
	    0% {
	        transform: rotate3d(0,0,1,0deg);
	    }
	
	    100% {
	        transform: rotate3d(0,0,1,360deg);
	    }
	}
	
	.fui-title {
	    color: #888;
	    font-size: 14px;
	    margin: 20rpx 0;
	    padding: 0 28rpx;
	}
	
	.fui-cell-group {
	    margin-top: 20rpx;
	    background-color: #fff;
	    line-height: 1.4;
	    font-size: 32rpx;
	    overflow: hidden;
	    position: relative;
	}
	
	.fui-cell-group.fui-cell-group-o {
	    margin: 0 20rpx;
	    margin-top: 20rpx;
	    border-radius: 20rpx;
	}
	
	.fui-cell-group.nomargin {
	    margin-top: 0;
	}
	
	.fui-cell-group.fui-cell-group-o:active a:last-child {
	    border-bottom-left-radius: 12rpx;
	    border-bottom-right-radius: 12rpx;
	}
	
	.fui-cell-group.fui-cell-group-o:active a:first-child {
	    border-top-left-radius: 12rpx;
	    border-top-right-radius: 12rpx;
	}
	
	.fui-cell-group .fui-cell {
	    position: relative;
	    padding: 24rpx;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    align-items: center;
	    transition-duration: 300ms;
	    transition-property: background-color;
	}
	
	.fui-cell-group .fui-cell:before {
	    content: " ";
	    position: absolute;
	    left: 20rpx;
	    right: 20rpx;
	    top: 0;
	    height: 1px;
	    border-top: 1px solid #ebebeb;
	    color: #D9D9D9;
	    transform-origin: 0 0;
	    transform: scaleY(0.5);
	}
	
	.fui-cell-group .fui-cell.noborder:before {
	    display: none;
	}
	
	.fui-cell-group .fui-cell.must .fui-cell-label:after {
	    content: "*";
	    position: absolute;
	    right: 8rpx;
	    top: 8rpx;
	    color: #f30;
	    font-size: 32rpx;
	}
	
	.fui-cell-group-o:after,.fui-cell-group .fui-cell:first-child:before {
	    display: none;
	}
	
	.fui-cell-group.fui-cell-click .fui-cell:active,.fui-cell-group .fui-cell.fui-cell-click:active {
	    background: #ececec;
	}
	
	.fui-cell-title {
	    color: #333;
	    font-size: 30rpx;
	    padding: 20rpx 28rpx;
	}
	
	.fui-cell-title small {
	    font-size: 26rpx;
	}
	
	.fui-cell-tip {
	    color: #999;
	    font-size: 24rpx;
	    padding: 12rpx 28rpx;
	}
	
	.fui-cell-group .fui-cell .fui-cell-info {
	    flex: 1;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    font-size: 28rpx;
	    color: #000;
	}
	
	.fui-cell-group .fui-cell .fui-cell-info.wrap {
	    word-break: break-all;
	    word-wrap: break-word;
	    white-space: normal;
	}
	
	.fui-cell-group .fui-cell .fui-cell-info.overflow {
	    word-break: break-all;
	    overflow: auto;
	    white-space: normal;
	    height: auto;
	}
	
	.fui-cell-group .fui-cell .fui-cell-info .checkbox-inline,.fui-cell-group .fui-cell .fui-cell-info .radio-inline {
	    float: left;
	    margin-bottom: 8rpx;
	}
	
	.fui-cell-group .fui-cell .fui-cell-label {
	    position: relative;
	    display: block;
	    width: 160rpx;
	    padding: 0;
	    font-size: 28rpx;
	    color: #666;
	}
	
	.fui-cell-group .fui-cell .fui-cell-label.big {
	    display: block;
	    width: 180rpx;
	    padding: 0 8rpx;
	    font-size: 32rpx;
	}
	
	.fui-cell-group .fui-cell input {
	    width: 100%;
	    border: 0;
	    outline: 0;
	    background-color: transparent;
	    font-size: inherit;
	    color: inherit;
	    height: 1.41176471em;
	    line-height: 1.41176471;
	}
	
	.fui-cell-group .fui-cell .fui-number input {
	    height: 100%;
	    font-size: 28rpx;
	}
	
	.fui-cell-group .fui-cell .fui-input::-webkit-outer-spin-button,.fui-cell-group .fui-cell .fui-input::-webkit-inner-spin-button {
	    -webkit-appearance: none;
	    margin: 0;
	}
	
	.fui-cell-group .fui-cell .fui-cell-info select {
	    -webkit-appearance: none;
	    border: 0;
	    outline: 0;
	    background-color: transparent;
	    width: 100%;
	    font-size: inherit;
	    height: 48rpx;
	    position: relative;
	    z-index: 1;
	    padding-left: 15px;
	}
	
	.fui-cell-group .fui-cell .fui-cell-info select {
	    padding: 0;
	}
	
	.fui-cell-group .fui-cell .fui-cell-icon {
	    margin-right: 12rpx;
	    width: 32rpx;
	    height: 32rpx;
	    line-height: 32rpx;
	    color: #666;
	    text-align: center;
	}
	
	.fui-cell-group .fui-cell .fui-cell-icon.pull-left {
	    font-size: 34rpx;
	}
	
	.fui-cell-group .fui-cell .fui-cell-text {
	    flex: 1;
	    color: #000;
	    font-size: 28rpx;
	}
	
	.fui-cell-group .fui-cell .fui-cell-remark {
	    color: #888;
	    text-align: right;
	    font-size: 30rpx;
	    margin-right: 8rpx;
	}
	
	.fui-cell-group .fui-cell .fui-cell-remark.noremark {
	    color: #000;
	    font-size: 26rpx;
	}
	
	.fui-cell-group .fui-cell .fui-cell-remark:after {
	    content: " ";
	    display: inline-block;
	    transform: rotate(45deg);
	    height: 16rpx;
	    width: 16rpx;
	    border-width: 1px 1px 0 0;
	    border-color: #C8C8CD;
	    border-style: solid;
	    position: relative;
	    top: -1px;
	    margin-left: .3em;
	}
	
	.fui-cell-group .fui-cell .fui-cell-remark.noremark:after {
	    display: none;
	    margin-left: 0;
	}
	
	.fui-cell-group .fui-cell textarea {
	    width: 100%;
	    height: auto;
	    min-height: 100rpx;
	    background: transparent;
	    border: none;
	    resize: none;
	    font-size: 28rpx;
	}
	
	.fui-cell-group .fui-cell .placeholder {
	    color: #888;
	    height: 100rpx;
	}
	
	.fui-cell-group .fui-cell .textarea_counter {
	    font-size: 28rpx;
	    color: #666;
	    text-align: right;
	}
	
	.fui-cell-group .fui-cell.warning {
	    color: #e64340;
	}
	
	.fui-list-group {
	    background-color: #fff;
	    position: relative;
	    margin-top: 20rpx;
	}
	
	.fui-list-group.noborder {
	    margin: 0;
	}
	
	.fui-list-group.fui-list-group-o {
	    margin: 0 20rpx;
	    border-radius: 20rpx;
	    margin-top: 20rpx;
	}
	
	.fui-list-group-title {
	    padding: 5rpx 24rpx;
	    font-size: 28rpx;
	    color: #333;
	    height: 72rpx;
	    line-height: 72rpx;
	    display: flex;
	    align-items: center;
	    position: relative;
	}
	
	.fui-list-group-title:active {
	    background: #ececec;
	}
	
	.fui-list-group-title.noclick:active {
	    background: none;
	}
	
	.fui-list-group-title image {
	    height: 32rpx;
	    width: 32rpx;
	    display: block;
	}
	
	.fui-list-group-title .text {
	    flex: 1;
	    padding-left: 10rpx;
	}
	
	.fui-list {
	    position: relative;
	    display: flex;
	    padding: 16rpx 24rpx;
	    transition-duration: 300ms;
	    align-items: center;
	    overflow: hidden;
	}
	
	.fui-list.align-start {
	    align-items: start;
	}
	
	.fui-list:before {
	    content: " ";
	    position: absolute;
	    top: 0;
	    right: 20rpx;
	    height: 0;
	    border-top: 2rpx solid #ebebeb;
	    transform-origin: 0 0;
	    transform: scaleY(0.5);
	    left: 20rpx;
	}
	
	.fui-list:first-child:before {
	    display: none;
	}
	
	.fui-list:active {
	    background: #ececec;
	}
	
	.fui-list.noclick:active {
	    background: #fff;
	}
	
	.fui-list a {
	    color: #666;
	}
	
	.fui-list-media {
	    display: flex;
	    flex-shrink: 0;
	    flex-wrap: nowrap;
	    box-sizing: border-box;
	    align-items: center;
	    margin-right: 20rpx;
	    color: #000;
	    position: relative;
	}
	
	.fui-list-media .title {
	    background: rgba(0,0,0,0.8);
	    color: white;
	    height: 40rpx;
	    right: 0;
	    left: 0;
	    line-height: 40rpx;
	    font-size: 24rpx;
	    padding: 0 6rpx;
	    position: absolute;
	    bottom: 0;
	    text-align: center;
	    vertical-align: top;
	    z-index: 100;
	}
	
	.fui-list-media image {
	    width: 100rpx;
	    height: 100rpx;
	}
	
	.fui-list-media image.fui-list-icon {
	    width: 32rpx;
	    height: 32rpx;
	}
	
	.fui-list-media image.round {
	    border-radius: 12rpx;
	}
	
	.fui-list-media .badge {
	    background: red none repeat scroll 0 0;
	    border-radius: 20rpx;
	    color: white;
	    font-size: 28rpx;
	    height: 36rpx;
	    right: -14rpx;
	    line-height: 36rpx;
	    min-width: 36rpx;
	    position: absolute;
	    top: -12rpx;
	    text-align: center;
	    vertical-align: top;
	    z-index: 100;
	    padding: 0;
	}
	
	.fui-list-inner {
	    position: relative;
	    flex: 1;
	    overflow: hidden;
	    box-sizing: border-box;
	    display: block;
	}
	
	.fui-list-inner .subtitle {
	    position: relative;
	    font-size: 30rpx;
	    color: #444;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	}
	
	.fui-list-inner .text {
	    position: relative;
	    font-size: 26rpx;
	    color: #666;
	}
	
	.fui-list-inner .bar {
	    position: relative;
	    font-size: 26rpx;
	    color: #666;
	    margin-top: 12rpx;
	    padding-top: 12rpx;
	    height: 56rpx;
	    line-height: 56rpx;
	}
	
	.fui-list-inner .bar:before {
	    content: " ";
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 1px;
	    border-top: 1px solid #D9D9D9;
	    color: #D9D9D9;
	    transform-origin: 0 0;
	    transform: scaleY(0.5);
	}
	
	.fui-list-inner .title {
	    position: relative;
	    font-size: 28rpx;
	    color: #000;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    height: 40rpx;
	    line-height: 40rpx;
	}
	
	.fui-list-inner .row {
	    position: relative;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    margin: 0;
	    height: 40rpx;
	    line-height: 40rpx;
	}
	
	.fui-list-inner .row .row-text {
	    font-size: 28rpx;
	    color: #000;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    -webkit-box-flex: 1;
	    flex: 1;
	}
	
	.fui-list-inner .row .row-remark {
	    font-size: 30rpx;
	    color: #666;
	    text-align: right;
	}
	
	.fui-list .angle:after,.fui-list-group-title .angle:after {
	    content: " ";
	    display: inline-block;
	    transform: rotate(45deg);
	    height: 12rpx;
	    width: 12rpx;
	    border-width: 2px 2px 0 0;
	    border-color: #C8C8CD;
	    border-style: solid;
	    position: relative;
	    top: -8rpx;
	    margin-right: 4rpx;
	}
	
	.fui-list-angle {
	    position: relative;
	    vertical-align: middle;
	    margin-right: 20rpx;
	    margin-left: 20rpx;
	}
	
	.fui-list-angle .angle:after {
	    position: absolute;
	    top: 50%;
	    margin-top: -8rpx;
	}
	
	.fui-list-inner .subtitle.overflow,.fui-list-inner .title.overflow {
	    word-break: break-all;
	    overflow: auto;
	    white-space: normal;
	    height: auto;
	}
	
	.fui-icon-group {
	    position: relative;
	    overflow: hidden;
	    border-top: 1px solid #ebebeb;
	    background: #fff;
	}
	
	.fui-icon-group .fui-icon-col {
	    width: 25%;
	    height: auto;
	    position: relative;
	    padding: 25rpx 0;
	    text-align: center;
	    transition: background-color 300ms;
	    float: left;
	}
	
	.fui-icon-group .fui-icon-col:active {
	    background: #ececec;
	}
	
	.fui-icon-group .fui-icon-col:last-child:before {
	    display: none;
	}
	
	.fui-icon-group .fui-icon-col .icon {
	    height: 88rpx;
	    margin: auto;
	    text-align: center;
	    line-height: 88rpx;
	}
	
	.fui-icon-group.col-3 .fui-icon-col {
	    width: 33.3%;
	}
	
	.fui-icon-group.col-5 .fui-icon-col {
	    width: 20%;
	}
	
	.fui-icon-group .fui-icon-col .icon image {
	    height: 48rpx;
	    width: 48rpx;
	}
	
	.fui-icon-group.radius .fui-icon-col image {
	    border-radius: 20rpx;
	}
	
	.fui-icon-group.circle .fui-icon-col image {
	    border-radius: 88rpx;
	}
	
	.fui-icon-group.col-3 .fui-icon-col.radius image {
	    border-radius: 33.3%;
	}
	
	.fui-icon-group.col-5 .fui-icon-col.radius image {
	    border-radius: 20%;
	}
	
	.fui-icon-group .fui-icon-col .text {
	    font-size: 24rpx;
	    text-align: center;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    padding: 8rpx;
	    color: #000;
	    width: 100%;
	    box-sizing: border-box;
	}
	
	.fui-icon-group.noborder {
	    border-top: 0;
	}
	
	.fui-icon-group.nomargin {
	    margin-top: 0;
	}
	
	.fui-icon-group.noborder .fui-icon-col:before {
	    border: 0;
	}
	
	.fui-icon-group .fui-icon-col .icon i {
	    color: #aaa;
	    font-size: 64rpx;
	    margin-top: 14rpx;
	}
	
	.fui-icon-group .fui-icon-col .badge {
	    background: red none repeat scroll 0 0;
	    border-radius: 20rpx;
	    color: white;
	    font-size: 24rpx;
	    height: 32rpx;
	    left: 50%;
	    line-height: 32rpx;
	    margin-left: 14rpx;
	    min-width: 32rpx;
	    padding: 0 4rpx;
	    position: absolute;
	    top: 20rpx;
	    vertical-align: top;
	    text-align: center;
	    z-index: 100;
	}
	
	.fui-navbar,.fui-footer {
	    position: fixed;
	    width: 100%;
	    bottom: 0;
	    height: 100rpx;
	    background: #fff;
	    box-shadow: 0 0 4px rgba(0,0,0,0.1);
	    z-index: 999;
	}
	
	.fui-navbar .nav-item.btn {
	    color: #fff;
	    border-radius: 0;
	}
	
	.fui-navbar .nav-item {
	    position: relative;
	    display: table-cell;
	    height: 100rpx;
	    text-align: center;
	    vertical-align: middle;
	    width: 1%;
	    color: #999;
	    padding-top: 4rpx;
	}
	
	.fui-navbar .nav-item.active {
	    color: #ef4f4f;
	}
	
	.fui-navbar .nav-item .label {
	    display: block;
	    font-size: 22rpx;
	    position: relative;
	}
	
	.fui-navbar .nav-item .icox {
	    height: 50rpx;
	    width: 50rpx;
	    vertical-align: middle;
	    margin: 0 auto;
	    font-size: 40rpx;
	}
	
	.fui-navbar .nav-item .badge {
	    background: red none repeat scroll 0 0;
	    border-radius: 20rpx;
	    color: white;
	    font-size: 24rpx;
	    height: 32rpx;
	    left: 50%;
	    line-height: 32rpx;
	    margin-left: 4rpx;
	    min-width: 32rpx;
	    padding: 0 4rpx;
	    position: absolute;
	    top: 4rpx;
	    vertical-align: top;
	    z-index: 100;
	}
	
	.fui-footer .tool {
	    height: 100rpx;
	    padding: 0 24rpx;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    align-items: center;
	}
	
	.fui-footer .tool.nopadding {
	    padding: 0;
	}
	
	.fui-footer .tool .check {
	    width: auto;
	}
	
	.fui-footer .tool .text {
	    padding: 0 10rpx;
	    line-height: 36rpx;
	    -webkit-box-flex: 1;
	    flex: 1;
	}
	
	.fui-footer .tool .text .title {
	    font-size: 30rpx;
	    color: #333;
	}
	
	.fui-footer .tool .text .subtitle {
	    font-size: 26rpx;
	    color: #666;
	}
	
	.fui-footer .tool .btns {
	    width: auto;
	}
	
	.fui-block-group {
	    height: auto;
	    overflow: hidden;
	    background: #fff;
	    position: relative;
	    margin-top: 20rpx;
	}
	
	.fui-block-group .fui-block-child {
	    height: auto;
	    width: 33.33%;
	    float: left;
	    padding: 16rpx 0;
	    background: #fff;
	    transition: background-color 300ms;
	    position: relative;
	}
	
	.fui-block-group .fui-block-child:before {
	    content: "";
	    width: 0px;
	    border-right: 2rpx solid #ececec;
	    position: absolute;
	    right: 0;
	    top: 0;
	    bottom: 0;
	}
	
	.fui-block-group .fui-block-child:after {
	    content: "";
	    height: 0px;
	    border-bottom: 2rpx solid #ececec;
	    position: absolute;
	    right: 0;
	    left: 0;
	    bottom: 0;
	}
	
	.fui-block-group.col-2 .fui-block-child {
	    width: 50%;
	}
	
	.fui-block-group.col-3 .fui-block-child {
	    width: 33.3%;
	}
	
	.fui-block-group.col-4 .fui-block-child {
	    width: 25%;
	}
	
	.fui-block-group.col-5 .fui-block-child {
	    width: 20%;
	}
	
	.fui-block-group .fui-block-child:active {
	    background: #ececec;
	}
	
	.fui-block-group .fui-block-child .icon {
	    height: 108rpx;
	    padding-top: 40rpx;
	    text-align: center;
	    font-size: 56rpx;
	    line-height: 60rpx;
	}
	
	.fui-block-group .fui-block-child .icon image {
	    height: 100rpx;
	    width: 100rpx;
	}
	
	.fui-block-group .fui-block-child .title {
	    height: 40rpx;
	    font-size: 24rpx;
	    line-height: 60rpx;
	    text-align: center;
	    color: #666;
	}
	
	.fui-block-group .fui-block-child .title.bigsize {
	    font-size: 28rpx;
	}
	
	.fui-block-group .fui-block-child .text {
	    height: 48rpx;
	    font-size: 20rpx;
	    text-align: center;
	    color: #666;
	    line-height: 40rpx;
	}
	
	.fui-block-group .fui-block-child .text text {
	    color: #feb312;
	}
	
	.fui-block-group .fui-block-child .text.remark {
	    color: #a9a9a9;
	    font-size: 24rpx;
	    line-height: 48rpx;
	}
	
	.fui-block-group .fui-block-child .num {
	    height: 36rpx;
	    text-align: center;
	    font-size: 32rpx;
	    color: #fb6665;
	    line-height: 56rpx;
	}
	
	.fui-toast {
	    position: fixed;
	    left: 0;
	    text-align: center;
	    width: 100%;
	    opacity: 0;
	    transform: translate3d(0,0,0) scale(.9);
	    transition-property: opacity,-webkit-transform;
	    transition-property: transform,opacity;
	    transition-property: transform,opacity,-webkit-transform;
	    z-index: 10001;
	    bottom: 160rpx;
	    pointer-events: none;
	}
	
	.fui-toast.in {
	    opacity: 1;
	    transition-duration: 300ms;
	    transform: translate3d(0,0,0) scale(1);
	}
	
	.fui-toast.out {
	    opacity: 0;
	    z-index: 10999;
	    transition-duration: 300ms;
	    transform: translate3d(0,0,0) scale(0.8);
	}
	
	.fui-toast .text {
	    display: inline-block;
	    color: #fff;
	    padding: 16rpx 20rpx;
	    border-radius: 8rpx;
	    background: rgba(0,0,0,0.75);
	    font-size: 30rpx;
	    line-height: 40rpx;
	    max-width: 60%;
	}
	
	.fui-notify {
	    position: fixed;
	    top: 0;
	    text-align: center;
	    width: 100%;
	    height: auto;
	    transform: translate3d(0,-100%,0);
	    z-index: 1001;
	    padding: 20rpx;
	    overflow: hidden;
	}
	
	.fui-notify.fui-notify-default {
	    background: rgba(0,0,0,0.7);
	}
	
	.fui-notify.fui-notify-success {
	    background: rgba(3,151,2,0.9);
	}
	
	.fui-notify.fui-notify-warning {
	    background: rgba(230,110,0,0.9);
	}
	
	.fui-notify.fui-notify-danger {
	    background: rgba(174,56,56,0.9);
	}
	
	.fui-notify.fui-notify-primary {
	    background: rgba(2,114,151,0.9);
	}
	
	.fui-notify .fui-notify-close {
	    position: absolute;
	    right: 12rpx;
	    top: 12rpx;
	    color: #fff;
	}
	
	.fui-notify .title,.fui-notify .text {
	    color: #fff;
	    width: 100%;
	    float: left;
	    text-align: center;
	    font-size: 32rpx;
	    font-weight: bold;
	}
	
	.fui-notify .text {
	    font-size: 26rpx;
	    font-weight: normal;
	}
	
	.fui-notify.in {
	    transition-duration: 300ms;
	    transform: translate3d(0,0,0);
	}
	
	.fui-notify.out {
	    transition-duration: 300ms;
	    transform: translate3d(0,-100%,0);
	}
	
	.fui-goods-group {
	    height: auto;
	    overflow: hidden;
	    background: #f3f3f3;
	}
	
	.fui-goods-item {
	    box-sizing: border-box;
	    position: relative;
	    height: auto;
	    padding: 20rpx;
	    border-bottom: 1px solid #e7e7e7;
	    background: #fff;
	    overflow: hidden;
	    display: flex;
	}
	
	.fui-goods-item navigator {
	    height: auto;
	    overflow: hidden;
	    position: relative;
	}
	
	.fui-goods-item .image {
	    height: 160rpx;
	    width: 160rpx;
	    float: left;
	    background-size: 100%;
	    background-repeat: no-repeat;
	    background-position: center center;
	}
	
	.fui-goods-item .image img {
	    height: 100%;
	    width: 100%;
	    display: block;
	}
	
	.fui-goods-item .detail {
	    -webkit-box-flex: 1;
	    flex: 1;
	    background: #fff;
	    padding-left: 20rpx;
	}
	
	.fui-goods-item .detail .name {
	    height: 120rpx;
	    font-size: 26rpx;
	    line-height: 36rpx;
	    color: #262626;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	}
	
	.fui-goods-item .detail.goods_list_detail .name {
	    height: 68rpx;
	}
	
	.fui-goods-item .detail .price {
	    position: relative;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    align-items: center;
	    font-size: 28rpx;
	    margin-top: 12rpx;
	    min-height: 20px;
	}
	
	.fui-goods-item .detail .price .text {
	    -webkit-box-flex: 1;
	    flex: 1;
	    color: #ff5555;
	}
	
	.fui-goods-item .detail .price .minprice {
	    font-size: 34rpx;
	}
	
	.fui-goods-item .detail .price .productprice {
	    color: #777;
	    font-size: 22rpx;
	}
	
	.fui-goods-item .detail .price .buy {
	    text-align: center;
	    color: #fff;
	    background: #fe5455;
	    border-radius: 40rpx;
	    display: block;
	    font-size: 24rpx;
	    padding: 0 10rpx;
	}
	
	.fui-goods-item .detail .price .buy image {
	    height: 32rpx;
	    width: 32rpx;
	    vertical-align: middle;
	}
	
	.fui-goods-group.block {
	    padding: 0 10rpx;
	}
	
	.fui-goods-group.block .fui-goods-item {
	    width: 50%;
	    float: left;
	    border-bottom: 0;
	    background: none;
	    padding: 10rpx;
	    display: block;
	}
	
	.fui-goods-group.three .fui-goods-item {
	    width: 33.33%;
	}
	
	.fui-goods-group.block .fui-goods-item .image {
	    width: 100%;
	    height: 0;
	    overflow: hidden;
	    margin: 0;
	    padding-bottom: 100%;
	    background-position: center;
	    background-repeat: no-repeat;
	    background-size: cover;
	    background-color: #fff;
	}
	
	.fui-goods-group .fui-goods-item .salez {
	    position: absolute;
	    right: 0;
	    bottom: 0;
	    height: 200rpx;
	    width: 200rpx;
	    z-index: 999;
	    background-repeat: no-repeat;
	    background-position: bottom right;
	}
	
	.fui-goods-group.block {
	    padding: 10rpx;
	}
	
	.fui-goods-group.block .fui-goods-item .image {
	    float: none;
	}
	
	.fui-goods-group.block .fui-goods-item .detail {
	    padding: 8rpx;
	    overflow: hidden;
	}
	
	.fui-goods-group.block .fui-goods-item .detail .name {
	    height: 68rpx;
	    overflow: hidden;
	}
	
	.fui-goods-group.block .fui-goods-item .center-image {
	    max-width: 100%;
	    height: 0;
	    padding-bottom: 100%;
	    background-size: contain;
	}
	
	.fui-goods-group.block.one .fui-goods-item {
	    width: 100%;
	    float: none;
	}
	
	.fui-images .image .image-remove {
	    top: -12rpx;
	    right: -12rpx;
	}
	
	.fui-goods-swiper-group .cut {
	    position: absolute;
	    z-index: 999;
	    top: 50%;
	    margin-top: -20rpx;
	    width: 36rpx;
	    height: 72rpx;
	    line-height: 72rpx;
	    text-align: center;
	    color: #fff;
	    border-radius: 0 36rpx 36rpx 0;
	    background: rgba(0,0,0,0.6);
	}
	
	.fui-goods-swiper-group .cut.retreat i {
	    position: absolute;
	    left: 0;
	}
	
	.fui-goods-swiper-group .cut.advance i {
	    position: absolute;
	    right: -2rpx;
	}
	
	.fui-goods-swiper-group .cut.advance {
	    border-radius: 36rpx 0 0 36rpx;
	    right: 0;
	}
	
	.fui-label {
	    display: inline-block;
	    padding: 4rpx 8rpx;
	    background: #d9d9d9;
	    color: #333;
	    margin: 0 4rpx;
	    font-size: 24rpx;
	}
	
	.fui-label.fui-label-success {
	    background: #04ab02;
	    color: #fff;
	}
	
	.fui-label.fui-label-primary {
	    background: #0290be;
	    color: #fff;
	}
	
	.fui-label.fui-label-warning {
	    background: #ff9326;
	    color: #fff;
	}
	
	.fui-label.fui-label-danger {
	    background: #ef4f4f;
	    color: #fff;
	}
	
	.fui-label.fui-label-safety {
	    background: #07B40A;
	    color: #fff;
	}
	
	.fui-tab-o,.fui-tab {
	    align-self: center;
	    display: flex;
	    flex-wrap: nowrap;
	    margin-bottom: 20rpx;
	}
	
	.fui-tab {
	    background: white;
	    position: relative;
	}
	
	.fui-tab.fixed {
	    position: fixed;
	    width: 100%;
	    top: 0;
	    left: 0;
	    z-index: 999;
	}
	
	.fui-tab:after {
	    content: '';
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    top: auto;
	    right: 0;
	    height: 0;
	    border-bottom: 2rpx solid #D9D9D9;
	    transform-origin: 0 0;
	    transform: scaleY(0.5);
	}
	
	.fui-tab .item,.fui-tab-o .item {
	    text-align: center;
	    transition-duration: 300ms;
	    transition-property: color;
	}
	
	.fui-tab-o .item {
	    border-radius: 0 0 0 0;
	    margin-left: -2rpx;
	    width: 100%;
	    flex: 1;
	    color: #666;
	    font-size: 30rpx;
	    padding: 10rpx;
	}
	
	.fui-tab .item {
	    color: #666;
	    font-size: 28rpx;
	    height: 80rpx;
	    line-height: 80rpx;
	    flex: 1;
	    border: 0;
	    border-bottom: 4rpx solid transparent;
	    border-radius: 0;
	}
	
	.fui-tab .item.active {
	    transition-duration: 300ms;
	    transition-property: border-color;
	}
	
	.fui-tab-o .item:first-child {
	    border-radius: 10rpx 0 0 10rpx;
	    margin-left: 0;
	    border-left-width: 1px;
	    border-left-style: solid;
	}
	
	.fui-tab-o .item:last-child {
	    border-radius: 0 10rpx 10rpx 0;
	}
	
	.fui-tab.fui-tab-default .item.active {
	    color: #666;
	    border-color: #666;
	    z-index: 100;
	}
	
	.fui-tab.fui-tab-success .item.active {
	    color: #04be02;
	    border-color: #04ab02;
	    z-index: 100;
	}
	
	.fui-tab.fui-tab-primary .item.active {
	    color: #0290be;
	    border-color: #0290be;
	    z-index: 100;
	}
	
	.fui-tab.fui-tab-warning .item.active {
	    color: #ff9326;
	    border-color: #ff9326;
	    z-index: 100;
	}
	
	.fui-tab.fui-tab-danger .item.active {
	    color: #ff5555;
	    border-color: #ff5555;
	    z-index: 100;
	}
	
	.fui-tab-o.fui-tab-default .item {
	    color: #333;
	}
	
	.fui-tab-o.fui-tab-default .item,.fui-tab-o.fui-tab-default .item.active {
	    border: 1px solid #999;
	}
	
	.fui-tab-o.fui-tab-default .item.active {
	    background: #999;
	}
	
	.fui-tab-o.fui-tab-success .item {
	    color: #04ab02;
	}
	
	.fui-tab-o.fui-tab-success .item,.fui-tab-o.fui-tab-success .item.active {
	    border: 1px solid #04ab02;
	}
	
	.fui-tab-o.fui-tab-success .item.active {
	    background: #04ab02;
	}
	
	.fui-tab-o.fui-tab-primary .item {
	    color: #0290be;
	}
	
	.fui-tab-o.fui-tab-primary .item,.fui-tab-o.fui-tab-primary .item.active {
	    border: 1px solid #0290be;
	}
	
	.fui-tab-o.fui-tab-primary .item.active {
	    background: #0290be;
	}
	
	.fui-tab-o.fui-tab-warning .item {
	    color: #ff9326;
	}
	
	.fui-tab-o.fui-tab-warning .item,.fui-tab-o.fui-tab-warning .item.active {
	    border: 1px solid #ff9326;
	}
	
	.fui-tab-o.fui-tab-warning .item.active {
	    background: #ff9326;
	}
	
	.fui-tab-o.fui-tab-danger .item {
	    color: #ef4f4f;
	}
	
	.fui-tab-o.fui-tab-danger .item,.fui-tab-o.fui-tab-danger .item.active {
	    border: 1px solid #ef4f4f;
	}
	
	.fui-tab-o.fui-tab-danger .item.active {
	    background: #ef4f4f;
	}
	
	.fui-tab-o .item.active {
	    color: white;
	    z-index: 90;
	}
	
	.fui-tab-o {
	    margin-left: 40rpx;
	    margin-right: 40rpx;
	}
	
	.fui-uploader {
	    float: left;
	    position: relative;
	    margin-right: 12rpx;
	    margin-bottom: 12rpx;
	    width: 160rpx;
	    height: 160rpx;
	    background: #f5f5f5;
	}
	
	.fui-uploader.long {
	    width: 320rpx;
	}
	
	.fui-uploader:before,.fui-uploader:after {
	    content: " ";
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	    background-color: #D9D9D9;
	}
	
	.fui-uploader:before {
	    width: 2rpx;
	    height: 80rpx;
	}
	
	.fui-uploader:after {
	    width: 80rpx;
	    height: 2rpx;
	}
	
	.fui-uploader.fui-uploader-sm {
	    width: 80rpx;
	    height: 80rpx;
	}
	
	.fui-uploader.fui-uploader-sm:before {
	    height: 40rpx;
	}
	
	.fui-uploader.fui-uploader-sm:after {
	    width: 40rpx;
	}
	
	.fui-uploader:active {
	    border-color: #999999;
	}
	
	.fui-uploader:active:before,.fui-uploader:active:after {
	    background-color: #999999;
	}
	
	.fui-images {
	    list-style: none;
	}
	
	.fui-images .image {
	    float: left;
	    margin-right: 12rpx;
	    margin-bottom: 12rpx;
	    width: 160rpx;
	    height: 160rpx;
	    background: no-repeat center center;
	    background-size: cover;
	    position: relative;
	    overflow: hidden;
	}
	
	.fui-images .image.long {
	    width: 320rpx;
	}
	
	.fui-images .image .image-remove {
	    position: absolute;
	    right: 0;
	    top: 0;
	    color: #fff;
	    font-size: 60rpx;
	    height: 30rpx;
	    width: 30rpx;
	    line-height: 30rpx;
	    background: rgba(0,0,0,0.5);
	    filter: alpha(opacity=50);
	    border-bottom-left-radius: 10rpx;
	}
	
	.fui-images .image .image-remove .icox {
	    float: left;
	    font-size: 24rpx;
	    margin-left: 4rpx;
	}
	
	.fui-images.fui-images-sm .image.image-sm {
	    width: 80rpx;
	    height: 80rpx;
	}
	
	.fui-images.fui-images-sm .image.image-sm.long {
	    width: 120rpx;
	}
	
	.fui-mask {
	    position: fixed;
	    top: -1000rpx;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    background: rgba(0,0,0,0.7);
	    z-index: 1000;
	    display: none;
	}
	
	.fui-line {
	    height: auto;
	    display: block;
	    position: relative;
	    background: inherit;
	    text-align: center;
	}
	
	.fui-line:before {
	    content: " ";
	    position: absolute;
	    top: 50%;
	    left: 0;
	    width: 100%;
	    height: 1px;
	    background: #d5d5d5;
	}
	
	.fui-line .text {
	    height: 100%;
	    width: 150rpx;
	    margin: auto;
	    background: inherit;
	    font-size: 28rpx;
	    display: inline-block;
	    position: relative;
	}
	
	.fui-line .text.big {
	    font-size: 33rpx;
	}
	
	.fui-line .text.large {
	    font-size: 41rpx;
	}
	
	.fui-labeltext {
	    position: relative;
	    border: 1px solid #d9d9d9;
	    display: table-cell;
	    border-radius: 8rpx;
	    height: 60rpx;
	}
	
	.fui-labeltext.fui-labeltext-success {
	    border: 1px solid #04ab02;
	}
	
	.fui-labeltext.fui-labeltext-primary {
	    border: 1px solid #0290be;
	}
	
	.fui-labeltext.fui-labeltext-warning {
	    border: 1px solid #ff9326;
	}
	
	.fui-labeltext.fui-labeltext-danger {
	    border: 1px solid #ef4f4f;
	}
	
	.fui-labeltext .label {
	    background: #d9d9d9;
	    font-size: 30rpx;
	    float: left;
	    height: 60rpx;
	    line-height: 60rpx;
	    padding: 0 8rpx;
	}
	
	.fui-labeltext.fui-labeltext-success .label {
	    background: #04ab02;
	    color: #fff;
	}
	
	.fui-labeltext.fui-labeltext-primary .label {
	    background: #0290be;
	    color: #fff;
	}
	
	.fui-labeltext.fui-labeltext-warning .label {
	    background: #ff9326;
	    color: #fff;
	}
	
	.fui-labeltext.fui-labeltext-danger .label {
	    background: #ef4f4f;
	    color: #fff;
	}
	
	.fui-labeltext .text {
	    float: left;
	    height: 60rpx;
	    line-height: 60rpx;
	    padding: 0 8rpx;
	}
	
	.fui-modal {
	    position: fixed;
	    top: auto;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    width: 100%;
	    z-index: 1001;
	}
	
	.fui-modal.picker-modal {
	    left: 0;
	    bottom: 0;
	    transform: translate3d(0,100%,0);
	    transition-property: transform;
	    transition-property: transform,-webkit-transform;
	}
	
	.fui-modal.picker-modal.in {
	    transition-duration: 300ms;
	    transform: translate3d(0,0,0);
	}
	
	.fui-modal.picker-modal.out {
	    bottom: -200rpx;
	    transition-duration: 300ms;
	    transform: translate3d(0,100%,0);
	}
	
	.fui-modal.popup-modal {
	    left: 0;
	    bottom: 0;
	    top: 0;
	    transform: translate3d(0,100%,0);
	    transition-property: transform;
	    transition-property: transform,-webkit-transform;
	}
	
	.fui-modal.popup-modal.in {
	    transition-duration: 300ms;
	    transform: translate3d(0,0,0);
	}
	
	.fui-modal.popup-modal.out {
	    transition-duration: 300ms;
	    transform: translate3d(0,100%,0);
	}
	
	.fui-modal.notify-modal {
	    position: absolute;
	    top: 0;
	    text-align: center;
	    width: 100%;
	    height: auto;
	    transform: translate3d(0,-100%,0);
	    z-index: 1001;
	}
	
	.fui-modal.notify-modal.in {
	    transition-duration: 300ms;
	    transform: translate3d(0,0,0);
	}
	
	.fui-modal.notify-modal.out {
	    transition-duration: 300ms;
	    transform: translate3d(0,-100%,0);
	}
	
	.fui-picker {
	    position: absolute;
	    width: 100%;
	    left: 0;
	    top: auto;
	    bottom: 0;
	    right: 0;
	    background: #fff;
	    z-index: 120;
	}
	
	.fui-picker-header {
	    height: 80rpx;
	    width: 100%;
	    box-sizing: border-box;
	    font-size: 32rpx;
	    position: relative;
	    margin: 0;
	    z-index: 500;
	    backface-visibility: hidden;
	    background: #fff;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    -webkit-align-items: center;
	}
	
	.fui-picker-header:before {
	    content: "";
	    position: absolute;
	    left: 0;
	    top: -1px;
	    width: 100%;
	    height: 1px;
	    border-bottom: 1px solid #D9D9D9;
	    transform-origin: 0 100%;
	    transform: scaleY(0.5);
	}
	
	.fui-picker-header .center {
	    -webkit-box-flex: 1;
	    flex: 1;
	    margin: 0 20rpx;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    line-height: 80rpx;
	    color: #333;
	    text-align: center;
	}
	
	.fui-picker-header .left {
	    padding-left: 12rpx;
	    line-height: 80rpx;
	}
	
	.fui-picker-header .right {
	    padding-right: 12rpx;
	    line-height: 80rpx;
	}
	
	.fui-picker-content {
	    max-height: 500rpx;
	    position: relative;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    padding: 10rpx;
	    margin-bottom: 20rpx;
	    overflow-y: scroll;
	}
	
	.fui-tab-scroll {
	    height: 80rpx;
	    background: #fff;
	    position: relative;
	    white-space: nowrap;
	    display: flex;
	}
	
	.fui-tab-scroll:after {
	    content: "";
	    height: 2rpx;
	    width: 100%;
	    background: #efefef;
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    z-index: 2;
	}
	
	.fui-tab-scroll.fixed {
	    position: fixed;
	    top: 0;
	    z-index: 1000;
	}
	
	.fui-tab-scroll .item {
	    height: 80rpx;
	    width: auto;
	    line-height: 80rpx;
	    color: #666;
	    padding: 0 20rpx;
	    font-size: 28rpx;
	    display: inline-block;
	}
	
	.fui-tab-scroll .item.active {
	    color: #ff5555;
	    position: relative;
	    z-index: 10;
	}
	
	.fui-tab-scroll .item.active:before {
	    content: "";
	    height: 4rpx;
	    width: 100%;
	    background: #fe5455;
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    z-index: 1;
	}
	
	.fui-dot {
	    height: 80rpx;
	    width: 80rpx;
	    position: fixed;
	    right: 20rpx;
	    bottom: 60rpx;
	    background: rgba(0,0,0,0.5);
	    border-radius: 80rpx;
	    z-index: 999;
	    text-align: center;
	    line-height: 80rpx;
	}
	
	.fui-dot image {
	    height: 50rpx;
	    width: 50rpx;
	    vertical-align: middle;
	}
	
	.bigprice {
	    font-size: 30rpx;
	}
	
	.diyform-container .fui-cell-label {
	    align-self: flex-start;
	}
	
	.btn.mtop {
	    margin-top: 1rem;
	}
	
	.fui-list.no-border::before {
	    display: none;
	}
	
	.fui-list.no-border::after {
	    display: none;
	}
	
	.voice {
	    width: 60rpx;
	    height: 60rpx;
	    position: absolute;
	    top: 50rpx;
	    right: 30rpx;
	}
	
	.mc {
	    width: auto;
	    height: auto;
	    position: absolute;
	    bottom: 80rpx;
	    left: 50%;
	    margin-left: -105rpx;
	}
	
	.mc cover-view,.mc view {
	    display: inline-block;
	    color: #ff5555;
	    width: 100rpx;
	    height: 44rpx;
	    border-radius: 20rpx;
	    text-align: center;
	    line-height: 44rpx;
	    float: left;
	    background: rgba(255,255,255,0.6);
	    margin: 0 10rpx;
	    font-size: 22rpx;
	}
	
	.mc cover-view.active,.mc view.active {
	    color: #ffffff;
	    background: #ff5555;
	}
	
	.goods-advs.block,.video.block {
	    display: block;
	}
	
	.goods-advs.none,.video.none {
	    display: none;
	}
	
	cover-image {
	    position: absolute;
	    width: 100%;
	    height: 100%;
	}
	
	.goods-detail-goods #myVideo {
	    position: absolute;
	    top: 0;
	    left: 0;
	}
	
	.goods-detail-goods .bg,.cover .bg {
	    position: absolute;
	    left: 0;
	    top: 0;
	}
	
	.goods-detail-goods .play,.cover .play {
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    margin-top: -70rpx;
	    margin-left: -70rpx;
	}
	
	.flex {
	    display: -ms-flexbox;
	    display: flex;
	}
	
	.flex1 {
	    -webkit-box-flex: 1;
	    flex: 1;
	}
	
	.goods-Commission {
	    position: absolute;
	    height: 36rpx;
	    line-height: 36rpx;
	    text-align: center;
	    width: 100%;
	    bottom: 0;
	    color: #fff;
	    font-size: 20rpx;
	    font-weight: bold;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    background: linear-gradient(to right,#f0b938 0%,#f09938 100%);
	    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#fff0b938, endColorstr=#fff09938,gradientType='1');
	}
	
	.fui-goods-group.block .goods-Commission {
	    height: 44rpx;
	    line-height: 44rpx;
	    font-size: 22rpx;
	}
	
	.fui-swiper-menu.wx-swiper-dot {
	    position: absolute;
	    bottom: -50rpx;
	}
	
	.badge {
	    background-color: #ff5555;
	    border-radius: 200rpx;
	    color: #fff;
	    display: inline-block;
	    font-size: 24rpx;
	    line-height: 1;
	    padding: 6rpx 18rpx 6rpx;
	}
	
	.badge.badge-success {
	    background: #04ab02;
	    color: #fff;
	}
	
	.badge.badge-primary {
	    background: #0290be;
	    color: #fff;
	}
	
	.badge.badge-danger {
	    background: #ef4f4f;
	    color: #fff;
	}
	
	.badge.badge-warning {
	    background: #ff8000;
	    color: #fff;
	}
	
	.pull-right {
	    float: right;
	}
	
	.pull-left {
	    float: left;
	}
	
	.text-white {
	    color: #fff;
	}
	
	.text-default {
	    color: #666;
	}
	
	.text-cancel {
	    color: #999;
	}
	
	.text-success {
	    color: #04ab02;
	}
	
	.text-primary {
	    color: #0290be;
	}
	
	.text-warning {
	    color: #ff8000;
	}
	
	.text-danger {
	    color: #ff5555;
	}
	
	.text-left {
	    text-align: left;
	}
	
	.text-center {
	    text-align: center;
	}
	
	.text-right {
	    text-align: right;
	}
	
	.text-bold {
	    font-weight: bold;
	}
	
	.text-delete {
	    color: #999;
	    text-decoration: line-through;
	}
	
	.zoom-90 {
	    zoom: 90%;
	}
	
	.zoom-80 {
	    zoom: 80%;
	}
	
	.zoom-70 {
	    zoom: 70%;
	}
	
	.zoom-60 {
	    zoom: 60%;
	}
	
	.zoom-50 {
	    zoom: 50%;
	}
	
	radio,image {
	    vertical-align: middle;
	}
	
	image {
	    height: 60rpx;
	    width: 180rpx;
	}
	
	.wxParse-img {
	    width: 100%;
	}
	
	.switch-80 {
	    transform: scale(0.8,0.8);
	}
	
	.image-88 {
	    width: 88rpx;
	    height: 88rpx;
	}
	
	.image-64 {
	    width: 64rpx;
	    height: 64rpx;
	}
	
	.image-40 {
	    width: 40rpx;
	    height: 40rpx;
	}
	
	.image-48 {
	    width: 48rpx;
	    height: 48rpx;
	}
	
	.image-50 {
	    width: 50rpx;
	    height: 50rpx;
	}
	
	.image-32 {
	    width: 32rpx;
	    height: 32rpx;
	}
	
	.image-28 {
	    width: 28rpx;
	    height: 28rpx;
	}
	
	.align-middle {
	    vertical-align: middle;
	}
	
	.icon20 {
	    width: 40rpx;
	    height: 40rpx;
	    vertical-align: sub;
	}
	
	.butbtn {
	    width: 100%;
	    height: 90rpx;
	    display: block;
	    border: none;
	    border-radius: 0px;
	}
	
	.butbtn:after {
	    border: none;
	    border-radius: 0px;
	}
	
	.butbtn.butbtn-warning {
	    background: #ef4f4f;
	    color: #fff;
	}
	
	.weui-flex {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	}
	
	.weui-flex__item {
	    -webkit-box-flex: 1;
	    flex: 1;
	}
	
	.weui-search-bar__form {
	    position: relative;
	    -webkit-box-flex: 1;
	    flex: auto;
	    border-radius: 10rpx;
	    background: #FFFFFF;
	    border: 1rpx solid #E6E6EA;
	}
	
	.weui-search-bar__box {
	    transform: translate3d(0,50,0);
	    transition: width .3s;
	    margin-right: 0;
	    position: relative;
	}
	
	.weui-search-bar__input {
	    height: 56rpx;
	    line-height: 56rpx;
	    font-size: 28rpx;
	}
	
	.weui-icon-clear {
	    position: absolute;
	    top: 0;
	    right: 0;
	    padding: 14rpx 16rpx;
	    font-size: 0;
	}
	
	.checkbox-label {
	    padding-right: 20rpx;
	}
	
	#address {
	    position: fixed;
	    background: rgba(0,0,0,0.5) none repeat scroll 0 0;
	    width: 100%;
	    height: 100%;
	    left: 0;
	    top: 0;
	    z-index: 1000;
	    transition: all 1s;
	}
	
	#address.shut {
	}
	
	#address.shut .address-alert {
	}
	
	#address .address-alert {
	    position: absolute;
	    top: 200rpx;
	    left: 32rpx;
	    right: 32rpx;
	    background: #fff;
	    border-radius: 12rpx;
	    transition: all 2s;
	}
	
	#address .address-title {
	    height: 105.8rpx;
	    line-height: 105.8rpx;
	    text-align: center;
	    color: #ff5555;
	    font-size: 26rpx;
	}
	
	#address .fui-cell {
	    padding: 20rpx 33rpx;
	}
	
	#address .fui-cell-group:not(.fui-cell-group-o):before {
	    left: 33rpx;
	    right: 33rpx;
	    width: auto;
	}
	
	#address .fui-cell-group .fui-cell:before {
	    left: 33rpx;
	    right: 33rpx;
	}
	
	#address .fui-cell-group .fui-cell-textarea {
	    height: 120rpx;
	}
	
	#btn-submit {
	    margin: 40rpx 33rpx;
	}
	
	#address .fui-cell-group:after {
	    left: 33rpx;
	    right: 33rpx;
	    width: auto;
	}
	
	#attention {
	    position: fixed;
	    background: rgba(0,0,0,0.5) none repeat scroll 0 0;
	    width: 100%;
	    height: 100%;
	    left: 0;
	    top: 0;
	    z-index: 1000;
	    transition: all 1s;
	}
	
	#attention .attention-alert {
	    position: absolute;
	    top: 200rpx;
	    left: 80rpx;
	    right: 80rpx;
	    background: #fff;
	    border-radius: 12rpx;
	    height: 672rpx;
	    width: 592rpx;
	}
	
	#attention .attention-alert .attention-img {
	    width: 160rpx;
	    height: 160rpx;
	    border-radius: 50%;
	    position: absolute;
	    top: -80rpx;
	    left: 50%;
	    margin-left: -80rpx;
	    overflow: hidden;
	}
	
	#attention .attention-alert .attention-img img {
	    width: 100%;
	    height: 100%;
	}
	
	#attention .attention-alert .attention-title {
	    width: 452rpx;
	    text-align: center;
	    margin: 120rpx auto 48rpx;
	}
	
	#attention .attention-alert .attention-content {
	    margin: 0 48rpx;
	    padding: 40rpx 32rpx;
	    background: #f7f7f7;
	    height: 356rpx;
	}
	
	#attention .attention-alert .attention-content p {
	    text-align: center;
	    font-size: 26rpx;
	    color: #999;
	    margin-top: 28rpx;
	}
	
	#unpaid {
	    position: fixed;
	    background: rgba(0,0,0,0.5) none repeat scroll 0 0;
	    width: 100%;
	    height: 100%;
	    left: 0;
	    top: 0;
	    z-index: 1000;
	    transition: all 1s;
	}
	
	#unpaid .unpaid-alert {
	    position: absolute;
	    top: 200rpx;
	    left: 44rpx;
	    right: 44rpx;
	    background: #fff;
	    border-radius: 12rpx;
	    height: 814rpx;
	}
	
	#unpaid .unpaid-alert .unpaid-title {
	    font-size: 30rpx;
	    text-align: center;
	    margin-top: 52rpx;
	}
	
	#unpaid .unpaid-alert .unpaid-subtitle {
	    color: #999;
	    text-align: center;
	    width: 440rpx;
	    margin: 24rpx auto;
	}
	
	#unpaid .unpaid-alert .subtitle {
	    display: block;
	    font-size: 26rpx;
	}
	
	#unpaid .unpaid-alert .fui-list-group {
	    padding: 15rpx 22rpx 0;
	    margin: 0 30rpx;
	    background: #f7f7f7;
	}
	
	#unpaid .unpaid-alert .fui-list-group .fui-list {
	    padding: 15rpx 0;
	}
	
	#unpaid .unpaid-alert .fui-list-group .fui-list:last-child {
	    font-size: 24rpx;
	    color: #666;
	    justify-content: center;
	}
	
	#unpaid .unpaid-alert .fui-list-group .fui-list:last-child:before {
	    display: block;
	}
	
	#unpaid .unpaid-alert .fui-list-inner {
	    height: 100rpx;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    flex-direction: column;
	    justify-content: space-between;
	}
	
	#unpaid .unpaid-alert img {
	    width: 100rpx;
	    float: left;
	}
	
	#unpaid .unpaid-alert .fui-list-inner .price {
	    line-height: 1;
	}
	
	#unpaid .unpaid-alert .fui-list-inner .bigprice {
	    font-size: 30rpx;
	}
	
	#unpaid .unpaid-alert .fui-list-group .fui-list:before {
	    display: none;
	}
	
	#unpaid .unpaid-alert .block {
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    margin: 0;
	    border-top-left-radius: 0;
	    border-top-right-radius: 0;
	    height: 86rpx;
	}
	
	#giveUp {
	    position: fixed;
	    background: rgba(0,0,0,0.5) none repeat scroll 0 0;
	    width: 100%;
	    height: 100%;
	    left: 0;
	    top: 0;
	    z-index: 1000;
	    transition-duration: 400ms;
	}
	
	#giveUp .giveUp-alert {
	    position: absolute;
	    top: 400rpx;
	    left: 94rpx;
	    right: 94rpx;
	    background: #fff;
	    border-radius: 12rpx;
	    height: 282rpx;
	    overflow: hidden;
	}
	
	#giveUp .giveUp-title {
	    font-size: 32rpx;
	    text-align: center;
	    margin-top: 56rpx;
	}
	
	#giveUp .giveUp-subtitle {
	    color: #999;
	    text-align: center;
	    width: 440rpx;
	    font-size: 26rpx;
	    margin: 12rpx auto;
	}
	
	#giveUp .giveUp-btn {
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	    position: absolute;
	    left: 0;
	    right: 0;
	    bottom: 0;
	}
	
	#giveUp .giveUp-btn .btn {
	    width: 0;
	    -webkit-box-flex: 1;
	    flex: 1;
	    margin: 0;
	    border-radius: 0;
	    height: 85rpx;
	}
	
	#giveUp .giveUp-btn .btn.confirm {
	    border-left: 0;
	    color: #ff5555;
	}
	
	.shut {
	    transform: scale(0);
	    transform-origin: right bottom;
	}
	
	.radiolabel {
	    display: inline-block;
	    padding-right: 20rpx;
	    padding-bottom: 10rpx;
	}
	
	.radiolabel .wx-radio-input {
	    display: inline-block;
	    width: 40rpx;
	    height: 40rpx;
	}
	
	.suspended-service,.suspended-service:after,.suspended-service:before {
	    border: none;
	}
	
	.suspended-service,.phone {
	    width: 90rpx;
	    height: 90rpx;
	    background: #ff5555;
	    position: fixed;
	    right: 20rpx;
	    bottom: 80rpx;
	    border-radius: 50%;
	    text-align: center;
	    padding: 0;
	    line-height: 90rpx;
	}
	
	.phone {
	    bottom: 190rpx;
	}
	
	.suspended-service .icox,.phone .icox {
	    font-size: 50rpx;
	    color: #fff;
	}
	

	
	.icox {
	    font-family: "icox"!important;
	    font-size: 16px;
	    font-style: normal;
	    -webkit-font-smoothing: antialiased;
	    -moz-osx-font-smoothing: grayscale;
	}
	
	.icox-close:before {
	    content: "\e602";
	}
	
	.icox-roundclose:before {
	    content: "\e60e";
	}
	
	.icox-search:before {
	    content: "\e611";
	}
	
	.icox-likefill:before {
	    content: "\e61c";
	}
	
	.icox-like:before {
	    content: "\e61d";
	}
	
	.icox-shop:before {
	    content: "\e627";
	}
	
	.icox-footprint:before {
	    content: "\e639";
	}
	
	.icox-cart:before {
	    content: "\e642";
	}
	
	.icox-cartfill:before {
	    content: "\e648";
	}
	
	.icox-vip:before {
	    content: "\e650";
	}
	
	.icox-add:before {
	    content: "\e662";
	}
	
	.icox-service:before {
	    content: "\e682";
	}
	
	.icox-shijian1:before {
	    content: "\e6a9";
	}
	
	.icox-app:before {
	    content: "\e6ef";
	}
	
	.icox-history:before {
	    content: "\e710";
	}
	
	.icox-notification:before {
	    content: "\e721";
	}
	
	.icox-toleft:before {
	    content: "\e739";
	}
	
	.icox-delete:before {
	    content: "\e75b";
	}
	
	.icox-edit:before {
	    content: "\e75c";
	}
	
	.icox-viewlist:before {
	    content: "\e772";
	}
	
	.icox-icon02:before {
	    content: "\e80d";
	}
	
	.icox-gifts:before {
	    content: "\e788";
	}
	
	.icox-icon049:before {
	    content: "\e7f1";
	}
	
	.icox-share:before {
	    content: "\e612";
	}
	
	.icox-navlist:before {
	    content: "\e79f";
	}
	
	.icox-tianjiazhuanhuan:before {
	    content: "\e670";
	}
	
	.icox-jifen:before {
	    content: "\e7ab";
	}
	
	.icox-heilongjiangtubiao11:before {
	    content: "\e81c";
	}
	
	.icox-phone:before {
	    content: "\e7bc";
	}
	
	.icox-1:before {
	    content: "\e626";
	}
	
	.icox-2:before {
	    content: "\e629";
	}
	
	.icox-3:before {
	    content: "\e62e";
	}
	
	.icox-dingdan2:before {
	    content: "\e80a";
	}
	
	.icox-erweima1:before {
	    content: "\e81d";
	}
	
	.icox-huiyuan1:before {
	    content: "\e820";
	}
	
	.icox-accountfilling:before {
	    content: "\e7c2";
	}
	
	.icox-xiugai:before {
	    content: "\e83c";
	}
	
	.icox-gouwuche:before {
	    content: "\e63f";
	}
	
	.icox-gouwuchetianjia:before {
	    content: "\e640";
	}
	
	.icox-lajixiang:before {
	    content: "\e645";
	}
	
	.icox-naozhong:before {
	    content: "\e64a";
	}
	
	.icox-shezhi:before {
	    content: "\e64b";
	}
	
	.icox-shijian:before {
	    content: "\e64d";
	}
	
	.icox-shouhuodizhi:before {
	    content: "\e64e";
	}
	
	.icox-shouye:before {
	    content: "\e64f";
	}
	
	.icox-sousuo:before {
	    content: "\e654";
	}
	
	.icox-wodeyouhuiquan:before {
	    content: "\e65a";
	}
	
	.icox-yijianfankui:before {
	    content: "\e664";
	}
	
	.icox-lingcunwei:before {
	    content: "\e666";
	}
	
	.icox-focus1:before {
	    content: "\e8cf";
	}
	
	.icox-huoche:before {
	    content: "\e776";
	}
	
	.icox-duihao:before {
	    content: "\e603";
	}
	
	.icox-shouhuodizhi1:before {
	    content: "\e64c";
	}
	
	.icox-zhuyi:before {
	    content: "\e61f";
	}
	
	.icox-guanbi-copy:before {
	    content: "\e604";
	}
	
	.icox-bofang:before {
	    content: "\e60a";
	}
	
	.icox-liwu:before {
	    content: "\e685";
	}
	
	.icox-weibiaoti519:before {
	    content: "\e617";
	}
	
	.icox-zhifubao:before {
	    content: "\e613";
	}
	
	.icox-haoping:before {
	    content: "\e636";
	}
	
	.icox-haoping1:before {
	    content: "\e647";
	}
	
	.icox-shouhuodizhi2:before {
	    content: "\e641";
	}
	
	.icox-weixinzhifu:before {
	    content: "\e7b0";
	}
	
	.icox-duihao2:before {
	    content: "\e69e";
	}
	
	.icox-fenlei:before {
	    content: "\e6b0";
	}
	
	.icox-xing:before {
	    content: "\e7fa";
	}
	
	.icox-dianpu1:before {
	    content: "\e82c";
	}
	
	.icox-fenlei1:before {
	    content: "\e82b";
	}
	
	.icox-kefu2:before {
	    content: "\e655";
	}
	
	.icox-qian:before {
	    content: "\e80b";
	}
	
	.icox-yinhangqia:before {
	    content: "\e621";
	}
	
	.icox-duihao1:before {
	    content: "\e614";
	}
	
	.icox-suo:before {
	    content: "\e676";
	}
	
	.icox-gonggao:before {
	    content: "\e606";
	}
	
	.icox-hongbao:before {
	    content: "\e62d";
	}
	
	.icox-yaoqingma:before {
	    content: "\e809";
	}
	
	.icox-taiyang1:before {
	    content: "\e92e";
	}
	
	.icox-dianhua:before {
	    content: "\e834";
	}
	
	.icox-tixian1:before {
	    content: "\e81a";
	}
	
	.icox-youhuiquan:before {
	    content: "\e835";
	}
	
	.icox-shouji:before {
	    content: "\e643";
	}
	
	.icox-shezhi1:before {
	    content: "\e836";
	}
	
	.icox-haoping2:before {
	    content: "\e631";
	}
	
	.icox-xiangmuzhouqi:before {
	    content: "\e839";
	}
	
	.icox-activity:before {
	    content: "\e6de";
	}
	
	.icox-addition_fill:before {
	    content: "\e6e0";
	}
	
	.icox-coordinates:before {
	    content: "\e6ec";
	}
	
	.icox-coupons:before {
	    content: "\e6ed";
	}
	
	.icox-feedback:before {
	    content: "\e72d";
	}
	
	.icox-like1:before {
	    content: "\e709";
	}
	
	.icox-mobilephone:before {
	    content: "\e70f";
	}
	
	.icox-offline:before {
	    content: "\e712";
	}
	
	.icox-order:before {
	    content: "\e713";
	}
	
	.icox-qrcode:before {
	    content: "\e71c";
	}
	
	.icox-send:before {
	    content: "\e726";
	}
	
	.icox-setup:before {
	    content: "\e728";
	}
	
	.icox-icon_huida_tianxiebtn:before {
	    content: "\e837";
	}
	
	.icox-star:before {
	    content: "\e802";
	}
	
	.icox-fenxiang:before {
	    content: "\e605";
	}
	
	.icox-dianpu:before {
	    content: "\e68c";
	}
	
	.icox-arrow-down:before {
	    content: "\e838";
	}
	
	.icox-huiyuan:before {
	    content: "\e66b";
	}
	
	.icox-fenxiao:before {
	    content: "\e600";
	}
	
	.icox-guanbi1:before {
	    content: "\e83a";
	}
	
	.icox-huiyuan2:before {
	    content: "\e83d";
	}
	
	.icox-kefu:before {
	    content: "\e625";
	}
	
	.icox-shoucang:before {
	    content: "\e628";
	}
	
	.icox-daifahuo1:before {
	    content: "\e808";
	}
	
	.icox-qiandao:before {
	    content: "\e810";
	}
	
	.icox-xiaofei:before {
	    content: "\e817";
	}
	
	.icox-bangzhuzhongxin:before {
	    content: "\e7f2";
	}
	
	.icox-dingwei1:before {
	    content: "\e7f3";
	}
	
	.icox-guanzhu:before {
	    content: "\e7f4";
	}
	
	.icox-gouwuche3:before {
	    content: "\e7f5";
	}
	
	.icox-zuji:before {
	    content: "\e7f6";
	}
	
	.icox-dingdan1:before {
	    content: "\e7f7";
	}
	
	.icox-lingquyouhuiquan1:before {
	    content: "\e7f9";
	}
	
	.icox-fenxiao2:before {
	    content: "\e7fc";
	}
	
	.icox-shouji1:before {
	    content: "\e7fd";
	}
	
	.icox-daituikuan2:before {
	    content: "\e7fe";
	}
	
	.icox-daishouhuo1:before {
	    content: "\e800";
	}
	
	.icox-daifukuan1:before {
	    content: "\e801";
	}
	
	.icox-tixian:before {
	    content: "\e805";
	}
	
	.icox-qianjin-copy:before {
	    content: "\e92f";
	}
	
	.icox-qianjin-copy-copy:before {
	    content: "\e930";
	}
	
	.icox-gouwuche4:before {
	    content: "\e82d";
	}
	
	.icox-customerservice:before {
	    content: "\e60f";
	}
	
	.icox-collection:before {
	    content: "\e610";
	}
	
	.icox-cart1:before {
	    content: "\e616";
	}
	
	.icox-send1:before {
	    content: "\e619";
	}
	
	.icox-homepage:before {
	    content: "\e61a";
	}
	
	.icox-people:before {
	    content: "\e61b";
	}
	
	.icox-collection_fill:before {
	    content: "\e61e";
	}
	
	.icox-systemprompt:before {
	    content: "\e620";
	}
	
	.icox-systemprompt1:before {
	    content: "\e622";
	}
	
	.icox-cart2:before {
	    content: "\e62c";
	}
	
	.icox-cart_fill:before {
	    content: "\e62b";
	}
	
	.icox-shipment:before {
	    content: "\e637";
	}
	
	.icox-payment:before {
	    content: "\e638";
	}
	
	.icox-details:before {
	    content: "\e635";
	}
	
	.icox-distribution:before {
	    content: "\e63a";
	}
	
	.icox-return:before {
	    content: "\e63b";
	}
	
	.icox-foot:before {
	    content: "\e63e";
	}
	
	.icox-call:before {
	    content: "\e63c";
	}
	
	.icox-shop1:before {
	    content: "\e63d";
	}
	
	.icox-daishouhuo1-copy-copy:before {
	    content: "\e932";
	}
	
	.icox-xiaofei1:before {
	    content: "\e646";
	}
	
	.icox-shouye1:before {
	    content: "\e623";
	}
	
	.icox-yigoumai:before {
	    content: "\e624";
	}
	
	.icox-kanjiazhong:before {
	    content: "\e651";
	}
	
	.icox-quanbukanjia:before {
	    content: "\e652";
	}
	
	.icox-gengduocopy:before {
	    content: "\e6a3";
	}
	
	.icox-bargain:before {
	    content: "\e671";
	}
	
	.icox-miaoshashouye:before {
	    content: "\e644";
	}
	
	.icox-gouwuche1:before {
	    content: "\e649";
	}
	
	.icox-wodedingdan:before {
	    content: "\e653";
	}
	
	.icox-wode:before {
	    content: "\e65d";
	}
	
	.icox-huodongfenlei:before {
	    content: "\e65e";
	}
	
	.icox-home:before {
	    content: "\e65f";
	}
	
	.icox-wodedingdan1:before {
	    content: "\e660";
	}
	
	.icox-fanhuishangcheng:before {
	    content: "\e683";
	}
	
	.icox-chenggongtixianyongjin:before {
	    content: "\e661";
	}
	
	.icox-daishouhuoyongjin:before {
	    content: "\e663";
	}
	
	.icox-daidakuanyongjin:before {
	    content: "\e665";
	}
	
	.icox-weijiesuanyongjin:before {
	    content: "\e667";
	}
	
	.icox-ketixianyongjin:before {
	    content: "\e668";
	}
	
	.icox-wuxiaoyongjin:before {
	    content: "\e669";
	}
	
	.icox-yishenqingyongjin:before {
	    content: "\e66a";
	}
	
	.icox-fenxiaodingdan:before {
	    content: "\e66c";
	}
	
	.icox-wodetuandui:before {
	    content: "\e66d";
	}
	
	.icox-tixianmingxi:before {
	    content: "\e66e";
	}
	
	.icox-fenxiaoyongjin:before {
	    content: "\e66f";
	}
	
	.icox-xiaodianshezhi:before {
	    content: "\e672";
	}
	
	.icox-yongjinpaiming:before {
	    content: "\e673";
	}
	
	.icox-zixuanshangpin:before {
	    content: "\e674";
	}
	
	.icox-tequan:before {
	    content: "\e675";
	}
	
	.icox-back:before {
	    content: "\e684";
	}
	
	.icox-fenxiaoyongjin1:before {
	    content: "\e677";
	}
	
	.icox-wodetuandui1:before {
	    content: "\e678";
	}
	
	.icox-wodexiaodian:before {
	    content: "\e679";
	}
	
	.icox-home1:before {
	    content: "\e67a";
	}
	
	.icox-fenxiaodingdan1:before {
	    content: "\e67b";
	}
	
	.icox-wodetuandui2:before {
	    content: "\e67c";
	}
	
	.icox-tuanduifenhong:before {
	    content: "\e67d";
	}
	
	.icox-tuanduifenhong1:before {
	    content: "\e67e";
	}
	
	.icox-tishi:before {
	    content: "\e67f";
	}
	
	.icox-huangguan-line:before {
	    content: "\e681";
	}
	
	.icox-huiyuanzhuanxiangzhekou:before {
	    content: "\e686";
	}
	
	.icox-jingqingqidai:before {
	    content: "\e687";
	}
	
	.icox-kaiqiajifen:before {
	    content: "\e688";
	}
	
	.icox-kaiqiasongquan:before {
	    content: "\e689";
	}
	
	.icox-meiyuelingquan:before {
	    content: "\e68a";
	}
	
	.icox-meiyuejifen:before {
	    content: "\e68b";
	}
	
	.icox-mianfeibaoyou:before {
	    content: "\e68d";
	}
	
	.icox-queshengye:before {
	    content: "\e68e";
	}
	
	.icox-tejiashangpin:before {
	    content: "\e68f";
	}
	
	.icox-zhekoutequan:before {
	    content: "\e690";
	}
	
	.icox-huangguan:before {
	    content: "\e691";
	}
	
	.icox-huangguan1:before {
	    content: "\e692";
	}
	
	@font-face {
	    font-family:'icon';src:url('//at.alicdn.com/t/font_82607_v6pourg54pq.eot');src:url('//at.alicdn.com/t/font_82607_v6pourg54pq.eot?#iefix') format('embedded-opentype'),url('//at.alicdn.com/t/font_82607_v6pourg54pq.woff2') format('woff2'),url('//at.alicdn.com/t/font_82607_v6pourg54pq.woff') format('woff'),url('//at.alicdn.com/t/font_82607_v6pourg54pq.ttf') format('truetype'),url('//at.alicdn.com/t/font_82607_v6pourg54pq.svg#icon') format('svg');
	}
	
	.icon {
	    font-family: "icon"!important;
	    font-size: 16px;
	    font-style: normal;
	    -webkit-font-smoothing: antialiased;
	    -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-gouwuche:before {
	    content: "\e80c";
	}
	
	.icon-liebiao:before {
	    content: "\e7e0";
	}
	
	.icon-appreciate:before {
	    content: "\e600";
	}
	
	.icon-check:before {
	    content: "\e601";
	}
	
	.icon-close:before {
	    content: "\e602";
	}
	
	.icon-edit:before {
	    content: "\e603";
	}
	
	.icon-emoji:before {
	    content: "\e604";
	}
	
	.icon-favorfill:before {
	    content: "\e605";
	}
	
	.icon-favor:before {
	    content: "\e606";
	}
	
	.icon-loading:before {
	    content: "\e607";
	}
	
	.icon-locationfill:before {
	    content: "\e608";
	}
	
	.icon-location:before {
	    content: "\e609";
	}
	
	.icon-phone:before {
	    content: "\e60a";
	}
	
	.icon-roundcheckfill:before {
	    content: "\e60b";
	}
	
	.icon-roundcheck:before {
	    content: "\e60c";
	}
	
	.icon-roundclosefill:before {
	    content: "\e60d";
	}
	
	.icon-roundclose:before {
	    content: "\e60e";
	}
	
	.icon-roundrightfill:before {
	    content: "\e60f";
	}
	
	.icon-roundright:before {
	    content: "\e610";
	}
	
	.icon-search:before {
	    content: "\e611";
	}
	
	.icon-taxi:before {
	    content: "\e612";
	}
	
	.icon-timefill:before {
	    content: "\e613";
	}
	
	.icon-time:before {
	    content: "\e614";
	}
	
	.icon-unfold:before {
	    content: "\e615";
	}
	
	.icon-warnfill:before {
	    content: "\e616";
	}
	
	.icon-warn:before {
	    content: "\e617";
	}
	
	.icon-camerafill:before {
	    content: "\e618";
	}
	
	.icon-camera:before {
	    content: "\e619";
	}
	
	.icon-commentfill:before {
	    content: "\e61a";
	}
	
	.icon-comment:before {
	    content: "\e61b";
	}
	
	.icon-likefill:before {
	    content: "\e61c";
	}
	
	.icon-like:before {
	    content: "\e61d";
	}
	
	.icon-notificationfill:before {
	    content: "\e61e";
	}
	
	.icon-notification:before {
	    content: "\e61f";
	}
	
	.icon-order:before {
	    content: "\e620";
	}
	
	.icon-samefill:before {
	    content: "\e621";
	}
	
	.icon-same:before {
	    content: "\e622";
	}
	
	.icon-deliver:before {
	    content: "\e623";
	}
	
	.icon-evaluate:before {
	    content: "\e624";
	}
	
	.icon-pay:before {
	    content: "\e625";
	}
	
	.icon-send:before {
	    content: "\e626";
	}
	
	.icon-shop:before {
	    content: "\e627";
	}
	
	.icon-ticket:before {
	    content: "\e628";
	}
	
	.icon-back:before {
	    content: "\e629";
	}
	
	.icon-cascades:before {
	    content: "\e62a";
	}
	
	.icon-discover:before {
	    content: "\e62b";
	}
	
	.icon-list:before {
	    content: "\e62c";
	}
	
	.icon-more:before {
	    content: "\e62d";
	}
	
	.icon-myfill:before {
	    content: "\e62e";
	}
	
	.icon-my:before {
	    content: "\e62f";
	}
	
	.icon-scan:before {
	    content: "\e630";
	}
	
	.icon-settings:before {
	    content: "\e631";
	}
	
	.icon-questionfill:before {
	    content: "\e632";
	}
	
	.icon-question:before {
	    content: "\e633";
	}
	
	.icon-shopfill:before {
	    content: "\e634";
	}
	
	.icon-form:before {
	    content: "\e635";
	}
	
	.icon-pic:before {
	    content: "\e637";
	}
	
	.icon-filter:before {
	    content: "\e638";
	}
	
	.icon-footprint:before {
	    content: "\e639";
	}
	
	.icon-top:before {
	    content: "\e63a";
	}
	
	.icon-pulldown:before {
	    content: "\e63b";
	}
	
	.icon-pullup:before {
	    content: "\e63c";
	}
	
	.icon-right:before {
	    content: "\e63d";
	}
	
	.icon-refresh:before {
	    content: "\e63e";
	}
	
	.icon-moreandroid:before {
	    content: "\e63f";
	}
	
	.icon-deletefill:before {
	    content: "\e640";
	}
	
	.icon-refund:before {
	    content: "\e641";
	}
	
	.icon-cart:before {
	    content: "\e642";
	}
	
	.icon-qrcode:before {
	    content: "\e643";
	}
	
	.icon-remind:before {
	    content: "\e644";
	}
	
	.icon-delete:before {
	    content: "\e645";
	}
	
	.icon-profile:before {
	    content: "\e646";
	}
	
	.icon-home:before {
	    content: "\e647";
	}
	
	.icon-cartfill:before {
	    content: "\e648";
	}
	
	.icon-discoverfill:before {
	    content: "\e649";
	}
	
	.icon-homefill:before {
	    content: "\e64a";
	}
	
	.icon-message:before {
	    content: "\e64b";
	}
	
	.icon-addressbook:before {
	    content: "\e64c";
	}
	
	.icon-link:before {
	    content: "\e64d";
	}
	
	.icon-lock:before {
	    content: "\e64e";
	}
	
	.icon-unlock:before {
	    content: "\e64f";
	}
	
	.icon-vip:before {
	    content: "\e650";
	}
	
	.icon-weibo:before {
	    content: "\e651";
	}
	
	.icon-activity:before {
	    content: "\e652";
	}
	
	.icon-big:before {
	    content: "\e653";
	}
	
	.icon-friendaddfill:before {
	    content: "\e654";
	}
	
	.icon-friendadd:before {
	    content: "\e655";
	}
	
	.icon-friendfamous:before {
	    content: "\e656";
	}
	
	.icon-friend:before {
	    content: "\e657";
	}
	
	.icon-goods:before {
	    content: "\e658";
	}
	
	.icon-selection:before {
	    content: "\e659";
	}
	
	.icon-explore:before {
	    content: "\e65a";
	}
	
	.icon-present:before {
	    content: "\e65b";
	}
	
	.icon-squarecheckfill:before {
	    content: "\e65c";
	}
	
	.icon-square:before {
	    content: "\e65d";
	}
	
	.icon-squarecheck:before {
	    content: "\e65e";
	}
	
	.icon-round:before {
	    content: "\e65f";
	}
	
	.icon-roundaddfill:before {
	    content: "\e660";
	}
	
	.icon-roundadd:before {
	    content: "\e661";
	}
	
	.icon-add:before {
	    content: "\e662";
	}
	
	.icon-notificationforbidfill:before {
	    content: "\e663";
	}
	
	.icon-qq:before {
	    content: "\e7dd";
	}
	
	.icon-ico12:before {
	    content: "\e74b";
	}
	
	.icon-explorefill:before {
	    content: "\e664";
	}
	
	.icon-fold:before {
	    content: "\e665";
	}
	
	.icon-game:before {
	    content: "\e666";
	}
	
	.icon-redpacket:before {
	    content: "\e667";
	}
	
	.icon-selectionfill:before {
	    content: "\e668";
	}
	
	.icon-similar:before {
	    content: "\e669";
	}
	
	.icon-appreciatefill:before {
	    content: "\e66a";
	}
	
	.icon-infofill:before {
	    content: "\e66b";
	}
	
	.icon-info:before {
	    content: "\e66c";
	}
	
	.icon-forwardfill:before {
	    content: "\e66d";
	}
	
	.icon-forward:before {
	    content: "\e66e";
	}
	
	.icon-rechargefill:before {
	    content: "\e66f";
	}
	
	.icon-recharge:before {
	    content: "\e670";
	}
	
	.icon-vipcard:before {
	    content: "\e671";
	}
	
	.icon-voice:before {
	    content: "\e672";
	}
	
	.icon-voicefill:before {
	    content: "\e673";
	}
	
	.icon-friendfavor:before {
	    content: "\e674";
	}
	
	.icon-wifi:before {
	    content: "\e675";
	}
	
	.icon-share:before {
	    content: "\e676";
	}
	
	.icon-wefill:before {
	    content: "\e677";
	}
	
	.icon-we:before {
	    content: "\e678";
	}
	
	.icon-lightauto:before {
	    content: "\e679";
	}
	
	.icon-lightforbid:before {
	    content: "\e67a";
	}
	
	.icon-lightfill:before {
	    content: "\e67b";
	}
	
	.icon-camerarotate:before {
	    content: "\e67c";
	}
	
	.icon-light:before {
	    content: "\e67d";
	}
	
	.icon-barcode:before {
	    content: "\e67e";
	}
	
	.icon-flashlightclose:before {
	    content: "\e67f";
	}
	
	.icon-flashlightopen:before {
	    content: "\e680";
	}
	
	.icon-searchlist:before {
	    content: "\e681";
	}
	
	.icon-service:before {
	    content: "\e682";
	}
	
	.icon-sort:before {
	    content: "\e683";
	}
	
	.icon-down:before {
	    content: "\e684";
	}
	
	.icon-mobile:before {
	    content: "\e685";
	}
	
	.icon-mobilefill:before {
	    content: "\e686";
	}
	
	.icon-sanjiao2:before {
	    content: "\e7cf";
	}
	
	.icon-sanjiao1:before {
	    content: "\e7d0";
	}
	
	.icon-sanjiao4:before {
	    content: "\e7d1";
	}
	
	.icon-sanjiao3:before {
	    content: "\e7d2";
	}
	
	.icon-location-area:before {
	    content: "\e7d3";
	}
	
	.icon-copy:before {
	    content: "\e687";
	}
	
	.icon-countdownfill:before {
	    content: "\e688";
	}
	
	.icon-countdown:before {
	    content: "\e689";
	}
	
	.icon-noticefill:before {
	    content: "\e68a";
	}
	
	.icon-notice:before {
	    content: "\e68b";
	}
	
	.icon-qiang:before {
	    content: "\e68c";
	}
	
	.icon-upstagefill:before {
	    content: "\e68d";
	}
	
	.icon-upstage:before {
	    content: "\e68e";
	}
	
	.icon-babyfill:before {
	    content: "\e68f";
	}
	
	.icon-baby:before {
	    content: "\e690";
	}
	
	.icon-brandfill:before {
	    content: "\e691";
	}
	
	.icon-brand:before {
	    content: "\e692";
	}
	
	.icon-choicenessfill:before {
	    content: "\e693";
	}
	
	.icon-choiceness:before {
	    content: "\e694";
	}
	
	.icon-clothesfill:before {
	    content: "\e695";
	}
	
	.icon-clothes:before {
	    content: "\e696";
	}
	
	.icon-creativefill:before {
	    content: "\e697";
	}
	
	.icon-creative:before {
	    content: "\e698";
	}
	
	.icon-female:before {
	    content: "\e699";
	}
	
	.icon-keyboard:before {
	    content: "\e69a";
	}
	
	.icon-male:before {
	    content: "\e69b";
	}
	
	.icon-newfill:before {
	    content: "\e69c";
	}
	
	.icon-new:before {
	    content: "\e69d";
	}
	
	.icon-pullleft:before {
	    content: "\e69e";
	}
	
	.icon-pullright:before {
	    content: "\e69f";
	}
	
	.icon-rankfill:before {
	    content: "\e6a0";
	}
	
	.icon-rank:before {
	    content: "\e6a1";
	}
	
	.icon-bad:before {
	    content: "\e6a2";
	}
	
	.icon-cameraadd:before {
	    content: "\e6a3";
	}
	
	.icon-focus:before {
	    content: "\e6a4";
	}
	
	.icon-friendfill:before {
	    content: "\e6a5";
	}
	
	.icon-cameraaddfill:before {
	    content: "\e6a6";
	}
	
	.icon-rectangle390:before {
	    content: "\e7d9";
	}
	
	.icon-xinyongqiahuankuan:before {
	    content: "\e7da";
	}
	
	.icon-xinjian2:before {
	    content: "\e7ce";
	}
	
	.icon-add1:before {
	    content: "\e6ed";
	}
	
	.icon-answer:before {
	    content: "\e6ee";
	}
	
	.icon-app:before {
	    content: "\e6ef";
	}
	
	.icon-browser:before {
	    content: "\e6f0";
	}
	
	.icon-caller:before {
	    content: "\e6f1";
	}
	
	.icon-camera1:before {
	    content: "\e6f2";
	}
	
	.icon-card:before {
	    content: "\e6f3";
	}
	
	.icon-cart1:before {
	    content: "\e6f4";
	}
	
	.icon-check1:before {
	    content: "\e6f5";
	}
	
	.icon-code:before {
	    content: "\e6f6";
	}
	
	.icon-computer:before {
	    content: "\e6f7";
	}
	
	.icon-copy1:before {
	    content: "\e6f8";
	}
	
	.icon-delete1:before {
	    content: "\e6f9";
	}
	
	.icon-delete2:before {
	    content: "\e6fa";
	}
	
	.icon-deliver1:before {
	    content: "\e6fb";
	}
	
	.icon-display:before {
	    content: "\e6fc";
	}
	
	.icon-down1:before {
	    content: "\e6fd";
	}
	
	.icon-download:before {
	    content: "\e6fe";
	}
	
	.icon-edit1:before {
	    content: "\e6ff";
	}
	
	.icon-emoji1:before {
	    content: "\e700";
	}
	
	.icon-enclosure:before {
	    content: "\e701";
	}
	
	.icon-eraser:before {
	    content: "\e702";
	}
	
	.icon-favor1:before {
	    content: "\e703";
	}
	
	.icon-file:before {
	    content: "\e704";
	}
	
	.icon-file2:before {
	    content: "\e705";
	}
	
	.icon-fill:before {
	    content: "\e706";
	}
	
	.icon-fold1:before {
	    content: "\e707";
	}
	
	.icon-folderadd:before {
	    content: "\e708";
	}
	
	.icon-folder:before {
	    content: "\e709";
	}
	
	.icon-font:before {
	    content: "\e70a";
	}
	
	.icon-friends:before {
	    content: "\e70b";
	}
	
	.icon-goods1:before {
	    content: "\e70c";
	}
	
	.icon-hangup:before {
	    content: "\e70d";
	}
	
	.icon-hide:before {
	    content: "\e70e";
	}
	
	.icon-history:before {
	    content: "\e70f";
	}
	
	.icon-home1:before {
	    content: "\e710";
	}
	
	.icon-information:before {
	    content: "\e711";
	}
	
	.icon-left:before {
	    content: "\e712";
	}
	
	.icon-like1:before {
	    content: "\e713";
	}
	
	.icon-link1:before {
	    content: "\e714";
	}
	
	.icon-loading1:before {
	    content: "\e715";
	}
	
	.icon-location1:before {
	    content: "\e716";
	}
	
	.icon-lock1:before {
	    content: "\e717";
	}
	
	.icon-mail:before {
	    content: "\e718";
	}
	
	.icon-mark:before {
	    content: "\e719";
	}
	
	.icon-menu:before {
	    content: "\e71a";
	}
	
	.icon-message1:before {
	    content: "\e71b";
	}
	
	.icon-more1:before {
	    content: "\e71d";
	}
	
	.icon-music:before {
	    content: "\e71e";
	}
	
	.icon-my1:before {
	    content: "\e71f";
	}
	
	.icon-notificationforbid:before {
	    content: "\e720";
	}
	
	.icon-notification1:before {
	    content: "\e721";
	}
	
	.icon-order1:before {
	    content: "\e722";
	}
	
	.icon-pause:before {
	    content: "\e723";
	}
	
	.icon-phone1:before {
	    content: "\e725";
	}
	
	.icon-pic1:before {
	    content: "\e726";
	}
	
	.icon-play:before {
	    content: "\e727";
	}
	
	.icon-question1:before {
	    content: "\e728";
	}
	
	.icon-record:before {
	    content: "\e729";
	}
	
	.icon-refresh1:before {
	    content: "\e72a";
	}
	
	.icon-rest:before {
	    content: "\e72b";
	}
	
	.icon-right1:before {
	    content: "\e72c";
	}
	
	.icon-ringpause:before {
	    content: "\e72d";
	}
	
	.icon-ring:before {
	    content: "\e72e";
	}
	
	.icon-rotate:before {
	    content: "\e72f";
	}
	
	.icon-roundclose1:before {
	    content: "\e730";
	}
	
	.icon-search1:before {
	    content: "\e731";
	}
	
	.icon-service1:before {
	    content: "\e732";
	}
	
	.icon-share1:before {
	    content: "\e733";
	}
	
	.icon-shopping:before {
	    content: "\e734";
	}
	
	.icon-sitting:before {
	    content: "\e735";
	}
	
	.icon-tag:before {
	    content: "\e736";
	}
	
	.icon-telephone:before {
	    content: "\e737";
	}
	
	.icon-todown:before {
	    content: "\e738";
	}
	
	.icon-toleft:before {
	    content: "\e739";
	}
	
	.icon-toright:before {
	    content: "\e73a";
	}
	
	.icon-totop:before {
	    content: "\e73b";
	}
	
	.icon-top1:before {
	    content: "\e73c";
	}
	
	.icon-unfold1:before {
	    content: "\e73d";
	}
	
	.icon-unlock1:before {
	    content: "\e73e";
	}
	
	.icon-upload:before {
	    content: "\e73f";
	}
	
	.icon-video:before {
	    content: "\e740";
	}
	
	.icon-all:before {
	    content: "\e636";
	}
	
	.icon-back1:before {
	    content: "\e755";
	}
	
	.icon-cart2:before {
	    content: "\e756";
	}
	
	.icon-category:before {
	    content: "\e757";
	}
	
	.icon-close1:before {
	    content: "\e758";
	}
	
	.icon-comments:before {
	    content: "\e759";
	}
	
	.icon-cry:before {
	    content: "\e75a";
	}
	
	.icon-delete3:before {
	    content: "\e75b";
	}
	
	.icon-edit2:before {
	    content: "\e75c";
	}
	
	.icon-email:before {
	    content: "\e75d";
	}
	
	.icon-favorite:before {
	    content: "\e75e";
	}
	
	.icon-folder1:before {
	    content: "\e75f";
	}
	
	.icon-form1:before {
	    content: "\e760";
	}
	
	.icon-help:before {
	    content: "\e761";
	}
	
	.icon-information1:before {
	    content: "\e762";
	}
	
	.icon-less:before {
	    content: "\e763";
	}
	
	.icon-moreunfold:before {
	    content: "\e764";
	}
	
	.icon-more2:before {
	    content: "\e765";
	}
	
	.icon-pic2:before {
	    content: "\e766";
	}
	
	.icon-qrcode1:before {
	    content: "\e767";
	}
	
	.icon-refresh2:before {
	    content: "\e768";
	}
	
	.icon-rfq:before {
	    content: "\e769";
	}
	
	.icon-search2:before {
	    content: "\e76a";
	}
	
	.icon-selected:before {
	    content: "\e76b";
	}
	
	.icon-set:before {
	    content: "\e76c";
	}
	
	.icon-smile:before {
	    content: "\e76d";
	}
	
	.icon-success:before {
	    content: "\e76e";
	}
	
	.icon-survey:before {
	    content: "\e76f";
	}
	
	.icon-training:before {
	    content: "\e770";
	}
	
	.icon-viewgallery:before {
	    content: "\e771";
	}
	
	.icon-viewlist:before {
	    content: "\e772";
	}
	
	.icon-warning:before {
	    content: "\e773";
	}
	
	.icon-wrong:before {
	    content: "\e774";
	}
	
	.icon-account:before {
	    content: "\e775";
	}
	
	.icon-atm:before {
	    content: "\e777";
	}
	
	.icon-apps:before {
	    content: "\e6a7";
	}
	
	.icon-paintfill:before {
	    content: "\e6a8";
	}
	
	.icon-paint:before {
	    content: "\e6a9";
	}
	
	.icon-picfill:before {
	    content: "\e6aa";
	}
	
	.icon-yaochi:before {
	    content: "\e741";
	}
	
	.icon-clock:before {
	    content: "\e778";
	}
	
	.icon-remind1:before {
	    content: "\e779";
	}
	
	.icon-refresharrow:before {
	    content: "\e6ab";
	}
	
	.icon-markfill:before {
	    content: "\e6ac";
	}
	
	.icon-mark1:before {
	    content: "\e6ad";
	}
	
	.icon-presentfill:before {
	    content: "\e6ae";
	}
	
	.icon-repeal:before {
	    content: "\e6af";
	}
	
	.icon-calendar:before {
	    content: "\e77a";
	}
	
	.icon-wangwang:before {
	    content: "\e742";
	}
	
	.icon-time1:before {
	    content: "\e743";
	}
	
	.icon-alipay:before {
	    content: "\e744";
	}
	
	.icon-people2:before {
	    content: "\e745";
	}
	
	.icon-address:before {
	    content: "\e746";
	}
	
	.icon-natice:before {
	    content: "\e747";
	}
	
	.icon-man:before {
	    content: "\e748";
	}
	
	.icon-women:before {
	    content: "\e749";
	}
	
	.icon-add2:before {
	    content: "\e74a";
	}
	
	.icon-album:before {
	    content: "\e6b0";
	}
	
	.icon-money:before {
	    content: "\e74c";
	}
	
	.icon-people3:before {
	    content: "\e74d";
	}
	
	.icon-tel_phone:before {
	    content: "\e74e";
	}
	
	.icon-chat:before {
	    content: "\e74f";
	}
	
	.icon-peoplefill:before {
	    content: "\e6b1";
	}
	
	.icon-people:before {
	    content: "\e6b2";
	}
	
	.icon-servicefill:before {
	    content: "\e6b3";
	}
	
	.icon-repair:before {
	    content: "\e6b4";
	}
	
	.icon-file1:before {
	    content: "\e6b5";
	}
	
	.icon-repairfill:before {
	    content: "\e6b6";
	}
	
	.icon-kafei:before {
	    content: "\e7e8";
	}
	
	.icon-taoxiaopu:before {
	    content: "\e6b7";
	}
	
	.icon-attentionfill:before {
	    content: "\e6b8";
	}
	
	.icon-attention:before {
	    content: "\e6b9";
	}
	
	.icon-commandfill:before {
	    content: "\e6ba";
	}
	
	.icon-command:before {
	    content: "\e6bb";
	}
	
	.icon-communityfill:before {
	    content: "\e6bc";
	}
	
	.icon-community:before {
	    content: "\e6bd";
	}
	
	.icon-read:before {
	    content: "\e6be";
	}
	
	.icon-attachment:before {
	    content: "\e77b";
	}
	
	.icon-3column:before {
	    content: "\e77c";
	}
	
	.icon-4column:before {
	    content: "\e77d";
	}
	
	.icon-icon02:before {
	    content: "\e80d";
	}
	
	.icon-calendar1:before {
	    content: "\e6bf";
	}
	
	.icon-cut:before {
	    content: "\e6c0";
	}
	
	.icon-magic:before {
	    content: "\e6c1";
	}
	
	.icon-discount:before {
	    content: "\e77e";
	}
	
	.icon-service2:before {
	    content: "\e77f";
	}
	
	.icon-print:before {
	    content: "\e780";
	}
	
	.icon-box:before {
	    content: "\e781";
	}
	
	.icon-process:before {
	    content: "\e782";
	}
	
	.icon-backwardfill:before {
	    content: "\e6c2";
	}
	
	.icon-forwardfill1:before {
	    content: "\e6c3";
	}
	
	.icon-playfill:before {
	    content: "\e6c4";
	}
	
	.icon-stop:before {
	    content: "\e6c5";
	}
	
	.icon-tagfill:before {
	    content: "\e6c6";
	}
	
	.icon-tag1:before {
	    content: "\e6c7";
	}
	
	.icon-group:before {
	    content: "\e6c8";
	}
	
	.icon-bags:before {
	    content: "\e783";
	}
	
	.icon-beauty:before {
	    content: "\e784";
	}
	
	.icon-electrical:before {
	    content: "\e785";
	}
	
	.icon-home2:before {
	    content: "\e786";
	}
	
	.icon-electronics:before {
	    content: "\e787";
	}
	
	.icon-gifts:before {
	    content: "\e788";
	}
	
	.icon-apparel:before {
	    content: "\e789";
	}
	
	.icon-lights:before {
	    content: "\e78a";
	}
	
	.icon-sports:before {
	    content: "\e78b";
	}
	
	.icon-toys:before {
	    content: "\e78c";
	}
	
	.icon-auto:before {
	    content: "\e78d";
	}
	
	.icon-jewelry:before {
	    content: "\e78e";
	}
	
	.icon-mac:before {
	    content: "\e750";
	}
	
	.icon-windows:before {
	    content: "\e751";
	}
	
	.icon-android:before {
	    content: "\e752";
	}
	
	.icon-windows8:before {
	    content: "\e753";
	}
	
	.icon-icon049:before {
	    content: "\e7f1";
	}
	
	.icon-trade-assurance:before {
	    content: "\e78f";
	}
	
	.icon-browse:before {
	    content: "\e790";
	}
	
	.icon-rfqqm:before {
	    content: "\e791";
	}
	
	.icon-rfqquantity:before {
	    content: "\e792";
	}
	
	.icon-rfq1:before {
	    content: "\e793";
	}
	
	.icon-scanning:before {
	    content: "\e794";
	}
	
	.icon-favorite1:before {
	    content: "\e754";
	}
	
	.icon-wechat:before {
	    content: "\e7cc";
	}
	
	.icon-compare:before {
	    content: "\e795";
	}
	
	.icon-filter1:before {
	    content: "\e796";
	}
	
	.icon-pin:before {
	    content: "\e797";
	}
	
	.icon-history1:before {
	    content: "\e798";
	}
	
	.icon-productfeatures:before {
	    content: "\e799";
	}
	
	.icon-supplierfeatures:before {
	    content: "\e79a";
	}
	
	.icon-similarproduct:before {
	    content: "\e79b";
	}
	
	.icon-all1:before {
	    content: "\e6c9";
	}
	
	.icon-backdelete:before {
	    content: "\e6ca";
	}
	
	.icon-hotfill:before {
	    content: "\e6cb";
	}
	
	.icon-hot:before {
	    content: "\e6cc";
	}
	
	.icon-post:before {
	    content: "\e6cd";
	}
	
	.icon-radiobox:before {
	    content: "\e6ce";
	}
	
	.icon-rounddown:before {
	    content: "\e6cf";
	}
	
	.icon-upload1:before {
	    content: "\e6d0";
	}
	
	.icon-writefill:before {
	    content: "\e6d1";
	}
	
	.icon-write:before {
	    content: "\e6d2";
	}
	
	.icon-radioboxfill:before {
	    content: "\e6d3";
	}
	
	.icon-link2:before {
	    content: "\e79c";
	}
	
	.icon-cut1:before {
	    content: "\e79d";
	}
	
	.icon-table:before {
	    content: "\e79e";
	}
	
	.icon-navlist:before {
	    content: "\e79f";
	}
	
	.icon-imagetext:before {
	    content: "\e7a0";
	}
	
	.icon-text:before {
	    content: "\e7a1";
	}
	
	.icon-move:before {
	    content: "\e7a2";
	}
	
	.icon-punch:before {
	    content: "\e6d4";
	}
	
	.icon-shake:before {
	    content: "\e6d5";
	}
	
	.icon-subtract:before {
	    content: "\e7a3";
	}
	
	.icon-dollar:before {
	    content: "\e7a4";
	}
	
	.icon-add3:before {
	    content: "\e6d6";
	}
	
	.icon-move1:before {
	    content: "\e6d7";
	}
	
	.icon-safe:before {
	    content: "\e6d8";
	}
	
	.icon-erweimazhuanhuan:before {
	    content: "\e80e";
	}
	
	.icon-home11:before {
	    content: "\e80f";
	}
	
	.icon-weixin1:before {
	    content: "\e7cd";
	}
	
	.icon-activityfill:before {
	    content: "\e6d9";
	}
	
	.icon-crownfill:before {
	    content: "\e6da";
	}
	
	.icon-crown:before {
	    content: "\e6db";
	}
	
	.icon-goodsfill:before {
	    content: "\e6dc";
	}
	
	.icon-messagefill:before {
	    content: "\e6dd";
	}
	
	.icon-profilefill:before {
	    content: "\e6de";
	}
	
	.icon-sound:before {
	    content: "\e6df";
	}
	
	.icon-sponsorfill:before {
	    content: "\e6e0";
	}
	
	.icon-sponsor:before {
	    content: "\e6e1";
	}
	
	.icon-upblock:before {
	    content: "\e6e2";
	}
	
	.icon-weblock:before {
	    content: "\e6e3";
	}
	
	.icon-weunblock:before {
	    content: "\e6e4";
	}
	
	.icon-raw:before {
	    content: "\e7a5";
	}
	
	.icon-office:before {
	    content: "\e7a6";
	}
	
	.icon-agriculture:before {
	    content: "\e7a7";
	}
	
	.icon-machinery:before {
	    content: "\e7a8";
	}
	
	.icon-shuiguo:before {
	    content: "\e7e9";
	}
	
	.icon-assessedbadge:before {
	    content: "\e7a9";
	}
	
	.icon-gerenzhongxin:before {
	    content: "\e7aa";
	}
	
	.icon-jifen:before {
	    content: "\e7ab";
	}
	
	.icon-renwuguanli:before {
	    content: "\e7ac";
	}
	
	.icon-operation:before {
	    content: "\e7ad";
	}
	
	.icon-my2:before {
	    content: "\e6e5";
	}
	
	.icon-myfill1:before {
	    content: "\e6e6";
	}
	
	.icon-remind2:before {
	    content: "\e7ae";
	}
	
	.icon-icondownload:before {
	    content: "\e7af";
	}
	
	.icon-shengfen:before {
	    content: "\e7d4";
	}
	
	.icon-mobile2:before {
	    content: "\e7e4";
	}
	
	.icon-flower1:before {
	    content: "\e7ea";
	}
	
	.icon-map:before {
	    content: "\e7b0";
	}
	
	.icon-bad1:before {
	    content: "\e7b1";
	}
	
	.icon-good:before {
	    content: "\e7b2";
	}
	
	.icon-skip:before {
	    content: "\e7b3";
	}
	
	.icon-iconfontplay2:before {
	    content: "\e7b4";
	}
	
	.icon-gouwuche2:before {
	    content: "\e81b";
	}
	
	.icon-iconfontstop:before {
	    content: "\e7b5";
	}
	
	.icon-compass:before {
	    content: "\e7b6";
	}
	
	.icon-security:before {
	    content: "\e7b7";
	}
	
	.icon-share2:before {
	    content: "\e7b8";
	}
	
	.icon-heilongjiangtubiao11:before {
	    content: "\e81c";
	}
	
	.icon-store:before {
	    content: "\e7b9";
	}
	
	.icon-manageorder:before {
	    content: "\e7ba";
	}
	
	.icon-rejectedorder:before {
	    content: "\e7bb";
	}
	
	.icon-phone2:before {
	    content: "\e7bc";
	}
	
	.icon-bussinessman:before {
	    content: "\e7bd";
	}
	
	.icon-emojifill:before {
	    content: "\e6e7";
	}
	
	.icon-emojiflashfill:before {
	    content: "\e6e8";
	}
	
	.icon-shoes:before {
	    content: "\e7be";
	}
	
	.icon-mobilephone:before {
	    content: "\e7bf";
	}
	
	.icon-city:before {
	    content: "\e7d5";
	}
	
	.icon-record1:before {
	    content: "\e6e9";
	}
	
	.icon-text1:before {
	    content: "\e6ea";
	}
	
	.icon-videofill:before {
	    content: "\e6eb";
	}
	
	.icon-video1:before {
	    content: "\e6ec";
	}
	
	.icon-duihao:before {
	    content: "\e81e";
	}
	
	.icon-dingdan2:before {
	    content: "\e80a";
	}
	
	.icon-jiantou-copy:before {
	    content: "\e81f";
	}
	
	.icon-erweima1:before {
	    content: "\e81d";
	}
	
	.icon-emailfilling:before {
	    content: "\e7c0";
	}
	
	.icon-huiyuan:before {
	    content: "\e820";
	}
	
	.icon-favoritesfilling:before {
	    content: "\e7c1";
	}
	
	.icon-accountfilling:before {
	    content: "\e7c2";
	}
	
	.icon-bussinesscard:before {
	    content: "\e7c3";
	}
	
	.icon-creditlevel:before {
	    content: "\e7c4";
	}
	
	.icon-creditlevelfilling:before {
	    content: "\e7c5";
	}
	
	.icon-huiyuan1:before {
	    content: "\e821";
	}
	
	.icon-dingdan:before {
	    content: "\e7db";
	}
	
	.icon-card012:before {
	    content: "\e7c6";
	}
	
	.icon-xiugai:before {
	    content: "\e83c";
	}
	
	.icon-shengfen1:before {
	    content: "\e7d6";
	}
	
	.icon-exl:before {
	    content: "\e7c7";
	}
	
	.icon-pdf:before {
	    content: "\e7c8";
	}
	
	.icon-zip:before {
	    content: "\e7c9";
	}
	
	.icon-sorting:before {
	    content: "\e7ca";
	}
	
	.icon-focus1:before {
	    content: "\e8cf";
	}
	
	.icon-huoche:before {
	    content: "\e776";
	}
	
	.icon-lingdang1:before {
	    content: "\e724";
	}
	
	.icon-copy2:before {
	    content: "\e7cb";
	}
	
	.icon-weibo1:before {
	    content: "\e7de";
	}
	
	.icon-chexiao:before {
	    content: "\e7f0";
	}
	
	.icon-city1:before {
	    content: "\e7d7";
	}
	
	.icon-aixin:before {
	    content: "\e7eb";
	}
	
	.icon-dianzan:before {
	    content: "\e7e7";
	}
	
	.icon-wancheng:before {
	    content: "\e7e2";
	}
	
	.icon-liwu:before {
	    content: "\e7ec";
	}
	
	.icon-erweima:before {
	    content: "\e7dc";
	}
	
	.icon-dot:before {
	    content: "\e7df";
	}
	
	.icon-juzi:before {
	    content: "\e7ed";
	}
	
	.icon-renwu:before {
	    content: "\e7e1";
	}
	
	.icon-yifuicon122438:before {
	    content: "\e7ee";
	}
	
	.icon-2:before {
	    content: "\e824";
	}
	
	.icon-city2:before {
	    content: "\e7d8";
	}
	
	.icon-bangzhu1:before {
	    content: "\e807";
	}
	
	.icon-liwu1:before {
	    content: "\e826";
	}
	
	.icon-zhifubao:before {
	    content: "\e853";
	}
	
	.icon-xiangqing-copy:before {
	    content: "\e827";
	}
	
	.icon-huiyuan3:before {
	    content: "\e9f2";
	}
	
	.icon-gouwudai:before {
	    content: "\e7ef";
	}
	
	.icon-weixinzhifu:before {
	    content: "\e854";
	}
	
	.icon-zuji1:before {
	    content: "\e829";
	}
	
	.icon-xing:before {
	    content: "\e7fa";
	}
	
	.icon-gouwuche1:before {
	    content: "\e7ff";
	}
	
	.icon-dianpu1:before {
	    content: "\e82c";
	}
	
	.icon-fenlei:before {
	    content: "\e82b";
	}
	
	.icon-aixin1:before {
	    content: "\e822";
	}
	
	.icon-qian:before {
	    content: "\e80b";
	}
	
	.icon-yinhangqia:before {
	    content: "\e855";
	}
	
	.icon-paiming:before {
	    content: "\e823";
	}
	
	.icon-lingdang:before {
	    content: "\e82e";
	}
	
	.icon-zuanshi:before {
	    content: "\e82f";
	}
	
	.icon-guanbi:before {
	    content: "\e830";
	}
	
	.icon-xin:before {
	    content: "\e803";
	}
	
	.icon-qiandao1:before {
	    content: "\e831";
	}
	
	.icon--guoji-xianxing:before {
	    content: "\e8ab";
	}
	
	.icon-dingwei:before {
	    content: "\e806";
	}
	
	.icon-failure:before {
	    content: "\e7e3";
	}
	
	.icon-yaoqingma:before {
	    content: "\e809";
	}
	
	.icon-shangpin:before {
	    content: "\e833";
	}
	
	.icon-person2:before {
	    content: "\e7f8";
	}
	
	.icon-dianhua:before {
	    content: "\e834";
	}
	
	.icon-wxapp:before {
	    content: "\e7e5";
	}
	
	.icon-tixian1:before {
	    content: "\e81a";
	}
	
	.icon-youhuiquan:before {
	    content: "\e835";
	}
	
	.icon-shezhi:before {
	    content: "\e836";
	}
	
	.icon-jinrudianpu:before {
	    content: "\e825";
	}
	
	.icon-xiangmuzhouqi:before {
	    content: "\e839";
	}
	
	.icon-icon_huida_tianxiebtn:before {
	    content: "\e837";
	}
	
	.icon-star:before {
	    content: "\e802";
	}
	
	.icon-qiehuan:before {
	    content: "\e7e6";
	}
	
	.icon-qian1:before {
	    content: "\e82a";
	}
	
	.icon-qianbao:before {
	    content: "\e828";
	}
	
	.icon-jiaotonggongjuxiaohuoche:before {
	    content: "\e71c";
	}
	
	.icon-arrow-down:before {
	    content: "\e838";
	}
	
	.icon-guanbi1:before {
	    content: "\e83a";
	}
	
	.icon-fahuo:before {
	    content: "\e7fb";
	}
	
	.icon-huiyuan2:before {
	    content: "\e83d";
	}
	
	.icon-daifahuo1:before {
	    content: "\e808";
	}
	
	.icon-qiandao:before {
	    content: "\e810";
	}
	
	.icon-fenxiao:before {
	    content: "\e811";
	}
	
	.icon-shangcheng1:before {
	    content: "\e812";
	}
	
	.icon-lingquyouhuiquan:before {
	    content: "\e813";
	}
	
	.icon-wodeyouhuiquan:before {
	    content: "\e814";
	}
	
	.icon-zhibo1:before {
	    content: "\e815";
	}
	
	.icon-paihang:before {
	    content: "\e816";
	}
	
	.icon-xiaofei:before {
	    content: "\e817";
	}
	
	.icon-hexiaoshangpin:before {
	    content: "\e818";
	}
	
	.icon-gudong1:before {
	    content: "\e819";
	}
	
	.icon-bangzhuzhongxin:before {
	    content: "\e7f2";
	}
	
	.icon-dingwei1:before {
	    content: "\e7f3";
	}
	
	.icon-guanzhu:before {
	    content: "\e7f4";
	}
	
	.icon-gouwuche3:before {
	    content: "\e7f5";
	}
	
	.icon-zuji:before {
	    content: "\e7f6";
	}
	
	.icon-dingdan1:before {
	    content: "\e7f7";
	}
	
	.icon-lingquyouhuiquan1:before {
	    content: "\e7f9";
	}
	
	.icon-fenxiao2:before {
	    content: "\e7fc";
	}
	
	.icon-shouji:before {
	    content: "\e7fd";
	}
	
	.icon-daituikuan2:before {
	    content: "\e7fe";
	}
	
	.icon-daishouhuo1:before {
	    content: "\e800";
	}
	
	.icon-daifukuan1:before {
	    content: "\e801";
	}
	
	.icon-tixian:before {
	    content: "\e805";
	}
	
	.icon-duihao_fuzhi1:before {
	    content: "\e804";
	}
	
	.icon-gouwuche4:before {
	    content: "\e82d";
	}
	
	.icon-gengduocopy:before {
	    content: "\e832";
	}
	
	.icon-fanhuishangcheng:before {
	    content: "\e83b";
	}
	
	.icon-chenggongtixianyongjin:before {
	    content: "\e84d";
	}
	
	.icon-daishouhuoyongjin:before {
	    content: "\e84e";
	}
	
	.icon-daidakuanyongjin:before {
	    content: "\e84f";
	}
	
	.icon-weijiesuanyongjin:before {
	    content: "\e850";
	}
	
	.icon-ketixianyongjin:before {
	    content: "\e851";
	}
	
	.icon-wuxiaoyongjin:before {
	    content: "\e852";
	}
	
	.icon-yishenqingyongjin:before {
	    content: "\e84c";
	}
	
	.icon-fenxiaodingdan:before {
	    content: "\e83e";
	}
	
	.icon-wodetuandui:before {
	    content: "\e83f";
	}
	
	.icon-tixianmingxi:before {
	    content: "\e840";
	}
	
	.icon-fenxiaoyongjin:before {
	    content: "\e841";
	}
	
	.icon-xiaodianshezhi:before {
	    content: "\e842";
	}
	
	.icon-yongjinpaiming:before {
	    content: "\e843";
	}
	
	.icon-zixuanshangpin:before {
	    content: "\e844";
	}
	
	.icon-tequan:before {
	    content: "\e845";
	}
	
	.icon-back11:before {
	    content: "\e846";
	}
	
	.icon-fenxiaoyongjin1:before {
	    content: "\e847";
	}
	
	.icon-wodetuandui1:before {
	    content: "\e848";
	}
	
	.icon-wodexiaodian:before {
	    content: "\e849";
	}
	
	.icon-dividendhome:before {
	    content: "\e84a";
	}
	
	.icon-fenxiaodingdan1:before {
	    content: "\e84b";
	}
	
	.icon-wodetuandui2:before {
	    content: "\e857";
	}
	
	.icon-huangguan-line:before {
	    content: "\e856";
	}
	
	.icon-huiyuanzhuanxiangzhekou:before {
	    content: "\e858";
	}
	
	.icon-jingqingqidai:before {
	    content: "\e859";
	}
	
	.icon-kaiqiajifen:before {
	    content: "\e85a";
	}
	
	.icon-kaiqiasongquan:before {
	    content: "\e85b";
	}
	
	.icon-meiyuelingquan:before {
	    content: "\e85c";
	}
	
	.icon-meiyuejifen:before {
	    content: "\e85d";
	}
	
	.icon-mianfeibaoyou:before {
	    content: "\e85e";
	}
	
	.icon-queshengye:before {
	    content: "\e85f";
	}
	
	.icon-tejiashangpin:before {
	    content: "\e860";
	}
	
	.icon-zhekoutequan:before {
	    content: "\e861";
	}
	
	.icon-huangguan:before {
	    content: "\e862";
	}
	
	.icon-huangguan1:before {
	    content: "\e863";
	}
	
	@import "utils/wxParse/wxParse.wxss";
	
	page {
	    background-color: #f3f3f3;
	    font-size: 16px;
	    height: 100%;
	    font-family: -apple-system-font,Helvetica Neue,Helvetica,sans-serif;
	}
	
	.page {
	    overflow-x: hidden;
	    height: auto;
	    min-height: 100%;
	    overflow: hidden;
	}
	
	.page.navbar,.page.footer {
	    padding-bottom: 120rpx;
	}
	
	.page.navbar-footer,.page.footer-navbar {
	    padding-bottom: 200rpx;
	}
	
	.page.navbar-footer .fui-footer,.page.footer-navbar .fui-navbar {
	    bottom: 0;
	}
	
	.page.header {
	    padding-top: 88rpx;
	}
	
	.page.header-sort {
	    padding-top: 168rpx;
	}
	
	.show {
	    display: block!important;
	}
	
	.hidden {
	    display: none!important;
	}
	
	.center {
	    text-align: center!important;
	}
	
	.right {
	    text-align: right!important;
	}
	
	.inline {
	    display: inline-block;
	}
	
	
	.fui-navbar.bottom-buttons.fui-iphonex-navbar {
	    bottom: 68rpx;
	}
	
	.detailbtn-group.fui-iphonex-navbar {
	    bottom: 68rpx;
	}
	
	.fui-navbar.fui-iphonex-navbar {
	    bottom: 68rpx;
	}
	
	.bottom-buttons.fui-iphonex-navbar {
	    bottom: 68rpx;
	}
	
	.picker-modal.in.fui-iphonex-navbar {
	    bottom: 68rpx;
	}
	
	.fui-modal.in.fui-iphonex-navbar {
	    bottom: 68rpx;
	}
	
	.inner.in.fui-iphonex-navbar {
	    bottom: 68rpx;
	}
	
	.fui-footer.fui-iphonex-navbar {
	    bottom: 68rpx;
	}
	
	.page.footer.padding-b {
	    padding-bottom: 170rpx;
	}
	
	.page.navbar.padding-b {
	    padding-bottom: 170rpx;
	}
	
	.coupontips {
	    height: 88rpx;
	    background: #fdfde5;
	    position: fixed;
	    top: 0;
	    width: 100%;
	    z-index: 188;
	    color: #ff8000;
	    font-size: 26rpx;
	    line-height: 88rpx;
	    padding-left: 20rpx;
	    display: flex;
	}
	
	.coupontips .text {
	    flex: 1;
	}
	
	.coupontips .close {
	    width: 80rpx;
	}
	
	.cycle-tip {
	    font-size: 24rpx;
	    font-style: normal;
	    padding: 4rpx 8rpx 4rpx;
	    color: #fff;
	    width: 92rpx;
	    margin-right: 4rpx;
	    border-radius: 8rpx;
	    background: rgb(255,22,45);
	    background: radial-gradient(ellipse at bottom left,rgba(255,115,94,1) 30%,rgba(255,51,51,1) 57%);
	    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff4d81', endColorstr='#ff162d', GradientType=1);
	}
	
	.bargain_label {
	    display: inline-block;
	    width: 50rpx;
	    height: 24rpx;
	    vertical-align: middle;
	    margin-top: -5rpx;
	    margin-right: 10rpx;
	}
	
	rich-text img {
	    vertical-align: middle;
	    max-width: 100%!important;
	}
	
	.fz-28 {
	    font-size: 28rpx;
	}
	
	.fz-36 {
	    font-size: 36rpx;
	}
	.page.navbar.nobuy {
	    padding-bottom: 180rpx;
	}
	
	.bargain-shop {
	    background: #fff;
	    padding: 0 24rpx;
	}
	
	.user {
	    font-size: 26rpx;
	    color: #666;
	    line-height: 100rpx;
	}
	
	.user image {
	    width: 50rpx;
	    height: 50rpx;
	    border-radius: 50%;
	    vertical-align: middle;
	    margin-right: 20rpx;
	    float: left;
	    margin-top: 24rpx;
	}
	
	.bargain-shop .goodsinfo {
	    height: 228rpx;
	    width: 100%;
	    background: #f7f7f7;
	    padding: 32rpx;
	    box-sizing: border-box;
	    font-size: 26rpx;
	    color: #333;
	}
	
	.bargain-shop .goodsinfo .title {
	    height: 50rpx;
	    line-height: 50rpx;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 1;
	    overflow: hidden;
	}
	
	.bargain-shop .goodsinfo .price {
	    height: 60rpx;
	    line-height: 60rpx;
	}
	
	.bargain-shop .goodsinfo .status {
	    height: 50rpx;
	    line-height: 50rpx;
	    font-size: 24rpx;
	    color: #999;
	}
	
	.goodsinfo .image image {
	    width: 160rpx;
	    height: 160rpx;
	    margin-right: 24rpx;
	}
	
	.flex {
	    display: -ms-flexbox;
	    display: flex;
	}
	
	.bargain-shop .prices {
	    text-align: center;
	}
	
	.bargain-shop .prices .current {
	    font-size: 70rpx;
	    font-weight: bold;
	    color: #ff5555;
	    line-height: 76rpx;
	    margin-top: 50rpx;
	}
	
	.bargain-shop .prices.delay .current {
	    color: #666;
	}
	
	.bargain-shop .prices.delay .current text {
	    border: 1px solid #666;
	}
	
	.bargain-shop .prices.delay .time {
	    background: #999;
	}
	
	.bargain-shop .prices .current text {
	    font-size: 18rpx;
	    height: 30rpx;
	    border: 1px solid #ff5555;
	    font-weight: normal;
	    display: inline-block;
	    line-height: 30rpx;
	    vertical-align: middle;
	    margin-top: -6px;
	}
	
	.bargain-shop .prices .cut {
	    line-height: 50rpx;
	    color: #999;
	    font-size: 24rpx;
	}
	
	.bargain-shop .prices .cut text {
	    font-weight: bold;
	}
	
	.bargain-shop .prices .time {
	    min-width: 390rpx;
	    display: inline-block;
	    height: 64rpx;
	    border-radius: 64rpx;
	    font-size: 24rpx;
	    color: #fff;
	    line-height: 64rpx;
	    padding: 0 48rpx;
	    margin: 22rpx 0 44rpx;
	    background: linear-gradient(to right,#ff8955 0%,#f94343 100%);
	    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffff8955, endColorstr=#fff94343,gradientType='1');
	}
	
	.bargain-shop .prices .time.delay {
	    background: #999;
	}
	
	.bargain-list {
	    margin-top: 20rpx;
	    background: #fff;
	}
	
	.fui-tab {
	    margin-bottom: 0;
	}
	
	.tabcontent {
	    padding: 0 24rpx;
	}
	
	.fui-cell-group .fui-cell .fui-cell-label {
	    width: 80rpx;
	}
	
	.fui-cell-group .fui-cell .title {
	    font-size: 26rpx;
	    color: #666;
	}
	
	.fui-cell-group .fui-cell .text {
	    font-size: 20rpx;
	    color: #ccc;
	}
	
	.fui-cell .fui-cell-label image {
	    width: 60rpx;
	    height: 60rpx;
	    border-radius: 50%;
	}
	
	.fui-cell-group .fui-cell .fui-cell-remark.noremark.danger {
	    color: #ff5555;
	}
	
	.fui-navbar .buybtn {
	    width: 240rpx;
	    height: 100%;
	    line-height: 100rpx;
	    color: #666;
	    text-align: center;
	    font-size: 28rpx;
	}
	
	.fui-navbar .bargainBuy {
	    background: #ff5555;
	    -webkit-box-flex: 1;
	    flex: 1;
	    text-align: center;
	    line-height: 100rpx;
	    color: #fff;
		height:100%;
	    font-size: 28rpx;
	    border-radius: 0;
	}
	
	.buytips {
	    position: fixed;
	    left: 0;
	    right: 0;
	    bottom: 100rpx;
	    background: #fbf7dc;
	    font-size: 22rpx;
	    height: 60rpx;
	    line-height: 60rpx;
	    text-align: center;
	    color: #ff8c5a;
	}
	
	.layer {
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: rgba(0,0,0,0.5);
	    z-index: 9999;
	}
	
	.layer .content {
	    width: 420rpx;
	    height: 460rpx;
	    background: #fff;
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    margin-left: -210rpx;
	    margin-top: -230rpx;
	    border-radius: 10rpx;
	    text-align: center;
	}
	
	.layer .content .icox-close {
	    position: absolute;
	    right: 10rpx;
	    top: 0;
	    line-height: 52rpx;
	    font-size: 24rpx;
	    display: block;
	}
	
	.layer .content image {
	    width: 86rpx;
	    height: 103rpx;
	    margin-top: 56rpx;
	}
	
	.layer .content .layerbtn {
	    width: 300rpx;
	    background: #ff5555;
	    line-height: 72rpx;
	    border-radius: 72rpx;
	    color: #fff;
	    margin: 0 auto;
	    margin-top: 36rpx;
	}
	
	.layer .showModal {
	    width: 560rpx;
	    background: #fff;
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    margin-left: -280rpx;
	    margin-top: -196rpx;
	}
	
	.layer .showModal .inner {
	    padding: 58rpx 52rpx;
	    font-size: 28rpx;
	    line-height: 36rpx;
	    border-bottom: 1px solid #eee;
	}
	
	.layer .showModal .operate {
	    height: 100rpx;
	    line-height: 100rpx;
	    text-align: center;
	    font-size: 28rpx;
	}
	
	.layer .showModal .operate view:last-child {
	    border-left: 1px solid #eee;
	    color: #00c201;
	}
</style>
