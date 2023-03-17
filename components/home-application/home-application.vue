<template>
	<view class="home-application">
		<view class="item" @click="getPath(item.value)" v-for="(item, index) in list" :key="index">
			<view class="top">
				<image :src="item.img" />
			</view>
			<view class="f-titl">
				{{ item.title }}
			</view>
		</view>

	</view>
</template>

<script>
	/*
	 */
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			}

		},
		data() {
			return {

			}
		},
		methods: {
           getPath(val) {
             if(!val){
               this.$utils.showToast('敬情期待')
             }
			   if (val) {
				  uni.navigateTo({
				  	 url: val
				  }) 
			   } else {
				   this.getRechargeMethod()
				   // this.$utils.showToast(this.$t('newFy').wlbjfw)
			   }
			   
		   },
		   getRechargeMethod() {
			   const member = uni.getStorageSync('userId')
			   this.$u.api.common.getRechargeMethod(member).then(res=>{
			       if (res.status == "SUCCEED") {
			       	uni.navigateTo({
			       		 url: '/pages/recharge/index?code=1'
			       	}) 
			       } else {
			       	this.$utils.showToast(res.errorMessage)
			       }
			   })
		   }
		   
		}
	}
</script>

<style lang="scss" scoped>
	.home-application {
		display: flex;
		flex-wrap: wrap;
        
		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 20%;
			color: #565656;
			font-size: 24rpx;
			margin-bottom: 20rpx;
			.f-titl {
				text-align: center;
				height: 66rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
			}
			.top {
				margin-bottom: 4rpx;
				& image {
					width: 56rpx;
					height: 56rpx;
				}
			}
		}
	}
</style>
