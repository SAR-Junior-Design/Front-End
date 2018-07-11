<template>
  <v-layout>
    <v-layout style="width:100%;" fixed @click="showDeleteMenu">
      <v-card
        v-if="drawer"
        class = "sideNav"
        :height="cardHeight"
      >
        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title" v-model='title'>{{title}}</v-list-tile-title>
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
              <v-icon  v-else-if= "props.item.connection == 'null'" slot="activator">visibility_off</v-icon>
              <v-icon  v-else slot="activator">signal_wifi_off</v-icon>
              <span>{{props.item.connection}}</span>
            </v-tooltip>
            <v-tooltip top>
              <v-icon  v-if= "props.item.CURRENT_BEHAVIOR == 'SEARCHING'" slot="activator">location_searching</v-icon>
              <v-icon  v-else-if= "props.item.CURRENT_BEHAVIOR == 'null'" slot="activator">visibility_off</v-icon>
              <v-icon  v-else slot="activator">home</v-icon>
              <span>{{props.item.CURRENT_BEHAVIOR}}</span>
            </v-tooltip>
            <v-tooltip top>
              <v-icon  v-if= "props.item.battery_info.energy_remaining == 'null'" slot="activator">visibility_off</v-icon>
              <v-icon  v-else-if= "props.item.battery_info.energy_remaining < 50" slot="activator">battery_alert</v-icon>
              <v-icon  v-else slot="activator">battery_full</v-icon>
              <span>{{props.item.battery_info.energy_remaining}}%</span>
            </v-tooltip>
            <tr  @click= "swapNav(props.item)" @mouseover= "mouseOver()" @mouseout= "mouseOut()">
              <td>{{ props.item.id }}</td>
            </tr>
          </template>
        </v-data-table>
        
        <v-menu
          offset-x
          :close-on-content-click="false"
          :nudge-width="200"
          v-model="menu"
        >
          <v-btn style="background-color:#1d561a;color:#ffffff" slot="activator">Add Drone</v-btn>
          <v-card>
            <v-list>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Registered Drones</v-list-tile-title>
                  <v-list-tile-sub-title>Select a drone to add to your flight.</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-data-table
              :headers="headers"
              :items="myDrones"
              v-model="selected"
              item-key="id"
              select-all
              :rows-per-page-items="rowsPerPageItems"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td>
                    <v-checkbox
                      primary
                      v-model="props.selected"
                    ></v-checkbox>
                  </td>
                  <td>{{ props.item.id }}</td>
                </tr>
              </template>
            </v-data-table>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="menu = false">Cancel</v-btn>
              <v-btn color="primary" flat @click="addDrone()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-card>
      <v-card
        v-if="selected_drone_drawer"
        class="sideNav"
        :height="cardHeight"
      >
        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                Drone Details
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3>ID: {{currentSelectedDrone.id}}</h3><br>
              <h3>Flight Details</h3>
              <p class="firstHeader"> Battery </p>
              
              <p class="secondHeader"> Power Remaining: {{currentSelectedDrone.battery_info.current_consumption}}%</p>
              <p class="secondHeader"> Voltage: {{currentSelectedDrone.battery_info.voltage}} V</p>

              <p class="firstHeader"> Speed </p>
              <p class="secondHeader">x: {{currentSelectedDrone.velocity.x}} m/s</p>
              <p class="secondHeader">y: {{currentSelectedDrone.velocity.y}} m/s</p>
              <p class="secondHeader">z: {{currentSelectedDrone.velocity.z}} m/s</p>

              <h3>Navigation</h3>
              <p class="firstHeader"> Location </p>
              <p class="secondHeader">Latitude: {{currentSelectedDrone.location.latitude}} </p>
              <p class="secondHeader">Longitude: {{currentSelectedDrone.location.longitude}} </p>
              <p class="secondHeader">Altitude: {{currentSelectedDrone.altitude}} m</p>

              <h3>Visuals</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-card>

      <v-card
        v-if="edit_drawer"
        class="sideNav"
        :height="cardHeight"
      >
        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                Flight Details
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-list dense class="pt-0" style="margin:2%;">
          <v-text-field 
            label="Flight Title"
            v-model="title">
          </v-text-field>
          <v-text-field 
            label="Description"
            multi-line
            v-model="description">
          </v-text-field>
        </v-list>

        <v-select
          :items="types"
          v-model="selectedType"
          label="Flight Type"
          single-line
          auto
          hide-details
          style="width:40%;float:left;margin:10px;">
        </v-select>
        <v-menu
          ref="menu"
          persistent
          lazy
          :close-on-content-click="false"
          v-model="menuDate"
          transition="scale-transition"
          full-width
          :nudge-right="140"
          :return-value.sync="pickerDate"
        >
          <v-text-field
            slot="activator"
            label="Flight Date"
            v-model="pickerDate"
            readonly
            prepend-icon="event"
            style="width:40%;float:left;margin:10px;"
          ></v-text-field>
          <v-card>
            <v-card-title primary-title>
              <div>
                <v-date-picker
                  ref="picker"
                  v-model="pickerDate"
                  @change="saveDate"
                  color ="green darken-4"
                  :show-current="false"
                ></v-date-picker>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn dark style="background-color:#1d561a" @click="menuDate = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <v-menu
          ref="menuStart"
          persistent
          lazy
          :close-on-content-click="false"
          v-model="menuStart"
          transition="scale-transition"
          full-width
          :nudge-right="140"
          :return-value.sync="pickerStart"
        >
          <v-text-field
            slot="activator"
            label="Flight Start Time"
            v-model="pickerStart"
            prepend-icon="access_time"
            readonly
            style="width:40%;float:left;margin:10px;"
          ></v-text-field>
          <v-card>
            <v-card-title primary-title>
              <div>
                <v-time-picker v-model="pickerStart" color ="green darken-4"></v-time-picker>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn dark style="background-color:#1d561a" @click="menuStart = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

        <v-menu
          ref="menuEnd"
          persistent
          lazy
          :close-on-content-click="false"
          v-model="menuEnd"
          transition="scale-transition"
          full-width
          :nudge-right="140"
          :return-value.sync="pickerEnd"
        >
          <v-text-field
            slot="activator"
            label="Flight End Time"
            v-model="pickerEnd"
            prepend-icon="access_time"
            readonly
            style="width:40%;float:left;margin:10px;">
          </v-text-field>
          <v-card>
            <v-card-title primary-title>
              <div>
                <v-time-picker v-model="pickerEnd" color ="green darken-4"></v-time-picker>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn dark style="background-color:#1d561a" @click="menuEnd = false">OK</v-btn>
            </v-card-actions>
          </v-card>  
        </v-menu>

        <v-btn fixed style="left:1%;top:89%;background-color:#1d561a;color:#ffffff" @click="saveMission()">Update Flight</v-btn>
        <v-btn fixed style="left: 15%;top:89%;background-color:#1d561a;color:#ffffff" @click="swapNav('overView')">Back</v-btn>

      </v-card>
      <v-card
        v-if="flight_drawer"
        class="sideNav"
        :height="cardHeight"
      >
        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                Flight Details
              </v-list-tile-title>
              <v-tooltip right>
                <v-btn icon @click= "swapNav('edit')" slot="activator">
                  <v-icon>settings</v-icon>
                </v-btn>
                <span>Edit Flight Details</span>
              </v-tooltip>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-expansion-panel expand popout>
          <v-expansion-panel-content>
            <div slot="header">Flight Title</div>
            <v-card>
              <v-card-text class="grey lighten-3">{{title}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Flight Description</div>
            <v-card>
              <v-card-text class="grey lighten-3">{{description}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Flight Type</div>
            <v-card>
              <v-card-text class="grey lighten-3">{{type}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Scheduled Flight Date</div>
            <v-card>
              <v-card-text class="grey lighten-3">{{date}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Start Time</div>
            <v-card>
              <v-card-text class="grey lighten-3">{{starts}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">End Time</div>
            <v-card>
              <v-card-text class="grey lighten-3">{{ends}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>

    <gmap-map
      ref="map"
      class="map-panel"
      :center="center"
      :zoom="zoom"
      :map-type-id="mapType"
      :options="{minZoom: 2, scrollwheel: scrollwheel, disableDefaultUI: true, draggable: draggable, zoomControl: true, clickableIcons: false}"
      @click="drawLine($event)">
      <gmap-polyline v-if="paths.length > 0"
          :path="paths"
          :editable="true"
          ref="polyline"
          @click="closePolygon($event)"
          @rightclick="selectingVertex">
      </gmap-polyline>
    </gmap-map>

    <v-menu
      offset-y
      v-model="deleteMenu"
      absolute
      :position-x="x"
      :position-y="y"
    >
      <v-list>
        <v-list-tile v-if="selectedPolygon!=null" @click="deletePolygon()">
          <v-list-tile-title>Delete Polygon</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="selectedVertex!=null" @click="deleteVertex()">
          <v-list-tile-title>Delete Vertex</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-layout>
      <v-toolbar fixed style="width: 32%; top:15%; left: 65%;">
        <v-text-field 
          label="Latitude, Longitude"
          v-model="newCenter">
        </v-text-field>
        <v-tooltip bottom>
          <v-btn icon @click="updateMap()" slot="activator">
            <v-icon>search</v-icon>
          </v-btn>
          <span>Search</span>
        </v-tooltip>
        <v-tooltip bottom max-width='100'>
          <v-btn icon v-if="edit" slot="activator" @click.stop="show = true">
            <v-icon dark color="primary">help</v-icon>
          </v-btn>
          <span>Need Help Selecting a Flight Area?</span>
        </v-tooltip>
      </v-toolbar>        
    </v-layout>

    <v-tooltip left max-width='100'>
      <v-speed-dial
        bottom
        right
        fab
        direction= 'bottom'
        absolute
        vertical
        open-on-hover="true"
        transition="true"
        slot="activator"
        v-if="edit"
      >
        <v-btn
          slot="activator"
          hover
          fab
        >
          <v-icon>{{currentMode}}</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-tooltip
          left
          max-width='100'
        >
          <v-btn
            fab
            small
            slot="activator"
            @click="drawOn()"
          >
            <v-icon> edit </v-icon>
          </v-btn>
          <span>Draw Mode</span>
        </v-tooltip>
        <v-tooltip
          left
          max-width='100'
        >
          <v-btn
            fab
            small
            slot="activator"
            @click="drawOff()"
          >
            <v-icon> pan_tool </v-icon>
          </v-btn>
          <span>Edit Map Mode</span>
        </v-tooltip>
        <v-tooltip
          left
          max-width='100'
        >
          <v-btn
            fab
            small
            slot="activator"
            @click="deleteOn()"
          >
            <v-icon> delete </v-icon>
          </v-btn>
          <span>Delete Mode</span>
        </v-tooltip>
      </v-speed-dial>
      <span>Current Mode</span>
    </v-tooltip>

      <v-layout row>
        <v-btn fixed v-if="!edit" style="left:1%;top:89%; background-color:#1d561a;color:#ffffff;" @click= "swapNav('overView')">Overview</v-btn>
        <v-btn fixed v-if="!edit" style="left:10%;top:89%; background-color:#1d561a;color:#ffffff;" @click= "swapNav('droneSwap')">Drones</v-btn>
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<style>
  .sideNav {
    top:64px;
    overflow: scroll;
    width:40%;
  }
  .map-panel {
    height:100%;
    width:100%;
  }
  .btn-toggle {
    flex-direction: column;
  }
  p.firstHeader {
    text-indent: 10px;
    line-height: 1.5;
  }
  p.secondHeader {
    line-height: 0.25;
    text-indent: 20px;
  }
</style>

<script>
  import * as VueGoogleMaps from 'vue2.1-google-maps';
  import Vue from 'vue';
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import API from '../mixins/API.js'

  Vue.use(VueGoogleMaps, {
    load: {
      installComponents: true,
      key: 'AIzaSyDVtHXFgYBtVI2G3fNUkk3Nwes-sayKTOw',
    }
  });
  export default {
    name: 'MapPage',
    mixins: [API],
    data: function data() {
      return {
      menu: false,
      userID: null,
      rowsPerPageItems: [5],

        mission_id: '',
        center: {
          lat: 0,
          lng: -30
        },
        newCenter: "",
        zoom: 3,
        mapType: 'hybrid',
        scrollwheel: false,
        draggable: true,
        title: "Untitled Flight",
        location: "",
        description: "",

        paths: [],
        polyPaths: [],
        polygons:[],
        canDraw: false,
        edit: false,

        drawer: true,
        edit_drawer: false,
        flight_drawer: false,
        selected_drone_drawer: false,

        types:[
          'Recreational', 'Commercial', 'Research'
        ],
        selectedType: "Recreational",
        menuDate: false,
        menuStart: false,
        menuEnd: false,
        pickerDate:null,
        pickerStart:null,
        pickerEnd:null,

        date: null,
        type: null,
        starts: null,
        ends: null,

        deleteMenu: false,
        cardHeight: '200px',
        x: 0,
        y: 0,
        selectedPolygon: null,
        selectedPolyline: null,
        selectedVertex: null,

        deleteable: false,
        currentMode: "pan_tool",
        clickedOnPoly: false,

        currentSelectedDrone: {
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
        "drones" : [],
        "myDrones" : [],
        "selected": [],
      };
    },
    beforeMount() {
      this.mission_id = this.$route.query.id
      this.fetch_mission_info();
      this.getMissionDrones();
      this.getUserID();
    },
    mounted () {
      this.getUserDrones();
      this.cardHeight = .89*document.documentElement.offsetHeight-64 + "px";
    },
    methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.items.slice()
      },
      getMissionDrones() {
        this.get_mission_drones(
          this.mission_id,
          response => {
            if (response.status == 200) {
              this.drones = [];
              if (true) {
                var arr = Object.keys(response.data);
                for (var i = 0; i < arr.length; i++) {
                  this.drones.push(
                    {
                      "id" : arr[i],
                      "battery_info" : {
                        "voltage" : 'null',
                        "current_consumption" : 'null',
                        "energy_remaining" : 'null'
                      },
                      "location" : {
                        latitude: 'null',
                        longitude: 'null'
                      },
                      "altitude" : 'null',
                      "connection" : 'null',
                      "CURRENT_BEHAVIOR" : 'null',
                      "velocity" : { "x" : 'null', "y" : 'null', "z" : 'null'}
                    }
                  );
                }
              }
            } else if (response.data['code'] == 31) {
              alert(response.data.message);
            }
          },
          error => {
            alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
          }
        );
      },
      getUserID() {
        this.get_user_info(
          response => {
            this.userID = response.data.id
          },
          error => {
            alert('Hmmm something went wrong with our servers when fetching stations!! Sorry Ladd!')
          }
        )
      },
      getUserDrones() {
        this.get_user_drones(
          response => {
            this.drone_data = response.data
            for(var i=0; i<this.drone_data.length; i++) {
              this.myDrones.push(this.drone_data[i])
            }
          },
          error => {
            alert('Hmmm something went wrong with our servers when fetching stations!! Sorry Ladd!')
          }
        )
      },
      fetch_mission_info() {
        this.get_mission_info_v1_1(
          this.mission_id,
          response => {
            if (response.status == 200) {
              this.title = response.data.title;
              this.description = response.data.description;
              var area = response.data.area;
              var timeArray = response.data.starts_at.split(" ");
              this.starts = timeArray[1];
              this.pickerStart = this.starts;
              this.date = timeArray[0];
              this.pickerDate = this.date;
              this.type = response.data.type;
              this.selectedType = this.type;
              this.ends = response.data.ends_at.split(" ")[1];
              this.pickerEnd = this.ends;
              for(var i = 0; i < area.features.length; i++) {
                var paths = [];
                var avg_lat = 0
                var lat_range = {min: 200, max: -200, range: 0}
                var avg_lng = 0
                var lng_range = {min: 200, max: -200, range: 0}
                var num_coords = area.features[0].geometry.coordinates.length
                for (var a in area.features[i].geometry.coordinates) {
                  paths.push({
                  lat:area.features[i].geometry.coordinates[a][0],lng:area.features[i].geometry.coordinates[a][1]
                  });

                  //avg_lat
                  avg_lat += area.features[i].geometry.coordinates[a][0]
                  if (area.features[i].geometry.coordinates[a][0] > lat_range.max) {
                    lat_range.max = area.features[i].geometry.coordinates[a][0]
                  }
                  if (area.features[i].geometry.coordinates[a][0] < lat_range.min) {
                    lat_range.min = area.features[i].geometry.coordinates[a][0]
                  }
                  //avg_lng
                  if (area.features[i].geometry.coordinates[a][1] > lng_range.max) {
                    lng_range.max = area.features[i].geometry.coordinates[a][1]
                  }
                  if (area.features[i].geometry.coordinates[a][1] < lng_range.min) {
                    lng_range.min = area.features[i].geometry.coordinates[a][1]
                  }
                  avg_lng += area.features[i].geometry.coordinates[a][1]
                }

                lat_range.range = Math.abs(lat_range.max) - Math.abs(lat_range.min)
                lng_range.range = Math.abs(lng_range.max) - Math.abs(lng_range.min)
                var range = Math.max(lat_range.range, lng_range.range)
                var zoom_coefficient = 2
                this.zoom = -1.420533814 * Math.log(range) + 6.8957137
                this.center = {lat: avg_lat/num_coords, lng: avg_lng/num_coords}

                var poly = new google.maps.Polygon({
                  paths: paths,
                  id : i,
                  strokeColor: '#FF0000',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: '#FF0000',
                  fillOpacity: 0.35,
                  editable:false,
                  draggable:false
                });
                poly.setMap(this.$refs.map.$mapObject);
                this.setEvent(poly, this);
                this.polygons.push(poly);
              }
            } else if (response.data['code'] == 31) {
              alert("Authentication Error");
            }
          },
          error => {
            alert(error);
          }
        );
      },
      mouseOver () {
        document.body.style.cursor= 'pointer';
      },
      mouseOut () {
        document.body.style.cursor= 'default';
      },
      swapNav (drone) {
        if (drone == 'edit') {
          for (var i = 0; i < this.polygons.length; i++) {
            this.polygons[i].setEditable(true);
            this.polygons[i].setDraggable(true);
          }
          this.edit = !this.edit;
          
          this.edit_drawer = true;
          this.drawer = false;
          this.flight_drawer = false;
          this.selected_drone_drawer = false;

        } else if (drone == 'droneSwap') {
          this.edit = false;
          this.edit_drawer = false;
          this.drawer = true;
          this.flight_drawer = false;
          this.selected_drone_drawer = false;

        } else if (drone == "overView") {
          if (this.edit) {
            for (var i = 0; i < this.polygons.length; i++) {
              this.polygons[i].setMap(null);
            }
            this.polygons=[];
            this.fetch_mission_info();
            this.paths=[];
          }
          this.edit = false;
          this.edit_drawer = false;
          this.drawer = false;
          this.flight_drawer = true;
          this.selected_drone_drawer = false;

        } else {
          if (drone != null) {
            this.currentSelectedDrone = drone;
          }
          this.edit_drawer = false;
          this.drawer = false;
          this.flight_drawer = false;
          this.selected_drone_drawer = true;
        }
      },
      addDrone () {
        for(var i=0; i< this.selected.length; i++) {
          this.add_drone_to_mission(
            this.selected[i].id,
            this.mission_id,
            this.userID,
            response => {
              if (response.data['code'] == 200) {
                this.getMissionDrones();
              } else if (response.data['code'] == 31) {
                alert(response.data.message);
              }
            },
            error => {
              alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
            });
        }
        this.menu = false;
      },
      updateDroneMarkers () {
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
                  anchor: new google.maps.Point(50, 50)
                }
              });
          marker.setMap(this.$refs.map.$mapObject);
          this.setMarkerEvent(marker, this.drones[i], this);
        }
      },
      setMarkerEvent(marker, drone, that){
        google.maps.event.addListener(marker, 'click', function (event) {
          that.swapNav(drone);
        });
      },
      selectingVertex (e) {
        if(this.deleteable) {
          if (e.vertex!=undefined) {
            if (this.selectedPolygon!=null){
              this.unselectPolygon();
            }
            this.selectedPolyline = this.$refs.polyline.$polylineObject;
            this.selectedVertex = e.vertex;
            this.clickedOnPoly = true;
          }
        }
      },
      showDeleteMenu (e) {
        if(this.deleteable) {
          if (this.clickedOnPoly) {
            if (this.selectedPolyline != null) {
                this.deleteMenu = false
                this.x = e.clientX
                this.y = e.clientY
                this.$nextTick(() => {
                  this.deleteMenu = true
                })
            } else {
              if(this.selectedPolygon != null) {
                this.deleteMenu = false
                this.x = e.clientX
                this.y = e.clientY
                this.$nextTick(() => {
                  this.deleteMenu = true
                })
              }
            }
          }  else {
            if(this.selectedPolygon != null) {
              this.unselectPolygon();
            }
          }
        }
        this.clickedOnPoly = false;
      },
      deletePolygon () {
          this.polygons.splice(this.selectedPolygon.id,1);
          this.selectedPolygon.setMap(null);
          this.selectedPolygon = null;
          this.selectedVertex = null;
      },
      deleteVertex () {
          if (this.selectedPolygon!=null) {
            var path = this.selectedPolygon.getPath();
            path.removeAt(this.selectedVertex);
            this.selectedVertex = null;
          } else if (this.selectedPolyline != null) {
            this.paths.splice(this.selectedVertex,1);
            this.selectedVertex = null;
            this.selectedPolyline = null;
          }
      },
      unselectPolygon () {
          this.selectedPolygon.setOptions({strokeColor: "#FF0000"});
          this.selectedPolygon = null;
          this.selectedVertex = null;
      },
      setEvent(poly, that){
        google.maps.event.addListener(poly, 'dragend', function (event) {
          that.polygons[poly.id].setPath(poly.getPath());
        });
        google.maps.event.addListener(poly, 'click', function (event) {
          if(that.deleteable) {
            that.clickedOnPoly = true;
            if (that.selectedPolygon != null) {
              if (that.selectedPolygon != poly) {
                that.selectedPolygon.setOptions({strokeColor: "#FF0000"});
                poly.setOptions({strokeColor: "#0000FF"});
                that.selectedPolygon = poly;
              }
              if (event.vertex != undefined) {
                that.selectedVertex = event.vertex;
                that.selectedPolygon = poly;
              }
            } else {
              poly.setOptions({strokeColor: "#0000FF"});
              that.selectedPolygon = poly;
              if (event.vertex != undefined) {
                that.selectedVertex = event.vertex;
                that.selectedPolygon = poly;
              }
            }
          }
        });
      },
      closePolygon: function(event) {
        if(this.canDraw) {
          if(event.latLng.lng()==this.paths[0].lng) {
            if(event.latLng.lat()==this.paths[0].lat) {
              this.polyPaths.push(this.paths);
              var poly = new google.maps.Polygon({
                paths: this.paths,
                id : this.polyPaths.length-1,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                editable:false,
                draggable:false
              });
              poly.setMap(this.$refs.map.$mapObject);
              this.setEvent(poly, this);
              this.polygons.push(poly);
              this.paths = [];
            }
          }
        } else if (this.deleteable) {
          this.selectingVertex(event);
        }
      },
      deleteOn: function() {
        if (this.canDraw) {
          this.drawOff()
        }
        this.currentMode = "delete";
        this.deleteable = true;
      },
      drawOn: function() {
        this.canDraw = true;
        this.deleteable = false;
        this.draggable = false;
        this.$refs.map.$mapObject.setOptions({ draggableCursor: 'crosshair' });
        for (var i = 0; i < this.polygons.length; i++) {
          this.polygons[i].setEditable(false);
          this.polygons[i].setDraggable(false);
        }
        this.currentMode = "edit";
      },
      drawOff: function() {
        this.canDraw = false;
        this.deleteable = false;
        this.draggable = true;
        this.$refs.map.$mapObject.setOptions({ draggableCursor: 'grab' });
        for (var i = 0; i < this.polygons.length; i++) {
          this.polygons[i].setEditable(true);
          this.polygons[i].setDraggable(true);
        }
        this.currentMode = "pan_tool";
      },
      drawLine: function (event) {
        if(this.canDraw) {
          this.paths.push({lat: event.latLng.lat(), lng: event.latLng.lng()});
        } else {
          for (var i = 0; i < this.polyPaths.length; i++) {
            var poly = this.polygons[i];
            this.polyPaths[i] = poly.getPaths();
          }
        }
      },
      updateMap() {
        if (this.newCenter != "" && this.newCenter != null) {
          var newStr = this.newCenter.replace(/\s/g,'');
          var newArray = newStr.split(',');
          var newLon = newArray[1];
          var newLat = newArray[0];
          if((parseFloat(newLon) == parseInt(newLon)) && !isNaN(newLon)){
            if((parseFloat(newLat) == parseInt(newLat)) && !isNaN(newLat)){
              if(newLat <= 90 && newLat >= -90) {
                if(newLon <= 180 && newLon >= -180) {
                  this.center.lng = parseFloat(newLon);
                  this.center.lat = parseFloat(newLat);
                  this.$refs.map.panTo(this.center);
                  this.zoom = 8;
                }
              }
            }
          }
        }
      },
      makeGeoJson: function() {
        var gJson = {
              "type": "FeatureCollection",
              "features": []
            };
          if (this.polygons.length == 0) {
            var temp = {
                    "type": "Feature",
                    "geometry":{
                      "type": "Polygon", 
                      "coordinates": []
                    },
                    "properties":{}
                  }
            gJson.features.push(temp);
          } else {
            for (var i = 0; i< this.polygons.length; i++) {
              var vertices = this.polygons[i].getPath();
              if (vertices!=undefined) {
                var temp = {
                      "type": "Feature",
                      "geometry":{
                        "type": "Polygon", 
                        "coordinates": []
                      },
                      "properties":{}
                    }
                var temp2 = [];
                vertices.forEach(function(xy, i) {
                  temp2.push([xy.lat(), xy.lng()]);
                });
                temp.geometry.coordinates = temp2;
                gJson.features.push(temp);
              }
            }
          }
          return gJson;
      },
      saveMission() {
        var geoJ = this.makeGeoJson();
        this.starts = this.pickerStart;
        this.ends = this.pickerEnd;
        this.date = this.pickerDate;
        this.type = this.selectedType;
        var body = {'mission_id': this.mission_id, 'area': geoJ, 'title': this.title, 'description': this.description, 'starts_at': this.pickerDate + ' ' + this.starts, 'ends_at': this.pickerDate + ' ' + this.ends, 'type': this.selectedType}
        this.edit_mission_details_v1_1(
          body,
          response => {
            if (response['status'] == 200) {
              for (var i = 0; i < this.polygons.length; i++) {
                this.polygons[i].setEditable(false);
                this.polygons[i].setDraggable(false);
              }
              this.draggable = true;
              this.$refs.map.$mapObject.setOptions({ draggableCursor: 'grab' });
              this.canDraw = false;
              this.edit = !this.edit;
              this.edit_drawer = false;
              this.drawer = false;
              this.flight_drawer = true;
              this.selected_drone_drawer = false;
              this.paths=[];
            } else if (response.data['code'] == 31) {
              alert(response.data.message);
            }
          },
          error => {
            alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
          }
        );
      },
      saveDate (date) {
        this.$refs.menuDate.save(date)
      }
    }
  };
</script>