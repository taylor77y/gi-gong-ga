<template>
	<view class="container">
		<view style="height: 56rpx;"></view>
		<view class="flattributes-title">
			<view class="left" @click="back()">
				<image
					src="../../static/lanhu_zhuce2/psp7pfts61abml9bqfww31ud54m8lwlnff9c1d27e1-8110-48ab-824d-24b76b7c6231.png">
				</image>
			</view>
			<view class="cont">
				{{i18n.zxq}}
			</view>
			<view class="right" ref="divSelect">
				<view style="display: flex;align-items: center;" @click="getSelect()">
					{{ cur.currencyName }}
					<view class="qh-img">
						<image src="../../static/image/fIattributes/1.png" />
					</view>
				</view>
				<view class="line-bg"></view>
				<view class="zx-img" @click="downCode = !downCode">
					<image src="../../static/image/fIattributes/2.png" />
				</view>
				<transition name="drop-down">
					<view ref="dropDown" class="down-box" v-if="downCode">
						<view class="item" @click="onClickDown(items, ind)" v-for="(items, ind) in downList" :key="items.id">
							<image :src="items.img"></image>
							{{ items.name }}
						</view>
					</view>
				</transition>
			</view>
		</view>
		<view class="list-box">
			<view class="sell-box d-flex-between-center">
				<view class="left">
					<view :class="{'sell-color': sellingCode === false}" @click="getSell(false)">{{i18n.wym}} </view>
					<view class="sell-line"></view>
					<view :class="{'sell-color': sellingCode === true}" @click="getSell(true)">{{i18n.wyma}} </view>
				</view>
				<view class="right">
					<!-- <image src="../../static/image/fIattributes/3.png"> -->
					<image @click="getOrder" src="../../static/image/fIattributes/4.png">
				</view>
			</view>
			<view class="con-tag">
				<u-tabs bg-color="#fff" inactive-color="#8D9099" bar-height="8" bar-width="40" active-color="#D4B02D"
					:list="concurrency" :is-scroll="false" :current="current" @change="change"></u-tabs>
			</view>
			<view class="con-line"></view>
			<!-- <view class="flatt-select">
				<view class="money">
					金额
					<image src="../../static/image/fIattributes/5.png" />
				</view>
				<view class="money">
					交易方式
					<image src="../../static/image/fIattributes/5.png" />
				</view>
				<view class="sifted">筛选
					<image src="../../static/image/fIattributes/6.png" />
				</view>
			</view> -->
			<view class="con-line"></view>
			<fIattributes-list :selling-code="sellingCode" :cur="cur" :list="stores" @getForany="getForany" />
		</view>
		<beginners-popup :show-spec.sync="showSpec" />
	</view>
</template>

