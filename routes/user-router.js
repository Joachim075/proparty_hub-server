import express  from "express";
import { createUser, getUser } from "../controllers/user-controller.js";

const userRouter=express.Router();

userRouter.post("/user",createUser)
userRouter.get("/user",getUser)
export{
    userRouter
}