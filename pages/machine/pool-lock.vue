<template>
	<view class="page">
		<xl-header :title="i18n.kcsc"></xl-header>
		<view class="container">
			<div class="info-card">
				<div class="top">
					<image class="banner" src="../../static/image/machine1.a2aa1a2b.png"></image>
					<view class="title">
						{{product.zhName}}
					</view>
				</div>
				<div class="bottom">
					<div class="item">
						<div class="desc">{{i18n.applicable_algorithm}}</div>
						<div class="title">{{detail.algorithm}}</div>
					</div>
					<div class="item">
						<div class="desc">{{i18n.official_power_consumption}}</div>
						<div class="title">{{detail.waste}}</div>
					</div>
					<div class="item">
						<div class="desc">{{i18n.rated_hashrate}}</div>
						<div class="title">{{detail.rated}}</div>
					</div>
				</div>
			</div>
			<div class="sub-title">
        {{ i18n.revenue }}
			</div>
			<div class="table-container mt-20">
				<div class="th">
					<div class="cel">{{i18n.coin}}</div>
					<div class="cel">{{i18n.est_diy}}</div>
					<div class="cel">{{i18n.expected_net_profit}}</div>
					<div class="cel">{{i18n.direction}}</div>
				</div>
				<div class="td">
					<div class="cel">{{ product.buyPairsName }}</div>
					<div class="cel">{{ product.periodDay }}</div>
					<div class="cel">{{ product.periodDay }}</div>
					<div class="cel">
						<button class="btn" @tap="listIteamClick()">Experience</button>
					</div>
				</div>
			</div>
			<div class="sub-title">
				Basic data
			</div>
			<div class="list-container mt-20">
				<div class="item">
					<div class="left">{{i18n.producer}}</div>
					<div class="right">{{detail.factory}}</div>
				</div>
				<div class="item">
					<div class="left">{{i18n.rated_hashrate}}</div>
					<div class="right">{{detail.rated}}</div>
				</div>
				<div class="item">
					<div class="left">{{i18n.wall_power_consumption}}</div>
					<div class="right">{{detail.waste}}</div>
				</div>
				<div class="item">
					<div class="left">{{i18n.carton_size}}</div>
					<div class="right">{{detail.size}}</div>
				</div>
				<div class="item">
					<div class="left">{{i18n.machine_weight}}</div>
					<div class="right">{{detail.weight}}</div>
				</div>
				<div class="item">
					<div class="left">{{i18n.operating_temperature}}</div>
					<div class="right">{{detail.temperature}}</div>
				</div>
				<div class="item">
					<div class="left">{{i18n.working_humidity}}</div>
					<div class="right">{{detail.humidity}}</div>
				</div>
				<div class="item">
					<div class="left">{{i18n.network_link}}</div>
					<div class="right">{{detail.link}}</div>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				product:{},
				detail:{}
			}
		},
		computed: {
			i18n() {
				return this.$t("machinePoolLock")
			}
		},
		onLoad(options) {
			// console.log('options.data',options.data)
			this.product = JSON.parse(options.data)
			console.log('this.product',this.product)
			if(this.product.detail){
				this.detail = JSON.parse(this.product.detail)
			}
		},
		methods: {
			listIteamClick() {
				uni.navigateTo({
					url: '/pages/machine/machine-buy?id=' + this.product.id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 30rpx;
		padding-top: 0;

		.container {


			.info-card {
				display: flex;
				flex-direction: column;
				background: url("../../static/image/machine-bg.64b34643.png") no-repeat 50%;
				padding: 40rpx 30rpx;
				box-sizing: border-box;
				border-radius: 20rpx;

				.top {
					display: flex;

					.banner {
						width: 122rpx;
						height: 122rpx;
						flex-shrink: 0;
					}

					.title {
						padding-left: 20rpx;
						font-weight: 600;
						color: #fff;
						font-size: 48rpx;
					}
				}

				.bottom {
					display: flex;
					padding-top: 40rpx;

					.item {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.desc {
							color: #868c9a;
							font-size: 26rpx;
						}

						.title {
							margin-top: 10rpx;
							color: #fff;
							font-size: 34rpx;
							font-weight: 600;
						}
					}
				}
			}

			.sub-title {
				font-size: 28rpx;
				color: #333;
				margin-top: 40rpx;
			}

			.table-container {
				width: 100%;
				display: flex;
				flex-direction: column;
				color: #333;
				border: 2rpx solid #f3f3f3;
				font-size: 26rpx;

				.th {
					background-color: #f3f3f3;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 10rpx 0;

					.cel {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;
					}
				}

				.td {
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 10rpx 0;

					.cel {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;


						.btn {
							width: 150rpx;
							// height: 68rpx;
							font-size: 26rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #fff;
							background-color: #00e3ff;
							border-radius: 6rpx;
							line-height: 52rpx;

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

			.list-container {
				border: 2rpx solid #f3f3f3;

				.item {
					padding: 30rpx;
					display: flex;
					justify-content: space-between;
					
					&:not(:first-child){
						border-top: 2rpx solid #f3f3f3;
					}
					

					.left {
						color: #868c9a;
					}

					.right {
						color: #333;
					}
				}
			}
			
			.mt-20{
				margin-top: 20rpx;
			}
		}
	}
</style>
