import { body } from 'express-validator';
import { getAllComponents} from '../db/queries.js';

//se valida si el id del componente agregado al pc es entero y si existe en la base de datos, si no existe se lanza un error y no se suebe el pc a la base de datos
//esto se hace para prevenir que el usario modifuque el id del componente en el frontend y se suba un pc con un componente que no existe
const validateComponent = (field, required = false) =>
  body(field)
    .custom(async (value, { req }) => {
      // si el campo es requerido y no está presente muesttra un error
      if (required && (value === undefined || value === null || value === '')) {
        throw new Error(`${field} is required.`);
      }

      // si es opcional y no hay valor, se salta la validación
      if (!required && (value === undefined || value === null || value === '')) {
        return true; //
      }

      // validar si es un número entero
      if (!Number.isInteger(Number(value))) {
        throw new Error(`${field} must be a valid integer.`);
      }

      // verificar si el ID existe en la base de datos
      const components = await getAllComponents();
      const validIds = components.map(c => c.component_id);
      if (!validIds.includes(parseInt(value))) {        //parseInt convierte el string a un numero entero
        throw new Error(`Invalid ${field} selection.`);
      }

      return true; // validación exitosa
    });

export const validateNewPc = [
  body('name')
    .trim()
    .notEmpty().withMessage('PC name is required.')
    .isLength({ min: 3, max: 250 }).withMessage('PC name must be between 3 and 250 characters long.'),

  // campos obligatorios
  validateComponent('cpu', true),
  validateComponent('ram', true),
  validateComponent('storage', true),
  validateComponent('motherboard', true),
  validateComponent('psu', true),

  // campos opcionales
  validateComponent('gpu', false),
  validateComponent('pcCase', false),
  validateComponent('cooler', false)
];