<template>
	<view class="home-list">
		<view class="item" v-for="(item, index) in list" :key="index" @click="getPath(item.pairsName)">
			<view class="left" v-if="code === 0">
				<image :src="baseUrl + item.image"  />
				{{item.pairsName}}
			</view>
			<view class="lefts" v-else>
				<view class="b-name">
					<text class="name">{{item.pairsName}}</text>
					<!-- /<text>xxx</text> <text class="b-btn">10x</text> -->
				</view>
				<view>
					24H{{ i18n.liang }} {{parseInt(item.volume)}}
				</view>
			</view>
			<view class="cont">
				<view class="top">
					{{item.price|SubString(2)}}
				</view>
				<view class="money">
					{{ setRate.mark }} {{item.price * setRate.rate |SubString(2)}}
				</view>
			</view>
			<view v-if="curType == 'VOLUME'" class="right" :class="'right1'">
				{{item.volume|SubString1(2)}}
			</view>
			<view v-else class="right" :class="item.updown>0?'right1':''">
				{{item.updown*100|SubString(2)}}%
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
					return []
				}
			},
			curType: {
				type: String,
				default: 'UPDOWN'
			},
			// 1是显示行情
			code: {
				type: Number,
				default: 0
			},
			// 0 是跳转币币 1 是永续 2是交割
			state: {
				type: Number,
				default: 0
			}

		},
		computed: {
			i18n() {
				return this.$t("market")
			},
		    setRate() {
		       return this.$store.state.rate || {}
		    }
		},
		data() {
			return {
				baseUrl: uni.getStorageSync('ossUrl')
			}
		},
		methods: {
			getPath(name) {
				uni.navigateTo({
					url: `/pages/kLine/index?name=${name}&code=${this.state}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-list {
		.item {
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #F6F6F6;
			padding: 32rpx 0;

			.lefts {
				width: 400rpx;

				.b-name {
					color: #B7BCC2;
					font-size: 22rpx;

					.name {
						font-size: 32rpx;
						color: #1F222B;
						font-weight: bold;
					}

					.b-btn {
						background: #F7F4FA;
						color: #D4B02D;
						font-size: 24rpx;
						border-radius: 2rpx;
						padding: 2rpx 5rpx;
						margin-left: 10rpx;
					}

				}
			}

			.left {
				display: flex;
				align-items: center;
				width: 350rpx;
				font-size: 32rpx;
				color: #1F222B;
				font-weight: 900 !important;

				& image {
					border-radius: 50%;
					width: 54rpx;
					height: 54rpx;
					margin-right: 14rpx;
				}

			}

			.cont {
				flex: 1;
				text-align: right;
				margin-right: 30rpx;

				.top {
					font-size: 30rpx;
					color: #1F222B;
					font-weight: 900;
				}

				.money {
					font-size: 22rpx;
					color: #8D9099;
				}
			}

			.right {
				width: 180rpx;
				color: #fff;
				font-size: 28rpx;
				height: 72rpx;
				background: #E45360;
				border-radius: 6rpx;
				line-height: 72rpx;
				text-align: center;
				// margin-left: 50rpx;
			}

			.right1 {
				background: #5EBA89 !important;
			}
		}
	}
</style>
