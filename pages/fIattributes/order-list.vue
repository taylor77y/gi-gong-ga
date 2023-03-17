<template>
	<view class="container">

		<head-title :title="i18n.jyd" />
		<u-tabs bg-color="#fff" inactive-color="#8D9099" bar-height="8" bar-width="40" active-color="#D4B02D"
			:list="tagBtn" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="f-line-2"></view>
		<view v-if="list.length > 0">
			<fabi-order-list :list="list" />
		</view>

		<u-empty margin-top="100" v-if="list.length == 0" :text="i18n.ddwk" mode="order"></u-empty>
		<u-loadmore v-show="total > 0" :status="loadmoreStatus" :load-text="loadText" @loadmore="loadmore" />
	</view>
</template>

<script>
	import th from '../../common/locales/th';
	export default {
		data() {
			return {
				current: 0,
				list: [],
				page: 1,
				size: 10,
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
			this.getlist("NONPAYMENT")
			this.loadText = this.$t('recharge').loadText
		},
		computed: {
			i18n() {
				return this.$t("fack");
			},
			tagBtn() {
				return [{
						name: this.i18n.wwc
					},
					{
						name: this.i18n.ywc
					},
					{
						name: this.i18n.yqx
					},
				]
			},
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
			// 根据code 发送不同请求
			handleCodeFn() {
				switch (this.current) {
					case 0:
						this.getlist("NONPAYMENT");
						break;
					case 1:
						this.getlist("FINISH");
						break;
					case 2:
						this.getlist("CALLOFF");
						break;
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

			getlist(priceOrderStatus) {
				let obj = new Object();
				obj.userId = uni.getStorageSync("userId");
				obj.page = this.page;
				obj.size = this.size;
				obj.priceOrderStatus = priceOrderStatus;
				this.$u.api.fack.ownOrderList(obj).then(res => {
					this.list = this.list.concat(res.result.data)
					this.handlePageFn(res.result.total)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {}
</style>
