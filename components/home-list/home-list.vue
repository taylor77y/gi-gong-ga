<template>
	<view class="home-list">
		<view class="item" v-for="(item, index) in renderList" :key="index" @click="getPath(item.name)">
			<view class="left" v-if="code === 0">
				<image :src="'../../' + 'static/image/symbol/'+(item.ccy).toLowerCase()+'.png'" />
				<view class="num-text">
					<text class="name">{{item.ccy}}<text class="small">/USDT</text></text>
					<view class="amount">
						{{i18n.chenjiaoliang }} {{item.sodUtc0 |SubString(2)}}
					</view>
				</view>
			</view>
			<view class="lefts" v-else>
				<view class="b-name">
					<text class="name">{{item.ccy}}</text>
					<!-- /<text>xxx</text> <text class="b-btn">10x</text> -->
				</view>
				<view>
					24H{{ i18n.liang }} {{parseInt(item.sodUtc0 * item.last) |SubString(2)}}
				</view>
			</view>
			<view class="cont">
				<view class="top">
					{{item.last |SubString(2)}}
				</view>
				<!-- 				<view class="money">
					{{ setRate.mark }} {{Number(item.close).toFixed(2)}}
				</view> -->
				<view class="money">
					${{Number(item.last).toFixed(2)}}
				</view>
			</view>
			<!-- 			<view v-if="curType == 'VOLUME'" class="right" :class="'right1'">
				{{item.volume|SubString1(2)}}
			</view> -->
			<view class="cje" v-if="tabIndex == 3">
				{{Number((item.sodUtc0 * item.last || 0)).toFixed(2)}}
			</view>
			<view class="right" :class="{right1:item.rate>0}" v-else>
				{{ item.rate.toFixed(2) }} %
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
			},
			tabIndex: {
				type: Number
			},
			isAscend: {
				type: Number,
				default: 0,
			}
		},
		watch: {
			list(val) {
				this.renderList = val.concat()
			},
			tabIndex(val) {
				this.curIndex = val
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
				baseUrl: uni.getStorageSync('imgPath'),
				renderList: [],
				loading: false,
				curIndex: this.tabIndex
			}
		},
		methods: {
			biNameFilter(name, fix) {
				if (!name) {
					return ''
				}
				let arr = name.split('/')
				return (fix == 1 ? '/' : '') + arr[fix]
			},
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

			.cje {
				flex: 1;
				font-size: 22rpx;
				color: #333;
				font-weight: 600;
			}

			.small {
				font-size: 26rpx;
				color: #868c9a;
				font-weight: normal;
			}

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

				.num-text {

					.amount {
						margin-top: 6rpx;
						font-weight: normal;
						font-size: 22rpx;
						color: #868c9a;
					}
				}

				& image {
					border-radius: 50%;
					width: 64rpx;
					height: 64rpx;
					margin-right: 18rpx;
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