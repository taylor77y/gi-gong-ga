<template>
	<view class="exchange-history">
		<head-slot>
			<template #middle><text>{{i18n.exchangeHistory}}</text></template>
		</head-slot>
		<view class="content">
			<view class="content-header">
				<view><text>{{i18n.from}}</text></view>
				<view><text>{{i18n.to}}</text></view>
			</view>
			<view class="content-list">
				<view class="content-bottom">
					<text>{{i18n.allLoaded}}</text>
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
		},
    computed : {
      i18n() {
        return this.$t('exchangeHistory')
      },
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
