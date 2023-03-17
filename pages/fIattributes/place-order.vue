<template>
	<view class="container">
		<view class="f-head">
			<image @click="back()" class="icon_1" referrerpolicy="no-referrer"
				src="/static/lanhu_querenmima/ps2495rpr92seqakcpyfbbjuasmb353tg5d13ee66-88f7-4c8e-80de-307ef55cf92f.png" />
			<!-- <view class="right">
				{{ sellingCode ? '出售':'购买'  }}USDT
			</view> -->
		</view>
		<view class="order-time">
			<view class="title">{{i18n.ddysc}}</view>
			<view class="time">
				{{i18n.zq}} <u-count-down separator-color="#D4B02D" :show-hours="false" font-size="28" color="#D4B02D"
					bg-color="#fff" :timestamp="timestamp"></u-count-down> {{i18n.nfkmj}}
			</view>
		</view>
		<view class="step-next">
			<view class="item" v-for="(item, index) in setpFn" :key="index">
				<view class="step-img">
					<image :src="item.img"></image>
					<view class="num" :class="{'f-1F222B': index === 0}">{{ index }}</view>
				</view>

				<view :class="{'f-1F222B': index === 0}">
					{{ item.text }}
				</view>
			</view>
		</view>
		<view class="merchant-box">
			<view class="merchant-name">
				<view class="left">
					<view class="m-icon"></view>{{order.storeName}}
					<view class="img1">
						<image src="../../static/image/fIattributes/8.png"></image>
					</view>
					<view class="img2">
						<image src="../../static/image/fIattributes/29.png"></image>
					</view>
				</view>
				<view class="right" @click="toKF()">
					<image src="../../static/image/fIattributes/28.png"></image> {{i18n.lxsj}}
				</view>
			</view>
			<view class="merchant-service">
				<view class="left">
					<view class="merchant-tips">
						<image src="../../static/image/fIattributes/31.png"></image>
						{{i18n.mjszhbzh}}
					</view>
					<view class="merchant-tips">
						<image src="../../static/image/fIattributes/31.png"></image>
						{{i18n.baztkf}}
					</view>
				</view>
				<view class="right">
					<image src="../../static/image/fIattributes/29.png"></image>
				</view>
			</view>
			<view class="clause-box">
				<image src="../../static/image/fIattributes/23.png"></image>
				{{i18n.barzfs}}
			</view>
			<view class="merchant-line"></view>
			<view class="order-info">
				<view class="title">
					<!-- <text>购买</text> USDT -->
				</view>
				<view class="item" v-for="(item, index) in orderList" :key="index">
					<view class="left">
						{{ item.name }}
					</view>
					<view class="right" :class="{ 'f-600': index === 0 }">
						{{ item.val }}
						<image @click="getCopy(item.val)" v-if="index === 3" src="../../static/image/fIattributes/30.png"></image>
					</view>
				</view>
			</view>
			<view class="merchant-line"></view>
			<view class="payment-method">{{i18n.fkfs}}</view>
			<view class="bank-box">
				<view class="zfb">{{i18n.zfb}}</view>
				<view class="wx">{{i18n.wx}}</view>
				<view class="yhk">{{i18n.yhk}}</view>
			</view>
			<view class="btn-box" v-if="order.userDirection === 'BUY'">
				<view class="left" 
					v-if="order.status === 'NONPAYMENT'" 
					@click="showSpec = true">{{i18n.qxdd}}</view>
				<view class="right" v-if="order.status === 'NONPAYMENT'"  
				@click="goPath()">{{i18n.qzf}}</view>
			<!-- 	<view class="left"
					v-if="order.status === 'PAYMENT' || order.status === 'FINISH'">申诉</view> -->
				<!-- <view class="right" v-if="order.status === 'PAYMENT'">等待放币</view> -->
			</view>
			<view class="btn-box" v-if="order.userDirection === 'SELL'">
				<view class="left" v-if="order.status === 'NONPAYMENT'" >{{i18n.ddfb}}</view>
			</view>
		</view>
		<fabi-cancel-popup :show-spec.sync="showSpec" :oId="order.orderPriceId"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSpec: false,
				// current: 0,	
				timestamp: 900,
				orderList: [{
						name: '数量',
						val: '11'
					},
					{
						name: '总额',
						val: '22'
					},
					{
						name: '单价',
						val: '3213'
					},
					{
						name: '订单号',
						val: '2222222'
					}
				],
				oid:"",
				timer:null,
				user:{},
				order:{}
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
		},
		onLoad(e) {
			if (this.timer) { //注销定时器
				console.log('注销定时器')
				clearInterval(this.timer);
				this.timer = null;
			}
			if (e && e.order) {
				let orderPriceId = e.order;
				this.oid = orderPriceId;
				this.getDes(orderPriceId);
				this.getOrderEndTime(orderPriceId)
				this.getUserInfo();
				this.timer = setInterval(() => {
					this.getDes(this.oid);
					this.getUserInfo();
				}, 5000);
				
			}
		},
		destroyed() {
		    console.log('我离开了 ')	
		},
		computed: {
			i18n() {
				return this.$t("fack");
			},
			setpFn() {
				return [{
						img: '../../static/image/fIattributes/26.png',
						text: this.i18n.ddysc
					},
					{
						img: '../../static/image/fIattributes/27.png',
						text: this.i18n.xmjfk
					},
					{
						img: '../../static/image/fIattributes/27.png',
						text: this.i18n.ddfx
					}
				]
			}
		},
		methods: {
			getCopy(index) {
			    uni.setClipboardData({
			        data: index,
			        success:() => {
			            console.log('success');
			        }
			    })	
			},
			getUserInfo() {
				let member = uni.getStorageSync('userId');
				this.$u.api.user.getMember(member).then(res => {
					console.log("用户信息", res)
					this.user = res.result;
				})
			},
			toKF(){
				let obj = new Object();
				obj.userName = this.user.bankUserName;
				obj.userPhone = this.user.phone;
				obj.orderId = this.oid;
				obj.uuid=this.user.uuid;
				obj.code=1;
				obj.sysId=this.user.sysId;
				uni.navigateTo({
					url:`/pages/kefu/customerService?type=${this.order.storeId}&item=${JSON.stringify(obj)}`
				})
			},
			getOrderEndTime(id){
				let member = uni.getStorageSync('userId')
				this.$u.api.mhy.orderEndTime(id,member).then(res=>{
					console.log("结束时间",res.result)
					let stm = res.result.orderEndTime - res.result.nowTime
					if(stm >= 0){
						this.timestamp = Number(stm/100);
					}else{
						this.timestamp = 0;
					}
				})
			},
			getDes(oid){
				let member = uni.getStorageSync('userId')
				this.$u.api.fack.orderDetails(oid,member).then(res=>{
					let order = res.result;
					console.log("订单",order)
					let arr = [];
					arr.push({
						name: this.i18n.sl,
						val: order.num
					})
					arr.push({
						name: this.i18n.ze,
						val: order.num
					})
					arr.push({
						name: this.i18n.dj,
						val: order.price
					})
					arr.push({
						name: this.i18n.ddh,
						val: order.id
					})
					this.orderList = arr
					this.order = order;
				})
			},
			goPath() {
				let obj = Object();
				obj.priceOrderId = this.order.id;
				obj.userId = uni.getStorageSync("userId");
				obj.payType = "BANKCARD"
				this.$u.api.fack.payment(obj).then(res => {
					console.log("返回结果", res)
					if (res.status === "SUCCEED") {
						uni.navigateTo({
							url: `/pages/fIattributes/payment`
						})
					}else{
						this.$utils.showToast(res.errorMessage)
					}
				})
			},
			back() {
				uni.navigateBack(1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background: #F6F6F6;

		.merchant-box {
			margin-top: 32rpx;
			background: #fff;
			border-radius: 40rpx 40rpx 0 0;
			padding: 40rpx 24rpx;

			.btn-box {
				display: flex;
				align-items: center;
				margin: 32rpx 0;

				.left {
					background: #EBECF0;
					border-radius: 6rpx;
					width: 260rpx;
					height: 76rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 22rpx;
					color: #1F222B;
					font-size: 32rpx;
					font-family: 600;
				}

				.right {
					background: #F5D45C;
					border-radius: 6rpx;
					width: 60%;
					height: 76rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					color: #1F222B;
					font-size: 32rpx;
					font-family: 600;
				}
			}

			.bank-box {
				display: flex;
				align-items: center;
				color: #8D9099;
				font-size: 22rpx;

				.zfb {
					position: relative;
					margin-left: 14rpx;
					margin-right: 40rpx;

					&::before {
						content: "";
						width: 6rpx;
						height: 20rpx;
						position: absolute;
						bottom: 23%;
						left: -14rpx;
						background: #2680EB;
						border-radius: 70rpx;
					}
				}

				.wx {
					position: relative;
					margin-left: 14rpx;
					margin-right: 40rpx;

					&::before {
						content: "";
						width: 6rpx;
						height: 20rpx;
						position: absolute;
						bottom: 23%;
						left: -14rpx;
						background: #5EBA89;
						border-radius: 70rpx;
					}
				}

				.yhk {
					position: relative;
					margin-left: 14rpx;
					margin-right: 40rpx;

					&::before {
						content: "";
						width: 6rpx;
						height: 20rpx;
						position: absolute;
						bottom: 23%;
						left: -14rpx;
						background: #F5D45C;
						border-radius: 70rpx;
					}
				}
			}

			.payment-method {
				color: #1F222B;
				font-size: 34rpx;
				font-weight: 600;
				margin: 24rpx 0;
			}

			.order-info {
				padding: 24rpx;

				.title {
					margin-bottom: 38rpx;
				}

				.item {
					margin-bottom: 38rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #8D9099;
					font-size: 26rpx;

					&:last-child {
						margin-bottom: 0;
					}

					.f-600 {
						font-size: 36rpx !important;
						font-weight: 600 !important;
					}

					.right {
						display: flex;
						align-items: center;
						color: #1F222B;

						& image {
							width: 32rpx;
							height: 32rpx;
							margin-left: 14rpx;
						}
					}
				}
			}

			.merchant-line {
				height: 10rpx;
				background: #F6F6F6;
				margin: 0 -24rpx;
			}

			.clause-box {
				background: #FCFAED;
				border-radius: 10rpx 10rpx 0 0;
				display: flex;
				align-items: center;
				padding: 24rpx;
				color: #D4B02D;
				font-size: 24rpx;
				margin-bottom: 30rpx;

				& image {
					width: 26rpx;
					height: 26rpx;
					margin-right: 14rpx;
				}
			}

			.merchant-name {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;
					color: #1F222B;
					font-size: 26rpx;
					font-weight: bold;

					.m-icon {
						width: 30rpx;
						height: 30rpx;
						border-radius: 50%;
						background: linear-gradient(to right, #F9DB6F, #EDBE4D);
						color: #fff;
						font-size: 20rpx;
						font-family: 500;
						margin-right: 14rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.img1 {
						margin: 0 10rpx;

						& image {
							width: 20rpx;
							height: 22rpx;
						}
					}

					.img2 {
						margin: 0 10rpx;

						& image {
							width: 13rpx;
							height: 24rpx;
						}
					}

				}

				.right {
					display: flex;
					align-items: center;
					background: linear-gradient(to left, #FFFFFF, #F8E9BD);
					border-radius: 26rpx 26rpx 0 26rpx;
					padding: 9rpx 24rpx;
					border: 2rpx solid #F2DE82;

					& image {
						width: 34rpx;
						height: 34rpx;
						margin-right: 14rpx;
					}
				}
			}

			.merchant-service {
				margin: 24rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {

					.merchant-tips {
						display: flex;
						align-items: center;
						margin-bottom: 24rpx;

						& image {
							width: 28rpx;
							height: 28rpx;
							margin-right: 24rpx;
						}
					}
				}

				.right {
					& image {
						width: 13rpx;
						height: 24rpx;
					}
				}
			}
		}

		.f-1F222B {
			color: #1F222B !important;
		}

		.step-next {
			margin: 32rpx 24rpx;
			display: flex;

			.item {
				width: 33.33%;
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #8D9099;
				font-size: 24rpx;

				.step-img {
					position: relative;

					.num {
						position: absolute;
						top: 9%;
						left: 43%;
						font-size: 36rpx;
						color: #B0B3BA;
						font-weight: bold;
					}
				}
			}

			& image {
				width: 230rpx;
				height: 64rpx;
				margin-bottom: 14rpx;
			}
		}

		.order-time {
			background: #fff;
			padding: 24rpx;
			color: #1F222B;
			font-size: 28rpx;

			.title {
				font-size: 44rpx;
				font-weight: 600;
			}

			.time {
				display: flex;
				align-items: center;
			}
		}

		.f-head {
			padding: 56rpx 0 70rpx 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			.icon_1 {
				width: 34rpx;
				height: 28rpx;
				position: absolute;
				left: 24rpx;

			}

			.right {
				font-size: 36rpx;
				color: #1F222B;
				font-weight: 500;
			}
		}
	}
</style>
