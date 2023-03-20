<template>
	<view class="container">
		<!-- <heder-box :title="i18n.sd" /> -->
		<xl-header :title="i18n.sd"></xl-header>
		<view class="f-m-24">
			<!-- 从 -->
			<view class="wallet-name">
				<view>{{ i18n.co }}</view>
				<view>{{ i18n.xhqb }}
					<!-- <image src="/static/image/recharge/3.png"> -->
				</view>
			</view>
			<view class="exchange-input">
				<view class="left">
					<view class="img-box">
						<image :src="`${baseUrl}/symbol/${leftCurrency.toLowerCase()}.png`" class="bi-icon" />
					</view>
					<view class="">
						<picker @change="bindPickerChange('left', $event)" :value="leftCurrencyIndex" :range="typeList">
							<view class="uni-input">{{typeList[leftCurrencyIndex]}}</view>
						</picker>
					</view>
					<view class="down-icon" @click="letImgCode = !letImgCode">
						<image :class="{'r-icon1' : letImgCode}" src="../../static/image/k-line/6.png" />
					</view>
					<view class="ex-line"></view>
					<view>
						<input focus type="number" @input="checkNum" v-model="leftNum"
							placeholder-style="background: #F6F6F6;color:#CACDD1;font-weight: 400;" class="f-input"
							:placeholder="i18n.qsrdhje" />
					</view>
					<view class="max" @click="toMax()">
						{{ i18n.zd }}
					</view>
				</view>
				<view class="price-drop-down" v-if="letImgCode">
					<view class="item" :class="{'item1': leftCode === index}"
						v-for="(item, index) in tokenCurlist.filter(item => item.tokenCur !== leftCurrency && item.tokenCur !== rightCurrency  )"
						:key="index" @click="selCurrency(item, index)">{{ item.tokenCur }}</view>
				</view>
			</view>
			<view class="tips">
				{{ i18n.kyye }}：{{nowAmount | SubString(5)}}
			</view>
			<view class="transformation-box" @click="getClick()">
				<view>
					<image :class="{'f-rotate': switchCode}" src="../../static/image/k-line/1.png" />
				</view>
			</view>
			<!-- 至 -->
			<view class="wallet-name">
				<view>{{ i18n.zhi }}</view>
			</view>
			<view class="exchange-input">
				<view class="left">
					<view class="img-box">
						<image :src="`${baseUrl}/symbol/${rightCurrency.toLowerCase()}.png`" class="bi-icon" />
					</view>
					<view class="">
						<picker @change="bindPickerChange('right', $event)" :value="rightCurrencyIndex" :range="typeList">
							<view class="uni-input">{{typeList[rightCurrencyIndex]}}</view>
						</picker>
					</view>
					<view class="down-icon" @click="rightImgCode = !rightImgCode">
						<image :class="{'r-icon1' : rightImgCode}" src="../../static/image/k-line/6.png" />
					</view>
					<view class="ex-line"></view>
					<view>
						<input @input="checkNum1" v-model="rightNum"
							placeholder-style="background: #F6F6F6;color:#CACDD1;font-weight: 400;" class="f-input"
							:placeholder="i18n.qsrdhje" disabled />
					</view>

				</view>
				<view class="price-drop-down" v-if="rightImgCode">
					<view class="item" :class="{'item1': rightCode === index}"
						v-for="(item, index) in tokenCurlist.filter(item => item.tokenCur !== leftCurrency && item.tokenCur !== rightCurrency  )"
						:key="index" @click="selRightCurrency(item, index)">{{ item.tokenCur }}</view>
				</view>
			</view>
			<view style="margin-top: 30%;">
				<u-button type="warning" @click="excSub()">{{ i18n.duihuan }}</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import th from '../../common/locales/th';
	// import hederBox from "./components/heder-box.vue"
	export default {
		components: {
			// hederBox
		},
		data() {
			return {
				baseUrl: uni.getStorageSync('imgPath'),
				leftCode: 0,
				rightCode: 0,
				leftNum: '',
				rightNum: '',
				letImgCode: false,
				rightImgCode: false,
				leftCurrencyIndex: 0,
				rightCurrencyIndex: 8,
				typeList: ['USDT','IOTA','DOT','EOS','LINK', 'MX','CHR','MLN','BTC','SAND','SOL','MANA','CHZ','ETC','XRP','ETH','NEO','LTC','YFI','AXS','ALGO','BHD'], // cash类型
				rfItem: {},
				lfItem: {},
				tokenCurlist: [],
				nowAmount: 0.00,
				pairs: [],
				rate: 0.00,
				switchCode: false
			}
		},
		onLoad() {
			console.log(this.$t("flashCash"))
		},
		onShow() {
			this.getPairsList();
			this.getBalances();
		},
		computed: {
			i18n() {
				return this.$t("flashCash")
			},
			leftCurrency: {
				get(val) {
					return this.typeList[this.leftCurrencyIndex];
				},
				set(){
					return this.typeList[this.leftCurrencyIndex];
				}
			},
			rightCurrency: {
				get(val) {
					return this.typeList[this.rightCurrencyIndex];
				},
				set(){
					return this.typeList[this.leftCurrencyIndex];
				}
			}
		},
		methods: {
			// 选择转换类型
			bindPickerChange(flag, event){
				if(flag === 'left') this.leftCurrencyIndex = event.detail.value;
				else this.rightCurrencyIndex = event.detail.value;
			},
			// 转换
			getClick() {
				this.switchCode = !this.switchCode 
				const res = this.lfItem
				this.lfItem = this.rfItem
				this.rfItem = res
				this.selCurrency(this.lfItem, 0)
				this.selRightCurrency(this.rfItem, 0)
				this.leftNum = ''
				this.rightNum = ''
			},
			//币种
			getPairsList() {
				let member = uni.getStorageSync('userId')
				this.$u.api.sd.getIndexCoin(member).then(res => {
					console.log("币种", res)
					this.tokenCurlist = res.result;
					
					res.result.map(item => {
						if (item.tokenCur === this.rightCurrency) {
							this.rfItem = item;
						}
						if (item.tokenCur === this.leftCurrency) {
							this.lfItem = item;
						}
					})
					this.calExc();
					this.tokenCurlist = this.tokenCurlist.filter(item => item.tokenCur === 'USDT' || item.tokenCur === 'ETH' || item.tokenCur === 'BTC') || []
				})
			},
			//钱包
			getBalances() {
				let member = uni.getStorageSync('userId')
				this.$u.api.user.getBalanceList(member).then(res => {
					this.pairs = res.result.balances
					res.result.balances.map(item => {
						if (item.currency === this.leftCurrency) {
							this.nowAmount = item.assetsBalance;
						}
					})
				})
			},
			//计算汇率
			calExc() {
				let leftMoney = 0
				let rightMoney = 0
				this.tokenCurlist.map(item => {
					if (item.tokenCur === this.leftCurrency) {
						leftMoney = item.price;
					}
					if (item.tokenCur === this.rightCurrency) {
						rightMoney = item.price;
					}
				})
				this.rate = (leftMoney / rightMoney).toFixed(8)
			},
			// 上面的 
			selCurrency(item, index) {
				this.leftCode = index
				this.leftCurrency = item.tokenCur
				this.letImgCode = false
				this.lfItem = item;
				this.pairs.map(doc => {
					if (doc.currency === this.leftCurrency) {
						this.nowAmount = doc.assetsBalance;
					}
				})
				this.calExc();
				if(this.nowAmount != 0 && this.rightNum != ""){
					this.rightNum = this.$utils.SubString(this.leftNum * this.rate, 4)
				}
			},
			// 下面的
			selRightCurrency(item, index) {
				this.rightCode = index
				this.rightImgCode = false
				this.rightCurrency = item.tokenCur
				this.rfItem = item
				this.calExc();
				if(this.nowAmount != 0 && this.rightNum != ""){
					this.rightNum = this.$utils.SubString(this.leftNum * this.rate, 4)
				}
			},
			// 限价 输入限制
			checkNum() {
				console.log(this.rate, '自己', this.leftNum)
				this.rightNum = this.$utils.SubString(this.leftNum * this.rate, 4)
				this.$nextTick(() => {
					let val = this.leftNum;
					val = val.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
					val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
					val = val.replace(/^0+\./g, '0.');
					val = val.match(/^0+[1-9]+/) ? val = val.replace(/^0+/g, '') : val
					val = (val.match(/^\d*(\.?\d{0,4})/g)[0]) || ''
					this.leftNum = val;
				});
			},
			// 限价 输入限制
			checkNum1() {
				this.$nextTick(() => {
					let val = this.rightNum;
					val = val.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
					val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
					val = val.replace(/^0+\./g, '0.');
					val = val.match(/^0+[1-9]+/) ? val = val.replace(/^0+/g, '') : val
					val = (val.match(/^\d*(\.?\d{0,4})/g)[0]) || ''
					this.rightNum = val;
				});
			},
			toMax() {
				console.log("最大")
				if (this.nowAmount === 0) {
					return
				}
				this.leftNum = this.$utils.SubString(this.nowAmount, 5);
				this.rightNum = this.$utils.SubString(this.nowAmount * this.rate, 5)
			},
			excSub() {
				if (!this.leftNum) {
					this.$utils.showToast(this.i18n.qsrdhje)
					return
				}
				let obj = new Object();
				obj.member = uni.getStorageSync('userId');
				obj.currency = this.leftCurrency;
				obj.currencyTarget = this.rightCurrency;
				obj.quantity = this.leftNum
				this.$u.api.sd.currencyExchange(obj).then(res => {
					if (res.status === 'SUCCEED') {
						this.leftNum = "";
						this.rightNum = "";
						uni.navigateTo({
							url: `/pages/recharge/recharge-record?code=3`
						})
						this.$utils.showToast(this.i18n.dhcg)
					} else {
						this.$utils.showToast(res.errorMessage)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.f-m-24 {
			margin: 0 24rpx;
		}

		.transformation-box {
			display: flex;
			align-items: center;
			justify-content: center;

			view {
				width: 62rpx;
				height: 62rpx;
				margin: 50rpx 0;
				background: #F6F6F6;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				.f-rotate {
					transform: rotate(-90deg);
				}

				& image {
					transition: all 0.3s;
					width: 25rpx;
					height: 29rpx;
					transform: rotate(90deg);
					// transform-origin: center center;

				}
			}
		}

		.r-icon1 {
			transform: rotate(180deg);
			transform-origin: center center;
		}

		.tips {
			color: #8A8A93;
			font-size: 24rpx;
		}

		.exchange-input {
			margin: 20rpx 0;
			background: #F6F6F6;
			border-radius: 10rpx;
			padding: 30rpx 24rpx;
			color: #000;
			font-size: 32rpx;
			display: flex;
			align-items: center;
			width: 100%;
			position: relative;

			.price-drop-down {
				width: 30%;
				position: absolute;
				top: 80rpx;
				background: #fff;
				border-radius: 10rpx;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
				z-index: 102;
				left: 0;

				.item {
					padding: 24rpx 0;
					text-align: center;
					color: #8D9099;
					font-size: 28rpx;

				}

				.item1 {
					color: #D4B02D;
				}
			}

			.left {
				display: flex;
				align-items: center;
				font-weight: 900;

				.img-box {
					width: 45rpx;
					height: 45rpx;
					margin-right: 14rpx;
					.bi-icon {
						width: 45rpx;
						height: 45rpx;
						background: #fff;
						border-radius: 50%;
					}
				}

				.down-icon {
					margin: 0 30rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					& image {
						transition: all 0.3s;
						width: 18rpx;
						height: 10rpx;
					}
				}

				.ex-line {
					width: 2rpx;
					height: 37rpx;
					background: #E5E5E5;
					margin-right: 19rpx;
				}

				.max {
					width: 80rpx;
					color: #D1A037;
					font-weight: 500;
					margin-left: 0 auto;
					text-align: right;
				}

				.f-input {}
			}
		}

		.wallet-name {
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #9A9CA9;
			font-size: 28rpx;

			& image {
				width: 29rpx;
				height: 25rpx;
				margin-left: 12rpx;
			}
		}
	}
</style>
