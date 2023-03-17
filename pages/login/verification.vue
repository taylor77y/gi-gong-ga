<template>
	<view class="page flex-col">
		<view class="image-wrapper_1 flex-row justify-between">
			<image @click="back()" class="icon_1" referrerpolicy="no-referrer"
				src="/static/lanhu_anquanyanzheng/psislmui4rg5dhc3cxkznxaozq209ml4nv83fd1f84-2d96-4066-8609-99acb1267145.png" />
			<image @click="cancel()" class="icon_2" referrerpolicy="no-referrer"
				src="/static/lanhu_anquanyanzheng/ps344h7cd888q8gf7r4eaw7m0c07hmio0mnhfcc1c464-5dd0-413e-8128-3259c537a64d.png" />
		</view>
		<text class="text_1">{{ $t('security').aqyz }}</text>
		<text class="text_2">{{ tagBtn[chenk] }}{{ $t('newFy').yzm  }}</text>
		<view class="verification-input">
			<input style="width: 25%;" placeholder="" type="number" v-model="code" class="f-input" />
			<view class="right">
				<text :class="textCode === 0 ? 'f-D29124':'f-text' " @click="getSend()">
					{{ textCode === 0 ? $t('newFy').hqyzm:$t('newFy').yzmyfs }}
				</text>
				<image v-if="textCode ===1" referrerpolicy="no-referrer"
					src="/static/lanhu_anquanyanzheng/pssp1g8djjiqn2bo15c9z84b4uex6a8r270693917-004a-4a3f-98ae-0087dfc4a531.png" />
			</view>
		</view>

		<!-- <text class="f-color">验证码错误</text> -->
		<text class="text_5">{{ $t('common').plsInput }}{{ tagBtn[chenk] }}{{ userPhone }} {{ $t('newFy').dlwyzm }}</text>
		<!-- <text class="text_6">安全验证不可用？</text> -->
		<button class="button_1 flex-col" @click="submit">
			<text class="text_7">{{ $t('security').tj }}</text>
		</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				textCode: 0,
				chenk: 1,
				userPhone: '',
				code: ''
			};
		},
		computed: {
			tagBtn() {
				return [this.$t('member').yx, this.$t('common').mobile]
			}
		},
		onLoad(e) {
			if (e && e.chenk) {
				const {
					chenk,
					userPhone
				} = e
				this.userPhone = userPhone || ''
				this.chenk = chenk || 1
			}
		},
		methods: {
			// 发送验证码
			getSend() {
				const { userPhone, chenk } = this
				// const type = chenk == 1 ? 'PHONEYANZEN':''
				const member = uni.getStorageSync('userId') || ''
				const chooseCode = this.$store.state.countryCode || uni.getStorageSync('chooseCode')
				const phone = chooseCode + userPhone
				if (chenk == 1) {
					this.$u.api.user.sendPhone(phone, member).then(res => {
						if (res.status == "SUCCEED") {
							this.$utils.showToast(this.$t('security').fscg)
							this.textCode = 1
						} else {
							this.$utils.showToast(res.errorMessage)
						}
					})
				} else {
					this.$u.api.user.sendMail(userPhone).then(res => {
						if (res.status == "SUCCEED") {
							this.$utils.showToast(this.$t('security').fscg)
							this.textCode = 1
						} else {
							this.$utils.showToast(res.errorMessage)
						}
					})
				}
				
				
			},
			cancel() {
				uni.navigateTo({
					url: `/pages/index/index`
				})
			},
			submit() {
				const {
					userPhone,
					code,
					chenk
				} = this
				if (this.$utils.testCode(code)) {
					this.$utils.showToast(this.$t('about').qsrymm)
					return
				}
				const type = chenk == 1 ? 'PHONEYANZEN':''
				const chooseCode = this.$store.state.countryCode || uni.getStorageSync('chooseCode')
				const phone = chenk == 1 ? `${chooseCode}${userPhone}`:userPhone
				// 先校验验证码是否正确 在调用登录
				this.$u.api.user.checkSmsCode(phone, code, type).then(res => {
					if (res.status == "SUCCEED") {
						uni.navigateTo({
							url: `/pages/login/reset-pass-next?userPhone=${userPhone}&code=${code}`
						})
					} else {
						this.$utils.showToast(res.errorMessage)
					}
				})

			},
			back() {
				uni.navigateBack(1)
			},
			onClick_1() {
				alert(1);
			}
		}
	};
</script>
<style lang='scss'>
	@import '@/common/common.scss';
	@import './assets/4.scss';
</style>
<style lang="scss" scoped>
	.f-D29124 {
		font-size: 24rpx;
		color: #D29124;
	}

	.f-color {
		font-size: 22rpx;
		color: #A12D3E;
		margin-left: 48rpx;
	}

	.verification-input {
		background: #F6F6F6;
		border-radius: 10rpx;
		padding: 36rpx 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 20rpx 48rpx;
		font-size: 36rpx;
		color: #000;
		font-weight: 500;

		.right {
			display: flex;
			justify-content: baseline;

			.f-text {
				font-size: 24rpx;
				color: #656A75;
				font-weight: 400;
				margin-right: 20rpx;
			}

			& image {
				width: 30rpx;
				height: 30rpx;
			}
		}
	}
</style>
