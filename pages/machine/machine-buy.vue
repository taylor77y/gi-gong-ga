<template>
	<view class="page">
		<xl-header :title="order.name"></xl-header>

		<view class="container">
			<view class="title">
				购买金额
			</view>
			<view class="input-container">
				<input type="text" class="input" v-model="amount" placeholder="Enter amount"
					placeholder-style="color: #C0C0C0">
				<view class="usdt">
					USDT
				</view>
				<view class="all" @tap="amount = availableAmount">
					全部
				</view>
			</view>
			<view class="row mt-20">
				<view class="left">
					可用余额
				</view>
				<view class="right">
					{{availableAmount}} USDT
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
					{{order.min}} USDT
				</view>
			</view>
			<view class="row">
				<view class="left">
					最大可投
				</view>
				<view class="right">
					{{order.minx}} USDT
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
					{{ toDay()}}
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
					起息日
				</view>
				<view class="right">
					{{ amount ? toMoDay() : '--'}}
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
					派息时间
				</view>
				<view class="right">
					每天
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
					预计今日收益
				</view>
				<view class="right">
					{{amount * order.todayRate}} USDT
				</view>
			</view>
			<button class="buy-btn" type="primary" @tap="toBuyHandler()">购买</button>
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
				amount: 0
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getCheckSmartPoolOrder()
			let usdtBalance = uni.getStorageSync('usdtPrice');
			this.availableAmount = usdtBalance
		},
		methods: {
			toDay() {
				// return new Date()
				return formatDate(new Date(), 'yyyy-MM-dd')
			},
			toMoDay() {
				let dateTime = new Date()
				dateTime = dateTime.setDate(dateTime.getDate() + 1)
				return formatDate(dateTime, 'yyyy-MM-dd')
			},
			async getCheckSmartPoolOrder() {
				let res = await this.$u.api.machine.getCheckSmartPoolOrder(this.id)
				if (res.status == "SUCCEED") {
					this.order = res.result
				}
			},
			toBuyHandler() {
				uni.navigateTo({
					url: `/pages/machine/machine-confirm?id=${this.id}&amount=${this.amount}`
				})
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
					width: 100rpx;
					padding-left: 16rpx;
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

				&.p-30 {
					padding: 30rpx 0rpx !important;
				}

				.left {
					color: #868c9a;
				}

				.right {
					color: #333;
					font-weight: 700;
				}
			}

			.sub-title {
				font-size: 29rpx;
				margin-top: 70rpx;
			}

			.buy-btn {
				margin-top: 160rpx;
			}
		}
	}
</style>
