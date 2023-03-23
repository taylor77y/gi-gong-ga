<template>
	<view class="with-draw">
		<!-- 头部导航栏 -->
		<view class="header">
			<view class="back" @click="back()">
				<u-icon name="arrow-left" :size="50" color="#82848a"></u-icon>
			</view>
			<view class="right">
				<u-icon name="clock" :size="50" color="#82848a"></u-icon>
			</view>
		</view>
		<!-- 内容 -->
		<view class="content">
			<view class="title"><text>{{i18n.tb}}{{withdrawalName}}</text></view>
			<view class="small-title"><text>{{i18n.tb}}{{withdrawalName}}{{i18n.tbdszbdz}}</text></view>
			<view class="select">
				<view><u-input v-model="withdrawalName" class="select-input" disabled/></view>
				<view class="select-button">
					<view class="button" @click="openSelect=show = true">{{i18n.xzbz}}<u-icon name="arrow-down" :size="40" color="#82848a" style="margin-left: 10rpx;"></u-icon></view>
					<u-action-sheet :list="list" v-model="show" :cancel-btn="false" @click="getCurrencyList"></u-action-sheet>
				</view>
			</view>
			<!-- Blockchain network -->
			<view class="network-choose">
				<view class="network-title"><text>{{i18n.qklwl}}</text></view>
				<view class="network-button">
          <view    class="btn" :class="{active:btnIndex==index}" v-for="(item,index) in btnList" :key="index" @tap="chainNameSwitching(index)">
            {{item}}
          </view>
				</view>
			</view>
			<!-- Address -->
			<view class="address common">
				<view class="common-text"><text>{{i18n.dz}}</text></view>
				<view class="common-input">
					<view><u-input class="u-input address-input" v-model="addressInfo" :placeholder="i18n.cazt"></u-input></view>
					<view class="address-right" @click="pasteClick">
						<text>{{i18n.zt}}</text>
						<u-icon name="scan" :size="60" style="margin-left: 10rpx; color: #909399;"></u-icon>
					</view>
				</view>
			</view>
			<!-- Number -->
			<view class="number common">
				<view class="common-text"><text>{{i18n.sl}}</text></view>
				<view class="common-input">
          <input type="number"  class="u-input  number-input" :placeholder="i18n.qsrtbsl"
                 placeholder-style="color: #C0C0C0;font-size:26rpx"
                 v-model.number="numberInfo" min="0" step="1"  @input="handleInput">

					<view class="number-right">
						<text style="color: #868c9a;">{{withdrawalName}}</text>
						<text style="color: #2c78f8; margin-left: 10rpx;" @click="allBtn">{{i18n.qb}}</text>
					</view>
				</view>
				<view class="number-bottom">
					<view><text>{{i18n.ky}}</text></view>
					<view><text>{{memberObj.usdtPrice}}{{withdrawalName}}</text></view>
				</view>
			</view>

			<view class="quantity"><text>{{i18n.kdzsl}}</text></view>
			<view style="margin-top: 20rpx;">
				<text style="color: #333; font-size: 35rpx; font-weight: 700;">{{ numberInfo -( withdrawalRate  / 100) }}</text>
				<text style="color: #868c9a; font-size: 30rpx; margin-left: 10rpx;">{{withdrawalName}}</text>
			</view>
			<view style="margin-top: 20rpx;">
				<text style="color: #868c9a; font-size: 30rpx;">{{i18n.txfy}}: {{ numberInfo * (withdrawalRate  / 100)}} {{withdrawalName}}</text>
			</view>
			<view style="margin-top: 20rpx;">
				<text>{{i18n.tbsm}}： </text>
			</view>
			<view class="text-grey" style="color: #868c9a; font-size: 20rpx;">
				<br>
				<text>1:{{i18n.tbsj}}</text>
				<br>
				<text>2:{{i18n.zzcbz}}</text>
				<br>
				<text>3:{{i18n.tjtbsqh}}</text>
				<br>
				<text>4:{{i18n.zxkf}}</text>
			</view>

			<!-- 按钮 -->
			<u-button type="success" class="withdraw-button" @click="handleFn">{{i18n.tx}}</u-button>
		</view>
		<view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        btnIndex:0,//按钮的默认
        memberObj:{},//传进来的对象
        withdrawalName:'USDT',//币的名称
				addressInfo: '',//转出去的地址
        chainName:'',//区块链名称
        withdrawalRate:0,//费率
				numberInfo: 1,//提币数量
				show: false,
				list: [
					{text: 'USDT',id:0},
					{text: 'BTC',id:1},
					{text: 'ETH',id:2}
				],
        //按钮列表
        btnList: [
          'ERC20',
          'TRC20',
          'OMNI'
        ],
        btnList2: [
          'BTC',
        ],
        btnList3: [
          'ETH',
        ],
			};
		},
    onLoad(options) {
      this.memberObj = JSON.parse(options.data)
      // console.info("🇨🇳🇨🇳:整条对象 --", this.memberObj)
      //获取用户提款账单地址 // 判断客户是否有地址
      let memberID = uni.getStorageSync('userId') || 0
      this.$u.api.user.getBillingAddressList(memberID).then(res => {
      })

      this.getCurrencyList()//点击 提币列表保存费率
    },
		methods: {
      //切换币名 更改绑定的币名 这个就是 区块链网络 三个按钮
      chainNameSwitching(e){
        this.btnIndex  = e
        switch (e) {
          case 0:
            this.chainName = 'ERC20';
            break;
            case 1:
            this.chainName = 'TRC20';
            break;
            case 2:
            this.chainName = 'OMNI';
            break;
        }
      },
      //粘贴
      pasteClick() {
        navigator.clipboard.readText().then((text) => {
          // 在此处可以使用文本变量来操作复制的内容
          this.addressInfo = text
        });
      },
      //不可以输入0
      handleInput(){
        if(this.numberInfo === 0 || this.numberInfo === ''){
          this.numberInfo = 1
        }
        if(this.numberInfo < 0 ){
          this.$utils.showToast(this.i18n.tbslbnsy)
          this.numberInfo = 1
        }
      },

      //点击全部的币
      allBtn() {
        this.numberInfo = this.memberObj.usdtPrice
      },
      //点击了 提币列表
      getCurrencyList(index){
        let key = 'usdt_extract_handling'
        switch (index) {
          case 0:
            this.withdrawalName = 'USDT';
            this.btnList =['ERC20', 'TRC20', 'OMNI'];
            key = 'usdt_extract_handling'
            break;
            case 1:
            this.withdrawalName = 'BTC';
              key = 'usdt_extract_handling'
            this.btnList = ['BTC']
                this.btnIndex = 0
            break;
            case 2:
            this.withdrawalName = 'ETH';
              this.btnList = ['ETH']
              key = 'eth_extract_handling'
              this.btnIndex = 0
            break;
        }
        //保存费率
        this.$u.api.user.getRechangeConfiqunation(key).then(res => {
          if(res.status === 'SUCCEED'){
            this.withdrawalRate = res.result.result.value  //保存费率
          }
        })
      },
			back() {
				uni.navigateBack(1)
			},
      //提现
			handleFn() {
        let params = {
           type:1,
           currency : this.withdrawalName,
           chainName : this.chainName,
           wallet:'0x6c20dCA0b80A04E457b7b6F22Ee4F8D7063A36B9',
           balance:this.numberInfo,
           // mccId:2,
           member:uni.getStorageSync('userId'),
            baId:100,
        }
        this.$u.api.user.extractCoin(params).then(res=>{
          if(res.status === 'SUCCEED'){
            this.$utils.showToast(this.i18n.tbsqcg)
            uni.navigateTo({
              url:'pages/withDraw/successfulWthdrawal'
            })
          } else if(res.status == "FAILED"){
            this.$utils.showToast(res.errorMessage)
          }
        }).catch(e=>{
          this.$utils.showToast(e.errorMessage)
        })
			}
		},
		computed: {
			i18n() {
				return this.$t("withdraw")
			}
		}
	}
