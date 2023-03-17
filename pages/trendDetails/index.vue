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
					<u-col span="6">{{i18n.mz}}</u-col>
					<u-col span="6" class="right-col">{{i18n.zxje}}</u-col>
				</u-row>
				<!-- 数据 -->
				<u-row gutter="16" v-for="(item, index) in realTimeList" :key="index" class="row" @click="change(item)">
					<u-col span="6">
						<view class="label">{{item.name}}</view>
						<view class="perpetual">{{i18n.yx}}</view>
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
				<!-- <u-row gutter="4" class="time-options" justify="space-betweent">
					<u-col span="1" v-for="(item, index) in timeOptions" :key="item" class="time-row" :class="{'text-gray': activetedTime !== item}"
					 @click="changeTime(item)">{{item}}</u-col>
				</u-row> -->
				<view class="charts-box">
					<!-- k线图 -->
					<my-klinechart id="klinechart1" :options="options2" :themeVal="theme" :applyNewData="klineData"
					:timeOptions="timeOptions">
					</my-klinechart>
				</view>
				<view class="bg-black"></view>
				<view class="echart mt-20">
					<!-- <u-row gutter="4" class="time-options" justify="space-betweent">
						<u-col span="1" v-for="(item, index) in typeOptions" :key="item" class="time-row" :class="{'text-gray': activetedType !== item}"
						 @click="changeType(item)">{{item}}</u-col>
					</u-row> -->
					<my-klinechart id="klinechart2" :options="options1" :applyNewData="klineData"
						:activetedTime="activetedType" :timeOptions="timeOptions" :themeVal="theme"></my-klinechart>
				</view>
			</view>
		</view>
		<view class="bg-black"></view>
		<!-- 列表数据 -->
		<view class="list-tab">
			<u-tabs :list="tabList" :scrollable="false" active-color="#2979ff" inactive-color="#868c9a"
				:current="currentIndex" @change="tabClickHanlder" />
			<view v-show="currentIndex === 0" class="table-list">
				<u-row gutter="16" justify="space-betweent">
					<!-- 左边列表数据 -->
					<u-col span="6">
						<!-- 头部标题 -->
						<view class="text-gray mb-20">
							<view class="title">{{i18n.mr}}</view>
							<u-row gutter="6">
								<u-col span="6" style="padding: 0;">
									<p>{{i18n.jg}}(USDT)</p>
								</u-col>
								<u-col span="6" class="right-col">
									<p>{{i18n.sl}}(BTC)</p>
								</u-col>
							</u-row>
						</view>
						<u-row gutter="16" v-for="(item,index) in leftList" :key="index" justify="space-betweent"
							class="list-row">
							<u-col span="6">
								<text>{{item.price}}</text>
							</u-col>
							<u-col span="6" class="text-green right-col">
								<text>{{item.number}}</text>
							</u-col>
						</u-row>
					</u-col>
					<!-- 右边列表数据 -->
					<u-col span="6">
						<!-- 头部标题 -->
						<view class="text-gray mb-20">
							<view class="title">{{i18n.mc}}</view>
							<u-row gutter="6">
								<u-col span="6" style="padding: 0;">
									<p>{{i18n.jg}}(USDT)</p>
								</u-col>
								<u-col span="6" class="right-col">
									<p>{{i18n.sl}}(BTC)</p>
								</u-col>
							</u-row>
						</view>
						<u-row gutter="16" v-for="(item, index) in rightList" :key="index" justify="space-betweent"
							class="list-row">
							<u-col span="6"><text>{{item.price}}</text></u-col>
							<u-col span="6" class="text-red right-col">
								<text>{{item.number}}</text>
							</u-col>
						</u-row>
					</u-col>
				</u-row>
			</view>
			<view v-show="currentIndex === 1" class="table-list">
				<u-row gutter="16" v-for="(item,index) in dealData" :key="index" justify="space-between"
					class="list-row">
					<u-col span="3">{{item.time}}</u-col>
					<u-col span="3" class="text-green" :class="{'text-red': item.Direction === 'Sell'}">
						{{item.Direction}}
					</u-col>
					<u-col span="3">{{item.Price}}</u-col>
					<u-col span="3">{{item.Number}}</u-col>
				</u-row>
			</view>
		</view>
		<tool-bar class="mt-20"/>
	</view>
</template>

