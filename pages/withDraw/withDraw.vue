<template>
	<view class="with-draw">
		<!-- 头部导航栏 -->
		<view class="header">
			<view class="back" @click="back()">
				<u-icon name="arrow-left" :size="50" color="#82848a"></u-icon>
			</view>
			<view class="right">
				<u-icon name="clock" :size="50" color="#82848a"></u-icon>
			</view>
		</view>
		<!-- 内容 -->
		<view class="content">
			<view class="title"><text>{{i18n.tb}}</text></view>
			<view class="small-title"><text>{{i18n.tbdszbdz}}</text></view>
			<view class="select">
				<view><u-input v-model="selectInfo" class="select-input"/></view>
				<view class="select-button">
					<view class="button" @click="openSelect">{{i18n.xzbz}}<u-icon name="arrow-down" :size="40" color="#82848a" style="margin-left: 10rpx;"></u-icon></view>
					<u-action-sheet :list="list" v-model="show" :cancel-btn="false"></u-action-sheet>
				</view>
			</view>
			<!-- Blockchain network -->
			<view class="network-choose">
				<view class="network-title"><text>{{i18n.qklwl}}</text></view>
				<view class="network-button">
					<view class="button-item already-color">
						ERC20
					</view>
					<view class="button-item">
						TRC20
					</view>
					<view class="button-item">
						OMNI
					</view>
				</view>
			</view>
			<!-- Address -->
			<view class="address common">
				<view class="common-text"><text>Adresss</text></view>
				<view class="common-input">
					<view><u-input class="u-input address-input" v-model="addressInfo" :placeholder="i18n.cazt"></u-input></view>
					<view class="address-right">
						<text>{{i18n.zt}}</text>
						<u-icon name="scan" :size="60" style="margin-left: 10rpx; color: #909399;"></u-icon>
					</view>
				</view>
			</view>
			<!-- Number -->
			<view class="number common">
				<view class="common-text"><text>{{i18n.sl}}</text></view>
				<view class="common-input">
					<view><u-input class="u-input number-input" v-model="numberInfo" :placeholder="i18n.qsrtbsl"></u-input></view>
					<view class="number-right">
						<text style="color: #868c9a;">USDT</text>
						<text style="color: #2c78f8; margin-left: 10rpx;">{{i18n.qb}}</text>
					</view>
				</view>
				<view class="number-bottom">
					<view><text>{{i18n.ky}}</text></view>
					<view><text>0.00000 USDT</text></view>
				</view>
			</view>
			
			<view class="quantity"><text>{{i18n.kdzsl}}</text></view>
			<view style="margin-top: 20rpx;">
				<text style="color: #333; font-size: 35rpx; font-weight: 700;">0.00</text>
				<text style="color: #868c9a; font-size: 30rpx; margin-left: 10rpx;">USDT</text>
			</view>
			<view style="margin-top: 20rpx;">
				<text style="color: #868c9a; font-size: 30rpx;">{{i18n.txfy}}: 0.00 USDT</text>
			</view>
			<view style="margin-top: 20rpx;">
				<text>{{i18n.tbsm}}： </text>
			</view>
			<view class="text-grey" style="color: #868c9a; font-size: 20rpx;">
				<br>
				<text>1:{{i18n.tbsj}}</text>
				<br>
				<text>2:{{i18n.zzcbz}}</text>
				<br>
				<text>3:{{i18n.tjtbsqh}}</text>
				<br>
				<text>4:{{i18n.zxkf}}</text>
			</view>
			
			
			<!-- 按钮 -->
			<u-button type="success" class="withdraw-button">{{i18n.tx}}</u-button>
		</view>
		<view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectInfo: 'USDT',
				addressInfo: '',
				numberInfo: '',
				show: false,
				list: [
					{
						text: 'BTC',
					},
					{
						text: 'ETH'
					}
				],
			};
		},
		methods: {
			openSelect() {
				this.show = true
			},
			back() {
				uni.navigateBack(1)
			},
			handleFn() {

				// let data = new Object();
				// data.balance = this.num;
				// data.currency = this.item.currency;
				// data.member = uni.getStorageSync("userId");
				// data.type = this.withdrawalType === 0 ? 1: 2 ;
				// data.baId = this.couponInfo[this.radios].id
				// console.log("提币提交", data)
				// this.$u.api.user.extractCoin(data).then(res => {
				// 	if (res.status === "SUCCEED") {
				// 		this.num = null;
				// 		this.$utils.showToast(this.i18n.tjshcg)
				// 		this.getPath()
				// 	} else {
				// 		this.$utils.showToast(res.errorMessage)
				// 	}
				// })

			}
		},
		computed: {
			i18n() {
				return this.$t("withdraw")
			}
		}
	}
</script>

<style lang="scss">
	.with-draw{
		padding-right: 20rpx;
		background-color: #fff;
		.header{
			height: 88rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 25rpx;
		}
		.content{
			margin-top: 20rpx;
			margin-left: 25rpx;
			.title {
				font-size: 55rpx;
				font-weight: 700;
				color: #333;
			}
			.small-title{
				color: #868c9a;
				margin-top: 20rpx;
			}
			.select{
				width: 700rpx;
				height: 100rpx;
				background-color: #f5f5f5;
				display: flex;
				margin-top: 30rpx;
				.select-input {
					width: 400rpx;
					height: 100rpx;
					display: flex;
					align-items: center;
					margin-left: 15rpx;
				}
				.select-button{
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			.network-choose{
				margin-top: 30rpx;
				font-size: 35rpx;
				.network-button{
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					// margin-right: 40rpx;
					// margin-top: 30rpx;
					.button-item{
						width: 200rpx;
						height: 100rpx;
						margin-top: 30rpx;
						margin-right: 20rpx;
						border: 2rpx solid #ccc;
						border-radius: 10rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 20rpx;
					}
					.already-color{
						border-color: #2c78f8;
						color: #2c78f8;
					}
				}
				
			}
			.common{
				margin-top: 30rpx;
				font-size: 35rpx;
				.common-input{
					width: 700rpx;
					height: 100rpx;
					background-color: #f5f5f5;
					display: flex;
					align-items: center;
					margin-top: 30rpx;
					.u-input{
						width: 530rpx;
						height: 100rpx;
						display: flex;
						align-items: center;
						margin-left: 15rpx;
					}
					.address-right{
						display: flex;
						align-items: center;
						text{
							font-size: 30rpx;
							color: #2c78f8;
						}
					}
					.number-right{
						font-size: 30rpx;
					}
				}
			}
			.number{
				.common-input{
					.number-input {
						width: 500rpx;
					}
				}
				.number-bottom {
					display: flex;
					justify-content: space-between;
					margin-top: 20rpx;
					margin-right: 20rpx;
					color: #868c9a;
					font-size: 25rpx;
				}
			}
			.quantity{
				margin-top: 70rpx;
				font-size: 25rpx;
				color: #868c9a;
			}
			.withdraw-button{
				margin-top: 30rpx;
				background-color: #2c78f8;
			}
		}
	}
</style>
