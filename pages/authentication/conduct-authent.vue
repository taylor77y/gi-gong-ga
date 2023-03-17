<template>
  <view class="page flex-col">
    <view class="section_1 flex-col">
      <image
	  @click="cancel()"
        class="icon_1"
        referrerpolicy="no-referrer"
        src="/static/lanhu_jinxingrenzheng_1/ps0insiw6usc8fqkjob922htwmmpwaegfg60ff12c9-69d0-44b9-b87a-6a2de297fa30.png"
      />
      <text class="text_1">{{i18n.jxrz}}</text>
      <text class="text_2">{{i18n.xzjzdcz}}</text>
  <!--    <text class="text_3">居住信息</text>
      <view class="section_2 flex-row">
        <view class="group_1 flex-col"></view>
        <text class="text_4">中国</text>
        <image
          class="icon_2"
          referrerpolicy="no-referrer"
          src="/static/lanhu_jinxingrenzheng_1/psn4yggwbpsbra6yieo91coflzcncxrvbve051b0fba-ef3a-485c-bc04-a9556ce183f5.png"
        />
      </view> -->
      <view class="text-wrapper_1">
        <view class="text_5">{{i18n.cqgc}}</view>
        <text class="text_6">7</text>
        <text class="text_7">{{i18n.fz}}</text>
      </view>
      <view class="image-text_5 flex-row justify-between">
        <image
          class="icon_3"
          referrerpolicy="no-referrer"
          src="/static/lanhu_jinxingrenzheng_1/pso3tgmrvt1us7qau6trqh7oa4fwks0nta3c0ca25-3c52-4e62-abdb-9f5a4a884974.png"
        />
        <text class="text-group_1">{{i18n.grxx}}</text>
      </view>
      <view class="image-text_6 flex-row justify-between">
        <image
          class="icon_4"
          referrerpolicy="no-referrer"
          src="/static/lanhu_jinxingrenzheng_1/ps6h7ec4wcykrw9syxkjx99lo7q8ghxwbk6fa3975b-2f27-4490-9bed-bbee193ed36b.png"
        />
        <text class="text-group_2">{{i18n.zffxsfz}}</text>
      </view>
      <!-- <view class="image-text_7 flex-row justify-between">
        <image
          class="icon_5"
          referrerpolicy="no-referrer"
          src="/static/lanhu_jinxingrenzheng_1/psi4v85cvcgg51otbwmoxr6fj4l9v99rd9e5322bd8-1ff4-49c5-a90c-e39fec5659cd.png"
        />
        <text class="text-group_3">{{i18n.rlsb}}</text>
      </view> -->
      <text class="text_8">{{i18n.zd}}</text>
      <view class="image-text_8 flex-row justify-between">
        <image
          class="icon_6"
          referrerpolicy="no-referrer"
          src="/static/lanhu_jinxingrenzheng_1/psjte300f8siesfj7pf06k31e2fxtysxfm50af0408-02bb-4f7a-85ff-95eee4f4b85c.png"
        />
        <text class="text-group_4">{{i18n.rhwcsfrz}}</text>
      </view>
      <button class="button_1 flex-col" @click="onClick_1">
        <text class="text_9">{{i18n.jx}}</text>
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
	cancel() {
	   uni.navigateTo({
	   	url: `/pages/market/market`
	   })
	},  
    onClick_1() {
      uni.navigateTo({
      	  url: `/pages/authentication/file-authent`
      })
    }
  }
};
</script>
<style lang='scss'>
@import '@/common/common.scss';
@import './assets/2.scss';
</style>
