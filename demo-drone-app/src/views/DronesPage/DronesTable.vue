<template>
  <v-card id="drone_TABLE">
    <v-card-title>
      <h1 style="font-size:28px;font-weight:200">
        Connected Drones
      </h1>
      <v-spacer/>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      />
    </v-card-title>
        <div>
          <v-btn
              v-on:click="deleteDrone()"
              >Remove Selected
          </v-btn>
        </div>
        <v-data-table
          :headers="headers"
          :items="drones"
          :search="search"
          v-model="selected"
          item-key="id"
          select-all
          class="elevation-1"
          hide-actions
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td>
                <v-checkbox
                  primary
                  v-model="props.selected"
                ></v-checkbox>
              </td>
              <td class="text-xs-right" @click="props.expanded = !props.expanded" @mouseover="mouseOverM()">{{ props.item.name }}</td>
                <td class="text-xs-right" @click="props.expanded = !props.expanded" @mouseover="mouseOverM()">{{ props.item.color }}</td>
              <td class="text-xs-right" @click="props.expanded = !props.expanded" @mouseover="mouseOverM()">{{ props.item.manufacturer }}</td>
              <td class="text-xs-right" @click="props.expanded = !props.expanded" @mouseover="mouseOverM()">{{ props.item.type }}</td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-card flat>
              <v-card-text v-if="!editDescription">
                <v-layout row justify-space-between>
                  <v-flex xs8>
                    {{props.item.description}}
                  </v-flex>
                  <v-flex xs2>
                    <v-btn flat @click="editDescription=true">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text v-if="editDescription">
                <v-layout row justify-space-between>
                  <v-flex xs8>
                    <v-text-field
                      name="input-description"
                      :value="props.item.description"
                      multi-line
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn flat @click="editDescription=false">
                      <v-icon>close</v-icon>
                    </v-btn>
                    <v-btn flat @click="">
                      <v-icon>save</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
  </v-card>
</template>


<script>
  import API from '@/mixins/API.js'
  
  export default {
    mixins: [API],
    props: ['drones'],
    data() { 
      return {
        search: '',
        selected: [],
        headers: [     
          { text: 'Name', value: 'name' },
          { text: 'Color', value: 'color' },
          { text: 'Manufacturer', value: 'manufacturer' },
          { text: 'Type', value: 'type' }
        ],
        editDescription: false
      }
    },
    methods: {
      mouseOverM () {
        document.body.style.cursor= 'default';
      },
      deleteDrone() {
        this.$emit('delete_drones', this.selected)
      }
    }
  }

</script>



<style>
  .background_drone {
    background-image: none;
    background-color: #F0F0F0;
  }
  #drone_ADD {
    margin-top: 80px; 
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
  }
  #drone_TABLE {
    margin-top: 80px;
    margin-bottom: 10px;
    margin-right: 20px;
  }
  #testing {
    margin-top: 70px;
  }
</style>