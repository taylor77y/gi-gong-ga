<template>
	<view class="entrust-list" @click="getPath()">
		<view class="item" v-for="(item, index) in list" :key="index" @click="goDetails(item)">
			<view class="list-title" v-if="mode === 1">
				<view class="left" >
					<text>{{ item.ckType }}/{{item.ckName}}</text>
				</view>
				<view class="right" @click="xiangqing(item.id)">{{ i18n.ckxq }}</view>
			</view>
			<view class="list-title" v-if="mode === 2">
				<view class="left" :class="{'left1': item.entrustType === 'BUY'}">
					{{item.entrustType === 'SELL' ? $t('kLine').maichu:$t('kLine').mairu}}
					<text>{{item.pairsName}}</text>
				</view>
				<view class="right" v-if="state === 2 && isCheDan" @click="chedan(item)">
					{{ i18n.chedan }}
				</view>
				<view class="right" v-else>
				</view>
				
			</view>
			<view class="list-title" v-if="mode === 3">
				<view class="left" :class="{'left1': item.tradeType!='CLOSE_UP'}">
					{{item.tradeType=='CLOSE_UP' ? i18n.pd:i18n.dk}}
					<text></text> {{item.pairsName}}{{ i18n.yongxu }}{{item.leverNum | toFixed(2)}}X
				</view>
				<view class="right" v-if="state === 10 && state === 2" @click.stop="chedan(item)">
					{{ i18n.chedan }}
				</view>
				<view class="right" v-else>
				</view>
			</view>
			<view class="list-title" v-if="mode === 4">
				<view class="left" :class="{'left1': item.tradeType!='CLOSE_UP'}">
					{{item.tradeType=='CLOSE_UP' ? i18n.pd:i18n.dk}}
					<text></text> {{item.pairsName}}
				</view>
				<view class="right">
          <view class="right"  @click.stop="pingchang(item)">
            {{ i18n.pingchang }}
          </view>
        </view>
			</view>
			<view class="f-row" v-if="mode === 1">
				<view class="left">
					{{ i18n.ksjg }}
					<text>
						
					</text>
				</view>
				<view class="conta">
					{{ i18n.jsjg }}
				</view>
				<view class="right">
					{{ i18n.xzje }}
				</view>
			</view>
			<view class="f-row" v-if="mode === 2">
				<view class="left">
					{{ i18n.wtjg }}({{item.mainCur}})
					<text>
						
					</text>
				</view>
				<view class="conta">
					<!-- 价格(ETH) -->
				</view>
				<view class="right">
					<text v-if="item.priceType=='MARKET_PRICE'&&list.entrustType=='BUY'">{{i18n.jye+(item.tokenCur)}}</text>
					<text v-else>{{ i18n.wtl }}({{item.tokenCur}})</text>
				</view>
			</view>
			<view class="f-row" v-if="mode === 3">
				<view class="left">
					{{ i18n.cjsl }}
					<text>
					</text>
				</view>
				<view class="conta">
					
				</view>
				<view class="right">
					{{ i18n.cjjg }}
				</view>
			</view>
			<view class="f-row" v-if="mode === 4">
				<view class="left">
					{{ $t('newFy').cjjj }}
					<text>
					</text>
				</view>
<!--				<view class="conta">-->
<!--					{{ $t('newFy').wsxyk }}-->
<!--				</view>-->
        <view class="conta">
<!--          {{ $t('newFy').bzj }}-->
				</view>
				<view class="right">
					{{ $t('newFy').syl }}
				</view>
			</view>
			<view class="f-row f-000" v-if="mode === 1">
				<view class="left">
					{{item.startAmount}}
				</view>
				<view class="conta">
					{{item.finishsAmount}}
				</view>
				<view class="right">
					{{item.amount}}
				</view>
			</view>
			<view class="f-row f-000" v-if="mode === 2">
				<view class="left">
					{{item.priceType=='MARKET_PRICE' ? i18n.shijia:item.price}}
				</view>
				<view class="conta">
				</view>
				<view class="right">
					<text v-if="item.priceType=='MARKET_PRICE'&&list.entrustType=='BUY'">{{item.matchFee}}</text>
					<text v-else>{{item.count}}</text>
				</view>
			</view>
			<view class="f-row f-000" v-if="mode === 3">
				<view class="left">
					{{item.contractHands}}
				</view>
				<view class="conta">
					
				</view>
				<view class="right" v-if="item.matchPrice">
					{{item.matchPrice | toFixed(4)}}
				</view>
				<view class="right" v-else>
					----
				</view>
			</view>
			<view class="f-row f-000" v-if="mode === 4">
				<view class="left" :class="item.price>0?'c_green':'c_red'">
					{{ item.price|SubStringZreo(4) }}
				</view>
				<view class="conta" :class="item.unProfitLoss>0?'c_green':'c_red'">
