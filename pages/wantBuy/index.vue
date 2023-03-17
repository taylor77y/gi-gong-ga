<template>
	<view class="page">
		<!-- <head-title :title="i18n.title" /> -->
		<view class="header">
			<u-icon name="arrow-left" size="35" @click="turnBack"></u-icon>
			<view class="middle">
				<text>{{i18n.title}}</text>
				<u-icon name="arrow-down" size="30" class="ml-10"></u-icon>
			</view>
			<view class="right">
				<view class="mr-10">USD</view>
				<image class="icon-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAdCAYAAAC5UQwxAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACGSURBVHgB7dTBCYAgGMXxFzRIo7RJbtAI2iaN0ihtYngoPsS62Hsd8g9BeehXKgKtFikPYQmLEHViEtBir4Ed7rGQjS2oK+ABi4Sr2EzCiuBExC7QruEAbjt+kZ3SEdy2fIC5YVzpC6QYC3Q50pv72qPLZ8/pfSuI2T8LECTFoMagxlrfdQAS6JwCrD5tegAAAABJRU5ErkJggg==" mode=""></image>
				<view class="line"></view>
				<u-icon name="more-dot-fill" size="30" class="ml-10"></u-icon>
			</view>
		</view>
		<view class="container">
			<view class="select-container">
				<view class="selects">
					<view :class="{'choose': firstTab === 'Buy'}" class="mr-40" @click="firstTab = 'Buy'">{{i18n.wym}}</view>
					<view :class="{'choose': firstTab === 'Sell'}" @click="firstTab = 'Sell'">{{i18n.wymai}}</view>
				</view>
				<view class="right-icon">
					<u-icon name="file-text-fill" size="30" color="#868c9a"></u-icon>
				</view>
			</view>
			<u-tabs :list="tabList" :scrollable="false" active-color="#2979ff" inactive-color="#868c9a" :current="currentIndex" @change="tabClickHanlder" />
			<view class="filter-selector">
				<u-dropdown ref="uDropdown" :close-on-click-mask="false" class="u-dropdown left-uDropdown">
					<u-dropdown-item :title="i18n.je" class="left-d">
						<view class="slot-content">
							<u-row class="row">
								<u-input v-model="total" type="number" :placeholder="i18n.qsrze" :border="false"  />
								<text>USD</text>
							</u-row>
							<u-row class="row1 mt-20">
								<u-col span="4" v-for="(item, index) in numList" :key="index">
									<u-button size="medium" class="mb-20 bnt" @click="handleNumBut(item)">{{item}}</u-button>
								</u-col>
							</u-row>
							<u-row justify="space-between" class="row1 mt-30">
								<u-row gutter="16" span="6">
									<u-button type="primary" size="medium" class="bnt-2">{{i18n.zz}}</u-button>
								</u-row>
								<u-row span="6">
									<u-button type="primary" size="medium" class="bnt-2">{{i18n.qr}}</u-button>
								</u-row>
							</u-row>
						</view>
					</u-dropdown-item>
					<u-dropdown-item :title="i18n.jyfs">
						<u-row gutter="16" class="list-box">
							<u-col span="4" v-for="(bnt, index) in getMotBntList" :key="index">
								<u-button size="medium" class="mb-20 bnt" @click="handleBut(bnt)">{{bnt}}</u-button>
							</u-col>
						</u-row>
					</u-dropdown-item>
				</u-dropdown>
				<view class="right-filter mr-32" @click="showFilter = true">
					<text class="">{{i18n.sx}}</text>
					<image style="width: 20rpx;height: 30rpx; " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAWCAYAAAAinad/AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEGSURBVHgB7ZQ7jsIwEIZnJkS7Za6QG+wRNjdZigUhGiIQ4lEQBFQIpUTQACeAm8ARcgSXEAhmEgkJosQ8QgdfZXvGv+bhMTruzNAPfgUyggAi9wVbQ5LWgex4BC/ktWI7+BacrwcZQclpOnZeAAUWV3ADzyLlolkrWFGaTbvk+ahb4SE8iDzKbqtW/IuiixsHw4mDhHd1VwaQb9cL8/Mek5z6o0mFAF2FjpC0t9p2+ao0mObdG45/NdKWvDRiJs/nGjtcmvidVLGQgTv9wSOsLyPySTejpiWgfGcEQfySSBO6KfYoH7G3FeMRW6ntd8BjMucRMhvVf1vll1MZw48TaGsmzWESJ4EyT8v9je65AAAAAElFTkSuQmCC"></image>
				</view>
				<!-- filter 底部弹出层 -->
				<u-popup v-model="showFilter" mode="bottom" :closeable="true" border-radius="14" class="popup-view">
					<view class="top-title">
						<text>{{i18n.ggsx}}</text>
					</view>
					<!-- Fiat Amount -->
					<view class="box mt-60">
						<view class="label">{{i18n.ze}}</view>
						<u-row class="row">
							<u-input v-model="total_usd" type="number" :placeholder="i18n.qsrze" :border="false"  />
							<text>USD</text>
						</u-row>
					</view>
					<!-- Means of transaction -->
					<view class="box mt-60">
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
								<u-col span="4" v-for="item in getMotBntList" :key="item">
									<u-button size="medium" class="mb-20 bnt">{{item}}</u-button>
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
								<u-col span="4" v-for="item in motBntList" :key="item">
									<u-button size="medium" class="mb-20 bnt">{{item}}</u-button>
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
					</view>
					<view class="divline"></view>
					<view class="box mt-60">
						<u-row justify="space-between" class="row1 mt-30">
							<u-row gutter="16" span="6">
								<u-button type="primary" size="medium" class="bnt-3">{{i18n.zz}}</u-button>
							</u-row>
							<u-row span="6">
								<u-button type="primary" size="medium" class="bnt-3">{{i18n.qr}}</u-button>
							</u-row>
						</u-row>
					</view>
				</u-popup>
			</view>
			<view class="divline mt-10"></view>
			<view class="content">
				<u-empty :text=i18n.zwgg   mode="data" class="empty"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				firstTab: 'Buy', // buy or sell
				currentIndex: 0,
				tabList: [
					{
						name: 'BTC',
					}, {
						name: 'USDT',
					}, {
						name: 'ETH'
					},
				],
				motBntList: ['All', 'Bank Card ', 'Virtual Currency ','WeChat ','Alipay ','PayPal ','Western Union ','SWIFT','Others '],
				motBnt: 'All',
				total: null,
				numList: ['100','10000', '5000',this.$t("wantBuy").w,this.$t("wantBuy").w,this.$t("wantBuy").w],
				num: null,
				showFilter: false,
				total_usd: null,
				checked: false,
				showAll1: false,
				showAll2: false,
			}
		},
		computed: {
			i18n() {
				return this.$t("wantBuy")
			},
			getMotBntList() {
				return [this.i18n.qb,this.i18n.yhk,this.i18n.xnhb,this.i18n.wx,this.i18n.zfb,this.i18n.pp,this.i18n.xlhk,this.i18n.sgjhk,this.i18n.qt,]
			}
		},
		methods: {
			turnBack(){
				uni.navigateBack()
			},
			tabClickHanlder(index) {
				this.currentIndex = index
			},
			closeDropdown(){
				this.$refs.uDropdown.close();
			},
			handleBut(value){
				console.log(value)
				this.motBnt = value
			},
			handleNumBut(value) {
				this.num = value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background: #1d91ff;
		overflow: hidden;
	.header {
		height: 80rpx;
		padding: 0 20rpx;
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
			width: 200rpx;
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
	
		.container {
			background: #fff;
			border-radius: 70rpx 70rpx 0 0;
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
			// display: flex;
			// justify-content: space-between;
			.left-uDropdown {
				.left-d {
					
				}
			}
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
				float: right;
				position: relative;
				bottom: 58rpx;
				text-align: right;
				width: 150rpx;
				margin-left: 20rpx;
			}
		}
		.divline {
			height: 2px;
			background: #f3f3f3;
		}
		.content {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			.empty {
				height: 600rpx;
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
			word-wrap: normal;
			padding: 0;
			margin: 0;
			overflow: hidden;
			background: #f5f5f5;
		}
		.u-hairline-border:after {
			border: none;
		}
		.slot-content {
			background: #fff;
			width: 100%;
			.row {
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
		.top-title {
			margin-top: 20rpx;
			padding: 0 30rpx;
			text-align: center;
			font-weight: bolder;
		}
		.popup-view {
			overflow-y: scroll;
		}
		.box {
			padding: 20rpx 30rpx;
			.label {
				font-size: 12px;
				margin-bottom: 30rpx;
				color: #868c9a;
			}
			.row {
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
