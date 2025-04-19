import express from "express";
import { getComponentPage, getAddComponentPage, postNewComponent, getComponentDetailsPage} from "../controller/componentsController.js";


export const componentsRouter = express.Router();

componentsRouter.get("/components", getComponentPage); 
componentsRouter.get("/components/new", getAddComponentPage); 
componentsRouter.post("/components/new", postNewComponent); 
componentsRouter.get("/components/:component_id", getComponentDetailsPage); //se tiene que poner al final para que no choque con la ruta de arriba (/new)