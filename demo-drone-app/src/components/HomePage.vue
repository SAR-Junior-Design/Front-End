<template>
  <v-content class="background">
    <section fill-height>
      <v-container text-xs-center style="margin-top:5%;">
        <v-layout row justify-center>
          <v-flex xs12 class="text-xs-center" ma-1>
            <v-card style="background-color:#dadfe8;">
              <v-card-title>
                <v-flex class="text-xs-left" style="margin-top:0px;">
                  <h2> Active Missions </h2>
                </v-flex>
              </v-card-title>
              <v-card-text>
                <v-layout row style="overflow-x: scroll;">
                  <v-flex pa-3 class="text-xs-center" v-for="mission in userMissons" :key="mission.id">
                    <v-card dark style="background-color:#1d561a">
                      <v-container fluid grid-list-lg>
                        <v-layout row>
                          <v-flex xs7>
                            <div @mouseover="mouseOver()" @mouseout="mouseOut()" @click="goToMission(mission.id)">
                              <div class="headline"> {{ mission.title }}</div>
                              <div>awaiting mission details...</div>
                            </div>
                          </v-flex>
                          <v-flex xs5>
                            <v-card-media
                              :src="require('@/assets/missionRadar.png')"
                              height="125px"
                              contain
                            ></v-card-media>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <v-flex xs12 class="text-xs-center" ma-1>
            <v-card style="background-color:#dadfe8;">
              <v-card-title>
                <v-flex class="text-xs-left" style="margin-top:0px;">
                  <h2> Past Missions </h2>
                </v-flex>
              </v-card-title>
              <v-card-text>
                <v-layout row style="overflow-x: scroll;">
                  <v-flex pa-3 class="text-xs-center" v-for="i in 3" :key="i">
                    <v-card dark style="background-color:#1d561a">
                      <v-container fluid grid-list-lg>
                        <v-layout row>
                          <v-flex xs7>
                            <div>
                              <div class="headline"> Mission {{i}}</div>
                              <div>awaiting mission details...</div>
                            </div>
                          </v-flex>
                          <v-flex xs5>
                            <v-card-media
                              :src="require('@/assets/missionRadar.png')"
                              height="125px"
                              contain
                            ></v-card-media>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <v-flex xs12 class="text-xs-center" ma-1>
            <v-card style="background-color:#dadfe8;">
              <v-card-title>
                <v-flex class="text-xs-left" style="margin-top:0px;">
                  <h2> Drones Online </h2>
                </v-flex>
              </v-card-title>
              <v-card-text>
                <v-layout row style="overflow-x: scroll;">
                  <v-flex pa-3 class="text-xs-center" v-for="i in 5" :key="i">
                    <v-card dark style="background-color:#1d561a">
                      <v-container fluid grid-list-lg>
                        <v-layout column>
                          <v-layout row>
                            <v-flex>
                              <div>
                                <v-card-media
                                  :src="require('@/assets/drone.png')"
                                  height="50px"
                                  contain
                                ></v-card-media>
                              </div>
                              <div>
                                <div class="headline"> Drone {{i}}</div>
                                <div>awaiting drone details...</div>
                              </div>
                            </v-flex>
                          </v-layout>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <v-flex xs12 class="text-xs-center" ma-1>
            <v-card style="background-color:#dadfe8;">
              <v-card-title>
                <v-flex class="text-xs-left" style="margin-top:0px;">
                  <h2> Team Mememers </h2>
                </v-flex>
              </v-card-title>
              <v-card-text>
                <v-layout row>
                  <v-flex pa-3 class="text-xs-center" v-for="i in 6" :key="i">
                    <v-card pa-2 dark style="background-color:#1d561a">
                      <v-card-title>
                        <v-flex class="text-xs-center" style="margin-top:0px;">
                          <h2> Team Member {{i}} </h2>
                        </v-flex>
                      </v-card-title>
                      <v-card-text class="px-0">awaiting member details...</v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </v-content>
</template>

<style>
  .background {
    background: url(https://i.imgur.com/iuiH5Cu.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
</style>

<script>
import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router'
import API from '../mixins/API.js'

Vue.use(VueAxios, axios)

export default {
  name: 'Login',
  mixins: [API],
  data () {
    return {
      userMissons: {
        commanding: {
          title: 'No Active Missions Available'
        }
      },
      userMissonsCount: 0,

    }
  },
  methods: {
    goToMission(mission) {
      router.push('mission?id='+mission);
    },
    mouseOver() {
      document.body.style.cursor= 'pointer';
    },
    mouseOut() {
      document.body.style.cursor= 'default';
    }
  },
  mounted() {
    this.get_user_missions(
      response => {
        if (response.status == 200) {
          if (response.data['commanding']) {
            this.userMissons = response.data['commanding']
          }
          this.$emit('login')
          router.push('/homepage')
        } else {
          throw error
        }
      },
      error => {
        alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
      })
  }
}
</script>
