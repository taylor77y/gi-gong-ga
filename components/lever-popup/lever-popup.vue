<template>
	<u-popup :closeable="true" v-model="IsShowPage" @close="onClose" mode="bottom" border-radius="20" z-index="102">
		<view class="bond-box">
           <view class="title">调整杠杆</view>
		   
		  
		   <view class="btn" @click="getAdd()">
			   确认
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
                
				IsShowPage: false
				
			}
		},
		computed: {
           
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
       .title {
		   text-align: center;
           color: #1F222B;
		   font-size: 36rpx;
		   font-weight: 500;
		   margin-bottom: 50rpx;
	   }
	}
</style>
