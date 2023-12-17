<template>
	<view class="page">
		<xl-header title=""></xl-header>
		<view class="fm">
			<view class="top">
				<view class="title">
					{{i18n.lc}}
				</view>
				<view class="desc">
					{{i18n.jdaq}}
				</view>
			</view>
			<view class="content">
				<view class="title">
					{{i18n.gsyx}}
				</view>
				<view class="card">
					<view class="list-item" @tap="toPage('/pages/fund/index')">
						<view class="text">
							<view class="title">
								{{i18n.jjlc}}
							</view>
							<view class="desc">
								<text class="line">{{i18n.wjzz}}</text>
								<view class="line2">{{i18n.axzz}}</view>
							</view>
						</view>
						<image src="../../static/image/licai/f-bg.4c1afd1b.png" class="bg"></image>
					</view>
					<view class="list-item" @tap="toPage('/pages/machine/index')">
						<view class="text">
							<view class="title">
								{{i18n.znkc}}
							</view>
							<view class="desc">
								<text class="line">{{i18n.zskjzl}}</text><br />
								<text class="line2">{{i18n.zdxldkj}}</text>
							</view>
						</view>
						<image src="../../static/image/licai/l-bg.6251df80.png" class="bg"></image>
					</view>
					<view class="list-item" @tap="toPage('/pages/pledgeLoan/index')">
						<view class="text">
							<view class="title">
								{{i18n.zyjb}}
							</view>
							<view class="desc">
								<text class="line">{{i18n.sshk}}</text><br />
								<text>{{i18n.xxsxf}}</text>
							</view>
						</view>
						<image src="../../static/image/licai/p-bg.4773be7e.png" class="bg"></image>
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
		methods: {
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			}
		},
		computed: {
			i18n() {
				return this.$t("fmHome")
			},
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 0 30rpx;

		.fm {
			>.top {
				.title {
					color: #333;
					font-size: 28rpx;
					font-weight: 700;
				}

				.desc {
					margin-top: 20rpx;
					font-size: 27rpx;
				}
			}

			>.content {
				padding-top: 50rpx;

				>.title {
					font-size: 34rpx;
					font-weight: 600;
					margin-bottom: 10rpx;
				}
			}

			.card {
				.list-item {
					margin-top: 30rpx;
					background: url(data:image/png;base64,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) no-repeat;
					background-size: 100% 100%;
					border-radius: 10rpx;
					padding: 30rpx 0 30rpx 30rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.bg {
						width: 280rpx;
						height: 230rpx;
						flex-shrink: 0;
					}

					.text {
						color: #333;
						font-size: 26rpx;
						font-weight: 400;

						.title {
							font-size: 28rpx;
							font-weight: 700;
							margin-bottom: 20rpx;
						}
					}

					.desc {
						.line2 {
							margin-top: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
