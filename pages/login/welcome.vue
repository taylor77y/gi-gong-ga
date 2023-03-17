<template>
  <view class="page flex-col">
    <image
	  @click="cancel()"
      class="icon_1"
      referrerpolicy="no-referrer"
      src="/static/lanhu_huanyinghuilai/ps5uhm71580qx4nwie9arwd8o4y39w979xg9664acd3-645a-496a-b001-503ee39b77c0.png"
    />
    <view class="text-group_1 flex-col justify-between">
      <text class="text_1">{{i18n.hyhl}}</text>
      <text class="text_2">{{ userName }}</text>
    </view>
    <view class="group_1 flex-row justify-between">
      <text class="text_3">{{i18n.mma}}</text>
    </view>
	<view class="register-input">
		<view class="r-input">
			<input v-if="!isInput" placeholder="" type="password" v-model="userPass" class="f-input" />
			<input v-else placeholder="" v-model="userPass" class="f-input" />
		</view>
		<view class="right" v-if="!isInput" @click="getImg()">
			<image referrerpolicy="no-referrer"
				src="/static/lanhu_huanyinghuilai/psdzsjsknypnbwpokm5xkzqchx03098zjasdf39724f-08e7-43a7-8046-4d3477dafbba.png" />
		</view>
		<view class="rights" v-else @click="getImg()">
			<image referrerpolicy="no-referrer"
				src="/static/lanhu_huanyinghuilai/ps7c0qnn3n90p2so3gxv4ri6dwgv8zi639p9b843c0f-15a1-4dac-8e50-5e5d8c7fb516.png" />
		</view>
	
	</view>
    <button class="button_1 flex-col" @click="onClick_1">
      <text class="text_4">{{i18n.dl}}</text>
    </button>
    <!-- <text class="text_5" @click="forgotPassword()">忘记密码？</text> -->
  </view>
</template>
<script>
import md5Libs from "uview-ui/libs/function/md5";
export default {
  data() {
    return {
	  userPass: '',
	  isInput: false,
      userName: '',
	  socket: this.KeFusocket,
	  loginType: 'phone'
    };
  },
  onLoad(e) {
	  this.userName = e.userName || ''
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
	  // 忘记密码
	  forgotPassword() {
		  uni.navigateTo({
		  	url: `/pages/login/reset-pass`
		  })
	  },
	  getImg() {
	  	this.isInput = !this.isInput
	  },
	  cancel() {
	  	uni.navigateTo({
	  		url: `/pages/index/index`
	  	})
	  },
	onClick_1() {	
		const temp = {
			phMail:this.userName,
			password: md5Libs.md5(this.userPass),
			areaCode: this.countryCode,
			type: this.loginType
		}
		if (!this.$utils.testEmail(this.userName)) {
			delete temp.areaCode
		}
		console.log(temp)
		this.$u.api.user.login(temp).then(res => {
			console.log("登录结果",res)
			if(res.status == "SUCCEED"){
				if (this.socket.connState === 2) {
					this.socket.destroy()
				}
				if (uni.getStorageSync('testId')) {
					const testid = uni.getStorageSync('testId')
					console.log('我触发了！')
					uni.setStorageSync('testId', testid)
				}
				this.$utils.showToast(this.i18n.dlcg)
				uni.setStorageSync('userId',res.result.id)
				//保存token至缓存
				uni.setStorageSync('token',res.result.token)
				setTimeout(() => {
					uni.reLaunch({
						url: "/pages/index/index"
					})
				}, 1200)
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
@import './assets/5.scss';
</style>
<style lang='scss' scoped>
	.register-input {
		background: #F6F6F6;
		border-radius: 10rpx;
		padding: 26rpx 29rpx;
		display: flex;
		align-items: center;
		margin: 20rpx 48rpx;
		font-size: 36rpx;
		color: #000;
		font-weight: 600;

		.register-img {
			image {
				width: 46rpx;
				height: 46rpx;
				margin-right: 20rpx;
				border-radius: 50%;
			}
		}

		image {
			width: 23rpx;
			height: 14rpx;
			margin-left: 20rpx;
		}

		.r-input {
			width: 90%;
		}

		.right {
			& image {
				width: 38rpx;
				height: 31rpx;
			}
		}
		.rights {
			& image {
				width: 39rpx;
				height: 26rpx;
			}
		}

		.f-input {
			margin-left: 30rpx;
		}
	}
</style>