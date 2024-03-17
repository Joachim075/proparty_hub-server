import express from 'express'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const control= express( )
// getting directory name of current module
const __dirname = dirname(fileURLToPath(import.meta.url));

control.use(express.static(path.join(__dirname, 'public')));
control.use(express.urlencoded({ extended: true }));
//control static files from the public folder

const getLogin=(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  };

const postLogin=(req, res) => {
    const { password } = req.body;
    if (password === '1234') {
      res.redirect('/course');
    } else {
      res.redirect('/login?error=1');
    }
  };

const getCoursePage=(req, res) => {
    readFile(path.join(__dirname, 'public', 'node-course.html'), 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('error occurred');
      } else {
        res.send(data);
      }
    });
  }  ;
//Data for courses
let courses = [
    { id: 4, title: 'Back end', description: 'Learning server side software engineering', instructor: 'Joachim', price: 100, createdAt: '12:30PM' },
    { id: 6, title: 'Front end', description: 'Learning html, css, react and typescript software engineering', instructor: 'Joachim', price: 100, createdAt: '02:30AM' }
  ];
//post course
const postCourse=(req,res)=>{
    (req,res)=>{
    let newCourse=req.body;
    courses= courses.concat(newCourse);
    res.send(courses);
    console.log("Course added.");
  }}
  //getcourse
  const getCourse=(req,res)=>{
    res.send(courses);
  }
//getcourse by ID
  const getCourseId=(req,res)=>{
    let reqId=parseInt(req.params.courseId);
    courses.find((course)=>{
        if(course.id===reqId){
            res.send(course)
        }else{res.send("Course not found")}
    })
  }
 // patch course
  const patchCourseId=(req,res)=>{
    let reqId=parseInt(req.params.courseId);
    courses.find((course)=>{
        if (course.id===reqId) {
            course.price=req.body.price;
            res.send(course)
            
        } else {
            res.send("Course not found")
        }
    })
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