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
      	url: `/pages/market/market`
      })
    }
  }
};
</script>
<style lang='scss'>
@import '@/common/common.scss';
@import './assets/7.scss';
</style>
