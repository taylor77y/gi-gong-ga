<template>
	<view class="page" :class="{'night': isNight === true }">
		<u-row gutter="16" justify="space-between" class="header">
			<u-col span="6" class="left">
				<u-icon name="arrow-left" size="30" @click="turnBack"></u-icon>
				<view class="concact-icon" @click="showTypePopUp = !showTypePopUp">
					<image class="icon-img"
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFYSURBVHgB7dfhTcMwEIbhL4j/ZISM0A0wG9AJgAlgA8IEjAAdgQkIG8AGHqEbHHdqlbqt4zqNEl8qP5JVKYmqV6lrJ0CWZS0iKnlUmNgVhvngUWEu+A6/04bBHHDoK+0YaHcQrD+aA5/pmIFWHPdAfgYacdiCuhlM7OSSt12Hv6FIMNoJLqFI0XXCCa4Qtt6OsXwVRfHiHrj2XSXbM+KCRYlxf4mbwwNH06NncBK+OS3PEwsothctzxP8cQ/l2jnNwRIrd7iBLn/IsgvX7oiU4F0v0pp3xL0d142WDcVAF8vjjqOte3Doi+2YLDzBQmu0TIelL1hojZbg366TGqOfOLgJXeA+mq54/GA8tzj9R3/j4E9owatTTWF17HdpmR5yh+vYizVEr/oEi9TRDQc/oqeU0bKkLXGGVNEWm7X4rLf4FNEWHdtzrKmjLQYGiymjg88TWZbNzD/6++dHtzeCtQAAAABJRU5ErkJggg=="
						mode=""></image>
					<text>{{currentBiType.name}}</text>
				</view>
			</u-col>
			<u-col span="6" class="right">
				<span @click="isNight = !isNight" class="icon-span">
					<image class="icon-img" v-if="isNight" src="../../static/image/dayOrNight/day.png" mode=""></image>
					<image class="icon-img" v-else src="../../static/image/dayOrNight/night.png" mode=""></image>
				</span>
				<u-icon name="star-fill" size="30" class="uicon" :class="{'cang': isStar === true}"
					@click="isStar=!isStar"></u-icon>
				<u-icon name="order" size="30" class="uicon" @click="turnTo"></u-icon>
			</u-col>
		</u-row>
		<!-- 左侧弹窗 -->
		<u-popup v-model="showTypePopUp" mode="left" border-radius="14">
			<view class="popup-container">
				<!-- 表头 -->
				<u-row gutter="16" class="row-title">
					<u-col span="6">Name</u-col>
					<u-col span="6" class="right-col">Last price / 24H change</u-col>
				</u-row>
				<!-- 数据 -->
				<u-row gutter="16" v-for="(item, index) in realTimeList" :key="index" class="row" @click="change(item)">
					<u-col span="6">
						<view class="label">{{item.name}}</view>
						<view class="perpetual">Perpetual</view>
					</u-col>
					<u-col span="6" class="right-col">
						<view class="price">{{item.close}}</view>
						<view class="num text-green" :class="{'text-red': item.change_ratio < 0}">{{item.change_ratio}}%
						</view>
					</u-col>
				</u-row>
			</view>
		</u-popup>
		<u-row :gutter="16" justify="space-between" class="tab">
			<u-col span="6" @click="activetedTab='0'">
				<view class="mb-20 bnt" :class="{'bnt-primary': activetedTab === '0'}">{{i18n.yxhy}}</view>
			</u-col>
			<u-col span="6" @click="activetedTab='1'">
				<view class="mb-20 bnt" :class="{'bnt-primary': activetedTab === '1'}">{{i18n.jghy}}</view>
			</u-col>
		</u-row>

		<view class="container">
			<u-row gutter="16" justify="space-betweent">
				<u-col span="5">
					<text class="font-30 text-green">{{currentBiType.close}}</text>
					<p>
						<span class="mr-10">≈ ${{currentBiType.close}}</span>
						<span class="text-green"
							:class="{'text-red': currentBiType.change_ratio < 0}">{{currentBiType.change_ratio}}%</span>
					</p>
					<view class="label mt-10">{{i18n.bjjg}} {{currentBiType.open}}</view>
				</u-col>
				<u-col span="7">
					<u-row gutter="16">
						<u-col span="6" class="right-col mb-20">
							<view class="label">24h{{i18n.zgj}}</view>
							<view class="num">{{currentBiType.high}}</view>
						</u-col>
						<u-col span="6" class="right-col mb-20">
							<view class="label">24h{{i18n.cjl}}(BTC)</view>
							<view class="num">{{currentBiType.amount}}</view>
						</u-col>
						<u-col span="6" class="right-col mt-20">
							<view class="label">24h{{i18n.zdj}}</view>
							<view class="num">{{currentBiType.low}}</view>
						</u-col>
						<u-col span="6" class="right-col mt-20">
							<view class="label">24h {{i18n.cje}}(U)</view>
							<view class="num">{{currentBiType.volume}}</view>
						</u-col>
					</u-row>
				</u-col>
			</u-row>
			<!-- 图表 -->
			<view class="echart mt-20">
				<view class="charts-box">
					<!-- k线图 -->
					<my-klinechart :themeVal="theme" :activetedTime="activetedTime" :applyNewData="klineData" @changeTime="changeTime">
					</my-klinechart>
				</view>
			</view>
		</view>
		<view class="bg-black" :style="{backgroundColor: isNight ? '#1e2030' : '#eaedf2'}"></view>
		<!-- 列表数据 -->
		<view class="list-tab">
			<u-tabs :list="tabList" :scrollable="false" active-color="#2979ff" inactive-color="#868c9a" :current="currentIndex"
			 @change="tabClickHanlder" />
			 <u-line style="position:relative;bottom: 6rpx;"></u-line>
			<swiper :current="currentIndex">
				<swiper-item>
					<scroll-view :scroll-y="true">
						<u-row gutter="16" justify="space-betweent">
							<!-- 左边列表数据 -->
							<u-col span="6">
								<!-- 头部标题 -->
								<view class="text-gray mb-20">
									<view class="title">Buy</view>
									<u-row gutter="6">
										<u-col span="6" style="padding: 0;">
											<p>Price(USDT)</p>
										</u-col>
										<u-col span="6" class="right-col">
											<p>Number(BTC)</p>
										</u-col>
									</u-row>
								</view>
								<u-row gutter="16" v-for="(item,index) in leftList" :key="index" justify="space-betweent"
									class="list-row">
									<u-col span="6">
										<text>{{item.price}}</text>
									</u-col>
									<u-col span="6" class="text-green right-col">
										<text>{{item.amount}}</text>
									</u-col>
								</u-row>
							</u-col>
							<!-- 右边列表数据 -->
							<u-col span="6">
								<!-- 头部标题 -->
								<view class="text-gray mb-20">
									<view class="title">Sell</view>
									<u-row gutter="6">
										<u-col span="6" style="padding: 0;">
											<p>Price(USDT)</p>
										</u-col>
										<u-col span="6" class="right-col">
											<p>Number(BTC)</p>
										</u-col>
									</u-row>
								</view>
								<u-row gutter="16" v-for="(item, index) in rightList" :key="index" justify="space-betweent"
									class="list-row">
									<u-col span="6"><text>{{item.price}}</text></u-col>
									<u-col span="6" class="text-red right-col">
										<text>{{item.amount}}</text>
									</u-col>
								</u-row>
							</u-col>
						</u-row>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view :scroll-y="true">
						<u-row gutter="16" justify="space-between" class="list-row text-gray">
							<u-col span="3">Time</u-col>
							<u-col span="3">Direction</u-col>
							<u-col span="3">Price(USDT)</u-col>
							<u-col span="3">Number(btc)</u-col>
						</u-row>
						<u-row gutter="16" v-for="(item,index) in dealData" :key="index" justify="space-between"
							class="list-row">
							<u-col span="3">{{item.current_time}}</u-col>
							<u-col span="3" class="text-green" :class="{'text-red': item.direction === 'sell' || item.direction === 'Sell'}">
								{{item.direction}}
							</u-col>
							<u-col span="3" class="text-green" :class="{'text-red': item.direction === 'sell' || item.direction === 'Sell'}">
								{{item.price}}
							</u-col>
							<u-col span="3" >{{item.amount}}</u-col>
						</u-row>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<tool-bar class="mt-20"/>
	</view>
