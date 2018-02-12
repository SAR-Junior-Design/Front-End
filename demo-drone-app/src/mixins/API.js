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
  		guy: '5',
  		base_url: 'http://backend.searchandrescuedrones.us:5000'
  	}
  },
  methods: {
 	  hello() {
  	  alert('bye!');
    },
    isLoggedIn(success, failure) {
    	var url = this.base_url + '/isLoggedIn'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    login(email, password, success, failure) {
    	var body = {'email': email, 'password': password}
      var url = this.base_url + '/login'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    logoff(success, failure) {
    	var url = this.base_url + '/logoff'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    register_user(email, password, name, success, failure) {
      var body = {'email': email, 'password': password, 'name': name, 'account_type': "operator"}
      var url = this.base_url + '/login'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    get_user_drones(success, failure){
      var url = this.base_url + '/get_user_drones'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    get_user_missions(success, failure){
      var url = this.base_url + '/get_user_missions'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    }
  }
}