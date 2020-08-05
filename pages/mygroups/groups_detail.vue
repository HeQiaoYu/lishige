<template>
	<view class="page" v-if="show">
	    <block>
	        <block v-if="count_down&&data.tuan_first_order.success==0">
	            <view class="groupstime">剩余 {{time[0]}}天{{time[1]}}小时{{time[2]}}分{{time[3]}}秒</view>
	        </block>
	    </block>
	    <block>
	        <block v-if="!count_down||data.tuan_first_order.success==-1">
	            <view class="groupstime">拼团已结束</view>
	        </block>
	    </block>
	    <block>
	        <block v-if="data.tuan_first_order.success==1">
	            <view class="groupstime">拼团已成功</view>
	        </block>
	    </block>
	    <view class="goodsinfo flex">
	        <image :src="data.goods.thumb"></image>
	        <view class="inner flex1">
	            <view class="title">{{data.goods.title}}</view>
	            <view>
	                <text class="person">{{data.tuan_first_order.is_ladder==1?'阶梯团':data.tuan_first_order.groupnum+'人团'}}</text>
	            </view>
	            <view class="price">￥{{data.tuan_first_order.goods_price}}/{{data.goods.goodsnum}}{{data.goods.units}}</view>
	        </view>
	    </view>
	    <view class="join">
	        <view class="inner">
	            <block>
	                <block v-if="data.tuan_first_order.success==0">
	                    <view class="num">已有{{data.nn}}人参与,还差<text>{{data.n}}</text>人拼团成功</view>
	                </block>
	            </block>
	            <view class="flex person-group">
	                <block v-for="(item,idx) in data.orders">
	                    <view :class="['persons',(idx==0?'active':'')]">
	                        <image :src="item.avatar"></image>
	                    </view>
	                </block>
	                <block v-for="(item,idx) in data.arr" >
	                    <view class="persons">
	                        <image src="/static/images/noface.png"></image>
	                    </view>
	                </block>
	            </view>
	        </view>
	    </view>
	    <view class="process">
	        <text class="icox icox-1"></text>下单开团/参团 <text class="line">-----------</text>
	        <text class="icox icox-2"></text>邀请好友参团 <text class="line">-----------</text>
	        <text class="icox icox-3"></text>人满拼团成功
	  </view>
	    <view class="fui-cell-group" style="margin-top:0">
	        <view class="title">
	            <view class="fui-tab fui-tab-danger" id="tab">
	                <view @click="goodsTab" :class="['item',(showtab=='groups'?'active':'')]" data-tap="groups">拼团详情</view>
	                <view @click="goodsTab" :class="['item',(showtab=='info'?'active':'')]" data-tap="info">商品详情</view>
	            </view>
	        </view>
	        <view class="tabcontent">
	            <block>
	                <block v-if="showtab=='groups'">
	                    <view>
	                        <block v-for="(item,index) in  data.orders">
	                            <view class="fui-cell">
	                                <view class="fui-cell-label">
	                                    <image :src="item.avatar"></image>
	                                </view>
	                                <view class="fui-cell-info">
										{{item.nickname}}
									</view>
	                                <view class="fui-cell-remark noremark danger">
										{{item.createtime}}
									</view>
	                            </view>
	                        </block>
	                    </view>
	                </block>
	            </block>
	            <block>
	                <block v-if="showtab=='info'">
	                   <view>
	                   	<rich-text :nodes="data.goods.content"></rich-text>
	                   </view>
	                </block>
	            </block>
	        </view>
	    </view>
	    <block>
	        <block v-if="layershow">
	            <view @click="close" class="layer"></view>
	        </block>
	    </block>
	    <block>
	        <block v-if="options">
	            <view class="fui-modal goods-picker in goodslist">
	                <view class="option-picker">
	                    <view class="option-picker-inner">
	                        <view class="fui-list">
	                            <view class="fui-list-media">
	                                <image class="thumb" :src="optiondata.thumb||data.goods.thumb"></image>
	                            </view>
	                            <view class="fui-list-inner">
	                                <view class="subtitle">{{optiondata.title||data.goods.title}}</view>
	                                <view class="price">￥{{optiondata.price||data.goods.groupsprice}}</view>
	                            </view>
	                        </view>
	                        <view class="option-picker-options">
	                            <view class="option-picker-cell option spec">
	                                <block v-for="(items,specindex) in spec" >
	                                    <view class="title">{{items.title}}</view>
	                                    <view class="select">
	                                        <block v-for="(options,index) in items.item" >
	                                            <view @="specsTap" :class="['btn btn-default btn-sm nav spec-item', (options.status=='active'?'btn-danger':'')]" data-id="options.id" data-idx="index" data-specindex="specindex" data-spedid="options.specid">{{options.title}}</view>
	                                        </block>
	                                    </view>
	                                </block>
	                            </view>
	                        </view>
	                    </view>
	                    <view class="fui-navbar">
	                        <view @="buy" class="btn btn-danger block"> {{optiondata.stock<=0?'库存不足':'确定'}}</view>
	                    </view>
	                </view>
	                <view @="close" class="icox icox-guanbi-copy" style="color:#fff;text-align:center;font-size:60rpx;margin-top:30rpx;"></view>
	            </view>
	        </block>
	    </block>
	    <view class="detailbtn-group flex ">
	        <navigator class="back" hoverClass="none" openType="reLaunch" url="../index/index">
	            <view class="icox icox-homepage"></view>
	            <view>拼团首页</view>
	        </navigator>
	        <view class="detailbtn flex1" :style="data.myorder.success==0?'background:#ff5555':'background:#ccc'">
	            <block>
	                <block v-if="!count_down||data.tuan_first_order.success==-1">
	                    <text>拼团已结束</text>
	                </block>
	            </block>
	            <block>
	                <block v-if="data.tuan_first_order.success==1">
	                    <text>拼团已成功</text>
	                </block>
	            </block>
	            <block>
	                <block v-if="data.tuan_first_order.success==0&&data.myorder">
						<!-- #ifdef MP-WEIXIN -->
					
							<button open-type="share">
							  快邀请好友参团
							</button>
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						<button @click="shares">
						  快邀请好友参团
						</button>
						<!-- #endif -->
	                    
	                </block>
	            </block>
	            <block>
	                <block v-if="data.tuan_first_order.success==0&&!data.myorder">
	                    <button @click="tuxedobuy">我要参团</button>
	                </block>
	            </block>
	        </view>
	    </view>
	</view>
