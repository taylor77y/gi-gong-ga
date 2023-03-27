// 此处第二个参数vm，就是我们在页面使用的this
const install = (Vue, vm) => {
	// 合约交易
	const trendDetails = {
		getExchangerateuserconfig: () => vm.$u.get(`https://db23app.vip/wap//api/exchangerateuserconfig!get.action`),
		getRealtime: (symbol='btc,eth,algo,mln,dot,neo,iota,yfi,etc,xrp,axs,sand,ltc,mana,sol,eos,bhd,link,mx,chr,chz') => vm.$u.get(`https://db23app.vip/wap/api/hobi!getRealtime.action?symbol=${symbol}`),
		getKline: (symbol='btc', line='1min') => vm.$u.get(`https://db23app.vip/wap/api/hobi!getKline.action?symbol=${symbol}&line=${line}&token=69f5f8669d794f39be7c3f127ac7e98e`),
	}
	const wantBuy = {
		// language 语言
		getC2cPaymentMethod: (language='en') => vm.$u.get(`https://db23app.vip/wap/api/c2cPaymentMethod!method_type.action?language=${language}`),
		c2cPaymentMethodList: (language='en', token) => vm.$u.get(`https://db23app.vip/wap/api/c2cPaymentMethod!list.action?language=${language}&token=${token}`),
		getC2cList: (param = { page_no:1,direction:'buy',currency:'USD',symbol:'btc',amount:'',method_type:'',language:'zh-CN',token}) => vm.$u.get(`https://db23app.vip/wap/api/c2cAdvert!list.action?page_no=${param.page_no}&direction=${param.direction}&currency=${param.currency}&symbol=${param.symbol}&amount=${param.amount}&method_type=${param.method_type}&language=${param.language}&token=${param.token}`),
		c2cPaymentMethod:(param={}) => vm.$u.get(`https://db23app.vip/wap/api/c2cPaymentMethod!list.action?language=zh-CN&token=0455501841974cd6bbed05e7b3d5e4bd`),
	}
	
	
	//币币交易
	const bibi = {
		getPairs: (mainCur,type) => vm.$u.get(`/data/data/getPairsByMainCur?mainCur=${mainCur}&type=${type}`),
		getCoinInfo: (pairsName) => vm.$u.get(`/data/data/getCoinInfo?pairsName=${pairsName}`),
		getEntrustList: (member,pairsName) => vm.$u.get(`/entrust/entrust/getEntrustList?member=${member}&pairsName=${pairsName}`),
		setEntrust: (params={}) => vm.$u.post("/entrust/entrust/setEntrust",params,{ 'Content-Type': 'application/json' }),
		//历史委托
		getHistoryEntrust: (params = {}) => vm.$u.get(`/entrust/entrust/getHistoryEntrust?member=${params.member}&pairsName=&pageNum=${params.pageNum}&pageSize=${params.pageSize}`),
		//当前委托
		getEntrustList: (member) => vm.$u.get(`/entrust/entrust/getEntrustList?member=${member}&pairsName=`),
		//撤单
		closeEntrust: (entrust) => vm.$u.post(`/entrust/entrust/closeEntrust?entrust=${entrust}`),
		closeEntrust1: (id) => vm.$u.post(`/contract/contract/closeContractOrder?orderId=${id}`),
	}
	//闪兑
	const sd = {
		//闪兑币种
		getIndexCoin: (member) => vm.$u.get(`/data/data/getIndexCoin?getCoinType=TRANSFER&member=${member}&balanceType=BALANCE_BB`),
		//闪兑兑换
		currencyExchange: (params = {}) => vm.$u.post(`/member/balance/currencyExchange?member=${params.member}&currency=${params.currency}&currencyTarget=${params.currencyTarget}&quantity=${params.quantity}`),
		//闪兑记录
		currencyExchangeRecord: (params = {}) => vm.$u.get(`/member/balance/currencyExchangeRecord?pageNum=${params.page}&pageSize=${params.size}&member=${params.member}`)

	}
	//秒合约
	const mhy = {
		// 获取可用金额
		getBalances: (params = {}) => vm.$u.get(`member/balance/getBalances?member=${params.member}&member=${params.member}&balanceType=${params.balanceType}`),
		// 获取交割时间
		getSecondsContract: () => vm.$u.get("/contract/contract/getSecondsContract"),
		getSecondContractRecord: (member,page,size,type) => vm.$u.get(`/contract/contract/getSecondContractRecord?member=${member}&pageNum=${page}&pageSize=${size}&type=${type}`),
		secondContractBetting: (params={}) => vm.$u.post("/contract/contract/secondContractBetting",params,{ 'Content-Type': 'application/json' }),
		getSecondsContractDes: (id) => vm.$u.get(`/contract/contract/getSecondContract?secondId=${id}`),
		orderEndTime: (id,member) => vm.$u.post(`/otc/order/orderEndTime?priceOrderId=${id}&member=${member}`),
	}
	//永续合约
	const yx = {
		getTransaction: (pairsName={}) => vm.$u.get(`/contract/contractMul/getContractMul?pairsName=${pairsName}`),
		//普通委托
		getEntrustOrder: (params={}) => vm.$u.post(`/contract/contract/getEntrustOrder?pairsName=${params.pairsName}&member=${params.member}`),
		//持仓
		//历史记录
		getHistoryOrders: (params = {}) => vm.$u.get(`/contract/contract/getHistoryOrders?orderState=${params.orderState}&pageNum=${params.page}&pageSize=${params.size}&member=${params.member}`),
		//倍数
		getLevers: (pairsName) => vm.$u.get(`/contract/contractMul/getLevers?pairsName=${pairsName}`),

		getRisk: (member) => vm.$u.get(`/contract/contract/getRisk?member=${member}`),

		getWarehouses: (pairsName,member) => vm.$u.get(`/contract/contract/getWarehouses?pairsName=${pairsName}&member=${member}`),

		setContractOrder: (params = {}) => vm.$u.post(`/contract/contract/setContractOrder`,params, {'Content-Type': 'application/json' }),
		//止盈(TRIGGER)止损(ORD)
		setOrdTriggerMatch: (params = {}) => vm.$u.post(`/contract/contract/setOrdTriggerMatch?id=${params.id}&price=${params.price}&matchType=${params.matchType}`),
		//一键平仓
		setAllContractMatch: (member,pairsName) => vm.$u.post(`/contract/contract/setAllContractMatch?memberId=${member}&pairsName=${pairsName}`)
	}

	// 此处没有使用传入的params参数
	//通用页面,如登陆，注册，等api
	const common = {
		//检查更新
		getSetting: (keyword) => vm.$u.get("/getSetting",{keyword}),
		getSiteConfig: () => vm.$u.get("/getSiteConfig"),
		//币的行情
		getCurrencys: (getCoinType) => vm.$u.get("/data/data/getIndexCoin?getCoinType="+getCoinType),
		getNotices: (params={}) => vm.$u.get(`/data/data/getNotices?noticeType=${params.noticeType}&global=${params.global}`),
		getRechargeMethod: (member) => vm.$u.get(`/member/balance/getRechargeMethod?member=${member}`),
		getCoinData: () => vm.$u.get("/data/data/getIndexCoinNew")
	}
	//行情页面
	const quato = {
		getMainCurs: () => vm.$u.get("/data/data/getMainCurs"),
		getCoinQuotation: (NAME_DOWN,SPOT) => vm.$u.get("/data/data/getCoinQuotation?getCoinSort="+NAME_DOWN+"&coinType="+SPOT),
		getTabFour: (NAME_DOWN,SPOT) => vm.$u.get("/data/data/getTabFour?getCoinSort="+NAME_DOWN+"&coinType="+SPOT),

		placeAnOrder: (params={}) => vm.$u.post(`/otc/order/placeAnOrder?userId=${params.userId}&orderId=${params.orderId}&type=${params.type}&num=${params.num}&mccId=${params.mccId}`)
	}

	//法币模块
	const fack = {
		getCurrencyConfiguration: () => vm.$u.get("/contract/contract/getCurrencyConfiguration"),
		getStoreList: (params = {}) => vm.$u.post(`/otc/order/orderList?page=${params.page}&size=${params.size}&currency=${params.currency}&mccId=${params.mccId}&direction=${params.direction}`),
		placeAnOrder: (params={}) => vm.$u.post(`/otc/order/placeAnOrder?userId=${params.userId}&orderId=${params.orderId}&type=${params.type}&num=${params.num}&mccId=${params.mccId}`),
		payment: (params={}) => vm.$u.post(`/otc/order/payment?priceOrderId=${params.priceOrderId}&userId=${params.userId}&payType=${params.payType}`),
		backOrder: (params={}) => vm.$u.post(`/otc/order/backOrder?priceOrderId=${params.priceOrderId}&userId=${params.userId}`),
		ownOrderList: (params={}) => vm.$u.post(`/otc/order/ownOrderList?priceOrderStatus=${params.priceOrderStatus}&userId=${params.userId}&page=${params.page}&size=${params.size}`),
		orderDetails: (oid,member) => vm.$u.post(`/otc/order/orderDetails?priceOrderId=${oid}&userId=${member}`),
		//校验支付密码
		verifyFundPassword: (member,password) => vm.$u.post(`/member/member/verifyFundPassword?member=${member}&password=${password}`),
	}
		//用户
	const user = {
		//发送邮箱验证码
		sendMailCode: (user_string) => vm.$u.post("/sms_mail", {user_string,scene:'register',area_code_id: 1,area_code: 86,lang: 'zh',email_code:''}),
		//邮箱验证码验证
		verifyMailCode: (user_string,email_code) => vm.$u.post("/user/check_email", {user_string,scene:'register',email_code,country_code: '+86',lang: 'zh'}),
		//邮箱注册
		register: (params = {}) => vm.$u.post("/member/member/register?code=1", params,{ 'Content-Type': 'application/json' }),
		//登陆
		login: (params = {}) => vm.$u.post(`/member/member/login?password=${params.password}&phMail=${params.phMail}&areaCode=${params.areaCode}&type=${params.type}`, params, { 'Content-Type': 'application/json' }),
		// login: (params = {}) => vm.$u.post("/user/login", params),
		//退出登陆
		logout: () => vm.$u.get("/user/logout"),
		//用户信息
		getMember: (member) => vm.$u.get("/member/member/getMember?member="+member),
		//获取钱包列表
		getBalanceList: (member) => vm.$u.get("/member/balance/getBalanceList?member="+member+"&coinType=ASSETS"),
		//身份验证
		advancedCertification: (params = {}) => vm.$u.post(`/member/member/advancedCertification?name=${params.name}2&code=${params.code}&positiveLink=${params.positiveLink}&sideLink=${params.sideLink}&member=${params.member}`),
		//用户充值
		rechargeCurrency: (params={}) => vm.$u.post(`/member/balance/rechargeCurrency?amount=${params.amount}&currency=${params.currency}&memberId=${params.memberId}&chainName=${params.chainName}&paymentVoucher=${params.paymentVoucher}`),
		//充值币种配置
		currencyList: () => vm.$u.post("/otc/order/currencyList"),
		getRechargeWallet: (type) => vm.$u.get(`member/balance/getRechargeWallet?type=${type}`),
		//充值记录
		rechargeCurrencyRecord: (member,pageNum,pageSize) => vm.$u.get(`/member/balance/rechargeCurrencyRecord?memberId=${member}&pageNum=${pageNum}&pageSize=${pageSize}`),
		//提现记录
		withdraw_recording: (member,pageNum,pageSize) => vm.$u.get(`/member/balance/withdraw_recording?memberId=${member}&pageNum=${pageNum}&pageSize=${pageSize}`),
		//资金记录
		getBalanceRecord: (member,pageNum,pageSize) => vm.$u.get(`/member/member/getBalanceRecord?pageNum=${pageNum}&pageSize=${pageSize}&member=${member}&type=`),
		//提币
		extractCoin: (params={}) => vm.$u.post(`/member/balance/extractCoin?member=${params.member}&balance=${params.balance}&type=${params.type}&currency=${params.currency}&baId=${params.baId}`),
		//提币地址列表
		getBillingAddressList: (member) => vm.$u.get(`/member/member/getBillingAddressList?member=${member}`),
		//添加提币地址
		saveBillingAddress: (member,currency,address,currencyType) => vm.$u.post(`/member/member/saveBillingAddress?member=${member}&currency=${currency}&address=${address}&currencyType=${currencyType}`),
		//修改提币地址
		updateBillingAddress: (member,baId,address) => vm.$u.post(`/member/member/updateBillingAddress?member=${member}&baId=${baId}&address=${address}`),
		//添加银行卡
		setBankInfo: (params={}) => vm.$u.post(`/member/member/setBankInfo?member=${params.member}&bankUserName=${params.bankUserName}&bankCard=${params.bankCard}&bankName=${params.bankName}&bankAddress=&code=`),
		//设置登录密码
		resetPassword: (member,oldPass,newPass) => vm.$u.post(`/member/member/resetPassword?member=${member}&oldPass=${oldPass}&newPass=${newPass}`),
		//设置支付密码
		// resetPayPass: (member,oldPass,password) => vm.$u.post(`/member/member/resetPayPass?member=${member}&oldPass=${oldPass}&password=${password}`),
		// //邮箱发送
		setPayPass: (member,password) => vm.$u.post(`/member/member/resetPayPassFirst?member=${member}&password=${password}`),
		sendMail: (mailbox, type) => vm.$u.post(`/data/sms/sendMail?mailbox=${mailbox}&type=${type ? type:'SETPHMAIL'}`),
		// 手机信息发送
		sendPhone: (mailbox, member) => vm.$u.post(`/data/sms/sendSmsNew?phone=${mailbox}&type=PHONEYANZEN&member=${member ? member: ''}`),

		// 邮箱校验
		checkSmsCode: (phMail, code, type) => vm.$u.post(`/member/member/checkSmsCode?phMail=${phMail}&code=${code}&type=${type ? type:'SETPHMAIL'}`),
		//实名认证
		setAuthenWithAll: (params) => vm.$u.post(`/member/member/setAuthenWithAll`,params),
		//上传证件图片
		setCardImg: (member,positiveFile,sideFile,handLink) => vm.$u.post(`/member/setCardImg?member=${member}&positiveFile=${positiveFile}&sideFile=${sideFile}&handLink=${handLink}`),
		
		//绑定邮箱
		setPhMail: (member,phMail,code) => vm.$u.post(`/member/member/setPhMail?regType=MAIL&member=${member}&phMail=${phMail}&code=${code}`),
		//修改信息
		updateMember: (member,name,avatar) => vm.$u.post(`/member/member/updateMember?member=${member}&nikeName=${name}&avatarAddress=${avatar}`),
		updateMemberNew: (member,name,avatar) => vm.$u.post(`/member/member/updateMember`,{member:member,nikeName:name,avatarAddress:avatar}),
		// 忘记密码
		recomposeInformation: (phMail,code,type,password,) => vm.$u.post(`/member/member/recomposeInformation
?&phMail=${phMail}&code=${code}&type=${type ? type:'SETPHMAIL'}&password=${password}`),
		// 获取充值接口
		getRechargeWallet: (type) => vm.$u.get(`/member/balance/getRechargeWallet?type=${type}`),
		// 获取手续费
		getRechangeConfiqunation: (key) => vm.$u.get(`/member/balance/new/getRechargeConfiguration?key=${key}`),
		//充值提交
		rechargeCurrency: (params) => vm.$u.post(`/member/balance/rechargeCurrency`,params),
		// getBillingAddressList: (id) => vm.$u.post(`/member/getBillingAddressList?member=${id}`),
	}
	const setting = {
		//刷新用户信息
		getUserInfo: () => vm.$u.get("/user/info"),
		//获取身份认证信息
		getUserRealState: () => vm.$u.get("/real/state"),
		//提交初级认证信息
		postRealState1: (id_type, name,card_id) => vm.$u.post("/user/real", {id_type, name,card_id,real_type:1}),
		//提交高级认证信息
		postRealState2: (front_pic,reverse_pic) => vm.$u.post("/user/real", {front_pic,reverse_pic,real_type:2}),
		//获取修改交易/登陆密码的邮箱验证码
		sendEmailCode: (user_string) => vm.$u.post("/sms_mail", {user_string,type:'forget'}),
		//验证邮箱验证码
		verifyMailCode: (user_string,email_code) => vm.$u.post("/user/check_email", {user_string,email_code}),
		//修改密码
		editLoginPassword: (account,password,repassword,code) => vm.$u.post("/user/forget", {account,password,repassword,code}),
		//修改交易密码
		editPayPassword: (password,re_password,code) => vm.$u.post("/safe/update_password", {password,re_password,code}),
		//获取币种列表
		getCurrencyList: () => vm.$u.get("/currency/list"),
		// 保存钱包地址
		saveWalletAddress: (currency,name,address,qrcode) => vm.$u.post("/user/wallet/save", {currency,name,address,qrcode}),
		//获取钱包地址列表
		getWalletAddressList: (page = 1,limit = 10) => vm.$u.get("/user/wallet/list",{page,limit}),
		//上传头像
		uploadAvatar: (head_portrait) => vm.$u.post("/user/uploadHeadPortrait",{head_portrait}),
		// 修改用户昵称
		editNickname: (nickname) => vm.$u.post("/user/editNickname",{nickname}),
		//添加银行卡
		saveCard: (params) => vm.$u.post("/user/cash_save",params),
		//添加银行卡國際
		saveCardInternational: (params) => vm.$u.post("/user/cash_save_international",params),
		//获取银行卡信息
		getCard: () => vm.$u.post("/user/cash_info"),
		//获取银行卡信息國際
		getCardInternational: () => vm.$u.post("/user/cash_info_international"),
		//发送短信
		sendSmsCode: (area_code,mobile) => vm.$u.post("/sms_send",{area_code,mobile}),
		//绑定手机号
		bindMobile: (mobile,code) => vm.$u.post("/safe/mobile",{mobile,code}),
	}

	const index = {
		//获取首页的弹窗广告
		getPopupAd: () => vm.$u.get("/news/index_pop"),
		// 获取首页公告
		getNews: () => vm.$u.post("/news/list",{c_id:4}),
		//获取公告详情
		getNewsDetail: (id) => vm.$u.post("/news/detail",{id}),
		// 获取首页轮播图
		getBanner: () => vm.$u.post("/news/list",{c_id:5}),
		//获取首页行情
		getQuotation: () => vm.$u.get("/currency/quotation_new"),
		//获取首页的菜单
		getMenu: () => vm.$u.get("/menu"),
		getFAQ: () => vm.$u.get("/faq"),
		getContactUs: () => vm.$u.get("/contactus"),
		getAboutUs: () => vm.$u.get("/aboutus"),
		getOperationalCompliance: () => vm.$u.get('/operational_compliance')
	}

	const wallet = {
		// 获取转换成人民币的汇率
		getRateCurrency: (id) => vm.$u.get("/wallet/getRateCurrency",{id}),
		// 钱包一些相关信息
		getWalletInfo: (currency) => vm.$u.post("/wallet/get_info",{currency}),
		// 获取钱包充值地址
		getInAddress: (currency,user_id) => vm.$u.post("/wallet/get_in_address",{currency,user_id}),
		//充值
		recharge: (account,amount,currency,type=0) => vm.$u.post("/wallet/charge_req",{account,amount,currency,type}),
		// 获取充值明细
		getRechargeLog: (page = 1,limit = 10) => vm.$u.get("/recharge/log",{page,limit}),
		// 总资产列表
		getWalletList: () => vm.$u.post("/wallet/list"),
		// 获取特定币种在币币合约法币秒合约中的余额
		getDetail: (currency,type) => vm.$u.post("/wallet/detail",{currency,type}),
		// 获取特定币种特定方式的帐变记录
		getLegalLog: (currency,type,page) => vm.$u.post("/wallet/legal_log",{currency,type,page}),
		// 获取币币划转的可用列表
		getTransferList: () => vm.$u.post("/user/getTransferList"),
		// 获取币币划转的费率
		getTransferFee: (from_currency_id,to_currency_id) => vm.$u.post("/user/getTransferFee",{from_currency_id,to_currency_id}),
		// 币币划转
		transfer: (number,from_currency_id,to_currency_id) => vm.$u.post("/user/Transfer",{number,from_currency_id,to_currency_id}),
		// 个人币种列表
		getUserCurrencyList: () => vm.$u.get("/currency/user_currency_list"),
		// 资金划转
		fundTransfer: (currency_id,number,from_field,to_field) => vm.$u.post("/wallet/change",{currency_id,number,from_field,to_field}),
		// 获取划转财务记录
		getTransferHistory: (page) => vm.$u.get("/wallet/hzhistory?page=",{page}),
		//提现
		withdraw: (params) => vm.$u.post("/wallet/out",params),
		//提现记录
		getWithdrawList: (page = 1,limit = 10) => vm.$u.get("/user/withdraw/list",{page,limit}),

	}

	const market = {
		//获取行情的历史数据，x天前的时间戳
		getHistoryData: (from,to,symbol,period) => vm.$u.get("/currency/new_timeshar",{from,to,symbol,period}),
		//添加自选
		addOptional: (currency_id) => vm.$u.post("/optional/add",{currency_id}),
		//删除自选
		delOptional: (id) => vm.$u.post("/optional/del",{id}),
		//获取自选列表
		getOptionalList: () => vm.$u.get("/optional/list"),
		//获取杠杆的一些信息吗，及持仓列表
		getLeverDeal: (currency_id,legal_id) => vm.$u.post("/lever/deal",{currency_id,legal_id}),
		//提交合约交易,share:0,
		submitLever: (obj) => vm.$u.post("lever/submit",obj),
		//获取固定币种的持仓列表,按分页显示
		getLeverDealByPage: (currency_id,legal_id,page) => vm.$u.post("/lever/dealall",{currency_id,legal_id,page}),
		//平仓
		cover: (id) => vm.$u.post("/lever/close",{id}),
		//设置止盈止损
		setStop: (id,target_profit_price,stop_loss_price) => vm.$u.post("/lever/setstop",{id,target_profit_price,stop_loss_price}),
		//全部平仓，0：全部，1：只平多单，2：只平空单
		coverAll: (type) => vm.$u.post("/lever/batch_close",{type}),
		// 获取已购买的秒合约列表和余额
		getPayable: () => vm.$u.get("/microtrade/payable_currencies"),
		//获取已购买的秒合约列表
		getSecondsList: (match_id,status,page = 1,limit = 5) => vm.$u.get("/microtrade/lists",{match_id,status,page,limit}),
		//获取秒合约的秒数
		getSecondsSeconds: () => vm.$u.get("/microtrade/seconds"),
		//购买秒合约
		buySeconds: (match_id,currency_id,type,seconds,number) => vm.$u.post("/microtrade/submit",{match_id,currency_id,type,seconds,number}),
		getResult: (id) => vm.$u.get('/microtrade/get_result', {id}),
		// 获取币币交易中的资产
		getWalletDetail: (currency,type = "change") => vm.$u.post("/wallet/detail",{currency,type}),
		// 币币交易
		coinTrade: (amount,target_price,currency_id,legal_id,type) => vm.$u.post("/coin/trade",{amount,target_price,currency_id,legal_id,type}),
		//获取币币交易列表
		getCoinTradeList: (object) => vm.$u.get("/coin/list",object),
		//获取合约交易的订单
		getleverTrade: (currency_id,legal_id,page,status) => vm.$u.post("/lever/my_trade",{currency_id,legal_id,page,status}),

	}

	const ieo = {
		// 获取ieo认购列表
		getIEOProject: (page,limit) => vm.$u.get("/project",{page,limit}),
		// 获取ieo认购详情
		getIEOProjectDetail: (project_id) => vm.$u.get("/project/detail",{project_id}),
		// 申请认购
		subscribeIEO: (project_id,amount,pay_currency,price) => vm.$u.post("/project/order",{project_id,amount,pay_currency,price}),
		// 已申购列表
		getIEOOrder: (page,limit) => vm.$u.get("/user/project/order",{page,limit}),
	}

	const lockming = {
		// 获取锁仓挖矿列表
		getLockming: () => vm.$u.get("/lh/deposit/config"),
		// 获取锁仓挖矿的订单
		getLockmingOrder: (page,limit) => vm.$u.get("/lh/deposit/order",{page,limit}),
		// 认购锁仓挖矿
		lockming: (config_id,amount) => vm.$u.post("/lh/deposit",{config_id,amount}),
		// 提前赎回
		redemption: (id) => vm.$u.post("/lh/deposit/order/cancel",{id}),
	}

	const follow = {
		//获取交易员列表
		getTraderList: (page) => vm.$u.get("/follow/index?page="+page),
		//跟随,type:1固定比例跟随，2固定手数跟随
		follow: (trader_user_id,number,type) => vm.$u.post("/follow/follow",{trader_user_id,number,type}),
		//取消跟随
		cancelFollow: (follow_user_id) => vm.$u.post("/follow/cancel",{follow_user_id}),
		//获取交易员详情
		getTraderInfo: (trader_user_id) => vm.$u.get("/follow/traderDetail",{trader_user_id}),
		//转自持
		selfHold: (transaction_id) => vm.$u.post("/follow/selfHolding",{transaction_id}),
		//获取历史订单
		getHistoryTrade: (trader_user_id) => vm.$u.get("/follow/historyTrade",{trader_user_id}),
	}

	const invest = {
		//获取产品列表,currency_id :1BTC,2ETH,type:callBTC理财，put：USDT理财
		getList: (currency_id = 1,type = 'call') => vm.$u.get("/dual/index",{currency_id,type}),
		//获取产品详情
		getDetail: (id) => vm.$u.get("/dual/detail",{id}),
		//购买理财产品
		purchase: (id,num) => vm.$u.post("/dual/buyDual",{id,num}),
		//已购买列表
		order: (params) => vm.$u.post("/dual/dual_list",params),
	}

	const nft = {
		//获取nft的产品列表
		getArtwork: (params) => vm.$u.get("/bind_box/getBoxList",params),
		//获取产品详情
		getArtworkDetail: (id) => vm.$u.get("/bind_box/getBoxDetail",{id}),
		//获取艺术家列表
		getArtist: (params) => vm.$u.get("/bind_box/getArtist",params),
		//获取艺术家详情
		getArtistDetail: (uid) => vm.$u.get("/bind_box/getArtistDetail",{uid}),
		//收藏取消收藏艺术品
		collect: (code) => vm.$u.post("/bind_box/collect",{code}),
		// 获取nft中的currency
		getNftCurrency: () => vm.$u.get("/bind_box/getNftCurrency"),
		//获取已收藏的列表
		getCollection: () => vm.$u.get("/bind_box/getCollection"),
		//购买一口价
		purchase: (code) => vm.$u.post("/bind_box/buyNFT",{code}),
		//竞拍时，扣除保证金
		deductMargin: (code) => vm.$u.post("/bind_box/marginNFT",{code}),
		//竞拍
		placeABid: (code,price) => vm.$u.post("/bind_box/auctionNFT",{code,price}),
		//获取出价记录
		getPurchaseOrder: (code) => vm.$u.post("/bind_box/getBindBoxQuotationLog",{code}),
		//我持有的nft
		getMyNFTs: () => vm.$u.post("/bind_box/getMyNFTs"),
		//我的出价记录
		getMyOrder:(page) => vm.$u.post("/bind_box/getMyBindBoxQuotationLog",{page}),
		//开启盲盒
		openBindBox: (code) => vm.$u.post("/bind_box/openBlindBox",{code}),
		//转卖
		resell: (params) => vm.$u.post("/bind_box/resellNFT",params),
		// 获取需要支付的订单
		getNeedPayNFTOrder: () => vm.$u.post("/bind_box/getNeedPayNFTOrder"),
		//已读消息
		readMessage: (id) => vm.$u.post("/bind_box/readNFTOrderMessage",{id}),
		//支付订单
		payOrder: (id) => vm.$u.post("/bind_box/payNFTOrder",{id}),
	}

	const game = {

	}
	
	const kefu = {
		getContactLink: (type) => vm.$u.get("/member/member/getContactLink?type="+type),
	}
	//合约 订单
	const getContractorder = {
		getContactLink: (id) => vm.$u.post("/contract/contract/getContractOrder?orderId="+id),
		setOrderMatch: (params) => vm.$u.post("/contract/contract/setOrderMatch?params",params),
	}
	//合约 订单 新接口 亚琴
	const contractNewInterface = {
		getContractOrder: (orderId) => vm.$u.post("/contract/perpetual_contract/getContractOrder?orderId="+orderId),//订单详情
		getHistoryOrders: (member) => vm.$u.get(`/contract/perpetual_contract/getHistoryOrders?member=${member}&pageNum=1&pageSize=999`),//获取历史列表
		getWarehouses: (memberId,pairsName,price) => vm.$u.get(`/contract/perpetual_contract/getWarehouses?memberId=${memberId}&pairsName=${pairsName}&price=${price}`),//获取持仓列表
		setAllContractMatch: (params) => vm.$u.post(`/contract/perpetual_contract/setAllContractMatch`,params),//一键平仓
		setOrderMatch: (id,coinName,price) => vm.$u.post(`/contract/perpetual_contract/setOrderMatch?id=${id}&coinName=${coinName}&price=${price}`),//单独平仓
		setContractOrderBuy: (params) => vm.$u.post(`/contract/perpetual_contract/setContractOrderBuy`,params,{ 'Content-Type': 'application/json' }),//多开多空
		setContractOrderSell: (params) => vm.$u.post(`/contract/perpetual_contract/setContractOrderSell`,params,{ 'Content-Type': 'application/json' }),//平多平空
	}
	// 基金理财
	const fundFinancing = {
		getFundOrderByUserId: (userId,status) => vm.$u.get(`/fund/fund_product/getFundOrderByUserId?userId=${userId}&status=${status}`),//用户的理财订单
		getFundProduct: () => vm.$u.get("/fund/fund_product/getFundProduct"),//获取基金理财产品
		setFundOrderPurchase: (params) => vm.$u.post(`/fund/fund_product/setFundOrderPurchase`,params,{ 'Content-Type': 'application/json' }),//买入理财产品
		setFundOrderRedeem: (params) => vm.$u.post(`/fund/fund_product/setFundOrderRedeem`,params,{ 'Content-Type': 'application/json' }),//赎回产品
		getCheckFundOrder: (productId) => vm.$u.post(`/fund/fund_product/getCheckFundOrder?productId=${productId}` ),//获取用户购买基金统计信息
		getCountFundOrderByUserId: (userId) => vm.$u.post(`/fund/fund_product/getCountFundOrderByUserId?userId=${userId}` ),//获取确认订单信息的详情

	}
	vm.$u.api = {
		common,
		user,
		setting,
		index,
		wallet,
		market,
		ieo,
		lockming,
		follow,
		invest,
		nft,
		quato,
		bibi,
		fack,
		mhy,
		yx,
		sd,
		trendDetails,
		wantBuy,
		kefu,
		getContractorder,
		contractNewInterface,
		fundFinancing,
	};
}
export default {
	install
}
