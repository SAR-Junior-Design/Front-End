<template>
  <v-layout>
    <v-layout style="width:100%;" fixed>
      <gmap-map
        ref="map"
        class="map-panel"
        :center="center"
        :zoom="zoom"
        :map-type-id="mapType"
        :options="{scrollwheel: scrollwheel, disableDefaultUI: true, draggable: draggable, zoomControl: true}">
      </gmap-map>
        <v-navigation-drawer
          disable-resize-watcher
          v-model="drawer"
          absolute
          style="top:9.5%;width:20%;height:90.5%;"
        >
        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                Connected Drones
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-data-table
          v-bind:headers="headers"
          :items="drones"
          hide-actions
          item-key="name"
          must-sort
        >
          <template slot="items" slot-scope="props">
          <v-tooltip top>
            <v-icon  v-if= "props.item.connection == 'IS_CONNECTION'" slot="activator">wifi</v-icon>
            <v-icon  v-else slot="activator">signal_wifi_off</v-icon>
            <span>{{props.item.connection}}</span>
          </v-tooltip>
          <v-tooltip top>
            <v-icon  v-if= "props.item.CURRENT_BEHAVIOR == 'SEARCHING'" slot="activator">location_searching</v-icon>
            <v-icon  v-else slot="activator">home</v-icon>
            <span>{{props.item.CURRENT_BEHAVIOR}}</span>
          </v-tooltip>
            <tr  @click= "swapNav(props.item)" @mouseover= "mouseOver()" @mouseout= "mouseOut()">
              <td>{{ props.item.id }}</td>
            </tr>
          </template>
        </v-data-table>
        <v-btn style="background-color:#1d561a;color:#ffffff" @click="addDrone()">add drone</v-btn>
      </v-navigation-drawer>

        <v-navigation-drawer
          disable-resize-watcher
          v-model="selected_drone_drawer"
          absolute
          style="top:9.5%;width:20%;height:90.5%;"
        >
        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                ID: {{selected.id}}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>
         <v-card>
            <v-card-title primary-title>
              <div>
                <h3>Flight Details</h3>
                <p>Battery {{selected.battery_info.current_consumption}}%</p>
                <p>Speed {{selected.velocity.x}} m/s</p>
                
                <h3>Navigation</h3>
                <p>Location {{selected.location.latitude}}, {{selected.location.longitude}} </p>

                <h3>Visuals</h3>
              </div>
            </v-card-title>
          </v-card>
        <v-btn style="background-color:#1d561a;color:#ffffff" @click= "swapNav(null)">Back</v-btn>
      </v-navigation-drawer>
    </v-layout>
  </v-layout>
</template>

<style>
  .map-panel {
    height:100%;
    width:100%;
  }
  .btn-toggle {
    flex-direction: column;
  }
</style>

<script>
  import * as VueGoogleMaps from 'vue2.1-google-maps';
  import Vue from 'vue';
  Vue.use(VueGoogleMaps, {
    load: {
      installComponents: true,
      key: 'AIzaSyCtbjOc1SD9ozYtUVzrtxd0PDxRpN-0JGs',
    }
  });
  export default {
    name: 'MissionPage',
    data: function data() {
      return {
        center: {
          lat: 0,
          lng: -30
        },
        newCenter: "",
        zoom: 3,
        mapType: 'hybrid',
        scrollwheel: false,
        draggable: true,
        title: "",
        location: "",
        description: "",
        drawer: true,
        selected: {
              "id" : '',
              "battery_info" : {
                "voltage" : '',
                "current_consumption" : '',
                "energy_remaining" : ''
              },
              "location" : {
                latitude: '',
                longitude: ''
              },
              "altitude" : '',
              "connection" : '',
              "CURRENT_BEHAVIOR" : '',
              "velocity" : { "x" : '', "y" : '', "z" : ''}
          },
        items: '',
        selected_drone_drawer: false,
        headers2: [
          {
            text: 'header',
            sortable: false,
          },
          {
            text: 'data',
            sortable: false,         
          }
        ],
        headers: [
          {
            text: 'Drone ID',
            align: 'left',
            sortable: true,
            value: 'id'
          }
        ],
        "drones" : [
            {
              "id" : 'A7543bck-sdfijewr',
              "battery_info" : {
                "voltage" : 99,
                "current_consumption" : 99,
                "energy_remaining" : 80
              },
              "location" : {
                latitude: 24,
                longitude: -89
              },
              "altitude" : 99,
              "connection" : "IS_CONNECTION",
              "CURRENT_BEHAVIOR" : "SEARCHING",
              "velocity" : { "x" : 99, "y" : 99, "z" : 99}
          },
          {
              "id" : 'Z1239djm-knbqueen',
              "battery_info" : {
                "voltage" : 99,
                "current_consumption" : 99,
                "energy_remaining" : 99
              },
              "location" : {
                latitude: 33,
                longitude: -80
              },
              "altitude" : 99,
              "connection" : "NO_CONNECTION",
              "CURRENT_BEHAVIOR" : "RETURNING",
              "velocity" : { "x" : 99, "y" : 99, "z" : 99}
          },
          {
              "id" : 'F5687hyu-ftdhuimbv',
              "battery_info" : {
                "voltage" : 99,
                "current_consumption" : 99,
                "energy_remaining" : 99
              },
              "location" : {
                latitude: 34,
                longitude: -80
              },
              "altitude" : 99,
              "connection" : "IS_CONNECTION",
              "CURRENT_BEHAVIOR" : "RETURNING",
              "velocity" : { "x" : 99, "y" : 99, "z" : 99}
          }
        ]
      };
    },
    methods: {
      mouseOver () {
        document.body.style.cursor= 'pointer';
      },
      mouseOut () {
        document.body.style.cursor= 'default';
      },
      swapNav (drone) {
        if (drone != null) {
          this.selected = drone;
        }
        this.drawer = !this.drawer;
        this.selected_drone_drawer = !this.selected_drone_drawer;
      },
      addDrone () {
        for (var i = 0; i < this.drones.length; i++) {
          var marker = new google.maps.Marker({
                position: {
                  lat: this.drones[i].location.latitude,
                  lng: this.drones[i].location.longitude
                },
                icon: {
                  url: 'https://cdn0.iconfinder.com/data/icons/drone-applications/512/drone_location-512.png',
                  scaledSize: new google.maps.Size(75, 75),
                  origin: new google.maps.Point(0,0),
                  anchor: new google.maps.Point(50, 50)}
              });
          marker.setMap(this.$refs.map.$mapObject);
        }
      }
    }
  };
</script>