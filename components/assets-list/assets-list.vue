<template>
	<view class="f-assets-list">
		<view class="item" v-for="(item, index) in list" :key="index">
			<view class="left-img">
        <image :src="'../../' + 'static/image/symbol/'+(item.currency).toLowerCase()+'.png'" />
			</view>
			<view class="assets-cont">
				<view class="coin">
					<view class="left">{{item.currency}}</view>
					<view class="right">{{item.assetsBalance+item.assetsBlockedBalance | SubString(5)}}</view>
				</view>
<!--				<view class="tips">-->
<!--					United Arab Emirates...-->
<!--				</view>-->
				<view class="available-box">
					<view>{{ i18n.keyong }}</view>
					<view>{{ i18n.dongjie }}</view>
				</view>
				<view class="coin">
					<view class="right">{{item.assetsBalance | SubString(5)}}</view>
					<view class="right">{{item.assetsBlockedBalance | SubString(5)}}</view>
				</view>
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
		computed: {
			i18n() {
				return this.$t("assets")
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
 .f-assets-list {
	 .item {
		 display: flex;
		 border-bottom: 2rpx solid #F6F6F6;
		 padding: 32rpx 0;
		 &:last-child {
			 border-bottom: 0;
		 }
		 .left-img {
			 & image {
				 width: 48rpx;
				 height: 48rpx;
				 margin-right: 14rpx;
				 border-radius: 50%;
			 }
		 }
		 .assets-cont {
			 width: 100%;
			 margin-bottom: 6rpx;
			 .coin {
				 display: flex;
				 justify-content: space-between;
				 align-items: center;
				 color: #1F222B;
				 font-size: 30rpx;
				 .left {
					 
					 font-weight: bold;
				 }
			 }
			 //.tips {
				// margin-bottom: 12rpx;
				// color: #8D9099;
				// font-size: 22rpx;
			 //}
		 }
		 .available-box {
			 display: flex;
			 align-items: center;
			 justify-content: space-between;
			 color: #8D9099;
			 font-size: 22rpx;
		 }
	 }
 }
</style>
