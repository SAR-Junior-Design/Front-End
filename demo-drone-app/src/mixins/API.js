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
    login(email, password, success, failure) {
    	var body = {'email': email, 'password': password}
      var url = this.base_url + '/login'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    logoff(success, failure) {
    	var url = this.base_url + '/logoff'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    }
  }
}