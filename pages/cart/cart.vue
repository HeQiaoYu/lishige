<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty===true" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>
		<view v-else>
			<view class="youhuiBox">
				<view class="yhItem myOdItem" v-for="(item, index) in merch_list" :key="item.merchid">
					<view class="odShop flexBox between">
						<view class="yticon icon-xuanzhong2 cartItemIcon" :class="{checked: item.selected}" @click="check('item', index)"></view>
						<view class="proXqShop-int flexBox odShop-int">
							<uni-icons class="odShop-icon" type="shop"></uni-icons>
							<view class="proShop-int flexBox">
								<view class="proShop-title ellipsis-1">{{item.merchname?item.merchname:'自营商品'}}</view>
								<uni-icons type="arrowright"></uni-icons>
							</view>
						</view>
						<view class="proXqShop-jt" @click="delectCartlist(index)">
							<uni-icons type="trash"></uni-icons>
						</view>
					</view>
					<view v-for="(val, key) in item.list" class="indProItem uni-media-list odProItem">
						<view class="indProIt-image odProIt-image flexBox">
							<view class="yticon icon-xuanzhong2 cartItemIcon" :class="{checked: val.selected == 1 ? true : false}" @click="selected({id: val.id, select: val.selected})"></view>
							<view class="">
								<image :src="val.thumb" mode="aspectFill" lazy-load @load="onImageLoad('cartList', index)" @error="onImageError('cartList', index)"></image>
							</view>
						</view>
						<view class="indProIt-int uni-media-list-body">
							<view class="">
								<view class="indPro-tit ellipsis-2">{{val.title}}</view>
								<view class="gwcGg flexBox fl" v-if="val.optionid != 0">
									<text>{{val.optiontitle}}</text>
									<uni-icons type="arrowdown"></uni-icons>
								</view>
								<view class="clear"></view>
							</view>
							<view class="indPro-dibu flexBox between">
								<view class="indPro-money">
									<text class="indProPri"><text class="indProPriSml">￥</text>{{val.marketprice}}</text>
								</view>
								<uni-number-box class="step" :min="1" :max="val.totalmaxbuy" :value="val.cart_number>val.totalmaxbuy?val.totalmaxbuy:val.cart_number"
								 :isMax="val.cart_number>=val.totalmaxbuy?true:false" :isMin="val.cart_number===1" :cartid="val.id"  :optionid="val.optionid"  @eventChange="number($event)"></uni-number-box>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in list" :key="item.id">
					<view
						class="cart-item" 
						:class="{'b-b': index!==list.length-1}"
					>
						<view class="image-wrapper">
							<image :src="item.thumb" 
								:class="[item.loaded]"
								mode="aspectFill" 
								lazy-load 
								@load="onImageLoad('list', index)" 
								@error="onImageError('list', index)"
							></image>
							<view 
								class="yticon icon-xuanzhong2 checkbox"
								:class="{checked: item.selected == 1 ? true : false}"
								@click="selected({id:item.id,select:item.selected})"
							></view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.title}}</text>
							<text class="attr">{{item.optiontitle}}</text>
							<text class="price">¥{{item.marketprice}}</text>
							<uni-number-box 
								class="step"
								:min="1" 
								:max="item.totalmaxbuy"
								:value="item.cart_number>item.totalmaxbuy?item.totalmaxbuy:item.cart_number"
								:isMax="item.cart_number>=item.totalmaxbuy?true:false"
								:isMin="item.cart_number===1"
								:index="index"
								:cartid="item.id"
								:optionid="item.optionid"
								@eventChange="number"
							></uni-number-box>
						</view>
						<text class="del-btn yticon icon-fork" @click="deleteCartItem(id)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox flexBox" @click="checkall">
					<view class="yticon icon-xuanzhong2 cartItemIcon" :class="ischeckall?'checked':''"></view>
					全选
				</view>
				<view class="total-box">
					合计：
					<text class="price">¥{{totalprice}}</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import a from "@/utils/jquery"; 
	import {
		cart,
		cartUpdate,
		cartSelect,
		cartDelect,
		cartSubmit
	} from '@/api/user'
	import uniNumberBox from '@/components/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
				merch_list: [],
				list:[],
				hasLogin: this.$store.state.app.hasLogin,
				totalprice:0,
				ischeckall:false
			};
		},
		onShow() {
			this.loadData();
		},
		onLoad() {

		},
		watch: {
			//显示空白页
			cartList(e) {
				let empty = e.length === 0 ? true : false;
				if (this.empty !== empty) {
					this.empty = empty;
				}
			}
		},
		computed: {

		},
		methods: {
			//请求数据
			async loadData() {
				let i = this;
				cart().then(e => {
					i.show = !0, i.ismerch = !1, i.ischeckall = e.ischeckall, i.can_sync_goodscircle = e.can_sync_goodscircle, i.total = e.total, i.cartcount = e.total, i.totalprice = e.totalprice, i.empty = e.empty ||!1,
					i.sysset = e.sysset;
					void 0 === e.merch_list ? (i.list = e.list || []) : (i.merch_list = e.merch_list || [],i.ismerch = !0);
					for(var li in i.merch_list) {
						let check = 0;
						for(let lis in i.merch_list[li].list){
							if(i.merch_list[li].list[lis].selected == 1){
								check++;
							}
						}
						if(check < i.merch_list[li].list.length){
							i.merch_list[li].selected = false;
						}else{
							i.merch_list[li].selected = true;
						}
						
					
						
					}
				})
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			navToLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			checkall() {
				let i = this, a = i.ischeckall ? 0 : 1;
				cartSelect({id: 'all', select: a}).then(r => {
					i.loadData();
				})
			},
			update() {
				let i = this, a = i.ischeckall ? 0 : 1;
				cartSelect({id: 'all', select: a}).then(r => {
					i.loadData();
				})
			},
			//数量
			number(t) {
				let a = this;
				cartUpdate({id: t.cartid, optionid: t.optionid, total: t.number}).then(res => {
					a.loadData();
				})
			},
			selected(t) {
				let i = this,s = t.id,c =1 == t.select ? 0 : 1;
				cartSelect({id : s, select : c}).then(res => {
					i.loadData();
				})
				
			},
			allgoods(t) {
				let e = this.edit_list;
				if(!a.isEmptyObject(e) && void 0 === t) return e;
				if(t = void 0 !== t && t, this.ismerch) for (var i in this.merch_list) for (var s in this.merch_list[i].list) e[this.merch_list[i].list[s].id] = t; else for (var i in this.list) e[this.list[i].id] = t;
				return e;
				
			},
			checked_allgoods() {
				let t = this.allgoods(),e = [],i = 0;
				for(var a in t) t[a] && (e.push(a), i++);
				return {
					data: e,
					cartcount: i
				};	
			},
			editcheckall(t) {
				let i = t.check; a = this.allgoods(i);
				this.edit_list = a ,this.iseditcheckall = !i;
				this.editischecked();
			},
			editischecked() {
				var t = !1, e = !0, i = this.allgoods();
				for (var a in this.edit_list) if (this.edit_list[a]) {
					t = !0;
					break;
				}
				for (var s in i) if (!i[s]) {
					e = !1;
					break;
				}
				this.iseditcheckall = e;
				this.editischeckeds = t;
			},
			edit_list(t) {
				var i = t;a = this.edit_list;
				void 0 !== a[i.id] && 1 == a[i.id] ? a[i.id] = !1 : a[i.id] = !0, this.edit_list = a, this.editischecked();
			},
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					this.cartList[index].checked = !this.cartList[index].checked;
				} else {
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item => {
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//删除
			deleteCartItem(id) {
				cartDelect({ids: [id]}).then(res => {
					this.loadData();
				})
			},
			//删除商铺的
			delectCartlist(index){
				let list = this.merch_list[index].list,e = [];
				for(let i in list) {
					e.push(list[i].id)
				}
				cartDelect({ids: JSON.stringify(e)}).then(res => {
					this.loadData();
				})
				
			},
			//清空
			clearCart() {
				uni.showModal({
					content: '清空购物车？',
					success: (e) => {
						if (e.confirm) {
							this.cartList = [];
						}
					}
				})
			},
			//计算总价
			calcTotal() {
				let list = this.cartList;
				if (list.length === 0) {
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item => {
					if (item.checked === true) {
						total += item.price * item.number;
					} else if (checked === true) {
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
			},
			//创建订单
			createOrder() {
				this.total > 0 && cartSubmit().then(res => {
					uni.navigateTo({
						url: `/pages/order/createOrder`
					})
				})
			}
		}
	}
</script>

<style lang='scss'>
	.container {
		padding-bottom: 134upx;

		/* 空白页 */
		.empty {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			image {
				width: 240upx;
				height: 160upx;
				margin-bottom: 30upx;
			}

			.empty-tips {
				display: flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;

				.navigator {
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		position: relative;
		padding: 30upx 40upx;

		.image-wrapper {
			width: 230upx;
			height: 230upx;
			flex-shrink: 0;
			position: relative;

			image {
				border-radius: 8upx;
			}
		}

		.checkbox {
			position: absolute;
			left: -16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background: #fff;
			border-radius: 50px;
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 30upx;

			.title,
			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}

			.attr {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}

			.price {
				height: 50upx;
				line-height: 50upx;
			}
		}

		.del-btn {
			padding: 4upx 10upx;
			font-size: 34upx;
			height: 50upx;
			color: $font-color-light;
		}
	}

	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 0 0 30upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.checkbox {
			height: 36upx;
			position: relative;

			image {
				width: 52upx;
				height: 100%;
				position: relative;
				z-index: 5;
			}
		}

		.clear-btn {
			position: absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: .2s;

			&.show {
				opacity: 1;
				width: 120upx;
			}
		}

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 26upx;
			display: block;
			color: #999;
			font-size: 24rpx;

			.price {
				font-size: 26rpx;
				color: #FF5722;
			}

			.coupon {
				font-size: $font-sm;
				color: $font-color-light;

				text {
					color: $font-color-dark;
				}
			}
		}

		.confirm-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72);
			width: 200rpx;
			height: 100rpx;
			line-height: 98rpx;
			border-radius: 0;
		}
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: $uni-color-primary;
	}

	page {
		background-color: #F2F2F2;
	}

	.myOdItem {
		padding-bottom: 10rpx;
	}

	.indPro-dibu {
		align-items: flex-end;
	}

	.indPro-tit {
		letter-spacing: 0;
	}

	.uni-numbox {
		width: auto;
	}

	/* .uni-numbox__minus { height: 44rpx !important;line-height: 44rpx !important;}
	.uni-numbox__value { height: 44rpx !important;line-height: 44rpx !important;}
	.uni-numbox__plus { height: 44rpx !important;line-height: 44rpx !important;} */


	.youhuiBox {
		padding-bottom: 0;
	}
</style>
