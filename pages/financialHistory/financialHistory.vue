<template>
	<view class="financia-history">
		<head-slot>
			<template #middle><text>{{i18n.history}}</text></template>
		</head-slot>
		<view class="content-header">
			<u-tabs-swiper 
				active-color="#2c78f8" 
				bar-width="80" ref="tabs" 
				:list="tagBtn"
				:is-scroll="false" 
				inactive-color="#333"
				@change="tabsChange"
				></u-tabs-swiper>
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
					<scroll-view scroll-y style="width: 100%;" @scrolltolower="onreachBottom">
						<view class="content-list">
<!--              <block  v-for="(items, indexs) in item.dataSet" :key="indexs">-->
<!--                <view class="data-item">{{items}}</view>-->
<!--              </block>-->

							<u-empty text="Not record" mode="search"></u-empty>
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
		data() {
			return {
				list: [
						{
							name: 'Buy'
						},
						{
							name: 'Redeemed'
						},
						{
							name: 'Interest'
						}
				],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0 // swiper组件的current值，表示当前那个swiper-item是活动的
			};
		},
    computed : {
      i18n () {
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
        console.log(this.swiperCurrent)
        switch (this.swiperCurrent) {
          case 0:
            this.getFundOrderList(1);
            break;
          case 1:
            this.getFundOrderList(2);
            break;
          case 2:
            this.getFundOrderList();
            break;
          default:
            break;
        }
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

      async pageLoading() {
        // 页面加载
        this.page = 1
        // this.list = []
        this.total = 0
        this.handleCodeFn()
      },
      // 根据code 发送不同请求
      handleCodeFn() {


      },
      async getFundOrderList(type) {
        const userId = uni.getStorageSync('userId')
        const {status, result, errorMessage} = await this.$u.api.fundFinancing.getFundOrderByUserId(userId, type)
        if(status === 'SUCCEED') {
          console.log(result)
          this.list = result
        } else {
          this.$refs.uToast.show({
            title: errorMessage,
            type: 'error',
            // url: '/pages/login/login',
          })
        }
      },
		}
	}
</script>

<style lang="scss">
.content-list{
	margin-top: 60rpx;
}
</style>
