<template>
	<view class="customer" ref="chatbox">
		<head-title :title="type == 'service' ? i18n.kfzx:i18n.sjkf" />
		<section class="missionCenter fb-pd-24">
			<view class="chat-content">
				<view v-for="(item, index) in list" :key="index">
					<!-- 对方 -->
					<view v-if="userId != item.source">
						<view class="time">
							{{ item.createDateStr }}
						</view>
						<view class="word">
							<img :src="require('../../static/img/logo-app.png')" />
							<view class="info">
						
								<view class="info-content" v-if="item.type === 1" v-html="item.body"
									@click="handleCopy(item.body)"></view>
								<view class="info-content" @click="onClickImg(pathImg + item.body)" v-else>
									<u-image width="318" height="318" :src="pathImg + item.body" />
								</view>
							</view>
						</view>
					</view>
					<!-- 我的 -->
					<view v-else>
						<view class="time">
							{{ item.createDateStr }}
						</view>
						<view class="word-my">

							<view class="info">
								<view class="info-content" v-if="item.type === 1" v-html="item.body"></view>
								<view class="info-content" v-else>
									<u-image width="318" height="318" :src="pathImg + item.body" />
								</view>

							</view>
						
							<img src="../../static/image/setting/18.png" />
						</view>
					</view>
				</view>
				<view class="f-height" v-if="list.length === 0">
				<u-empty :text="i18n.zwxx" mode="list" v-if="list.length === 0"></u-empty>
				</view>
				<!-- <van-empty v-if="list.length === 0" :description="$t('api').zwxx" /> -->
			</view>
			<view class="hello_world">
				<button class="top" @click="toTop">
					<u-icon name="arrow-up" color="#000" />
				</button>
			</view>
			<view style="height: 40px;"></view>
			<view class="fb-footer">
				<!-- <van-uploader :after-read="afterRead">
					
				</van-uploader> -->
				<u-image @click="getPhoto" style="margin-right: 7px;" width="56" height="48"
					:src="require('../../static/img/1.png')" />

				<view class="f-input">
					<input type="text" :placeholder="i18n.qsr" class="marketCount" v-model="value"
						style="width:75%;background:none;color: #999;" placeholder-style="color: #999" />
				</view>
				<view class="btn" @click="getAdd()">
					{{ i18n.fs }}
				</view>
			</view>
		</section>
	</view>
</template>

