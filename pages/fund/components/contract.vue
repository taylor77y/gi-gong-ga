//合同页
<template>
  <view class="contractBox">
    <!-- 切换栏    -->
    <view class="headBox">
      <view class="titleBox" :class="{ 'btn-primary': isPrimaryActive }" @click="activatePrimary(1)">
        <view>
          <text>{{ current === 2 ? i18n.hy.yxhy : i18n.lc.hblc }}</text>
        </view>
      </view>
      <view class="titleBox" :class="{ 'btn-primary': isSecondaryActive }" @click="activateSecondary(2)">
        <view>
          <text>{{ current === 2 ? i18n.hy.jghe : i18n.lc.kclc }}</text>
        </view>
      </view>
    </view>

    <view class="container">
      <view class="containerBox">
        <view class="t-left">
          {{ i18n.zzc}}
          <view class="left1" v-if="isInput" @click="getImg()">
            <image referrerpolicy="no-referrer" src="/static/image/my/2.png"/>
          </view>
          <view class="left2" v-else @click="getImg()">
            <image referrerpolicy="no-referrer" src="/static/image/my/1.png"/>
          </view>
        </view>

        <view class="t-right" @tap="toPage">
          <image referrerpolicy="no-referrer" src="/static/image/my/3.png"/>
        </view>
      </view>
      <view class="amount">
        <view class="money">
          {{ isInput ? '******' : purchasedFunds.toPrice | SubString(5) }}
        </view>
        <view class="zhehe">
          {{ setRate.mark }}{{ isInput ? '******' : '≈HK $ 0.00 ' | SubString(5) }}
        </view>
      </view>

      <view class="usdtBox">

        <view class="usdtList">
          <view class="usdtListText" v-if="current === 2">
            {{ isShow === 1 ? i18n.hy.bzjye :  i18n.hy.bzjye }}
          </view>
          <view class="usdtListText" v-else>
            {{ isShow === 1 ? i18n.lc.yjrsy : i18n.lc.yjrsy }}
          </view>
          <view class="amount">
            <view class="money">
              {{ isInput ? '******' : purchasedFunds.dayPrice | SubString(5) }}
            </view>
            <view class="zhehe">
              {{ setRate.mark }}{{ isInput ? '******' : '≈HK $ 0.00 ' | SubString(5) }}
            </view>
          </view>
        </view>

        <view class="usdtList">
          <view class="usdtListText" v-if="current === 2">
            {{ isShow === 1 ? i18n.hy.qbye : i18n.hy.qbye }}
          </view>
          <view v-else class="usdtListText">
            {{ isShow === 1 ? i18n.lc.ljsy : i18n.lc.ljsy }}
          </view>
          <view class="amount">
            <view class="money">
              {{ isInput ? '******' : purchasedFunds.addUpPrice | SubString(5) }}
            </view>
            <view class="zhehe">
              {{ setRate.mark }}{{ isInput ? '******' : '≈HK $ 0.00 ' | SubString(5) }}
            </view>
          </view>
        </view>

      </view>

      <view class="usdtList">
        <view class="usdtListText" v-if="current === 2 && isShow === 1">
       {{i18n.hy.qbwsxyk}}
        </view>
        <view v-else class="usdtListText">
         <text v-if="current !== 2"> {{i18n.lc.tgzzdd}}</text>
        </view>
        <view class="amount" v-if="current === 2 && isShow === 1 || current === 3">
          <view class="money" style="color: #707070">
            {{ isInput ? '******' : purchasedFunds.size | SubString(5) }}
          </view>
          <view  style="color: #707070">
            {{ setRate.mark }}{{ isInput ? '******' : '≈HK $ 0.00 ' | SubString(5) }}
          </view>
        </view>
      </view>

    </view>
    <view class="allFnanceBox" v-if="current === 3">
      <view class="allFnanceList">
        <text> {{ isShow === 1 ? i18n.lc.sylc : i18n.lc.sykj }}</text>
        <a href="#" style="text-decoration : none" v-if="isShow === 1" @tap='toRules(1)'>{{i18n.lc.gz}}</a>
        <a href="#" style="text-decoration : none" v-else @tap='toRules(-1)'>{{i18n.lc.gz}}</a>
      </view>
	  <!-- {{isShow}} -->
	  <view class="financialList" v-show="isShow == 1">
	  	<financialList :list="productsList" />
	  </view>
	  <view class="smartPool" v-show="isShow == 2">
	  	<smartPool :list="smartPoolList"/>
	  </view>

    </view>
  </view>
</template>

