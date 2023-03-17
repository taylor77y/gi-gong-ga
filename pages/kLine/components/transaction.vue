<template>
	<view class="container">
		<view class="title">资金流向分析
		<image src="../../../static/image/recharge/5.png">
		</view>
		<view class="list-time">
			<view class="item" :class="{ 'item1': cunTime === index }" @click="getTime(index, item)"
				v-for="(item, index) in timeInfo" :key="index">{{ item }}</view>
		</view>
		<view class="charts-box">
			<!-- 演示动态改变eopts -->
			<qiun-data-charts type="ring" :opts="{legend:{position:'bottom'},title: {name: chartName}}"
				:eopts="ringOpts" :chartData="chartsDataPie2" :echartsH5="true" :echartsApp="true" />
			<view class="chart-title">{{ chartName }}</view>
		</view>
		<view class="buy-info">
			<view class="item" v-for="(item, index) in buyInfo" :key="index">
				{{ item }}
			</view>
		</view>
		<view class="single-box">
			<view class="single-form">
				<view class="name">
					大单
				</view>
				<view class="num f-c2">
					13.1M
				</view>
				<view>
					12.1m
				</view>
				<view class="right f-c1">
					12.3m
				</view>
			</view>
			<view class="single-form">
				<view class="name">
					中单
				</view>
				<view class="num f-c2">
					13.1M
				</view>
				<view>
					12.1m
				</view>
				<view class="right f-c1">
					12.3m
				</view>
			</view>
			<view class="single-form">
				<view class="name">
					小单
				</view>
				<view class="num f-c2">
					13.1M
				</view>
				<view>
					12.1m
				</view>
				<view class="right f-c1">
					12.3m
				</view>
			</view>
			<view class="l-1"></view>
			<view class="single-form" style="margin-bottom: 0;">
				<view class="name">
					加总
				</view>
				<view class="num f-c2">
					13.1M
				</view>
				<view>
					12.1m
				</view>
				<view class="right f-c1">
					12.3m
				</view>
			</view>
		</view>
		<view class="title">5 x 24 小时大单净流入（DOGE）</view>
		<view class="tips">
			5日主力净流入
		</view>
		<view class="charts-box">
			 
			<qiun-data-charts type="column" :opts="opts" :chartData="chartData" />
		</view>
		<view style="height: 20rpx;"></view>
		<view class="title">24 小时资金净流入（DOGE）</view>
		<view class="charts-box">
			<qiun-data-charts type="area" :opts="{extra:{area:{type:'curve',addLine:true,gradient:true}}}" :chartData="chartData1"/>
		</view>
	</view>
</template>

<script>
	export default {
		props: {

		},
		data() {
			return {
				chartData: {},
				chartData1: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 15, 0, 5],
					enableScroll: false,
					legend: {
						show: false
					},
					xAxis: {
						disableGrid: true
					},
					yAxis: {

						splitNumber: 4
					},
					extra: {
						column: {
							type: "group",
							width: 30,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08,
							barBorderCircle: false,
							linearType: "custom",

						}
					}
				},
				chartName: '过去15分钟资金流向',
				ringOpts: {
					color: ['#75b88d', '#87c49d', '#9fd2b2', '#d35d63', '#de7e82', '#e5a3a4'],
					legend: {
						show: false
					}
				},
				cunTime: 0, // 当前
				chartsDataPie2: {
					series: [{
						data: [{
								name: "大单买入",
								value: 50
							}, {
								"name": "中单买入",
								"value": 30
							}, {
								"name": "小单买入",
								"value": 20
							}, {
								"name": "大单卖出",
								"value": 18
							}, {
								"name": "中单卖出",
								"value": 8
							},
							{
								"name": "小单卖出",
								"value": 12
							}
						]
					}]

				},
			}
		},
		computed: {
			i18n() {
				return this.$t("assets")
			},
			timeInfo() {
				return ['15分', '30分', '1小时', '2小时', '4小时', '1日']
			},
			buyInfo() {
				return ['买入(DOGE)', '卖出(DOGE)', '净流入']
			}
		},
		created() {
			console.log('我进入-----')
			this.getServerData()
		},
		methods: {
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ["2/1", "2/1", "2/3", "2/4", "2/5"],
						series: [{
							name: "成交量",
							data: [20, 20, 25, 25, 30, 30]
						}]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res1 = {
						categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
						series: [{
								name: "成交量",
								data: [35, 8, 25, 37, 4, 20]
							}

						]
					};
					this.chartData1 = JSON.parse(JSON.stringify(res1));
				}, 500);
			},
			getTime(index, item) {
				this.cunTime = index
				this.chartName = `过去${item}资金流向`
			}

		}
	}
</script>

<style lang="scss" scoped>
	.charts-box {
		width: 100%;
		height: 300px;
		position: relative;

		.chart-title {
			position: absolute;
			top: 44%;
			left: 41%;
			font-size: 26rpx;
			color: #8D9099;
			width: 140rpx;
			text-align: center;
			z-index: -1;
		}
	}

	.container {

		margin: 24rpx;

		.tips {
			font-size: 24rpx;
			color: #8D9099;
		}

		.single-box {
			background: #F6F6F6;
			padding: 32rpx 24rpx;
			margin: 20rpx 0;

			.single-form {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				color: #8D9099;
				margin-bottom: 24rpx;

				.name {
					width: 240rpx;
				}

				.f-c1 {
					color: #5EBA89;
				}

				.f-c2 {
					color: #E45360;
				}

				.num {
					margin-right: 116rpx;
					font-size: 24rpx;
				}

				.right {
					margin-left: auto;
				}

			}

			.l-1 {
				height: 2rpx;
				background: #EBEBEB;

				margin: 0 -24rpx 24rpx -24rpx;
			}
		}

		.buy-info {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			color: #8D9099;
			font-size: 24rpx;
			margin-right: 24rpx;

			.item:nth-of-type(2) {
				margin: 0 110rpx 0 60rpx;
			}

		}

		.title {
			color: #1F222B;
			font-size: 34rpx;
			font-weight: 600;
			display: flex;
			align-items: center;
			image {
				width: 26rpx;
				height: 26rpx;
				margin-left: 16rpx;
			}
		}

		.list-time {
			margin: 24rpx 0;
			display: flex;

			.item {
				background: #F6F6F6;
				border-radius: 4rpx;
				color: #8C9093;
				font-size: 26rpx;
				padding: 10rpx 20rpx;
				margin-right: 16rpx;
				font-weight: 600;
			}

			.item1 {
				color: #1F222B;
			}
		}
	}
</style>
