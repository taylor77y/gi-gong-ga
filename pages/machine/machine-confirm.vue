<template>
	<view class="page">
		<xl-header title=""></xl-header>

		<view class="container">
			<view class="title">
				Purchase amount
			</view>
<!-- 			<view class="input-container">
				<input disabled type="text" class="input" placeholder="Enter amount" placeholder-style="color: #C0C0C0">
				<view class="usdt">
					USDT
				</view>
			</view> -->
			<view class="row mt-20">
				<view class="left">
					Est. Interest
				</view>
				<view class="right">
					Every day
				</view>
			</view>
			<view class="row">
				<view class="left">
					Amount limits:
				</view>
				<view class="right">

				</view>
			</view>
			<view class="row">
				<view class="left">
					Amount limits:
				</view>
				<view class="right">

				</view>
			</view>
			<view class="row">
				<view class="left">
					Amount limits:
				</view>
				<view class="right">

				</view>
			</view>
			<view class="row">
				<view class="left">
					Amount limits:
				</view>
				<view class="right">

				</view>
			</view>
			<view class="row">
				<view class="left">
					Amount limits:
				</view>
				<view class="right">

				</view>
			</view>

			<view class="btn-container">
				<button class="btn mr-20" @tap="cancelClick()">Cancel</button>
				<button type="primary" class="btn ml-20" @tap="confirmClick()">Confirm</button>
			</view>
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
			cancelClick() {
				uni.navigateBack()
			},
			confirmClick(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.container {
			padding: 30rpx;

			.title {
				font-size: 32rpx;
				font-weight: 600;
				padding-top: 40rpx;
				padding-bottom: 30rpx;
			}

			.input-container {
				padding: 10rpx 30rpx 10rpx 0rpx;
				display: flex;
				align-items: center;
				background-color: #f5f5f5;
				border-radius: 6rpx;


				.input {
					width: 100%;
					background-color: transparent;
				}

				.usdt {}

				.all {
					padding-left: 6rpx;
					color: #2c78f8;
				}
			}

			.mt-20 {
				margin-top: 20rpx;
			}

			.row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 29rpx;
				padding: 20rpx 0;

				.left {
					color: #868c9a;
				}

				.right {
					color: #333;
					// font-weight: 700;
				}
			}

			.btn-container {
				margin-top: 50rpx;
				padding: 30rpx 0;
				display: flex;
				box-sizing: border-box;

				.btn {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 28rpx;
					line-height: 32rpx;
					padding: 20rpx;

					&.mr-20 {
						margin-right: 20rpx;
					}

					&.ml-20 {
						margin-left: 20rpx;
					}

					&::after {
						content: '';
						position: absolute;
						width: 100%;
						height: 100%;
						transform-origin: 0 0;
						transform: scale(0.5, 0.5) translateZ(0);
						box-sizing: border-box;
						left: 0;
						top: 0;
						border-radius: 12rpx;
						border: 0;
					}
				}
			}

		}
	}
</style>
