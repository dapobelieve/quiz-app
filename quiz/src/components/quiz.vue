<template>
  <div class="quiz">
    <v-container grid-list-md text-xs-center fluid>
      <v-layout row wrap>
        <v-flex xs12 md8>
          <v-card>
            <v-card-title primary-title class="heading">
              <div>
                <span v-for="(quiz, index) in newData" >
                  <h4 :key="quiz.id" class="title ">Question {{ pageStart + 1 }}</h4>
                  <div class="question" :key="quiz.id">
                    {{ quiz.question }}
                  </div>
                  <div class="options" :key="quiz.id">
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
                </span>
                <div class="controls">
                  <v-btn dark :disabled="pageStart == 0" @click="pageStart -= 1" >Prev</v-btn>
                  <v-btn dark :disabled="pageStart >= pages - 1" @click="pageStart += 1" >Next</v-btn>
                </div>
              </div>              
            </v-card-title>            
          </v-card>
          <div class="submit">
            <v-btn @click="handleSubmit" :disabled="btn.state" color="success">{{btn.text}}</v-btn>
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
  export default {
    data () {
      return {
        pages: 0,
        pageStart: 0,
        answers: [],
        submit: false,
        btn: {
          state: false,
          text: 'Submit'
        }
      }
    },
    computed: {
      ...mapGetters({
        user: 'getUser',
        quiz: 'getQuiz'
      }),
      newData () {
        if (!this.quiz) 
          return;
        const start = this.pageStart * 1,
              end   = start + 1
        return this.quiz.slice(start, end);
      },
      
    },
    methods: {
      toggle () {
        this.btn.state = !this.btn.state
      },
      ...mapActions({
        getQuestions: 'getUserQuestions',
        setAnswer: 'answerQuestion',
        submitQuiz: 'submitQuiz'
      }),
      handleChange (e, id) {
        this.setAnswer({
          id: id,
          answer: event.currentTarget.value
        })
      },
      handleSubmit () {
        this.toggle()
        this.btn.text = 'Processing...'
        let ans = 0;
        this.submit = false
        this.quiz.map(x => {
          if (x.hasOwnProperty('choice')) {
            ans+=1;
          }else {
            x.hasAnswered = false
          }
        })
        if (ans === this.quiz.length) {
          this.submitQuiz({
            url: this.$baseUrl,
            answers: this.quiz,
            userId: this.$store.state.userData.id
          })
          .then(response => {
            this.$router.replace({
              name: 'result'
            })
          })
        }else {
        this.btn.text = 'Submit'
        this.toggle()
          this.submit = !this.submit
          alert('The questions tagged in red have not been answered')
          return ;
        }
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
        N: this.$store.state.userData.quiz.count
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