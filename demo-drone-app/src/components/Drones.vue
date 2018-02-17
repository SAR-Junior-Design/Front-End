<template>
  <v-layout class="background">
    <v-flex xs12 sm6 offset-sm3>
      <v-card id="drone_BIG_CARD">
        <v-card-media
          class="white--text"
          height="200px"
          src="/static/drone_image_1.jpg"
        >
          
        </v-card-media>
        <v-card-title>
          <div>
            <span class="grey--text">Number 10</span><br>
            <span>Number of Drones: 2</span><br>
            <span>SAR Team: #14</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Add Drone</v-btn>
          <v-btn flat color="orange">Remove Drones</v-btn>
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

            <td class="text-xs-right">{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.description }}</td>

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
        { text: 'Drone ID', value: 'id' },
        { text: 'Description', value: 'description' },
      ],
      items: []
    }
  },
  methods: {
    getUserDrones() {
      this.get_user_drones(
        response => {
          this.drone_data = response.data
          for(var i=0; i<this.drone_data.length; i++) {
            this.items.push(this.drone_data[i])
          }
      },
      error => {
        alert('Hmmm something went wrong with our servers when fetching stations!! Sorry Ladd!')
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
.background {
  background: url(https://i.imgur.com/iuiH5Cu.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

#drone_BIG_CARD {
  margin-top: 70px;
  margin-bottom: 10px;
}
#drone_TABLE {
  margin-top: 10px;
  margin-bottom: 20px;


}
</style>

