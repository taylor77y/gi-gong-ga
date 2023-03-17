<template>
	<u-navbar back-icon-name="arrow-left" back-icon-color="#868c9a" :background="{background:'#fff'}" title-color="#333"
		:title="title">
		<slot name="right" slot="right">
		</slot>
	</u-navbar>
</template>

<script>
	export default {
		name: "xl-header",
		props: {
			title:''
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
