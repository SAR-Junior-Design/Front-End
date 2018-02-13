<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card id="drone_BIG_CARD">
        <v-card-media
          class="white--text"
          height="200px"
          src="/static/doc-images/cards/docks.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Top 10 Australian beaches</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <span class="grey--text">Number 10</span><br>
            <span>Whitehaven Beach</span><br>
            <span>Whitsunday Island, Whitsunday Islands</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
      <v-card id="drone_TABLE">
        <v-card-title>
          Drones
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-data-table
            v-bind:headers="headers"
            v-bind:items="items"
            v-bind:search="search"
          >
          <template slot="items" slot-scope="props">

            <td class="text-xs-right">{{ props.item.droneNumber }}</td>
            <td class="text-xs-right">{{ props.item.droneType }}</td>
            <td class="text-xs-right">{{ props.item.numBlades }}</td>
            <td class="text-xs-right">{{ props.item.batteryPercent }}</td>

              <v-edit-dialog
                @open="tmp = props.item.iron"
                @save="props.item.iron = tmp || props.item.iron"
                large
                lazy
              >
                <div>{{ props.item.iron }}</div>
                <div slot="input" class="mt-3 title">Update Iron</div>
                <v-text-field
                  slot="input"
                  label="Edit"
                  v-model="tmp"
                  single-line
                  counter
                  autofocus
                  :rules="[max25chars]"
                ></v-text-field>
              </v-edit-dialog>
            </td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

import Vue from 'vue';
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router'
import API from '../mixins/API.js'


export default {
  name: 'Login',
  mixins: [API],
  data () {
    return {
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      tmp: '',
      search: '',
      pagination: {},
      headers: [

        { text: 'Drone Number', value: 'droneNumber' },
        { text: 'Drone Type', value: 'droneType' },
        { text: 'Numer of Blades', value: 'numBlades' },
        { text: 'Battery', value: 'batteryPercent' }
      ],
      items: [
        {
          droneNumber: 11, //JSON.stringify(this.drone_data),
          droneType: 'DJI Phantom 5',
          numBlades: 4,
          batteryPercent: 94.1,
        },
        {
          droneNumber: '23415',
          droneType: 'Mavic Air',
          numBlades: 8,
          batteryPercent: 89.1,
        }
      ]
    }
    drone_data: {}
    alert('helloooooooo')
    alert('the drone data is ' + JSON.stringify(this.drone_data))
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
#drone_BIG_CARD {
  margin-bottom: 100px;
}
#drone_TABLE {
}
</style>