</template>

<script>
	import {groupteamdetails,pintuanCreadOrder,groupsget_spec,config} from "@/api/public";
	//#ifdef H5
	var jweixin = require('jweixin-module');
	var surl = encodeURIComponent(window.location.href.split('#')[0]);
	config(surl).then(res => {
		let [error ,on] = res, data = on;
		jweixin.config({  
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
			appId: data.data.appId, // 必填，公众号的唯一标识  
			timestamp: data.data.timestamp, // 必填，生成签名的时间戳  
			nonceStr: data.data.nonceStr, // 必填，生成签名的随机串  
			signature: data.data.signature, // 必填，签名，见附录1  
			surl: data.data.surl, //自己添加的，debug为true的时候可以网页打印出对应的URL是否正确  
			jsApiList: ["updateAppMessageShareData", "updateTimelineShareData","chooseWXPay"]  
		});
		
	})
	//#endif
	export default {
		data() {
			return {
				showtab: "groups",
				count_down: !0,
				time: [
					0,0,0,0
				],
				share: 1,
				options: "",
				layershow:0,
				show: !1,
				teamid: 0,
				data:{
					tuan_first_order:{
						success:!0
					}
				}
			}
		},
		onShareAppMessage(res){
			var i = this.data.tuan_first_order.teamid,shopshare = this.data.shopshare;
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route
			
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			console.log(curRoute)
			return {
			  title: shopshare.title|| "拼团",
			  path: curRoute+"?id="+i,
			  content:shopshare.desc, 
			  imageUrl:shopshare.imgUrl,
			}
			
		},
		onLoad(options) {
			uni.setStorageSync('back','1')
			this.teamid = options.id;
			this.get_details();
		},
		methods: {
			get_details() {
				
				 var e = this;
			
				groupteamdetails(this.teamid).then(t => {
				
					t.data.goods.content = t.data.goods.content.replace(/data-lazy/g, "src")
					this.data = t.data;
					if (t.data.lasttime2 <= 0){
						this.count_down = !1;
					}
					
					 if (clearInterval(e.data.timer), 0 == t.data.tuan_first_order.success) var a = setInterval(function() {
						e.countDown(t.data.tuan_first_order.createtime, t.data.tuan_first_order.endtime);
					}, 1e3);
					this.show = !0;
					
				})
			},
			shares() {
				
				//#ifdef APP-PLUS
				var i = this.data.tuan_first_order.teamid,shopshare = this.data.shopshare;
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].route
				uni.share({ 
                    provider: "weixin",
                    scene: "WXSceneSession",
                    type: 0,
                    href: "http://ejm.ilishige.com/lishige/index.html?"+curRoute+"+id="+i,//这地址太长了，就省略了
                    title: shopshare.title|| "拼团",
                    summary: shopshare.desc,                         
                    imageUrl: shopshare.imgUrl,
                    success: function(res) {
                        console.log("success:" + JSON.stringify(res));
                    },
                    fail: function(err) {
                        console.log("fail:" + JSON.stringify(err));
                    }
                });
				//#endif
				//#ifdef H5
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].route;
				jweixin.onMenuShareAppMessage({
				  title:  this.data.shopshare.title, // 分享标题
				  desc: '拼团', // 分享描述
				  link: "http://ejm.ilishige.com/lishige/index.html?url="+curRoute+"+id="+ this.data.tuan_first_order.teamid, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				  imgUrl: this.data.shopshare.imgUrl, // 分享图标
				  type: '', // 分享类型,music、video或link，不填默认为link
				  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				  success: function () {
					// 用户点击了分享后执行的回调函数
					uni.showLoading('分享成功')
				  }
				});
				//#endif
			},
			countDown (t, a, e) {
				var o = parseInt(Date.now() / 1e3), s = parseInt((t > o ? t : a) - o), i = Math.floor(s / 86400), d = Math.floor((s - 24 * i * 60 * 60) / 3600), n = Math.floor((s - 24 * i * 60 * 60 - 3600 * d) / 60), r = Math.floor(s - 24 * i * 60 * 60 - 3600 * d - 60 * n);
				0 == i && 0 == d && 0 == n && 0 == r && this.get_details(this.teamid);
				var u = [ i, d, n, r ];
				this. time = u;
				
			},
			close: function() {
				this.layershow = !1,this.options = !1; 
			},
			tuxedobuy: function(e) {
				var o = this, s = o.data.goods.id;
				0 == o.data.goods.more_spec ? o.data.goods.stock > 0 ?pintuanCreadOrder(s,'',o.data.tuan_first_order.ladder_id,"groups",0,o.teamid,o.$store.state.app.openid
				).then(res => {
					let [error, on] =res , t = on.data;

					1 != t.error ? -1 != t.error ? uni.navigateTo({
						url: "../createPtOrder/createPtOrder?id=" + s + "&heads=0&type=groups&teamid=" + o.teamid + "&ladder_id=" + o.data.tuan_first_order.ladder_id,
						success: function() {
							
						}
					}) : uni.redirectTo({
						url: "/pages/message/auth/index"
					}) : uni.showToast({
						'title':t.message,
						icon: "none",
						duration: 2e3
					});
				}) : uni.showToast({
					title: "库存不足",
					icon: "none",
					duration: 2e3
				}):groupsget_spec(id,openid)(res => {
					let [error, on] =res,t = on.data;
					o.spec = t.data,o.layershow= !0,o.options = !0,o.optionarr =[],o.selectSpecsarr=[];
				}), o.data.goods.stock > 0 ? uni.navigateTo({
					url: "../createPtOrder/createPtOrder?id=" + s + "&type=groups&teamid=" + o.teamid,
					success: function() {
						o.layershow = !1,o.chosenum = !1,o.options =!1;
						
					}
				}) : uni.showToast({
					title: "库存不足",
					icon: "none",
					duration: 2e3
				}), o.layershow = !0 ,o.options = !0;
			},
			specsTap: function(t) {
				/*e++;
				var o = this, s = o.data.spec, i = a.pdata(t).spedid, d = a.pdata(t).id, n = a.pdata(t).specindex;
				a.pdata(t).idx;
				s[n].item.forEach(function(t, a) {
					t.id == d ? s[n].item[a].status = "active" : s[n].item[a].status = "";
				}), o.setData({
					spec: s
				});
				var r = o.data.optionarr, u = o.data.selectSpecsarr;
				1 == e ? (r.push(d), u.push(i)) : u.indexOf(i) > -1 ? r.splice(n, 1, d) : (r.push(d), 
				u.push(i)), o.data.optionarr = r, o.data.selectSpecsarr = u, a.post("groups.goods.get_option", {
					spec_id: o.data.optionarr,
					groups_goods_id: o.data.data.goods.id
				}, function(t) {
					o.setData({
						optiondata: t.data
					});
				});*/
			},
			buy: function(t) {
				var e = this, o = (a.pdata(t).op, e.data.data.goods.id), s = e.data.optiondata;
				e.data.optiondata ? s.stock > 0 ? uni.navigateTo({
					url: "../createPtOrder/CreatePtorder?id=" + o + "&type=groups&option_id=" + s.id + " &teamid=" + e.teamid,
					success: function() {
						e.layershow = !1,e.chosenum = !1,e.options = !1;
						
					}
				}) : uni.showToast({
					title: "库存不足",
					icon: "none",
					duration: 2e3
				}) : uni.showToast({
					title: "请选择规格",
					icon: "none",
					duration: 2e3
				});
			},
			goodsTab: function(t) {
				this.showtab = t.target.dataset.tap;
			}
		}
	}
