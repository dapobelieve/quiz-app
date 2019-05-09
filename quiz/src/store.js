import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData:{},
    answers: []
  },
  mutations: {
    setAppState(state) {
        let userData = localStorage.getItem('userData')
        let quiz = localStorage.getItem('quiz')
 
        if(typeof userData !== 'undefined') {
            state.userData = JSON.parse(userData)
        }

        if(typeof quiz !== 'undefined') {
            state.answers = JSON.parse(quiz)
        }
    },
    storeUserData(state, payLoad) {
        state.userData = payLoad
        localStorage.setItem('userData', JSON.stringify(payLoad))
    },
    commitQuiz(state, data) {
        state.answers = data
        localStorage.setItem('quiz', JSON.stringify(data))
    }
  },
  actions: {
    setAppState({commit}) {
        commit('setAppState')
    },
    registerUser({commit}, {payLoad, context, url}) {
        return axios.post(`${url}create-user`, payLoad)
                .then(response => {
                    //commit mutation
                    commit('storeUserData', response.data.user)
                    return Promise.resolve(response)
                })
                .catch(error => {
                    return Promise.reject(error)
                })
    },

    getUserQuestions({commit}, {url}) {
        return axios.get(`${url}get-quiz`)
                .then(response => {
                    //commit to state
                    commit('commitQuiz', response.data.quiz)
                    return Promise.resolve(true)
                }).
                catch(error => {
                    return Promise.reject(error)
                })
    }
  },
  getters: {
    getName (state) {
        return state.userData.name
    },
    getQuiz (state) {
        return state.answers
    }
  }
})
