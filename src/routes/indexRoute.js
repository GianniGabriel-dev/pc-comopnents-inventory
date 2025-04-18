import express from "express";
import { getHomePage, getPcPage, getCreatePage, postNewPc} from "../controller/pcController.js";

export const pcRouter = express.Router();

pcRouter.get("/", getHomePage); 
pcRouter.get("/pc/:pc_id", getPcPage); 
pcRouter.get("/create-pc", getCreatePage); 
pcRouter.get("/create-pc", postNewPc); 
