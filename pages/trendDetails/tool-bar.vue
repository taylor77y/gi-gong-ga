<template>
	<view class="tool-bar">
		<view class="crypto">
			<image class="icon"
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATySURBVHgBzZrvThtHEMBn9nxupSqS+wQ1TwB5gppWVb9UlfMEYKmh6idAgUoGVRxCgFqogE8tJJKdJ4Ao/dSogTwBxxPgPkEtVZEin+8mM4t9Of//s2vin4Tw3S3rmd2Z2Zk5ECzgeaWM+yDIA8EcAn0BCHNAmOFHmXgQUoUIK/zpBiLwg9C98oqFChiCMCYidPpBfZmIcjxJDsaAAHxW5sREmZEVaAoORCuQXGFDCKEc1NztURUZSYG9359u2Ra8A0Rv48nj7aGHDzNof/+PLKXUBU8+C/cBQaVWd+eH2Q01aMDe4bMFcp3rexNeQMim3eB65/BZftDQvgpok4GoDJM0md5kHIjO72TojdPrQcPePfj45L7+9nv45++Xb7o97OoDe7/y1jnROUwVanFj7Yfn7Xc7FNAOKzb/ccymH9Va4D5sd+wOH+BocwmWhCc+pELCeT7shg6Lfci4btBhFS0KaLtHzII9/F/WH1+BiipgATaXud2DUy95L1ZATGdKnLYviLjsHZViC4kVIFd5YAnOca7EfBTnOPpG6Pi8OM8loQNzMm69ttK80E7ccNxbMAWhEkZY0GbTBfmeyHVW+EuXwYxqzXFnvNVCVe9A5Dg5MAWhijV3vpfwQrH4U2VzbWmFd+gEzIh3IaUvlfGK8CrQdrEtxO0cnuYdgmytnr5Ihr/Acb10GCyASbRD/FL/smU+GLgzSQU4oh01Mlehyj4xv/nzkt98LtGEHXILDGAz+lxZMR8WMCm8jhIfhBcy7bscIfhgiBsEecUTz4EpBNXk5Sfv3nWYBlJr1ZYKImMFRHbcPTy7HLckTCLbKVGhed113vYwSpgFA4iiFwqRsmABp15v2UkVhAUieNH6jZht+TEEQc0qGxMJCukoea1D5vpSXnIhfYhNAoQM7h2eEVhCF+bKXU2aUpNGWepx+FsAi1hVQMP1LJvONofMcrfHu7+dLaIC2S0rGa8o8B9MIvfvo8jOwdOcg3QJFlAcGaowCbgw55Uu7R2c3cqqJx/pdMOGX/AiKYrwBiZJrMhp8mCDEOECDGGfq6QkgwRDuNSb8VrSiNPbjuh257zHzUs5yDiFAUNu2IRC8yPdCVp8aJhd5RTG3O+4SawC9anxVvJhmGudF4/bx3Bd3HKoRYjGCkjBpCRmSwUFBlBbbBcn5ezzoVRlPHeZfxc213/0kmMcjBbBDF8SSF2R2UhtR2nK2kjh9aJwiNYVWZBKy5abhVNuCAxqAwpyBjRaN0Y06+24sWVlFwSSqEYnISi/WV4m3uAs2Mh8eY5ycW2pIJ/jroSVXbibPcvmdCQnrbdfysqt9Ge1Y64HSjaE1wRubKqxAtqZiUyL7YkjXb5k9dfRG+VC5Fo6YGCDkB6FSlUVwha//MuBKXzobjxZmkneSrWP4ULkkbXmroPnDlhKdhttm/bbHc1dKUQ4RK3CtFFXhWKXV05dk5HXr176X33zHQclzMEUIHbPMf/Pbs96ZlOvX/11NQ1KaOHbTvEkA99S6u4aYAnu+4UH2zyFsNqrsvswbAj00Z/m09NSA2AwdINBOl8c4jXrSC+6rZ3W0FMabkHSST+T6fyTEZlId6EhePA2fex5hZGygbH/2UP3+qWvyj3PcQ8+ncYTvRlH8CZjK5AkVkYUUTCru31Jf0HJsbh5QOBztfYvxz4/+N+9GFfoJO8B9s9AzfbHtEAAAAAASUVORK5CYII=">
			</image>
			<text class="text">{{i18n.hl
			}}</text>
		</view>
		<view class="long">
			<button class="btn" type="warn">{{i18n.kd}}</button>
		</view>
		<view class="short">
			<button class="btn" type="warn">{{i18n.kk}}</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
			}
		},
		computed: {
			i18n() {
				return this.$t("trendDetails")
			},
		},
	}
</script>

<style lang="scss" scoped>
	.tool-bar {
		position: fixed;
		width: 100%;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		color: #fff;
		background: #272c38;
		padding: 10rpx 30rpx;

		.crypto {
			padding: 4rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0 20rpx;
			flex-shrink: 0;

			.icon {
				width: 36rpx;
				height: 36rpx;
			}

			.text {
				color: #868c9a;
				font-size: 26rpx;
				margin-top: 4rpx;
			}
		}

		.long {
			flex: 1;
			padding: 0 20rpx;

			.btn {
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 28rpx;
				background: #2ebd85;

				&::after {
					content: '';
					position: absolute;
					width: 100%;
					height: 100%;
					transform-origin: 0 0;
					transform: scale(0.5, 0.5) translateZ(0);
					box-sizing: border-box;
					left: 0;
					top: 0;
					border-radius: 12rpx;
					border: 0;
				}
			}
		}

		.short {
			flex: 1;
			padding-left: 20rpx;

			.btn {
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 28rpx;

				&::after {
					content: '';
					position: absolute;
					width: 100%;
					height: 100%;
					transform-origin: 0 0;
					transform: scale(0.5, 0.5) translateZ(0);
					box-sizing: border-box;
					left: 0;
					top: 0;
					border-radius: 12rpx;
					border: 0;
				}
			}
		}
	}
</style>
