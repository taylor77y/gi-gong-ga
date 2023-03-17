<template>
	<view class="notice-box">
		<image class="icon" mode="widthFix" src="../../static/image/home/7.png"></image>
		<swiper class="text" :vertical="true" :autoplay="true" :interval="5000" :duration="500" :circular="true">
			<swiper-item v-for="(item, not) of notifications" :key="not">
				<view class="swiper-item">
					{{ item.title }}
				</view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	/*
	 *@property { Array } banner 轮播图
	 *@property { mode } mode 轮播图片展示方向
	 */
	export default {
		props: {
			notifications: {
				type: Array,
				default: () => {
					return []
				}
			}

		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.notice-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 18rpx 16rpx;
		position: relative;
		// background: rgba(220, 221, 221, .4);
		background: #fff;
		margin: 20rpx 0;
		color: #8D9099;
		font-size: 26rpx;
		border-radius: 8rpx;

		.icon {
			width: 50rpx;
			
		}

		.text {
			flex: 1;
			height: 40rpx;

			swiper-item {
				display: flex;
				align-items: center;
			}

			.swiper-item {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 20rpx;
			}
		}

	}
</style>
