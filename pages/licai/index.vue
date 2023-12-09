<template>
	<view class="container">
		<heder-box :title="i18n.jjlc" />
		<view class="f-m-24">
			<view class="wallet-name">
				<view>{{ i18n.co }}</view>
				<view>{{ i18n.xhqb }}
					<!-- <image src="/static/image/recharge/3.png"> -->
				</view>
			</view>

				
				<view class="text-grey font-31">{{i18n.tgje}}(USDT)</view>
			
			<view style="font-size: 1.525rem;margin-top: 0.65rem;">0</view>
			
			<view class="exchange-input2">
			
			<view>
			<view class="text-grey font-30">
			{{i18n.yjrsy}}(USDT)
			</view>
			<view>0</view>
			</view>

			<view>
			<view class="text-grey font-30">{{i18n.ljsy}}(USDT)</view>
			<view>0</view>
			</view>
			
			<view>
			<view class="text-grey font-30">{{i18n.tgdd}}(USDT)</view>
			<view>0</view>
			</view>
			</view>
			
			<view class="exchange-input2">
			<button class="btntg">{{i18n.tgdd}}</button>
			<button @click="$router.push('/pages/licai/guize')" class="btngz">{{i18n.gz}}</button>
			</view>
			
			<view class="exchange-input">
				<view class="rsyl">{{i18n.rsyl}}
				<span>0.5 ~ 0.5%</span>
				</view>
				<view class="items-center">
					<img style="height: 4.125rem;width: 4.5rem;margin-right: 1.25rem;" class="img" src='../../static/image/licai/ddd.png'/>
					<view class="items-start">
					<span style="color: #333;font-size: 0.7875rem;font-weight: 600;
}">{{i18n.lc}}x{{i18n.t}}</span>
					<span style="font-size: 0.625rem;margin-top: 0.5rem;margin-bottom: 1rem;">{{i18n.xe + ' '}}10000~999999USDT</span>
					<span style="font-size: 0.625rem">{{i18n.zq}}x{{i18n.t}}</span>
					</view>
					
					<button class="btnmr">{{i18n.ljmr}}</button>
				</view>
			</view>
			<view style="margin-top: 30%;">
				
			</view>
		</view>
	</view>
</template>

