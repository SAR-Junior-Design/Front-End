<template>
	<v-container style="margin-top:50px;">
		<v-layout row>
			<v-layout column>
				<v-card style="margin:20px;">
					<v-card-text>
						<v-flex style="border-bottom-style: solid; border-width: 1px;">
							<span style="font-size:30px;"> PROFILE </span>
						</v-flex>
						<v-layout row style="margin:20px;">
							<v-flex>
								<img :src="profile_info.image" :width="size" :height="size"/>
							</v-flex>
							<v-layout column>
								<v-flex class="text-xs-left">
									<span style="font-size:15px;"> Change Picture </span>
								</v-flex>
								<v-flex>
									<v-btn outline flat style="color:#253f87;" type="submit">Choose File</v-btn>
								</v-flex>
							</v-layout>
						</v-layout>
						<v-flex>
							<h3> Name: {{user_info.name}} </h3>
							<h3> Email: {{user_info.email}} </h3>
							<v-btn outline flat style="color:#253f87;" type="submit">Change Password</v-btn>
						</v-flex>
					</v-card-text>
				</v-card>

				<v-card style="margin:20px;" v-if="false">
					<v-card-title>
						<v-flex style="border-bottom-style: solid; border-width: 1px;">
							<span style="font-size:30px;"> ACCOUNT </span>
						</v-flex>
						<v-layout row style="margin:20px;">
							<v-flex>
								<h4> INSERT ACCOUNT INFORMATION </h4>
							</v-flex>
						</v-layout>
					</v-card-title>
				</v-card>

			</v-layout>
				<v-layout column style="margin-left:20px;">
					<v-card style="margin:20px;">
						<v-card-title>
							<v-layout column>
								<v-flex style="border-bottom-style: solid; border-width: 1px;">
									<span style="font-size:30px;"> Licenses </span>
								</v-flex>
								<v-layout row>
									<v-flex style="margin-top:12px;">
										<h3 v-if="profile_info.part_107 != 'null'"> <a :href="profile_info.part_107"> Part 107 </a>
										</h3>
										<h3 v-if="profile_info.part_107 == 'null'"> Part 107
										</h3>
									</v-flex>
									<v-flex>
										<v-btn outline>
											<span v-if="profile_info.part_107 != 'null'"> EDIT </span>
											<span v-if="profile_info.part_107 == 'null'"> ADD </span>
										</v-btn>
									</v-flex>
								</v-layout>
							</v-layout>
						</v-card-title>
					</v-card>

					<v-card style="margin:20px;" v-if="false">
						<v-card-title>
							<v-flex style="border-bottom-style: solid; border-width: 1px;">
								<span style="font-size:30px;"> Preferences </span>
							</v-flex>
						</v-card-title>
					</v-card>

					<v-card style="margin:20px;" v-if="false">
						<v-card-text>
							<v-flex style="border-bottom-style: solid; border-width: 1px;">
								<span style="font-size:30px;"> Security </span>
							</v-flex>
						</v-card-text>
					</v-card>
				</v-layout>
		</v-layout>
	</v-container>
</template>

<style>
</style>

<script>
import API from '../mixins/API.js'

export default {
	mixins: [API],
	data() {
		return {
			size:'75px',
			profile_info: {
				date_of_birth: '1996-10-12',
				address: '5525 New Wellington Close',
				username: 'Sam Crane',
				email: 'samcrane8@gmail.com',
				image: 'https://avatars0.githubusercontent.com/u/8029035?s=400&v=4',
				part_107: 'https://drive.google.com/file/d/1j8jXiXbI05VogHVKivfavdZgbaD0yrwP/view?usp=sharing',
				documents: [
					{ type: 'part_107', location: 'https://drive.google.com/file/d/1j8jXiXbI05VogHVKivfavdZgbaD0yrwP/view?usp=sharing'},
					{ type: 'part_333', location: 'https://drive.google.com/file/d/1j8jXiXbI05VogHVKivfavdZgbaD0yrwP/view?usp=sharing'}
				]
			},
			user_info: {}
		}
	},
	methods: {
		_get_user_info() {
			this.get_user_info(response => {
				this.user_info = response.data
			}, error => {
				alert ('Could not get user info!')
			});
		}
	},
	mounted() {
		this._get_user_info()
	}
}
</script>