<template>
	<view class="smart-pool">
		<view class="item" v-for="(item,index) in list" :key="index" @tap="toDetail(item)">
			<image src="../../../static/img/2.png" class="icon"></image>
			<view class="content">
				<view class="title">{{ item.name }}</view>
				<view class="number">
					数量 <text class="text">{{item.price}} </text>USDT
				</view>
				<view class="period">
					周期  <text class="text">{{item.periodDay}}</text>
				</view>
			</view>
			<view class="income">
				<view class="left">
					<view class="number">
						{{item.accumulatedIncome}}
					</view>
					<view class="tip">
						累计收益
					</view>
					<view class="">
						(USDT)
					</view>
				</view>
				<view class="right">
					>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'smartPool',
		props: {
			list: {
				type: Array,
				required: true
			}
		},
		data() {
			return {}
		},
		methods: {
			toDetail(item) {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.smart-pool {
		padding: 10rpx 0;
		padding-bottom: 100rpx;

		.item {
			margin: 20rpx 0;
			padding: 30rpx;
			background-color: #f6f6f6;
			border-radius: 10rpx;
			display: flex;

			.icon {
				width: 128rpx;
				height: 128rpx;
			}

			.content {
				flex: 2;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding-left: 20rpx;
				color: #868c9a;

				.text{
					color: #333;
					padding: 0 8rpx;
				}
				.title {
					font-size: 28rpx;
					font-weight: 600;
					color: #333;
				}

				.number {
					
				}

				.period {}
			}

			.income {
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;
				.left {
					display: flex;
					flex-direction: column;
					.number {}

					.tip {}
				}

				.right {
					color: #000;
					font-size: 30rpx;
				}
			}
		}
	}
</style>