<script>
	import th from '../../common/locales/th'
	export default {
		data() {
			return {
				showSpec: false, // 新手指引
				downCode: false, // 标题下拉
				current: 0,
				sellingCode: false, // 买卖
				curConfigs: [],
				currencyName: 'US',
				params: {
					page: 1,
					size: 10,
					mccId: null,
					currency: "USDT",
					direction: "BUY"
				},
				total: 0,
				stores: [],
				cur: {},
			}
		},
		onLoad() {
			this.getCurConfigs();

		},
		onShow() {
			// if(uni.getStorageSync("fackCur") != ''){
			// 	this.cur = uni.getStorageSync("fackCur")
			// }

		},
		mounted() {

			// document.addEventListener("click", function(e) {
			// 	if (this.$refs.divSelect) {
			// 		if (!!this.$refs.divSelect.contains(e.target) || !!this.$refs.dropDown.contains(e.target))
			// 			return;
			// 		else
			// 			this.downCode = false;
			// 	}
			// })

		},
		computed: {
			i18n() {
				return this.$t("fack");
			},
			setFackCur() {
				return this.$store.state.fackCur || {}
			},
			concurrency() {
				return [{
						name: 'USDT'
					},
					// {
					// 	name: 'BTC'
					// }
				]
			},
			downList() {
				return [{
						name: this.i18n.bbacd,
						img: '../../static/image/fIattributes/11.png',
						id: 1,
						path: '/pages/payment/collection-list'
					},
					{
						name: this.i18n.bbacdc,
						img: '../../static/image/fIattributes/12.png',
						id: 2,
						path: '/pages/fIattributes/order-list'
					},
					// {
					// 	name: this.i18n.bbacdd,
					// 	img: '../../static/image/fIattributes/13.png',
					// 	id: 3
					// },
					// {
					// 	name: this.i18n.bbacda,
					// 	img: '../../static/image/fIattributes/14.png',
					// 	id: 4
					// },
					// {
					// 	name: this.i18n.bbacdcdf,
					// 	img: '../../static/image/fIattributes/15.png',
					// 	id: 5
					// },
					// {
					// 	name: this.i18n.bbacddfd,
					// 	img: '../../static/image/fIattributes/16.png',
					// 	id: 6
					// },
					{
						name: this.i18n.bbacdacd,
						img: '../../static/image/fIattributes/17.png',
						id: 7
					}
				]
			}
		},
		watch: {
			setFackCur() {
				this.cur = this.setFackCur
				this.getStores();
			}
		},
		methods: {
			getOrder() {
				uni.navigateTo({
					url: `/pages/fIattributes/order-list`
				})
			},
			getSelect() {
				uni.navigateTo({
					url: `/pages/fIattributes/select-currency`
				})
			},
			getCurConfigs() {
				this.$u.api.fack.getCurrencyConfiguration().then(res => {
					this.curConfigs = res.result;
					this.cur = res.result[0];
					this.params.mccId = res.result[0].id;
					this.getStores();
				})
			},
			getStores() {
				this.params.mccId = this.cur.id;
				this.$u.api.fack.getStoreList(this.params).then(res => {
					this.stores = res.result.data;
					this.total = res.result.total;
				})
			},
			onClickDown(res, index) {
				if (res.path) {
					uni.navigateTo({
					  url: res.path
					})
				}
				if (index === 6) {
					this.showSpec = true
				}
				this.downCode = false;
			},
			// 购买出售
			getForany(item) {
				if (uni.getStorageSync('forany')) {
					item.mchId = this.cur.id;
					uni.navigateTo({
						url: `/pages/fIattributes/buy?code=${this.sellingCode}&item=${JSON.stringify(item)}&cur=${JSON.stringify(this.cur)}`
					})
				} else {
					uni.setStorageSync('forany', 1)
					this.showSpec = true
				}

			},
			change(e) {
				this.current = e
			},
			getSell(index) {
				this.sellingCode = index
				console.log("法币买卖", this.sellingCode)
				this.params.direction = this.sellingCode ? "SELL" : "BUY";
				this.getStores();
			},
			back() {
				uni.navigateBack(1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.drop-down-enter {
		opacity: 0;
		transform: translate(0px, -50px) scaleY(0.2);
	}

	.drop-down-leave-to {
		opacity: 0;
		transform: translate(0px, -50px) scaleY(0.2);
	}

	.drop-down-enter-active {
		transition: all 0.3s ease-in;
	}

	.drop-down-leave-active {
		transition: all 0.3s ease;
	}

	.container {
		background: #F5D45C;

		.flattributes-title {
			display: flex;
			align-items: center;
			padding: 0 24rpx;
			font-size: 36rpx;
			color: #1F222B;
			font-family: 500;
			margin-bottom: 30rpx;

			.left {
				width: 34rpx;

				& image {
					width: 100%;
					height: 28rpx;
				}
			}

			.cont {
				flex: 1;
				text-align: center;
			}

			.right {
				background: rgba(255, 255, 255, .3);
				margin-left: auto;
				padding: 10rpx 24rpx;
				border-radius: 40rpx;
				display: flex;
				align-items: center;
				font-weight: bold;
				position: relative;

				.down-box {
					position: absolute;
					// top: 20rpx;
					width: 318rpx;
					// height: 650rpx;
					background: #2C303C;
					border-radius: 8rpx 8rpx 8rpx 8rpx;
					z-index: 101;
					top: 135%;
					right: 0%;
					padding: 38rpx 0 0 48rpx;

					.item {
						display: flex;
						align-items: center;
						margin-bottom: 50rpx;
						color: #FFFFFF;
						font-size: 26rpx;

						& image {
							width: 38rpx;
							height: 38rpx;
							margin-right: 20rpx;
						}
					}

					&::after {
						content: '';
						width: 0px;
						height: 0px;
						border: 20rpx solid;
						border-left: 16rpx solid transparent;
						border-right: 16rpx solid transparent;
						border-bottom: 16rpx solid;
						border-top: 16rpx solid transparent;
						/*给绝对定位，根据需求设置三角形的位置*/
						position: absolute;
						top: -30rpx;
						left: 270rpx;
					}
				}

				.qh-img {
					padding: 0 26rpx 0 14rpx;

					& image {
						width: 28rpx;
						height: 28rpx;
					}
				}

				.line-bg {
					background: #fff;
					width: 1rpx;
					height: 30rpx;
					margin-right: 26rpx;
				}

				.zx-img {

					& image {
						width: 31rpx;
						height: 31rpx;
					}
				}
			}
		}

		.list-box {
			background: #fff;
			border-radius: 40rpx 40rpx 0 0;
			padding: 40rpx 24rpx;

			.sell-box {
				font-size: 32rpx;
				color: #B0B3BA;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-weight: 500;

				.left {
					display: flex;
					align-items: center;

					.sell-line {
						width: 1rpx;
						height: 30rpx;
						background: #ECECEC;
						margin: 0 40rpx;
					}

					.sell-color {
						color: #1F222B;
					}
				}

				.right {
					& image {
						width: 38rpx;
						height: 38rpx;
						margin-right: 20rpx;

						&:last-child {
							margin-right: 0rpx;
						}
					}
				}

			}

			.con-tag {
				width: 30%;

			}

			.con-line {
				width: 100%;
				height: 1rpx;
				background: #EBEBEB;
			}

			.flatt-select {
				display: flex;
				font-size: 26rpx;
				color: #8D9099;
				padding: 24rpx 0;

				.money {
					display: flex;
					align-items: center;
					margin-right: 60rpx;

					& image {
						width: 18rpx;
						height: 10rpx;
						margin-left: 10rpx;
					}
				}

				.sifted {
					margin-left: auto;

					& image {
						width: 20rpx;
						height: 22rpx;
						margin-left: 6rpx;
					}
				}
			}
		}
	}
</style>