<script>
	import th from '../../common/locales/th';
	import hederBox from "./components/heder-box.vue"
	export default {
		components: {
			hederBox
		},
		data() {
			return {
				leftCode: 0,
				rightCode: 0,
				leftNum: '',
				rightNum: '',
				letImgCode: false,
				rightImgCode: false,
				leftCurrency: 'USDT',
				rightCurrency: 'BTC',
				rfItem: {},
				lfItem: {},
				tokenCurlist: [],
				nowAmount: 0.00,
				pairs: [],
				rate: 0.00,
				switchCode: false
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getPairsList();
			this.getBalances();
		},
		computed: {
            i18n() {
            	return this.$t("jijinlicai")
            }
		},

		methods: {
			// ת��
			getClick() {
				this.switchCode = !this.switchCode 
				const res = this.lfItem
				this.lfItem = this.rfItem
				this.rfItem = res
				this.selCurrency(this.lfItem, 0)
				this.selRightCurrency(this.rfItem, 0)
				this.leftNum = ''
				this.rightNum = ''
			},
			//����
			getPairsList() {
				let member = uni.getStorageSync('userId')
				this.$u.api.sd.getIndexCoin(member).then(res => {
					console.log("����", res)
					this.tokenCurlist = res.result;
					
					res.result.map(item => {
						if (item.tokenCur === this.rightCurrency) {
							this.rfItem = item;
						}
						if (item.tokenCur === this.leftCurrency) {
							this.lfItem = item;
						}
					})
					this.calExc();
					this.tokenCurlist = this.tokenCurlist.filter(item => item.tokenCur === 'USDT' || item.tokenCur === 'ETH' || item.tokenCur === 'BTC') || []
				})
			},
			//Ǯ��
			getBalances() {
				let member = uni.getStorageSync('userId')
				this.$u.api.user.getBalanceList(member).then(res => {
					this.pairs = res.result.balances
					res.result.balances.map(item => {
						if (item.currency === this.leftCurrency) {
							this.nowAmount = item.assetsBalance;
						}
					})
				})
			},
			//�������
			calExc() {
				let leftMoney = 0
				let rightMoney = 0
				this.tokenCurlist.map(item => {
					if (item.tokenCur === this.leftCurrency) {
						leftMoney = item.price;
					}
					if (item.tokenCur === this.rightCurrency) {
						rightMoney = item.price;
					}
				})
				this.rate = (leftMoney / rightMoney).toFixed(8)
			},
			// ����� 
			selCurrency(item, index) {
				this.leftCode = index
				this.leftCurrency = item.tokenCur
				this.letImgCode = false
				this.lfItem = item;
				this.pairs.map(doc => {
					if (doc.currency === this.leftCurrency) {
						this.nowAmount = doc.assetsBalance;
					}
				})
				this.calExc();
				if(this.nowAmount != 0 && this.rightNum != ""){
					this.rightNum = this.$utils.SubString(this.leftNum * this.rate, 4)
				}
			},
			// �����
			selRightCurrency(item, index) {
				this.rightCode = index
				this.rightImgCode = false
				this.rightCurrency = item.tokenCur
				this.rfItem = item
				this.calExc();
				if(this.nowAmount != 0 && this.rightNum != ""){
					this.rightNum = this.$utils.SubString(this.leftNum * this.rate, 4)
				}
			},
			// �޼� ��������
			checkNum() {
				console.log(this.rate)
				this.rightNum = this.$utils.SubString(this.leftNum * this.rate, 4)
				this.$nextTick(() => {
					let val = this.leftNum;
					val = val.replace(/[^\d.]/g, ""); //���"����"��"."������ַ�
					val = val.replace(/\.{2,}/g, "."); //ֻ������һ��. ��������
					val = val.replace(/^0+\./g, '0.');
					val = val.match(/^0+[1-9]+/) ? val = val.replace(/^0+/g, '') : val
					val = (val.match(/^\d*(\.?\d{0,4})/g)[0]) || ''
					this.leftNum = val;
				});
			},
			// �޼� ��������
			checkNum1() {

				this.$nextTick(() => {
					let val = this.rightNum;
					val = val.replace(/[^\d.]/g, ""); //���"����"��"."������ַ�
					val = val.replace(/\.{2,}/g, "."); //ֻ������һ��. ��������
					val = val.replace(/^0+\./g, '0.');
					val = val.match(/^0+[1-9]+/) ? val = val.replace(/^0+/g, '') : val
					val = (val.match(/^\d*(\.?\d{0,4})/g)[0]) || ''
					this.rightNum = val;
				});
			},
			toMax() {
				console.log("���")
				if (this.nowAmount === 0) {
					return
				}
				this.leftNum = this.$utils.SubString(this.nowAmount, 5);
				this.rightNum = this.$utils.SubString(this.nowAmount * this.rate, 5)
			},
			excSub() {
				if (!this.leftNum) {
					this.$utils.showToast(this.i18n.qsrdhje)
					return
				}
				let obj = new Object();
				obj.member = uni.getStorageSync('userId');
				obj.currency = this.leftCurrency;
				obj.currencyTarget = this.rightCurrency;
				obj.quantity = this.leftNum
				this.$u.api.sd.currencyExchange(obj).then(res => {
					if (res.status === 'SUCCEED') {
						this.leftNum = "";
						this.rightNum = "";
						uni.navigateTo({
							url: `/pages/recharge/recharge-record?code=3`
						})
						this.$utils.showToast(this.i18n.dhcg)
					} else {
						this.$utils.showToast(res.errorMessage)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.items-center{
		align-items: center;
		justify-content: center;
		display: flex;
	}
	
	.rsyl{
		border-radius: 0 0 .5rem .5rem;
		font-size: 0.625rem;
		top: 0;
		left: 0.575rem;
		color: #fff;
		background: #2ebd85;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: .5rem;
		padding-bottom: .5rem;
		position: absolute;
	}
	
	.items-start{
		align-items: flex-start;
		flex-direction: column;
		display: flex;
	}
	
	.btntg{
		width: 10.125rem;
		font-size: 0.8875rem;
		border-radius: .2rem;
		line-height: 2.0875rem;
		height: 2.0875rem;
	    margin-right: 1.25rem;
	    text-align: center;
		color: #fff;
		background: #2c78f8;
		border-color: #2c78f8;
		box-sizing: border-box;
		justify-content: space-between;
	}
	.btnmr{
			width: 5.125rem;
			font-size: 0.5875rem;
			border-radius: .2rem;
			line-height: 2.0875rem;
			height: 2rem;
			margin-right: 1.25rem;
			text-align: center;
			color: #fff;
			background: #2c78f8;
			border-color: #2c78f8;
			box-sizing: border-box;
			justify-content: space-between;
	}
	.btngz{
		width: 10.125rem;
		font-size: 0.8875rem;
		border-radius: .0rem;
		line-height: 2.0875rem;
		height: 2.0875rem;
		margin-right: 1.25rem;
		text-align: center;
		background: #f3f3f3;
		box-sizing: border-box;
		
	}
	.text-grey {
	    color: #868c9a;
	}
	.font-31 {
	    font-size: 0.775rem;
	}
	.font-30 {
	    font-size: 0.375rem;
	}
	.container {
		.f-m-24 {
			margin: 0 24rpx;
		}

		.transformation-box {
			display: flex;
			align-items: center;
			justify-content: center;

			view {
				width: 62rpx;
				height: 62rpx;
				margin: 50rpx 0;
				background: #F6F6F6;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				.f-rotate {
					transform: rotate(-90deg);
				}

				& image {
					transition: all 0.3s;
					width: 25rpx;
					height: 29rpx;
					transform: rotate(90deg);
					// transform-origin: center center;

				}
			}



		}

		.r-icon1 {
			transform: rotate(180deg);
			transform-origin: center center;
		}

		.tips {
			color: #8A8A93;
			font-size: 24rpx;
		}

		.exchange-input {
			padding: 0.5rem 1rem 1rem 0.5rem;
			margin-bottom: 2rem;
			border: 1px solid #f3f3f3;
			background: #f6f6f6;
		    // border-radius: .5rem;
			position: relative;
			align-items: center;
			justify-content: space-between;
			display: flex;
			height: 200px;
		}
		
		.exchange-input2{
			font-size: 1.125rem;
			line-height: 2rem;
			// margin-top: 0.75rem;
			margin-bottom: 2.1875rem;
		    justify-content: space-between;
		    display: flex;
		}
		
		.wallet-name {
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #9A9CA9;
			font-size: 28rpx;

			& image {
				width: 29rpx;
				height: 25rpx;
				margin-left: 12rpx;
			}
		}
	}
</style>
