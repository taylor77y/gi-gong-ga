<template>
	<view class="container">
		<view class="f-head">
			<image @click="back()" class="icon_1" referrerpolicy="no-referrer"
				src="/static/lanhu_querenmima/ps2495rpr92seqakcpyfbbjuasmb353tg5d13ee66-88f7-4c8e-80de-307ef55cf92f.png" />
			<view class="right">
				<image src="../../static/image/fIattributes/28.png"></image> 联系卖家
			</view>
		</view>
		<view class="cancel-order">
			<view class="left">
				<view class="title">
					已取消
				</view>
				<view class="">
					您已取消订单
				</view>
			</view>
			<view class="right">
				<image src="../../static/image/fIattributes/36.png"></image>
			</view>
		</view>
		<view class="transaction-box">
			<view class="title">
				<text>购买</text> USDT <image src="../../static/image/fIattributes/36.png"></image>
			</view>
			<view class="f-time">
				<view class="left">
				   总额
				</view>
				<view class="right f-36">
					$777
				</view>
			</view>
			<view class="f-time">
				<view class="left">
					价格
				</view>
				<view class="right">
					9999
				</view>
			</view>
			<view class="f-time">
				<view class="left">
					数量
				</view>
				<view class="right">
					9999
				</view>
			</view>
			<view class="f-line"></view>
			<view class="f-time">
				<view class="left">
					订单号
				</view>
				<view class="right">
					9999
					<image src="../../static/image/fIattributes/30.png"></image>
				</view>
			</view>
			<view class="f-time">
				<view class="left">
					创建时间
				</view>
				<view class="right">
					9999
				</view>
			</view>
			<view class="f-time">
				<view class="left">
					卖家昵称
				</view>
				<view class="right">
					9999
				</view>
			</view>
		</view>
		<view class="f-line-10"></view>
		<view class="follow-box">
			<view>关注此用户</view>
			<view>
				<u-switch active-color="#F5D45C" v-model="checked"></u-switch>
			</view>
		</view>
		<view class="f-line-10"></view>
		<view class="follow-box">
			<view>对订单有疑问</view>
			<view>
				<image src="../../static/image/fIattributes/29.png"></image>
			</view>
		</view>
		<view class="btn">
			查看更多广告
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			 checked: false,

			}
		},
		onLoad(e) {
           
		},
		computed: {
			i18n() {
				return this.$t("fack");
			},
		},	
		methods: {
			
			back() {
				uni.navigateBack(1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background: #F6F6F6;
		height: 100vh;
		.btn {
		   margin: 43rpx 24rpx 0 24rpx;
		   background: #F5D45C;
		   padding: 20rpx;
		   color: #1F222B;
		   font-size: 32rpx;
		   display: flex;
		   align-items: center;
		   justify-content: center;
		   font-weight: 600;
		   border-radius: 6rpx;
		}
		.follow-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 32rpx;
			color: #1F222B;
			font-weight: 500;
			padding: 28rpx 24rpx;
			background: #fff;
			& image {
				width: 13rpx;
				height: 24rpx;
			}
		}
		.f-36 {
			font-size: 36rpx;
			font-weight: bold;
		}
		
		.transaction-box {
			background: #fff;
			padding: 32rpx 24rpx;
			& :last-child {
				border: none;
			}
			.f-line {
				background: #EBEBEB;
				width: 100%;
				height: 2rpx;
				margin-bottom: 40rpx;
			}
			.tps {
				font-size: 28rpx;
				color: #8D9099;
			}
			.title {
				color: #1F222B;
				font-size: 32rpx;
				font-weight: 500;
				margin-bottom: 32rpx;
				display: flex;
				align-items: center;
				& image {
					width: 32rpx;
					height: 32rpx;
					margin-left: 10rpx;
				}
				text {
					color: #5EBA89;
					margin-right: 20rpx;
				}
			}
			.f-time {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 40rpx;
				color: #8D9099;
				font-size: 26rpx;
				.right {
					color: #1F222B;
					& image {
						width: 32rpx;
						height: 32rpx;
						margin-left: 14rpx;
					}
				}
			}
			
		}
		.cancel-order {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 48rpx 24rpx 24rpx;
			background: #D9DDE0;
			.left {
				color: #1F222B;
				font-size: 28rpx;
				font-weight: 600;
				.title {
					font-size: 48rpx;
				}
			}
			.right {
				& image {
					width: 86rpx;
					height: 86rpx;
				}
			}
		}
		.f-head {
			padding: 56rpx 0 70rpx 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #D9DDE0;
			.icon_1 {
				width: 34rpx;
				height: 28rpx;
			}

			.right {
				font-size: 28rpx;
				color: #1F222B;
				font-weight: 500;
				display: flex;
				align-items: center;
				& image {
					margin-right: 14rpx;
					width: 36rpx;
					height: 36rpx;
				}
			}
		}
	}
</style>
