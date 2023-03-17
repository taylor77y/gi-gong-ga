<template>
	<u-popup height="977rpx" v-model="IsShowPage" @close="onClose" mode="bottom" border-radius="20" z-index="102"
		:closeable="true">
		<view class="beginners-box">

			<view class="title">{{ textInfo[check] }}</view>
			<view v-if="check === 0">
				<view class="large">
					<image mode="widthFix" src="../../static/image/fIattributes/18.png">
				</view>
				<view class="tip1">
					{{i18n.pxhyjxjy}}
				</view>
				<view class="tip1">
					{{i18n.mffkfhmf}}
				</view>
				<view class="tip1">
					{{i18n.bajybszj}}
				</view>
			</view>
			<view v-if="check === 1">
				<view class="large">
					<image mode="widthFix" src="../../static/image/fIattributes/25.png">
				</view>
				<view class="tip1">
					{{i18n.rhgmszs}}
				</view>
			</view>
			<view v-if="check === 2">
				<view class="overbooking">
					<view class="l-img">
						<image src="../../static/image/fIattributes/20.png"></image>
					</view>
					<view class="c-img">
						<image src="../../static/image/fIattributes/19.png"></image>
					</view>
					<view class="l-img">
						<image src="../../static/image/fIattributes/21.png"></image>
					</view>
					<view class="c-img">
						<image src="../../static/image/fIattributes/19.png"></image>
					</view>
					<view class="l-img">
						<image src="../../static/image/fIattributes/22.png"></image>
					</view>
				</view>
				<view class="tip1">
					1. {{i18n.djgmxd}}
				</view>
				<view class="tip1">
					2. {{i18n.azmjtgfs}}
				</view>
				<view class="tip1">
					3. {{i18n.fkdjcgtz}}
				</view>
				<view class="tip1">
					4. {{i18n.msjdft}}
				</view>
			</view>
			<view v-if="check === 3">
				<view class="becareful-box">
					<view class="l-icon">
					  <image src="../../static/image/fIattributes/23.png"></image>
					</view>
					{{i18n.mbddfkwcs}}
				</view>

				<view class="becareful-box">
					<view class="l-icon">
					  <image src="../../static/image/fIattributes/23.png"></image>
					</view>
					{{i18n.sjkdsd}}
				</view>
				<view class="becareful-box">
					<view class="l-icon">
					  <image src="../../static/image/fIattributes/24.png"></image>
					</view>
					{{i18n.sjkdfyy}}
				</view>
				<view class="transaction-btn" @click="getAdd()">
					{{i18n.ljjy}}
				</view>
			</view>
			<view class="footer-img">
				<view class="left" @click="getReduce()">
					<image v-if="check > 0" src="../../static/image/fIattributes/left1.png" />
				</view>
				<view class="cont-img">
					<image :src="item.code ? '../../static/image/fIattributes/show1.png': item.img"
						v-for="(item, index) in imgInfo" :key="index"></image>
				</view>
				<view @click="getImg()" class="left" style="margin: 0 0 0 57rpx;">
					<image v-if="check < 3" src="../../static/image/fIattributes/right1.png" />
				</view>
			</view>
		</view>

	</u-popup>
</template>

<script>
	import th from '../../common/locales/th'
	/*
	 *@property { Boolean } showSpec 控制显/隐
	 * 
	 */
	export default {
		props: {
			showSpec: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

				IsShowPage: false,
				check: 0,
				imgInfo: [{
						img: '../../static/image/fIattributes/show.png',
						code: true
					},
					{
						img: '../../static/image/fIattributes/show.png',
						code: false
					},
					{
						img: '../../static/image/fIattributes/show.png',
						code: false
					},
					{
						img: '../../static/image/fIattributes/show.png',
						code: false
					}
				]
			}
		},
		computed: {
			i18n() {
				return this.$t("fack");
			},
			textInfo() {
				return [this.i18n.hyldba, this.i18n.spjc, this.i18n.rhgmsz, this.i18n.jyzysx]
			}
		},
		watch: {
			showSpec(val) {
				this.IsShowPage = val

			}
		},
		methods: {
			// 立即交易
			getAdd() {
				this.onClose()
			},
			getImg() {
				this.$u.throttle(async () => {
					this.check++
					this.imgInfo[this.check].code = true
				}, 500)

			},
			getReduce() {
				this.$u.throttle(async () => {
					this.imgInfo[this.check].code = false
					this.check--
				}, 500)
			},
			onClose() {
				this.$emit('update:showSpec', false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.beginners-box {
		padding: 46rpx;
		position: relative;
		height: 977rpx;
        .transaction-btn {
			width: 340rpx;
			height: 76rpx;
			background: #F5D45C;
			border-radius: 6rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #1F222B;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-left: calc((100% - 340rpx)/2);
			
		}
		.becareful-box {
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;
			color: #1F222B;
			font-size: 28rpx;
			font-weight: 500;
            .l-icon {
				width: 56rpx;
			}
			& image {
				width: 42rpx;
				height: 42rpx;
				margin-right: 14rpx;
			}
		}

		.overbooking {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 48rpx;

			.l-img {
				& image {
					width: 76rpx;
					height: 76rpx;
				}
			}

			.c-img {
				padding: 0 24rpx;

				& image {
					width: 124rpx;
					height: 28rpx;
				}
			}
		}

		.footer-img {
			position: absolute;
			bottom: 57rpx;
			display: flex;
			align-items: center;

			.left {
				width: 143rpx;

				& image {
					width: 86rpx;
					height: 86rpx;
					margin-right: 57rpx;

				}
			}

			.cont-img {
				& image {
					padding: 0 9rpx;
					width: 78rpx;
					height: 6rpx;
				}
			}

			.cont-img {
				display: flex;
				align-items: center;
			}
		}

		.title {
			font-size: 32rpx;
			color: #1F222B;
			text-align: center;
			margin-bottom: 70rpx;
			font-weight: 500;

		}

		.tip1 {
			margin-bottom: 40rpx;
			color: #1F222B;
			font-size: 28rpx;
			font-weight: 500;
		}

		.large {
			margin-bottom: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			& image {
				width: 654rpx;
				height: 257rpx;

			}
		}

	}
</style>
