<template>
	<view class="page">
		<!-- 订单列表 -->
		<view class="header">
			<u-icon name="arrow-left" size="40" @click="turnBack" class="left"></u-icon>
			<h2 class="title">
				订单列表
			</h2>
			<view class="right">
				<u-icon name="setting-fill" size="35" color="#868d9a" @click="showFilter = !showFilter"></u-icon>
			</view>
		</view>
		<!-- filter 底部弹出层 -->
		<u-popup v-model="showFilter" mode="bottom" :closeable="true" border-radius="20" class="popup-view">
			<view class="top-title">
				<text>订单历史筛选</text>
			</view>
			<!-- 交易类型 -->
			<view class="box mt-60">
				<view class="label">{{i18n.jylx}}</view>
				<view class="select-wrapper">
					<u-row gutter="16" justify="space-between">
						<u-col span="4" v-for="(item, index) in typeOption" :key="index">
							<u-button size="medium" class="mb-20 bnt">{{item.name}}</u-button>
						</u-col>
					</u-row>
				</view>
			</view>
			<!-- 订单状态 -->
			<view class="box mt-60">
				<view class="label">{{i18n.ddzt}}</view>
				<view class="select-wrapper">
					<u-row>
						<u-col span="4" v-for="(item, index) in statusOption" :key="index">
							<u-button size="medium" class="mb-20 bnt">{{item.name}}</u-button>
						</u-col>
					</u-row>
				</view>
			</view>
			<view class="divline"></view>
			<view class="box mt-60">
				<u-button type="primary" size="medium" class="bnt-3" @click="resetFillter">{{i18n.zz}}</u-button>
				<u-button type="primary" size="medium" class="bnt-3" @click="getList">{{i18n.qr}}</u-button>
			</view>
		</u-popup>
		<view class="content">
			<view v-show="isEmpty" class="empty mt-50">
				<view class="">
					<image src="../../static/image/erro/1.png" mode="" class="img"></image>
					<view class="text">暂无数据</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEmpty: true,
				typeOption: [
					{ name: '全部'},{name: '购买'},{name:'出售'}
				],
				showFilter: false,
				statusOption: [
					{name: '全部'},{name: '未付款'},{name:'已付款'},{name: '申诉中'},{name:'已完成'},{name:'已取消'},{name:'已超时'}
				],
			};
		},
		computed:{
			i18n() {
				return this.$t("wantBuy")
			},
		},
		methods: {
			turnBack(){
				uni.navigateBack()
			},
			resetFillter() {
				
			},
			getList() {
				
			}
		}
	}
</script>

<style lang="scss">
	uni-page-body{
		height: 100%;
	}
	.page {
		height: 100%;
		.header {
			display: flex;
			justify-content: space-between;
			height: 90rpx;
			align-items: center;
			background: #fff;
			.title {
				font-weight: 400;
				font-size: 16px;
			}
			.left {
				padding: 0 32rpx;
				color: #868c9a;
			}
			.right {
				width: 100rpx;
			}
		}
		.box {
			padding: 20rpx 30rpx;
			.label {
				font-size: 12px;
				margin-bottom: 30rpx;
				color: #868c9a;
			}
			.box-row {
				padding: 20rpx 30rpx;
				background: #f5f5f5;
				
			}
			.col-right {
				text-align: right!important;
				.icon {
					margin-left: 10rpx;
				}
			}
			.bnt-3 {
				width: 330rpx;
			}
			.bnt {
				margin: 0 10rpx;
			}
		}
		.popup-view {
			overflow-y: scroll;
			/deep/ .u-drawer-content {
				height: 93%!important;
			}
			.top-title {
				margin-top: 20rpx;
				padding: 0 30rpx;
				text-align: center;
				font-weight: bolder;
			}
		}
		.content {
			overflow-y: auto;
			width: 100%;
			.empty {
				display: flex;
				justify-content: center;
				align-items: center;
				.img {
					width: 200px;
					height: 160px;
				}
				.text{
					text-align: center;
				}
			}
		}
}
</style>
