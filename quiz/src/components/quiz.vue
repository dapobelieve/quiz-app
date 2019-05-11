<template>
  <div class="quiz">
    <v-container grid-list-md text-xs-center fluid>
      <v-layout row wrap>
        <v-flex xs12 md8>
          <v-card>
            <v-card-title primary-title class="heading">
              <div>
                <template v-for="(quiz, index) in newData">
                  <h4 class="title ">Question {{ pageStart + 1 }}</h4>
                  <div class="question">
                    {{ quiz.question }}
                  </div>
                  <div class="options">
                    <div class="option option-1">
                      <v-card>
                        <input v-model="answers[pageStart]" 
                          @change="handleChange($event, quiz.id)" type="radio" 
                          :name="pageStart" 
                          value="A">A: {{ quiz.A }}
                      </v-card>                    
                    </div>
                    <div class="option option-2">
                      <v-card>
                        <input v-model="answers[pageStart]" @change="handleChange($event, quiz.id)" type="radio" 
                        :name="pageStart" value="B">B: {{ quiz.B }}
                      </v-card>                    
                    </div>
                    <div class="option option-3">
                      <v-card>
                        <input 
                          v-model="answers[pageStart]" 
                          @change="handleChange($event, quiz.id)" 
                          type="radio" 
                          :name="pageStart" 
                          value="C">
                          C: {{ quiz.C }}
                      </v-card>                    
                    </div>
                    <div class="option option-4">
                      <v-card>
                        <input 
                          v-model="answers[pageStart]" 
                          @change="handleChange($event, quiz.id)" 
                          type="radio" 
                          :name="pageStart" 
                          value="D">
                          D: {{ quiz.D }}
                      </v-card>                    
                    </div>
                  </div>
                </template>
                <div class="controls">
                  <v-btn dark :disabled="pageStart == 0" @click="pageStart -= 1" >Prev</v-btn>
                  <v-btn dark :disabled="pageStart >= pages - 1" @click="pageStart += 1" >Next</v-btn>
                </div>
              </div>              
            </v-card-title>            
          </v-card>
          <div class="submit">
            <v-btn @click="handleSubmit" color="success">Submit</v-btn>
          </div>
          <!-- </v-flex> -->
        </v-flex>
        <v-flex xs12 md4>
          <v-card class="px-2 py-2">
            <v-card v-for="(x, index) in quiz" :key="x.id" :class="{empty: !x.hasAnswered && submit }"  tile>
              <v-card-text @click="pageStart = index" class="qstate">{{ index + 1 }}</v-card-text>
              <v-divider></v-divider>
            </v-card>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import axios from 'axios'
  export default {
    data () {
      return {
        pages: 0,
        pageStart: 0,
        answers: [],
        submit: false
      }
    },
    computed: {
      newData () {
        if (!this.quiz) 
          return;
        const start = this.pageStart * 1,
              end   = start + 1
        return this.quiz.slice(start, end);
      },
      ...mapGetters({
        user: 'getName',
        quiz: 'getQuiz'
      })
    },
    methods: {
      ...mapActions({
        getQuestions: 'getUserQuestions',
        setAnswer: 'answerQuestion'
      }),
      handleChange (e, id) {
        this.setAnswer({
          id: id,
          answer: event.currentTarget.value
        })
      },
      handleSubmit () {
        let ans = 0;
        this.submit = false
        this.quiz.map(x => {
          if (x.hasOwnProperty('choice')) {
            ans+=1;
          }else {
            x.hasAnswered = false
          }
        })
        // if (ans === this.quiz.length) {
          this.submitQuiz()
        // }else {
        //   this.submit = !this.submit
        //   alert('answer all questions')
        //   return ;
        // }
      },
      submitQuiz () {
        axios.post(`${this.$baseUrl}submit`,{
          answers: this.quiz
        })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error.response.data)
        })
        console.log("submitting...")
      }
    },
    mounted () {
      let lent = this.quiz.length;
      this.pages = Math.ceil(lent/1)

      // by default all quiz takers have empty scores
      this.answers = Array(lent).fill(null)
    },
    created () {
      this.getQuestions({
        url: this.$baseUrl,
        N: this.user.quiz.count
      })
    }
  }
</script>
<style>
  .empty {
    background-color: red !important;
  }
  .empty:hover {
    /*background-color: #ccb*/
  }
  .options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    grid-column-gap: 75px;
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
  .qstate {
    cursor: pointer;
  }
  .qstate:hover{
    background-color: #ccc
  }
</style>