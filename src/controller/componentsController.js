import { createNewComponent, getAllComponents, getComponentById } from "../db/queries.js"

export const getComponentPage = async(req, res)=>{
    const components = await getAllComponents()
    console.log(components)
    res.render("components", { 
        title:"PC Components",
        components:components
    })
}
export const getComponentDetailsPage = async(req, res)=>{
    const { component_id } = req.params//obtener id por la url
    const component= await getComponentById(component_id)
    res.render("componentDetails",{
        title:component.component_name,
        component:component
    })
}

export const getAddComponentPage =(req, res)=>{
    res.render("addComponent", { 
        title:"Add a Component"
    })
}
export const postNewComponent =(req, res)=>{
    const { component_name, component_type, price, component_image} = req.body;
    createNewComponent(component_name, component_type, price, component_image)
    //falta enviar los datos a la base de datos
    console.log(`New component Created: ${component_name}, type: ${component_type}, brand: , price: ${price}, imageURL: ${component_image}`);
    res.redirect("/components");
}