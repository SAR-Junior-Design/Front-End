<template>                   
  <v-layout class="background">
    <v-flex xs10 sm8 offset-sm2>
      <v-card id="drone_ADD">
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12 >
                  <v-subheader>Type</v-subheader>
                </v-flex>
                <v-flex>
                    <v-container fluid>
                      <v-radio-group 
                        v-model="radios" 
                        required 
                        :rules="[v => !!v || 'You must specify a Type!']"
                      >
                        <v-radio label="Hover" value="radio-1"></v-radio>
                        <v-radio label="Glide" value="radio-2"></v-radio>
                      </v-radio-group>
                    </v-container>
                </v-flex>
                <v-flex xs12 >
                  <v-select
                    label="Manufacturer"
                    :items="manufacturer_op"
                    item-value="text"
                    autocomplete
                    required
                    v-model="e0"
                    :rules="[v => !!v || 'You must specify a Manufacturer!']"
                  ></v-select>
                </v-flex>
                <v-flex xs12 >
                  <v-select
                    label="Number of Blades"
                    :items="num_blades_op"
                    item-value="text"
                    single-line
                    autocomplete
                    required
                    v-model="e1"
                    :rules="[v => !!v || 'You must specify the Number of Blades!']"
                  ></v-select>
                </v-flex>
                <v-flex xs12 >
                  <v-select
                    label="Color"
                    :items="color_op"
                    autocomplete
                    required
                    v-model="e2"
                    :rules="[v => !!v || 'You must specify a color!']"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
            <div id="add_drone_button" >
              <v-btn 
                @click="submit"
                :disabled="!valid"
                v-on:click="registerDrone()"
              > Add Drones 
              </v-btn>
            </div>
          </v-form>
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
            item-key="id"
            select-all
            class="elevation-1"
            hide-actions
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td>
                  <v-checkbox
                    primary
                    v-model="props.selected"
                  ></v-checkbox>
                </td>
                <td class="text-xs-right" @click="props.expanded = !props.expanded" @mouseover="mouseOverM()">{{ props.item.color }}</td>
                <td class="text-xs-right" @click="props.expanded = !props.expanded" @mouseover="mouseOverM()">{{ props.item.description }}</td>
                 <td class="text-xs-right" @click="props.expanded = !props.expanded" @mouseover="mouseOverM()">{{ props.item.id }}</td>
                <td class="text-xs-right" @click="props.expanded = !props.expanded" @mouseover="mouseOverM()">{{ props.item.manufacturer }}</td>
                 <td class="text-xs-right" @click="props.expanded = !props.expanded" @mouseover="mouseOverM()">{{ props.item.number_of_blades }}</td>
                <td class="text-xs-right" @click="props.expanded = !props.expanded" @mouseover="mouseOverM()">{{ props.item.type }}</td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-card flat>
                <v-card-text>Any more DRONE INFO can be displayed here!</v-card-text>
              </v-card>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-flex>

      <v-btn block color="primary" @click.native="snackbar = true" dark>Show Snackbar</v-btn>
        </v-card-text>
        <v-snackbar
          :timeout="timeout"
          :top="y === 'top'"
          :bottom="y === 'bottom'"
          :right="x === 'right'"
          :left="x === 'left'"
          :multi-line="mode === 'multi-line'"
          :vertical="mode === 'vertical'"
          v-model="snackbar"
        >
      {{ text }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>

    </v-layout>
</template>


<script>

import Vue from 'vue';
import Vuetify from 'vuetify'
import router from '@/router'
import API from '../mixins/API.js'

export default {
  name: 'Login',
  mixins: [API],
  data () {
    return {
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
        { text: 'Color', value: 'color' },
        { text: 'Description', value: 'description' },
        { text: 'ID', value: 'id' },
        { text: 'Manufacturer', value: 'manufacturer' },
        { text: 'Number of Blades', value: 'number_of_blades' },
        { text: 'Type', value: 'type' }
      ],
      items: [],
      selected: [],
      radios: null,
      valid: false,
      e0: null,
      e1: null,
      e2: null,

      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      text: 'Drone Succesfully Added!',

      drone_id: null,
      validADD: false

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
    },
    registerDrone() {
      this.register_drone(this.e0, this.e1, this.e2, this.radios,
        response => {
          if (response.data == 200) {
            this.drone_id = true;
            console.log("The GOOOOODs" + this.e0 + this.e1 + this. e2 + this.radios)
            this.getUserDrones();
          } else if (response.data['code'] == 31) {
            throw error;
          }
        })
    },

    
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.items.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    mouseOverM () {
      document.body.style.cursor= 'default';
    },
    submit () {
      if (this.$refs.form.validate()) {
        console.log("IT FINALLY WORKED");
        this.snackbar = true;
      }
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
  margin-top: 70px; 
  padding-bottom: 10px;
}
#testing {
  margin-top: 70px;
}
</style>

