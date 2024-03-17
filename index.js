import express  from "express";
import router from "./routes/course-router.js";
const server= express();

server.use(express.json());

server.use("/", router)





server.listen(4000,()=>{
    console.log("server is on port 4000 ")
})



