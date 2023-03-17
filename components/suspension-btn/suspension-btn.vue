<template>
	<view class="suspension-btn" @click="getPath()" v-if="check">
		<view class="suspension-img">
			<image src="../../static/image/new/12.png"></image>
		</view>
		<text class="f-text">{{i18n.sfyz}}</text>
		<image style="width: 10rpx;height: 18rpx;" src="../../static/image/new/13.png"></image>
	</view>
</template>

<script>
	/*

	 */
	export default {
		data() {
			return {
                check:false,
				btnCode: false
			}
		},
		computed:{
			i18n() {
				return this.$t("ident")
			}
		},
		mounted(){
			this.getUserInfo(uni.getStorageSync("userId"))
		},
		methods: {
            getPath() {
				if (this.btnCode) {
					uni.navigateTo({
						url: `/pages/authentication/success-authent`
					})
				} else {
					uni.navigateTo({
						url: `/pages/authentication/authentication`
					})
				}
				
			},
			getUserInfo(member){
				this.$u.api.user.getMember(member).then(res => {
					console.log("用户信息",res)
					if (res.result.cardState === "WAIT") {
						this.btnCode = true
					}
					if(res.result.cardState === "PASS"){
						this.check = false;
					}else{
						this.check = true;
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.suspension-btn {
	position: fixed;
	background: #F5D45C;
	border-radius: 50rpx;
	padding: 10rpx;
	display: flex;
	align-items: center;
	right: 2%;
	bottom: 10%;
	.suspension-img {
		& image {
			width: 60rpx;
			height: 60rpx;
		}
	}
	.f-text {
		padding: 0 10rpx;
		font-size: 26rpx;
		color: #1F222B;
		font-weight: bold;
	}
}
</style>
