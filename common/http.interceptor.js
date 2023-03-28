import i18n from '@/common/locales/config.js'
const {common} = i18n.messages[i18n.locale];

const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({

		// baseUrl: process.env.NODE_ENV === 'development' ? '/api' : "http://wap.mxoexchange.vip/",
		baseUrl: process.env.NODE_ENV === 'development' ? '/api' : "https://www.mxoexchange.com/",
		// baseUrl: process.env.NODE_ENV === 'development' ? '/api' : "http://www.mxoex182.cn/",
		// baseUrl: process.env.NODE_ENV === 'development' ? '/api' : "http://www.nvzyj.cn/",

		// baseUrl: process.env.NODE_ENV === 'development' ? '/api' : "http://wap.adbaa3011.cc/",

		// baseUrl: process.env.NODE_ENV === 'development' ? '/api' : "http://wap.mxoexchange.vip/",
		// baseUrl: process.env.NODE_ENV === 'development' ? '/api' : "http://wap.mxoexchange.vip/",
		// baseUrl: process.env.NODE_ENV === 'development' ? '/api' : "http://wap.adbaa3011.cc/",
		// baseUrl: 'https://qcapi.obk3.com',
		// baseUrl: 'http://wap.mxoexchange.vip/',
		// 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
		// 设置为true后，就需要在this.$u.http.interceptor.response进行多一次的判断，请打印查看具体值
		// originalData: true,
		// 设置自定义头部content-type
		// header: {
		// 	'content-type': 'xxx'
		// }

	});
	 // 上传图片路径
	// uni.setStorageSync('imgPath', 'http://wap.mxoexchange.vip/upfile')
	// uni.setStorageSync('imgPath', process.env.NODE_ENV === 'development' ? '/api' : "http://wap.adbaa3011.cc/")
	uni.setStorageSync('imgPath', process.env.NODE_ENV === 'development' ? '/api' : "https://www.mxoexchange.com/")
	// uni.setStorageSync('imgPath', process.env.NODE_ENV === 'development' ? '/api' : "http://www.mxoex182.cn/")
	// uni.setStorageSync('imgPath', process.env.NODE_ENV === 'development' ? '/api' : "http://www.nvzyj.cn/")
	// 客服连接地址
	uni.setStorageSync('wssURL', 'ws://wap.adbaa3011.cc/socket/im/')
	// 图片拼接路径
	
	// uni.setStorageSync('domainPay', 'http://oss.obk3.com/')
	// uni.setStorageSync('ossUrl','http://wap.mxoexchange.vip/')
	uni.setStorageSync('ossUrl','https://db23app.vip/wap/api')

	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {


		// let lang = uni.getStorageSync('lang') || 'en';
		// config.data['lang'] = lang
		let token = uni.getStorageSync('token');
		let userId = uni.getStorageSync('userId');
		config.header['token'] = token
		config.header['userId'] = userId
		if (!config.header['Content-Type']) config.header['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'



		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式，见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;

		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;

		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;

		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的，所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		// const token = uni.getStorageSync('token');
		// config.header.token = token;

		return config;
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// console.log('来咯',res)
		return res
		// const code = res.errorCode
		// const errorMessage = res.errorMessage;
		// switch (code) {
		//     case '0':
		//         break;
		//     case 'SYS.0015':
			// vm.$store.commit('deleteUser')
			// uni.clearStorageSync();
			// setTimeout(()=>{
			// 	uni.navigateTo({
			// 		url:'/pages/login/login'
			// 	})
			// },1200)
			// const jump = uni.getStorageSync('jump')
			// if (!jump) {
				// setTimeout(()=>{
				// 	uni.navigateTo({
				// 		url:'/pages/login/login'
				// 	})
				// },2000)
			// }
			// uni.getStorageSync('jump', 'true')
		       //  if (errorMessage != '密码有误') { //修改用户支付密码报这个错
				    	// vm.$store.commit('deleteUser')
				    	// setTimeout(()=>{
				    	// 	uni.redirectTo({
				    	// 		url:'/pages/login/login'
				    	// 	})
				    	// },1200)

		       //  }
		        // break;
		// }
		// return res;
		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
		// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
		// res = JSON.parse(res)
		// if(res.type == 'ok' || res.code == 1) {
		// 	// 如果把originalData设置为了true，这里return回什么，this.$u.post的then回调中就会得到什么
		// 	return res;
		// } else if(res.type === '999'){
		// 	vm.$utils.showToast(res.message)
		// 	vm.$store.commit('deleteUser')
		// 	setTimeout(()=>{
		// 		uni.redirectTo({
		// 			url:'/pages/common/login'
		// 		})
		// 	},1200)
		// 	return false;
		// }else if(res.type === '998'){
		// 	vm.$utils.showToast(res.message)
		// 	setTimeout(()=>{
		// 		uni.navigateTo({
		// 			url:'/pages/setting/real_mark'
		// 		})
		// 	},1200)
		// 	return false;
		// } else{
		// 	vm.$utils.showToast(res.message)
		// 	return false;
		// }
	}
}

export default {
	install
}
