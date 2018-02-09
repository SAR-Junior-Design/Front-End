<template>
  <v-content class="background">
    <section fill-height>
      <v-container text-xs-center style="margin-top:15%;">
        <!-- First Row on the Main Login Page with SignUp & Login Dialogs -->
        <v-layout row justify-center>
          <!-- this is the sign up & login dialog buttons  -->
          <v-flex xs4 ma-1>
            <v-card style="background-color:#dadfe8;" max-width="500px">
              <v-card-text>
                <v-layout column>
                  <v-flex class="text-xs-center" ma-1>
                    <v-btn @click.native="signUpDialog = true" style="background-color:#1d561a;color:#ffffff">Sign Up</v-btn>
                  </v-flex>
                  <v-flex class="text-xs-center" ma-1>
                    <v-btn @click.native="loginDialog = true" style="background-color:#1d561a;color:#ffffff">Already a Member?</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <!-- this is the text -->
        <v-layout row justify-center style="margin-top:5%">
          <v-flex class="text-xs-center" fluid style="color:#dadfe8">
            <span style="font-size:30px;color:#dadfe8;"> Search And Rescue Revamped </span>
          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <v-flex class="text-xs-center" fluid style="color:#dadfe8">
            <span style="font-size:20px;color:#dadfe8;">Leave no one lost</span>
          </v-flex>
        </v-layout>

        <!-- Login Dialog -->
        <v-dialog v-model="loginDialog" max-width="500px">
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
                    <v-btn style="background-color:#1d561a;color:#ffffff" @click.stop="loginDialog=false">Cancel</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </form>
          </v-card>
        </v-dialog>
        <!-- End of Login Dialog -->

        <!-- Sign Up Dialog -->
        <v-dialog v-model="signUpDialog" max-width="500px">
          <v-card style="background-color:#dadfe8;">
            <v-card-title>
              <v-flex class="text-xs-center" style="margin-top:0px;">
                <h2> Get Started </h2>
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
                    <v-btn style="background-color:#1d561a;color:#ffffff" type="submit">Sign Up</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- End of Sign Up Dialog -->
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
    userSignUp() {
      if (this.comparePasswords !== true) {
        return
      }
      var body = {'email': this.signUpEmail, 'password': this.signUpPassword, 'name': this.signUpUsername, 'account_type': 'operator'}
      var url = "http://backend.searchandrescuedrones.us:5000/register_user"
      axios.post(url,body, {withCredentials:true})
        .then((response) => {
          if (response.data['code'] == 200) {
            alert('signing up')
            this.loginDialog = true;
            this.signUpDialog = false;
          } else if (response.data['code'] == 31) {
            throw error
          }
        })
        .catch(error => {
          alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
        });
    },
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
}
}
</script>
