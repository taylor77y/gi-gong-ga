<template>
	<view class="container">
		
		<head-title :title="i18n.xzskfs" />
		 <view class="tips">{{ i18n.tjskfs }}</view>
		 <view class="collection-box">
			 <view class="item" @click="getPath(index)" v-for="(item, index) in listInfo" :key="index">
				 <view>{{ item.name }}</view>
				 <view>
					 <u-icon name="arrow-right" color="#fff"></u-icon>
				 </view>
			 </view>
		 </view>
	</view>
</template>

<script>
import th from '../../common/locales/th';
	export default {
		data() {
			return {
			   user:{}
			}
		},
		onLoad(e) {
           if(e && e.user){
			   this.user = e.user;
		   }
		},
		computed: {
			i18n() {
			    return this.$t("payment");
			},
			listInfo() {
				return [
					{ name: this.i18n.yhk },
					// {name: '支付宝'},
					// {name: '微信'}
				]
			}
		},
		
		methods: {
			getPath(index) {
			   const temp = {
			   	0: `/pages/payment/add-bank?user=`+this.user,
			   	// 1: `/pages/setup/index`
			   }
			   uni.navigateTo({
			   	url: temp[index]
			   })
			}
		}
	}
</script>

<style lang="scss" scoped>
	// :style="{ backgroundImage: `url(${item.img})` }"
	.container {
			
		.tips {
			font-size: 28rpx;
			color: #8D9099;
			margin-left: 24rpx;
			margin-bottom: 36rpx;
		}
		.collection-box {
			margin: 0 24rpx;
			.item {
				background-image: url('../../static/image/setting/bg1.png');
				width: 100%;
				max-width: 702rpx;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #fff;
				font-size: 28rpx;
				background-size: 100%;
				background-repeat: no-repeat;
				padding: 30rpx 24rpx;
				margin-bottom: 36rpx;
				// & :nth-of-type(2) {
				// 	background-image: url('../../static/image/setting/bg2.png');
				// 	background-size: 100%;
				// 	background-repeat: no-repeat;
				// }
			}
		}
	}
</style>