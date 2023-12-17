<template>
	<view class="page">
		<xl-header :title="i18n.gz"></xl-header>

		<view class="container">
			<view class="header">
				<image src="../../static/image/logo.681b8bb1.png" class="icon"></image>
				<view class="title">
					{{i18n.kjgz}}
				</view>
			</view>
			<view class="content">
				<text class="black" style="font-size: 29rpx;">
					{{i18n.yhsytm}}
				</text>
			</view>
			<view class="table-container">
				<view class="th">
					<view class="th-cel" style="width: 35%;">
						{{i18n.kjmc}}
					</view>
					<view class="th-cel" style="width: 30%;">
						{{i18n.kjje}}
					</view>
					<view class="th-cel" style="width: 15%;">
						{{i18n.zq}}
					</view>
					<view class="th-cel" style="width: 20%;">
						{{i18n.rsy}}
					</view>
				</view>
				<view class="table-body">
					<view class="td">
						<view class="td-cel" style="width: 35%;">
							Super computing power miner 3 days
						</view>
						<view class="td-cel" style="width: 30%;">
							50~1499 USDT
						</view>
						<view class="td-cel" style="width: 15%;">
							Flexible
						</view>
						<view class="td-cel" style="width: 20%;">
							2.5%
						</view>
					</view>
					<view class="td">
						<view class="td-cel" style="width: 35%;">
							FPGA Miner
						</view>
						<view class="td-cel" style="width: 30%;">
							0~0 USDT
						</view>
						<view class="td-cel" style="width: 15%;">
							3
						</view>
						<view class="td-cel" style="width: 20%;">
							3%
						</view>
					</view>
					<view class="td">
						<view class="td-cel" style="width: 35%;">
							Super computing power miner 3 days
						</view>
						<view class="td-cel" style="width: 30%;">
							0~0 USDT
						</view>
						<view class="td-cel" style="width: 15%;">
							3
						</view>
						<view class="td-cel" style="width: 20%;">
							3%
						</view>
					</view>
					<view class="td">
						<view class="td-cel" style="width: 35%;">
							Super computing power miner 3 days
						</view>
						<view class="td-cel" style="width: 30%;">
							0~0 USDT
						</view>
						<view class="td-cel" style="width: 15%;">
							3
						</view>
						<view class="td-cel" style="width: 20%;">
							3%
						</view>
					</view>
					<view class="td">
						<view class="td-cel" style="width: 35%;">
							Super computing power miner 3 days
						</view>
						<view class="td-cel" style="width: 30%;">
							0~0 USDT
						</view>
						<view class="td-cel" style="width: 15%;">
							3
						</view>
						<view class="td-cel" style="width: 20%;">
							3%
						</view>
					</view>
				</view>
			</view>
			<view class="sub-title" style="text-align: center;">
				{{i18n.tgyqjl}}
			</view>
			<view class="content">
				{{i18n.scwks}}
			</view>
			<view class="content p-0">
				1. {{i18n.bcpsysc}}
			</view>
			<view class="content p-0">
				2. {{i18n.scqjyh}}
			</view>
			<view class="content p-0">
				3. {{i18n.kjgmm}}
			</view>
			<button class="buy-btn" type="primary" @tap="toBuy()">{{i18n.qwk}}</button>
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
			toBuy() {
				uni.navigateTo({
					url:'/pages/machine/index'
				})
			}
		},
		computed: {
			i18n() {
				return this.$t("machineIndex")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		font-family: 微软雅黑;

		.container {
			padding: 30rpx;

			.header {
				padding-top: 30rpx;
				display: flex;
				align-items: center;

				.icon {
					width: 92rpx;
					height: 92rpx;
					margin-right: 40rpx;
				}

				.title {
					font-size: 58rpx;
					font-weight: 400;
					color: #333;
				}
			}

			.table-container {
				margin-top: 30rpx;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				color: #868c9a;
				font-size: 26rpx;
				text-align: center;

				.th {
					padding: 10rpx;
					background: #f6f6f6;
					width: 100%;
					display: flex;
					align-items: center;

					.th-cel {}
				}

				.table-body {
					color: #333;
					width: 100%;
					display: flex;
					align-items: center;
					flex-direction: column;

					.td {
						width: 100%;
						margin: 10rpx 0;
						display: flex;
						align-items: center;

						.td-cel {
							margin: 10rpx 0;
						}
					}
				}
			}

			.content {
				padding-top: 20rpx;
				color: #868c9a;
				font-size: 28rpx;
				line-height: 38rpx;

				&.p-0 {
					padding-top: 0rpx;
				}

				.black {
					color: #333;
				}
			}

			.sub-title {
				padding-top: 50rpx;
				font-weight: 600;
				font-size: 28rpx;
				color: #333;
			}

			.buy-btn {
				margin-top: 40rpx;
				color: #333;
				// background-color: #2c78f8;
			}
		}
	}
</style>
