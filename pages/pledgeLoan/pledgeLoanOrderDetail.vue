<template>
	<view class="page">
		<xl-header :title=i18n.ddxq />
		<view class="container">
			<view class="title">
				{{statusFilter(data.status)}}
			</view>
			<view class="fz">
        {{ i18n.zfz }}
			</view>
			<view class="fz-usdt">
				<view class="number">
					{{ data.totalIncurDebts }} USDT
				</view>
				<view class="btn" @tap="toRePayMent()" v-show="data.status == 0">
          {{ i18n.huankuang }}
				</view>
			</view>
			<view class="col">
				<view class="left">
					<view class="t">
						{{i18n.dkbz}}
					</view>
					<view class="b">
						{{ data.borrowName}}
					</view>
				</view>
				<view class="right">
					<view class="t">
					{{i18n.zjk}}
					</view>
					<view class="b">
						{{ data.borrowMoney}}
					</view>
				</view>
			</view>
			<view class="col">
				<view class="left">
					<view class="t">
				{{i18n.zlx}}
					</view>
					<view class="b">
						{{ data.totalMoney}} {{ data.borrowName}}
					</view>
				</view>
				<view class="right">
					<view class="t">
						{{i18n.shililv}}
					</view>
					<view class="b">
						{{ data.hrRate}} % / {{ data.dayRate}} %
					</view>
				</view>
			</view>
			<view class="col">
				<view class="left">
					<view class="t">
					{{i18n.zyl}}
					</view>
					<view class="b">
						{{ data.pledgeRate}}
					</view>
				</view>
				<view class="right">
					<view class="t">
            {{ i18n.qiangpingjiage }}
					</view>
					<view class="b">
						{{ data.forcePrice}}
					</view>
				</view>
			</view>
			<view class="tb">

			</view>
			<view class="cell">
				<div class="l">{{i18n.ddh}}</div>
				<div class="r">{{data.orderNumber}}</div>
			</view>
			<view class="cell">
				<div class="l">{{i18n.jksj}}</div>
				<div class="r">{{ dateFormat(data.creationTime)}}</div>
			</view>
			<view class="cell">
				<div class="l">{{i18n.dqsj}}</div>
				<div class="r">{{ dateFormat(data.expireTime)}}</div>
			</view>
			<view class="cell" @tap="toDetail()">
				<div class="l link">{{i18n.zyjl}}</div>
				<div class="r">
					<u-icon name="arrow-right" color="#13d3eb" size="28"></u-icon>
				</div>
			</view>
			<view class="btn-container">
				<view class="btn-add" @tap="addPledge()">
					{{i18n.xzzy}}
				</view>
				<view class="btn-bro" @tap="pledgeLoanRenew()">
					{{i18n.jiexu}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate
	} from "@/common/utils/dateFormat.js"
  import i18n from "../../common/locales/config";
	export default {
		data() {
			return {
				data: {}
			}
		},
		onLoad(options) {
			this.data = JSON.parse(options.data)
			console.log('this.data', this.data)
		},
    computed:{
      i18n(){
        return this.$t("pledgeIndex")
      }
    },
		methods: {
      i18n,
			dateFormat(time){
				return formatDate(time)
			},
			statusFilter(status) {
				if (status == 0) {
					return this.i18n.jxz
				} else if (status == 1) {
					return this.i18n.yjq
				} else if (status == 2) {
					return this.i18n.qpjq
				}
			},
			toDetail() {
				uni.navigateTo({
					url: '/pages/pledgeLoan/pledgeRecord?data=' + JSON.stringify(this.data.details)
				})
			},
			toRePayMent(){
				uni.navigateTo({
					url: '/pages/pledgeLoan/repayment?data=' + JSON.stringify(this.data)
				})
			},
			addPledge(){
				uni.navigateTo({
					url: '/pages/pledgeLoan/addPledge?data=' + JSON.stringify(this.data)
				})
			},
			pledgeLoanRenew(){
				uni.navigateTo({
					url: '/pages/pledgeLoan/pledgeLoanRenew?data=' + JSON.stringify(this.data)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #f5f5f5;
		height: 100vh;

		.container {
			padding: 30rpx;
			font-size: 28rpx;

			.title {
				padding: 20rpx 0;
				font-size: 38rpx;
				color: #13d3eb;
			}

			.fz {
				margin-top: 20rpx;
				color: #868c9a;
				display: flex;

				&-usdt {
					margin-top: 20rpx;
					color: #333;
					display: flex;

					.number {
						line-height: 48rpx;
					}

					.btn {
						margin-left: 30rpx;
						padding: 6rpx 30rpx;
						background-color: #13d3eb;
						color: #000;
						border-radius: 4rpx;
					}
				}
			}

			.col {
				display: flex;
				margin-top: 30rpx;
				font-size: 28rpx;


				.t {
					color: #868c9a;
				}

				.b {
					margin-top: 20rpx;
					color: #333;
					font-weight: 550;
				}

				.left {
					flex: 1;
					display: flex;
					flex-direction: column;
				}

				.right {
					flex: 1;
				}
			}

			.tb {
				border-top: 2rpx solid #e5e7ed;
				margin-top: 100rpx;
				padding-bottom: 50rpx;
			}

			.cell {
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				margin-top: 30rpx;

				.l {
					color: #868c9a;
				}

				.link {
					color: #13d3eb;
				}

				.r {}
			}

			.btn-container {
				margin-top: 80rpx;
				display: flex;
				justify-content: space-around;

				.btn-add {
					border: 1px solid #13d3eb;
					color: #13d3eb;
					font-size: 28rpx;
					height: 84rpx;
					width: 100%;
					border-radius: 6rpx;
					text-align: center;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.btn-bro {
					margin-left: 40rpx;
					border: 1px solid #13d3eb;
					color: #333;
					background-color: #13d3eb;
					font-size: 28rpx;
					height: 84rpx;
					width: 100%;
					border-radius: 6rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
</style>