<template>
	<view class="page">
		<view class="container">
			<view class="suc">
				注册成功
			</view>
			<view class="sub">
				开启您的数字货币之旅
			</view>
			<view class="">
				<u-radio-group v-model="value1">
					<u-radio name="1">
						我已同意授权调用系统信息通知权限
					</u-radio>
				</u-radio-group>
			</view>
			<view class="">
				<u-radio-group v-model="value2">
					<u-radio name="1">
						我已同意授权访问地址簿
					</u-radio>
				</u-radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1: 1,
				value1: 1,
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.container {}
	}
</style>
