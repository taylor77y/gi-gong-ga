<template>
	<view class="fb-cont">
		
		<u-popup class="popup-bg" :closeable="true" border-radius="20"  v-model="code" @close="close">
			<view class="popup-box">
				<view class="title">
					{{currentDta.ckType}}/{{currentDta.ckName}}
				</view>
				
				<view class='fb-circle ' :class="currentDta.isWin === 1 ? 'fbcolor1':'fbcolor2'">
					{{ i18n.ykje }}{{ currentDta.isWin === 1 ? '+':'-'}}{{ currentDta.profit }} USDT
				</view>
				<u-row class="hei22 linehei22">
					<u-col span="6" class="c999" >{{ i18n.jsj }}：</u-col>
					<u-col span="6" class="c333 a_right" >
						{{ currentDta.finishsAmount }}
					</u-col>
				</u-row>
				<u-row class="hei22 linehei22">
					<u-col span="6" class="c999" >{{ i18n.fx }}：</u-col>
					<u-col span="6" class="c333 a_right" >
						<u-tag size="mini" :text="currentDta.buyStatus === 1 ? i18n.zhang:i18n.die" :type="currentDta.buyStatus === 1 ? 'primary':'error'">
						</u-tag>
						
					</u-col>
				</u-row>
				<u-row class="hei22 linehei22">
					<u-col span="6" class="c999" >{{ i18n.xzje }}：</u-col>
					<u-col span="6" class="c333 a_right" >
						{{ currentDta.amount }}
					</u-col>
				</u-row>
				<u-row class="hei22 linehei22">
					<u-col span="6" class="c999" >{{ i18n.jiaogeshijian }}：</u-col>
					<u-col span="6" class="c333 a_right" >
						{{ currentDta.seconds }}{{ currentDta.secondsTime }}
					</u-col>
				</u-row>
				<view class="btn-box">
                  <view class="btn1" @click="close">
					  {{ $t('fack').qx }}
				  </view>
				  <view class="btn2" @click="close">
					  {{ i18n.jxxd }}
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
			currentDta: {
				type: Object,
				default: {}
			},
			
		},
		data() {
		    return {
				code: false,
				
			}	
		},
		watch: {
		   	showPup(val) {
				this.code = val
			},
			
		},
		created() {
			
		},
		computed: {
			i18n() {
				return this.$t("delivery")
			}
		},
		methods: {
			
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
	}
	.hei22 {
		height: 44rpx;
	}
	.linehei22 {
		line-height: 44rpx;
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