<script>
	import toolBar from "./tool-bar.vue"

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
				getInterval: null,
				isStar: false, // 收藏
				activetedTab: '0',
				timeOptions: [{
								name: '分时',
								value: '1min',
								time: 1
							},
							{
								name: '5分',
								value: '5min',
								time: 5
							},
							{
								name: '15分',
								value: '15min',
								time: 15
							},
							{
								name: '30分',
								value: '30min',
								time: 30
							},
							{
								name: '1小时',
								value: '60min',
								time: 60
							},
							{
								name: '4小时',
								value: '4hour',
								time: 240
							},
							{
								name: '1天',
								value: '1D',
								time: 1440
							},
							{
								name: '1周',
								value: '1week',
								time: 10080
							},
							{
								name: '1月',
								value: '1mon',
								time: 145800
							}
						],
				
                // timeOptions: ['分时', '5分', '15分', '30分', '1小时', '4小时', '1天', '1周', '1月'],
				activetedTime: 'Line', // 图表选项
				typeOptions: [{
						name: 'MA',
						value: 'MA'
					},
					{
						name: 'EMA',
						value: 'EMA'
					},
					{
						name: 'BOLL',
						value: 'BOLL'
					},
					{
						name: 'VOL',
						value: 'VOL'
					},
					{
						name: 'MACD',
						value: 'MACD'
					},
					{
						name: 'KDJ',
						value: 'KDJ'
					},
					{
						name: 'RSl',
						value: 'RSl'
					},
				],
				activetedType: {
					name: 'MA',
					value: 'MA'
				}, // 图表选项
				klineData: [],
				// 面积图
				options1: {
					candle: {
						// 蜡烛图类型 'candle_solid'|'candle_stroke'|'candle_up_stroke'|'candle_down_stroke'|'ohlc'|'area'
						type: 'area',
						area: {
							lineSize: 2,
							lineColor: '#2196F3',
							value: 'close',
							backgroundColor: [{
								offset: 0,
								color: 'rgba(33, 150, 243, 0.01)'
							}, {
								offset: 1,
								color: 'rgba(33, 150, 243, 0.2)'
							}]
						},
						priceMark: {
							show: true,
							// 最高价标记
							high: {
								show: true,
								color: '#D9D9D9',
								textMargin: 5,
								textSize: 10,
								textFamily: 'Helvetica Neue',
								textWeight: 'normal'
							},
							// 最低价标记
							low: {
								show: true,
								color: '#D9D9D9',
								textMargin: 5,
								textSize: 10,
								textFamily: 'Helvetica Neue',
								textWeight: 'normal',
							},
							// 最新价标记
							last: {
								show: false,
								upColor: '#26A69A',
								downColor: '#EF5350',
								noChangeColor: '#888888',
								line: {
									show: true,
									// 'solid' | 'dashed'
									style: 'dashed',
									dashedValue: [4, 4],
									size: 1
								},
								text: {
									show: true,
									// 'fill' | 'stroke' | 'stroke_fill'
									style: 'fill',
									size: 12,
									paddingLeft: 4,
									paddingTop: 4,
									paddingRight: 4,
									paddingBottom: 4,
									// 'solid' | 'dashed'
									borderStyle: 'solid',
									borderSize: 1,
									borderDashedValue: [2, 2],
									color: '#FFFFFF',
									family: 'Helvetica Neue',
									weight: 'normal',
									borderRadius: 2
								},
							}
						},
						// 提示
						tooltip: {
							// 'always' | 'follow_cross' | 'none'
							showRule: 'follow_cross',
							// 'standard' | 'rect'
							showType: 'standard',
							// 显示回调方法，返回数据格式类型需要时一个数组
							// 数组的子项类型为 { title, value }
							// title和value可以是字符串或者对象，对象类型为 { text, color }
							custom: null,
							defaultValue: 'n/a',
							rect: {
								paddingLeft: 0,
								paddingRight: 0,
								paddingTop: 0,
								paddingBottom: 6,
								offsetLeft: 8,
								offsetTop: 8,
								offsetRight: 8,
								borderRadius: 4,
								borderSize: 1,
								borderColor: '#3f4254',
								color: 'rgba(17, 17, 17, .3)'
							},
							text: {
								size: 12,
								family: 'Helvetica Neue',
								weight: 'normal',
								color: '#D9D9D9',
								marginLeft: 10,
								marginTop: 8,
								marginRight: 6,
								marginBottom: 0
							},
						},
					}
				},
				// 蜡烛图
				options2: {
					candle: {
						// 蜡烛图类型 'candle_solid'|'candle_stroke'|'candle_up_stroke'|'candle_down_stroke'|'ohlc'|'area'
						type: 'candle_solid',
						// 蜡烛柱
						bar: {
							upColor: '#26A69A',
							downColor: '#EF5350',
							noChangeColor: '#888888'
						},
						priceMark: {
							show: true,
							// 最高价标记
							high: {
								show: true,
								color: '#D9D9D9',
								textMargin: 5,
								textSize: 10,
								textFamily: 'Helvetica Neue',
								textWeight: 'normal'
							},
							// 最低价标记
							low: {
								show: true,
								color: '#D9D9D9',
								textMargin: 5,
								textSize: 10,
								textFamily: 'Helvetica Neue',
								textWeight: 'normal',
							},
							// 最新价标记
							last: {
								show: false,
								upColor: '#26A69A',
								downColor: '#EF5350',
								noChangeColor: '#888888',
								line: {
									show: true,
									// 'solid' | 'dashed'
									style: 'dashed',
									dashedValue: [4, 4],
									size: 1
								},
								text: {
									show: true,
									// 'fill' | 'stroke' | 'stroke_fill'
									style: 'fill',
									size: 12,
									paddingLeft: 4,
									paddingTop: 4,
									paddingRight: 4,
									paddingBottom: 4,
									// 'solid' | 'dashed'
									borderStyle: 'solid',
									borderSize: 1,
									borderDashedValue: [2, 2],
									color: '#FFFFFF',
									family: 'Helvetica Neue',
									weight: 'normal',
									borderRadius: 2
								},
							}
						},
						// 提示
						tooltip: {
							// 'always' | 'follow_cross' | 'none'
							showRule: 'follow_cross',
							// 'standard' | 'rect'
							showType: 'standard',
							// 显示回调方法，返回数据格式类型需要时一个数组
							// 数组的子项类型为 { title, value }
							// title和value可以是字符串或者对象，对象类型为 { text, color }
							custom: null,
							defaultValue: 'n/a',
							rect: {
								paddingLeft: 0,
								paddingRight: 0,
								paddingTop: 0,
								paddingBottom: 6,
								offsetLeft: 8,
								offsetTop: 8,
								offsetRight: 8,
								borderRadius: 4,
								borderSize: 1,
								borderColor: '#3f4254',
								color: 'rgba(17, 17, 17, .3)'
							},
							text: {
								size: 12,
								family: 'Helvetica Neue',
								weight: 'normal',
								color: '#D9D9D9',
								marginLeft: 10,
								marginTop: 8,
								marginRight: 6,
								marginBottom: 0
							},
						},
					},
				},
				

				activetedTime: { name: 'Line',value: '1min',	time: 1 }, // 图表选项
				klineData: [],

				currentIndex: 0,

				leftList: [{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
				],
				rightList: [{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
					{
						price: '24960.14',
						number: '36.69'
					},
				],
				dealData: [{
						time: this.$t("trendDetails").sj,
						Direction: this.$t("trendDetails").fx,
						Price: this.$t("trendDetails").jg,
						Number: this.$t("trendDetails").sl
					},
					{
						time: '20:21',
						Direction: 'Sell',
						Price: '24780.11',
						Number: '0.36'
					},
					{
						time: '20:21',
						Direction: 'Buy',
						Price: '24780.11',
						Number: '0.36'
					},
					{
						time: '20:21',
						Direction: 'Sell',
						Price: '24780.11',
						Number: '0.36'
					},
					{
						time: '20:21',
						Direction: 'Buy',
						Price: '24780.11',
						Number: '0.36'
					},
					{
						time: '20:21',
						Direction: 'Sell',
						Price: '24780.11',
						Number: '0.36'
					},
					{
						time: '20:21',
						Direction: 'Sell',
						Price: '24780.11',
						Number: '0.36'
					},
					{
						time: '20:21',
						Direction: 'Buy',
						Price: '24780.11',
						Number: '0.36'
					},
					{
						time: '20:21',
						Direction: 'Sell',
						Price: '24780.11',
						Number: '0.36'
					},
					{
						time: '20:21',
						Direction: 'Sell',
						Price: '24780.11',
						Number: '0.36'
					},
					{
						time: '20:21',
						Direction: 'Sell',
						Price: '24780.11',
						Number: '0.36'
					},
					{
						time: '20:21',
						Direction: 'Sell',
						Price: '24780.11',
						Number: '0.36'
					},
					{
						time: '20:21',
						Direction: 'Sell',
						Price: '24780.11',
						Number: '0.36'
					},
					{
						time: '20:21',
						Direction: 'Sell',
						Price: '24780.11',
						Number: '0.36'
					},
					{
						time: '20:21',
						Direction: 'Sell',
						Price: '24780.11',
						Number: '0.36'
					},
				],
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
			},
			
		},
		watch: {
			showTypePopUp(val) {
				if (val == true) {
					console.log(val)
					this.getInterval = setInterval(() => {
						this.getRealtime()
					}, 2000)
				} else {
					console.log(val)
					clearInterval(this.getInterval);
					this.getInterval = null;
				}
			}
		},
		onReady() {
			this.$u.api.trendDetails.getRealtime().then(res => {
				this.currentBiType = res.data[0]
			});
			this.getKlineData()
		},
		onHide() {
			clearInterval(this.getInterval)
			this.getInterval = null
		},
		mounted() {},
		methods: {
			// 获取类型的币值 实时数据
			async getRealtime() {
				this.$u.throttle(async () => {
					const {
						code,
						data
					} = await this.$u.api.trendDetails.getRealtime();
					console.log(code, data)
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
			tabClickHanlder(val) {
				this.currentIndex = val
			},
			// 图表时间 改变
			changeTime(time) {
				this.activetedTime = time
			},
			changeType(type) {
				this.activetedType = type
			},
			getSocketData(res) {
				console.log(res)
			},
			// 获取 图表数据
			async getKlineData(symbol = 'btc', line = '1min') {
				const {
					code,
					data
				} = await this.$u.api.trendDetails.getKline(symbol, line);
				console.log(code, data)
				if (code == 0) {
					this.klineData = data.splice(0, 200)
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
		background: #f3f3f3;
		width: 100%;
		height: 5rpx;
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
