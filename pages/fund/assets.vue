<template>
	<view class="home ">
		<view style="height: 16rpx;"></view>

		 <u-tabs bg-color="#fff" inactive-color="#8D9099" bar-height="4" bar-width="125" center  active-color="#5787E6"
			:list="assetsList" :is-scroll="false" :current="current" @change="change"></u-tabs>
        <view class="f-uid" v-show="current === 0 || current === 1" >UID: {{ list.uuid }}</view>
		<view class="assets-box" >
			 <overview v-show="current === 0" /> <!--overview-->
			<spots v-show="current === 1" :cnyPrice="cnyPrice" :usdtPrice="usdtPrice" :balances="balances"/><!--spots-->
      <contract v-show="current === 2 || current === 3" :current="current" /><!--contract-->
		</view>
		<tabar-com />
	</view>
</template>

<script>
	import overview from "./components/overview.vue" //overview页
	import spots from "./components/spots.vue"//spots 页面
	import contract from "./components/contract.vue"//合同页
	export default {
		components: {
			overview,
			spots,
      contract
		},
		data() {
			return {
        assetsList:[{name:'Overview',key:'Overview'}, {name:'Spot',key:'Spot'}, {name:'Contract',key:"Contract"},{name:'Financial',key:'Financial'},],
				isInput: false,
				current: 0,
				balances:[],
				cnyPrice:null,
				usdtPrice:null,
				timer:null,
				list: {}
			};
		},
		onHide() {
			if (this.timer) { //注销定时器
				console.log('注销定时器')
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		onUnload() {
			if (this.timer) { //注销定时器
				console.log('注销定时器')
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		onLoad() {
    let assetsList = this.assetsList.map(e=>{
      e.name = this.i18n.assetsList[e.key]
    })
		},
		onShow() {
			if (this.timer) { //注销定时器
				console.log('注销定时器')
				clearInterval(this.timer);
				this.timer = null;
			}
			let member = uni.getStorageSync('userId') || '';
			if(member) {
				this.getUserInfo(member);
			}
			this.getBalances(member);
			if(member) {
				this.timer = setInterval(() => {
					if(member) {
						this.getUserInfo(member);
						this.getBalances(member);
					} else {
						clearInterval(this.timer);
						this.timer = null;
					}
					
				}, 5000);
			}
			
		},
		methods: {
			
			change(e) {
				// this.$utils.showToast(this.$t('setting').zwkf)
				this.current = e
			},
			getUserInfo(member){
				this.$u.api.user.getMember(member)
				.then(res => {
					this.list = res.result
					console.log(res)
					// console.log("用户信息",res)
				}).catch(err => {
					if(err.data.errorCode === 'SYS.0015') {
						uni.navigateTo({
								url:'/pages/login/login'
						})
						return
					}
				})
			},
			getBalances(member){
				this.$u.api.user.getBalanceList(member).then(res => {
					this.balances = res.result.balances;
					this.cnyPrice = res.result.cnyPrice;
					this.usdtPrice = res.result.usdtPrice;
				}).catch(err => {
					console.log(err)
					if(err.data.errorCode === 'SYS.0015') {
							uni.navigateTo({
									url:'/pages/login/login'
							})
							return
					}
				})
			}

		},
		computed: {
            i18n() {
            	return this.$t("assets")
            },
			tagBtn() {
				return this.i18n.tagBtn
			}

		}
	}
</script>

<style lang="scss">
	.home {
		//background: #F6F6F6;

		 height: 100%;
		.f-uid {
			padding: 12rpx 24rpx;
			font-size: 28rpx;
			font-weight: bold;
			display: flex;
			align-items: center;
		}
		.assets-box {
			background: #fff;
			border-radius: 40rpx 40rpx 0 0;
			padding: 40rpx 24rpx;
			

	}
	}
</style>
