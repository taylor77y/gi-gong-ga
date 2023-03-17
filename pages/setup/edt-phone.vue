<template>
	<view class="container">

		<head-title :title="' '" />
		<view class="con-box">
			<view class="title">{{ i18n.aqyz }}</view>
			<view class="item">
				<view class="title1">
					{{ $t('common').mobile }}
				</view>
				<view class="f-input">
					<input v-model="mailbox" :placeholder="$t('common').plsInputMobile" placeholder-style="color: #B0B3BA;font-size: 32rpx" />
				</view>
			</view>
			<view class="item">
				<view class="title1">
					{{ $t('newFy').yzm }}
				</view>
				<view class="f-input">
					<input v-model="code" :placeholder="$t('common').mobilecodePlaceholder" placeholder-style="color: #B0B3BA;font-size: 32rpx" />
					<view class="send-box" v-if="timeCode" @click="sendAdd()">
						{{ i18n.fsyzm }}
					</view>
					<view class="send-box" v-else>
						<u-count-down bg-color="#F6F6F6" font-size="28" color="#D1A037" :show-days="false" :show-hours="false" :show-minutes="false" :timestamp="min"></u-count-down> s
					</view>
				</view>
			</view>
			<view class="btn" @click="getAdd()">
				{{ i18n.tj }}
			</view>
		</view>
	
		
	</view>
</template>

<script>
	import th from '../../common/locales/th';
	export default {
		data() {
			return {
				mailbox: '',
				code: '',
				newTimer: null,
				min: 60,
				timeCode: true,
			}
		},
		onLoad() {

		},
		computed: {
            i18n() {
                return this.$t("security");
            }
		},
        onHide() {
        	if (this.newTimer) { //注销定时器
        		console.log('注销定时器')
        		clearInterval(this.newTimer);
        		this.newTimer = null;
        	}
        },
        onUnload() {
        	if (this.newTimer) { //注销定时器
        		console.log('注销定时器')
        		clearInterval(this.newTimer);
        		this.newTimer = null;
        	}
        	
        },
		methods: {
			// 发送验证码
			sendAdd() {
				this.min = 60
				const { mailbox } = this
				if (!mailbox) {
					this.$utils.showToast(this.$t('common').plsInputMobile)
					return
				}
				if (this.newTimer) {
					return
				}
				const member = uni.getStorageSync('userId') || ''
				const chooseCode = this.$store.state.countryCode || uni.getStorageSync('chooseCode')
				const phone = chooseCode + mailbox
				this.$u.api.user.sendPhone(phone, member).then(res=>{
					if(res.status == "SUCCEED"){
						this.$utils.showToast(this.i18n.fscg)
						this.Time()
						setTimeout(() => {
							this.timeCode = false
						},1000)
					}else{
						this.$utils.showToast(res.errorMessage)
					}
				})
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
			getAdd() {
				const { mailbox, code } = this
				if (!mailbox) {
					this.$utils.showToast(this.i18n.qsrzqdyx)
					return
				}
				if (this.$utils.testCode(code)) {
					this.$utils.showToast(this.i18n.qsryxlwyzm)
					return
				}
				let member = uni.getStorageSync('userId')
				this.$u.api.user.setPhMail(member,mailbox,code).then(res=>{
					if(res.status == "SUCCEED"){
						this.$utils.showToast(this.i18n.bdcg)
						uni.navigateBack();
					}else{
						this.$utils.showToast(res.errorMessage)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.con-box {
			margin: 0 24rpx;
			.btn {
				position: fixed;
				width: 92%;
				bottom: 54rpx;
				padding: 20rpx 0;
				left: 4%;
				background: #EBECF0;
				border-radius: 6rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #1F222B;
				font-size: 32rpx;
				font-weight: 500;
			}
            .send-box {
				color: #D1A037;
				font-size: 32rpx;
				font-weight: 500;
				margin-left: auto;
			}
			.title {
				font-size: 48rpx;
				color: #1F222B;
				font-weight: bold;
			}
			.item {
				color: #8D9099;
				font-size: 28rpx;
				margin: 48rpx 0;
				.title1 {
					margin-bottom: 10rpx;
				}
				.f-input {
					padding: 27rpx 34rpx;
					background: #F6F6F6;
					border-radius: 6rpx;
					display: flex;
					align-items: center;
				}
			}
		}
	}
</style>