<script>
import  financialList from '../components/financialList.vue'
import  smartPool from '../components/smartPool.vue'
export default {
  components: {
    financialList,
	smartPool
  },
  name: 'contract',
  props: {
    current: {
      type: Number,
      default: 2 //默认是合约 切换tabs
    }
  },
  data() {
    return {
      productsList :[],//个人产品
      isShow: 1,//是否显示
      isInput: false,//是否隐藏
      isPrimaryActive: true,
      isSecondaryActive: false,
	  smartPoolList:[],
      purchasedFunds:{},// 理财总资产
    }
  },
  computed:{
    i18n() {
      return this.$t("assets")
    },
  },
  created() {
    this.getPurchasedFunds()
    this.getFundOrderByUserId()
	this.getSmartPoolList()
  },
  mounted() {
  },
  methods: {
	  async getSmartPoolList(){
		let userId = uni.getStorageSync('userId')
		if(!userId){
			return
		}
		let res = await this.$u.api.machine.getSmartPoolOrderByUserId(userId,0)
		if(res.status === 'SUCCEED'){
			this.smartPoolList = res.result
		}
	  },
    // 用户的理财产品
    //理财资产列表
    getPurchasedFunds(){
        let id = uni.getStorageSync('userId') || 0;
        this.$u.api.fundFinancing.getCountFundOrderByUserId(id).then(res=>{
          if(res.status === 'SUCCEED'){
            this.purchasedFunds = res.result
          }
        })

    },
    // 用户的理财产品  理财列表
    getFundOrderByUserId(){
       let  userId =  uni.getStorageSync('userId')
       let   status = 0
      // }
      this.$u.api.fundFinancing.getFundOrderByUserId(userId,status).then(res =>{
        if(res.status === 'SUCCEED'){
      this.productsList = res.result
        } else {
          this.$utils.showToast(res.errorMessage)
        }
      })
    },
    toRules(e){
      uni.navigateTo({
        url:e === 1 ? '/pages/fund/fund-rule' : '/pages/machine/machine-rule'
      })
    },
	  toPage(){
				if(this.current == 2) {
					uni.navigateTo({
						url:'/pages/perpetualHistory/perpetualHistory'
					})
				} else if(this.current == 3) {
					uni.navigateTo({
						url:'/pages/financialHistory/financialHistory'
					})
				}

	  },
    setRate() {
      return this.$store.state.rate || {}
    },
    getImg() {
      this.isInput = !this.isInput
    },
    activatePrimary(e) {
      this.isShow = e
      this.isPrimaryActive = true;
      this.isSecondaryActive = false;
    },
    activateSecondary(e) {
      this.isShow = e
      this.isPrimaryActive = false;
      this.isSecondaryActive = true;
    },
  }
}
</script>

<style lang="scss" scoped>
.contractBox {
  width: 100%;
  height: 100rpx;
  //background-color: red;
  .headBox {
    margin-bottom: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    .titleBox {
      border: 1rpx solid #d3d3d3;
      width: 366rpx;
      height: 64rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10rpx;
      margin: 10rpx;
    }
  }

  .btn-primary {
    background: #2c78F8;
    color: #FFF;
  }

  .btn-secondary {
    background-color: #fff;
  }

  .container {
    display: flex;
    flex-direction: column;

  }

  .containerBox {
    display: flex;
    font-size: 32rpx;
    margin-bottom: 20px;
    justify-content: space-between;
    //color: #00e1cc;
    color: #707070;
    .t-left {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left1 {
        margin-left: 20rpx;

        & image {
          width: 32rpx;
          height: 12rpx;
        }
      }

      .left2 {
        & image {
          margin-left: 20rpx;
          width: 32rpx;
          height: 20rpx;
        }
      }
    }

    .t-right {
      & image {
        margin-left: 280rpx;
        width: 34rpx;
        height: 34rpx;
      }
    }
  }

  .amount {
    width: 100%;
    height: 120rpx;
    border-radius: 20rpx;
    //border: 1rpx solid #d3d3d3;
    //padding: 18rpx;

    .money {
      font-size: 38rpx;
      color: #1F222B;
      font-weight: bold;
    }

    .zhehe {
      display: flex;
      align-items: center;
      font-size: 26rpx;
      color: #707070;

      & image {
        width: 26rpx;
        height: 26rpx;
        margin-left: 10rpx;
      }
    }
  }

  .usdtBox {
    display: flex;
    width: 100%;
    height: 200rpx;
    justify-content: space-between;

    .usdtListText {
      margin: 20rpx 0;
      color: #707070;
    }
  }

  .allFnanceBox {
    margin-top: 30rpx;
    width: 100%;
    height: 400rpx;
    .allFnanceList {
      display: flex;
      justify-content: space-between;
    }
  }


  .usdtListText {
    margin: 20rpx 0;
    color: #707070;

  }
}
</style>