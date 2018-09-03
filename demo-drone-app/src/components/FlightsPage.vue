<template>
	<v-content class="mission_body">
		<v-layout row style="margin-top:70px;">
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
							<v-layout row>
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
											<v-card>
												<v-card-title primary-title>
													<div>
														<v-date-picker
														ref="picker"
														color ="green darken-4"
														v-model="start_date"
														@change=""
														:min="new Date().toISOString().substr(0, 10)"
														:max="new Date().toISOString().substr(0, 10)"
													></v-date-picker>
													</div>
												</v-card-title>
												<v-card-actions>
													<v-btn dark style="background-color:#1d561a" @click="start_menu = false">OK</v-btn>
												</v-card-actions>
											</v-card>
										</v-menu>
										<v-menu
											ref="menuDate"
											lazy
											:close-on-content-click="false"
											v-model="start_time_menu"
											transition="scale-transition"
											offset-y
											full-width
											:nudge-right="40"
											min-width="290px"
										>
											<v-text-field
												slot="activator"
												label="Start Time"
												v-model="start_time"
												readonly
												style="margin:2%;width:96%;"
											></v-text-field>
											<v-card>
												<v-card-title primary-title>
													<div>
														<v-time-picker
														ref="picker"
														color ="green darken-4"
														v-model="start_time"
														@change=""
														:min="new Date().toISOString().substr(0, 10)"
														:max="new Date().toISOString().substr(0, 10)"
													></v-time-picker>
													</div>
												</v-card-title>
												<v-card-actions>
													<v-btn dark style="background-color:#1d561a" @click="start_time_menu = false">OK</v-btn>
												</v-card-actions>
											</v-card>
									</v-menu>
							</v-layout>
					  </v-flex>
							<v-flex>
								<v-layout row>
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
											<v-card>
													<v-card-title primary-title>
														<div>
																<v-date-picker
																ref="picker"
																color ="green darken-4"
																v-model="end_date"
																@change=""
																:min="new Date().toISOString().substr(0, 10)"
																:max="new Date().toISOString().substr(0, 10)"
														></v-date-picker>
														</div>
													</v-card-title>
													<v-card-actions>
														<v-btn dark style="background-color:#1d561a" @click="end_menu = false">OK</v-btn>
													</v-card-actions>
											</v-card>
										</v-menu>
										<v-menu
											ref="menuDate"
											lazy
											:close-on-content-click="false"
											v-model="end_time_menu"
											transition="scale-transition"
											offset-y
											full-width
											:nudge-right="40"
											min-width="290px"
										>
											<v-text-field
												slot="activator"
													label="End Time"
													v-model="end_time"
													readonly
													style="margin:2%;width:96%;"
											></v-text-field>
											<v-card>
													<v-card-title primary-title>
														<div>
																<v-time-picker
																ref="picker"
																color ="green darken-4"
																v-model="end_time"
																@change=""
																:min="new Date().toISOString().substr(0, 10)"
																:max="new Date().toISOString().substr(0, 10)"
														></v-time-picker>
														</div>
													</v-card-title>
													<v-card-actions>
														<v-btn dark style="background-color:#1d561a" @click="end_time_menu = false">OK</v-btn>
													</v-card-actions>
											</v-card>
										</v-menu>
								</v-layout>
							<v-flex class="text-xs-center">
								<v-btn flat outline style="margin:10px;"
									@click="getMissions();">
									REFRESH
								</v-btn>
							</v-flex>
						</v-flex>
					</v-card-text>
				</v-card>
				<v-card style="margin-left:20px;margin-right:20px;">
					<v-flex class="text-xs-center">
						<v-btn flat outline style="margin:10px;"
							@click="newMission()">
							NEW FLIGHT PLAN
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
							:rows-per-page-items="rppi"
						>
						<template slot="items" slot-scope="props">
							<tr @click.prevent="props.expanded = !props.expanded">
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
							<v-tabs>
								<v-toolbar>
								    <v-toolbar-title>{{props.item.title}}</v-toolbar-title>
								    <v-spacer></v-spacer>
									    <v-toolbar-items class="hidden-sm-and-down">
									    	<v-tooltip left>
										    	<v-btn flat slot="activator" icon @click="showDeleteWarning=true" :disabled="!can_delete(props.item.commander_id)">
										    		<v-icon> delete </v-icon>
										    	</v-btn>
										    	<span>Delete Flight</span>
      										</v-tooltip>
											<v-dialog v-model="showDeleteWarning" max-width="500px">
												<v-toolbar dark color="primary">
													<v-icon>warning</v-icon>
								    				<v-toolbar-title>Warning</v-toolbar-title>
								    			</v-toolbar>
										        <v-card>
											        <v-card-title primary-title>
											            <h1 class="headline mb-0">Are you sure?</h1>
											        </v-card-title>
											        <v-subheader>The following flight will be deleted and cannot be restored: {{props.item.title}}</v-subheader>
											        <v-card-actions>
											          <v-btn flat @click.stop="showDeleteWarning=false">Cancel</v-btn>
											          <v-btn color="primary" @click="deleteMission(props.item.id)">Delete Flight</v-btn>
											        </v-card-actions>
										      	</v-card>
										    </v-dialog>
      										<v-tooltip left>
											    	<v-btn flat slot="activator" icon @click="goToMission(props.item.id)" :disabled="!can_delete(props.item.commander_id)">
											    		<v-icon> map </v-icon>
											    	</v-btn>
												<span>Open in Map</span>
      										</v-tooltip>
									    </v-toolbar-items>
								    <v-tabs-bar slot="extension">
								        <v-tabs-slider color="primary"></v-tabs-slider>
								        <v-tabs-item
								        	href="tab-details"
								        >
								          	Flight Details
								        </v-tabs-item>
								        <v-tabs-item
								        	href="tab-clearance"
								        >
								        	Clearance
								        </v-tabs-item>
								    </v-tabs-bar>
								</v-toolbar>
								<v-tabs-items>
						        <v-tabs-content
						          id="tab-details"
						        >
							        <v-card flat>
										<v-card-text>
											<v-layout column>
												<v-layout row>
													<v-layout column>
														<v-layout row style="margin-top:10px;">
															<v-flex>
																<h4>Start Date/Time:</h4> <span>{{props.item.starts_at}}</span>
															</v-flex>
															<v-flex>
																<h4>End Date/Time: </h4> <span>{{props.item.ends_at}}</span>
															</v-flex>
														</v-layout>
														<v-flex>
															<h4>Type: </h4><span>{{props.item.type}}</span>
														</v-flex>
													</v-layout>
													<v-layout column align-center>
														<v-flex>
															<component :mission="props.item" is="mapTemplate"></component>
														</v-flex>
													</v-layout>
												</v-layout>
												<v-layout row v-if="is_gov_official" >
													<v-flex style="margin-top:5px;">
														<h4>Flight Description:</h4>
														<span 
															style="margin-top:10px;
															height:80px;
															overflow:scroll;"
														>
															{{props.item.description}}
														</span>
													</v-flex>
												</v-layout>
											</v-layout>
										</v-card-text>
									</v-card>
						        </v-tabs-content>
						      </v-tabs-items>
						      <v-tabs-content
						          id="tab-clearance"
						        >
							        <v-card flat>
										<v-card-text>
											<v-layout column>
												<v-layout row v-if="is_gov_official" >
													<v-flex style="margin-top:5px;">
														<v-text-field 
												          label="Write a short message to the commander to explain how you're setting the status."
												          multi-line
												          rows="3"
												          v-model="message"
												        >
										        		</v-text-field>
													</v-flex>
													<v-select
														:items="clearance_states"
														v-model="currState"
														label="Set Clearance"
														single-line
														bottom
													></v-select>
												</v-layout>
												<v-layout row v-if=" !is_gov_official" >
													<v-flex style="margin-top:5px;">
														<h4>Message:</h4>
														<span 
															style="margin-top:10px;
															height:80px;
															overflow:scroll;"
															v-if="message!=null"
														>
															{{message}}
														</span>
														<span 
															style="margin-top:10px;
															height:80px;
															overflow:scroll;"
															v-else-if="message==null"
														>
															No message currently
														</span>
													</v-flex>
													<v-flex style="margin-top:5px;">
														<h4>Clearance:</h4>
														<span 
															style="margin-top:10px;
															height:80px;
															overflow:scroll;"
														>
															{{props.item.clearance.state}}
														</span>
													</v-flex>
												</v-layout>
												<v-btn v-if="is_gov_official" @click="update_clearance(props.item)" flat>Save Clearance</v-btn>
											</v-layout>
										</v-card-text>
									</v-card>
						        </v-tabs-content>
						      </v-tabs-items>
							</v-tabs>
						</template>
					</v-data-table>
				</v-card>
			</v-layout>
		</v-layout>
	</v-content>
