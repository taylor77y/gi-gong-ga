<template>
	<view class="flattributes-list">
		<view class="item" v-for="(item, index) in list" :key="index">
			<view class="title">
				<view class="left-icon">
					<image src="../../static/image/fIattributes/7.png">
				</view>
				<view class="cont-bg">
					{{item.memberFbName}}
				</view>
				<view class="right-icon">
					<image src="../../static/image/fIattributes/8.png" style="width: 20rpx;height: 22rpx;">
						<image src="../../static/image/fIattributes/9.png" style="width: 32rpx;height: 22rpx;">
							<image src="../../static/image/fIattributes/10.png" style="width: 22rpx;height: 25rpx;">
				</view>
			</view>
			<view class="deal-box">
				{{i18n.cj}}：{{item.dealCount}} <view class="deal-lien"></view>{{i18n.cjl}}：99.9%
			</view>
			<view class="money">
				{{item.nowPrice * cur.rate}}<text>{{cur.currencyName}}</text>
			</view>
			<view class="other">
				<text>{{i18n.sl}}</text> {{item.num+'USDT'}}
				
			</view>
			<view class="other">
				<text>{{i18n.xe}}</text> {{item.minPrice * cur.rate}} - {{item.num * cur.rate}}{{cur.currencyName}}
			 <!--  <view class="right" v-if="index === 0">
				   不满足广告方要求
			   </view>
			   <view @click="getForany" class="right right1" :class="{'right2': sellingCode}" v-if="index === 1">
			   		{{ sellingCode ? '出售':'购买' }}
			   </view> -->
			   <view @click="getForany(item)" class="right right1" :class="{'right2': sellingCode}" >
			   		{{ sellingCode ? i18n.cs:i18n.gm }}
			   </view>
			</view>
			<view class="paymentpaypal">
				<view>{{i18n.yhk}}</view>
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
					return [, , , , , ]
				}
			},
			sellingCode: {
			   	type: Boolean,
				default: false
			},
			cur:{
				type:Object,
				default:{}
			}

		},
		data() {
			return {

			}
		},
		computed:{
			i18n() {
				return this.$t("fack");
			},
		},
		methods: {
			// 购买 出售
           getForany(item) {
			   this.$emit('getForany',item)
		   }
		}
	}
</script>

<style lang="scss" scoped>
	.flattributes-list {
		.item {
			padding: 32rpx 0 20rpx 0;
			border-bottom: 1rpx solid #EBEBEB;

			.title {
				color: #1F222B;
				font-size: 26rpx;
				font-weight: 500;
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;

				.left-icon {
					
					// display: block;
                    margin-top: 6rpx;
					& image {
						width: 30rpx;
						height: 32rpx;
					}
				}

				.cont-bg {
					
					font-size: 26rpx;
					color: #1F222B;
					font-weight: 500;
					border-radius: 0 4rpx 4rpx 0;
					padding: 0 8rpx;
					background: linear-gradient(77deg, #FAF5DA 0%, #E4CD79 100%);
					margin-right: 10rpx;
				}

				.right-icon {
					display: flex;
					align-items: center;
                    
					& image {
						margin-right: 10rpx;
						height: 22rpx;

						&:last-child {
							margin-right: 0;
						}
					}
				}
			}

			.deal-box {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				color: #8D9099;
				margin-bottom: 10rpx;

				.deal-lien {
					width: 1rpx;
					height: 20rpx;
					background: #ECECEC;
					margin: 0 14rpx;
				}
			}

			.money {
				display: flex;
				font-size: 46rpx;
				color: #1F222B;
				font-weight: bold;
				align-items: baseline;
				margin-bottom: 10rpx;

				text {
					font-size: 26rpx;
					margin-right: 8rpx;
				}
			}
			.other {
				display: flex;
				align-items: center;
				color: #1F222B;
				font-size: 26rpx;
				font-weight: 500;
				margin-bottom: 6rpx;
				text {
					color: #8D9099;
					margin-right: 14rpx;
				}
				.right {
					margin-left: auto;
					background: #EBECF0;
					border-radius: 6rpx;
					font-size: 24rpx;
					color: #1F222B;
					padding: 10rpx 24rpx;
				}
				.right1 {
					background: #5EBA89;
					color: #fff;
					padding: 10rpx 40rpx;
				}
				.right2 {
				    background: #E45360 !important;
				}
			}
			.paymentpaypal {
				color: #8D9099;
				font-size: 22rpx;
				view {
					position: relative;
					margin-left: 10rpx;
					&::before {
						content: "";
						width: 6rpx;
						height: 20rpx;
						position: absolute;
						bottom: 23%;
						left: -10rpx;
						background: #F5D45C;
					    border-radius: 70rpx;
					}
				}
			}
		}
	}
</style>
