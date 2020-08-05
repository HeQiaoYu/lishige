<template>
	<view v-if="show">
		<view class="fui-content">
			<view class="fui-list-group">
				<view class="fui-list order-status">
					<view class="fui-list-inner">
						<view class="title">{{data.order['ordersn']}}</view>
						<view class="text">订单金额: ￥{{data.order['price']}}</view>
					</view>
				</view>
			</view>
			<block v-if="data.carrier||data.store">
				<view class='fui-list'>
					<view class='fui-list-media'><i class='icon icon-person2'></i></view>
					<view class='fui-list-inner'>
						<view class='title'>{{data.carrier['carrier_realname']}} {{data.carrier['carrier_mobile']}}</view>
					</view>
				</view>
				<block v-if="data.store">
					<view class='fui-list'>
						<view class='fui-list-media'><i class='icon icon-shop'></i></view>
						<view class='fui-list-inner'>
							<view class='title'>{{data.store['storename']}}</view>
						</view>
					</view>
				</block>
			</block>
			<view class="fui-list-group goods-list-group">
				<view class="fui-list-group-title"><i class="icon icon-shop"></i> {{data.store['storename']}}</view>
				<block v-for="g in data.allgoods">
					<view @click="goodsinfo(g['goodsid'])">
						<view class="fui-list goods-list">
							<view class="fui-list-media">
								<image :src="tomedia(g['thumb'])" class="round">
							</view>
							<view class="fui-list-inner">
								<view class="text goodstitle">{{g['title']}}</view>
								<view v-if="g['optionid']" class='subtitle'>{{g['optiontitle']}}</view>
							</view>
							<view class='fui-list-angle'>
								￥<span class='marketprice'>{{g['price']}}<br /> x{{g['total']}}</span>
							</view>
						</view>
					</view>
				</block>
			</view>
			<block v-if="data.order['dispatchtype']">

				<view class='fui-cell-group'>
					<view class='fui-cell'>
						<view class='fui-cell-label'>提货码</view>
						<view class='fui-cell-info'></view>
						<view class='fui-cell-remark noremark'>{{data.order['verifycode']}}</view>
					</view>
				</view>
			</block>
			<block v-else>

				<block v-if="data.order['verifytype'] == 0 || data.order['verifytype'] == 3">
					<view class='fui-cell-group'>
						<view class='fui-cell'>
							<view class='fui-cell-label'>消费码</view>
							<view class='fui-cell-info'></view>
							<view class='fui-cell-remark noremark'>{{data.order['verifycode']}}</view>
						</view>
					</view>
				</block>
				<block v-else-if="data.order['verifytype']==1">
					<view class='fui-cell-group'>
						<view class='fui-cell'>
							<view class='fui-cell-label' style='width:auto;'>使用次数 (剩余 <span class='text-danger'>{{data.lastverifys}}</span>
								次)</view>
							<view class='fui-cell-info'></view>
							<view class='fui-cell-remark noremark'>
								<view class="fui-number" data-value='1' :data-max="data.lastverifys" data-min="1">
									<view class="minus">-</view>
									<input class="num shownum" type="tel" name="" value="1" />
									<view class="plus ">+</view>
								</view>
							</view>
						</view>
					</view>
				</block>
				<block v-else>
					<view :class="data.verifyinfo.length<=3 ? 'fui-according-group expanded verify-container' :'fui-according-group verify-container'"
					 :data-orderid="data.order['id']" :data-verifytype="data.order['verifytype']">
						<view class='fui-according expanded'>
							<view class='fui-according-header'>
								<i class='icon icon-list'></i>
								<span class="text">消费码</span>
								<span class="remark">
									<view class="badge">{{verifycode?verifycode:data.$lastverifys}}</view>
								</span>
							</view>
							<view class="fui-according-content verifycode-container">
								<view class='fui-cell-group'>
									<block v-for="v in data.$verifyinfo">
										<block v-if="v['select']">
											<view class='fui-cell verify-cell' :data-verifycode="v['verifycode']">
												<view class='fui-cell-label' style='width:auto'>

													<input v-if="!v['verified']" type='checkbox' class='fui fui-checkbox fui-checkbox-danger verify-checkbox' />
													{{v['verifycode']}}
												</view>
												<view class='fui-cell-info'></view>
												<view class='fui-cell-remark noremark'>
													<view v-if="v['verified']" class='fui-label fui-label-danger'>已使用</view>
													<view v-else class='fui-label fui-label-default'>未使用</view>
												</view>
											</view>
										</block>
									</block>
								</view>
							</view>
						</view>
					</view>
				</block>
			</block>
		</view>
		<view class="fui-footer">
			<view class="btn btn-danger order-verify block" @click="use">
				<i class="icon icon-check"></i>
				<span>{{data.order['dispatchtype']?'确认取货':'确认使用'}}</span>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getVerifyInfo,
		useVerify
	} from '@/api/public';
	export default {
		data() {
			return {
				data: {},
				show: !1,
				store: {}
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.verifycode = options.verifycode;
			this.getOrderInfo()
		},
		methods: {
			getOrderInfo() {
				let t = this;
				getVerifyInfo({
					id: t.id
				}).then(res => {
					t.data = res.order;
					t.store = res.syset
					
					t.show = !0;
				}).catch(res => {
					console.log(res.data);
					console.log(res)
					console.log(res.data.error)
					uni.showModal({
						title:'提醒',
						content:res.data.error,
						showCancel:false,
						success: (res) => {
							uni.navigateBack()
						}
					})
				
				})
			},
			use() {
				let t = this;
				useVerify({
					id:t.id
				}).then(res => {
					uni.showModal({
						title:'提醒',
						content:res.message,
						showCancel:false,
						success: (res) => {
							uni.navigateBack()
						}
					})
					
				}).catch(res => {
					uni.showModal({
						title:'提醒',
						content:res.data.error,
						showCancel:false,
						success: (res) => {
							uni.navigateBack()
						}
					})
				})
			},
			tomedia(src) {
				console.log(this.url)
				if(typeof src != 'string')
					return '';
				if(src.indexOf('http://') == 0 || src.indexOf('https://') == 0) {
					return src;
				} else if(src.indexOf('../addons') == 0 || src.indexOf('../attachment') == 0) {
					src=src.substr(3);
					return this.url + src;
				} else if(src.indexOf('./resource') == 0) {
					src=src.substr(2);
					return this.url+ 'app/' + src;
				} else if(src.indexOf('images/') == 0) {
					return this.url+'attachment/'+ src;
				}
			}

		}
	}
</script>

<style>

</style>
