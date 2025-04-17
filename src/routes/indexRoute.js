import express from "express";
import { getHomePage, getCreatePage, postNewPc} from "../controller/pcController.js";

export const pcRouter = express.Router();

pcRouter.get("/", getHomePage); 
pcRouter.get("/create-pc", getCreatePage); 
pcRouter.get("/create-pc", postNewPc); 
