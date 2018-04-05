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
												<h4>
													Type: {{props.item.type}}
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
												<component :mission="props.item" is="mapTemplate"></component>
											</v-flex>
										</v-layout>
									</v-layout>
									<v-layout row>
										<v-flex class="text-xs-center">
											<v-btn 
											outline 
											flat 
											@click="deleteMission(props.item.id)"
											:disabled="!can_delete(props.item.commander_id)">
												DELETE MISSION
											</v-btn>
											<v-btn outline flat @click="goToMission(props.item.id)">
												OPEN MAP
											</v-btn>
										</v-flex>
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
	import mapThumbnail from '@/components/map/mapThumbnail.vue'

	Vue.use(VueGoogleMaps, {
		load: {
			installComponents: true,
			key: 'AIzaSyCtbjOc1SD9ozYtUVzrtxd0PDxRpN-0JGs'
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
					{ text: 'Approval Status', align: 'center', value: 'legal_status'}
				],
				items: [],
				start_date: "1999-01-01",
				start_menu: false,
				start_time: "00:00:00",
				start_time_menu: false,
				end_date: "2020-01-01",
				end_menu: false,
				end_time: "00:00:00",
				end_time_menu: false,
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
					var ends_at = this.end_date + ' ' + this.end_time;
					this.get_missions_v1_1(
						starts_at,
						ends_at,
						response => {
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
									lat_range.range = Math.abs(lat_range.max) - Math.abs(lat_range.min)
									lng_range.range = Math.abs(lng_range.max) - Math.abs(lng_range.min)
									var range = Math.max(lat_range.range, lng_range.range)
									var zoom_coefficient = 2
									this.items[j].zoom = -1.420533814 * Math.log(range) + 6.8957137
									this.items[j].paths = paths
									this.items[j].center = {lat: avg_lat/num_coords, lng: avg_lng/num_coords}
									}
							}
					},
				error => {
					alert('Hmmm something went wrong with our servers when fetching stations!! Sorry Ladd!')
						console.log(error)
					})
			},
				setEvent(poly, that){
					google.maps.event.addListener(poly, 'dragend', function (event) {
						that.polygons[poly.id].setPath(poly.getPath());
					});
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
			deleteMission(mission) {
				this.delete_mission(mission,
					response => {
						alert('Mission deleted!')
						this.getMissions()
					},
					error => {

					})
			},
			newMission(){
			router.push('/newmission')
			}
		},
		beforeMount () {
			this.is_government_official(response => {
				if (response.data == 'True') {
						this.is_gov_official = true
					} else {
						this.is_gov_official = false
					}
			}, error => {
				alert ('Error Connecting to servers!')
			})
			this.getMissions();
			this.get_user_info(response => {
				if (response.status == 200) {
					this.user_info = response.data
				} else {
					throw error;
				}
			},
			error => {
				console.log('Error grabbing user data!')
			})
		},
		mounted () {
		}
	}
</script>
