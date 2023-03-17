<template>
	<view class="page flex-col">
		<view class="section_1 flex-col">
			<image @click="cancel()" class="icon_1" referrerpolicy="no-referrer"
				src="/static/lanhu_wenjianrenzheng/ps6qm6i9nhr7f387qqe0z20plljwtcgd0m3e9faa0e-ef38-4718-993f-f8ac15b66c96.png" />
			<text class="text_1">{{i18n.wjyz}}</text>
			<!-- <text class="text_2">选择证件签发国/地区</text>
			<view class="block_1 flex-row">
				<view class="box_1 flex-col"></view>
				<text class="text_3">中国</text>
				<image class="icon_2" referrerpolicy="no-referrer"
					src="/static/lanhu_wenjianrenzheng/ps9zwigkgvzrj9y3v968awcrbeiehnfhgmnbc9ce43f-aaf8-4ca5-963f-5af764bb347a.png" />
			</view> -->
			<text class="text_4">{{i18n.syqfwj}}</text>
			<text class="text_5">{{i18n.jjsxad}}</text>
			<view class="list_2 flex-col">
				<view class="list-items_1 flex-row" v-for="(item, index) in loopData0" :key="index"
					@click="getImg(index)" :class="{'f-bor': code === index}">
					<view v-if="item.slot1 === 1" class="image-text_3 flex-row justify-between">
						<image class="icon_3" referrerpolicy="no-referrer"
							src="/static/lanhu_wenjianrenzheng/psopnlk0k75zvxq5qpb8pjsfeov1y2ijbe4fad9f7-6e59-4915-905b-e4f18297b569.png" />
						<text class="text-group_1">{{i18n.sfz}}</text>
					</view>
					<view v-if="item.slot2 === 2" class="image-text_4 flex-row justify-between">
						<image class="icon_4" referrerpolicy="no-referrer"
							src="/static/lanhu_wenjianrenzheng/psjfw1y1uav3rub75m9p1oy0ym13wl2k5op3e03b4de-8f4c-43db-a7af-85c75a8a5107.png" />
						<text class="text-group_2">{{i18n.hz}}</text>
					</view>
					<image class="icon_5" referrerpolicy="no-referrer" :src="item.lanhuimage0" />
				</view>
			</view>
			<button class="button_1 flex-col" @click="onClick_1">
				<text class="text_6">{{i18n.jx}}</text>
			</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				code: null,
				loopData0: [{
						lanhuimage0: 'https://lanhu.oss-cn-beijing.aliyuncs.com/psi1sqmdktoeoufc9r8fki0m11rg25ehdn2ecbf28b-4f4d-4b27-87a9-59183d50682b',
						slot1: 1
					},
					{
						lanhuimage0: 'https://lanhu.oss-cn-beijing.aliyuncs.com/psi1sqmdktoeoufc9r8fki0m11rg25ehdn2ecbf28b-4f4d-4b27-87a9-59183d50682b',
						slot2: 2
					}
				],
				constants: {}
			};
		},
		computed:{
			  i18n() {
			  	return this.$t("ident")
			  }
		},
		methods: {
			getImg(index) {
				console.log('888888')
				this.code = index
				const img =
					'https://lanhu.oss-cn-beijing.aliyuncs.com/psuy6y197womq0yqxc0tt8bhyd0jhq3i77179dc843-e95c-4b7b-84f5-2b9779324923'
				const imgs =
					'https://lanhu.oss-cn-beijing.aliyuncs.com/psi1sqmdktoeoufc9r8fki0m11rg25ehdn2ecbf28b-4f4d-4b27-87a9-59183d50682b'
				this.loopData0.forEach(item => {
					item.lanhuimage0 = imgs
				})
				this.loopData0[index].lanhuimage0 = img
			},
			cancel() {
			  uni.navigateTo({
			  	url: `/pages/market/market`
			  })
			}, 
			onClick_1() {
				if (this.code !== null) {
					uni.navigateTo({
						url: `/pages/authentication/card-authent`
					})
				} else {
					this.$utils.showToast(this.i18n.qxzhzlx)
				}

			}
		}
	};
</script>
<style lang='scss'>
	@import '@/common/common.scss';
	@import './assets/3.scss';
</style>
