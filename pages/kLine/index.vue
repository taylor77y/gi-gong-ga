<template>
	<view class="container">
		<k-head-title :title="name" @onSwitch="showSpec = true" />

		<view class="top-box">
			<view class="left">
				<view class="money">
					{{json.last |SubString(4)}}
				</view>
				<view class="conversion">
					≈{{ setRate.mark }} {{json.last * setRate.rate |SubString(4)}}
					<text class="f-E45360">{{computRate(json)|SubString(2)}}%</text>
				</view>
			</view>
			<view class="right">
				<view class="top">
					<view>
						<view>{{ i18n.zgj }}</view>
						<view class="num">
							{{json.high24h}}
						</view>
					</view>
					<view>
						<view>24h</view>
						<view class="num">
							{{json.volume | SubString(2)}}
						</view>
					</view>
				</view>
				<view class="top">
					<view>
						<view>24h{{ i18n.zdj }}</view>
						<view class="num">
							{{json.low24h}}
						</view>
					</view>
					<!-- <view>
						<view>24h成交量(BNB)</view>
						<view class="num">
							114,074.74
						</view>
					</view> -->
				</view>
			</view>
		</view>
<!--		<view class="list-time">-->
<!--			<view :class="{ 'f-1F222B':timeCode === index }" @click="getTime(index)" v-for="(item, index) in listTime"-->
<!--				:key="index">-->
<!--				{{ item }}-->
<!--			</view>-->
<!--		</view>-->
		<view class="charts-box">
<!--			<qiun-data-charts v-if="isLine" type="candle" :opts="{xAxis: {scrollAlign: 'right'}, extra:{tooltip:{showCategory:true}}}" :ontouch="true"-->
<!--				:canvas2d="true" :onzoom="true" canvasId="klineid" :chartData="chartsDataCandle1"/>-->
      <!-- k线图 -->
      <my-kline-chart  :activetedTime="activetedTime" :applyNewData="klineData" @changeTime="changeTime">
      </my-kline-chart>
		</view>
	
		
		<view class="f-line-10"></view>
<!--		<u-tabs bg-color="#fff" inactive-color="#8D9099" bar-height="8" bar-width="40" active-color="#D4B02D"-->
<!--			:list="tagBtn" :is-scroll="false" :current="current" @change="change"></u-tabs>-->

		<view class="f-line-2"></view>
		<view v-if="current === 0">
			<view class="list-name">
<!--				<view>{{ i18n.buy }}</view>-->
<!--				<view>{{ i18n.sell }}</view>-->
				<view class="r-icon" @click="numCode = true">
					{{ num }}
					<image :class="{'r-icon1' : numCode}" src="../../static/image/k-line/6.png" />
				</view>
			</view>
			<view class="list">
				<view>
					<k-list :code="0" :max-buy="maxBuy" :openup="buyData" />

				</view>
				<view>
					<k-list :code="1" :max-buy="maxSell" :openup="sellData" />
				</view>
			</view>
		</view>
		<view v-if="current === 1">
			<u-row gutter="5" class="cur-2">
				<u-col span="3">{{ i18n.sj }}</u-col>
				<u-col span="2" text-align="right" class="center_text">{{ i18n.fx }}</u-col>
				<u-col span="4" text-align="right" class="center_text">{{ i18n.jg }}{{ '('+name.split('/')[1]+')'}}
				</u-col>
				<u-col span="3" text-align="right" class="right_text" v-if="code !=='0'">{{ i18n.sl }}
				</u-col>
				<u-col span="3" text-align="right" class="right_text" v-else>{{ i18n.sl }}({{ name.split('/')[0]}})
				</u-col>
			</u-row>
			<view class="dealList">
				<u-row v-show="chengjiaoData.length>0" gutter="4" class="cur-2" v-for="(item,i) in chengjiaoData"
					:key="i">
					<u-col span="4">{{item.time | hms}}</u-col>
					<u-col v-show="item.tradeType=='OPEN_UP'" span="2" class="center_text green_text">
						{{ i18n.mairu }}
					</u-col>
					<u-col v-show="item.tradeType=='OPEN_DOWN'" span="2" class="center_text orange_text">
						{{ i18n.maichu }}
					</u-col>

					<u-col span="3" text-align="right" class="a_right">{{item.price|toFixed(4)}}</u-col>

					<u-col text-align="right" v-if="code !=='0'" span="3" class="right_text">{{item.count-0}}</u-col>
					<u-col text-align="right" v-else span="3" class="right_text">{{item.count | toFixed(2)}}</u-col>
				</u-row>
				<view v-show="chengjiaoData.length==0">
					<u-empty :text="i18n.zwgdsj" mode="list"></u-empty>
				</view>
			</view>
		</view>
		<transaction v-if="current === 2" />
		<information v-if="current === 3"/>
		<view style="height: 130rpx;"></view>
		<view class="footer-box">
			<!-- <view class="f-other" @click="getTips">
				<image src="../../static/image/k-line/8.png" />
				<view>{{ i18n.gd }}</view>
			</view>
			<view class="f-other" @click="getTips">
				<image src="../../static/image/k-line/9.png" />
				<view>{{ i18n.tx }}</view>
			</view>
			<view class="f-other" @click="getTips">
				<image src="../../static/image/k-line/10.png" />
				<view>{{ i18n.wg }}</view>
			</view> -->
			<view class="f-btn" @click="addBay()">
				{{ btnName[code].left }}
			</view>
			<view class="f-btn f-btn1" @click="addSell()">
				{{ btnName[code].right }}
			</view>
		</view>
		<u-action-sheet :cancel-text="$t('fack').qx" @click="onClickNum" :list="numInfo" v-model="numCode">
		</u-action-sheet>
		<quotation-popup :list="pairs" @getTo="getTo" :show-spec.sync="showSpec" />
		
	</view>
