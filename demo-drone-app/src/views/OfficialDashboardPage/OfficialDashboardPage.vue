<template>
  <v-content style="margin-top:70px;">
    <v-layout row>
      <jurisdiction-map :user_info="user_info" xs8/>
      <dashboard-stats xs4/>
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
    methods: {
      async _get_current_user_info() {
				const response = await this.get_current_user_info(
					this.$store.state.access_token
				);
        this.user_info = response.data
        console.log(this.user_info)
			},
    },
    async mounted() {
      await this._get_current_user_info()
    }
  }
</script>

<style>

</style>
