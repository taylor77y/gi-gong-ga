<template>
	<view class="page">
		<xl-header :title="data.name"></xl-header>
		<view class="container">
			<view class="title">
        {{i18n.gmje}}
			</view>
			<view class="input-container">
				<input type="number" class="input" placeholder="Enter amount" placeholder-style="color: #C0C0C0" v-model="amountAll">
				<view class="usdt">
					USDT
				</view>
				<view class="all" @click="allBtn">
					{{i18n.quanbu}}
				</view>
			</view>
			<view class="row mt-20">
				<view class="left">
          {{i18n.kyye}}
				</view>
				<view class="right">
				{{availableAmount}} USDT
				</view>
			</view>
			<view class="row">
				<view class="left">
          {{i18n.slxz}}
				</view>
				<view class="right">
					
				</view>
			</view>
			<view class="row">
				<view class="left">
          {{i18n.zskt}}
				</view>
				<view class="right">
					{{data.min|| '-'}} USDT
				</view>
			</view>
			<view class="row">
				<view class="left">
          {{i18n.zdkt}}
				</view>
				<view class="right">
					{{data.minx|| '-'}} USDT
				</view>
			</view>
			<view class="sub-title">
        {{i18n.gailan}}
			</view>
			<view class="row p-30">
				<view class="left">
          {{i18n.gmr}}
				</view>
				<view class="right">
          {{data.buyDate|| '-'}}
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
          {{i18n.qxr}}
				</view>
				<view class="right">
          {{data.startDate|| '-'}}
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
          {{i18n.pxsj}}
				</view>
				<view class="right">
				{{data.distribute|| '-'}}
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
          {{i18n.jxjsr}}
				</view>
				<view class="right">
					{{data.endDate|| '-'}}
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
          {{i18n.tqsh}}
				</view>
				<view class="right">
					{{data.ransomRate|| '-'}}
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
          {{i18n.yjsy}}
				</view>
				<view class="right">
					{{data.predictRate|| '-' }} USDT
				</view>
			</view>
			<view class="row p-30">
				<view class="left">
          {{i18n.jrrsy}}
				</view>
				<view class="right">
          {{data.todayRate|| '-'}}
				</view>
			</view>
			<button class="buy-btn" type="primary" @tap="toBuyHandler()">	{{i18n.goumai}}</button>
		</view>
	</view>
</template>

<script>
	import i18n from "../../common/locales/config";

  export default {
		data() {
			return {
        periodDayId:0,//周期
        availableAmount:0,
        amountAll:1,//Usdt金额
        data: {}, // 请求回来的数据
			}
		},
   onLoad (obj) {
      this.orderId = obj.id //产品id
      this.periodDayId = obj.periodDay //产品id
     this.getCheckFundOrder()//获取数据
   },
    computed: {
      i18n () {
        return this.$t('financialManagement')
      }
    },
		methods: {
      //请求数据
      getCheckFundOrder(){
        this.$u.api.fundFinancing.getCheckFundOrder(this.orderId).then(res=>{
          if(res.status === 'SUCCEED'){
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
          this.$utils.showToast(this.i18n.jebnxy0)
          // 您可以显示错误消息给用户，而不是将消息记录在控制台中。
        }
        else if (this.amountAll < this.data.min) {
          this.$utils.showToast(this.i18n.jebnxyzskt)
          // 在此处继续您的逻辑。
        }
        else if (this.amountAll > this.data.minx) {
          this.$utils.showToast(this.i18n.jebndyzdkt)
          // 在此处继续您的逻辑。
        }
        else {
          uni.setStorageSync('data', this.data);
          uni.setStorageSync('amount', this.amountAll);
          uni.navigateTo({
              url:`/pages/financial/confirm?productId=${this.orderId}&periodDayId=${this.periodDayId}`
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
