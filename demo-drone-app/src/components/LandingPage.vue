<template>
  <v-content class="background">
    <section fill-height>
      <v-container style="margin-top:10%;">
        <!-- First Row on the Main Login Page with SignUp & Login Dialogs -->
        <v-layout row>
          <v-layout column>
            <v-flex mt-3>
              <v-flex class="text-xs-left" style="color:#dadfe8">
                <span style="font-size:30px;color:#dadfe8;">Plan. Your. Mission.</span>
              </v-flex>
              <v-flex class="text-xs-left" style="color:#dadfe8">
                <span style="font-size:20px;color:#dadfe8;">Seemless, mission management.</span>
              </v-flex>
            </v-flex>
          </v-layout>
            <v-layout column>
              <v-card style="background-color:#dadfe8;">
                <v-card-title>
                  <v-flex class="text-xs-left" style="margin-top:0px;">
                    <h2> Register </h2>
                  </v-flex>
                </v-card-title>
                <v-card-text>
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
                        <v-btn style="background-color:#1d561a;color:#ffffff" type="submit">Join</v-btn>
                      </v-flex>
                    </v-layout>
                  </form>
                </v-card-text>
              </v-card>
            </v-layout>
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
          if (response.data['code'] == 200) {
            alert('signing up')
            router.push('/homepage')
          } else if (response.data['code'] == 31) {
            throw error
          }
        },
        error => {
          alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
        })
    }
  },
  computed: {
    comparePasswords () {
      return this.signUpPassword === this.passwordConfirm ? true : 'Passwords don\'t match'
    }
  },
  mounted() {
    this.isLoggedIn(
      response => {
        if (response.data == 'True') {
          router.push('/homepage')
        }
      },
      error => {
        alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
      })
  }
}
</script>
