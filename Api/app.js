const express =  require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
var cors = require('cors')
const app = express();
const ANS = './db/answers.json';
const QUE = './db/questions.json';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//create new user here
app.post('/api/v1/create-user', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let quizQuestions = req.body.questions
    //ensure fields are not empty
    if(!name || !email) {
        return res.status(400)
                .send({
                    success: false,
                    message: "All fields are required"
                })
    }

    //readIn file and check if user email exits
    fs.readFile(ANS, (err, data) => {
        var obj = JSON.parse(data);   

        let user = {
            id: obj.answers.length + 1,
            name,
            email,
            quiz: {
                count: quizQuestions,
                answers: [],
                score: 0
            }
        }

        obj.answers.push(user)

        obj = JSON.stringify(obj)

        fs.writeFile(ANS, obj, 'utf8', function(err) {
            if (err) console.log('Serios Error here!!!');
        })
         
        
        res.status(201).send({
            success: true,
            message: 'Answers Retrieved',
            user
        })
    })   
})

//get quiz questions
app.get('/api/v1/get-quiz/:n', (req, res) => {
    const N = parseInt(req.params.n);
    //open queestions.json and retrieve quiz
    fs.readFile(QUE, (err, data) => {
        let obj = JSON.parse(data)
        let quiz = obj.questions

        let shuffled = quiz.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, N);

      return res.status(200)
                .send({
                    success: true,
                    message: "Questions Set",
                    selected
                })

    })
})

//process results and compute answers
app.post('/api/v1/submit', (req, res) => {
    let userid  = req.body.id;
    let answers = req.body.answers;
    let numberOfQuestions = answers.length;
    let score = 0;
    let user;

    answers.map(x => {
        if(x.choice === x.answer)
            score++;
    });
    let percentage = ((score / numberOfQuestions) * 100);

    fs.readFile(ANS, (err, data) => {
      let obj = JSON.parse(data);
      obj.answers.map(x => {
        if(x.id === userid) {
          user = x;
        }
      })
      
      user.quiz.answers = answers;
      user.quiz.score = percentage.toFixed(1);
      obj.answers.map(el => {
        if (el.id === user.id) 
          el = user
      })

      obj = JSON.stringify(obj)
      fs.writeFile(ANS, obj, 'utf8', function(err) {
            if (err) console.log('Serious Error here!!!');
        });
      
      return res.status(200)
                .send({
                  success: true,
                  message: "",
                  user
                });
      

    })
})




const PORT = 5000;

app.listen(process.env.PORT || 5000, function(){
    console.log('Your node js server is running');
});