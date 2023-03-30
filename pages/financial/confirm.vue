<template>
	<view class="page">
		<xl-header :title="orderData.name"></xl-header>

		<view class="container">
			<view class="title">
      {{i18n.lcje}}
			</view>
			<view class="input-container">
				<input disabled type="text" class="input" placeholder="Enter amount" placeholder-style="color: #C0C0C0" v-model="amount" disabled>
				<view class="usdt">
					USDT
				</view>
			</view>
			<view class="row mt-20">
				<view class="left">
          {{i18n.yqsy}}
				</view>
				<view class="right">
          {{orderData.distribute }}
				</view>
			</view>
			<view class="row">
				<view class="left">
          {{i18n.rsy}}
				</view>
				<view class="right">
       {{orderData.todayRate}}
				</view>
			</view>
			<view class="row">
				<view class="left">
          {{i18n.qxr}}
				</view>
				<view class="right">
          {{orderData.startDate }}
				</view>
			</view>
			<view class="row">
				<view class="left">
          {{i18n.jxjsr}}
				</view>
				<view class="right">
          {{orderData.endDate}}
				</view>
			</view>
			<view class="row">
				<view class="left">
          {{i18n.ddbh}}
        </view>
				<view class="right">
        {{orderNumber}}
				</view>
			</view>
			<view class="row">
				<view class="left">
          {{i18n.ddsj}}
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
        orderNumber:0,//订单编号
        amount:0,//金额
        orderData:{},//订单数据
        periodDayId :'',//周期数
        productId:'',//产品ID
      }
		},
    computed:{
      i18n () {
        return this.$t("financialManagement")
      }
    },
    onLoad(options){
      console.info("🇨🇳🇨🇳:o --", options)
      this.orderNumber = +(new Date()).toISOString().slice(0, 10).replace(/-/g, '') + Math.random().toString().substr(2, 6);
      this.amount = options.amount; // 获取amount参数值
      this.orderData  = uni.getStorageSync('data');
      this.amount  = uni.getStorageSync('amount');
      this.periodDayId  = options.periodDayId
      this.productId  = options.productId
      console.info("🇨🇳🇨🇳:this.orderData  --", this.orderData )
    },
		methods: {
			cancelClick() {
				uni.navigateBack()
			},
			confirmClick(){
        let userId = uni.getStorageSync('userId')
        let params  = new Object()
        params.finishValueDate = this.orderData.endDate
        params.fundProductId = this.productId //产品ID
        // params.fundProductId = 2//产品ID
        params.memberId = userId //用户ID
        params.orderNumber  = this.orderNumber //订单id
        params.periodDay =  this.periodDayId  //周期
        params.price = this.amount  //金额
        params.residueDay = this.periodDayId//剩余天数
        params.valueDate =  this.orderData.startDate    // 起息时间

        this.$u.api.fundFinancing.setFundOrderPurchase(params).then(res=>{
          if(res.status==='SUCCEED'){
            uni.navigateTo({
              url:'/pages/fund/components/successfulPurchase'
            })
          } else if(res.status === 'FAILED') {
            return this.$utils.showToast(res.errorMessage)
          }
        })
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
