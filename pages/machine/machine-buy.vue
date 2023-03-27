<template>
	<view class="page">
		<xl-header title="体验礦機 3天"></xl-header>
		
		<view class="container">
			<view class="title">
        购买金额
			</view>
			<view class="input-container">
				<input type="text" class="input" placeholder="Enter amount" placeholder-style="color: #C0C0C0">
				<view class="usdt">
					USDT
				</view>
				<view class="all">
					全部
				</view>
			</view>
			<view class="row mt-20">
				<view class="left">
          可用余额
				</view>
				<view class="right">
					0 USDT
				</view>
			</view>
			<view class="row">
				<view class="left">
          数量限制
				</view>
				<view class="right">
					
				</view>
			</view>
			<view class="row">
				<view class="left">
          最少可投
				</view>
				<view class="right">
					1000 USDT
				</view>
			</view>
			<view class="row">
				<view class="left">
          最大可投
				</view>
				<view class="right">
					9999999 USDT
				</view>
			</view>
			<view class="sub-title">
        概览
			</view>
			<view class="row p-30">
				<view class="left">
          购买日
				</view>
				<view class="right">
					2023-03-15
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
          起息日
				</view>
				<view class="right">
					2023-03-16
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
          派息时间
				</view>
				<view class="right">
					Every day
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
          预计今日收益
				</view>
				<view class="right">
					2023-03-20
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
					Early redemption
				</view>
				<view class="right">
					0.6%
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
					Est. Interest
				</view>
				<view class="right">
					0.00 ~ 0.00 USDT
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
					Today (Daily earnings)
				</view>
				<view class="right">
					0.25%
				</view>
			</view>
			<button class="buy-btn" type="primary" @tap="toBuyHandler()">Buy</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toBuyHandler(){
				uni.navigateTo({
					url:'/pages/machine/machine-confirm'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.page{
	.container{
		padding: 30rpx;
		
		.title{
			font-size: 32rpx;
			font-weight: 600;
			padding-top: 40rpx;
			padding-bottom: 30rpx;
		}
		
		.input-container{
			padding: 10rpx 30rpx 10rpx 0rpx;
			display: flex;
			align-items: center;
			background-color: #f5f5f5;
			border-radius: 6rpx;
			
			
			.input{
				width: 100%;
				background-color: transparent;
			}
			
			.usdt{
				
			}
			
			.all{
				padding-left: 6rpx;
				color: #2c78f8;
			}
		}
		
		.mt-20{
			margin-top: 20rpx;
		}
		
		.row{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 29rpx;
			padding: 20rpx 0;
			
			&.p-30{
				padding: 30rpx 0rpx !important;
			}
			
			.left{
				color: #868c9a;
			}
			.right{
				color: #333;
				font-weight: 700;
			}
		}
		
		.sub-title{
			font-size: 29rpx;
			margin-top: 70rpx;
		}
		
		.buy-btn{
			margin-top: 160rpx;
		}
	}
}
</style>
