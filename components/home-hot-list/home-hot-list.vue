<template>
	<view class="home-hot-list">
		<view class="title">
			{{ title }}
			
		</view>
		<view class="like-list">
			<view class="like-list-item" @click="getPathDet(item.pairsName)" v-for="(item, index) in list" :key="index">
				<view class="d-flex-between-center f-title">
					{{item.pairsName}} <image :src=" baseUrl + item.image" />
				</view>
				<view :class="item.updown < 0 ? 'rate1' :'rate' ">{{item.updown*100|SubString(2)}}%</view>
				<view class="money">
					{{item.price|SubString(4)}}
				</view>
				<view class="equivalent">
					{{ setRate.mark }} {{item.price * setRate.rate |SubString(4)}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
				
			},
			title: {
				type: [String, Number],
				default: ''
			}
		},
		computed: {
		    setRate() {
		       return this.$store.state.rate || {}
		    }
		},
		data() {
			return {
				baseImg:"https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
				baseUrl:uni.getStorageSync('ossUrl')
			}
		},
		onLoad() {

		},
		methods: {
			// 跳转详情
			getPathDet(name) {
				uni.navigateTo({
					url: `/pages/kLine/index?name=${name}&code=0`
				})
				// uni.navigateTo({
				// 	url: temp[this.code]
				// })
			},
		}
	}
</script>

<style lang="scss" scoped>
	.home-hot-list {
		background: #fff;
		.title {
			font-size: 34rpx;
			color: #1F222B;
			font-weight: 500;
			margin-bottom: 14rpx;
		}

		.like-list {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding-bottom: 40rpx;
			border-bottom: 1rpx solid #F6F6F6;
			.like-list-item {
				padding: 20rpx;
                background: #FAFAFA;
				border-radius: 10rpx;
				margin-right: 2%;
				width: 32%;
				max-width: 227rpx;
				&:last-child {
					margin-right: 0rpx;
				}
				.f-title {
					color: #8D9099;
					font-size: 22rpx;
					margin-bottom: 40rpx;
					& image {
						width: 32rpx;
						height: 32rpx;
						border-radius: 50%;
					}
				}
				.rate {
					font-size: 22rpx;
					color: #5EBA89;
				}
				.rate1 {
					font-size: 22rpx;
					color: #E45360;
				}
				.money {
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}
				.equivalent {
					color: #8D9099;
					font-size: 22rpx;
				}
			}
		}
	}
</style>
