<template>
	<view class="container">

		<head-title :title="' '" />
		<view class="con-box">
			<view class="title">设置</view>
			<view class="item" @click="getPath(index)" :class="{ 'f-border': item.border }"
				v-for="(item, index) in listInfo" :key="index">
				<view class="left">
					{{ item.name }}
				</view>
				<view class="right">

					<view>{{ item.val }}</view>
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
				listInfo: [{
						name: '通知',
						border: false
					},
					{
						name: '数字币提现设置',
						border: false
					},
					{
						name: '行情通知',
						border: true
					},
					{
						name: '多语言',
						border: false,
						val: '中文简体'
					},
					{
						name: '汇率',
						border: false,
						val: 'USD'
					},
					{
						name: '默认支付币种',
						border: false,
						val: 'CNY'
					},
					{
						name: '涨跌幅基准',
						border: false,
						val: '近24小时'
					},
					{
						name: '主题模式',
						border: false,
						val: '白天模式'
					},
					{
						name: '色彩风格设置',
						border: false
					},
					{
						name: '颜色配置',
						border: true
					},
					{
						name: '清理缓存',
						border: false,
						val: '18.75 MB'
					},
					{
						name: '网络检测',
						border: false
					},
					{
						name: '信任证书',
						border: false
					},
					{
						name: '服务协议',
						border: false
					},
					{
						name: '隐私',
						border: false
					},
					{
						name: '关于',
						border: false,
						val: 'V2.56.2'
					},
				]
			}
		},
		onLoad() {
			
		},
		onShow(){
			let rate = uni.getStorageSync('rate');
			if(rate != ''){
				this.listInfo[4].val = rate.currencyName
			}else{
				this.getHY();
			}
		},
		computed: {

		},
		methods: {
			getHY(){
				this.$u.api.fack.getCurrencyConfiguration().then(res=>{
					this.listInfo[4].val = res.result[0].currencyName
					uni.setStorageSync('rate',res.result[0])
				})
			},
			getPath(index) {
               const temp = {
               	3: `/pages/setup/language`,
				4: `/pages/setup/rate`,
				5: `/pages/setup/currency`,
				15: '/pages/setup/about'
               }
			   if (temp[index]) {
				   uni.navigateTo({
				   	url: temp[index]
				   })
			   } else {
				   this.$utils.showToast('暂未开放！')
			   }
               
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

				.left {}

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
