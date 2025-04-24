import express from "express";
import { getComponentPage, getAddComponentPage, postNewComponent, getComponentDetailsPage, deleteComponent} from "../controller/componentsController.js";
import upload from "../config/multer.js";
import { deleteComponentFromDB } from "../db/queries.js";


export const componentsRouter = express.Router();

componentsRouter.get("/components", getComponentPage); 
componentsRouter.get("/components/new", getAddComponentPage); 

//sube la imagen a cloudinary y luego guarda el resto de datos en la base de datos; 'upload.single' gestiona la subida de una sola imagen con el campo 'component_image'
componentsRouter.post("/components/new", upload.single('component_image'), postNewComponent); 

componentsRouter.get("/components/:component_id", getComponentDetailsPage); //se tiene que poner al final para que no choque con la ruta de arriba (/new)

componentsRouter.delete("/api/components/:component_id", deleteComponent); //ruta para eliminar un componente, se hace con el metodo delete y no get, ya que es una peticion de borrado