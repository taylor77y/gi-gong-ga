<template>
  <view class="page flex-col">
    <image
	  @click="cancel()"
      class="icon_1"
      referrerpolicy="no-referrer"
      src="/static/lanhu_denglu/psht05ne0tptggl0vjpct7gvpqmqj6zqxrk6770d574-f47f-4d3c-9830-1bea20947b10.png"
    />
    <text class="text_1">{{i18n.badl}}</text>
	<view class="login-tab">
	<view style="background: #f5f5f5" class="textColor1" onclick="javascript:document.getElementsByClassName('textColor1')[0].style.background= '#f5f5f5';document.getElementsByClassName('textColor1')[1].style.background= '';document.getElementsByClassName('textColor1')[2].style.background= ''" @click="test(0)">{{i18n.zh}}</view>
	<view class="textColor1" onclick="javascript:document.getElementsByClassName('textColor1')[1].style.background= '#f5f5f5';document.getElementsByClassName('textColor1')[0].style.background= '';document.getElementsByClassName('textColor1')[2].style.background= ''" @click="test(1)">{{i18n.yx}}</view>
	<view class="textColor1" onclick="javascript:document.getElementsByClassName('textColor1')[2].style.background= '#f5f5f5';document.getElementsByClassName('textColor1')[0].style.background= '';document.getElementsByClassName('textColor1')[1].style.background= ''" @click="test(2)">{{i18n.sjh}}</view>
	</view>
    <!-- <text class="text_2" v-text="loginTypeText"></text> -->
	<!-- <view class="login-input" :class="{'f-border': verificationCode}">
		<view @click="getAreaCode()" v-if="!emailCode">
		 
		 <text class="">+{{ countryCode }}</text>
		 <image
		   referrerpolicy="no-referrer"
		   src="/static/lanhu_denglu/ps04twdt13087chpihojawqbuipb5dvmfz1068353f9-a9e8-4434-9048-6cb91bdf69d9.png"
		 />
		 </view>
		 <input :placeholder="i18n.qsryxsjh" placeholder-style="color: #999" v-model="userName" class="f-input"/>
		 
	</view>
    <text class="text_5" v-if="verificationCode">{{i18n.wzdbazh}}</text>
    <button class="button_1 f-flex-center flex-col" @click="nextStep()">
      <text class="text_6">{{i18n.xyb}}</text>
    </button> -->
	<view  style="height: 200%;">
	<text class="text_2" v-text="loginTypeText"></text>
	<view v-if="!showPhone" class="login-input" :class="{'f-border': verificationCode}">
		
		 <input :placeholder="inputTag" placeholder-style="color: #999;font-size: 32rpx" v-model="userName" class="inputCum"/>
	</view>
	
	<view v-else class="login-input" :class="{'f-border': verificationCode}">
		<view @click="getAreaCode()" v-if="!emailCode">
		 
		 <text class="">+{{ countryCode }}</text>
		 <image
		   referrerpolicy="no-referrer"
		   src="/static/lanhu_denglu/ps04twdt13087chpihojawqbuipb5dvmfz1068353f9-a9e8-4434-9048-6cb91bdf69d9.png"
		 />
		 </view>
		 <input :placeholder="inputTag" placeholder-style="color: #999;font-size: 32rpx" v-model="userName" class="inputCum"/>
	</view>
	
	<text class="text_2" v-text="i18n.mm"></text>
	<view class="login-input" :class="{'f-border': verificationCode}">
		
		 <input :placeholder="i18n.qsrmm" placeholder-style="color: #999;font-size: 32rpx" type="password" v-model="password" class="inputCum"/>
	</view>
	<view @click="getPath(2)" class="wjmm">{{i18n.wjmm}}</view>
	<button style="background: #2c78ff;" class="button_1 f-flex-center flex-col" @click="nextStep()">
	  <text style="color: #f5f5f5;" class="text_6">{{i18n.dl}}</text>
	</button>
	
	<view style="margin-top: 5%;margin-left: 5%;"  >
	<text >{{i18n.hmyzh}}</text>
	<text  @click="getPath(1)" style="color: #2c78f8;"> {{i18n.cjygbazh}}</text>
	</view>
	
	
	</view>
	
