//理财列表
<template>
  <div class="financial-products-list">
    <div v-for="product in products" :key="product.id" class="financial-product">
      <div class="left-container">
        <img :src="product.image" alt="Product Image" class="product-image">
        <div class="product-info">
          <div class="product-title">{{ product.title }}</div>
          <div class="product-details">{{ product.quantity }} | {{ product.cycle }}</div>
        </div>
      </div>
      <div class="right-container">
        <div class="product-price">{{ product.price }}</div>
        <div class="product-earnings">{{ product.earnings }}</div>
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
    return {
      // products: [
      //   {
      //     title: '我',
      //     quantity: 'Ni ',
      //     cycle: 'h哈哈哈',
      //     image: 'http://192.168.2.7:8741/fund_product/setFundOrderPurchasehttp://192.168.2.7:8741/fund_product/setFundOrderPurchase',
      //     price: 200,
      //     earnings: '三天'
      //   },
      //   {
      //     title: '我',
      //     quantity: 'Ni ',
      //     cycle: 'h哈哈哈',
      //     image: 'http://192.168.2.7:8741/fund_product/setFundOrderPurchasehttp://192.168.2.7:8741/fund_product/setFundOrderPurchase',
      //     price: 200,
      //     earnings: '三天'
      //   },
      //   {
      //     title: '我',
      //     quantity: 'Ni ',
      //     cycle: 'h哈哈哈',
      //     image: 'http://192.168.2.7:8741/fund_product/setFundOrderPurchasehttp://192.168.2.7:8741/fund_product/setFundOrderPurchase',
      //     price: 200,
      //     earnings: '三天'
      //   },
      // ],
    }
  }
}
</script>

<style scoped>
.financial-products-list {
  display: flex;
  flex-wrap: wrap;
}

.financial-product {
  width: 100%;
  height: 200 rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10 rpx;
  border-bottom: 1px solid #ddd;
}

.left-container {
  display: flex;
  align-items: center;
}

.product-image {
  width: 80 rpx;
  height: 80 rpx;
  margin-right: 10 rpx;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-title {
  font-weight: bold;
}

.right-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.product-price {
  font-size: 24 rpx;
  color: #f00;
}

.product-earnings {
  margin-top: 10 rpx;
}
</style>
