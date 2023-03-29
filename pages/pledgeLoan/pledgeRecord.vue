<template>
	<view class="page">
		<xl-header title="质押记录" />
		<view class="order-list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="top">
					<view class="bro" :style="{color:item.type=='NEWPLEDGE'?'#13d3eb':''}">
						{{filterType(item.type)}}
					</view>
					<view class="status">
						{{ dateFormat(item.creationTime) }}
					</view>
				</view>
				<view class="bot" v-if="item.type == 'BORROW'">
					<view class="col">
						<view class="t">借款</view>
						<view class="b">{{item.money}} USDT</view>
					</view>
					<view class="col">
						<view class="t">质押类型</view>
						<view class="b">{{item.pledgeType }}</view>
					</view>
					<view class="col">
						<view class="t">质押金额</view>
						<view class="b">{{item.pledgePrice}} {{item.pledgeName}}</view>
					</view>
				</view>
				<view class="bot" v-if="item.type == 'REFUND'">
					<view class="col">
						<view class="t">还款数量</view>
						<view class="b">{{item.money}} USDT</view>
					</view>
				</view>
				<view class="bot" v-if="item.type == 'RENEWAL'">
					<view class="col">
						<view class="t">借款</view>
						<view class="b">{{item.money}} USDT</view>
					</view>
				</view>
				<view class="bot" v-if="item.type == 'NEWPLEDGE'">
					<view class="col">
						<view class="t">质押类型</view>
						<view class="b">{{item.pledgeType}}</view>
					</view>
					<view class="col">
						<view class="t">质押金额</view>
						<view class="b">{{item.pledgePrice}} {{item.pledgeName}}</view>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore status="nomore" :load-text="{nomore: '已经全部加载完毕'}" />
	</view>
</template>

<script>
	import {
		formatDate
	} from "@/common/utils/dateFormat.js"
	export default {
		data() {
			return {
				list: {}
			}
		},
		onLoad(options) {
			this.list = JSON.parse(options.data)
			console.log('this.list', this.list)
		},
		methods: {
			dateFormat(time) {
				return formatDate(time)
			},
			filterType(type) {
				if (type == 'BORROW') {
					return '借款'
				} else if (type == 'REFUND') {
					return '还款'
				} else if (type == 'RENEWAL') {
					return '续借'
				} else if (type == 'NEWPLEDGE') {
					return '新增质押'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-list {
		padding: 0rpx 30rpx;

		.item {
			background-color: #f6f6f6;
			border-radius: 10rpx;
			padding: 30rpx 20rpx;

			&:not(:first-child) {
				margin: 20rpx 0;
			}

			.top {
				color: #333;
				font-size: 28rpx;
				display: flex;
				justify-content: space-between;
				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #e5e7ed;

				.bro {
					color: #333;
					font-size: 32rpx;
					display: flex;

					.num {
						color: #333;
						padding-left: 6rpx;
						font-size: 29rpx;
					}
				}

				.status {
					color: #868c9a;
				}
			}

			.bot {
				display: flex;

				.col {
					flex: 1;
					display: flex;
					flex-direction: column;
					// justify-content: space-between;
					margin-top: 20rpx;

					.t {
						color: #868c9a;
					}

					.b {
						margin-top: 10rpx;
					}
				}
			}
		}
	}
</style>