import express  from "express";
import { userRouter } from "./routes/user-router.js";
import morgan from "morgan";
import cors from "cors";
import propartyRouter from "./routes/proparty-router.js";
import helmet from "helmet"
import "dotenv/config"

const server= express();
server.use(morgan("dev"));
const PORT= process.env.PORT || 4000

server.use(cors());
server.use(helmet())
server.use(morgan('dev'));
server.use(express.json());

server.get("/", (req, res) => {
  
      res.json({message: "Hello, Welcome to Property_Hub"})


  });

server.use( propartyRouter);
server.use(userRouter)

server.listen(PORT,()=>{
    console.log(`Proparty_Hub server is running on port ${PORT}` )
});

