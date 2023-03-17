<template>
	<view class="container">
		<view class="f-head d-flex-between-center">
			<image @click="back()" class="icon_1" referrerpolicy="no-referrer"
				src="/static/lanhu_querenmima/ps2495rpr92seqakcpyfbbjuasmb353tg5d13ee66-88f7-4c8e-80de-307ef55cf92f.png" />
			<view class="right">
				<image @click="getPath()" src="../../static/image/recharge/1.png">
					<!-- <image src="../../static/image/recharge/2.png"> -->
			</view>
		</view>
		<view class="re-title">
			<view>{{ code === 1 ? i18n.chonzhi:i18n.tixian }}</view>
			<!-- <view class="right">
				<image src="../../static/image/recharge/3.png"> {{ i18n.jieshou }}
			</view> -->
		</view>
		<view class="address-box">
			<view class="qr-code">
               <image src="../../static/image/recharge/6.png" />
			</view>
            <view class="tips">
				{{ i18n.xzzwkhq }}{{ code === 1 ? i18n.chonzhi:i18n.tixian }}{{ i18n.dizhi }}
			</view>
		</view>
		
	
		<view class="recharge-addre">
			<view class="title">
				{{ i18n.czwl }}
			</view>
			<view class="quantity-box" @click="chaninCode = true">
				<input :disabled="true" v-model="num" placeholder-style="color: #9399A2;background: #F6F6F6" class="search-input"
					:placeholder="i18n.xzzw" />
				<view class="quant-img">
					<image src="../../static/image/recharge/4.png" />
				</view>	
			</view>

			
		</view>

        <u-popup :closeable="true" v-model="chaninCode" mode="bottom" border-radius="30" @close="chaninCode = false">
			<view class="chan-popup">
				<view class="tips">
				  <view>
					 <image src="../../static/image/fIattributes/23.png" />  
				  </view>	
				 	{{ i18n.chonzhitishi }}
				</view>
				<view @click="selctCurrent(index)" class="item" v-for="(item, index) in list" :key="index">
					{{ item.username }}
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import th from '../../common/locales/th'
	export default {
		data() {
			return {
				num: '',
				img:"",
				item: {},
				chaninCode: false,
				code: 1,
				list:[],item:{}
				
			}
		},
		computed: {
			i18n() {
				return this.$t("recharge")
			},
		   chain() {
			   return ['Ethereum (TRC20)','Ethereum (ERC20)']
		   }	
		},
		onLoad(e) {
			if(e && e.code){
				this.code = e.code === '1' ? 1:2
				let data = JSON.parse(e.item)
				this.$u.api.user.getRechargeWallet(data.type).then(res => {
					this.list = res.result.filter(item => item.username === 'ERC' || item.username === 'TRC') || [];
				})
				this.item = data
			}
		},
		methods: {
			getPath() {
				const temp = {
					1: 0,
					2: 1
				}
			   	uni.navigateTo({
			   		url: `/pages/recharge/recharge-record?code=${temp[this.code]}`
			   	})
			},
			selctCurrent(index) {
				this.chaninCode = false
				uni.navigateTo({
					url: `/pages/recharge/recharge?code=`+ this.code +`&item=` + JSON.stringify(this.item)
				})
			},
			back() {
				uni.navigateBack(1)
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.chan-popup {
			background: #fff;
			padding: 80rpx 24rpx;
			.item {
				padding: 36rpx 24rpx;
				background: #FAFAFA;
				border-radius: 6rpx;
				font-size: 32rpx;
				color: #1F222B;
				font-weight: 600;
				margin-bottom: 24rpx;
			}
			.tips {
				background: #FBF9EA;
				border-radius: 6rpx;
				padding: 24rpx;
				color: #D4B02D;
				font-size: 24rpx;
				display: flex;
				margin-bottom: 24rpx;
				view {
					width: 40rpx;
				}
				& image {
					width: 26rpx;
					height: 26rpx;
					margin-right: 14rpx;
				}
			}
		}
		.re-upload {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 40rpx;
		}

		.recharge-addre {
			padding: 0 20rpx;
			margin-top: 40rpx;

			.btns {
				padding: 40rpx 0;
			}

			.quantity-box {
				background: #F6F6F6;
				border-radius: 6rpx;
				padding: 20rpx 24rpx;
                position: relative;
				.search-input {
					width: 620rpx;
					// height: rpx;
					// line-height: 62rpx;
					font-size: 28rpx;
					color: #9399A2;
					-webkit-touch-callout: none;
					-webkit-user-select: none;
				}
				.quant-img {
					position: absolute;
					right: 20rpx;
					top: 14rpx;
					& image {
						width: 48rpx;
						height: 48rpx;
					}
					
				}
				
			}

			.tip1 {
				color: #E45360;
				font-size: 22rpx;
			}

			.title {
				color: #8D9099;
				font-size: 28rpx;
				margin-bottom: 10rpx;

				& image {
					width: 26rpx;
					height: 26rpx;
					margin-left: 14rpx;
				}
			}

			.num {
				display: flex;
				align-items: center;

				.left {
					width: 80%;
					font-size: 30rpx;
					color: #1F222B;
					font-weight: bold;
					// margin-right: 4%;
				}

				.right {
					width: 20%;
					display: flex;
					justify-content: flex-end;

					& image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}

		.rech-line {
			width: 100%;
			height: 1rpx;
			background: #F4F4F4;
		}

		.f-head {
			margin: 56rpx 0 70rpx 24rpx;

			.icon_1 {
				width: 34rpx;
				height: 28rpx;
			}

			.right {
				& image {
					width: 44rpx;
					height: 44rpx;
					margin-right: 24rpx;
				}
			}
		}

		.re-title {
			margin: 0 0 65rpx 24rpx;
			font-size: 48rpx;
			color: #1F222B;
			font-weight: bold;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.right {
				background: #FBF9EC;
				color: #D4B02D;
				padding: 10rpx 24rpx 10rpx 16rpx;
				font-weight: 400;
				font-size: 24rpx;
				display: flex;
				align-items: center;
				border-radius: 8rpx 0 0 8rpx;

				& image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 10rpx;
				}
			}
		}

		.address-box {
			display: flex;
			flex-direction: column;
			align-items: center;

			.qr-code {
				& image {
					width: 604rpx;
					height: 360rpx;
				}
			}

			.tips {
				font-size: 24rpx;
				color: #8D9099;

				&:last-child {
					padding-bottom: 48rpx;
					// border-bottom: 1rpx solid #F4F4F4;
				}

			}
		}

	}
</style>
