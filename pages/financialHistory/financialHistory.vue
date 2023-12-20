<template>
  <view class="financia-history" style="height: 100%;">
    <head-slot>
      <template #middle><text>{{i18n.history}}</text></template>
    </head-slot>
    <view class="content-header">
      <u-tabs-swiper active-color="#2c78f8" bar-width="80" ref="tabs" :list="tagBtn" :is-scroll="false"
                     inactive-color="#333" @change="tabsChange"></u-tabs-swiper>
      <swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
              :style="{height:swiperContentHeight}">
        <!-- 购买 -->
        <swiper-item class="swiper-item">
          <scroll-view scroll-y  :style="{width: '100%', height:scrollerHeight}" @scrolltolower="onreachBottom">
            <view class="content-list">
              <view class="u-margin-bottom-10 u-p-20 u-padding-left-20 u-padding-right-20" style="background-color: #f6f6f6;" v-for="(item, index) in tabs[0]" :key="index">
                <view class="u-flex u-row-between u-margin-bottom-15">
                  <text class="text-gray">时间</text>
                  <text>{{$u.timeFormat(item.valueDate, 'yyyy-mm-dd hh:MM:ss')}}</text>
                </view>
                <view class="u-flex u-row-between u-margin-bottom-15">
                  <text class="text-gray">数量</text>
                  <text>{{item.price}} USDT</text>
                </view>
                <view class="u-flex u-row-between u-margin-bottom-15">
                  <text class="text-gray">周期</text>
                  <text>{{item.periodDay}} 天</text>
                </view>
                <view class="u-flex u-row-between u-margin-bottom-15">
                  <text class="text-gray">累计收益</text>
                  <text>{{item.accumulatedIncome}}</text>
                </view>
              </view>
              <u-empty text="Not record" mode="search" v-if="loadStatus[0] === 'nomore' && tabs[0].length === 0"></u-empty>
              <u-loadmore :status="loadStatus[0]" bgColor="#ffffff" v-else></u-loadmore>
            </view>
          </scroll-view>
        </swiper-item>
        <!-- 赎回 -->
        <swiper-item class="swiper-item">
          <scroll-view scroll-y  :style="{width: '100%', height:scrollerHeight}" @scrolltolower="onreachBottom">
            <view class="content-list">
              <view v-for="(item, index) in tabs[1]" :key="index" class="bg-gray u-m-10 u-flex u-p-10 u-row-between" @click="onHistoryDetail(item)">
                <view class="u-flex">
                  <u-image :src="item.fund_image"  :lazy-load="true" style="width: 100rpx; height: 100rpx;"></u-image>
                  <view class="u-margin-left-10 u-font-sm">
                    <view class="font-weight-bold">{{item.name}}</view>
                    <view class="text-gray">数量<text class="text-black u-p-10">{{item.price}}</text> USDT</view>
                    <view class="text-gray">周期 <text class="text-black u-margin-left-10">{{item.periodDay}}天</text></view>
                  </view>
                </view>
                <view class="u-flex">
                  <view class="u-font-xs">
                    <view class="u-font-40 text-green u-padding-top-10">{{item.accumulatedIncome}}</view>
                    <view>累计收益</view>
                    <view>(USDT)</view>
                  </view>
                  <view class="u-margin-left-10">
                    <u-icon name="arrow-right"></u-icon>
                  </view>
                </view>
              </view>
              <u-empty text="Not record" mode="search" v-if="loadStatus[1] === 'nomore' && tabs[1].length === 0"></u-empty>
              <u-loadmore :status="loadStatus[1]" bgColor="#ffffff" v-else></u-loadmore>
            </view>
          </scroll-view>
        </swiper-item>
        <!-- 利息 -->
        <swiper-item class="swiper-item">
          <scroll-view scroll-y  :style="{width: '100%', height:scrollerHeight}" @scrolltolower="onreachBottom">
            <view class="content-list">
              <view v-for="(item, indexs) in tabs[2]" :key="indexs" class="u-p-10 border-b u-margin-bottom-5 flex items-center d-flex-between-center">
                <view class="u-flex">
                  <u-image :src="item.fund_image"  :lazy-load="true" style="width: 100rpx; height: 100rpx;"></u-image>
                  <view class="u-flex u-flex-col align-start u-margin-left-10">
                    <view>利息数量(USDT)</view>
                    <view class="u-font-sm text-gray">{{$u.timeFormat(item.createTime, 'yyyy-mm-dd hh:MM:ss')}}</view>
                  </view>
                </view>
                <view class="text-green">{{item.balanceDifference}}</view>
              </view>
              <u-empty text="Not record" mode="search" v-if="loadStatus[2] === 'nomore' && tabs[2].length === 0"></u-empty>
              <u-loadmore :status="loadStatus[2]" bgColor="#ffffff" v-else></u-loadmore>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import HeadSlot from '../../components/head-slot/head-slot.vue'
