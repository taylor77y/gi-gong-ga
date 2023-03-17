<template>
	<view>
		<!-- 头部 -->
		<u-row gutter="4" class="time-options" justify="space-betweent">
			<u-col span="1" v-for="(item, index) in timeOptions" :key="index" class="time-row"
				:class="{'text-gray': activetedTime.name !== item.name}" @click="changeTime(item)">
				{{item.name}}
			</u-col>
		</u-row>
		<view :id="id" style="width:100%;height:300px"></view>
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
			id: {
				type: String,
				default: 'klinechart'
			},
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
			options: {
				type: Object
			}
		},
		data() {
			return {
				chart: null,
			}
		},
		watch: {
			applyNewData() {
				this.chart.applyNewData(this.applyNewData);
			}
		},
		mounted() {
			this.initChart()
		},
		methods: {
			initChart() {
				dispose('klineChart')
				this.chart = init(this.id, this.options)
				//设置黑色主题
				this.chart.setStyleOptions(theme(this.themeVal))
				this.chart.applyNewData(this.applyNewData);
			},
			changeTime(item) {
				this.$emit('changeTime', item)
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
	}

	.text-gray {
		color: #868c9a;
	}
</style>
