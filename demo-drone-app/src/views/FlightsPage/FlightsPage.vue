<template>
	<v-content class="mission_body">
		<v-layout row style="margin-top:70px;">
			<v-flex xs5>
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
			</v-flex>
			<flights-table/>
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
	import Vue from 'vue';
	import Vuetify from 'vuetify'
	import router from '@/router'
	import API from '@/mixins/API.js'
  import moment from 'moment'
  
  import FiltersCard from './FiltersCard'
	import FlightsTable from './FlightsTable'

	export default {
		name: 'MissionsPage',
		mixins: [API],
		user_info: null,
		components: {
      'filters-card': FiltersCard,
			'flights-table': FlightsTable
		},
		data () {
			return {
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
