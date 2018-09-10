import Vue from 'vue'
import Router from 'vue-router'

const routerOptions = [
  { path: '/', view: 'LandingPage' },
  { path: '/login', view: 'LoginPage'},
  { path: '/map', view: 'FlightDetailsPage' },
  { path: '/newflight', view: 'NewFlightPage' },
  { path: '/settings', view: 'SettingsPage'},
  { path: '/homepage', view: 'HomePage'},
  { path: '/drones', view: 'DronesPage'},
  { path: '/flights', view: 'FlightsPage'},
  { path: '/education', view: 'EducationPage'}
]

const routes = routerOptions.map(route => {
  return {
    path: route.path,
    component: () => import(`@/views/${route.view}/${route.view}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

export default router;
