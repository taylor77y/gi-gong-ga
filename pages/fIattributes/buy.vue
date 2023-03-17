<template>
	<view class="container">
		<view class="f-head">
			<image @click="back()" class="icon_1" referrerpolicy="no-referrer"
				src="/static/lanhu_querenmima/ps2495rpr92seqakcpyfbbjuasmb353tg5d13ee66-88f7-4c8e-80de-307ef55cf92f.png" />
			<view class="right">
				{{ sellingCode ? i18n.cs:i18n.gm  }}USDT
			</view>
		</view>
		<view class="oth-box">
			<view class="unit-price">
				{{i18n.dj}} <text :class="{'text2': sellingCode}">{{item.nowPrice * cur.rate}}{{cur.currencyName}}</text>
			</view>
			<view class="unit-price">
				{{i18n.xe}}  <text class="text1">{{item.minPrice * cur.rate}} - {{item.num * cur.rate}} {{cur.currencyName}}</text>
			</view>
			<view class="sell-box">
				<u-tabs bg-color="#fff" inactive-color="#8D9099" bar-height="8" bar-width="40" active-color="#D4B02D"
					:list="concurrency" :is-scroll="false" :current="current" @change="change"></u-tabs>
				<view class="f-line"></view>
				<view class="f-margin-24">
					<view class="f-entry" v-if="current === 0">
						<view class="left">

							<text>{{cur.currencyName}}</text>
							<input class="f-input-money" v-model="money"
								placeholder-style="color: #B0B3BA;font-size: 42rpx;font-weight: 500;"
								:placeholder="i18n.qsrje" />

						</view>
						<view class="right">
							<view class="" @click="quanbu()">{{i18n.qb}}</view>
						</view>
					</view>
					<view class="f-entry" v-if="current === 1">
						<view class="left">
							<input class="f-input-money" v-model="money"
								placeholder-style="color: #B0B3BA;font-size: 42rpx;font-weight: 500;"
								:placeholder="i18n.qsrsl" />

						</view>
						<view class="right">
							<view class="symbol-box" v-if="!sellingCode"></view>
							<view class="" @click="quanbu()">{{i18n.qb}}</view>
						</view>
					</view>
					<view class="sale-box">
						<view class="min" v-if="sellingCode && current === 0">{{i18n.zxje}} 200000</view>
						<view v-if="sellingCode">{{i18n.yed}} 200000</view>
					</view>
					<view class="total-box">
						<view class="d-flex-between-center">
							<view>{{i18n.sl}}</view>
							<view class="right">
								{{item.num}}
							</view>
						</view>
						<view class="d-flex-between-center">
							<view>{{i18n.ze}}</view>
							<view class="right">
								{{item.num}}
							</view>
						</view>
					</view>
					<view @click="goPath()" class="btn-sell" :class="{'f-bg': sellingCode}">
						{{ sellingCode ? i18n.cs:i18n.gm  }}USDT
					</view>
				<!-- 	<view class="tips">
						本次交易将受 T+1 提币限制。
					</view> -->
				</view>

			</view>
			<view class="clause-box">
				<image src="../../static/image/fIattributes/23.png"></image>
				{{i18n.jyzxydsc}}
			</view>
			<view class="transaction-box">
				<view class="title">
					{{i18n.jyxx}}
				</view>
	<!-- 			<view class="f-time">
					<view class="left">
						付款时限
					</view>
					<view class="right">
						15分钟
					</view>
				</view> -->
				<view class="f-time">
					<view class="left">
						{{i18n.sjnc}}
					</view>
					<view class="right">
						{{item.memberFbName}}
					</view>
				</view>
				<view class="f-time">
					<view class="left">
						{{i18n.jyfs}}
					</view>
					<view class="right">
						{{item.direction == 'SELL'?i18n.sjcs:i18n.sjsg}}
					</view>
				</view>
			</view>
			<!-- <view class="f-line"></view> -->
			<!-- <view class="transaction-box">
				<view class="title">
					交易条款
				</view>
				<view class="tps">
					截图银行卡近三天流水务必实名付款
				</view>
			</view> -->
		</view>
		<fb-pass-popup :show-pup.sync="showPup" @addFn="addFn" />
	</view>
</template>

<script>
	import md5Libs from "uview-ui/libs/function/md5";
