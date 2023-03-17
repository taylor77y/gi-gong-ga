<template>
	<u-popup :closeable="true" v-model="IsShowPage" @close="onClose" mode="bottom" border-radius="20" z-index="102">
		<view class="bond-box">
           <view class="title">{{ i18n.bzjms }}</view>
		   <view class="pattern-box">
			   <view @click="getBtn(index)" :class="{ 'cu-box': curr === index }" v-for="(item, index) in btnInfo" :key="index">
				   {{ item }}
				   <image v-if="curr === index" src="../../static/image/new/16.png" />
			   </view>
			   
		   </view>
		   <view class="tips">
			   {{ i18n.bzjzdqtsx }}
		   </view>
		   <!-- <view class="tips f-B0B3BA">
		   			   > 什么是开仓和逐仓模式？
		   </view> -->
		   <view class="btn" @click="getAdd()">
			   {{ $t('payment').quren }}
		   </view>
		   <view style="height: 100rpx;"></view>
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
			}
		},
		data() {
			return {
                curr: 0,
				IsShowPage: false
				
			}
		},
		computed: {
			i18n() {
				return this.$t("financial")
			},
           btnInfo() {
			   return this.i18n.btnInfo
		   }
		},
		watch: {
			showSpec(val) {
				this.IsShowPage = val

			}
		},
		methods: {
			getAdd() {
				this.$emit('getAdd', this.curr)
			},
			getBtn(index) {
				this.curr = index
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
		}
		.f-B0B3BA {
			color: #B0B3BA !important;
		}
		.tips {
			margin-bottom: 60rpx;
			color: #1F222B;
			font-size: 26rpx;
			font-weight: 500;
		}
		.pattern-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 32rpx;
			view {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #FAFAFA;
				border-radius: 8rpx;
				position: relative;
				padding: 20rpx 0;
				color: #1F222B;
				font-size: 28rpx;
				font-weight: 500;
				width: 50%;
				& image {
					width: 32rpx;
					height: 34rpx;
					position: absolute;
					top: -4rpx;
					right: 0;
				}
				&:last-child {
					margin-left: 22rpx;
				}
			}
			
			.cu-box {
				border: #E2BC46 solid 4rpx;
				background: #fff;
				
			}
			
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
