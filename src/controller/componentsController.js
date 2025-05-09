import { validationResult } from "express-validator";
import { componentValidator } from "../validators/componentValidator.js";
import {
  createNewComponent,
  getAllComponents,
  getComponentById,
  deleteComponentFromDB,
  updateComponentFromDB,
} from "../db/queries.js";

export const getComponentPage = async (req, res) => {
  try {
    const components = await getAllComponents();
    
    res.render("components", {
      title: "PC Components",
      components: components,
      path: req.path,
    });
  } catch (error) {
    console.error("Error getting components", error);
    res.status(500).send("Error getting components");
  }
};
export const getComponentDetailsPage = async (req, res) => {
  try {
    const { component_id } = req.params; //obtener id por la url
    const component = await getComponentById(component_id);
    res.render("componentDetails", {
      title: component.component_name,
      component: component,
      path: req.path,
    });
  } catch (error) {
    console.error("Error getting component details", error);
    res.status(500).send("Error getting component details");
  }
};

export const getAddComponentPage = (req, res) => {
  res.render("addComponent", {
    title: "Add a Component",
    path: req.path,
  });
};

//página de editar un componente ya creado
export const getEditComponent = async (req, res) => {
  const { component_id } = req.params;
  const component = await getComponentById(component_id);

  res.render("editComponent", {
    title: `Edit ${component.component_name}`,
    component: component,
    path: req.path,
  });
};
export const editNewComponent = [
  componentValidator, //se valida el formulario con express-validator
  async (req, res) => {
    const { component_id } = req.params;
    const component = await getComponentById(component_id);
    // Si hay errores de validación, los manejamos aquí
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Si hay errores, los mostramos al usuario
      return res.status(400).render("addComponent", {
        errors: errors.array(),
        title: `Edit ${component.component_name}`,
        component: component,
        path: req.path,
      });
    }
    try {
      const { component_name, component_type, price } = req.body;
      const component_nameTrimmed = component_name.trim(); //quita los espacios al nombre del componente
      const component_image = req.file
        ? req.file.path
        : component.component_image; // si no se sube imagen, se asigna laiamgen anterior, si no tenia iamgen se asigna null

      await updateComponentFromDB(
        component_id,
        component_nameTrimmed,
        component_type,
        price,
        component_image
      ); //se usa await para esperar a que se cree el nuevo componente en la base de datos

      res.redirect("/components");
    } catch (error) {
      console.error("Error updating component", error);
      res.status(500).send("Error updating component");
    }
  },
];

export const postNewComponent = [
  componentValidator, //se valida el formulario con express-validator
  async (req, res) => {
    // Si hay errores de validación, los manejamos aquí
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Si hay errores, los mostramos al usuario
      return res.status(400).render("addComponent", {
        errors: errors.array(),
        title: "Add a Component",
      });
    }
    try {
      const { component_name, component_type, price } = req.body;
      const component_nameTrimmed = component_name.trim(); //quita los espacios al nombre del componente
      const component_image = req.file ? req.file.path : null; // si no se sube imagen, se asigna null

      await createNewComponent(
        component_nameTrimmed,
        component_type,
        price,
        component_image
      ); //se usa await para esperar a que se cree el nuevo componente en la base de datos

      res.redirect("/components");
    } catch (error) {
      console.error("Error creating new component", error);
      res.status(500).send("Error creating new component");
    }
  },
];

export const deleteComponent = async (req, res) => {
  const { component_id } = req.params;
  const deleted = await deleteComponentFromDB(component_id);
  if (!deleted) {
    return res.status(404).json({ message: "Component not found" });
  }
  res.status(200).json({ message: "Componente deleted successfully" });
};
