<template>
	<u-modal :confirm-text="$t('common').confirm" :cancel-text="$t('common').cancel" :show-cancel-button="true" z-index="101"
		:title="$t('recharge').update" v-model="code" @confirm="confirm" confirm-color="#F5D45C" @close="close"
		@cancel="close">
		<view style="padding: 0 16rpx;">
			<view class="top-img">
				<u-upload :upload-text="$t('recharge').xuanzhetupian" max-count="1" @on-remove="onDel"
					@on-success="onSus" :action="action" :header="header">
				</u-upload>
			</view>
			<u-form-item :label="i18n.nichen" :border-bottom="false" label-width="120">
				<u-input :placeholder="i18n.qsrnc" v-model="value" />
			</u-form-item>
		</view>
	</u-modal>
</template>

<script>
	import th from '../../common/locales/th'
	export default {
		props: {
			showPup: {
				type: Boolean,
				default: false
			},
			user: {
				type: Object,
				default: () => {
					return {}
				}

			}
		},
		data() {
			return {

				action: uni.getStorageSync('imgPath') + '?member=' + uni.getStorageSync('userId'),
				code: false,
				value: '',
				header: {
					'token': uni.getStorageSync('token'),
					'userId': uni.getStorageSync('userId')
				},
				fileList: [],
				img: ''
			}
		},
		watch: {
			showPup(val) {
				this.code = val
				// this.value = this.user.nickName || ''
				// this.img = this.user.handLink || ''
				// const imgPath = uni.getStorageSync('ossUrl') + '/' + this.user.handLink
				// this.fileList = [imgPath]
			}

		},
		computed: {
			i18n() {
				return this.$t("edtUser");
			}
		},
		methods: {
			onDel() {
				console.log('我触发了----')
				this.img = ''
			},
			onSus(response, index, lists, name) {
				this.$utils.showToast(this.i18n.sccg)
				console.log("上传成功", response)
				this.img = response.name;
			},
			close() {
				this.$emit('update:showPup', false)
			},
			confirm() {
				this.$emit('addFn', this.value, this.img)
			}

		}
	}
</script>

<style lang="scss" scoped>
	.top-img {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
