//API JAVASCRIPT MIXIN

// define a mixin object
export default {
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
  		guy: '5'
  	}
  },
  methods: {
 	  hello() {
  	  alert('hello!')
    }
  }
}