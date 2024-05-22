import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    //check if user exists by email
    let user = await prisma.agent.findUnique({
      where: { email: req.body.email },
    });
    if ((user != null && user.email === req.body.email)) {
      // give response if user exists
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "user with this email already exists" });
    } else {
      //hash the password
      bcrypt.hash(req.body.password, 10, async function (err,hash) {
        if (err) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: "failed to harsh password" });
        } else {
          //create user if user doesnot exist
          const newUser = await prisma.agent.create({ data:{...req.body,password:hash}  });
          res.status(StatusCodes.CREATED).json(newUser);
        }
      });

      
    }
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.EXPECTATION_FAILED).json({error:"didnt create user."});
  }
};

const getUser=async (req,res)=>{
    const users= await prisma.agent.findMany()
    res.json(users)
}

export { createUser,getUser };
