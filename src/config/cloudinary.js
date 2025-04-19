import dotenv from 'dotenv';
dotenv.config(); // Cargar variables de entorno desde el archivo .env

import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export default cloudinary; // Exportar la configuración de Cloudinary para usarla en otros archivos
