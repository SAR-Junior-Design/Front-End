<template>
  <div class="page1">
    <div id="mySidenav" class="sidenav">
      <div class="headerBar1">
        <div align="center" class="logo3">
            <img src="../assets/sarlogo2.png">
        </div>
         <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&rsaquo;</a>
      </div>
      <div id="part1">
        <div class= 'names' id='title'>
          <h1>
            Mission Name
          </h1>
          <input class='input' v-model="title" placeholder="Mission Name Here">
        </div>

        <div class= 'names' id='description'>
          <h1>
            Description
          </h1>
          <textarea class='input' v-model="description" cols = '40' rows = '5' placeholder="Type Mission Description Here" ></textarea>
        </div>
        <div class= 'names' id='flight-path'>
          <h1>
            Flight Area
          </h1>
          <div class="map-input">
            <div>
              <input class="latlongBox" id="search" v-model="newCenter" type="text" placeholder="Latitude, Longitude">
              <button class="button" @click="updateMap()">Search</button>
            </div>
            <div class="btnCont" align="center">
              <div class="inputButton">
                <img src="../assets/hand_curser.png"  title="Click To Edit Map" @click="drawOff()">
              </div>
              <div class="inputButton">
                <img src="../assets/polyline_icon.png"  title="Click To Draw Flight Area" @click="drawOn()">
              </div>
              <div class="inputButton">
                <img src="../assets/polygon_icon.png"  title="Click To Draw Flight Area" @click="drawOn()">
              </div>
            </div>
          <div class='launch-button'>
            <button class="button" style="margin-left: 80%;margin-top: 80px;" @click="next()">Next</button>
          </div>
        </div>
      </div>
    </div>

      <div id="part2" style="visibility: hidden; margin-top:-575px;">
        <div class= 'names' id='drones'>
          <h1>
            Available Drones
          </h1>
          <div style="background-color:#d3d3d3; width: 250px;margin-left: 50px;">
            <input type="checkbox"><label>Drone ID 7543bck-sdfijewr</label>
          </div>
          <div style="background-color:#d3d3d3; width: 250px;margin-left: 50px; margin-top: 5px;">
            <input type="checkbox"><label>Drone ID 1239bck-sdfijewr</label>
          </div>
        </div>
        <div class='launch-button' style="margin-top:20%; margin-left:5%">
          <button class="button" @click="back()">Back</button>
          <button class="button" style="margin-left: 65%" @click="launch()">Save Mission</button>
        </div>
      </div>


    </div>
    <span style="font-size:30px;cursor:pointer;margin-left:98%" @click="openNav()">&lsaquo;</span>
    <div id='map'>
        <gmap-map
          ref="map"
          class="map-panel"
          :center="center"
          :zoom="zoom"
          :map-type-id="mapType"
          :options="{scrollwheel: scrollwheel, disableDefaultUI: true, draggable: draggable, zoomControl: true}"
          @click="drawLine($event)">
          <gmap-polyline v-if="paths.length > 0"
              :path="paths"
              :editable="true"
              ref="polyline"
              @click="closePolygon($event)">
          </gmap-polyline>
        </gmap-map>
      </div>
  </div>
</template>

<style>
  .headerBar1 {
    width: 100%;
    height: 100px;
    background-color: #4E505F;
  }
  .btnCont {
    margin-left: 10%;
  }
  .inputButton {
    background:#d3d3d3;
    width: 120px;
    border: 1px solid gray;
    border-radius: .3em;
    float: left;
    margin-left: 2%;
    margin-top: 15%;
  }
  .inputButton:hover {
    background-color: #A7A8B0;
  }
  .button {
    background:#d3d3d3;
    border: 1px solid gray;
    border-radius: .3em;
  }
  .button:hover {
    background-color: #A7A8B0;
  }
  gmap-map {
    display: table-row;
    border: 5px solid #a2a3aa;
  }
  .map-panel {
    height: 700px;
    width: 100%;
    position: relative;
  }
.sidenav {
    height: 100%;
    width: 500px;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    background-color: #4E505F;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
}

.sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

.sidenav a:hover {
    color: #f1f1f1;
}

.sidenav .closebtn {
    position: absolute;
    top: 0;
    font-size: 36px;
}

h1 {
  margin-left: 2%;
  color: #000000;
  font-size: 24px;
}
input {
  margin-left: 2%;
}

textarea {
  margin-left: 2%;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
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
    beforeCreate: function data() {
      var cookie = this.$cookie.get('sessionID');
      if (cookie == null) {
        this.$router.push({ path: '/' });
      }
    },
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

        paths: [],
        polyPaths: [],
        polygons:[],
        canDraw: false,

        numDrones: 0
      };
    },
    methods: {
      next: function() {
        document.getElementById("part1").style.visibility = "hidden";
        document.getElementById("part2").style.visibility = "visible";
      },
      back: function() {
        document.getElementById("part2").style.visibility = "hidden";
        document.getElementById("part1").style.visibility = "visible";
      },
      openNav: function() {
            document.getElementById("mySidenav").style.width = "500px";
      },
      closeNav: function() {
            document.getElementById("mySidenav").style.width = "0";
      },
      launch: function() {
        document.body.style.cursor= 'default';
        var body = this.makeGeoJson();
        this.httpPost("http://localhost:5000/set_area",body);
      },
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
      logOut: function() {
        var cookie = this.$cookie.get('sessionID');
        this.$cookie.delete('sessionID');
        this.$router.push({ path: '/' });
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
                editable:true,
                draggable:true
              });
              poly.setMap(this.$refs.map.$mapObject);
              this.polygons.push[poly];
              this.paths = [];
            }
          }
        }
      },
      drawOn: function() {
        this.canDraw = true;
        this.draggable = false;
        document.body.style.cursor= 'crosshair';
      },
      drawOff: function() {
        this.canDraw = false;
        this.draggable = true;
        document.body.style.cursor= 'default';
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
      showLocal: function(position) {
        this.center.lat=position.coords.latitude;
        this.center.lng=position.coords.longitude;
        this.$refs.map.panTo(this.center);
      },
      updateMap() {
        if (this.newCenter != "" && this.newCenter != null) {
          var newStr = this.newCenter.replace(/\s/g,'');
          console.log(newStr);
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
                  document.getElementById("search").value = "";
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
