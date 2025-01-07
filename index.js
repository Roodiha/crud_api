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
    if(!name || !age || !gender){
        res.status(400).json({message:'Name, age and gender are required'})
    }
    const newStudent = {
        id : students.length + 1,
        name,
        age, 
        gender
    }
    students.push(newStudent)
    console.log(students)
    res.status(201).json(newStudent)
})

// GET ALL STUDENTS
app.get('/students', (req, res) => {
    res.status(200).json(students)
})

// GET SINGLE STUDENT
app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id)
    const student = students.find(s => s.id === studentId )
    
    if(!student){
        res.status(400).json({message:'Student not found'})
    }
    res.status(200).json(student)
})

// UPDATE SINGLE STUDENT
app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id)
    const{name, age, gender} = req.body
    const student = students.find( s => s.id === studentId)

    if(!student){
        res.status(400).json({message:'Student  not found'})
    }

    if (!name || !age || !gender){
        res.status(400).json({message:'Name, age and gender are required'})
    }

    students[student] = {id:studentId, name, age, gender}
    res.status(200).json(students[student])
})

//DELETE STUDENT
app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id)
    const student = students.find(s => s.int === studentId)

    if(!student){
        res.status(400).json({message: 'Student not found'})
    }

    students.splice(student, 1)
    res.status(200).json({message:'Student deleted successfully'})
})


app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)

})