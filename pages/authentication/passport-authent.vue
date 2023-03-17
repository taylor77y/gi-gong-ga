<template>
  <view class="page flex-col">
    <view class="box_1 flex-col">
      <view class="nav-bar_2 flex-row">
        <image
          class="icon_1"
          referrerpolicy="no-referrer"
          src="/static/lanhu_huzhaorenzheng/ps70vik1xby59l08gqn7we16gd1432h9oy6e1f3d84-e04f-44e0-b1a0-4a4de7838cab.png"
        />
        <image
          class="icon_2"
          referrerpolicy="no-referrer"
          src="/static/lanhu_huzhaorenzheng/psrt5u7tfqevgfof0csbuwxwrng18ud95uh676b0fef-72ff-4a7f-8c1e-cf3044dab770.png"
        />
      </view>
      <text class="text_1">文件验证</text>
      <text class="text_2">拍摄个人护照照片</text>
      <image
        class="image_2"
        referrerpolicy="no-referrer"
        src="/static/lanhu_huzhaorenzheng/pstzy0u23dssqf92nmtkglbjhd8e7iosieaddbd9a-a8fd-4399-8c12-1e422848bc23.png"
      />
      <view class="image-text_2 flex-row justify-between">
        <image
          class="image_3"
          referrerpolicy="no-referrer"
          src="/static/lanhu_huzhaorenzheng/psmmzwkp1ggmdhqtkc40db39asp0z1tuvs5cca46995-b07d-4a7d-87e3-ae03ee1b4bc7.png"
        />
        <text class="text-group_1">
          证件未过期
          <br />
          这是原始文档，而非扫描件或副本
          <br />
          请取下卡夹或卡盖，避免反向或模糊
          <br />
          请将证件置于纯色背景中。
        </text>
      </view>
      <button class="button_1 flex-col" @click="onClick_1">
        <text class="text_3">继续</text>
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
  methods: {
    onClick_1() {
      alert(1);
    }
  }
};
</script>
<style lang='scss'>
@import '@/common/common.scss';
@import './assets/6.scss';
</style>
