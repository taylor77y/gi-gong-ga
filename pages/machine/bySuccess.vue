
//成功购买
<template>
  <div class="container">
    <div class="success-box">
      <div class="icon-box">
        <img src="../fund/image/1.png" alt="Success Icon" />
      </div>
      <h2>购买成功</h2>
      <p>即日起可获得收益分成！</p>
    </div>
    <div class="button-box">
<!--      <button @click="viewOrder">查看订单</button>-->
	  <button type="primary" class="btn" @tap.stop="rePoolPage()">返回矿池</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    viewOrder() {
      // TODO: 跳转到查看订单页面
    },
    rePoolPage() {
      // TODO: 返回到交易页面
      uni.navigateTo({
        url:'/pages/machine/index',
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
  height: 36rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>