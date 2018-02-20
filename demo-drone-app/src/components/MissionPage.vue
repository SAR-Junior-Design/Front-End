<template>
  <v-layout>
    <v-layout style="width:100%;" fixed>
    <gmap-map
      ref="map"
      class="map-panel"
      :center="center"
      :zoom="zoom"
      :map-type-id="mapType"
      :options="{minZoom: 2, scrollwheel: scrollwheel, disableDefaultUI: true, draggable: draggable, zoomControl: true}"
      @click="drawLine($event)">
      <gmap-polyline v-if="paths.length > 0"
          :path="paths"
          :editable="true"
          ref="polyline"
          @click="closePolygon($event)">
      </gmap-polyline>
    </gmap-map>
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
    <div v-if="edit">
      <v-btn @click="drawOn()" flat v-if="!canDraw">
        <v-icon>'edit'</v-icon>
        Draw Search Area
      </v-btn>
    </div>
      <v-btn @click="drawOff()" flat v-if="canDraw">
        <v-icon>'pan_tool'</v-icon>
        Edit Map
      </v-btn>
    </v-toolbar>        
    </v-layout>
        <v-navigation-drawer
          disable-resize-watcher
          v-model="drawer"
          absolute
          style="top:9.5%;height:90.5%;"
        >
        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title" v-model='title'>{{title}}</v-list-tile-title>
              <v-tooltip right>
                <v-btn icon @click= "swapNav('edit')" slot="activator">
                  <v-icon>'settings'</v-icon>
                </v-btn>
                <span>Edit Flight Details</span>
              </v-tooltip>
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
          <v-tooltip top>
            <v-icon  v-if= "props.item.battery_info.energy_remaining < 50" slot="activator">battery_alert</v-icon>
            <v-icon  v-else slot="activator">battery_full</v-icon>
            <span>{{props.item.battery_info.energy_remaining}}%</span>
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
                Drone Details
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
          <v-btn icon @click= "swapNav(null)">
            <v-icon>'compare_arrows'</v-icon>
          </v-btn>
        </v-toolbar>
         <v-card>
            <v-card-title primary-title>
              <div>
                <h3>ID: {{selected.id}}</h3><br>
                <h3>Flight Details</h3>
                <p class="firstHeader"> Battery </p>
                
                <p class="secondHeader"> Power Remaining: {{selected.battery_info.current_consumption}}%</p>
                <p class="secondHeader"> Voltage: {{selected.battery_info.voltage}} V</p>

                <p class="firstHeader"> Speed </p>
                <p class="secondHeader">x: {{selected.velocity.x}} m/s</p>
                <p class="secondHeader">y: {{selected.velocity.y}} m/s</p>
                <p class="secondHeader">z: {{selected.velocity.z}} m/s</p>

                <h3>Navigation</h3>
                <p class="firstHeader"> Location </p>
                <p class="secondHeader">Latitude: {{selected.location.latitude}} </p>
                <p class="secondHeader">Longitude: {{selected.location.longitude}} </p>
                <p class="secondHeader">Altitude: {{selected.altitude}} m</p>

                <h3>Visuals</h3>
              </div>
            </v-card-title>
          </v-card>
      </v-navigation-drawer>

    <v-navigation-drawer
      disable-resize-watcher
      v-model="edit_drawer"
      light
      absolute
      style="top:9.5%;height:90.5%;"
    >
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Flight Details
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-menu offset-y open-on-hover>
        <v-btn icon slot="activator">
          <v-icon>'menu'</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="saveMission()">
            <v-list-tile-title>Update Mission</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="swapNav('edit')">
            <v-list-tile-title>Back</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

      <v-list dense class="pt-0" style="margin:2%;">
        <v-text-field 
          label="Mission Title"
          v-model="title">
        </v-text-field>
        <v-text-field 
          label="Description"
          multi-line
          v-model="description">
        </v-text-field>
      </v-list>
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
      key: 'AIzaSyCtbjOc1SD9ozYtUVzrtxd0PDxRpN-0JGs',
    }
  });
  export default {
    name: 'MissionPage',
    mixins: [API],
    data: function data() {
      return {
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
        title: "Untitled Mission",
        location: "",
        description: "",

        paths: [],
        polyPaths: [],
        polygons:[],
        canDraw: false,
        edit: false,

        drawer: true,
        edit_drawer: false,
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
                "energy_remaining" : 30
              },
              "location" : {
                latitude: 34,
                longitude: -80
              },
              "altitude" : 99,
              "connection" : "IS_CONNECTION",
              "CURRENT_BEHAVIOR" : "RETURNING",
              "velocity" : { "x" : 99, "y" : 99, "z" : 99}
          },
          {
              "id" : 'D5743kju-rtdshvcxs',
              "battery_info" : {
                "voltage" : 99,
                "current_consumption" : 99,
                "energy_remaining" : 10
              },
              "location" : {
                latitude: 33,
                longitude: -81
              },
              "altitude" : 99,
              "connection" : "NO_CONNECTION",
              "CURRENT_BEHAVIOR" : "SEARCHING",
              "velocity" : { "x" : 99, "y" : 99, "z" : 99}
          }
        ]
      };
    },
    beforeMount() {
      this.mission_id = this.$route.query.id
      this.fetch_mission_info()
    },
    methods: {
      fetch_mission_info() {
        this.get_mission_info(
          this.mission_id,
          response => {
            if (response.status == 200) {
              this.title = response.data.title;
              this.description = response.data.description;
              var area = response.data.area;
              console.log(area);
              var polygons_loaded_in = [];
              for(var i = 0; i < area.features.length; i++) {
                var paths = [];
                for (var a in area.features[i].geometry.coordinates) {
                  paths.push({
                  lat:area.features[i].geometry.coordinates[a][0],lng:area.features[i].geometry.coordinates[a][1]
                  });
                }
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
                polygons_loaded_in.push(poly);
              }
              this.polygons = polygons_loaded_in;
            } else if (response.data['code'] == 31) {
              alert("Authentication Error");
            }
          },
          error => {
            console.log(error);
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
          this.edit_drawer = !this.edit_drawer;
          this.drawer = !this.drawer;

        } else {
          if (drone != null) {
            this.selected = drone;
          }
          this.drawer = !this.drawer;
          this.selected_drone_drawer = !this.selected_drone_drawer;
        }
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
                  anchor: new google.maps.Point(50, 50)
                }
              });
          marker.setMap(this.$refs.map.$mapObject);
        }
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
              this.polygons.push(poly);
              this.paths = [];
            }
          }
        }
      },
      drawOn: function() {
        this.canDraw = true;
        this.draggable = false;

        this.$refs.map.$mapObject.setOptions({ draggableCursor: 'crosshair' });

        for (var i = 0; i < this.polygons.length; i++) {
          this.polygons[i].setEditable(false);
          this.polygons[i].setDraggable(false);
        }
      },
      drawOff: function() {
        this.canDraw = false;
        this.draggable = true;
        this.$refs.map.$mapObject.setOptions({ draggableCursor: 'grab' });
        for (var i = 0; i < this.polygons.length; i++) {
          this.polygons[i].setEditable(true);
          this.polygons[i].setDraggable(true);
        }
      },
      drawLine: function (event) {
        if(this.canDraw) {
          this.paths.push({lng: event.latLng.lng(), lat: event.latLng.lat()});
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
                  this.zoom = 10;
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
          if (this.polyPaths.length == 0) {
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
          return gJson;
      },
      saveMission() {
        var geoJ = this.makeGeoJson();
        var body = {'mission_id': this.mission_id, 'area': geoJ}
        this.edit_mission_details(
          body,
          response => {
            if (response.data['code'] == 200) {
              for (var i = 0; i < this.polygons.length; i++) {
                this.polygons[i].setEditable(false);
                this.polygons[i].setDraggable(false);
              }
              this.draggable = true;
              this.$refs.map.$mapObject.setOptions({ draggableCursor: 'grab' });
              this.edit_drawer = ! this.edit_drawer;
              this.drawer = ! this.drawer;
              this.canDraw = false;
              this.edit = !this.edit;
            } else if (response.data['code'] == 31) {
              alert(response.data.message);
            }
          },
          error => {
            alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
          }
        );
      }
    }
  };
</script>