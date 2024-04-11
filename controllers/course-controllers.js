import express from 'express';
import { PrismaClient } from '@prisma/client';
import { readFile, writeFile } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import  session  from 'express-session';

const control= express( )
const prisma= new PrismaClient();
control.use(express.json());

// Configure session middleware
control.use(session({
  secret:'4321',
  saveUninitialized:false,
  resave:false
}))

// getting directory name of current module
const __dirname = dirname(fileURLToPath(import.meta.url));
const courseFile= path.join(__dirname,"../course.json")
control.use(express.static(path.join(__dirname, '../Public')));
control.use(express.urlencoded({ extended: true }));





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
const postCourse=async (req,res)=>{
    try {
      let newCourse=await prisma.course.create({
        data: req.body});
      res.json({data: newCourse});
      console.log("Course added.");

    } catch (error) {
      console.log(error)
      res.status(400).json('course not added')
    }
  }


  //getcourse
  const getCourse=async (req,res)=>{
    const course= await prisma.course.findMany();
    res.json(course);
  }
//getcourse by ID
  const getCourseId=async(req,res)=>{
    let reqId=parseInt(req.params.courseId);
   try {
    const getCourse= await prisma.course.findUnique(
      {
        where:{id:reqId}
      }
    )
    res.json(getCourse)
    
   } catch (error) {
    console.log(error)
    
    res.json({message:"Does not exist"})
    
   }
    }

 // patch course
  const patchCourseId= async (req,res)=>{
    let reqId=parseInt(req.params.courseId);
   
    try {
      const updatedCourse= await prisma.course.update(
        {where:{id:reqId},
        
        data:req.body
        
      }
      );
      res.json({data:updatedCourse})

    } catch (error) {
      console.log(error)
      res.status(500).json('course not updated')
    }
      }
  
      //delete course by Id 
const deleteCourse=async (req,res)=>{
    let reqId=  parseInt(req.params.courseId);
    try {
        const deleteById=await prisma.course.delete({
          where:{id:reqId}
        }
        )
        res.json({data:deleteById})
      
    } catch (error) {
      console.log(error)
      res.json({message:"Does not exist"})
    }
  } 


  export {getCourse, getLogin, getCoursePage,postLogin,
    getCourseId,  postCourse, patchCourseId, deleteCourse
  }