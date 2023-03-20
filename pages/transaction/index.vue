<template>
	<view class="container">
		<view style="height: 56rpx;"></view>
		<view class="top-btn">
			<view class="item" @click="getTopBtn(index)" :class="{'item1': btnCode === index}"
				v-for="(item, index) in topName" :key="index">{{ item }}</view>
		</view>
		<view class="bi-title d-flex-between-center">
			<view class="left" @click="showSpec = true">
				<image src="../../static/image/new/1.png" />
				{{pairsItem.name}}
				<!-- {{pairsItem.pairsName}} -->
				<text class="num" :class="{'text-red': pairsItem.change_ratio < 0}">
					<text v-show="pairsItem.change_ratio > 0 "> + </text>
					<text v-show="pairsItem.change_ratio < 0 "> - </text>
					{{ pairsItem.change_ratio }}%
					<!-- {{pairsItem.updown*100|SubString(2)}}% -->
				</text>
			</view>
			<view class="right" @click="getLine">
				<image src="../../static/image/new/2.png" />
				<!-- <image src="../../static/image/new/3.png" />
				<image src="../../static/image/new/4.png" /> -->
			</view>
		</view>
		<view class="x-box d-flex-between-center">
			<view class="left">
				<view class="d-flex-between-center">
					<view>{{ i18n.sl }}</view>
					<view>{{ i18n.jg }}</view>
				</view>
				<view class="d-flex-between-center" style="margin-bottom: 10rpx;">
					<!-- <view>(BUSD)</view>
					<view>(LINK)</view> -->
				</view>
				<right-area :max-buy="maxBuy" :code="0" :openup="buyData" />
				<view class="money">
					<!-- {{nowData.nowPrice}} -->
					{{pairsItem.close}}
				</view>
				<view class="zhehe">
					<!-- ≈{{ setRate.mark }}{{ nowData.nowPrice * setRate.rate |SubString(4) }} -->
					≈ {{ rate.mark }} {{ pairsItem.close * rate.rate |SubString(4) }}
				</view>
				<right-area :max-buy="maxSell" :code="1" :openup="sellData" />
				<view class="d-flex align-items-center">
					<view class="left-input d-flex-between-center" @click="getLever()">
						<view>{{ leverCode }}</view>
						<view style="transition: all 0.3s;" :class="{'r-icon1' : magnification}">
							<image src="../../static/image/new/6.png" />
						</view>
					</view>
					<view>
						<image style="width: 52rpx;height: 52rpx;" src="../../static/image/new/10.png" />
					</view>
				</view>

			</view>
			<view class="right">
				<view class="r-img" v-if="!sellState">
					<view class="l-sell">
						{{ i18n.mairu }}
					</view>

					<view class="r-sell" @click="sellState = true">
						{{ i18n.maichu }}
					</view>

				</view>
				<view class="r-img" v-else>
					<view class="l-sell1" @click="sellState = false">
						{{ i18n.mairu }}
					</view>

					<view class="r-sell1">
						{{ i18n.maichu }}
					</view>

				</view>
				<view class="limit-box">

					<image style="width: 26rpx;height: 26rpx;" src="../../static/image/new/5.png" />
					<view class="l-cont" @click="getFixedPrice()">
						{{ limitFn[priceCode] }}
					</view>
					<view class="r-icon" :class="{'r-icon1' : fixedPriceCode}" @click="getFixedPrice()">
						<image style="width: 18rpx;height: 10rpx;" src="../../static/image/new/6.png" />
					</view>
					<view class="price-drop-down" v-if="fixedPriceCode">
						<view class="item" :class="{'item1': priceCode === index}" v-for="(item, index) in limitFn"
							:key="index" @click="getLimit(index)">{{ item }}</view>
					</view>
				</view>
				<view class="l-sum" v-if="priceCode === 1">
					<image src="../../static/image/new/9.png" @click="getReduce(1)" />
					<input @input="checkNum1" v-model="search" placeholder-style="background: #F6F6F6;"
						class="f-input" />
					<view class="r-icon" @click="getAdd(1)">
						<image src="../../static/image/new/8.png" />
					</view>
				</view>
				<view style="height: 14rpx;"></view>
				<view class="l-sum">
					<image src="../../static/image/new/7.png" @click="getReduce(2)" />
					<input @input="checkNum" :placeholder="i18n.sl" v-model="searchs"
						placeholder-style="background: #F6F6F6;color: #B0B3BA" class="f-input" />
					<view class="r-icon" @click="getAdd(2)">
						<image src="../../static/image/new/8.png" />
					</view>
				</view>
				<view class="stpes-list">
					<!-- <view :class="{'item1': percentCode.includes(index)}" @click="getPercent(index)" class="item"
						v-for="(item, index) in numberFn" :key="index"></view> -->
						<view :class="{'item1': item.code}" @click="getPercent(index)" class="item"
							v-for="(item, index) in numberFn" :key="index"></view>
				</view>
				<view class="percent d-flex align-items-center">
					<view class="item" v-for="(item, index) in numberFn" :key="index">{{ item.val }}</view>
				</view>
				<view class="money-input">

					<input :disabled="true" :placeholder="`${$t('newFy').cjje}(USDT)`" v-model="search1"
						placeholder-style="background: #F6F6F6;color: #B0B3BA" class="f-input" />
						
				</view>
				<view class="available d-flex-between-center">
					<view>{{ i18n.ky }}</view>
					<view style="color: #000;">{{kyPrice |SubString(5) }}{{ pairsItem.symbol | upperCase }}</view>
				</view>
				<view class="available d-flex-between-center">
					<view>{{ $t('newFy').yiyou }}</view>
					<view style="color: #000;">{{usdtPrice |SubString(5) }}USDT</view>
				</view>
				<view class="f-btn" :class="{'f-btn1': sellState}" @click="buy(sellState)">
					{{ sellState ? i18n.maichu:i18n.mairu  }}
				</view>
			</view>
		</view>
		<view class="d-flex-between-center" style="background: #fff;">
			<view style="flex: 1">
				<u-tabs :bold="true" font-size="34" gutter="50" bg-color="#fff" inactive-color="#8D9099" bar-height="8"
					bar-width="60" active-color="#D4B02D" :list="tagBtn" :is-scroll="false" :current="current"
					@change="change"></u-tabs>
			</view>
			<view @click="getRecord"
				style="width: 50%;display: flex;justify-content: flex-end;padding-right: 24rpx;background: #fff;">
				<image style="width: 26rpx;height: 32rpx;" src="../../static/image/new/11.png" />
			</view>
		</view>
		<view v-if="entrustRecords.length > 0">
			<entrust-list :list="entrustRecords" :mode="2" :state="2" @chedan="chedan" />
		</view>
		<view v-else style="background: #fff;padding-top: 100rpx;">
			<u-empty :text="i18n.zwgdsj" mode="order"></u-empty>
		</view>
		<u-action-sheet :cancel-text="$t('fack').qx" @click="onClickLever" :list="lever" v-model="magnification">
		</u-action-sheet>
		<quotation-popup :show-spec.sync="showSpec" :list="pairs" @getTo="getTo"  :coinList ='coinList' />
		<tabar-com />
	</view>
