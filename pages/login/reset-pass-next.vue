<template>
	<view class="page flex-col">
		<view class="image-wrapper_1 flex-row justify-between">
			<image @click="back()" class="icon_1" referrerpolicy="no-referrer"
				src="/static/lanhu_querenmima/ps2495rpr92seqakcpyfbbjuasmb353tg5d13ee66-88f7-4c8e-80de-307ef55cf92f.png" />
			<image @click="cancel()" class="icon_2" referrerpolicy="no-referrer"
				src="/static/lanhu_querenmima/ps8b8mmrxue1ejsmcfbi9a9q8tmbnwfdcne9b59f87-0eab-4164-a0d7-7349f3006705.png" />
		</view>
		<!-- <view class="block_1 flex-row">
			<image class="icon_3" referrerpolicy="no-referrer"
				src="/static/lanhu_querenmima/ps56555x0184xa44efrrrkrcjeaqk3qoz0q29472b0b-a87b-4ae7-801f-946aabf48c3e.png" />
			<text class="paragraph_1">
				{{ $t('newFy').cztips }}
			</text>
		</view> -->
		<view class="block_1">
			<image class="icon_3" referrerpolicy="no-referrer"
				src="/static/lanhu_querenmima/ps56555x0184xa44efrrrkrcjeaqk3qoz0q29472b0b-a87b-4ae7-801f-946aabf48c3e.png" />
			<view class="paragraph_1">
				{{ $t('newFy').cztips }}
			</view>
		</view>
		<text class="text_1">{{ $t('newFy').czmm }}</text>
		<text class="text_2">{{ $t('common').newPassword }}</text>
		<view class="register-input">
			<view class="r-input">
				<input v-if="!isInput" placeholder="" type="password" v-model="userPass" class="f-input" />
				<input v-else placeholder="" v-model="userPass" class="f-input" />
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
		<text class="text_4">{{ $t('common').confirmPassword }}</text>
		<view class="register-input">
			<view class="r-input">
				<input v-if="!isInput1" placeholder="" type="password" v-model="newPass" class="f-input" />
				<input v-else placeholder="" v-model="newPass" class="f-input" />
			</view>
			<view class="right" v-if="!isInput1" @click="getImg1()">
				<image referrerpolicy="no-referrer"
					src="/static/lanhu_zhuce2/psnludfthhx5r591i5piefselpogssibjgfdd84f54-6a57-4ec7-8cfa-188f91077e9f.png" />
			</view>
			<view class="rights" v-else @click="getImg1()">
				<image referrerpolicy="no-referrer"
					src="/static/lanhu_zhuce2/psmj530dxyeb01sxe7y15ux6nsv9g9g39ooc04e8282-fee3-4d6e-9231-af44d41bd42d.png" />
			</view>
		
		</view>
		<button class="button_1 flex-col" @click="nextStep()">
			<text class="text_6">{{ $t('common').nextStep }}</text>
		</button>
	</view>
</template>
<script>
	import md5Libs from "uview-ui/libs/function/md5";
	export default {
		data() {
			return {
				userPass: '',
				newPass: '',
				isInput: false,
				isInput1: false,
				userPhone: '', // 邮箱/手机号
				code: '' // 验证码
			};
		},
		onLoad(e) {
			if (e && e.code) {
				const {
					code,
					userPhone
				} = e
				this.userPhone = userPhone || ''
				this.code = code || ''
			}
		},
		methods: {
			getImg() {
				this.isInput = !this.isInput
			},
			getImg1() {
				this.isInput1 = !this.isInput1
			},
			nextStep() {
				const { userPass, userPhone:phMail, code } = this
				const type = ''
				const password = md5Libs.md5(userPass)
				this.$u.api.user.recomposeInformation(phMail, code,type, password ).then(res => {
					if (res.status == "SUCCEED") {
						this.$utils.showToast(this.$t('security').xgmmcg)
						setTimeout(() => {
							uni.navigateTo({
								url: `/pages/login/login`
							})
						},1000)
						
					} else {
						this.$utils.showToast(res.errorMessage)
					}
				})
			},
			cancel() {
				uni.navigateTo({
					url: `/pages/index/index`
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
	@import './assets/7.scss';
</style>
<style lang="scss" scoped>
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
