<template>
	<view class="page">
		<xl-header title="确认订单"></xl-header>

		<view class="container">
			<view class="title">
				{{order.name}}
			</view>
			<view class="row mt-20">
				<view class="left">
					矿机金额
				</view>
				<view class="right">
					{{amount}}
				</view>
			</view>
			<view class="row">
				<view class="left">
					30天预期收益
				</view>
				<view class="right">
					{{30 * amount * order.todayRate }}
				</view>
			</view>
			<view class="row">
				<view class="left">
					周期
				</view>
				<view class="right">
					{{order.periodDay}}
				</view>
			</view>
			<view class="row">
				<view class="left">
					日收益
				</view>
				<view class="right">
					{{order.todayRate}}
				</view>
			</view>
			<view class="row">
				<view class="left">
					起息日
				</view>
				<view class="right">
					{{ toMoDay()}}
				</view>
			</view>
			<view class="row">
				<view class="left">
					计息结束日
				</view>
				<view class="right">
					--
				</view>
			</view>
			<view class="row">
				<view class="left">
					订单编号
				</view>
				<view class="right">
					{{orderNo}}
				</view>
			</view>
			<view class="row">
				<view class="left">
					订单时间
				</view>
				<view class="right">
					{{ buyTime(order.buyDate) }}
				</view>
			</view>

			<view class="btn-container">
				<button class="btn mr-20" @tap="cancelClick()">取消</button>
				<button type="primary" class="btn ml-20" @tap="confirmClick()">确认</button>
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
				id: null,
				order: {},
				availableAmount: 0,
				amount: 0,
				orderNo:''
			}
		},
		onLoad(options) {
			this.id = options.id
			this.amount = options.amount
			this.orderNo = +(new Date()).toISOString().slice(0, 10).replace(/-/g, '') + Math.random().toString().substr(2, 6);
			this.getCheckSmartPoolOrder()
		},
		methods: {
			buyTime(time){
				return formatDate(time)
			},
			toMoDay() {
				// let dateTime = new Date()
				// dateTime = dateTime.setDate(dateTime.getDate() + 1)
				return formatDate(this.order.startDate, 'yyyy-MM-dd')
			},
			async getCheckSmartPoolOrder() {
				let res = await this.$u.api.machine.getCheckSmartPoolOrder(this.id)
				if (res.status == "SUCCEED") {
					this.order = res.result
				}
			},
			cancelClick() {
				uni.navigateBack()
			},
			async confirmClick() {
				let userId = uni.getStorageSync('userId')
				if (!userId) {
					return
				}
				let res = await this.$u.api.machine.setSmartPoolOrderPurchase({
					orderNumber : this.orderNo,
					productId: this.id,
					memberId: userId,
					valueDate: this.toMoDay(),
					periodDay : this.order.periodDay,
					residueDay:0,
					price: this.amount,
					accumulatedIncome:0,
					penalPrice:0
				})
				if(res.status == 'SUCCEED'){
					this.$utils.showToast('购买成功')
					setTimeout(()=>{
						uni.navigateTo({
							url: '/pages/machine/bySuccess'
						})
					},500)
				}
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
