<template>
	<v-card
    class = "sideNav"
    :height="cardHeight"
  >
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title" v-model='title'>{{title}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-data-table
      v-bind:headers="headers"
      v-bind:items="dronesData"
      hide-actions
      item-key="name"
      must-sort
    >
      <template slot="items" slot-scope="props">
        <v-tooltip top>
          <v-icon  v-if= "props.item.connection == 'IS_CONNECTION'" slot="activator">wifi</v-icon>
          <v-icon  v-else-if= "props.item.connection == 'null'" slot="activator">visibility_off</v-icon>
          <v-icon  v-else slot="activator">signal_wifi_off</v-icon>
          <span>{{props.item.connection}}</span>
        </v-tooltip>
        <v-tooltip top>
          <v-icon  v-if= "props.item.CURRENT_BEHAVIOR == 'SEARCHING'" slot="activator">location_searching</v-icon>
          <v-icon  v-else-if= "props.item.CURRENT_BEHAVIOR == 'null'" slot="activator">visibility_off</v-icon>
          <v-icon  v-else slot="activator">home</v-icon>
          <span>{{props.item.CURRENT_BEHAVIOR}}</span>
        </v-tooltip>
        <v-tooltip top>
          <v-icon  v-if= "props.item.battery_info.energy_remaining == 'null'" slot="activator">visibility_off</v-icon>
          <v-icon  v-else-if= "props.item.battery_info.energy_remaining < 50" slot="activator">battery_alert</v-icon>
          <v-icon  v-else slot="activator">battery_full</v-icon>
          <span>{{props.item.battery_info.energy_remaining}}%</span>
        </v-tooltip>
        <tr @click= "swapNav(props.item)" @mouseover= "mouseOver()" @mouseout= "mouseOut()">
          <td>{{ props.item.id }}</td>
        </tr>
      </template>
    </v-data-table>
    
    <v-menu
      offset-x
      :close-on-content-click="false"
      :nudge-width="200"
      v-model="menu"
    >
      <v-btn style="background-color:#1d561a;color:#ffffff" slot="activator">Add Drone</v-btn>
      <v-card>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Registered Drones</v-list-tile-title>
              <v-list-tile-sub-title>Select a drone to add to your flight.</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="myDronesData"
          v-model="selectedData"
          item-key="id"
          select-all
          :rows-per-page-items="rowsPerPageItems"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td>
                <v-checkbox
                  primary
                  v-model="props.selected"
                ></v-checkbox>
              </td>
              <td>{{ props.item.id }}</td>
            </tr>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" flat @click="updateDrones()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-card>
</template>
<script>
	export default {
		props: [
			"cardHeight",
			"title",
			"drones",
			"myDrones",
			"selected"
		],
    data: function data() {
      return {
        menu: false,
        rowsPerPageItems: [5],
        headers: [
          {
            text: 'Drone ID',
            align: 'left',
            sortable: true,
            value: 'id'
          }
        ],

        dronesData: this.drones,
        myDronesData: this.myDrones,
        selectedData: this.selected
      }
    },
    methods: {
      updateDrones () {
        this.$emit("message", this.selectedData);
      }
    }
	}
</script>
<style>
  .sideNav {
    top:64px;
    overflow: scroll;
    width:40%;
  }
</style>