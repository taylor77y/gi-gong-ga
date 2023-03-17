<template>
	<view class="f-head">
		<view class="back" @click="back()">
			<u-icon name="arrow-left" :size="45" color="#82848a"></u-icon>
		</view>
		<view class="middle">
			<slot name="middle"></slot>
		</view>
		<view class="right">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"head-slot",
		data() {
			return {
				
			};
		},
		methods: {
			back() {
				uni.navigateBack(1)
			},
			
		}
	}
</script>

<style lang="scss">
	.f-head {
		height: 90rpx;
		display: flex;
		align-items: center;
	    .back{
			width: 112rpx;
			height: 90rpx;
			display: flex;
			justify-content: center;
			
		}
		.middle {
			flex: 1;
			display: flex;
			justify-content: center;
			font-size: 36rpx;
			color: #1F222B;
			font-weight: 500;
		}
		.right{
			width: 112rpx;
			height: 90rpx;
			display: flex;
			justify-content: center;
		}
	}
</style>