<script>
	import {
		mapActions
	} from "vuex";
	export default {
		created() {


		},
		data() {
			return {
				screenHeight:0,
				value: '',
				list: [],
				
				socket: this.KeFusocket,
				type: 'service',
				code: 0,
				sysId: '',
				show: null,
				orderId: '',
				userName: '',
				uid: '',
			};
		},
		computed: {
			i18n() {
			    return this.$t("service");
			},
			userId() {
				return uni.getStorageSync('userId') || uni.getStorageSync('testId')
			},
			pathImg() {
				const path = uni.getStorageSync('ossUrl') + '/'
				return path
			}
		},
		updated() {
			this.$nextTick(() => {
				this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
			})
		},
		onShow() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight + 'px'
			this.testSum()
			
			this.socket.handleUrl(uni.getStorageSync('userId') || uni.getStorageSync('testId'))
			this.list = []
			if (this.socket.connState !== 2) {
			
				this.socket.doOpen();
				this.socket.on('open', (evt) => {
					this.getList(1)
				})
			} else {
				this.getList(3, this.type)
			}
			this.socket.on('login-ok', (evt) => {
				this.getList(3, this.type)
			})
			
			this.socket.on('message', (evt) => {
				// const res = JSON.parse(evt)
				const res = evt
				console.log(res)
				if (res.cmd === 4) {
					this.handleRecall(res.body.id)
					return
				}
				if (res.body.source != this.type && res.cmd === 2 && res.flag === 1) {
					return
				}
				// if (this.code === 0) {
				// 	this.setServiceMsg(res.cmd === 2 && res.flag === 1 ? true : false)
				// } else {
				// 	this.setBusinessMsg(res.cmd === 2 && res.flag === 1 ? true : false)
				// }
				if (res.cmd === 3) {
					this.list = res.body
				} else {
					this.list = this.list.concat(res.body) || []
				}
			})
		},
		onLoad(e) {
			this.type = e.type || 'service'
			console.log(e)
			if(e && e.item){
				let item = JSON.parse(e.item);
				this.code = item.code || 0
				this.sysId = item.sysId || ''
				this.orderId = item.orde || ''
				this.userName = item.userName || ''
				this.userPhone = item.userPhone || ''
				this.uid = item.uuid || ''
			}
			console.log(e, '我是客服')
		},
		mounted() {
            

		},
		beforeDestroy() {
			console.log('我离开了')
			// this.socket.destroy()
		},

		methods: {
			
			gotoLast(){
				uni.navigateBack(1)
			},
			onClickImg(img) {
				const environmentalList = [img]
				this.$imagePreview({
					images: environmentalList,
					index: 0,
					defaultOpt: {
						fullscreenEl: false,
						arrowEl: true,
						preloaderEl: true,
						bgOpacity: 0.85,
						showHideOpacity: true
					}
				})
			},
			// 选中当前复制
			// getRecall(index) {
			//   this.show = index
			// },
			handleCopy(text) {
				if (!text) {
					uni.showToast({
						title: 'fail',
						icon: 'none',
						duration: 2000
					});
					return 
				}

				this.$copyText(text).then(e => {
					uni.showToast({
						title: 'success',
						icon: 'none',
						duration: 2000
					});
				}, function(e) {
					uni.showToast({
						title: 'fail',
						icon: 'none',
						duration: 2000
					});

				})
			},
			// 虚拟游客id
			testSum() {
				if (!uni.getStorageSync('testId')) {
					let num = ''
					for (let i = 0; i < 8; i++) {
						num += Math.floor(Math.random() * 10);
					}
					uni.setStorageSync('testId', num)
				}
			},
			// 处理删除数据
			handleRecall(id) {
				this.list = this.list.filter(item => item.id !== id)
			},
			// 回到顶部
			toTop() {
				this.$nextTick(() => {
					this.$refs.chatbox.scrollTop = 0
				})

			},
			// 获取记录
			getList(cmd, body) {
				// cmd 1 登陆 3 记录
				const temp = {
					cmd,
					body
				}
				this.socket.send(temp)
			},
			handleFilter(type, name) {
				// type 1 消息 2 图片
				let body = {}
				if (this.code === 0) {
					body = {
						cmd: 2,
						body: {
							id: this.type || 1,
							body: name,
							type
						}
					}
				} else {
					const { sysId, orderId, userName, userPhone, uid } = this
					body = {
						cmd: 2,
						body: {
							id: this.type || 1,
							body: name,
							sysId,
							type, 
							transparent: `id=${orderId}&sid=${this.type}&userName=${userName}&userPhone=${userPhone}&uid=${uid}`
						},
						
					}
				}

				this.socket.send(body)
				// this.getList()
			},
			// 发送
			getAdd() {
				if (!this.value) {
					return
				}
				if (this.socket.connState !== 2) {
					return this.$utils.showToast(this.i18n.zwwl)
				}
				this.handleFilter(1, this.value)
				this.value = ''
				// if(this.list.length === 0) {
				// 	this.getList(3)
				// }
			},
			
			// 上传
			getPhoto() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.$utils.uploadPictures(res.tempFilePaths, 'user/headers', data => {
							console.log("=user===上传图片成功==",data)
							this.handleFilter(2, data.name)
							this.$forceUpdate()
						})
					},
				})
			},
			// afterRead(file) {
			// 	if (this.socket.connState !== 2) {
			// 		return this.Toast(this.$t("api.tip9"));
			// 	}
			// 	const img = file.content
			// 	this.$util.showLoading();
			// 	let fd = new FormData();
			// 	fd.append("file", this.$util.base64toFile(img))
			// 	axios.post(`upfile?member=${this.$store.state.userId}`,
			// 		fd
			// 	).then(res => {
			// 		if (res && res.state == "SUCCESS") {
			// 			this.handleFilter(2, res.name)
			// 			this.Toast(this.$t("toast.Uploaded_successfully"));
			// 		} else {
			// 			this.Toast(res.errorMessage);
			// 		}
			// 	})
			// }

		},

	};
