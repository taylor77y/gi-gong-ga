<template>
	<view class="home ">
		<view style="height: 56rpx;"></view>
		<view class="search-input-box">
			<view class="f-search-icon">
				<view class="f-icon">
					<image class="f-icon-img" src="../../static/image/home/2.png" />
				</view>
				<view>
					<input v-model="search" placeholder-style="color: #9399A2;background: #EBECF0" class="search-input"
						:placeholder="i18n.sshy" />
				</view>
			</view>

		</view>
		<u-tabs bg-color="#F6F6F6" inactive-color="#8D9099" bar-height="8" bar-width="40" active-color="#D4B02D"
			:list="tagBtn" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="list-box">
      <u-tabs  bar-height="8" bar-width="40" active-color="#D4B02D"
              :list="tagBtnFour" :is-scroll="false" :current="currentFour" @change="changeFour"></u-tabs>
			<!-- 	<view class="title d-flex-between-center">
				<view class="left">
					<home-list-btn :list="homeTitle" />
				</view>
				<view class="right">
					<image src="../../static/image/market/1.png" />
					<image src="../../static/image/market/2.png" />
				</view>
			</view> -->
			<view class="list-title-box">
				<view class="name">{{ i18n.cjl }}</view>
				<view class="money">{{ i18n.zxj }}</view>
				<view class="right">24h{{ i18n.zdf }}</view>
			</view>
			<!-- <home-list :code="1" :state="current" :list="coinQuotations" /> -->
		  <view>
        <view v-if="current == 1 || current == 2">
          <home-list-market :list="coinList" :state="0" :tabIndex="tabIndex"  />
        </view>
        <view v-else class="noDate">
          <image referrerpolicy="no-referrer" src="/static/image/assets/4.png" style="width: 154rpx;height: 154rpx;"/>
          <view class="text">{{i18n.zwsj}}</view>
        </view>

      </view>
		</view>
		<suspension-btn />
		<tabar-com />
	</view>
</template>

