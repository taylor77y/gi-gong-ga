import i18n from "./locales/config.js"
let lang = i18n.messages[i18n.locale]

import store from '@/store';

import Decimal from '@/static/decimal.min.js'

const langStr = uni.getStorageSync('lang') || 'zh';

// 字符串截取小数点后N位
const SubString = (value, num) => {
    if (num == -1) {
        return value;
    }
    if (!value || value === 0) {
        return 0
    } else {

        let s = value + ''
        // if (s.indexOf('.') !== -1) {
        //     return s.substring(0, s.indexOf('.') + 1 + num)
        // } else {
        //     return s
        // }
        if (s.indexOf('.') !== -1) {
            if (num == 0) {
                return s.substring(0, s.indexOf('.'))
            }
            return s.substring(0, s.indexOf('.') + 1 + num)
        } else {
            return s
        }
    }
}
// 根据价格返回对应颜色
const getColor = (price) => {
	//判断是否为字符串
	if(typeof price == "string"){
		if(price.indexOf("%") > -1){
			price = price.slice(0,price.length - 1)
		}
		price = +price
	}
	if(price > 0){
		return "#28ba98"
	}else if(price == 0){
		return "#aaaaaa"
	}else{
		return "#F04A5A"
	}
}

//弹出确认弹框，以promise形式返回
const showModal = (title = lang.common.hint,content)=>{
	lang = i18n.messages[i18n.locale]
	return new Promise((resolve,reject)=>{
		uni.showModal({
			title,
			content,
			// #ifdef APP-PLUS
			//在app端，默认的确定在左，取消在右，这里把位置调换过来
			cancelText:lang.common.confirm,
			confirmText:lang.common.cancel,
			success(res) {
				if(res.confirm){
					resolve(false)
				}else{
					resolve(true)
				}
			}
			// #endif
			// #ifndef APP-PLUS
			cancelText:lang.common.cancel,
			confirmText:lang.common.confirm,
			success(res) {
				if(res.confirm){
					resolve(true)
				}else{
					resolve(false)
				}
			}
			// #endif
			
		})
	})
}

//弹出toast信息
const showToast = (title,icon = 'none') => {
	uni.showToast({
		title,
		icon
	})
}

//进行路由前，如果未登陆，则跳转至登录页
const navigateTo = (url,needToken = true)=>{
	let timer = 0
	if(needToken){
		const token = uni.getStorageSync('token') || ''
		if(!token){
			showToast(lang.common.plsLogin)
			url = "/pages/common/login"
			timer = 1200
		}
	}

	setTimeout(()=>{
		uni.navigateTo({
			url
		})
	},timer)
}

//当前语言转换成后端需要的语言
const langTrans = () => {
	let lang = uni.getStorageSync('lang') || 'zh';
	switch(lang){
		case 'zh':
			return 'zh-cn';
		case 'en':
			return 'en';
		case 'hk':
			return 'zh-tw';
	}
}

const uploadImage = () => {
	// #ifdef H5
	const sourceType =['album']
	// #endif
	// #ifndef H5
	const sourceType =['camera','album']
	// #endif
	return new Promise((resolve,reject)=>{
		const _this = this
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType, //从相册选择
			success: function(res) {
				const filePath = res.tempFilePaths[0]
				const file = res.tempFiles[0]
				uni.showLoading({
					title: lang.common.loading
				})
				uni.uploadFile({
					url: store.state.baseUrl + '/upload',
					filePath,
					name: 'file',
					header: {
						'accept-language': langTrans(),
						'Authorization': store.state.token,
					},
					success(res) {
						let result = res.data.replace(/\n/g, "").replace(/\n/g, "").replace(/\n/g, "").replace(/\s/g, "")
						res = JSON.parse(decodeURIComponent(result))
						showToast(lang.common.success)
						resolve(res.message)
					},
					fail(res){
						reject(res)
					},
					complete() {
						uni.hideLoading()
					}
				})
			}
		});
	})
}

const setTabbar = (that) => {
	const nav = that.$t("nav")
	for(let i = 0; i < nav.length; i++){
		uni.setTabBarItem({
			index:i,
			text:nav[i],
			fail(res) {
				console.log(res);
			}
		})
	}
}

