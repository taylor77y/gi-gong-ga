<template>
	<view class="container">
		
		<head-title :title="i18n.gywm" />
		<view class="items c888">
		      <h4 class="title c222">{{ i18n.tips1 }}</h4>
		      <p class="p">
		{{ i18n.tips2 }}
		      </p>
		    </view>
		    <view class="items c888">
		      <h4 class="title c222">{{ i18n.tips3 }}</h4>
		      <h5 class="subTit">{{ i18n.tips4 }}</h5>
		      <h5 class="subTit">{{ i18n.tips5 }}</h5>
		      <p class="p">{{ i18n.tips6 }}</p>
		      <p class="p">
		{{ i18n.tips7 }}
		      </p>
		      <h5 class="subTit">{{ i18n.tips8 }}</h5>
		      <p class="p">{{ i18n.tips9 }}</p>
		      <h5 class="subTit">{{ i18n.tips10 }}</h5>
		      <p
		        class="p"
		      >{{ i18n.tips11 }}</p>
		      <h4 class="subTit">{{ i18n.tips12 }}</h4>
		      <h5 class="subTit">{{ i18n.tips13 }}</h5>
		      <view class="subContent">
		        <p class="p">{{ i18n.tips14 }}</p>
		        <p class="p">{{ i18n.tips15 }}</p>
		        <p class="p">{{ i18n.tips16 }}</p>
		        <p
		          class="p"
		        >{{ i18n.tips17 }}</p>
		      </view>
		      <h5 class="subTit">{{ i18n.tips18 }}</h5>
		      <p
		        class="p"
		      >{{ i18n.tips19 }}</p>
		      <h4 class="subTit">{{ i18n.tips20 }}</h4>
		      <p class="p">{{ i18n.tips21 }}</p>
		      <view class="subContent">
		        <p class="p">{{ i18n.tips22 }}</p>
		        <p class="p">{{ i18n.tips23 }}</p>
		        <p class="p">{{ i18n.tips24 }}</p>
		        
		      </view>
		
		      <h5 class="subTit">{{ i18n.tips25 }}</h5>
		      <p class="p">{{ i18n.tips26 }}</p>
		      <p class="p">{{ i18n.tips27 }}</p>
		      <p
		        class="p"
		      >{{ i18n.tips28 }}</p>
		      <h5 class="subTit">{{ i18n.tips29 }}</h5>
		      <p class="p">{{ i18n.tips30 }}</p>
		      <view class="subContent">
		        <p class="p">{{ i18n.tips31 }}</p>
		        <p
		          class="p"
		        >{{ i18n.tips32 }}</p>
		        <p class="p">{{ i18n.tips33 }}</p>
		        <p class="p">{{ i18n.tips34 }}</p>
		        <p class="p">{{ i18n.tips35 }}</p>
		        <p class="p">{{ i18n.tips36 }}</p>
		        <p class="p">{{ i18n.tips37 }}</p>
		        <p class="p">{{ i18n.tips38 }}</p>
		      </view>
		    </view>
		
	</view>
</template>

<script>
import th from '../../common/locales/th';
	export default {
		data() {
			return {
			   
			}
		},
		onLoad() {
           
		},
		computed: {
			i18n() {
			    return this.$t("about");
			}
		},
		
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		margin: 24rpx;
		.title {
		  font-size: 30rpx;
		  padding: 30rpx 0 10rpx;
		}
		.items {
		  .p {
		    font-size: 26rpx;
		    // color: #888888;
		    text-indent: 52rpx;
		    margin-top: 20rpx;
		  }
		  .subTit {
		    font-size: 26rpx;
		    margin-top: 20rpx;
		  }
		  .subContent {
		    padding-left: 30rpx;
		    .p {
		      text-indent: unset;
		    }
		  }
		}
	}
</style>
