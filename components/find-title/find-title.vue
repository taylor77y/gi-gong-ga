<template>
	<view class="find-title">
		<view @click="getCode(index)" :class="currentBanner === index ? 'name1':'name'" v-for="(item, index) in list" :key="index">
			{{ item }}
		</view>
	</view>
</template>

<script>
	/*

	 */
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			}
			
		},
		data() {
			return {
                currentBanner: 0 // 选中值
			}
		},

		methods: {
            getCode(index) {
				this.currentBanner = index
			}
		}
	}
</script>

<style lang="scss" scoped>
.find-title {
		display: flex;
		align-items: center;
		.name {
			font-size: 34rpx;
			color: #8D9099;
			font-weight: bold;
			margin-right: 48rpx;
		}
		.name1 {
			color: #1F222B;
			font-size: 34rpx;
			font-weight: bold;
			position: relative;
			margin-right: 48rpx;
			transition-duration: 0.5s;
			&::after {
				// transition: all 1s ease 0s;
				position: absolute;
				/*绝对定位*/
				bottom: -25%;
				/*Y轴方向偏移自身高度的50%*/
				transform: translatey(-40%);
				/*Y轴方向偏移微调*/
				left: calc((100% - 60rpx) / 2);
				/*紧靠容器左边缘*/
				content: '';
				/*伪元素需要有内容才能显示*/
				width: 60rpx;
				/*伪元素宽度*/
				height: 8rpx;
				/*伪元素高度*/
				background-color: #D4B02D;
				overflow: hidden;
				transition-duration: 0.5s;
				// transition: .2s cubic-bezier(0.68, -0.2, 0.27, 1.34) .05s;
			}
		}
	}
</style>
