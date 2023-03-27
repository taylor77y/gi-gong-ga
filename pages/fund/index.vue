<template>
	<view class="page">
		<xl-header :title="i18n.jjlc"></xl-header>
		<view class="amount-container">
			<text class="amount-title">
				{{i18n.tgje}}
			</text>
			<text class="amount-number">
				{{purchasedFunds.toPrice}}
			</text>
			<view class="amount-list">
				<view class="item">
					<text class="title">{{i18n.yjrsy}}</text>
					<text class="number">{{purchasedFunds.dayPrice}}</text>
				</view>
				<view class="item">
					<text class="title">{{i18n.ljsy}}</text>
					<text class="number">{{purchasedFunds.addUpPrice}}</text>
				</view>
				<view class="item">
					<text class="title">{{i18n.tgdd}}</text>
					<text class="number">{{purchasedFunds.size}}</text>
				</view>
			</view>
		</view>
		<view class="amount-btn-container">
			<button type="primary" class="btn mr-20" @tap="toPage('/pages/fund/assets')">{{i18n.tgdd}}</button>
			<button class="btn ml-20" @tap="toPage('/pages/fund/fund-rule')">{{i18n.gz}}</button>
		</view>
		<view class="amount-card">
			<view class="item" v-for="(item,index) in financialList" :key="index">
				<view class="title">
				收益率:	{{item.dayRateFront}}% ~  {{item.dayRateBehind}}%
				</view>
				<view class="box">
					<image :src="item.fundImage" class="img"></image>
					<view class="content">
						<view class="title">
						{{	item.zhName}}
						</view>
						<view class="desc">
							<text class="col">限额{{item.investmentAmountFront}}--{{item.investmentAmountBehind}}USDT</text>
							<text class="col">周期{{item.periodDay}}天</text>
						</view>
					</view>
					<button type="primary" class="btn" @tap="buyButtonClick(item)">立即买入</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        financialList:[],//理财列表
        purchasedFunds:{},///获取用户购买基金统计信息
			}
		},
		computed: {
			i18n() {
				return this.$t("machineIndex")
			}
		},
    created(){
      this.getFundProduct()
      this.getCountFundOrderByUserId()
    },
		methods: {
      //获取用户购买基金统计信息
      getCountFundOrderByUserId(){
        let id = uni.getStorageSync('userId') || 0;
        this.$u.api.fundFinancing.getCountFundOrderByUserId(id).then(res=>{
          if(res.status === 'SUCCEED'){
            this.purchasedFunds = res.result
          }
        })
      },
      //获取理财列表
      getFundProduct(){
        this.$u.api.fundFinancing.getFundProduct().then(res=>{
          if(res.status === 'SUCCEED'){
            this.financialList = res.result
            console.info("🇨🇳🇨🇳:列表 --",    this.financialList)
          }
        })

      },
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			},
			buyButtonClick(e) {
				uni.navigateTo({
					url: `/pages/fund/fund-buy?id=${e.id}&periodDay=${e.periodDay}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		box-sizing: border-box;

		.amount-container {
			font-size: 24rpx;
			color: #868c9a;
			padding: 50rpx 30rpx 20rpx;
			display: flex;
			flex-direction: column;

			.amount-title {
				font-size: 28rpx;
				color: #868c9a;
			}

			.amount-number {
				color: #333;
				font-size: 58rpx;
				font-weight: 700;
				margin-top: 10rpx;
			}

			.amount-list {
				margin-top: 30rpx;
				display: flex;

				.item {
					flex: 1;
					display: flex;
					flex-direction: column;

					.title {
						white-space: nowrap;
					}

					.number {
						color: #333;
						font-size: 32rpx;
						font-weight: 550;
					}
				}
			}
		}

		.amount-btn-container {
			padding: 30rpx;
			display: flex;
			box-sizing: border-box;

			.btn {
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 28rpx;
				line-height: 32rpx;
				padding: 20rpx;

				&.mr-20 {
					margin-right: 20rpx;
				}

				&.ml-20 {
					margin-left: 20rpx;
				}

				&::after {
					content: '';
					position: absolute;
					width: 100%;
					height: 100%;
					transform-origin: 0 0;
					transform: scale(0.5, 0.5) translateZ(0);
					box-sizing: border-box;
					right: 0;
					top: 0;
					border-radius: 12rpx;
					border: 0;
				}
			}

		}

		.amount-card {
			padding: 30rpx;

			.item {
				border-radius: 10rpx;
				position: relative;
				padding: 60rpx 30rpx 30rpx;
				background: #f6f6f6;
				margin-bottom: 20rpx;

				>.title {
					position: absolute;
					top: 0;
					left: 20rpx;
					color: #fff;
					background: #2ebd85;
					border-radius: 0 0 8rpx 8rpx;
					padding: 4rpx 10rpx;
				}

				.box {
					display: flex;
					align-items: center;
          justify-content: space-between;

					.img {
						width: 108rpx;
						height: 116rpx;
						flex-shrink: 0;
					}

					.content {
						padding-left: 10rpx;
						display: flex;
						flex-direction: column;
						font-size: 26rpx;

						.title {
							color: #333;
							font-size: 30rpx;
							font-weight: 600;
							margin-bottom: 20rpx;
						}

						.desc {
							display: flex;
							flex-direction: column;

							.col {
								padding: 6rpx 0;
							}
						}
					}

					>.btn {
						// width: 186rpx;
						display: flex;
						justify-content: center;
						font-size: 28rpx;
						line-height: 32rpx;
						padding: 15rpx;
						font-weight: 600;

						// &::after {
						// 	content: '';
						// 	position: absolute;
						// 	width: 100%;
						// 	height: 100%;
						// 	transform-origin: 0 0;
						// 	transform: scale(0.5, 0.5) translateZ(0);
						// 	box-sizing: border-box;
						// 	left: 0;
						// 	top: 0;
						// 	border-radius: 12rpx;
						// 	border: 0;
						// }
					}
				}
			}
		}
	}
</style>
