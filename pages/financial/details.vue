<template>
  <view class="detailsBox">
    <head-slot>
      <template #middle><text>{{i18n.dingdanxiangqing}}</text></template>
    </head-slot>
      <view class="detailsTitle">
        <view class="detailsTitleList text">{{i18n.yingkuijine}}</view>
        <view class="detailsTitleList amount">{{list.matchFee}}</view>
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
          <view class="detailsListItem title">{{i18n.duokaiTL}}</view>
          <view class="detailsListItem">{{list.tradeType || '-'}}</view>
          <view class="detailsListItem">{{list.matchPrice || 0.00}}</view>
          <view class="detailsListItem">0.00</view>
          <view class="detailsListItem">{{list.margin || 0.00}}</view>
          <view class="detailsListItem">{{list.takeFee || 0.00}}</view>
          <view class="detailsListItem">0.00</view>
          <view class="detailsListItem">{{list.price || 0.00}}</view>
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
  },
  onLoad: function (data) {

    let dataItem = JSON.parse(data.data);
    let newId = dataItem.id
    this.getDetailsData(newId)

  },
  computed : {
    i18n () {
      return this.$t('financial')
    }
  },
  methods: {
    //获取详情
    getDetailsData(id){
      this.$u.api.getContractorder.getContactLink(id).then(res=>{
        let list1 = res.result
        const createDate = new Date(res.result.createTime);//开始
        const updateDate = new Date(res.result.updateTime);//更新
        const formCreateTime = createDate.toLocaleString('zh-CN'); // 将日期对象格式化为本地化日期时间字符串（输出中国标准时间格式）
        const formUpdateTime = updateDate.toLocaleString('zh-CN'); // 将日期对象格式化为本地化日期时间字符串（输出中国标准时间格式）
        list1.createTime = formCreateTime
        list1.updateTime = formUpdateTime
        switch (list1.tradeType){
          case 'OPEN_UP':
            list1.tradeType = '多开'
            break;
          case 'OPEN_DOWN':
            list1.tradeType = '多空'
            break;
          case 'CLOSE_UP':
            list1.tradeType = '平多'
            break;
          case 'CLOSE_DOWN':
            list1.tradeType = '平空'
            break;
        }
        this.list = list1

      })
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