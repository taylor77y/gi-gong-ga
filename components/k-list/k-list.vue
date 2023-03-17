<template>
	<view class="right-area">
		<view class="tops">
			<view class="f-top" v-for="(item,i) in openup" :key="i" >
				
				
				<view :style="{ color: `${code === 1 ? colorFn:''}`}">
					<text v-if="code === 0">
						{{ item.num | SubString(4) }}
					</text>
					<text v-else>
						{{ item.price | SubStringZreo(4) }}
					</text>
				</view>
				<view style="margin-right: 6rpx;" :style="{ color: `${code === 0 ? colorFn:''}`}">
					<text v-if="code === 0">
						{{ item.price | SubStringZreo(4) }}
					</text>
					<text v-else>
						{{ item.num | SubString(4) }}
					</text>
				</view>

			</view>
			
			<view class="areaBox" v-if="code === 0">
				<view v-for="(item,i) in openup" :key="i" class="items" :style="{ background: `${bgFn}`, 'width':(item.num/maxBuy)*70+'%'}"></view>
			</view>
			<view class="areaBox1" v-else>
				<view v-for="(item,i) in openup" :key="i" class="items" :style="{ background: `${bgFn}`, 'width':(item.num/maxBuy)*70+'%'}"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			openup: {
				type: Array,
				default: () => {
					return []
				}
			},
			code: {
				type: Number,
				default: 0
			},
			maxBuy: {
				type: [String,Number],
				default: 10
			}
		},
		data() {
			return {
			}
		},

		computed: {
			colorFn() {
				const temp = {
					0: '#E45360',
					1: '#5EBA89',
				}
				return temp[this.code]
			},
			bgFn() {
				const temp = {
					0: 'rgba(248, 100, 63, 0.07)',
					1: 'rgba(8, 200, 99, 0.07)',
				}
				return temp[this.code]
			}
		},
		created() {
			console.log(this.openup)
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.right-area {
		.tops {
			position: relative;
		}

		.f-top {
			font-size: 24rpx;
			color: #1F222B;
			margin-bottom: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
        .areaBox1 {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			.items {
				height: 20%;
			}
		}
		.areaBox {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: flex-end;

			.items {
				height: 20%;
				

			}
		}
	}
</style>
