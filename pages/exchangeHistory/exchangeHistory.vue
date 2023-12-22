<template>
	<view class="exchange-history">
		<head-slot>
			<template #middle><text>{{i18n.exchangeHistory}}</text></template>
		</head-slot>
		<view class="content">

        <view class="content-header">
          <view><text>{{i18n.from}}</text></view>
          <view><text>{{i18n.to}}</text></view>
        </view>

        <view class="re-list" v-for="(item,index) in exchangeList" :key="index">
          <view class="item">
            <view class="item-top">
              <view>{{ i18n.bgq }}</view>
              <view class="f-600">-{{item.currency}}:{{item.quantity}}</view>
            </view>

            <view class="item-top">
              <view>{{ i18n.bgh }}</view>
              <view class="f-600">+{{item.currencyTarget}}:{{item.afterExchangeQuantity}}</view>
            </view>

            <view class="item-bottom">
              <view>{{item.createTime|yndhms('M')}}</view>
              <view class="f-600">{{ i18n.yiwancheng }}</view>
            </view>

          </view>
        </view>

        <u-loadmore v-show="total > 0" :status="loadmoreStatus" :load-text="loadText" @loadmore="loadmore" />
        <u-empty margin-top="100" v-if="exchangeList.length == 0" :text="i18n.ddwk" mode="order"></u-empty>
      </view>

	</view>
</template>

<script>
	import HeadSlot from '../../components/head-slot/head-slot.vue'
	export default {
		components: {
			HeadSlot
		},
		data() {
			return {
				title: 'Flash history',
        exchangeList:[],//闪兑历史列表
        page: 1,
        size: 20,
        loadmoreStatus: 'loadmore',
        loadText: {
          loadmore: '点击或上拉加载更多',
          loading: '努力加载中',
          nomore: '实在没有了'
        },
        maxPage: 1,
        total: 0,
			};
		},
    onReachBottom() {
      // 上拉加载
      this.pullOnLoading()
    },
    onPullDownRefresh() {
      this.pageLoading()
      setTimeout(() => {
        uni.stopPullDownRefresh()
      }, 1000)
    },
    computed : {
      i18n() {
        return this.$t('exchangeHistory')
      },
    },
    created(){
      this.getSdRecord()
    },
    methods: {
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
      loadmore() {
        // 点击加载更多
        this.pullOnLoading()
      },
      async pageLoading() {
        // 页面加载
        this.page = 1
        this.list = []
        this.total = 0
        this.getSdRecord();
      },
      pullOnLoading() {
        if (this.maxPage > this.page) {
          this.page += 1
          this.loadmoreStatus = 'loading'
          this.getSdRecord();
        } else {
          this.loadmoreStatus = 'nomore'
        }
      },
      //获取闪兑记录列表
      getSdRecord(){
          // let obj = new Object();
          // obj.member = uni.getStorageSync('userId');
          // obj.page = 1;
          // obj.size = 10;
        let member = uni.getStorageSync('userId');
          this.$u.api.sd.currencyExchangeRecord(member, this.page, this.size).then(res => {
            console.log("闪兑记录", res.result.records)
            if(res.status === 'SUCCEED'){
              this.exchangeList = this.exchangeList.concat(res.result.records)
              this.handlePageFn(res.result.total)
            }
          })
      },
    }
	}
</script>

<style lang="scss">
.exchange-history{

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


	.content{
		padding: 0 30rpx;
		margin-top: 50rpx;
		.content-header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			text{
				font-size: 35rpx;
				color:#868c9a;
			}
		}
		.content-bottom{
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			color: #868c9a;
		}


	}
}
</style>
