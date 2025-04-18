import { pool } from "./pool.js"

//obtner todos los pcs creados
export const getAllPcs= async ()=>{
    const [rows]= await pool.query("SELECT * FROM created_pcs")
    return rows
}
//obtener un pc por su id
export const getPcById= async (pc_id)=>{
    const [rows]= await pool.query(`
            SELECT 
                created_pcs.pc_id,
                created_pcs.pc_name,
                components.component_name,
                components.component_type,
                components.brand,
                components.price,
                components.component_image
                FROM components_pc
                JOIN created_pcs ON components_pc.pc_id = created_pcs.pc_id
                JOIN components ON components_pc.component_id = components.component_id
                WHERE components_pc.pc_id = (?);
        `, [pc_id])
    return rows
}
//obtner todos los componentes
export const getAllComponents= async ()=>{
    const [rows]= await pool.query("SELECT * FROM components")
    return rows
}
export const createNewComponent= async (componentName, type, brand, price, image)=>{
    const [rows]= await pool.query("INSERT INTO components (component_name, component_type, brand, price, component_image) VALUES (?, ?, ?, ?, ?)", [componentName, type, brand, price, image])
    return rows
}