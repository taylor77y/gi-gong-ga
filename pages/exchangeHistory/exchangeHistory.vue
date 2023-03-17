<template>
	<view class="exchange-history">
		<head-slot>
			<template #middle><text>Flash history</text></template>
		</head-slot>
		<view class="content">
			<view class="content-header">
				<view><text>From</text></view>
				<view><text>To</text></view>
			</view>
			<view class="content-list">
				<view class="content-bottom">
					<text>All loaded</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeadSlot from '../../components/head-slot/head-slot.vue'
	export default {
		components: {
			HeadSlot
		},
		data() {
			return {
				title: 'Flash history'
			};
		}
	}
</script>

<style lang="scss">
.exchange-history{
	.content{
		padding: 0 30rpx;
		margin-top: 50rpx;
		.content-header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			text{
				font-size: 35rpx;
				color:#868c9a;
			}
		}
		.content-bottom{
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			color: #868c9a;
		}
	}
}
</style>
