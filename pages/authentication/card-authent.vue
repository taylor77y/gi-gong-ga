<template>
	<view class="page flex-col">
		<view class="group_1 flex-col">
			<view class="nav-bar_3 flex-row">
				<image @click="back()" class="icon_2" referrerpolicy="no-referrer"
					src="/static/lanhu_shenfenzhengrenzheng/pswbvbiryvu7id2mky04keji2inpyi5lw1u89dd60aa-fa8c-47b8-875a-01daca1b212a.png" />
				<image @click="close()" class="icon_1" referrerpolicy="no-referrer"
					src="/static/lanhu_shenfenzhengrenzheng/psxsho705wfngxlo1tgvw02kmkocqw6en337e823a-3e3c-41dc-a3a1-a0f80dbe85b8.png" />
			</view>
			<text class="text_1">{{i18n.wjyz}}</text>
			<view class="text_2">{{i18n.pzsdd}}</view>
			<image class="image_2" referrerpolicy="no-referrer"
				src="/static/lanhu_shenfenzhengrenzheng/psuqu8tdwi7qfkjtk5lvvda3f6lzb7gygpd71db835-fb01-4055-94e3-576eade8cf7f.png" />
			<view class="image-text_3 flex-row justify-between">
				<image class="image_3" referrerpolicy="no-referrer"
					src="/static/lanhu_shenfenzhengrenzheng/ps2yfeb386b7wgfvoek73536m27zowmp4xbf93f460-78ce-49ba-a6a6-53a1c7d613aa.png" />
				<text class="text-group_1" style="margin-top: -10rpx;">
					{{i18n.wjsdd}}
					<br />
					{{i18n.ywjsdd}}
					<br />
					{{i18n.qxlksdd}}
					<br />
					{{i18n.cbjsdd}}
				</text>
			</view>
			<button class="button_1 flex-col" @click="onClick_1">
				<text class="text_3">{{i18n.jx}}</text>
			</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				constants: {}
			};
		},
		computed:{
			  i18n() {
			  	return this.$t("ident")
			  }
		},
		methods: {
			back() {
				uni.navigateBack(1)
			},
			close() {
               uni.navigateTo({
               	url: `/pages/market/market`
               })
			},
			onClick_1() {
				// uni.navigateTo({
				// 	url: `/pages/authentication/success-authent`
				// })
				uni.navigateTo({
					url: `/pages/authentication/card-positive`
				})
			}
		}
	};
</script>
<style lang='scss'>
	@import '@/common/common.scss';
	@import './assets/5.scss';
</style>
