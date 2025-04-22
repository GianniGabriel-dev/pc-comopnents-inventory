import { body } from 'express-validator';

//los únicos values que puede tener el campo component_type, si son cambiados con las dev tools, en el frontend, se lanza un error 
// ya que no se encontraría el vlaue en este array y no se guardaría en la base de datos
const validComponentTypes = [
    'CPU',
    'GPU',
    'RAM',
    'Storage',
    'Motherboard',
    'PSU',
    'Case',
    'Cooler'
  ];

export const componentValidator = [
    body('component_name')
        .trim()
        .notEmpty().withMessage('Component name is required.')
        .isLength({ min: 3}).withMessage('Component name must be at least 3 characters long.')
        .isLength({ max: 250 }).withMessage('Component name must be at most 250 characters long.'),

    body('component_type')
        .notEmpty().withMessage('Component type is required.')
        .isIn(validComponentTypes).withMessage('Invalid component type.'),

    body('price')
        .notEmpty().withMessage('Price is required.')
        .isFloat({ min: 0.01, max: 999999.99 }).withMessage('Price must be a valid number between 0.01 and 999999.99.'), //numero

    body('component_image')
        .optional()  
        .custom((value, { req }) => {
            if (req.file && !req.file.mimetype.startsWith('image/')) {
                throw new Error('File must be an image');
            }
            return true;
        })
];