const jump = (url,type = 'navigateTo') => {
	switch(type){
		case 'navigateTo':
			uni.navigateTo({
				url
			})
			return;
		case 'redirectTo':
			uni.redirectTo({
				url
			})
			return;
		case 'reLaunch':
			uni.reLaunch({
				url
			})
			return;
		case 'navigateTo':
			uni.navigateTo({
				url
			})
			return;
		case 'navigateBack':	
			uni.navigateBack({
				delta:url
			})
	}
}
 // 判断字符串是否为数字和字母组合
const checkIsNumAndWords = str =>{
   
    var reg =  /^[0-9a-zA-Z]*$/;  
    if (!reg.test(str)) {
        return false;
    } else {
        return true;
    }
}


const backHome = () => {
	uni.navigateTo({
		url:'/pages/quotation/index.vue'
	})
}

//去除所有特殊字符
const charFilter = str => {
    var pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\]<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]", 'g');
    return str.replace(pattern, '');
}

//判断是否有特殊字符
const charTest = str => {
	var pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\]<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]", 'g');
	if(pattern.test(str)) return true
	return false
}

//返回买卖的英文
const retBuyAndSell = (str) => {
	str = str == '买' ? 'b' : 's'
	const obj = {
		'zh':{
			b:'买',
			s:'卖',
		},
		'en':{
			b:'Buy',
			s:'Sell',
		},
		'hk':{
			b:'買',
			s:'賣',
		}
	}
	return obj[langStr][str]
}

//根据当前语言返回名称
const retNameByLang = (item) => {
	switch(langStr){
		case 'zh':
			return item.option_name;
			break;
		case 'en':
			return item.en_name;
			break;
		case 'hk':
			return item.tw_name;
			break;
	}
}

//去除html标签
const removehtmltag = (str) => {
    return str.replace(/<[^>]+>/g, '')
}

// 获取url参数
const getQueryString = (name) => {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const search = window.location.search.split('?')[1] || '';
    const r = search.match(reg) || [];
    return r[2];
}

const stamp2Time = (ts,type = 'd') => {
	if(!ts) return 0
	if(typeof(ts) == 'string') ts = Number(ts)
	if(ts.toString().length > 10) ts = ts / 1000
	const d = parseInt(ts  / 60 / 60 / 24, 10);
	const h = parseInt(ts  / 60 / 60 % 24, 10);
	const m = parseInt(ts  / 60 % 60, 10);
	const s =parseInt(ts  % 60, 10);
	
	switch(type){
		case 'd':
			return checkTime(d);
		case 'h':
			return checkTime(h);
		case 'm':
			return checkTime(m);
		case 's':
			return checkTime(s);
	}
}

function checkTime(i){
	if (i < 10) {
	        i = "0" + i;
	    }
	return i;
}

const nftBuyStatus = (status,start_time,end_time) => {
	const nowTimestamp = Date.parse(new Date()) 
	if(typeof(start_time) != 'number') start_time = Date.parse(start_time)
	if(typeof(end_time) != 'number') end_time = Date.parse(end_time)
	
	//未开始
	if(nowTimestamp < start_time){
		return 2
	}
	
	if(nowTimestamp >= start_time && nowTimestamp <= end_time){
		//如果status是0已结束，则返回已结束
		if(status == 0) return 0
		return 1
	}
	
	if(nowTimestamp > end_time){
		return 0
	}
	
}

//解决js加减法的精度问题
const math = (a,method,b) => {
	switch(method){
		case '+':
			return new Decimal(a).add(new Decimal(b)).toNumber() ;
		case '-':
			return new Decimal(a).sub(new Decimal(b)).toNumber();
		case '*':
			return new Decimal(a).mul(new Decimal(b)).toNumber();
		case '/':
			return new Decimal(a).div(new Decimal(b)).toNumber();
	}
}

//根据币种返回对应颜色
const getCurrencyColor = (currency_name) => {
	const currencys = {
		'BTC':'#F2994A',
		'USDT':'#26A17B',
		'LTC':'#9EA3CA',
		'ETH':'#8DA0E0'
	}
	if(currencys[currency_name]) return currencys[currency_name]
	return '#8DA0E0'
}

