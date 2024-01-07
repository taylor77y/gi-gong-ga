<template>
	<view>
		<view class="x-box">
			<view class="fee-box">
				<view @click="showBond = true" class="left-selset d-flex-between-center">
					{{ cuBond === 0 ? '全仓':'逐仓' }}
					<image style="width: 18rpx;height: 10rpx;" src="../../static/image/new/6.png" />
				</view>
				<!-- <view class="cont-selset d-flex-between-center" @click="leversState = true">
					{{ leversCode }}
					<image :class="{'r-icon1' : leversState}" style="width: 18rpx;height: 10rpx;transition: all 0.3s;" src="../../static/image/new/6.png" />
				</view> -->
			</view>
			<view class="d-flex-between-center" style="align-items: flex-start;">
				<!-- 左边部分-->
				<view class="right" style="margin-right: 20rpx;">
					<view style="font-size: 26rpx; color: #707070; margin-bottom: 20rpx;">交割时间</view>

					<view class="u-flex" style="flex-wrap: wrap;">
						<view v-for="(item, index) in listTime" :key="index" class="u-flex time-item"
							:class="{'active': index === activeIndex}" @click="chooseItem(index)"
							style="width: 50%; height: 80rpx; margin-bottom:20rpx; font-size: 22rpx;">
							<view class="u-flex-1 u-flex u-row-center justify-center">
								{{item.seconds}}{{item.secondsTime}}
							</view>
							<view class="u-flex-1 u-flex u-row-center justify-center">{{item.odds}}</view>
						</view>
					</view>

					<view
						style="margin-bottom: 10rpx; font-size: 28rpx; background-color: #f5f5f5; display: flex; height: 70rpx; align-items: center; padding: 0 20rpx; color: #333;;">
						<input type="number" v-model="count" placeholder-style="color: #8D9099;"
							:placeholder="`最小数量${mininum}`" class="f-input" />
						<view>USDT</view>
					</view>

					<view class="available">
						<view>{{ i18n.keyong }}</view>

						<view class="right">
							<view style="color: #000;">{{balance |SubString(2)}} USDT</view>

						</view>
					</view>
					<view class="available">
						<view>{{ i18n.shouxufei }}</view>

						<view class="right">
							<view style="color: #000;">{{fee |SubString(2)}} USDT</view>

						</view>
					</view>
					<view @click="operationFn(0)" class="f-btn" style="margin-bottom: 20rpx;">
						{{ sellState ? i18n.maidie:i18n.maizhang  }}
					</view>
					<view @click="operationFn(1)" class="f-btn f-btn1">
						{{ sellState ? i18n.maidie:i18n.maidie  }}
					</view>
				</view>
				<!-- 右边部分-->
				<socket-data @price="onPrice" :symbol="symbol" :key="symbol" v-if="symbol"></socket-data>
				<!-- <view class="left">
					<view class="d-flex-between-center">
						<view>{{ i18n.shuliang }}</view>
						<view>{{ i18n.jiage }}</view>
					</view>
					<view class="d-flex-between-center" style="margin-bottom: 10rpx;">
					</view>
					<right-area :code="0" :openup="buyData" />
					<view class="money">
						{{nowData.nowPrice}}
					</view>
					<view class="zhehe">
						≈{{ setRate.mark }}{{ nowData.nowPrice * setRate.rate |SubString(4) }}
					</view>
					<right-area :code="1" :openup="sellData" />
					<view class="d-flex align-items-center">
						<view class="left-input d-flex-between-center" @click="getLever()">
							<view style="transition: all 0.3s;" :class="{'r-icon1' : magnification}">
								<image src="../../static/image/new/6.png" />
							</view>
						</view>
						<view>
							<image style="width: 52rpx;height: 52rpx;" src="../../static/image/new/10.png" />
						</view>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "delivery-trade",
		data() {
			return {
				count: '', // 下注数量
				price: '', // 当前价格
				cuBond: 0,
				magnification: true,
				sellState: false,
				usdtPrice: 1,
				activeIndex: 0 // 选中的交割时间
			};
		},
		props: {
			listTime: { // 交割时间
				type: Array,
				default () {
					return []
				}
			},
			balance: {
				type: Number || String,
				default: 0
			},
			buyData: {
				type: Array,
				default () {
					return []
				}
			},
			sellData: {
				type: Array,
				default () {
					return []
				}
			},
			nowData: {},
			setRate: {},
			symbol: {
				type: String,
				default: ''
			}
		},
		computed: {
			i18n() {
				return this.$t("financial")
			},
			mininum() { // 最小数量
				return this.listTime[this.activeIndex]?.minimum
			},
			fee() {
				if (this.count < this.mininum) {
					return 0
				}
				return this.listTime[this.activeIndex]?.odds * this.count
			}
		},
		methods: {
			chooseItem(index) { // 选择交割时间
				if (this.activeIndex === index) {
					return
				}
				this.activeIndex = index
			},
			onPrice(val) { // 更新价格
				const { close } = val
				this.price = close
			},
			operationFn(type) { // 0 涨，1跌
				if (this.count < this.mininum) {
					this.$utils.showToast('少于最小下单金额')
					return
				}
				console.log('pre preOrder')
				this.$emit('order', {
					isSell: type === 1,
					index: this.activeIndex,
					amount: this.count,
					price: this.price
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.time-item view {
		height: 100%;

		&:nth-child(1) {
			background-color: #c8cad2;
		}

		&:nth-child(2) {
			// border: 1rpx solid blue;
			background-color: #dcdce5;
		}
	}

	.time-item.active view {
		color: white;

		&:nth-child(1) {
			background-color: #1d91ff;
		}

		&:nth-child(2) {
			// border: 1rpx solid blue;
			background-color: #1255a3;
		}
	}

	.stop-input {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10rpx;

		view {
			padding: 20rpx 24rpx;
			background: #F6F6F6;
			border-radius: 6rpx;

			&:last-child {
				margin-left: 20rpx;
			}
		}

	}

	.r-icon1 {
		transform: rotate(180deg);
		transform-origin: center center;
	}

	.stop {
		display: flex;
		align-items: center;
		color: #6F7784;
		font-size: 26rpx;
		margin-bottom: 8rpx;

		.circular {
			width: 20rpx;
			height: 20rpx;
			margin-right: 10rpx;
			border-radius: 50%;
			border: 1rpx solid #8D9099;
		}

		& image {
			width: 20rpx;
			height: 20rpx;
			margin-right: 10rpx;
		}
	}

	.container {
		background: #F6F6F6;
		height: 400rpx;

		.x-box {
			background: #fff;
			border-radius: 40rpx 40rpx 0 0;
			padding: 40rpx 24rpx;

			.fee-box {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.left-selset {
					background: #F6F6F6;
					border-radius: 6rpx;
					width: 180rpx;
					padding: 6rpx 20rpx;
					color: #1F222B;
					font-size: 28rpx;
					font-weight: bold;
					margin-right: 20rpx;
				}

				.cont-selset {
					background: #F6F6F6;
					border-radius: 6rpx;
					margin-right: 15rpx;
					width: 153rpx;
					padding: 6rpx 20rpx;
					font-size: 28rpx;
					font-weight: bold;
				}

				.right-name {
					font-size: 24rpx;
					color: #707070;
					margin-left: auto;
					text-align: right;

					.top {
						color: #1F222B;
					}
				}
			}

			.left {
				width: 290rpx;
				font-size: 24rpx;
				color: #707070;
				margin-right: 28rpx;

				.money {
					font-size: 30rpx;
					color: #5EBA89;
					font-weight: bold;
					margin-top: 20rpx;
					text-align: center;
				}

				.zhehe {
					font-size: 26rpx;
					color: #1F222B;
					margin-top: 4rpx;
					margin-bottom: 20rpx;
					text-align: center;
				}

				.left-input {
					background: #F6F6F6;
					border-radius: 6rpx;
					padding: 10rpx 24rpx;
					width: 208rpx;
					margin-right: 10rpx;

					& image {
						width: 18rpx;
						height: 10rpx;
					}
				}
			}

			.right {
				flex: 1;
				// border: 2rpx solid blue;

				.f-btn {
					width: 404rpx;
					height: 72rpx;
					background: #5EBA89;
					border-radius: 8rpx;
					color: #fff;
					font-size: 30rpx;
					font-weight: bold;
					text-align: center;
					line-height: 72rpx;
				}

				.f-btn1 {
					background: #E45360 !important;
				}

				.available {
					font-size: 26rpx;
					color: #8D9099;
					margin-bottom: 20rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 14rpx;

					.right {
						color: #000;
						display: flex;
						align-items: center;
						justify-content: flex-end;

						& image {
							margin-left: 14rpx;
							width: 36rpx;
							height: 36rpx;
						}

					}
				}

				.money-input {
					background: #F6F6F6;
					border-radius: 6rpx;
					margin: 30rpx 0;
					padding: 18rpx 0;

					.f-input {
						text-align: center;
						color: #1F222B;
						font-size: 32rpx;
						font-weight: bold;
					}
				}

				.percent {
					color: #B0B3BA;
					font-size: 24rpx;

					.item {
						width: 25%;
						text-align: center;
					}
				}

				.stpes-list {
					display: flex;
					align-items: center;
					margin: 14rpx;

					.item {
						width: 84rpx;
						height: 18rpx;
						background: #F6F6F6;
						margin-right: 12rpx;

						&:last-child {
							margin-right: 0rpx;
						}
					}

					.item1 {
						background: #5EBA89;
					}
				}

				.r-img {
					display: flex;
					align-items: center;

					.l-sell {
						display: flex;
						align-items: center;
						background-image: url(../../static/image/new/left1.png);
						background-size: 100% 100%;
						width: 199rpx;
						height: 52rpx;
						justify-content: center;
						font-size: 28rpx;
						color: #FFFFFF;
					}

					.r-sell {
						display: flex;
						align-items: center;
						margin-left: -30rpx;
						background-image: url(../../static/image/new/right1.png);
						background-size: 100% 100%;
						width: 233rpx;
						height: 52rpx;
						justify-content: center;
						color: #8D9099;
						font-size: 28rpx;
					}

					.l-sell1 {
						display: flex;
						align-items: center;
						background-image: url(../../static/image/new/right1-2.png);
						background-size: 100% 100%;
						color: #8D9099;
						width: 233rpx;
						height: 52rpx;
						justify-content: center;
						font-size: 28rpx;

					}

					.r-sell1 {
						display: flex;
						align-items: center;
						margin-left: -30rpx;
						background-image: url(../../static/image/new/left1-2.png);
						background-size: 100% 100%;
						width: 199rpx;
						height: 52rpx;
						justify-content: center;

						color: #FFFFFF;
						font-size: 28rpx;
					}
				}

				.l-sum {
					padding: 20rpx 24rpx;
					background: #F6F6F6;
					border-radius: 6rpx;
					font-size: 28rpx;
					color: #1F222B;
					font-weight: bold;
					display: flex;
					align-items: center;

					.f-input {
						// display:block;
						// margin:0 auto;
						text-align: center;
						color: #1F222B;
						font-size: 32rpx;
						font-weight: bold;
					}

					.r-icon {
						margin-left: auto;
					}

					& image {
						width: 40rpx;
						height: 40rpx;
					}
				}

				.limit-box {
					margin: 14rpx 0;
					padding: 10rpx 24rpx;
					background: #F6F6F6;
					border-radius: 6rpx;
					font-size: 28rpx;
					color: #1F222B;
					font-weight: bold;
					display: flex;
					align-items: center;
					position: relative;

					.price-drop-down {
						width: 100%;
						position: absolute;
						top: 62rpx;
						background: #fff;
						border-radius: 10rpx;
						box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
						z-index: 102;
						left: 0;

						.item {
							padding: 24rpx 0;
							text-align: center;
							color: #8D9099;
							font-size: 28rpx;

						}

						.item1 {
							color: #D4B02D;
						}
					}

					.l-cont {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.r-icon {
						transition: all 0.3s;
						margin-left: auto;
					}

				}
			}

		}

		.bi-title {
			padding: 30rpx 24rpx;

			.left {
				display: flex;
				align-items: center;
				justify-content: baseline;
				font-size: 38rpx;
				color: #000;
				font-weight: bold;

				.num {
					color: #5EBA89;
					font-size: 28rpx;
					margin-left: 14rpx;
					font-weight: 400;
				}

				.num1 {
					color: #E45360 !important;
				}

				& image {
					width: 48rpx;
					height: 48rpx;
					margin-right: 14rpx;
				}
			}

			.right {
				& image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 14rpx;
				}
			}
		}

		.top-btn {
			margin: 0 24rpx;
			border: 1rpx solid #B0B3BA;
			border-radius: 6rpx;
			display: flex;
			align-items: center;
			overflow-x: scroll;

			padding: 0 30rpx;

			::-webkit-scrollbar {
				display: none
			}

			.btn-tag {
				position: absolute;
				top: -6rpx;
				right: -44rpx;
				color: #1F222B;
				font-size: 14rpx;
				background: linear-gradient(360deg, #ECBD4C 0%, #FADE72 100%);
				border-radius: 2rpx;
				padding: 0 6rpx;
				-webkit-transform: scale(0.5)
			}

			.item {
				position: relative;
				text-align: center;
				flex: 1;
				width: auto;
				flex-basis: auto;
				flex-shrink: 0;
				font-size: 26rpx;
				color: #8D9099;
				margin-right: 50rpx;
			}

			.item1 {
				position: relative;
				color: #1F222B;
				font-size: 26rpx;
				font-weight: 600;
				border-radius: 6rpx;
				padding: 10rpx 33rpx;
				background: #fff;
			}
		}
	}
</style>