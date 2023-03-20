<template>
	<view class="container">
		<view style="height: 56rpx;"></view>

		<view class="bi-title d-flex-between-center">
			<view class="left" @click="showSpec = true">
				<image src="../../static/image/new/1.png" /> {{pairsItem.pairsName}}
				<text class="num num1">
					{{pairsItem.updown*100|SubString(2)}}%
				</text>
			</view>
			<view class="right" @click="getLine">
				<image src="../../static/image/new/2.png" />
				<!-- <image src="../../static/image/new/3.png" />
				<image src="../../static/image/new/4.png" /> -->
			</view>
		</view>
		<view class="top-btn">
			<view class="item" @click="getTopBtn(index)" :class="{'item1': btnCode === index}"
				v-for="(item, index) in topName" :key="index">{{ item }}
				<view class="btn-tag" v-if="index === 2">
					new
				</view>
			</view>
		</view>
		<view class="x-box">
			<view class="fee-box">
				<view @click="showBond = true" class="left-selset d-flex-between-center">
					{{ cuBond === 0 ? i18n.kaican:i18n.pingcan }}
					<image style="width: 18rpx;height: 10rpx;" src="../../static/image/new/6.png" />
				</view>
				<view class="cont-selset d-flex-between-center" @click="leversState = true">
					{{ leversCode }}
					<image :class="{'r-icon1' : leversState}" style="width: 18rpx;height: 10rpx;transition: all 0.3s;"
						src="../../static/image/new/6.png" />
				</view>
				<view class="left-selset" style="width: auto;text-align: center;margin: 0;">
					{{ i18n.dan }}
				</view>
				<!-- <view class="right-name">
					<view>
						资金费率/倒计时
					</view>
					<view class="top">
						0.0052%/04:20:23
					</view>
				</view> -->
			</view>
			<view class="d-flex-between-center">
				<view class="left">
					<view class="d-flex-between-center">
						<view>{{ i18n.shuliang }}</view>
						<view>{{ i18n.jiage }}</view>
					</view>
					<view class="d-flex-between-center" style="margin-bottom: 10rpx;">
						<!-- <view>(BUSD)</view>
						<view>(LINK)</view> -->
					</view>
					<right-area :code="0" :openup="buyData" />
					<view class="money">
						{{nowData.nowPrice}}
					</view>
					<view class="zhehe">
						≈{{ setRate.mark }}{{ nowData.nowPrice * setRate.rate |SubString(4) }}
					</view>
					<right-area :code="1" :openup="sellData" />
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
							{{ cuBond === 0 ? i18n.kaiduo:i18n.pingduo }}
						</view>

						<view class="r-sell" @click="sellState = true">
							{{ cuBond === 0 ? i18n.kaikong:i18n.pingkong }}
						</view>

					</view>
					<view class="r-img" v-else>
						<view class="l-sell1" @click="sellState = false">
							{{ cuBond === 0 ? i18n.kaiduo:i18n.pingduo }}
						</view>

						<view class="r-sell1">
							{{ cuBond === 0 ? i18n.kaikong:i18n.pingkong }}
						</view>

					</view>
					<view class="available">
						<view>{{ i18n.keyong }}</view>
						<view class="right">
							<view style="color: #000;">{{usdtPrice |SubString(2)}}USDT</view>
							<!-- 	<image src="../../static/image/new/14.png" /> -->
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
					<view class="l-sum">
						<image src="../../static/image/new/9.png" @click="getReduce(1)" />
						<input type="number" v-model="search" placeholder-style="background: #F6F6F6;"
							class="f-input" />
						<view class="r-icon" @click="getAdd(1)">
							<image src="../../static/image/new/8.png" />
						</view>
					</view>
					<view style="height: 14rpx;"></view>
					<!-- 	<view class="l-sum">
						<image src="../../static/image/new/7.png" @click="getReduce(2)" />
						<input type="number" placeholder="数量(LINK)" v-model="searchs"
							placeholder-style="background: #F6F6F6;color: #B0B3BA" class="f-input" />
						<view class="r-icon" @click="getAdd(2)">
							<image src="../../static/image/new/8.png" />
						</view>
					</view> -->
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

						<input type="number" :placeholder="i18n.shuliang" v-model="search1"
							placeholder-style="background: #F6F6F6;color: #B0B3BA" class="f-input" />

					</view>
					<view style="height: 40rpx;"></view>
					<!-- <view class="stop" @click="stopCode = !stopCode">
						<view class="circular" v-if="!stopCode"></view>
						<view v-else>
							<image src="../../static/image/new/15.png"></image>
						</view>
						止盈/止损
					</view>
					<view class="stop-input" v-if="stopCode">
						<view>
							<input type="number" placeholder="止盈" v-model="stop1"
								placeholder-style="background: #F6F6F6;color: #B0B3BA" class="f-input" />
						</view>
						<view>
							<input type="number" placeholder="止损" v-model="stop2"
								placeholder-style="background: #F6F6F6;color: #B0B3BA" class="f-input" />
						</view>
					</view> -->
					<!-- <view class="stop" @click="reduceCode = !reduceCode">
						<view class="circular" v-if="!reduceCode"></view>
						<view v-else>
							<image src="../../static/image/new/15.png"></image>
						</view>
						只减仓
					</view> -->
					<!-- 	<view class="available">
						<view>最大</view>
						<view class="right">
							<view>7999USDT</view>

						</view>
					</view> -->
					<!-- <view class="available">
						<view>保证金</view>
						<view class="right">
							<view>7999USDT</view>

						</view>
					</view> -->

					<view class="f-btn" :class="{'f-btn1': sellState}" @click="sub()">
						<text v-if="sellState">
							{{ cuBond === 0 ? i18n.kaikong:i18n.pingkong }}

						</text>
						<text v-else>
							{{ cuBond === 0 ? i18n.kaiduo:i18n.pingduo }}
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="d-flex-between-center" style="background: #fff;">
			<view style="flex: 1">
				<u-tabs :bold="true" font-size="34" gutter="50" bg-color="#fff" inactive-color="#8D9099" bar-height="8"
					bar-width="60" active-color="#D4B02D" :list="tagBtn" :is-scroll="false" :current="current"
					@change="change"></u-tabs>
			</view>
			<view @click="getRecord()"
				style="width: 50%;display: flex;justify-content: flex-end;padding-right: 24rpx;background: #fff;">
				<image style="width: 26rpx;height: 32rpx;" src="../../static/image/new/11.png" />
			</view>
		</view>
		<view class="yx-title">
			<view>{{ i18n.cclb }}</view>
			<view class="right" @click="isPosition = true">{{ i18n.yjpc }}</view>
		</view>
		<view v-if="current === 0">
			<view v-if="list.length > 0">
				<entrust-list :list="list" :mode="4" :state="3" @zhiyin="zhiyin" />
			</view>
			<view v-else style="background: #fff;padding-top: 100rpx;">
				<u-empty :text="$t('kLine').zwgdsj" mode="order"></u-empty>
			</view>
		</view>
		<view v-else>
			<view v-if="newList.length > 0">
				<entrust-list :list="newList" @chedan="chedan" :mode="3" :state="10"/>
			</view>
			<view v-else style="background: #fff;padding-top: 100rpx;">
				<u-empty :text="$t('kLine').zwgdsj" mode="order"></u-empty>
			</view>
		</view>
		<bond-popup @getAdd="getBondAdd" :show-spec.sync="showBond" />
		<quotation-popup :show-spec.sync="showSpec" :list="pairs" @getTo="getTo" />
		<u-action-sheet :cancel-text="$t('fack').qx" @click="onClickLever" :list="lever" v-model="magnification">
		</u-action-sheet>
		<u-action-sheet :cancel-text="$t('fack').qx" @click="onClickLevers" :list="levers" v-model="leversState">
		</u-action-sheet>
		<yx-add-popup @getAdd="sub" :show-pup.sync="ydAddCode" :current-dta="currentDta" />
		<u-modal :title="$t('common').hint" :confirm-text="$t('common').confirm" :cancel-text="$t('common').cancel"
			@confirm="confirmPosition" confirm-color="#D1A037" :show-cancel-button="true" v-model="isPosition"
			:content="content"></u-modal>
		<yx-stop-popup @getAdd="stopAdd" :money="nowData.nowPrice" :show-pup.sync="isStop" :curCode="isStopCode" />
		<tabar-com />
	</view>
