<template>
	<v-content style="margin-top:70px;" class="mission_body">
		<v-layout row>
			<v-layout column>
				<v-card style="margin:20px;">
					<v-card-title>
						<v-flex>
							<h3>
								FILTERS
							</h3>
						</v-flex>
					</v-card-title>
					<v-card-text>
						<v-flex>
							<v-menu
				        ref="menuDate"
				        lazy
				        :close-on-content-click="false"
				        v-model="start_menu"
				        transition="scale-transition"
				        offset-y
				        full-width
				        :nudge-right="40"
				        min-width="290px"
				      >
				        <v-text-field
				          slot="activator"
				          label="Start Date"
				          v-model="start_date"
				          readonly
				          style="margin:2%;width:96%;"
				        ></v-text-field>
				        <v-date-picker
				          ref="picker"
				          v-model="start_date"
				          @change=""
				          :min="new Date().toISOString().substr(0, 10)"
				          :max="new Date().toISOString().substr(0, 10)"
				        ></v-date-picker>
				      </v-menu>
				    </v-flex>
				    <v-flex>
							<v-menu
				        ref="menuDate"
				        lazy
				        :close-on-content-click="false"
				        v-model="end_menu"
				        transition="scale-transition"
				        offset-y
				        full-width
				        :nudge-right="40"
				        min-width="290px"
				      >
				        <v-text-field
				          slot="activator"
				          label="End Date"
				          v-model="end_date"
				          readonly
				          style="margin:2%;width:96%;"
				        ></v-text-field>
				        <v-date-picker
				          ref="picker"
				          v-model="end_date"
				          @change=""
				          :min="new Date().toISOString().substr(0, 10)"
				          :max="new Date().toISOString().substr(0, 10)"
				        ></v-date-picker>
				      </v-menu>
				    </v-flex>
					</v-card-text>
				</v-card>
				<v-card style="margin-left:20px;margin-right:20px;">
					<v-flex class="text-xs-center">
						<v-btn flat outline style="margin:10px;"
							@click="newMission()">
							NEW MISSION
						</v-btn>
					</v-flex>
				</v-card>
			</v-layout>
			<v-layout column>
				<v-card style="margin:20px;">
					<v-data-table
	            v-bind:headers="headers"
	            v-bind:items="items"
	            v-bind:search="search"
	          >
	          <template slot="items" slot-scope="props">
	          	<tr @click="props.expanded = !props.expanded">
		            <td class="text-xs-left">{{ props.item.title }}</td>
		            <td class="text-xs-center">{{ props.item.commander }}</td>
		            <td class="text-xs-center">{{ props.item.num_drones }}</td>
		            <td class="text-xs-center">{{ props.item.starts_at }}</td>
		            <td class="text-xs-center"> 
		            	<v-icon v-if="_state(props.item.clearance) == 'DECLINED'" right color="red">block</v-icon>
		            	<v-icon v-if="_state(props.item.clearance) == 'PENDING'" right color="yellow">error</v-icon>
		            	<v-icon v-if="_state(props.item.clearance) == 'APPROVED'" right color="green">check_circle</v-icon>
		            </td>
		          </tr>
	          </template>
	          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
	            From {{ pageStart }} to {{ pageStop }}
	          </template>
	          <template slot="expand" slot-scope="props">
			        <v-card flat>
			        	<v-card-text>
			          	<v-layout row>
			          		<v-layout column>
			          			<v-flex>
					          		<h2>
					          			{{props.item.title}}
					          		</h2>
					          	</v-flex>
					          	<v-flex>
					          		<h4>
					          			{{props.item.description}}
					          		</h4>
					          	</v-flex>
					          	<v-flex>
					          		<h4>
					          			Start Date/Time: {{props.item.starts_at}}
					          		</h4>
					          		<h4>
					          			End Date/Time: {{props.item.ends_at}}
					          		</h4>
					          	</v-flex>
					          	<v-flex v-if="is_gov_official">
					          		<h4>
					          			<v-select
								            :items="clearance_states"
								            v-model="props.item.clearance.state"
								            label="Set Clearance"
								            v-on:input="update_clearance(props.item)"
								            single-line
								            bottom
								          ></v-select>
					          		</h4>
					          	</v-flex>
					          </v-layout>
					          <v-layout column align-center>
						          <v-flex 
						          class="text-xs-center"
						          style="margin:10px;">
						          	<gmap-map
										      ref="map"
										      class="map-panel"
										      :center="center"
										      :zoom="zoom"
										      :map-type-id="mapType"
										      :options="{minZoom: 2, scrollwheel: scrollwheel, disableDefaultUI: true, draggable: draggable, zoomControl: true}"
										      style="width:350px;height:200px;">
										    </gmap-map>
						          </v-flex>
					          	<v-flex class="text-xs-center">
					          		<v-btn @click="goToMission(props.item.id)">
					          			OPEN MAP
					          		</v-btn>
					          	</v-flex>
					          </v-layout>
				          </v-layout>
				        </v-card-text>
			        </v-card>
			      </template>
	        </v-data-table>
	      </v-card>
			</v-layout>
		</v-layout>
		<v-snackbar
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
      color="white"
    >
      <span style="color:black"> {{ text }} </span>
      <v-btn flat color="green" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
	</v-content>
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
	import API from '../mixins/API.js'

	Vue.use(VueGoogleMaps, {
    load: {
      installComponents: true,
      key: 'AIzaSyCtbjOc1SD9ozYtUVzrtxd0PDxRpN-0JGs',
    }
  });

	export default {
		mixins: [API],
	  data () {
	    return {
	    	center: {
          lat: 0,
          lng: -30
        },
        newCenter: "",
        zoom: 3,
        mapType: 'hybrid',
        scrollwheel: false,
        draggable: false,
	      max25chars: (v) => v.length <= 25 || 'Input too long!',
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
        text: 'Clearance updated.'
	    }
	  },
	  methods: {
	  	_state(clearance) {
	  		if (clearance == null){
	  			return false
	  		}
	  		return clearance["state"]
	  	},
	    getMissions() {
	      this.get_missions(
	        response => {
	          this.items = response.data
	      },
	      error => {
	        alert('Hmmm something went wrong with our servers when fetching stations!! Sorry Ladd!')
	      })
	    },
	    update_clearance(item) {
	    	this.edit_clearance(
	    		item.id, item.clearance.state,
	    		response => {
	    			this.snackbar = true
	    		},
	    		error => {
	    			alert('Error connecting to servers!')
	    		})
	    },
	    goToMission(mission) {
      router.push('map?id='+mission);
    	},
    	newMission(){
				router.push('/newmission')
    	}
	  },
	  mounted () {
	    this.getMissions();
	    this.is_government_official(response => {
	    	if (response.data == 'True') {
    				this.is_gov_official = true
    			} else {
    				this.is_gov_official = false
    			}
	    }, error => {
	    	alert ('Error Connecting to servers!')
	    })
	  }  
	}
</script>