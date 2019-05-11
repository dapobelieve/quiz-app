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
    },
    answerQuestion(state, {id, answer}) {
        state.answers.map(x => {
            if (x.id === id) {
                x['choice'] = answer;
                x.hasAnswered = true;
            }
        })
        
        localStorage.setItem('quiz', JSON.stringify(state.answers))
    },
    updateUserData(state, {response}) {
        console.log(response.data.user)
        state.userData = response.data.user
        // localStorage.setItem('userData', JSON.stringify(payLoad))
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
    getUserQuestions({commit}, {url, N}) {
        return axios.get(`${url}get-quiz/${N}`) //N : number of users selected questions
                .then(response => {
                    //commit to state
                    commit('commitQuiz', response.data.selected)
                    return Promise.resolve(true)
                }).
                catch(error => {
                    return Promise.reject(error)
                })
    },
    answerQuestion({commit}, {id, answer}) {
        commit('answerQuestion', {id, answer})
    },
    submitQuiz({commit}, { url, answers, userId }) {
        return axios.post(`${url}submit`, {
            id: userId,
            answers
        })
        .then(response => {
            commit('updateUserData', {response})
            return Promise.resolve(response)
        })
        .catch(error => {
            return Promise.reject(error)
        })
    }
  },
  getters: {
    getUser (state) {
        return state.userData
    },
    getQuiz (state) {
        return state.answers
    }
  }
})
