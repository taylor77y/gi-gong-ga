<template>
	<view class="page">
		<!-- <head-title :title="i18n.title" /> -->
		<view class="header">
			<u-icon name="arrow-left" size="30" @click="turnBack"></u-icon>
			<view class="middle" @click="showToPop = true">
				<text>{{title ? title : i18n.title }}</text>
				<u-icon name="arrow-down" size="30" class="ml-10"></u-icon>
			</view>
			<view class="right">
				<view class="mr-10">USD</view>
				<image class="icon-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAdCAYAAAC5UQwxAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACGSURBVHgB7dTBCYAgGMXxFzRIo7RJbtAI2iaN0ihtYngoPsS62Hsd8g9BeehXKgKtFikPYQmLEHViEtBir4Ed7rGQjS2oK+ABi4Sr2EzCiuBExC7QruEAbjt+kZ3SEdy2fIC5YVzpC6QYC3Q50pv72qPLZ8/pfSuI2T8LECTFoMagxlrfdQAS6JwCrD5tegAAAABJRU5ErkJggg==" mode=""></image>
				<view class="line"></view>
				<u-icon name="more-dot-fill" size="30" class="ml-10"></u-icon>
			</view>
		</view>
		<!-- 顶部弹窗 -->
		<u-popup v-model="showToPop" mode="top" :closeable="true">
			<view class="row">
				<view class="col" @click="changeTitle(i18n.kjq)">
					<image src="../../static/img/2.png" mode="" class="img"></image>
					<view class="label">{{i18n.kjq}}</view>
				</view>
				<view class="col" @click="changeTitle(i18n.title)">
					<image src="../../static/img/3.png" mode="" class="img"></image>
					<view class="label">{{i18n.title}}</view>
				</view>
			</view>
		</u-popup>
		
		<!-- 快捷区 -->
		<view v-if="title == i18n.kjq" class="container scoped-css">
			<view class="select-container">
				<view class="selects">
					<view :class="{'choose': firstTab === 'buy'}" class="mr-40" @click="firstTab = 'buy'">{{i18n.wym}}</view>
					<view class="col-line"></view>
					<view :class="{'choose': firstTab === 'sell'}" @click="firstTab = 'sell'">{{i18n.wymai}}</view>
				</view>
			</view>
			<view class="scoped-css-flex">
				<view v-for="(item,index) in kjq_typeList" :key="index" class="scoped-css-box" :class="{'active': kjq_currency.value == item.value }" @click="kjq_currency=item">
					<p>{{item.name}}</p>
					<p>{{item.direction}}</p>
				</view>
			</view>
			<view class="card">
				<uni-card :is-shadow="true" :border="true">
					<view class="niner-content">
						<view class="label">购买金额</view>
						<view v-if="kjq_buyMethod == 0" class="card-input mt-10">
							<text class="card-icon">$</text>
							<u-input v-model="total" type="number" placeholder="最小金额 100" :border="false"  />
						</view>
						<view v-else class="card-input mt-10">
							<u-input v-model="total" type="number" placeholder="最小金额 100" :border="false"  />
							<text class="card-icon">{{kjq_currency.name}}</text>
						</view>
						<view class="card-flex card-flex-sb mt-20">
							<text>参考单价 $1</text>
							<view class="card-flex" @click="changeBuyMethod">
								<text class="card-label" v-show="kjq_buyMethod === 0">按金额购买</text>
								<text class="card-label" v-show="kjq_buyMethod === 1">按数量购买</text>
								<image src="../../static/img/4.png" mode="" class='card-img'></image>
							</view>
						</view>
						
						<view class="mt-100">
							<u-button type="success" @click="buy">0手续费购买 </u-button>
						</view>
					</view>
				</uni-card>
			</view>
		</view>
		
		<!-- 自选区 -->
		<view v-else class="container">
			<view class="select-container">
				<view class="selects">
					<view :class="{'choose': firstTab === 'buy'}" class="mr-40" @click="firstTab = 'buy'">{{i18n.wym}}</view>
					<view :class="{'choose': firstTab === 'sell'}" @click="firstTab = 'sell'">{{i18n.wymai}}</view>
				</view>
				<view class="right-icon">
					<u-icon name="file-text-fill" size="30" color="#868c9a"></u-icon>
				</view>
			</view>
			<u-tabs :list="tabList" :scrollable="false" active-color="#2979ff" inactive-color="#868c9a" :current="currentIndex" @change="tabClickHanlder" />
			
			<view class="filter-selector">
				<u-dropdown ref="uDropdown" :close-on-click-mask="true" :close-on-click-self="true" class="dropdown">
					<u-dropdown-item :title="i18n.je" class="left-d">
						<view class="slot-content">
							<u-row class="dropdown-row">
								<u-input v-model="total" type="number" :placeholder="i18n.qsrze" :border="false"  />
								<text>USD</text>
							</u-row>
							<u-row class="row1 mt-20">
								<u-col span="4" v-for="(item, index) in numList" :key="index">
									<u-button size="medium" class="mb-20 bnt" :class="{'bnt-primary': total === item.value}" @click="handleNumBut(item.value)">{{item.name}}</u-button>
								</u-col>
							</u-row>
							<u-row justify="space-between" class="row1 mt-30">
								<u-row gutter="16" span="6">
									<u-button type="primary" size="medium" class="bnt-2" @click="resetTotal">{{i18n.zz}}</u-button>
								</u-row>
								<u-row span="6">
									<u-button type="primary" size="medium" class="bnt-2" @click="confirm">{{i18n.qr}}</u-button>
								</u-row>
							</u-row>
						</view>
					</u-dropdown-item>
					<u-dropdown-item :title="i18n.jyfs">
						<u-row gutter="16" class="list-box">
							<u-col span="4" v-for="(bnt, index) in motBntList" :key="index">
								<u-button size="medium" class="mb-20 bnt" :class="{'bnt-primary': methodType == index}" @click="handleBut(index)">{{bnt}}</u-button>
							</u-col>
						</u-row>
					</u-dropdown-item>
				</u-dropdown>
				<view class="right-filter mr-32" @click="showFilter = true">
					<text class="mr-10">{{i18n.sx}}</text>
					<image style="width: 20rpx;height: 20rpx; " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAWCAYAAAAinad/AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEGSURBVHgB7ZQ7jsIwEIZnJkS7Za6QG+wRNjdZigUhGiIQ4lEQBFQIpUTQACeAm8ARcgSXEAhmEgkJosQ8QgdfZXvGv+bhMTruzNAPfgUyggAi9wVbQ5LWgex4BC/ktWI7+BacrwcZQclpOnZeAAUWV3ADzyLlolkrWFGaTbvk+ahb4SE8iDzKbqtW/IuiixsHw4mDhHd1VwaQb9cL8/Mek5z6o0mFAF2FjpC0t9p2+ao0mObdG45/NdKWvDRiJs/nGjtcmvidVLGQgTv9wSOsLyPySTejpiWgfGcEQfySSBO6KfYoH7G3FeMRW6ntd8BjMucRMhvVf1vll1MZw48TaGsmzWESJ4EyT8v9je65AAAAAElFTkSuQmCC"></image>
				</view>
				<!-- filter 底部弹出层 -->
				<u-popup v-model="showFilter" mode="bottom" :closeable="true" border-radius="20" class="popup-view">
					<view class="top-title">
						<text>{{i18n.ggsx}}</text>
					</view>
					<!-- Fiat Amount -->
					<view class="box mt-60">
						<view class="label">{{i18n.ze}}</view>
						<u-row class="box-row">
							<u-input v-model="total" type="number" :placeholder="i18n.qsrze" :border="false"  />
							<text>USD</text>
						</u-row>
					</view>
					<!-- Means of transaction -->
					<view class="box mt-50">
						<u-row gutter="16" justify="space-between">
							<u-col span="6">
								<view class="label">{{i18n.jyfs}}</view>
							</u-col>
							<u-col span="6" class="col-right label" @click="showAll1 = !showAll1">
								{{i18n.qb}}<u-icon name="arrow-down" size="20" class="icon"></u-icon>
							</u-col>
						</u-row>
						<view class="select-wrapper" :class="{'max-height': showAll1 === true}">
							<u-row gutter="16">
								<u-col span="4" v-for="(item, index) in motBntList" :key="item">
									<u-button size="medium" class="mb-20 bnt" @click="methodType = index">{{item}}</u-button>
								</u-col>
							</u-row>
						</view>
					</view>
					<!-- Country / Region -->
					<view class="box mt-60">
						<u-row gutter="16" justify="space-between">
							<u-col span="6">
								<view class="label">{{i18n.gjdq}}</view>
							</u-col>
							<u-col span="6" class="col-right label" @click="showAll2 = !showAll2">
								{{i18n.qb}}<u-icon name="arrow-down" size="20" class="icon"></u-icon>
							</u-col>
						</u-row>
						<view class="select-wrapper" :class="{'max-height': showAll2 === true}">
							<u-row gutter="16">
								<u-col span="4" v-for="(item, index) in areaList" :key="index">
									<u-button size="medium" class="mb-20 bnt">{{item.name}}</u-button>
								</u-col>
							</u-row>
						</view>
					</view>
					<view class="box mt-60">
						<u-row gutter="16" justify="space-between">
							<u-col span="9">
								<text>{{i18n.qxssjfbdgg}}</text>
							</u-col>
							<u-col span="3" class="col-right">
								<u-switch v-model="checked"></u-switch>
							</u-col>
						</u-row>
						<view v-show="checked" @click="openPane = !openPane" class="card mt-50 mb-50">
							<u-icon name="info-circle-fill" size="30"></u-icon>
							<text class="mr-10">广告筛选说明</text>
							<u-icon v-if="openPane" name="arrow-up" size="30"></u-icon>
							<u-icon v-else name="arrow-down" size="30"></u-icon>
						</view>
						<view class="pane" v-show="checked && openPane">
							<view>交易方式：<span style="font-weight: bolder;">仅显示可用的交易方式</span></view>
							<view>国家/地区<span style="font-weight: bolder;">仅显示可用的国家 / 地区</span></view>
						</view>
					</view>
					<view class="divline"></view>
					<view class="box mt-60">
						<u-row justify="space-between" class="row1 mt-30">
							<u-row gutter="16" span="6">
								<u-button type="primary" size="medium" class="bnt-3" @click="resetFillter">{{i18n.zz}}</u-button>
							</u-row>
							<u-row span="6">
								<u-button type="primary" size="medium" class="bnt-3" @click="getList">{{i18n.qr}}</u-button>
							</u-row>
						</u-row>
					</view>
				</u-popup>
			</view>
			<view class="divline mt-10 mb-70"></view>
			<view class="content flex-1">
				<view class="empty">
					<image v-show="isEmpty" src="../../static/image/erro/1.png" mode="" class="img"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { adrs } from '@/common/hooks/area.js'
	export default {
		data() {
			return {
				showToPop: false, // 顶部弹窗
				title: '',
				
				firstTab: 'buy', // buy or sell --direction
				currentIndex: 0,
				currency: 'BTC',
				tabList: [
					{
						name: 'BTC',
						value: 'btc'
					}, {
						name: 'USDT',
						value: 'usdt'
					}, {
						name: 'ETH',
						value: 'eth'
					},
				],
				motBntList: { 0: 'ALL' },
				methodType: 0, // 交易方式 --- method_type
				
				total: null,
				numList: [
					{ name: '100', value: 100 },
					{ name: '10000', value: 1000 },
					{ name: '5000', value: 5000 },
					{ name: this.$t("wantBuy").w, value: 10000 },
					{ name: this.$t("wantBuy").w, value: 100000 },
					{ name: this.$t("wantBuy").w, value: 1000000 }
				],
								
				showFilter: false,
				total_usd: null,
				checked: false, // 显示广告
				openPane: false,
				showAll1: false,
				showAll2: false,
				
				isEmpty: true,
				page_no: 1,
				
				kjq_currency: { name: 'USDT', direction: '计价币种', value: 0} ,// 快捷区 类型
				kjq_typeList:[
					{ name: 'USDT', direction: '计价币种', value: 0},
					{ name: 'BTC', direction: '最知名币种', value: 1},
					{ name: 'ETH', direction: '以太坊', value: 2},
				],
				kjq_buyMethod: 0, // 0 按金额购买， 1 按 数量购买
			}
		},
		computed: {
			i18n() {
				return this.$t("wantBuy")
			},
			// 国家与地区
			areaList() {
				return adrs;
			}
		},
		onReady(){},
		created() {
			this.getMethodsType()
			this.getList()
		},
		methods: {
			// 切换 快捷区或自选区
			changeTitle(title){
				this.title = title
				this.showToPop = false
			},
			turnBack(){
				uni.navigateBack()
			},
			tabClickHanlder(index) {
				this.currentIndex = index
				this.currency = this.tabList[index].name
			},
			// change 交易方式 
			handleBut(value){
				this.methodType = value
				this.$refs.uDropdown.close();
				this.getList()
			},
			// change 金额
			handleNumBut(value) {
				this.total = value
			},
			resetTotal(){
				this.total = null
			},
			confirm() {
				this.getList()
			},
			resetFillter() {
				this.total = null
				this.methodType = 0
				this.checked = false
				this.openPane = false
			},
			// 获取列表数据
			async getList() {
				let param = {
					page_no: this.page_no,
					direction: this.firstTab,
					currency: this.currency,
					amount: this.total?this.total:'',
					symbol: 'bct',
					token: '',
					method_type: this.methodType,
					language: uni.getStorageSync('lang')
				}
				const { code, data } = await this.$u.api.wantBuy.getC2cList(param);
				console.log(code,data)
			},
			// 获取交易方式
			async getMethodsType() {
				console.log(uni.getStorageSync('lang'))
				let lang = uni.getStorageSync('lang')
				const { code, data } = await this.$u.api.wantBuy.getC2cPaymentMethod(lang)
				if(code == 0) {
					let obj = {}
					Object.assign(obj,this.motBntList, data)
					this.motBntList = obj
					console.log(this.methodType)
				}
			},
			// 切换购买方式
			changeBuyMethod(){
				this.kjq_buyMethod = this.kjq_buyMethod == 0 ? 1 : 0
			},
			// 购买
			buy() {
				uni.navigateTo({
					url:'/pages/wantBuy/paymentMethod'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100vh;
		background: #1d91ff;
		overflow: hidden;
		.header {
			height: 120rpx;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #fff;
			.middle {
				font-weight: bolder;
			}
			.right {
				padding: 5rpx 0;
				margin: 0;
				width: 220rpx;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 14px;
				background: #c2e1ff;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #000;
				.icon-img {
					width: 30rpx;
					height: 30rpx;
				}
				.line {
					width: 1px;
					height: 60%;
					background: #000;
					margin-left: 5rpx;
					margin-right: 5rpx;
				}
			}
		}
		.row {
			height: 200rpx;
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.col {
				text-align: center;
			}
			.img {
				height: 50rpx;
				width: 50rpx;
			}
			.label {
				color: #000;
				font-size: 12px;
			}
		}
	
		.container {
			background: #fff;
			border-radius: 70rpx 70rpx 0 0;
			height: 100%;
			.col-line {
				transform: rotate(90deg);
				background: rgb(234, 235, 238);
				height: 1px;
				width: 30rpx;
			}
		}
		.scoped-css {
			.scoped-css-flex {
				padding: 20rpx 30rpx;
				display: flex;
				justify-content: space-between;
			}
			.scoped-css-box {
				padding: 5px 25px;
				border-radius: 10rpx;
				background: #f5f5f5;
				text-align: center;
			}
			.active {
				color: #1a6ebd;
			}
			.card {
				padding: 0 10rpx;
				.niner-content {
					padding: 20rpx;
					.card-input {
						height: 100rpx;
						background: #f5f5f5;
						border-radius: 20rpx;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						padding: 0 30rpx;
						.card-icon {
							width: 100rpx;
							font-size: 20px;
						}
					}
					.card-flex {
						display: flex;
					}
					.card-flex-sb {
						justify-content: space-between;
					}
					.card-label {
						color: #2c78f8;
					}
					.card-img {
						margin-left: 5rpx;
						width: 20rpx;
						height: 20rpx;
					}
				}
			}
		}
		.select-container {
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			.selects {
				display: flex;
				font-size: 32rpx;
				font-weight: 400;
				color: #868c9a;


				.mr-40 {
					margin-right: 40rpx;
				}

				.choose {
					color: #000;
				}
			}
			.right-icon {
				margin-right: 20rpx;
			}
		}
		.filter-selector {
			display: flex;
			justify-content: space-between;
			::v-deep .u-dropdown__menu {
				display: flex;
				justify-content: space-between;
				margin-right: 180rpx;
				padding: 0 32rpx;
			}
			::v-deep .u-dropdown__menu__item {
				flex: none;
			}
			.right-filter {
				text-align: right;
				line-height: 44px;
				width: 150rpx;
				margin-left: 20rpx;
			}
			/deep/ .u-dropdown__content {
				position: fixed!important;
				top: inherit!important;
			}
			.slot-content {
				background: #fff;
				width: 100%;
				.dropdown-row {
					padding: 10rpx 30rpx;
					background: #f5f5f5;
				}
				.row1 {
					width: 100%;
					padding: 10rpx 30rpx;
					
					.bnt-2 {
						width: 330rpx;
					}
				}
			}
			
		}
		.bnt-primary {
			background: #2979ff!important;
			border-color: #2979ff;
			color: #fff;
		}
		.card {
			font-size: 12px;
			color: #868c9a;
			.pane {
				transition: all .2s ease; 
			}
		}
		.divline {
			height: 2px;
			background: #f3f3f3;
		}
		.content {
			overflow-y: auto;
			width: 100%;
			.empty {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.img {
				width: 200px;
				height: 160px;
			}
		}
		.list-box {
			display: flex;
			width: 100%;
			height: auto;
			background: #fff;
			padding: 30rpx;
		}
		.bnt {
			width: 210rpx;
			word-wrap: break-word;
			padding: 0;
			margin: 0;
			overflow: hidden;
			background: #f5f5f5;
		}
		.u-hairline-border:after {
			border: none;
		}
		.top-title {
			margin-top: 20rpx;
			padding: 0 30rpx;
			text-align: center;
			font-weight: bolder;
		}
		.popup-view {
			overflow-y: scroll;
			/deep/ .u-drawer-content {
				height: 93%!important;
				border-radius: 40px 40px 0px 0px!important;
			}
		}
		.box {
			padding: 20rpx 30rpx;
			.label {
				font-size: 12px;
				margin-bottom: 30rpx;
				color: #868c9a;
			}
			.box-row {
				padding: 20rpx 30rpx;
				background: #f5f5f5;
				
			}
			.col-right {
				text-align: right!important;
				.icon {
					margin-left: 10rpx;
				}
			}
			.bnt-3 {
				width: 330rpx;
			}
			.select-wrapper {
				overflow-y: scroll;
				transition: all .4s ease;
				height: 90rpx;
			}
			.max-height {
				height: 250rpx;
			}
		}
	}
</style>
