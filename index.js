const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const app = express()
dotenv.config()

const PORT = process.env.PORT

app.use(express.json())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({message:'Daddy is here'})
})

// simulated db
let students = [
    { id: 1, name: "Rodi", age: 17, gender: "female"}
]

// CREATE ITEM
app.post('/students', (req, res) => {
    const { name, age, gender } = req.body
    const newStudent = {
        id : students.length + 1,
        name,
        age, 
        gender
    }
    students.push(newStudent)
    res.status(201).json(newStudent)
})

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)

})