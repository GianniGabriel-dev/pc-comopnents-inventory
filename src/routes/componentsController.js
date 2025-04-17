import express from "express";
import { getComponentPage, getAddComponetPage, postNewComponent} from "../controller/categoriesController.js";


export const componentsRouter = express.Router();

componentsRouter.get("/components", getComponentPage); 
componentsRouter.get("/components/new", getAddComponetPage); 
componentsRouter.post("/components/new", postNewComponent); 