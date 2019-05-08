<template>
  <div class="home">
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title primary-title class="heading">
              <div>
                <h4 class="title ">Welcome to the Quiz App</h4>
                <p>Enter your details below</p>
              </div>              
            </v-card-title>
            <div class="form">
              <v-flex xs6 offset-xs3>
                <v-text-field
                v-model="form.name"
                  placeholder="Name"
                  solo
                ></v-text-field>
              </v-flex>
              <v-flex xs6 offset-xs3>
                <v-text-field
                v-model="form.email"
                  placeholder="Email"
                  solo
                ></v-text-field>
              </v-flex>
              <v-flex xs6 offset-xs3 >
                <v-select
                  :items="items"
                  v-model="form.questions"
                  placeholder="Select number of questions"
                  solo
                ></v-select>
              </v-flex>
              <v-flex xs6 offset-xs3>
                 <v-btn @click="handleSubmit" color="primary">Submit</v-btn>
              </v-flex>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        items: [1, 2, 3, 4, 5],
        form: {
          name: '',
          email: '',
          questions: 5
        }
      }      
    },
    methods: {
      handleSubmit () {
        axios.post(`${this.$baseUrl}create-user`, this.form)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error.response.data)
        })
        // console.log('submitting')
      }
    }
  }
</script>
<style>
  .heading {
    display: flex;
    justify-content: center;
  }
  .form {
    padding-bottom: 15px
  }
</style>