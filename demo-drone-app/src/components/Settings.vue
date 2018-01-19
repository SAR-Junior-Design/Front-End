<template>
	<v-container style="margin-top:80px;">
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
							<h3> Email: {{profile_info.username}} </h3>
							<h3> Email: {{profile_info.email}} </h3>
							<v-btn outline flat style="color:#253f87;" type="submit">Change Password</v-btn>
						</v-flex>
					</v-card-text>
				</v-card>

				<v-card style="margin:20px;">
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
							<v-flex style="border-bottom-style: solid; border-width: 1px;">
								<span style="font-size:30px;"> Personal Details </span>
							</v-flex>
							<v-flex>
								<h3> Address: {{profile_info.address}} </h3>
								<h3> Date of Birth: {{profile_info.date_of_birth}} </h3>
								<v-btn outline flat style="color:#253f87;" type="submit">Change Password</v-btn>
							</v-flex>
						</v-card-title>
					</v-card>
					<v-card style="margin:20px;">
						<v-card-title>
							<v-flex style="border-bottom-style: solid; border-width: 1px;">
								<span style="font-size:30px;"> Preferences </span>
							</v-flex>
						</v-card-title>
					</v-card>
					<v-card style="margin:20px;">
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


<script>
export default {
	data() {
		return {
			size:'75px',
			profile_info: {
				date_of_birth: '1996-10-12',
				address: '5525 New Wellington Close',
				username: 'Sam Crane',
				email: 'samcrane8@gmail.com',
				image: 'https://avatars0.githubusercontent.com/u/8029035?s=400&v=4'
			}
		}
	}
}
</script>