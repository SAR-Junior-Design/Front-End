<template>
  <div>
    <v-text-field
      slot="activator"
      label="Datetime"
      v-model="datetime_formatted"
      readonly
      prepend-icon="event"
      @click="dialog = true"
    ></v-text-field>
    <v-dialog
      v-model="dialog"
      width="60vw"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Set Datetime
        </v-card-title>
        <v-layout row>
          <v-flex
          style="margin:2px;"
          >
            <v-date-picker
              ref="datepicker"
              v-model="date"
              color ="primary"
              :show-current="false"
            />
          </v-flex>
          <v-flex
          style="margin:2px;"
          >
            <v-time-picker
              ref="timepicker"
              v-model="time"
              color ="primary"
              :show-current="false"
            />
          </v-flex>
        </v-layout>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="update"
          >
            Update
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    props: ['datetime'],
    data() {
      return {
        dialog: false,
        date: '',
        time: '',
        datetime_formatted: ''
      }
    },
    methods: {
      update() {
        this.dialog = false
        console.log(`${this.date} ${this.time}`)
        this.datetime_formatted = moment(`${this.date} ${this.time}`, 'YYYY-MM-DD hh:mm a').format('MMMM Do YYYY, hh:mm a');
        console.log(this.datetime_formatted)
        this.$emit('input', this.datetime_formatted)
      },
    },
    mounted() {
      // this.date = moment(this.datetime).format('YYYY-MM-DD')
      // this.time = moment(this.datetime).format('HH:MM a')
      this.datetime_formatted = moment(this.datetime).format('MMMM Do YYYY, h:mm a');
    },
		filters: {
  		date_filter: function (date) {
    		return moment(date).format('MMMM Do, YYYY');
			},
			datetime_filter: function (date) {
    		return moment(date).format('MMMM Do YYYY, h:mm a');
			}
		}
  }
</script>