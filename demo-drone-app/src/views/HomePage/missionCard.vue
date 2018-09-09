<template>
  <div
	class="mission-card"
	width=250px>
	hello
	</div>
</template>

<style>
	.mission-card {
		width:250px;
		height:250px;
		background-color:blueviolet;
	}
</style>

<script>
import API from '@/mixins/API.js'
import router from '@/router'
import mapThumbnail from '@/components/mapThumbnail.vue'

export default {
	mixins: [API],
	props: ['mission'],
  components: {
    'map-thumbnail': mapThumbnail
  },
	data() {
		return {
		}
	},
	methods: {
    
	}
}
</script>
