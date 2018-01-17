<template>
  <v-content style="margin-top:80px;">
    <section fill-height>
      <v-container text-xs-center>
        <v-layout row>
          <v-layout column>
            <v-flex class="text-xs-left" fluid style="margin-top:160px;">
              <h1 style="font-size:30px;"> Drone Search and Rescue </h1>
              <h3 class="px-0">Leave no one lost.</h3>
            </v-flex>
          </v-layout>
          <v-layout column>
            <v-flex>
              <v-card>
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
                          name="username"
                          label="Username"
                          id="username"
                          type="username"
                          v-model="username"
                          required></v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-text-field
                          name="email"
                          label="Email"
                          id="email"
                          type="email"
                          v-model="email"
                          required></v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-text-field
                          name="password"
                          label="Password"
                          id="password"
                          type="password"
                          v-model="password"
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
                      <v-flex class="text-xs-center" mt-5>
                        <v-btn style="background-color:#253f87;color:#ffffff" type="submit">Sign Up</v-btn>
                      </v-flex>
                    </v-layout>
                  </form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-container>
    </section>
    <section style="background-color:#253f87">
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <v-flex xs12 sm4 class="my-3" style="color:white;margin-top:40px;">
          <div class="text-xs-center">
            <h2 class="headline">The best way to start developing</h2>
            <span class="subheading">
              Cras facilisis mi vitae nunc 
            </span>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent" style="color:white;">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Material Design</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent" style="color:white;">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Fast development</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent" style="color:white;">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Completely Open Sourced</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
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

<script>
export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    userSignUp() {
      if (this.comparePasswords !== true) {
        return
      }
      alert('signing up')
    }
  },
  computed: {
    comparePasswords () {
      return this.password === this.passwordConfirm ? true : 'Passwords don\'t match'
    }
}
}
</script>