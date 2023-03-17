<template>
	<view class="box">
		<!-- 步骤条 -->
		<view class="set-1">
			<view class="set-2">
				<view class="set-num">1</view>
				<view class="set-view">
					<view class="title">
						{{i18n.lkbad}}<text>{{i18n.yzxmpp}}</text>{{i18n.dyhkzhx}}
					</view>
					<view class="tips">
					   <image src="../../static/image/fIattributes/34.png"></image>	{{i18n.zzqbztb}}
					</view>
					<view class="collection-box">
						<view class="yhk">{{i18n.yhk}}</view>
						<view class="name">
							<view >{{i18n.xm}}</view>
							<view class="right">{{i18n.xxb}}</view>
						</view>
						<view class="name">
							<view >{{i18n.yhkkh}}</view>
							<view class="right">8888888
							<image src="../../static/image/fIattributes/30.png"></image>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<view class="set-2">
			<view class="set-num">2</view>
			<view class="set-view">
				<view class="title">
					{{i18n.fhykgskkdkd}}
				</view>
				
				
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			options: Array, //数据
		},
		computed:{
			i18n() {
				return this.$t("fack");
			},
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.box{
	}
	.set-2:last-child::after {
		display: none;
	}
	.set-1 {
		margin-top: 24rpx;
		// margin: 30rpx;
		background: #FAFAFA;
		border-radius: 10rpx;
		padding: 30rpx 24rpx;
	}

	.set-2 {
		display: flex;
		position: relative;
		
		
		.set-num {
			
			color: #1F222B;
			font-size: 30rpx;
			font-weight: 500;
			background: #F5D45C;
			width: 44rpx;
			height: 44rpx;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			
		    
		}
		.set-view {
			flex: 1;
			margin-left: 14rpx;
			.title {
				color: #1F222B;
				font-size: 28rpx;
				font-weight: 600;
				text {
					color: #D4B02D;
				}
			}
			.tips {
				color: #8D9099;
				font-size: 22rpx;
				& image {
					width: 22rpx;
					height: 22rpx;
					margin-right: 10rpx;
				}
			}
			.collection-box {
				background: #fff;
				border-radius: 10rpx;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
				margin: 24rpx 0;
				padding: 24rpx;
				.yhk {
					position: relative;
					margin-left: 14rpx;
					margin-right: 40rpx;
					margin-bottom: 24rpx;
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
				.name {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #8D9099;
					font-size: 26rpx;
					margin-bottom: 10rpx;
					.right {
						color: #1F222B;
						& image {
							width: 24rpx;
							height: 24rpx;
							margin-left: 14rpx;
						}
					}
				}
			}
		}
	}
    .set-num::after {
    	content: '';/* 必须存在如果没有图标就留空 */
    	top: 14%;/* 定位 距离*/
    	border-style: dashed;
    	border-left: 2rpx ;/* 横线颜色 */
    	border-color: red;
    	left: -90rpx;/* 定位 距离*/
    	height: 200rpx;/* 高度 */
    	position: absolute;/* 定位 */
    }



</style>
