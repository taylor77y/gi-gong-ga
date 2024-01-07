<template>
	<view class="left">
		<view class="d-flex-between-center">
			<view>{{ i18n.shuliang }}</view>
			<view>{{ i18n.jiage }}</view>
		</view>
		<view class="d-flex-between-center" style="margin-bottom: 10rpx;">
		</view>
		<right-area :code="0" :openup="buyData" />
		<view class="money">
			{{price || 0}}
		</view>
		<view class="zhehe">
			≈{{ setRate.mark }}{{ price * setRate.rate |SubString(4) }}
		</view>
		<right-area :code="1" :openup="sellData" />
		<!-- <view class="d-flex align-items-center">
			<view class="left-input d-flex-between-center" @click="getLever()">
				<view style="transition: all 0.3s;" :class="{'r-icon1' : magnification}">
					<image src="../../static/image/new/6.png" />
				</view>
			</view>
			<view>
				<image style="width: 52rpx;height: 52rpx;" src="../../static/image/new/10.png" />
			</view>
		</view> -->
	</view>
</template>

<script>
	let ws = null
	export default {
		name:"socket-data",
		data() {
			return {
				buyData: [{},{},{},{},{}],
				sellData: [{},{},{},{},{}],
				nowData: {},
				// setRate: {},
				price: 0,
				magnification: false
			};
		},
		props: {
			symbol: {
				type: String,
				default: ''
			}
		},
		created() {
			/// 这个傻逼尽然用两个socket链接，不知道用一个链接多个房间吗？！！！！
			const symbol = String(this.symbol).toLowerCase()
			const url = `wss://hajhiug.com/data/websocket/1/${symbol}`
			const socket = uni.connectSocket({ url })
			ws = new WebSocket(`wss://hajhiug.com/data/websocket/3/${symbol}`)
			ws.onopen = (e) => {}
			ws.onmessage = e => { // 拿行情
				let { data } = e
				data = JSON.parse(data) 
				const _data = data.data
				this.buyData = _data.bids.slice(0,5)
				this.sellData = _data.asks.slice(0,5)
			}
			uni.onSocketMessage(e => { // 拿价格
				const res = JSON.parse(e.data)
				const { data } = res
				const { close } = data[0]
				// console.log(data)
				this.price = close
				this.$emit('price', data[0])
			})
		},
		destroyed() {
			// console.log('before dest')
			uni.closeSocket({
				// reason: '1000',
				success: function(res) {
					console.log("WebSocket关闭成功！");
				},
				fail: function(res) {
					console.log("WebSocket关闭失败！");
				}
			});
			ws.close()
		},
		computed: {
			i18n() {
				return this.$t("financial")
			}, 
			setRate() {
				return this.$store.state.rate || {}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.r-icon1 {
		transform: rotate(180deg);
		transform-origin: center center;
	}
	.left {
		width: 290rpx;
		font-size: 24rpx;
		color: #707070;
		margin-right: 28rpx;
	
		.money {
			font-size: 30rpx;
			color: #5EBA89;
			font-weight: bold;
			margin-top: 20rpx;
			text-align: center;
		}
	
		.zhehe {
			font-size: 26rpx;
			color: #1F222B;
			margin-top: 4rpx;
			margin-bottom: 20rpx;
			text-align: center;
		}
	
		.left-input {
			background: #F6F6F6;
			border-radius: 6rpx;
			padding: 10rpx 24rpx;
			width: 208rpx;
			margin-right: 10rpx;
	
			& image {
				width: 18rpx;
				height: 10rpx;
			}
		}
	}
</style>