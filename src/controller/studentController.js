// simulated db
let students = [
    { id: 1, name: "Rodi", age: 17, gender: "female"}
]

// CREATE ITEM
const createStudent =(req, res) => {
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
}

// GET ALL STUDENTS
const getAllStudent =(req, res) => {
    res.status(200).json(students)
}

// GET SINGLE STUDENT
const getStudentById = (req, res) => {
    const studentId = parseInt(req.params.id)
    const student = students.find(s => s.id === studentId )
    
    if(!student){
        res.status(400).json({message:'Student not found'})
    }
    res.status(200).json(student)
}

// UPDATE SINGLE STUDENT
const UpdateStudent = (req, res) => {
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
}

//DELETE STUDENT
const deleteStudent = (req, res) => {
    const studentId = parseInt(req.params.id)
    const student = students.find(s => s.int === studentId)

    if(!student){
        res.status(400).json({message: 'Student not found'})
    }

    students.splice(student, 1)
    res.status(200).json({message:'Student deleted successfully'})
}

module.exports = {
    createStudent,
    getAllStudent,
    getStudentById,
    UpdateStudent,
    deleteStudent
}