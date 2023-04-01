<template>
	<view class="page">
		<xl-header title="Fast deposit"></xl-header>
		<view class="container">
			<view class="title">
				{{currency}} Deposit
			</view>
      <view class="p-30 box-shadow border-radius-20 mx-auto" style="width: 333rpx;">
        <uqrcode id="uqrcode"  ref="uqrcode" class="d-inline-block"></uqrcode>
      </view>
			<view class="save-btn-container">
				<button type="primary" class="save-btn" @click="saveQR">{{ i18n.bcewm}}</button>
			</view>
			<view class="address">
				{{this.address}}
			</view>
			<view class="copy-btn-container">
				<button type="primary" class="copy-btn" @click="copyAddressToClipboard">  {{ i18n.fzdz}}</button>
			</view>
			<view class="input-container">
				<view class="title" style="margin: 10rpx 0;">
          {{ i18n.zcdz}}
				</view>
				<input type="text" class="input" style="padding-right: 160rpx;" placeholder="Enter address"
					placeholder-style="color: #C0C0C0;font-size:26rpx" v-model="rollOutAddress">
				<view class="paste" @tap="pasteClick()">
					{{i18n.zt}}
				</view>
			</view>
			<view class="input-container">
				<view class="title">
          {{ i18n.cbsl}}
				</view>
<!--				<input type="number" class="input" placeholder="Enter amount"-->
<!--					placeholder-style="color: #C0C0C0;font-size:26rpx" v-model="amount">-->
         <input type="number" class="input" :placeholder="i18n.qsrcbsl"
               placeholder-style="color: #C0C0C0;font-size:26rpx"
               v-model.number="amount" min="0" step="1" @input="handleInput">
			</view>
			<view class="chain-container">
				<view class="title">
          {{ i18n.lmc}}
				</view>
				<view class="btn-list">
					<view  v-if="currency === 'USDT'"  class="btn" :class="{active:btnIndex==index}" v-for="(item,index) in btnList" :key="index"
						@tap="chainNameSwitching(index)">
						{{item}}
					</view>
          <view  v-if="currency === 'BTC'"  class="btn" :class="{active:btnIndex==index}" v-for="(item,index) in btnList2" :key="index"
						@tap="chainNameSwitching(index)">
						{{item}}
					</view>
          <view  v-if="currency === 'ETH'"  class="btn" :class="{active:btnIndex==index}" v-for="(item,index) in btnList3" :key="index"
						@tap="chainNameSwitching(index)">
						{{item}}
					</view>
				</view>
			</view>

			<view class="upload-container">
				<view class="title">
					{{ i18n.fkpz}}
				</view>
				<view class="upload">