</template>

<style>
	@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

	.mission_body {
		font-family: 'Roboto', sans-serif;
		background-color: #f0f0f0;
	}
</style>


<script>
	import * as VueGoogleMaps from 'vue2.1-google-maps';
	import Vue from 'vue';
	import Vuetify from 'vuetify'
	import router from '@/router'
	import API from '../mixins/API.js'
	import mapThumbnail from '@/components/map/mapThumbnail.vue'
	import moment from 'moment'

	Vue.use(VueGoogleMaps, {
		load: {
			installComponents: true,
			key: 'AIzaSyDVtHXFgYBtVI2G3fNUkk3Nwes-sayKTOw'
		}
	});

	export default {
		name: 'MissionsPage',
		mixins: [API],
		user_info: null,
		components: {
			'mapTemplate': mapThumbnail
		},
		data () {
			return {
				newCenter: "",
				zoom: 4,
				rppi: [10,20,40,{"text":"All","value":-1}],
				mapType: 'hybrid',
				scrollwheel: false,
				max25chars: (v) => v.length <= 25 || 'Input too long!',
				tmp: '',
				search: '',
				pagination: {},
				headers: [
					{ text: 'Title', align: 'left', value: 'title' },
					{ text: 'Commander', align: 'center', value: 'commander'},
					{ text: 'Drones', align: 'center', value: 'Drones#'},
					{ text: 'Start Date', align: 'center', value: 'starts_at'},
					{ text: 'Status', align: 'center', value: 'legal_status'}
				],
				items: [],
				showDeleteWarning: false,
				currState: null,
				start_date: "1999-01-01",
				start_menu: false,
				start_time: "00:00:00",
				start_time_menu: false,
				end_date: "2020-01-01",
				end_menu: false,
				end_time: "00:00:00",
				message: null,
				end_time_menu: false,
				clearance_states: [
					'APPROVED',
					'DECLINED'
				],
				is_gov_official: false,
				y: 'top',
				x: null,
				mode: '',
				mapLoaded: false
			}
		},
		methods: {
			can_delete(id){
				return this.user_info.id == id
			},
			_state(clearance) {
				if (clearance == null){
					return false
				}
				return clearance["state"]
			},
			getMissions() {
				var starts_at = this.start_date + ' ' + this.start_time;
				starts_at = moment(starts_at, 'YYYY-MM-DD HH:mm').toISOString()
				var ends_at = this.end_date + ' ' + this.end_time;
				ends_at = moment(ends_at, 'YYYY-MM-DD HH:mm').toISOString()
				this.get_missions_v1_1(
					starts_at,
					ends_at,
					response => {
						console.log(response.data)
						this.items = response.data
						for (var j = 0; j < this.items.length; j++){
							var area = this.items[j].area
							this.items[j].polygons = []
							this.items[j].paths = []
							var paths = []
							var avg_lat = 0
							var lat_range = {min: 200, max: -200, range: 0}
							var avg_lng = 0
							var lng_range = {min: 200, max: -200, range: 0}
							if(area.features.length>0) {
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
								if (this.items.length != 0) {
									lat_range.range = Math.abs(lat_range.max) - Math.abs(lat_range.min)
									lng_range.range = Math.abs(lng_range.max) - Math.abs(lng_range.min)
									var range = Math.max(lat_range.range, lng_range.range)
									var zoom_coefficient = 2
									this.items[j].zoom = -1.420533814 * Math.log(range) + 6.8957137
									this.items[j].paths = paths
									this.items[j].center = {lat: avg_lat/num_coords, lng: avg_lng/num_coords}
								}
							}
						}
				},
				error => {
					alert('Issues grabbing missions.')
						console.log(error)
					}
				)
			},
				setEvent(poly, that){
					google.maps.event.addListener(poly, 'dragend', function (event) {
						that.polygons[poly.id].setPath(poly.getPath());
					});
				},
			update_clearance(item) {
				item.clearance.state = this.currState;
				this.edit_clearance(
					item.id, item.clearance.state, this.message,
					response => {
						this.$emit('snackbar', 6000, 'Clearance updated.')
					},
					error => {
						alert('Error connecting to servers!')
					})
			},
			goToMission(mission) {
					router.push('map?id='+mission);
			},
			deleteMission(mission) {
				this.delete_mission(mission,
					response => {
						this.$emit('snackbar', 6000, 'Flight Deleted.')
						this.getMissions()
					},
					error => {

					})
				this.showDeleteWarning=false;
			},
			newMission(){
			router.push('/newflight')
			}
		},
		mounted () {
			this.is_government_official(response => {
				if (response.data == 'True') {
						this.is_gov_official = true
					} else {
						this.is_gov_official = false
					}
			}, error => {
				alert ('Error checking if is_government_official.')
			})
			this.getMissions();
			this.get_user_info(response => {
				if (response.status == 200) {
					this.user_info = response.data
				}
			},
			error => {
				console.log('Error grabbing user data!')
				throw error;
			})
		}
	}
</script>
