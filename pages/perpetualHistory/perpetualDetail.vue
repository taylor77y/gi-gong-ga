<template>
	<view class="perpetual-history">
		<head-slot>
			<template #middle><text>订单详情<!-- {{i18n.uHistory}} --></text></template>
		</head-slot>
		<view class="content-header">
			<view class="u-flex u-flex-col u-p-40 border-b-gray">
				<view class="u-m-10 u-font-sm">盈亏金额(USDT)</view>
				<view class="u-m-10 u-font-40" :class="item.profit > 0 ? 'green': 'red'">{{item.profit}} ({{item.profitUp}})</view>
			</view>
			<view class="u-p-20  border-b-gray">
				<view class="u-flex u-row-between u-margin-bottom-30">
					<text class="gray">操作</text>
					<text class="font-weight-bold"><!-- 市价/ -->{{getTradeType(item.tradeType)}} {{item.pairsName}}</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-30">
					<text class="gray">状态</text>
					<text>{{item.orderState === 'CLOSEOUT' ? '已平仓' : '持仓'}}</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-30">
					<text class="gray">开仓金额</text>
					<text>{{item.amount}}</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-30">
					<text class="gray">可平金额</text>
					<text>{{item.usableControlHands * item.bPrice}}</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-30">
					<text class="gray">保证金</text>
					<text>{{item.margin}}</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-30">
					<text class="gray">手续费</text>
					<text>{{item.matchFee}}</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-30">
					<text class="gray">建仓成本</text>
					<text>{{item.kPrice}}</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-30">
					<text class="gray">平均价格</text>
					<text>2421.264</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-30">
					<text class="gray">订单号</text>
					<text>{{item.id}}</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-30">
					<text class="gray">开仓时间</text>
					<text>{{$u.timeFormat(item.createTime, 'yyyy-mm-dd hh:MM:ss')}}</text>
				</view>
				<view class="u-flex u-row-between u-margin-bottom-30">
					<text class="gray">平仓时间</text>
					<text>{{$u.timeFormat(item.settleTime, 'yyyy-mm-dd hh:MM:ss')}}</text>
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