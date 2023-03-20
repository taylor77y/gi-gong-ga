<template>
  <view class="gooleVerifyBox">
    <view class="gooleVerifyPage flex-col">
      <view class="image-wrapper_1 flex-row justify-between">
        <image @click="back()" class="icon_1" referrerpolicy="no-referrer"
               src="/static/lanhu_zhuce2/psp7pfts61abml9bqfww31ud54m8lwlnff9c1d27e1-8110-48ab-824d-24b76b7c6231.png" />
<!--        <image @click="cancel()" class="icon_2" referrerpolicy="no-referrer"-->
<!--               src="/static/lanhu_zhuce2/ps8mi28hn9gmamrpujbfjv4cag6du5nsr5eeb254688-0329-4f0a-8853-62ee62fc9a19.png" />-->
        <text @click="cancel()">跳过</text>
      </view>
    </view>

    <!-- 步骤条 -->
    <view class="gooleverifyStep">
      <u-steps :list="numList" :current="2" mode="number" active-color="#00EE76"></u-steps>
    </view>
    <!-- 创建个人用户 -->
    <view class="text">
      <text class="text_1">{{i18n.aqbd}}</text>
    </view>

    <vie class="qrCode">
      <view class="imageBox">
<!--       <view class="image">二维码</view>-->
        <image @click="cancel()" class="image" referrerpolicy="no-referrer"  :src="src" />
      </view>
    </vie>

    <!--地址 备注-->
    <view class="remarks">
      <view class="address">
        <text style="margin-right: 15rpx" >2NXQFTOOWPTFWO5B</text>
        <u-icon name="reload" @click="cancel()"></u-icon>
      </view>
      <view class="remarks">
        <text>（请妥善备份密钥以防丟失）</text>
      </view>
    </view>
<!--    复制-->
    <view style="padding: 20px;">
      <u-button type="primary" :plain="true" :hairline="true"  @click="">复制</u-button>
    </view>

    <view class="verificationCode">
      <view class="verificationCodeTextBxo">
          <view style="margin-left: 10rpx">
              谷歌验证码
          </view>
        <view class="btn">
          <a href="#" style=" color: #4D7CF5; margin-right: 10rpx; text-decoration : none">清除</a>
          <a href="#" style="color: #4D7CF5;  text-decoration : none" >粘贴</a>
        </view>
      </view>
	  <view>
	  		<u-message-input :maxlength="6" :focus="true" :breathe="false" :dot-fill="true" ref="inputmsg"></u-message-input>
	  </view>
    </view>

    <view class="mattersNeedingAttentionBox mg30">
      <view class="mattersNeedingAttention">
        <text>注意事项</text>
      </view>
      <view class="mattersNeedingAttention">
        <text>1.下載Google身份验证器APP</text>
      </view>
      <view class="mattersNeedingAttention">
        <text>2.扫描上图二维码输入验证码完成有定</text>
      </view>
    </view>
	<view class="item mt-50 mg30">
		<u-button type="primary" @click="nextup">确认</u-button>
	</view>
  </view>
</template>

<script>
  export default {
    //name:'gooleVerify',
    props: {},
    data() {
      return {
        // src: 'https://cdn.uviewui.com/uview/album/1.jpg',
        src: 'data:image/png;base64,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',
        numList: [{
          name: this.$t('member').zhzc
        }, {
          name: this.$t('member').smrz
        }, {
          name: this.$t('member').aqbd
        }, {
          name: this.$t('member').qjy
        }, ],
		//ggnum:'',
      }
    },
    created() { },
    mounted() { },
    computed:{
      i18n() {
        return this.$t("member")
      },
    },
    methods: {
	  nextup(){
		  if(this.$refs.inputmsg.valueModel.length != 6){
			uni.showToast({
				icon:'none',
				title: '请输入验证码',
			});
			return ;  
		  }
		  this.$u.api.user.checkSmsCode(phMail,code,type).then(res=>{
			  console.log(res);
		  })
		  uni.navigateTo({
		  	url:'/pages/login/finish'
		  })
	  },
      back() {
        uni.navigateBack(1)
      },
      cancel() {
        uni.navigateTo({
          url:'/pages/login/finish'
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
@import '@/common/common.scss';
@import './assets/3.scss';
  .gooleVerifyBox {
    .gooleVerifyPage {
      background-color: rgba(255, 255, 255, 1);
      position: relative;
      width: 750rpx;
      overflow: hidden;
      margin-bottom: 100rpx;
      .image-wrapper_1 {
        width: 656rpx;
        height: 31rpx;
        margin: 67rpx 0 0 46rpx;
        .icon_1 {
          width: 45rpx;
          height: 31rpx;
        }
        .icon_2 {
          width: 30rpx;
          height: 30rpx;
        }
      }
    }
    width: 100%;
    height: 100%;
      .gooleverifyBack {
        display: flex;
        flex-direction: column;
      }
    .gooleverifyStep {
      margin-top: 100rpx;
    }

    .text{
      margin-top: 60rpx;
      .text_1 {
        width: 305rpx;
        //height: 49rpx;
        overflow-wrap: break-word;
        color: rgba(0, 0, 0, 1);
        font-size: 44rpx;
        font-family: PingFang-SC-Bold;
        font-weight: 700;
        text-align: left;
        white-space: nowrap;
        line-height: 41rpx;
        margin: 68rpx 0 0 48rpx;
      }
    }

    .qrCode{
      width: 100%;
      //height: 350rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      .imageBox {
        .image {
          width: 280rpx;
          height: 280rpx;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .remarks {
      .address{
        display: flex;
        justify-content: center;
        color: #9A9999;
      }
      .remarks {
        margin-top: 10rpx;
        display: flex;
        justify-content: center;
        color: #9A9999;
      }
    }

    .verificationCode {
      margin: 10rpx;
      .verificationCodeTextBxo {
        display: flex;
        justify-content: space-between;

        .btn {
          display: flex;
        }
      }
    }
    .mattersNeedingAttentionBox {
      padding-top: 5rpx;
      background-color: #F5F5F5;
       height: 220rpx;
      .mattersNeedingAttention {
        font-size: 24rpx;
        margin: 30rpx;
      }
    }
  }
  .mg30{
	  margin: 0 30rpx;
  }
</style>