</template>

<script>
	// 开盘 收盘 最高 最低
	import th from '../../common/locales/th'
	import socket from "../../common/ws/socket.js";
    import uCharts from '../../js_sdk/u-charts/u-charts';
    import transaction from "./components/transaction.vue"
	import information from "./components/information.vue"
  import { getData } from '@/common/hooks/socketData.js'
  import myKlineChart from "./components/my-klinechart.vue";
	export default {
		components: {
			transaction,
			information,
      myKlineChart
		},
		data() {
			return {
        currentBiType: { // 当前的 币值数据
          name: 'BTC/USDT'
        },
        symbol:'btc',
        activetedTime: { name: 'Line',value: '1min',	time: 1 }, // 图表选项
        klineData: [],
				json: {},
				isLine: false,
				// 截取后长度
				buyData: [],
				sellData: [],
				maxBuy: 10,
				maxSell: 10,
				socket: null,
				timeCode: 0,
				code: '0', // 0 是跳转币币 1 是永续 2是交割
				pairs: [],
				showSpec: false,
				num: 0.1,
				numCode: false,
				numInfo: [{
					text: '0.1'

				}, {
					text: '0.2',

				}],
				current: 0,
				name: '',
				chartsDataCandle1: {
					"categories": [],
					"series": [{
						"name": "上证指数",
						"data": []
					}]
				},
				time: '15m',
				timer: null,
				chengjiaoData: [],
				scrollLoadingStatus:false,
        timerVal: null,
			}
		},
		filters: {

		},
		onHide() {
			if (this.timer) { //注销定时器
				console.log('注销定时器')
				clearInterval(this.timer);
				this.timer = null;
        this.timerVal = null;
			}
			// this.$store.state.socket.removeListener('daymarket')
		},
		onUnload() {
			if (this.timer) { //注销定时器
				console.log('注销定时器')
				clearInterval(this.timer);
				this.timer = null;
        this.timerVal = null;
			}
			// this.$store.state.socket.removeListener('daymarket')
		},
    watch:{
      chartsDataCandle1: {
        handler(newVal, oldVal) {
        },
        deep: true,
      },
    },
		onLoad(e) {
      console.info("🇨🇳🇨🇳:e --", e)
      this.$u.api.trendDetails.getRealtime().then(res => {
        this.currentBiType = res.data[0]
      });
      this.symbol = e.name.split('/')[0].toLowerCase() || ''
      // this.getKlineData()
			if (e && e.name) {
				this.name = e.name || ''
				this.code = e.code || '0'
				this.getPairsList()
				this.getInfo()
				this.timer = setInterval(() => {
					this.getInfo()
          this.getKlineData()
				}, 3000);
			}
      this.socket = new socket("wss://thasjhdhjg.site/data/websocket/3/"+this.name.split('/')[0].toLowerCase())
			this.socket.doOpen();
			this.socket.on("open", () => {
				this.socket.send("PING");
				this.socket.send(`initEntrust-${this.name}`);
				this.handleData(1)
			});
			this.socket.on("message", this.onMessage);
			
		},
		beforeDestroy() {
			this.socket.toClose();
		},
		computed: {
			i18n() {
				return this.$t("kLine")
			},
			btnName() {
				return this.i18n.btnName
			},
			setRate() {
				return this.$store.state.rate || {}
			},
			tagBtn() {
				return this.i18n.tagBtn
			},
			listTime() {
				return this.i18n.listTime
			}
		},
		methods: {
      //计算比例:
      computRate(item){
        // console.log('computRate',rate)
        return (item.last - item.open24h) / item.open24h * 100
      },
      // 获取 图表数据

      async getKlineData(symbol = this.symbol, line = '1min') {
        const {status,result} = await this.$u.api.newData.trend(symbol, '15m',   2000);
        // console.info("🇨🇳🇨🇳:result --", result)
        const modifiedData = result.map(obj => ({
          timestamp: Number(obj[0]),//时间戳
          open: Number(obj[1]),//开盘价
          high: Number(obj[2]),//最高价
          low: Number(obj[3]),//最低价
          close: Number(obj[4]),//收盘价
          volume: Number(obj[5])//成交量
        }));
        // console.info("🇨🇳🇨🇳:modifiedData --", modifiedData)
          this.klineData = modifiedData
        // }
      },

      // 图表时间 改变
      changeTime(time) {
        this.activetedTime = time
        this.getKlineData(this.currentBiType.symbol, this.activetedTime.value)
      },
			getTips() {
				this.$utils.showToast(this.$t('setting').zwkf)
			},
      //币总价详情预览
			getInfo() {
				// this.$u.api.common.getCoinData(this.name).then(res => {
				this.$u.api.newData.realtime(this.symbol ).then(res => {
          console.info("🇨🇳🇨🇳:哈哈哈哈 --", res)
          if(res.status === 'SUCCEED'){
            this.json =res.result[0]
          }

				})
			},
			handleData(day) {
				this.socket.send(
					`initKline-${this.name}-${this.time}-${new Date().getTime() - day * (1440 * 60 * 1000) }-${new Date().getTime()}`
					)
			},
			onMessage(data) {

				if (data.openup) {
					this.buyData = data.openup.slice(0, 10); //显示20条
					this.sellData = data.opendown.slice(0, 10);
					if (data.chengjiao.length == 1 && data.chengjiao[0] == "") {
						this.chengjiaoData = [];
					} else {
						this.chengjiaoData = data.chengjiao.slice(0, 10);
					}
					this.maxBuy = Math.max.apply(
						Math,
						data.openup.map(ele => ele.num)
					);
					this.maxSell = Math.max.apply(
						Math,
						data.opendown.map(ele => ele.num)
					);
				} else {
					if (data.data) {
						this.chartsDataCandle1.categories = []
						this.chartsDataCandle1.series[0].data = []
						// console.log(data, '我是重新发送的数据')
						data.data.forEach(item => {
							this.handelFn(item)
						})
                        // this.drawCharts()
					} else {
						
						// this.handelFn(data)
					}

				}

			},
			handelFn(item) {
				if (item.time||true) {
					
					const temp = {
						0: 'h:m',
						1: 'h',
						2: 'h',
						3: 'Y/M/D',
						4: 'Y/M/D',
						5: 'Y/M/D'
					}
					
					// 开盘 收盘 最高 最低
					// let times = this.$utils.timestampToDate(item.time, this.timeCode > 3 ? 'Y/M/D' : 'h:m')
					// [1, 2].includes(item.payStatus)
					let times = this.$utils.timestampToDate(item.time, temp[this.timeCode])
					
					this.chartsDataCandle1.categories.push(this.timeCode === 1 || this.timeCode === 2 ?`${times}:00`:times)
					let arr = [item.open, item.close,  item.low, item.high]
					this.chartsDataCandle1.series[0].data.push(arr)
					
				}
				
				// this.chartsDataCandle1.categories.reverse()
				// this.chartsDataCandle1.categories = this.chartsDataCandle1.categories.reverse()
				// this.chartsDataCandle1.series[0].data = this.chartsDataCandle1.series[0].data.reverse()
				this.isLine = false
				this.$nextTick(() => {
					this.isLine = true
				})
			},
			getTime(index) {
				this.timeCode = index
				const temp = {
					0: 1,
					1: 2,
					2: 4,
					3: 6,
					4: 10,
					5: 30
				}
				this.handleData(temp[index])
			},
			getPairsList() {
				this.$u.api.bibi.getPairs("USDT", "SPOT").then(res => {
					this.pairs = res.result;
				})
			},
			getTo(res) {
				this.name = res.pairsName
				this.socket.send(`initEntrust-${this.name}`);
				// 回调做事
				console.log(res)
			},
			// 买入
			addBay() {
				this.getPath(1)
			},
			// 卖出
			addSell() {
				this.getPath(2)
			},
			getPath(code) {
				this.$store.commit('setSellCode', code)
				const temp = {
					0: `/pages/transaction/index`,
					1: `/pages/financial/index`,
					2: `/pages/financial/delivery`
				}

				if (this.code !== '2') {
					uni.navigateTo({
						url: temp[this.code]
					})
				} else {
					uni.navigateTo({
						url: temp[this.code]
					})
				}


			},
			onClickNum(index) {
				this.num = this.numInfo[index].text
			},
			change(e) {
				// if (e > 1) {
				// 	this.$utils.showToast(this.$t('setting').zwkf)
				// 	return
				// }
				this.current = e		
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.green_text {
			color: #14D69F;
		}

		.orange_text {
			color: #F61655;
		}

		.center_text {
			text-align: center;
		}

		.right_text {
			text-align: right;
		}

		.charts-box {
			height: 400px;
			width: 100%;
			// margin: 0 24rpx;
		}

		.f-1F222B {
			color: #1F222B;
		}

		.list-time {
			display: flex;
			align-items: center;
			color: #B0B3BA;
			font-size: 24rpx;
			margin: 24rpx;

			view {
				margin-right: 40rpx;
			}
		}

		.list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 24rpx;

			view {
				width: 352rpx;
			}
		}

		.r-icon1 {
			transform: rotate(180deg);
			transform-origin: center center;
		}

		.cur-2 {
			margin: 28rpx 24rpx;
			font-size: 26rpx;
			color: #707070;
		}

		.list-name {
			font-size: 26rpx;
			color: #707070;
			display: flex;
			align-items: center;
			margin: 28rpx 24rpx;

			view:nth-of-type(1) {

				margin-right: 312rpx;
			}

			.r-icon {
				display: flex;
				align-items: center;
				margin-left: auto;
				background: #F6F6F6;
				border-radius: 6rpx;
				color: #6F7784;
				padding: 8rpx 18rpx;

				& image {
					width: 18rpx;
					height: 10rpx;
					margin-left: 20rpx;
					transition: all 0.3s;
				}
			}
		}

		.footer-box {
			position: fixed;
			background: #FAFAFA;
			width: 100%;
			display: flex;
			align-items: center;
			color: #B0B3BA;
			font-size: 22rpx;
			bottom: 0;
			padding: 10rpx 24rpx;

			.f-other {
				// margin: 0 24rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 74rpx;

			}

			.f-btn1 {
				background: #E45360 !important;
				margin-left: 16rpx;
			}

			.f-btn {
				width: 50%;
				// width: 176rpx;
				height: 76rpx;
				background: #5EBA89;
				border-radius: 6rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: 32rpx;
				font-weight: bold;
			}

			& image {
				width: 48rpx;
				height: 48rpx;

			}
		}

		.top-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 24rpx;

			.f-E45360 {
				color: #E45360;
			}

			.f-5EBA89 {
				color: #5EBA89;
			}

			.left {
				.money {
					color: #000;
					font-size: 58rpx;
					font-weight: bold;
				}

				.conversion {
					color: #000;
					font-size: 28rpx;
					font-weight: bold;

					text {
						font-weight: 400;
						margin-left: 14rpx;
					}
				}
			}

			.right {
				.top {
					display: flex;
					align-items: center;
					color: #8D9099;
					font-size: 22rpx;
					margin-bottom: 10rpx;

					view:nth-of-type(1) {

						margin-right: 24rpx;
					}

					.num {
						color: #000;
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
