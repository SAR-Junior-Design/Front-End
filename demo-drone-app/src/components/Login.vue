<template>
  <v-content class="background">
    <section fill-height>
      <v-container text-xs-center>
        <v-layout row>
          <v-layout column style="margin-top:50%;">
            <v-flex class="text-xs-left" fluid style="color:#dadfe8">
              <span style="font-size:30px;color:#dadfe8;"> Search And Rescue Revamped </span>
            </v-flex>
            <v-flex class="text-xs-left" fluid style="color:#dadfe8">  
              <span style="font-size:20px;color:#dadfe8;">Leave no one lost.</span>
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
                      <v-flex class="text-xs-center" mt-3>
                        <v-btn @click.native="dialog = true" style="background-color:#1d561a;color:#ffffff">Already a Member?</v-btn>
                      </v-flex>
                    </v-layout>
                  </form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-layout>

                        <v-dialog v-model="dialog" max-width="500px">
                          <v-card>
                            <form @submit.prevent="userLogin">
                            <v-card-title>
                              <v-flex class="text-xs-center" style="margin-top:0px;">
                                <h2> Login </h2>
                              </v-flex>
                            </v-card-title>
                            <v-card-text>
                                <v-text-field
                                  name="username"
                                  label="Username"
                                  id="username"
                                  type="username"
                                  v-model="username2"
                                  required></v-text-field>
                                <v-text-field
                                  name="password"
                                  label="Password"
                                  id="password"
                                  type="password"
                                  v-model="password2"
                                  required></v-text-field>
                                <v-flex id="warning" class="text-xs-center" style="visibility:hidden;color:#ff0000;">
                                  <p> Member does not exist </p>
                                </v-flex>
                              </v-card-text>

                              <v-flex class="text-xs-center" mt-2>
                                <v-btn type="submit" style="background-color:#1d561a;color:#ffffff">Login</v-btn>
                              </v-flex>
                              <v-flex class="text-xs-center">
                                <v-btn style="background-color:#1d561a;color:#ffffff" @click.stop="dialog=false">Cancel</v-btn>
                              </v-flex>
                            </form>
                          </v-card>
                        </v-dialog>

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
      username2: '',
      email: '',
      password: '',
      password2: '',
      passwordConfirm: '',
      dialog: false,
    }
  },
  methods: {
    userSignUp() {
      if (this.comparePasswords !== true) {
        return
      }
      alert('signing up')
    },
    userLogin() {
      if (true) {
        document.getElementById("warning").style.visibility = "visible";
      }
    }
  },
  computed: {
    comparePasswords () {
      return this.password === this.passwordConfirm ? true : 'Passwords don\'t match'
    }
}
}
</script>