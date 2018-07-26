import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import parkingsPage from './views/ParkingsPage.vue'
import ParkingDetail from './views/ParkingDetails.vue'
import signUpPage from './views/SignUpPage.vue'
import ReserveParking from './views/ReserveParking.vue'
import MyParkings from './views/MyParkings.vue'
import LoginPage from './views/LoginPage.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/parking',
      name: 'parking-page',
      component: parkingsPage
    },
    {
      path: '/parking/:id',
      name: 'parking-details',
      component: ParkingDetail
    },
    {
      path: '/signUp',
      name: 'sign-up',
      component: signUpPage
    },
    {
      path: '/reserve/:id',
      name: 'reserve-parking',
      component: ReserveParking
    },
    {
      path: '/user/:userId',
      name: 'my-parkings',
      component: MyParkings
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
})
