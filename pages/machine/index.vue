<template>
	<view class="page">
		<xl-header :title="i18n.title"></xl-header>
		<view class="amount-container">
			<text class="amount-title">
				{{i18n.tgje}}
			</text>
			<text class="amount-number">
				{{ countData.toPrice||0 }}
			</text>
			<view class="amount-list">
				<view class="item">
					<text class="title">{{i18n.yjrsy}}</text>
					<text class="number">{{ countData.dayPrice||0 }}</text>
				</view>
				<view class="item">
					<text class="title">{{i18n.ljsy}}</text>
					<text class="number">{{ countData.addUpPrice||0 }}</text>
				</view>
				<view class="item">
					<text class="title">{{i18n.tgdd}}</text>
					<text class="number">{{ countData.size||0 }}</text>
				</view>
			</view>
		</view>
		<view class="amount-btn-container">
			<button type="primary" class="btn mr-20" @tap="toPage('/pages/fund/assets')">{{i18n.tgdd}}</button>
			<button class="btn ml-20" @tap="toPage('/pages/machine/machine-rule')">{{i18n.gz}}</button>
		</view>
		<view class="amount-card">
			<view class="item" v-for="(item,index) in productList" :key="index" @tap="toDetail(item)">
				<view class="title">
					{{item.periodDay}}{{ i18p.tyqsy }}{{item.dayRate}}
				</view>
				<view class="box">
					<image src="../../static/image/machine1.a2aa1a2b.png" class="img"></image>
					<view class="content">
						<view class="title">
							{{ item.zhName}}
						</view>
						<view class="desc">
							<text class="col">{{i18n.rsyl}} {{item.dayRate}}</text>
							<text class="col">{{i18p.xiane}} {{item.investmentAmountFront}} - {{item.investmentAmountBehind}} {{item.buyPairsName}}</text>
							<text class="col">{{i18p.zhouqi}} {{item.periodDay}}</text>
						</view>
					</view>
					<button type="primary" class="btn" @tap.stop="buyButtonClick(item.id)">{{i18p.ljzy}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productList: [],
				countData: {}
			}
		},
		computed: {
			i18n() {
				return this.$t("machineIndex")
			}	,
      i18p() {
				return this.$t("miner")
			}
		},
		onLoad() {
			this.getCountSmartPoolOrderByUserId()
			this.getSmartPoolProduct()
		},
		methods: {
			async getSmartPoolProduct() {
				let res = await this.$u.api.machine.getSmartPoolProduct()
				if (res.status == "SUCCEED") {
					this.productList = res.result
				}
			},
			async getCountSmartPoolOrderByUserId() {
				let userId = uni.getStorageSync('userId')
				if (!userId) {
					return
				}
				let res = await this.$u.api.machine.getCountSmartPoolOrderByUserId(userId)
				console.log('getCountSmartPoolOrderByUserId', res)
				if (res.status == "SUCCEED") {
					this.countData = res.result
				}
			},
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			},
			buyButtonClick(id) {
				uni.navigateTo({
					url: '/pages/machine/machine-buy?id=' + id
				})
			},
			toDetail(item) {
				uni.navigateTo({
					url: '/pages/machine/pool-lock?data=' + JSON.stringify(item)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		box-sizing: border-box;

		.amount-container {
			font-size: 24rpx;
			color: #868c9a;
			padding: 50rpx 30rpx 20rpx;
			display: flex;
			flex-direction: column;

			.amount-title {
				font-size: 28rpx;
				color: #868c9a;
			}

			.amount-number {
				color: #333;
				font-size: 48rpx;
				font-weight: 700;
				margin-top: 10rpx;
			}

			.amount-list {
				margin-top: 30rpx;
				display: flex;

				.item {
					flex: 1;
					display: flex;
					flex-direction: column;

					.title {
						white-space: nowrap;
					}

					.number {
						color: #333;
						font-size: 32rpx;
						font-weight: 550;
					}
				}
			}
		}

		.amount-btn-container {
			padding: 30rpx;
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

		.amount-card {
			padding: 30rpx;

			.item {
				border-radius: 10rpx;
				position: relative;
				padding: 60rpx 30rpx 30rpx;
				background: #f6f6f6;
				margin-bottom: 20rpx;

				>.title {
					position: absolute;
					top: 0;
					left: 20rpx;
					color: #fff;
					background: #2ebd85;
					border-radius: 0 0 8rpx 8rpx;
					padding: 4rpx 10rpx;
				}

				.box {
					display: flex;
					align-items: center;

					.img {
						width: 108rpx;
						height: 116rpx;
						flex-shrink: 0;
					}

					.content {
						flex: 2;
						padding-left: 10rpx;
						display: flex;
						flex-direction: column;
						font-size: 26rpx;

						.title {
							color: #333;
							font-size: 30rpx;
							font-weight: 600;
							margin-bottom: 20rpx;
						}

						.desc {
							display: flex;
							flex-direction: column;

							.col {
								padding: 6rpx 0;
							}
						}
					}

					>.btn {
						// width: 186rpx;
						display: flex;
						justify-content: center;
						font-size: 28rpx;
						line-height: 32rpx;
						padding: 20rpx;
						font-weight: 600;

						// &::after {
						// 	content: '';
						// 	position: absolute;
						// 	width: 100%;
						// 	height: 100%;
						// 	transform-origin: 0 0;
						// 	transform: scale(0.5, 0.5) translateZ(0);
						// 	box-sizing: border-box;
						// 	left: 0;
						// 	top: 0;
						// 	border-radius: 12rpx;
						// 	border: 0;
						// }
					}
				}
			}
		}
	}
</style>
