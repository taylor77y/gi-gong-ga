<template>
	<view class="page">
		<xl-header title="Fast deposit"></xl-header>
		<view class="container">
			<view class="title">
				USDT Deposit
			</view>
			<view class="qrcode-container">
				<!-- 二维码，qrcode/imgUrl -->
				<image class="qrcode"
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAD7lJREFUeF7tnWG627YORNs9Zf8ryJ7u+xz7xYoqCUcjUIquT/+KBMDBDADSSfrv19fX1z/+JwIisIjAvwpEZojAOgIKRHaIwAYCCkR6iIACkQMikCFgB8lwc9eHIKBAPiTRHjNDQIFkuLnrQxBQIB+SaI+ZIaBAMtzc9SEIKJAPSbTHzBBQIBlu7voQBBTIhyTaY2YIKJAMN3d9CAIK5EMS7TEzBBRIhpu7PgQBBfIhifaYGQIKJMPNXR+CQJtAfvz4cRlkP3/+jHzPYyZ2kj1LwRG8zopnKZa57zResi9KHthE8KvMKJAJQgRQBbJOqSX8FMgLrzsCkZA92WMHqer0mO+k4FWe7SB2kH8csdZlokAUiALZaCNDBdLR4sh4QvyMGgHJ3N21ZgmL6jJNfBO7aR66RtJqFCJdsLKx9F2BJKgVXYeQIllDiDzKrgI5SJRRCk4TM99nB3kjQrBIujLpVsRuQsVR/LODJNmwg/xCIOlWCmSDPKRyzfmaVqUkeYlWSHxkNEo7JTln0k2ru83DJiF7FV/CiSXf36KDJGAQAnatUSBvBBTIE4tTRywFsk5AO8i+8tQl4MqrAqkQKr6T7uWIta8zkZQokBdKhIBda0hikjuSAlEgbb/GJgQkAukiKRFRcnkl8ZGLaHUp7nx96vCVjN1e0idsIeQnawgByT1AgbwRUCCEDa81SXUj5gn5yRoF0kvsrk5kB5kwMwGDkJ+sUSAKhBTk+Zpv+4qVgJF0QXLfIKPbKJGTM3XFR85AXp9I7oidNDdT/wqk6HBVItIkJPN70gUVCJHb+hoFokAW2ZEI2A6yIUZSqc68gyR1IzmDHeSNtAI5KJCEtOl8THyRKknszNeQQlCNbnScqs5ARJ+csesVK/VNME+L12V3kFFgpEBU5ErjVSD7XsxSnKf7RhWCU+8gHUDQykV8KRCC0voagh9ZcyyK524FsnGZtoOs3wNGEYcWKgXyys3IRFTzpgJRIKP4N3TE6midxEbyetJVAUlirlxzJTZrow/JaceatHCedknvOCSxcSUJriT/A5vqNexKbBTIxr2AELtrzZUkUCDr450CUSDo9eRKEV1ZPBRIVws4wQ75bSIJIyVg9fBAY0lGrC7fczsdMz8991nr2i7pZwWc+lEg68h1YaNAUnb+Bfu6SECqZvL2n8ZnBxlLLjvIQXwdsbYv6QfhvXy7AjmYAgWiQA5SaHt7NVoQAi55qEYPeqjEDtlD5vWOUe1M/MiZCO4VJx42unxV8VzeQSowzkxwl9AUSEW7Y0VTgUzwUyD7RhjSdaqitETAZE8qkzN9VTHaQQqESDeoXrbID4VLYRCyz/eRPQkBkz0V+da+n+mrinGoQEiyqgBTclV2H987EkHiI35IvGTuTnyRLp2uSQRc7SFYdY1hCmRnByHJS7oOSboCISjtG0kriwpEgSy+CJHuT9ZUBWWU6O0glfTBdzKOVAl0xNpXsTtEBVL7a0mVO2LHDmIHsYNscGCoQKr2mqo8qUJLGCQd5Kw9pLpdeSb6yDGPkVR1kt8kDwmmCmRnB0kSk+xJkklJmzwikFcsErMC2UCJzOsEZFJhEjtLezrIpED67ylnYWoHsYPEvwcRkjpi7egYpE2TFpzcbdLulZCAdC/SmQgWHfF1+SH5JdiQNV34Vb6GdhAyCpE11SEI+cma9NJbxZeObl3EreLr8qNAKqRn3wn5yZrKLSE/WaNA1pEmnUqBVExVIBihrhGBELcKyg6yjpAjVsGeDgI6YlUS3f+9q8BUntsE0kWkpJqRPRUQa9+TEZBgQWImvqs1XaNl1/iUnJvkjtglduZrFMjODkISoUDWQe3Cb+6B2FUgCQIKZBGBqjM9NpFCkBB5lN2EHnYQBaJANjjQJhDyRJq0QTJDJxWHXJxJxSG+yfxO1pCYSeWf20kxTi7KKV5VzAm3SH4VyASlBOQ04YTIiW1ityLb43sX+YmdjjEsyZ0CIQgokMv/hXoF8kIgUXna/ndq49fyrvhIwkmlt4OsZ5Hgl3BgvufyEas6KCEJAYLM+EQgVbz0dYf4SkYhsifFq7KdYJzml4xuCcYKZIIAIXsHKcjlmpCWdNMqXuKHdlOCX7VGgRQz/igAu8acinCkaiqQNwKk8hMREzt2EILkxv2nEueSebKHVMUkeXaQfUJLMHbEcsRCZYWQKykWpPKTAIkdcobK1y0v6Qk4SfUlF+50xKoSs3QPIJ2JjJbEd0J+YvfMNQrkhTYhP1lDRipCwITI5J6S2E1JokCeGbGDFCWtIqUd5MyesM9XWhymXhSIAllEwA7S3EFGjTD7asa+Vw4yLs3XEOKQmImdqnul9xRSWRPfXSNqhTkZR0kOyJq2DqJACNzvNQrkicWZYt2XITvIf/BKkkX2kMqa3mXIi15Hp0yrdtWJCH6VDSo0BTJB4CzikAQrkHVqEvwUSCLtYo8C+TtIWZH7owVCWnsFIGntxAYZYcgaomWS9OQiSnwnmKfnJkUowYJg02GX4Dn0kp4kiwRNEpP4TolCfFXnIiKvbJBi8lhz5gNBB5HTB6AEr/keBbJxb1kiEwE9IYUCWUdWgRDWDbiAd1VSO8gTgVFEHmWX0K6tgxBnSZUkYw+p2Invx5mqcS71XdkleJKRKiVXildVLEYVJYJFgqkCKVCriKxAtgFM8BslTgWygUAKepLgeRikiqfx7a3YS11xCbaz4iETQkJses7Kth3EDrKIgAJ5wqJAFIgC2eDAXyeQaqRJWycZc7pGjeReQkaNLrujRsDkDGleqtGo67sCKZBMRo0uIpMXn4rsSSzk9Y6+GlVnUCATJAnZ7CBvwCpykY6nQI71EjuIHQT9wJcUtwe0lcg/poOQg6ZrqhqQVsnqiTSt0CmZknGpImCF3dr35AxJfknuyBmIb2Jnvqatg5AA0zXVwQjIScIVyDbyyTh8pqAJLypuKZAJQgRQkuArxUjOUJFiaTQil/KkAI6Mt8O2AlEgi3pJRK5ANkpPAk76nNhxdyAV0RHLEautg3S17VHkJ/EloiGFgQiNxEd+iCN2Rq3pii+524w6kwIpkK3mWAXyBlCBHJQpmWvtIOsgdxHwYBpXt3fFZwfZkaGqgtMXlx0u/1ha+beD2EFSbrXsS7oOvUsktruqG3kunp+DxEviI4khdpI1xDfBJsGC+J6vOfUOkgRIgCB2/7b2T0igQJ4IpLmruj/hjQIhKE3WdFVNBbIOPMGGFE4FsoPcaRWqHg267iAkmQkpyB4ykpJzkjUkZd9SIAScNFkVSZdAJ76SbkDsEhKQMxGiVGNYKjyyr/K9Nh4l+FS+knhJHG0jlgIhcK+vIR2OkKBDVCmxCQeOofTenZwz8a1AJqiRBNtB+N0hFRohsgLZQCmppCPnbJLQao0dpELoz+8KRIGUfxuP3L3SYkL2VfcCO8g+0S/+1c7KBKmsI7tDRZR05Op6IKjiIyI6E78Ur4on5AyJjbY7CHGegKNA1i+maYUmeRglYOKbcImsSYrH3K4C2XlJJ2NFkrz0gSAhASGpAnlmUYEokEU9K5BmgZAKSObhMxNDqm9VbbtGQNJ1CH7zNR1nXIuN2K7OlfKmstv1va2DpAetnuuI3a41XQSsRJXeHbriGzUmJqQkuUvsdu1RIAWSFdntIMeoqEB2EtARax/hEgHbQTjGdpCdAiYzfkVaR6w3ih/dQbhOj60kl0VC2mNRjN896pzEbnL/IYikI2pqm+ybrhnaQfYGk64nCVYg6+gS/BRIys7XvisJSBJ8ZXwHof29fdQ5iV0FcjCLVxKQJPjK+A5Cq0BCAAkvKtNDR6yOAKsDPL4T8nfNumedaVTFpg8E1e9TS7iPwjjNL+FOtUaBVAjNviuQNyCJiAjc5Kl/bmdUXhQIydhkzahEkDBIJSV2yBkS8ttBNtC/8j2bEGdU8gghu9aQcxJfCoSg9FxjB+FY/VpJyLXTJF6uQNahGpWXUwVCukxCgrQ7JKCS+IhdMsLM6ZDgl2JDZnyCBVb/xsL0DCQPVXwKpEJo9p2QgiRGgXDgFcgEK0LArupGiEyqOImnskNisYO8USQ8IZhWMrWDVAjZQVbvXoSkO+FdXP4tOkgHEJ02upJXvcmTKpXGQmx3YEbiIyRN4iVdseOMqY22DpIGMGofSTrxrUCeKCkQwpYbrVEgPFkEKwXC8bzFSpJ0chA7iB3kixDlbmsUCM8YwcoOwvFcXElAPuhidXtX8sgZqo6SnjG54D58Vb+nkDMtxZycM8lDGh/BOcV0arvtkj7yoBUYSWKWbJIzJMSp4l+7BJN9CmQdJQXywkaBvEnSJeDETpIHUpRIoSBdMLFjB5mgRpKVEIckJq12dpAbd5A06RWhKlJU+///PbGT7CHxEHESO/M1JAfpj3UdWJBzkzMk2JA9QzvIqIN1JIZccMk9peuMhCgkoQokQWl9jwKZYEPI3iXOeUoUyNhRKZWNAlEgi//oxVnFghQGEksqgGrfqQIhYJARgVRxsoZU8eRSThLaFV+VYBJLZWPte5LPxBc5Q3qPquJRIMUrlgJZp5ACqeQ1gFx2kF5Ckuq7I81/LFUgO5AjLS4BNPnxqeuF6mHHDtIr2B2U+r2UiJzwL/HtiDWgCyYJTfaQhBO7xM7SmqTgJb7IGRTIBpFJlyGJSRNBbCdrSDzVQwPBhvghBCSCIR05jYeM53vz8DEdhADTlRjii6wh8SiQdSQT/ObWFMgEEQIoqZKE/GQNiUeBKJD/IEB+Q0iITAiZ2CViWFpD4lEgCiQSSEJKQn4yQye+U4FUxSK9OxBxErwqLNI7EvFNzlDF921HrOrg6auMAnkjR0ha5UGBTBBKAE0BrBKjQLaJTqpvkk/y0lR1xYcN4pucoeKJHWSngO0gdpBKVIvf01m3cmYH2UaoqrZpXkj1JVV8VH6Jb3KGKr5TO0gVDP1ekYLaqV6Aui7OaTxkX0dHI0RKhUZGqiQPCTZkz3yNAjk4YqV3mSRZRLCksnaRNhFnKsYEL+KrsqtAFAj6v2bZQSopFd8JgAdd/N7uiPVGMqnidhDOxKEdhIdxbCVppUTAZDwhvshM3WUnQY74JlgQ3x0CTkdLcs7qDApkwIilQHo7nAKpZFx8J5XCDrJO2pEPDXaQF7pdLTnRigLZh1qK1z4vz9UKRIGUvCHdqzQC/3gFsaNACErPNW13EO7SlSJwHwQUyH1yZaQXIKBALgBdl/dBQIHcJ1dGegECCuQC0HV5HwQUyH1yZaQXIKBALgBdl/dBQIHcJ1dGegECCuQC0HV5HwQUyH1yZaQXIKBALgBdl/dBQIHcJ1dGegECCuQC0HV5HwQUyH1yZaQXIKBALgBdl/dBQIHcJ1dGegECCuQC0HV5HwT+B2cUO/PZbxjoAAAAAElFTkSuQmCC">
				</image>
			</view>
			<view class="save-btn-container">
				<button type="primary" class="save-btn">Save QR code</button>
			</view>
			<view class="address">
				0xbA4D6b22908F1b6e3074204AC9A0Af4b04E1F78F
			</view>
			<view class="copy-btn-container">
				<button type="primary" class="copy-btn">Copy address</button>
			</view>
			<view class="input-container">
				<view class="title" style="margin: 10rpx 0;">
					Outgoing address (optional)
				</view>
				<input type="text" class="input" style="padding-right: 160rpx;" placeholder="Enter amount"
					placeholder-style="color: #C0C0C0;font-size:26rpx">
				<view class="paste" @tap="pasteClick()">
					Paste
				</view>
			</view>
			<view class="input-container">
				<view class="title">
					Deposit amount
				</view>
				<input type="text" v-model="amount" class="input" placeholder="Enter amount"
					placeholder-style="color: #C0C0C0;font-size:26rpx">
			</view>
			<view class="chain-container">
				<view class="title">
					Chain name
				</view>
				<view class="btn-list">
					<view class="btn" :class="{active:btnIndex==index}" v-for="(item,index) in btnList" :key="index"
						@tap="btnIndex = index">
						{{item}}
					</view>
				</view>
			</view>

			<view class="upload-container">
				<view class="title">
					Payment voucher (upload a screenshot of payment details)
				</view>
				<view class="upload">
					<u-upload max-count="1" upload-text="">
					</u-upload>
				</view>
			</view>

			<view class="hint-box">
				<view class="title">
					IMPORTANT
				</view>
				<view class="content">
					Explain text, please do not recharge any non-USDT-ERC20 assets to the above address until you change
					it, otherwise the asset bonus cannot be retrieved.
					<br />
					·If you have completed the deposit, please click the "I have deposited" button on the page and
					submit the receipt, otherwise the deposit cannot be posted.
					<br />
					·USDT deposit only supports the simple send method, and the deposit using other methods (send all)
					cannot be posted temporarily. Please understand.
					<br />
					·After you recharge to the above address, you need to confirm the entire network node before it can
					be credited.
					<br />
					·Please make sure that your computer and browser are safe to prevent information from being tampered
					with or leaked.
					<br />
					·The above deposit address is the official payment address of the platform, please look for the
					official deposit address of the platform, and the loss of funds caused by incorrect deposit shall be
					beared by yourself
				</view>
				<button class="btn" @click="submit" type="primary">Next step</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnList: [
					'ERC20',
					'TRC20',
					'OMNI'
				],
				btnIndex: 0,
				currency: "",
				amount: 0
			}
		},
		onLoad(){
			// symbol
			this.currency=this.$mp.query.symbol
			console.log("symbol ",this.$mp.query.symbol)
		},
		methods: {
			pasteClick() {},
			//提交
			submit(){
				// if(true){
				// 	console.log("init...",this.btnList[this.btnIndex])
				// 	return;
				// }
				const temp = {
					currency: this.currency,
					amount: this.amount,
					status: 1,
					memberId: uni.getStorageSync('userId'),
					chainName: this.btnList[this.btnIndex]
					
				}
				// const {amount,account,selectCoin,i18n} = this
				// if(!this.$u.test.amount(amount)){
				// 	this.$utils.showToast(i18n.plsIptCrtAmount)
				// 	return
				// }
				// if(!account){
				// 	this.$utils.showToast(i18n.plsUploadPaymentVoucher)
				// 	return
				// }
				
				// const {id:currency} = selectCoin
					
				this.$u.api.user.chongzhi(temp).then(res=>{
					if(res.data.result==1){
						this.$utils.showToast("申請成功")
					}else{
					this.$utils.showToast(res.message)
					this.amount = ''
					this.account = ''						
					}

				
				})
			
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		>.title {
			width: 100%;
			margin-top: 40rpx;
			font-size: 32rpx;
			color: #333;
			text-align: center;
		}

		.qrcode-container {
			display: flex;
			justify-content: center;
			align-items: center;

			.qrcode {
				width: 400rpx;
				height: 400rpx;
			}
		}

		.save-btn-container {
			margin-top: 30rpx;

			.save-btn {
				width: 260rpx;
				font-size: 26rpx;
				border-radius: 0;
			}
		}

		.address {
			margin-top: 80rpx;
			color: #333;
			font-size: 28rpx;
			width: 100%;
			text-align: center;
		}

		.copy-btn-container {
			margin-top: 30rpx;

			.copy-btn {
				width: 260rpx;
				font-size: 26rpx;
				border-radius: 0;
				color: #333;
				background-color: #fff;
				border: 2rpx solid #f3f3f3;

				&::after {
					border: none;
				}
			}
		}

		.input-container {
			padding: 30rpx;
			position: relative;
			font-size: 26rpx;
			box-sizing: border-box;

			.title {
				font-size: 28rpx;
			}

			.input {
				// width: 100%;
				// background-color: transparent;
				background-color: #f5f5f5;
				border: none;
				border-radius: 0;
				font-size: 26rpx;
				color: #333;
			}

			.paste {
				position: absolute;
				color: rgb(44, 120, 248);
				bottom: 60rpx;
				right: 60rpx;
			}
		}

		.chain-container {
			padding: 30rpx;
			font-size: 26rpx;
			color: #333;

			.title {
				font-size: 26rpx;
			}

			.btn-list {
				display: flex;
				margin-top: 10rpx;

				>.btn {
					width: 206rpx;
					height: 80rpx;
					margin-right: 20rpx;
					border-radius: 4rpx;
					border: 2rpx solid #868c9a;
					color: #333;
					font-size: 28rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					&.active {
						border: 2rpx solid #2c78f8;
						color: #2c78f8;
					}
				}
			}
		}

		.upload-container {
			padding: 30rpx;
			font-size: 26rpx;
			color: #333;

			.title {
				font-size: 26rpx;
			}
		}

		.hint-box {
			background-color: #f5f5f5;
			padding: 30rpx;

			.title {
				margin-bottom: 30rpx;
				font-size: 26rpx;
				color: #333;
			}

			.content {
				font-size: 28rpx;
				color: #868c9a;
			}

			.btn {
				margin-top: 30rpx;
				font-size: 28rpx;
				line-height: 80rpx;
			}
		}
	}
</style>
