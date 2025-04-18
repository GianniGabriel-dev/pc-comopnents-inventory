import { getAllPcs, getPcById } from "../db/queries.js"

// pagina pricnipal donde se muestran todos los pcs creados
export const getHomePage = async(req, res)=>{
    const pcs = await getAllPcs()
    console.log(pcs)
    res.render("home", { 
        title:"Home Page",
        pcs:pcs
    })
}

// pagina en la que aparece detalles de un pc seleccionado por el usario
export const getPcPage = async(req, res)=>{
    const { pc_id } = req.params//obtener id por la url
    const pc= await getPcById(pc_id)
    res.render("pcDetails",{
        title:"PC Details",
        pc:pc
    })
}

//pagina de creacion de un nuevo pc
export const getCreatePage =(req, res)=>{
    res.render("createPc", { 
        title:"Create PC"
    })
}

//peticion post para crear un nuevo pc
export const postNewPc =(req, res)=>{
    const { name, cpu, gpu, ram, storage } = req.body;
    //falta enviar los datos a la base de datos
    console.log(`New PC Created: ${name}, CPU: ${cpu}, GPU: ${gpu}, RAM: ${ram}, Storage: ${storage}`);
    res.redirect("/");
}