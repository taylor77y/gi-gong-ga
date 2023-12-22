<template>
  <view class="container">
    <head-slot>
      <template #middle><text>充值 详情<!-- {{i18n.uHistory}} --></text></template>
    </head-slot>
    <view class="content-header">
      <view class="u-flex u-flex-col u-p-40 border-b-gray">
        <view class="u-m-10 u-font-sm">数量</view>
        <view class="u-m-10 u-font-40" :class="item.amount > 0 ? 'green': 'red'">{{item.amount}} USDT</view>
      </view>
      <view class="u-flex u-flex-col u-p-40 border-b-gray">
        <view class="u-m-10 u-font-40">	<image class="icon" src="data:image/png;base64,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">
        </image>充值确定中</view>
        <view class="u-m-10 u-font-sm"> 数字货币已经充值 确定中。您可以在钱包帐户中查看详情。  </view>
      </view>

      <view class="u-p-20  border-b-gray">
        <view class="u-flex u-row-between u-margin-bottom-30">
          <text class="gray">确认数</text>
          <text>12/12</text>
        </view>
        <view class="u-flex u-row-between u-margin-bottom-30">
          <text class="gray">充值账户</text>
          <text>钱包账户</text>
        </view>
        <view class="u-flex u-row-between u-margin-bottom-30">
          <text class="gray">转账网络</text>
          <text>{{item.chainName}}</text>
        </view>
        <view class="u-flex u-row-between u-margin-bottom-30">
          <text class="gray">地址</text>
          <u-link :under-line="true">{{item.memberId}}<image class="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAZCAYAAAA14t7uAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABWSURBVHgB7ZW5CQAgEARXsUxzI6sxMrdPxUxQxO8CYaeA4T5uFSaEmDIO0RBCTKzwkHZ0YhWbmwVVvLPDrv9bHsUUUzzB4CHt3+CMKe6p57YaTVvBWwBl2gwG+bOlvwAAAABJRU5ErkJggg==">
          </image></u-link>
        </view>
        <view class="u-flex u-row-between u-margin-bottom-30">
          <text class="gray">日期</text>
          <text>{{$u.timeFormat(item.createTime, 'yyyy-mm-dd hh:MM:ss')}}</text>
        </view>
        <view class="u-flex u-row-between u-margin-bottom-30">
          <text class="gray">备注</text>
          <text>{{item.remark}}</text>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
import HeadSlot from '../../components/head-slot/head-slot.vue'
export default {
  components: {
    HeadSlot
  },
  onLoad(e) { // 获取传递参数
    const {
      item
    } = e
    if (item) {
      this.item = JSON.parse(item)
    }
  },
  data() {
    return {
      item: {}
    }
  },
  computed: {
    i18n() {
      return this.$t('recharge')
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
  }
}
</script>


<style lang="scss" scoped>
page {
  height: 100vh;
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

</style>