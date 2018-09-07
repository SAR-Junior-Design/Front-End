<template>
	<v-container style="margin-top:70px;">
		<v-layout row>
			<v-layout column style="margin-right:20px;min-width: 200px;">
				<v-card>
					<v-list style="background-color:#fafafa">
						<v-list-tile>
							<h4> Personal Settings </h4>
						</v-list-tile>
		          <v-list-tile 
		          	style="background-color:#ffffff" 
		          	v-model="current_item" 
		          	v-for="item in items" 
		          	:key="item.title" 
		          	@click="current_item = item">
		            <v-list-tile-title 
		            	v-if="current_item.title==item.title"
		            	style="font-weight:bold;">{{ item.title }}</v-list-tile-title>
		            <v-list-tile-title v-if="current_item.title!=item.title">{{ item.title }}</v-list-tile-title>
		          </v-list-tile>
		        </v-list>
		      </v-card>
			</v-layout>
			<v-layout column>
				<component :user_info="user_info" :is="current_item.component" @snackbar="snackbar"></component>
			</v-layout>
		</v-layout>
	</v-container>
</template>

<style>

</style>

<script>
	import API from '@/mixins/API.js'
	import SettingsProfile from './settingsProfile.vue'
	import SettingsLicenses from './settingsLicenses.vue'
	import SettingsContact from './settingsContact.vue'

	export default {
		mixins: [API],
		components: {
		    'settings-profile': SettingsProfile,
		    'settings-licenses': SettingsLicenses,
		    'settings-contact': SettingsContact
	  },
		data() {
			return {
				size:'150px',
				items: [
					{'title': 'Profile', 'color': 'black', 'component': 'settings-profile'},
					{'title': 'Licenses', 'color': 'black', 'component': 'settings-licenses'},
					{'title': 'Contact', 'color': 'black', 'component': 'settings-contact'}
				],
				current_item: {},
				profile_info: {
					image: 'https://avatars0.githubusercontent.com/u/8029035?s=400&v=4',
					documents: [
						{ type: 'part_107', location: 'https://drive.google.com/file/d/1j8jXiXbI05VogHVKivfavdZgbaD0yrwP/view?usp=sharing'},
						{ type: 'part_333', location: 'https://drive.google.com/file/d/1j8jXiXbI05VogHVKivfavdZgbaD0yrwP/view?usp=sharing'}
					]
				},
				user_info: {}
			}
		},
		methods: {
			async _get_user_info() {
				const response = await this.get_user_info(
					this.$store.state.access_token
				);
				console.log(response.data)
				this.user_info = response.data
			},
			on_nav_click(item) {
				this.current_item = this.item
			},
			snackbar(timeout, text) {
				this.$emit('snackbar',timeout, text);
			}
		},
		async mounted() {
			await this._get_user_info()
			this.current_item = this.items[0]
		}
	}
</script>