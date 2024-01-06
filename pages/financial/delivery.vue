<template>
	<view class="container">
		<view style="height: 56rpx;"></view>
		<view class="top-btn">
			<view class="item" @click="getTopBtn(index)" :class="{'item1': btnCode === index}"
				v-for="(item, index) in topName" :key="index">{{ item }}
				<view class="btn-tag" v-if="index === 2">
					new
				</view>
			</view>
		</view>
		<view class="bi-title d-flex-between-center">
			<view class="left" @click="showSpec = true">
				<image src="../../static/image/new/1.png" /> {{pairsItem.pairsName}}
				<text class="num num1">
					{{pairsItem.updown*100|SubString(2)}}%
				</text>
			</view>
			<view class="right" @click="getLine">
				<image src="../../static/image/new/2.png" />
				<!-- <image src="../../static/image/new/3.png" />
				<image src="../../static/image/new/4.png" /> -->
			</view>
		</view>
		<delivery-trade :listTime="listTime" :balance="usdtPrice" :buyData="buyData" :sellData="sellData"
			:nowData="nowData" :symbol="pairsItem.tokenCur" :setRate="setRate" v-if="show" @order="onPreOrder">
		</delivery-trade>
		<view class="d-flex-between-center" style="background: #fff;">
			<view style="flex: 1">
				<u-tabs :bold="true" font-size="34" gutter="50" bg-color="#fff" inactive-color="#8D9099" bar-height="8"
					bar-width="60" active-color="#D4B02D" :list="tagBtn" :is-scroll="false" :current="current"
					@change="change"></u-tabs>
			</view>
			<view @click="getRecord()"
				style="width: 50%;display: flex;justify-content: flex-end;padding-right: 24rpx;background: #fff;">
				<image style="width: 26rpx;height: 32rpx;" src="../../static/image/new/11.png" />
			</view>
		</view>
		<view v-if="list.length > 0">
			<entrust-list :list="list" :mode="1" @handleRecord="handleRecord" />
		</view>
		<view v-else style="background: #fff;padding-top: 100rpx;">
			<u-empty :text="$t('kLine').zwgdsj" mode="order"></u-empty>
		</view>
		<bond-popup @getAdd="getBondAdd" :show-spec.sync="showBond" />
		<quotation-popup :show-spec.sync="showSpec" :list="pairs" @getTo="getTo" />
		<u-action-sheet :cancel-text="$t('fack').qx" @click="onClickLever" :list="lever"
			v-model="magnification"></u-action-sheet>
		<u-action-sheet :cancel-text="$t('fack').qx" @click="onClickLevers" :list="levers"
			v-model="leversState"></u-action-sheet>
		<fb-hy-popup :list="listTime" :isKaiduo="!sellState" :extro="extroInfo" :show-pup.sync="showPopup"
			:currentDta="pairsItem" @handleOrder="handleOrder" :usdt-price="usdtPrice" />
		<fb-time-popup :currentPrice="currentPrice" :diffTime="diffTime" :show-pup.sync="showTime"
			:currentDta="hyDetails" :currentRate="currentRate" />
		<fb-finish-popup :show-pup.sync="showFinsh" :currentDta="hyDetails" />
		<tabar-com />
	</view>
