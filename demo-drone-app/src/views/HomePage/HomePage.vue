<template>
  <v-container style="margin-top:15vh">
    <v-layout column>
      <past-missions
        :missions="past_missions"
      />
    </v-layout>
  </v-container>
</template>



<script>
import Vue from 'vue';
import router from '@/router'
import API from '@/mixins/API.js'
import PastMissions from './PastMissions'

export default {
  name: 'Login',
  mixins: [API],
  components: {
    'past-missions': PastMissions
  },
  data () {
    return {
      past_missions: null,
    }
  },
  methods: {
    
  },
  async mounted() {
    const response = await this.get_past_missions(
      this.$store.state.access_token
    );
    console.log(response)
    this.past_missions = response.data
  }
}
</script>


<style>
.rowHeader {
  font-weight:200;
  font-size:24px;
}
</style>