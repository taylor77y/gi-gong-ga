<template>
	<view class="page flex-col">
		<view class="image-wrapper_1 flex-row justify-between">
			<image @click="back()" class="icon_1" referrerpolicy="no-referrer"
				src="/static/lanhu_zhuce2/psp7pfts61abml9bqfww31ud54m8lwlnff9c1d27e1-8110-48ab-824d-24b76b7c6231.png" />
			<image @click="cancel()" class="icon_2" referrerpolicy="no-referrer"
				src="/static/lanhu_zhuce2/ps8mi28hn9gmamrpujbfjv4cag6du5nsr5eeb254688-0329-4f0a-8853-62ee62fc9a19.png" />
		</view>
		<!-- 步骤条 -->
		<view class="step">
			<u-steps :list="numList" :current="0" mode="number" active-color="#00EE76"></u-steps>
		</view>
		<!-- 创建个人用户 -->
		<text class="text_1">{{i18n.cjgrzh}}</text>
		<!-- 选项卡 -->
		<view class="group_1 flex-row justify-between">
			<view class="f-flex-center">
				<text @click="getChenk(index)" class="text_2" :class="{'f-bg': chenk === index}"
					v-for="(item, index) in tagBtn" :key="index">{{ item }}</text>
			</view>
		</view>
		<text class="text_4">{{i18n.gr}}{{ tagBtn[chenk] }}</text>
		<view class="register-input">
			<!-- 手机号码 -->
			<view v-if="chenk === 2" class="d-flex align-items-center">
				<!-- <view class="register-img">
				<image class="label_1" referrerpolicy="no-referrer"
					src="/static/lanhu_zhuce2/psbykg78eifnmb9de1pjy8sbqitgqvyzgu3d2d4e60-0426-45d8-95dc-ef9dce59cc35.png" />
			</view> -->

				<text class="" @click="getAreaCode()">+{{ countryCode }}</text>
				<image referrerpolicy="no-referrer"
					src="/static/lanhu_denglu/ps04twdt13087chpihojawqbuipb5dvmfz1068353f9-a9e8-4434-9048-6cb91bdf69d9.png" />
			</view>

			<u-input :placeholder="getPlaceholder[chenk]" v-model="userPhone" class="f-input" height="30" placeholder-style="color: #B0B3BA;font-size: 32rpx" />

		</view>
		<!-- 密码 -->
		<view class="common flex-row justify-between">
			<text class="text_6">{{i18n.mma}}</text>
		</view>
		<view class="register-input">
			<view class="r-input">
				<u-input v-if="!isInput" :placeholder="$t('member').qsrmm" :password-icon="false"
				 type="password" v-model="userPass" class="f-input"
				 placeholder-style="color: #B0B3BA;font-size: 32rpx"
				 height="30"
				  />
				<u-input v-else placeholder="" v-model="userPass" class="f-input" />
			</view>
			<view class="right" v-if="!isInput" @click="getImg()">
				<image referrerpolicy="no-referrer"
					src="/static/lanhu_zhuce2/psnludfthhx5r591i5piefselpogssibjgfdd84f54-6a57-4ec7-8cfa-188f91077e9f.png" />
			</view>
			<view class="rights" v-else @click="getImg()">
				<image referrerpolicy="no-referrer"
					src="/static/lanhu_zhuce2/psmj530dxyeb01sxe7y15ux6nsv9g9g39ooc04e8282-fee3-4d6e-9231-af44d41bd42d.png" />
			</view>

		</view>
		<!-- 确认密码 -->
		<view class="common flex-row justify-between">
			<text class="text_6">{{i18n.qrmm}}</text>
		</view>
		<view class="register-input">
			<view class="r-input">
				<u-input v-if="!isComfirmInput" :placeholder="$t('member').qqrmm" :password-icon="false"
				 type="password" v-model="confirmUserPass" class="f-input"
				 placeholder-style="color: #B0B3BA;font-size: 32rpx"
				 height="30"
				  />
				<u-input v-else placeholder="" v-model="confirmUserPasss" class="f-input" />
			</view>
			<view class="right" v-if="!isComfirmInput" @click="getComfirmImg()()">
				<image referrerpolicy="no-referrer"
					src="/static/lanhu_zhuce2/psnludfthhx5r591i5piefselpogssibjgfdd84f54-6a57-4ec7-8cfa-188f91077e9f.png" />
			</view>
			<view class="rights" v-else @click="getComfirmImg()">
				<image referrerpolicy="no-referrer"
					src="/static/lanhu_zhuce2/psmj530dxyeb01sxe7y15ux6nsv9g9g39ooc04e8282-fee3-4d6e-9231-af44d41bd42d.png" />
			</view>
		
		</view>
		
		<view class="common flex-row justify-between" v-if="!chenk == 0">
			<text class="text_7">{{ $t('newFy').yzm }}</text>
		</view>
		<view class="register-input" v-if="!chenk == 0">
			<view class="f-in-box">
				<u-input type="number" style="width: 200rpx;" v-model="verification"
					:placeholder="$t('common').plsInputCode" placeholder-style="color: #B0B3BA;font-size: 32rpx" />
				<view class="send-box" v-if="timeCode" @click="sendAdd()">
					{{ $t('security').fsyzm }}
				</view>
				<view class="send-box" v-else>
					<u-count-down bg-color="#F6F6F6" font-size="28" color="#D1A037" :show-days="false"
						:show-hours="false" :show-minutes="false" :timestamp="min"></u-count-down> s
				</view>
			</view>
		</view>
		<!-- <view class="common flex-row justify-between">
			<text class="text_7">{{i18n.jymma}}</text>
		</view>
		<view class="register-input">
			<view class="r-input">
				<input placeholder="" v-model="code" class="f-input" />
			</view>
		</view> -->
		<!-- <view class="image-text_1 flex-row justify-between">
			<image class="checkbox_1" referrerpolicy="no-referrer"
				src="/static/lanhu_zhuce2/psvllkh63q38wa0dgba621bzym3masywc8ef575d-89a3-49d2-ac3e-27b69c12f98d.png" />
			<view class="text-group_1">
				<text class="text_8">我已阅读并同意MXO的</text>
				<text class="text_9">服务条款</text>
				<text class="text_10">和</text>
				<text class="text_11">隐私政策</text>
				<text class="text_12">。</text>
			</view>
		</view> -->
		<view class="check">
			<u-checkbox v-model="isChecked">{{i18n.wyydbty}}<text class="link">{{i18n.fwtk}}</text></u-checkbox>
		</view>
		<button class="button_1 flex-col" @click="getPath()" style="background-color: #2979ff;">
			<text class="text_13">{{i18n.zc}}</text>
		</button>
		<view class="text-login">{{i18n.yyzh}}<text class="link">{{i18n.qdl}}</text></view>
		<!-- <view class="text-wrapper_2">
			<text class="text_14">并非想创建个人账户？</text>
			<text class="text_15"></text>
			<text class="text_16">&nbsp;注册一个企业账户</text>
		</view> -->
	</view>
