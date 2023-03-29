
//成功购买
<template>
  <div class="container">
    <xl-header title=""></xl-header>
    <div class="success-box">
      <div class="icon-box">
        <img src="../image/1.png" alt="Success Icon" />
      </div>
      <h2>{{i18n.goumaichenggong}}</h2>
      <p>{{i18n.jrqkhdsyfc}}</p>
    </div>
    <div class="button-box">
<!--      <button @click="viewOrder">查看订单</button>-->
      <button @click="returnToTrading">{{i18n.fhjy}}</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    i18n () {
      return this.$t('financialManagement')
    }
  },
  methods: {
    viewOrder() {
      // TODO: 跳转到查看订单页面
    },
    returnToTrading() {
      // TODO: 返回到交易页面
      uni.navigateTo({
        url:'/pages/fund/index',
      })
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* 将设计稿宽度设为 750rpx */
.success-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64rpx;
  background-color: #f5f5f5;
  border-radius: 32rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}

.icon-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128rpx;
  height: 128rpx;
  border-radius: 64rpx;
  background-color: #00c853;
  margin-bottom: 32rpx;
}

.icon-box img {
  width: 64rpx;
  height: 64rpx;
  color: white;
}

/* 将设计稿宽度设为 750rpx */
.button-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 64rpx;
}

button {
  margin: 0 32rpx;
  padding: 48rpx 96rpx;
  border-radius: 16rpx;
  background-color: #00c853;
  color: white;
  font-size: 32rpx;
  cursor: pointer;
}
</style>