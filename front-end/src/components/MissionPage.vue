<template>
  <div>
    <div class="headerBar">
      <div align="center" class="logo">
          <img src="../assets/sarlogo2.png">
      </div>
      <button @click="logOut()">Log Out</button>
    </div>
    <div class="page3">
      <div class='map'>
        <gmap-map
          ref="map"
          class="map-panel2"
          :center="center"
          :zoom="zoom"
          :map-type-id="mapType"
          :options="{scrollwheel: scrollwheel, disableDefaultUI: true, draggable: draggable}">
        </gmap-map>
      </div>
      <div class="info">
        <div>
          <p>Sort by:</p>
          <select id=sorter @change="sortDrones()">
            <option value="1" selected>ID</option>
            <option value="2">Battery Power</option>
          </select>
        </div>
        <div>
          <table id="drone_table">
            <td id="drone_number"> ID </td>
            <td id="battery">Battery [%]</td>
            <td id="speed">Air Speed [m/s]</td>
            <td id="altitude">Altitude [m]</td>
            <td id="location">Location [lat, lon]</td>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .info {
    background-color: #FFFFFF;
  }
  .page3 {
      width: 100%;
      margin-top: 10%;
  }
  .map {
      width: 60%;
      float: left;
  }
  .logo {
    display: block;
    padding-top: 5px;
    width: 201px;
    max-height: 90%;
    left: 50%;
    margin-left: -100px;
    position: fixed;
  }

  .headerBar {
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100vw;
    height: 100px;
    background-color: #4E505F;
  }
  .info {
      margin: 10;
  }
  .map-panel2 {
    height: 600px;
    position: relative;
    margin-left: 2%;
    margin-right: 2%;
  }
  gmap-map {
    display: block;
  }
  table, th, td {
      border: 1px solid black;
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
          lng: 0
        },
        newCenter: "",
        zoom: 8,
        gridSize: 50,
        mapType: 'hybrid',
        scrollwheel: false,
        draggable: true,

        droneNum: 0,
        droneArray:[],
        currDrone: [],
        polyPaths: []
      };
    },
    mounted: function data() {
      this.getInfo();
      this.httpPost("http://localhost:5000/calculate_area");
    },
    methods: {
      logOut: function() {
        var cookie = this.$cookie.get('sessionID');
        this.$cookie.delete('sessionID');
        this.$router.push({ path: '/' });
      },
      httpPost: function(theUrl, body) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', theUrl);
        xhr.setRequestHeader('Content-Type', 'application/json');
        var that = this;
        xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            var areaInfo=JSON.parse(xhr.responseText);
            for (var i = 0; i < areaInfo.length; i++) {
              var paths=[];
              for (var j = 0; j < areaInfo[i].features[0].geometry.coordinates[0].length; j++) {
                var point = {
                  lng: parseFloat(areaInfo[i].features[0].geometry.coordinates[0][j][0]),
                  lat: parseFloat(areaInfo[i].features[0].geometry.coordinates[0][j][1])
                };
                paths.push(point);
              }
              that.addPolygon(paths);
            }
          }
        }
        xhr.send(JSON.stringify(body));
      },
      sortDrones: function() {
        var d = document.getElementById('sorter');
        var value =d.options[d.selectedIndex].value;
        if (value==1) {
          this.droneArray.sort(function(a, b){
            if (a.id < b.id)
              return -1
            if ( a.id > b.id)
              return 1
            return 0
          });
        }
        if (value==2) {
          this.droneArray.sort(function(a, b){
            return a.battery_info.energy_remaining - b.battery_info.energy_remaining;
            });
        }
        this.droneNum= 0;
        var rowCount=document.getElementById("drone_table").rows.length;
        if (rowCount>0){
          for(var i=0;i<rowCount;i++) {
            document.getElementById("drone_table").deleteRow(0);
          }
        }
        for (var i = 0; i < this.droneArray.length; i++) {
          this.addDrone(this.droneNum,[this.droneNum, this.droneArray[i].battery_info.energy_remaining, this.droneArray[i].velocity.x, this.droneArray[i].altitude, this.droneArray[i].location], this.droneArray[this.droneNum]);
          this.droneNum= this.droneNum+1;
        }
      },
      addDrone: function(id, textArray, droneInfo) {
        var table = document.getElementById("drone_table");
        var row = table.insertRow();
        row.addEventListener("click", function() { 
          this.currDrone = droneInfo;
        });
        for (var i = 0; i<textArray.length;i++) {
          var cell = row.insertCell();
          cell.innerHTML = textArray[i];
        }
      },
      addPolygon: function(path) {
        var poly = new google.maps.Polygon({
          paths: path,
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
      },
      getInfo: function() {
        this.center.lat = 30;
        this.center.lng = -80;
        var droneInfo = {
          "drones" : [
            {
              "id" : "7543bck-sdfijewr",
              "battery_info" : {
                "voltage" : 99,
                "current_consumption" : 99,
                "energy_remaining" : 80
              },
              "location" : "33, -80",
              "altitude" : 99,
              "connection" : "IS_CONNECTION",
              "CURRENT_BEHAVIOR" : "SEARCHING",
              "velocity" : { "x" : 99, "y" : 99, "z" : 99}
          },
          {
              "id" : "1239bck-sdfijewr",
              "battery_info" : {
                "voltage" : 99,
                "current_consumption" : 99,
                "energy_remaining" : 99
              },
              "location" : "33, -80",
              "altitude" : 99,
              "connection" : "IS_CONNECTION",
              "CURRENT_BEHAVIOR" : "SEARCHING",
              "velocity" : { "x" : 99, "y" : 99, "z" : 99}
          }]
        };

        this.droneArray = droneInfo.drones;
        this.sortDrones();

        this.$refs.map.panTo(this.center);
      }
    }
  };
</script>