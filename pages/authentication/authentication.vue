<template>
  <view class="page flex-col">
    <view class="block_1 flex-row">
      <view class="box_2 flex-col">
        <view class="image-wrapper_2 flex-row justify-between">
          <image
            class="image_2"
            referrerpolicy="no-referrer"
            src="/static/lanhu_renzheng/ps35xgz8yq44x2fqhmd085wc6bsuf0lkt6ibb87a603-54d4-4825-a37e-2ed39afa62fa.png"
          />
          <image
		    @click="cancel()"
            class="icon_1"
            referrerpolicy="no-referrer"
            src="/static/lanhu_renzheng/ps8mmu5r47dixdau2wfwpzgfbcantyppscue7bd0c8c-1bea-4fa4-abf6-aee8044dcbeb.png"
          />
        </view>
      </view>
      <view class="text-wrapper_1 flex-col">
        <text class="text_1">{{i18n.zhycj}}</text>
        <text class="text_2">{{i18n.yzsfxsba}}</text>
      </view>
      <view class="box_1 flex-col">
        <view class="list_2 flex-col">
          <view
            class="list-items_1 flex-row"
            v-for="(item, index) in loopData0"
            :key="index"
          >
            <image
              class="image_3"
              referrerpolicy="no-referrer"
              :src="item.lanhuimage0"
            />
            <view class="text-group_2 flex-col justify-between">
              <text class="text_3" v-html="i18n.zhycj"></text>
              <text class="text_4" v-html="i18n.yzsfxsba"></text>
            </view>
          </view>
        </view>
        <button class="button_1 flex-col" @click="onClick_1">
          <text class="text_5">{{i18n.qrz}}</text>
        </button>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      loopData0: [
        {
          lanhuimage0:
            'https://lanhu.oss-cn-beijing.aliyuncs.com/psog1a76nhxce93jpyc5vl90l36c30zy3d7b99804a-e654-4a10-8213-4384fb3e308e',
          lanhutext0: '账户已创建',
          lanhutext1: '验证身份，即享MXO之旅'
        },
        {
          lanhuimage0:
            'https://lanhu.oss-cn-beijing.aliyuncs.com/psgjpyjk10q3oi9u7uz510zc39f6whlfxf7885fe0-3e8f-472a-b7e0-42e34adeecfd',
          lanhutext0: '账户已创建',
          lanhutext1: '验证身份，即享MXO之旅'
        }
      ],
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
	   uni.navigateBack(1)	
	},
	  // 去认证
    onClick_1() {
       // uni.navigateTo({
       // 	  url: `/pages/authentication/file-authent`
       // })
	   uni.navigateTo({
	   	  url: `/pages/authentication/conduct-authent`
	   })
    }
  }
};
</script>
<style lang='scss'>
@import '@/common/common.scss';
@import './assets/1.scss';
</style>