</template>
<script>
	import th from '../../common/locales/th';
	import socket from "../../common/ws/socket.js";
	export default {
		data() {
			return {
				show: false,
				socket: null,
				list: [],
				levers: [{
						text: '10x'

					}, {
						text: '20x',

					}, {
						text: '50x'
					},
					{
						text: '100x'
					}
				],
				leversCode: '20x',
				leversState: false,
				showBond: false,
				cuBond: 0, // 0 是全仓
				stop1: '',
				stop2: '',
				reduceCode: false, // 减仓
				stopCode: false, // 止盈 状态
				showSpec: false,
				magnification: false, // 0.01 倍率
				leverCode: '0.1', // 默认第一个
				lever: [{
						text: '0.1'

					}, {
						text: '1',

					}, {
						text: '10'
					},
					{
						text: '50'
					},
					{
						text: '100'
					}
				],
				priceCode: 0, // 摸认 
				fixedPriceCode: false, // 限价单弹窗
				sellState: false, // false 买入 true 卖出
				percentCode: [],
				current: 0,
				search: 778,
				searchs: 56,
				search1: '',
				btnCode: 0,
				pairs: [],
				pairsItem: {},
				buyData: [],
				sellData: [],
				usdtPrice: 0.00,
				nowData: {},
				listTime: [], // 交割时间
				showPopup: false,
				showTime: false, // 剩余倒计时弹窗
				hyDetails: {}, // 单个合约记录
				currentRate: 180, // 剩余固定秒数
				diffTime: 180, // 剩余变化秒数
				showFinsh: false, // 没有倒计时的弹窗
				currentPrice: '',
				resType: 2,
				timer: null,
				newTimer: null,
				extroInfo: {} // 额外信息
			};
		},
		onLoad() {
			if (this.timer) { //注销定时器
				clearInterval(this.timer);
				this.timer = null;
			}
			let member = uni.getStorageSync('userId') || ''
			this.getPairsList();
			this.getBalances();
			this.getTime()
			this.getSecondContractRecordList(this.resType)

			if (member) {
				this.timer = setInterval(() => {
					if (member) {
						this.getPairsList();
						this.getBalances();
						this.getSecondContractRecordList(this.resType)
					} else {
						clearInterval(this.timer);
						this.timer = null;
					}

				}, 5000);
			} else {
				clearInterval(this.timer);
				this.timer = null;
			}

		},
		onShow() {
			this.show = true
			// this.sellState = this.setSellCode === 1 ? false : true
		},
		methods: {
			onPreOrder(e) { // 下单了要
				const {
					index,
					isSell,
					amount,
					price
				} = e
				this.sellState = isSell
				this.handleOrder(amount, index)// 下单
				// this.operationFn()
				// this.extroInfo = {
				// 	index,
				// 	amount,
				// 	price
				// }
			},
			getLine() {
				uni.navigateTo({
					url: `/pages/kLine/index?name=${this.pairsItem.pairsName}&code=2`
				})
			},
			//定时器没过1秒参数减1
			Time() {
				// this.diffTime = this.currentRate

				this.newTimer = setInterval(() => {
					this.diffTime -= 1
					this.currentPrice = this.nowData.nowPrice
					if (this.diffTime > 0) {
						// this.countDown()

					} else {
						clearInterval(this.newTimer)
						uni.showLoading();

						setTimeout(() => {
							this.showTime = false
							this.handleRecord(this.secondId)
							this.getSecondContractRecordList(this.resType)
							uni.hideLoading();
						}, 3000)

					}
				}, 1000)
			},
			// 计算剩余时间
			countDown() {
				const timestamp = Date.parse(new Date());

			},
			// 获取交割时间
			getTime() {
				this.listTime = []
				this.$u.api.mhy.getSecondsContract().then(res => {
					// console.log('res', res)
					if (res && res.status == "SUCCEED") {
						this.listTime = res.result.filter((item, key) => key < 2)
						// console.log(this.listTime)
						uni.setStorageSync('listTime', JSON.stringify(res.result))

					} else if (res.status == "FAILED") {
						this.$utils.showToast(res.errorMessage)
					}
				})
			},
			// 查询单个合约记录
			handleRecord(secondId) {
				const data = {
					secondId
				}
				clearInterval(this.newTimer)
				this.newTimer = null
				this.diffTime = 0
				this.currentRate = 0
				this.secondId = secondId
				this.$u.api.mhy.getSecondsContractDes(secondId).then(res => {
					if (res && res.status == "SUCCEED") {
						this.hyDetails = res.result
						const secondsTime = res.result.seconds // 交割时间
						this.currentRate = secondsTime

						this.diffTime = res.result.timing
						console.log(res.result.timing, '我是传入过去的')
						this.currentRate = this.currentRate > 0 ? this.currentRate : 0
						console.log(this.newTimer)
						if (this.newTimer !== null) {
							this.newTimer = null
						}
						console.log(this.newTimer)
						if (this.diffTime < 1) {
							this.showFinsh = true
						} else {
							this.showTime = true
							this.Time()
						}
					} else if (res.status == "FAILED") {
						this.$utils.showToast(res.errorMessage)
					}
				})
			},
			// 确定下单
			handleOrder(deliveryAmount, deliveryTime) {
				this.$u.throttle(async () => {
					this.listTime = JSON.parse(uni.getStorageSync('listTime')) || []
					deliveryTime = this.listTime[deliveryTime].id
					const data = {
						member: uni.getStorageSync('userId'),
						currency: this.pairsItem.currencyName, // 币种
						contractType: !this.sellState ? 1 : 2, // 合约方向: 1 涨, 2 跌
						currentPrice: deliveryAmount,
						deliveryTime, // 交割时间
						deliveryAmount, // 交割金额
					}
					console.log(data)
					this.$u.api.mhy.secondContractBetting(data).then(res => {
						if (res && res.status == "SUCCEED") {
							this.list = []
							// this.getSecondContractRecordList(1)
							this.$utils.showToast(this.i18n.mhycg)
							this.getSecondContractRecordList(this.resType);
							this.handleRecord(res.result)
							this.showPopup = false
							this.showTime = true
						} else if (res.status == "FAILED") {
							this.$utils.showToast(res.errorMessage)

						}
					})
				}, 2000)
			},
			operationFn() {
				// 买入卖出
				this.showPopup = true
			},
			socketFn() {
				console.log(222)
				// this.socket = new socket(`wss://hajhiug.com/data/websocket/1/${this.pairsItem.ccy}`)
				// this.socket.doOpen();
				// this.socket.on("open", () => {
				// 	this.socket.send("PING");
				// 	this.socket.send(`initEntrust-${this.pairsItem.pairsName}`);
				// });
				// this.socket.on("message", this.onMessage);
			},
			getTo(item) {
				this.socket.send(`initEntrust-${item.pairsName}`);
				this.pairsItem = item
				this.getCoinInfoList();
			},
			getCoinInfoList() {
				this.$u.api.bibi.getCoinInfo(this.pairsItem.pairsName).then(res => {
					let json = JSON.parse(res.result)
					this.nowData = json || {}
				})
			},
			//资金
			getBalances() {
				let member = uni.getStorageSync('userId')
				this.$u.api.user.getBalanceList(member).then(res => {
					res.result.balances.map(item => {
						if (item.currency === 'USDT') {
							this.usdtPrice = item.assetsBalance;
						}
					})
				})
			},
			//币种列表
			getPairsList() {
				this.$u.api.bibi.getPairs("USDT", "SPOT").then(res => {
					// console.log('------', res)
					this.pairs = res.result;
					if (JSON.stringify(this.pairsItem) == "{}") {
						this.pairsItem = res.result[0]
					}
					this.getCoinInfoList();
					// this.socketFn();
					// this.getLeverList();
					// this.getWarehousesList();
				})
			},
			onMessage(data) {
				this.buyData = data.openup.slice(0, 5); //显示20条
				this.sellData = data.opendown.slice(0, 5);
				console.log('buyData', this.buyData)
				this.maxBuy = Math.max.apply(
					Math,
					data.openup.map(ele => ele.num)
				);
				this.maxSell = Math.max.apply(
					Math,
					data.opendown.map(ele => ele.num)
				);
			},
			getRecord() {
				uni.navigateTo({
					url: `/pages/record/index?code=1`
				})
			},
			getBondAdd(index) {
				this.cuBond = index
				this.showBond = false
			},
			// 点击的是第几个杠杆
			onClickLevers(index) {
				this.leversCode = this.levers[index].text
			},
			// 点击
			onClickLever(index) {
				this.leverCode = this.lever[index].text
			},
			getLever() {
				this.magnification = !this.magnification
				if (this.magnification) {
					this.lever.forEach(item => {
						if (item.text === this.leverCode) {
							item.color = '#D4B02D'
						} else {
							item.color = ''
						}
					})
				}
			},
			// 限价
			getLimit(index) {
				this.priceCode = index
				this.fixedPriceCode = false
			},
			getFixedPrice() {
				this.fixedPriceCode = !this.fixedPriceCode
			},
			// 减
			getReduce(index) {
				if (index === 1) {
					this.search--
				} else {
					this.searchs--
				}

			},
			// 加
			getAdd(index) {
				if (index === 1) {
					this.search++
				} else {
					this.searchs++
				}
			},

			getPercent(index) {
				console.log(index)
				if (index === 0 && this.percentCode.length > 0) {
					this.percentCode = []
					return
				}
				this.percentCode = []
				for (let i = 0; i <= index; i++) {
					this.percentCode.push(i)
				}
				console.log(this.percentCode)
			},
			change(e) {
				this.current = e
				switch (e) {
					case 0:
						this.resType = 2
						this.getSecondContractRecordList(2);
						break;
					case 1:
						this.resType = 1;
						this.getSecondContractRecordList(1);
						break;
				}
			},
			getSecondContractRecordList(type) {
				let member = uni.getStorageSync('userId');
				let page = 1;
				let size = 5;
				this.$u.api.mhy.getSecondContractRecord(member, page, size, type).then(res => {
					this.list = res.result.result.records;
				})
			},
			getTopBtn(index) {
				// this.btnCode = index
				if (index === 1) {
					uni.navigateTo({
						url: `/pages/financial/index`,
						// url: `/pages/financial/delivery`
					})
				}
				// else {
				// 	this.$utils.showToast(this.$t('setting').zwkf)
				// }

			}
		},
		computed: {
			setRate() {
				return this.$store.state.rate || {}
			},
			setSellCode() {
				return this.$store.state.sellCode || 1
			},
			limitFn() {
				return ['限价单', '市价单', '其他单']
			},
			numberFn() {
				return ['25%', '50%', '75%', '100%']
			},
			i18n() {
				return this.$t("financial")
			},
			tagBtn() {
				return this.i18n.tagBtn1
			},
			topName() {
				return this.i18n.topName
			}
		},
		onHide() {
			clearInterval(this.newTimer);
			clearInterval(this.timer);
			this.timer = null;
			this.newTimer = null
		},
		activated() {
			this.show = true
		},
		deactivated() {
			this.show = false
		},

		onUnload() {
			clearInterval(this.newTimer);
			clearInterval(this.timer);
			this.timer = null;
			this.newTimer = null

		}

	}
