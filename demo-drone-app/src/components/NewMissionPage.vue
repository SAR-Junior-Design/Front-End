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
    <v-toolbar fixed style="width: 20%; top:15%; left: 75%;">
      <v-text-field 
        label="Latitude, Longitude"
        v-model="newCenter">
      </v-text-field>
      <v-btn icon @click="updateMap()">
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>        
    </v-layout>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      light
      absolute
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
    <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-text-field 
          label="Mission Title"
          v-model="title">
        </v-text-field>
        <v-text-field 
          label="Description"
          multi-line
          v-model="description">
        </v-text-field>

          <v-btn @click="drawOn()" flat>
            <v-icon>'edit'</v-icon>
            Draw Search Area
          </v-btn>
          <v-btn @click="drawOff()" flat>
            <v-icon>'pan_tool'</v-icon>
            Edit Map
          </v-btn>

      </v-list>
      <v-btn @click.stop="drawer = !drawer" color="pink" dark absolute right>
        Save Mission
      </v-btn>
    </v-navigation-drawer>
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
        drawer: false
      };
    },
    methods: {
      httpPost: function(theUrl, body) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', theUrl);
        xhr.setRequestHeader('Content-Type', 'application/json');
        var that = this;
        xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            that.rTxt = xhr.responseText;
            if (that.rTxt.includes("login failed")) {
              alert("login failed");
            } else {
              that.$router.push({ path: '/current-mission-page' });
            }
          }
        }
        xhr.send(JSON.stringify(body));
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
        var gJson = [];
        for (var i = 0; i< this.polyPaths.length; i++) {
          gJson.push({
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry":{
                  "type": "Polygon", 
                  "coordinates": +this.polyPaths[i]
                },
                "properties":{}
              }
            ]
          });
        }
        return gJson;
      }
    }
  };
</script>
