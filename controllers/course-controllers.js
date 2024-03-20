import express from 'express';
import { readFile } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import  session  from 'express-session';

const control= express( )
control.use(express.json());

// Configure session middleware
control.use(session({
  secret:'4321',
  saveUninitialized:false,
  resave:false
}))

// getting directory name of current module
const __dirname = dirname(fileURLToPath(import.meta.url));

control.use(express.static(path.join(__dirname, '../Public')));
control.use(express.urlencoded({ extended: true }));

//Data for courses
let courses = [
  { id: 1, title: 'Back end', description: 'Learning server side software engineering', instructor: 'Joachim', price: 100, createdAt: '12:30PM' },
  { id: 2, title: 'Front end', description: 'Learning HTML, CSS, React, and TypeScript software engineering', instructor: 'Joachim', price: 100, createdAt: '02:30AM' },
  { id: 3, title: 'Database Management', description: 'Learning database management concepts and SQL queries', instructor: 'Joachim', price: 100, createdAt: '12:30PM' },
  { id: 4, title: 'Data Structures and Algorithms', description: 'Learning fundamental data structures and algorithms', instructor: 'Joachim', price: 100, createdAt: '12:30PM' },
  { id: 5, title: 'Network Security', description: 'Learning network security principles and practices', instructor: 'Joachim', price: 100, createdAt: '12:30PM' }
];


//middleware authentication


//control static files from the ../Public folder

const getLogin=(req, res) => {
    res.sendFile(path.join(__dirname, '../Public', 'login.html'));
  };

const postLogin=(req, res) => {
  const { password } = req.body;
  if (password === '1234') {
    res.redirect('/course');
  } else {
    res.redirect('/login');
  }
};

const getCoursePage=(req, res) => {
  readFile(path.join(__dirname, '../Public', 'node-course.html'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('error occurred');
    } else {
      res.send(data);
    }
  });
} ;

//post course
const postCourse=(req,res)=>{
    let newCourse=req.body;
    courses= courses.concat(newCourse);
    res.send(courses);
    console.log("Course added.");
  }
  //getcourse
  const getCourse=(req,res)=>{
    res.send(courses);
  }
//getcourse by ID
  const getCourseId=(req,res)=>{
    let reqId=parseInt(req.params.courseId);
    let get=courses.find(course=>course.id===reqId)

        if(get){
            res.send(get)
            console.log(get);
        }else{res.status(404).send("Course not found")
        }
    }

 // patch course
  const patchCourseId=(req,res)=>{
    let reqId=parseInt(req.params.courseId);
    let update = courses.find(course=>course.id===reqId)
  
    if (update) {
            update.price=req.body.price;
            res.send(update)
            
        } else {
            res.send("Course not found")
        }
      }
  
      //delete course by Id 
const deleteCourse=(req,res)=>{
    let reqId= parseInt(req.params.courseId);
let index=courses.find(course=>course.id===reqId)
if (index) {
    let deleteId= courses.splice(index, 1);
    res.send(deleteId);
    console.log("Deleted course:", deleteId);
    console.log("Remaining courses:", courses);
    
} else {
    res.status(404).send("Course not found");
}
  } 


  export {getCourse, getLogin, getCoursePage,postLogin,
    getCourseId,  postCourse, patchCourseId, deleteCourse
  }