</script>

<style lang="scss">
	.with-draw{
		padding-right: 20rpx;
		background-color: #fff;
		.header{
			height: 88rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 25rpx;
		}
		.content{
			margin-top: 20rpx;
			margin-left: 25rpx;
			.title {
				font-size: 55rpx;
				font-weight: 700;
				color: #333;
			}
			.small-title{
				color: #868c9a;
				margin-top: 20rpx;
			}
			.select{
				width: 700rpx;
				height: 100rpx;
				background-color: #f5f5f5;
				display: flex;
				margin-top: 30rpx;
				.select-input {
					width: 400rpx;
					height: 100rpx;
					display: flex;
					align-items: center;
					margin-left: 15rpx;
				}
				.select-button{
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			.network-choose{
				margin-top: 30rpx;
				font-size: 35rpx;
        .network-button {
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
          &.active {
            border: 2rpx solid #2c78f8;
            color: #2c78f8;
          }
        }


			}
			.common{
				margin-top: 30rpx;
				font-size: 35rpx;
				.common-input{
					width: 700rpx;
					height: 100rpx;
					background-color: #f5f5f5;
					display: flex;
					align-items: center;
					margin-top: 30rpx;
					.u-input{
						width: 530rpx;
						height: 100rpx;
						display: flex;
						align-items: center;
						margin-left: 15rpx;
					}
					.address-right{
						display: flex;
						align-items: center;
						text{
							font-size: 30rpx;
							color: #2c78f8;
						}
					}
					.number-right{
						font-size: 30rpx;
					}
				}
			}
			.number{
				.common-input{
					.number-input {
						width: 500rpx;
					}
				}
				.number-bottom {
					display: flex;
					justify-content: space-between;
					margin-top: 20rpx;
					margin-right: 20rpx;
					color: #868c9a;
					font-size: 25rpx;
				}
			}
			.quantity{
				margin-top: 70rpx;
				font-size: 25rpx;
				color: #868c9a;
			}
			.withdraw-button{
				margin-top: 30rpx;
				background-color: #2c78f8;
			}
		}
	}
</style>
