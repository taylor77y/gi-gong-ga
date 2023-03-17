<template>
	<view class="page">
		<u-row gutter="16" justify="justify-between" class="header">
			<u-col span="6">
				<u-icon name="arrow-left" size="30" @click="back"></u-icon>
			</u-col>
			<u-col span="6" class="right-col">
				<text>Skip</text>
			</u-col>
		</u-row>
		<!-- 步骤条 -->
		<view class="step mt-100">
			<u-steps :list="numList" :current="1" mode="number" active-color="#00EE76"></u-steps>
		</view>
		<!-- 表单 -->
		<view class="form">
			<h2>KYC</h2>
			<view class="item mt-50">
				<view class="label">Nationality</view>
				<view class="input mt-20">
					<u-input v-model="national" :clearable="true" placeholder="United States" placeholder-style="color: #868c9a;" class="uni-input"  />
				</view>
			</view>
			<view class="item mt-50">
				<view class="label">Full legal name</view>
				<view class="input mt-20">
					<u-input v-model="realName" :clearable="true" placeholder="Please enter your real name" placeholder-style="color: #868c9a;" class="uni-input" />
				</view>
			</view>
			<view class="item mt-50">
				<view class="label">Document/passport number</view>
				<view class="input mt-20">
					<u-input v-model="number" :clearable="true" placeholder="Please enter your ID/passport number" placeholder-style="color: #868c9a;" class="uni-input" />
				</view>
			</view>
			<view class="item mt-50">
				<view class="label">ID photo/upload passport</view>
				<u-row gutter="16" justify="space-between" class="mt-20">
					<u-col :span="4">
						<u-upload max-count="1" :custom-btn="true" class="upload">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-icon name="camera-fill" size="60" :color="$u.color['lightColor']"></u-icon>
							</view>
						</u-upload>
						<view class="label mt-10">Front page of ID</view>
					</u-col>
					<u-col :span="4">
						<u-upload max-count="1" :custom-btn="true" class="upload">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-icon name="camera-fill" size="60" :color="$u.color['lightColor']"></u-icon>
							</view>
						</u-upload>
						<view class="label mt-10">Back page of ID</view>
					</u-col>
					<u-col :span="4">
						<u-upload max-count="1" :custom-btn="true" class="upload">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-icon name="camera-fill" size="60" :color="$u.color['lightColor']"></u-icon>
							</view>
						</u-upload>
						<view class="label mt-10">Passport photo</view>
					</u-col>
				</u-row>
			</view>
			<view class="item mt-50 pb-50">
				<view class="label">Shooting example</view>
				<view class="mt-20">
					<image src="../../static/img/identity.png" mode=""></image>
				</view>
			</view>
			<view class="item mt-50">
				<u-button type="primary" @click="next">Next step</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				numList: [{
						name: this.$t('member').zhzc
					}, {
						name: this.$t('member').smrz
					}, {
						name: this.$t('member').aqbd
					}, {
						name: this.$t('member').qjy
				}],
				national: '',
				realName: '',
				number:'',
			}
		},
		computed: {
			i18n() {
				return this.$t("member")
			},
		},
		methods:{
			clearInput() {
				
			},
			next() {
				
			},
			back() {
				uni.navigateBack(1)
			},
			cancel() {
				uni.navigateTo({
					url: `/pages/index/index`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		height: 80rpx;
		line-height: 80rpx;
		.right-col {
			text-align: right;
		}
	}
	.step {
		::v-deep .u-steps__item__num {
			width: 70rpx;
			height: 70rpx;
		}
	}
	.form {
		padding: 30rpx;
		.label {
			color: #333;
			font-size: 12px;
			font-weight: 400;
		}
		.input {
			display: flex;
			align-items: center;
		}
		uni-input {
			width: 100%;
		}
		::v-deep uni-image {
			width: 100%;
			height: 110px;
		}
		.upload {
			width: 100px;
			height: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #f7f8fa;
			border: 2px dashed #b8bcc5;
			overflow: hidden;
			::v-deep .u-list-item {
				margin: 0;
				padding: 0;
			}
		}
	}
</style>