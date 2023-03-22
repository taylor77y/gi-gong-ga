<template>
	<view class="container">
		
		<head-title :title="$t('fack').qb" />
		<u-tabs bg-color="#fff" inactive-color="#8D9099" bar-height="8" bar-width="40" active-color="#D4B02D"
			:list="tagBtn" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view v-if="list.length > 0">
			<entrust-list :list="list" :mode="code" :state="state" :isCheDan="isCheDan" />
		</view>
		<u-empty margin-top="100" v-if="list.length == 0" :text="$t('kLine').zwgdsj" mode="order"></u-empty>
		<u-loadmore v-show="total > 0" :status="loadmoreStatus" :load-text="loadText" @loadmore="loadmore" />
	</view>
</template>
	
<script>
	export default {
		data() {
			return {
			   isCheDan: false,
			   list: [],
			   current: 0,
			   code: 1,
			   state:1,
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
			if(e && e.code){
				this.code = Number(e.code);
			}
			this.pageLoading()
			// this.change(this.current);
			this.loadText = this.$t('recharge').loadText
		},
		computed: {
			i18n() {
				return this.$t("record")
			},
			tagBtn() {	
				return this.i18n.tagBtn
			}
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
						this.showRecordsOne();
						break;
					case 1:
						this.showRecordsTwo();
						break;
					default:
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
			showRecordsOne(){
				this.state = 1;
				switch(this.code){
					case 1:
						this.getSecondContractRecordList(2);
						break;
					case 2:
						this.getNowList();
						break;
					case 3:
						this.getEntrustOrderList();
						break;
				}
			},
			showRecordsTwo(){
				this.state = 2;
				switch(this.code){
					case 1:
						this.getSecondContractRecordList(1);
						break;
					case 2:
						this.getHisList();
						break;
					case 3:
						this.getHisEntrustOrderList();
						break;
				}
			},
			//秒合约记录
			getSecondContractRecordList(type) {
				let member = uni.getStorageSync('userId');
				let page = this.page;
				let size = this.size;
				this.$u.api.mhy.getSecondContractRecord(member, page, size, type).then(res => {
					console.log("秒合约记录",res)
					this.list = this.list.concat(res.result.result.records)
					this.handlePageFn(res.result.result.total)
				})
			},
			/**
			 * 币币
			 */
			getHisList() {
				let obj = new Object();
				obj.member = uni.getStorageSync('userId')
				obj.pageNum = this.page
				obj.pageSize = this.size
				this.$u.api.bibi.getHistoryEntrust(obj).then(res => {
					let info = res.result.result;
					this.list = this.list.concat(info.records)
					this.handlePageFn(info.total)
				})
			},
			getNowList() {
				let member = uni.getStorageSync('userId')
				this.$u.api.bibi.getEntrustList(member).then(res => {
					this.list = res.result;
				})
			},
			/**
			 * 永续
			 */
			getEntrustOrderList(){
				let obj = new Object();
				obj.pairsName = "";
				obj.member = uni.getStorageSync('userId')
				this.$u.api.yx.getEntrustOrder(obj).then(res => {
					this.list = res.result;
				})
			},
			getHisEntrustOrderList(){
				let obj = new Object();
				obj.page = this.page;
				obj.size = this.size;
				obj.orderState = "FINAL";
				obj.member = uni.getStorageSync('userId')
				this.$u.api.yx.getHistoryOrders(obj).then(res => {
          console.info("🇨🇳🇨🇳:res --", res.result.result.records)
					this.list = this.list.concat(res.result.result.records)
					this.handlePageFn(res.result.result.total)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		
	}
</style>