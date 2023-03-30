
<template>
  <view class="home-hot-list">
    <view class="title">{{ title }}</view>
    <view class="like-list">
      <view class="like-list-item" v-for="(item, index) in list" :key="index" @click="goToDetail(item.name)">
        <view class="d-flex-between-center f-title">
          {{ item.name }}
          <view :class="{'rate1': item.change_ratio < 0, 'rate': item.change_ratio >= 0}">
          {{ getChangeRatio(item.change_ratio) }}</view></view>
        <view class="money" :class="{red:item.change_ratio < 0}">{{ item.close }}</view>
        <view class="equivalent">≈ {{ rateConfig.mark }} {{ item.close }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    title: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      rateConfig: {
        mark: '$'
      },
      baseImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
      baseUrl: uni.getStorageSync('ossUrl')
    };
  },
  computed: {
    ...mapState({
      rate: state => state.rate || {}
    })
  },
  methods: {
    // 跳转到详情页
    goToDetail(name) {
      uni.navigateTo({
        url: `/pages/kLine/index?name=${name}&code=0`
      });
    },
    // 获取涨跌幅的文本
    getChangeRatio(changeRatio) {
      return `${changeRatio > 0 ? '+' : ''}${changeRatio}%`;
    }
  }
};
</script>

<style lang="scss" scoped>
	.home-hot-list {
		background: #fff;
		.title {
			font-size: 34rpx;
			color: #1F222B;
			font-weight: 500;
			margin-bottom: 14rpx;
		}

		.like-list {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding-bottom: 40rpx;
			border-bottom: 1rpx solid #F6F6F6;
			.like-list-item {
				padding: 20rpx;
                // background: #FAFAFA;
				border-radius: 10rpx;
				margin-right: 2%;
				width: 32%;
				max-width: 227rpx;
				&:last-child {
					margin-right: 0rpx;
				}
				.f-title {
					color: #8D9099;
					font-size: 24rpx;
					margin-bottom: 40rpx;
					& image {
						width: 32rpx;
						height: 32rpx;
						border-radius: 50%;
					}
				}
				.rate {
					font-size: 24rpx;
					color: #5EBA89;
				}
				.rate1 {
					font-size: 24rpx;
					color: #E45360;
				}
				
				.red{
					color:#e45360
				}
				.money {
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
					color:#5EBA89;
				}
				.equivalent {
					color: #8D9099;
					font-size: 22rpx;
				}
			}
		}
	}
</style>
