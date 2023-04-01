<template>
	<view class="page">
		<xl-header title="续借" />
		<view class="container">
			<view class="card loan-container">
				<text class="loan-text">借款</text>
				<view class="input-container">
					<input v-model="borrowPrice" type="number" placeholder="请输入借款数量"
						placeholder-style="color:#868c9a;font-size:26rpx;" class="input" @input="getInfo()" />
					<view class="coin" @click="showSelect = !showSelect">
						<image class="icon" :src="baseUrl + '/symbol/usdt.png'" />
						<view class="name">
							USDT
						</view>
					</view>
					<view class="right-select">
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
				<view class="cell">
					<view class="l">
						强平价格(BTC/USDT)
					</view>
					<view class="r">
						{{ newData.forcePrice || '--'}}
					</view>
				</view>
				<view class="cell">
					<view class="l">
						质押率
					</view>
					<view class="r">
						{{ newData.pledgeRate || '--'}} %
					</view>
				</view>
				<view class="cell">
					<view class="l">
						小时利率
					</view>
					<view class="r">
						{{ newData.hrRate || '--'}}
					</view>
				</view>
				<view class="cell">
					<view class="l">
						日利率
					</view>
					<view class="r">
						{{ newData.dayRate || '--'}}
					</view>
				</view>
				<view @click="showPopup = true">
					<u-icon name="info-circle-fill" size="30" color="#00e3ff"></u-icon>
				</view>
				<view class="cell big">
					<view class="l">总利息</view>
					<view class="r">{{newData.totalMoney ? newData.totalMoney.toFixed(2):''}}-- USDT</view>
				</view>
				<view class="cell big">
					<view class="l">预计还款</view>
					<view class="r">{{newData.predictRefundMoney?newData.predictRefundMoney.toFixed(2):''}}-- USDT</view>
				</view>
				<button type="primary" class="btn" @tap="buyBtnHanler()">借币</button>
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
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: uni.getStorageSync('imgPath'),
				data: {},
				showSelect: false,
				selectList: ['USDT'],
				borrowPrice: null,
				showPopup:false,
				newData:{}
			}
		},
		onLoad(options) {
			this.data = JSON.parse(options.data)
			console.log('this.data', this.data)
		},
		methods: {
			async buyBtnHanler(){
				let userId = uni.getStorageSync('userId')
				if (!userId) {
					this.$utils.showToast('请登录')
					return false
				}
				if(this.borrowPrice == null || this.borrowPrice < 0){
					this.$utils.showToast('请输入借款数量')
					return false
				}
				let flag = await this.getInfo()
				if(flag){
					let res = await this.$u.api.pledge.setFundOrderPurchase({
						orderId:this.data.id,
						money : this.borrowPrice,
						type:'RENEWAL'
					})
					if(res.status == 'SUCCEED'){
						this.$utils.showToast('续借成功')
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/pledgeLoan/record'
							})
						},500)
						return
					}
				}
			},
			async getInfo() {
				let userId = uni.getStorageSync('userId')
				if (!userId) {
					this.$utils.showToast('请登录')
					return false
				}
				if(this.borrowPrice == null || this.pledgeMoney < 0){
					this.$utils.showToast('请输入借款数量')
					return false
				}
				let res = await this.$u.api.pledge.getLoanAmount(Number(this.data.totalIncurDebts) + Number(this.borrowPrice), this.data
					.deadline,
					this.data.pledgeMoney, this.data.pledgeName, userId)
				if (res.status == 'SUCCEED') {
					this.newData = res.result
					return true 
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.bg {
			width: 100%;
			height: 400rpx;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.container {
			padding: 30rpx;

			.card {
				border-radius: 10rpx;
				padding: 20rpx;
				// position: relative;
				background: #f5f5f5;

				.loan-text {
					font-size: 28rpx;
					color: #333;
				}

				.input-container {
					margin-top: 20rpx;
					display: flex;
					align-items: center;

					.input {
						flex: 1;
						border: none;
						background: none;
						padding: 0 20rpx;
						color: #333;
					}

					.coin {
						height: 48rpx;
						border-left: 2rpx solid #b8bcc5;
						padding-left: 20rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.icon {
							width: 46rpx;
							height: 46rpx;
						}

						.name {
							margin-left: 10rpx;
						}
					}
				}

				.money {
					color: #868c9a;
					font-size: 24rpx;
				}
			}
		}

		.cell{
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			color: #868c9a;
			font-size: 26rpx;
			
			&.big{
				font-size: 30rpx;
			}
			
			.l{
				color: #868c9a;
			}
			
			.r{
				color: #333;
			}
		}
		
		.btn{
			margin-top: 50rpx;
		}
		
		.right-select {
			position: relative;

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

		.select-box1 {
			width: 200rpx;
			position: absolute;
			left: -160rpx;
			top: 60rpx;
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
</style>