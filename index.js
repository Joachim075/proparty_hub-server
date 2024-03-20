import express  from "express";
import router from "./routes/course-router.js";
import morgan from "morgan";

const server= express();
const PORT= process.env.PORT || 4000;

server.use(morgan('dev'))
server.use(express.json());

server.get("/api ", (req, res) => {
  
    res.redirect("/course");
  });

server.use("/api", router)

server.listen(PORT,()=>{
    console.log('server is on port 4000 ')
})