</script>

<style lang="scss" scoped>
	.stop-input {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10rpx;

		view {
			padding: 20rpx 24rpx;
			background: #F6F6F6;
			border-radius: 6rpx;

			&:last-child {
				margin-left: 20rpx;
			}
		}

	}

	.r-icon1 {
		transform: rotate(180deg);
		transform-origin: center center;
	}

	.stop {
		display: flex;
		align-items: center;
		color: #6F7784;
		font-size: 26rpx;
		margin-bottom: 8rpx;

		.circular {
			width: 20rpx;
			height: 20rpx;
			margin-right: 10rpx;
			border-radius: 50%;
			border: 1rpx solid #8D9099;
		}

		& image {
			width: 20rpx;
			height: 20rpx;
			margin-right: 10rpx;
		}
	}

	.container {
		background: #F6F6F6;
		height: 400rpx;

		.x-box {
			background: #fff;
			border-radius: 40rpx 40rpx 0 0;
			padding: 40rpx 24rpx;

			.fee-box {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.left-selset {
					background: #F6F6F6;
					border-radius: 6rpx;
					width: 180rpx;
					padding: 6rpx 20rpx;
					color: #1F222B;
					font-size: 28rpx;
					font-weight: bold;
					margin-right: 20rpx;
				}

				.cont-selset {
					background: #F6F6F6;
					border-radius: 6rpx;
					margin-right: 15rpx;
					width: 153rpx;
					padding: 6rpx 20rpx;
					font-size: 28rpx;
					font-weight: bold;
				}

				.right-name {
					font-size: 24rpx;
					color: #707070;
					margin-left: auto;
					text-align: right;

					.top {
						color: #1F222B;
					}
				}
			}

			.left {
				width: 290rpx;
				font-size: 24rpx;
				color: #707070;
				margin-right: 28rpx;

				.money {
					font-size: 30rpx;
					color: #5EBA89;
					font-weight: bold;
					margin-top: 20rpx;
					text-align: center;
				}

				.zhehe {
					font-size: 26rpx;
					color: #1F222B;
					margin-top: 4rpx;
					margin-bottom: 20rpx;
					text-align: center;
				}

				.left-input {
					background: #F6F6F6;
					border-radius: 6rpx;
					padding: 10rpx 24rpx;
					width: 208rpx;
					margin-right: 10rpx;

					& image {
						width: 18rpx;
						height: 10rpx;
					}
				}
			}

			.right {
				flex: 1;

				.f-btn {
					width: 404rpx;
					height: 72rpx;
					background: #5EBA89;
					border-radius: 8rpx;
					color: #fff;
					font-size: 30rpx;
					font-weight: bold;
					text-align: center;
					line-height: 72rpx;
				}

				.f-btn1 {
					background: #E45360 !important;
				}

				.available {
					font-size: 26rpx;
					color: #8D9099;
					margin-bottom: 20rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 14rpx;

					.right {
						color: #000;
						display: flex;
						align-items: center;
						justify-content: flex-end;

						& image {
							margin-left: 14rpx;
							width: 36rpx;
							height: 36rpx;
						}

					}
				}

				.money-input {
					background: #F6F6F6;
					border-radius: 6rpx;
					margin: 30rpx 0;
					padding: 18rpx 0;

					.f-input {
						text-align: center;
						color: #1F222B;
						font-size: 32rpx;
						font-weight: bold;
					}
				}

				.percent {
					color: #B0B3BA;
					font-size: 24rpx;

					.item {
						width: 25%;
						text-align: center;
					}
				}

				.stpes-list {
					display: flex;
					align-items: center;
					margin: 14rpx;

					.item {
						width: 84rpx;
						height: 18rpx;
						background: #F6F6F6;
						margin-right: 12rpx;

						&:last-child {
							margin-right: 0rpx;
						}
					}

					.item1 {
						background: #5EBA89;
					}
				}

				.r-img {
					display: flex;
					align-items: center;

					.l-sell {
						display: flex;
						align-items: center;
						background-image: url(../../static/image/new/left1.png);
						background-size: 100% 100%;
						width: 199rpx;
						height: 52rpx;
						justify-content: center;
						font-size: 28rpx;
						color: #FFFFFF;
					}

					.r-sell {
						display: flex;
						align-items: center;
						margin-left: -30rpx;
						background-image: url(../../static/image/new/right1.png);
						background-size: 100% 100%;
						width: 233rpx;
						height: 52rpx;
						justify-content: center;
						color: #8D9099;
						font-size: 28rpx;
					}

					.l-sell1 {
						display: flex;
						align-items: center;
						background-image: url(../../static/image/new/right1-2.png);
						background-size: 100% 100%;
						color: #8D9099;
						width: 233rpx;
						height: 52rpx;
						justify-content: center;
						font-size: 28rpx;

					}

					.r-sell1 {
						display: flex;
						align-items: center;
						margin-left: -30rpx;
						background-image: url(../../static/image/new/left1-2.png);
						background-size: 100% 100%;
						width: 199rpx;
						height: 52rpx;
						justify-content: center;

						color: #FFFFFF;
						font-size: 28rpx;
					}
				}

				.l-sum {
					padding: 20rpx 24rpx;
					background: #F6F6F6;
					border-radius: 6rpx;
					font-size: 28rpx;
					color: #1F222B;
					font-weight: bold;
					display: flex;
					align-items: center;

					.f-input {
						// display:block;
						// margin:0 auto;
						text-align: center;
						color: #1F222B;
						font-size: 32rpx;
						font-weight: bold;
					}

					.r-icon {
						margin-left: auto;
					}

					& image {
						width: 40rpx;
						height: 40rpx;
					}
				}

				.limit-box {
					margin: 14rpx 0;
					padding: 10rpx 24rpx;
					background: #F6F6F6;
					border-radius: 6rpx;
					font-size: 28rpx;
					color: #1F222B;
					font-weight: bold;
					display: flex;
					align-items: center;
					position: relative;

					.price-drop-down {
						width: 100%;
						position: absolute;
						top: 62rpx;
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

					.l-cont {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.r-icon {
						transition: all 0.3s;
						margin-left: auto;
					}

				}
			}

		}

		.bi-title {
			padding: 30rpx 24rpx;

			.left {
				display: flex;
				align-items: center;
				justify-content: baseline;
				font-size: 38rpx;
				color: #000;
				font-weight: bold;

				.num {
					color: #5EBA89;
					font-size: 28rpx;
					margin-left: 14rpx;
					font-weight: 400;
				}

				.num1 {
					color: #E45360 !important;
				}

				& image {
					width: 48rpx;
					height: 48rpx;
					margin-right: 14rpx;
				}
			}

			.right {
				& image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 14rpx;
				}
			}
		}

		.top-btn {
			margin: 0 24rpx;
			border: 1rpx solid #B0B3BA;
			border-radius: 6rpx;
			display: flex;
			align-items: center;
			overflow-x: scroll;

			padding: 0 30rpx;

			::-webkit-scrollbar {
				display: none
			}

			.btn-tag {
				position: absolute;
				top: -6rpx;
				right: -44rpx;
				color: #1F222B;
				font-size: 14rpx;
				background: linear-gradient(360deg, #ECBD4C 0%, #FADE72 100%);
				border-radius: 2rpx;
				padding: 0 6rpx;
				-webkit-transform: scale(0.5)
			}

			.item {
				position: relative;
				text-align: center;
				flex: 1;
				width: auto;
				flex-basis: auto;
				flex-shrink: 0;
				font-size: 26rpx;
				color: #8D9099;
				margin-right: 50rpx;
			}

			.item1 {
				position: relative;
				color: #1F222B;
				font-size: 26rpx;
				font-weight: 600;
				border-radius: 6rpx;
				padding: 10rpx 33rpx;
				background: #fff;
			}
		}
	}
</style>