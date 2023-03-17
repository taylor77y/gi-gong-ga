<template>
	<view class="container">
		
		<head-title :title="i18n.xzhb" />
		<view class="search-input-box">
			<view class="f-search-icon">
				<view class="f-icon">
					<image class="f-icon-img" src="../../static/image/home/2.png" />
				</view>
				<view>
					<input v-model="search" placeholder-style="color: #9399A2;background: #EBECF0" class="search-input"
						:placeholder="i18n.qsrhb" />
				</view>
			</view>
		
		</view>
		<view class="tradable-box">
			{{i18n.nkjydfb}}
			<image src="../../static/image/fIattributes/36.png"></image>
		</view>
		<view class="currency-box">
			<view class="item" @click="onClick(index,item)" v-for="(item, index) in currentInfo" :key="index">
				<view>
					<text>{{item.currencyName}}</text>
				</view>
				<view >
					<image v-if="current === index" src="../../static/image/fIattributes/39.png"></image>
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
			   currentInfo: [],
			   lowCurrentInfo: []
			}
		},
		onLoad(e) {
           this.getCurConfigs();
		},
		computed: {
			i18n() {
				return this.$t("fack");
			},
			setFackCur() {
			   return this.$store.state.fackCur || {}	
			}
		},
		watch: {
		  	search() {
				this.search = this.search.replace(/\s+/g, "")
				this.currentInfo = this.lowCurrentInfo
				this.currentInfo = this.currentInfo.filter(item => item.currencyName.includes(this.search))
			}
		},
		methods: {
			onClick(index,item) {
				this.current = index
				this.$store.commit('setFackCur', item)
				uni.navigateBack();
			},
			getCurConfigs(){
				this.$u.api.fack.getCurrencyConfiguration().then(res=>{
					this.currentInfo = res.result
					this.lowCurrentInfo = res.result
					this.currentInfo.forEach((item, key) => {
						if (this.setFackCur.id === item.id) {
							this.current = key
						}
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.currency-box {
			// display: flex;
			// align-items: center;
			// justify-content: space-between;
			margin: 60rpx 24rpx;
			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #8D9099;
				font-size: 22rpx;
				margin-bottom: 60rpx;
				text {
					color: #1F222B;
					font-size: 30rpx;
					font-weight: bold;
					margin-left: 14rpx;
				}
				& image {
					width: 32rpx;
					height: 22rpx;
					
				}
			}
		}
		.tradable-box {
			display: flex;
			align-items: center;
			padding: 48rpx 0 24rpx 0;
			margin: 0 24rpx;
			border-bottom: 1px solid #F4F4F4;
			color: #8D9099;
			font-size: 28rpx;
			font-weight: 500;
			& image {
				width: 26rpx;
				height: 26rpx;
				margin-left: 14rpx;
			}
		}
		.search-input-box {
			background: #EBECF0;
			border-radius: 32rpx;
			margin: 0 24rpx;
		    
			.f-search-icon {
				display: flex;
				align-items: center;
				margin: 0 24rpx;
		
				.search-input {
					width: 600rpx;
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
	}
</style>