<!--					<u-upload   max-count="1" upload-text="选择图片" :fileList="fileList">-->
<!--					</u-upload>-->
          <u-upload :upload-text="$t('recharge').xuanzhetupian" max-count="1"
                    @on-success="onSus" :action="action" :header="header">
          </u-upload>

				</view>
			</view>

			<view class="hint-box">
				<view class="title">
          {{ i18n.beizhu.zyts }}
				</view>
				<view class="content">
          {{ i18n.beizhu.shuomingwenzi1 }}
					<br />
          {{ i18n.beizhu.shuomingwenzi2 }}
					<br />
          {{ i18n.beizhu.shuomingwenzi3 }}
					<br />
          {{ i18n.beizhu.shuomingwenzi4 }}
					<br />
          {{ i18n.beizhu.shuomingwenzi5 }}
					<br />
          {{ i18n.beizhu.shuomingwenzi6 }}
				</view>
				<button class="btn" type="primary" @click="nextStep">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>

  export default {
    data() {
      return {
        action:  uni.getStorageSync('imgPath') + '/member/upload/new' || '-', //图片上传地址
        header: {
          'token': uni.getStorageSync('token'),
          'userId': uni.getStorageSync('userId')
        },
        pictureUrl:null,//上传成功的图片地址
        address:'',//收款地址
        rollOutAddress:'',//转出去地址
        rechargeAddress:[],
        fileList: [],//参数(数组，元素为对象)
        selectCoin: '',
        btnList: [
          'ERC20',
          'TRC20',
          'OMNI'
        ],
        btnList2: [
          'BTC',
        ],
        btnList3: [
          'ETH',
        ],
        btnIndex: 0,
        currency: "",//金币名字 已转大写
        amount: 1 //充值的数量
      }
    },
    computed: {
      i18n() {
        return this.$t('recharge')
      }
    },
    watch: {
      btnIndex(newVal, oldVal) {
        this.getQRCode()
      }
    },
    onLoad() {
      this.currency = this.$mp.query.symbol.toUpperCase();
      this.getQRCode()
    },
    methods: {
      //不可以输入0
      handleInput(){
        if(this.amount === 0){
          this.amount = 1
        }
      },
      //切换币名
      chainNameSwitching(e){
        this.btnIndex  = e
      },

      //保存二维码
      saveQR(){
        this.$utils.showToast(this.i18n.bcsbqjtbc)
      },
      //粘贴
         pasteClick() {
          navigator.clipboard.readText().then((text) => {
            // 在此处可以使用文本变量来操作复制的内容
          this.rollOutAddress = text
          });
        },
         //复制文本
      copyAddressToClipboard() {
        const input = document.createElement('input');
        input.setAttribute('value', this.address);
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        this.$utils.showToast(this.i18n.fzcg)
      },
      //上传图片
      onSus(response, index, lists, name) {
        this.$utils.showToast(this.i18n.sccg)
        this.pictureUrl = response.result.url
      },
      close() {
        this.$emit('update:showPup', false)
      },
      confirm() {
        this.$emit('addFn', this.value, this.img)
      },

      // 获取接口地址的 二维码地址
      getQRCode(){
        let coinType = null //进来获取是那个 USDT 或者BTC币种 来请求输入 拿到充值的地址
        switch (this.currency) {
          case 'USDT':
            coinType = 1;
            break
          case 'BTC':
            coinType = 2;
            break
          case 'ETH':
            coinType = 3;
            break
        }
        this.$u.api.user.getRechargeWallet(coinType).then(res=>{
          console.info("🇨🇳🇨🇳:res --", res)
            if (res.status === 'SUCCEED') {
              this.rechargeAddress = res.result
              res.result.forEach(i=>{
                if(this.btnIndex == 0 ){
                  this.address = res.result[0].account;
                } if(this.btnIndex == 1 ){
                  this.address = res.result[1].account;
                } if(this.btnIndex == 2 ){
                  this.address = res.result[2].account;
                }
              })
              this.$refs.uqrcode.make({
                canvasId: 'qrcode',
                mode: 'canvas', // 默认为view
                size: 150,
                text: this.address
              })
            }
        })
      },
      //下一步
      nextStep() {
        //校验是否有数量跟凭证
        if (this.amount <= 0) {
          uni.showToast({
            icon: 'none',
            title: this.i18n.qsrsl
          })
          return
        }
        if (this.pictureUrl == null ){
          uni.showToast({
            icon: 'none',
            title: this.i18n.qsctp
          })
          return
        }
        const temp = {
          currency: this.currency,
          amount: this.amount,
          status: 1,
          memberId: uni.getStorageSync('userId'),
          chainName:  this.currency == 'USDT' ?  this.btnList[this.btnIndex] : this.currency == 'BTC' ?  this.btnList2[this.btnIndex] :  this.btnList3[this.btnIndex],
          paymentVoucher:this.pictureUrl,
        }
        //充值接口
        this.$u.api.user.rechargeCurrency(temp).then(res => {
          if (res.status == "SUCCEED") {
            this.$utils.showToast(this.i18n.czcg)
            uni.navigateTo({
              url:'/pages/withDraw/successfulWthdrawal'
            })
          } else if(res.status == "FAILED") {
            this.$utils.showToast(res.errorMessage)
            this.amount = ''
          }
        })
      },

    }
  }
</script>

<style lang="scss" scoped>
	.container {
		>.title {
			width: 100%;
			margin-top: 40rpx;
			font-size: 32rpx;
			color: #333;
			text-align: center;
		}

		.qrcode-container {
			display: flex;
			justify-content: center;
			align-items: center;

			.qrcode {
				width: 400rpx;
				height: 400rpx;
			}
		}

		.save-btn-container {
			margin-top: 30rpx;

			.save-btn {
				width: 260rpx;
				font-size: 26rpx;
				border-radius: 0;
			}
		}

		.address {
			margin-top: 80rpx;
			color: #333;
			font-size: 28rpx;
			width: 100%;
			text-align: center;
		}

		.copy-btn-container {
			margin-top: 30rpx;

			.copy-btn {
				width: 260rpx;
				font-size: 26rpx;
				border-radius: 0;
				color: #333;
				background-color: #fff;
				border: 2rpx solid #f3f3f3;

				&::after {
					border: none;
				}
			}
		}

		.input-container {
			padding: 30rpx;
			position: relative;
			font-size: 26rpx;
			box-sizing: border-box;

			.title {
				font-size: 28rpx;
			}

			.input {
				// width: 100%;
				// background-color: transparent;
				background-color: #f5f5f5;
				border: none;
				border-radius: 0;
				font-size: 26rpx;
				color: #333;
			}

			.paste {
				position: absolute;
				color: rgb(44, 120, 248);
				bottom: 60rpx;
				right: 60rpx;
			}
		}

		.chain-container {
			padding: 30rpx;
			font-size: 26rpx;
			color: #333;

			.title {
				font-size: 26rpx;
			}

			.btn-list {
				display: flex;
				margin-top: 10rpx;

				>.btn {
					width: 206rpx;
					height: 80rpx;
					margin-right: 20rpx;
					border-radius: 4rpx;
					border: 2rpx solid #868c9a;
					color: #333;
					font-size: 28rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					&.active {
						border: 2rpx solid #2c78f8;
						color: #2c78f8;
					}
				}
			}
		}

		.upload-container {
			padding: 30rpx;
			font-size: 26rpx;
			color: #333;

			.title {
				font-size: 26rpx;
			}
		}

		.hint-box {
			background-color: #f5f5f5;
			padding: 30rpx;

			.title {
				margin-bottom: 30rpx;
				font-size: 26rpx;
				color: #333;
			}

			.content {
				font-size: 28rpx;
				color: #868c9a;
			}

			.btn {
				margin-top: 30rpx;
				font-size: 28rpx;
				line-height: 80rpx;
			}
		}
	}
</style>