//获取价格精度
const getPrecisionLength = (number) => {
	let length
	if(typeof(number) == 'number') number = String(number)
	length = number.indexOf('.') > -1 ? number.split('.')[1].length : 0
	return length
}


// 图片转base64
const ploadFilePromise = function(url, callBack) {
	// #ifdef MP-WEIXIN
	uni.getFileSystemManager().readFile({
		filePath: url, //选择图片返回的相对路径
		encoding: 'base64', //编码格式
		success: res => { //成功的回调
			const base64 = res.data //不加上这串字符，在页面无法显示的哦
			callBack(base64)
		},
		fail: (e) => {
			console.log("图片转换失败");
		}
	})
	// #endif
	// #ifdef H5
	uni.request({
		url: url,
		method: 'GET',
		responseType: 'arraybuffer',
		success: ress => {
			let base64 = uni.arrayBufferToBase64(ress.data); //把arraybuffer转成base64
			callBack(base64)
		},
		fail: (e) => {
			console.log("图片转换失败");
		},
		// #endif
		// #ifdef APP-PLUS
		plus.io.resolveLocalFileSystemURL(url, (entry) => {
			// 可通过entry对象操作test.html文件 
			entry.file((file) => {
				let fileReader = new plus.io.FileReader();
				fileReader.onloadend = (evt) => {
					const base64 = evt.target.result.substr(22);
					callBack(base64)
				}
				fileReader.readAsDataURL(file);
			});
		}, (e) => {
			alert("Resolve file URL failed: " + e.message);
		});
	// #endif
	// #ifdef H5
	});
	// #endif
}

