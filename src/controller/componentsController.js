export const getComponentPage =(req, res)=>{
    res.render("components", { 
        title:"PC Components"
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