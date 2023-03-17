<template>
	<view class="page">
		<heder-box title="i18n.sd" />
		<view class="box-border px-30 mt-42">
			<view class="flex justify-between text-grey relative">
				<view class="flex flex-col">
					<text class="text-grey font-30">Holdings amount（USDT）</text>
					<text class="font-66 mt-20 font-700 textColor">0</text>
				</view>
			</view>
			<view class="flex mt-44 justify-between font-26 lh-32 mb-35">
				<view class="flex flex-col ">
					<view class="text-grey font-26">Est. DIY（USDT）</view>
					<view class="font-40 mt-17 mb-9 font-36 textColor">0</view>
				</view>
				<view class="flex flex-col">
					<view class="text-grey font-26">Revenue（USDT）</view>
					<view class="font-40 mt-17 mb-9 font-36 textColor">0</view>
				</view>
				<view class="flex flex-col">
					<view class="text-grey font-26">Escrow order（USDT）</view>
					<view class="font-40 mt-17 mb-9 font-36 textColor">0</view>
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
	
	.textColor{
		color: #333;
	}
	
	.font-66 {
	    font-size: 4.125rem;
	}
	.font-700 {
	    font-weight: 700;
	}
	.mt-20 {
	    margin-top: 1.25rem;
	}
</style>
