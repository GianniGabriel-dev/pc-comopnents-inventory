// Importamos 'multer', una librería de Node.js que se usa para gestionar la subida de archivos desde formularios
import multer from 'multer';

// Importamos 'CloudinaryStorage', que nos permite decirle a multer que guarde los archivos directamente en Cloudinary
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Importamos la configuración de Cloudinary desde un archivo externo (donde ya conectaste tu cuenta con las credenciales del .env)
import cloudinary from './cloudinary.js';

// Creamos una instancia de almacenamiento para multer, pero en vez de guardar los archivos en el disco local,
// los subirá automáticamente a Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // Le pasamos la instancia configurada de Cloudinary
  params: {
    folder: 'pc-components', // Todas las imágenes subidas se guardarán dentro de esta carpeta en tu cuenta de Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] // Solo se permiten estos formatos de imagen
  }
});

// Creamos la función 'upload', que usaremos como middleware en nuestras rutas para procesar las subidas de imágenes.
// Esta función ya está configurada para subir las imágenes directamente a Cloudinary usando el almacenamiento anterior.
const upload = multer({ storage: storage });

// Exportamos 'upload' para usarlo en otras partes de nuestra aplicación, como en rutas POST donde se suben archivos.
export default upload;