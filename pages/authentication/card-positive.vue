<template>
	<view class="page flex-col">
		<view class="box_1 flex-col">
			<view class="section_1 flex-col">
				<view class="nav-bar_1 flex-row">
					<image @click="back()" class="icon_1" referrerpolicy="no-referrer"
						src="/static/lanhu_querenzhengmian/pslmlxc4kszalno6tyt0g5xjz88m8ehvim183e90e0-b7c4-4443-b53a-79f0d9615c5a.png" />
					<div class="block_1 flex-col">
						<view class="image-wrapper_1 flex-row justify-between">
							<image @click="goCustomer()" class="icon_2" referrerpolicy="no-referrer"
								src="/static/lanhu_querenzhengmian/pskyt0xwvxxfgsd1rlmyo81pejvrfuivfv2896919b-53a9-4c9f-ad46-9986e29627be.png" />
							<image @click="cancel()" class="icon_3" referrerpolicy="no-referrer"
								src="/static/lanhu_querenzhengmian/pseuclyyn8937w42hgq6ut36ahyzrottqy953d01a3-38da-43a6-9203-a16fe239fc75.png" />
						</view>
					</div>
				</view>
				<text class="text_1">{{i18n.qrzm}}</text>
			</view>
			<view class="section_2 flex-col" @click="getUpload">
				<image v-if="isImg" :src="isImg" mode="widthFix"></image>
				<text v-else style="font-size: 32rpx;font-weight: 600;">{{i18n.djsc}}</text>
				
			</view>
			<!-- <view>
				<image :src="isImg" mode="widthFix"></image>
			</view> -->
			<view class="section_3 flex-col">
				<!-- <text class="text_2">经过识别，您的照片：</text>
				<view class="image-text_1 flex-row justify-between">
					<image class="icon_4" referrerpolicy="no-referrer"
						:src="ossURL+img" />
					<text class="text-group_1">图像模糊。请勿使用模糊图像上传</text>
				</view> -->
				<button class="button_1 flex-col" @click="onClick_1">
					<text class="text_3">{{i18n.jx}}</text>
				</button>
			</view>
		</view>
	</view>
</template>
<script>
import th from '../../common/locales/th';
	export default {
		data() {
			return {
				constants: {},
				img:"",
				isImg: ''
			};
		},
		computed:{
			  i18n() {
			  	return this.$t("ident")
			  }
		},
		methods: {
			goCustomer() {
				uni.navigateTo({
					url: `/pages/kefu/customerService?type=service`
				})
			},
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
					// sizeType: ['compressed'],
					success: res => {
						console.log(res)
						const tempFilePaths = res.tempFilePaths;
						this.$utils.uploadPictures(res.tempFilePaths, 'user/headers', data => {
									this.img = data.name;
									this.isImg = tempFilePaths[0]
							
						})						
					},
				})
			},
			onClick_1() {
				if(this.img != ''){
					let data = new Object();
					data.positiveLink = this.img;
					data.sideLink = this.img;
					uni.navigateTo({
						url: `/pages/authentication/user-authent?data=`+JSON.stringify(data)
					})
					// uni.navigateTo({
					// 	url: `/pages/authentication/card-reverse-side?img=`+this.img
					// })
				} else {
					this.$utils.showToast(this.i18n.qsczjzp)
				}
			}
		}
	};
</script>
<style lang='scss'>
	@import '@/common/common.scss';
	@import './assets/8.scss';
</style>
