<template>
	<view>
		<view class="header">
			<u-icon name="arrow-left" size="35" @click="turnBack"></u-icon>
			<view class="middle">{{i18n.zyjbdd}}</view>
			<view class="left"></view>
		</view>
		<view class="container mt-100">
			<u-empty mode="search" text="No record"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			i18n() {
				return this.$t("pledgeIndex")
			}
		},
		methods: {
			turnBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
.header {
		height: 80rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.uicon {
			font-weight: bolder;
		}
}
.container {
	
}	
</style>
