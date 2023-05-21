const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Student = require("./models/students")
const port = process.env.PORT || 8000;

app.use(express.json())

require("./db/conn")




app.get("/", (req, res) => {
    console.log("Welcome to Home page ")
})

// Create new students
// app.post("/students", (req, res) => {
//     console.log(req.body)
//     const user = new Student(req.body)
//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
// })



// using async await function
app.post("/students", async (req, res) => {

    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }
    catch (e) {
        res.send(400).send(e);
    }
})



//read the data of the registerd students

app.get("/students", async(req, res)=>{
    try{
        const studentsData = await  Student.find();
        res.send(studentsData);

    }catch(e){
          res.send(e); 
    }
})

// Get the individual student data using id 
app.get("/students/:id", async (req, res)=>{
    try{
        const _id = req.params.id;
        
        const studentData = await Student.findById(_id);
        res.send(studentData);

        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData); 
        }

    }catch(e){
        res.status(500).send(e);
    }
})

//get individual students data using name 
app.get("/students/:name", async (req, res)=>{
    try{
        const name = req.params.name;

        const studentName = await Student.findOne(name);
        res.send(studentName);

        if(!studentName){
           return res.status(404).send();
        }else{
            res.send(studentName);
        }
    }catch(e){
        res.status(500).send(e);
    }
})

// Delete the students data by it's id
app.delete("/students/:id", async (req, res)=>{
    try{
        const deleteStudent = await Student.findbyIdAndDelete(req.params.id)
        if(!req.params.id){
            return res.status(404).send();
        }
        res.send(deleteStudent);
    }catch(e){
        res.status(500).send(e);
    }
})



app.listen(port, () => {
    console.log(`connection is setup on ${port}`)
})