<template>
	<u-popup :closeable="true" v-model="shows" @close="onCancelar" mode="bottom" border-radius="20" z-index="102">

		<view class="coupon-list">
			<view class="f-tb-title">
				{{ i18n.tbdz }}
			</view>
			<view v-if="couponState" class="coupon-list__pane">
				<view v-for="(item, index) in couponInfo" :key="index">
					<view class="coupon-item">
						<view class="coupon-item__content">
							<view class="coupon-item__body">
								<view class="name">
									{{ item.currencyType }}
									<u-icon name="edit-pen" @click="edtTemp(item)"></u-icon>
								</view>
								<!-- <view class="time">
									2022/2222
								</view> -->

							</view>
							<view class="radio-box" @click="onRadioChange(index)">
								<view class="circular" v-if="radios !== index"></view>
								<view v-else>
									<image src="../../static/image/new/15.png"></image>
								</view>

							</view>
						</view>
						<view class="coupon-item__description">
							{{ item.address }}
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<u-empty :text="i18n.zwdz" mode="list"></u-empty>
			</view>
			<view style="height: 60rpx;"></view>
			<view class="coupon-list__bottom">
				<u-button @click="toAdd()" type="warning" round>{{ i18n.tjdd }}</u-button>
				<view style="height: 20rpx;"></view>
			</view>
			<u-modal :confirm-text="$t('common').confirm" :cancel-text="$t('common').cancel" :show-cancel-button="true" z-index="9999" :title="titleInfo[dialogStatus]" v-model="code"
				@confirm="confirm" ref="uModal" confirm-color="#F5D45C">
				<view style="padding: 0 16rpx;">

					<view class="fb-name c000 size13" v-if="couponTitle === 'USDT'">
						{{ i18n.lianmin }}
					</view>
					<view class="f-list size13" v-if="couponTitle === 'USDT'">

						<view class="item" :class="{'item1':isSelect !==ind}" @click="selectHandle(ind)"
							v-for="(i, ind) in actions" :key="ind">
							{{ i.name }}
						</view>

					</view>
					<view class="fb-name c000 size13">
						{{ i18n.tbdz }}
					</view>
					<view class="f-input">
						<input class="f-inp" placeholder-style="color: rgba(169, 178, 205, 1)" type="text"
							:placeholder="i18n.qsrtbdz" v-model="address" />

					</view>
					<view style="height: 40rpx;"></view>
				</view>
			</u-modal>
		</view>
	</u-popup>
</template>

<script>
	/*
	 *@property { Boolean } show 控制组件显示隐藏
	 *@property { Number } active 可用不可用切换
	 *@property { Array } couponTitle 币种名称
	 *@property { Boolean } couponState 是否有优惠券 true有 false 无
	 */
	export default {
		filters: {
			timeFilter(time) {
				if (time) {
					return time.slice(0, -9)
				}
			}
		},
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			active: {
				type: Number,
				default: 0
			},
			couponTitle: {
				type: [Number,String],
				default: ''
			},
			couponState: {
				type: Boolean,
				default: true
			},
			couponInfo: {
				// 优惠券数据
				type: Array,
				default: []
			}

		},
		computed: {
			i18n() {
				return this.$t("recharge")
			},
			titleInfo() {
				return {
					update: this.i18n.update,
					create: this.i18n.create
				}
			}
		},
		data() {
			return {
				actions: [{
						name: "ERC-20"
					},
					{
						name: "TRC-20"
					}
				],
				code: false,
				radios: 0,
				shows: false,
				isSelect: 0,
				address: '',
				dialogStatus: '',
				baId: null

			}
		},
		watch: {
			isShow(val) {

				this.shows = val
			}
		},

		methods: {
			// 修改
			edtTemp(temp) {
				this.dialogStatus = 'update'
				this.code = true
				this.address = temp.address || ''
				this.isSelect = temp.currencyType === 'ERC-20' ? 0 : 1
				this.baId = temp.id || ''
			},
			// 新增
			toAdd() {
				this.dialogStatus = 'create'
				this.code = true
				console.log('我来了')
			},
			selectHandle(index) {
				this.isSelect = index;
			},
			confirm() {
				const {
					address,
					baId,
					dialogStatus
				} = this
				if (!address) {
					this.$utils.showToast(this.i18n.qsrtbdz)
					return
				} else {
					const member = uni.getStorageSync('userId')
					const currency = this.couponTitle
					const currencyType = this.couponTitle === 'USDT' ? this.actions[this.isSelect].name: this.couponTitle
					if (dialogStatus === 'create') {
						this.$u.api.user.saveBillingAddress(member, currency, address, currencyType).then(res => {
							this.handleErro(res)

						})
					} else {
						//修改
						this.$u.api.user.updateBillingAddress(member, baId, address).then(res => {
							this.handleErro(res)
						})
					}

				}
			},
			handleErro(res) {
				if (res.status === "SUCCEED") {
					this.$utils.showToast(this.i18n.tianjiachenggong)
					this.address = ''
					this.isSelect = 0
					this.code = false
					this.$emit('getBillingAddressList')
				} else {
					this.$utils.showToast(res.errorMessage)
				}
			},
			addFn() {

				console.log('新增了')
			},
			onChange(e) {
				this.$emit('onCouponChange', e.detail.index)
			},
			onCancelar() {
				// this.radios = null
				this.$emit('update:isShow', false)
			},
			onRadioChange(index) {
				this.radios = index
				console.log(index)
				this.$emit('onRadioChange', index)

			}
		}
	}
