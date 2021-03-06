import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue';
import Quiz from './components/quiz.vue';
import Result from './components/result.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz
    },
    {
      path: '/result',
      name: 'result',
      component: Result
    }
  ]
})
