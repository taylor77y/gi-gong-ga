<template>
	<view class="container">
		
		<head-title :title="i18n.skfs" />
		<view class="coll-list" v-for="(item,index) in list" :key="index">
			<view class="item">
				<view class="top-box">
				  <view class="f-000">{{ i18n.yhk }}</view>
				  <view class="">{{item.bankCard}}</view>
				</view>
				<view class="top-box">
				  <view class="f-000">{{ i18n.khh }}</view>
				  <view class="">{{item.bankName}}</view>
				</view>
			</view>
		</view>
		<u-empty v-if="list.length === 0" margin-top="290" :text="i18n.zwskfs" src="/static/image/erro/1.png" icon-size="240"></u-empty>
		<view class="coll-btn" @click="getPath()">
			{{ i18n.tjskfs }}
		</view>
	</view>
</template>

<script>
import th from '../../common/locales/th';
	export default {
		data() {
			return {
			   list: [],
			   check: false,
			   user:{}
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getUserInfo()
		},
		computed: {
			i18n() {
			    return this.$t("payment");
			}
		},
		
		methods: {
			getPath() {
				uni.navigateTo({
					url: `/pages/payment/select-collection?user=`+JSON.stringify(this.user)
				})
			},
			getUserInfo(){
				this.list = []
				let member = uni.getStorageSync('userId');
				this.$u.api.user.getMember(member).then(res => {
					console.log("用户信息",res)
					let info = res.result;
					if(info.bankName != '' && info.bankCard != ''){
						this.list.push(res.result)
						this.user = res.result;
						this.check = true;
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.coll-list {
			margin: 24rpx;
			.item {
				
				margin-bottom: 24rpx;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
				padding: 24rpx;
				border-radius: 10rpx;
				.f-000 {
				  color: #000;
				  font-size: 28rpx;
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
		.coll-btn {
			position: fixed;
			bottom: 81rpx;
			background: #F5D45C;
			border-radius: 6rpx;
			padding: 20rpx 0;
			color: #1F222B;
			font-size: 32rpx;
			font-weight: 500;
			width: 92%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 4%;
		}
	}
</style>