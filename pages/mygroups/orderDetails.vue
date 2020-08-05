<template>
	<view v-if="show">
		<block>
			<block>
				<view class="page navbar">
					<view class="fui-list bg">
						<view class="row" style="font-size:34rpx">
							<view class="">  {{order.status_str}}{{order.refundstate>0?'('+order.refundtext+')':''}} <view v-if="">已有<text>{{data.nn}}</text>人参与,还差<text>{{data.n}}</text>人拼团成功</text></view></view>
						</view>
						<view class="order-price">订单金额(含运费):¥
							<text>{{order.money}}</text>
						</view>
					</view>
					<block>
						<block v-if="address">
							<view class="fui-list-group">
								<block>
									<block v-if="order.status>1">
										<navigator class="fui-list" :url="'../express/index?id='+order.id">
											<view class="fui-list-media">
												<view class="fui-list-icon">
													<text class="icox icox-icon049"></text>
												</view>
											</view>
											<view class="fui-list-inner">
												<block>
													<block v-if="express.length>0">
														<view class="text">{{express[0].step}}</view>
														<view class="text">{{express[0].time}}</view>
													</block>
													<block v-else>
														<view class="text">暂无物流信息</view>
														<view class="text"></view>
													</block>
												</block>
											</view>
											<view class="fui-list-angle">
												<text class="angle"></text>
											</view>
										</navigator>
									</block>
								</block>
								<navigator class="fui-list" hoverClass="none">
									<view class="fui-list-media">
										<view class="fui-list-icon">
											<text class="icox icox-dingwei1"></text>
										</view>
									</view>
									<view class="fui-list-inner">
										<view class="" style="font-size:28rpx;line-height: 1.2rem;height: 1.2rem;">{{address.realname}}
											{{address.mobile}}</view>
										<view class="text" style="font-size:26rpx;color:#666">{{address.province+address.city+address.area+' '+address.address}}</view>
									</view>
								</navigator>
							</view>
						</block>
					</block>
					<block>
						<block v-if="carrier||store">
							<view class="fui-list-group">
								<block>
									<block v-if="carrier">
										<view class="fui-list noclick">
											<view class="fui-list-media">
												<image class="fui-list-icon" src="/static/people.png"></image>
											</view>
											<view class="fui-list-inner">
												<view class="title">{{carrier.carrier_realname}} {{carrier.carrier_mobile}}</view>
											</view>
										</view>
									</block>
								</block>
							</view>
						</block>
					</block>
					<view class="fui-list-group" style="padding-bottom:20rpx">
						<view class="fui-list-group-title">
							<view class="fui-list-icon">
								<text class="icox icox-dianpu1"></text>
							</view>
							<text class="shop">{{shop_name}}</text>
						</view>
						<navigator class="fui-list goods-item" openType="redirect" :url="'../goods/index?id='+order.goodid">
							<view class="fui-list-media">
								<image class="goods_img" :src="goods.thumb"></image>
							</view>
							<view class="fui-list-inner" style="height:140rpx">
								<view class="text">{{goods.title}}</view>
								<view class="subtitle">{{goods.optionname}}</view>
							</view>
							<view class="price text-right" style="height:140rpx">
								<view class="text-right">
									<view class="pull-left">￥</view>
									<view class="pull-left">
										<text> {{order.goods_price}}</text>/{{goods.goodsnum}}{{goods.units}}
									</view>
								</view>
								<view class="text-right" style="color:#666">x
									<text>1</text>
								</view>
							</view>
						</navigator>
						<block>

						</block>
					</view>
					<block>
						<block v-if="order.isvirtualsend>0&&order.virtualsend_info!=null">
							<view class="fui-cell-group">
								<view class="fui-cell-title">发货信息</view>
								<view class="fui-cell">
									<view class="fui-cell-info">>
										<text selectable="true">{{order.virtualsend_info}}</text>
									</view>
								</view>
							</view>
						</block>
					</block>
					<view class="fui-cell-group price-cell-group">
						<view class="fui-cell">
							<view class="fui-cell-label">商品小计</view>
							<view class="fui-cell-info"></view>
							<view class="fui-cell-remark noremark">¥ {{order.goods_price}}</view>
						</view>
						<view class="fui-cell">
							<view class="fui-cell-label">{{order.city_express_state?'同城运费':'运费'}}</view>
							<view class="fui-cell-info"></view>
							<view class="fui-cell-remark noremark">¥ {{order.freight}}</view>
						</view>
						<block>
							<block v-if="order.discountprice>0">
								<view class="fui-cell">
									<view class="fui-cell-label">积分抵扣</view>
									<view class="fui-cell-info"></view>
									<view class="fui-cell-remark noremark">-¥ {{order.discountprice}}</view>
								</view>
							</block>
						</block>
						<block>
							<block v-if="order.creditmoney>0">
								<view class="fui-cell">
									<view class="fui-cell-label">积分抵扣</view>
									<view class="fui-cell-info"></view>
									<view class="fui-cell-remark noremark">-¥ {{order.creditmoney}}</view>
								</view>
							</block>
						</block>
						<block>
							<block v-if="order.deductcredit2>0">
								<view class="fui-cell">
									<view class="fui-cell-label">余额抵扣</view>
									<view class="fui-cell-info"></view>
									<view class="fui-cell-remark noremark">-¥ {{order.deductcredit2}}</view>
								</view>
							</block>
						</block>
						<block>
							<block v-if="order.discount>0">
								<view class="fui-cell">
									<view class="fui-cell-label">团长优惠</view>
									<view class="fui-cell-info"></view>
									<view class="fui-cell-remark noremark">-¥ {{order.discount}}</view>
								</view>
							</block>
						</block>
						<block>
							<block v-if="order.isdiscountprice>0">
								<view class="fui-cell">
									<view class="fui-cell-label">促销优惠</view>
									<view class="fui-cell-info"></view>
									<view class="fui-cell-remark noremark">-¥ {{order.isdiscountprice}}</view>
								</view>
							</block>
						</block>
						<view class="fui-cell">
							<view class="fui-cell-label" style="width:auto;">实付费(含运费)</view>
							<view class="fui-cell-info"></view>
							<view class="fui-cell-remark noremark">
								<text class="text-danger">
									<text style="font-size:30rpx">¥ {{order.money}}</text>
								</text>
							</view>
						</view>
					</view>
					<view class="fui-cell-group" v-if="order.status==1">
						<view class="fui-cell">
							<block>
								<navigator class="btn btn-danger-o btn-sm" :url="'../mygroups/groups_detail?id='+order.teamid">查看拼团</navigator>
							</block>
						</view>
					</view>
					<view class="fui-cell-group">
						<view class="order-info" style="padding: 0;">
							<view class="fui-cell-label item_one" style="font-size:24rpx;color:#999;padding:none;">
								<text class="fui-cell-label" selectable="true">订单编号：{{order.orderno}}</text>
							</view>
							<view class="fui-cell-label item_one" style="font-size:24rpx;color:#999">
								<text class="fui-cell-label" selectable="true">下单时间：{{order.createtime}}</text>
							</view>
							<block>
								<block v-if="order.paytime">
									<view class="fui-cell-label item_one" style="font-size:24rpx;color:#999">
										<text class="fui-cell-label" selectable="true">支付方式：微信</text>
									</view>
								</block>
							</block>
							<block>
								<block>
									<view class="fui-cell-label item_one" style="font-size:24rpx;color:#999;">
										<text class="fui-cell-label" selectable="true">订单金额：<text style="color:#ff5722;">{{order.price}}</text></text>
									</view>
								</block>
							</block>
							<block>
								<block v-if="order.paytime">
									<view class="fui-cell-label item_one" style="font-size:24rpx;color:#999">
										<text class="fui-cell-label" selectable="true">支付时间：{{order.paytime}}</text>
									</view>
								</block>
							</block>
							<block>
								<block v-if="order.sendtime&&order.isverify==0">
									<view class="fui-cell-label item_one" style="font-size:24rpx;color:#999">
										<text class="fui-cell-label" selectable="true">发货时间：{{order.sendtime}}</text>
									</view>
								</block>
							</block>
						</view>
					</view>
					<view class="fui-cell-group" v-if="address">
						<view class="order-info" style="padding:0;">
							<view class="fui-cell-label item_one" style="font-size:24rpx;color:#999;padding:none;">
								<text class="fui-cell-label" selectable="true">订单状态：<text style="color:#ff5722;font-weight: bold;">{{order.status_str}}</text></text>
							</view>
							<view class="fui-cell-label item_one" style="font-size:24rpx;color:#999">
								<text class="fui-cell-label" selectable="true">配送方式：送货上门</text>
							</view>
							<block>
								<block>
									<view class="fui-cell-label item_one" style="font-size:24rpx;color:#999">
										<text class="fui-cell-label" selectable="true">收货人：{{address.realname}} {{address.mobile}}</text>
									</view>
								</block>
							</block>
							<block>
								<block>
									<view class="fui-cell-label item_one" style="font-size:24rpx;color:#999">
										<text class="fui-cell-label" selectable="true">收货地址：{{address.province+address.city+address.area+' '+address.address}}</text>
									</view>
								</block>
							</block>
							<block>
								<block v-if="order.finishtime">
									<view class="fui-cell-label item_one" style="font-size:24rpx;color:#999">
										<text class="fui-cell-label" selectable="true">完成时间：{{order.finishtime}}</text>
									</view>
								</block>
							</block>
						</view>
					</view>
					<view class="fui-cell-group" v-if="store&&order.isverify==1">
						<view class="order-info " style="padding: 0;">
							<view class="fui-cell-label item_one" style="font-size:24rpx;color:#999;padding:none;">
								<text class="fui-cell-label" selectable="true">订单状态：
									<text style="color:#ff5722;font-weight: bold;">{{order.status_str}}</text>
								</text>
							</view>
							<view class="fui-cell-label item_one" style="font-size:24rpx;color:#999">
								<text class="fui-cell-label" selectable="true">配送方式：自提</text>
							</view>
							<block>
								<block v-for="(item,index) in store">
									<view class="fui-cell-label item_one" style="font-size:24rpx;color:#999">
										<text class="fui-cell-label" selectable="true">自提地点：{{item.address}}</text>
									</view>
								</block>
							</block>
							<block>
								<block v-if="order.status>0&&(order.success == 1 ||order.is_team == 0)">
									<view class="fui-cell-label item_one" style="font-size:24rpx;color:#999;border-bottom: none;">
										<text class="fui-cell-label" selectable="true">提货码：{{order.verifycode}}</text>
										<view class="Rcode">
											<image :src="qrcode"></image>
										</view>
									</view>
								</block>
							</block>
						</view>
					</view>
				</view>
			</block>
			<block>
				<block v-if="order.diyformfields.length>0">
					<view>
						<!--template is="diyform" data="{{diyform:order}}"></template-->
					</view>
				</block>
			</block>
			<view class="fui-footer aa ">

				<block>
					<block v-if="order.status==0">
						<view class="btn btn-default btn-default-o btn-sm" @click="cancel">
							取消订单
						</view>
					</block>
				</block>
				<block>
					<block v-if="order.status==1">
						<navigator class="btn btn-danger-o btn-sm" :url="'../mygroups/groups_detail?id='+order.teamid">查看拼团</navigator>
					</block>
				</block>
				<block>
					<block v-if="order.status==0">
						<navigator class="btn btn-danger-o btn-sm" :url="'../money/grouppay?id='+order.id">支付订单</navigator>
					</block>
				</block>
				<block>
					<block v-if="order.isverify==1&&order.status>0&&verifynum>0&&order.refundstate==0&&(order.success==1||order.is_team==0)">
						<view @click="code" class="btn btn-default btn-default-o btn-sm">我要使用</view>
					</block>
				</block>
				<block>
					<block v-if="order.status==3||order.status==-1">
						<view @click="delete_(order_id)" class="btn btn-default btn-default-o btn-sm">删除订单</view>
					</block>
				</block>
				<block>
					<block v-if="order.status==2">
						<view @click="finish(order_id)" class="btn btn-default btn-default-o btn-sm">确认收货</view>
					</block>
				</block>
				<block>
					<block v-if="order.status>0&&order.status!=3&&(order.success!=0||order.is_team==0)&&!goodRefund">
						<navigator class="btn btn-default btn-default-o btn-sm" :url="'../refund/index?id='+order.id">{{order.status==1?'申请退款':'申请售后'}}{{order.refundstate>0?'中':''}}</navigator>
					</block>
				</block>
				<block>
					<block v-if="order.refundstate>0">
						<view @click="refundcancel" class="btn btn-default-o btn-sm btn-cancel">取消申请</view>
					</block>
				</block>
			</view>
			<view :class="['fui-modal ',code?'show':'hidden']"></view>
			<view :class="['fui-modal-info ',code?'show':'hidden']">
				<view class="close">
					<image @click="close" src="/static/images/icon-white/round_close-48.png"></image>
				</view>
				<image class="code" :src="qrcode"></image>
				<view class="tap">
					<view>如果无法扫描?</view>
					<view>请使用消费码或自提码核销</view>
					<view>(请将此二维码出示给店员进行核销)</view>
				</view>
			</view>
		</block>
		<uni-popup ref="popup" type="center">
		    <view class="share_box">
				<view>
					<text >{{order.status_str}}</text>
				</view>
				<view style="margin:20rpx;">
					<view>已有<text>{{data.nn}}</text>人参与,还差<text>{{data.n}}</text>人拼团成功</text></view>
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="share" style="height:auto;background:none;">
						<image src="/static/img/wxlogo.png">
						<view style="text-align:center;">微信好友</view>
					</button>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<button @click="shares" style="height:auto;background:none;">
					
						<image src="/static/img/wxlogo.png">
						<view style="text-align:center;">微信好友</view>
					</button>
					<!-- #endif -->
				</view>
				<button class="share-btn" @click="hiddenpopup">暂不邀请</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'

	import {
		groupsorderdetails,
		groupsordercancel,
		getgroupqrcode,
		groupteamdetails 
	} from '@/api/public';
	export default {
		data() {
			return {
				code: !1,
				consume: !1,
				store: !1,
				cancelindex: 0,
				diyshow: {},
				city_express_state: 0,
				order_id: 0,
				order: [],
				address: [],
				show: 0,
				goods: {},
				qrcode: '',
				data:{
					tuan_first_order:{
						success:!0
					}
				},
				titleshow:!1,
			}
		},
		components: {
			uniPopup
		},
		onLoad(options) {
			this.id = options.id
			
			this.info();
			uni.showLoading({
				title: '加载中'
			});
		},
		onShow() {

		},
		onShareAppMessage(res){
			var i = this.data.tuan_first_order.teamid,shopshare = this.data.shopshare;
		
			
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			return {
			  title: shopshare.title|| "拼团",
			  path: "pages/mygroups/groups_detail?id="+i,
			  content:shopshare.desc, 
			  imageUrl:shopshare.imgUrl,
			}
			
		},
		methods: {
			info() {
				let that = this;
				groupsorderdetails(that.id).then(data => {
         
					uni.hideLoading();
					if (data.error == 0) {
						that.show = !0,
							that.express = data.express,
							that.order = data.order,
							that.address = data.address,
							that.store = data.store,
							that.verify = data.verify,
							that.verifynum = data.verifynum,
							that.verifytotal = data.verifytotal,
							that.carrier = data.carrier,
							that.shop_name = data.sysset.shopname,
							that.goods = data.goods,
							that.goodRefund = data.goodRefund;
							that.grouptde();
							
						if (that.order.isverify == '1') {
							that.getcode();
						}
					} else {
						this.$api.msg(data)
					}
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
                    href: "http://ejm.ilishige.com/lishige/index.html?url="+curRoute+"+id="+i,//这地址太长了，就省略了
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
				  link: "http://h5.ilishige.com/"+curRoute+"?id="+ this.data.tuan_first_order.teamid, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
			grouptde(){
				groupteamdetails(this.order.teamid).then(res => {
					if(res.data.lasttime2 > 0&&res.data.tuan_first_order.success == 0)
					this.$nextTick(function(){
					   this.titleshow = !0;
						this.$refs.popup.open();
					})
						this.data = res.data;
				})
			},
			toggle() {

			},
			goPay() {
				let that = this;
				uni.navigateTo({
					url: '/pages/money/grouppay?orderid=' + that.id
				});
			},
			hiddenpopup () {
				this.$refs.popup.close();
			},
			cancel() {
				let that = this;
				groupsordercancel(that.id).then(data => {

					if (data.error == 1) {
						this.$api.msg(data.message)
					} else {
						uni.showLoading({
							title: '加载中'
						});
						that.info();
					}
				})
			},
			delete_() {
				
			},
			goOdInfo() {

			},
			goShop() {

			},
			getcode() {
				let that = this;
				getgroupqrcode({
					id: that.id,
					verifycode: that.order.verifycode
				}).then(res => {
					that.qrcode = res.url
				})
				
				
			}
		}
	}
</script>

<style>
	@import "@/static/wuBaseWxss/0.wxss";
	
	.share_box{
		background:#fff;
		
		padding:25rpx 30rpx;
		border-radius: 15rpx;
	}
	.share_box text{
		color:#ff5722;
	}
	.share_box image{
		width: 150rpx;
		height: 150rpx;
	}
	.share-btn{
		height:60rpx;
		color:#B1B1B1;
		font-size:28rpx;
		line-height:60rpx;
		background:#fff;
		
	}
	.item_one {
		border-bottom: 1px solid #f2f2f2;
	}

	.item_one text {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		color: #333;
		font-size: 28rpx;
	}

	.Rcode {
		width: 260rpx;
		height: 260rpx;
		margin-left: 115rpx;
		border: 1px solid #f2f2f2;
	}

	.Rcode image {
		width: 100%;
		height: 100%;
	}

	page {
		background-color: #F2F2F2;
	}

	.fui-footer {
		text-align: right;
	}

	.bg {
		background: linear-gradient(to right, #ffb43e 0%, #fd9526 100%);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffb43e, endColorstr=#fd9526, gradientType='1');
		-webkit-box-flex: 1;
		flex: 1;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 24rpx;
		font-size: 26rpx;
		height: 160rpx;
		color: #fff;
	}

	.red .bg {
		background: #fc664c;
		background: linear-gradient(to right, #fdad89 0%, #f94444 100%);
		background: -webkit-linear-gradient(left, #fdad89 0%, #f94444 100%);
	}

	.blue .bg {
		background: #4e87ee;
		background: linear-gradient(to right, #4fbaee 0%, #4e87ee 100%);
		background: -webkit-linear-gradient(left, #4fbaee 0%, #4e87ee 100%);
	}

	.purple .bg {
		background: #a839fa;
		background: linear-gradient(to right, #6a60ff 0%, #a839fa 100%);
		background: -webkit-linear-gradient(left, #6a60ff 0%, #a839fa 100%);
	}

	.orange .bg {
		background: #ff8c1e;
		background: linear-gradient(to right, #ffb81e 0%, #ff8c1e 100%);
		background: -webkit-linear-gradient(left, #ffb81e 0%, #ff8c1e 100%);
	}

	.pink .bg {
		background: #ff7e95;
		background: linear-gradient(to right, #ffacd0 0%, #ff7e95 100%);
		background: -webkit-linear-gradient(left, #ffacd0 0%, #ff7e95 100%);
	}

	.row {
		font-size: 30rpx;
		font-weight: bold;
	}

	.order-price {
		font-size: 27rpx;
		color: #fff;
		line-height: 44rpx;
	}

	.adress {
		font-size: 27rpx;
		color: #666;
	}

	.order-info {
		padding: 20rpx 0;
	}

	.order-info view,
	.send-code {
		padding: 6rpx 25rpx;
		color: #666;
		font-size: 28rpx;
	}

	.send-code.send-code1 {
		padding: 6rpx 24rpx;
		color: #666;
		font-size: 28rpx;
	}

	.price {
		font-size: 26rpx;
		color: #000;
		margin-left: 20rpx;
	}

	.fui-list-inner .subtitle {
		line-height: 40rpx;
	}

	.send-code {
		display: none;
	}

	.fui-cell-group.toggleSend-group .send-code {
		display: block;
		font-size: 26rpx;
	}

	.fui-cell-group.toggleSend-group .fui-cell .fui-cell-remark::after {
		transform: rotate(135deg);
	}

	.fui-list-media .image-48 {
		height: 48rpx;
		width: 48rpx;
	}

	.text-padding {
		padding: 0 10rpx;
	}

	.image-48 {
		margin: 8rpx 0;
	}

	.operate {
		display: flex;
	}

	.operate navigator {
		flex: 1;
	}

	.fui-cell-group .fui-cell .fui-cell-remark {
		color: #888;
		text-align: right;
		font-size: 28rpx;
		margin-right: 8rpx;
	}

	.btn {
		height: 56rpx;
		line-height: 52rpx;
		border-radius: 40rpx;
		padding: 0 26rpx;
		margin-top: 24rpx;
		font-size: 26rpx;
	}

	.btn .icox {
		margin-right: 6rpx;
		vertical-align: baseline;
		font-size: 30rpx;
	}

	.btn.btn-sm {
		margin-top: 24rpx;
		margin-right: 24rpx;
	}

	.look-diyinfo {
		position: relative;
	}

	.look-diyinfo::after {
		content: " ";
		display: inline-block;
		transform: rotate(45deg);
		height: 16rpx;
		width: 16rpx;
		border-width: 1rpx 1rpx 0 0;
		border-color: #b2b2b2;
		border-style: solid;
		position: absolute;
		top: 5rpx;
		right: 10rpx;
	}

	.look-diyinfo.open::after {
		content: " ";
		display: inline-block;
		transform: rotate(135deg);
		height: 16rpx;
		width: 16rpx;
		border-width: 1rpx 1rpx 0 0;
		border-color: #b2b2b2;
		border-style: solid;
		position: absolute;
		top: 0rpx;
		right: 10rpx;
	}

	.fui-cell-title {
		font-size: 28rpx;
	}

	.gift-picker {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
	}

	.fui-list.no-border {
		background: #f9f9f9;
		margin-top: 4rpx;
		font-size: 24rpx;
		color: #999;
	}

	.no-border .fui-list-inner .subtitle {
		line-height: 1.5;
	}

	.no-border .row {
		font-weight: normal;
	}

	.no-border .fui-list-media image {
		width: 100rpx;
		height: 100rpx;
	}

	.no-border .row-text {
		color: #000;
	}

	.row-remark {
		text-align: right;
		position: relative;
		flex-shrink: 0;
		padding-left: 20rpx;
		color: #aaa;
		font-size: 26rpx;
		line-height: 1.5;
	}

	.more {
		justify-content: center;
	}

	.cycle-underway {
		height: 170rpx;
		padding: 20rpx 24rpx 0;
		position: relative;
		color: #666;
		font-size: 28rpx;
	}

	.cycle-underway:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		border-top: 1rpx solid #EBEBEB;
		color: #d9d9d9;
		height: 1rpx;
		width: 100%;
		transform-origin: 0 0;
		transform: scaleY(0.5);
	}

	.cycle-underway .cycle-cell {
		margin-bottom: 18rpx;
		padding: 0;
	}

	.fui-cell-group.cycle .fui-cell .fui-cell-remark {
		color: #ff5555;
		font-size: 28rpx;
	}

	.fui-cell-group.cycle .fui-cell .fui-cell-remark:after {
		border-color: #ff5555;
	}

	.wrapview {
		width: 530rpx;
		word-wrap: break-word;
		word-break: break-all;
	}
</style>
