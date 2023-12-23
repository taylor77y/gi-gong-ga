<template>
	<view class="page">
		<xl-header :title="i18n.cztd">
			<view class="right" slot="right" @tap="headerRightClick()">
				<u-icon name="more-circle"  color="#868c9a" size="36rpx"/>
			</view>
		</xl-header>
		<view class="container">
			<view class="title">
				{{i18n.qxzczbz}}
			</view>
			<view class="recharge-list">
				<view class="item" @tap="toRechargePage('usdt')">
					<image class="icon"
						src="data:image/png;base64,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">
					</image>
					<text class="title">{{i18n.usdtcz}}</text>
				</view>
				<view class="item" @tap="toRechargePage('btc')">
					<image class="icon"
						src="data:image/png;base64,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">
					</image>
					<text class="title">{{i18n.btccz}}</text>
				</view>
				<view class="item" @tap="toRechargePage('eth')">
					<image class="icon"
						src="data:image/png;base64,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">
					</image>
					<text class="title">{{i18n.ethcz}}</text>
				</view>
			</view>
			<view class="link-list">
				<view class="item">
					<view class="left">
						<image class="icon"
							src="data:image/png;base64,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">
						</image>
						<view class="title"  @click="officialCharge(1)">
							Huobi{{i18n.gfcztd}}
						</view>
					</view>
					<u-icon name="arrow-right" color="#868c9a" />
				</view>
				<view class="item">
					<view class="left">
						<image class="icon"
							src="data:image/png;base64,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">
						</image>
						<view class="title"  @click="officialCharge(2)">
              Binance{{i18n.gfcztd}}
						</view>
					</view>
					<u-icon name="arrow-right" color="#868c9a" />
				</view>
				<view class="item">
					<view class="left">
						<image class="icon"
							src="../../static/image/coinbase.800bd120.png">
						</image>
						<view class="title" @click="officialCharge(3)">
              Coinbase{{i18n.gfcztd}}
						</view>
					</view>
					<u-icon name="arrow-right" color="#868c9a" />
				</view>
        <view class="item">
          <view class="left">
            <image class="icon"
                   src="../../static/image/crypto.5bb7e039.png">
            </image>
            <view class="title" @click="officialCharge(4)">
              Crypto{{i18n.gfcztd}}
            </view>
          </view>
          <u-icon name="arrow-right" color="#868c9a" />
        </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
      //去官方
      officialCharge(e){
        let url = null
        switch(e) {
          case  1:
            window.open('https://www.huobi.com/');
            break;
            case  2:
              window.open('https://www.binance.com/');
            break;
            case  3:
            window.open('https://www.coinbase.com/')
            break;
          case  4:
            window.open('https://crypto.com/')
            break;
        }
      },
			toRechargePage(symbol) {
				uni.navigateTo({
					url: '/pages/recharge/rechargePage?symbol=' + symbol
				})
			},
			headerRightClick(){
				uni.navigateTo({
					url: '/pages/assetsCenter/rechargeWithdrawRecord?type=' + '0'
				})
			}
		},
		computed: {
			i18n() {
				return this.$t("recharge")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header-bar {
		.left {
			width: 86rpx;
			height: 86rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.container {
		font-size: 28rpx;

		>.title {
			color: #333;
			font-size: 30rpx;
			padding: 60rpx 30rpx;
		}

		.recharge-list {
			padding: 30rpx;
			display: flex;
			justify-content: space-between;

			.item {
				display: flex;
				flex-direction: column;
				border: 4rpx solid #c8cad2;
				border-radius: 16rpx;
				box-sizing: border-box;
				height: 214rpx;
				width: 180rpx;
				align-items: center;
				justify-content: center;

				.icon {
					width: 85rpx;
					height: 85rpx;
					border-radius: 50%;
				}

				.title {
					margin-top: 30rpx;
					font-size: 26rpx;
					color: #868c9a;
				}
			}
		}

		.link-list {


			.item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 30rpx;
				border-bottom: 2rpx solid #e5e7ed;

				.left {
					display: flex;
					align-items: center;
					color: #868c9a;

					.icon {
						width: 44rpx;
						height: 44rpx;
						border-radius: 50%;
					}

					.title {
						padding-left: 20rpx;
					}
				}


			}
		}
	}
</style>
