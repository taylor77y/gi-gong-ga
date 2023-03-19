<template>
	<view class="home px-24">
		<header-home />
		<view style="height: 20rpx;"></view>
		<home-banner :banner="banner" />
		<home-notice :notifications="noticeList" />
		<home-application :list="application" />
		<view style="display: flex;justify-content: space-between;">
		<view class="f-buy" >
			<view class="left" style="display: flex;">
				<view class="title" style="width:80rpx;height: 80rpx">
					<image src="../../static/image/home/2/11.png" style="width: 100%;height: 100%;" />
				</view>
				<view style="line-height: 80rpx;">
					{{i18n.kauisuchongbi}}
				</view>
			</view>
			<view class="right" @click="toF()">
				<image src="../../static/image/home/2/13.png" />
			</view>
		</view>
		<view class="f-buy" >
			<view class="left" style="display: flex;">
				<view class="title" style="width:80rpx;height: 80rpx">
					<image src="../../static/image/home/2/12.png" style="width: 100%;height: 100%;" />
				</view>
				<view style="line-height: 80rpx;">
					{{i18n.kuaisutibi}}
				</view>
			</view>
			<view class="right" @click="toWith()">
				<image src="../../static/image/home/2/13.png" />
			</view>
		</view>
		</view>
		<!-- <home-hot-list :list="fList" /> -->
		<home-hot-list :list="coinListT" />
		<home-list-btn @getCode="getCode" :list="homeTitle" />
		<view class="list-title-box">
			<view class="name">{{ i18n.mc }}</view>
			<view class="money">{{ i18n.zxj }}</view>
			<view class="right">24h{{ i18n.zdf }}</view>
		</view>
		<!-- <home-list :list="bList" :state="0" :curType="cur" /> -->
		<home-list :list="coinList" :state="0" :curType="cur" />
		<!-- <view class="find-box">
			<view class="left">
				<find-title :list="findTitle" />
			</view>
			<view class="right">
				<image src="../../static/image/home/12.png">
			</view>
		</view> -->
		<!-- <view class="tips">
			风险提示:本平台包含第三方内容，我们不为其内容背书。数字资产价格波动剧 烈，投资前请做好研究。<text>在此处查看完整条款</text>。
		</view>
		<journalism-list />
		<view class="d-flex-between-center author">
			<view class="left ">精选创作者</view>
			<view>查看更多</view>
		</view>
		<author-list />
		<view class="goods-title">
			推荐您的投资商品
		</view>
		<view class="d-flex-between-center goods">
			<view class="left d-flex align-items-center">
				<image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
					USDT
			</view>
			<view class="d-flex align-items-center right">
				<text>年利率</text>
				0.6%-132%
			</view>
		</view> -->
		<!-- <home-good-list /> -->
		<!-- 		<home-hot-list :title="'热门合约'" />
        <home-hot-list :title="'热门币对'" /> -->
		<!-- <u-popup v-model="showUpdate" border-radius="30" length="500" :mask-close-able="false">
			<view class="update overflow-hidden position-relative">
				<view class="d-flex justify-content-center align-items-center update-bg">
					<image src="../../static/image/icon/update.png" style="width: 74rpx;height: 70rpx;"></image>
					<text class="font-size-34 text-white ml-20">发现新版本</text>
				</view>
				<view class="mx-40 my-30 font-size-22">
					<text class="d-block py-3">1.修复了一些BUG；</text>
					<text class="d-block py-3">2.优化了一部分页面；</text>
				</view>
				<view class="buttons">
					<u-line-progress active-color="#ef324c" class="mb-20" :percent="downProgress" v-if="downProgress">
					</u-line-progress>
					<view class="d-flex justify-content-between" v-else>
						<button class="btn btn1" @click="showUpdate = false">下次提示</button>
						<button class="btn btn2" @click="downFile">立即更新</button>
					</view>
					<view v-if="downProgress == 100">
						<button class="btn btn2" style="width: 100%;" @click="downInstall">立即安装</button>
					</view>
				</view>

			</view>
		</u-popup> -->
		<tabar-com />
	</view>
</template>

