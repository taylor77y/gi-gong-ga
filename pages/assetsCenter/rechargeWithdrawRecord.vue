<template>
	<view class="page">
		<xl-header :title="i18n.whistory"></xl-header>
		<u-tabs :list="tagBtn" :is-scroll="false" :current="tabCurrent" @change="tabChange"></u-tabs>
		<view class="container" v-show="tabCurrent == 0">
<!--			Deposit-->
      <view class="re-list" v-for="(item,index) in rechargeList" :key="index">
        <view class="item" @click="onRechargeDetail(item)">
          <view class="item-top">
            <view>{{item.currency}}</view>
            <view class="f-600">{{item.amount}}</view>
          </view>

          <view class="item-bottom">
            <view>{{item.createTime|yndhms('M')}}</view>
            <view class="f-600" v-if="item.status === 1">{{ i18n.shenhezho }}</view>
            <view class="f-600" v-if="item.status === 2">{{ i18n.shtg }}</view>
            <view class="f-600" v-if="item.status === 3">{{ i18n.shbh }}</view>
          </view>

        </view>
      </view>
		</view>
		<view class="container" v-show="tabCurrent == 1">
<!--			Withdraw-->
      <view class="with-list" v-for="(item,index) in withdrawList" :key="index">
        <view class="item" @click="onWithdrawDetail(item)">
          <view class="item-top">
            <view>{{item.currency}}</view>
            <view class="f-600">{{item.balance}}</view>
          </view>

          <view class="item-bottom">
            <view>{{item.extractTime|yndhms('M')}}</view>
            <view class="f-600" v-if="item.state === 'CREATE'">{{ i18n.shenhezho }}</view>
            <view class="f-600" v-if="item.state ===  'PASS'">{{ i18n.shtg }}</view>
            <view class="f-600" v-if="item.state ===  'REJECT'">{{ i18n.shbh }}</view>
            <view class="f-600" v-if="item.state ===  'CLOSE'">{{ i18n.close }}</view>
          </view>

        </view>
      </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
					name: 'Deposit'
				}, {
					name: 'Withdraw'
				}],
				tabCurrent: 0,
        rechargeList:[],//充值历史列表
        withdrawList:[],//提现历史列表
        page: 1,
        size: 20,
			}
		},
    computed: {
      i18n() {
        return this.$t('assetsCenter')
      },
      tagBtn() {
        return this.i18n.tagBtn1
      },
    },
    created(){
      this.rechargeCurrencyRecord();
      this.withdrawCurrencyRecord();
    },
    onLoad(options){
      this.tabChange(options.type)
      // this.tabCurrent = options.type
    },
		methods: {
			tabChange(index) {
				this.tabCurrent = index
			},

      // 处理分页数据
      handlePageFn(total) {
        this.total = total
        this.maxPage = Math.ceil(this.total / this.size)
        if (this.maxPage > this.page) {
          this.loadmoreStatus = 'loadmore'
        } else {
          this.loadmoreStatus = 'nomore'
        }
      },

      // async pageLoading() {
      //   // 页面加载
      //   this.page = 1
      //   this.list = []
      //   this.total = 0
      //   this.rechargeCurrencyRecord();
      // },

      //获取充值记录列表
      rechargeCurrencyRecord(){
        let member = uni.getStorageSync('userId');
        this.$u.api.user.rechargeCurrencyRecord(member, this.page, this.size).then(res => {
          console.log("充值记录", res.result.records)
          if(res.status === 'SUCCEED'){
            this.rechargeList = this.rechargeList.concat(res.result.records)
            this.handlePageFn(res.result.total)
          }
        })
      },

      //获取提现记录列表
      withdrawCurrencyRecord(){
        let member = uni.getStorageSync('userId');
        this.$u.api.user.withdraw_recording(member, this.page, this.size).then(res => {
          console.log("提现记录", res.result.records)
          if(res.status === 'SUCCEED'){
            this.withdrawList = this.withdrawList.concat(res.result.records)
            this.handlePageFn(res.result.total)
          }
        })
      },

      onRechargeDetail(items) { // 到充值详情页面
        uni.navigateTo({
          url:`/pages/recharge/rechargeDetail?item=${JSON.stringify(items)}`
        })
      },

      onWithdrawDetail(items) { // 到提现详情页面
        uni.navigateTo({
          url:`/pages/withDraw/withdrawDetail?item=${JSON.stringify(items)}`
        })
      },
		}
	}
</script>

<style lang="scss" scoped>

.re-list {
  margin: 12rpx 24rpx;

  .item {
    margin-top: 30rpx;
    margin-bottom: 30rpx;

    .f-600 {
      font-weight: 600;
    }

    .item-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #000;
      font-size: 32rpx;
    }

    .item-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #8D9099;
      font-size: 26rpx;
    }
  }
}

.with-list {
  margin: 12rpx 24rpx;

  .item {
    margin-top: 30rpx;
    margin-bottom: 30rpx;

    .f-600 {
      font-weight: 600;
    }

    .item-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #000;
      font-size: 32rpx;
    }

    .item-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #8D9099;
      font-size: 26rpx;
    }
  }
}

	::v-deep .u-navbar {
		box-shadow: none;
	}

	::v-deep .u-border-bottom:after,
	.u-border-left:after,
	.u-border-right:after,
	.u-border-top-bottom:after,
	.u-border-top:after,
	.u-border:after {
		border: none;
	}
</style>
