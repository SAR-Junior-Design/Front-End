<template>
  <v-content class="background">
    <section fill-height>
      <v-container style="margin-top:10%;">
        <!-- First Row on the Main Login Page with SignUp & Login Dialogs -->
        <v-layout row>
          <v-layout column>
            <v-flex style="margin-top:45%">
              <v-flex class="text-xs-left" style="color:#dadfe8">
                <span style="font-size:30px;color:#dadfe8;">Plan. Your. Mission.</span>
              </v-flex>
              <v-flex class="text-xs-left" style="color:#dadfe8">
                <span style="font-size:20px;color:#dadfe8;">Seemless, mission management.</span>
              </v-flex>
            </v-flex>
          </v-layout>
          <v-layout column style="float:right">
            <v-flex ma-1>
              <v-card style="background-color:#dadfe8;">
                <form @submit.prevent="userLogin"  @success="onLogin">
                  <v-card-title>
                    <v-flex class="text-xs-center" style="margin-top:0px;">
                      <h2> Login </h2>
                    </v-flex>
                  </v-card-title>
                  <v-card-text>
                    <v-layout column>
                      <v-flex>
                        <v-text-field
                          name="loginEmail"
                          label="Username"
                          id="loginEmail"
                          type="username"
                          v-model="loginEmail"
                          required></v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-text-field
                          name="loginPassword"
                          label="Password"
                          id="loginPassword"
                          type="password"
                          v-model="loginPassword"
                          required></v-text-field>
                      </v-flex>
                      <v-flex id="warning" class="text-xs-center" style="visibility:hidden;color:#ff0000;">
                        <p> Member does not exist </p>
                      </v-flex>
                      <v-flex class="text-xs-center">
                        <v-btn v-on:click="userLogin" style="background-color:#1d561a;color:#ffffff">Login</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </form>
              </v-card>
            </v-flex>
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
import API from '../mixins/API.js'

Vue.use(VueAxios, axios)

export default {
  name: 'Login',
  mixins: [API],
  data () {
    return {
      signUpUsername: '',
      signUpEmail: '',
      signUpPassword: '',
      loginEmail: '',
      loginPassword: '',
      passwordConfirm: '',
      loginDialog: false,
      signUpDialog: false
    }
  },
  methods: {
    userLogin() {
      this.login(this.loginEmail, this.loginPassword,
        response => {
          if (response.data['code'] == 200) {
            this.loginDialog = true;
            this.signUpDialog = false;
            this.$emit('login')
            router.push('/homepage')
          } else if (response.data['code'] == 31) {
            throw error
          }
        },
        error => {
          alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
        })
    },
    onLogin() {
      router.push('/homepage')
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