</template>
<script>
	import socket from "../../common/ws/socket.js";
	import { getData } from '@/common/hooks/socketData.js'
	export default {
		data() {
			return {
        coinList:[],//币种数据
				list: [],
				showSpec: false,
				magnification: false, // 0.01 倍率
				leverCode: '0.1', // 默认第一个
				lever: [{
						text: '0.1'

					}, {
						text: '1',

					}, {
						text: '10'
					},
					{
						text: '50'
					},
					{
						text: '100'
					}
				],
				priceCode: 0, // 摸认 
				fixedPriceCode: false, // 限价单弹窗
				sellState: false, // false 买入 true 卖出
				percentCode: [],
				current: 0,
				search: 0,
				searchs: null,
				search1: '',
				btnCode: 1,
				pairs: [],
				pairsItem: {},
				usdtPrice: 0.00, // 已有
				kyPrice: 0, // 可用
				socket: null,
				entrustRecords: [],
				buyData: [],
				sellData: [],
				maxSell: 10,
				maxBuy: 10,
				nowData: {},
				timer: null,
				numberFn: [{
						val: '25%',
						code: false
					},
					{
						val: '50%',
						code: false
					},
					{
						val: '75%',
						code: false
					},
					{
						val: '100%',
						code: false
					}
				],
				
				interval: null,
				interval1: null,
				interval2: null,
				rate: {},
			};
		},
		created() {
			// 获取 汇率
			this.$u.api.fack.getCurrencyConfiguration().then(res=>{
				this.rate = res.result[0]
			})
			
			this.interval = setInterval(() => {
				if(this.pairsItem.symbol) this.getRealTimeOne(this.pairsItem.symbol);
				else this.getRealTimeOne();
			}, 5000)
		},
		onReady() {},
		onLoad() {},
		onShow() {
      this.btnCode = 1;
			let member = uni.getStorageSync("userId") || '';
			this.getPairsList();
			this.getBalances(member);
			this.getNowList();
			if (member) {
				this.timer = setInterval(() => {
					if (member) {
						this.getRealtime()
						
						// this.getPairsList();
						this.getBalances(member);
						this.getNowList();
					} else {
						clearInterval(this.timer);
						this.timer = null;
					}
				}, 5000);
			}

			this.sellState = this.setSellCode === 1 ? false : true
		},
		beforeDestroy() {},
		watch: {
			// 打开类型切换
			showSpec(val) {
				if(val == true) this.getRealtime();
				else {
					clearInterval(this.interval1)
					this.interval1 = null
				}
			},
			sellState() {
				this.emptyFn()
			},
			searchs() {
				if (this.priceCode === 0) {
					// 市价 金额 === 数量*指数价格 
					this.search1 = this.getFloat(this.searchs * this.nowData.nowPrice, 5) 
				} else {
					this.search1 = this.getFloat(this.searchs * this.search, 5)
				}

			}	
		},
		filters:{
			upperCase(str) {
				if(str)
					return str.toLocaleUpperCase();
			}
		},
		methods: {
			// 获取类型的币值 实时数据
			async getRealtime() {
				this.$u.throttle(async () => {
					const { code,	data } = await this.$u.api.trendDetails.getRealtime();
					if (code == '0') {
						this.pairs = data
					}
				}, 2000)
			},
			// 获取当前币值
			async getRealTimeOne(symbol) {
				const { code, data } = await this.$u.api.trendDetails.getRealtime(symbol);
				if (code == '0') {
					this.pairsItem = data[0]
					if(!this.socket) {
						this.socket = null
						this.socketFn()
					}
				}
			},
			
			//撤单
			chedan(item) {
				this.$u.api.bibi.closeEntrust(item.id).then(res => {
					if (res.status == "SUCCEED") {
						this.$utils.showToast(this.i18n.cdcg)
					} else {
						this.$utils.showToast(res.errorMessage)
					}
					this.getNowList();
				})
			},
			socketFn() {
				if(!this.pairsItem.symbol) return;
				this.socket = new socket(`wss://thasjhdhjg.site/data/websocket/3/${this.pairsItem.symbol}`)
				this.socket.doOpen();
				this.interval2 = setInterval(()=> {
					let {code, data} = getData()
					if(code == '0') {
						this.buyData = data.asks.slice(0, 5);
						this.sellData = data.bids.slice(0, 5);
					}
				}, 3000)
				this.socket.on("open", (res) => {
					// this.socket.send("PING");
					// this.socket.send(`initEntrust-${this.pairsItem.pairsName}`);
				});
				this.socket.on("message", this.onMessage);
			},
			getLine() {
				uni.navigateTo({
					url: `/pages/kLine/index?name=${this.pairsItem.pairsName}&code=0`
				})
			},
			checkNum(e) {
				console.log(e)
				let val = e.target.value
				var that = this
					val = val.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				val = val.replace(/^0+\./g, '0.');
				val = (val.match(/^\d*(\.?\d{0,8})/g)[0]) || null
				this.$nextTick(() => {
					that.searchs = val
				})
			},
			checkNum1(e){
				  var that = this
				  e.target.value = (e.target.value.match(/^\d*(\.?\d{0,5})/g)[0]) || null
				  this.$nextTick(() => {
						that.search= e.target.value
				  })
			},
			// 限价 输入限制
			// checkNum() {

			// 	this.$nextTick(() => {
			// 		let val = this.search;
			// 		val = val.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
			// 		val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
			// 		val = val.replace(/^0+\./g, '0.');
			// 		val = val.match(/^0+[1-9]+/) ? val = val.replace(/^0+/g, '') : val
			// 		val = (val.match(/^\d*(\.?\d{0,4})/g)[0]) || ''
			// 		this.search = val;
			// 	});
			// },
			// 买入卖出数量
			// checkNum1() {
			// 	this.$nextTick(() => {
			// 		let val = this.search1;
			// 		val = val.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
			// 		val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
			// 		val = val.replace(/^0+\./g, '0.');
			// 		val = val.match(/^0+[1-9]+/) ? val = val.replace(/^0+/g, '') : val
			// 		val = (val.match(/^\d*(\.?\d{0,4})/g)[0]) || ''
			// 		this.search1 = val;
			// 	});
			// },
			onMessage(data) {
				this.buyData = data.openup.slice(0, 5); //显示20条
				this.sellData = data.opendown.slice(0, 5);
				this.maxBuy = Math.max.apply(
					Math,
					data.openup.map(ele => ele.num)
				);
				this.maxSell = Math.max.apply(
					Math,
					data.opendown.map(ele => ele.num)
				);
			},
			getRecord() {
				uni.navigateTo({
					url: `/pages/record/index?code=2`
				})
			},
			getBalances() {
				let member = uni.getStorageSync("userId");
				this.$u.api.user.getBalanceList(member).then(res => {
					res.result.balances.map(item => {
						if (item.currency === 'USDT') {
							this.usdtPrice = item.assetsBalance;
						}
					})
					res.result.balances.forEach(item => {
						if (item.currency === this.pairsItem.tokenCur) {
							this.kyPrice = item.assetsBalance
						}
					})
	
				})
			},
			getTo(item) {				
				this.socket.send(`initEntrust-${item.pairsName}`);
				this.pairsItem = item
				this.socketFn()
				this.getBalances()
			},
			//币种
			getPairsList() {
				this.$u.api.bibi.getPairs("USDT", "SPOT").then(res => {
					this.pairs = res.result;
					if (JSON.stringify(this.pairsItem) == "{}") {
						this.pairsItem = res.result[0]
					}
					this.getBalances()
					this.socketFn()
					this.getCoinInfoList();
				})
			},
			getCoinInfoList() {
				this.$u.api.bibi.getCoinInfo(this.pairsItem.pairsName).then(res => {
					let json = JSON.parse(res.result)
					this.nowData = json
				})
			},
			getEntrustDom() {
				let member = uni.getStorageSync("userId");
				let pairsName = this.pairsItem.pairsName
				this.$u.api.fack.getEntrustList(member, pairsName).then(res => {
					console.log("不", res)
				})
			},
			// 清空数据
			emptyFn() {
				this.search1 = null
				this.searchs = null
				this.numberFn = [{
						val: '25%',
						code: false
					},
					{
						val: '50%',
						code: false
					},
					{
						val: '75%',
						code: false
					},
					{
						val: '100%',
						code: false
					}
				]
			},
			buy(state) {
				console.log("买卖结果", state)
				const {
					search1,
					usdtPrice
				} = this
				if (usdtPrice <= 0) {
					this.$utils.showToast(this.i18n.kyzjbz)
					return
				}
				console.log(this.pairsItem)
				let obj = {}
				obj.count = this.searchs;
				obj.entrustType = state === false ? 'BUY' : 'SELL';
				obj.matchFee = search1;
				obj.member = uni.getStorageSync('userId');
				obj.pairs = this.pairsItem.id;
				obj.percentageCount = 0;
				obj.price = this.nowData.nowPrice
				obj.priceType = this.priceCode == 0 ? "MARKET_PRICE" : "CUSTOM_PRICE" // 0市价 1限价

				this.$u.api.bibi.setEntrust(obj).then(res => {
					if (res.status === 'SUCCEED') {
						this.getNowList()
						this.$utils.showToast(this.i18n.zccg)
						this.getBalances()
						this.emptyFn()
					} else {
						this.$utils.showToast(res.errorMessage)
					}
					console.log("币单", res)
				})
			},
			// 点击的是第几个杠杆
			onClickLever(index) {
				this.leverCode = this.lever[index].text
			},
			getLever() {
				this.magnification = !this.magnification
				if (this.magnification) {
					this.lever.forEach(item => {
						if (item.text === this.leverCode) {
							item.color = '#D4B02D'
						} else {
							item.color = ''
						}
					})
				}
			},
			// 限价
			getLimit(index) {
				this.priceCode = index
				this.fixedPriceCode = false
			},
			getFixedPrice() {
				this.fixedPriceCode = !this.fixedPriceCode
				this.search = this.nowData.nowPrice
			},
			// 减
			getReduce(index) {
				if (index === 1) {
					if (this.search > 1) {
						this.search--
					}
				} else {
					if (this.searchs > 1) {
						this.searchs --
					}

				}

			},
			// 加
			getAdd(index) {
				if (index === 1) {
					this.search++
				} else {
					this.searchs++
				}
			},
            getFloat(number, n) {
            	n = n ? parseInt(n) : 0;
            	if(n <= 0) {
            		return Math.round(number);
            	}
            	// number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
				// number = number.substring(0, number.indexOf('.') + 1 + n)
				// console.log(number, '我是计算结果')
				console.log(number)
				number = String(number).replace(/^(.*\..{5}).*$/,"$1")
				number = Number(number)
            	// number = Number(number).toFixed(n); //补足位数
            	return number;
            },
			getPercent(index) {
				let amount = 0
				if (!this.sellState) {
					amount = this.usdtPrice / 4;
				} else {
					if (this.priceCode === 0) {
						amount = this.getFloat((this.kyPrice / 4) * this.nowData.nowPrice, 5);
						
					} else {
						amount = this.getFloat((this.kyPrice / 4) * this.search, 5);
					}
					
					
				}
				switch (index) {
					case 0:
						this.search1 = index === 0 && this.numberFn[0].code ? 0 : this.getFloat(amount * 1, 5);
						break;
					case 1:
						this.search1 = this.getFloat(amount * 2, 5) ;
						break;
					case 2:
						this.search1 = this.getFloat(amount * 3, 5) ;
						break;
					case 3:
					// this.usdtPrice
					// this.search1 = !this.sellState ? this.getFloat(this.usdtPrice, 4):this.getFloat(amount * 4, 4)
					    if (!this.sellState) {
							this.search1 = this.getFloat(this.usdtPrice, 5)
						} else {
							this.search1 = this.getFloat(amount * 4, 5)
						}
						// this.search1 = this.getFloat(amount * 4, 5) ;
						break;
				}
				if (this.priceCode === 0) {
					// 市价 数量 === 金额 / 指数
					
					
					if (index === 3 && this.sellState) {
						this.searchs = this.getFloat(this.kyPrice, 5)
						
					} else {
						this.searchs = this.getFloat(this.search1 / this.nowData.nowPrice, 5)
					}
					
				} else {
					this.searchs = this.getFloat(this.search1 / this.search, 5)
				}
				this.numberFn.forEach((item, key) => {
					if (item.code) {
						if (key >= index) {
							item.code = false
						}
					} else {
						if (key <= index) {
							item.code = true
						}
					}
				})

			},
			change(e) {
				this.current = e
				switch (e) {
					case 0:
						this.getNowList();
						break;
					case 1:
						this.getHisList();
						break;
					default:
						break;
				}
			},
			getHisList() {
				let obj = new Object();
				obj.member = uni.getStorageSync('userId')
				obj.pageNum = 1
				obj.pageSize = 10
				this.$u.api.bibi.getHistoryEntrust(obj).then(res => {
					let info = res.result.result;
					this.entrustRecords = info.records;
				})
			},
			getNowList() {
				let member = uni.getStorageSync('userId')
				this.$u.api.bibi.getEntrustList(member).then(res => {
					this.entrustRecords = res.result;
				})
			},
  // /pages/flashCash/index
			getTopBtn(index) {
        console.log("dasdasdasdsadsadsadas")
				this.btnCode = index
				const temp = {
					0: '/pages/flashCash/index',
					1: '/pages/transaction/index',
					2: '/pages/fIattributes/index'
				}
				if(temp[index]) {
					uni.navigateTo({
						url: temp[index]
					})
				} else {
					this.$utils.showToast(this.$t('setting').zwkf)
				}
			},
			getOtcAderList() {
				let json = {
					// page:1,
					// size:5,
					// currency:"USDT",
					// mccId:2,
					// direction="BUY"
				}
				this.$u.api.fack.getOtcAder(json).then(res => {
					console.log("返回结果", res)
				})
			}
		},
		computed: {
			i18n() {
				return this.$t("transaction")
			},
			setRate() {
				return this.$store.state.rate || {}
			},
			setSellCode() {
				return this.$store.state.sellCode || 1
			},
			limitFn() {
				// return ['限价单', '市价单']	
				return this.i18n.limitFn
			},
			// numberFn() {
			// 	return [
			// 		{val: '25%', code: false},
			// 		{val: '50%', code: false},
			// 		{val: '75%', code: false},
			// 		{val: '100%', code: false}
			// 	]
			// },
			tagBtn() {
				return this.i18n.tagBtn
			},
			topName() {
				return this.i18n.topName
			}
		},
		onHide() {
			if (this.timer) { //注销定时器
				console.log('注销定时器')
				clearInterval(this.timer);
				this.timer = null;
			}
			
			clearInterval(this.interval)
			this.interval = null
			clearInterval(this.interval2)
			this.interval2 = null
			
			if(this.socket) this.socket.toClose();
			this.socket = null
			// this.$store.state.socket.removeListener('daymarket')
		},
		onUnload() {
			if (this.timer) { //注销定时器
				console.log('注销定时器')
				clearInterval(this.timer);
				this.timer = null;
			}
		}

	}
