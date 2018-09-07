<template>
  <v-card style="margin:20px;">
    <v-card-title>
      <v-flex>
        <h3>
            FILTERS
        </h3>
      </v-flex>
    </v-card-title>
      <v-card-text>
        <v-flex>
          <v-layout row>
              <v-menu
                  ref="menuDate"
                  lazy
                  :close-on-content-click="false"
                  v-model="start_menu"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  min-width="290px"
                  >
                          <v-text-field
                              slot="activator"
                              label="Start Date"
                              v-model="start_date"
                              readonly
                              style="margin:2%;width:96%;"
                          ></v-text-field>
                          <v-card>
                              <v-card-title primary-title>
                                  <div>
                                      <v-date-picker
                                      ref="picker"
                                      color ="green darken-4"
                                      v-model="start_date"
                                      :min="new Date().toISOString().substr(0, 10)"
                                      :max="new Date().toISOString().substr(0, 10)"
                                  ></v-date-picker>
                                  </div>
                              </v-card-title>
                              <v-card-actions>
                                  <v-btn dark style="background-color:#1d561a" @click="start_menu = false">OK</v-btn>
                              </v-card-actions>
                          </v-card>
                      </v-menu>
                      <v-menu
                          ref="menuDate"
                          lazy
                          :close-on-content-click="false"
                          v-model="start_time_menu"
                          transition="scale-transition"
                          offset-y
                          full-width
                          :nudge-right="40"
                          min-width="290px"
                      >
                          <v-text-field
                              slot="activator"
                              label="Start Time"
                              v-model="start_time"
                              readonly
                              style="margin:2%;width:96%;"
                          ></v-text-field>
                          <v-card>
                              <v-card-title primary-title>
                                  <div>
                                      <v-time-picker
                                      ref="picker"
                                      color ="green darken-4"
                                      v-model="start_time"
                                      :min="new Date().toISOString().substr(0, 10)"
                                      :max="new Date().toISOString().substr(0, 10)"
                                  ></v-time-picker>
                                  </div>
                              </v-card-title>
                              <v-card-actions>
                                  <v-btn dark style="background-color:#1d561a" @click="start_time_menu = false">OK</v-btn>
                              </v-card-actions>
                          </v-card>
                  </v-menu>
          </v-layout>
        </v-flex>
          <v-flex>
            <v-layout row>
              <v-menu
                ref="menuDate"
                lazy
                :close-on-content-click="false"
                v-model="end_menu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                >
                  <v-text-field
                      slot="activator"
                          label="End Date"
                          v-model="end_date"
                          readonly
                          style="margin:2%;width:96%;"
                  />
                    <v-card>
                      <v-card-title primary-title>
                        <div>
                          <v-date-picker
                          ref="picker"
                          color ="green darken-4"
                          v-model="end_date"
                          :min="new Date().toISOString().substr(0, 10)"
                          :max="new Date().toISOString().substr(0, 10)"
                        ></v-date-picker>
                        </div>
                      </v-card-title>
                            <v-card-actions>
                                <v-btn dark style="background-color:#1d561a" @click="end_menu = false">OK</v-btn>
                            </v-card-actions>
                    </v-card>
                    </v-menu>
                    <v-menu
                        ref="menuDate"
                        lazy
                        :close-on-content-click="false"
                        v-model="end_time_menu"
                        transition="scale-transition"
                        offset-y
                        full-width
                        :nudge-right="40"
                        min-width="290px"
                    >
                        <v-text-field
                            slot="activator"
                                label="End Time"
                                v-model="end_time"
                                readonly
                                style="margin:2%;width:96%;"
                        ></v-text-field>
                        <v-card>
                                <v-card-title primary-title>
                                    <div>
                                            <v-time-picker
                                            ref="picker"
                                            color ="green darken-4"
                                            v-model="end_time"
                                            :min="new Date().toISOString().substr(0, 10)"
                                            :max="new Date().toISOString().substr(0, 10)"
                                    ></v-time-picker>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn dark style="background-color:#1d561a" @click="end_time_menu = false">OK</v-btn>
                                </v-card-actions>
                        </v-card>
                    </v-menu>
            </v-layout>
          <v-flex class="text-xs-center">
            <v-btn flat outline style="margin:10px;"
              @click="getMissions();">
              REFRESH
            </v-btn>
          </v-flex>
        </v-flex>
    </v-card-text>
  </v-card>
</template>


<script>
  export default {
    data() {
      return {
				start_date: "1999-01-01",
				start_menu: false,
				start_time: "00:00:00",
				start_time_menu: false,
				end_date: "2020-01-01",
				end_menu: false,
        end_time: "00:00:00",
				end_time_menu: false,
      }
    }
  }
</script>