</template>
<script>
	import md5Libs from "uview-ui/libs/function/md5";
	export default {
		data() {
			return {
				isInput: false,
				isComfirmInput: false,
				userPhone: '',
				userPass: '',
				confirmUserPass: '',
				isChecked: false,
				chenk: 0,
				code: '',
				verification: '',
				newTimer: null,
				min: 60,
				timeCode: true,
				verification: '',
				numList: [{
									name: this.$t('member').zhzc
								}, {
									name: this.$t('member').smrz
								}, {
									name: this.$t('member').aqbd
								}, {
									name: this.$t('member').qjy
								}, ],
			};
		},
		computed: {
			i18n() {
				return this.$t("member")
			},
			tagBtn() {
				return [this.i18n.zh,this.i18n.yx, this.i18n.sjhm]
			},
			getPlaceholder() {
				return [this.i18n.qsrzh,this.i18n.qsryx,this.i18n.skjkjkhd]
			},
			countryCode() {
				return this.$store.state.countryCode || 86;
			}

		},
		onHide() {
			if (this.newTimer) { //注销定时器
				console.log('注销定时器')
				clearInterval(this.newTimer);
				this.newTimer = null;
				this.timeCode = true
			}
		},
		onUnload() {
			if (this.newTimer) { //注销定时器
				console.log('注销定时器')
				clearInterval(this.newTimer);
				this.newTimer = null;
				this.timeCode = true
			}

		},
		methods: {
			// 发送验证码
			sendAdd() {
				this.min = 60
				const {
					chenk,
					userPhone
				} = this
				if (chenk === 2) {
					if (!userPhone) {
						this.$utils.showToast(this.i18n.skjkjkhd)
						return
					}
				} else if(chenk == 1) {
					if (this.$utils.testEmail(userPhone)) {
						this.$utils.showToast(this.i18n.hujkjkh)
						return
					}
				} else {
					if (!userPhone) {
						this.$utils.showToast(this.i18n.skjkjkhd)
						return
					}
				}
				if (this.newTimer) {
					return
				}
				// const type = chenk === 1 ? 'PHONEYANZEN':''
				const member = uni.getStorageSync('userId') || ''
				const chooseCode = this.$store.state.countryCode || uni.getStorageSync('chooseCode') 
				const phone = chooseCode + userPhone
				if (chenk === 2) {
					this.$u.api.user.sendPhone(phone, member).then(res => {
						if (res.status == "SUCCEED") {
							this.$utils.showToast(this.$t('security').fscg)
							this.Time()
							setTimeout(() => {
								this.timeCode = false
							}, 1000)
						} else {
							this.$utils.showToast(res.errorMessage)
						}
					})
				} else if(chenk == 1) {
					this.$u.api.user.sendMail(userPhone).then(res => {
						if (res.status == "SUCCEED") {
							this.$utils.showToast(this.$t('security').fscg)
							this.Time()
							setTimeout(() => {
								this.timeCode = false
							}, 1000)
						} else {
							this.$utils.showToast(res.errorMessage)
						}
					})
				} else {
					
				}
				
			},
			//定时器没过1秒参数减1
			Time() {
				this.newTimer = setInterval(() => {
					this.min -= 1
					if (this.min < 1) {

						this.timeCode = true
						clearInterval(this.newTimer);
						this.newTimer = null;
					}
				}, 1000)
			},
			// 选择区号
			getAreaCode() {
				uni.navigateTo({
					url: `/pages/login/area-code`
				})
			},
			cancel() {
				uni.navigateTo({
					url: `/pages/index/index`
				})
			},
			getImg() {
				this.isInput = !this.isInput

			},
			getComfirmImg() {
				this.isComfirmInput = !this.isComfirmInput
			},
			getChenk(index) {
				this.userPhone = ''
				this.userPass = ''
				this.verification = ''
				this.confirmUserPass = ''
				this.isChecked = false
				this.timeCode = true
				console.log(index)
				if (this.newTimer) { //注销定时器
					clearInterval(this.newTimer);
					this.newTimer = null;
				}
				this.min = 60,
					this.chenk = index
			},
			back() {
				uni.navigateBack(1)
			},
			getPath() {
				const {
					chenk,
					userPhone,
					userPass,
					confirmUserPass,
					countryCode: areaCode,
					verification
				} = this
				const phoneData = {
					phone: userPhone,
					password: md5Libs.md5(userPass),
					re_password: md5Libs.md5(confirmUserPass),
					// payPassword: md5Libs.md5(code),
					areaCode,
					regType: "PHONE"
				}
				const mailData = {
					mail: userPhone,
					password: md5Libs.md5(userPass),
					re_password: md5Libs.md5(confirmUserPass),
					// payPassword: md5Libs.md5(code),
					areaCode,
					regType: "MAIL"
				}
				if (!userPass) {
					this.$utils.showToast(this.i18n.qsrdlmm)
					return
				}
				if (!verification) {
					this.$utils.showToast(this.$t('common').emailcodePlaceholder)
					return
				}
				if (chenk === 2 && !userPhone) {
					this.$utils.showToast(this.i18n.skjkjkhd)
					return

				}
				if (chenk === 1 && this.$utils.testEmail(userPhone)) {
					this.$utils.showToast(this.i18n.hujkjkh)
					return
				}
				if (this.$utils.testCode(verification)) {
					this.$utils.showToast(this.$t('about').qsrymm)
					return
				}
				if(this.isChecked == false) {
					this.$utils.showToast(this.$t('common').tytk)
					return
				}
				const type = chenk === 2 ? 'PHONEYANZEN':''
				const chooseCode = this.$store.state.countryCode || uni.getStorageSync('chooseCode')
				const phone = chenk === 2 ? `${chooseCode}${userPhone}`:userPhone
				// 先校验验证码是否正确 在调用登录
				this.$u.api.user.checkSmsCode(phone, verification, type).then(res => {
					if (res.status == "SUCCEED" && this.isChecked == true) {
						this.$u.api.user.register(chenk === 2 ? phoneData : mailData).then(res => {
							console.log("注册结果", res)
							if (res.status == "SUCCEED") {
								this.$utils.showToast(this.i18n.zccg)
								const temp = {
									phMail: userPhone,
									password: md5Libs.md5(userPass),
									areaCode
								}
								if (!this.$utils.testEmail(userPhone)) {
									delete temp.areaCode
								}
								this.loginFn(temp)
							} else {
								this.$utils.showToast(res.errorMessage)
							}
						})
					} else {
						this.$utils.showToast(res.errorMessage)
					}
				})


			},
			loginFn(temp) {
				this.$u.api.user.login(temp).then(res => {
					console.log("登录结果", res)
					if (res.status == "SUCCEED") {
						if (uni.getStorageSync('testId')) {
							const testid = uni.getStorageSync('testId')
							console.log('我触发了！')
							uni.setStorageSync('testId', testid)
						}
						this.$utils.showToast(this.i18n.dlcg)
						uni.setStorageSync('userId', res.result.id)
						//保存token至缓存
						uni.setStorageSync('token', res.result.token)
						uni.reLaunch({
							url: "/pages/index/index"
						})
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
	@import './assets/3.scss';
</style>
<style lang='scss' scoped>
	.f-bg {
		background: #F6F6F6;
		border-radius: 6rpx;
		padding: 21rpx 26rpx;
	}
	.step {
		margin-top: 50rpx;
	}
	.common{
		margin-left: 50rpx;
		margin-top: 20rpx;
	}
	.register-input {
		background: #F6F6F6;
		border-radius: 10rpx;
		padding: 20rpx 29rpx;
		display: flex;
		align-items: center;
		margin: 14rpx 48rpx;
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
		.f-in-box {
			display: flex;
			align-items: center;

		}

		.send-box {
			color: #D1A037;
			font-size: 32rpx;
			font-weight: 500;
			display: flex;
			justify-content: flex-end;
			width: 400rpx;
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
			width: 80%;
			margin-left: 30rpx;
		}
	}
	.check {
		margin-left: 45rpx;
		margin-top: 10rpx;
	}
	.text-login{
		margin-left: 45rpx;
		margin-top: 20rpx;
	}
	.link{
		color: #2979ff;
	}
</style>
