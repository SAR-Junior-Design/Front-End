<template>
	<v-content style="margin-top:70px;">
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
						<v-btn flat outline style="margin:10px;">
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
		            	<v-icon v-if="_state(props.item.clearance) == 'BLOCKED'" right color="red">block</v-icon>
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
			          <v-card-title>
			          	<v-flex>
			          		<h2>
			          			Title: {{props.item.title}}
			          		</h2>
			          	</v-flex>
			          </v-card-title>
			          <v-card-text>
			          	<v-flex>
			          		<h4>
			          			{{props.item.description}}
			          		</h4>
			          	</v-flex>
			          </v-card-text>
			        </v-card>
			      </template>
	        </v-data-table>
	      </v-card>
			</v-layout>
		</v-layout>
	</v-content>
</template>


<script>
import Vue from 'vue';
import Vuetify from 'vuetify'
import router from '@/router'
import API from '../mixins/API.js'

export default {
	mixins: [API],
  data () {
    return {
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
      end_menu: false
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
    }
  },
  mounted () {
    this.getMissions();
  }  
}
</script>