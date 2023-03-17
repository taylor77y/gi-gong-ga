<template>
  <view class="page flex-col">
    <view class="box_1 flex-col">
      <view class="block_1 flex-col">
        <view class="nav-bar_1 flex-row">
          <image
		    @click="back()"
            class="icon_1"
            referrerpolicy="no-referrer"
            src="/static/lanhu_querenbeimian/ps6lof69ugrirzuveyngfhlvkpfcg4of9n14160a65-e9b9-4fd2-bb06-db9300287626.png"
          />
         <image
		    @click="cancel()"
            class="icon_2"
            referrerpolicy="no-referrer"
            src="/static/lanhu_querenzhengmian/pseuclyyn8937w42hgq6ut36ahyzrottqy953d01a3-38da-43a6-9203-a16fe239fc75.png"
          />
        </view>
        <text class="text_1">{{i18n.qrbm}}</text>
      </view>
      <view class="block_2 flex-col" @click="getUpload">
		  <image v-if="isImg" :src="isImg" mode="widthFix"></image>
		  <text v-else style="font-size: 32rpx;font-weight: 600;">{{ i18n.djsc }}</text>
	  </view>
      <view class="block_3 flex-col">
        <text class="text_2">{{i18n.addjkf}}</text>
        <text class="text_3">{{i18n.uusdas}}</text>
        <!-- <button class="button_1 flex-col" @click="onClick_1">
          <text class="text_4">重新拍照</text>
        </button> -->
        <button class="button_2 flex-col" @click="onClick_2">
          <text class="text_5">{{i18n.jx}}</text>
        </button>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      constants: {},
	  img:"",
	  poc:"",
	  isImg: ''
    };
  },
  computed:{
  	  i18n() {
  	  	return this.$t("ident")
  	  }
  },
  onLoad(e) {
	if(e && e.img){
		this.poc = e.img
	}
  },
  methods: {
	back() {
		uni.navigateBack(1)
	},
	cancel() {
		uni.navigateTo({
			url: `/pages/market/market`
		})
	},  
	getUpload() {
		uni.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			success: res => {
	
				console.log("身份反面", res)
				const tempFilePaths = res.tempFilePaths;
				this.$utils.uploadPictures(res.tempFilePaths, 'user/headers', data => {
							this.img = data.name;
							this.isImg = tempFilePaths[0]
					
				})
	
			},
		})
	},  
    onClick_1() {
      alert(1);
    },
    onClick_2() {
		if(this.img != ""){
			let data = new Object();
			data.positiveLink = this.poc;
			data.sideLink = this.img;
			uni.navigateTo({
				url: `/pages/authentication/user-authent?data=`+JSON.stringify(data)
			})
		} else {
			this.$utils.showToast(this.i18n.qsczjzp)
		}
    }
  }
};
</script>
<style lang='scss'>
@import '@/common/common.scss';
	@import './assets/9.scss';
</style>
