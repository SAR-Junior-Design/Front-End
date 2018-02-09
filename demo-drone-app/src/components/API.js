//API JAVASCRIPT MIXIN

// define a mixin object
export const API = {
  data () {
  	return {
  		guy: '5',
  		base_url: 'http://backend.searchandrescuedrones.us:500'
  	}
  },
  methods: {
 	  hello() {
  	  alert('bye!');
    },
    login(email, password, response, error) {
    	alert('login!');
    	// var body = {'email': email, 'password': password}
     //  var url = this.base_url + '/login'
     //  axios.post(url,body, {withCredentials:true})
     //    .then(response)
     //    .catch(error);
    },
    guy(email, password) {
    	alert(' guy!')
    }
  }
}