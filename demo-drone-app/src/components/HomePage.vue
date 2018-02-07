<template>
  <v-content class="background">
    <section fill-height>
      <v-container text-xs-center style="margin-top:5%;">
        <v-layout row justify-center>
          <v-flex xs12 class="text-xs-center" ma-1>
            <v-card style="background-color:#dadfe8;">
              <v-card-title>
                <v-flex class="text-xs-left" style="margin-top:0px;">
                  <h2> Active Missions </h2>
                </v-flex>
              </v-card-title>
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
        <v-layout row justify-center>
          <v-flex xs12 class="text-xs-center" ma-1>
            <v-card style="background-color:#dadfe8;">
              <v-card-title>
                <v-flex class="text-xs-left" style="margin-top:0px;">
                  <h2> Past Missions </h2>
                </v-flex>
              </v-card-title>
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
        <v-layout row justify-center>
          <v-flex xs12 class="text-xs-center" ma-1>
            <v-card style="background-color:#dadfe8;">
              <v-card-title>
                <v-flex class="text-xs-left" style="margin-top:0px;">
                  <h2> Drones Online </h2>
                </v-flex>
              </v-card-title>
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
        <v-layout row justify-center>
          <v-flex xs12 class="text-xs-center" ma-1>
            <v-card style="background-color:#dadfe8;">
              <v-card-title>
                <v-flex class="text-xs-left" style="margin-top:0px;">
                  <h2> Team Mememers </h2>
                </v-flex>
              </v-card-title>
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
export default {}
</script>
