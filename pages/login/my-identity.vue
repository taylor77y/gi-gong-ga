<template>
	<view class="page">
		<view class="mgt20">
		</view>
		<u-row gutter="16" justify="justify-between" class="header">
			<u-col span="10">
				<image @click="back()" class="icon_1" referrerpolicy="no-referrer"
					src="/static/lanhu_zhuce2/psp7pfts61abml9bqfww31ud54m8lwlnff9c1d27e1-8110-48ab-824d-24b76b7c6231.png" />
			</u-col>
			<u-col span="2" class="right-col" @click="next">
				<text>{{ i18n.tg }}</text>
			</u-col>
		</u-row>
		<!-- 步骤条 -->
		<view class="step mt-100 ">
			<u-steps :list="numList" :current="1" mode="number" active-color="#00EE76"></u-steps>
		</view>
		<!-- popup弹出层 -->
		<view>
			<u-popup v-model="show" mode="bottom" length="60%">
				<view class="flex jcsa poptop">
					<text></text>
					<text>{{ i18n.qxzgj }}</text>
					<text class="close" @click="close">x</text>
				</view>
				<u-search :placeholder="i18n.qsrgj" v-model="keyword" shape="square" :show-action="false" @change="search"></u-search>
				<view v-for="(item,index) in actionSheetList" :key="index">
					<view class="pop" @click="country(item.text,item.num)">
						<text>{{ item.text }}</text>
						<text>{{ item.num }}</text>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 表单 -->
		<view class="form">
			<h2>{{ i18n.smrz }}</h2>
			<view class="item mt-50">
				<view class="label">{{ i18n.gj }}</view>
				<view class="input mt-20">
					<!-- <u-input  v-model="value" :type="type" :border="false" @click="show = true" class="input-align"/>
					<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet> -->
					<u-input v-model="national" :clearable="true"  placeholder-style="color: #868c9a;" class="uni-input"  @click="show = true"/>
 			</view>
			</view>
			<view class="iteeem mt-50">
				<view class="label">{{ i18n.zsmz }}</view>
				<view class="input mt-20">
					<u-input v-model="realName" :clearable="true" :placeholder="i18n.srzsxm" placeholder-style="color: #868c9a;" class="uni-input" />
				</view>
			</view>
			<view class="item mt-50">
				<view class="label">{{ i18n.zjz }}</view>
				<view class="input mt-20">
					<u-input v-model="number" :clearable="true" :placeholder="i18n.srzjhm" placeholder-style="color: #868c9a;" class="uni-input" />
				</view>
			</view>
			<view class="item mt-50">
				<view class="label">{{ i18n.zjzsc }}</view>
				<u-row gutter="16" justify="space-around" class="mt-20">
					<u-col :span="4">
						<u-upload :action="action" :header="header" @on-success="onSus1" @on-remove="positiveLink = ''" max-count="1" :custom-btn="true" class="upload" ref='zm'>
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-icon name="camera-fill" size="60" :color="$u.color['lightColor']"></u-icon>
							</view>
						</u-upload>
						<view class="label mt-10 u-margin-left-38">{{ i18n.zjzm }}</view>
					</u-col>
					<u-col :span="4">
						<u-upload :action="action" :header="header" @on-success="onSus2" @on-remove="sideLink = ''" max-count="1" :custom-btn="true" class="upload" ref='fm'>
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-icon name="camera-fill" size="60" :color="$u.color['lightColor']"></u-icon>
							</view>
						</u-upload>
						<view class="label mt-10 u-margin-left-40">{{ i18n.zjfm }}</view>
					</u-col>
					<!-- <u-col :span="4">
						<u-upload :action="action" :header="header" @on-success="onSus3" @on-remove="handLink = ''" max-count="1" :custom-btn="true" class="upload" ref='hc'>
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-icon name="camera-fill" size="60" :color="$u.color['lightColor']"></u-icon>
							</view>
						</u-upload>
						<view class="label mt-10 u-margin-left-35">{{ i18n.zjsc }}</view>
					</u-col> -->
				</u-row>
			</view>
			<view class="item mt-50 pb-50">
				<view class="label">{{ i18n.pssl }}</view>
				<view class="mt-20">
					<image src="../../static/img/identity2.png" mode=""></image>
				</view>
			</view>
			<view class="item mt-50">
				<u-button type="primary" @click="nextup">{{ i18n.next }}</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {cnadrs} from '@/common/hooks/cnarea.js';
	
	export default {
		data(){
			return {
				action:  uni.getStorageSync('imgPath') + '/member/upload/new',
				header: {
					'token': uni.getStorageSync('token'),
					'userId': uni.getStorageSync('userId')
				},
				numList: [{
						name: this.$t('member').zhzc
					}, {
						name: this.$t('member').smrz
					}, {
						name: this.$t('member').aqbd
					}, {
						name: this.$t('member').qjy
				}],
				//国籍
				national: '美国 (USA or Canada)',
				nationalnum:'1',
				//真实姓名
				realName: '',
				// 护照号码
				number:'',
				//国籍下拉列表数据
				keyword:'',
				// 证件正面
				fromfront:[],

				sc:[],
				value:'',
				valuecode:'',
				type:'select',
				show: false,
				actionSheetList:[],
				list: [],
				handLink:'',
				sideLink:'',
				positiveLink:''
			}
		},
		computed: {
			i18n() {
				return this.$t("member")
			},
		},
		onLoad(){
			cnadrs.map(item => {
				// this.actionSheetList.push({text:item.name.split('(')[0],num:item.areaCode})
				this.actionSheetList.push({text:item.name,num:item.areaCode})
			})
			this.list = this.actionSheetList;
		},
		methods:{
			// 选择输入框赋值
			country(v,t){
				console.log(v,t)
				this.national = v;
				this.nationalnum = t;
				this.show = false;
			},
			// 关闭弹出框
			close(){
				this.show = false;
				this.keyword = '';
			},
			// 搜索逻辑
			search(e){
				this.actionSheetList = this.list
				this.actionSheetList = this.actionSheetList.filter(item =>
					item.text.indexOf(e) != -1
				)
			},
			onSus1(response, index, lists, name) {
				this.$utils.showToast(this.i18n.sccg)
				console.log("上传成功", response)
				this.positiveLink = response.result.url;
			},
			onSus2(response, index, lists, name) {
				this.$utils.showToast(this.i18n.sccg)
				console.log("上传成功", response)
				this.sideLink = response.result.url;
			},
			onSus3(response, index, lists, name) {
				this.$utils.showToast(this.i18n.sccg)
				console.log("上传成功", response)
				this.handLink = response.result.url;
			},
			// 下一步
			nextup(){
			// 校验
				// 姓名
				// if(!this.realName){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title: '请输入姓名',
				// 	});
				// 	return ;
				// }else if(!this.number){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title: '请输入证件号码',
				// 	});
				// 	return ;
				// }
				if(!this.nationalnum){
					return this.$utils.showToast(this.i18n.nationalnum)
				}
				if(!this.realName){
					return this.$utils.showToast(this.i18n.realName)
				}
				if(!this.number){
					this.$utils.showToast(this.i18n.number)
					return
				}
				if(!this.positiveLink){
					return this.$utils.showToast(this.i18n.positiveLink)
				}
				if(!this.sideLink){
					return this.$utils.showToast(this.i18n.sideLink)
				}
				// if(!this.handLink){
				// 	 return this.$utils.showToast(this.i18n.handLink)
				// }
				//验证3张照片是否全部上传
				// let files = [];
				//console.log(this.$refs.fm.lists[0].url);
				//验证正面
				// if(this.$refs.zm.lists.length>0){
				// 	files.push(this.$refs.zm.lists[0].url);
				// }
				// if(this.$refs.fm.lists.length>0){
				// 	files.push(this.$refs.fm.lists[0].url);
				// }

				// if(this.$refs.hc.lists.length>0){
				// 	files.push(this.$refs.hc.lists[0].url);
				// }

				// if(files.length < 3){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title: '请上传完整证件信息',
				// 	});
				// 	return ;
				// }
				//上传数据
				let member = uni.getStorageSync("userId");
				const setAu = {
					member,
					areaCode :this.nationalnum,
					name :this.realName,
					cardNo :this.number,
					positiveLink: this.positiveLink,
					sideLink:this.sideLink,
					handLink:this.handLink
				}
				//console.log(member)
				//上传 国籍 真实姓名 证件号码
				//member,areaCode,sideFile,cardNo,positiveLink,sideLink,handLink
				this.$u.api.user.setAuthenWithAll(setAu).then(res=>{
					console.log('setAuthenWithAll',res);
					if(res?.status == "SUCCEED"){
						return this.next();
					}
					return this.$utils.showToast(res?.errorMessage);
					// if(res.status == "SUCCEED"){}
					// this.$utils.showToast(res.errorMessage)
					// if(){
					// 	this.next()
					// }
					return ;
				})
				//上传照片
				// console.log(member,files[0],files[1],files[2]);
				// let positiveFile = new FileReader(files[0])
				// console.log(positiveFile)

				// this.$u.api.user.setCardImg(member,files[0],files[1],files[2]).then(res=>{
				// 	console.log(res);
				// })

				//跳转


			},
			next(){
				uni.navigateTo({
					url:'/pages/login/gooleVerify'
				})
			},
			clearInput() {
				
			},
			back() {
				uni.navigateBack(1)
			},
			cancel() {
				uni.navigateTo({
					url: `/pages/index/index`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	image {
		width: 40rpx;
		height: 30rpx;
		margin-left: 40rpx;
	}
	.mgt20{
		margin-top: 40rpx;
	}

	.pop{
		margin: 40rpx 20rpx 0 20rpx;
		display: flex;
		justify-content: space-between;
	}
	.poptop{
		margin: 20rpx 0;
		text-align: center;
	}
	.close{
		color: #bababa;
		margin-right: 30rpx;
	}
	.flex{
		display: flex;
	}
	.jcsa{
		justify-content: space-between;
	}
	.header {
		height: 80rpx;
		line-height: 80rpx;
		.right-col {
			text-align: right;
		}
	}
	.step {
		::v-deep .u-steps__item__num {
			width: 70rpx;
			height: 70rpx;
		}
	}
	.form {
		padding: 30rpx;
		.label {
			color: #333;
			font-size: 12px;
			font-weight: 400;
		}
		.input {
			display: flex;
			align-items: center;
		}
		uni-input {
			width: 100%;
		}
		::v-deep uni-image {
			width: 100%;
			height: 125px;
			margin-left: 0;
		}
		.upload {
			width: 100px;
			height: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #f7f8fa;
			border: 2px dashed #b8bcc5;
			overflow: hidden;
			::v-deep .u-list-item {
				margin: 0;
				padding: 0;
			}
		}
	}
</style>