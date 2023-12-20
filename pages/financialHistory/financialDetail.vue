<template>
	<view class="financia-history" style="height: 100%;">
		<head-slot>
			<template #middle><text>{{item.name}}<!-- {{i18n.history}} --></text></template>
		</head-slot>
		<view class="content-header">
			<view class="u-flex u-flex-col u-p-40 border-b-gray">
				<view class="u-m-10 u-font-sm">托管金额(USDT)</view>
				<view class="u-m-10 u-font-40">{{item.price}}</view>
			</view>
			<view class="u-p-20  border-b-gray">
				<view class="u-flex u-row-between u-margin-bottom-20">
					<text class="text-gray">托管时间</text>
					<text>{{$u.timeFormat(item.createTime, 'yyyy-mm-dd hh:MM:ss')}}</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-20">
					<text class="text-gray">当日收益</text>
					<text>{{item.todayMoney}} USDT</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-20">
					<text class="text-gray">已获收益</text>
					<text>{{item.accumulatedIncome}}</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-20">
					<text class="text-gray">剩余天数</text>
					<text>{{item.residueDay}}天</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-20">
					<text class="text-gray">赎回时间</text>
					<text>{{$u.timeFormat(item.finishValueDate, 'yyyy-mm-dd hh:MM:ss')}}</text>
				</view>
			</view>
			<view class="u-p-10  border-b-gray">
				<view class="u-flex u-row-between u-margin-bottom-20">
					<text class="text-gray">预期收益</text>
					<text>{{item.money}}</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-20">
					<text class="text-gray">日收益率</text>
					<text>{{item.rate}}</text>
				</view>
			</view>
			<view class="u-p-10  border-b-gray">
				<view class="u-flex u-row-between u-margin-bottom-20">
					<text class="text-gray">起息时间</text>
					<text>{{$u.timeFormat(item.valueDate, 'yyyy-mm-dd')}}</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-20">
					<text class="text-gray">到期时间</text>
					<text>{{$u.timeFormat(item.finishValueDate, 'yyyy-mm-dd')}}</text>
				</view>
			</view>
			<view  class="u-abso u-p-40" style="bottom: 0; width: 100%;">
				<u-button size="default" type="primary" @click="onRedemption">我要赎回</u-button>
			</view>
			
			<!-- <button class="button_2 flex-col" @click="onClick_1">
			  <text class="text_9">我要赎回</text>
			</button> -->
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
			const { item } = e
			if (item) {
				this.item = JSON.parse(item)
			}
			 // console.log(this.item)
			// uni.navigateBack()
		},
		data() {
			return {
				item: {}
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
			onRedemption() { // 赎回
				console.log('赎回')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text-gray {
		color: #6F7784!important;
	}
	.text-green { // 绿色
		color: #5EBA89!important;
	}
	.border-b-gray{
		border-bottom: 8rpx solid #f1f1f1;
	}
</style>