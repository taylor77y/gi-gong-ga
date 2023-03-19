<template>
	<view class="page">
		<view class="header">
			<u-icon name="arrow-left" size="40" @click="turnBack" class="left"></u-icon>
			<h2 class="title">
				全部收款方式
			</h2>
			<view class="right"></view>
		</view>
		<view class="search">
			<view class="search-input">
				<u-icon name="search" size="35" class="search-icon"></u-icon>
				<u-input v-model="keyword" type="number" placeholder="请输入收款方式" :border="false"  />
			</view>
		</view>
		<view class="list">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				scrollTop: 0,
				indexList: []
			};
		},
		methods: {
			turnBack(){
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body{
		height: 100%;
	}
	.page {
		height: 100%;
		.header {
			display: flex;
			justify-content: space-between;
			height: 90rpx;
			align-items: center;
			background: #fff;
			.title {
				font-weight: 400;
				font-size: 16px;
			}
			.left {
				padding: 0 32rpx;
				color: #868c9a;
			}
			.right {
				width: 100rpx;
			}
		}
		.search {
			padding: 0 40rpx;
			height: 70rpx;
			width: 100%;
			.search-input {
				background: #f5f5f5;
				display: flex;
				justify-content: flex-start;
				height: 70rpx;
				padding: 0 10rpx;
				border-radius: 40px;
			}
			.search-icon {
				width: 100rpx;
				margin-left: 20rpx;
			}
		}
	}
</style>