//将base64转成文件流
const base64toFile = function (dataurl, filename = "file") {
    let arr = dataurl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];

    let suffix = mime.split("/")[1];

    let bstr = atob(arr[1]);

    let n = bstr.length;

    let u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
    });
}
// 时间戳转为时间格式包含时分秒
   const timestampToDate = function(timestamp, format = 'Y/M/D h:m:s') {
	let formatArr = ['Y', 'M', 'D', 'h', 'm', 's'];
	let dateArr = [];
	let date = new Date(parseFloat(timestamp));

	dateArr.push(
		...[
			date.getFullYear(),
			dateAddZero(date.getMonth() + 1),
			dateAddZero(date.getDate()),
			dateAddZero(date.getHours()),
			dateAddZero(date.getMinutes()),
			dateAddZero(date.getSeconds())
		]
	);

	for (let i in dateArr) {
		format = format.replace(formatArr[i], dateArr[i]);
	}
	console.log(format);
	return format;
};
function dateAddZero(date) {
	return date < 10 ? `0${date}` : date;
}
//单张图片上传  progresCallBack：进度回调  key:上传任务标示
	const uploadOnePictures = function(image, path, callBack, progresCallBack, key) {
		if (image == undefined) {
			return
		}
		var header = {}
		let filename = new Date().getTime()
		filename = 'images' + filename
		console.log(path, "path----------------")
		console.log(image, "image----------------")
		const uploadTask = uni.uploadFile({
			url: `${uni.getStorageSync('imgPath')}?member=${uni.getStorageSync('userId')}`, // 
			filePath: image,
			name: 'file',
			formData: {
				'filepath': path,
				'filename': filename
			},
			header: header,
			success: (uploadFileRes) => {
				uni.hideLoading()
				// console.log("单张图片上传", uploadFileRes);
				var data = JSON.parse(uploadFileRes.data)
				console.log("单张图片上传  成功", data);
				callBack(data)
			}
		});

		//获取上传进度
		uploadTask.onProgressUpdate(function(res) {
			// console.log('上传进度' + res.progress);
			// console.log('已经上传的数据长度' + res.totalBytesSent);
			// console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
			if (progresCallBack != null) {
				progresCallBack(res);
			}

			// 测试条件，取消上传任务。
			// if (res.progress > 50) {
			// 	uploadTask.abort();
			// }
		});


	}
	// 微信小程序批量上传
	const weixinuploadPictures = function(imgList, path, callBack, header, i, length, dataTab, key) {
		var image = imgList[i]
		if (image == undefined) {
			return
		}
		var that = this
		uni.uploadFile({
			url: `${uni.getStorageSync('imgPath')}?member=${uni.getStorageSync('userId')}`, // 
			filePath: image,
			name: 'file',
			formData: {
				'filepath': path,
				'key': key
			},
			header: header,
			success: (uploadFileRes) => {
				// uni.hideLoading()
				var data = JSON.parse(uploadFileRes.data)
				console.log("单张图片上传  成功", data);
				dataTab.push(data)
			},
			fail: (res) => {
				// console.log("=批量上传图片失败======",res);
			},
			complete: function(data) {
				// console.log("单张图片上传完成",data);
				// console.log(i);
				i++;
				if (i == length) { //当图片传完时，停止调用
					// console.log('成功');
					// console.log('dataTab',dataTab);
					var data = {}
					data.successUrls = []
					for (var j = 0; j < dataTab.length; j++) {
						data.successUrls.push(dataTab[j].data)
					}
					console.log('成功', data);
					callBack({
						'data': data
					})
					uni.hideLoading()
				} else {
					that.weixinuploadPictures(imgList, path, callBack, header, i, length,
						dataTab); //ps::这里也可以使用for循环方式一个个上传，但是因为网络等原因，不能很好地控制，故改用这种重新调用的方式来完成
				}
			}
		});
	}
	//批量上传图片
	const uploadPictures = function(imgList, path, callBack) {
		uni.showLoading({
			title: 'Upload de imagem'
		});
		var images = [];
		if (imgList.length == 1) {
			this.uploadOnePictures(imgList[0], path, callBack)
			return
		}
		// 微信小程序  只能一次上传一张
		// #ifdef MP-WEIXIN    
		var value = user.getData();
		var header = {}
		console.log(value, "value-----------")
		if (value != undefined || value != null) {
			var uid = value.userId + ":" + value.token;
			console.log(uid, "uid-----------------")
			
			header.Authorization = value
			console.log(header, "header-----------------")
		}
		var data = []
		this.weixinuploadPictures(imgList, path, callBack, header, 0, imgList.length, data)
		return
		// #endif
		for (var i = 0, len = imgList.length; i < len; i++) {
			var image_obj = {
				name: 'files',
				uri: imgList[i]
			};
			images.push(image_obj);
		}
		var value = user.getData();
		var header = {}
		console.log(value, "value-----------")
		if (value != undefined || value != null) {
			var uid = value.userId + ":" + value.token;
			console.log(uid, "uid-----------------")
			
			header.Authorization = value
			console.log(header, "header-----------------")
		}
		uni.uploadFile({
			url: `${uni.getStorageSync('imgPath')}?member=${uni.getStorageSync('userId')}`,
			files: images,
			filePath: '',
			name: '',
			formData: {
				'path': path
			},
			header: header,
			success: (res) => {
				
				uni.hideLoading()
				var data = JSON.parse(res.data)
				callBack(data)
				// uploadTask.onProgressUpdate((res) => {
				//    console.log('上传进度' + res.progress);
				//    console.log('已经上传的数据长度' + res.totalBytesSent);
				//    console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
				
				//    // 测试条件，取消上传任务。
				//    if (res.progress > 50) {
				//     uploadTask.abort();
				//    }
				//   });
				// return data
				// this.serverImgSrc = data.data.successUrls
				// console.log("=this.serverImgSrc=======",this.serverImgSrc);
			}
		});
	}
	// 邮箱正则
	
	const testEmail = function (em) {
		if (/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(em)) {
	    // if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(em)) {
	        return false;
	    } else {
	        return true
	    }
	
	}
	
	// 6位纯数字 验证码
	
	const testCode = function (pas) {
	    let str = pas.trim();
	
	    if (/^\d{6}$/.test(str)) {
	        return false
	    } else {
	        return true
	    }
	}


export default{
	getColor,
	showModal,
	showToast,
	navigateTo,
	uploadImage,
	setTabbar,
	jump,
	checkIsNumAndWords,
	backHome,
	charFilter,
	retBuyAndSell,
	retNameByLang,
	charTest,
	removehtmltag,
	getQueryString,
	stamp2Time,
	nftBuyStatus,
	math,
	getCurrencyColor,
	getPrecisionLength,
	ploadFilePromise,
	base64toFile,
	timestampToDate,
	uploadOnePictures,
	uploadPictures,
	SubString,
	testEmail,
	testCode
}