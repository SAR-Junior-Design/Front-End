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
							<v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
								<input
									type="file"
									style="display: none"
									id="myBtn"
									accept="image/*"
									@change="onFilePicked"
								>
								<v-btn outline @click='viewFile(doc)'>
									<span> EDIT </span>
								</v-btn>
								<v-dialog v-model="editFile" max-width="500px">
								    <v-card>
								        <v-card-title primary-title>
								          <div>
								            <h3 class="headline mb-0">{{currFile}} Upload</h3>
								            <div>
								              <img :src="imageUrl" height="150" v-if="imageUrl"/>
								            </div>
								          </div>
								        </v-card-title>
								        <v-card-actions>
								          <v-btn color="primary" flat @click='pickFile'>Upload</v-btn>
								          <v-btn color="primary" flat @click.stop="editFile=false">Save</v-btn>
								          <v-btn color="primary" flat @click.stop="editFile=false">Cancel</v-btn>
								        </v-card-actions>
								    </v-card>
								</v-dialog>
							</v-flex>
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
			},
			imageUrl: '',
			imageName: '',
    		imageFile: '',
    		currFile: null,
    		editFile: false
		}
	},
	methods: {
		pickFile () {
        	document.getElementById("myBtn").click();
        },
        viewFile(a) {
        	this.currFile = a.type;
        	this.imageUrl = a.location;
        	this.editFile=true;
        },
      	onFilePicked (e) {
        	const files = e.target.files
        	if(files[0] !== undefined) {
          	this.imageName = files[0].name
          	if(this.imageName.lastIndexOf('.') <= 0) {
            	return
          	}
          	const fr = new FileReader ()
          	fr.readAsDataURL(files[0])
          	fr.addEventListener('load', () => {
            	this.imageUrl = fr.result
            	this.imageFile = files[0] // this is an image file that can be sent to server...
          	})
        	} else {
          	this.imageName = ''
          	this.imageFile = ''
          	this.imageUrl = ''
        	}
      	}
	},
	mounted() {
	}
}
</script>