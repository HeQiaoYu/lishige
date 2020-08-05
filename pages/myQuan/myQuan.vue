<template>
    <view>
        <view class="ptType">
			<view class="ptTypeItem" :class="current==0?'cur':''" @click="onClickItem(0)">
				体验券(2)<text></text>
			</view>
			<view class="ptTypeItem" :class="current==1?'cur':''" @click="onClickItem(1)">
				满赠券(1)<text></text>
			</view>
			<view class="ptTypeItem" :class="current==2?'cur':''" @click="onClickItem(2)">
				现金券(0)<text></text>
			</view>
			<view class="ptTypeItem" :class="current==3?'cur':''" @click="onClickItem(3)">
				联盟品牌使用券(4)<text></text>
			</view>
			<view class="ptTypeItem" :class="current==4?'cur':''" @click="onClickItem(4)">
				新客券(0)<text></text>
			</view>
		</view>
		<view class="youhuiBox" v-if="current==0">
			<view class="yhItem">
				<view class="proXqKuai flexBox between" @click="goShop">
					<view class="proXqShop-int flexBox">
						<view class="proShop-tx"><image :src="url+'static/img/indProductImg1.jpg'" mode=""></image></view>
						<view class="proShop-int">
							<view class="proShop-title ellipsis-1">浪琴旗舰店</view>
						</view>
					</view>
					<view class="proXqShop-jt">
						<text class="proXqShop-tit">进入店铺</text>
						<text class="yticon icon-you"></text>
					</view>
				</view>
				<view class="myQuan flexBox">
					<view class="yhProItem">
						<!--image src="../../static/img/图1@2x.png" mode=""></image-->
					</view>
					<view class="myQuan-int">
						<view class="myQuInt-pri  textOrange">
							￥<text class="textOrange">50</text>满999减50
						</view>
						<view class="myQuInt-p">店铺优惠券</view>
						<view class="myQuInt-p">2020.02.28-2020.03.28</view>
					</view>
					<view class="yhIt-icon flexBox jusCenter myQuan-bj" style="background-image: url(../../static/img/形状结合@2x.png);">
						<view class="yhIt-btn">去使用</view>
					</view>
				</view>
			</view>
			<view class="yhItem">
				<view class="proXqKuai flexBox between" @click="goShop">
					<view class="proXqShop-int flexBox">
						<view class="proShop-tx"><image :src="url+'static/img/indProductImg1.jpg'" mode=""></image></view>
						<view class="proShop-int">
							<view class="proShop-title ellipsis-1">浪琴旗舰店</view>
						</view>
					</view>
					<view class="proXqShop-jt">
						<text class="proXqShop-tit">进入店铺</text>
						<text class="yticon icon-you"></text>
					</view>
				</view>
				<view class="myQuan flexBox">
					<view class="yhProItem">
						<!--image src="../../static/img/图1@2x.png" mode=""></image-->
					</view>
					<view class="myQuan-int">
						<view class="myQuInt-pri  textOrange">
							￥<text class="textOrange">50</text>满999减50
						</view>
						<view class="myQuInt-p">店铺优惠券</view>
						<view class="myQuInt-p">2020.02.28-2020.03.28</view>
					</view>
					<view class="yhIt-icon flexBox jusCenter myQuan-bj" style="background-image: url(../../static/img/形状结合@2x.png);">
						<view class="yhIt-btn">去使用</view>
					</view>
				</view>
				<view class="myQuan flexBox">
					<view class="yhProItem">
						<!--image src="../../static/img/图1@2x.png" mode=""></image-->
					</view>
					<view class="myQuan-int">
						<view class="myQuInt-pri  textOrange">
							￥<text class="textOrange">50</text>满999减50
						</view>
						<view class="myQuInt-p">店铺优惠券</view>
						<view class="myQuInt-p">2020.02.28-2020.03.28</view>
					</view>
					<view class="yhIt-icon flexBox jusCenter myQuan-bj" style="background-image: url(../../static/img/形状结合@2x.png);">
						<view class="yhIt-btn">去使用</view>
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
				current: 0,
				pintuanList:[{},{},{}]
            }
        },
        onLoad() {
            
        },
        methods: {
			onClickItem(e) {
				this.current = e
			},
            goShop() {
            	uni.navigateTo({
            		url: `/pages/shop/shop`
            	})
            }
        }
    }
</script>

<style>
   page { background-color: #f2f2f2;}
   .proXqKuai,.proXqShop-int { padding: 0;margin: 0;}
   
</style>