</template>

<script>
	import toolBar from "./tool-bar.vue"
	import socket from '../../common/ws/socket.js'
	import { getData } from '@/common/hooks/socketData.js'
	export default {
		components: {
			toolBar
		},
		data() {
			return {
				isNight: true,
				currentBiType: { // 当前的 币值数据
					name: 'BTC/USDT'
				},
				showTypePopUp: false,
				realTimeList: [{
					"volume": "107700034.89",
					"symbol": "btc",
					"high": "25147.28",
					"amount": "4383.12",
					"low": "23895.24",
					"name": "BTC/USDT",
					"change_ratio": -2.35,
					"close": "24295.14",
					"current_time": "2023-03-16 11:21:08",
					"open": "24880",
					"ts": 1678936868318
				}, ],
				interval: null,

				isStar: false, // 收藏
				activetedTab: '0',

				activetedTime: { name: 'Line',value: '1min',	time: 1 }, // 图表选项
				klineData: [],

				currentIndex: 0,
				
				socketObj: null,
				socketObj1: null,
				interval1: null,
					
				leftList: [],
				rightList: [],
				dealData: [],
			}
		},
		computed: {
			theme() {
				return !this.isNight ? 'light' : 'dark';
			},
			i18n() {
				return this.$t("trendDetails")
			},
			tabList() {
				return [
					{ name: this.i18n.wtdd},
					{ name: this.i18n.zxjy}
				];
			},
			getMotBntList() {
				return [this.i18n.qb, this.i18n.yhk, this.i18n.xnhb, this.i18n.wx, this.i18n.zfb, this.i18n.pp, this.i18n
					.xlhk, this.i18n.sgjhk, this.i18n.qt
				]
			}
		},
		watch: {
			showTypePopUp(val) {
				if (val == true) {
					console.log(val)
					this.interval = setInterval(() => {
						this.getRealtime()
					}, 2000)
				} else {
					console.log(val)
					clearInterval(this.interval);
					this.interval = null;
				}
			}
		},
		onReady() {},
		onHide() {
			clearInterval(this.interval)
			this.interval = null
			clearInterval(this.interval1)
			this.interval1 = null
		},
		created() {
			this.$u.api.trendDetails.getRealtime().then(res => {
				this.currentBiType = res.data[0]
			});
			this.getKlineData()
			if(this.socketObj || this.socketObj1){
				this.socketObj = null
				this.socketObj1 = null
				this.socketObj.destroy();
				this.socketObj1.destroy();
			}
			this.getSocketData()
		},
		methods: {
			// 获取类型的币值 实时数据
			async getRealtime() {
				this.$u.throttle(async () => {
					const {
						code,
						data
					} = await this.$u.api.trendDetails.getRealtime();
					if (code == '0') {
						this.realTimeList = data
					}
				}, 2000)
			},
			turnBack() {
				uni.navigateBack()
			},
			turnTo() {
				uni.navigateTo({
					url: '/pages/trendDetails/history'
				})
			},
			change(item) {
				this.currentBiType = item
				this.showTypePopUp = false
			},
			async tabClickHanlder(val) {
				this.currentIndex = val
				
				this.socketObj ? await this.socketObj.destroy() :null;
				this.socketObj1 ? await this.socketObj1.destroy() :null;
				clearInterval(this.interval1)
				this.interval1 = null
				if(val === 0) this.getSocketData();
				else this.getDealData();
			},
			// 图表时间 改变
			changeTime(time) {
				this.activetedTime = time
				this.getKlineData(this.currentBiType.symbol, this.activetedTime.value)
			},
			changeType(type) {
				this.activetedType = type
			},
			// 获取Socket的数据
			getSocketData() {
				this.socketObj = new socket('wss://thasjhdhjg.site/data/websocket/3/btc')
				this.socketObj.doOpen()
				this.interval1 = setInterval(()=> {
					let {code, data} = getData()
					if(code == '0') {
						this.leftList = data.asks
						this.rightList = data.bids
					}
				}, 3000)
			},
			// 获取Socket last deal 的数据
			getDealData() {
				this.dealData = [];
				this.socketObj1 = new socket('wss://thasjhdhjg.site/data/websocket/2/btc')
				this.socketObj1.doOpen()
				this.interval1 = setInterval(()=> {
					let { data } = getData()
					this.dealData = data.data
				}, 3000)
			},
			// 获取 图表数据
			async getKlineData(symbol = 'btc', line = '1min') {
				const {
					code,
					data
				} = await this.$u.api.trendDetails.getKline(symbol, line);

				if (code == 0) {
					this.klineData = data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background: #fff;
		width: 100%;
		height: 100%;

		.header {
			display: flex;
			padding: 20rpx 10rpx;

			.concact-icon {
				display: inline-block;
				margin-left: 30rpx;
			}

			.right {
				text-align: right !important;

				.uicon {
					padding: 0 10rpx;
				}

				.cang {
					color: #fcd436;
				}
			}
		}

		.icon-img {
			width: 30rpx;
			height: 30rpx;
			margin: 0 10rpx;
		}

		.icon-span {
			.icon-img {
				width: 33rpx;
				height: 33rpx;
				position: relative;
				top: 6rpx;
			}
		}

		.popup-container {
			padding: 20rpx;

			.row-title {
				color: #868c9a;
			}

			.row {
				margin: 30rpx 0;
			}

			.perpetual {
				color: #868c9a;
			}

			.label {
				font-weight: bolder;
			}
		}

		.tab {
			.bnt {
				width: 100%;
				margin-top: 20rpx;
				border: 5rpx solid #eaedf2;
				border-radius: 14px;
				color: #868d9a;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.bnt-primary {
				background: #2c78f8;
				color: #fff;
				border: none;
			}
		}

		.container {
			padding: 0 20rpx;

			.font-30 {
				font-size: 70rpx;
			}

			.label {
				color: #868c9a;
				font-size: 12px;
			}

			.num {
				font-size: 12px;
				margin-top: 10rpx;
			}
		}

		.echart {
			width: 100%;

			.time-options {
				width: 100%;
				font-size: 12px;
				font-weight: 400;

				.time-row {
					text-align: center;
				}
			}

			.charts-box {
				width: 100%;
				min-height: 350rpx;
				height: auto;
			}
		}

		.list-tab {
			font-size: 12px;
			padding-bottom: 100rpx;
			padding: 20rpx 10rpx;

			::v-deep .u-tabs {
				background: inherit !important;
			}
			uni-swiper {
				min-height: 600px;
				padding-bottom: 100px;
			}
			
			.title {
				font-size: 16px;
			}

			.list-row {
				height: 60rpx;
				line-height: 60rpx;
			}
		}
	}

	.right-col {
		text-align: right !important;
	}

	.text-green {
		color: #2ebd85;
	}

	.text-gray {
		color: #868c9a;
	}

	.text-red {
		color: #f6465d;
	}

	.bg-black {
		background-color: #eaedf2;
		width: 100%;
		height: 10px;
		margin: 0;
		padding: 0;
	}

	.night {
		background: #1e2030;
		color: #fff;

		.bnt {
			border-color: #444b58;
		}
	}
</style>
