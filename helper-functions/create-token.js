import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const login = async (req, res) => {
   // User login details
   const { email, password } = req.body;

   try {
      // Compare email if user exists
      const user = await prisma.agent.findUnique({
         where: { email: email }
      });

      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      if (bcrypt.compareSync(password, user.password)) {
         // Create token
         let userData = {
            name: user.name,
            age: user.age,
            userId: user.id,
            role: user.role
         };
         let token = jwt.sign(userData, "my-secrete-key", { expiresIn: "24h" });
         res.json(token);
      } else {
         return res.status(401).json({ message: "Invalid credentials" });
      }
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
   }
};

export { login };
