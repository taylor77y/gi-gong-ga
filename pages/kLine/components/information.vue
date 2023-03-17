<template>
	<view class="container">
		<view class="tips">
			<view class="t-img">
				<image src="../../../static/image/recharge/5.png">
			</view>
			<view class="t-cont">
				数据由CoinMarketCap提供，仅供参考。按照此基础呈现， 不作为任何形式的代表或担保。 
				<text>可参考风险提示。</text>
			</view>
		</view>
		<view class="b-title">
			<image src="../../../static/image/recharge/5.png"> Dogecoin
		</view>
		<view class="list" v-for="(item, index) in list" :key="index">
			<view class="left">
				{{ item.name }}
			</view>
			<view class="right" :class="{ 'f-B0B3BA': index === 0 }" v-if="index < list.length -1 ">
				{{ item.value }}
			</view>
			<view class="right f-F2C95A" v-else>
				{{ item.value }}
			</view>
		</view>
		<view class="list">
			<view class="left">
				简介
			</view>
			
		</view>
		<view>
			狗狗币(Dogecoin)，有人称作“狗币”诞生于2013年12月8日，基于Scrypt算法，是目前国际上很常用的数字货币，数字货币是民间发起的全球通用货币，不属于某个国家，是属于全人类，具有全球转帐速度快的优点，如几秒内就可以把钱由国内汇到美国，且费用低廉，并且总量不会像法币一样随意增发，总量相对稳定。 狗币自有一套策略，它并不走比特币的嫌钱路线，而是很好地利用了美国的“小费文化”。这种被视作是对服务者的捐赠或跪拜的谦卑姿态，也在互联网上广泛使用。比起昂贵的比特币，狗币门槛更低，而且更“萌”，系统上线一
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			
		},
		data() {
			return {
				list: [
					{ name: '排行', value:'No.8' },
					{ name: '市值', value:'$9,368,457,279' },
					{ name: '流通数量', value:'9,368,457,279' },
					{ name: '最大供给量', value:'-----' },
					{ name: '总量', value:'9,368,457,279' },
					{ name: '发行日期', value:'2013-12-13' },
					{ name: '发行价格', value:'-----' },
					{ name: '区块链浏览器', value:'dogeahain.info' }
				]
			}
		},
		computed: {
			i18n() {
				return this.$t("assets")
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		margin: 24rpx;
		.f-B0B3BA {
			color: #B0B3BA !important;
		}
		.f-F2C95A {
			color: #F2C95A !important;
		}
		.list {
			display: flex;
			align-items: center;
			font-size: 28rpx;
			margin-bottom: 48rpx;
			.left {
			    color: #8D9099;	
			}
			.right {
				color: #1F222B;
				font-weight: 600;
				margin-left: auto;
			}
		}
		.tips {
			display: flex;
			color: #B0B3BA;
			font-size: 24rpx;
			text {
				color: #D4B02D;
				font-weight: 600;
				display: block;
			}
			.t-img {
				width: 36rpx;
				image {
					width: 26rpx;
					height: 26rpx;
				}
			}
			.t-cont {
				flex: 1;
			}
		}
		.b-title {
			display: flex;
			align-items: center;
			color: #1F222B;
			font-size: 38rpx;
			margin: 40rpx 0 22rpx 0;
			& image {
				width: 46rpx;
				height: 46rpx;
				margin-right: 20rpx;
			}
		}
	}
</style>
