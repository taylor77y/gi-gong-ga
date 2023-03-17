<template>
	<u-popup v-model="IsShowPage" @close="onClose" border-radius="20">
		<view class="cancel-box">
			<view class="title">{{i18n.qrlk}}</view>
			<view class="tips">
				{{i18n.rnyfdj}}
			</view>
	<!-- 		<view class="time">
				付款剩余时间
				<u-count-down separator-color="#D4B02D" :show-hours="false" font-size="28" color="#D4B02D"
					bg-color="#fff" :timestamp="timestamp"></u-count-down>
			</view> -->
			<view class="affirm-box">
				<view>
				<image src="../../static/image/fIattributes/37.png" @click="btnCode = !btnCode" v-if="!btnCode"></image>
				<image src="../../static/image/fIattributes/38.png" @click="btnCode = !btnCode" v-else></image>
				</view>
				{{i18n.wqrhmf}}
			</view>
			<view class="cancel-btn">
				<view @click="onClose()">{{i18n.qx}}</view>
				<view class="can1" :class="{'can2':btnCode}" @click="getAdd()">{{i18n.qr}}</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import th from '../../common/locales/th'
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
			oId: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				timestamp: 800,
				IsShowPage: false,
				btnCode: false, // 是否选中
			}
		},
		computed: {
			i18n() {
				return this.$t("fack");
			},
		},
		watch: {
			showSpec(val) {
				this.IsShowPage = val

			}
		},
		methods: {
			getAdd() {
				if (this.btnCode) {
					this.onClose()
					let obj = new Object();
					obj.priceOrderId = this.oId;
					obj.userId = uni.getStorageSync("userId")
					this.$u.api.fack.backOrder(obj).then(res => {
						if (res.status === "SUCCEED") {
							this.$utils.showToast(this.i18n.hkjjgfjh)
							// uni.navigateTo({
							// 	url: `/pages/fIattributes/cancel`
							// })
							uni.navigateBack()
							// this.$utils.showToast('取消成功')
						}else{
							this.$utils.showToast(res.errorMessage)
						}
					})
				}

			},
			onClose() {
				this.$emit('update:showSpec', false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cancel-box {
		background: #FFFFFF;
		padding: 40rpx;
		width: 580rpx;

		.cancel-btn {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			color: #1F222B;
			font-size: 28rpx;
			font-weight: bold;
			margin-top: 32rpx;

			.can1 {
				color: #B0B3BA;
				margin-left: 84rpx;
			}

			.can2 {
				color: #D4B02D !important;
			}
		}

		.title {
			font-size: 36rpx;
			color: #1F222B;
			font-weight: 600;
			margin-bottom: 30rpx;
		}

		.tips {
			color: #1F222B;
			font-size: 28rpx;
			margin-bottom: 48rpx;
		}

		.time {
			display: flex;
			align-items: center;
			color: #B0B3BA;
			font-size: 28rpx;
			margin-bottom: 48rpx;
		}

		.affirm-box {
			display: flex;
			align-items: center;
			color: #1F222B;
			font-size: 24rpx;
			padding-bottom: 45rpx;
			border-bottom: 1rpx solid #EBEBEB;

			& image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 14rpx;
			}
		}
	}
</style>
