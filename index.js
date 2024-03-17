import express  from "express";
import router from "./routes/course-router.js";
const server= express();
const PORT= process.env.PORT || 4000;

server.use(express.json());

server.use("/", router)





server.listen(PORT,()=>{
    console.log('server is on port $(PORT) ')
})



