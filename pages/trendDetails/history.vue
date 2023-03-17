<template>
	<view>
		<view class="header">
			<u-icon name="arrow-left" size="35" @click="turnBack"></u-icon>
			<view class="middle">{{title}}</view>
			<view class="left"></view>
		</view>
		<view class="containor">
			<u-tabs :list="tabList" :scrollable="false" active-color="#2979ff" inactive-color="#868c9a" :current="currentIndex" @change="tabClickHanlder" />
			<u-line color="info" class="line" />
			<view class="empty">
				<u-empty mode="search" text="暂无记录"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'U本位合约历史',
				tabList: [
					{
						name:'当前委托',
					}, {
						name: '历史仓位',
					}
				],
				currentIndex: 0
			};
		},
		methods: {
			turnBack(){
				uni.navigateBack()
			},
			tabClickHanlder(index) {
				this.currentIndex = index
			}
		},
		
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
.line {
	position: relative;
	bottom: 6rpx;
}
.empty {
	height: 300rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