</script>

<style>
	.groupstime {
	    height: 72rpx;
	    width: 100%;
	    background: #fff4f4;
	    font-size: 24rpx;
	    font-weight: bold;
	    line-height: 72rpx;
	    color: #ff5555;
	    text-align: center;
	}
	
	.goodsinfo {
	    background: #fff;
	    padding: 30rpx 24rpx;
	}
	
	.goodsinfo image {
	    height: 160rpx;
	    width: 160rpx;
	}
	
	.goodsinfo .inner {
	    padding-left: 24rpx;
	    font-size: 26rpx;
	    color: #333;
	}
	
	.goodsinfo .inner .title {
	    overflow: hidden;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    -webkit-box-orient: vertical;
	}
	
	.goodsinfo .person {
	    min-width: 90rpx;
	    text-align: center;
	    padding: 0 12rpx;
	    box-shadow: 0 0 20rpx 0 rgba(255,221,221,0.8);
	    margin: 24rpx 0;
	    font-size: 22rpx;
	    font-weight: bold;
	    line-height: 34rpx;
	    color: #ff6000;
	    border-radius: 4rpx;
	    display: inline-block;
	    background-image: -webkit-gradient(linear,0 0,right 0,from(#ff6000),to(#ff8a00));
	    -webkit-background-clip: text;
	    -webkit-text-fill-color: transparent;
	}
	
	.goodsinfo .price {
	    font-size: 26rpx;
	    color: #ff5555;
	}
	
	.join {
	    padding: 0 24rpx 50rpx;
	    background: #fff;
	}
	
	.join .inner {
	    width: 100%;
	    background: #f7f7f7;
	    padding: 0 0 40rpx;
	}
	
	.num {
	    line-height: 96rpx;
	    font-size: 26rpx;
	    color: #333;
	    font-weight: bold;
	    text-align: center;
	}
	
	.num text {
	    font-size: 50rpx;
	    font-weight: bold;
	    color: #ff5555;
	}
	
	.person-group {
	    justify-content: center;
	    flex-wrap: wrap;
	}
	
	.persons {
	    width: 80rpx;
	    height: 80rpx;
	    margin: 15rpx 24rpx;
	    position: relative;
	}
	
	.persons.active:after {
	    position: absolute;
	    content: '团长';
	    width: 58rpx;
	    height: 28rpx;
	    border-radius: 28rpx;
	    background: #ff5555;
	    line-height: 28rpx;
	    font-size: 18rpx;
	    text-align: center;
	    color: #fff;
	    bottom: 0rpx;
	    left: 10rpx;
	}
	
	.persons image {
	    width: 80rpx;
	    height: 80rpx;
	    border-radius: 50%;
	}
	
	.process {
	    line-height: 80rpx;
	    font-size: 20rpx;
	    color: #666;
	    padding: 0 24rpx;
	}
	
	.process text.icox {
	    font-size: 26rpx;
	    vertical-align: middle;
	}
	
	.process text.line {
	    margin: 0 25rpx;
	    display: inline-block;
	    width: 70rpx;
	    overflow: hidden;
	    height: 80rpx;
	    vertical-align: middle;
	}
	
	.fui-cell-group .fui-cell .fui-cell-label {
	    width: 60rpx;
	    height: 60rpx;
	    margin-right: 15rpx;
	}
	
	.fui-cell-group .fui-cell .fui-cell-label image {
	    width: 60rpx;
	    height: 60rpx;
	    border-radius: 50%;
	}
	
	.fui-cell-group .fui-cell .fui-cell-info {
	    font-size: 26rpx;
	    color: #666;
	}
	
	.fui-cell-group .fui-cell .fui-cell-remark.noremark {
	    color: #999;
	    font-size: 24rpx;
	}
	
	.detailbtn-group {
	    height: 98rpx;
	    background: #fff;
	    position: fixed;
	    width: 100%;
	    bottom: 0;
	    text-align: center;
	}
	
	.detailbtn-group .back {
	    width: 120rpx;
	}
	
	.detailbtn-group .detailbtn {
	    background: #ff8080;
	    color: #fff;
	    font-size: 28rpx;
	    line-height: 98rpx;
	}
	
	.back {
	    font-size: 22rpx;
	    line-height: 40rpx;
	    color: #999;
	}
	
	.back .icox {
	    font-size: 50rpx;
	    vertical-align: middle;
	    padding-top: 10rpx;
	}
	
	.detailbtn button {
	    background: #ff5555;
	    line-height: 98rpx;
	    border: none;
	    outline: none;
	    color: #fff;
	    font-size: 26rpx;
	    border-radius: 0;
	}
	
	.model {
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: rgba(0,0,0,0.5);
	}
	
	.model .box {
	    position: absolute;
	    top: 50%;
	    transform: translateY(-50%);
	    background: #fff;
	    width: 560rpx;
	    border-radius: 8rpx;
	    box-sizing: border-box;
	    margin-left: 93rpx;
	    font-size: 28rpx;
	    color: #000;
	    line-height: 40rpx;
	}
	
	.model .box .content {
	    padding: 62rpx 54rpx;
	    box-sizing: border-box;
	    border-bottom: 1rpx solid #efefef;
	}
	
	.box .footer {
	    line-height: 100rpx;
	    text-align: center;
	    font-size: 30rpx;
	    color: #00c200;
	}
	
	.detailbtn-group .detailbtn.ladder {
	    line-height: 98rpx;
	    font-size: 26rpx;
	    padding: 0;
	}
	
	.nav-mask {
	    position: fixed;
	    z-index: 999;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    background: rgba(0,0,0,0.5);
	    display: none;
	}
	
	.picker-modal {
	    background: #fefefe;
	    height: 260px;
	    position: fixed;
	    bottom: -2rem;
	    left: 0;
	    right: 0;
	    z-index: 1000;
	    transform: translate3d(0,100%,0);
	}
	
	.picker-modal.city-picker {
	    z-index: 2000;
	}
	
	.picker-modal.in {
	    transition-duration: 300ms;
	    transform: translate3d(0,0,0);
	    bottom: 0;
	}
	
	.picker-modal.out {
	    transition-duration: 300ms;
	    transform: translate3d(0,100%,0);
	}
	
	.picker-modal .picker-control {
	    display: flex;
	    align-items: center;
	    height: 40px;
	    border-bottom: 1px solid #f1f1f1;
	    padding: 0 30rpx;
	    font-size: 32rpx;
	}
	
	.picker-modal .picker-control .cancel {
	    width: 50%;
	    text-align: left;
	    color: #666;
	}
	
	.picker-modal .picker-control .confirm {
	    width: 50%;
	    text-align: right;
	    color: #20b21f;
	}
	
	.picker-modal .picker {
	    width: 100%;
	    height: 220px;
	}
	
	.picker-modal .picker .item {
	    line-height: 40px;
	}
	
	picker-view-column {
	    text-align: center;
	}
	
	.layer {
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: rgba(0,0,0,0.5);
	    z-index: 101;
	}
	
	.option-picker {
	    height: auto;
	    width: 100%;
	    z-index: 1001;
	}
	
	.goods-picker .option-picker-options {
	    height: 600rpx;
	}
	
	.option-picker .option-picker-cell {
	    padding: 8rpx 20rpx 20rpx 20rpx;
	}
	
	.option-picker .option-picker-options {
	    margin: 0;
	    padding: 0;
	    overflow-y: auto;
	    -webkit-overflow-scrolling: touch;
	    height: 750rpx;
	}
	
	.option-picker .option-picker-cell.option {
	    position: relative;
	}
	
	.option-picker .option-picker-cell.option .title {
	    font-size: 28rpx;
	    height: auto;
	    overflow: hidden;
	    color: #000;
	    line-height: 78rpx;
	}
	
	.option-picker .option-picker-cell.option .select {
	    font-size: 29rpx;
	    color: #666;
	    height: auto;
	    overflow: hidden;
	}
	
	.option-picker .option-picker-cell.option .select .nav {
	    height: auto;
	    width: auto;
	    border: 0;
	    float: left;
	    margin: 16rpx 20rpx 0 0;
	}
	
	.option-picker .fui-navbar {
	    text-shadow: none;
	    height: 90rpx;
	}
	
	.option-picker .fui-navbar .btn {
	    border: none;
	    font-size: 29rpx;
	    color: #fff;
	    border-radius: 0;
	    padding: 0;
	    margin: 0;
	    height: 100%;
	    line-height: 90rpx;
	}
	
	.option-picker .fui-navbar .cartbtn {
	    background: #fe9402;
	}
	
	.option-picker .fui-navbar .buybtn,.option-picker .fui-navbar .confirmbtn {
	    background: #fd5555;
	}
	
	.option-picker-inner {
	    background: #fff;
	    border-top: 2rpx solid #eee;
	    box-shadow: 0 0 8rpx rgba(0,0,0,0.1);
	}
	
	.option-picker .fui-navbar .btn.disabled {
	    color: #ccc;
	    background: #ececec;
	}
	
	.fui-modal.goodslist {
	    position: fixed;
	    max-height: 780rpx;
	    width: 660rpx;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-55%);
	    bottom: auto;
	}
	
	.fui-modal.goodslist .option-picker .option-picker-inner {
	    margin: 0;
	    overflow-y: auto;
	    -webkit-overflow-scrolling: touch;
	    height: auto;
	    max-height: 640rpx;
	    overflow: hidden;
	    border-top-left-radius: 12rpx;
	    border-top-right-radius: 12rpx;
	    padding: 30rpx;
	}
	
	.fui-modal.goodslist .option-picker .option-picker-options {
	    max-height: 440rpx;
	    overflow: auto;
	    height: auto;
	}
	
	.fui-modal.goodslist .fui-navbar {
	    padding: 30rpx 0;
	    position: static;
	    border-bottom-left-radius: 12rpx;
	    border-bottom-right-radius: 12rpx;
	    text-align: center;
	}
	
	.fui-modal.goodslist .option-picker .fui-navbar .btn {
	    width: 290rpx;
	    border: none;
	    font-size: 29rpx;
	    color: #fff;
	    border-radius: 10rpx;
	    padding: 0;
	    margin: 0;
	    height: 84rpx;
	    line-height: 84rpx;
	    display: inline-block;
	}
	
	.fui-modal.goodslist .option-picker .fui-navbar .btn.cartbtn {
	    margin-right: 20rpx;
	}
	
	.fui-modal.goodslist .option-picker-cell.goodinfo {
	    position: static;
	    display: flex;
	    padding-left: 30rpx;
	}
	
	.fui-modal.goodslist .option-picker .option-picker-cell.goodinfo .img {
	    position: static;
	}
	
	.fui-modal.goodslist .option-picker .option-picker-cell.goodinfo:after,.option-picker .option-picker-cell.option:after {
	    border: none;
	}
	
	.fui-modal.goodslist .fui-list {
	    background: #f7f7f7;
	}
	
	.fui-modal.goodslist .fui-list-inner {
	    display: flex;
	    flex-direction: column;
	    justify-content: space-between;
	    height: 100rpx;
	}
	
	.fui-modal.goodslist .fui-list-inner .subtitle {
	    font-size: 28rpx;
	}
	
	.fui-modal.goodslist .fui-list-inner .price {
	    font-size: 30rpx;
	    line-height: 30rpx;
	    color: #ff5555;
	}
	
	.fui-modal.goodslist .option-picker .fui-navbar .cartbtn {
	    color: #333;
	    border: 1px solid #e5e5e5;
	    background: #fff;
	}
	
	.fui-modal.goodslist .option-picker .fui-navbar .btn {
	    width: 588rpx;
	}
</style>