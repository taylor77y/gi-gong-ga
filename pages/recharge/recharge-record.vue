<template>
	<view class="container">
		<xl-header :title="i18n.hbjl"></xl-header>
		<!-- <head-title :title="i18n.hbjl" /> -->
		<u-tabs bg-color="#fff" inactive-color="#8D9099" bar-height="8" bar-width="40" active-color="#D4B02D"
			:list="tagBtn" :is-scroll="false" :current="current" @change="change"></u-tabs>

		<view class="re-list" v-for="(item,index) in list" :key="index">
			<view class="item">
				<view class="item-top" v-if="current === 0">
					<view>{{item.currency}}</view>
					<view class="f-600">{{item.amount}}</view>
				</view>
				<view class="item-top" v-if="current === 1">
					<view>{{item.currency}}</view>
					<view class="f-600">{{item.balance}}</view>
				</view>
				<view class="item-top" v-if="current === 2">
					<view>{{stateInfo[item.balanceType]}}</view>
					<view class="f-600">{{item.fundsType === 1? "-":"+"}}{{item.balanceDifference}}</view>
				</view>
				<view class="item-top" v-if="current === 3">
					<view>{{ i18n.bgq }}</view>
					<view class="f-600">-{{item.currency}}:{{item.quantity}}</view>
				</view>
				<view class="item-top" v-if="current === 3">
					<view>{{ i18n.bgh }}</view>
					<view class="f-600">+{{item.currencyTarget}}:{{item.afterExchangeQuantity}}</view>
				</view>
				<view class="item-bottom" v-if="current === 0">
					<view>{{item.createTime|yndhms('M')}}</view>
					<view class="f-600" v-if="item.status === 1">{{ i18n.shenhezho }}</view>
					<view class="f-600" v-if="item.status === 2">{{ i18n.shtg }}</view>
					<view class="f-600" v-if="item.status === 3">{{ i18n.shbh }}</view>
				</view>
				<view class="item-bottom" v-if="current === 1">
					<view>{{item.extractTime}}</view>
					<view class="f-600" v-if="item.state === 'CREATE'">{{ i18n.shenhezho }}</view>
					<view class="f-600" v-if="item.state === 'PASS'">{{ i18n.shtg }}</view>
					<view class="f-600" v-if="item.state === 'REJECT'">{{ i18n.jujue }}</view>
				</view>
				<view class="item-bottom" v-if="current === 2">
					<view>{{item.createTime|yndhms('M')}}</view>
					<view class="f-600">{{item.currency}}</view>
				</view>
				<view class="item-bottom" v-if="current === 3">
					<view>{{item.createTime|yndhms('M')}}</view>
					<view class="f-600">{{ i18n.yiwancheng }}</view>
				</view>
			</view>
		</view>
		<u-loadmore v-show="total > 0" :status="loadmoreStatus" :load-text="loadText" @loadmore="loadmore" />
		<u-empty margin-top="100" v-if="list.length == 0" :text="i18n.ddwk" mode="order"></u-empty>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				list: [],
				page: 1,
				size: 20,
				loadmoreStatus: 'loadmore',
				loadText: {
					loadmore: '点击或上拉加载更多',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				maxPage: 1,
				total: 0,
			}
		},
		onLoad(e) {
			if (e && e.code) {
				this.current = Number(e.code)
				this.pageLoading()
				// this.change(Number(e.code))
			}
			this.loadText = this.i18n.loadText
		},
		onReachBottom() {
			// 上拉加载
			this.pullOnLoading()
		},
		onPullDownRefresh() {
			this.pageLoading()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		computed: {
			i18n() {
				return this.$t("recharge")
			},
			tagBtn() {
				return this.i18n.tagBtn1
			},
			stateInfo() {
				return this.i18n.stateInfo
			}
		},

		methods: {
			// 处理分页数据
			handlePageFn(total) {
				this.total = total
				this.maxPage = Math.ceil(this.total / this.size)
				if (this.maxPage > this.page) {
					this.loadmoreStatus = 'loadmore'
				} else {
					this.loadmoreStatus = 'nomore'
				}
			},
			loadmore() {
				// 点击加载更多
				this.pullOnLoading()
			},
			async pageLoading() {
				// 页面加载
				this.page = 1
				this.list = []
				this.total = 0
				this.handleCodeFn()
			},
			pullOnLoading() {
				if (this.maxPage > this.page) {
					this.page += 1
					this.loadmoreStatus = 'loading'
					this.handleCodeFn()
				} else {
					this.loadmoreStatus = 'nomore'
				}
			},
			change(e) {
				uni.showLoading();
				this.current = e;
				this.pageLoading()
				this.$nextTick(() => {
					setTimeout(() => {
						
						uni.hideLoading();
					}, 400);
				});
				
			},
			// 根据code 发送不同请求
			handleCodeFn() {
				switch (this.current) {
					case 0:
						this.getRechargeRecord();
						break;
					case 1:
						this.getWithdrawRecord();
						break;
					case 2:
						this.getAmountRecord();
						break;
					case 3:
						this.getSdRecord();
						break;
				}
			},
			getRechargeRecord() {
				let member = uni.getStorageSync('userId');
				this.$u.api.user.rechargeCurrencyRecord(member, this.page, this.size).then(res => {
					console.log("充值记录", res)
					
					this.list = this.list.concat(res.result.records)
					this.handlePageFn(res.result.total)
				})
			},
			getWithdrawRecord() {
				let member = uni.getStorageSync('userId');
				this.$u.api.user.withdraw_recording(member, this.page, this.size).then(res => {
					console.log("提现记录", res)
					this.list = this.list.concat(res.result.records)
					this.handlePageFn(res.result.total)
				})
			},
			getAmountRecord() {
				let member = uni.getStorageSync('userId');
				this.$u.api.user.getBalanceRecord(member, this.page, this.size).then(res => {
					console.log("资金记录", res)
					this.list = this.list.concat(res.result.result.records)
					console.log(this.list, '我是------------')
					this.handlePageFn(res.result.result.total)
				})
			},
			getSdRecord() {
				let obj = new Object();
				obj.member = uni.getStorageSync('userId');
				obj.page = 1;
				obj.size = 10;
				this.$u.api.sd.currencyExchangeRecord(obj).then(res => {
					console.log("闪兑记录", res)
					this.list = this.list.concat(res.result.records)
					this.handlePageFn(res.result.total)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.re-list {
			margin: 12rpx 24rpx;

			.item {
				margin-bottom: 30rpx;

				.f-600 {
					font-weight: 600;
				}

				.item-top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #000;
					font-size: 32rpx;
				}

				.item-bottom {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #8D9099;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
