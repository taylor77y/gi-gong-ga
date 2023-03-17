<template>
	<view class="journalism-list">
		<view class="item" v-for="(item, index) in list" :key="index">
			<view class="title d-flex-between-center">
				<view class="left d-flex align-items-center">
					<view class="l-img">
					   <image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
					</view>
					<view class="name">
						Binance News
					</view>	
					<view class="l-icon">
						<image src="../../static/image/home/17.png"></image>
					</view>
					<view class="day">
						12月1
					</view>
				</view>
				<view class="right d-flex align-items-center">
					<view>关注</view>
					<image src="../../static/image/home/13.png"></image>
				</view>
			</view>
			<view class="article-title">
				美国司法部破产监管机构呼吁对FTX崩盘进行独立调查盘盘
			</view>
			<view class="article-cont">
				美国司法部(DOJ) 破产监管机构呼吁对FTX崩盘进行立调查。司法部监管破产法庭官员AndrewVara要求负责监督FTX破产的法官任命一名独立审查员，来调查FTX的“关
			</view>
			<view class="article-img">
				<image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
			</view>
			<view class="article-icon d-flex align-items-center">
				<view class="icon-box d-flex align-items-center">
					<image src="../../static/image/home/14.png"></image>
					99
				</view>
				<view class="icon-box d-flex align-items-center">
					<image src="../../static/image/home/15.png"></image>
					99
				</view>
				<view class="icon-box d-flex align-items-center">
					<image src="../../static/image/home/16.png"></image>
					99
				</view>
			</view>
			<view class="tip">
				非投资建议。不为任何第三方内容背书。請参照完整条款。
			</view>
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
					return [,,]
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
.journalism-list {
	.item {
		border-bottom: 2rpx solid #F6F6F6;
		margin-top: 36rpx;
		padding-bottom: 24rpx;
		.title {
			
			.left {
				.l-img {
					margin-right: 14rpx;
					& image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
					}
				}
				.name {
					color: #1F222B;
					font-size: 28rpx;
					font-weight: bold;
					margin-right: 14rpx;
				}
				.l-icon {
					margin-right: 14rpx;
					& image {
						width: 22rpx;
						height: 22rpx;
					}
				}
				.day {
					font-size: 22rpx;
					color: #8D9099;
				}
			}
			.right {
				color: #D4B02D;
				font-size: 28rpx;
				& image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
		.article-title {
			margin: 14rpx 0;
			font-size: 30rpx;
			color: #1F222B;
			font-weight: 500;
		}
		.article-cont {
			color: #8D9099;
			font-size: 26rpx;
			display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;
		}
		.article-icon {
			margin: 14rpx 0;
			.icon-box {
				margin-right: 84rpx;
				color: #B0B3BA;
				font-size: 24rpx;
				& image {
					width: 38rpx;
					height: 38rpx;
					margin-right: 10rpx;
				}
			}
		}
		.tip {
			color: #8D9099;
			font-size: 20rpx;
		}
		.article-img {
			margin-top: 14rpx;
			height: 332rpx;
			& image {
				height: 332rpx;
				border-radius: 20rpx;
			}
		}
	}
}
</style>
