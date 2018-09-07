<template>
  <v-content>
    <section>
      <video-bg :sources="['static/drone_landing_page.mp4']">
        <v-layout row wrap 
        style="margin-top:15vh;margin-bottom:10%;"
        mx-5
        >
          <v-layout column style="margin-top:25vh">
            <v-flex mt-2>
              <v-flex class="text-xs-center" style="color:#ffffff">
                <span style="font-size:30px;color:#ffffff;">Campus Drone Management.</span><br/>
                <span style="font-size:20px;color:#ffffff;">An intuitive drone  policy toolkit.</span>
              </v-flex>
            </v-flex>
          </v-layout>
          <v-spacer/>
          <v-flex>
            <reg-step
            v-on:snackbar="_snackbar"
            />
          </v-flex>
        </v-layout>
      </video-bg>
    </section>

    <first-section/>
  </v-content>
</template>

<style>
</style>

<script>
import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VideoBg from 'vue-videobg'
import RegistrationStepper from './RegistrationStepper'
import FirstSection from './FirstSection'

Vue.use(VueAxios, axios)

export default {
  name: 'Login',
  components: {
    'video-bg': VideoBg,
    'reg-step': RegistrationStepper,
    'first-section': FirstSection
  },
  methods: {
    handleScroll(event){
      if (window.scrollY > 350) {
        this.$emit('change-toolbar-color', 'primary')
      } else {
        this.$emit('change-toolbar-color', 'transparent')
      }
    },
    _snackbar(timeout, text) {
      this.$emit('snackbar', timeout, text)
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  mounted() {
    this.$emit('change-toolbar-color', 'transparent')
  }
}
</script>
