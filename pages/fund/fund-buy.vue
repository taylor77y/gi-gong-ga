<template>
	<view class="page">
		<xl-header title="理財5天"></xl-header>
		<view class="container">
			<view class="title">
        购买金额
			</view>
			<view class="input-container">
				<input type="number" class="input" placeholder="Enter amount" placeholder-style="color: #C0C0C0" v-model="amountAll">
				<view class="usdt">
					USDT
				</view>
				<view class="all" @click="allBtn">
					全部
				</view>
			</view>
			<view class="row mt-20">
				<view class="left">
          可用余额
				</view>
				<view class="right">
				{{availableAmount}} USDT
				</view>
			</view>
			<view class="row">
				<view class="left">
          数量限制
				</view>
				<view class="right">
					
				</view>
			</view>
			<view class="row">
				<view class="left">
          最少可投
				</view>
				<view class="right">
					{{data.min|| '-'}} USDT
				</view>
			</view>
			<view class="row">
				<view class="left">
          最大可投
				</view>
				<view class="right">
					{{data.minx|| '-'}} USDT
				</view>
			</view>
			<view class="sub-title">
        概览
			</view>
			<view class="row p-30">
				<view class="left">
          购买日
				</view>
				<view class="right">
          {{data.buyDate|| '-'}}
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
          起息日
				</view>
				<view class="right">
          {{data.startDate|| '-'}}
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
          派息时间
				</view>
				<view class="right">
				{{data.distribute|| '-'}}
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
          计息结東日
				</view>
				<view class="right">
					{{data.endDate|| '-'}}
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
          提前赎回
				</view>
				<view class="right">
					{{data.ransomRate|| '-'}}
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
          预计收益
				</view>
				<view class="right">
					{{data.predictRate|| '-' }} USDT
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
          今日日收益
				</view>
				<view class="right">
          {{data.todayRate|| '-'}}
				</view>
			</view>
			<button class="buy-btn" type="primary" @tap="toBuyHandler()">购买</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        availableAmount:0,
        amountAll:0,//Usdt金额
        data: {}, // 请求回来的数据
			}
		},
   onLoad (id) {
      this.orderId = id.id
     this.getCheckFundOrder()//获取数据
   },
    computed: {
    },
		methods: {
      //请求数据
      getCheckFundOrder(){
        this.$u.api.fundFinancing.getCheckFundOrder(this.orderId).then(res=>{
          if(res.status === 'SUCCEED'){
            // this.data = res.result
            // const date = new Date(this.data.buyDate);
            // this.data.buyDate =  date.toLocaleString();
            // const date1 = new Date(this.data.endDate);
            // this.data.endDate =  date1.toLocaleString();
            // const date2 = new Date(this.data.startDate);
            // this.data.startDate =  date2.toLocaleString();
            this.data = res.result;
            const date = new Date(this.data.buyDate);
            this.data.buyDate =  date.toISOString().slice(0,10);
            const date1 = new Date(this.data.endDate);
            this.data.endDate = date1.toISOString().slice(0,10);
            const date2 = new Date(this.data.startDate);
            this.data.startDate = date2.toISOString().slice(0,10);
          }
        })
        let usdtBalance =  uni.getStorageSync('usdtPrice');
        this.availableAmount = usdtBalance
      },

      //全部金额
      allBtn(){
        this.amountAll = this.availableAmount
      },
      //确认购买
			toBuyHandler(){
        if (this.amountAll <= 0) {
          this.$utils.showToast('金额不能小于0')
          // 您可以显示错误消息给用户，而不是将消息记录在控制台中。
        }
        else if (this.amountAll < this.data.min) {
          this.$utils.showToast('金额不能小于最少可投')
          // 在此处继续您的逻辑。
        }
        else if (this.amountAll > this.data.minx) {
          this.$utils.showToast('金额不能大于最多可投')
          // 在此处继续您的逻辑。
        }
        else {
          uni.setStorageSync('data', this.data);
          uni.setStorageSync('amount', this.amountAll);
          uni.navigateTo({
              url:`/pages/financial/confirm?amount=${this.amountAll}`
          })
        }
			}
		}
	}
</script>

<style lang="scss" scoped>
.page{
	.container{
		padding: 30rpx;
		
		.title{
			font-size: 32rpx;
			font-weight: 600;
			padding-top: 40rpx;
			padding-bottom: 30rpx;
		}
		
		.input-container{
			padding: 10rpx 30rpx 10rpx 0rpx;
			display: flex;
			align-items: center;
			background-color: #f5f5f5;
			border-radius: 6rpx;
			
			
			.input{
				width: 100%;
				background-color: transparent;
			}
			
			.usdt{
				
			}
			
			.all{
        width: 100rpx;
				padding-left: 16rpx;
				color: #2c78f8;
			}
		}
		
		.mt-20{
			margin-top: 20rpx;
		}
		
		.row{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 29rpx;
			padding: 20rpx 0;
			
			&.p-30{
				padding: 30rpx 0rpx !important;
			}
			
			.left{
				color: #868c9a;
			}
			.right{
				color: #333;
				font-weight: 700;
			}
		}
		
		.sub-title{
			font-size: 29rpx;
			margin-top: 70rpx;
		}
		
		.buy-btn{
			margin-top: 160rpx;
		}
	}
}
</style>
