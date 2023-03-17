const removeSpace = (str) => {
	return str.trim().replace(/\n/g, "").replace(/\n/g, "").replace(/\n/g, "").replace(/\s/g, "");
}

const sort2Icon = sort => {
	switch (sort) {
		case 'none':
			return require('static/image/icon/sort.png');
			break;
		case 'up':
			return require('static/image/icon/sort-up.png');
			break;
		case 'down':
			return require('static/image/icon/sort-down.png');
			break;
	}
}

const numberFormat = number => {
	number = Number(number)
	if (number > 1000000) {
		return Number((number / 1000000).toFixed(1)) + 'M'
	} else if (number > 1000) {
		return Number((number / 1000).toFixed(1)) + 'K'
	} else {
		return Number(number.toFixed(4))
	}
}

const retImageUrl = src => {
	const baseUrl = 'https://www.qkged.xyz'
	//如果带http，则直接返回
	if (/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(src)) {
		return src
	} else if (src) {
		return baseUrl + src
	} else return ''
}

//根据精度设置数字
const setPrecision = (number, length = 2) => {
	number = Number(number)
	if (length === 0) return String(parseInt(number))
	return number.toFixed(length)
}
// 字符串截取小数点后N位
let SubString = (value, num) => {
	// value = parseFloat(value);
	if (num == -1) {
		return value;
	}
	if (!value || value === 0) {
		return parseFloat(0).toFixed(num)
	} else {
		let s = value + ''
		if (num == 0) {
			return parseInt(value);
		} else {
			if (s.indexOf('.') !== -1) {
				return s.substring(0, s.indexOf('.') + 1 + num)
			} else {
				return s
			}
		}

	}
}

// 字符串截取小数点后N位
let SubString2 = (value, num) => {
	if (!value || value === 0) {
		return ""
	} else {
		let s = value + ''
		return s.substr(0, num)
	}
}

// 字符串截取小数点后N位
let SubString3 = (value, max, min) => {
	if (!value || value === 0) {
		return ""
	} else {
		let s = parseFloat(value);
		if (s > 10) {
			return s.toFixed(max)
		} else {
			return s.toFixed(min)
		}

	}
}

// 字符串截取小数点后N位 补充0 站位

let SubStringZreo = (value, num) => {
	if (!value || value == 0) {
		let last1 = '';
		for (let i = 0; i < num; i++) {

			last1 += '0'
			// console.log(last)
		}
		return '0.' + last1

	} else {
		value = String(value)
		if (value.indexOf('.') == -1) { //没有点
			let last = '';
			for (let i = 0; i < num; i++) {

				last += '0'
				// console.log(last)
			}
			return value + '.' + last
		} { //有点

			let dianLen = value.split('.')[1].length;
			if (dianLen >= num) { // 直接截取
				return value.substring(0, value.indexOf('.') + 1 + num);
			} else { //补充部分0
				let last = '';
				for (let i = 0; i < num - dianLen; i++) {
					last += '0'
				}
				return value + last
			}
		}
	}
}


// 时分秒
let hms = value => {
	var date = new Date(value) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var h = date.getHours()
	h = h < 10 ? '0' + h : h
	var m = date.getMinutes()
	m = m < 10 ? '0' + m : m
	var s = date.getSeconds()
	s = s < 10 ? '0' + s : s
	return h + ':' + m + ':' + s
}
// 年月日时分秒
let yndhms = (value, type) => {
	var date = new Date(value) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	var D = date.getDate()
	D = D < 10 ? '0' + D : D
	var h = date.getHours()
	h = h < 10 ? '0' + h : h
	var m = date.getMinutes()
	m = m < 10 ? '0' + m : m
	var s = date.getSeconds()
	s = s < 10 ? '0' + s : s
	if (type == 'M') {
		return M + D + ' ' + h + ':' + m + ':' + s
	}
	return Y + M + D + ' ' + h + ':' + m + ':' + s
}
// 年月日
let ynd = value => {
	var date = new Date(value) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	var D = date.getDate()
	D = D < 10 ? '0' + D : D
	return Y + M + D
}




// 手机号加密
let encryptionphone = value => {
	return value.substr(0, 3) + '****' + value.substr(-4)
}
// 邮箱加密
let encryptionmail = value => {
	return value.substr(0, 3) + '****' + value.substr(-9)
}
// 数字截取万，亿
let SubString1 = (val, n) => {
	val = parseFloat(val);
	if (!val) {
		return parseFloat(0).toFixed(n)
	}

	if (val < 10000) {
		return SubString(val, n);
	} else if (val < 1000000) {
		// (parseFloat(val) / 10000).toFixed(n)
		val = SubString(parseFloat(val) / 1000, n) + 'K'
		return val;
	} else {
		// val = (parseFloat(val) / 100000000).toFixed(n) + '亿'
		val = SubString(parseFloat(val) / 1000000, n) + 'M'
		return val;
	}
}

// let SubString1 = (val, n) => {
//     val = parseFloat(val);
//     if (!val) {
//         return parseFloat(0).toFixed(n)
//     }

//     if (val < 10000) {
//         return SubString(val, n);
//     } else if (val < 100000000) {
//         // (parseFloat(val) / 10000).toFixed(n)
//         val = SubString(parseFloat(val) / 10000, n) + 'k'
//         return val;
//     } else {
//         // val = (parseFloat(val) / 100000000).toFixed(n) + '亿'
//         val = SubString(parseFloat(val) / 100000000, n) + 'M'
//         return val;
//     }
// }
//
let toFixed = (val, n) => {
	if (!val) {
		return parseFloat(0).toFixed(n)
	}
	return parseFloat(val).toFixed(n)
}
let toFixedRate = (val, n) => {
	var val = val - 0;
	if (!val) {
		return parseFloat(0).toFixed(n)
	}
	if (val > 0) {
		return '+' + val.toFixed(n)
	}
	return val.toFixed(n)
}


// userId显示处理
let useridhander = (s) => {
	return s.substring(0, 5) + '...' + s.substring(s.length - 5, s.length)
}
// 身份证加星
let cardNum = (val) => {
	val = val + '';
	if (!val) {
		return val;
	}
	// console.log(val)
	// return val.replace(/(.{3}).*(.{4})/, "$1***********$2");
	return val.substring(0, 4) + '**********' + val.substring(val.length - 4, val.length)

}
let toNumber = (num, n = -1) => {

	//处理非数字
	if (isNaN(num)) {
		return num
	};

	//处理不需要转换的数字
	var str = '' + num;
	if (!/e/i.test(str)) {
		return SubString(parseFloat(num), n);
	};
	return SubString((num).toFixed(18).replace(/\.?0+$/, ""), n);
}
//截取字符串长度
let subStrings = (val, n) => {
	val = val + '';
	if (!val) {
		return;
	}
	return val.substr(0, n)
}

let timestampToDate = (val) => {
	var date = new Date(val);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';

	var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
	var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
	var strDate = Y + M + D + h + m + s;
	console.log('输出内容:', strDate)
	return strDate;
}
export {
	removeSpace,
	sort2Icon,
	numberFormat,
	retImageUrl,
	setPrecision,
	SubString,
	hms,
	yndhms,
	ynd,
	encryptionphone,
	encryptionmail,
	toFixed,
	SubString1,
	SubStringZreo,
	toFixedRate,
	useridhander,
	cardNum,
	SubString2,
	toNumber,
	subStrings,
	SubString3,
	timestampToDate
}
