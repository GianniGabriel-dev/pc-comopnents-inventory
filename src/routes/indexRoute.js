import express from "express";
import { getHomePage } from "../controller/indexController.js";

export const indexRouter = express.Router();

indexRouter.get("/", getHomePage); //ruta normal de home
