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
  ('Ryzen 5 5600X', 'CPU', 199.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091706/1101-amd-ryzen-5-5600x-37ghz_pmlsf2.webp'),
  ('GeForce RTX 3060', 'GPU', 329.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1343-gigabyte-geforce-rtx-3060-gaming-oc-12gb-gddr6-rev-20_a9ymo2.webp'),
  ('Vengeance LPX 16GB', 'RAM', 89.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091706/112-corsair-vengeance-lpx-ddr4-2933mhz-16gb-2x8gb-cl16-negro_ni0uln.webp'),
  ('WD BLACK SN750 1TB SE NVMe SSD', 'Storage', 119.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1594-wd-black-sn750-1tb-se-nvme-ssd_yjbuhe.webp'),
  ('B550 Tomahawk', 'Motherboard', 149.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091706/1948-msi-mag-b550-tomahawk-max-wifi_ruvjm8.webp'),
  ('Corsair RM750x 750W', 'PSU', 129.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1493-corsair-rm750x-shift-750w-80-plus-gold-modular-mejor-precio_m09zdq.webp'),
  ('NZXT H510', 'Case',  69.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091706/1743-nzxt-h5-flow-2024-midi-tower-e-atx-cristal-templado-usb-c-negra-f647c757-9a54-40c3-8d60-e76d7ffd10d3_jhlq4m.webp'),
  ('Intel Core i5-12400F', 'CPU',  179.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1636-intel-core-i5-12400f-44-ghz_hk6jvi.webp'),
  ('ASUS GeForce RTX 4060 Ti', 'GPU', 399.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1788-asus-dual-geforce-rtx-4060-ti-evo-oc-edition-8gb-gddr6-dlss3_bxt15t.webp'),
  ('Kingston Fury 32GB', 'RAM',  124.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1410-kingston-fury-beast-ddr5-6000mhz-32gb-2x16gb-cl30_rpwtqy.webp'),
  ('Kioxia Exceria G2 2TB NVMe SSD', 'Storage', 159.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1256-kioxia-exceria-g2-unidad-ssd-2tb-nvme-m2-2280_nkmwew.webp'),
  ('Z690 AORUS ELITE', 'Motherboard',  189.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091706/1931-gigabyte-z690-aorus-elite-ddr4_rqsuvp.webp'),
  ('Seasonic Focus 650W', 'PSU',  99.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091706/1331860_tuqd5e.jpg'),
  ('Lian Li LANCOOL 215', 'Case',  79.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1282-lian-li-lancool-215-midi-tower-cristal-templado-usb-32-blanca-foto_fpb023.webp'),
  ('Cooler Master Hyper 212', 'Cooler',  39.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091706/196-cooler-master-hyper-212-black-am5-ventilador-cpu-120mm-negro_v8ekud.webp'),
  ('NZXT Kraken X63', 'Cooler',  149.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1885-nzxt-kraken-x63-rgb-kit-de-refrigeracion-liquida_r0hbxv.jpg');

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