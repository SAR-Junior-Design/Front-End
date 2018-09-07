//API JAVASCRIPT MIXIN

// define a mixin object
import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs';

Vue.use(VueAxios, axios)

export default {
  data () {
  	return {
      base_url: 'https://devapi.icarusmap.com',
      client_id: '7Ax4cZd34x6lwGw24eJhSPEw2Ia7rLwSW74nldoG',
      client_secret: 'ybWAUwOiNyTrgB0IUicVmY0Ogyu4lackx6YSg8gU0Kq9rwvjtjutGbx3FdeneXi4iKDd1M1Pev9KC9EKqAdmQvAaN2FZQstynolzpY2evEMJ3gI3JtrPSOv39SG0dg6D'
      //base_url: 'http://localhost:8000'
  	}
  },
  methods: {
    //USER API CALLS
    async isLoggedIn(token) {
    	var url = this.base_url + '/user/is_logged_in/'
      return await axios.get(url, {
        headers: {'Authorization': 'Bearer ' + token}
      });
    },
    async is_government_official(token) {
      var url = this.base_url + '/official/is_government_official/'
      return await axios.get(url, {
        headers: {'Authorization': 'Bearer ' + token}
      });
    },
    async login(username, password) {
    	var body = {'username': username, 'password': password}
      var url = this.base_url + '/o/token/'
      var data = { 'grant_type': 'password',
        client_id: this.client_id,
        client_secret: this.client_secret,
        username,
        password
      };
      data = qs.stringify(data)
      return await axios(
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data,
          url
        }
      );
    },
    async logout(token) {
      var url = this.base_url + '/o/revoke_token/'
      var data = { 'grant_type': 'password',
        client_id: this.client_id,
        client_secret: this.client_secret,
        token
      };
      data = qs.stringify(data)
      return await axios(
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data,
          url
        }
      );
    },
    async register_pilot(email, password, username,
      faa_registration_number, mobile_phone_number,
      remote_pilot_certificate_number) {
      var body = {email, password, username,
        faa_registration_number, mobile_phone_number,
        remote_pilot_certificate_number}
      var url = this.base_url + '/pilot/register/'
      return await axios.post(url,body);
    },
    async get_user_info(token) {
      var url = this.base_url + '/user/get/'
      return await axios.get(url, {
        headers: {'Authorization': 'Bearer ' + token}
      });
    },
    update_user_info(user_info, success, failure) {
      var url = this.base_url + '/v1_0/update_user_info/'
      axios.post(url,user_info, {withCredentials:true})
        .then(success)
        .catch(failure);
    },

    //DRONE API CALLS
    async get_user_drones(token){
      var url = this.base_url + '/drone/get_user_drones/'
      return await axios.get(url, {
          headers: {'Authorization': 'Bearer ' + token}
        });
    },
    async register_drone(description, manufacturer, type, color, number_of_blades, token) {
      var url = this.base_url + '/drone/register_drone/'
      var body = {'description': description,
              "manufacturer": manufacturer,
              "type": type,
              "color": color,
              "number_of_blades": number_of_blades}
      return await axios.post(url,body, {
          headers: {'Authorization': 'Bearer ' + token}
        });
    },
    async delete_drone(drone_array, token) {
      var url = this.base_url + '/drone/delete_drone/'
      return await axios.post(url,drone_array, {
        headers: {'Authorization': 'Bearer ' + token}
      });
    },

    //MISSION API CALLS
    async register_mission(title, area, description, starts_at, ends_at, type, token) {
      var body = {'title': title, 'area': area, 'description': description,
                  'starts_at': starts_at, 'ends_at': ends_at, 'type': type}
      var url = this.base_url + '/mission/register_mission/'
      return await axios.post(url,body,{
        headers: {'Authorization': 'Bearer ' + token}
      });
    },
    async get_mission_drones(mission_id, token) {
      var body = {'mission_id': mission_id}
      var url = this.base_url + '/mission/get_mission_drones/'
      return await axios.post(url,body, {
        headers: {'Authorization': 'Bearer ' + token}
      });
    },
    get_user_missions(success, failure){
      var url = this.base_url + '/mission/get_user_missions/'
      axios.get(url, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    async get_mission_info(mission_id, token){
      var body = {'mission_id': mission_id}
      var url = this.base_url + '/mission/get_mission_info/'
      return await axios.post(url, body, {
        headers: {'Authorization': 'Bearer ' + token}
      });
    },
    async add_drone_to_mission(drone_id, mission_id, operator_id, token) {
      var body = {'drone_id': drone_id, 'mission_id': mission_id, 'operator_id': operator_id}
      var url = this.base_url + '/mission/add_drone_to_mission/'
      return await axios.post(url,body, {
        headers: {'Authorization': 'Bearer ' + token}
      });
    },
    async get_missions(starts_at, ends_at, token){
      var body = {'starts_at': starts_at, 'ends_at': ends_at}
      var url = this.base_url + '/mission/get_missions/'
      return await axios.post(url,body, {
        headers: {'Authorization': 'Bearer ' + token}
      });
    },
    get_possible_mission_conflicts(starts_at, ends_at, success, failure){
      var body = {'starts_at': starts_at, 'ends_at': ends_at}
      var url = this.base_url + '/v1_0/get_possible_mission_conflicts/'
      axios.get(url,body, {withCredentials:true})
        .then(success)
        .catch(failure);
    },
    async delete_mission(mission_id, token) {
      var body = {'mission_id': mission_id}
      var url = this.base_url + '/mission/delete_missions/'
      return await axios.post(url,body, {
        headers: {'Authorization': 'Bearer ' + token}
      });
    },
    async get_current_missions(token){
      var url = this.base_url + '/mission/get_current_missions/'
      return await axios.get(url, {
        headers: {'Authorization': 'Bearer ' + token}
      });
    },
    async get_past_missions(token){
      var url = this.base_url + '/mission/get_past_missions/'
      return await axios.get(url, {
        headers: {'Authorization': 'Bearer ' + token}
      });
    },
    async get_upcoming_missions(token){
      var url = this.base_url + '/mission/get_upcoming_missions/'
      return await axios.get(url, {
        headers: {'Authorization': 'Bearer '+token}
      });
    },
    // Details must be a dictionary with any combination
    // of 'area', 'description', 'title', 'type', 'starts_at', 'ends_at'. If you don't
    // want to change a value, don't put it in the
    // dictionary, just leave it out. Ex.:
    // to change area, and title and type and starts_at:
    // {
    //   'area': <area description>,
    //   'title': 'New Title'
    //   'type': 'Commercial',
    //   'starts_at': <datetime>
    // }
    // to change title and description and ends_at:
    // {
    //   'title': 'New Title',
    //   'description': 'New description.',
    //   'ends_at': <datetime>
    // }
    async edit_mission_details(details, token) {
      var url = this.base_url + '/mission/edit_mission_details/'
      return await axios.post(url,details, {
        headers: {'Authorization': 'Bearer '+token}
      });
    },
    async edit_clearance(mission_id,new_clearance_state, message, token) {
      var url = this.base_url + '/mission/edit_clearance/'
      var body = {'mission_id' : mission_id, 'state': new_clearance_state,
                  'message': message}
      return await axios.post(url,body, {
        headers: {'Authorization': 'Bearer '+token}
      });
    }
  }
}
