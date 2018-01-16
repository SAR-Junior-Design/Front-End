<template>
  <v-app style="background-color:white; margin-top: 0px; font-family: 'Barlow', sans-serif;">
    <v-navigation-drawer temporary v-model="sidebar">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed style="background-color:#0b5108;color:#ffffff">
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click.stop="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
          style="color:#ffffff;">
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container pa-0 fluid>
      <router-view></router-view>
    </v-container>
    
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        appTitle: 'SAR-DRONE',
        sidebar: false,
        menuItems: [
          { title: 'Home', path: '/home', icon: 'home' },
          { title: 'Map', path: '/map', icon: 'map'},
          { title: 'Mission', path:'/mission', icon: 'helmet'},
          { title: 'New Mission', path: '/newmission', icon: 'helmet'}
        ]
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>