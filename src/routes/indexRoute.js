import express from "express";
import { getHomePage, getPcPage, getCreatePage, postNewPc, deletePc} from "../controller/pcController.js";

export const pcRouter = express.Router();

pcRouter.get("/", getHomePage); 
pcRouter.get("/pc/:pc_id", getPcPage); 
pcRouter.get("/create-pc", getCreatePage); 
pcRouter.post("/create-pc", postNewPc); 
pcRouter.delete("/api/pc/:pc_id", deletePc) //ruta para eliminar un pc, se hace con el metodo delete y no get, ya que es una peticion de borrado
