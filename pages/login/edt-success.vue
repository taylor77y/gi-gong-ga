<template>
  <view class="page flex-col">
    <view class="block_1 f-flex-center">
      <!-- <image
        class="icon_1"
        referrerpolicy="no-referrer"
        src="/static/lanhu_renlianxinxirenzhengchenggong/psghfbbibly5fh02iyxu34s9jftdtm40nr37ef7419-3b56-4e43-9c1e-01c931bc1663.png"
      /> -->
      <text class="text_1">认证</text>
    </view>
    <image
      class="icon_2"
      referrerpolicy="no-referrer"
      src="/static/lanhu_renlianxinxirenzhengchenggong/pso4p5mhjl7ddj7nh3i9ylsjxq4vqvb9r325cf46cf-ea6f-4122-a12a-42ea0f67d25d.png"
    />
    <text class="text_2">验证成功</text>
    <button class="button_1 flex-col" @click="getPath()">
      <text class="text_3">关闭</text>
    </button>
  </view>
</template>
<script>
export default {
  data() {
    return {
      constants: {}
    };
  },
  methods: {
    getPath() {
      uni.navigateTo({
      	url: `/pages/login/login`
      })
    }
  }
};
</script>
<style lang='scss'>
@import '@/common/common.scss';
@import './assets/8.scss';
</style>
