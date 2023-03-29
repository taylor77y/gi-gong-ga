<template>
	<view class="page">
		<xl-header title="质押借币订单"/>
		<view class="order-list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="top">
					<view class="bro">
						借款
						<view class="num">
							{{item.borrowMoney}}
						</view>
						USDT
					</view>
					<view class="status">
						{{item.status}}
					</view>
				</view>
				<view class="bot">
					<view class="col">
						<view class="t">贷款币种</view>
						<view class="b">{{item.borrowName}}</view>
					</view>
					<view class="col">
						<view class="t">质押率</view>
						<view class="b">{{item.pledgeRate}}</view>
					</view>
					<view class="col">
						<view class="t">总负债</view>
						<view class="b">{{item.totalIncurDebts}}</view>
					</view>
				</view>
			</view>
		</view>
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
		margin: 20rpx 0;
		.top{
			color: #13d3eb;
			font-size: 28rpx;
			display: flex;
			justify-content: space-around;
			
			.bro{
				.num{
					color: #333;
					padding-left: 6rpx;
					font-size: 30rpx;
				}
			}
			.status{
				
			}
		}
		.bot{
			.col{
				display: flex;
				justify-content: space-around;
				.t{
					
				}
				.b{
					
				}
			}
		}
	}
}	
</style>
