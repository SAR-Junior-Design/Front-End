<template>
  <div id="about">
  Ladd is working on getting a chart that shows the most improtant readouts of connected drones.
  As well as giving the user the ability to connect more drones. Table.
  </div>
</template>

<script>

import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router'
import API from '../mixins/API.js'

export default {
  name: 'Login',
  mixins: [API],
  data () {
    return {
      drone_data: {}
    }
  },
  methods: {
    getUserDrones() {
      this.get_user_drones(
        response => {
          this.drone_data = response.data
          alert(JSON.stringify(this.drone_data))
      },
      error => {
        alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
      })
    }
  },
  mounted () {
    this.getUserDrones();
  }
}
</script>

<!-- styling for the component -->
<style>
#about {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

