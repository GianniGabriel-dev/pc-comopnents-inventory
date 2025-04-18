import express from "express";
import { getComponentPage, getAddComponetPage, postNewComponent, getComponentDetailsPage} from "../controller/componentsController.js";


export const componentsRouter = express.Router();

componentsRouter.get("/components", getComponentPage); 
componentsRouter.get("/components/:component_id", getComponentDetailsPage); 
componentsRouter.get("/components/new", getAddComponetPage); 
componentsRouter.post("/components/new", postNewComponent); 