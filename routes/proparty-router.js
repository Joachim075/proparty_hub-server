import express from "express";
import {getProparty,getPropartyId,  postProparty, patchPropartyId, deleteProparty} from "../controllers/proparty-controllers.js";
import {login } from "../helper-functions/create-token.js";
import { verifyToken } from "../helper-functions/verify-token.js";
import { propartySchema, validate } from "../helper-functions/data-validation.js";
import { isAdmin } from "../helper-functions/roleBased-middleware.js";

const propartyRouter = express.Router();

//post request for new Proparty
propartyRouter.post("/proparties",verifyToken,isAdmin,validate(propartySchema), postProparty);

//get token
propartyRouter.post("/login", login);
//route for Proparty page
propartyRouter.get("/proparties", getProparty);

//get request for proparty ID
propartyRouter.get("/proparties/:propartyId", getPropartyId);

//patch request depending on propartyID
propartyRouter.patch("/proparties/:propartyId", patchPropartyId);

//delete request depending on propartyID
propartyRouter.delete("/proparties/:propartyId", deleteProparty);

export default propartyRouter;