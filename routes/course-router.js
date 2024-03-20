import express from "express";
import {getLogin,getCourse,getCoursePage,postLogin, deleteCourse,getCourseId,  postCourse, patchCourseId } from '../controllers/course-controllers.js'


    const router= express.Router();


    // route for login page
    router.get('/login',getLogin );
 
    //route for handling login submission
    router.post('/login',postLogin );
    
    //route for course page
    router.get('/course' , getCoursePage);
    
//post request for new course
router.post('/courses',postCourse )

  //route for course page
router.get('/courses', getCourse);

  //get request for course ID
  router.get('/courses/:courseId', getCourseId );
  
  
  //patch request dependin on courseID
  router.patch('/courses/:courseId', patchCourseId );

  //post request for new course
router.post('/courses',postCourse )


//patch request dependin on courseID
router.patch('/courses/:courseId',patchCourseId );
 
//delete request dependin on courseID
router.delete('/courses/:courseId', deleteCourse );

export default router;