</script>

<style lang="scss" scoped>
	.container {
		background: #F6F6F6;
		height: 400rpx;
		.text-red{
			color: #f6465d!important;
		}
		.r-icon1 {
			transform: rotate(180deg);
			transform-origin: center center;
		}

		.x-box {
			background: #fff;
			border-radius: 40rpx 40rpx 0 0;
			padding: 40rpx 24rpx;

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

			.right {
				flex: 1;

				.f-btn {
					width: 404rpx;
					height: 72rpx;
					background: #5EBA89;
					border-radius: 8rpx;
					color: #fff;
					font-size: 30rpx;
					font-weight: bold;
					text-align: center;
					line-height: 72rpx;
				}

				.f-btn1 {
					background: #E45360 !important;
				}

				.available {
					font-size: 26rpx;
					color: #8D9099;
					margin-bottom: 20rpx;

					.right {
						color: #000;
					}
				}

				.money-input {
					background: #F6F6F6;
					border-radius: 6rpx;
					margin: 30rpx 0;
					padding: 18rpx 0;

					.f-input {
						text-align: center;
						color: #1F222B;
						font-size: 32rpx;
						font-weight: bold;
					}
				}

				.percent {
					color: #B0B3BA;
					font-size: 24rpx;

					.item {
						width: 25%;
						text-align: center;
					}
				}

				.stpes-list {
					display: flex;
					align-items: center;
					margin: 14rpx;

					.item {
						width: 84rpx;
						height: 18rpx;
						background: #F6F6F6;
						margin-right: 12rpx;

						&:last-child {
							margin-right: 0rpx;
						}
					}

					.item1 {
						background: #5EBA89;
					}
				}

				.r-img {
					display: flex;
					align-items: center;

					.l-sell {
						display: flex;
						align-items: center;
						background-image: url(../../static/image/new/left1.png);
						background-size: 100% 100%;
						width: 199rpx;
						height: 52rpx;
						justify-content: center;
						font-size: 28rpx;
						color: #FFFFFF;
					}

					.r-sell {
						display: flex;
						align-items: center;
						margin-left: -30rpx;
						background-image: url(../../static/image/new/right1.png);
						background-size: 100% 100%;
						width: 233rpx;
						height: 52rpx;
						justify-content: center;
						color: #8D9099;
						font-size: 28rpx;
					}

					.l-sell1 {
						display: flex;
						align-items: center;
						background-image: url(../../static/image/new/right1-2.png);
						background-size: 100% 100%;
						color: #8D9099;
						width: 233rpx;
						height: 52rpx;
						justify-content: center;
						font-size: 28rpx;

					}

					.r-sell1 {
						display: flex;
						align-items: center;
						margin-left: -30rpx;
						background-image: url(../../static/image/new/left1-2.png);
						background-size: 100% 100%;
						width: 199rpx;
						height: 52rpx;
						justify-content: center;

						color: #FFFFFF;
						font-size: 28rpx;
					}
				}

				.l-sum {
					padding: 20rpx 24rpx;
					background: #F6F6F6;
					border-radius: 6rpx;
					font-size: 28rpx;
					color: #1F222B;
					font-weight: bold;
					display: flex;
					align-items: center;

					.f-input {
						// display:block;
						// margin:0 auto;
						text-align: center;
						color: #1F222B;
						font-size: 32rpx;
						font-weight: bold;
					}

					.r-icon {
						margin-left: auto;
					}

					& image {
						width: 40rpx;
						height: 40rpx;
					}
				}

				.limit-box {
					margin: 14rpx 0;
					padding: 10rpx 24rpx;
					background: #F6F6F6;
					border-radius: 6rpx;
					font-size: 28rpx;
					color: #1F222B;
					font-weight: bold;
					display: flex;
					align-items: center;
					position: relative;

					.price-drop-down {
						width: 100%;
						position: absolute;
						top: 62rpx;
						background: #fff;
						border-radius: 10rpx;
						box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
						z-index: 102;
						left: 0;

						.item {
							padding: 24rpx 0;
							text-align: center;
							color: #8D9099;
							font-size: 28rpx;

						}

						.item1 {
							color: #D4B02D;
						}
					}

					.l-cont {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.r-icon {
						transition: all 0.3s;
						margin-left: auto;
					}


				}
			}

		}

		.bi-title {
			padding: 30rpx 24rpx;

			.left {
				display: flex;
				align-items: center;
				justify-content: baseline;
				font-size: 38rpx;
				color: #000;
				font-weight: bold;

				.num {
					color: #5EBA89;
					font-size: 28rpx;
					margin-left: 14rpx;
					font-weight: 400;
				}

				& image {
					width: 48rpx;
					height: 48rpx;
					margin-right: 14rpx;
				}
			}

			.right {
				& image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 14rpx;
				}
			}
		}

		.top-btn {
			margin: 0 24rpx;
			border: 1rpx solid #B0B3BA;
			border-radius: 6rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow-x: scroll;

			padding: 0 30rpx;

			::-webkit-scrollbar {
				display: none
			}

			.item {
				text-align: center;
				// flex: 1;
				width: 200rpx;
				flex-basis: auto;
				flex-shrink: 0;
				font-size: 26rpx;
				color: #8D9099;
				margin-right: 30rpx;
				// width: 110rpx;
			}

			.item1 {
        width: 150rpx;
        color: #FFF;
        font-size: 26rpx;
        font-weight: 700;
        border-radius: 6rpx;
        padding: 10rpx 30rpx;
        background-color: #4A7AF5;


			}
		}
	}
</style>
