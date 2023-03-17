<template>
	
	<view class="container">
		<heder-box :title="i18n.gz" />
		<!-- v-html="html" -->
		<div v-html="html">
			
		</div>
	</view>
</template>

<script>
	import th from '../../common/locales/th';
	import hederBox from "./components/heder-box.vue"
	export default {
		components: {
			hederBox
		},
		data() {
			return {
				html: '<div data-v-79627476="" class="box-border px-33"><div data-v-79627476="" class="mt-54 flex font-68 items-center"><img data-v-79627476="" src="/wap/img/logo.681b8bb1.png" alt="" class="w-96 h-96 mr-40"><div data-v-79627476="" class="font-60 textColor">理财规则</div></div><div data-v-79627476="" class="font-31 font-400 mt-24 lh-44 text-grey">理财是通过将USDT托管给平台，由平台的专业团队进行理财套利，参与者在资金托管期间可获得平台的理财收入分成。</div><div data-v-79627476="" class="font-600 font-31 mt-56 h-36 lh-36 textColor">收益计算</div><div data-v-79627476="" class="mt-21 font-30 text-grey text-left"> 会员在平台存入了10000U，选择了周期为5天 ，日收益为0.3%~0.5%的理财产品，则每天收益如下：<br data-v-79627476=""><br data-v-79627476=""> 最低：<span data-v-79627476="" class="textColor">10000U X 0.3%=30U</span> <br data-v-79627476=""><br data-v-79627476=""> 最高：<span data-v-79627476="" class="textColor">10000U X 0.5%=50U</span> <br data-v-79627476=""><br data-v-79627476=""> 既：5天后可以获得<span data-v-79627476="" class="textColor">150U~250U</span> 的收益，收益每日下发，下发的收益可随时存取，存入本金，到期满后，自动返还至您的账户。 </div><div data-v-79627476="" class="font-600 font-31 mt-56 h-36 lh-36 textColor">关于违约金</div><div data-v-79627476="" class="mt-21 font-30 text-grey text-left"> 若您希望转出未到期的本金，则会产生违约金， <span data-v-79627476="" class="textColor">违约金=结算比例x剩余天数x投资数量。</span> <br data-v-79627476=""> <br data-v-79627476=""> 举例：该产品的违约金结算比例为 <span data-v-79627476="" class="textColor">0.4%</span>，剩余 <span data-v-79627476="" class="textColor"> 3</span> 天到期，投资数量为<span data-v-79627476="" class="textColor">1000</span>,则 <span data-v-79627476="" class="textColor">违约金=0.4%x3x1000=12U</span>，实际退还本金为 <span data-v-79627476="" class="textColor">1000U-12U=988U</span></div></div>',

			}
		},
		onLoad() {
			
		},
		onShow() {
		
		},
		computed: {
		    i18n() {
		    	return this.$t("jijinlicai")
		    }
		},
			
	}
</script>

