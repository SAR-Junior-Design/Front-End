<template>
  <v-layout style="width:100%;height:100%;" fixed @click="showDeleteMenu">
    <v-card
      :height="cardHeight"
      style="width:40%; top:64px;overflow: scroll;"
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              New Flight
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
          style="width:40%;float:left;margin:10px;">
        </v-text-field>
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
      <v-btn @click.stop="drawer = !drawer" @click="saveMission()" dark style="background-color:#1d561a; margin-left:60%">
        Save Flight
      </v-btn>
    </v-card>
    <gmap-map
      ref="map"
      class="map-panel"
      :center="center"
      :zoom="zoom"
      :map-type-id="mapType"
      :options="{minZoom: 2, scrollwheel: scrollwheel, disableDefaultUI: true, draggable: draggable, zoomControl: true, clickableIcons: false}"
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
        <v-btn icon slot="activator" @click.stop="show = true">
          <v-icon dark color="primary">help</v-icon>
        </v-btn>
        <span>Need Help Selecting a Flight Area?</span>
      </v-tooltip>
    </v-toolbar>

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

      <v-dialog v-model="show" max-width="500px">
        <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Tips for selecting a Flight Area:</h3>
            <div>
              <br>
              <ul style="list-style-position: inside; margin-left: 25%;">
                <li> Fly below 400 ft. </li>
                <li> Fly within visual line-of-sight </li>
                <li> Fly in clear weather conditions </li>
                <li> Fly over green spaces and not over traffic </li>
                <li> Fly where there are no people under you </li>
                <li> Fly during the day </li>
                <li> Never fly near other aircrafts </li>
              </ul>
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="show=false">Close</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>

      <v-dialog v-model="alertMissingCriteria" max-width="500px">
        <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Flight Did Not Save</h3>
            <h4>Please Make Sure the Following Items are Filled Out:</h4>
            <div>
              <br>
              <ul style="list-style-position: inside; margin-left: 25%;">
                <li> Flight Title </li>
                <li> Flight Description </li>
                <li> Flight Area </li>
                <li> Flight Date </li>
                <li> Start Time </li>
                <li> End Time </li>
              </ul>
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="alertMissingCriteria=false">Close</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>

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
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import API from '../mixins/API.js'
  import moment from 'moment'
  Vue.use(VueGoogleMaps, {
    load: {
      installComponents: true,
      key: 'AIzaSyDVtHXFgYBtVI2G3fNUkk3Nwes-sayKTOw',
    }
  });
  export default {
    name: 'NewFlightsPage',
    mixins: [API],
    data: function data() {
      return {
        center: {
          lat: 33.778,
          lng: -84.396
        },
        newCenter: "",
        zoom: 15,
        mapType: 'hybrid',
        scrollwheel: true,
        draggable: true,
        title: "",
        location: "",
        description: "",
        timeout: null,
        show: false,
        alertMissingCriteria: false,
        cardHeight: '200px',
        deleteMenu: false,
        x: 0,
        y: 0,
        types:[
          'Recreational', 'Commercial', 'Research'
        ],
        selectedType: "Recreational",
        deleteable: false,
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
        timeout: 6000,
        selectedPolygon: null,
        selectedPolyline: null,
        selectedVertex: null,
        currentMode: "pan_tool",
        clickedOnPoly: false
      };
    },
    mounted() {
      this.cardHeight = document.documentElement.offsetHeight-64 + "px";
    },
    methods: {
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
      saveDate (date) {
        this.$refs.menuDate.save(date)
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
        if (this.drawer) {
        this.drawer = false;
        }
        if(this.canDraw) {
          this.paths.push({lat: event.latLng.lat(), lng: event.latLng.lng()});
        } else {
          for (var i = 0; i < this.polyPaths.length; i++) {
            var poly = this.polygons[i];
            this.polyPaths[i] = poly.getPaths();
          }
        }
      },
      updateMap: function () {
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
                temp2.push([xy.lat(), xy.lng()]);
              });
              temp.geometry.coordinates = temp2;
              gJson.features.push(temp);
            }
          }
          return gJson;
      },
      checkCriteria(title, des, start, end) {
        if (title != '' & title != null) {
          if (des != '' & des != null) {
            if (start != '' & start != null) {
              if (end != '' & end != null) {
                if (this.polygons.length > 0) {
                  return true;
                }
              }
            }
          }
        }
        this.alertMissingCriteria = true;
        return false;
      },
      saveMission() {
        var geoJ = this.makeGeoJson();
        var start = this.pickerDate + ' ' + this.pickerStart;
        var end = this.pickerDate + ' ' + this.pickerEnd;
        start = moment(start, 'YYYY-MM-DD HH:mm').toISOString()
        end = moment(end, 'YYYY-MM-DD HH:mm').toISOString()
        if(this.checkCriteria(this.title, this.description, start, end)) {
          this.register_mission_v1_1(
            this.title,
            geoJ, 
            this.description,
            start,
            end,
            this.selectedType,
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
                this.$emit('snackbar',6000, 'Flight Successfully Saved');
              }
            }, 
            error => {
              alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
            }
          );
        }
      },
      leaving () {
        document.body.style.cursor= 'default';
      }
    }
  };
</script>