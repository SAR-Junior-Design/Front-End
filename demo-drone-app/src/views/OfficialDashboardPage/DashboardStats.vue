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
          <flight-histogram
          :chartData="last_week.data"
          :labels="last_week.labels"
          v-if="last_week.data"
          :options="{responsive:false}"
          :width="500"
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
  import moment from 'moment'

  export default {
    props: ['user_info'],
    mixins: [API],
    components: {
      'flight-histogram': FlightHistogram
    },
    data () {
      return {
        last_week: {
          data: null,
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }
      }
    },
    methods: {
      async last_weeks_flights() {
        var today = moment().startOf('day')
        var one_week_ago = moment().startOf('day')
        one_week_ago.subtract(7, 'days');
        const response = await this.flight_histogram(
          one_week_ago.toISOString(), today.toISOString(),
          this.$store.state.access_token
        )
        if (response.status == 200) {
          this.last_week.data = response.data.flight_histogram
          var ordered_weekdays = Array.apply(null, Array(7)).map(function (_, i) {
              return one_week_ago.add(1, 'days').format('ddd');
          });
          this.last_week.labels = ordered_weekdays
        }
      }
    },
    async mounted() {
      await this.last_weeks_flights()
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
