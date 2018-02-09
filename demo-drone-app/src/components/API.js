//API JAVASCRIPT MIXIN

// define a mixin object
export const API = {
  props:{
     maxHeight:{
        type:Number,
        required:false
     }
  },
  mounted(){
     let maxHeight = this.maxHeight;
     if(maxHeight){
        this.$el.style.maxHeight = maxHeight + 'px';
     }
  },
  data () {
  	return {
  		guy: '5',
  		base_url: 'http://backend.searchandrescuedrones.us'
  	}
  },
  methods: {
 	  hello() {
  	  alert('hello!')
    },
    login(email, password) {
    	var body = {'email': email, 'password': password}
      var url = this.base_url + ':5000/login'
      axios.post(url,body, {withCredentials:true})
        .then((response) => {
          if (response.data['code'] == 200) {
            alert('yeah!!')
            router.push('/homepage')
            this.$emit('login')
          } else if (response.data['code'] == 31) {
            throw error
          }
        })
        .catch(error => {
          alert('Hmmm something went wrong with our servers when fetching stations!! Sorry!')
      });
    }
  }
}