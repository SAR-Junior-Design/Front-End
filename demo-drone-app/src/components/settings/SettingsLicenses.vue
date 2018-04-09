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
									@change="onFilePicked"
									accept=".pdf"
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
								              	<pdf :src="pdfUrl" 
								              		v-if="pdfUrl!=null"
											      	:page=1 
											     	@num-pages="numPages = $event"
											     	style="width:400px">
											    </pdf>
								            </div>
								            <h4 style="text-align: center; color: red;" v-if="typeError"> Incorrect File Type. Make sure to upload a PDF </h4>
								          </div>
								        </v-card-title>
								        <v-card-actions>
								          <v-btn color="primary" flat @click='pickFile'>Upload</v-btn>
								          <v-btn color="primary" flat @click.stop="editFile=false" @click="saveFile(doc)">Save</v-btn>
								          <v-btn color="primary" flat @click.stop="editFile=false" @click="clearFile()">Cancel</v-btn>
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
import Vue from 'vue';
import pdf from 'vue-pdf'

Vue.component('pdf', pdf)

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
					{ type: 'Part 107', location: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf'},
					{ type: 'Part 333', location: 'https://www.gutenberg.org/files/1342/1342-pdf.pdf'}
				]
			},
			pdfUrl: null,
			pdfName: '',
    		pdfFile: '',
    		currFile: null,
    		editFile: false,

    		typeError: false
		}
	},
	methods: {
		pickFile () {
        	document.getElementById("myBtn").click();
        },
        saveFile(e) {
        	e.location = this.pdfUrl;
        	this.clearFile();
        	this.$emit('snackbar',6000, 'File Successfully Saved');
        },
        clearFile() {
      		this.pdfName = '';
      		this.pdfFile = '';
      		this.pdfUrl = '';
      		this.typeError = false;
      	},
        viewFile(e) {
        	this.currFile = e.type;
        	this.pdfUrl = e.location;
        	this.editFile=true;
        },
      	onFilePicked (e) {
        	const files = e.target.files;
        	if(files[0] !== undefined) {
          		this.pdfName = files[0].name;
          		if(this.pdfName.slice((this.pdfName.lastIndexOf(".") - 1 >>> 0) + 2)!="pdf") {
          			this.typeError = true;
          			return;
          		}
          		if(this.pdfName.lastIndexOf('.') <= 0) {
            		return;
          		}
          		const fr = new FileReader ();
          		fr.readAsDataURL(files[0]);
          		fr.addEventListener('load', () => {
            		this.pdfUrl = fr.result;
            		this.pdfFile = files[0];
          		})
          		this.typeError = false;
        	} else {
        		this.clearFile();
        	}
      	}
	},
	mounted() {
	}
}
</script>