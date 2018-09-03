<template>
  <v-content>
    <section>
      <video-bg :sources="['src/assets/doneVID.mp4']" style="height:600px;overflow:scroll">
        <v-container>
          <!-- First Row on the Main Login Page with SignUp & Login Dialogs -->
          <v-layout row wrap style="margin-top:10%;">
            <v-layout column style="margin-top:18%;">
              <v-flex mt-3>
                <v-flex class="text-xs-left">
                  <span style="font-size:30px;color:#dadfe8;">Campus Drone Management</span><br/>
                  <span style="font-size:20px;color:#ffffff;">An intuitive drone  policy toolkit.</span>
                </v-flex>
              </v-flex>
            </v-layout>
            <v-layout column style="float:right;margin-top:8%;">
              <v-flex ma-1>
                <v-card style="background-color:#ffffff;opacity:0.95">
                  <v-form 
                  @success="onLogin"
                  lazy-validation
                  v-model="valid" ref="form"
                  >
                    <v-card-title>
                      <v-flex class="text-xs-left" style="margin-top:0px;">
                        <h2> Login </h2>
                      </v-flex>
                    </v-card-title>
                    <v-card-text>
                      <v-layout column>
                        <v-flex>
                          <v-text-field
                            name="loginUsername"
                            label="Username"
                            id="loginUsername"
                            type="username"
                            v-model="loginUsername"
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
                          <v-btn v-on:click="userLogin" style="background-color:#1d561a;color:#1d561a"
                          flat
                          outline
                          >
                            Login
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-form>
                </v-card>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-container>
      </video-bg>
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
      loginUsername: '',
      loginPassword: '',
      passwordConfirm: '',
      loginDialog: false,
      signUpDialog: false,
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    userLogin() {
      if (this.$refs.form.validate()) {
        this.login(this.loginUsername, this.loginPassword,
          response => {
            if (response.status == 200) {
              this.loginDialog = true;
              this.signUpDialog = false;
              this.$emit('change-toolbar-color', 'primary')
              this.$emit('login')
              router.push('/homepage')
              console.log('logged in!!')
            }
          },
          error => {
            if (error.response.status == 400) {
              this.$emit('snackbar', 6000, error.response.data['message'])
            } else if (error.response.status == 500) {
              throw error
            }
          })
      } else {
        this.$emits('snackbar', 6000, 'Fill out login info.')
      }
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
          this.$emit('change-toolbar-color', 'primary')
          router.push('/homepage')
        } else {
          this.$emit('change-toolbar-color', 'transparent')
        }
      },
      error => {
        alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
      })
  }
}
</script>
