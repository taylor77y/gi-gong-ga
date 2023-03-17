<template>
	<view class="home-application">
		<view class="item" v-for="(item, index) in list" :key="index">
			<view :class="{'item1': checkCode === index}" @click="getCode(index)">
				{{ item }}
			</view>
		</view>

	</view>
</template>

<script>
import th from '../../common/locales/th'
	/*
	 */
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			}

		},
		data() {
			return {
                checkCode: 0
			}
		},
		created() {
			
		},
		watch: {
		   	list(val) {
				console.log('我进来了 ')
				this.checkCode = val
			}
		},
		methods: {
           getCode(index) {
			   this.checkCode = index
			 
			   this.$emit("getCode",index)
		   },
		
		}
	}
</script>

<style lang="scss" scoped>
	.home-application {
		display: flex;
		flex-wrap: wrap;
        margin: 0 -12rpx;
		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 24%;
			color: #8D9099;
			font-size: 28rpx;
			text-align: center;
			
		}
		.item1 {
			color: #1F222B;
			border-radius: 4rpx;
			background: #ECEBF0;
			font-weight: 500;
			width: 100%;
			// transition: all 0.1s ease 0s;
			// transition: transform 250ms linear;
		}
	}
</style>
