<template>
  <v-layout wrap>
    <v-container>
      <v-content>
        <section>
          <v-layout right>
            <v-data-table
              v-bind:headers="headers"
              :items="items"
              hide-actions
              class="elevation-1"
              dark
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
                <td class="text-xs-right">{{ props.item.sodium }}</td>
                <td class="text-xs-right">{{ props.item.calcium }}</td>
                <td class="text-xs-right">{{ props.item.iron }}</td>
              </template>
            </v-data-table>
          </v-layout>
        </section>
      </v-content>
    </v-container>
  </v-layout>
</template>

<style>
  .map-panel {
    height: 600px;
    width: 60%;
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
        headers: [
          {
            text: 'Drone ID',
            align: 'left',
            sortable: true,
            value: 'name'
          },
          { text: 'Air Speed [m/s]', value: 'calories' },
          { text: 'Altitude [m]', value: 'fat' },
          { text: 'Location [lat, lon]', value: 'carbs' }
        ],
        items: []
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
      }
    }
  };
</script>
