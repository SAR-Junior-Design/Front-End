<template>
	<v-card style="padding:15px;">
		<v-flex style="border-bottom-style: solid;border-width: 1px;margin-bottom:20px;">
			<span style="margin-left:5px;font-size:30px;"> PROFILE </span>
		</v-flex>
		<v-layout row>
			<v-layout column>
				<form>
					<v-flex>
						<v-text-field
              name="signUpUsername"
              label="Name"
              id="signUpUsername"
              type="username"
              v-model="user_info.name"
              required></v-text-field>
            <v-text-field
              name="signUpUsername"
              label="Name"
              id="signUpUsername"
              type="username"
              v-model="user_info.email"
              required></v-text-field>
					</v-flex>
					<v-flex>
						<v-btn flat outline>
							Save
						</v-btn>
					</v-flex>
				</form>
			</v-layout>
			<v-layout column>
				<v-flex class="text-xs-center">
					<span style="font-size:20px;"> Profile Picture </span>
				</v-flex>
				<v-flex class="text-xs-center">
					<img :src="profile_info.image" :width="size" :height="size"/>
				</v-flex>
			</v-layout>
		</v-layout>
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
					{ type: 'part_107', location: 'https://drive.google.com/file/d/1j8jXiXbI05VogHVKivfavdZgbaD0yrwP/view?usp=sharing'},
					{ type: 'part_333', location: 'https://drive.google.com/file/d/1j8jXiXbI05VogHVKivfavdZgbaD0yrwP/view?usp=sharing'}
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