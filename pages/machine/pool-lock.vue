<template>
	<view class="page">
		<xl-header :title="i18n.title"></xl-header>
		<view class="container">
			<div class="info-card">
				<div class="top">
					<image class="banner" src="https://db23app.vip/wap/img/machine1.a2aa1a2b.png"></image>
					<view class="title">
						Super computing power miner 3 days
					</view>
				</div>
				<div class="bottom">
					<div class="item">
						<div class="desc">Applicable algorithm</div>
						<div class="title">EtHash</div>
					</div>
					<div class="item">
						<div class="desc">Official power consumption</div>
						<div class="title">1510w</div>
					</div>
					<div class="item">
						<div class="desc">Rated hashrate</div>
						<div class="title">420Ksol/s</div>
					</div>
				</div>
			</div>
			<div class="sub-title">
				Revenue
			</div>
			<div class="table-container mt-20">
				<div class="th">
					<div class="cel">Coin</div>
					<div class="cel">Est. DIY</div>
					<div class="cel">Expected net profit</div>
					<div class="cel">Direction</div>
				</div>
				<div class="td">
					<div class="cel">usdt</div>
					<div class="cel">3</div>
					<div class="cel">3</div>
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
					<div class="left">Producer</div>
					<div class="right">比特大陆</div>
				</div>
				<div class="item">
					<div class="left">Rated hashrate</div>
					<div class="right">420Ksol/s</div>
				</div>
				<div class="item">
					<div class="left">Wall power consumption</div>
					<div class="right">1510</div>
				</div>
				<div class="item">
					<div class="left">Carton size</div>
					<div class="right">245mm*132.5mm*290mm</div>
				</div>
				<div class="item">
					<div class="left">Machine weight</div>
					<div class="right">5.9KG</div>
				</div>
				<div class="item">
					<div class="left">Operating temperature</div>
					<div class="right">0℃ ~ 40℃</div>
				</div>
				<div class="item">
					<div class="left">Working humidity</div>
					<div class="right">5%RH ~ 95%RH</div>
				</div>
				<div class="item">
					<div class="left">Network link</div>
					<div class="right">Ethernet</div>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed: {
			i18n() {
				return this.$t("machinePoolLock")
			}
		},
		methods: {
			listIteamClick() {
				uni.navigateTo({
					url: '/pages/machine/machine-buy'
				})
			}
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
				background: url("https://db23app.vip/wap/img/machine-bg.64b34643.png") no-repeat 50%;
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
