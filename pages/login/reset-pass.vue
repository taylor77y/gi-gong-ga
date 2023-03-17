<template>
	<view class="page flex-col">
		<view class="image-wrapper_1 flex-row justify-between">
			<image @click="back()" class="icon_1" referrerpolicy="no-referrer"
				src="/static/lanhu_zhongzhimima/psk5bugn7v8fq9qtd7r80vup7fszylj0l6fd51e8597-3498-455f-b5a0-54db9ec39654.png" />
			<image @click="cancel()" class="icon_2" referrerpolicy="no-referrer"
				src="/static/lanhu_zhongzhimima/psq3y9x454hrgu6c6ddb7hnfong3de6qddc2d8e3a-3ece-4e56-b262-73e7d38de35c.png" />
		</view>
		<!-- <view class="box_1 flex-row">
			<image class="icon_3" referrerpolicy="no-referrer"
				src="/static/lanhu_zhongzhimima/psuootdl57nhrd0s0igh69i6upxm1iw5nsqc28de076-4a6e-4f94-8919-ebee01cf83bd.png" />
			<text class="paragraph_1">
				{{ $t('newFy').cztips }}
			</text>
		</view> -->
		<view class="box_1">
			<image class="icon_3" referrerpolicy="no-referrer"
				src="/static/lanhu_zhongzhimima/psuootdl57nhrd0s0igh69i6upxm1iw5nsqc28de076-4a6e-4f94-8919-ebee01cf83bd.png" />
				<view class="paragraph_1">
					{{ $t('newFy').cztips }}
				</view>
		</view>
		<text class="text_1">{{ $t('newFy').czmm }}</text>
		<text class="text_2">{{ i18n.qsryxsjh }}</text>
		<view class="reset-input">
			<view class="login-input">
				<view @click="getAreaCode()" v-if="!emailCode">
				 <text class="">+{{ countryCode }}</text>
				 <image
				   referrerpolicy="no-referrer"
				   src="/static/lanhu_denglu/ps04twdt13087chpihojawqbuipb5dvmfz1068353f9-a9e8-4434-9048-6cb91bdf69d9.png"
				 />
				 </view>
				 <input placeholder-style="color: #999" v-model="userPhone" class="f-input"/>
			</view>
			<!-- <view class="r-input">
				<view @click="getAreaCode()" v-if="!emailCode">
				 <text class="">+{{ countryCode }}</text>
				 <image
				   referrerpolicy="no-referrer"
				   src="/static/lanhu_denglu/ps04twdt13087chpihojawqbuipb5dvmfz1068353f9-a9e8-4434-9048-6cb91bdf69d9.png"
				 />
				 </view>
				<input v-model="userPhone" class="f-input" />
				
			</view> -->
			<!-- <image  referrerpolicy="no-referrer"
				src="/static/lanhu_zhongzhimima/psqa9m70xo2ezzbhx2tnw27dfesnks0r865365bd-f039-4703-bde3-f3ad426b0689.png" /> -->
		</view>
		<button class="button_1 flex-col" @click="nextStep()">
			<text class="text_6">{{ i18n.xyb }}</text>
		</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userPhone: '',
				emailCode: false // false 手机号 true 邮箱
			};
		},
		watch: {
			userPhone() {
				this.$u.throttle(async () => {
					if (this.$utils.testEmail(this.userPhone)) {
						this.emailCode = false
					} else {
						this.emailCode = true
					}
				}, 50)
			}  
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
			back() {
				uni.navigateBack(1)
			},
			nextStep() {
				const chenk = this.emailCode ? 0:1
				const { userPhone  } = this
				if (!userPhone) {
					this.$utils.showToast(this.$t('common').plsInputUsername)
					return
				}
				uni.navigateTo({
					url: `/pages/login/verification?chenk=${chenk}&userPhone=${userPhone}`
				})
			}
		}
	};
</script>
<style lang='scss'>
	@import '@/common/common.scss';
	@import './assets/6.scss';
</style>
<style lang="scss" scoped>
	.login-input {
		background: #F6F6F6;
		border-radius: 10rpx;
		padding: 36rpx 42rpx;
		display: flex;
		align-items: center;
		margin: 20rpx 48rpx;
		font-size: 36rpx;
		color: #000;
		font-weight: 600;
		image {
			width: 23rpx;
			height: 14rpx;
			margin-left: 20rpx;
		}
		.f-input {
			width: 76%;
			margin-left: 30rpx;
		}
	}
	// .reset-input {
	// 	padding: 32rpx 36rpx;
	// 	margin: 20rpx 48rpx;
	// 	font-size: 36rpx;
	// 	color: #000000;
	// 	background: #F6F6F6;
	// 	border-radius: 10rpx;
	// 	display: flex;
	// 	align-items: center;
	// 	.r-input {
	// 		width: 93%;
	// 	}
	// 	& image {
	// 		width: 30rpx;
	// 		height: 30rpx;
			
	// 	}
	// }
</style>