<script>
	import {
		langs,
		currencys
	} from "./../setting/data.js"
	import {
		gupiao,
		coinCurrencyMarket
	} from './data.js'
	export default {
		data() {
			return {
				cur: "UPDOWN",
				bList: [],
				fList: [],
				noticeList: [{
						title: '测试111的撒大大叔大婶大婶大婶大婶大婶大婶大婶大婶大婶大婶大婶大婶大婶1'
					},
					{
						title: '测试2222'
					}
				],
				lang: '',
				swiper: [],
				activeHighQualityProject: 0,
				gupiao,
				activeGupiaoDot: 0,
				coinCurrencyMarket,
				showDownload: true,
				hasClickDown: false, //是否已经点击过下载,
				timer: null,
				coinList:[],
				coinListT:[]
			};
		},

		onLoad() {
			uni.setStorageSync('ossUrl','http://oss.obk3.com/')
			// this.getBList("UPDOWN");
			// this.getFList("TOP");
			this.getCoinData()
			uni.setNavigationBarTitle({
				title: this.$store.state.site_name
			})
			this.getHY()
			
			// #ifdef APP-PLUS
			//检查更新
			this.checkUpdate()
			// #endif
		},
		destroyed() {
			if (this.timer) { //注销定时器
				console.log('注销定时器')
				clearInterval(this.timer);
				this.timer = null;
			}
		    console.log('我离开了 ')	
		},
		onShow() {
			this.getNotice()
			this.timer = setInterval(() => {
				// this.getBList(this.cur);
				// this.getFList("TOP");
				this.getCoinData()
			}, 5000);
		},
		methods: {
			getCoinData(){
				this.$u.api.common.getCoinData().then(res => {
					// console.log('getCoinData',res)
					if(res.result){
						try{
							let data = JSON.parse(res.result)
							console.log('getCoinData-data',data.data)
							if(data.code == 0){
								this.coinList = data.data
								let arr = []
								data.data.forEach(e=>{
									if(e.name == 'BTC/USDT'){
										arr[0] = e
									}else if(e.name == 'ETH/USDT'){
										arr[1] = e
									}else if(e.name == 'ETC/USDT'){
										arr[2] = e
									}
								})
								this.coinListT = arr
							}
						}catch(e){
							
						}
					}
				})
			},
			getHY(){
				this.$u.api.fack.getCurrencyConfiguration().then(res=>{
					this.$store.commit('setRate', res.result[0])
				})
			},
			toF(){
				uni.navigateTo({
					url:'/pages/recharge/rechargeList'
				})
			},
			toWith() {
				uni.navigateTo({
					url:'/pages/withDraw/withDraw'
				})
			},
			//公告列表
			getNotice() {
				const index = uni.getStorageSync('lang') || 'en'
				const language = {
					'zh': 'CHINESE_SIM',
					'en': 'ENGLISH',
					'ft': 'CHINESE_TRAD',
					'hy': 'KOREAN',
					'jp': 'JAPANESE',
					'tg': 'THAI'
				}
				const data = {
					noticeType: "OFFICIAL",
					global: language[index]
				};
				this.$u.api.common.getNotices(data).then(res => {
					this.noticeList = res.result
				})
			},
			getCode(index) {
				switch (index) {
					case 0:
						this.getBList("UPDOWN");
						break;
					case 1:
						this.getBList("VOLUME");
						break;
					case 2:
						this.getBList("PROJECT")
						break;
					default:
						break;
				}
			},
			//获取B的列表
			getBList(currery) {
				this.$u.api.common.getCurrencys(currery).then(res => {
					this.bList = res.result;
					this.cur = currery;
				})
			},
			getFList(currery) {
				this.$u.api.common.getCurrencys(currery).then(res => {
					let arr = [];
					let data = res.result;
					for (var i = 0; i < 3; i++) {
						arr.push(data[i])
					}
					this.fList = arr;
				})
			},
			//检查更新
			checkUpdate() {
				this.$u.api.common.getSetting('version').then(res => {
					const version = res.message.value.split(',')
					// version[0]:更新方式,wgt还是apk,version[1]:最新的版本号
					this.checkHotUpdate(version[0], version[1])
				})
			}

		},
		computed: {
			i18n() {
				return this.$t("home")
			},
			i18n2() {
				return this.$t("market")
			},
			banner() {
				return [{
						pic: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
					},
					{
						pic: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
					}
				]
			},
			application() {
				return [
					 {
					 	img: '../../static/image/home/2/1.png',
					 	title: this.i18n.application[0],
					 	value: '/pages/flashCash/index'
					 },
					 {
					 	img: '../../static/image/home/2/2.png',
					 	title: this.i18n.application[1],
					 	value: '/pages/wantBuy/index'
					 },
					 {
					 	img: '../../static/image/home/2/3.png',
					 	title: this.i18n.application[2],
					 	value: '/pages/trendDetails/index'
					 },
					 {
					 	img: '../../static/image/home/2/4.png',
					 	title: this.i18n.application[3],
					 	value: '/pages/fm-home/index'
					 },
					 {
					 	img: '../../static/image/home/2/5.png',
					 	title: this.i18n.application[4],
					 	value: '/pages/fund/assets'
					 },
					 {
					 	img: '../../static/image/home/2/6.png',
					 	title: this.i18n.application[5],
					 	value: '/pages/fund/index'
					 },
					 {
					 	img: '../../static/image/home/2/7.png',
					 	title:this.i18n.application[6],
					 	value: '/pages/machine/index'
					 },
					 {
					 	img: '../../static/image/home/2/8.png',
					 	title:this.i18n.application[7],
					 	value: '/pages/pledgeLoan/index'
					 },
					 {
					 	img: '../../static/image/home/2/9.png',
					 	title: this.i18n.application[8],
					 	value: '/pages/recharge/recharge-record?code=3'
					 },
					 {
					 	img: '../../static/image/home/2/10.png',
					 	title: this.i18n.application[9],
					 	value: ''
					 }
				]
			},
			homeTitle() {
				return [
				 	this.i18n2.tagBtnFour[0].name,
					 this.i18n2.tagBtnFour[1].name,
					 this.i18n2.tagBtnFour[2].name,
					 this.i18n2.tagBtnFour[3].name
				 ]
				// return [
				// 	'自选', '热门', '新币上线', '涨幅榜', '跌幅榜'
				// ]
				return this.i18n.homeTitle
			},
			findTitle() {
				return [
					'发现', '关注'
				]
			}

		},
		watch: {

		},
		filters: {

		},
		onHide() {
			clearInterval(this.timer);
			this.timer = null;
			// this.$store.state.socket.removeListener('daymarket')
		},
		onUnload() {
			clearInterval(this.timer);
			this.timer = null;
			// this.$store.state.socket.removeListener('daymarket')
		}
	}