</script>

<style lang="scss" scoped>
	.f-list {
		display: flex;
		flex-wrap: wrap;

		.item {
			width: 204rpx;
			height: 76rpx;
			border-radius: 6rpx;
			background: #F5D45C;
			color: #000;
			border: 1px solid #F5D45C;
			margin-right: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;

		}

		.item1 {
			color: #A9B2CD;
			background: #F8F8F8;
			border: 1px solid #ccc;
		}

	}

	.fb-name {
		margin: 44rpx 0 22rpx 0;
		font-weight: bold;
	}

	.f-input {
		height: 76rpx;
		position: relative;

		.f-right {
			position: absolute;
			right: 22rpx;
			top: 25%;
			font-size: 24rpx;
		}

		.f-inp {
			background: #F3F3F3;
			// width: 100%;
			// height: 100%;
			padding: 22rpx;
			color: rgba(169, 178, 205, 1);
			font-size: 24rpx;
			border: none;
			border-radius: 10rpx;
		}
	}

	.f-tb-title {
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		color: #000;
		font-weight: bold;
	}

	.radio-box {
		padding: 0 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		.circular {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
			border-radius: 50%;
			border: 1rpx solid #8D9099;
		}

		& image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
	}

	.coupon-list {
		position: relative;
		height: 800rpx;
		background-color: #f7f8fa;
		white-space: nowrap;
		-webkit-overflow-scrolling: touch;
		overflow-x: auto;

		&__pane {
			padding: 32rpx 0 48rpx;

			.coupon-item {
				margin: 0 24rpx 24rpx;
				overflow: hidden;
				background-color: #fff;
				border-radius: 16rpx;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

				&__content {
					display: flex;
					align-items: baseline;
					justify-content: center;
					box-sizing: border-box;
					// min-height: 84px;
					padding: 32rpx 16rpx;
					color: #323233;
					position: relative;

					.coupon-tag {
						position: absolute;
						background: #fee5e5;
						font-size: 20rpx;
						color: #ee0a24;
						top: 0;
						left: 0;
						padding: 4rpx 12rpx;
						border-radius: 0 0 16rpx 0;
					}
				}

				&__head {
					position: relative;
					min-width: 182rpx;
					padding: 0 16rpx;
					color: #ae2c30;
					text-align: center;
				}

				&__amount {
					margin-bottom: 12rpx;
					font-weight: 500;
					font-size: 60rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;

					text {
						font-weight: normal;
						font-size: 40%;
						margin-left: 8rpx;
					}
				}

				&__condition {
					font-size: 24rpx;
					line-height: 32rpx;
					white-space: pre-wrap;
				}

				&__body {
					position: relative;
					flex: 1;

					.name {
						// margin-bottom: 10px;
						font-weight: bold;
						font-size: 28rpx;
						line-height: 40rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.time {
						font-size: 24rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}

				&__description {
					padding: 16rpx;
					font-size: 24rpx;
					// border-top: 1px dashed #ebedf0;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		&__bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 999;
			box-sizing: border-box;
			width: 100%;
			padding: 10rpx 32rpx;
			font-weight: 500;

		}

	}
</style>
