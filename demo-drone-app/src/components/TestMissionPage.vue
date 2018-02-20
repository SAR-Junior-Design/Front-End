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

    <v-navigation-drawer temporary absolute v-model="drawer" light style="width:30%;top:9.5%;height:90.5%;">
      <v-tabs fixed centered>
        <v-tabs-bar class="light-green darken-4" dark>
          <v-tabs-slider class="light-green darken-2"></v-tabs-slider>
          <v-tabs-item
            v-for="item in items"
            :key="item.id"
            :href="'#tab-' + item.id"
          >
            {{ item.title }}
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content
            v-for="item in items"
            :key="item"
            :id="'tab-' + item.id"
          >
            <v-card flat>
              <v-card-text>
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
                <v-layout row>
                  <v-btn color="light-green darken-4" @click.stop="drawer = !drawer" dark>
                      Close
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn @click.stop="drawer = !drawer" @click="saveMission()" color="light-green darken-4" dark>
                    Save Mission
                  </v-btn>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
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
  Vue.use(VueGoogleMaps, {
    load: {
      installComponents: true,
      key: 'AIzaSyCtbjOc1SD9ozYtUVzrtxd0PDxRpN-0JGs',
    }
  });
  export default {
    name: 'NewMissionPage',
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

        paths: [],
        polyPaths: [],
        polygons:[],
        canDraw: false,
        drawer: false,
        snackbar: false,
        timeout: 6000,
        navigationTabs: [
          {
            title: "Filter"
          },
          {
            title: "Current Mission"
          },
          {
            title: "Statistics"
          }
        ],
        active: null,
        items: [
            {
                title: "Filters",
                text: "This is the first text",
                id: 1
            },
            {
                title: "Current Mission",
                text: "This is the second text",
                id: 2
            },
            {
                title: "Statistics",
                text: "This is the third text",
                id: 3
            },
        ],
        model: "tabs"
      };
    },
    methods: {
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
        document.body.style.cursor= 'crosshair';

        for (var i = 0; i < this.polygons.length; i++) {
          this.polygons[i].setEditable(false);
          this.polygons[i].setDraggable(false);
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
      drawOff: function() {
        this.canDraw = false;
        this.draggable = true;
        document.body.style.cursor= 'default';
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
        var body = {'title': this.title, 'area': geoJ, 'description': this.description}
        var url = "http://backend.searchandrescuedrones.us:5000/register_mission"
        axios.post(url,body, {withCredentials:true})
          .then((response) => {
            if (response.data['code'] == 200) {
              //console.log(body);
              this.snackbar = true;
            } else if (response.data['code'] == 31) {
              alert("Authentication Error");
            }
          })
          .catch(error => {
            alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
          });
      }
    }
  };
</script>