export default {
  components: {
    HeadSlot
  },
  onLoad() { // 初始化数据
    console.log('onLoad...')
    this.init()
  },
  onReady() {
    let that = this
    uni.getSystemInfo({
      success: function(res) {
        let windowHeight = res.windowHeight;
        that.swiperContentHeight = (windowHeight - 95) + 'px';
        that.scrollerHeight = (windowHeight - 95 - 5) + 'px'; // 给5px的底部间距
      }
    });
  },
  data() {
    return {
      pageSize: 10, // 每页长度
      pageIndexs: [1,1,1], // 页码
      current: 0, // tabs组件的current值，表示当前活动的tab选项
      swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
      scrollerHeight: 0, // swiper 高度
      swiperContentHeight: 0, // 滚动高度
      loadStatus: ['loading','loading','loading'],
      tabs: [[],[],[]] // 数据列表
    };
  },
  computed: {
    i18n() {
      return this.$t('financialHistory')
    },
    tagBtn() {
      return this.i18n.tagBtn1
    },
  },
  methods: {
    // tabs通知swiper切换
    tabsChange(index) {
      this.swiperCurrent = index;
      // console.log(this.swiperCurrent)
      // switch (this.swiperCurrent) {
      // 	case 0:
      // 		this.getFundOrderList(1);
      // 		break;
      // 	case 1:
      // 		this.getFundOrderList(2);
      // 		break;
      // 	case 2:
      // 		this.getFundOrderList();
      // 		break;
      // 	default:
      // 		break;
      // }
      // uni.showLoading();
      // this.pageLoading();
      // this.$nextTick(() => {
      //   setTimeout(() => {
      //
      //     uni.hideLoading();
      //   }, 400);
      // });
    },
    // swiper-item左右移动，通知tabs的滑块跟随移动
    transition(e) {
      let dx = e.detail.dx;
      this.$refs.tabs.setDx(dx);
    },
    // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
    // swiper滑动结束，分别设置tabs和swiper的状态
    animationfinish(e) {
      let current = e.detail.current;
      this.$refs.tabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },

    // async pageLoading() {
    // 	// 页面加载
    // 	this.page = 1
    // 	// this.list = []
    // 	this.total = 0
    // 	this.handleCodeFn()
    // },
    // 根据code 发送不同请求
    // handleCodeFn() {


    // },
    // async getFundOrderList(type) {
    // 	const userId = uni.getStorageSync('userId')
    // 	const {
    // 		status,
    // 		result,
    // 		errorMessage
    // 	} = await this.$u.api.fundFinancing.getFundOrderByUserId(userId, type)
    // 	if (status === 'SUCCEED') {
    // 		console.log(result)
    // 		this.list = result
    // 	} else {
    // 		this.$refs.uToast.show({
    // 			title: errorMessage,
    // 			type: 'error',
    // 			// url: '/pages/login/login',
    // 		})
    // 	}
    // },
    onHistoryDetail(item) { // 到详情页面
      uni.navigateTo({
        url:`/pages/financialHistory/financialDetail?item=${JSON.stringify(item)}`
      })
    },
    onreachBottom(e) { // 滚动到底部
      if (['loading', 'nomore'].includes(this.loadStatus[this.current])) { // 没有更多了
        return
      } else {
        this.loadStatus.splice(this.current,1,"loading") // 设置loading 状态
        this[`getTabList${this.current}`]()
      }
    },
    handleList(result, current) { // 处理数据
      this.tabs[current] = this.tabs[current].concat(result)
      if (result.length < this.pageSize) {
        this.loadStatus.splice(current,1,"nomore")
      } else {
        this.loadStatus.splice(current,1,"loadmore")
        this.pageIndexs[current]++
      }
    },
    async getTabList0() { // 购买接口
      const userId = uni.getStorageSync('userId')
      const res = await this.$u.api.fundFinancing.getFundOrderByUserId(userId, '0',this.pageIndexs[this.current], this.pageSize)
      const { result } = res
      this.handleList(result, 0)
    },
    async getTabList1() { // 赎回接口
      const userId = uni.getStorageSync('userId')
      const res = await this.$u.api.fundFinancing.getFundOrderByUserId(userId, '1',this.pageIndexs[this.current], this.pageSize)
      const { result } = res
      await this.handleList(result, 1) // getInterestRecord
    },
    async getTabList2() { // 利息接口
      const userId = uni.getStorageSync('userId')
      const res = await this.$u.api.fundFinancing.getInterestRecord(userId, this.pageIndexs[this.current], this.pageSize)
      await this.handleList(res?.result?.result?.records, 2)
    },
    init() { // 初始化
      this.getTabList0()
      this.getTabList1()
      this.getTabList2()
    }
  }
}
</script>

<style lang="scss" scoped>
// .d-flex-between-center {
// 	display: flex;
// }
.align-start {
  align-items: flex-start!important;
}
.border-b {
  border-bottom: 1rpx solid rgba(0,0,0,0.2);
  margin-bottom: 20rpx!important;
}
.text-gray { // 灰色
  color: #6F7784!important;
}
.bg-gray {
  background-color: #f6f6f6!important;
}
.text-green { // 绿色
  color: #5EBA89!important;
}
.content-list {
  padding: 10rpx 0;

}
.data-item {
  border: 2rpx solid yellow;
  margin-bottom: 10rpx;
  padding: 100rpx 0;
}
</style>