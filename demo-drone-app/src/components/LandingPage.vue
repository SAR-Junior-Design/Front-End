<template>
  <v-content>
    <section>
      <video-bg :sources="['src/assets/doneVID.mp4']" style="height:610px;">
        <v-container>
          <!-- First Row on the Main Login Page with SignUp & Login Dialogs -->
          <v-layout row wrap style="margin-top:10%;margin-bottom:10%;">
            <v-layout column style="margin-top:18%;margin-bottom:10%">
              <v-flex mt-3>
                <v-flex class="text-xs-left" style="color:#ffffff">
                  <span style="font-size:30px;color:#ffffff;">Campus Drone Management.</span><br/>
                  <span style="font-size:20px;color:#ffffff;">An intuitive drone  policy toolkit.</span>
                </v-flex>
              </v-flex>
            </v-layout style="margin-bottom: 10%;">
              <v-layout column>
                <v-card style="background-color:#ffffff;opacity:0.95;">
                  <v-card-title>
                    <v-flex class="text-xs-left" style="margin-top:0px;">
                      <h2> Register </h2>
                    </v-flex>
                  </v-card-title>
                  <v-card-text style="opacity:1.0;">
                    <form @submit.prevent="userSignUp">
                      <v-layout column>
                        <v-flex>
                          <v-text-field
                            name="signUpUsername"
                            label="Username"
                            id="signUpUsername"
                            type="username"
                            v-model="signUpUsername"
                            required></v-text-field>
                        </v-flex>
                        <v-flex>
                          <v-text-field
                            name="signUpEmail"
                            label="Email"
                            id="signUpEmail"
                            type="email"
                            v-model="signUpEmail"
                            required></v-text-field>
                        </v-flex>
                        <v-flex>
                          <v-text-field
                            name="signUpPassword"
                            label="Password"
                            id="signUpPassword"
                            type="password"
                            v-model="signUpPassword"
                            required></v-text-field>
                        </v-flex>
                        <v-flex>
                          <v-text-field
                            name="confirmPassword"
                            label="Confirm Password"
                            id="confirmPassword"
                            v-model="passwordConfirm"
                            :rules="[comparePasswords]"
                            type="password"
                            ></v-text-field>
                        </v-flex>
                        <v-flex class="text-xs-center">
                          <v-btn style="background-color:#1d561a;color:#1d561a" type="submit"
                          flat
                          outline
                          >
                            Join
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </form>
                  </v-card-text>
                </v-card>
              </v-layout>
          </v-layout>
        </v-container>
      </video-bg>
    </section>



    <section style = "height:95vh;">
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center">
            <h2 class="headline" style="margin-bottom:5px;">Be ahead of the curve.</h2>
            <span class="subheading">
              Have a drone policy that fuels innovation.
            </span>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large color="primary">color_lens</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Intuitive Design</div>
                  </v-card-title>
                  <v-card-text>
                    To build a cohesive flight management software, it needed to be something that was equally useful for campus law enforcement and faculty, as well as for pilots. For that reason, building a beautiful, elegantly designed product was our top priority.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large color="primary">flash_on</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Fast setup</div>
                  </v-card-title>
                  <v-card-text>
                    Built by UAS operators, for UAS operators. This system is built with the user in mind to make sure that setup is as easy as possible and integrating into existing systems is seamless.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large color="primary">people</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Responsive Team</div>
                  </v-card-title>
                  <v-card-text>
                    Our team is working around the clock to make sure this system is running at 100%. Don't worry about setting up systems or managing databases, we just take care of everything in the cloud!
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
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
import VideoBg from 'vue-videobg'

Vue.component('video-bg', VideoBg)

Vue.use(VueAxios, axios)

export default {
  name: 'Login',
  mixins: [API],
  data () {
    return {
      signUpUsername: '',
      signUpEmail: '',
      signUpPassword: '',
      passwordConfirm: ''
    }
  },
  methods: {
    userSignUp() {
      if (this.comparePasswords !== true) {
        return
      }
      this.register_user(this.signUpEmail, this.signUpPassword, this.signUpUsername,
        (response) => {
          if (response.status == 200) {
            this.$emit('snackbar', 6000, 'Account registered.')
            router.push('/login')
          } 
        },
        error => {
          if (error.response.status == 400) {
            this.$emit('snackbar', 6000, error.response.data['message'])
          } else {
            throw error
          }
        })
    },
    handleScroll(event){
      if (window.scrollY > 350) {
        console.log('GOT SOMEWHERE')
        this.$emit('change-toolbar-color', 'primary')
      } else {
        this.$emit('change-toolbar-color', 'transparent')
      }
    }
  },
  computed: {
    comparePasswords () {
      return this.signUpPassword === this.passwordConfirm ? true : 'Passwords don\'t match'
    }
  },
  mounted() {
    this.$emit('change-toolbar-color', 'transparent')
    this.isLoggedIn(
      response => {
        if (response.data == 'True') {
          router.push('/homepage')
          alert('logged in!')
        }
      },
      error => {
        alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
      })
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>
