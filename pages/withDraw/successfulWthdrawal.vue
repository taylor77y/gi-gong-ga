<template>
  <view class="page flex-col">
    <view class="box_1 flex-col">
      <image
          @click="onClick_1"
          class="icon_1"
          referrerpolicy="no-referrer"
          src="/static/lanhu_renzhengwancheng/pseocvqfk05crrcgimaqscledjzj99br8rfe8d67cf-3f2f-433c-94a5-572bcb24be18.png"
      />
      <view class="icon_2">
        <image

            referrerpolicy="no-referrer"
            src="/static/lanhu_renzhengwancheng/psuhwo9kr9v6kbz00u9rt0eo04c5f70eni7c7cd32a-6d85-456c-8ce9-e77720c8a515.png"
        />
      </view>
      <view class="text_1">{{i18n.tjshcg}}</view>
      <button class="button_1 flex-col" @click="onClick_1">
        <text class="text_2">{{i18n.jx}}</text>
      </button>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      constants: {}
    };
  },
  computed:{
    i18n() {
      return this.$t("ident")
    }
  },
  methods: {
    onClick_1() {
      uni.navigateTo({
        url: `/pages/fund/assets`
      })
    }
  }
};
</script>
<style lang='scss'>
@import '@/common/common.scss';
@import './assets/7.scss';
.page {
  background-color: rgba(255, 255, 255, 1);
  position: relative;
  width: 750rpx;
  height: 100vh;
  overflow: hidden;
  .box_1 {
    background-color: rgba(31, 34, 41, 1);
    width: 750rpx;
    height: 100vh;
    .icon_1 {
      width: 30rpx;
      height: 30rpx;
      margin: 71rpx 0 0 696rpx;
    }
    .icon_2 {

      margin: 206rpx 0 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      & image {
        width: 245rpx;
        height: 234rpx;
      }

    }
    .text_1 {
      // width: 308rpx;
      height: 25rpx;
      overflow-wrap: break-word;
      color: rgba(255, 255, 255, 1);
      font-size: 26rpx;
      font-family: PingFang-SC-Light;
      font-weight: 300;
      text-align: center;
      white-space: nowrap;
      line-height: 41rpx;
      margin: 93rpx 0;
    }
    .button_1 {
      background-color: rgba(245, 213, 90, 1);
      border-radius: 3px;
      height: 75rpx;
      width: 702rpx;
      margin: 415rpx 0 185rpx 24rpx;
      .text_2 {
        overflow-wrap: break-word;
        color: rgba(0, 0, 0, 1);
        font-size: 28rpx;
        font-family: PingFang-SC-Heavy;
        font-weight: 900;
        white-space: nowrap;
        text-align: center      }
    }
  }
}


</style>
