<template>
	<view class="fb-cont">
		
		<u-popup class="popup-bg" :closeable="true" border-radius="20"  v-model="code" @close="close">
			<view class="popup-box">
				<view class="title">
					{{ curCode ? $t('entrust').zhixsun:$t('entrust').zhiyin }}
				</view>
				<u-row >
					<u-col span="6" class="c999" >{{ curCode ? $t('entrust').zhixsun:$t('entrust').zhiyin }}{{ i18n.cfjg }}：</u-col>
					<u-col span="6" class="c333 a_right" >
						<view class="stop-input">
							<input type="number" :placeholder="curCode ? $t('entrust').zhixsun:$t('entrust').zhiyin" v-model="stop"
								placeholder-style="background: #F6F6F6;color: #B0B3BA;" class="f-input" />
						</view>
					</u-col>
				</u-row>
				<u-row class="hei22 linehei22">
					<u-col span="6" class="c999" >{{ i18n.dqjg }}：</u-col>
					<u-col span="6" class="c333 a_right" >
						{{ money }}
					</u-col>
				</u-row>
				<view class="btn-box">
                  <view class="btn1" @click="close">
					  {{ $t('fack').qx }}
				  </view>
				  <view class="btn2" @click="getAdd()">
					  {{ $t('fack').qr }}
				  </view>
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
			curCode: {
				type: Boolean,
				default: false
			},
			money: {
				type: [String, Number],
				default: 0
			}
			
		},
		data() {
		    return {
				code: false,
				stop: ''
			}	
		},
		watch: {
		   	showPup(val) {
				console.log(val)
				this.code = val
				this.stop = ''
			},
			
		},
		created() {
			
		},
		computed: {
			i18n() {
				return this.$t("financial")
			}
			
		},
		methods: {
			getAdd() {
				this.$emit('getAdd', this.stop)
			},
			close() {
				this.$emit('update:showPup',false)
			}
			
		}
	}
	
</script>

<style lang="scss" scoped>
	.c999 {
		color: #999;
	}
	.c333 {
		color: #333;
		font-weight: 600;
	}
	.stop-input {
		padding: 20rpx;
		background: #F6F6F6;
	}
	.hei22 {
		height: 88rpx;
	}
	.linehei22 {
		line-height: 88rpx;
	}
	.f000 {
		color: #000 !important;
	}
	.fb-cont {
		.fbcolor1 {
			color: #38BB96;
		}
		.fbcolor2 {
			color: #E8054C;
		}
		.popup-bg {
			
			.popup-box {
				border-radius: 20rpx;
				padding: 24rpx 50rpx;
				
				border: 1px solid #707070;
				width: 650rpx;
				.title {
					padding-bottom: 34rpx;
					font-size: 36rpx;
					color: #000;
					border-bottom: 1px solid #CCCCCC;
					
					text-align: center;
					margin-bottom: 40rpx;
				}
				.fb-circle {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.btn-box {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 32rpx;
					padding-top: 20rpx;
					.btn1 {
						width: 30%;
						border-radius: 10rpx;
						color: #fff;
						padding: 20rpx;
						margin-right: 2%;
						background: #a4acb9;
						text-align: center;
					}
                   .btn2 {
					   width: 68%;
					   background: #F5D55A;
					   border-radius: 10rpx;
					   color: #000;
					   text-align: center;
					   padding: 20rpx;
					   
					   white-space:nowrap;
					   text-overflow:ellipsis;
					   overflow:hidden;
				   }
				}
				
				
			}
		}
		
	}
</style>