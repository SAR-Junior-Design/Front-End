<template>
	<v-card>
		<v-card-title>
			<v-layout column>
				<v-flex>
					<span style="font-size:30px;"> Licenses </span>
				</v-flex>
				<v-layout column>
					<v-flex class="text-xs-left">
						This portion is currently under construction! We are working hard to get a license file storage system working.
					</v-flex>
					<v-layout row
						v-for="doc in profile_info.documents"
						:key = "profile_info.type"
						>
						<v-flex style="margin-top:12px;">
							<h3 v-if="doc.location != 'null'"> 
								<a target="_blank" :href="doc.location"> {{doc.type}} </a>
							</h3>
							<h3 v-if="doc.location == 'null'"> 
								{{doc.type}}
							</h3>
						</v-flex>
						<v-flex class="text-xs-right">
							<v-btn outline>
								<span v-if="doc.part_107 != 'null'"> EDIT </span>
								<span v-if="doc.part_107 == 'null'"> ADD </span>
							</v-btn>
						</v-flex>
					</v-layout>
				</v-layout>
			</v-layout>
		</v-card-title>
	</v-card>
</template>

<style>

</style>

<script>
import API from '../../mixins/API.js'

export default {
	mixins: [API],
	props: ['user_info'],
	data() {
		return {
			size:'150px',
			items: [
				{'title': 'Profile'},
				{'title': 'Licenses'},
				{'title': 'Delete'}
			],
			profile_info: {
				image: 'https://avatars0.githubusercontent.com/u/8029035?s=400&v=4',
				documents: [
					{ type: 'Part 107', location: 'https://drive.google.com/file/d/1j8jXiXbI05VogHVKivfavdZgbaD0yrwP/view?usp=sharing'},
					{ type: 'Part 333', location: 'https://drive.google.com/file/d/1j8jXiXbI05VogHVKivfavdZgbaD0yrwP/view?usp=sharing'}
				]
			}
		}
	},
	methods: {
	},
	mounted() {
	}
}
</script>