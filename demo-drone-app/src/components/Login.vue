<template>
  <v-content class="background">
    <section fill-height>
      <v-container text-xs-center>
        <v-layout row>
          <v-layout column style="margin-top:50%;">
            <v-flex class="text-xs-left" fluid style="color:#dadfe8">
              <h1 style="font-size:30px;"> Search And Rescue Revamped </h1>
              <h3 class="px-0">Leave no one lost.</h3>
            </v-flex>
          </v-layout>
          <v-layout column>
            <v-flex>
              <v-card style="background-color:#dadfe8; margin-top:20%;">
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
                        <v-btn style="background-color:#1d561a;color:#ffffff" type="submit">Sign Up</v-btn>
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