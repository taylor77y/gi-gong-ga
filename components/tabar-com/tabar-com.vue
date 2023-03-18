<template>
	<view>
		<view class="u-page">
			<!-- 所有内容的容器 -->
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar @change="onChange" active-color="#D4B02D" inactive-color="#B0B3BA" v-model="current" :list="list"></u-tabbar>
	</view>


</template>


<script>
	export default {
		data() {
			return {
			
			}
		},
		created() {
			if (this.current === 0) {
				uni.navigateTo({
					url: '/pages/index/index',
				})
			}
			let pages = getCurrentPages(),
				// 获取当前页面的对象
				view = pages[pages.length - 1];
			// 处理每次点击在页面 下面不选中问题  
			const temp = {
				'pages/market/market': 1,
				'pages/transaction/index': 2,
				'pages/financial/index': 3,
				'pages/financial/delivery': 3,
				'pages/fund/assets': 4

			}
			this.$store.commit('setTabarCode', temp[view.route] ? temp[view.route] : 0)
		},
		computed: {
			list() {
				return [{
						iconPath: "/static/image/nav/nav-1.png",
						selectedIconPath: "/static/image/nav/nav-1-active.png",
						text: this.i18n[0]
					},
					{
						iconPath: "/static/image/nav/nav-2.png",
						selectedIconPath: "/static/image/nav/nav-2-active.png",
						text: this.i18n[1]
					},
					{
						iconPath: "/static/image/nav/nav-3.png",
						selectedIconPath: "/static/image/nav/nav-3-active.png",
						text: this.i18n[2]
					},
					{
						iconPath: "/static/image/nav/nav-4.png",
						selectedIconPath: "/static/image/nav/nav-4-active.png",
						text: this.i18n[3]
					},
					{
						iconPath: "/static/image/nav/nav-5.png",
						selectedIconPath: "/static/image/nav/nav-5-active.png",
						text: this.i18n[4]
					}
				]
			},
			i18n() {
				return this.$t("nav");
			},
			current() {
				return this.$store.state.tabarCode;
			}
		},
		watch: {
			current(val) {
				this.onChange(val)
			}
		},

		methods: {
			onChange(e) {
				this.$store.commit('setTabarCode', e)
				const temp = {
					0: '/pages/index/index',
					1: '/pages/market/market',
					2: '/pages/transaction/index',
					3: '/pages/financial/index',
					4: '/pages/fund/assets'
				}
				uni.navigateTo({
					url: temp[e]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background: #fff;
	}
</style>
