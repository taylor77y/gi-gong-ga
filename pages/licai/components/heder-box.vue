<template>
	<view class="f-head">
		<image @click="back()" class="icon_1" referrerpolicy="no-referrer"
			src="/static/lanhu_querenmima/ps2495rpr92seqakcpyfbbjuasmb353tg5d13ee66-88f7-4c8e-80de-307ef55cf92f.png" />
		<view class="right">
		  
		  {{ title }} 
		  <!-- <text>0{{ i18n.sxf }}</text> -->
		</view>
		<view class="r-img">
			<!-- <image @click="getPath()" src="/static/image/recharge/1.png"> -->
			<!-- <image src="/static/image/recharge/2.png"> -->
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
				isCollection: false
			}
		},
		computed: {
			i18n() {
				return this.$t("flashCash")
			}
		},
		onLoad() {
			
		},
		methods: {
			back() {
				uni.navigateBack(1)
			},
			getPath() {
				uni.navigateTo({
					url: `/pages/recharge/recharge-record?code=3`
				})
			}
			
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
	   .r-img {
		   display: flex;
		   align-items: center;
		   position: absolute;
		   right: 0;
		   & image {
			   width: 40rpx;
			   height: 40rpx;
			   margin-right: 14rpx;
		   }
	   }
		.right {
			font-size: 38rpx;
			color: #000000;
			font-weight: bold;
			display: flex;
			align-items: center;
			text {
				background: #ECF8F2;
				border-radius: 4rpx;
				padding: 12rpx 10rpx;
				color: #5BC195;
				font-size: 26rpx;
				margin-left: 14rpx;
			}
			& image {
				width: 48rpx;
				height: 48rpx;
				margin-right: 14rpx;
			}
		}
	}
</style>