<!--					{{item.unProfitLoss>0?'+':''}}{{item.unProfitLoss|SubStringZreo(4)}}-->
<!--          {{item.margin|SubStringZreo(4)}}-->
				</view>
<!--        收益率-->
				<view class="right" :class="item.profitUp>0?'c_green':'c_red'">
					{{item.profitUp }}
				</view>
			</view>
			<view class="f-row" v-if="mode === 3">
				<view class="left">
					{{ i18n.sxf }}
					<text>
					</text>
				</view>
				<view class="conta">
					
				</view>
				<view class="right">
					{{ i18n.fangshi }}
				</view>
			</view>
			<view class="f-row f-000" v-if="mode === 3">
				<view class="left">
					{{item.takeFee | toFixed(4)}}
				</view>
				<view class="conta">
				</view>
				<view class="right" v-if="item.priceType=='MARKET_PRICE'">
					{{  i18n.shijia }}
				</view>
				<view class="right" v-else>
					{{item.price | toFixed(4)}}
				</view>
			</view>
			<view class="f-row" v-if="mode === 4">
<!--				<view class="left">-->
<!--					{{ $t('newFy').ygqp }}-->
<!--					<text>-->
<!--					</text>-->
<!--				</view>-->
<!--				<view class="conta">-->
<!--					{{ $t('newFy').bzj }}-->
<!--				</view>-->
<!--				<view class="right">-->
<!--					{{ $t('newFy').ss }}-->
<!--				</view>-->
			</view>
			<view class="f-row f-000" v-if="mode === 4">
<!--				<view class="left">-->
<!--					{{item.forcePrice|toFixed(4)}}-->
<!--				</view>-->
				<view class="conta">
<!--					{{item.margin|SubStringZreo(4)}}-->
				</view>
				
<!--				<view class="right" >-->
<!--					{{item.hands}}-->
<!--				</view>-->
			</view>
			<view class="f-row" v-if="mode === 1">
				<view class="left">
					{{ i18n.mmzt }}
					<text>
					</text>
				</view>
				<view class="conta">
					{{ i18n.gmsj }}
				</view>
				<view class="right">
					{{ i18n.jgsj }}
				</view>
			</view>
			<view class="f-row" v-if="mode === 2">
				<view class="left">
					{{ i18n.chengjiaojunjia }}({{item.mainCur}})
					<text>
					</text>
				</view>
				<view class="conta">
				</view>
				<view class="right">
					{{ i18n.chenjiaoliang }}({{item.tokenCur}})
				</view>
			</view>
			<view class="f-row" v-if="mode === 3">
				<view class="left">
					{{ i18n.yingkui }}
					<text>
					</text>
				</view>
				<view class="conta">
				</view>
				<view class="right">
					{{ i18n.chengjiaoshijian }}
				</view>
			</view>
			<view class="f-row" v-if="mode === 4">
				<view class="left">
					<!-- 维持保证金率 -->
<!--					{{ $t('newFy').zyjg }}-->
          {{ i18n.chengjiaoshijian }}
					<text>
					</text>
				</view>
				<view class="conta">
          {{processedList(item) || '-'}}
				</view>
<!--				<view class="right">-->
<!--					{{ $t('newFy').zsjg }}-->
<!--				</view>-->
			</view>
			<view class="f-row f-000" v-if="mode === 4">
<!--				<view class="left">-->
<!--					{{item.triggerPrice|SubStringZreo(4)}}-->
<!--				</view>-->
				<view class="conta">
					<!-- {{item.hands}} -->
				</view>

<!--				<view class="right" >-->
<!--					{{item.ordPrice|SubStringZreo(4)}}-->
<!--				</view>-->
			</view>
			<view class="f-row f-000" v-if="mode === 1">
				<view class="left">
					{{item.buy_status === 1 ? i18n.zhang:i18n.die}}
				</view>
				<view class="conta">
					{{item.createTime|yndhms('M')}}
				</view>
				<view class="right">
					{{item.seconds}}{{item.secondsTime}}
				</view>
			</view>
			<view class="f-row f-000" v-if="mode === 2">
				<view class="left">
					{{item.matchPrice}}
				</view>
				<view class="conta">
				</view>
				<view class="right">
					{{item.matchCount}}
				</view>
			</view>
			<view class="f-row f-000" v-if="mode === 3">
				<view class="left">
					{{item.matchFee | toFixed(4)}}
				</view>
				<view class="conta">
					
				</view>
				<view class="right">
					{{item.createTime|yndhms('M')}}
				</view>
			</view>
			<view class="f-row" v-if="mode === 2">
				<view class="left">
					{{ i18n.chengjiaozonge }}({{item.mainCur}})
					<text>
					</text>
				</view>
				<view class="conta">
				</view>
				<view class="right">
					{{ i18n.shijian }}
				</view>
			</view>
			<view class="f-row f-000" v-if="mode === 2">
				<view class="left">
					{{(item.matchFee-item.tradeFee)}}
				</view>
				<view class="conta">
				</view>
				<view class="right">
					{{item.createTime|yndhms('M')}}
				</view>
			</view>
			<view class="f-row" v-if="mode === 4">
				<view class="left">
					<text>
					</text>
				</view>
