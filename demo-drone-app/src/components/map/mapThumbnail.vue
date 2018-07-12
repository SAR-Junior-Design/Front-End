<template>
  <v-flex
  class="text-xs-center"
  style="margin:10px;">
    <gmap-map
      ref="map"
      class="map-panel"
      :center="this.mission.center"
      :zoom="this.mission.zoom"
      :map-type-id="mapType"
      :options="{minZoom: 2, scrollwheel: scrollwheel, disableDefaultUI: true, draggable: false, zoomControl: true}"
      style="width:350px;height:200px;">
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
	import API from '../../mixins/API.js'

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
        newCenter: "",
        zoom: 4,
        mapType: 'hybrid',
        scrollwheel: false,
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
	  }
	}
</script>
