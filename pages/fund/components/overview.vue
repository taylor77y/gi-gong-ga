<template>
  <view class="overflow-box">
    <view class="total d-flex-between-center">
      <view class="t-left">
       <text style="font-size: 30rpx">{{ i18n.zzc}}</text>
        <view class="left1" v-if="!isInput" @click="getImg()">
          <image referrerpolicy="no-referrer" src="/static/image/my/2.png"/>
        </view>
        <view class="left2" v-else @click="getImg()">
          <image referrerpolicy="no-referrer" src="/static/image/my/1.png"/>
        </view>
      </view>
      <view class="t-right" @tap="toPage()">
        <image referrerpolicy="no-referrer" src="/static/image/my/3.png"/>
      </view>
    </view>
    <view class="money">
      {{ isInput ? walletResult.cnyPrice : '*********' }}
    </view>
    <view class="zhehe">
      {{ isInput ? '≈ $  ' + walletResult.usdtPrice  +  'USDT' : '*********' }}
<!--      <image referrerpolicy="no-referrer" src="/static/image/my/4.png"/>-->
    </view>
<!--    <view class="a-img">-->
<!--      <image referrerpolicy="no-referrer" src="/static/image/my/5.png"/>-->
<!--    </view>-->
<!--    <view class="tips" v-if="walletResult.cnyPrice !== 0">-->
<!--      您的账户内尚无资产。立即充值或购买，获得您的第一笔 数字资产。-->
<!--    </view>-->
<!--    <view class="ly-produts">-->
<!--      <view class="ly-produts__list">-->
<!--        <view class="ly-produts__item">-->
<!--          <view>-->
<!--            <image referrerpolicy="no-referrer" src="/static/image/my/6.png"/>-->
<!--          </view>-->
<!--          快捷买币-->
<!--        </view>-->
<!--        <view class="ly-produts__item">-->
<!--          <view>-->
<!--            <image referrerpolicy="no-referrer" src="/static/image/my/7.png"/>-->
<!--          </view>-->
<!--          数字货币充值-->
<!--        </view>-->
<!--      </view>-->
<!--    </view>-->

<!-- 充值-->
    <view class="other-box">
      <view class="item" @click="getPath(index)" v-for="(item, index) in btnInfo" :key="index">
        <image :src="item.img"></image>
        {{ item.name }}
      </view>
    </view>

    <view class="combination-title">
      {{i18n.tzzh.title}}
    </view>
    <view style="height: 20rpx;"></view>
    <view class="list">
      <view class="item" v-for="(item, index) in listFn" :key="index">
        <view class="left">
          <image :src="item.img"></image>
          {{ item.name }}
        </view>
        <view class="right" :class="{'r-color': item.code}">
          <!-- {{ item.code ? '激活' : item.val }} -->
			<view>{{ isInput? item.val : '********' }} USDT</view>
			<text style="font-size: 24rpx; color: #979CA7;">≈HK $  {{ isInput ? item.rate : '*******'}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {u} from "caniuse-lite/data/browserVersions";

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      walletResult: {},//钱包
      assetsAmount: 0, //资产金额
      isInput: true,
      listFn: [
        {name:'Spot', img: '/static/image/my/8.png', path: '', val: '0 ', rate:'0.00', key:'xhzh',},
        {name: 'Contract', img: '/static/image/my/9.png', path: '', val: '0 ', rate:'0.00', key:'hyzh',},
        {name: 'Delivery contract account', img: '/static/image/my/10.png', path: '', val: '0 ', rate:'0.00', key:'jghyzh',},
        {name: 'Financial account）', img: '/static/image/my/11.png', path: '', val: '0 ', rate:'0.00', key:'lczh',},
        {name: 'Miner assets', img: '/static/image/my/12.png', path: '', val: '0 ', rate:'0.00', key:'kjzc',},
      ]
    }
  },
  computed: {
    i18n() {
      return this.$t("assets")
    },
    btnInfo() {
      return this.i18n.btnInfo
    }
  },
  created(){
    this.getBalances()
    let listFn = this.listFn.map(e=>{
      e.name = this.i18n.tzzh[e.key]
    })

  },
  methods: {
    //投资
    // getPortfolio(){
    //   this.$u.api.wallet.getPortfolio().then(res=>{
    //     console.info("🇨🇳🇨🇳:res --", res)
    //   })
    // },
    //钱包
    getBalances() {
      let member = uni.getStorageSync('userId') || 0
      this.$u.api.user.getBalanceList(member).then(res => {
        this.walletResult = res.result
        console.info("🇨🇳🇨🇳:res --",this.walletResult)
      })
    },

    getPath(index) {
      // if (index === 0) {
      //   this.getRechargeMethod() //后续判断 是否有登录
      //   return
      // }
      const temp = {
        0: `/pages/recharge/rechargeList`,
        1: `/pages/withDraw/withDraw?data=+ ${JSON.stringify(this.walletResult)}` ,
        2: `/pages/flashCash/index`,
      }
      uni.navigateTo({
        url: temp[index]
      })
    },

	  toPage(){
		  uni.navigateTo({
		  	url:'/pages/exchangeHistory/exchangeHistory'
		  })
	  },
    getImg() {
      this.isInput = !this.isInput
    },
  }
}
</script>

