<template>                          
    <v-layout class="background">
      <v-flex xs10 sm8 offset-sm2>
        <v-card id="drone_ADD">
          <template>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 >
                  <v-subheader>Type</v-subheader>
                </v-flex>
                <v-flex>
                    <v-container fluid>
                      <v-radio-group v-model="radios" :mandatory="true">
                        <v-radio label="Hover" value="radio-1"></v-radio>
                        <v-radio label="Glide" value="radio-2"></v-radio>
                      </v-radio-group>
                    </v-container>
                </v-flex>
                <v-flex xs12 >
                  <v-select
                    label="Manufacturer"
                    :items="manufacturer_op"
                    v-model="e0"
                    item-value="text"
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs12 >
                  <v-select
                    label="Number of Blades"
                    :items="num_blades_op"
                    v-model="e1"
                    item-value="text"
                    single-line
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs12 >
                  <v-select
                    label="Color"
                    :items="color_op"
                    v-model="e2"
                    autocomplete
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
            <div id="add_drone_button">
              <v-btn color="error">Add Drone</v-btn>
            </div>
          </template>
        </v-card>
        <v-card id="drone_TABLE">
          <v-card-title>
            Connected Drones
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <div>
            <v-btn color="info">Remove Selected</v-btn>
          </div>
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            v-model="selected"
            item-key="name"
            select-all
            class="elevation-1"
            hide-actions
          >
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
              <span slot="activator">
                {{ props.header.text }}
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>
                  <v-checkbox
                    primary
                    v-model="props.selected"
                  ></v-checkbox>
                </td>
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.id }}</td>
                <td class="text-xs-right">{{ props.item.description }}</td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-card flat>
                <v-card-text>Peek-a-boo, it's Ladd bruh!</v-card-text>
              </v-card>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
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
      e0: null,
      e1: null,
      e2: null, 
      manufacturer_op: [
        'AeroVironment', "Ambarella", "DJI", "GoPro", "Parrot", "Yuneec", 
        "3D Robotics", "CUSTOM BUILD"
      ],
      num_blades_op: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', "10+"
      ],
      color_op: [
        'White', 'Black', 'Grey', 'Blue', 'Red', 'Orange'
      ],

      max25chars: (v) => v.length <= 25 || 'Input too long!',
      tmp: '',
      search: '',
      pagination: {},
      headers: [   
        {
          align:'left',
          sortable: false,
          value: 'name'
        },     
        { text: 'Drone ID', value: 'id' },
        { text: 'Description', value: 'description' },
      ],
      items: []//////{text: 'state 1'}///////]
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
#drone_TABLE {
  margin-top: 10px;
  margin-bottom: 10px;
}
#drone_ADD {
  margin-top: 65px; 
  padding-bottom: 10px;
}
</style>

