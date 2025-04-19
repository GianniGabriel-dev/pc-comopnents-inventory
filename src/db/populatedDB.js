//este script se encarga de poblar la base de datos con datos iniciales
//se ejecuta una vez al inicio de la aplicación con node src/db/populatedDB.js
import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";

const SQL = `
CREATE TABLE IF NOT EXISTS components (
  component_id INT AUTO_INCREMENT PRIMARY KEY,
  component_name VARCHAR(250) NOT NULL,
  component_type VARCHAR(100) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  component_image TEXT
);

CREATE TABLE IF NOT EXISTS created_pcs (
  pc_id INT AUTO_INCREMENT PRIMARY KEY,
  pc_name VARCHAR(250) NOT NULL,
  created_by VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS components_pc (
  component_id INT NOT NULL,
  pc_id INT NOT NULL,
  id INT AUTO_INCREMENT PRIMARY KEY,
  FOREIGN KEY(component_id) REFERENCES components(component_id),
  FOREIGN KEY(pc_id) REFERENCES created_pcs(pc_id)
);

-- Insertar datos en components
INSERT INTO components (component_name, component_type, price, component_image)
VALUES 
  ('Ryzen 5 5600X', 'CPU', 199.99, 'https://example.com/5600x.jpg'),
  ('GeForce RTX 3060', 'GPU', 329.99, 'https://example.com/3060.jpg'),
  ('Vengeance LPX 16GB', 'RAM', 89.99, 'https://example.com/vengeance.jpg'),
  ('1TB NVMe SSD', 'Storage', 119.99, 'https://example.com/ssd.jpg'),
  ('B550 Tomahawk', 'Motherboard', 149.99, 'https://example.com/b550.jpg'),
  ('RM750x 750W', 'PSU', 129.99, 'https://example.com/rm750x.jpg'),
  ('NZXT H510', 'Case',  69.99, 'https://example.com/h510.jpg'),
  ('Intel Core i5-12400F', 'CPU',  179.99, 'https://example.com/i5.jpg'),
  ('GeForce RTX 4060 Ti', 'GPU', 399.99, 'https://example.com/4060ti.jpg'),
  ('Kingston Fury 32GB', 'RAM',  124.99, 'https://example.com/fury32.jpg'),
  ('2TB NVMe SSD', 'Storage', 159.99, 'https://example.com/ssd2tb.jpg'),
  ('Z690 AORUS ELITE', 'Motherboard',  189.99, 'https://example.com/z690.jpg'),
  ('Seasonic Focus 650W', 'PSU',  99.99, 'https://example.com/focus650.jpg'),
  ('Lian Li LANCOOL 215', 'Case',  79.99, 'https://example.com/lancool.jpg'),
  ('Cooler Master Hyper 212', 'Cooler',  39.99, 'https://example.com/hyper212.jpg'),
  ('NZXT Kraken X63', 'Cooler',  149.99, 'https://example.com/krakenx63.jpg');

-- Insertar datos en created_pcs
INSERT INTO created_pcs (pc_name, created_by)
VALUES 
  ('Gaming Beast', 'Gianni'),
  ('Workstation Pro', 'Pepe'),
  ('Budget Build', 'Ernesto');

-- Insertar datos en components_pc
-- Gaming Beast (Ryzen + 3060)
INSERT INTO components_pc (component_id, pc_id)
VALUES 
  (1, 1), -- CPU Ryzen 5
  (2, 1), -- GPU 3060
  (3, 1), -- RAM
  (4, 1), -- SSD
  (5, 1), -- Motherboard B550
  (6, 1), -- PSU 750W
  (7, 1), -- Caja NZXT
  (15, 1); -- Cooler Master

-- Workstation Pro (Intel + 4060 Ti)
INSERT INTO components_pc (component_id, pc_id)
VALUES 
  (8, 2), -- CPU i5
  (9, 2), -- GPU 4060 Ti
  (10, 2), -- RAM 32GB
  (11, 2), -- SSD 2TB
  (12, 2), -- Motherboard Z690
  (13, 2), -- PSU Seasonic
  (14, 2), -- Caja Lian Li
  (16, 2); -- Cooler Kraken

-- Budget Build (solo CPU, RAM, placa, sin GPU)
INSERT INTO components_pc (component_id, pc_id)
VALUES 
  (8, 3), -- CPU i5
  (10, 3), -- RAM 32GB
  (12, 3), -- Motherboard Z690
  (13, 3), -- PSU
  (14, 3), -- Caja
  (15, 3); -- Cooler Master
`;

async function main() {
  console.log("seeding...");

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  await connection.query(SQL);
  await connection.end();

  console.log("done");
}

main();