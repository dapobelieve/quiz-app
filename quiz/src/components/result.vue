<template>
  <div class="result">
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title primary-title class="heading">
              <div class="result-area">
                <h4 class="title ">You Scored</h4>
                <p class="display-4">{{user.quiz.score}}%</p>
                <v-btn :to="{name: 'quiz'}" color="darken-1">Try Again</v-btn>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>       
    </v-container>    
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        user: 'getUser'
      })
    },
    mounted() {
      console.log(this.user)
    }
  }
</script>
<style>
  .result-area {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>