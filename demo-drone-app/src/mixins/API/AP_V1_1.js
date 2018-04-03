//API JAVASCRIPT MIXIN

// define a mixin object
import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router'

Vue.use(VueAxios, axios)

export default {
  data () {
  	return {
  		base_url: 'http://backend.searchandrescuedrones.us/v1_1'
      //base_url: 'http://localhost:5000'
  	}
  },
  methods: {
    //USER API CALLS

    //DRONE API CALLS
    get_user_drones(success, failure){
      var url = this.base_url + '/api/v1/get_user_drones'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    register_drone(description, success, failure) {
      var url = this.base_url + '/register_drone'
      var body = {'description': description}
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    }

    //MISSION API CALLS
  }
}