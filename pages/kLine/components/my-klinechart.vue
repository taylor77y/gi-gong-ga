<template>
  <view>
    <!-- 头部 -->
    <u-row gutter="4" class="time-options" justify="space-betweent">
      <u-col span="1" v-for="(item, index) in timeOptions" :key="index" class="time-row" :class="{'text-gray': activetedTime.name !== item.name}"
             @click="changeTime(item)">
        {{item.name}}
      </u-col>
    </u-row>
    <view id="klinechart" style="width:100%;height:400px"></view>
  </view>
</template>

<script>
import {init, dispose } from 'klinecharts'
export default {
  props: {
    timeOptions: {
      type: Array,
      default: function() {
        return [{
          name: 'Line',
          value: '1min',
          time: 1
        },
          {
            name: '5m',
            value: '5min',
            time: 5
          },
          {
            name: '15m',
            value: '15min',
            time: 15
          },
          {
            name: '30m',
            value: '30min',
            time: 30
          },
          {
            name: '1h',
            value: '60min',
            time: 60
          },
          {
            name: '4h',
            value: '4hour',
            time: 240
          },
          {
            name: '1day',
            value: '1D',
            time: 1440
          },
          {
            name: '1w',
            value: '1week',
            time: 10080
          },
          {
            name: '1M',
            value: '1mon',
            time: 145800
          }
        ]
      }
    },
    activetedTime: {
      type: Object,
      default: function() {
        return {
          name: 'Line',
          value: '1min',
          time: 1 //天
        }
      }
    },
    themeVal: {
      type: String,
      detault: 'dark'
    },
    applyNewData: {
      type: Array,
      default: function() {
        return [];
      }
    },
  },
  data() {
    return {
      chart: null,
      type: 'MA',
      klineData: [],
      technicallndictor: null,
    }
  },
  computed: {
    isLine() {
      return this.activetedTime.name === 'Line' ? true : false;
    },
  },
  watch: {
    applyNewData(val){
      this.klineData = this.applyNewData
      this.chart.clearData()
      this.initChart()
    },
    // 配置图标类型 area | candle_solid
    isLine(val) {
      if(val === true) {
        this.chart.setStyleOptions({
          grid: {show:false},
          candle: {
            type: 'area',
          }
        })
      } else {
        this.chart.setStyleOptions({
          grid: {show:false},
          candle: {
            type: 'candle_solid',
          }
        })
      }
    }
  },
  mounted() {
    dispose('klineChart')
    this.chart = init('klinechart', {
      grid: {show:false},
      candle: {
        // 蜡烛图类型 'candle_solid'|'candle_stroke'|'candle_up_stroke'|'candle_down_stroke'|'ohlc'|'area'
        type: this.isLine === true ? 'area' : 'candle_solid',
      }
    })
    this.initChart()
  },
  methods: {
    initChart() {
      this.chart.createTechnicalIndicator('MA', false, {id: 'candle_pane'})
      this.chart.createTechnicalIndicator(this.type, false, {id: 'tech'})
      this.chart.applyNewData(this.klineData);
    },
    changeTime(item) {
      this.$emit('changeTime', item)
    },
  }
}
</script>
<style lang="scss">
.time-options {
  width: 100%;
  font-size: 12px;
  font-weight: 400;
}

.time-row {
  text-align: center;
  color: inherit;
}

.text-gray {
  color: #868c9a;
}
</style>