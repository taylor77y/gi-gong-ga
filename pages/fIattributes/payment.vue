<template>
	<view class="container">
		<view class="f-head">
			<image @click="back()" class="icon_1" referrerpolicy="no-referrer"
				src="/static/lanhu_querenmima/ps2495rpr92seqakcpyfbbjuasmb353tg5d13ee66-88f7-4c8e-80de-307ef55cf92f.png" />
			<!-- <view class="right">
				{{ sellingCode ? '出售':'购买'  }}USDT
			</view> -->
		</view>
		<view class="order-time">
			<view class="title">{{i18n.xmjfk}}</view>
	<!-- 		<view class="time">
				请在 <u-count-down separator-color="#D4B02D" :show-hours="false" font-size="28" color="#D4B02D" bg-color="#fff" :timestamp="timestamp"></u-count-down> 内付款给卖家
			</view> -->
		</view>
		<view class="step-next">
			<view class="item" v-for="(item, index) in setpFn" :key="index">
				<view class="step-img">
					<image :src="item.img"></image>
					<view class="num" :class="{'f-1F222B': index !== 0 }">
						<view v-if="index !== 0">
							{{ index }}
						</view>
					    <view v-else>
							<u-icon name="checkbox-mark"></u-icon>
						</view>
					</view>
				</view>
				
				<view :class="{'f-1F222B': index === 1}">
					{{ item.text }}
				</view>
			</view>
		</view>
		<view class="f-cent">
			{{i18n.qnxmjfk}}
		</view>
		<view class="merchant-box">
	<!-- 		<view class="merchant-name">
				<view class="left">
					¥99999
					<image src="../../static/image/fIattributes/30.png"></image>
				</view>
				<view class="right">
				  <image src="../../static/image/fIattributes/28.png"></image> 	联系卖家
				</view>
			</view> -->
			<view class="">
				<f-steps />
			</view>
		
			<view class="btn-box">
				<view class="left">{{i18n.ddfb}}</view>
				<view class="right" @click="show = true">{{i18n.wyfktzsj}}</view>
			</view>
			<u-popup v-model="show" border-radius="20">
				<view class="pay-box">
					<image src="../../static/image/fIattributes/35.png"></image>
					<view class="title">
						{{i18n.qrfk}}
					</view>
					<view class="cont">
						{{i18n.fklkpzgb}}
					</view>
					<view class="btn" @click="rbak()">
						{{i18n.wyjfk}}
					</view>
					<view class="btn" @click="rbak()">
						{{i18n.whwfk}}
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
			  // current: 0,	
			  timestamp: 900
			}
		},
		onLoad(e) {
           
		},
		computed: {
			i18n() {
				return this.$t("fack");
			},
			setpFn() {
				return [
					{ img: '../../static/image/fIattributes/32.png', text: this.i18n.ddysc },
					{ img: '../../static/image/fIattributes/33.png', text: this.i18n.xmjfk },
					{ img: '../../static/image/fIattributes/33.png', text: this.i18n.ddfx }	
				]
			}
		},	
		methods: {
			goPath() {
			   uni.navigateTo({
			   	url: `/pages/fIattributes/payment`
			   })	
			},
			back() {
				uni.navigateBack(1)
			},
			rbak(){
				uni.navigateTo({
					url:'/pages/fIattributes/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background: #F6F6F6;
		.pay-box {
			background: #FFFFFF;
			padding: 40rpx;
			width: 580rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			& image {
				width: 144rpx;
				height: 144rpx;
			}
			.title {
				margin: 30rpx 0 14rpx 0;
				color: #1F222B;
				font-size: 36rpx;
				font-weight: 600;
			}
			.cont {
				font-size: 28rpx;
				color: #1F222B;
				text-align: center;
				margin-bottom: 30rpx;
			}
			.btn {
				background: #EBECF0;
				border-radius: 6rpx;
				padding: 16rpx;
				color: #1F222B;
				font-size: 32rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				margin-bottom: 20rpx;
				
			}
		}
		.f-cent {
			font-size: 28rpx;
			color: #1F222B;
			text-align: center;
			font-weight: 500;
		}
		.merchant-box {
			margin-top: 32rpx;
			background: #fff;
			border-radius: 40rpx 40rpx 0 0;
			padding: 40rpx 24rpx;
			.btn-box {
				display: flex;
				align-items: center;
				margin: 32rpx 0;
				.left {
					background: #EBECF0;
					border-radius: 6rpx;
					width: 260rpx;
					height: 76rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 22rpx;
					color: #1F222B;
					font-size: 32rpx;
					font-family: 600;
				}
				.right {
					background: #F5D45C;
					border-radius: 6rpx;
					width: 60%;
					height: 76rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					
					color: #1F222B;
					font-size: 32rpx;
					font-family: 600;
				}
			}
			.merchant-name {
				display: flex;
				align-items: center;
				justify-content: space-between;
				background: #FAFAFA;
				border-radius: 10rpx;
				padding: 24rpx;
				.left {
					display: flex;
					align-items: center;
					color: #1F222B;
					font-size: 36rpx;
					font-weight: bold;
					& image {
						width: 32rpx;
						height: 32rpx;
						margin-left: 14rpx;
					}
					
				}
				.right {
					display: flex;
					align-items: center;
					background: linear-gradient(to left,#FFFFFF,#F8E9BD);
					border-radius: 26rpx 26rpx 0 26rpx;
					padding: 9rpx 24rpx;
					border: 2rpx solid #F2DE82;
					& image {
						width: 34rpx;
						height: 34rpx;
						margin-right: 14rpx;
					}
				}
			}
		}
		.f-1F222B {
			color: #1F222B !important;
		}
		.step-next {
			margin: 32rpx 24rpx;
			display: flex;
			.item {
				width: 33.33%;
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #8D9099;
				font-size: 24rpx;
				.step-img {
					position: relative;
					.num {
						position: absolute;
						top: 9%;
						left: 43%;
						font-size: 36rpx;
						color: #B0B3BA;
						font-weight: bold;
					}
				}
			}
			& image {
				width: 230rpx;
				height: 64rpx;
				margin-bottom: 14rpx;
			}
		}
		.order-time {
			background: #fff;
			padding: 24rpx;
			color: #1F222B;
			font-size: 28rpx;
			.title {
				font-size: 44rpx;
				font-weight: 600;
			}
			.time {
				display: flex;
				align-items: center;
			}
		}
		.f-head {
			padding: 56rpx 0 70rpx 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			.icon_1 {
				width: 34rpx;
				height: 28rpx;
				position: absolute;
				left: 24rpx;

			}

			.right {
				font-size: 36rpx;
				color: #1F222B;
				font-weight: 500;
			}
		}
	}
</style>
