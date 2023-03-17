<template>
	<view class="page flex-col">
		<view class="image-wrapper_1">
			<image @click="back()" class="icon_1" referrerpolicy="no-referrer"
				src="/static/lanhu_querenmima/ps2495rpr92seqakcpyfbbjuasmb353tg5d13ee66-88f7-4c8e-80de-307ef55cf92f.png" />
			<text class="area">{{i18n.xzdq}}</text>
		</view>
		<view class="area-search">
			<u-search bg-color="#f7f7f7" height="84" :placeholder="i18n.ssw" v-model="value" :show-action="false">
			</u-search>
		</view>
		<view class="location_section flex1">
			<view class="location_content">
				<li v-for="(item,i) in cityList" class="listItem" :key="i" @click="chooseCity(item.name,item.areaCode)">
					<view class="left">
						{{item.name}}
					</view>
					<view class="right">
						+ {{item.areaCode}}
						<view style="width: 50rpx;">
							<u-icon style="margin-left: 14rpx;" color="#EDBE4D" v-if="item.areaCode === countryCode"
								name="checkbox-mark"></u-icon>
						</view>

					</view>

				</li>
			</view>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				value: '',
				cityList: [],
				cityList1: []
			};
		},
		watch: {
			value() {
				this.value = this.value.replace(/\s+/g, "")
				this.cityList = this.cityList1
				this.cityList = this.cityList.filter(item => item.name.includes(this.value) || item.areaCode.includes(this
					.value))
			}
		},
		computed: {
			i18n() {
				return this.$t("member")
			},
			countryCode() {
				return this.$store.state.countryCode || 86;
			}
		},
		onLoad() {
			this.cityList = this.i18n.adrs
			this.cityList1 = this.i18n.adrs
		},
		methods: {
			//选择国家码
			chooseCity(name, code) {
				this.$store.commit('setCountryCode', code)
				setTimeout(res => {
					this.back()
				}, 300)
			},
			back() {
				uni.navigateBack(1)
			}
		}
	};
</script>
<style lang='scss'>
	@import '@/common/common.scss';
	@import './assets/7.scss';
</style>
<style lang="scss" scoped>
	.location_section {
		.location_content {
			width: 100%;
			overflow-y: scroll;
			padding: 20rpx;
			font-size: 28rpx;
			height: 100vh;

			.listItem {
				display: flex;
				font-size: 28rpx;
				padding: 10px 0;
				align-items: center;
				justify-content: space-between;

				.left {
					color: #000;
				}

				.right {
					color: #999;
					display: flex;
					align-items: center;
				}
			}
		}
	}

	.area {
		font-size: 32rpx;
		color: #000;
		font-weight: 500;
		margin-left: 30rpx;
	}

	.area-search {
		margin: 40rpx 24rpx;
	}
</style>
