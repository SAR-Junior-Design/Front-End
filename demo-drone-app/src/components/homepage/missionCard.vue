<template>
  <v-card dark style="background-color:#1d561a; height:400px;width:400px;">
    <v-card-media class="text-xs-center" height="200px" style="margin-left:5%;margin-right:7.5%">
      <component :mission="this.mission" is="mapTemplate"></component>
    </v-card-media>
    <v-container fluid grid-list-lg>
      <v-layout row>
        <v-flex class="text-xs-left">
          <div @mouseover="mouseOver()" @mouseout="mouseOut()" @click="goToMission()">
            <div class="text-xs-center" style="font-size:25px;"> {{ this.mission.title }}</div>
            <v-divider></v-divider>
            <div><b>Commander:</b> {{ this.mission.commander }}</div>
            <div v-if='this.clearanceExists()'><b>Clearence:</b> {{ this.mission.clearance.state }}</div>
            <div><b>Start Date:</b> {{ this.mission.starts_at }}</div>
            <div><b>Drones Online:</b> {{ this.mission.num_drones }}</div>
            <div><b>Description:</b> {{ this.mission.description }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<style>

</style>

<script>
import API from '../../mixins/API.js'
import router from '@/router'
import mapThumbnail from '../map/mapThumbnail.vue'

export default {
	mixins: [API],
	props: ['mission'],
  components: {
    'mapTemplate': mapThumbnail
  },
	data() {
		return {
		}
	},
	methods: {
    goToMission() {
      router.push('map?id='+this.mission.id);
    },
    mouseOver() {
      document.body.style.cursor= 'pointer';
    },
    mouseOut() {
      document.body.style.cursor= 'default';
    },
    clearanceExists () {
      return typeof this.mission.clearance !== 'undefined';
    }
	}
}
</script>