<!--    <image
      class="image_1"
      referrerpolicy="no-referrer"
      src="/static/lanhu_denglu/psnfqsm0fdtwwg8jiqrldqltzbi1pje2532456e3-3832-41a9-858f-25ef095cd967.png" -->
    />
   <!-- <button class="button_2 flex-col" @click="onClick_2">
      <view class="image-text_1 flex-row justify-between">
        <image
          class="label_1"
          referrerpolicy="no-referrer"
          src="/static/lanhu_denglu/psyctf1zbje21yzzf5s14l2zk88qnnzgen95ebccf2-00e9-4b0b-a585-9ef7485ad7c0.png"
        />
        <text class="text-group_1">通过Google继续</text>
      </view>
    </button>
    <button class="button_3 flex-col" @click="onClick_3">
      <image
        class="icon_3"
        referrerpolicy="no-referrer"
        src="/static/lanhu_denglu/ps86urj9cg9j6wooljvz84fbave115ipe30a78ceb-f738-48f7-9864-25685405c0c4.png"
      />
      <text class="text_7">通过Apple继续</text>
    </button> -->
    <!-- <text class="text_8" @click="getPath()">
	{{i18n.cjygbazh}}
	<text style="margin-left: auto">忘记密码</text>
	</text> -->
	<!-- <view class="text_8"> -->
	  <!-- <text @click="getPath(1)"> {{i18n.cjygbazh}}</text> -->
	   <!-- <text style="margin-left: auto" @click="getPath(2)">{{ $t('common').forgetPassword }}</text> -->
	<!-- </view> -->
    <!-- <text class="text_9">或者</text> -->
  </view>
