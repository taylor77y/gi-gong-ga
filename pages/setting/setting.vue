<template>
	<view class="container">
		<xl-header>
			<template #right>
				<view class="right">
					<!-- <image style="margin-right: 40rpx;" src="../../static/image/setting/1.png"></image> -->
					<image @click="goCustomer()" src="../../static/image/setting/2.png" style="width: 40rpx; height: 40rpx;"></image>
				</view>
			</template>
		</xl-header>
		<view class="user-box" v-if="loginCode">
			<view class="left" @click="getEdtUser()">
				<view class="user-img">
					<image :src="user.handLink ? baseURL+user.handLink : '../../static/image/fIattributes/30.png'">
					</image>
				</view>
				<view>
					<view class="title">{{user.phone}}</view>
					<view class="user-id">ID：{{user.uuid}}
						<!-- <image :src="'../../static/image/fIattributes/30.png'"></image> -->
					</view>
				</view>
			</view>
			<view class="right" @click="getAuthentication">
				<image src="../../static/image/setting/16.png"></image>
				{{user.cardState == 'PASS'? i18n.yrz : user.cardState === 'WAIT' ? i18n.shz:i18n.wrz}}
			</view>
		</view>
		<view class="no-user-box" v-else="loginCode">
			<view class="no-title">
				{{ i18n.hyldba }}
			</view>
			<view class="no-tips">
				{{ i18n.qqzdjypt }}
			</view>
			<view class="btn">
				<view @click="getLogin(0)">{{ i18n.zc }}</view>
				<view @click="getLogin(1)">{{ i18n.dl }}</view>
			</view>
		</view>
		<!-- <view class="clause-box">
			<view class="left line-1">
				<image src="../../static/image/setting/17.png"></image>{{ i18n.ptyh }}
			</view>
			<view class="right">
				{{ i18n.syxzk }}
				
			</view>

		</view> -->
		<view style="height: 40rpx;"></view>
		<view class="set-list">
			<view class="item" @click="getPath(item.path)" :class="{ 'f-border': item.border }"
				v-for="(item, index) in listInfo" :key="index">
				<view class="left">
					<image :src="item.img" /> {{ item.name }}
				</view>
				<view class="right">
					<!-- <view class="gift" v-if="index === 1">
						<image src="../../static/image/setting/9.png"></image> {{ i18n.yq }}1BTC
					</view> -->
					<view v-if="item.val" class="set-name">
						{{ item.val }}
					</view>
					<!-- <view v-if="item.isNews" class="dot-box"></view> -->
					<!-- <view v-if="index === 0">
						<u-switch active-color="#F5D45C" v-model="checked"></u-switch>
					</view> -->
					<!-- <view v-else>
						<image src="../../static/image/fIattributes/29.png"></image>
					</view> -->

				</view>
			</view>
		</view>
		<view class="set-btn" @click="signOut()" v-if="loginCode">
			{{ i18n.tcdl }}
		</view>
		<view class="tips">
			{{ i18n.qbyxlgbagzry }}
		</view>
		<view style="height: 30rpx;"></view>
	</view>
</template>

