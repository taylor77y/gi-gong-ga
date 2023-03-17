<template>
	<view>
		<!-- 头部 -->
		<u-row gutter="4" class="time-options" justify="space-betweent">
			<u-col span="1" v-for="(item, index) in timeOptions" :key="index" class="time-row" :class="{'text-gray': activetedTime.name !== item.name}"
			 @click="changeTime(item)">
				{{item.name}}
			</u-col>
		</u-row>
		<view id="klinechart" style="width:100%;height:500px"></view>
		<u-row gutter="4" class="time-options" justify="space-betweent">
			<u-col span="1" v-for="(item, index) in typeOptions" :key="index" class="time-row" :class="{'text-gray': type !== item.name}"
			 @click="changeType(item)">{{item.name}}</u-col>
		</u-row>
	</view>
</template>

<script>
	import {
		init,
		dispose
	} from '../klinechart/klinecharts.min.js'
	import theme from '../klinechart/theme.js'
	export default {
		props: {
			timeOptions: {
				type: Array,
				default: function() {
					return [{
							name: 'Line',
							value: '1min',
							time: 1
						},
						{
							name: '5m',
							value: '5min',
							time: 5
						},
						{
							name: '15m',
							value: '15min',
							time: 15
						},
						{
							name: '30m',
							value: '30min',
							time: 30
						},
						{
							name: '1h',
							value: '60min',
							time: 60
						},
						{
							name: '4h',
							value: '4hour',
							time: 240
						},
						{
							name: '1day',
							value: '1D',
							time: 1440
						},
						{
							name: '1w',
							value: '1week',
							time: 10080
						},
						{
							name: '1M',
							value: '1mon',
							time: 145800
						}
					]
				}
			},
			activetedTime: {
				type: Object,
				default: function() {
					return {
						name: 'Line',
						value: '1min',
						time: 1 //天
					}
				}
			},
			themeVal: {
				type: String,
				detault: 'dark'
			},
			applyNewData: {
				type: Array,
				default: function() {
					return [];
				}
			},
		},
		data() {
			return {
				chart: null,
				type: 'MA',
				typeOptions: [
					{ name: 'MA',value: 'MA'},
					{ name: 'EMA',value: 'EMA'},
					{ name: 'BOLL',value: 'BOLL'},
					{ name: 'VOL',value: 'VOL'},
					{ name: 'MACD',value: 'MACD'},
					{ name: 'KDJ',value: 'KDJ'},
					{ name: 'RSl',value: 'RSl'},
				],
				klineData: [],
				technicallndictor: null,
			}
		},
		watch: {
			applyNewData(val){
				this.klineData = this.applyNewData
				this.chart.clearData()
				this.chart.applyNewData(this.klineData);
			}
		},
		mounted() {
			this.initChart()
		},
		methods: {
			initChart() {
				dispose('klineChart')
				this.chart = init('klinechart', {
					grid: {show:false},
					candle: {
						tooltip: {
							text: {
								size: 10,
								marginLeft: 0,
								marginRight: 0,
							}
						}
					},
					indicator: {
						showRule: 'follow_cross',
						text: {
							size: 10,
							marginLeft: 0,
							marginRight: 0,
						}
					}
				})
				//设置黑色主题
				this.chart.setStyleOptions(theme(this.themeVal))
				this.chart.createTechnicalIndicator('MA', true, {id: 'candle_pane'})
				this.chart.createTechnicalIndicator(this.type)
				this.chart.applyNewData(this.klineData);
			},
			changeTime(item) {
				this.$emit('changeTime', item)
			},
			// type 旧值， val 新的
			changeType(val) {
				console.log(this.type, val)
				if(this.type != val.name) {
					this.chart.createTechnicalIndicator(val)
					this.type = val.name
				}
			}
		}
	}
</script>

<style lang="scss">
	.time-options {
		width: 100%;
		font-size: 12px;
		font-weight: 400;
	}

	.time-row {
		text-align: center;
		color: inherit;
	}

	.text-gray {
		color: #868c9a;
	}
</style>
