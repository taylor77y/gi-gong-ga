<template>
	<view class="page">
		<xl-header :title="i18n.zyjbdd"/>
		<view class="order-list">
			<view class="item" v-for="(item,index) in list" :key="index" @tap="toDetail(item)">
				<view class="top">
					<view class="bro">
						{{i18n.jk}}
						<view class="num">
							{{item.borrowMoney}} USDT
						</view>
					</view>
					<view class="status">
						{{ statusFilter(item.status) }}
					</view>
				</view>
				<view class="bot">
					<view class="col">
						<view class="t">{{i18n.dkbz}}</view>
						<view class="b">{{item.borrowName}}</view>
					</view>
					<view class="col">
						<view class="t">{{i18n.zyl}}</view>
						<view class="b">{{(item.pledgeRate || 0.00).toFixed(2)}}%</view>
					</view>
					<view class="col">
						<view class="t">{{item.zfz}}</view>
						<view class="b">{{item.totalIncurDebts}} USDT</view>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore status="nomore" :load-text="{nomore: i18n.ywcqbjz}" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			};
		},
		computed: {
			i18n() {
				return this.$t("pledgeIndex")
			}
		},
		onLoad() {
			this.getCountFundOrderByUserId()
		},
		methods: {
			statusFilter(status){
				if(status == 0){
					return this.i18n.jxz
				}else if(status == 1){
					return this.i18n.yjq
				}else if(status == 2){
					return this.i18n.qpjq
				}
			},
			toDetail(item){
				uni.navigateTo({
					url: '/pages/pledgeLoan/pledgeLoanOrderDetail?data=' + JSON.stringify(item)
				})
			},
			turnBack(){
				uni.navigateBack()
			},
			async getCountFundOrderByUserId(){
				let userId = uni.getStorageSync('userId')
				if (!userId) {
					this.$utils.showToast('请登录')
					return
				}
				let res = await this.$u.api.pledge.getCountFundOrderByUserId(userId)
				console.log('getCountFundOrderByUserId',res)
				if (res.status == "SUCCEED") {
					this.list = res.result
				}
			}
		}
	}
</script>

<style lang="scss">
.order-list{
	padding: 0rpx 30rpx;
	
	.item{
		background-color: #f6f6f6;
		border-radius: 10rpx;
		padding: 30rpx 20rpx;
		
		&:not(:first-child){
			margin: 20rpx 0;
		}
		
		.top{
			color: #13d3eb;
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;
			padding-bottom: 20rpx;
			border-bottom: 2rpx solid #e5e7ed;
			
			.bro{
				display: flex;
				.num{
					color: #333;
					padding-left: 6rpx;
					font-size: 29rpx;
				}
			}
			.status{
				
			}
		}
		.bot{
			display: flex;
			.col{
				flex: 1;
				display: flex;
				flex-direction: column;
				// justify-content: space-between;
				margin-top: 20rpx;

				.t{
					color: #868c9a;
				}
				.b{
					margin-top: 10rpx;
				}
			}
		}
	}
}	
</style>
