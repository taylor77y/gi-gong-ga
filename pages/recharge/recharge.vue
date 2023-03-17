<template>
	<view class="container">
		<view class="f-head d-flex-between-center">
			<image @click="back()" class="icon_1" referrerpolicy="no-referrer"
				src="/static/lanhu_querenmima/ps2495rpr92seqakcpyfbbjuasmb353tg5d13ee66-88f7-4c8e-80de-307ef55cf92f.png" />
			<view class="right">
				<image @click="getPath()" src="../../static/image/recharge/1.png">
					<!-- <image src="../../static/image/recharge/2.png"> -->
			</view>
		</view>
		<view class="re-title">
			<view>{{ code === 1 ? i18n.chonzhi:i18n.tixian }}</view>
			<!-- <view class="right">
				<image src="../../static/image/recharge/3.png"> 接收
			</view> -->
		</view>
		<!-- <view class="address-box">
			<view class="qr-code">

			</view>
			<view class="tips">
				仅支持对该地址{{ code === 1 ? i18n.chonzhi:i18n.tixian }}AVA。
			</view>
			<view class="tips">
				该地址不支持充值NFT,请至NFT页 面充值。
			</view>
		</view> -->
		<view class="rech-line"></view>
		<view class="recharge-addre" v-if="code === 1">
			<view class="title">
				{{ code === 1 ? i18n.chonzhi:i18n.tixian }}{{ i18n.dizhi }}
			</view>
			<view class="num">
				<view class="left">
					{{account}}
				</view>
				<view class="right" @click="getCopy(account)">
					<image src="../../static/image/fIattributes/30.png">
				</view>
			</view>
			<!-- <view class="tip1">
				*充值BEP20代币地址，不支持主网充值。
			</view> -->
		</view>
		<view class="recharge-addre">
			<view class="title">
				{{ code === 1 ? i18n.chonzhi:i18n.tixian }}{{ i18n.dizhi }}
			</view>
			<view class="num" v-if="code === 1">
				<view class="left">
					{{item.currency}}
				</view>

			</view>
			<view class="num" v-else>
				<view class="left">
					{{item.currency}}
					<!-- {{list[withdrawalType]}} -->
				</view>
				<view class="right" @click="chaninCode = true">
					<image src="../../static/image/recharge/4.png">
				</view>
			</view>

		</view>
		<view class="recharge-addre">
			<view class="title">
				{{ code === 1 ? i18n.chonzhi:i18n.tixian }}{{ i18n.dizhi }}
				<image src="../../static/image/recharge/5.png">
			</view>
			<view class="num">
				<view class="left">
					{{ i18n.xhqb }}
				</view>
			</view>

		</view>
		<view v-show="withdrawalType === 1">
			<u-cell-group :border="false">
				<u-cell-item :title="$t('payment').xm" @click="bankFn()" :value="userInfo.bankUserName"></u-cell-item>
				<u-cell-item :arrow="true" @click="bankFn()" :title="$t('fack').yhk" :value="userInfo.bankCard"></u-cell-item>
				<u-cell-item :arrow="true" @click="bankFn()" :title="$t('payment').khh" :value="userInfo.bankName"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="recharge-addre">
			<view v-if="code === 1">
				<view class="title">
					{{ i18n.czsl }}
				</view>
				<view class="quantity-box">
					<input type="number" v-model="num" placeholder-style="color: #9399A2;background: #F6F6F6"
						class="search-input" :placeholder="i18n.qsrczsl" />
				</view>

				<view class="re-upload">
					<u-upload :upload-text="i18n.xuanzhetupian" max-count="1" @on-success="onSus" :action="action" :file-list="fileList" :header="header">
					</u-upload>
					<view class="">
						{{ i18n.scczpz }}
					</view>
				</view>
			</view>
			<view v-else>
				<view v-show="withdrawalType === 0">
					<view class="title">
						{{ i18n.tixiandizhi }}
					</view>
					<view class="quantity-box" @click="tbdz()">
						<input :disabled="true" v-model="address" placeholder-style="color: #9399A2;background: #F6F6F6"
							class="search-input" :placeholder="i18n.qxztxdz" />
					</view>
					
				</view>
				
				<view class="title">
					{{ i18n.txsl }}
				</view>
				<view class="quantity-box">
					<input @input="inputChange" v-model="num" placeholder-style="color: #9399A2;background: #F6F6F6"
						class="search-input" :placeholder="i18n.qsrtxsl" />
				</view>
				<view class="title" style="display: flex;justify-content: space-between;align-items: center;">
				{{ $t('transaction').ky }}:{{ kyPrice | SubString(5) }}{{item.currency}} 
				<view>{{ $t('delivery').shouxufei }}:{{ actuals }}{{item.currency}}</view>
				</view>
               
			</view>
			<view class="btns">
				<u-button type="warning" @click="sub()">{{ i18n.tijiao }}</u-button>
			</view>
		</view>
		<xf-coupon :couponInfo="couponInfo" :couponTitle="item.currency" :is-show.sync="isShow" :active="active"
			:couponState="couponState" @onCouponChange="onCouponChange" @onRadioChange="onRadioChange"
			@getBillingAddressList="getBillingAddressList" />
		<fb-pass-popup :show-pup.sync="showPup" @addFn="addFn" />
		<u-popup :closeable="true" v-model="chaninCode" mode="bottom" border-radius="30" @close="chaninCode = false">
			<view class="chan-popup">
				<view class="tips">
					<view>
						<image src="../../static/image/fIattributes/23.png" />
					</view>
					{{ i18n.xztxfs }}
				</view>
				<view @click="selctCurrent(index)" class="item" v-for="(item, index) in list" :key="index">
					{{ item }}
				</view>
			</view>
		</u-popup>
		<verification-popup @getAdd="getAdd" :userInfo="userInfo" :showSpec.sync="verificationCode" />
	</view>
