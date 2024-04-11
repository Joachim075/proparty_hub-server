import express  from "express";
import router from "./routes/course-router.js";
import morgan from "morgan";
import cors from "cors"

const server= express();
const PORT= process.env.PORT || 4000;

server.use(cors())
server.use((req,res,next)=>{
  if (req.headers.authorization) {
     let autheader= req.headers.authorization;
  let token = autheader.split(' ')[1];

  if (token) {
    res.send(autheader)
  } else {
    
    res.send("no token detected")
  }
  } else {
    
  }
 

  ;
})
server.use(morgan('dev'))
server.use(express.json());

server.get("/api ", (req, res) => {
  
    res.redirect("/course");
  });

server.use("/api", router)

server.listen(PORT,()=>{
    console.log(`server is on port ${PORT}` )
})



