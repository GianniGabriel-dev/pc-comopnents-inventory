import { validationResult } from "express-validator"
import { createNewPc, deletePcFromDB, getAllComponents, getAllPcs, getPcById, insertComponentsInPc } from "../db/queries.js"
import { validateNewPc } from "../validators/pcValidator.js"

// pagina pricnipal donde se muestran todos los pcs creados
export const getHomePage = async(req, res)=>{
    try{
        const pcs = await getAllPcs()
 
        res.render("home", { 
            title:"Home Page",
            pcs:pcs,
            path: req.path
        })
        
    }catch(error){
        console.error("Error getting pcs", error)
        res.status(500).send("Error getting pcs")
    }

}

// pagina en la que aparece detalles de un pc seleccionado por el usario
export const getPcPage = async(req, res)=>{
    try{
        const { pc_id } = req.params//obtener id por la url
        const pc= await getPcById(pc_id)
        console.log(pc)
        res.render("pcDetails",{
            title:"PC Details",
            pc:pc,
            path: req.path
        })
    }catch(error){
        console.error("Error getting pc details", error)
        res.status(500).send("Error getting pc details")

    }

}

//pagina de creacion de un nuevo pc
export const getCreatePage = async(req, res)=>{
    try{
        const components= await getAllComponents() //se obtiene todos los componentes de la base de datos para mostralos en los input del formulario
        res.render("createPc", { 
            title:"Create PC",
            components:components,
            path: req.path
        })
    }catch(error){
        console.error("Error getting components", error)
        res.status(500).send("Error getting components")
    }
}

//peticion post para crear un nuevo pc
export const postNewPc = [
    validateNewPc, //se valida el formulario con express-validator
    
    async(req, res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            try {
                const components = await getAllComponents(); //obtener componentes de nuevo para renderizar la pagina otra vez
                return res.status(400).render("createPc", {
                    errors: errors.array(),
                    title: "Create PC",
                    components:components,
                });
            } catch (error) {
                console.error("Error getting components after validation fail", error);
                return res.status(500).send("Error loading form data");
            }
        }
        try{
            console.log("Formulario recibido", req.body);
            const { name, cpu, gpu, ram, storage, motherboard, psu, pcCase, cooler } = req.body; //se recogen del body de la peticion los datos del formulario
        
            const pcID=  await createNewPc(name) //se crea el nuevo pc en la base de datos y se obtiene su id
            await insertComponentsInPc(cpu, gpu, ram, storage, motherboard, psu, pcCase, cooler, pcID) //se insertan los componentes del pc creado en la base de datos
        
            console.log(`New PC Created: ${name}, CPU: ${cpu}, GPU: ${gpu}, RAM: ${ram}, Storage: ${storage}`);
            res.redirect("/");
        }catch(error){
            console.error("Error creating new pc", error)
            res.status(500).send("Error creating new pc")
        }
    
    }
]
export const deletePc = async (req, res) => {
    const { pc_id } = req.params;
    const deleted = await deletePcFromDB(pc_id);
    if (!deleted) {
      return res.status(404).json({ message: 'PC not found' });
    }
    res.status(200).json({ message: 'PC deleted successfully' });
  };