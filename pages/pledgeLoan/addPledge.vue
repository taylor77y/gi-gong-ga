<template>
	<view class="page">
		<xl-header title="新增质押" />
		<view class="bg">
			<image class="img" src="../../static/image/addpledgeBg.png"></image>
		</view>

		<view class="container">
			<view class="box">
				<view class="title">
					质押
				</view>
				<view class="input-container">
					<input v-model="pledgeMoney" type="number" placeholder="请输入质押数量"
						placeholder-style="color:#868c9a;font-size:26rpx;" class="input" @input="getInfo()"/>
					<view class="coin">
						<image class="icon" :src="baseUrl + '/symbol/'+tolowerCase(pledgeName)+'.png'" />
						<view class="name">
							{{pledgeName}}
						</view>
					</view>
				</view>
				<view class="money exchange-container">
					可用余额：{{ablePledgePrice}} USDT
					<image class="exchange" src="../../static/image/exchange.png" @tap="toExChange()"></image>
				</view>
				<view class="cell">
					<view class="l">
						质押后质押率
					</view>
					<view class="r">
						{{ pledgeRate!= null ? pledgeRate.toFixed(2) : '--' }} %
					</view>
				</view>
				<view class="btn-container">
					<view class="btn" @tap="submit()">
						确认质押
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
				baseUrl: uni.getStorageSync('imgPath'),
				data: {},
				pledgeRate: null,
				usdtPrice: 0,
				borrowPrice: null,
				coinList:[],
				pledgeName:null,
				pledgeMoney:null,
				ablePledgePrice:0
			}
		},
		onLoad(options) {
			this.data = JSON.parse(options.data)
			console.log('this.data', this.data)
			this.pledgeName = this.data.pledgeName
			this.getMyCoinList()
		},
		methods: {
			async submit() {
				let userId = uni.getStorageSync('userId')
				if (!userId) {
					this.$utils.showToast('请登录')
					return false
				}
				if (this.pledgeMoney == null || this.pledgeMoney < 0 ) {
					this.$utils.showToast('请输入质押数量')
					return false
				}
				let flag = await this.getInfo()
				if(flag){
					console.log('进来了')
					let res = await this.$u.api.pledge.setFundOrderPurchase({
						orderId:this.data.id,
						pledgePrice : this.pledgeMoney,
						pledgeName:this.data.pledgeName,
						type:'NEWPLEDGE'
					})
					if(res.status == 'SUCCEED'){
						this.$utils.showToast('新增质押成功')
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
				if(this.pledgeMoney == null || this.pledgeMoney == 0){
					this.$utils.showToast('请输入质押数量')
					return false
				}
				if (this.pledgeMoney > this.data.ablePledgePrice) {
					this.$utils.showToast('大于可用金额')
					return false
				}
				let res = await this.$u.api.pledge.getLoanAmount(Number(this.data.pledgeMoney) + Number(this.pledgeMoney), this.data
					.deadline,
					this.data.pledgeMoney, this.data.pledgeName, userId)
				if (res.status == 'SUCCEED') {
					this.pledgeRate = res.result.pledgeRate
					return true 
				}
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
					if(this.coinList){
						let arr = this.coinList.filter(e=>e.name == this.pledgeName)
						console.log('arr',arr)
						if(arr && arr.length>0){
							this.ablePledgePrice = arr[0].price
						}
					}
				}
			},
			tolowerCase(name){
				if(name){
					console.log('进来了',name)
					return name.toLowerCase()
				}
				return name
			},
			toExChange(){
				uni.navigateTo({
					url:'/pages/flashCash/index'
				})
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
		.bg {
			width: 100%;
			height: 280rpx;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.container {
			padding: 30rpx;
			position: relative;
			bottom: 100rpx;

			.box {
				background-color: #f5f5f5;
				padding: 30rpx;
				border-radius: 10rpx;

				.title {
					font-size: 30rpx;
				}

				.input-container {
					margin-top: 20rpx;
					display: flex;

					.input {
						// flex: 1;
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

				.cell {
					display: flex;
					justify-content: space-between;
					margin-top: 30rpx;

					.l {
						color: #868c9a;
					}
				}

				.btn-container {
					margin-top: 60rpx;

					.btn {
						height: 84rpx;
						width: 100%;
						color: #333;
						background-color: #2c78f8;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 32rpx;
						border-radius: 10rpx;
					}
				}
			}
		}

	}
</style>