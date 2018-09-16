<template>
  <v-card flat>
    <v-card-text>
      <b>Commander ID:</b> {{this.created_by}}<br/>
      <b>FAA Registration Number:</b> {{this.commander.faa_registration_number}} <br/>
      <b>Remote Pilot Certificate Number: </b> {{this.commander.remote_pilot_certificate_number}}<br/>
      <b>Mobile Phone Number:</b> {{this.commander.mobile_phone_number}}<br/>
    </v-card-text>
  </v-card>
</template>

<script>
  import API from '@/mixins/API'
  export default {
    mixins: [API],
    props: ['created_by'],
    data () {
      return {
        commander: {}
      }
    },
    methods: {
      
    },
    async mounted() {
      const response = await this.get_pilot_info(
        this.$store.state.access_token,
        this.created_by
      );
      this.commander = response.data
    }
  }
</script>