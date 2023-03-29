<template>
	<view class="page">
		<xl-header title="订单详情" />
		<view class="container">
			<view class="title">
				{{statusFilter(data.status)}}
			</view>
			<view class="fz">
				总负债
			</view>
			<view class="fz-usdt">
				<view class="number">
					{{ data.totalIncurDebts }} USDT
				</view>
				<view class="btn">
					还款
				</view>
			</view>
			<view class="col">
				<view class="left">
					<view class="t">
						贷款币种
					</view>
					<view class="b">
						{{ data.borrowName}}
					</view>
				</view>
				<view class="right">
					<view class="t">
						总借款
					</view>
					<view class="b">
						{{ data.borrowMoney}}
					</view>
				</view>
			</view>
			<view class="col">
				<view class="left">
					<view class="t">
						总利息
					</view>
					<view class="b">
						{{ data.totalMoney}} {{ data.borrowName}}
					</view>
				</view>
				<view class="right">
					<view class="t">
						时利率/天利率
					</view>
					<view class="b">
						{{ data.hrRate}} % / {{ data.dayRate}} %
					</view>
				</view>
			</view>
			<view class="col">
				<view class="left">
					<view class="t">
						质押率
					</view>
					<view class="b">
						{{ data.pledgeRate}}
					</view>
				</view>
				<view class="right">
					<view class="t">
						强平价格(BTC/USDT)
					</view>
					<view class="b">
						{{ data.forcePrice}}
					</view>
				</view>
			</view>
			<view class="tb">

			</view>
			<view class="cell">
				<div class="l">订单号</div>
				<div class="r">{{data.orderNumber}}</div>
			</view>
			<view class="cell">
				<div class="l">借款时间</div>
				<div class="r">{{ dateFormat(data.creationTime)}}</div>
			</view>
			<view class="cell">
				<div class="l">到期时间</div>
				<div class="r">{{ dateFormat(data.expireTime)}}</div>
			</view>
			<view class="cell" @tap="toDetail()">
				<div class="l link">质押记录</div>
				<div class="r">
					<u-icon name="arrow-right" color="#13d3eb" size="28"></u-icon>
				</div>
			</view>
			<view class="btn-container">
				<view class="btn-add">
					新增质押
				</view>
				<view class="btn-bro">
					续借
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate
	} from "@/common/utils/dateFormat.js"
	export default {
		data() {
			return {
				data: {}
			}
		},
		onLoad(options) {
			this.data = JSON.parse(options.data)
			console.log('this.data', this.data)
		},
		methods: {
			dateFormat(time){
				return formatDate(time)
			},
			statusFilter(status) {
				if (status == 0) {
					return '计息中'
				} else if (status == 1) {
					return '已结清'
				} else if (status == 2) {
					return '强平结清'
				}
			},
			toDetail() {
				uni.navigateTo({
					url: '/pages/pledgeLoan/pledgeRecord?data=' + JSON.stringify(this.data.details)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #f5f5f5;
		height: 100vh;

		.container {
			padding: 30rpx;
			font-size: 28rpx;

			.title {
				padding: 20rpx 0;
				font-size: 38rpx;
				color: #13d3eb;
			}

			.fz {
				margin-top: 20rpx;
				color: #868c9a;
				display: flex;

				&-usdt {
					margin-top: 20rpx;
					color: #333;
					display: flex;

					.number {
						line-height: 48rpx;
					}

					.btn {
						margin-left: 30rpx;
						padding: 6rpx 30rpx;
						background-color: #13d3eb;
						color: #000;
						border-radius: 4rpx;
					}
				}
			}

			.col {
				display: flex;
				margin-top: 30rpx;
				font-size: 28rpx;


				.t {
					color: #868c9a;
				}

				.b {
					margin-top: 20rpx;
					color: #333;
					font-weight: 550;
				}

				.left {
					flex: 1;
					display: flex;
					flex-direction: column;
				}

				.right {
					flex: 1;
				}
			}

			.tb {
				border-top: 2rpx solid #e5e7ed;
				margin-top: 100rpx;
				padding-bottom: 50rpx;
			}

			.cell {
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				margin-top: 30rpx;

				.l {
					color: #868c9a;
				}

				.link {
					color: #13d3eb;
				}

				.r {}
			}

			.btn-container {
				margin-top: 80rpx;
				display: flex;
				justify-content: space-around;

				.btn-add {
					border: 1px solid #13d3eb;
					color: #13d3eb;
					font-size: 28rpx;
					height: 84rpx;
					width: 100%;
					border-radius: 6rpx;
					text-align: center;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.btn-bro {
					margin-left: 40rpx;
					border: 1px solid #13d3eb;
					color: #333;
					background-color: #13d3eb;
					font-size: 28rpx;
					height: 84rpx;
					width: 100%;
					border-radius: 6rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
</style>