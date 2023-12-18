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
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
					<scroll-view scroll-y style="width: 100%;" @scrolltolower="onreachBottom">
						<view class="content-list">
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
							name: 'Open orders'
						},
						{
							name: 'Historical position'
						}
				],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0 // swiper组件的current值，表示当前那个swiper-item是活动的
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
		}
	}
</script>

<style lang="scss">
.content-list{
	margin-top: 60rpx;
}
</style>
