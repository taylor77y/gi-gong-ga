<template>
	<view class="author-list">
		<view class="item" v-for="(item, index) in list" :key="index">
			<view class="item-img">
				<image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
			</view>
			<view class="cont">
				<view class="top">
					测试
				</view>
				<view class="a-cont">
					测试大婶大婶大婶大婶大婶大婶大婶大婶大大叔的大大叔大婶大婶
				</view>
			</view>
			<view class="r-btn">
				关注
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
					return [,,]
				}
			}
			
		},
		data() {
			return {
                
			}
		},

		methods: {
 
		}
	}
</script>

<style lang="scss" scoped>
   .author-list {
	   .item {
		   display: flex;
		   align-items: center;
		   width: 100%;
		   margin-bottom: 20rpx;
		   .item-img {
			   margin-right: 14rpx;
			   width: 76rpx;
			   & image {
				   width: 76rpx;
				   height: 76rpx;
				   border-radius: 50%;
			   }
		   }
		   .cont {
			   flex: 1;
			   margin-right: 10rpx;
			   .top {
				   font-size: 32rpx;
				   color: #1F222B;
				   font-weight: bold;
			   }
			   .a-cont {
				   color: #8D9099;
				   font-size: 26rpx;
				   display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;
			   }
		   }
		   .r-btn {
			   margin-left: auto;
			   width: 168rpx;
			   height: 62rpx;
			   background: #F5D45C;
			   color: #1F222B;
			   font-size: 28rpx;
			   font-weight: bold;
			   text-align: center;
			   line-height: 62rpx;
			   border-radius: 6rpx;
		   }
	   }
   }
</style>
