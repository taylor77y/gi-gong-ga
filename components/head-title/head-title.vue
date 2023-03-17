<template>
	<view class="f-head">
		<image @click="back()" class="icon_1" referrerpolicy="no-referrer"
			src="/static/lanhu_querenmima/ps2495rpr92seqakcpyfbbjuasmb353tg5d13ee66-88f7-4c8e-80de-307ef55cf92f.png" />
		<view class="right">
			{{ title }}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			
		},
		onLoad() {
			
		},
		methods: {
			back() {
				uni.navigateBack(1)
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.f-head {
		margin: 56rpx 0 70rpx 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	
		.icon_1 {
			width: 34rpx;
			height: 28rpx;
			position: absolute;
			left: 0;
	
		}
	
		.right {
			font-size: 36rpx;
			color: #1F222B;
			font-weight: 500;
		}
	}
</style>