<script>
	import XlHeader from '../../components/xl-header/xl-header.vue'
	export default {
		data() {
			return {
				socket: this.KeFusocket,
				loginCode: false,
				checked: true,
				user: {},
				baseURL: uni.getStorageSync('ossUrl'),
				listInfo:[
					// {
					// 	name: '',
					// 	img: '../../static/image/setting/3.png',
					// 	border: true,
					// 	isNews: false
					// },
					// {
					// 	name: '',
					// 	img: '../../static/image/setting/4.png',
					// 	border: false,
					// 	isNews: false
					// },
					// {
					// 	name: '',
					// 	img: '../../static/image/setting/5.png',
					// 	border: false,
					// 	isNews: true
					// },
					{
						name: '',
						img: '../../static/image/setting/21.png',
						border: false,
						isNews: false,
						path: '/pages/setup/language',
						val: '中文简体'
					},
					{
						name: '',
						img: '../../static/image/setting/23.png',
						border: false,
						isNews: false,
						path: '/pages/setup/rate',
						val: 'US'
					},
					{
						name: '',
						img: '../../static/image/setting/22.png',
						border: false,
						isNews: false,
						path: '/pages/setup/about'
					},
					// {
					// 	name: '卡券中心',
					// 	img: '../../static/image/setting/6.png',
					// 	border: false,
					// 	isNews: false
					// },
					// {
					// 	name: '支付',
					// 	img: '../../static/image/setting/7.png',
					// 	border: false,
					// 	isNews: false
					// },
					// {
					// 	name: '礼品卡',
					// 	img: '../../static/image/setting/8.png',
					// 	border: false,
					// 	isNews: false
					// },
					// {
					// 	name: '我的红包',
					// 	img: '../../static/image/setting/9.png',
					// 	border: true,
					// 	isNews: false
					// },
					// {
					// 	name: '通知',
					// 	img: '../../static/image/setting/10.png',
					// 	border: false,
					// 	isNews: true
					// },
					{
						name: '',
						img: '../../static/image/setting/2.png',
						border: false,
						isNews: false,
						path: '/pages/kefu/customerService?type=service'
					},
					{
						name: '',
						img: '../../static/image/setting/11.png',
						border: false,
						isNews: false,
						path: '/pages/payment/index'
					},
					{
						name: '',
						img: '../../static/image/setting/12.png',
						border: false,
						isNews: false,
						path: '/pages/setup/security'
					},
					// {
					// 	name: '设置',
					// 	img: '../../static/image/setting/13.png',
					// 	border: true,
					// 	isNews: false,
					// 	path: '/pages/setup/index'
					// },
					// {
					// 	name: '帮助中心',
					// 	img: '../../static/image/setting/14.png',
					// 	border: false,
					// 	isNews: false,
					// 	path: '/pages/setup/help'
					// },
					// {
					// 	name: '',
					// 	img: '../../static/image/setting/15.png',
					// 	border: false,
					// 	isNews: false
					// }
				
				
				]
			}
		},
		onLoad() {
			if (uni.getStorageSync('userId')) {
			 this.getUserInfo();
				this.loginCode = true
			} else {
				this.loginCode = false
			}

		},
		onShow() {
			const arr = this.i18n.listInfo
			for(let i=0; i<arr.length; i++) {
				this.listInfo[i].name = arr[i]
			}
			let rate = uni.getStorageSync('rate');
			let lauInfo = uni.getStorageSync('lauInfo');
			if(rate != ''){
				this.listInfo[1].val = rate.currencyName
			}else{
				this.getHY();
			}
			if(lauInfo){
				this.listInfo[0].val = lauInfo;
			} else {
				this.listInfo[0].val = 'English'
			}
		},
		computed: {
			i18n() {
			    return this.$t("setting");
			}
			// listInfo() {
			// 	return [{
			// 			name: '币安Pro',
			// 			img: '../../static/image/setting/3.png',
			// 			border: true,
			// 			isNews: false
			// 		},
			// 		{
			// 			name: '超级返利',
			// 			img: '../../static/image/setting/4.png',
			// 			border: false,
			// 			isNews: false
			// 		},
			// 		{
			// 			name: '任务中心',
			// 			img: '../../static/image/setting/5.png',
			// 			border: false,
			// 			isNews: true
			// 		},
			// 		{
			// 			name: '多语言',
			// 			img: '../../static/image/setting/21.png',
			// 			border: false,
			// 			isNews: false,
			// 			path: '/pages/setup/language',
			// 			val: '中文简体'
			// 		},
			// 		{
			// 			name: '汇率',
			// 			img: '../../static/image/setting/23.png',
			// 			border: false,
			// 			isNews: false,
			// 			path: '/pages/setup/rate',
			// 			val: 'US'
			// 		},
			// 		{
			// 			name: '关于我们',
			// 			img: '../../static/image/setting/22.png',
			// 			border: false,
			// 			isNews: false,
			// 			path: '/pages/setup/about'
			// 		},
			// 		// {
			// 		// 	name: '卡券中心',
			// 		// 	img: '../../static/image/setting/6.png',
			// 		// 	border: false,
			// 		// 	isNews: false
			// 		// },
			// 		// {
			// 		// 	name: '支付',
			// 		// 	img: '../../static/image/setting/7.png',
			// 		// 	border: false,
			// 		// 	isNews: false
			// 		// },
			// 		// {
			// 		// 	name: '礼品卡',
			// 		// 	img: '../../static/image/setting/8.png',
			// 		// 	border: false,
			// 		// 	isNews: false
			// 		// },
			// 		// {
			// 		// 	name: '我的红包',
			// 		// 	img: '../../static/image/setting/9.png',
			// 		// 	border: true,
			// 		// 	isNews: false
			// 		// },
			// 		// {
			// 		// 	name: '通知',
			// 		// 	img: '../../static/image/setting/10.png',
			// 		// 	border: false,
			// 		// 	isNews: true
			// 		// },
			// 		{
			// 			name: '收款方式',
			// 			img: '../../static/image/setting/11.png',
			// 			border: false,
			// 			isNews: false,
			// 			path: '/pages/payment/index'
			// 		},
			// 		{
			// 			name: '安全',
			// 			img: '../../static/image/setting/12.png',
			// 			border: false,
			// 			isNews: false,
			// 			path: '/pages/setup/security'
			// 		},
			// 		// {
			// 		// 	name: '设置',
			// 		// 	img: '../../static/image/setting/13.png',
			// 		// 	border: true,
			// 		// 	isNews: false,
			// 		// 	path: '/pages/setup/index'
			// 		// },
			// 		{
			// 			name: '帮助中心',
			// 			img: '../../static/image/setting/14.png',
			// 			border: false,
			// 			isNews: false,
			// 			path: '/pages/setup/help'
			// 		},
			// 		{
			// 			name: '分享币安APP',
			// 			img: '../../static/image/setting/15.png',
			// 			border: false,
			// 			isNews: false
			// 		}


			// 	]
			// }
		},
		methods: {
			getAuthentication() {
				if (this.user.cardState !== 'PASS' && this.user.cardState !== 'WAIT') {
					uni.navigateTo({
						url: `/pages/authentication/authentication`
					})
				}
			},
			getHY(){
				this.$u.api.fack.getCurrencyConfiguration().then(res=>{
					this.listInfo[1].val = res.result[0].currencyName
					this.$store.commit('setRate', res.result[0])
				})
			},
			goCustomer() {
				uni.navigateTo({
					url: `/pages/kefu/customerService?type=service`
				})
			},
			getLogin(index) {
				const temp = {
					0: '/pages/login/register',
					1: '/pages/login/login'
				}
				uni.navigateTo({
					url: temp[index]
				})
			},
			getUserInfo() {
				let member = uni.getStorageSync('userId');
				this.$u.api.user.getMember(member).then(res => {
					console.log("用户信息", res)
					this.user = res.result;
				})
			},
			getEdtUser() {
				uni.navigateTo({
					url: `/pages/setup/edt-user`
				})
			},
			getPath(path) {
				
				if (path) {
					uni.navigateTo({
						url: path
					})
				} else {
					this.$utils.showToast(this.i18n.zwkf)
				}

			},
			async signOut() {
				const ret = await this.$utils.showModal(this.$t("common.hint"), this.i18n.qdtcdlm)
				if (!ret) return
				this.$utils.showToast(this.i18n.tcdlcg)
				if (this.socket.connState === 2) {
					this.socket.destroy()
				}
				let testid = ''
				if (uni.getStorageSync('testId')) {
					testid = uni.getStorageSync('testId')
					console.log('我触发了！')
				
				}
				this.$store.commit('deleteUser')
				uni.clearStorageSync();
				uni.setStorageSync('testId', testid)
				setTimeout(() => {
					uni.navigateTo({
						url: `/pages/index/index`
					})
				}, 1200)
			},
			back() {
				uni.navigateBack(1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.tips {
			// margin-top: 10rpx;
			color: #8D9099;
			font-size: 22rpx;
			margin: 24rpx;
		}

		.set-btn {
			margin: 24rpx;
			height: 76rpx;
			border-radius: 6rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #1F222B;
			font-size: 32rpx;
			font-weight: 500;
			background: #EBECF0;
		}

		.set-list {
			margin: 0 24rpx;

			.f-border {
				border-bottom: 1rpx solid #EBEBEB;
			}

			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 32rpx;
				color: #1F222B;
				font-weight: 600;
				padding: 40rpx 0;

				.left {
					display: flex;
					align-items: center;

					& image {
						width: 48rpx;
						height: 48rpx;
						margin-right: 24rpx;
					}
				}

				.right {
					display: flex;
					align-items: center;
                    .set-name {
						color: #B0B3BA;
						font-size: 28rpx;
						margin-right: 14rpx;
					}
					.gift {
						display: flex;
						align-items: center;
						background: #F6F6F6;
						border-radius: 2rpx;
						padding: 4rpx 6rpx;
						color: #D4B02D;
						font-size: 22rpx;
						margin-right: 12rpx;

						& image {
							width: 22rpx;
							height: 22rpx;
							margin-right: 6rpx;
						}
					}

					.dot-box {
						width: 16rpx;
						height: 16rpx;
						border-radius: 50%;
						margin-right: 40rpx;
						background: #E45360;
					}

					& image {
						width: 13rpx;
						height: 24rpx;
					}
				}
			}
		}

		.clause-box {
			margin: 40rpx 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-radius: 10rpx;
			padding: 24rpx;
			color: #D4B02D;
			font-size: 26rpx;
			background: #F6F6F6;

			.left {
				margin-right: 20rpx;
				& image {
					width: 40rpx;
					height: 36rpx;
					margin-right: 14rpx;
				}
			}

			.right {
				& image {
					width: 13rpx;
					height: 24rpx;
					margin-left: 24rpx;
				}
			}
		}

		.no-user-box {
			margin: 0 24rpx;

			.no-title {
				font-size: 42rpx;
				color: #000;
			}

			.no-tips {
				font-size: 24rpx;
				color: #A0A3AA;
			}

			.btn {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 24rpx 0;

				view {
					width: 50%;
					color: #000;
					font-size: 32rpx;
					font-weight: 500;
					padding: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #ebecef;
					border-radius: 6rpx;

					&:nth-of-type(1) {
						margin-right: 24rpx;
					}

					&:nth-of-type(2) {
						background: #f6d657;
					}
				}
			}
		}

		.user-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-left: 24rpx;

			.left {
				display: flex;
				align-items: center;

				.title {
					color: #1F222B;
					font-size: 38rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}

				.user-id {
					color: #A0A3AA;
					font-size: 26rpx;

					& image {
						width: 24rpx;
						height: 24rpx;
						margin-left: 20rpx;
					}
				}

				.user-img {
					width: 104rpx;
					height: 104rpx;
					border: 1rpx solid #707070;
					border-radius: 50%;
					margin-right: 20rpx;

					& image {
						width: 104rpx;
						height: 104rpx;
						border-radius: 50%;

					}
				}

			}

			.right {
				background: #E4F5ED;
				border-radius: 34rpx 0 0 34rpx;
				// width: 150rpx;
				padding-left: 24rpx;
				height: 68rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				color: #5EBA89;

				& image {
					width: 28rpx;
					height: 30rpx;
					margin-right: 8rpx;
				}
			}
		}

		.f-head {
			margin: 56rpx 24rpx 70rpx 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;


			.icon_1 {
				width: 34rpx;
				height: 28rpx;
			}

			.right {
				& image {
					width: 44rpx;
					height: 44rpx;
				}
			}
		}



	}
</style>
