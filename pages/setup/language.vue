<template>
	<view class="container">

		<head-title :title="' '" />
		<view class="con-box">
			<view class="title">{{ i18n.yy }}</view>
			<view class="item" @click="getPath(index)"
				v-for="(item, index) in listInfo" :key="index">
				<view class="left">
					{{ item.name }}
				</view>
				<view class="right">
                    <view >
                    	<image v-if="current === index" src="../../static/image/fIattributes/38.png"></image>
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
				current: 0,
				listInfo: [
					{name: '中文', val: 'zh'},
					{name: 'English', val: 'en'},
					{name: '한국인', val: 'kor'},
					{name: '繁体', val: 'hk'}
				]
			}
		},
		onLoad() {

		},
		computed: {
          i18n() {
              return this.$t("setting");
          }
		},
        onShow() {
			 const cur = uni.getStorageSync('lang') || 'zh'
			 this.listInfo.forEach((item, key) => {
				 if (item.val === cur) {
					 this.current = key
				 }
			 })
		},
		methods: {
			getPath(index) {
			   this.current = index
			   this._i18n.locale = this.listInfo[index].val
			   uni.setStorageSync('lang',this.listInfo[index].val)
			   // this.$store.commit('setLang', this.listInfo[index].val)
			   uni.setStorageSync('lauInfo',this.listInfo[index].name)
        uni.navigateBack(1);
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
						width: 32rpx;
						height: 22rpx;
					}
				}
			}
		}
	}
</style>
