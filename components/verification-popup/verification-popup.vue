<template>
	<u-popup :closeable="true" v-model="IsShowPage" @close="onClose" mode="bottom" border-radius="20" z-index="102">
		<view class="bond-box">
			<view class="title">{{ $t('newFy').qrdd }}</view>

			<view class="f-title">
				{{ chaninCode ? $t('member').yx:$t('member').sjhm }}
			</view>
			<view class="f-cont">
				<view>{{ chaninCode ? userInfo.mail:userInfo.phone  }}</view>
				<view class="right" @click="chaninCode = !chaninCode">
					<image :class="{'r-icon1' : chaninCode}" src="../../static/image/recharge/4.png">
				</view>
			</view>
			<view class="f-title">
				{{ $t('newFy').yzm }}
			</view>
			<view class="f-cont">
				<input type="number" v-model="code" :placeholder="$t('common').plsInputCode" placeholder-style="color: #B0B3BA;font-size: 28rpx" />
				<view class="send-box" v-if="timeCode" @click="sendAdd()">
					{{ $t('security').fsyzm }}
				</view>
				<view class="send-box" v-else>
					<u-count-down bg-color="#fff" font-size="28" color="#D1A037" :show-days="false" :show-hours="false" :show-minutes="false" :timestamp="min"></u-count-down> s
				</view>
			</view>
			<view class="btn" @click="getAdd()">
				{{ $t('payment').quren }}
			</view>
			<view style="height: 50rpx;"></view>
		</view>

	</u-popup>
</template>

<script>
	/*
	 *@property { Boolean } showSpec 控制显/隐
	 * 
	 */
	export default {
		props: {
			showSpec: {
				type: Boolean,
				default: false
			},
			userInfo: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				IsShowPage: false,
				min: 60,
				timeCode: true,
				code: '',
				newTimer: null,
				chaninCode: false, // false 是手机号 true 是 邮箱
			}
		},
		computed: {

		},
		watch: {
			showSpec(val) {
				this.IsShowPage = val
                if (this.newTimer) { //注销定时器
				    this.code = ''
                	console.log('注销定时器')
					this.timeCode = true
                	clearInterval(this.newTimer);
                	this.newTimer = null;
                }
				this.chaninCode = this.userInfo.phone ? false:true
				console.log(this.userInfo)
			}
		},
		methods: {
			// 发送验证码
			sendAdd() {
				this.min = 60
				const { chaninCode } = this
				
				const mailbox = chaninCode ? this.userInfo.mail:this.userInfo.phone
				// const type = chaninCode ? '':'PHONEYANZEN'
				const member = uni.getStorageSync('userId') || ''
				if (chaninCode) {
					this.$u.api.user.sendMail(mailbox).then(res=>{
						if(res.status == "SUCCEED"){
							this.Time()
							setTimeout(() => {
								this.timeCode = false
							},1000)
							this.$utils.showToast(this.$t('security').fscg)
						}else{
							this.$utils.showToast(res.errorMessage)
						}
					})
				} else {
					const chooseCode = this.$store.state.countryCode || uni.getStorageSync('chooseCode')
					const phone = chooseCode + mailbox
					this.$u.api.user.sendPhone(phone, member).then(res => {
						if (res.status == "SUCCEED") {
							this.Time()
							setTimeout(() => {
								this.timeCode = false
							},1000)
							this.$utils.showToast(this.$t('security').fscg)
						} else {
							this.$utils.showToast(res.errorMessage)
						}
					})
				}
				
			},
			//定时器没过1秒参数减1
			Time() {
				this.newTimer = setInterval(() => {
					this.min -= 1
					console.log(this.min)
					if (this.min < 1) {
						console.log('我进定时器了----')
						this.timeCode = true
						clearInterval(this.newTimer);
						this.newTimer = null;
					}
				}, 1000)
			},
			getAdd() {
				const { code, chaninCode } = this
				if (this.$utils.testCode(code)) {
					this.$utils.showToast(this.$t('common').plsInputCode)
					return
				}
				const phMail = chaninCode ? this.userInfo.mail:this.userInfo.phone
				const type = chaninCode ? '':'PHONEYANZEN'
				const chooseCode = this.$store.state.countryCode || uni.getStorageSync('chooseCode')
				const phone = !chaninCode ? `${chooseCode}${phMail}`:phMail
				this.$u.api.user.checkSmsCode(phone, code).then(res=>{
					if(res.status == "SUCCEED"){
						clearInterval(this.newTimer);
						this.newTimer = null;
						this.$emit('getAdd')
						this.timeCode = true
						this.code = ''
					}else{
						this.$utils.showToast(res.errorMessage)
					}
				})
			},
			onClose() {
				this.$emit('update:showSpec', false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bond-box {
		background: #fff;
		padding: 40rpx 24rpx;
		.r-icon1 {
			transform: rotate(180deg);
			transform-origin: center center;
		}
        .f-title {
			font-size: 28rpx;
			color: #000;
			margin-bottom: 20rpx;
			font-weight: 600;
		}
		.send-box {
			color: #D1A037;
			font-size: 28rpx;
			font-weight: 500;
			margin-left: auto;
		}
		.f-cont {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			.right {
				
				& image {
					transition: all 0.3s;
					width: 40rpx;
					height: 40rpx;
					
				}
			}
		}

		.btn {
			padding: 20rpx 0;
			background: #F5D45C;
			border-radius: 6rpx;
			color: #1F222B;
			font-size: 32rpx;
			font-weight: 500;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 40rpx;
		}

		.title {
			text-align: center;
			color: #1F222B;
			font-size: 36rpx;
			font-weight: 500;
			margin-bottom: 50rpx;
		}
	}
</style>
