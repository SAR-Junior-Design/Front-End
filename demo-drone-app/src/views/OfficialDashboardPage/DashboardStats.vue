<template>
  <v-content>
    <v-layout column
    class="stats_page">
      <v-flex class="text-xs-left"
      style="width:100vw;
      margin:15px;">
        <div class="stat_header">
          WEEKLY REPORT
        </div>
        <div style="margin:5px;">
          <flight-histogram :data="data"
          :chartData="data"
          :options="{responsive:false}"
          :width="600"
          :height="150"
          />
        </div>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
  import FlightHistogram from './DashboardGraphs/FlightHistogram'
  import API from '@/mixins/API'

  export default {
    props: ['user_info'],
    mixins: [API],
    components: {
      'flight-histogram': FlightHistogram
    },
    data () {
      return {
        data: [3, 10, 7, 6, 2, 2, 8]
      }
    },
    methods: {
      
    }
  }
</script>

<style>
  .stats_page {
    height:100vh;
    overflow:scroll;
    padding-top:70px;
  }

  .stat_header {
    font-weight:200;
    font-size:25px;
  }
</style>
