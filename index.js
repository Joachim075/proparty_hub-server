import express  from "express";
import { userRouter } from "./routes/user-router.js";
import morgan from "morgan";
import cors from "cors";
import propartyRouter from "./routes/proparty-router.js";

const server= express();
server.use(morgan("dev"));
const PORT= process.env.PORT || 4000;

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

server.get("/proparty_hub ", (req, res) => {
  
    res.redirect("/login");
  });

server.use("/proparty_hub", propartyRouter);
server.use("/proparty_hub",userRouter)

server.listen(PORT,()=>{
    console.log(`Proparty_Hub server is running on port ${PORT}` )
});