<style lang="scss" scoped>
.overflow-box {
  .list {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 0;
      color: #6F7784;
      font-weight: 400;

      & image {
        width: 48rpx;
        height: 48rpx;
        margin-right: 14rpx;
      }

      .left {
        display: flex;
        align-items: center;
      }

      .right {
        color: #000000;
        font-size: 30rpx;

      }

      .r-color {
        color: #D4B02D !important;
      }
    }
  }

  //充值
  .other-box {
    display: flex;
    align-items: center;
    margin: 32rpx 0;
    .item {
      width: 220rpx;
      height: 64rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #EBECF0;
      border-radius: 8rpx;
      font-size: 28rpx;
      color: #1F222B;
      margin-right: 20rpx;
      & image {
        width: 40rpx;
        height: 40rpx;
        margin-right: 14rpx;
      }

      //&:first-child {
      //  background: #F5D55A;
      //}

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .combination-title {
    font-size: 34rpx;
    color: #1F222B;
    font-weight: 500;
    margin-top: 10rpx;
  }

  .ly-produts {
    margin: 20rpx 0;

    &__list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;


    }

    &__item {

      width: 47%;
      min-width: 346rpx;
      background: #FAFAFA;
      border-radius: 10rpx;
      padding: 17rpx 20rpx;
      color: #1F222B;
      font-size: 28rpx;
      font-weight: bold;

      & image {
        width: 76rpx;
        height: 76rpx;
      }
    }
  }


  .tips {
    font-size: 28rpx;
    color: #707070;
    text-align: center;
  }

  .a-img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30rpx 0;

    & image {
      width: 194rpx;
      height: 194rpx;
    }
  }

  .money {
    font-size: 52rpx;
    color: #1F222B;
    font-weight: bold;
  }

  .zhehe {
    display: flex;
    align-items: center;
    color: #00e1cc;
    // margin: 10rpx 0;

    & image {
      width: 26rpx;
      height: 26rpx;
      margin-left: 10rpx;
    }
  }

  .total {
    color: #707070;
    font-size: 24rpx;

    .t-left {
      display: flex;
      align-items: center;
      margin-bottom: 10rpx;

      .left1 {
        margin-left: 20rpx;
        & image {
          width: 32rpx;
          height: 12rpx;
        }
      }

      .left2 {
        margin-left: 20rpx;
        & image {
          width: 32rpx;
          height: 20rpx;
        }
      }
    }

    .t-right {
      & image {
        width: 38rpx;
        height: 38rpx;
      }
    }
  }
}
</style>
