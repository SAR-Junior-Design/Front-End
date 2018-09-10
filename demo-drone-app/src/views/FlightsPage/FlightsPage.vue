<template>
	<v-content class="mission_body">
		<v-layout row style="margin-top:70px;">
			<v-layout column>
				<filters-card/>
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
							v-bind:items="missions"
							v-bind:search="search"
							:rows-per-page-items="rppi"
						>
						<template slot="items" slot-scope="props">
							<tr @click.prevent="props.expanded = !props.expanded">
								<td class="text-xs-left">{{ props.item.title }}</td>
								<td class="text-xs-center">{{ props.item.commander_id }}</td>
								<td class="text-xs-center">{{ props.item.num_drones }}</td>
								<td class="text-xs-center">{{ props.item.starts_at | date_filter}}</td>
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
								<v-toolbar flat>
                  <v-toolbar-title>{{props.item.title}}</v-toolbar-title>
                  <v-spacer></v-spacer>
                    <v-toolbar-items class="hidden-sm-and-down">
                      <v-tooltip left>
                        <v-btn flat slot="activator" icon @click="showDeleteWarning=true" :disabled="!can_delete(props.item.created_by)">
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
                          <v-btn flat slot="activator" icon @click="goToMission(props.item.id)">
                            <v-icon> map </v-icon>
                          </v-btn>
                      <span>Open in Map</span>
                        </v-tooltip>
                    </v-toolbar-items>
								</v-toolbar>
                <v-tabs-bar>
                    <v-tabs-slider color="primary"></v-tabs-slider>
                    <v-tabs-item
                      href="tab-details"
                    >
                        Flight Details
                    </v-tabs-item>
                    <v-tabs-item
                      href="tab-commander-info"
                    >
                      Commander Info
                    </v-tabs-item>
                    <v-tabs-item
                      href="tab-clearance"
                    >
                      Clearance
                    </v-tabs-item>
                </v-tabs-bar>
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
                                  <h4>Start Date/Time:</h4> <span>{{props.item.starts_at | datetime_filter}}</span>
                                </v-flex>
                                <v-flex>
                                  <h4>End Date/Time: </h4> <span>{{props.item.ends_at | datetime_filter}}</span>
                                </v-flex>
                              </v-layout>
                              <v-flex>
                                <h4>Type: </h4><span>{{props.item.type}}</span>
                              </v-flex>
                            </v-layout>
                            <v-layout column align-center>
                              <v-flex>
                                <mapTemplate :mission="props.item"
																:width="250" :height="200"/>
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
                                v-if="props.item.clearance.message!=null"
                              >
                                {{props.item.clearance.message}}
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
                  <v-tabs-content
                    id="tab-commander-info"
                  >
                    <commander-info :created_by="props.item.created_by"/>
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
	import API from '@/mixins/API.js'
	import mapThumbnail from '@/components/mapThumbnail.vue'
  import moment from 'moment'
  
  import FiltersCard from './FiltersCard'
  import CommanderInfo from './CommanderInfo'

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
			'mapTemplate': mapThumbnail,
      'filters-card': FiltersCard,
      'commander-info': CommanderInfo
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
				missions: [],
				showDeleteWarning: false,
				currState: null,
				message: null,
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
				return this.user_info.user.id == id
			},
			_state(clearance) {
				if (clearance == null){
					return false
				}
				return clearance["state"]
			},
			_message(clearance) {
				if (clearance == null){
					return false
				}
				return clearance["message"]
			},
			async getMissions() {
				var starts_at = this.start_date + ' ' + this.start_time;
				starts_at = moment(starts_at, 'YYYY-MM-DD HH:mm').toISOString()
				var ends_at = this.end_date + ' ' + this.end_time;
				ends_at = moment(ends_at, 'YYYY-MM-DD HH:mm').toISOString()
				var response = await this.get_missions(
					starts_at,
					ends_at,
					this.$store.state.access_token
				);
				this.missions = response.data
			},
				setEvent(poly, that){
					google.maps.event.addListener(poly, 'dragend', function (event) {
						that.polygons[poly.id].setPath(poly.getPath());
					});
				},
			async update_clearance(item) {
				item.clearance.state = this.currState;
				const response = await this.edit_clearance(
					item.id, item.clearance.state, this.message,
					this.$store.state.access_token
				);
				if (response.status == 200) {
					this.$emit('snackbar', 6000, 'Clearance updated.')
				}
			},
			goToMission(mission) {
					router.push('map?id='+mission);
			},
			async deleteMission(mission) {
				const response = await this.delete_mission(mission,
					this.$store.state.access_token
				);
				if (response.status == 200) {
					this.$emit('snackbar', 6000, 'Flight Deleted.')
					this.getMissions()
				}
				this.showDeleteWarning=false;
			},
			newMission(){
			router.push('/newflight')
			}
		},
		async mounted () {
			var response = await this.is_government_official(this.$store.state.access_token);
			if (JSON.stringify(response.data) == 'true') {
				this.is_gov_official = true
			}
			await this.getMissions();
			response = await this.get_current_user_info(this.$store.state.access_token);
			if (response.status == 200) {
				this.user_info = response.data
			}
		},
		filters: {
  		date_filter: function (date) {
    		return moment(date).format('MMMM Do, YYYY');
			},
			datetime_filter: function (date) {
    		return moment(date).format('MMMM Do YYYY, h:mm a');
			}
		}
	}
</script>
