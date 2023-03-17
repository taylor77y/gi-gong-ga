<template>
	<view class="page flex-col">
		<view class="group_1 flex-col">
			<image @click="close()" class="icon_1" referrerpolicy="no-referrer"
				src="/static/lanhu_jinxingrenzheng/psntlhyu1ffybinmf6ozcof8j0ze4z560na691d2bf-d3c8-416f-aea0-499890401629.png" />
			<text class="text_1">{{i18n.jxrz}}</text>
		<!-- 	<text class="text_2">选择证件签发国/地区</text>
			<text class="text_3">国籍</text>
			<view class="group_2 flex-row">
				<view class="box_1 flex-col"></view>
				<text class="text_4">中国</text>
			</view> -->
			<text class="text_5">{{i18n.shdfa}}</text>
			<view class="group_3 flex-col">
				<input class="f-input" v-model="name" :placeholder="i18n.hkhggk" />
			</view>
			<text class="text_5">{{i18n.sfz}}</text>
			<view class="group_3 flex-col">
				<input class="f-input" v-model="card" :placeholder="i18n.hskhkd" />
			</view>
			<!--  <view class="input-bg">
		   <input class="f-input" v-model="name"  />
	  </view> -->
			<view class="text-wrapper_1 flex-col" @click="onClick()">
				<text class="text_6">{{i18n.jx}}</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				name: '',
				card: '',
				json: null
			};
		},
		computed:{
			  i18n() {
			  	return this.$t("ident")
			  }
		},
		onLoad(e) {
			if (e && e.data) {
				this.json = JSON.parse(e.data)
			}
		},
		methods: {
			close() {
				uni.navigateTo({
					url: `/pages/market/market`
				})
			},
			onClick() {
				if (!this.name) {
					this.$utils.showToast(this.$t('payment').qsrxm)
					return
				}
				if (!this.card) {
					this.$utils.showToast(this.i18n.qsrzjhm)
					return
				}
				if (this.name != "" && this.card != "") {
					this.json.name = this.name;
					this.json.code = this.card;
					this.json.member = uni.getStorageSync("userId");
					console.log(this.json)
					this.$u.api.user.advancedCertification(this.json).then(res => {
						console.log("提交成功", res)
						if (res.status === "SUCCEED") {
							this.$utils.showToast(this.$t('recharge').tjshcg)
							setTimeout(() => {
								uni.navigateTo({
									url: `/pages/authentication/success-authent`
								})
							},1500)
							
						} else {
							this.$utils.showToast(res.errorMessage)
						}

					})
				}

			}
		}
	};
</script>
<style lang='scss'>
	@import '@/common/common.scss';
	@import './assets/4.scss';
</style>
<style lang="scss" scoped>
	.input-bg {
		width: 351rpx;
		height: 44rpx;
		border-radius: 10rpx;
		border: #2C2F36 solid 1rpx;
	}

	.f-input {
		// width: 703rpx;
		height: 86rpx;
		line-height: 86rpx;
		padding: 0 24rpx;
		color: #fff;
	}
</style>