<script>
	export default {
		data() {
			return {
        src: 'https://cdn.uviewui.com/uview/album/1.jpg',
				search: '',
				curList: [],
				coinQuotations: [],
				current: 1,
				nameDom:"NAME_DOWN",
				sot:"SPOT",
				timer: null,
				newcoinQuotations: [],
        currentFour: 0,
		coinList:[],
		tabIndex:0
			};
		},
		onLoad() {
			this.getCoinData()
			// this.getCoinQuotationList(this.nameDom,this.sot);
			
		},
		watch: {
      async search() {
        await this.$nextTick()
        this.$u.throttle(() => {
          const Letter = new RegExp('[A-Za-z]+') //字母
          let arr = this.newcoinQuotations
          if (Letter.test(this.search)) {
            //字母搜索
            this.coinQuotations = arr.filter(array => {
              let flag = false
              if (array.pairsName) {
                let reg = new RegExp(this.search, 'i')
                flag = array.pairsName.match(reg)
              }
              return flag
            })
          }
        }, 200)
      }
		},
		onShow() {
			 if (this.timer) { //注销定时器
			 	console.log('注销定时器')
			 	clearInterval(this.timer);
			 	this.timer = null;
			 }
             this.timer = setInterval(()=> {
				// this.getMainCursList();
				// this.getCoinQuotationList(this.nameDom,this.sot);
				// this.changeFour(this.currentFour)
				this.getCoinData()
			}, 5000);
		},
		methods: {
			getCoinData(){
				this.$u.api.common.getCoinData().then(res => {
					// console.log('11111111',res)
					if(res.result){
						try{
							let data = JSON.parse(res.result)
							// console.log('getCoinData-data',data.data)
							if(data.code == 0){
								this.coinList = data.data
							}
						}catch(e){
							
						}
					}
				})
			},
			change(e) {
				this.current = e
				this.getMainCursList();
				switch (e) {
					case 0:
						this.getCoinQuotationList("NAME_DOWN","SPOT");
						break;
					case 1:
						this.getCoinQuotationList("NAME_DOWN","CONTRACT");
						break
					case 2:
						this.getCoinQuotationList("NAME_DOWN","CONTRACT");
						break;
				}
			},
      changeFour(e){
		  this.tabIndex = e
        this.currentFour = e
        // switch (e) {
        //   case 0:
        //     this.getTabFour("HOT","SPOT");
        //     break;
        //   case 1:
        //     this.getTabFour("updownDesc","CONTRACT");
        //     break
        //   case 2:
        //     this.getTabFour("updownAsc","CONTRACT");
        //     break;
        //   case 3:
        //     this.getTabFour("24","CONTRACT");
        //     break;
        // }
      },
			getMainCursList() {
				this.$u.api.quato.getMainCurs().then(res => {
					this.curList = res.result;
				})
			},
			getCoinQuotationList(NAME_DOWN, SPOT) {
				// console.log('请求了getCoinQuotationList',NAME_DOWN, SPOT)
				this.sot = SPOT
				this.$u.api.quato.getCoinQuotation(NAME_DOWN, SPOT).then(res => {
					console.log('getCoinQuotation',res)
					this.coinQuotations = res.result;
					this.newcoinQuotations = res.result
				})
			},
      //一直接口报错 没有这个接口
      // getTabFour(NAME_DOWN, SPOT) {
      //   this.sot = SPOT
      //   this.$u.api.quato.getTabFour(NAME_DOWN, SPOT).then(res => {
      //     this.coinQuotations = res.result;
      //     this.newcoinQuotations = res.result
      //   })
      // }
		},
		computed: {
			homeTitle() {
				return [
					'现货', '合约'
				]
			},
			tagBtn() {
				//  return [{
				// 		name: '自选'
				// 	},
				// 	{
				// 		name: '现货'
				// 	},
				// 	{
				// 		name: '合约',
				// 	},
				// 	{
				// 		name: '数据',
				// 	},
				// 	{
				// 		name: '板块',
				// 	}
				// ]	
				return this.i18n.tagBtn
			},

      tagBtnFour() {
        return this.i18n.tagBtnFour
      },

			i18n() {
				return this.$t("market")
			}

		},
		onHide() {
			if (this.timer) { //注销定时器
				console.log('注销定时器')
				clearInterval(this.timer);
				this.timer = null;
			}
			// this.$store.state.socket.removeListener('daymarket')
		},
		onUnload() {
			if (this.timer) { //注销定时器
				console.log('注销定时器')
				clearInterval(this.timer);
				this.timer = null;
			}
			// this.$store.state.socket.removeListener('daymarket')
		}

	}
</script>

<style lang="scss">
	.home {
		background: #F6F6F6;

		// height: 100vh;
		.list-box {
			background: #fff;
			border-radius: 40rpx 40rpx 0 0;
			padding: 40rpx 24rpx;

			.list-title-box {
				display: flex;
				align-items: center;
				color: #8D9099;
				font-size: 24rpx;
				margin-top: 36rpx;

				.name {
					width: 400rpx;
				}

				.money {}

				.right {
					margin-left: auto;
				}
			}

			.title {
				.left {
					width: 70%;
				}

				.right {
					& image {
						width: 38rpx;
						height: 38rpx;
						margin-right: 30rpx;
					}
				}
			}

		}

		.search-input-box {
			background: #EBECF0;
			border-radius: 32rpx;
			margin: 0 24rpx;

			.f-search-icon {
				display: flex;
				align-items: center;
				margin: 0 24rpx;

				.search-input {
					width: 600rpx;
					height: 62rpx;
					line-height: 62rpx;
					font-size: 28rpx;
					color: #9399A2;
					-webkit-touch-callout: none;
					-webkit-user-select: none;
				}

				.f-icon {
					margin-top: 8rpx;
					margin-right: 18rpx;

					& image {
						width: 36rpx;
						height: 36rpx;
					}
				}
			}

		}

    .noDate {
      height: 500rpx;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .text {
        color: #c0c4cc;
      }
    }
	}
</style>
