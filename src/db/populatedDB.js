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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS components_pc (
  component_id INT NOT NULL,
  pc_id INT NOT NULL,
  id INT AUTO_INCREMENT PRIMARY KEY,
  FOREIGN KEY(component_id) REFERENCES components(component_id) ON DELETE CASCADE,
  FOREIGN KEY(pc_id) REFERENCES created_pcs(pc_id) ON DELETE CASCADE
);

-- Insertar datos en components
INSERT INTO components (component_name, component_type, price, component_image)
VALUES 
  ('Ryzen 5 5600X', 'CPU', 202.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091706/1101-amd-ryzen-5-5600x-37ghz_pmlsf2.webp'),
  ('GeForce RTX 3060', 'GPU', 326.50, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1343-gigabyte-geforce-rtx-3060-gaming-oc-12gb-gddr6-rev-20_a9ymo2.webp'),
  ('Vengeance LPX 16GB', 'RAM', 87.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091706/112-corsair-vengeance-lpx-ddr4-2933mhz-16gb-2x8gb-cl16-negro_ni0uln.webp'),
  ('WD BLACK SN750 1TB SE NVMe SSD', 'Storage', 123.80, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1594-wd-black-sn750-1tb-se-nvme-ssd_yjbuhe.webp'),
  ('B550 Tomahawk', 'Motherboard', 152.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091706/1948-msi-mag-b550-tomahawk-max-wifi_ruvjm8.webp'),
  ('Corsair RM750x 750W', 'PSU', 131.10, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1493-corsair-rm750x-shift-750w-80-plus-gold-modular-mejor-precio_m09zdq.webp'),
  ('NZXT H510', 'Case',  73.70, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091706/1743-nzxt-h5-flow-2024-midi-tower-e-atx-cristal-templado-usb-c-negra-f647c757-9a54-40c3-8d60-e76d7ffd10d3_jhlq4m.webp'),
  ('Cooler Master Hyper 212', 'Cooler',  42.30, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091706/196-cooler-master-hyper-212-black-am5-ventilador-cpu-120mm-negro_v8ekud.webp'),
  ('Intel Core i5-12400F', 'CPU', 177.00, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1636-intel-core-i5-12400f-44-ghz_hk6jvi.webp'),
  ('ASUS GeForce RTX 4060 Ti', 'GPU', 395.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1788-asus-dual-geforce-rtx-4060-ti-evo-oc-edition-8gb-gddr6-dlss3_bxt15t.webp'),
  ('Kingston Fury 32GB', 'RAM', 126.80, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1410-kingston-fury-beast-ddr5-6000mhz-32gb-2x16gb-cl30_rpwtqy.webp'),
  ('Kioxia Exceria G2 2TB NVMe SSD', 'Storage', 162.75, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1256-kioxia-exceria-g2-unidad-ssd-2tb-nvme-m2-2280_nkmwew.webp'),
  ('Z690 AORUS ELITE', 'Motherboard', 193.60, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091706/1931-gigabyte-z690-aorus-elite-ddr4_rqsuvp.webp'),
  ('Seasonic Focus 650W', 'PSU',  97.20, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091706/1331860_tuqd5e.jpg'),
  ('Lian Li LANCOOL 215', 'Case',  82.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1282-lian-li-lancool-215-midi-tower-cristal-templado-usb-32-blanca-foto_fpb023.webp'),
  ('NZXT Kraken X63', 'Cooler', 146.50, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745091705/1885-nzxt-kraken-x63-rgb-kit-de-refrigeracion-liquida_r0hbxv.jpg'),
  ('AMD Ryzen 7 5800X', 'CPU', 252.10, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745680363/168-amd-ryzen-7-5800x-38ghz_wkvrgb.webp'),
  ('NVIDIA GeForce RTX 4070', 'GPU', 591.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745680233/1252-gigabyte-geforce-rtx-4070-windforce-oc-v2-12gb-gddr6-dlss3-638b39cc-a3ad-4e4d-8be6-9d72f57a1b76_e1rtmh.webp'),
  ('Corsair Vengeance RGB Pro 32GB', 'RAM', 142.95, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745680108/1974-corsair-vengeance-rgb-pro-ddr4-2933mhz-32gb-2x16gb-cl16_xebb7o.webp'),
  ('Samsung 980 Pro 1TB NVMe SSD', 'Storage', 132.10, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745680023/1467-samsung-980-ssd-1tb-pcie-30-nvme-m2_ufhgui.webp'),
  ('ASUS ROG STRIX B550-F', 'Motherboard', 175.50, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745679862/1454-asus-rog-strix-b550-f-gaming_fm2qiy.webp'),
  ('Be quiet! Pure Power 11 700W', 'PSU', 106.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745679747/1_bzu2nj.webp'),
  ('Fractal Design Meshify C', 'Case',  97.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745679476/1984-fractal-design-meshify-2-compact-black-solid-mid-tower-usb-32-negra_geuxxa.webp'),
  ('Be quiet! Dark Rock Pro 4', 'Cooler', 91.20, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745679203/1711-be-quiet-dark-rock-pro-4-foto_vb1wzd.webp'),
  ('Intel Core i7-13700K', 'CPU', 405.80, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745680309/1196-intel-core-i7-13700k-34-ghz-box_gbtpi8.webp'),
  ('AMD Radeon RX 7800 XT', 'GPU', 507.30, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745680184/1636-sapphire-pulse-amd-radeon-rx-7800-xt-gaming-16gb-gddr6_drejbv.webp'),
  ('G.Skill Trident Z5 32GB', 'RAM', 162.40, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745680066/1167-gskill-trident-z5-ddr5-6400mhz-32gb-2x16gb-cl32-negro_mxoon4.webp'),
  ('Crucial P5 Plus 500GB NVMe SSD', 'Storage', 112.80, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745679957/1771-crucial-p5-plus-500gb-ssd-m2-2280-pcie-40_ljgsbp.webp'),
  ('MSI PRO Z690-A', 'Motherboard', 206.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745679816/1978-msi-pro-z690-a_gyrquh.jpg'),
  ('EVGA SuperNOVA 850 P6', 'PSU', 132.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745679648/1284-evga-supernova-850-p6-850w-80-plus-platinum-modular_eahvnc.webp'),
  ('Phanteks Eclipse P400A', 'Case', 92.60, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745679533/1129-phanteks-eclipse-g400a-d-rgb-mid-tower-eatx-cristal-templado-usb-c-blanca_qxxlls.webp'),
  ('Arctic Liquid Freezer II 280', 'Cooler', 121.99, 'https://res.cloudinary.com/dssbrks07/image/upload/v1745679266/1900-arctic-liquid-freezer-ii-280-a-rgb-kit-de-refrigeracion-liquida_vaeu47.webp');

-- Insertar datos en created_pcs
INSERT INTO created_pcs (pc_name)
VALUES 
  ('Gaming Beast'),
  ('Workstation Pro'),
  ('Budget Build'),
  ('Ultimate Gaming PC'),
  ('Silent Workstation');

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


-- Insertar componentes en "Ultimate Gaming PC" (Ryzen 7 + RTX 4070)
INSERT INTO components_pc (component_id, pc_id)
VALUES 
  (17, 4), -- AMD Ryzen 7 5800X (CPU)
  (18, 4), -- NVIDIA GeForce RTX 4070 (GPU)
  (19, 4), -- Corsair Vengeance RGB Pro 32GB (RAM)
  (20, 4), -- Samsung 980 Pro 1TB NVMe SSD (Storage)
  (21, 4), -- ASUS ROG STRIX B550-F (Motherboard)
  (22, 4), -- Be quiet! Pure Power 11 700W (PSU)
  (23, 4), -- Phanteks Eclipse P400A (Case)
  (24, 4); -- Be quiet! Dark Rock Pro 4 (Cooler)

-- Insertar componentes en "Silent Workstation" (Intel i7 + RX 7800 XT)
INSERT INTO components_pc (component_id, pc_id)
VALUES 
  (25, 5), -- Intel Core i7-13700K (CPU)
  (26, 5), -- AMD Radeon RX 7800 XT (GPU)
  (27, 5), -- G.Skill Trident Z5 32GB (RAM)
  (28, 5), -- Crucial P5 Plus 500GB NVMe SSD (Storage)
  (29, 5), -- MSI PRO Z690-A (Motherboard)
  (30, 5), -- EVGA SuperNOVA 850 P6 (PSU)
  (31, 5), -- Phanteks Eclipse P400A (Case)
  (32, 5); -- Arctic Liquid Freezer II 280 (Cooler)
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
