//理财详情
<template>
  <view class="page">
    <xl-header :title="data.name"></xl-header>
    <view class="container">
      <view class="title">
        托管金额 (USDT)
      </view>
      <view class="input-container">
    {{   data.price}}
      </view>
      <view class="row mt-20">
        <view class="left">
          托管时间
        </view>
        <view class="right">
      {{  data.createTime}}
        </view>
      </view>
      <view class="row">
        <view class="left">
         当日收益
        </view>
        <view class="right">

        </view>
      </view>
      <view class="row">
        <view class="left">
          已获收益
        </view>
        <view class="right">
          {{data.accumulatedIncome||0}}
        </view>
      </view>
      <view class="row">
        <view class="left">
          剩余天数
        </view>
        <view class="right">
          {{data.periodDay||0}}
        </view>
      </view>
<!--      <view class="sub-title">-->
<!--        概览-->
<!--      </view>-->
      <view class="row p-30">
        <view class="left">
          预期收益
        </view>
        <view class="right">
          0.00
        </view>
      </view>
      <view class="row p-30">
        <view class="left">
        起息时间
        </view>
        <view class="right">
          {{data.valueDate|| 0}}
        </view>
      </view>
      <view class="row p-30">
        <view class="left">
          到期时间
        </view>
        <view class="right">
          {{data.finishValueDate||0}}
        </view>
      </view>
      <view class="row p-30">
        <view class="left">
        违约金(USDT)
        </view>
        <view class="right">
          {{data.penalPrice|| '-'}}
        </view>
      </view>
      <view class="row p-30">
        <view class="left">
          赎回本金
        </view>
        <view class="right">
          {{ (data.price - data.penalPrice) - data.penalPrice || 0}}
        </view>
      </view>
      <view class="row p-30">
        <view class="left">
        订单编号
        </view>
        <view class="right">
          {{data.orderNumber|| 0 }}
        </view>
      </view>
      <view class="row p-30">
        <view class="left">
          订单时间
        </view>
        <view class="right">
          {{data.createTime || '-'}}
        </view>
      </view>
      <button class="buy-btn" type="primary" @click="toBuyHandler()">我要赎回</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      data: {}, //传过来的数据
    }
  },
  onLoad (obj) {
    this.data = JSON.parse(obj.data) || {};
    this.data.createTime = new Date(this.data.createTime).toISOString().slice(0, 10);
    this.data.updateTime = new Date(this.data.updateTime).toISOString().slice(0, 10);
    this.data.valueDate = new Date(this.data.valueDate).toISOString().slice(0, 10);

  },
  computed: {
  },
  methods: {
    //确认购买
    toBuyHandler(){
      console.info("🇨🇳🇨🇳:ll --", this.data.id)
      let obj = {
        id:this.data.id
      }
      this.$u.api.fundFinancing.setFundOrderRedeem(obj).then(res=>{
        this.$utils.showToast('赎回成功')
        if(res.status==='SUCCEED'){
          uni.navigateTo({
            url:'/pages/fund/assets'
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
.page{
  .container{
    padding: 30rpx;

    .title{
      font-size: 32rpx;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;

    }

    .input-container{
      margin-top: 50rpx;
      font-size: 52rpx;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;

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
