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
  		base_url: 'http://backend.searchandrescuedrones.us:5000'
  	}
  },
  methods: {
    //USER API CALLS
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
    list_all_users(success, failure) {
      var url = this.base_url + '/list_all_users'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    //DRONE API CALLS
    get_user_drones(success, failure){
      var url = this.base_url + '/get_user_drones'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    register_drone(drone, success, failure) {
      var url = this.base_url + '/register_drone'
      axios.post(url,drone, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    delete_drone(drone_id, success, failure) {
      var body = {'id': drone_id}
      var url = this.base_url + '/delete_drone'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    //MISSION API CALLS
    register_mission(title, area, description, success, failure) {
      var body = {'email': email, 'password': password, 'name': name, 'account_type': "operator"}
      var url = this.base_url + '/register_mission'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    get_mission_drones(mission_id, success, failure) {
      var body = {'mission_id': mission_id}
      var url = this.base_url + '/get_mission_drones'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    get_user_missions(success, failure){
      var url = this.base_url + '/get_user_missions'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    add_drone_to_mission(drone_id, mission_id, operator_id, success, failure) {
      var body = {'drone_id': drone_id, 'mission_id': mission_id, 'operator_id': operator_id}
      var url = this.base_url + '/add_drone_to_mission'
      axios.post(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    }
  }
}