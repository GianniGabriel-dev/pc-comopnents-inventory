import { createNewPc, getAllComponents, getAllPcs, getPcById, insertComponentsInPc } from "../db/queries.js"

// pagina pricnipal donde se muestran todos los pcs creados
export const getHomePage = async(req, res)=>{
    const pcs = await getAllPcs()
 
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
export const getCreatePage = async(req, res)=>{
    const components= await getAllComponents() //se obtiene todos los componentes de la base de datos para mostralos en los input del formulario
    res.render("createPc", { 
        title:"Create PC",
        components:components
    })
}

//peticion post para crear un nuevo pc
export const postNewPc = async(req, res)=>{
    console.log("Formulario recibido", req.body);
    const { name, cpu, gpu, ram, storage, motherboard, psu, pcCase, cooler } = req.body; //se recogen del body de la peticion los datos del formulario

    const pcID=  await createNewPc(name) //se crea el nuevo pc en la base de datos y se obtiene su id
    await insertComponentsInPc(cpu, gpu, ram, storage, motherboard, psu, pcCase, cooler, pcID) //se insertan los componentes del pc creado en la base de datos

    //falta enviar los datos a la base de datos
    console.log(`New PC Created: ${name}, CPU: ${cpu}, GPU: ${gpu}, RAM: ${ram}, Storage: ${storage}`);
    res.redirect("/");
}