</script>
<style lang="scss" scoped>
	.goods {
		padding: 24rpx 0;

		.left {
			color: #1F222B;
			font-size: 32rpx;
			font-weight: 500;

			& image {
				width: 54rpx;
				height: 54rpx;
				border-radius: 50%;
				margin-right: 14rpx;

			}
		}

		.right {
			color: #5EBA89;
			font-size: 30rpx;
			font-weight: 500;

			text {
				color: #8D9099;
				font-size: 22rpx;
				font-weight: 400;
				margin-right: 14rpx;
			}
		}
	}

	.goods-title {
		color: #1F222B;
		font-size: 34rpx;
		font-weight: 500;
	}

	.author {
		font-size: 28rpx;
		color: #8D9099;
		margin: 40rpx 0 24rpx 0;

		.left {
			color: #1F222B;
			font-size: 34rpx;
			font-weight: 500;
		}
	}

	.tips {
		margin-top: 24rpx;
		font-size: 20rpx;
		color: #8D9099;

		text {
			color: #D4B02D;
		}
	}

	.find-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 40rpx;

		.left {}

		.right {
			& image {
				width: 28rpx;
				height: 28rpx;
			}
		}
	}

	.list-title-box {
		display: flex;
		align-items: center;
		color: #8D9099;
		font-size: 24rpx;
		margin-top: 36rpx;

		.name {
			width: 432rpx;
		}

		.money {}

		.right {

			margin-left: auto;
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

	.home {
		background: #fff;
		// overflow: hidden;
		// padding-top: var(--status-bar-height);
		// position: relative;
		// background-image: url('./../../static/image/icon/home-bg.png');
		// background-repeat: no-repeat;
		// background-size: 100% 530rpx;
		// background-position: left top;
		// padding-bottom: 180rpx;
	}


	.update {
		padding-bottom: 200rpx;

		.update-bg {
			height: 96rpx;
			background-image: url('./../../static/image/icon/update-bg.png');
			background-repeat: no-repeat;
			background-size: cover;
		}

		.buttons {
			position: absolute;
			left: 40rpx;
			right: 40rpx;
			bottom: 46rpx;

			.btn {
				width: 47%;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 26rpx;
				border: 2rpx solid #ef324c;
				margin: 0;

				&.btn2 {
					background-color: #ef324c;
					color: #fff;
				}
			}
		}

	}
</style>
