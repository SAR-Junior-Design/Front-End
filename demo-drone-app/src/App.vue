<template>
  <v-app id="inspire">
    
    <!-- <v-navigation-drawer temporary v-model="sidebar">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->

    <v-toolbar fixed :flat = "is_flat" @mouseover="is_flat = false" @mouseleave="is_flat = true" style="background-color:#253f87">
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click.stop="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title style="margin-right:20px;">
        <router-link to="/" tag="span" style="cursor: pointer;color:white;">
          SAR
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
      <v-toolbar-items class="hidden-xs-only">
      	<v-btn
          flat
          to="/settings">
          <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
					    <path d="M0 0h24v24H0z" fill="none"/>
					    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
					</svg>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    
	  <router-view absolute></router-view>
    
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        is_flat: true,
        sidebar: false,
        menuItems: [
          { title: 'Map', path: '/map', icon: 'home' },
          { title: 'Mission', path: '/mission', icon: 'home'},
          { title: 'New Mission', path: '/newmission', icon: 'lock'},
          { title: 'Settings', path: '/settings', icon: 'lock'}
        ]
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'

  @require '../../node_modules/vuetify/src/stylus/settings/_colors'
  @import url("https://fonts.googleapis.com/css?family=Barlow")
 
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
  }

</style>