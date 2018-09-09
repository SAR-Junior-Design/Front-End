<template>
  <v-layout column>
		<v-flex>
			<h1 class="rowHeader"> PAST MISSIONS </h1>
		</v-flex>
		<v-layout row
        style="
        margin-left:25px;
        margin-top:15px;
        ">
			<v-flex
      v-model="missions" 
      v-for="mission in missions" 
		  :key="mission.id" >
				<mission-card
        />
			</v-flex>
		</v-layout>
	</v-layout>
</template>

<style>

</style>

<script>
import API from '@/mixins/API.js'
import router from '@/router'
import mapThumbnail from '@/components/mapThumbnail.vue'
import MissionCard from './MissionCard'

export default {
	mixins: [API],
	props: ['missions'],
  components: {
    'mapTemplate': mapThumbnail,
    'mission-card': MissionCard
  },
	data() {
		return {
		}
	},
	methods: {
    
	}
}
</script>
