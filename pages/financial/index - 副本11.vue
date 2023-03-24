<script>

export default {
  data() {
    return {
      isError:false,
      userId: uni.getStorageSync('userId'),
      isStop: false,
      isStopCode: false,
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
      cuBond: 0,
      stop1: '',
      stop2: '',
      reduceCode: false,
      stopCode: false,
      showSpec: false,
      magnification: false,
      leverCode: '0.1',
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
      priceCode: 0,
      fixedPriceCode: false,
      sellState: false,
      percentCode: [],
      current: 0,
      search: 1,
      search1: 1,
      priceLimitValue: null,
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
      contractMul: 0,
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

    this.$u.api.fack.getCurrencyConfiguration().then(res => {
      this.rate = res.result[0]
    })
    if (this.pairsItem.symbol) this.getRealTimeOne(this.pairsItem.symbol);
    else this.getRealTimeOne();

    this.interval = setInterval(() => {
      if (this.pairsItem.symbol) this.getRealTimeOne(this.pairsItem.symbol);
      else this.getRealTimeOne();
    }, 5000)
  },
  onHide() {
    if (this.timer) {
      console.log('注销定时器', '我是永续')
      clearInterval(this.timer);
      this.timer = null;
    }
    clearInterval(this.interval)
    this.interval = null
    clearInterval(this.interval2)
    this.interval2 = null

    if (this.socket) this.socket.toClose();
    this.socket = null

  },
  onUnload() {
    if (this.timer) {
      console.log('注销定时器', '我是永续')
      clearInterval(this.timer);
      this.timer = null;
    }
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
    if (this.timer) {
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

    async getRealTimeOne(symbol) {
      const {
        code,
        data
      } = await this.$u.api.trendDetails.getRealtime(symbol);
      if (code == '0') {
        this.pairsItem = data[0]
        console.log(this.socket)
        if (!this.socket) {
          this.socket = null
          this.socketFn()
        }
      }
    },

    socketFn() {
      console.log(this.pairsItem)
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
        console.log(code, data)
        if (code == '0') {
          this.buyData = data.asks.slice(0, 5);
          this.sellData = data.bids.slice(0, 5);
        }
        console.log(this.buyData, this.sellData)
      }, 3000)
      this.socket.on("open", (res) => {

      });
      this.socket.on("message", this.onMessage);
    },

    inputHandler(e) {
      if (Number(e.detail.value) < 1) {
        this.$nextTick(() => {
          this.search1 = 1
        })
      }
      if (Number(e.detail.value) > (this.usdtPrice / 1030)) {


        this.$nextTick(() => {
          this.search1 = Number((this.usdtPrice / 1030)).toFixed(0)
        })
      }
    },

    toLogin() {
      uni.navigateTo({
        url: `/pages/login/login`
      })
    },

    sectionChange(i) {

      this.cuBond = i
    },

    chedan(item) {

      this.$u.api.bibi.closeEntrust1(item.id).then(res => {
        if (res.status == "SUCCEED") {
          this.$utils.showToast(this.$t('cdcg').cdcg)
        } else {
          this.$utils.showToast(res.errorMessage)
        }
        this.getEntrustOrderList();
      })
    },

    pingchang(i) {
      let obj = {
        hands: i.hands,
        id: i.id
      }
      this.$u.api.getContractorder.setOrderMatch(obj).then(res => {
        if (res.status == "SUCCEED") {
          this.$utils.showToast(this.$t('entrust').pingchangchenggong)
        } else {
          this.$utils.showToast(res.errorMessage)
        }
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

    zhiyin(item, index) {
      console.log(item)
      this.isStopCode = index === 1 ? false : true
      this.stopMoney = item.closePrice
      this.stopList = item
      this.isStop = true

    },

    confirmPosition() {
      let member = uni.getStorageSync('userId')
      let pairsName =  this.pairsItem.pairsName  ? this.pairsItem.pairsName : this.pairsItem.name
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
      if(this.isError){
        this.$utils.showToast(this.i18n.ghbbkjy)
        return
      }
      const {
        search1,

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
      console.log(this.pairsItem, 'this.pairsItem')
      const {
        name,
        close,
        price
      } = this.pairsItem
      let obj = new Object();
      obj.coinName = name.split("/")[0]
      obj.contractHands = this.search1
      obj.contractMulId = contractMulId
      // obj.leverId = leverId
      obj.leverId = 'f25d2c1dcd6f74037f61ae681fc34fc4'
      obj.mainCur = name.split("/")[1]
      obj.member = uni.getStorageSync('userId')
      obj.pairsName = name

      obj.price = this.search1 * 1000
      obj.margin = this.search1 * 1000
      obj.priceType = this.priceCode == 0 ? "MARKET_PRICE" : "CUSTOM_PRICE"
      // obj.tradeType = sellState ? "OPEN_DOWN" : "OPEN_UP"
      obj.tradeType = this.cuBond == 1 ? 'CLOSE_UP' : 'CLOSE_DOWN'
      if (this.cuBond == 0) {
        obj.tradeType = sellState ? "OPEN_DOWN" : "OPEN_UP"
      } else if (this.cuBond == 1) {
        obj.tradeType = sellState ? "CLOSE_DOWN" : "CLOSE_UP"
      }


      this.currentDta = {
        pairsName:name,
        price: this.nowData?.nowPrice,
        num: search1,
        lever: currentGangganType,
        bond: search1 * contractMul * price / currentGangganType,
        sellState
      }
      if (code) {
        this.$u.api.yx.setContractOrder(obj).then(res => {

          if (res.status === 'SUCCEED') {
            this.$utils.showToast(this.$t('transaction').zccg)
            this.ydAddCode = false
            this.change(this.current)

            this.emptyFn()
          } else {
            this.$utils.showToast(res.errorMessage)
          }
          this.search1 = 1
        })
      } else {
        this.ydAddCode = true
      }

    },

    getjiaoyipeizhi() {
      let key = this.pairsItem.pairsName ? this.pairsItem.pairsName : this.pairsItem.name
      this.$u.api.yx.getTransaction(key).then(res => {
        if (res && res.status == "SUCCEED") {
          let data = res.result;
          this.contractMulId = data[0].id;

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
      this.search = item.open
      this.socket.send(`initEntrust-${item.pairsName}`);
      this.pairsItem = item
      this.socketFn()

      this.getLeverList();
      this.getWarehousesList();
      this.getCoinInfoList();
    },

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

    getRecord() {
      uni.navigateTo({
        url: `/pages/record/index?code=3`
      })
    },


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

      console.log(number)
      number = String(number).replace(/^(.*\..{5}).*$/, "$1")
      number = Number(number)

      return number;
    },
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
          this.search1 = Number(this.getFloat(amount * 4, 6) / 1030).toFixed(0);
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
      // obj.pairsName = this.pairsItem.pairsName;
      obj.pairsName = this.pairsItem.name;
      obj.member = uni.getStorageSync('userId')
      this.$u.api.yx.getEntrustOrder(obj).then(res => {
        this.newList = res.result;

      })
    },

    getWarehousesList() {
      let pairsName =  this.pairsItem.pairsName  ? this.pairsItem.pairsName : this.pairsItem.name
      let member = uni.getStorageSync('userId')
      this.$u.api.yx.getWarehouses(pairsName, member).then(res => {
        this.isError = false;
        this.list = res.result.warehouses;
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