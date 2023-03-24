<template>
	<view class="page">
		<xl-header title="History"></xl-header>
		<u-tabs :list="tabList" :is-scroll="false" :current="tabCurrent" @change="tabChange"></u-tabs>
		<view class="container" v-show="tabCurrent == 0">
			Deposit
		</view>
		<view class="container" v-show="tabCurrent == 1">
			Withdraw
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
					name: 'Deposit'
				}, {
					name: 'Withdraw'
				}],
				tabCurrent: 0
			}
		},
    onLoad(options){
      this.tabChange(options.type)
      // this.tabCurrent = options.type
    },
		methods: {
			tabChange(index) {
				this.tabCurrent = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-navbar {
		box-shadow: none;
	}

	::v-deep .u-border-bottom:after,
	.u-border-left:after,
	.u-border-right:after,
	.u-border-top-bottom:after,
	.u-border-top:after,
	.u-border:after {
		border: none;
	}
</style>
