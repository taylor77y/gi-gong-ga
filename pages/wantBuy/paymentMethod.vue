<template>
	<view class="page">
		<view class="header">
			<u-icon name="arrow-left" size="40" @click="turnBack" class="left"></u-icon>
			<h2 class="title">
				C2C收款方式
			</h2>
			<view class="right"></view>
		</view>
		<view class="content" v-for="(item,index) in list" :key="index">
      <view class="item">
        <view class="title">{{ item.methodName }}</view>
        <view class="title1">{{ item.realName }}</view>
        <view class="title2">{{ item.paramValue1 }}</view>

      </view>
		</view>
		<view class="footer">
			<u-button type="primary" @click="open">添加收款方式</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			};
		},
		onReady() {
			this.getList()
		},
		methods: {
			async getList() {
				const language = uni.getStorageSync('lang')
				const token = uni.getStorageSync('token')
				const {status, result, errorMessage} = await this.$u.api.wantBuy.c2cPaymentMethodList(language, token)
				if(status === 'SUCCEED') {
          console.log(result)
					this.list = result
				} else {
					this.$refs.uToast.show({
						title: errorMessage,
						type: 'error',
						// url: '/pages/login/login',
					})
				}
			},
			turnBack(){
				uni.navigateBack()
			},
			open(){
				uni.navigateTo({
					url:'/pages/wantBuy/addPaymentMethod'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body{
		height: 100%;
	}
.page {
	height: 100%;
	background: #f5f5f5;
	display: flex;
	flex-direction: column;
	.header {
		display: flex;
		justify-content: space-between;
		height: 90rpx;
		align-items: center;
		background: #fff;
		.title {
			font-weight: 400;
			font-size: 16px;
		}
		.left {
			padding: 0 32rpx;
			color: #868c9a;
		}
		.right {
			width: 100rpx;
		}
	}
	.content {
		flex: 1;
	}
	.footer {
		background: #fff;
		padding: 50rpx 50rpx 200rpx 50rpx;
	}
}
</style>
