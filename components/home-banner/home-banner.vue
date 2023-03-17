<template>
	<view class="cy-home-banner">
		<swiper class="cy-banner__list" :current="currentBanner" circular="true" autoplay="true"
		 interval="6000" @animationfinish="animationChange" :disable-touch="true">
			<swiper-item class="cy-banner__item" v-for="(item, ind) of banner" :key="ind">
				    <view class="image-wrap">
						
					    <image :src="require('../../static/image/fb.gif')" mode="widthFix" :lazy-load="true"></image>
					</view>
			</swiper-item>
		</swiper>
		<view class="cy-banner__bullet">
			<view class="bullet" v-for="(item,index) of banner" :class="currentBanner === index?'is-active':''" :key="item.id"></view>
		</view>
	</view>
</template>

<script>
	/*
	 *@property { Array } banner 轮播图
	 *@property { mode } mode 轮播图片展示方向
	 */
	export default {
		props: {
			banner: {
				type: Array,
				default: () => {
					return []
				}
			}
			
		},
		data() {
			return {
                currentBanner: 0 //轮播图选中值
			}
		},
		filters: {
			
		},
		methods: {
			animationChange(e) {
				 const { current, source } = e.detail
				 if(source === 'touch' || source === 'autoplay' || source === '') {
				   this.currentBanner = current;
				 }
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cy-home {
		&-banner {
			position: relative;
			height: auto;
			box-sizing: border-box;

			.cy-banner__list {
				width: 100%;
				height: 304rpx;
			}

			.cy-banner__item {
				// padding: 0 40rpx;
				width: 100%;
				height: 304rpx;
				box-sizing: border-box;
                text-align: center;
				.image-wrap {
					width: 100%;
					height: 100%;
					border-radius: 16rpx;
					overflow: hidden;

					&>image {
						width: 100%;
						height: 304rpx;
					}
				}
			}

			.cy-banner__bullet {
				display: flex;
				flex-direction: row;
				justify-content: center;
				position: absolute;
				bottom: 24rpx;
				left: 50%;
				transform: translateX(-50%);

				&>.bullet {
					margin: 0 4rpx;
					width: 9rpx;
					height: 9rpx;
					background: #fff;
					border-radius: 50%;
					opacity: 0.6;
					transition: all 0.4s;

					&.is-active {
						width: 40rpx;
						opacity: 1;
						border-radius: 36rpx;
					}
				}
			}
		}
	}
</style>
