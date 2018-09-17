<template>
  <v-card style="padding:15px;">
    <v-flex style="margin-bottom:20px;">
			<span style="margin-left:0px;font-size:30px;font-weight:200"> Official </span>
		</v-flex>
    <span
    style="font-size:20px;">
      Jurisdiction
    </span>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex
        class="text-xs-center">
          <map-thumbnail
          :mission="user_info.government_official"
          :width="400"
          :height="350"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  import mapThumbnail from '@/components/mapThumbnail.vue'

  export default {
    props: ['user_info'],
    components: {
      'map-thumbnail': mapThumbnail
    },
    mounted() {
      console.log(JSON.stringify(this.user_info))
    }
  }
</script>

<style>

</style>
