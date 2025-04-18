import { getAllComponents, getComponentById } from "../db/queries.js"

export const getComponentPage = async(req, res)=>{
    const components = await getAllComponents()
    res.render("components", { 
        title:"PC Components",
        components:components
    })
}
export const getComponentDetailsPage = async(req, res)=>{
    const { component_id } = req.params//obtener id por la url
    const component= await getComponentById(component_id)
    console.log(component)
    res.render("componentDetails",{
        title:component.component_name,
        component:component
    })
}

export const getAddComponetPage =(req, res)=>{
    res.render("addComponent", { 
        title:"Add a Component"
    })
}
export const postNewComponent =(req, res)=>{
    const { componentName, type, brand, price, image} = req.body;
    //falta enviar los datos a la base de datos
    console.log(`New component Created: ${componentName}, type: ${type}, brand: ${brand}, price: ${price}, imageURL: ${image}`);
    res.redirect("/components");
}