<template>
  <div class="quiz">
    <v-container grid-list-md text-xs-center fluid>
      <v-layout row wrap>
        <v-flex xs12 md8>
          <v-card>
            <v-card-title primary-title class="heading">
              <div>
                <h4 class="title ">Question X</h4>
                <div class="question">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium earum quaerat, aut ducimus similique animi consequatur aliquid illum quam, minima eius beatae dicta impedit temporibus.
                </div>
                <div class="options">
                  <div class="option option-1">
                    <v-card>
                      <input type="radio" name="answer" value="d"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, minus.
                    </v-card>                    
                  </div>
                  <div class="option option-2">
                    <v-card>
                      <input type="radio" name="answer" value="d"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, minus.
                    </v-card>                    
                  </div>
                  <div class="option option-3">
                    <v-card>
                      <input type="radio" name="answer" value="d"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, minus.
                    </v-card>                    
                  </div>
                  <div class="option option-4">
                    <v-card>
                      <input type="radio" name="answer" value="d"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, minus.
                    </v-card>                    
                  </div>
                  
                </div>
                <div class="controls">
                  <v-btn dark >Prev</v-btn>
                  <v-btn dark >Next</v-btn>
                </div>
              </div>              
            </v-card-title>            
          </v-card>
        </v-flex>
        <v-flex xs12 md4>
          <v-card class="px-2 py-2">
            <v-card v-for="(x, index) in quiz" :key="x.id"  tile color="" cursor>
              <v-card-text>{{ x }}</v-card-text>
              <v-divider></v-divider>
            </v-card>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs8>
          <v-btn color="success">Submit</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        pages: 0,
        pageStart: 0,
      }
    },
    computed: {
      newData () {
        const start = this.pageStart * 1,
              end   = start + 1
        return this.quiz.slice(start, end);
      },
      ...mapGetters({
        name: 'getName',
        quiz: 'getQuiz'
      })
    },
    methods: {
      ...mapActions({
        getQuestions: 'getUserQuestions'
      })
    },
    mounted () {
      let lent = this.quiz.length;
      this.pages = Math.ceil(lent/1)

    },
    created() {
      // console.log('App Loaded Quiz')
      this.getQuestions({
        url: this.$baseUrl
      })
    }
  }
</script>
<style>
  .options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    /*border: 1px solid grey;*/
    margin-top: 50px;
  }
  .question {
    margin-top: 50px;
    font-size: 20px
  }
  .option {
    padding: 0 5px 5px 5px;
    cursor: pointer;
    /*background-color: grey;*/
  }
  .controls {
    display: flex;
    justify-content: space-around;
    margin-top: 50px
  }
</style>