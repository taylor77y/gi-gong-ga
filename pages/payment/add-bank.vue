<template>
	<view class="container">
		
		<head-title :title="i18n.tjyhk" />
		<view class="bank-list">
			<view class="item" v-for="(item, index) in bankInfo" :key="index">
				<view class="title">
					{{ item.name }}
				</view>
				<view class="f-input">
					<input v-model="item.value" :placeholder="item.pla" placeholder-style="color: #B0B3BA;font-size: 32rpx" />
				</view>
			</view>
			
			<view class="tips">
				<view class="tips-title">
				  <image src="../../static/image/fIattributes/23.png"></image>	{{ i18n.tbtx }}
				</view>
				<view class="cont">
					{{ i18n.qbyhkts }}
				</view>
			</view>
			<!-- <view class="tips1">
				{{ i18n.wxts }}
				<text>{{ i18n.sfxf }}</text>
			</view> -->
			<view class="btn" @click="getAdd()">
{{ i18n.quren }}
			</view>
		</view>
	</view>
</template>

<script>
import th from '../../common/locales/th';
	export default {
		data() {
			return {
			   bankInfo: [
				   { name: this.i18n.xm, value: '', pla: this.i18n.qsrxm },
				   { name: this.i18n.yhka, value: '', pla:this.i18n.qsryhk },
				   // { name: '银行名称', value: '', pla:"请输入您的银行名称" },
				   { name: this.i18n.khh, value: '', pla:this.i18n.qsrkhh }
			   ],
			   user:{}
			}
		},
		onLoad(e) {
           if(e && e.user){
				let info = JSON.parse(e.user)
				let arr = [];
				arr.push({ name: this.i18n.xm, value: info.bankUserName, pla:this.i18n.qsrxm })
				arr.push({ name: this.i18n.yhka, value: info.bankCard, pla:this.i18n.qsryhk })
				arr.push({ name: this.i18n.khh, value: info.bankName, pla:this.i18n.qsrkhh })
				this.user = e.user;
				this.bankInfo = arr;
           }
		},
		computed: {
			i18n() {
			    return this.$t("payment");
			},
		},
		
		methods: {
			getAdd() {
				for(let i = 0; i < this.bankInfo.length;i++) {
					if (!this.bankInfo[i].value) {
						this.$utils.showToast(this.bankInfo[i].pla)
						return
					}
				}
			
				let obj = new Object();
				obj.member = uni.getStorageSync('userId')
				obj.bankUserName = this.bankInfo[0].value
				obj.bankCard = this.bankInfo[1].value
				obj.bankName = this.bankInfo[2].value;
				this.$u.api.user.setBankInfo(obj).then(res=>{
					if(res.status === "SUCCEED"){
						this.$utils.showToast(this.i18n.tjyhkcg)
						uni.navigateBack({
							delta: 2
						});
					}
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.bank-list {
			margin: 24rpx;
			.btn {
				padding: 20rpx;
				background: #D9DDE0;
				border-radius: 6rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #B0B3BA;
				font-size: 32rpx;
				font-weight: 500;
			}
			.tips1 {
				font-size: 24rpx;
				color: #8D9099;
				margin-bottom: 28rpx;
				text {
					color: #000;
					font-weight: 500;
				}
			}
			.tips {
				background: #F6F6F6;
				border-radius: 6rpx;
				padding: 24rpx;
				margin-bottom: 30rpx;
				.tips-title {
					color: #1F222B;
					font-size: 28rpx;
					font-weight: 500;
					display: flex;
					align-items: center;
					& image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 14rpx;
					}
				}
				.cont {
					color: #8D9099;
					font-size: 24rpx;
					margin-left: 44rpx;
				}
			}
			.item {
				color: #8D9099;
				font-size: 28rpx;
				margin-bottom: 48rpx;
				.title {
					margin-bottom: 10rpx;
				}
				.f-input {
					padding: 20rpx 24rpx;
					background: #F6F6F6;
					border-radius: 6rpx;
				}
			}
		}
	}
</style>