</script>

<style lang="scss" scoped>
	.f-height {
		// height: 100vh;
	}
	.flex-column{
	  
	 }  
	// @import '@/assets/scss/theme.scss';

	.f-ccc {
		color: #fff !important;
	}
    .missionCenter {
		// background: #f6f6f6;
		// height: 100vh;
	}
	.customer {
        // background-image: url(../../static/img/chat/chatbg.png);
        // background-size: 100% 100%;
		// background: #040209;
		
		height: 100%;
		.top {
			position: fixed;
			width: 80rpx;
			height: 80rpx;
			bottom: 140rpx;
			right: 40rpx;
			border-radius: 50%;
			background-color: #F5D45C;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		// .fb-pd-24 {
		// 	padding: 48rpx 0;
		// }

		.time {
			font-size: 28rpx;
			color: #fff;
			text-align: center;
		}

		.chat-content {
			margin-top: 20rpx;
			width: 100%;
			// background: darkorange;

			overflow: auto;

			.word {
				display: flex;
				margin-bottom: 20rpx;

				img {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				.info {
					// width: 47%;
					margin-left: 20rpx;

					.info-content {
						word-break: break-all;
						// max-width: 45%;
						display: inline-block;
						padding: 20rpx;
						font-size: 26rpx;
						background: #fff;
						position: relative;
						margin-top: 16rpx;
						background: #E6E9EE;
						border-radius: 8rpx;
					}

					//小三角形
					.info-content::before {
						position: absolute;
						left: -16rpx;
						top: 16rpx;
						content: "";
						border-right: 20rpx solid #E6E9EE;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
					}
				}
			}

			.word-my {
				display: flex;
				justify-content: flex-end;
				margin-bottom: 20rpx;

				img {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				.info {
					width: 90%;
					// margin-left: 10px;
					text-align: right;
					// position: relative;
					display: flex;
					align-items: flex-end;
					flex-wrap: wrap;
					flex-direction: column;

					.info-content {
						word-break: break-all;
						// max-width: 45%;
						padding: 20rpx;
						font-size: 26rpx;
						// float: right;
						margin-right: 20rpx;
						position: relative;
						margin-top: 16rpx;
						background: #E6E9EE;
						text-align: left;
						border-radius: 8rpx;
					}

					.Sender_time {
						padding-right: 24rpx;
						padding-top: 10rpx;
						font-size: 24rpx;
						color: rgba(51, 51, 51, 0.8);
						margin: 0;
						height: 40rpx;
					}

					//小三角形
					.info-content::after {
						position: absolute;
						right: -16rpx;
						top: 16rpx;
						content: "";
						border-left: 20rpx solid #E6E9EE;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
					}
				}
			}
		}



		.btn {
			color: #000;
			width: 150rpx;
			height: 68rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 10rpx;
			background: #F5D45C;
			font-size: 28rpx;
		}

		.fb-footer {
			position: fixed;
			bottom: 0;
			padding: 16rpx 24rpx 40rpx 24rpx;
			background: #f6f6f6;
			display: flex;
			align-items: center;
			width: 100%;
			.f-input {
				display: flex;
				height: 68rpx;
				border-radius: 8rpx;
				align-items: center;
				padding-left: 20rpx;
				padding-right: 20rpx;
				color: #A9B2CD;
				font-size: 24rpx;
				background: #fff;
				width: 468rpx;
				margin-right: 14rpx;

				.marketCount {
					font-size: 24rpx;
					border: none;
				}
			}
		}

	}
</style>
