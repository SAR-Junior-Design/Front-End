<template>
	<v-card
	    v-if="edit_drawer"
	    class="sideNav"
	    :height="cardHeight"
	  >
	    <v-toolbar flat>
	      <v-list>
	        <v-list-tile>
	          <v-list-tile-title class="title">
	            Flight Details
	          </v-list-tile-title>
	        </v-list-tile>
	      </v-list>
	    </v-toolbar>

	    <v-list dense class="pt-0" style="margin:2%;">
	      <v-text-field 
	        label="Flight Title"
	        v-model="title">
	      </v-text-field>
	      <v-text-field 
	        label="Description"
	        multi-line
	        v-model="description">
	      </v-text-field>
	    </v-list>

	    <v-select
	      :items="types"
	      v-model="selectedType"
	      label="Flight Type"
	      single-line
	      auto
	      hide-details
	      style="width:40%;float:left;margin:10px;">
	    </v-select>
	    <v-menu
	      ref="menu"
	      persistent
	      lazy
	      :close-on-content-click="false"
	      v-model="menuDate"
	      transition="scale-transition"
	      full-width
	      :nudge-right="140"
	      :return-value.sync="pickerDate"
	    >
	      <v-text-field
	        slot="activator"
	        label="Flight Date"
	        v-model="pickerDate"
	        readonly
	        prepend-icon="event"
	        style="width:40%;float:left;margin:10px;"
	      ></v-text-field>
	      <v-card>
	        <v-card-title primary-title>
	          <div>
	            <v-date-picker
	              ref="picker"
	              v-model="pickerDate"
	              @change="saveDate"
	              color ="green darken-4"
	              :show-current="false"
	            ></v-date-picker>
	          </div>
	        </v-card-title>
	        <v-card-actions>
	          <v-btn dark style="background-color:#1d561a" @click="menuDate = false">OK</v-btn>
	        </v-card-actions>
	      </v-card>
	    </v-menu>
	    <v-menu
	      ref="menuStart"
	      persistent
	      lazy
	      :close-on-content-click="false"
	      v-model="menuStart"
	      transition="scale-transition"
	      full-width
	      :nudge-right="140"
	      :return-value.sync="pickerStart"
	    >
	      <v-text-field
	        slot="activator"
	        label="Flight Start Time"
	        v-model="pickerStart"
	        prepend-icon="access_time"
	        readonly
	        style="width:40%;float:left;margin:10px;"
	      ></v-text-field>
	      <v-card>
	        <v-card-title primary-title>
	          <div>
	            <v-time-picker v-model="pickerStart" color ="green darken-4"></v-time-picker>
	          </div>
	        </v-card-title>
	        <v-card-actions>
	          <v-btn dark style="background-color:#1d561a" @click="menuStart = false">OK</v-btn>
	        </v-card-actions>
	      </v-card>
	    </v-menu>

	    <v-menu
	      ref="menuEnd"
	      persistent
	      lazy
	      :close-on-content-click="false"
	      v-model="menuEnd"
	      transition="scale-transition"
	      full-width
	      :nudge-right="140"
	      :return-value.sync="pickerEnd"
	    >
	      <v-text-field
	        slot="activator"
	        label="Flight End Time"
	        v-model="pickerEnd"
	        prepend-icon="access_time"
	        readonly
	        style="width:40%;float:left;margin:10px;">
	      </v-text-field>
	      <v-card>
	        <v-card-title primary-title>
	          <div>
	            <v-time-picker v-model="pickerEnd" color ="green darken-4"></v-time-picker>
	          </div>
	        </v-card-title>
	        <v-card-actions>
	          <v-btn dark style="background-color:#1d561a" @click="menuEnd = false">OK</v-btn>
	        </v-card-actions>
	      </v-card>  
	    </v-menu>

	    <v-btn fixed style="left:1%;top:89%;background-color:#1d561a;color:#ffffff" @click="saveMission()">Update Flight</v-btn>
	    <v-btn fixed style="left: 15%;top:89%;background-color:#1d561a;color:#ffffff" @click="swapNav('overView')">Back</v-btn>
	</v-card>
</template>
<script>
  export default {
    props: [
    ]
  }
</script>
<style>
  .sideNav {
    top:64px;
    overflow: scroll;
    width:40%;
  }
  p.firstHeader {
    text-indent: 10px;
    line-height: 1.5;
  }
  p.secondHeader {
    line-height: 0.25;
    text-indent: 20px;
  }
</style>