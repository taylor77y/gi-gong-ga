<template>
	<view class="overflow-box">
		<view class="total d-flex-between-center">
			<view class="t-left">
        <text style="font-size: 30rpx"> Total assets (USDT)</text>
				<view class="left1" v-if="isInput" @click="getImg()">
					<image referrerpolicy="no-referrer" src="/static/image/my/2.png" />
				</view>
				<view class="left2" v-else @click="getImg()">
					<image referrerpolicy="no-referrer" src="/static/image/my/1.png" />
				</view>
			</view>
			 <view class="t-right" @tap="toPage">
				<image referrerpolicy="no-referrer" src="/static/image/my/3.png" />
			</view>
		</view>

		<view class="money">
<!--			{{ isInput ? '******':usdtPrice | SubString(5) }}-->
      {{ !isInput ? ' 999 ' : '*********' }}
		</view>
		<view class="zhehe">
<!--			{{ setRate.mark }}{{ isInput ? '******':usdtPrice * setRate.rate | SubString(5) }}-->
      {{ !isInput ? '≈ $ 99 ' : '*********' }}
		</view>

    <!-- 注册-->
    <view class="other-box">
      <view class="item" @click="getPath(index)" v-for="(item, index) in btnInfo" :key="index">
        <image :src="item.img"></image>
        {{ item.name }}
      </view>
    </view>

		<view class="line-hieght">
		</view>
		<!-- <view class="list-item">
			<view class="item" v-for="(item, index) in listBtn" :key="item.id" @click="zhm(item)">
				<view class="i-img">
					<image :src="item.img">
				</view>
				<view class="list-heig">{{ item.text }}</view>
			</view>
		</view> -->
		<!-- <view class="f-buy">
			<view class="left" @click="getZg()">
				<view class="title">
					{{ i18n.zjzh }}
				</view>
				<view>
					{{ i18n.ksljzjzh }}
				</view>
			</view>
			<view class="right">
				<image src="/static/image/home/bian.png" />
			</view>
		</view> -->
		<view class="asset-box">
			<view class="title">
				{{ i18n.zclb }}
			</view>
			<assets-list :list="balances" />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			balances:{
				type: Array,
				default: () => {
					return []
				}
			},
			cnyPrice:{
				type: Number,
				default: 0.00
			},
			usdtPrice:{
				type: Number,
				default: 999.99
			},
		},
		data() {
			return {
        btnInfo: [
          {name:'Deposit',img:'/static/image/assets/1.png',},
          {name:'Withdraw',img:'/static/image/assets/2.png',},
          {name:'Exchange',img:'/static/image/assets/3.png',},
        ],
				isInput: false,
				list: []
			}
		},
		computed: {
			i18n() {
				return this.$t("assets")
			},
			setRate() {
			   return this.$store.state.rate || {}
			},
			listBtn() {
			   return [{
					img: '/static/image/my/1-1.png',
					text: 'C2C',
					id: 1,
					path: '/pages/fIattributes/index'
				}, {
					img: '/static/image/my/1-2.png',
					text: this.i18n.listBtn[1],
					id: 2,
					path: '/pages/recharge/index?code=1'
				}, {
					img: '/static/image/my/1-3.png',
					text: this.i18n.listBtn[2],
					id: 3
				}, {
					img: '/static/image/my/1-4.png',
					text: this.i18n.listBtn[3],
					id: 4
				}]
				
			},
			// btnInfo() {
			// 	return this.i18n.btnInfo
			// }
		},
		onLoad() {

		},
		methods: {
			toPage(){
					  console.log('点击了')
					  uni.navigateTo({
					  	url:'/pages/exchangeHistory/exchangeHistory'
					  })
			},
			getPath(index) {
				// if (index === 0) {
				// 	this.getRechargeMethod()//后续判断是否有登录
				// 	return
				// }
        const temp = {
          0: `/pages/recharge/rechargeList`,
          1: `/pages/withDraw/withDraw`,
          2: `/pages/flashCash/index`,
        }
        uni.navigateTo({
          url: temp[index]
        })
			},
			// getRechargeMethod() {
      //   uni.navigateTo({
      //     url:'/pages/recharge/rechargeList'
      //   })
			// 			   const member = uni.getStorageSync('userId')
			// 			   this.$u.api.common.getRechargeMethod(member).then(res=>{
			// 			       if (res.status == "SUCCEED") {
			// 			       	uni.navigateTo({
			// 			       		 url: '/pages/recharge/index?code=1'
			// 			       	})
			// 			       } else {
			// 			       	this.$utils.showToast(res.errorMessage)
			// 			       }
			// 			   })
			// },
			// getZg() {
			// 	uni.navigateTo({
			// 		url: `/pages/recharge/index?code=2`
			// 	})
			// },
			getImg() {
				this.isInput = !this.isInput
			},
			zhm(item){
				if (item.path) {
					uni.navigateTo({
						 url: item.path
					})
				} else {
					this.$utils.showToast(this.$t('setting').zwkf)
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.overflow-box {
		.asset-box {
				
			.title {
				font-size: 34rpx;
				color: #1F222B;
				font-weight: 500;
				padding: 24rpx 0;
			}
		}
		.f-buy {
			background: linear-gradient(to right, #F6F6F6, #FBFBFB);
			border-radius: 8rpx;
			padding: 28rpx 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 40rpx;
		
			.left {
				color: #8D9099;
				font-size: 22rpx;

				.title {
					font-weight: 600;
					color: #000;
					font-size: 28rpx;
					margin-bottom: 10rpx;
				}
			}
		
			.right {
				& image {
					width: 84rpx;
					height: 92rpx;
				}
			}
		}
		.list-item {
			display: flex;
			align-items: center;
            margin: 48rpx 0;
			.item {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #1F222B;
				font-size: 28rpx;
				font-weight: 500;
                .list-heig {
					height: 80rpx;
					text-align: center;
				}
				.i-img {
					& image {
						width: 76rpx;
						height: 76rpx;
					}
				}
			}
		}

		.line-hieght {
			background: #F6F6F6;
			height: 10rpx;
			margin: 0 -24rpx;
		}

		.other-box {
			display: flex;
			align-items: center;
			margin: 32rpx 0;

			.item {
				width: 220rpx;
				height: 64rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #EBECF0;
				border-radius: 8rpx;
				font-size: 28rpx;
				color: #1F222B;
				margin-right: 20rpx;
        //
				//&:first-child {
				//	background: #F5D55A;
				//}
        & image {
          width: 40rpx;
          height: 40rpx;
          margin-right: 14rpx;
        }
				&:last-child {
					margin-right: 0;
				}
			}
		}

		.money {
			font-size: 52rpx;
			color: #1F222B;
			font-weight: bold;
		}

		.zhehe {
			display: flex;
			align-items: center;
      color: #00e1cc;
			// margin: 10rpx 0;

			& image {
				width: 26rpx;
				height: 26rpx;
				margin-left: 10rpx;
			}
		}

		.total {
			color: #707070;
			font-size: 24rpx;

			.t-left {
				display: flex;
				align-items: center;
        margin-bottom: 10rpx;

				.left1 {
          margin-left: 20rpx;
					& image {
						width: 32rpx;
						height: 12rpx;
					}
				}

				.left2 {
          margin-left: 20rpx;
					& image {
						width: 32rpx;
						height: 20rpx;
					}
				}
			}

			.t-right {
				& image {
					width: 38rpx;
					height: 38rpx;
				}
			}
		}
	}
</style>
