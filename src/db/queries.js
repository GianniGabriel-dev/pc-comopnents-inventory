//obtner todos los pcs creados
export const getAllPcs= async ()=>{
    const [rows]= await pool.query("SELECT * FROM created_pcs")
    return rows
}
//obtner todos los componentes
export const getAllComponents= async ()=>{
    const [rows]= await pool.query("SELECT * FROM components")
    return rows
}