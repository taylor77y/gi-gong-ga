<template>
	<view class="page">
		<uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="Mining Machine"></uni-nav-bar>
		<view class="box-border px-30 mt-42">
			<view class="flex justify-between text-grey relative">
				<view class="flex flex-col">
					<text class="text-grey font-30">Holdings amount（USDT）</text>
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
			
		}
	}
</script>

<style lang="scss" scoped>
.box-border {
    box-sizing: border-box;
}
.mt-42 {
    margin-top: 2.625rem;
}
.px-30 {
    padding-left: 1.875rem;
    padding-right: 1.875rem;
}
.text-grey {
    color: #868c9a;
}
.relative {
    position: relative;
}
.justify-between {
    justify-content: space-between;
}
.flex {
    display: flex;
}
.flex-col {
    flex-direction: column;
}
.font-30 {
    font-size: 1.875rem;
}
</style>