</template>

<script>
	import md5Libs from "uview-ui/libs/function/md5";
	export default {
		data() {
			return {
				verificationCode: false,
				chaninCode: false,
				showPup: false,
				couponInfo: [], // 地址数据
				isShow: false,
				active: 0,
				couponState: false, //是否存在地址
				address: '',
				num: '',
				img: "",
				action: uni.getStorageSync('imgPath') + '?member=' + uni.getStorageSync('userId'),
				fileList: [],
				header: {
					'token': uni.getStorageSync('token'),
					'userId': uni.getStorageSync('userId')
				},
				item: {},
				account: "",
				code: 1,
				radios: 0,
				withdrawalType: 0,
				userInfo: {},
				kyPrice: 0,
				actuals: 0, // 手续费
				commission: [], // 币种集合
			}
		},
		computed: {
			i18n() {
				return this.$t("recharge")
			},
			list() {
				return [ this.item.currency, this.$t('fack').yhk]
			}
		},
		onLoad(e) {
			if (e && e.item) {
				this.code = e.code === '1' ? 1 : 2
				let data = JSON.parse(e.item)
				this.$u.api.user.getRechargeWallet(data.type).then(res => {
					this.account = res.result[0].account;
				})
				this.item = data
				this.getBillingAddressList();
				
			}
			console.log(this.verificationCode)
		},
		onShow() {
			this.getUserInfo()
			this.getBalances()
			
		},
		methods: {
			getBalances() {
				let member = uni.getStorageSync("userId");
				this.$u.api.user.getBalanceList(member).then(res => {
					res.result.balances.forEach(item => {
						if (item.currency === this.item.currency) {
							this.kyPrice = item.assetsBalance
						}
					})
					this.getBList()
					
				})
			},
			//获取B的列表
			getBList() {
				const currery = 'UPDOWN'
				this.$u.api.common.getCurrencys(currery).then(res => {
					this.commission = res.result;
					if (this.item.currency === 'USDT') {
						this.actuals = 1
					}
				})
			},
			inputChange(e){
				console.log(e)
			  e.target.value = (e.target.value.match(/^\d*(\.?\d{0,5})/g)[0]) || null
			  this.$nextTick(() => {
					this.num = e.target.value
			  })
			  
			  if (this.item.currency !== 'USDT') {
				  for (let i = 0; i<this.commission.length;i++) {
					  if (this.commission[i].tokenCur === this.item.currency) {
					  		// this.actuals = this.$utils.SubString(this.num * (this.commission[i].withdrawFee/100), 5); 
						this.actuals = this.$utils.SubString(this.num * (this.commission[i].withdrawFee), 5); 	
					  }
				  }
			  }
			  
		  },
			// 验证码校验成功
			getAdd() {
				this.verificationCode = false
				this.handleFn()
			},
			getCopy(index) {
			    uni.setClipboardData({
			        data: index,
			        success:() => {
			            console.log('success');
			        }
			    })	
			},
			getUserInfo(){
				const member = uni.getStorageSync('userId')
				this.$u.api.user.getMember(member).then(res => {
					let data = res.result;
					this.userInfo = data
				})
			},
			// 选择银行卡还是USDT
			selctCurrent(index) {
				this.withdrawalType = index
				this.chaninCode = false
			},
			bankFn() {
			  uni.navigateTo({
			  	url: `/pages/payment/collection-list`
			  })	
			},
			// 输入交易密码之后
			addFn(val) {
				this.showPup = false
				let member = uni.getStorageSync('userId');
				let pwd = md5Libs.md5(val)
				this.$u.api.fack.verifyFundPassword(member, pwd).then(res => {
					if (res.status === "SUCCEED") {
						this.verificationCode = true
						// this.handleFn()
					} else {
						this.$utils.showToast(res.errorMessage)
					}
				})
			},
			tbdz() {
				this.isShow = true
			},
			getBillingAddressList() {
				let member = uni.getStorageSync('userId')
				this.$u.api.user.getBillingAddressList(member).then(res => {
					this.couponInfo = res.result.result
					this.couponState = res.result.result.length > 0 ? true : false
					if (this.couponInfo.length > 0) {
						this.address = `${this.couponInfo[0].currencyType}--${this.couponInfo[0].address}`
					}
				})
			},
			// 切换
			onCouponChange(e) {
				this.active = e;
			},
			onRadioChange(index) {
				this.isShow = false
				this.radios = index
				this.address = `${this.couponInfo[index].currencyType}--${this.couponInfo[index].address}`
				console.log(this.address)
			},
			getPath() {
				const temp = {
					1: 0,
					2: 1
				}
				uni.navigateTo({
					url: `/pages/recharge/recharge-record?code=${temp[this.code]}`
				})
			},
			back() {
				uni.navigateBack(1)
			},
			onSus(response, index, lists, name) {
				console.log("上传成功", response)
				this.img = response.name;
			},
			sub() {
				if (this.code === 1) {
					if (!this.num) {
						this.$utils.showToast(this.i18n.qsrczsl)
						return
					}
					if (!this.img) {
						this.$utils.showToast(this.i18n.scczpz)
						return
					}
					if (this.num != "" && this.img != "") {
						let data = new Object();
						data.amount = this.num;
						data.currency = this.item.currency;
						data.memberId = uni.getStorageSync("userId");
						data.chainName = "OMNI";
						data.paymentVoucher = this.img
						this.$u.api.user.rechargeCurrency(data).then(res => {
							if (res.status === "SUCCEED") {
								this.num = null;
								this.img = null;
								this.$utils.showToast(this.i18n.tjshcg)
								this.getPath()
							} else {
								this.$utils.showToast(res.errorMessage)
							}
						})
					}
				} else {
					if (!this.num) {
						this.$utils.showToast(this.i18n.qsrtxsl)
						return
					}
					if (this.withdrawalType === 0) {
						if (!this.address) {
							this.$utils.showToast(this.i18n.qxztxdz)
							return
						}
					} else {
						const {
							bankCard
						} = this.userInfo
						if (!bankCard) {
							this.$utils.showToast(this.i18n.qszskzh)
							return
						}
					}
					// this.verificationCode = true
					this.showPup = true;
				}

			},
			handleFn() {

				let data = new Object();
				data.balance = this.num;
				data.currency = this.item.currency;
				data.member = uni.getStorageSync("userId");
				data.type = this.withdrawalType === 0 ? 1: 2 ;
				data.baId = this.couponInfo[this.radios].id
				console.log("提币提交", data)
				this.$u.api.user.extractCoin(data).then(res => {
					if (res.status === "SUCCEED") {
						this.num = null;
						this.$utils.showToast(this.i18n.tjshcg)
						this.getPath()
					} else {
						this.$utils.showToast(res.errorMessage)
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.chan-popup {
			background: #fff;
			padding: 80rpx 24rpx;

			.item {
				padding: 36rpx 24rpx;
				background: #FAFAFA;
				border-radius: 6rpx;
				font-size: 32rpx;
				color: #1F222B;
				font-weight: 600;
				margin-bottom: 24rpx;
			}

			.tips {
				background: #FBF9EA;
				border-radius: 6rpx;
				padding: 24rpx;
				color: #D4B02D;
				font-size: 24rpx;
				display: flex;
				margin-bottom: 24rpx;

				view {
					width: 40rpx;
				}

				& image {
					width: 26rpx;
					height: 26rpx;
					margin-right: 14rpx;
				}
			}
		}

		.re-upload {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 40rpx;
		}

		.recharge-addre {
			padding: 0 20rpx;
			margin-top: 40rpx;

			.btns {
				padding: 40rpx 0;
			}

			.quantity-box {
				background: #F6F6F6;
				border-radius: 6rpx;
				padding: 20rpx 24rpx;

				.search-input {
					width: 620rpx;
					// height: rpx;
					// line-height: 62rpx;
					font-size: 28rpx;
					color: #9399A2;
					-webkit-touch-callout: none;
					-webkit-user-select: none;
				}

			}

			.tip1 {
				color: #E45360;
				font-size: 22rpx;
			}

			.title {
				color: #8D9099;
				font-size: 28rpx;
				margin-bottom: 10rpx;

				& image {
					width: 26rpx;
					height: 26rpx;
					margin-left: 14rpx;
				}
			}

			.num {
				display: flex;
				align-items: center;

				.left {
					width: 90%;
					font-size: 30rpx;
					color: #1F222B;
					font-weight: bold;
					word-break: break-all;
				}

				.right {
					flex: 1;
					display: flex;
					justify-content: flex-end;

					& image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}

		.rech-line {
			width: 100%;
			height: 1rpx;
			background: #F4F4F4;
		}

		.f-head {
			margin: 56rpx 0 70rpx 24rpx;

			.icon_1 {
				width: 34rpx;
				height: 28rpx;
			}

			.right {
				& image {
					width: 44rpx;
					height: 44rpx;
					margin-right: 24rpx;
				}
			}
		}

		.re-title {
			margin: 0 0 65rpx 24rpx;
			font-size: 48rpx;
			color: #1F222B;
			font-weight: bold;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.right {
				background: #FBF9EC;
				color: #D4B02D;
				padding: 10rpx 24rpx 10rpx 16rpx;
				font-weight: 400;
				font-size: 24rpx;
				display: flex;
				align-items: center;
				border-radius: 8rpx 0 0 8rpx;

				& image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 10rpx;
				}
			}
		}

		.address-box {
			display: flex;
			flex-direction: column;
			align-items: center;

			.qr-code {
				width: 356rpx;
				height: 356rpx;
				background: #1F222B;
				margin-bottom: 32rpx;
			}

			.tips {
				font-size: 24rpx;
				color: #8D9099;

				&:last-child {
					padding-bottom: 48rpx;
					// border-bottom: 1rpx solid #F4F4F4;
				}

			}
		}

	}
</style>