</template>
<script>
	import th from '../../common/locales/th';
	import socket from "../../common/ws/socket.js";
	export default {
		data() {
			return {
				isStop: false, // 止盈 止损 弹窗
				isStopCode: false, // false 止盈 true 止损
				stopMoney: 0,
				stopList: {},
				isPosition: false,
				content: '是否一键平仓',
				ydAddCode: false,
				currentDta: {},
				list: [],
				newList: [],
				levers: [{
						text: '10x'

					}, {
						text: '20x',

					}, {
						text: '50x'
					},
					{
						text: '100x'
					}
				],
				leversCode: '20X',
				leversState: false,
				showBond: false,
				cuBond: 0, // 0 是全仓
				stop1: '',
				stop2: '',
				reduceCode: false, // 减仓
				stopCode: false, // 止盈 状态
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
				searchs: 56,
				search1: null,
				btnCode: 1,
				pairs: [],
				pairsItem: {},
				usdtPrice: 0.00,
				buyData: [],
				sellData: [],
				socket: new socket(),
				nowData: {},
				contractMulId: '',
				contractMul: 0, //合约乘数
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
				]
			};
		},
		onHide() {
			if (this.timer) { //注销定时器
				console.log('注销定时器', '我是永续')
				clearInterval(this.timer);
				this.timer = null;
			}
			// this.$store.state.socket.removeListener('daymarket')
		},
		onUnload() {
			if (this.timer) { //注销定时器
				console.log('注销定时器', '我是永续')
				clearInterval(this.timer);
				this.timer = null;
			}
			// this.$store.state.socket.removeListener('daymarket')
		},
		onLoad() {
			let member = uni.getStorageSync('userId')
			if (member) {
				this.getPairsList();
			}
			this.getBalances();
			this.content = this.i18n.sfyjpc
			uni.hideTabBar({})
		},
		onShow() {
			if (this.timer) { //注销定时器
				clearInterval(this.timer);
				this.timer = null;
			}
			let member = uni.getStorageSync('userId') || ''
			this.sellState = this.setSellCode === 1 ? false : true
			if (member) {
				this.timer = setInterval(() => {
					if (member) {
						this.getPairsList();
						this.getBalances();
					} else {
						clearInterval(this.timer);
						this.timer = null;
					}
				}, 5000);
			} else {
				clearInterval(this.timer);
				this.timer = null;
			}

		},
		methods: {
			//撤单
			chedan(item) {
				console.log(item,'我是永续撤单--------')
				this.$u.api.bibi.closeEntrust(item.id).then(res => {
					if (res.status == "SUCCEED") {
						this.$utils.showToast(this.$t('cdcg').cdcg)
					} else {
						this.$utils.showToast(res.errorMessage)
					}
					this.getEntrustOrderList();
				})
			},
			stopAdd(price) {
				console.log(this.isStop)
				if (price == '' && !price) {
					this.$utils.showToast(this.i18n.jgbnwk)
					return;
				}
				if (this.isStopCode) {
					if (price >= this.nowData.nowPrice) {
						this.$utils.showToast(this.i18n.jgbxxydqjg)
						return;
					}
				} else {
					if (price <= this.nowData.nowPrice) {
						this.$utils.showToast(this.i18n.jgbxdydqjg)
						return;
					}
				}
				const temp = {
					id: this.stopList.id,
					price,
					matchType: this.isStopCode ? 'ORD' : 'TRIGGER'

				}
				this.$u.api.yx.setOrdTriggerMatch(temp).then(res => {
					if (res.status === 'SUCCEED') {
						this.$utils.showToast(this.$t('transaction').zccg)
						this.getWarehousesList();
						this.isStop = false
					} else {
						this.$utils.showToast(res.errorMessage)
					}
				})
			},
			//止盈
			zhiyin(item, index) {
				console.log(item)
				this.isStopCode = index === 1 ? false : true
				this.stopMoney = item.closePrice
				this.stopList = item
				this.isStop = true

			},
			// 一键平仓调用
			confirmPosition() {
				let member = uni.getStorageSync('userId')
				let pairsName = this.pairsItem.pairsName
				this.$u.api.yx.setAllContractMatch(member, pairsName).then(res => {
					if (res.status === 'SUCCEED') {
						this.$utils.showToast(this.$t('transaction').zccg)
						this.getWarehousesList();
					} else {
						this.$utils.showToast(res.errorMessage)
					}
				})
			},
			getLine() {
				uni.navigateTo({
					url: `/pages/kLine/index?name=${this.pairsItem.pairsName}&code=1`
				})
			},
			socketFn() {
				this.socket.doOpen();
				this.socket.on("open", () => {
					this.socket.send("PING");
					this.socket.send(`initEntrust-${this.pairsItem.pairsName}`);
				});
				this.socket.on("message", this.onMessage);
			},
			// 清空数据
			emptyFn() {
				this.search1 = null
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
			sub(code) {
				const {
					search1,
					usdtPrice,
					sellState,
					contractMulId,
					contractMul
				} = this
				if (search1 <= 0) {
					this.$utils.showToast(this.i18n.qsrsl)
					return
				}
				if (usdtPrice <= 0) {
					this.$utils.showToast(this.i18n.kyzjbz)
					return
				}
				let leverId = ''
				let currentGangganType = 0
				this.levers.forEach(item => {
					if (item.leverDesc === this.leversCode) {
						leverId = item.id
						currentGangganType = item.lever
					}
				})
				console.log(this.pairsItem)
				const {
					pairsName,
					tokenCur,
					price
				} = this.pairsItem
				let obj = new Object();
				obj.coinName = tokenCur
				obj.contractHands = search1
				obj.contractMulId = contractMulId // 交易配置id
				obj.leverId = leverId
				obj.mainCur = pairsName.split("/")[1]
				obj.member = uni.getStorageSync('userId')
				obj.pairsName = pairsName
				obj.price = this.priceCode == 0 ? this.search:this.nowData.nowPrice
				obj.priceType = this.priceCode == 0 ? "MARKET_PRICE" : "CUSTOM_PRICE" // 0市价 1限价
				obj.tradeType = sellState ? "OPEN_DOWN" : "OPEN_UP"
				this.currentDta = {
					pairsName,
					price: this.nowData.nowPrice,
					num: search1,
					lever: currentGangganType,
					bond: search1 * contractMul * price / currentGangganType,
					sellState
				}
				if (code) {
					this.$u.api.yx.setContractOrder(obj).then(res => {
						console.log("永续合约结果", res)
						if (res.status === 'SUCCEED') {
							this.$utils.showToast(this.$t('transaction').zccg)
							this.ydAddCode = false
							this.change(this.current)

							this.emptyFn()
						} else {
							this.$utils.showToast(res.errorMessage)
						}
					})
				} else {
					this.ydAddCode = true
				}


			},
			// 交易配置id
			getjiaoyipeizhi() {
				this.$u.api.yx.getTransaction(this.pairsItem.pairsName).then(res => {
					if (res && res.status == "SUCCEED") {
						let data = res.result;
						this.contractMulId = data[0].id;
						// this.ensure = data[0].ensure;
						// // 合约乘数
						this.contractMul = data[0].contractMul;
					}
				})
			},
			getLeverList() {
				this.$u.api.yx.getLevers(this.pairsItem.pairsName).then(res => {
					this.levers = res.result.map(item => {
						return {
							...item,
							text: item.leverDesc
						}
					})
				})
			},
			getCoinInfoList() {
				this.$u.api.bibi.getCoinInfo(this.pairsItem.pairsName).then(res => {
					let json = JSON.parse(res.result)
					this.nowData = json
					this.search = this.search ? this.search:this.nowData.nowPrice
				})
			},
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
			getTo(item) {
				console.log('选中了',item)
				this.search = item.open
				this.socket.send(`initEntrust-${item.pairsName}`);
				this.pairsItem = item
				this.getLeverList();
				this.getWarehousesList();
				this.getCoinInfoList();
			},
			//资金
			getBalances() {
				let member = uni.getStorageSync('userId')
				this.$u.api.user.getBalanceList(member).then(res => {
					res.result.balances.map(item => {
						if (item.currency === 'USDT') {
							this.usdtPrice = item.assetsBalance;
						}
					})

				})
			},
			//币种
			getPairsList() {
				this.$u.api.bibi.getPairs("USDT", "SPOT").then(res => {
					this.pairs = res.result;
					if (JSON.stringify(this.pairsItem) == "{}") {
						this.pairsItem = res.result[0]
					}
					this.getCoinInfoList();
					this.getLeverList();
					this.getWarehousesList();
					this.socketFn();
					this.getjiaoyipeizhi()
				})
			},
			getRecord() {
				uni.navigateTo({
					url: `/pages/record/index?code=3`
				})
			},
			getBondAdd(index) {
				this.cuBond = index
				this.showBond = false
			},
			// 点击的是第几个杠杆
			onClickLevers(index) {
				this.leversCode = this.levers[index].text
			},
			// 点击
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
			},
			// 减
			getReduce(index) {
				if (index === 1) {
					this.search--
				} else {
					this.searchs--
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
				let amount = this.usdtPrice / 4;
				switch (index) {
					case 0:
						this.search1 = index === 0 && this.numberFn[0].code ? 0 : this.getFloat(amount * 1, 5);
						break;
					case 1:
						this.search1 = this.getFloat(amount * 2, 6);
						break;
					case 2:
						this.search1 = this.getFloat(amount * 3, 6);
						break;
					case 3:
						this.search1 = this.getFloat(amount * 4, 6);
						break;
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
				// if (index === 0 && this.percentCode.length > 0) {
				// 	this.percentCode = []
				// 	return
				// }
				// this.percentCode = []
				// for (let i = 0; i <= index; i++) {
				// 	this.percentCode.push(i)
				// }
			},
			change(e) {

				this.current = e
				switch (e) {
					case 0:
						this.getWarehousesList();
						break;
					case 1:
						this.getEntrustOrderList();
						break;
				}
			},
			getEntrustOrderList() {
				let obj = new Object();
				obj.pairsName = this.pairsItem.pairsName;
				obj.member = uni.getStorageSync('userId')
				this.$u.api.yx.getEntrustOrder(obj).then(res => {
					this.newList = res.result;

				})
				console.log(this.list, '测试9999999999999999')
			},
			getWarehousesList() {
				let pairsName = this.pairsItem.pairsName;
				let member = uni.getStorageSync('userId')
				this.$u.api.yx.getWarehouses(pairsName, member).then(res => {
					this.list = res.result.warehouses;
				})
			},
			getTopBtn(index) {
				if (index === 0) {
					uni.navigateTo({
						url: `/pages/financial/delivery`
					})
				} 
				// else {
				// 	this.$utils.showToast(this.$t('setting').zwkf)
				// }

			}
		},
		computed: {
			setRate() {
				return this.$store.state.rate || {}
			},
			setSellCode() {
				return this.$store.state.sellCode || 1
			},
			limitFn() {
				return this.i18n.limit
			},
			// numberFn() {
			// 	return ['25%', '50%', '75%', '100%']
			// },
			i18n() {
				return this.$t("financial")
			},
			tagBtn() {
				return this.i18n.tagBtn
			},
			topName() {
				return this.i18n.topName
			}
		}

	}
</script>

<style lang="scss" scoped>
	.yx-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx;
		font-size: 26rpx;

		.right {
			color: #fbc400;
		}
	}

	.stop-input {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10rpx;

		view {
			padding: 20rpx 24rpx;
			background: #F6F6F6;
			border-radius: 6rpx;

			&:last-child {
				margin-left: 20rpx;
			}
		}

	}

	.r-icon1 {
		transform: rotate(180deg);
		transform-origin: center center;
	}

	.stop {
		display: flex;
		align-items: center;
		color: #6F7784;
		font-size: 26rpx;
		margin-bottom: 8rpx;

		.circular {
			width: 20rpx;
			height: 20rpx;
			margin-right: 10rpx;
			border-radius: 50%;
			border: 1rpx solid #8D9099;
		}

		& image {
			width: 20rpx;
			height: 20rpx;
			margin-right: 10rpx;
		}
	}

	.container {
		background: #F6F6F6;
		height: 500rpx;

		.x-box {
			background: #fff;
			border-radius: 40rpx 40rpx 0 0;
			padding: 40rpx 24rpx;

			.fee-box {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.left-selset {
					background: #F6F6F6;
					border-radius: 6rpx;
					width: 180rpx;
					padding: 6rpx 20rpx;
					color: #1F222B;
					font-size: 28rpx;
					font-weight: bold;
					margin-right: 20rpx;
				}

				.cont-selset {
					background: #F6F6F6;
					border-radius: 6rpx;
					margin-right: 15rpx;
					width: 153rpx;
					padding: 6rpx 20rpx;
					font-size: 28rpx;
					font-weight: bold;
				}

				.right-name {
					font-size: 24rpx;
					color: #707070;
					margin-left: auto;
					text-align: right;

					.top {
						color: #1F222B;
					}
				}
			}

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
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 14rpx;

					.right {
						color: #000;
						display: flex;
						align-items: center;
						justify-content: flex-end;

						& image {
							margin-left: 14rpx;
							width: 36rpx;
							height: 36rpx;
						}

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

				.num1 {
					color: #E45360 !important;
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
			overflow-x: scroll;

			padding: 0 30rpx;

			::-webkit-scrollbar {
				display: none
			}

			.btn-tag {
				position: absolute;
				top: -6rpx;
				right: -44rpx;
				color: #1F222B;
				font-size: 14rpx;
				background: linear-gradient(360deg, #ECBD4C 0%, #FADE72 100%);
				border-radius: 2rpx;
				padding: 0 6rpx;
				-webkit-transform: scale(0.5)
			}

			.item {
				position: relative;
				text-align: center;
				flex: 1;
				width: auto;
				flex-basis: auto;
				flex-shrink: 0;
				font-size: 26rpx;
				color: #8D9099;
				// margin-right: 50rpx;
			}

			.item1 {
				position: relative;
				color: #1F222B;
				font-size: 26rpx;
				font-weight: 600;
				border-radius: 6rpx;
				padding: 10rpx 33rpx;
				background: #fff;
			}
		}
	}
</style>
