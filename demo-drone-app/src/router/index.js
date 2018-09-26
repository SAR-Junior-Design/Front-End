import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import API from '@/mixins/API'


const routerOptions = [
  { path: '/', view: 'LandingPage',
    meta: { mustBeLoggedOut: true} },
  { path: '/login', view: 'LoginPage',
    meta: { mustBeLoggedOut: true} },
  { path: '/map', view: 'FlightDetailsPage' },
  { path: '/newflight', view: 'NewFlightPage' },
  { path: '/settings', view: 'SettingsPage'},
  { path: '/homepage', view: 'HomePage'},
  { path: '/drones', view: 'DronesPage'},
  { path: '/flights', view: 'FlightsPage'},
  { path: '/education', view: 'EducationPage'},
  { path: '/dashboard', view: 'OfficialDashboardPage'}
]

const routes = routerOptions.map(route => {
  return {
    path: route.path,
    component: () => import(`@/views/${route.view}/${route.view}.vue`),
    meta: route.meta
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach(async (to, from, next) => {
  if(to.meta.mustBeLoggedOut) {
    const access_token = window.localStorage.getItem('access_token')
    var api_data = API.data()
    var url = api_data.base_url + '/user/is_logged_in/'
    const response = await axios.get(url, {
      headers: {'Authorization': 'Bearer ' + access_token}
    });
    if (JSON.stringify(response.data) == 'true') {
      next('/homepage')
    }
  }

  next()
})

export default router;
