<template>
	<view class="ly-produts">
		<view class="ly-produts__list">
			<view class="ly-produts__item" v-for="(item, index) in list" :key="index" @click="getExchange(item)">
			<view class="title">
				活期
			</view>
			<view class="name">
				利息
			</view>
			<view class="money">
				0.66%
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return [,,,,]
				}
			}
		},
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			getExchange(item) {
               
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ly-produts {
		margin: 20rpx 0;

		&__list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			width: 100%;
			padding-bottom: 24rpx;
			border-bottom: 2rpx solid #F6F6F6;
		}

		&__item {
			margin-bottom: 10rpx;
			width: 47%;
			min-width: 346rpx;
			background: #FAFAFA;
			border-radius: 10rpx;
			padding: 24rpx;
			.title {
				font-size: 26rpx;
				color: #1F222B;
				margin-bottom: 14rpx;
				font-family: 500;
			}
			.name{
				font-size: 22rpx;
				color: #8D9099;
				
			}
			.money {
				color: #5EBA89;
				font-size: 30rpx;
				font-weight: bold;
			}

		}
	}
</style>
