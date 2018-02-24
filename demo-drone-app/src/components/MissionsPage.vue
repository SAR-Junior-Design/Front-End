<template>
	<v-content style="margin-top:70px;">
		<v-layout row>
			<v-layout column>
				<v-card style="margin:20px;">
					<v-flex> guy </v-flex>
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

	            <td class="text-xs-right">{{ props.item.title }}</td>
	            <td class="text-xs-right">{{ props.item.description }}</td>
	            <td class="text-xs-right">{{ props.item.commander }}</td>

	              <v-edit-dialog
	                @open="tmp = props.item.iron"
	                @save="props.item.iron = tmp || props.item.iron"
	                large
	                lazy
	              >
	                <div>{{ props.item.iron }}</div>
	                <div slot="input" class="mt-3 title">Update Iron</div>
	                <v-text-field
	                  slot="input"
	                  label="Edit"
	                  v-model="tmp"
	                  single-line
	                  counter
	                  autofocus
	                  :rules="[max25chars]"
	                ></v-text-field>
	              </v-edit-dialog>
	            </td>
	          </template>
	          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
	            From {{ pageStart }} to {{ pageStop }}
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
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Commander', value: 'commander'}
      ],
      items: []
    }
  },
  methods: {
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