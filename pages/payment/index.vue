<template>
	<view class="container">

		<head-title :title="' '" />
		<view class="con-box">
			<view class="title">{{ i18n.zfsz }}</view>
			<view class="transaction-box">
				<view>{{ i18n.jysz }}</view>
				<view class="tips">{{ i18n.szhb }}</view>
			</view>
			<view class="item" @click="getPath(index)"
				v-for="(item, index) in listInfo" :key="index">
				<view class="left">
					{{ item.name }}
				</view>
				<view class="right">
                    {{ item.val }}
					<image src="../../static/image/fIattributes/29.png"></image>
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
				listInfo: [
					{name: 'C2C收款方式', val: '未添加'},
					// {name: 'C2C通知设置', val: ''}
				]
			}
		},
		onLoad() {

		},
		onShow(){
			this.getUserInfo();
			this.listInfo[0].name = this.i18n.skfs
			this.listInfo[0].val = this.i18n.wtj
		},
		computed: {
           i18n() {
               return this.$t("payment");
           }
		},

		methods: {
			getUserInfo(){
				let member = uni.getStorageSync('userId');
				this.$u.api.user.getMember(member).then(res => {
					if(res.result.cardState === 'PASS'){
						this.listInfo[0].val = this.i18n.ytj
					}
				})
			},
			getPath(index) {
               const temp = {
               	0: `/pages/payment/collection-list`,
               	// 1: `/pages/setup/index`
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
		.con-box {
			margin: 0 24rpx;

			.title {
				font-size: 48rpx;
				color: #1F222B;
				font-weight: bold;
			}
			.transaction-box {
				color: #1F222B;
				font-size: 32rpx;
				margin: 30rpx 0;
				.tips {
					color: #8D9099;
					font-size: 24rpx;
				}
			}
			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 32rpx;
				color: #1F222B;
				padding: 30rpx 0;

				.left {}

				.right {
					display: flex;
					align-items: center;
					color: #B0B3BA;
					& image {
						width: 13rpx;
						height: 24rpx;
						margin-left: 24rpx;
					}
				}
			}
		}
	}
</style>
