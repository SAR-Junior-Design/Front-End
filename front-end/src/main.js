import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookie from 'vue-cookie'
import IdleVue from 'idle-vue'

const eventsHub = new Vue();
Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 6000000
});
Vue.use(VueCookie);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  onIdle: function() {
    if (this.$cookie.get('sessionID') != null) {
      this.$cookie.delete('sessionID');
      this.$router.push({ path: '/' });
    }
  },
  onActive: function() {
    console.log("active");
  }
})
