<template>
	<view class="container">
		
		<head-title :title="i18n.zhxx" />
		<view class="user-box">
			<view class="use-img">
				<!-- <image :src="user.handLink ? `${baseURL}/${user.handLink}` : '../../static/image/setting/18.png'"></image> -->
				<image :src="user.handLink ? user.handLink : '../../static/image/setting/18.png'"></image>
			</view>
			<view class="user-name" @click="showPup = true">
				{{user.nickName}} <image src="../../static/image/setting/19.png"></image>
			</view>
		</view>
		<view class="register-box">
			<view>{{ i18n.zcxx }}</view>
			<view class="right">
				{{ isInput ? user.phone:'******'  }}
				 <view class="left1" v-if="!isInput" @click="getImg()">
				 <image referrerpolicy="no-referrer" src="/static/image/my/2.png" />
				</view>
				<view class="left2" v-else @click="getImg()">
					<image referrerpolicy="no-referrer" src="/static/image/my/1.png" />
				</view>
			</view>
		</view>
		<view class="register-box">
			<view>UUID</view>
			<view class="right">
				{{user.uuid}}
				<view class="left3" @click="getCopy(user.uuid)">
					<image src="../../static/image/fIattributes/30.png"></image>
				</view>
				
			</view>
		</view>
		<edt-user-popup :user="user" :showPup.sync="showPup" @addFn="addFn" />
	</view>
</template>

<script>
import th from '../../common/locales/th';
	export default {
		data() {
			return {
			   showPup: false,
			   isInput: true,
			   user:{},
			   baseURL:uni.getStorageSync('ossUrl')
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		computed: {
			i18n() {
				return this.$t("edtUser")
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
					this.user = res.result;
				})
			},
			addFn(val, img) {
				// if (!val) {
				// 	this.$utils.showToast('昵称不能为空')
				// 	return
				// }
				// if (!img) {
				// 	this.$utils.showToast('图片不能为空')
				// 	return
				// }
				let member = uni.getStorageSync('userId')
				this.$u.api.user.updateMemberNew(member,val,img).then(res=>{
					if(res.status === 'SUCCEED'){
						this.showPup = false
						this.$utils.showToast(this.i18n.xgcc)
						this.getUserInfo();
					} else {
						this.$utils.showToast(res.errorMessage)
					}
				})
			},
			getImg() {
				this.isInput = !this.isInput
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.register-box {
			color: #1F222B;
			font-size: 32rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 30rpx 24rpx;
			.right {
				display: flex;
				align-items: center;
				& image {
					margin-left: 24rpx;
				}
				.left1 {
					& image {
						width: 32rpx;
						height: 12rpx;
					}
				}
				
				.left2 {
					& image {
						width: 32rpx;
						height: 20rpx;
					}
				}
				.left3 {
					& image {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
		}
		.user-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 70rpx;
			.user-name {
				display: flex;
				align-items: center;
				color: #1F222B;
				font-size: 38rpx;
				font-weight: 500;
				& image {
					width: 36rpx;
					height: 36rpx;
					margin-left: 14rpx;
				}
			}
			.use-img {
				margin-bottom: 24rpx;
				& image {
					border-radius: 50%;
					width: 136rpx;
					height: 136rpx;
				}
				
			}
		}
	}
</style>