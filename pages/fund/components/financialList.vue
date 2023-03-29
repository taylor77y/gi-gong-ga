//理财列表
<template>
  <div class="financial-products-list">
    <div v-for="product in products" :key="product.id" class="financial-product" @click="toSell(product)">
      <div class="left-container">
        <img :src="product.fund_image" alt="Product Image" class="product-image" style="width: 80rpx;height: 80rpx;margin: 0 10 rpx;  object-fit: cover;">
        <div class="product-info">
          <div class="product-title">{{ product.name }}</div>
          <div class="product-details"><span style="color: #9A9CA9">数量</span> {{ product.price }} <span style="color: #9A9CA9">USDT</span></div>
          <div class="product-details"><span style="color: #9A9CA9">周期</span> {{ product.periodDay }} 天</div>
        </div>
      </div>
      <div class="right-container">
        <div class="product-price" style="font-size: 40rpx">{{ product.price  || 0.00}}</div>
        <div class="product-earnings">累计收益(USDT)</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'financialList',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  methods:{
    toSell(e){
      uni.navigateTo({
        url:`/pages/fund/components/financialDetails?data=${JSON.stringify(e)}`
      })
    }
  },
}
</script>

<style scoped>
.financial-products-list {
  height: 300rpx;
  margin-top: 50rpx;
  display: flex;
    flex-wrap: wrap;
}

.financial-product {
  background-color: #F6F6F6;
  width: 100%;
  height: 180rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10rpx;
  border-bottom: 1px solid #ddd;
  margin: 15rpx 10rpx;
}

.left-container {
  width: 100%;
  display: flex;
  align-items: center;
}

.product-image {
  margin: 0 10 rpx;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 10rpx;
}

.product-title {
  margin-bottom: 10rpx;
  font-weight: bold;
}

.right-container {
  display: flex;
  flex-direction: column;
}

.product-price {
  font-size: 30 rpx;
  color: #f00;
}

.product-earnings {
  margin-top: 10 rpx;
}
</style>
