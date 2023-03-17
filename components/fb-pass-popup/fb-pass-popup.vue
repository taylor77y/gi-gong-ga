<template>
	<u-modal :show-cancel-button="true" z-index="9999" :title="i18n.jymm" v-model="code"
		@confirm="confirm" confirm-color="#F5D45C"
		 :confirm-text="i18n.qr"
		 :cancel-text="i18n.qx"
		 @close="close" @cancel="close">
		<view style="padding: 0 16rpx;">
	        <u-form-item :label="i18n.mm" :border-bottom="false" label-width="120"><u-input :type="type" :placeholder="i18n.qsrjymm" v-model="value" /></u-form-item>
		</view>
	</u-modal>
</template>

<script>
	export default {
		props: {
		    showPup: {
		        type: Boolean,
		        default: false
		    }
		},
		data() {
		    return {
				type: 'password',
				code: false,
				value: ''
			}	
		},
		watch: {
		   	showPup(val) {
				this.code = val
			}
			
		},
		computed: {
			i18n() {
				return this.$t("fack");
			},
		},
		methods: {
			close() {
				this.value = '';
				this.$emit('update:showPup',false)
			},
			confirm() {
				this.$emit('addFn',this.value)
			}
			
		}
	}
	
</script>

<style lang="scss" scoped>

</style>