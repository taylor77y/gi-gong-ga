<template>
	<view class="container">

		<head-title :title="' '" />
		
		<view class="con-box">
			<view class="title">{{ i18n.zhaq }}</view>
			<view class="tips">
			{{ i18n.scsfyz }}
			</view>
			<view class="item" @click="getPath(index)"
				v-for="(item, index) in listInfo" :key="index">
				<view class="left">
				 {{ item.name }}
				</view>
				<view class="right">
                    <view >
                    	{{ item.code ? $t('newFy').ybd:i18n.gg }}
						<image src="../../static/image/fIattributes/29.png"></image>
                    </view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import th from '../../common/locales/th';
	export default {
		data() {
			return {
				search: '',
				listInfo: [
					{name: '修改密码', code: false},
					{name: '修改交易密码', code: false},
					{name: '邮箱绑定', code: false},
					{name: '手机绑定', code: false}
				]
			}
		},
		onLoad() {
            this.listInfo = this.i18n.listInfo
			this.listInfo = this.listInfo.map(item => {
				return {
					...item,
					code:false
				}
			})
			console.log(this.listInfo)
			this.getUserInfo()
		},
		computed: {
            i18n() {
                return this.$t("security");
            }
		},

		methods: {
			getUserInfo() {
				let member = uni.getStorageSync('userId');
				this.$u.api.user.getMember(member).then(res => {
					const { mail, phone  } = res.result
					this.listInfo[2].code = mail ? true:false
					this.listInfo[3].code = phone ? true:false
				})
			},
			getPath(index) {
			   const temp = {
				   0: '/pages/setup/edt-login-pass',
				   1: '/pages/setup/edt-transaction-pass',
				   2: '/pages/setup/edt-mailbox',
				   3: '/pages/setup/edt-phone'
			   }
			   if (this.listInfo[index].code) {
				   return
			   }
			   uni.navigateTo({
			   	url: temp[index]
			   })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.tips {
			color: #8D9099;
			font-size: 24rpx;
		}
		.con-box {
			margin: 0 24rpx;
         
			.title {
				font-size: 48rpx;
				color: #1F222B;
				font-weight: bold;
			}
            .f-border {
            	border-bottom: 1rpx solid #EBEBEB;
            }
			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 32rpx;
				color: #1F222B;
				padding: 30rpx 0;

				.left {
					display: flex;
					align-items: center;
					& image {
						width: 48rpx;
						height: 48rpx;
						margin-right: 14rpx;
						border-radius: 50%;
					}
				}

				.right {
					display: flex;
					align-items: center;
					color: #B0B3BA;
					font-size: 28rpx;

					& image {
						width: 13rpx;
						height: 24rpx;
						margin-left: 14rpx;
					}
				}
			}
		}
	}
</style>
