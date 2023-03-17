<template>
	<view class="fb-cont">
		
		<u-popup class="popup-bg" :closeable="true" border-radius="20"  v-model="code" @close="close">
			<view class="popup-box">
				<view class="title">
					{{ i18n.ddqr }}
				</view>
				<view class="xx-box">
					<view class="f-10">
					  <view class="f-left">
						  {{ i18n.mc }} <span>{{currentDta.pairsName}}</span>
					  </view>
					  <view>
						  
						  {{ i18n.fx }}<span>{{ isKaiduo ? i18n.maiduo:i18n.maikon }}</span>
					  </view>
					 
					</view>
					<view>
					  <view>
						  {{ i18n.xianjia }} <span>{{currentDta.price| SubStringZreo(4)}}</span>
					  </view>
					  
					 
					</view>
				</view>
				<view class="time-box">
					<view class="title">
						{{ i18n.jiaogeshijian }}
					</view>
					<view class="item-box">
						<view class="item" v-for="(item, index) in listInfo" :key="index" @click="getTime(index)">
							<view class="left">{{ item.seconds }}{{ item.secondsTime }}</view>
							<view class="right">
								{{ item.odds }}%
								<view class="r-icon" v-show="btncode === index">
									<u-icon color="#ee0a24" name="checkmark" />
								</view>
								
							</view>
						</view>
					</view>
				</view>
				<view class="f-flex" @click="getShow">
					<u-icon size="26" color="#707070" :name="!iconCode ? 'arrow-down':'arrow-up'" />
				</view>
				<view class="f-input">
					<!-- placeholder="'最低金额' + minMoney" -->
					<input placeholder-style="color: #B0B3BA;background:  #F6F6F6" :placeholder="i18n.zuidijine + minMoney" type="number"  class="marketCount" v-model="money" />
					<view class="right">USDT</view>
				</view>
				<view class="f-span">
					<view>{{ i18n.keyongjine }}：
					{{usdtPrice | SubStringZreo(4)}}
					</view>
					<!-- <view>{{ i18n.shouxufei }}：0%</view> -->
				</view>
				<view class="f-btn" @click="handleOrder">
					{{ i18n.querenxiadan }}
				</view>
			</view>
			
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
		    showPup: {
		        type: Boolean,
		        default: false
		    },
			currentDta: {
				type: Object,
				default: {}
			},
			usdtPrice: {
				type: [String, Number],
				default: 0
			},
			isKaiduo: {
				type: Boolean,
				default: false
			},
			list: {
				type: Array,
				default: []
			}
		},
		data() {
		    return {
				minMoney: 0,
				money: '',
				code: false,
				btncode: null,
				listInfo: this.list,
				iconCode: false
				
			}	
		},
		watch: {
		   	showPup(val) {
				this.code = val
				this.btncode = null
				this.money = ''
				this.minMoney = 0
			},
			currentDta(val) {
				console.log(val)
			},
			list(val) {
				console.log(val)
				this.listInfo = val
			}
		},
		computed: {	
			i18n() {
				return this.$t("delivery")
			}
		},
		methods: {
			getShow() {
				this.iconCode = false
				const time = JSON.parse(uni.getStorageSync('listTime')) || []
				if (this.listInfo.length === time.length) {
					this.listInfo = time.filter((item, key) => key < 2 )
				} else {
					this.iconCode = true
					this.listInfo = time
				}
				
				
			},
			getTime(index) {
				const time = JSON.parse(uni.getStorageSync('listTime')) || []
				this.btncode = index
			    this.minMoney = time[index].minimum || 0
			},
			close() {
				this.$emit('update:showPup',false)
			},
			handleOrder() {
				const { money, btncode, minMoney } = this
				if (btncode === null) {
					this.$utils.showToast(this.i18n.qxzjgsj)
					return
				}
				if(!money) {
					this.$utils.showToast(this.i18n.qsrjg)
					return
				}
				if (parseInt(money) < minMoney) {
					this.$utils.showToast(`${this.i18n.zuidijine}${minMoney}`)
					return
				}
				this.$emit('handleOrder', money, btncode)
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.fb-cont {
		
		.popup-bg {
			// border-radius: 20rpx;
			.popup-box {
				border-radius: 20rpx;
				padding: 24rpx 50rpx;
				
				border: 2rpx solid #707070;
				width: 650rpx;
				.title {
					padding-bottom: 34rpx;
					font-size: 36rpx;
					color: #000;
					border-bottom: 2rpx solid #CCCCCC;
					
					text-align: center;
					
				}
				.xx-box {
					background: #EBECF0;
					margin: 40rpx 0;
					padding: 22rpx;
					border-radius: 10rpx;
					font-size: 26rpx;
					color: #b0b3ba;
					.f-10 {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 16rpx;
						.f-left {
							display: flex;
							align-items: center;
							
						}
					}
					span {
						color: #F15359;
						font-size: 28rpx;
						margin-left: 16rpx;
					}
				}
			}
			.time-box {
				.title {
					font-size: 28rpx;
					color: #000;
					margin-bottom: 14rpx;
				}
				.item-box {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					width: 100%;
					
					.item {
						margin-bottom: 24rpx;
						width: 48%;
						
						max-width: 304rpx;
						display: flex;
						align-items: center;
						height: 72rpx;
						line-height: 72rpx;
						.left {
							background: #F5D45C;
							color: #000;
							font-size: 36rpx;
							width: 224rpx;
							text-align: center;
							border-radius: 10rpx 0 0 10rpx;
						}
						.right {
							position: relative;
							background: #ECECEE;
							color: #8d9099;
							font-size: 28rpx;
							padding: 0 20rpx;
							border-radius:0 10rpx 10rpx 0;
							.r-icon {
								position: absolute;
								
								right: 4%;
								top: 40%;
							}
						}
					}
				}
			}
			.f-flex {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 20rpx;
			}
			.f-input {
				position: relative;
				background: #F6F6F6;
				border-radius: 6rpx;
				.marketCount {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 76rpx;
					border-radius: 10rpx;
					// border: 2rpx solid #707070;
					padding: 0 24rpx;
				}
				.right {
					position: absolute;
					color: #000;
					font-size: 28rpx;
					right: 5%;
					top: 27%;
				}
			}
			.f-span {
				padding: 20rpx 0;
				color: #000;
				font-size: 12px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.f-btn {
				text-align: center;
				height: 76rpx;
				line-height: 76rpx;
				border-radius: 20rpx;
				background: #F5D45C;
				color: #000;
				font-size: 32rpx;
				margin-top: 20rpx;
			}
		}
		
	}
</style>