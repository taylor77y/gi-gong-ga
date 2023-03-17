// import {
//   wssURL
// } from "./config"
import md5Libs from "uview-ui/libs/function/md5";
import pako  from './pako.min.js'
// import store from '@/store/index'
// ${window.localStorage.getItem('userId') ? window.localStorage.getItem('userId'):this.id}
class socket {
  constructor(url = `${uni.getStorageSync('wssURL')}`, options) {
    // constructor(url = `wss://bbim.FDEXpro.top/service/message/${store.state.userId}`, options) {
    // constructor(url = config.wsURL, options) {
    this.heartBeatTimer = null
    this.options = options
    this.messageMap = {}
    this.connState = 0
    this.socket = null
    this.id = null
    // if (!this.id) {
    // 	const userId = window.localStorage.getItem('userId')
    // 	if (userId) {
    // 		url = url + userId
    // 	}

    // }
    this.BrowserWebSocket = window.WebSocket || window.MozWebSocket

    this.url = ''

  }
  handleUrl(id) {
    console.log(id)
    // this.id = id
    this.url = uni.getStorageSync('wssURL') + id
  }
  doOpen() {
    console.log('999999999999', this.connState)

    if (this.connState) return
    this.doClose()
    console.log('开启连接--------888888888888888888', this.connState)
    this.connState = 1
    this.afterOpenEmit = []
    const socket = new this.BrowserWebSocket(this.url)
    // socket.binaryType = 'arraybuffer'
    socket.onopen = evt => this.onOpen(evt)
    socket.onclose = evt => this.onClose(evt)

    socket.onmessage = evt => this.onMessage(evt.data)
    socket.onerror = err => this.onError(err)
    this.socket = socket
  }
  // 主动断掉scoket
  toClose() {
    console.log('断开')
    this.destroy()

  }
  onOpen(evt) {
    this.connState = 2
    if (this.heartBeatTimer === null) {

      this.heartBeatTimer = setInterval(this.checkHeartbeat.bind(this), 15000)
    }

    this.handlerCallback('open', evt)
  }
  checkOpen() {
    return this.connState === 2
  }
  onClose(evt) {
    console.log(evt, '关闭------------2222222222222222')
    this.connState = 0
    if (this.connState) {
      this.handlerCallback('close', evt)
    }
  }
  // 压缩
  stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0);
        bytes.push(((c >> 12) & 0x3F) | 0x80);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0);
        bytes.push((c & 0x3F) | 0x80);
      } else {
        bytes.push(c & 0xFF);
      }
    }
    return bytes;
  }
  send(data) {
    const {
      cmd,
      body
    } = data
    let sign = body ? this.keyFn(body):''
    const temp = {
      flag: 1,
      cmd,
      source: 1,
      body,
      sign
    }
    const msg = JSON.stringify(temp)
    const text = this.stringToByte(this.zip(msg)) // 转压缩
    let bytes = new Uint8Array(text.length);
    for (var i = 0; i < bytes.length; i++) {
      bytes[i] = text[i];
    }
    this.socket.send(bytes)
  }
  keyFn(arr) {
  	let str = ''
  	Object.keys(arr).sort().map(key => {
  		if (arr[key]) {
  			str += key + '=' + arr[key] + '&'
  		}
  	})
  	str += 'key=dslkh2394lafl;341g@.,_'
  	// str += parseInt(new Date().getTime() / 1000);
  	// str += this.dateTimeStr('ymdhi');
  	return md5Libs.md5(str)
  }
  // 压缩成gzip
  zip(str) {
    var binaryString = pako.gzip(str, {
      to: 'string'
    });
    return btoa(binaryString);
  }

  //js解压gzip
  unzip(key) {
    key = atob(key)
    console.log(key)
    // 将二进制字符串转换为字符数组
    var charData = key.split('').map(function(x) {
      return x.charCodeAt(0);
    });
    // 将数字数组转换成字节数组
    var binData = new Uint8Array(charData);
    // 解压
    var data = pako.inflate(binData);
    // key = String.fromCharCode.apply(null, new Uint16Array(data));
    var res = '';
    var chunk = 16 * 1024;
    var i;
    for (i = 0; i < data.length / chunk; i++) {
      res += String.fromCharCode.apply(null, data.slice(i * chunk, (i + 1) * chunk));
    }
    res += String.fromCharCode.apply(null, data.slice(i * chunk));
    // 将GunZip ByTAREAR转换回ASCII字符串
    return decodeURIComponent(escape(res));

  }
  onMessage(message) {
    // console.error('解压前时间戳：' +  new Date().getTime());

    let blob = message
    if (typeof blob == 'string') {
      return
    } // 如果是字符串，什么操作也不做
    else {
      try {

        let newblob = blob.slice(0, blob.size)
        //js中的blob没有没有直接读出其数据的方法，通过FileReader来读取相关数据
        let reader = new FileReader();
        reader.readAsBinaryString(newblob);
        reader.onload = (evt) => {
          if (evt.target.readyState == FileReader.DONE) {
            let zipdata = evt.target.result; //base64
            try {
              let data = this.unzip(zipdata);
              this.handleRes(JSON.parse(data))

            } catch (err) {
              console.error(' >> Data parsing error:', err)
            }
          }
        }
      } catch (error) {
        console.error('解压出错')
        console.log(error)
      }
    }
  }
  handleRes(temp) {

    if (temp.code === 200) {
      if (temp.cmd === 2 || temp.cmd === 3 || temp.cmd === 4) {
        return this.handlerCallback('message', temp)
      }
      if (temp.cmd === 1) {
        return this.handlerCallback('login-ok', temp)
      }
      // if () {
      // 	return this.handlerCallback('message',message)
      // }
      // if (temp.cmd == 2) {
      // 	// return this.handlerCallback('msg-result',message)
      // }
    } else {
      if (temp.cmd === 1) {
        return this.handlerCallback('login-err', temp)
      } else {
        return this.handlerCallback('msg-err', temp)
      }
    }
  }
  checkHeartbeat() {
    const data = {
      cmd: 100,
      body: "PING"
    }
    console.log(this.socket.readyState)
    // if (this.socket.readyState === 3) {
    // 	console.log('重复触发了------------------')
    // 	this.doOpen()
    // 	return
    // }
    if (this.socket.readyState !== 1) {
      console.log('重复触发了------------------')
      this.doOpen()
      return
    }
    // console.log(this.socket.readyState)
    this.send(data)
  }
  handlerCallback(tag, cb) {
    const callback = this.messageMap[tag]

    if (callback) callback(cb)
  }
  onError(err) {
    console.log(err, '错误-------11111111111111111')
    this.handlerCallback('error', err)
  }
  // onReceiver(data) {
  // 	const callback = this.messageMap[data.Event]
  // 	if (callback) callback(data.Data)
  // }
  on(name, handler) {
    this.messageMap[name] = handler
  }
  doClose() {
    if (this.socket) {
      this.socket.close()
    }
  }
  destroy() {
    console.log('退出了----------------44444444')
    if (this.heartBeatTimer) {
      clearInterval(this.heartBeatTimer)
      this.heartBeatTimer = null
    }

    this.doClose()
    console.log(this.socket)
    this.messageMap = {}
    this.connState = 0
    this.socket = null
  }

}

export default socket
