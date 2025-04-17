import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pcRouter } from './routes/indexRoute.js';
import { componentsRouter } from './routes/componentsController.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); // Middleware para parsear el body de las peticiones POST

// Configura la carpeta donde estarán las vistas (plantillas EJS)
app.set("views", path.join(__dirname, "views"));
// Configura EJS como motor de plantillas
app.set("view engine", "ejs");

// Establece la ruta de la carpeta 'public' donde se encuentran los archivos estáticos, esto permite que los usuarios puedan acceder a archivos como imágenes, CSS y JS
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use("/", pcRouter);
app.use("/", componentsRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
