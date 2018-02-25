<template>
  <v-app id="inspire">
		<v-toolbar fixed :flat = "is_flat" @mouseover="is_flat = false" @mouseleave="is_flat = true" style="background-color:#1d561a">
      <v-toolbar-title style="margin-right:20px;">
        <router-link v-if="!logged_in" to="/" tag="span" style="cursor: pointer;color: #dadfe8;">
          SAR
        </router-link>
        <router-link v-if="logged_in" to="/homepage" tag="span" style="cursor: pointer;color: #dadfe8;">
          SAR
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <span style="color:#dadfe8;"> {{ item.title }} </span>
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-menu bottom left v-if="logged_in">
        <v-btn icon slot="activator" dark>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile to="/settings">
            <v-list-tile-title> settings</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="_logoff()">
            <v-list-tile-title> sign out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-toolbar-items class="hidden-sm-and-down" v-if="!logged_in">
        <v-btn style="color:#dadfe8;" flat to="/login" >Login</v-btn>
        <v-btn style="color:#dadfe8;" flat to="/" >Sign Up</v-btn>
      </v-toolbar-items>
    </v-toolbar>
	  <router-view absolute v-on:login="login"></router-view>
  </v-app>
</template>

<script>
import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router'
import API from './mixins/API.js'

Vue.use(VueAxios, axios)

  export default {
  	mixins: [API],
    data () {
      return {
        is_flat: true,
        sidebar: false,
        logged_in: false,
        menuItems: [
        ],
        userMenu: [
        	{ title: 'Mission', path: '/missions', icon: 'home'},
          { title: 'New Mission', path: '/newmission', icon: 'lock'},
          { title: 'Drones', path: '/drones', icon: 'lock'}
        ],
        notLoggedIn: [

        ],
        settings_menu: [
        	'profile',
        	'settings',
        	'sign out'
        ]
      }
    },
    methods: {
    	login() {
        this.logged_in = true
        this.menuItems = this.userMenu
    	},
    	_logoff() {
      	this.logoff(response => {
      		this.logged_in = false
      		this.menuItems = this.notLoggedIn
      		router.push('/')
      	},
      	error => {
      		alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
      	})
    	}
    },
    mounted() {
    	this.isLoggedIn(
    		response => {
    			if (response.data == 'True') {
    				this.logged_in = true
    				this.menuItems = this.userMenu
    			} else {
    				this.logged_in = false
    				this.menuItems = this.notLoggedIn
    			}
    		},
    		error => {
    			alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
    		})
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'

  @require '../../node_modules/vuetify/src/stylus/settings/_colors'
  @import url("https://fonts.googleapis.com/css?family=Barlow")
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');


  $theme := {
    primary: $red.darken-2
    accent: $red.accent-2
    secondary: $grey.lighten-1
    info: $blue.lighten-1
    warning: $amber.darken-2
    error: $red.accent-4
    success: $green.lighten-2
  }

  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }

</style>
