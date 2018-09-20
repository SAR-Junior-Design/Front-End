<template>
  <v-content>
    <v-layout row>
      <jurisdiction-map v-if="user_info" :user_info="user_info" xs5/>
      <dashboard-stats v-if="user_info" :user_info="user_info" xs7/>
    </v-layout>
  </v-content>
</template>


<script>
  import JurisdictionMap from './JurisdictionMap'
  import DashboardStats from './DashboardStats'
  import API from '@/mixins/API'

  export default {
    components: {
      'jurisdiction-map': JurisdictionMap,
      'dashboard-stats': DashboardStats
    },
    mixins: [API],
    data() {
      return {
        user_info: null
      }
    },
    async mounted() {
      const response = await this.get_current_user_info(
        this.$store.state.access_token
      );
      this.user_info = response.data
    }
  }
</script>

<style>

</style>
