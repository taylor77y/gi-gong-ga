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
				html: '<div data-v-79627476="" class="box-border px-33"><div data-v-79627476="" class="mt-54 flex font-68 items-center"><img data-v-79627476="" src="../../static/image/logo.681b8bb1.png" alt="" class="w-96 h-96 mr-40"><div data-v-79627476="" class="font-60 textColor">��ƹ���</div></div><div data-v-79627476="" class="font-31 font-400 mt-24 lh-44 text-grey">�����ͨ����USDT�йܸ�ƽ̨����ƽ̨��רҵ�Ŷӽ���������������������ʽ��й��ڼ�ɻ��ƽ̨���������ֳɡ�</div><div data-v-79627476="" class="font-600 font-31 mt-56 h-36 lh-36 textColor">�������</div><div data-v-79627476="" class="mt-21 font-30 text-grey text-left"> ��Ա��ƽ̨������10000U��ѡ��������Ϊ5�� ��������Ϊ0.3%~0.5%����Ʋ�Ʒ����ÿ���������£�<br data-v-79627476=""><br data-v-79627476=""> ��ͣ�<span data-v-79627476="" class="textColor">10000U X 0.3%=30U</span> <br data-v-79627476=""><br data-v-79627476=""> ��ߣ�<span data-v-79627476="" class="textColor">10000U X 0.5%=50U</span> <br data-v-79627476=""><br data-v-79627476=""> �ȣ�5�����Ի��<span data-v-79627476="" class="textColor">150U~250U</span> �����棬����ÿ���·����·����������ʱ��ȡ�����뱾�𣬵��������Զ������������˻��� </div><div data-v-79627476="" class="font-600 font-31 mt-56 h-36 lh-36 textColor">����ΥԼ��</div><div data-v-79627476="" class="mt-21 font-30 text-grey text-left"> ����ϣ��ת��δ���ڵı���������ΥԼ�� <span data-v-79627476="" class="textColor">ΥԼ��=�������xʣ������xͶ��������</span> <br data-v-79627476=""> <br data-v-79627476=""> �������ò�Ʒ��ΥԼ��������Ϊ <span data-v-79627476="" class="textColor">0.4%</span>��ʣ�� <span data-v-79627476="" class="textColor"> 3</span> �쵽�ڣ�Ͷ������Ϊ<span data-v-79627476="" class="textColor">1000</span>,�� <span data-v-79627476="" class="textColor">ΥԼ��=0.4%x3x1000=12U</span>��ʵ���˻�����Ϊ <span data-v-79627476="" class="textColor">1000U-12U=988U</span></div></div>',

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

