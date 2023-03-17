<template>
	<view class="container">

		<head-title :title="' '" />
		
		<view class="con-box">
			<view class="title">{{ i18n.hl }}</view>
			<view class="search-input-box">
				<view class="f-search-icon">
					<view class="f-icon">
						<image class="f-icon-img" src="../../static/image/home/2.png" />
					</view>
					<view>
						<input v-model="search" placeholder-style="color: #9399A2;background: #F6F6F6" class="search-input"
							:placeholder="i18n.ssbz" />
					</view>
				</view>
			
			</view>
			<view class="item" @click="getPath(index)"
				v-for="(item, index) in listInfo" :key="index">
				<view class="left">
					<!-- <image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"></image> --> {{ item.currencyName + '(' + item.currencyName + ')'}}
				</view>
				<view class="right">
                    <view >
                    	<image v-if="current === index" src="../../static/image/fIattributes/39.png"></image>
                    </view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import th from '../../common/locales/th';
	export default {
		data() {
			return {
				search: '',
				current: 0,
				listInfo: []
			}
		},
		onLoad() {
			this.getHY()
		},
		computed: {
            i18n() {
                return this.$t("setting");
            }
		},

		methods: {
			getHY(){
				this.$u.api.fack.getCurrencyConfiguration().then(res=>{
					this.listInfo = res.result
					const rate = uni.getStorageSync('rate');
					this.listInfo.forEach((item, key) => {
						 if (item.id === rate.id) {
							 this.current = key
						 }
					})
				})
			},
			getPath(index) {
			   this.current = index
			   // uni.setStorageSync('rate', this.listInfo[index])
			   this.$store.commit('setRate', this.listInfo[index])
               uni.navigateBack(1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.search-input-box {
			background: #F6F6F6;
			border-radius: 32rpx;
			margin-top: 48rpx;
		    margin-bottom: 20rpx;
			.f-search-icon {
				display: flex;
				align-items: center;
				margin: 0 24rpx;
		
				.search-input {
					
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
		.con-box {
			margin: 0 24rpx;
         
			.title {
				font-size: 48rpx;
				color: #1F222B;
				font-weight: bold;
			}
            .f-border {
            	border-bottom: 1rpx solid #EBEBEB;
            }
			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 32rpx;
				color: #1F222B;
				padding: 30rpx 0;

				.left {
					display: flex;
					align-items: center;
					& image {
						width: 48rpx;
						height: 48rpx;
						margin-right: 14rpx;
						border-radius: 50%;
					}
				}

				.right {
					display: flex;
					align-items: center;
					color: #B0B3BA;
					font-size: 28rpx;

					& image {
						width: 32rpx;
						height: 22rpx;
					}
				}
			}
		}
	}
</style>
