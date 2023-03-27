<template>
	<view class="page">
		<xl-header title="理財5天"></xl-header>

		<view class="container">
			<view class="title">
        理财金额(USDT)
			</view>
			<view class="input-container">
				<input disabled type="text" class="input" placeholder="Enter amount" placeholder-style="color: #C0C0C0" v-model="amount" disabled>
				<view class="usdt">
					USDT
				</view>
			</view>
			<view class="row mt-20">
				<view class="left">
          预期收益
				</view>
				<view class="right">
          {{orderData.distribute }}
				</view>
			</view>
			<view class="row">
				<view class="left">
          日收益
				</view>
				<view class="right">
       {{orderData.todayRate}}
				</view>
			</view>
			<view class="row">
				<view class="left">
          起息日
				</view>
				<view class="right">
          {{orderData.startDate }}
				</view>
			</view>
			<view class="row">
				<view class="left">
          计息结束日
				</view>
				<view class="right">
          {{orderData.endDate}}
				</view>
			</view>
			<view class="row">
				<view class="left">
          订单编号
        </view>
				<view class="right">
        {{orderNumber}}
				</view>
			</view>
			<view class="row">
				<view class="left">
          订单时间
				</view>
				<view class="right">
         {{orderData.buyDate}}
				</view>
			</view>

			<view class="btn-container">
				<button class="btn mr-20" @tap="cancelClick()">取消</button>
				<button type="primary" class="btn ml-20" @tap="confirmClick()">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        orderNumber:0,//订单数
        amount:0,//金额
        orderData:{},//订单数据
			}
		},
    onLoad(options){
      this.orderNumber = +(new Date()).toISOString().slice(0, 10).replace(/-/g, '') + Math.random().toString().substr(2, 6);
      this.amount = options.amount; // 获取amount参数值
      this.orderData  = uni.getStorageSync('data'); // 获取之前存储的data对象
    },
		methods: {
			cancelClick() {
				uni.navigateBack()
			},
			confirmClick(){
        let params  = new Object()
        // params.finishValueDate = this.orderData.
        // this.$u.api.fundFinancing.setFundOrderPurchase(this.orderId).then(res=>{
        //   if(res.status === 'SUCCEED'){
        //     this.data = res.result
        //     const date = new Date(this.data.buyDate);
        //     this.data.buyDate =  date.toLocaleString();
        //     const date1 = new Date(this.data.endDate);
        //     this.data.endDate =  date1.toLocaleString();
        //     const date2 = new Date(this.data.startDate);
        //     this.data.startDate =  date2.toLocaleString();
        //   }
        // })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.container {
			padding: 30rpx;

			.title {
				font-size: 32rpx;
				font-weight: 600;
				padding-top: 40rpx;
				padding-bottom: 30rpx;
			}

			.input-container {
				padding: 10rpx 30rpx 10rpx 0rpx;
				display: flex;
				align-items: center;
				background-color: #f5f5f5;
				border-radius: 6rpx;


				.input {
					width: 100%;
					background-color: transparent;
				}

				.usdt {}

				.all {
					padding-left: 6rpx;
					color: #2c78f8;
				}
			}

			.mt-20 {
				margin-top: 20rpx;
			}

			.row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 29rpx;
				padding: 20rpx 0;

				.left {
					color: #868c9a;
				}

				.right {
					color: #333;
					// font-weight: 700;
				}
			}

			.btn-container {
				margin-top: 50rpx;
				padding: 30rpx 0;
				display: flex;
				box-sizing: border-box;

				.btn {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 28rpx;
					line-height: 32rpx;
					padding: 20rpx;

					&.mr-20 {
						margin-right: 20rpx;
					}

					&.ml-20 {
						margin-left: 20rpx;
					}

					&::after {
						content: '';
						position: absolute;
						width: 100%;
						height: 100%;
						transform-origin: 0 0;
						transform: scale(0.5, 0.5) translateZ(0);
						box-sizing: border-box;
						left: 0;
						top: 0;
						border-radius: 12rpx;
						border: 0;
					}
				}
			}

		}
	}
</style>
