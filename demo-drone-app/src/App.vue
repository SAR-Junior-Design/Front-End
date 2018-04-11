<template>
  <v-app id="inspire">
		<v-toolbar transparent fixed :flat = "is_flat" :color="toolbar_color">
      <v-toolbar-title style="margin-right:20px;">
        <router-link v-if="!logged_in" to="/" tag="span" style="cursor: pointer;color: white;">
          ICARUS
        </router-link>
        <router-link v-if="logged_in" to="/homepage" tag="span" style="cursor: pointer;color: white;">
          ICARUS
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <span style="color:white;"> {{ item.title }} </span>
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
        <v-btn 
        style="color:white;" 
        flat 
        to="/login"
        >
          <v-icon style="margin-right:5px">lock_outline</v-icon>
        Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
	  <router-view absolute v-on:login="login" v-on:snackbar="_snackbar" v-on:change-toolbar-color="change_toolbar_color"></router-view>
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
  </v-app>
</template>

<script>
import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router'
import API from './mixins/API.js'
import Vuetify from 'vuetify'

Vue.use(VueAxios, axios)
Vue.use(Vuetify, {
  theme: {
    primary: '#1d561a',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

  export default {
  	mixins: [API],
    data () {
      return {
        is_flat: true,
        toolbar_color: "transparent",
        sidebar: false,
        logged_in: false,
        snackbar: false,
        mode: '',
        y: 'top',
        x: null,
        timeout: 6000,
        text: 'Clearance updated.',
        menuItems: [
        ],
        userMenu: [
        	{ title: 'Missions', path: '/missions', icon: 'home'},
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
      change_toolbar_color(color) {
        this.toolbar_color = color
      },
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
            this.toolbar_color = 'primary'
    			} else {
    				this.logged_in = false
    				this.menuItems = this.notLoggedIn
            this.toolbar_color = 'transparent'
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
