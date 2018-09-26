<template>
  <v-flex
  class="text-xs-center">
    <gmap-map
      ref="map"
      class="map-panel"
      :center="this.mission.center"
      :zoom="this.mission.zoom"
      :map-type-id="mapType"
      :options="{minZoom: 2, scrollwheel: scrollwheel, disableDefaultUI: true, draggable: true, zoomControl: true}"
      :style="gmap_style"
			>
      <gmap-polygon
        :path="this.mission.paths"
        :editable="false"
        ref="polyline">
      </gmap-polygon>
    </gmap-map>
  </v-flex>
</template>

<style>
	@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

	.mission_body {
		font-family: 'Roboto', sans-serif;
	}
</style>

<script>
	import * as VueGoogleMaps from 'vue2.1-google-maps';
	import Vue from 'vue';
	import Vuetify from 'vuetify'
	import router from '@/router'
	import API from '@/mixins/API.js'

	Vue.use(VueGoogleMaps, {
    load: {
      installComponents: true,
      key: 'AIzaSyDVtHXFgYBtVI2G3fNUkk3Nwes-sayKTOw'
    }
  });

	export default {
		name: 'MissionsPage',
		mixins: [API],
    props: ['mission'],
	  data () {
	    return {
				gmap_style: "width:350px;height:350px;",
        newCenter: "",
        zoom: 4,
        mapType: 'hybrid',
        scrollwheel: false,
        width: '60vw',
        height: '100vh',
	      tmp: '',
	      search: '',
	      pagination: {},
	      headers: [
	        { text: 'Title', align: 'left', value: 'title' },
	        { text: 'Commander', align: 'center', value: 'commander'},
	        { text: 'Drones', align: 'center', value: 'Drones#'},
	        { text: 'Start Date', align: 'center', value: 'starts_at'},
	        { text: 'Approval Status', align: 'center', value: 'legal_status'}
	      ],
	      items: [],
	      start_date: null,
	      start_menu: false,
	      end_date: null,
	      end_menu: false,
	      clearance_states: [
	      	'APPROVED',
	      	'DECLINED'
	      ],
	      is_gov_official: false,
	      snackbar: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 6000,
        text: 'Clearance updated.',
        mapLoaded: false
	    }
		},
		created() {
			this.gmap_style= `width:${this.width};height:${this.height};`
			var area = this.mission.area
			this.mission.polygons = []
			this.mission.paths = []
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
			this.mission.zoom = -1.420533814 * Math.log(range) + 6.8957137
			this.mission.paths = paths
			this.mission.center = {lat: avg_lat/num_coords, lng: avg_lng/num_coords}
		}
	}
</script>
