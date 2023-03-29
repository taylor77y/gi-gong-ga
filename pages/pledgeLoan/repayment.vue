<template>
	<view class="page">
		<xl-header title="还款" />
		<view class="container">
			<view class="box">
				<view class="title">
					还款
				</view>
				<view class="input-container">
					<input v-model="rePrice" type="number" placeholder="请输入还款数量"
						placeholder-style="color:#868c9a;font-size:26rpx;" class="input" @input="getInfo()" />
					<view class="usdt">
						USDT
					</view>
					<view class="all" @tap="exchange()">
						ALL
					</view>
				</view>
				<view class="money exchange-container">
					可用余额：{{usdtPrice}} USDT
					<image class="exchange" src="../../static/image/exchange.png" @tap="toExChange()"></image>
				</view>
				<view class="cell mp-60">
					<view class="l">
						总负债
					</view>
					<view class="r">
						{{ data.totalIncurDebts }} {{ data.borrowName}}
					</view>
				</view>
				<view class="cell">
					<view class="l">
						利息
					</view>
					<view class="r">
						{{ data.totalMoney }} {{ data.borrowName}}
					</view>
				</view>
				<view class="cell">
					<view class="l">
						本金还款
					</view>
					<view class="r">
						{{ data.totalIncurDebts }}
					</view>
				</view>
				<view class="cell">
					<view class="l">
						还款后质押率
					</view>
					<view class="r">
						{{ pledgeRate!= null ? pledgeRate.toFixed(2) : '--' }} %
					</view>
				</view>
				<view class="btn-container">
					<view class="btn" :class="{active:rePrice>0}" @tap="submit()">
						确认还款
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rePrice: null,
				data: {},
				pledgeRate: null,
				usdtPrice: 0,
				newData: {}
			}
		},
		onLoad(options) {
			this.data = JSON.parse(options.data)
			console.log('this.data', this.data)
			this.getBalanceList()
		},
		methods: {
			toExChange(){
				uni.navigateTo({
					url:'/pages/flashCash/index'
				})
			},
			exchange() {
				this.rePrice = this.data.totalIncurDebts
				this.getInfo()
			},
			async getInfo() {
				let userId = uni.getStorageSync('userId')
				if (!userId) {
					this.$utils.showToast('请登录')
					return false
				}
				if (this.rePrice > this.data.totalIncurDebts) {
					this.$utils.showToast('大于还款金额')
					return false
				}
				let res = await this.$u.api.pledge.getLoanAmount(Number(this.data.totalIncurDebts) - Number(this.rePrice), this.data
					.deadline,
					this.data.pledgeMoney, this.data.pledgeName, userId)
				if (res.status == 'SUCCEED') {
					this.pledgeRate = res.result.pledgeRate
				}
			},
			async submit() {
				if (this.rePrice > 0) {
					await this.getInfo()
				}
				let res = await this.$u.api.pledge.setFundOrderRedeem({
					id:this.data.id,
					borrowMoney:this.rePrice
				})
				if(res.status == 'SUCCEED'){
					this.$utils.showToast('还款成功')
					setTimeout(()=>{
						uni.reLaunch({
							url:'/pages/pledgeLoan/record'
						})
					},500)
					return
				}
				this.$utils.showToast(res.errorMessage)
			},
			async getBalanceList() {
				let userId = uni.getStorageSync('userId')
				if (!userId) {
					this.$utils.showToast('请登录')
					return false
				}
				let res = await this.$u.api.user.getBalanceList(userId)
				if (res.status == 'SUCCEED') {
					this.usdtPrice = res.result.usdtPrice
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.exchange-container{
			display: flex;
			align-items: center;
		}
		.exchange{
			margin-left: 20rpx;
			width: 26rpx;
			height: 26rpx;
		}
		.container {
			padding: 30rpx;
			color: #868c9a;
			font-size: 24rpx;

			.box {
				background-color: #f5f5f5;
				padding: 30rpx;

				.title {
					color: #333;
					font-size: 30rpx;
				}

				.input-container {
					font-size: 28rpx;
					margin: 10rpx 0;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.input {
						flex: 1;
						border: none;
						background: none;
						padding: 0 20rpx;
						color: #333;
					}

					.usdt {
						margin: 0 30rpx;
					}

					.all {
						color: #13d3eb;
					}
				}


				.cell {
					display: flex;
					justify-content: space-between;
					margin-top: 30rpx;
				}


				.mp-60 {
					margin-top: 60rpx;
				}

				.btn-container {
					margin-top: 60rpx;

					.btn {
						height: 84rpx;
						width: 100%;
						background-color: #c8cad2;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 32rpx;
						border-radius: 10rpx;

						&.active {
							color: #333;
							background-color: #2c78f8;
						}
					}
				}
			}
		}
	}
</style>