<template>
	<view class="container">

		<head-title :title="i18n.xgmm" />
		<view class="tips">
			{{ i18n.wlnzjaq }}
		</view>
		<view class="bank-list">
			<view class="item" v-for="(item, index) in bankInfo" :key="index">
				<view class="title">
					{{ item.name }}
				</view>
				<view class="f-input">
					<input v-model="item.value" :placeholder="item.pla"
						placeholder-style="color: #B0B3BA;font-size: 32rpx" />
				</view>
			</view>
			<view class="btn" @click="getAdd()">
				{{ i18n.tj }}
			</view>
		</view>
	</view>
</template>

<script>
import md5Libs from "uview-ui/libs/function/md5";
	export default {
		data() {
			return {
				bankInfo: [{
						name: '原密码',
						value: '',
						pla: "请输入原密码"
					},
					{
						name: '新密码',
						value: '',
						pla: "请输入新密码"
					},
					{
						name: '确认密码',
						value: '',
						pla: "请确认密码"
					}
				],
			}
		},
		onLoad() {
            this.bankInfo = this.i18n.bankInfo
		},
		computed: {
           i18n() {
               return this.$t("security");
           }
		},

		methods: {
            getAdd() {
				if (!this.bankInfo[0].value) {
					this.$utils.showToast(this.i18n.qsrymm)
					return
				}
				if (this.bankInfo[1].value !== this.bankInfo[2].value ) {
					this.$utils.showToast(this.i18n.lcmmbyz)
					return
				}
				let member = uni.getStorageSync('userId')
				let oldPass = md5Libs.md5(this.bankInfo[0].value)
				let newPass = md5Libs.md5(this.bankInfo[1].value)
				this.$u.api.user.resetPassword(member,oldPass,newPass).then(res=>{
					if(res.status == "SUCCEED"){
						uni.clearStorageSync();
						this.$utils.showToast(this.i18n.xgmmcg)
						uni.navigateTo({
							url:'/pages/login/login'
						})
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
		.tips {
			color: #E45360;
			font-size: 24rpx;
			margin: 0 24rpx 54rpx 24rpx;
		}

		.bank-list {
			margin: 24rpx;

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

			.item {
				color: #8D9099;
				font-size: 28rpx;
				margin-bottom: 48rpx;

				.title {
					margin-bottom: 10rpx;
				}

				.f-input {
					padding: 20rpx 24rpx;
					background: #F6F6F6;
					border-radius: 6rpx;
				}
			}
		}
	}
</style>
