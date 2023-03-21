<template>
	<view class="page">
		<!-- <view class="gooleVerifyPage flex-col">
		      <view class="image-wrapper_1 flex-row justify-between">
		        <image @click="back()" class="icon_1" referrerpolicy="no-referrer"
		               src="/static/lanhu_zhuce2/psp7pfts61abml9bqfww31ud54m8lwlnff9c1d27e1-8110-48ab-824d-24b76b7c6231.png" />
		        <text @click="cancel()">跳过</text>
		      </view>
		    </view> -->
		<!-- 步骤条 -->
		<view class="gooleverifyStep u-margin-top-80">
		  <u-steps :list="numList" :current="3" mode="number" active-color="#00EE76"></u-steps>
		</view>
		<view class="container">
			<view class="suc u-margin-top-50 u-text-center">
				<h2>注册成功</h2>
			</view>
			<view class="sub u-margin-top-30 u-text-center">
				<h3>开启您的数字货币之旅</h3>
			</view>
			<view class="agreeOne u-margin-left-75 u-margin-top-35" >
				<u-radio-group v-model="value1">
					<u-radio name="1">
						<text style="font-size:23rpx; color:#909399">我已同意授权调用系统信息通知权限</text>
					</u-radio>
				</u-radio-group>
			</view>
			<view class="agreeTwo u-margin-left-75 u-margin-top-25">
				<u-radio-group v-model="value2">
					<u-radio name="1">
						<text style="font-size:23rpx; color:#909399">我已同意授权访问地址簿</text>
					</u-radio>
				</u-radio-group>
			</view>
		</view>
		
		<view class="business u-margin-left-30 flex jcsb" @click="sell()">
			<view class="">
				<view class="wantBuy">
					我想要买币
				</view>
				<view class="wantBuiness">
					去交易
					<image type="image" class="arrowhead" src="../../static/img/down.png" alt=""/>
				</view>
			</view>
			<image class="img" src="../../static/img/finish2.png" style="margin-top: 40rpx;"></image>
		</view>
		<view class="business u-margin-left-30 flex jcsb" @click="sell()" style="margin-bottom: 30rpx;">
			<view class="">
				<view class="wantBuy">
					我想要充值
				</view>
				<view class="wantBuiness">
					去充值
					<image type="image" class="arrowhead" src="../../static/img/down.png" alt=""/>
				</view>
			</view>
			<image class="img" src="../../static/img/finish.png" style="margin-top: 40rpx;"></image>
		</view>
			<u-button class="" type="primary" style="margin: 20rpx 23rpx;" @click="sure()">确定</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1: 1,
				value2: 1,
				numList: [{
				  name: this.$t('member').zhzc
				}, {
				  name: this.$t('member').smrz
				}, {
				  name: this.$t('member').aqbd
				}, {
				  name: this.$t('member').qjy
				}, ],
			}
		},
		methods: {
			buy(){
				uni.navigateTo({
					url:'/pages/transaction/index'
				})
			},
			sell() {
				uni.navigateTo({
					url:'/pages/recharge/rechargeList'
				})
			},
			sure() {
				uni.navigateTo({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex{
		display: flex;
	}
	.jcsb{
		justify-content: space-between;
	}
	.business .arrowhead {
		width: 20rpx;
		height: 20rpx;
		padding-left: 10rpx;
	}
	.container .suc {
		font-size: 35rpx;
		}
	.container .sub {
		font-size: 35rpx;
	}
	.business{
		margin-top: 30rpx;
		width: 700rpx; 
		height: 200rpx;
		border: 1rpx solid #eee;
		background: #eee;
		float: left;
		padding-left: 30rpx;
		border-radius: 10rpx;
	}
	.business .wantBuy {
		font-size: 40rpx;
		padding-top: 20rpx;
	}
	.business .wantBuiness{
		font-size: 30rpx;
		padding-top: 60rpx;
	}
	.business .img{
		width: 140rpx;
		height: 120rpx;
		float: right;
		text-align: center;
		padding-right: 30rpx;
	}

</style>
