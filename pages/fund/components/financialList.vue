//理财列表
<!--<template>-->
<!--  <div class="financial-products-list">-->
<!--    <div v-for="product in products" :key="product.id" class="financial-product" @click="toSell(product)">-->
<!--      <div class="left-container">-->
<!--        <img :src="product.fund_image" alt="Product Image" class="product-image" style="width: 80rpx;height: 80rpx;margin: 0 10 rpx;  object-fit: cover;">-->
<!--        <div class="product-info">-->
<!--          <div class="product-title">{{ product.name }}</div>-->
<!--          <div class="product-details"><span style="color: #9A9CA9;margin-right: 10rpx;">数量</span> {{ product.price }} <span style="margin-left: 10rpx;;color: #9A9CA9">USDT</span></div>-->
<!--          <div class="product-details"><span style="color: #9A9CA9;margin-right: 10rpx;">周期</span> {{ product.periodDay }} 天</div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="right-container">-->
<!--        <div class="product-price" style="font-size: 40rpx">{{ product.price  || 0.00}}</div>-->
<!--        <div class="product-earnings">累计收益(USDT)</div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'financialList',-->
<!--  props: {-->
<!--    products: {-->
<!--      type: Array,-->
<!--      required: true-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {}-->
<!--  },-->
<!--  methods:{-->
<!--    toSell(e){-->
<!--      uni.navigateTo({-->
<!--        url:`/pages/fund/components/financialDetails?data=${JSON.stringify(e)}`-->
<!--      })-->
<!--    }-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.financial-products-list {-->
<!--  height: 300rpx;-->
<!--  margin-top: 50rpx;-->
<!--  display: flex;-->
<!--    flex-wrap: wrap;-->
<!--}-->

<!--.financial-product {-->
<!--  background-color: #F6F6F6;-->
<!--  width: 100%;-->
<!--  height: 180rpx;-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  padding: 10rpx;-->
<!--  border-bottom: 1px solid #ddd;-->
<!--  margin: 15rpx 10rpx;-->
<!--}-->

<!--.left-container {-->
<!--  width: 100%;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--.product-image {-->
<!--  margin: 0 10 rpx;-->
<!--  object-fit: cover;-->
<!--}-->

<!--.product-info {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  justify-content: center;-->
<!--  margin: 0 10rpx;-->
<!--}-->

<!--.product-title {-->
<!--  margin-bottom: 10rpx;-->
<!--  font-weight: bold;-->
<!--}-->

<!--.right-container {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--}-->

<!--.product-price {-->
<!--  font-size: 30 rpx;-->
<!--  color: #f00;-->
<!--}-->

<!--.product-earnings {-->
<!--  margin-top: 10 rpx;-->
<!--}-->
<!--</style>-->


<template>
  <view class="smart-pool">
    <view class="item" v-for="(item,index) in list" :key="index" @tap="toDetail(item)">
      <image v-if="item.fund_image" :src="item.fund_image" class="icon"></image>
      <image v-else src="../../../static/img/2.png" class="icon"></image>
      <view class="content">
        <view class="title">{{ item.name }}</view>
        <view class="number">
          数量 <text class="text">{{item.price}} </text>USDT
        </view>
        <view class="period">
          周期 <text class="text">{{item.periodDay}}</text>
        </view>
      </view>
      <view class="income">
        <view class="left">
          <view class="number">
            {{item.accumulatedIncome}}
          </view>
          <view class="tip">
            累计收益
          </view>
          <view class="">
            (USDT)
          </view>
        </view>
        <view class="right">
          <u-icon name="arrow-right" size="20"></u-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'financialList',
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  created(){
    console.info("🇨🇳🇨🇳:wqeqwe --", this.list)
  },
  methods: {
    toDetail(e) {
      uni.navigateTo({
        url:`/pages/fund/components/financialDetails?data=${JSON.stringify(e)}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.smart-pool {
  margin-top: 40rpx;
  padding: 10rpx 0;
  padding-bottom: 100rpx;

  .item {
    margin: 20rpx 0;
    padding: 30rpx;
    background-color: #f6f6f6;
    border-radius: 10rpx;
    display: flex;

    .icon {
      width: 128rpx;
      height: 128rpx;
    }

    .content {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding-left: 20rpx;
      color: #868c9a;

      .text {
        color: #333;
        padding: 0 8rpx;
      }

      .title {
        font-size: 28rpx;
        font-weight: 600;
        color: #333;
      }

      .number {}

      .period {}
    }

    .income {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;

      .left {
        margin-right: 30rpx;
        display: flex;
        flex-direction: column;

        .number {
          font-size: 42rpx;
          color: #2ebd85;
        }

        .tip {
          margin-top: 10rpx;
        }
      }

      .right {

        color: #000;
        font-size: 30rpx;
      }
    }
  }
}
</style>