</template>
<script>
import md5Libs from "uview-ui/libs/function/md5";
export default {
  data() {
    return {
	   userName: '',
       verificationCode: false,
	   emailCode: false ,// false 手机号 true 邮箱
	   loginType: 'account',
	   loginTypeText: '',
	   inputTag: '',
	   showPhone: false,
	   password: '',
	   
    };
  },
  watch: {
	userName() {
		this.$u.throttle(async () => {
			if (this.$utils.testEmail(this.userName)) {
				this.emailCode = false
			} else {
				this.emailCode = true
			}
		}, 50)
	}  
  },
  onLoad() {
	  uni.removeStorage({
	  	key: 'jump'
	  })
	  this.loginTypeText=this.$t("member").zh
	  this.inputTag=this.$t("member").qsrzh
	  
  },
  computed: {
	  i18n() {
	  	return this.$t("member")
	  },
     countryCode() {
     	return this.$store.state.countryCode || 86;
     }
  },
  methods: {
	  test(val){
		  this.userName=''
		  this.password=''
		  if(val==0){
			  this.loginTypeText=this.$t("member").zh
			  this.inputTag=this.$t("member").qsrzh
			  this.showPhone=false
			  this.loginType='account'
		  }else if(val==1){
			  this.loginTypeText=this.$t("member").yx
			  this.inputTag=this.$t("member").qsryx
			  this.showPhone=false
			  this.loginType='eamil'
		  }else{
			  this.loginTypeText=this.$t("member").sjh			  
			  this.inputTag=this.$t("member").qsrsjhhyx
			  this.showPhone=true
				this.loginType='phone'
		  }
		  
		  
	  },
	// 选择区号
	getAreaCode() {
		uni.navigateTo({
			url: `/pages/login/area-code`
		})	
	},
	getPath(index) {
		if (index === 1) {
			uni.navigateTo({
				url: `/pages/login/register`
			})
		} else {
			uni.navigateTo({
				url: `/pages/login/reset-pass`
			})
		}
	  	
	},
	cancel() {
		this.$store.commit('setTabarCode', 0)
		uni.navigateTo({
			url: `/pages/index/index`
		})
	},
    // nextStep() {
	   // const { userName } = this
	   // if (!userName) {
		  //  this.$utils.showToast(this.i18n.kigsdas)
		  //  return 
	   // }
	   // uni.navigateTo({
	   // 	  url: `/pages/login/welcome?userName=${userName}`
	   // })
    // },
	nextStep() {	
		const temp = {
			phMail:this.userName,
			// password: md5Libs.md5(this.password),
			password:this.password,
			areaCode: this.countryCode,
			type: this.loginType
		}
		
		this.$u.api.user.login(temp).then(res => {
			
			if(res.status == "SUCCEED"){
				console.log("登录结果",res.status)
				// if (this.socket.connState === 2) {
				// 	this.socket.destroy()
				// }
				console.log("登录结果222")
				if (uni.getStorageSync('testId')) {
					const testid = uni.getStorageSync('testId')
					console.log('我触发了！')
					uni.setStorageSync('testId', testid)
				}
				console.log("登录结果333")
				this.$utils.showToast(this.i18n.dlcg)
				uni.setStorageSync('userId',res.result.id)
				//保存token至缓存
				uni.setStorageSync('token',res.result.token)
				setTimeout(() => {
					uni.navigateTo({
						url: `/pages/index/index`
					})
				}, 1200)
				console.log("登录结果")
			} else {
				this.$utils.showToast(res.errorMessage)
			}
		})
    }
  }
};
</script>
<style lang='scss'>
@import '@/common/common.scss';
@import './assets/1.scss';
</style>
<style lang='scss' scoped>
	.wjmm{
		font-size: 0.5rem;
    line-height: 1.75rem;
    margin-top: 1.125rem;
	margin-left: 5%;
	color: #2c78f8;
	
	}
	.btnview{
		/* height: 1.5rem; */
		    margin-top: 1.125rem;
		    padding: 0 1.375rem;
		    display: flex;
		    justify-content: space-between;
		    align-items: center;
		    border-radius: .375rem;
			background: #f5f5f5;
			color: #333;
			font-size: 0.625rem;
	}
	.inputCum{
		    flex: 1;
		    height: 20px;
		    border: none;
		    padding-left: 1.25rem;
		    color: #333;
			background: #f5f5f5;
			//font: inherit;
			/* background-color: rgb(232, 240, 254) !important; */
			    /* background-image: none !important; */
			    color: -internal-light-dark-color(black, white) !important;
				-webkit-writing-mode: horizontal-tb !important;
				    text-rendering: auto;
				    color: -internal-light-dark-color(black, white);
				    letter-spacing: normal;
				    word-spacing: normal;
				    text-transform: none;
				    text-indent: 0px;
				    text-shadow: none;
				    display: inline-block;
				    text-align: start;
				    -webkit-appearance: textfield;
				    background-color: -internal-light-dark-color(white, black);
				    -webkit-rtl-ordering: logical;
				    cursor: text;
	}
	.login-tab{
		/* margin-bottom: 2.5rem; */
		display: flex;
		margin-bottom: 10%;
	}
	.textColor1{
		/* background: #f5f5f5; */
		color: #333;
		margin-top: 5%;
		    padding: 0 1.3rem;
		    height: 2.25rem;
		    line-height: 2.25rem;
		    text-align: center;
		    border-radius: .2rem;
		    /* margin-right: 0.05rem; */
		
			color: #868c9a;
	}
.f-border {
	border: 1px solid rgba(161, 45, 62, 1);
}
.login-input {
	height: 3%;
	background: #F6F6F6;
	border-radius: 10rpx;
	padding: 12rpx 21rpx;
	display: flex;
	align-items: center;
	margin: 10rpx 24rpx;
	font-size: 12rpx;
	color: #000;
	font-weight: 600;
	image {
		width: 23rpx;
		height: 4rpx;
		margin-left: 20rpx;
	}
	.f-input {
		width: 76%;
		height: 20%;
		margin-left: 30rpx;
	}
}
</style>