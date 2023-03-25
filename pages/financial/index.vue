<template>
	<view class="container">
		<!-- <view style="height: 56rpx;"></view> -->
		<view class="white">
			<view class="top-btn">
				<view class="item" @click="getTopBtn(index)" :class="{'item1': btnCode === index}"
					v-for="(item, index) in topName" :key="index">{{ item }}
					<view class="bot" v-if="btnCode === index"></view>
					<view class="btn-tag" v-if="index === 2">
						new
					</view>
				</view>
			</view>
			<view class="bi-title d-flex-between-center">
				<view class="left" @click="showSpec = true">
					<image src="../../static/image/new/1.png" />
					<!-- {{pairsItem.pairsName}} -->
					{{pairsItem.name}}
					<text class="num" :class="{'text-red': pairsItem.change_ratio < 0}">
						<text v-show="pairsItem.change_ratio > 0 "> + </text>
						<text v-show="pairsItem.change_ratio < 0 "> - </text>
						{{ pairsItem.change_ratio }}%
						<!-- {{pairsItem.updown*100|SubString(2)}}% -->
					</text>
					<!-- <text class="num num1">
						{{pairsItem.updown*100|SubString(2)}}%
					</text> -->
				</view>
				<view class="right" @click="getLine">
					<image src="../../static/image/new/2.png" />
					<!-- <image src="../../static/image/new/3.png" />
					<image src="../../static/image/new/4.png" /> -->
				</view>
			</view>
		</view>

		<!--  切换仓库-->
		<view class="warehouse">
			<u-subsection2 mode="subsection" :list="warehouse" :current="cuBond" @change="sectionChange"
				style="width: 100%"></u-subsection2>
		</view>

		<view class="x-box">
			<view class="fee-box" v-if="cuBond !=2">
				<view @click="showBond = false" class="left-selset d-flex-between-center">
					{{ cuBond === 0 ? i18n.kaican:i18n.pingcan }}
					<!--					<image style="width: 18rpx;height: 10rpx;" src="../../static/image/new/6.png" />-->
				</view>
				<view class="cont-selset d-flex-between-center" @click="leversState = false">
					{{ leversCode }}
					<!--					<image :class="{'r-icon1' : leversState}" style="width: 18rpx;height: 10rpx;transition: all 0.3s;"-->
					<!--						src="../../static/image/new/6.png" />-->
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
			<view class="d-flex-between-center" v-if="cuBond == 0 || cuBond == 1">
				<view class="left">
					<view class="d-flex-between-center">
						<view>{{ i18n.shuliang }}</view>
						<view>{{ i18n.jiage }}</view>
					</view>
					<view class="d-flex-between-center" style="margin-bottom: 10rpx;">
					</view>
					<right-area :max-buy="maxBuy" :code="0" :openup="buyData" />
					<view class="money">
						<!--						{{nowData.nowPrice}}-->
						{{pairsItem.close}}
					</view>
					<view class="zhehe">
						≈ {{ rate.mark }} {{ pairsItem.close * rate.rate |SubString(4) }}
					</view>
					<right-area :max-buy="maxSell" :code="1" :openup="sellData" />

				</view>
				<view class="right">
					<view class="r-img" v-if="!sellState">
						<view class="l-sell">
							{{ cuBond === 0 ? i18n.kd:i18n.pingduo }}
						</view>

						<view class="r-sell" @click="sellState = true">
							{{ cuBond === 0 ? i18n.kk:i18n.pingkong }}
						</view>

					</view>
					<view class="r-img" v-else>
						<view class="l-sell1" @click="sellState = false">
							{{ cuBond === 0 ? i18n.kd:i18n.pingduo }}
						</view>

						<view class="r-sell1">
							{{ cuBond === 0 ? i18n.kk:i18n.pingkong }}
						</view>

					</view>
					<view class="available">
						<view>{{ i18n.keyong }}</view>
						<view class="right">
							<view style="color: #000;">{{usdtPrice |SubString(2)}}USDT</view>
							<!-- 	<image src="../../static/image/new/14.png" /> -->
						</view>
					</view>
					<!--限价委托金额 -->
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
						<!--限价点位-->
					</view>
					<view v-if="priceCode == 1">
						<u-input placeholder="限价点位" border="border" type="number" v-model="priceLimitValue"
							@change="change"></u-input>
					</view>
					<!--          //数量-->
					<view class="l-sum">
						<input type="number" v-model="search1" placeholder-style="background: #F6F6F6;" class="f-input"
							 @input="inputHandler" />
						<view class="r-icon" @click="getAdd(1)">
							<text>{{i18n.zhang}}</text>
						</view>
					</view>
					<view style="height: 14rpx;"></view>
					<view class="stpes-list">
						<!-- <view :class="{'item1': percentCode.includes(index)}" @click="getPercent(index)" class="item"
							v-for="(item, index) in numberFn" :key="index"></view> -->
						<view :class="{'item1': item.code}" @click="getPercent(index)" class="item"
							v-for="(item, index) in numberFn" :key="index"></view>
					</view>
					<view class="percent d-flex align-items-center">
						<view class="item" v-for="(item, index) in numberFn" :key="index">{{ item.val }}</view>
					</view>

					<!--          展示的 合约金额 保证金 建仓手续费-->
					<view class="amountDisplayBox" v-if="userId">
						<view class="amountList">
							<view class="text">{{i18n.hyje}}</view>
							<view class="amount">{{search1 * 1000 || 0.00}}</view>
						</view>
						<view class="amountList">
							<view class="text">{{i18n.bzj}}</view>
							<view class="amount">{{search1 * 1000  ||0.00}}</view>
						</view>
						<view class="amountList">
							<view class="text">{{i18n.jcsxf }}</view>
							<view class="amount">{{search1 * 1000 * 0.03 ||0.00}}</view>
						</view>
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

					<view class="f-btn" :class="{'f-btn1': sellState}" @click="sub(1)">
						<view v-if="userId">
							<text v-if="sellState">
								{{ cuBond === 0 ? i18n.kk:i18n.pingkong }}

							</text>
							<text v-else>
								{{ cuBond === 0 ? i18n.kd:i18n.pingduo }}
							</text>
              <span style=" display: inline-block ;text-align: right">平仓</span>
						</view>
						<view v-if="!userId" @click="toLogin">
							{{i18n.denglu }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--    持仓 当前委托-->
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
			<!--			<view>{{ i18n.cclb }}</view>-->
			<view></view>
			<!--      一件平仓-->
			<view class="right" @click="isPosition = true">{{ i18n.yjpc }}</view>
		</view>
		<view v-if="current === 0">
			<view v-if="list.length > 0">
				<entrust-list :list="list" :mode="4" :state="3" @zhiyin="zhiyin" @pingchang="pingchang" />
			</view>
			<view v-else style="background: #fff;padding-top: 100rpx;">
				<u-empty :text="$t('kLine').zwgdsj" mode="order"></u-empty>
			</view>
		</view>
		<view v-else>
			<view v-if="newList.length > 0">
				<entrust-list :list="newList" @chedan="chedan" :mode="3" :state="10" />
			</view>
			<view v-else style="background: #fff;padding-top: 100rpx;">
				<u-empty :text="$t('kLine').zwgdsj" mode="order"></u-empty>
			</view>
		</view>
		<!--		<bond-popup @getAdd="getBondAdd" :show-spec.sync="showBond" />-->
		<quotation-popup :show-spec.sync="showSpec" :list="pairs" @getTo="getTo" />
		<u-action-sheet :cancel-text="$t('fack').qx" @click="onClickLever" :list="lever" v-model="magnification">
		</u-action-sheet>
		<u-action-sheet :cancel-text="$t('fack').qx" @click="onClickLevers" :list="levers" v-model="leversState">
		</u-action-sheet>
		<yx-add-popup @getAdd="sub" :show-pup.sync="ydAddCode" :current-dta="currentDta" />
		<u-modal :title="$t('common').hint" :confirm-text="$t('common').confirm" :cancel-text="$t('common').cancel"
			@confirm="confirmPosition" confirm-color="#D1A037" :show-cancel-button="true" v-model="isPosition"
			:content="content"></u-modal>
		<!--		<yx-stop-popup @getAdd="stopAdd" :money="nowData.nowPrice" :show-pup.sync="isStop" :curCode="isStopCode" />-->
		<tabar-com />
	</view>
</template>
<script>
	import th from '../../common/locales/th';
	import socket from "../../common/ws/socket.js";
	import {
		getData
	} from '@/common/hooks/socketData.js'
	import {
		nextTick
	} from "vue";
	export default {
		data() {
			return {
        coinName:'',//货币名
        isError:false,
				userId: uni.getStorageSync('userId'),
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
				leversCode: '1X',
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
				priceCode: 0, // 摸认 市价
				fixedPriceCode: false, // 限价单弹窗
				sellState: false, // false 买入 true 卖出
				percentCode: [],
				current: 0,
				search: 1,
				search1: 1, //数量 默认1
				priceLimitValue: null, //限价点位
				btnCode: 1,
				pairs: [],
				pairsItem: {},
				usdtPrice: 0.00,
				buyData: [],
				sellData: [],
				maxSell: 10,
				maxBuy: 10,
				socket: null,
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
				],
				interval: null,
				interval1: null,
				interval2: null,
				rate: {},
			};
		},
		created() {
			// 获取 汇率
			this.$u.api.fack.getCurrencyConfiguration().then(res => {
				this.rate = res.result[0]
			})
			if (this.pairsItem.symbol) this.getRealTimeOne(this.pairsItem.symbol);
			else this.getRealTimeOne();
      setInterval(()=>{
        this.getWarehousesList()
      },5000)
			this.interval = setInterval(() => {
        this.getWarehousesList()
				if (this.pairsItem.symbol) this.getRealTimeOne(this.pairsItem.symbol);
				else this.getRealTimeOne();
			}, 5000)
		},
		onHide() {
			if (this.timer) { //注销定时器
				console.log('注销定时器', '我是永续')
				clearInterval(this.timer);
				this.timer = null;
			}
			// this.$store.state.socket.removeListener('daymarket')
			clearInterval(this.interval)
			this.interval = null
			clearInterval(this.interval2)
			this.interval2 = null

			if (this.socket) this.socket.toClose();
			this.socket = null

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
			this.getPairsList();

			this.sellState = this.setSellCode === 1 ? false : true
			if (member) {
				this.timer = setInterval(() => {
					if (member) {
						this.getRealtime()
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
			// 获取类型的币值 实时数据
			async getRealtime() {
				this.$u.throttle(async () => {
					const {
						code,
						data
					} = await this.$u.api.trendDetails.getRealtime();
					if (code == '0') {
						this.pairs = data
					}
				}, 2000)
			},
			// 获取当前币值
			async getRealTimeOne(symbol) {
				const {
					code,
					data
				} = await this.$u.api.trendDetails.getRealtime(symbol);
				if (code == '0') {
					this.pairsItem = data[0]
					// console.log(this.socket)
					if (!this.socket) {
						this.socket = null
						this.socketFn()
					}
				}
			},

			socketFn() {
				// console.log(this.pairsItem)
				if (!this.pairsItem.symbol) return;
        if (this.socket) this.socket.toClose();
        this.socket = null

				this.socket = new socket(`wss://thasjhdhjg.site/data/websocket/3/${this.pairsItem.symbol}`)
				this.socket.doOpen();
				this.interval2 = setInterval(() => {
					let {
						code,
						data
					} = getData()
					// console.log(code, data)
					if (code == '0') {
						this.buyData = data.asks.slice(0, 5);
						this.sellData = data.bids.slice(0, 5);
					}
					// console.log(this.buyData, this.sellData)
				}, 3000)
				this.socket.on("open", (res) => {
					// this.socket.send("PING");
					// this.socket.send(`initEntrust-${this.pairsItem.pairsName}`);
				});
				this.socket.on("message", this.onMessage);
			},
      //输入金额事件
      inputHandler(e) {
        const value = Number(e.detail.value)
        if (value < 1) {
          this.$nextTick(() => {
            this.search1 = 0
          })
        } else if (value > (this.usdtPrice / 1030)) {
          this.$nextTick(() => {
            this.search1 = Math.floor(this.usdtPrice / 1030)
            // this.search1 = 0
          })
        } else {
          this.search1 = value
        }
      },
      //计算输入框价格
      getPercent(index) {
        let amount = this.usdtPrice / 4;
        switch (index) {
          case 0:
            this.search1 = Number((index === 0 && this.numberFn[0].code ? 0 : this.getFloat(amount * 1, 5)) /
                1030).toFixed(0);
            break;
          case 1:
            this.search1 = Number(this.getFloat(amount * 2, 6) / 1030).toFixed(0);
            break;
          case 2:
            this.search1 = Number(this.getFloat(amount * 3, 6) / 1030).toFixed(0);
            break;
          case 3:
            this.search1 = Math.floor(this.getFloat(amount * 4, 6) / 1030);
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
      },
			//登录
			toLogin() {
				uni.navigateTo({
					url: `/pages/login/login`
				})
			},
			//切换开仓
			sectionChange(i) {
				// console.log('切换开仓',i)
				this.cuBond = i
			},
			//撤单
			chedan(item) {
				console.log(item, '我是永续撤单--------')
				// this.$u.api.bibi.closeEntrust(item.id).then(res => {
				// 	if (res.status == "SUCCEED") {
				// 		this.$utils.showToast(this.$t('cdcg').cdcg)
				// 	} else {
				// 		this.$utils.showToast(res.errorMessage)
				// 	}
				// 	this.getEntrustOrderList();
				// })
				this.$u.api.bibi.closeEntrust1(item.id).then(res => {
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
      // 单独平仓
      pingchang(i) {
        let coinName = 'USDT'
        let price = this.pairsItem.close || this.pairsItem.price
        let {id} = i
        this.$u.api.contractNewInterface.setOrderMatch(id,coinName,price).then(res => {
          if (res.status == "SUCCEED") {
            this.$utils.showToast(this.$t('entrust').pingchangchenggong)
            this.getWarehousesList();
          } else {
            this.$utils.showToast(res.errorMessage)
          }
        })
      },
			// 一键平仓调用
			confirmPosition() {
        let params = {
              memberId : uni.getStorageSync('userId'),
              pairsName : this.pairsItem.pairsName  ? this.pairsItem.pairsName : this.pairsItem.name,
              coinName : "USDT",
              price  :  this.pairsItem.close || this.pairsItem.price
        }
				this.$u.api.contractNewInterface.setAllContractMatch(params).then(res => {
					if (res.status === 'SUCCEED') {
						this.$utils.showToast(this.$t('entrust').pingchangchenggong)
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
			emptyFn() {
				this.search1 = null
				this.numberFn = [
          {val: '25%', code: false},
          {val: '50%', code: false},
					{val: '75%', code: false},
					{val: '100%', code: false}
				]
			},
      //开仓/平仓
			sub(code) {
        if(this.isError){
          this.$utils.showToast(this.i18n.ghbbkjy)
          return
        }
				const {
					search1, //张数
					usdtPrice,
					sellState,
					contractMulId,
					contractMul
				} = this
				if (search1 <= 0) {
					this.$utils.showToast(this.i18n.qsrsl)
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
        //去登录
        if (!uni.getStorageSync('userId')){
          this.$utils.showToast(this.$t('member').this.i18n.qdl)
        }
        const {name, close, price} = this.pairsItem
       let  newParams = new Object() //传参
          newParams.memberId = uni.getStorageSync('userId') || 0
          newParams.pairsName = name//全名
          newParams.coinName  = name.split("/")[1]//前两位名
          newParams.kPrice = Number(close).toFixed(4) || price//建仓价
          newParams.amount = this.search1 * 1000//合约金额
          newParams.margin = this.search1 * 1000//保证金
          newParams.matchFee  = this.search1 * 30 //手续费
          newParams.leverId  = 'f25d2c1dcd6f74037f61ae681fc34fc4' //杠杆ID
          newParams.contractHands  = this.search1 //手
          if (this.cuBond == 0) {
            newParams.tradeType = sellState ? "OPEN_DOWN" : "OPEN_UP" //或者 开空 开多
          } else if (this.cuBond == 1) {
            newParams.tradeType = sellState ? "CLOSE_DOWN" : "CLOSE_UP"//平空 平多
          }
        const onSuccess = (res) => {
          if (res.status === 'SUCCEED') {
            this.$utils.showToast(this.$t('transaction').zccg)
            this.ydAddCode = false
            this.change(this.current)
            this.emptyFn()
          } else {
            this.$utils.showToast(res.errorMessage)
          }
          this.search1 = 1
        }
        if (this.cuBond === 0) {
          this.$u.api.contractNewInterface.setContractOrderBuy(newParams).then(onSuccess)
        } else if (this.cuBond === 1) {
          this.$u.api.contractNewInterface.setContractOrderSell(newParams).then(onSuccess)
        }

				this.currentDta = {
					pairsName:name,
					price: this.nowData?.nowPrice,
					num: search1,
					lever: currentGangganType,
					bond: search1 * contractMul * price / currentGangganType,
					sellState
				}
			},
			// 交易配置id
			getjiaoyipeizhi() {
        let key = this.pairsItem.pairsName ? this.pairsItem.pairsName : this.pairsItem.name
				this.$u.api.yx.getTransaction(key).then(res => {
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
					this.search = this.search ? this.search : this.nowData.nowPrice
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
				// console.log('选中了', item)
				this.search = item.open
				this.socket.send(`initEntrust-${item.pairsName}`);
				this.pairsItem = item
				this.socketFn()

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
					this.socketFn()
					this.getjiaoyipeizhi()
				})
			},
			//查看委托记录
			getRecord() {
				uni.navigateTo({
					url: `/pages/record/index?code=3`
				})
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
			getFloat(number, n) {
				n = n ? parseInt(n) : 0;
				if (n <= 0) {
					return Math.round(number);
				}
				// console.log(number)
				number = String(number).replace(/^(.*\..{5}).*$/, "$1")
				number = Number(number)
				return number;
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
      // 获取委托订单清单
			getEntrustOrderList() {
				let obj = new Object();
				// obj.pairsName = this.pairsItem.pairsName;
        obj.pairsName = this.pairsItem.name;
				obj.member = uni.getStorageSync('userId')
				this.$u.api.yx.getEntrustOrder(obj).then(res => {
					this.newList = res.result;
				})
			},
      //获取持仓列表
			getWarehousesList() {
        if(!this.userId) {
          return
        }
        let pairsName =  this.pairsItem.pairsName  ? this.pairsItem.pairsName : this.pairsItem.name
				let memberId = uni.getStorageSync('userId')
        let price = this.pairsItem.close || this.pairsItem.price
				this.$u.api.contractNewInterface.getWarehouses(memberId,pairsName,price).then(res => {
          this.isError = false;
					this.list = res.result;
				}).catch(error=>{
          this.isError = true
          this.$utils.showToast(this.i18n.ghbbkjy)
        })
			},
			getTopBtn(index) {
				if (index === 0) {
					uni.navigateTo({
						url: `/pages/trendDetails/index`
					})
				}
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
			},
			warehouse() {
				return this.i18n.warehouse
			}
		}

	}
</script>

<style lang="scss" scoped>
	.text-red {
		color: #f6465d !important;
	}

	.white {
		background-color: #fff;
	}

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
			// border-radius: 40rpx 40rpx 0 0;
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

				//.money-input {
				//	background: #F6F6F6;
				//	border-radius: 6rpx;
				//	margin: 30rpx 0;
				//	padding: 18rpx 0;
				//
				//	.f-input {
				//		text-align: center;
				//		color: #1F222B;
				//		font-size: 32rpx;
				//		font-weight: bold;
				//	}
				//}

				.amountDisplayBox {
					padding: 20rpx;

					.amountList {
						padding: 10rpx 0;
						display: flex;
						justify-content: space-between;
						color: #747884;
						font-size: 24rpx;

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
					margin-top: 10rpx;
					padding: 16rpx 16rpx;
					border-radius: 6rpx;
					font-size: 28rpx;
					font-weight: bold;
					border: 2rpx solid #dcdfe6;
					display: flex;
					align-items: center;

					.f-input {
						text-align: left;
						color: #1F222B;
						font-size: 32rpx;
						font-weight: bold;
					}

					.r-icon {
						margin-left: auto;
						color: #7A7E89;
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
			// border: 1rpx solid #B0B3BA;
			color: #000;
			border-radius: 15rpx;
			display: flex;
			align-items: center;
			overflow-x: scroll;

			.bot {
				margin-top: 6rpx;
				width: 40rpx;
				border-bottom: 5rpx solid #BE1852;
			}

			//padding: 0 30rpx;

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
				color: #333;
				justify-content: center;
				align-items: center;
				display: flex;
				flex-direction: column;
				// margin-right: 50rpx;
			}

			.item1 {
				position: relative;
				color: #1F222B;
				font-size: 28rpx;
				font-weight: 600;
				border-radius: 6rpx;
				padding: 10rpx 0;

				justify-content: center;
				align-items: center;
				display: flex;
				flex-direction: column;
				//background: #fff;
				// border-radius: 25rpx;
				// background: #2c78f8;
				color: #BE1852;
				border: none;
			}
		}

		.warehouse {
			width: 100%;
			//margin: 0 26rpx;
			//border-radius: 6rpx;
			display: flex;
			align-items: center;
			//overflow-x: scroll;
			// padding: 26rpx 30rpx;
			margin-top: 20rpx;

		}
	}
</style>
