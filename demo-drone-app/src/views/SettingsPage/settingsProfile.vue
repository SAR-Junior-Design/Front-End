<template>
	<v-card style="padding:15px;">
		<v-flex style="margin-bottom:20px;">
			<span style="margin-left:0px;font-size:30px;"> PROFILE </span>
		</v-flex>
		<v-layout row>
			<v-layout column>
				<form>
					<v-flex>
						<v-text-field
              name="name"
              label="Name"
              id="name"
              type="username"
              v-model="user_info.user.username"
              required></v-text-field>
            <v-text-field
              name="email"
              label="Email"
              id="email"
              type="email"
              v-model="user_info.user.email"
              required></v-text-field>
					</v-flex>
					<v-layout row>
						<v-flex class="text-xs-center">
							<v-btn flat outline @click="save_profile_changes()">
								Save
							</v-btn>
						</v-flex>
					</v-layout>
				</form>
			</v-layout>
			<v-layout column v-if="false">
				<v-flex class="text-xs-center">
					<span style="font-size:20px;"> Profile Picture </span>
				</v-flex>
				<v-flex class="text-xs-center">
					<v-badge overlap>
      					<v-btn
			              	color="primary"
			              	dark
			              	small
			              	absolute
			              	fab
			              	slot="badge"
			              	@click='pickFile'
			            >
			              <v-icon>file_upload</v-icon>
			            </v-btn>
      					<v-avatar
	          				:size="size"
	          				>
	          				<img :src="profile_info.image" :width="size" :height="size"/>
						</v-avatar>
						<input
							type="file"
							style="display: none"
							id="myBtn"
							@change="onFilePicked"
							accept="image/*"
						>
	    			</v-badge>
				</v-flex>
			</v-layout>
		</v-layout>
	</v-card>
</template>

<style>

</style>

<script>
import API from '@/mixins/API.js'

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
		pickFile () {
        	document.getElementById("myBtn").click();
        },
        onFilePicked (e) {
        	const files = e.target.files;
        	if(files[0] !== undefined) {
          		var name = files[0].name;
          		if(name.lastIndexOf('.') <= 0) {
            		return;
          		}
          		const fr = new FileReader ();
          		fr.readAsDataURL(files[0]);
          		fr.addEventListener('load', () => {
            		this.profile_info.image = fr.result;
          		})
        	} else {
        		return;
        	}
      	},
		async save_profile_changes() {
			var info = {'username': this.user_info.user.username, 'email': this.user_info.user.email}
			try {
				const response = await this.update_user_info(info,
					this.$store.state.access_token
				);
				if (response.status == 200) {
					this.$emit('snackbar',6000, 'Profile Updated');
				} else if (response.status == 31) {
					throw error
				}
			} catch (err) {
          		this.$emit('snackbar', 6000, 'Username already taken!')
			}
		}
	}
}
</script>