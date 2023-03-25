<template>
  <view class="detailsBox">
    <head-slot>
      <template #middle><text>{{i18n.dingdanxiangqing}}</text></template>
    </head-slot>
      <view class="detailsTitle">
        <view class="detailsTitleList text">{{i18n.yingkuijine}}</view>
        <view class="detailsTitleList amount"  :class="{'left1': list.profit < 0 }"  >{{list.profit + `   (${list.profitUp })`}}</view>
      </view>

      <view class="detailsListBox">
        <view class="detailsList">
          <view class="detailsListItem title">{{i18n.caozuo}}</view>
          <view class="detailsListItem">{{i18n.zhuangtai}}</view>
          <view class="detailsListItem">{{i18n.kaichangjine}}</view>
          <view class="detailsListItem">{{i18n.kepingjine}}</view>
          <view class="detailsListItem">{{i18n.baozhengjin}}</view>
          <view class="detailsListItem">{{i18n.shouxufei}}</view>
          <view class="detailsListItem">{{i18n.jianchangchengben}}</view>
          <view class="detailsListItem">{{i18n.pingchangjiage}}</view>
          <view class="detailsListItem">{{i18n.dingdanhao}}</view>
          <view class="detailsListItem">{{i18n.kaichangshijian}}</view>
          <view class="detailsListItem">{{i18n.pingchangshijian}}</view>
        </view>

        <view class="detailsList right">
          <view class="detailsListItem title">{{ type }}{{list.pairsName}}</view>
          <view class="detailsListItem"  style="color : red">{{ list.orderState ? i18n.ypc: '-'}}</view>
          <view class="detailsListItem">{{list.amount || 0.00}}</view>
          <view class="detailsListItem">{{list.amount || 0.00}}</view>
          <view class="detailsListItem">{{list.margin || 0.00}}</view>
          <view class="detailsListItem">{{list.matchFee || 0.00}}</view>
          <view class="detailsListItem">{{list.kPrice|| 0.00}}</view>
          <view class="detailsListItem">{{list.bPrice || 0.00}}</view>
          <view class="detailsListItem">{{list.id || '-'}}</view>
          <view class="detailsListItem">{{list.createTime || '-'}}</view>
          <view class="detailsListItem">{{list.updateTime || '-'}}</view>
        </view>
      </view>
  </view>
</template>

<script>
export default {
  name: 'details',
  props: {},
  data() {
    return {
      list : {},
    }
  },
  created() {
  },
  mounted() {
    const dataItem = JSON.parse(this.$route.query.data);
    this.getDetailsData(dataItem.id);
  },
  computed : {
    type () {
      return this.list.tradeType == 'OPEN_DOWN' ? this.i18n.kk :this.i18n.kd
    },
    i18n () {
      return this.$t('financial')
    }
  },
  methods: {
    //获取详情
    async getDetailsData(id){
      try {
        const res = await this.$u.api.contractNewInterface.getContractOrder(id);
        const list1 = res.result;
        const createDate = new Date(list1.createTime);//开始
        const settleTime = new Date(list1.settleTime);//更新
        const formCreateTime = createDate.toLocaleString('zh-CN'); // 将日期对象格式化为本地化日期时间字符串（输出中国标准时间格式）
        const formUpdateTime = settleTime.toLocaleString('zh-CN'); // 将日期对象格式化为本地化日期时间字符串（输出中国标准时间格式）
        list1.createTime = formCreateTime;
        list1.updateTime = formUpdateTime;
        this.list = list1;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
    .detailsBox {
      margin : 20rpx;
      .detailsTitle{
        width: 100%;
        .detailsTitleList {
          margin-top:40rpx ;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .text {
          font-size: 36rpx;
          color: #622a1d;
        }
        .amount {
          color: #f00056 ;
          font-size: 40rpx;
        }
        .left1 {
          color: #14D69F ;
        }
      }
      .detailsListBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10rpx;

        .detailsListItem{
          margin-top: 40rpx;
          font-size: 26rpx;
          color: #707070;
        }
        .title {
          font-size: 38rpx;
          font-weight: bolder;
        }
        .right {
          text-align: right !important;
        }
      }
    }
</style>