<template>                          
    <v-layout class="background">
      <v-flex xs12 sm6 offset-sm3>
        <v-card id="drone_ADD">
          <template>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-subheader>Manufacturer</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    :items="items"
                    v-model="e1"
                    label="Select"
                    single-line
                    bottom
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-subheader>Type</v-subheader>
                </v-flex>
                <v-flex xs6>
                    <v-container fluid>
                      <v-radio-group v-model="radios" :mandatory="true">
                        <v-radio label="Hover" value="radio-1"></v-radio>
                        <v-radio label="Glide" value="radio-2"></v-radio>
                      </v-radio-group>
                    </v-container>
                </v-flex>
                <v-flex xs6>
                  <v-subheader>Number of Blades</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    label="Select"
                    :items="items"
                    v-model="e3"
                    item-value="text"
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-subheader>Color</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    label="Select"
                    :items="items"
                    v-model="e4"
                  ></v-select>
                <div>
                  <v-btn color="error">Add Drone</v-btn>
                </div>
                </v-flex>
              </v-layout>
            </v-container>
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
#drone_ADD {
  margin-top: 80px;
  margin-bottom: 10px;
}
#drone_TABLE {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