<!-- 				<view class="conta" @click="zhiyin(item,1)">
					<u-tag :text="i18n.zhiyin" size="mini" type="success" />
				</view>
				<view class="right" @click="zhiyin(item,2)">
					<u-tag :text="i18n.zhixsun" size="mini" type="warning" />
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	/*

	 */
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			mode:{
				type:Number,
				default: 1
			},
			state:{
				type:Number,
				default: 1
			},
			isCheDan: {
				type: Boolean,
				default: true
			}
		},
    created(){
      // console.info("🇨🇳🇨🇳:订单 --", this.list)
      this.infoTime()
    },
		computed: {
			i18n() {
				return this.$t("entrust")
			}
		},
    // watch: {
    //   list: {
    //     handler(newVal) {
    //       newVal.forEach(e => {
    //         e.shijian = new Date(e.time).toLocaleString('zh-CN');
    //       })
    //     },
    //     deep: true,
    //   },
    // },
		data() {
			return {
                
			}
		},
		methods: {
      processedList(e) {
        return new Date(e.time).toLocaleString('zh-CN')
      },
      infoTime(){
        // this.list = this.list.map(e=>{
        //   return Object.assign(e,{shijian:new  Date(e.time).toLocaleString('zh-CN')})
        // })
      },
      //详情  
      goDetails(item){
        console.info("🇨🇳🇨🇳:itemitemitemitem --", item)
        if(this.mode == 3){
          uni.navigateTo({
            url:`/pages/financial/details?data=` + JSON.stringify(item)
          })
        }

      },
      getPath(){
			},
			xiangqing(item){
				this.$emit('handleRecord', item)
			},
			/**
			 * 币币撤单
			 */
			chedan(item){
				this.$emit('chedan', item)
			},

      pingchang(item) {
        this.$emit('pingchang', item)
      },
			//止盈
			zhiyin(item,index){
				this.$emit('zhiyin', item,index)
			},
		}
	}
</script>

<style lang="scss" scoped>
.entrust-list {
	.c_green {
		color: #14D69F;
	}
	.c_red {
		color: #E8054C;
	}
	.item {
		padding: 24rpx 32rpx;
		background: #fff;
		border-top: 1rpx solid #EBEBEB;
		.f-000 {
			color: #000 !important; 
		}
		.f-row {
			display: flex;
			align-items: center;
			color: #8D9099;
			font-size: 22rpx;
			margin-top: 8rpx;
			.left {
				display: flex;
				align-items: center;
				text {
					margin-left: 20rpx;
				}
			}
			.conta {
				flex: 1;
			    display: flex;
				align-items: center;
				// justify-content: center;
				justify-content: flex-end;
				
			}
			.right {
				// margin-left: auto;
				width: 240rpx;
				display: flex;
				align-items: center;
				// justify-content: center;
				justify-content: flex-end;
			}
		}
		.list-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30rpx;
			.left1 {
				color: #5EBA89 !important;
			}
			.left {
				color: #E45360;
				text {
					color: #000;
					margin-left: 12rpx;
				}
			}
			//.right {
      //  border: 2rpx solid $uni-color-black;
			//	color: #bddd22;
			//}

      .right {
        background-color: #937480; /* 按钮的背景颜色 */
        border: none;
        color: white; /* 按钮的字体颜色 */
        padding: 3rpx 8rpx; /* 按钮内部的间距 */
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 10rpx; /* 按钮字体的大小 */
        margin: 4rpx 2rpx;
        cursor: pointer;
        border-radius: 4rpx;
        transition-duration: 0.2s; /* 过渡动画的持续时间 */
        box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.2); /* 阴影效果 */
      }

      .right:hover {
        background-color: #0069D9; /* 鼠标悬停时的背景颜色 */
      }

      .right:active {
        background-color: #007AFF; /* 点击时的背景颜色 */
        transform: translateY(1rpx); /* 上移1个像素以模拟被点击效果 */
        box-shadow: none; /* 去掉阴影效果 */
      }

		}
	}
}
</style>
