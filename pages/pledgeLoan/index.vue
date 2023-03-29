<template>
	<view>
		<view class="header">
			<u-icon name="arrow-left" size="35" @click="turnBack"></u-icon>
			<view class="middle">{{i18n.zyjb}}</view>
			<u-icon name="order" size="40" class="uicon" @click="turnToPage"></u-icon>
		</view>
		<view class="pledgeLoan">
			<image src="https://db23app.vip/wap/img/pledgeLoanBg.7458befc.png" class="bg"></image>
			<view class="container">
				<view class="card loan-container">
					<text class="loan-text">{{i18n.jk}}</text>
					<view class="input-container">
						<input v-model="borrowPrice" type="number" :placeholder="i18n.jksl"
							placeholder-style="color:#878787;font-weight: 400;" class="input" @input="getInfo()" />
						<view class="split"></view>
						<view class="right-select">
							<view class="img-box"></view>
							<view class="select" @click="showSelect = !showSelect">
								<text class="text">{{selected}}</text>
								<view class="down-icon">
									<image src="../../static/image/k-line/6.png" />
								</view>
							</view>
							<view v-show="showSelect" class="select-box1">
								<view class="text">
									<text>Select</text>
								</view>
								<view class="ul">
									<view v-for="(list, index) in selectList" :key="index" title="" note="" class="li">
										<view class="img-box min"></view>
										<text class="text-min">{{list}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<button type="primary" class="btn" @tap="getInfo()">{{i18n.zyb}}</button>
				</view>
			</view>
			<view class="container">
				<view class="card pledge-container">
					<text class="loan-text">{{i18n.zy}}</text>
					<view class="input-container">
						<input v-model="pledgePrice" type="number" :placeholder="i18n.srzysl"
							placeholder-style="color:#878787;font-weight: 400;" class="input" @input="getInfo()" />
						<view class="split"></view>
						<view class="right-select">
							<view class="img-box"></view>
							<view class="select" @click="showPledgeSelect = !showPledgeSelect">
								<text class="text">{{chooseCoin.name}}</text>
								<view class="down-icon">
									<image :src="baseUrl + '/symbol/'+chooseCoin.name+'.png'" />
								</view>
							</view>
						</view>
					</view>
					<!-- 弹窗 -->
					<view v-show="showPledgeSelect" class="select-box1 select-box2">
						<view class="text">
							<text>Select</text>
						</view>
						<view class="ul">
							<view v-for="(list, index) in coinList" :key="index" title="" note="" class="li"
								v-if="list.name != 'USDT'" @tap.stop="chooseCoinHandler(list)">
								<view class="li-left">
									<view class="img-box min"></view>
									<text class="text-min">{{list.name}}</text>
								</view>
								<view class="li-right">
									<span>{{list.price}}</span>
								</view>
							</view>
						</view>
					</view>
					<view class="label">
						{{i18n.kyye}}：
						<span>-- {{chooseCoin.price}}</span>
					</view>
					<view class="mt-32">
						<text class="loan-text mt-32">{{i18n.jbqx}}</text>
					</view>
					<view class="label mt-10">
						{{i18n.tqhk}}
					</view>
					<picker @change="bindPickerChange" :value="termIndex" :range="termList">
						<view class="term-select">
							<view class="uni-input">{{term}}</view>
							<view class="down-icon">
								<image src="../../static/image/k-line/6.png" />
							</view>
						</view>
					</picker>
					<p class="flex-sbt">
						<span>{{i18n.qpjg}}</span>
						<span>{{ detailInfo.forcePrice || '--'}}</span>
					</p>
					<p class="flex-sbt">
						<span>{{i18n.zyl}}</span>
						<span>{{ detailInfo.pledgeRate || '--'}}%</span>
					</p>
					<p class="flex-sbt">
						<span>{{i18n.xsll}}</span>
						<span>{{ detailInfo.hrRate || '0.0'}}</span>
					</p>
					<p class="flex-sbt">
						<span>{{i18n.rll}}</span>
						<span>{{ detailInfo.dayRate || '0.0'}}</span>
					</p>
					<p @click="showPopup = true">
						<u-icon name="info-circle-fill" size="30" color="#00e3ff"></u-icon>
					</p>
					<!-- 弹窗 -->
					<u-popup v-model="showPopup" mode="center" :zoom="false" border-radius="14" length="95%"
						:closeable="true">
						<view class="popup">
							<view class="title">Rules Description</view>
							<view class="mt-20 mb20">
								<view class="title1">
									<text>Rules Description</text>
									<span class="right">75%</span>
								</view>
								<view class="text-grey mt-12">
									The loanable amount is equal to the pledge amount * the initial pledge rate
								</view>
							</view>
							<view class="mt-20 mb20">
								<view class="title1">
									<text>Margin Pledge Rate</text>
									<span class="right">60%</span>
								</view>
								<view class="text-grey mt-12">
									(Order loan assets + accumulated interest) is converted into pledged asset
									price/pledged asset value ≥ 75%, the system will remind you to replenish pledged
									assets or repay in advance * initial pledge rate
								</view>
							</view>
							<view class="mt-20 mb20">
								<view class="title1">
									<text>Closing pledge rate</text>
									<span class="right">850</span>
								</view>
								<view class="text-grey mt-12">
									(Order loan asset + accumulated interest) is converted into pledged asset
									price/pledged asset value ≥ 83%, and the system will automatically sell/deduct the
									pledged asset to repay the money. Please replenish the mortgage funds in time
								</view>
							</view>
							<view class="mt-20 mb20">
								<view class="title1">
									<text>Interest rate charges</text>
									<span class="right"></span>
								</view>
								<view class="text-grey mt-12">
									The hourly interest rate is 0.2%; the daily interest rate is 4.8%; the loan
									repayment fee is calculated by the hour, and the payment is calculated by the hour,
									if it is less than 1 hour, it will be calculated as 1 hour
								</view>
							</view>
						</view>
					</u-popup>

					<view class="label-max mt-32">
						<span>{{i18n.zlx}}</span>
						<span>{{detailInfo.totalMoney}}-- USDT</span>
					</view>
					<view class="label-max mt-32 mb-32">
						<span>{{i18n.yjhk}}</span>
						<span>{{detailInfo.predictRefundMoney}}-- USDT</span>
					</view>
					<button type="primary" class="btn" @tap="buyBtnHanler()">{{i18n.jb}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selected: 'USDT',
				showSelect: false,
				selectList: ['USDT'], // loan 选择框数据
				showPledgeSelect: false,
				pledgeSelected: 'ETH',
				termIndex: 0,
				termList: [5, 30, 90],
				showPopup: false,
				coinList: [],
				chooseCoin: {},
				baseUrl: uni.getStorageSync('imgPath'),
				borrowPrice: 0,
				pledgePrice: 0,
				detailInfo: {}
			}
		},
		computed: {
			term() {
				return this.termList[this.termIndex] + '天';
			},
			i18n() {
				return this.$t("pledgeIndex")
			}
		},
		onLoad() {
			this.getMyCoinList()
		},
		methods: {
			async getInfo() {
				if (this.borrowPrice < 200) {
					this.$utils.showToast('借币数量不能少于200')
					return false
				}
				if (this.pledgePrice <= 0) {
					this.$utils.showToast('质押需大于0')
					return false
				}
				if (!this.chooseCoin.name) {
					this.$utils.showToast('请选择质押币')
					return false
				}
				if (this.pledgePrice > this.chooseCoin.price) {
					this.$utils.showToast('超出可用余额')
					
					this.$nextTick(() => {
					  this.pledgePrice = this.chooseCoin.price
					})
					return false
				}
				let userId = uni.getStorageSync('userId')
				if (!userId) {
					this.$utils.showToast('请登录')
					return false
				}
				let res = await this.$u.api.pledge.getLoanAmount(this.borrowPrice, this.termList[this.termIndex], this
					.pledgePrice, this.chooseCoin.name, userId)
				console.log('结果来了', res)
				if (res.status == "SUCCEED") {
					this.detailInfo = res.result
					return true
				}
				return false
			},
			async buyBtnHanler() {
				let userId = uni.getStorageSync('userId')
				if (!userId) {
					this.$utils.showToast('请登录')
					return
				}
				let flag = await this.getInfo()
				console.log('flag', flag)
				if (!flag) {
					// this.$utils.showToast('请先质押币')
					return
				}
				let res = await this.$u.api.pledge.setCheckFundOrder({
					memberId: userId,
					borrowMoney: this.borrowPrice,
					borrowName: 'USDT',
					pledgeMoney: this.pledgePrice,
					pledgeName: this.chooseCoin.name,
					deadline: this.termList[this.termIndex],
					forcePrice: this.detailInfo.forcePrice,
					pledgeRate: this.detailInfo.pledgeRate,
					hrRate: this.detailInfo.hrRate,
					dayRate: this.detailInfo.dayRate,
					totalMoney: this.detailInfo.totalMoney,
					predictRefundMoney: this.detailInfo.predictRefundMoney
				})
				if (res.status == "SUCCEED") {
					this.$utils.showToast('借币成功')
				} else {
					this.$utils.showToast(res.errorMessage)
				}
			},
			change() {

			},
			chooseCoinHandler(coin) {
				this.chooseCoin = coin
				this.showPledgeSelect = false
			},
			async getMyCoinList() {
				let userId = uni.getStorageSync('userId')
				if (!userId) {
					this.$utils.showToast('请登录')
					return
				}
				let res = await this.$u.api.pledge.getFundOrderByUserId(userId)
				console.log('initPageData', res)
				if (res.status == "SUCCEED") {
					this.coinList = res.result
				}
			},
			turnBack() {
				uni.navigateBack()
			},
			turnToPage() {
				uni.navigateTo({
					url: "/pages/pledgeLoan/record"
				})
			},
			bindPickerChange(event) {
				this.termIndex = event.detail.value
			},
			close() {},
			open() {},
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		height: 80rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.middle {
			font-weight: bolder;
		}

		.uicon {
			font-weight: bolder;
		}
	}

	.pledgeLoan {
		.bg {
			height: 400rpx;
			width: 100%;
		}

		.container {
			position: relative;
			padding: 20rpx;
			bottom: 80rpx;

			.card {
				border-radius: 10rpx;
				padding: 20rpx;
				// position: relative;
				background: #f5f5f5;
			}
		}

		.loan-container {
			.btn {
				margin-top: 80rpx;
				margin-bottom: 60rpx;
			}
		}

		.input-container {
			display: flex;
			width: 100%;
			align-items: center;

			.input {
				width: 60%;
				border: none;
				background: none;
				padding: 0;
			}

			.split::before {
				content: '';
				position: absolute;
				top: 90rpx;
				left: 62%;
				width: 2rpx;
				height: 60rpx;
				background: #000000;
			}

			.right-select {
				position: relative;
				width: 39%;
				margin-left: 10rpx;
				display: flex;
				white-space: nowrap;
				padding-left: 40rpx;

				.img-box {
					width: 40rpx;
					height: 40rpx;
					background: #000;
					border-radius: 50%;
					margin-right: 14rpx;
					display: inline-block;
				}

				.select {
					display: flex;
				}
			}
		}

		.select-box1 {
			width: 100%;
			position: absolute;
			left: 0;
			top: 80rpx;
			padding: 10rpx 20rpx;
			background: #fff;
			border-radius: 5rpx;
			border: 1px solid #e5e7ed;
			z-index: 2;

			.text {
				line-height: 50rpx;
				border-bottom: 1px solid #e5e7ed;
			}

			.ul {
				display: flex;
				flex-direction: column;

				.li {
					display: flex;
					height: 60rpx;
					align-items: center;
				}

				.text-min {
					font-size: 12px;
					color: #868c9a;
				}
			}

			.min {
				width: 30rpx;
				height: 30rpx;
			}
		}

		.select-box2 {
			position: absolute;
			top: 16%;
			left: 5%;
			width: 90%;
			max-height: 500rpx;
			overflow-y: auto;

			.li {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #e5e7ed;
				height: 60rpx;
				line-height: 60rpx
			}
		}

		.pledge-container {
			.label {
				font-size: 12px;
				color: #868c9a;
				line-height: 60rpx;
			}

			.term-select {
				padding: 10rpx 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rpx;
			}

			p {
				font-size: 12px;
				color: #868c9a;
				line-height: 60rpx;
			}

			.label-max {
				color: #868c9a;
			}

			.popup {
				padding: 30rpx 30rpx 50rpx 30rpx;
				height: auto;

				.title {
					text-align: center;
					line-height: 50rpx;
				}

				.title1 {
					display: flex;
					justify-content: space-between;

					.right {
						color: #13d3eb;
					}
				}

				.text-grey {
					color: #868c9a;
					font-size: 12px;
				}
			}
		}

		.flex-sbt {
			display: flex;
			justify-content: space-between;
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
	}
</style>