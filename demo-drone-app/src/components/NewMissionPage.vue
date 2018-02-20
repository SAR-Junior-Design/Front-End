<template>
  <v-layout style="width:100%;height:100%;" fixed>
    <gmap-map
      ref="map"
      class="map-panel"
      :center="center"
      :zoom="zoom"
      :map-type-id="mapType"
      :options="{minZoom: 2, scrollwheel: scrollwheel, disableDefaultUI: true, draggable: draggable, zoomControl: true}"
      @click="drawLine($event)"
      @mouseout="mouseOff($event)"
      @mouseover="mouseOn($event)">
      <gmap-polyline v-if="paths.length > 0"
          :path="paths"
          :editable="true"
          ref="polyline"
          @click="closePolygon($event)">
      </gmap-polyline>
    </gmap-map>
    <v-layout>
      <v-btn @click.stop="drawer = !drawer"
        dark
        fixed
        top
        left
        style="background-color:#1d561a;margin-top:60px;"
        fab
      >
        <v-icon>compare_arrows</v-icon>
      </v-btn>

    <v-toolbar fixed style="width: 32%; top:15%; left: 65%;">
      <v-text-field 
        label="Latitude, Longitude"
        v-model="newCenter">
      </v-text-field>
      <v-btn icon @click="updateMap()">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn @click="drawOn()" flat v-if="!canDraw">
        <v-icon>'edit'</v-icon>
        Draw Search Area
      </v-btn>
      <v-btn @click="drawOff()" flat v-if="canDraw">
        <v-icon>'pan_tool'</v-icon>
        Edit Map
      </v-btn>
    </v-toolbar>        
    </v-layout>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      light
      absolute
      style="width:30%;"
    >
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            New Mission
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>'compare_arrows'</v-icon>
        </v-btn>
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
      <v-menu
        ref="menuDate"
        lazy
        :close-on-content-click="false"
        v-model="menuDate"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          label="Flight Date"
          v-model="pickerDate"
          readonly
          style="margin:2%;width:96%;"
        ></v-text-field>
        <v-date-picker
          ref="picker"
          v-model="pickerDate"
          @change="saveDate"
          :min="new Date().toISOString().substr(0, 10)"
          :max="new Date().toISOString().substr(0, 10)"
        ></v-date-picker>
      </v-menu>
      <v-menu
        ref="menuStart"
        lazy
        :close-on-content-click="false"
        v-model="menuStart"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        max-width="290px"
        min-width="290px"
        :return-value.sync="pickerStart"
      >
        <v-text-field
          slot="activator"
          label="Flight Start Time"
          v-model="pickerStart"
          prepend-icon="access_time"
          readonly
          style="width:45%;float:left;"
        ></v-text-field>
        <v-time-picker v-model="pickerStart" @change="$refs.menuStart.save(time)"></v-time-picker>
      </v-menu>
      <v-menu
        ref="menuEnd"
        lazy
        :close-on-content-click="false"
        v-model="menuEnd"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        max-width="290px"
        min-width="290px"
        :return-value.sync="pickerEnd"
      >
        <v-text-field
          slot="activator"
          label="Flight End Time"
          v-model="pickerEnd"
          prepend-icon="access_time"
          readonly
          style="width:45%;float:left;"
        ></v-text-field>
        <v-time-picker v-model="pickerEnd" @change="$refs.menuEnd.save(time)"></v-time-picker>
      </v-menu>
      <v-btn @click.stop="drawer = !drawer" @click="saveMission()" color="pink" dark style="margin-left:60%">
        Save Mission
      </v-btn>
    </v-navigation-drawer>
    <v-snackbar top vertical
      :timeout="timeout"
      v-model="snackbar"
    >
      Mission Successfully Saved
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
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
    name: 'NewMissionPage',
    mixins: [API],
    data: function data() {
      return {
        center: {
          lat: 0,
          lng: -30
        },
        newCenter: "",
        zoom: 3,
        mapType: 'hybrid',
        scrollwheel: true,
        draggable: true,
        title: "",
        location: "",
        description: "",

        menuDate: false,
        menuStart: false,
        menuEnd: false,
        pickerDate:null,
        pickerStart:null,
        pickerEnd:null,
        paths: [],
        polyPaths: [],
        polygons:[],
        canDraw: false,
        drawer: false,
        snackbar: false,
        timeout: 6000,
      };
    },
    watch: {
      menuDate (val) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = 'MONTH'))
      }
    },
    methods: {
      saveDate (date) {
        this.$refs.menuDate.save(date)
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
      mouseOff: function(e) {
        if (this.canDraw) {
          document.body.style.cursor= 'default';
        }
      },
      mouseOn: function(e) {
        if (this.canDraw) {
          document.body.style.cursor= 'crosshair';
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
              var thing = this.polygons[i].getPath();
              var temp = {
                    "type": "Feature",
                    "geometry":{
                      "type": "Polygon", 
                      "coordinates": []
                    },
                    "properties":{}
                  }
              var temp2 = [];
              thing.forEach(function(xy, i) {
                temp2.push([xy.lng(), xy.lat()]);
              });
              temp.geometry.coordinates = temp2;
              gJson.features.push(temp);
            }
          }
          return gJson;
      },
      saveMission() {
        var geoJ = this.makeGeoJson();
        this.register_mission(
          this.title, geoJ, 
          this.description, 
          response => {
            if (response.data['code'] == 200) {
              for (var i = 0; i < this.polygons.length; i++) {
                this.polygons[i].setEditable(false);
                this.polygons[i].setDraggable(false);
              }
              this.draggable = true;
              this.$refs.map.$mapObject.setOptions({ draggableCursor: 'grab' });
              this.canDraw = false;
              this.edit = !this.edit;
            } else if (response.data['code'] == 31) {
              alert("Authentication Error");
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
