<template>
  <v-content class="homepage_body">
    <section fill-height>
      <v-container text-xs-center style="margin-top:5%;">
        <v-layout style="width:120%;margin-left:-10%" row>
          <v-flex xs12 class="text-xs-center" ma-1>
            <v-card>
            <v-tabs fixed centered grow>
              <v-tabs-bar  class="light-green darken-4" dark>
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
                  :key="item.id"
                  :id="'tab-' + item.id"
                >
                  <v-card>
                    <v-card-text>
                      <v-layout row style="overflow-x: scroll;" v-if="item.id == 1 && userMissions.length > 0">
                        <v-flex pa-3 class="text-xs-center" v-for="(currentMission, index) in userMissions" :key="index">
                          <component :mission="currentMission" is="missionTemplate"></component>
                        </v-flex>
                      </v-layout>
                      <v-layout row v-else-if="item.id == 1 && userMissions.length == 0">
                        <v-flex pa-3 class="text-xs-center">
                          <component is="noMissionTemplate"></component>
                        </v-flex>
                      </v-layout>
                      <v-layout row style="overflow-x: scroll;" v-else-if="item.id == 2 && pastMissions.length > 0">
                        <v-flex pa-3 class="text-xs-center" v-for="(currentMission, index) in pastMissions" :key="index">
                          <component :mission="currentMission" is="missionTemplate"></component>
                        </v-flex>
                      </v-layout>
                      <v-layout row style="overflow-x: scroll;" v-else-if="item.id == 1 && pastMissions.length == 0">
                        <v-flex pa-3 class="text-xs-center">
                          <component is="noMissionTemplate"></component>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-tabs-content>
              </v-tabs-items>
            </v-tabs>
          </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </v-content>
</template>

<style>
  .homepage_body {
    font-family: 'Roboto', sans-serif;
    background-color: #f0f0f0;
  }
</style>

<script>
import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router'
import API from '../mixins/API.js'
import missionCard from './homepage/missionCard.vue'
import noMissionCard from './homepage/noMissionCard.vue'
Vue.use(VueAxios, axios)
export default {
  name: 'Login',
  mixins: [API],
  components: {
    'missionTemplate': missionCard,
    'noMissionTemplate': noMissionCard
  },
  data () {
    return {
      userMissions: {
        commanding: {
          title: 'No Active Missions Available'
        }
      },
      pastMissions: {
        commanding: {
          title: 'No Past Missions Available'
        }
      },
      userMissionsCount: 0,
      currentMission: {},
      items: [
          {
              title: "Active Missions",
              text: "This is the first text",
              id: 1
          },
          {
              title: "Past Missions",
              text: "This is the second text",
              id: 2
          }
      ],
    }
  },
  methods: {
    goToMission(mission) {
      router.push('map?id='+mission);
    },
    mouseOver() {
      document.body.style.cursor= 'pointer';
    },
    mouseOut() {
      document.body.style.cursor= 'default';
    }
  },
  mounted() {
    this.$emit('change-toolbar-color', 'primary')
    this.get_active_missions(
      response => {
        if (response.status == 200) {
          this.userMissions = response.data;
          for (var j = 0; j < this.userMissions.length; j++){
            var area = this.userMissions[j].area
            this.userMissions[j].polygons = []
            this.userMissions[j].paths = []
            var paths = []
            var avg_lat = 0
            var lat_range = {min: 200, max: -200, range: 0}
            var avg_lng = 0
            var lng_range = {min: 200, max: -200, range: 0}
            var num_coords = area.features[0].geometry.coordinates.length
            for(var i = 0; i < area.features.length; i++) {
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
            }
            lat_range.range = Math.abs(lat_range.max) - Math.abs(lat_range.min)
            lng_range.range = Math.abs(lng_range.max) - Math.abs(lng_range.min)
            var range = Math.max(lat_range.range, lng_range.range)
            var zoom_coefficient = 2
            this.userMissions[j].zoom = -1.420533814 * Math.log(range) + 6.8957137
            this.userMissions[j].paths = paths
            this.userMissions[j].center = {lat: avg_lat/num_coords, lng: avg_lng/num_coords}
            }
      }
      error => {
        alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
      }}
    )
    this.get_past_missions(
      response => {
        if (response.status == 200) {
          this.pastMissions = response.data;
          for (var j = 0; j < this.pastMissions.length; j++){
            var area = this.pastMissions[j].area
            this.pastMissions[j].polygons = []
            this.pastMissions[j].paths = []
            var paths = []
            var avg_lat = 0
            var lat_range = {min: 200, max: -200, range: 0}
            var avg_lng = 0
            var lng_range = {min: 200, max: -200, range: 0}
            var num_coords = area.features[0].geometry.coordinates.length
            for(var i = 0; i < area.features.length; i++) {
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
            }
            lat_range.range = Math.abs(lat_range.max) - Math.abs(lat_range.min)
            lng_range.range = Math.abs(lng_range.max) - Math.abs(lng_range.min)
            var range = Math.max(lat_range.range, lng_range.range)
            var zoom_coefficient = 2
            this.pastMissions[j].zoom = -1.420533814 * Math.log(range) + 6.8957137
            this.pastMissions[j].paths = paths
            this.pastMissions[j].center = {lat: avg_lat/num_coords, lng: avg_lng/num_coords}
            }
      }
      error => {
        alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
      }}
    )
  }
}
</script>