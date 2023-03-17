<template>
	<view class="container">

		<head-title :title="' '" />
		<view class="con-box">
			<view class="title">帮助中心</view>
			<view class="item" @click="getPath(index)"
				v-for="(item, index) in listInfo" :key="index">
				<view class="left">
					{{ item.name }}
				</view>
				<view class="right">
                    <view >
                    	<image src="../../static/image/fIattributes/29.png"></image>
                    </view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import th from '../../common/locales/th';
	export default {
		data() {
			return {
				listInfo: [
					{name: '帮助中心'},
					{name: '反馈'},
					{name: '在线客服'}
				]
			}
		},
		onLoad() {

		},
		computed: {

		},

		methods: {
			getPath(index) {
			   this.current = index
               uni.navigateBack(1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.con-box {
			margin: 0 24rpx;

			.title {
				font-size: 48rpx;
				color: #1F222B;
				font-weight: bold;
			}
			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 32rpx;
				color: #1F222B;
				padding: 30rpx 0;

				.left {}

				.right {
					display: flex;
					align-items: center;
					color: #B0B3BA;
					font-size: 28rpx;

					& image {
						width: 13rpx;
						height: 24rpx;
					}
				}
			}
		}
	}
</style>
