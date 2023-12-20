<template>
  <view class="perpetual-history">
    <head-slot>
      <template #middle><text>{{i18n.uHistory}}</text></template>
    </head-slot>
    <view class="content-header">
      <u-tabs-swiper
          active-color="#2c78f8"
          bar-width="263"
          ref="tabs"
          :list="tagBtn"
          :is-scroll="false"
          inactive-color="#333"
          @change="tabsChange"
      ></u-tabs-swiper>
      <swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="swiper-box">
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="width: 100%; height: 99%;" @scrolltolower="onreachBottom">
            <view class="content-list">
              <view class="u-flex u-row-right">
                <view class="u-flex u-row-right" style="width: 100%;">
                  <u-dropdown class="u-flex u-row-right u-padding-right-20">
                    <u-dropdown-item v-model="opt1" :title="options1[opt1-1]['label']" :options="options1" @change="onChangeCur"></u-dropdown-item>
                  </u-dropdown>
                </view>
              </view>
              <view v-for="(item, index) in tabs[0]" :key="index" class="u-border-bottom u-margin-bottom-10 u-p-10">
                <view class="u-flex u-margin-bottom-20">
                  <view class="bg-green border-radius-10 u-p-10 text-white u-margin-right-10">开多</view>
                  <view class="u-flex font-weight-bold">{{item.pairsName}} <!-- 交割 -->
                    <view class="u-font-xs u-padding-left-10 gray" style="font-weight: normal;"> 全仓 x {{item.leverNum}}</view>
                  </view>
                </view>
                <view class="u-flex u-row-between u-margin-bottom-10 u-font-sm">
                  <text class="gray">购买价(USDT)</text>
                  <text class="gray">现价</text>
                </view>
                <view class="u-flex u-row-between u-margin-bottom-10 u-font-sm">
                  <text>{{item.price}}</text>
                  <text class="red">{{item.matchPrice}}</text>
                </view>
                <view class="u-flex u-row-between u-margin-bottom-10 u-font-sm">
                  <text class="u-flex-1 gray">方向</text>
                  <text class="u-flex-1 text-center gray">数量</text>
                  <text class="u-flex-1 text-right gray">盈亏</text>
                </view>
                <view class="u-flex u-row-between u-margin-bottom-20 u-font-sm">
                  <text class="u-flex-1 green">开多</text>
                  <text class="u-flex-1 text-center">{{item.coinNum}}</text>
                  <text class="u-flex-1 text-right" :class="item.matchFee > 0 ? 'green' : 'red'">{{item.matchFee}}</text>
                </view>
                <view class="u-flex u-row-between u-margin-bottom-10 u-font-sm">
                  <text class="u-flex-1 gray">剩余时间</text>
                  <text class="u-flex-1 text-center gray">交割时间</text>
                  <text class="u-flex-1 text-right gray">操作</text>
                </view>
                <view class="u-flex u-row-between u-margin-bottom-10 u-font-sm">
                  <text class="u-flex-1">{{item.remain || '--'}}</text>
                  <text class="u-flex-1 text-center">{{item.period  || '--'}}</text>
                  <text class="u-flex-1 text-right green" @click="onDetail(item)">详情</text>
                </view>
              </view>
              <u-empty text="Not record" mode="search" v-if="loadStatus[0] === 'nomore' && tabs[0].length === 0"></u-empty>
              <u-loadmore :status="loadStatus[0]" bgColor="#ffffff" v-else></u-loadmore>
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view scroll-y style="width: 100%; height: 99%;" @scrolltolower="onreachBottom">
            <view class="content-list">
              <view class="u-flex u-row-right" style="width: 100%;">
                <u-dropdown class="u-flex u-row-right u-padding-right-20">
                  <u-dropdown-item v-model="opt2" :title="options2[opt2-1]['label']" :options="options2" @change="onChangeHis"></u-dropdown-item>
                </u-dropdown>
              </view>
              <view v-for="(item, index) in tabs[1]" :key="index" class="u-border-bottom u-margin-bottom-20 u-p-10">
                <view class="u-flex u-margin-bottom-20">
                  <view class="border-radius-10 u-p-10 text-white u-margin-right-10"
                        :class="String(item.tradeType).endsWith('UP') ? 'bg-green': 'bg-red'">{{getTradeType(item.tradeType)}}</view>
                  <view class="u-flex font-weight-bold">{{item.pairsName}} 永续
                    <!-- <view class="u-font-xs u-padding-left-10 gray" style="font-weight: normal;"> 全仓 x</view> -->
                  </view>
                </view>
                <view class="u-flex u-row-between u-margin-bottom-10 u-font-sm">
                  <text class="gray">价格</text>
                  <text class="">{{item.bPrice}}</text>
                </view>
                <view class="u-flex u-row-between u-margin-bottom-10 u-font-sm">
                  <text class="gray">成交数量</text>
                  <text class="">{{item.contractHands}}</text>
                </view>
                <view class="u-flex u-row-between u-margin-bottom-10 u-font-sm">
                  <text class="gray">手续费</text>
                  <text class="">{{item.matchFee}}</text>
                </view>
                <view class="u-flex u-row-between u-margin-bottom-10 u-font-sm">
                  <text class="gray">实现盈亏</text>
                  <text :class="item.profit > 0 ? 'green' : 'red'">{{item.profit}}</text>
                </view>
                <view class="u-flex u-row-between u-margin-bottom-10 u-font-sm">
                  <text class="gray">订单号</text>
                  <text class="">{{item.id}}</text>
                </view>
                <view class="u-flex u-row-between u-margin-bottom-10 u-font-sm">
                  <text class="gray">操作</text>
                  <text class="blue bg-blue u-p-10" @click="onDetail(item)">详情</text>
                </view>
              </view>
              <u-empty text="Not record" mode="search" v-if="loadStatus[1] === 'nomore' && tabs[1].length === 0"></u-empty>
              <u-loadmore :status="loadStatus[1]" bgColor="#ffffff" v-else></u-loadmore>
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
  onLoad() {
    this.init()
  },
  data() {
    return {
      pageSize: 10, // 每页长度
      pageIndexs: [1,1,1], // 页码
      current: 0, // tabs组件的current值，表示当前活动的tab选项
      swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
      loadStatus: ['loading','loading'], // 加载状态
      tabs: [[], []], // 列表
      opt1: 1, // 下拉
      options1: [{
        label: 'BTC/USDT',
        value: 1,
      },
        {
          label: 'XTZ/USDT',
          value: 2,
        },
        {
          label: 'ADA/USDT',
          value: 3,
        },
        {
          label: 'YFII/USDT',
          value: 4,
        }
      ],
      opt2: 1, // 下拉
      options2: [{
        label: 'BTC/USDT',
        value: 1,
      },
        {
          label: 'XTZ/USDT',
          value: 2,
        },
        {
          label: 'ADA/USDT',
          value: 3,
        },
        {
          label: 'YFII/USDT',
          value: 4,
        }
      ],
    };
  },
  computed : {
    i18n() {
      return this.$t('perpetualHistory')
    },
    tagBtn() {
      return this.i18n.tagBtn1
    },
  },
  methods: {
    getTradeType(type) {
      const types = {
        OPEN_UP: '开多',
        OPEN_DOWN: '开空',
        CLOSE_UP: '平多',
        CLOSE_DOWN: '平空'
      }
      return types[type]
    },
    onChangeCur(val) { // 当前委托下拉
      this.tabs[this.current] = []
      this.loadStatus.splice(this.current, 1, 'loading')
      this.getTabList0()
    },
    onChangeHis() { // 历史委托下拉
      this.tabs[this.current] = []
      this.loadStatus.splice(this.current, 1, 'loading')
      this.getTabList1()
    },
    // tabs通知swiper切换
    tabsChange(index) {
      this.swiperCurrent = index;
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
    onDetail(items) { // 到详情页面
      uni.navigateTo({
        url:`/pages/perpetualHistory/perpetualDetail?item=${JSON.stringify(items)}`
      })
    },
    onreachBottom() { // 滚动到底部
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
    async getTabList0() { // 当前委托
      const member = uni.getStorageSync('userId')
      const {result } = await this.$u.api.yx.getEntrustOrder({pairsName: this.options1[this.opt1 - 1].label, member })
      this.handleList(result, 0)
      this.loadStatus.splice(0,1,"nomore") // 没有分页信息
    },
    async getTabList1() { // 历史仓位
      const userId = uni.getStorageSync('userId')
      const res = await this.$u.api.yx.getPerpetualHistory(this.options2[this.opt2 - 1].label, userId, this.pageIndexs[this.current], this.pageSize)
      await this.handleList(res?.result?.result, 1)
    },
    init() {
      this.getTabList0()
      this.getTabList1()
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  height: 100vh;
}
.blue {
  color: #4A7AF5;
}
.bg-blue {
  background-color: #dde9ee;
}
.red {
  color: #E45360;
}
.bg-red {
  background-color: #E45360;
}
.green {
  color: #5EBA89;
}
.bg-green {
  background-color: #5EBA89;
}
.gray {
  color: #6F7784;
}
.perpetual-history{
  // background-color: blue;
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top));
  width: 100%;
}
.content-header {
  // background-color: blue;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.swiper-box {
  // background-color: yellow;
  flex: 1;
}
.content-list{
  // margin-top: 60rpx;
}
.swiper-item {
  height: 100%;
}
</style>
