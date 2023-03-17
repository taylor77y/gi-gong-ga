<template>
	<view class="fabi-list">
		<view class="item" v-for="(item, index) in list" :key="index" @click="getPath(item)">
			<view class="top-box"> 
			   <view class="f-D4B02D" v-if="item.userDirection === 'BUY'">{{i18n.mrusdt}}</view>
			   <view class="f-D4B02D" v-if="item.userDirection === 'SELL'">{{i18n.mcusdt}}</view>
			   <view class="" v-if="item.status === 'NONPAYMENT'">{{i18n.wfk}}</view>
			   <view class="" v-if="item.status === 'PAYMENT'">{{i18n.yfk}}</view>
			   <view class="" v-if="item.status === 'FINISH'">{{i18n.ywc}}</view>
			   <view class="" v-if="item.status === 'CALLOFF'">{{i18n.yqx}}</view>
			</view>
			<view class="top-box">
			   <view class="f-000">{{i18n.dj}}：{{item.price}}US</view>
			   <view class="">{{i18n.sl}}：{{item.num}}</view>
			</view>
			<view class="top-box" style="margin-bottom: 0;">
			   <view class="">{{i18n.zje}}：{{item.num}}US</view>
			   <view class="">{{item.createTime|yndhms('M')}}</view>
			</view>
			<view style="height: 24rpx;"></view>
			<view class="f-line-10" style="margin: 0 -24rpx;"></view>
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
		computed:{
			i18n() {
				return this.$t("fack");
			},
		},
		methods: {
          getPath(item) {
			  uni.navigateTo({
			  	url: `/pages/fIattributes/place-order?order=`+item.id
			  })
		  }
		}
	}
</script>

<style lang="scss" scoped>
   .fabi-list {
	   margin: 0 24rpx;
	   .item {
		  margin-top: 24rpx;
		  .f-D4B02D {
			  color: #D4B02D;
			  font-size: 30rpx;
			  font-weight: 500;
		  }
		  .f-000 {
			  color: #000;
			  font-size: 30rpx;
			  font-weight: 500;
		  }
         .top-box {
			 display: flex;
			 align-items: center;
			 justify-content: space-between;
			 color: #1F222B;
			 font-size: 24rpx;
			 margin-bottom: 8rpx;
		}
		   
	   }
   }
</style>
