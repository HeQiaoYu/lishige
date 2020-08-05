<template>
    <view>
        <view class="ptType">
			<view class="ptTypeItem" :class="current==0?'cur':''" @click="onClickItem(0)">
				体验券<text></text>
			</view>
			<view class="ptTypeItem" :class="current==1?'cur':''" @click="onClickItem(1)">
				满赠券<text></text>
			</view>
			<view class="ptTypeItem" :class="current==2?'cur':''" @click="onClickItem(2)">
				现金券<text></text>
			</view>
			<view class="ptTypeItem" :class="current==3?'cur':''" @click="onClickItem(3)">
				联盟品牌使用券<text></text>
			</view>
			<view class="ptTypeItem" :class="current==4?'cur':''" @click="onClickItem(4)">
				新客券<text></text>
			</view>
		</view>
		<view class="youhuiBox" v-if="current==0">
			<view class="yhItem">
				<view class="yhIt-header">限时折扣</view>
				<view class="yhIt-proList clear">
					<!--view class="yhProItem fl">
						<image src="../../static/img/图1@2x.png" mode=""></image>
						<text>￥801</text>
					</view>
					<view class="yhProItem fl">
						<image src="../../static/img/图2@2x.png" mode=""></image>
						<text>￥1334</text>
					</view>
					<view class="yhProItem fl">
						<image src="../../static/img/图3@2x.png" mode=""></image>
						<text>￥1580</text>
					</view-->
				</view>
				<view class="yhIt-icon flexBox jusCenter" style="background-image: url(../../static/img/zxhz@2x.png);">
					<view>
						<view class="yhIt-pri">￥<text>50</text></view>
						<view class="yhIt-tj">满999可用</view>
						<view class="yhIt-btn">立即领取</view>
					</view>
				</view>
			</view>
			<view class="yhItem">
				<view class="yhIt-header">手表优惠</view>
				<view class="yhIt-proList clear">
					<!--view class="yhProItem fl">
						<image src="../../static/img/图1@2x.png" mode=""></image>
						<text>￥801</text>
					</view>
					<view class="yhProItem fl">
						<image src="../../static/img/图2@2x.png" mode=""></image>
						<text>￥1334</text>
					</view>
					<view class="yhProItem fl">
						<image src="../../static/img/图3@2x.png" mode=""></image>
						<text>￥1580</text>
					</view-->
				</view>
				<view class="yhIt-icon flexBox jusCenter" style="background-image: url(../../static/img/zxhz@2x.png);">
					<view>
						<view class="yhIt-pri">￥<text>50</text></view>
						<view class="yhIt-tj">满999可用</view>
						<view class="yhIt-btn">立即领取</view>
					</view>
				</view>
			</view>
		</view>
		<view class="youhuiBox" v-if="current==1">
			<view class="yhItem">
				<view class="yhIt-header">手表优惠</view>
				<view class="yhIt-proList clear">
					<!--view class="yhProItem fl">
						<image src="../../static/img/图1@2x.png" mode=""></image>
						<text>￥801</text>
					</view>
					<view class="yhProItem fl">
						<image src="../../static/img/图2@2x.png" mode=""></image>
						<text>￥1334</text>
					</view>
					<view class="yhProItem fl">
						<image src="../../static/img/图3@2x.png" mode=""></image>
						<text>￥1580</text>
					</view-->
				</view>
				<view class="yhIt-icon flexBox jusCenter" style="background-image: url(../../static/img/形状结合@2x.png);">
					<view>
						<view class="yhIt-pri">￥<text>50</text></view>
						<view class="yhIt-tj">满999可用</view>
						<view class="yhIt-btn">立即领取</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>
<script>
    export default {
        data() {
            return {
                tabBars: [{
                    name: '关注',
                    id: 'guanzhu'
                }, {
                    name: '推荐',
                    id: 'tuijian'
                }, {
                    name: '体育',
                    id: 'tiyu'
                }],
				pintuanList:[{},{},{}],
				current: 0,
            }
        },
        onLoad() {
            
        },
        methods: {
            onClickItem(e) {
            	this.current = e
            },
        }
    }
</script>

<style>
   page { background-color: #f2f2f2;}
</style>
