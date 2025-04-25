import { pool } from "./pool.js";

//obtner todos los pcs creados
export const getAllPcs = async () => {
  const [rows] = await pool.query("SELECT * FROM created_pcs");
  return rows;
};
//obtener un pc por su id
export const getPcById = async (pc_id) => {
  const [rows] = await pool.query(
    `
    SELECT 
      created_pcs.pc_id,
      created_pcs.pc_name,
      components.component_id,
      components.component_name,
      components.component_type,
      components.price,
      components.component_image
    FROM components_pc
    JOIN created_pcs ON components_pc.pc_id = created_pcs.pc_id
    JOIN components ON components_pc.component_id = components.component_id
    WHERE components_pc.pc_id = (?);
  `,
    [pc_id]
  );

  // Transformar el array en un objeto con keys por tipo pc[ CPU:{}, GPU:{}, ...]
  const pc = {};
  rows.forEach((component) => {
    pc[component.component_type] = component;
  });

  // Agregar nombre del PC como propiedad aparte
  pc.pc_name = rows[0]?.pc_name;
  pc.pc_id = rows[0]?.pc_id;

  return pc;
};

//obtner todos los componentes
export const getAllComponents = async () => {
  const [rows] = await pool.query("SELECT * FROM components");
  return rows;
};
//obtener un componente por su id
export const getComponentById = async (component_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM components WHERE component_id = ?",
    [component_id]
  );
  return rows[0];
};
export const createNewComponent = async (componentName, type, price, image) => {
  const [rows] = await pool.execute(
    //execute se usa caundo haces opercaiones como insert, update o delete, ya que no devuelve un array de objetos, sino un array con el resultado de la consulta
    "INSERT INTO components (component_name, component_type, price, component_image) VALUES (?, ?, ?, ?)",
    [componentName, type, price, image]
  );
  return rows;
};

export const createNewPc = async (pc_name) => {
  const [rows] = await pool.query(
    "INSERT INTO created_pcs (pc_name) VALUES (?)",
    [pc_name]
  );
  return rows.insertId; //da el id del ultimo elemnto insertado, este tiene un id autoincremental
};
export const insertComponentsInPc = async (
  cpu,
  gpu,
  ram,
  storage,
  motherboard,
  psu,
  pcCase,
  cooler,
  pcId
) => {
  // los componentes obligatorios deben estar presentes
  if (!cpu || !psu || !ram || !storage || !motherboard) {
    throw new Error("CPU, GPU, RAM, and Storage are required components.");
  }
  // crear el array con los componentes obligatorios
  const values = [
    [cpu, pcId],
    [psu, pcId],
    [ram, pcId],
    [storage, pcId],
    [motherboard, pcId],
  ];

  // agregar los componentes opcionales si están presentes
  if (gpu) values.push([gpu, pcId]);
  if (pcCase) values.push([pcCase, pcId]);
  if (cooler) values.push([cooler, pcId]);

  // mapea values para crear un string de placeholders "(?, ?), (?, ?), (?, ?)," para la consulta SQL
  const placeholders = values.map(() => "(?, ?)").join(", ");

  // convierte el array de arrays en un solo array, ya que la pool.query espera un array de valores
  const flattenedValues = values.flat();
  const [rows] = await pool.execute(
    `INSERT INTO components_pc (component_id, pc_id) VALUES ${placeholders}`,
    flattenedValues
  );

  return rows;
};

// conusltas para eliminar componentes y pcs creados de la base de datos
export const deletePcFromDB = async (pcId) => {
  const [rows] = await pool.execute("DELETE FROM created_pcs WHERE pc_id = ?", [
    pcId,
  ]);
  return rows.affectedRows > 0; //devuelve true si elimina el pc y false si no pudo hacerlo
};
export const deleteComponentFromDB = async (componentId) => {
  const [rows] = await pool.execute(
    "DELETE FROM components WHERE component_id = ?",
    [componentId]
  );
  return rows.affectedRows > 0; //devuelve true si elimina el componente y false si no pudo hacerlo
};
//consultas par editar componentes y pcs ya creados
export const updatePcNameFromDB = async (pc_name, pcId) => {
  const [rows] = await pool.execute(
    "UPDATE created_pcs SET pc_name= ? WHERE pc_id = ?",
    [pc_name, pcId]
  );
  return rows.affectedRows > 0; //devuelve true si edita el pc y false si no pudo
};

export const updateComponentFromDB = async (
  componentId,
  componentName,
  type,
  price,
  image
) => {
  const [rows] = await pool.execute(
    "UPDATE components SET component_name= ?, component_type= ?, price= ?, component_image= ? WHERE component_id = ?",
    [componentName, type, price, image, componentId]
  );
  return rows.affectedRows > 0; //devuelve true si edita el componente y false si no pudo
};

export const updateComponentsInPc = async (
  cpu,
  gpu,
  ram,
  storage,
  motherboard,
  psu,
  pcCase,
  cooler,
  pcId
) => {
  // los componentes obligatorios deben estar presentes
  if (!cpu || !psu || !ram || !storage || !motherboard) {
    throw new Error("CPU, PSU, RAM, Storage y Motherboard son obligatorios.");
  }

  // se elimina todos los componentes asociados previamente a ese PC
  await pool.execute("DELETE FROM components_pc WHERE pc_id = ?", [pcId]);

  // crea el array con los componentes obligatorios
  const values = [
    [cpu, pcId],
    [psu, pcId],
    [ram, pcId],
    [storage, pcId],
    [motherboard, pcId],
  ];

  // agregar los componentes opcionales si están presentes
  if (gpu) values.push([gpu, pcId]);
  if (pcCase) values.push([pcCase, pcId]);
  if (cooler) values.push([cooler, pcId]);

  // mapea values para crear un string de placeholders "(?, ?), (?, ?), (?, ?)," para la consulta SQL
  const placeholders = values.map(() => "(?, ?)").join(", ");

  // convierte el array de arrays en un solo array, ya que la pool.query espera un array de valores
  const flattenedValues = values.flat();

  const [rows] = await pool.execute(
    `INSERT INTO components_pc (component_id, pc_id) VALUES ${placeholders}`,
    flattenedValues
  );

  return rows.affectedRows > 0;
};
