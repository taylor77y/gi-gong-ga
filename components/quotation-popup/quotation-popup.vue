<template>
	<u-popup v-model="IsShowPage" @close="onClose" mode="left" border-radius="40">
		<view class="cancel-box">
			<view class="title">
				{{ $t('common').quotation }}
			</view>
			<view class="search-input-box">
				<view class="f-search-icon">
					<view class="f-icon">
						<image class="f-icon-img" src="../../static/image/home/2.png" />
					</view>
					<view>
						<input v-model="search" placeholder-style="color: #9399A2;background: #F6F6F6" class="search-input"
							:placeholder="$t('common').search" />
					</view>
				</view>
			
			</view>
			<u-tabs bg-color="#fff" inactive-color="#8D9099" bar-height="8" bar-width="40" active-color="#D4B02D"
				:list="tagBtn" :is-scroll="false" :current="current" @change="change"></u-tabs>
			<view class="f-line-2"></view>
			<!-- <view class="f-name">
				<view class="left">
					名称 <text class="icons"></text>
				</view>
				<view class="right">
					<view style="margin-right: 24rpx;">
						最新价
						<text class="icons"></text>
					</view>
					<view>
						24h涨跌幅
						<text class="icons"></text>
					</view>
				</view>
			</view> -->
			<view class="list-item">
				<view class="item" v-for="(item, index) in list" :key="index" @click="getTo(item)">
					<view class="top">
						<view class="left">
							<text>{{item.tokenCur}}</text>
							<text>/{{item.mainCur}}</text>
							<text>3x</text>
						</view>
						<view class="right">
							{{item.price|SubString3(2,4)}}	
						</view>
					</view>
					<view class="lower">
						{{item.updown*100|SubString(2)}}%
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import th from '../../common/locales/th'
	/*
	 *@property { Boolean } showSpec 控制显/隐
	 * 
	 */
	export default {
		props: {
			showSpec: {
				type: Boolean,
				default: false
			},
			list:{
				type:Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				IsShowPage: false,
				search: '',
				current: 0
			}
		},
		computed: {
			tagBtn() {
				return [{
						name: 'USDT'
					},
					// {
					// 	name: 'BTC'
					// },
					// {
					// 	name: 'ETH',
					// },
				]
			},
		},
		watch: {
			showSpec(val) {
				this.IsShowPage = val

			}
		},
		methods: {
			getAdd() {
				
			   	
			},
			getTo(item){
				this.IsShowPage = !this.IsShowPage
				this.$emit("getTo",item)
			},
			change(e) {
				this.current = e
			},
			onClose() {
				this.$emit('update:showSpec', false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cancel-box {
		background: #FFFFFF;
		width: 620rpx;
		.list-item {
			margin: 30rpx 24rpx;
			.item {
				margin-bottom: 32rpx;
				.lower {
				    display: flex;
					justify-content: flex-end;
					align-items: center;
					color: #5EBA89;
					font-size: 22rpx;
				}
				.f-E45360 {
					color: #E45360;
				}
				.top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #1F222B;
					.left {
						display: flex;
						align-items: baseline;
						
						text:nth-of-type(1) {
							font-weight: bold;
							font-size: 32rpx;
							
						}
						
						text:nth-of-type(2) {
							color: #B7BCC2;
							font-size: 22rpx;
							margin: 0 10rpx;
						}
						
						text:nth-of-type(3) {
							
							background: #F7F4FA;
							border-radius: 2rpx;
							padding: 2rpx 5rpx;
							font-size: 24rpx;
							color:#D4B02D;
						}
					}
					.right {
						font-size: 30rpx;
						font-weight: bold;
					}
				}
			}
		}
		.f-name {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 10rpx 24rpx;
			color: #8D9099;
			font-size: 24rpx;
			.left {
				display: flex;
				align-items: center;
			}
			.right {
				display: flex;
				align-items: center;
				view {
					display: flex;
					align-items: center;
				}
			}
			.icons {
				display: flex;
				flex-direction: column;
				margin-left: 12rpx;
			}
				
			.icons::before {
				content: "";
				width: 0;
				height: 0;
				border-bottom: 10rpx solid #999;
				border-right: 8rpx solid transparent;
				border-left: 8rpx solid transparent;
				z-index: 9;
			}
				
			.icons::after {
				content: "";
				width: 0;
				height: 0;
				border-top: 10rpx solid #999;
				border-right: 8rpx solid transparent;
				border-left: 8rpx solid transparent;
				margin-top: 4rpx;
				z-index: 9;
			}
		}
		.search-input-box {
			background: #F6F6F6;
			border-radius: 32rpx;
			margin: 24rpx;
		
			.f-search-icon {
				display: flex;
				align-items: center;
				margin: 0 24rpx;
		
				.search-input {
					// width: 2rpx;
					height: 62rpx;
					line-height: 62rpx;
					font-size: 28rpx;
					color: #9399A2;
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
		.title {
			color: #1F222B;
			font-size: 48rpx;
			font-weight: 500;
			margin-top: 130rpx;
			padding: 0 24rpx;
		}
	}
</style>
