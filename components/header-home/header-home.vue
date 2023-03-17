<template>
	<view class="head-title">

		<navigator url="/pages/setting/setting">
			<view class="head-bg">
				<image src="../../static/image/home/1.png" style="width: 54rpx;height: 54rpx;"></image>
			</view>
		</navigator>
		<view class="search-input-box">
			<view class="f-search-icon">
				<view class="f-icon">
					<image class="f-icon-img" src="../../static/image/home/2.png" />
				</view>
				<view>
					<input v-model="search" placeholder-style="color: #9399A2;background: #F4F4F6" class="search-input"
						placeholder="BTC" />
				</view>
			</view>

		</view>
		<view class="right">
			<!-- <image src="../../static/image/home/3.png">
			<image src="../../static/image/home/4.png"> -->
			<image @click="goCustomer()" src="../../static/image/home/5.png">
			<!-- <image src="../../static/image/home/6.png"> -->
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				search: ''
			}
		},
		computed: {

		},
		watch: {
			search() {
				this.$u.throttle(async () => {
					
					// const Letter = new RegExp('[A-Za-z]+') //字母
					// let arr = this.newcoinQuotations
					// if (Letter.test(this.search)) {
					//         //字母搜索
					// 	this.coinQuotations = arr.filter(array => {
					// 	  let flag = false
					// 	  if (array.pairsName) {
					// 		let reg = new RegExp(this.search,'i') 
					// 		flag = array.pairsName.match(reg)
					// 	  }
					// 	  return flag
					// 	})
					//   }
				}, 200)	
				
			}
		},
		onLoad() {

		},
		methods: {
            goCustomer() {
				uni.navigateTo({
					url: `/pages/kefu/customerService?type=service`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head-title {
		display: flex;
		align-items: center;
		background: #fff;
		width: 100%;
		padding-top: 36rpx;

		.head-bg {
			width: 54rpx;
			height: 54rpx;
			background: #f4f4f6;
			border-radius: 50%;
		}
        .right {
		    display: flex;
			align-items: center;
			& image {
				width: 44rpx;
				height: 44rpx;
				margin-right: 20rpx;
			}
		}
		.search-input-box {
			background: #F4F4F6;
			border-radius: 32rpx;
			padding: 0 30rpx;
			margin-left: 20rpx;
            margin-right: 20rpx;
			.f-search-icon {
				display: flex;
				align-items: center;

				.search-input {
					width: 460rpx;
					height: 62rpx;
					line-height: 62rpx;
					font-size: 28rpx;
					color: #666;
					-webkit-touch-callout: none;
					-webkit-user-select: none;
				}

				.f-icon {
					margin-top: 8rpx;
					margin-right: 18rpx;

					& image {
						width: 36rpx;
						height: 36rpx;
					}
				}
			}

		}

	}
</style>
