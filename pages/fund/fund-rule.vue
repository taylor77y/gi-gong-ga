<template>
	<view class="page">
		<xl-header :title="i18n.gz"></xl-header>
		<view class="container">
			<view class="header">
				<image src="https://db23app.vip/wap/img/logo.681b8bb1.png" class="icon"></image>
				<view class="title">
					{{i18n.lcgz}}
				</view>
			</view>
			<view class="content">
				{{i18n.lcstgj}}
			</view>
			<view class="sub-title">
				{{i18n.syjs}}
			</view>
			<view class="content">
				  {{i18n.hyzpt}}
				<br/>
				<br/>
				 {{i18n.zd}}:<text class="black">10000U X 0.3% = 30U</text>
				 <br/>
				 <br/>
				{{i18n.zg}}:<text class="black">10000U X 0.5% = 50U</text>
				<br/>
				<br/>
				 {{i18n.wthkyhd}}<text class="black">150U~250U</text>
				  {{i18n.symrx}} 
			</view>
			<view class="sub-title">
				{{i18n.gyhyj}}
			</view>
			<view class="content">
				 {{i18n.rnxwzc}} 
				 <text class="black"> {{i18n.wyjdjs}}</text>
				 <br/>
				 <br/>
				  {{i18n.jlgcp}}
				  <text class="black">0.4%</text>
				  ，{{i18n.sy}}  
				  <text class="black"> 3</text>
				   {{i18n.tdqtz}}
				   <text class="black">1000</text>
				   ,{{i18n.zand}} 
				   <text class="black">{{i18n.wyj}} 0.4%x3x1000 = 12U</text>
				   ，{{i18n.sjthbj}} 
				   <text class="black">1000U-12U = 988U.</text>
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
		methods: {
			
		},
		computed: {
			i18n() {
				return this.$t("fundRule")
			},
		}
	}
</script>

<style lang="scss" scoped>
.page{
	font-family: 微软雅黑;
	.container{
		padding: 30rpx;
		
		.header{
			padding-top: 30rpx;
			display: flex;
			align-items: center;
			
			.icon{
				width: 92rpx;
				height: 92rpx;
				margin-right: 40rpx;
			}
			
			.title{
				font-size: 58rpx;
				font-weight: 400;
				color: #333;
			}
		}
		
		.content{
			padding-top: 20rpx;
			color: #868c9a;
			font-size: 28rpx;
			line-height: 38rpx;
			
			.black{
				color: #333;
			}
		}
		
		.sub-title{
			padding-top: 50rpx;
			font-weight: 600;
			font-size: 28rpx;
			color: #333;
		}
	}
}
</style>