import { currencys } from "../setting/data";
	export default {
		data() {
			return {
				showPup: false,
				money: '',
				current: 0,
				sellingCode: false, // 买卖
				item: {},
				type: "PRICE",
				cur:{}
			}
		},
		onLoad(e) {
			if (e && e.code) {
				this.sellingCode = e.code === 'false' ? false : true
				this.item = JSON.parse(e.item)
				this.cur = JSON.parse(e.cur)
			}
		},
		computed: {
			i18n() {
				return this.$t("fack");
			},
			concurrency() {
				return [{
						name: `${this.i18n.ajegm}${this.sellingCode === false ? this.i18n.gm:this.i18n.cs}`
					},
					{
						name: `${this.i18n.aslgm}${this.sellingCode === false ? this.i18n.gm:this.i18n.cs}`
					}
				]
			},
		},
		methods: {
			// 输入交易密码之后
			addFn(val) {
				this.showPup = false
				let member = uni.getStorageSync('userId');
				let pwd = md5Libs.md5(val)
				this.$u.api.fack.verifyFundPassword(member,pwd).then(res=>{
					if (res.status === "SUCCEED") {
						this.handleFn()
					} else{
						this.$utils.showToast(res.errorMessage)
					}
				})
			},
			goPath() {
				if (this.money != '') {
					if (this.sellingCode) {
						this.showPup = true
						return
					}
					this.handleFn()
				}
			},
			handleFn() {
			    let obj = new Object();
			    obj.type = this.type;
			    obj.userId = uni.getStorageSync("userId");
			    obj.orderId = this.item.id;
			    obj.mccId = this.item.mchId;
			    obj.num = this.money;
			    
			    this.$u.throttle(async () => {
			    this.$u.api.fack.placeAnOrder(obj).then(res => {
			    	console.log("返回结果", res)
			    	if (res.status === "SUCCEED") {
			    		this.money = "";
						this.$utils.showToast(this.i18n.czcgo)
			    		uni.navigateTo({
			    			url: `/pages/fIattributes/place-order?order=` + res.result.orderPriceId
			    		})
			    	} else {
			    		this.$utils.showToast(res.errorMessage)
			    	}
			    })
			    }, 3000)	
			},
			change(e) {
				this.current = e
				this.money = ''
				switch (e) {
					case 0:
						this.type = "PRICE";
						break;
					case 1:
						this.type = "NUM";
						break;
				}
			},
			back() {
				uni.navigateBack(1)
			},
			quanbu() {
				if(this.current === 0){
					this.money = this.item.num * this.cur.rate
				}else{
					this.money = this.item.num
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.sale-box {
			margin: 30rpx 0;
			font-size: 26rpx;
			color: #8D9099;

			.min {
				color: #B1475B;
				margin-bottom: 8rpx;
			}
		}

		.f-bg {
			background: #E45360 !important;
		}

		.f-line {
			width: 100%;
			height: 2rpx;
			background: #EBEBEB;
		}

		.transaction-box {
			margin-top: 30rpx;

			& :last-child {
				border: none;
			}

			.tps {
				font-size: 28rpx;
				color: #8D9099;
			}

			.title {
				color: #1F222B;
				font-size: 34rpx;
				font-weight: 500;
				margin-bottom: 30rpx;
			}

			.f-time {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 30rpx;
				color: #8D9099;
				font-size: 30rpx;

				.right {
					color: #000;
				}
			}

		}

		.clause-box {
			background: #FCFAED;
			border-radius: 10rpx 10rpx 0 0;
			display: flex;
			align-items: center;
			padding: 24rpx;
			color: #D4B02D;
			font-size: 24rpx;

			& image {
				width: 26rpx;
				height: 26rpx;
				margin-right: 14rpx;
			}
		}

		.f-margin-24 {
			margin: 0 24rpx;
		}

		.btn-sell {
			width: 100%;
			height: 86rpx;
			color: #fff;
			font-size: 32rpx;
			font-family: 600;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #5EBA89;
			border-radius: 8rpx;
			margin: 30rpx 0 20rpx 0;
		}

		.tips {
			color: #8D9099;
			font-size: 24rpx;
			padding-bottom: 20rpx;
		}

		.f-head {
			margin: 56rpx 0 70rpx 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			.icon_1 {
				width: 34rpx;
				height: 28rpx;
				position: absolute;
				left: 0;

			}

			.right {
				font-size: 36rpx;
				color: #1F222B;
				font-weight: 500;
			}
		}

		.oth-box {
			margin: 0 24rpx;

			.unit-price {
				color: #8D9099;
				font-size: 26rpx;
				margin-bottom: 6rpx;

				text {
					color: #5EBA89;
					margin-left: 14rpx;
				}

				.text1 {
					color: #1F222B;
				}

				.text2 {
					color: #E45360;
				}
			}

			.sell-box {
				margin: 30rpx 0;
				background: #fff;
				border-radius: 10rpx;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

				.f-line {
					width: 100%;
					height: 2rpx;
					background: #EBEBEB;
				}

				.f-entry {
					margin: 30rpx 0;
					background: #FAFAFA;
					border-radius: 10rpx;
					padding: 30rpx 24rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.left {
						display: flex;
						align-items: center;
						color: #1F222B;
						width: 70%;

						text {
							font-size: 42rpx;
							font-weight: 500;
							margin-right: 20rpx;
						}

						.f-input-money {
							font-size: 42rpx;
							font-weight: 500;
							color: #1F222B;
						}
					}

					.right {
						color: #D4B02D;
						font-size: 32rpx;
						display: flex;
						align-items: center;

						.symbol-box {
							color: #B0B3BA;
							font-family: 500;
							margin-right: 24rpx;
						}
					}
				}

				.total-box {
					color: #8D9099;
					font-size: 26rpx;

					.right {
						color: #1F222B;
					}
				}
			}
		}


	}
</style>
