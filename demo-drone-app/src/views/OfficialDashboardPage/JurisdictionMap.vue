<template>
  <v-content>
    <v-flex
        class="text-xs-center">
          <map-thumbnail
          :mission="user_info.government_official"
          :width="400"
          :height="350"
          />
        </v-flex>
  </v-content>
</template>

<script>
  import mapThumbnail from '@/components/mapThumbnail.vue'

  export default {
    props: ['user_info'],
    components: {
      'map-thumbnail': mapThumbnail
    },
  }
</script>

<style>

</style>
