import { createNewComponent, getAllComponents, getComponentById } from "../db/queries.js"

export const getComponentPage = async(req, res)=>{
    try{
        const components = await getAllComponents()
        console.log(components)
        res.render("components", { 
            title:"PC Components",
            components:components
        })
    }catch(error){
        console.error("Error getting components", error)
        res.status(500).send("Error getting components")
    }
}
export const getComponentDetailsPage = async(req, res)=>{
    try{
        const { component_id } = req.params//obtener id por la url
        const component= await getComponentById(component_id)
        res.render("componentDetails",{
            title:component.component_name,
            component:component
        })
    }catch(error){
        console.error("Error getting component details", error)
        res.status(500).send("Error getting component details")
    }

}

export const getAddComponentPage =(req, res)=>{
    res.render("addComponent", { 
        title:"Add a Component"
    })
}
export const postNewComponent =(req, res)=>{
    try{
        const { component_name, component_type, price} = req.body;

        const component_image = req.file ? req.file.path : null; // Si no se sube imagen, se asigna null
    
        createNewComponent(component_name, component_type, price, component_image)
        //falta enviar los datos a la base de datos
        console.log(`New component Created: ${component_name}, type: ${component_type}, brand: , price: ${price}, imageURL: ${component_image}`);
        res.redirect("/components");
    } catch(error){
        console.error("Error creating new component", error)
        res.status(500).send("Error creating new component")
    }

}