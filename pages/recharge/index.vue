<template>
	<view class="home ">
		<view style="height: 56rpx;"></view>
		<view class="f-search">
			<view class="search-input-box">
				<view class="f-search-icon">
					<view class="f-icon">
						<image class="f-icon-img" src="../../static/image/home/2.png" />
					</view>
					<view>
						<input v-model="search" placeholder-style="color: #9399A2;background: #EBECF0"
							class="search-input" :placeholder="i18n.ssbb" />
					</view>

				</view>

			</view>
			<view class="cancel" @click="quxiao()">{{ i18n.quxiao }}</view>
		</view>
		<u-tabs bg-color="#fff" inactive-color="#8D9099" bar-height="8" bar-width="40" active-color="#D4B02D"
			:list="tagBtn" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view style="height: 40rpx;"></view>
		<!-- <view class="history-box">
			历史搜索
			<u-icon @click="getDel" name="trash-fill" color="#8D9099"></u-icon>
		</view>	
		<view class="history-list">
			<view class="item" v-for="(item, index) in 10">
				USDT
			</view>
		</view>
		<view style="height: 30rpx;"></view>
		<view class="history-box">
			热门
			
		</view>	
		<view class="history-list">
			<view class="item" v-for="(item, index) in 10">
				USDT
			</view>
		</view>
		<view style="height: 30rpx;"></view> -->
		<view class="history-box">
			{{ i18n.bzlb }}
		</view>
		<view class="currency-list">
			<view class="item" v-for="(item, index) in list" @click="getPath(item,index)">
				<image :src="biImg[index]"></image>
				{{item.currency}}
				<!-- <text>1ii</text> -->
			</view>
		</view>
	</view>
</template>

<script>
	import th from '../../common/locales/th';
	export default {
		data() {
			return {
				search: '',
				list: [],
				current: 0,
				tokenCurlist: [],
				code: 1
			};
		},
		onLoad(e) {
			this.code = e.code === '1' ? 1 : 2
			// 1 充值 2 提现
		},
		onShow() {
			this.getWall()
		},
		methods: {
			quxiao(){
				uni.navigateBack();
			},
			getPath(item, index) {
				item.type = index + 1
				const { code } = this
				if(code  === 2){
					uni.navigateTo({
						url: `/pages/recharge/recharge?code=${code}&item=${JSON.stringify(item)}`
					})
				}else{
					if (item.currency === 'USDT') {
						uni.navigateTo({
							url: `/pages/recharge/recharge-chain?code=${code}&item=${JSON.stringify(item)}`
						})
					} else {
						uni.navigateTo({
							url: `/pages/recharge/recharge?code=${code}&item=${JSON.stringify(item)}`
						})
					}
				}
			},
			getDel() {

			},
			change(e) {
				this.$utils.showToast(this.$t('setting').zwkf)
				// this.current = e
			},
			getWall() {
				this.$u.api.user.currencyList().then(res => {
					

					// if (this.code === 1) {
						this.list = res.result.filter(item => item.currency === 'USDT' || item.currency ===
							'ETH' ||
							item.currency === 'BTC') || [];
					// } 
					// else {
					// 	this.list = res.result.filter(item => item.currency === 'USDT') || [];
					// }
				})
			}
		},
		computed: {
			biImg() {
			    return ['../../static/image/bi/1.png', '../../static/image/bi/2.png', '../../static/image/bi/3.png']	
			},
			homeTitle() {
				return [
					'现货', '合约'
				]
			},
			tagBtn() {
				return this.i18n.tagBtn
			},
			i18n() {
				return this.$t("recharge")
			}

		},
		onHide() {
			// this.$store.state.socket.removeListener('daymarket')
		},
		onUnload() {
			// this.$store.state.socket.removeListener('daymarket')
		}

	}
</script>

<style lang="scss">
	.home {
		background: #fff;

		.currency-list {
			padding: 0 24rpx;

			.item {
				display: flex;
				align-items: center;
				margin-bottom: 40rpx;
				color: #1F222B;
				font-size: 30rpx;
				font-weight: bold;
				margin-top: 20rpx;

				& image {
					width: 48rpx;
					height: 48rpx;
					border-radius: 50%;
					margin-right: 14rpx;
				}

				text {
					font-size: 22rpx;
					color: #8D9099;
					margin-left: 14rpx;
				}
			}
		}

		.history-list {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding: 0 24rpx;

			.item {
				background: #FAF9FC;
				border-radius: 4rpx;
				color: #8D9099;
				font-size: 28rpx;
				font-weight: 500;
				margin-right: 16rpx;
				margin-bottom: 16rpx;
				padding: 4rpx 14rpx;
			}
		}

		.history-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 34rpx;
			color: #1F222B;
			font-weight: 500;
			margin-bottom: 6rpx;
			padding: 0 24rpx;
		}

		.f-search {
			margin: 0 24rpx;
			display: flex;
			align-items: center;
		}

		.search-input-box {
			background: #EBECF0;
			border-radius: 32rpx;


			.f-search-icon {
				display: flex;
				align-items: center;
				margin: 0 24rpx;

				.search-input {
					width: 540rpx;
					height: 62rpx;
					line-height: 62rpx;
					font-size: 28rpx;
					color: #9399A2;
					-webkit-touch-callout: none;
					-webkit-user-select: none;
				}

				.f-icon {
					margin-top: 8rpx;
					margin-right: 18rpx;

					& image {
						width: 36rpx;
						height: 36rpx;
					}
				}
			}

		}

		.cancel {
			font-size: 28rpx;
			color: #D4B02D;
			margin-left: auto;
		}
	}
</style>
