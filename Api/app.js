import express from 'express';
import bodyParser from 'body-parser';
const fs = require('fs')
var cors = require('cors')
const app = express();
const ANS = './db/answers.json';
const QUE = './db/questions.json';

app.use(cors())
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
                questions: [],
                answers: [],
                score: 0
            }
        }

        obj.answers.push(user)

        obj = JSON.stringify(obj)

        fs.writeFile(ANS, obj, 'utf8')
         
        
        res.status(201).send({
            success: true,
            message: 'Answers Retrieved',
            user
        })
    })   
})

//get quiz questions
app.get('/api/v1/get-quiz', (req, res) => {
    //open queestions.json and retrieve quiz
    fs.readFile(QUE, (err, data) => {
        let obj = JSON.parse(data)
        let quiz = obj.questions

        return res.status(200)
                .send({
                    success: true,
                    message: "Questions Set",
                    quiz
                })

    })

    
})

//get quiz questions

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})