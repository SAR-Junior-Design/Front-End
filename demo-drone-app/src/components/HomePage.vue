<template>
  <v-content class="background">
    <section fill-height>
      <v-container text-xs-center style="margin-top:5%;">
        <v-layout row>
          <v-flex xs12 class="text-xs-center" ma-1>
            <v-tabs fixed centered>
              <v-tabs-bar class="light-green darken-4" dark>
                <v-tabs-slider class="light-green darken-2"></v-tabs-slider>
                <v-tabs-item
                  v-for="item in items"
                  :key="item.id"
                  :href="'#tab-' + item.id"
                >
                  {{ item.title }}
                </v-tabs-item>
              </v-tabs-bar>
              <v-tabs-items>
                <v-tabs-content
                  v-for="item in items"
                  :key="item.id"
                  :id="'tab-' + item.id"
                >
                  <v-card flat>
                    <v-card-text>
                      <v-layout row style="overflow-x: scroll;">
                        <v-flex pa-3 class="text-xs-center" v-for="(currentMission, index) in userMissions" :key="index">
                          <component :mission="currentMission" is="missionTemplate"></component>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-tabs-content>
              </v-tabs-items>
            </v-tabs>
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
import API from '../mixins/API/API_V1_0.js'
import missionCard from './homepage/missionCard.vue'

Vue.use(VueAxios, axios)

export default {
  name: 'Login',
  mixins: [API],
	components: {
    'missionTemplate': missionCard
  },
  data () {
    return {
      userMissions: {
        commanding: {
          title: 'No Active Missions Available'
        }
      },
      userMissionsCount: 0,
      currentMission: {},
        items: [
            {
                title: "Active Missions",
                text: "This is the first text",
                id: 1
            },
            {
                title: "Past Missions",
                text: "This is the second text",
                id: 2
            },
            {
                title: "Drones",
                text: "This is the third text",
                id: 3
            },
            {
                title: "Team Members",
                test: "This is the fourth text",
                id: 4
            }
        ],


    }
  },
  methods: {
    goToMission(mission) {
      router.push('map?id='+mission);
    },
    mouseOver() {
      document.body.style.cursor= 'pointer';
    },
    mouseOut() {
      document.body.style.cursor= 'default';
    }
  },
  mounted() {
    this.get_missions(
      response => {
        if (response.status == 200) {
          this.userMissions = response.data;
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
