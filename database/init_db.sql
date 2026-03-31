CREATE DATABASE IF NOT EXISTS app_recetas;
USE app_recetas;

-- Eliminar tablas si ya existen
DROP TABLE IF EXISTS lista_recetas;
DROP TABLE IF EXISTS listas;
DROP TABLE IF EXISTS favoritos;
DROP TABLE IF EXISTS receta_categorias;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS ingredientes;
DROP TABLE IF EXISTS recuperacion_password;
DROP TABLE IF EXISTS recetas;
DROP TABLE IF EXISTS usuarios;

-- ==========================================
-- CREACIÓN DE TABLAS
-- ==========================================

CREATE TABLE usuarios (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    alergias TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recetas (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    preparacion TEXT,
    tiempo_minutos INT,
    imagen_url VARCHAR(500),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingredientes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    receta_id BIGINT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    cantidad DECIMAL(10,2),
    unidad VARCHAR(50),
    FOREIGN KEY (receta_id) REFERENCES recetas(id) ON DELETE CASCADE
);

CREATE TABLE categorias (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE receta_categorias (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    receta_id BIGINT NOT NULL,
    categoria_id BIGINT NOT NULL,
    FOREIGN KEY (receta_id) REFERENCES recetas(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE,
    UNIQUE (receta_id, categoria_id)
);

CREATE TABLE favoritos (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    receta_id BIGINT NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (receta_id) REFERENCES recetas(id) ON DELETE CASCADE,
    UNIQUE (usuario_id, receta_id)
);

CREATE TABLE listas (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    imagen_url VARCHAR(500),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE (usuario_id, nombre)
);

CREATE TABLE lista_recetas (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    lista_id BIGINT NOT NULL,
    receta_id BIGINT NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lista_id) REFERENCES listas(id) ON DELETE CASCADE,
    FOREIGN KEY (receta_id) REFERENCES recetas(id) ON DELETE CASCADE,
    UNIQUE (lista_id, receta_id)
);

CREATE TABLE recuperacion_password (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    fecha_expiracion DATETIME NOT NULL,
    usado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ==========================================
-- INSERCIÓN DE DATOS DE PRUEBA (MOCKS)
-- ==========================================

-- 1. Usuarios
INSERT INTO usuarios (nombre, apellidos, correo, password, alergias) VALUES 
('Borja', 'García', 'test@app.com', '123456', 'Ninguna'),
('Ana', 'López', 'ana.lopez@app.com', 'hasheado123', 'Lactosa'),
('Carlos', 'Martínez', 'carlos.m@app.com', 'hasheado123', 'Ninguna'),
('Laura', 'Gómez', 'laura.g@app.com', 'hasheado123', 'Gluten');

-- 2. Categorías
INSERT IGNORE INTO categorias (nombre) VALUES 
('Vegetariano'), ('Vegano'), ('Desayunos'), ('Comidas'), ('Cenas'), ('Postres'), ('Sin Gluten'), ('Rápido');

-- 3. Recetas
INSERT INTO recetas (titulo, descripcion, preparacion, tiempo_minutos, imagen_url) VALUES 
('Pizza Margarita', 'Clásica pizza italiana con albahaca.', '1. Amasar 2. Poner tomate y queso 3. Hornear a 220º 15 min.', 25, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002'),
('Ensalada César', 'Fresca ensalada con pollo y salsa César.', '1. Cortar lechuga 2. Hacer pollo a la plancha 3. Mezclar con salsa.', 15, 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9'),
('Tortitas de Avena', 'Desayuno saludable y rápido ideal para empezar el día de forma sana.', '1. Triturar avena. 2. Mezclar con huevo y plátano. 3. Hacer a la plancha vuelta y vuelta.', 15, 'https://images.unsplash.com/photo-1528207776546-365bb710ee93'),
('Curry de Garbanzos', 'Plato vegano lleno de sabor y especias tradicionales orientales.', '1. Sofreír cebolla. 2. Añadir especias y tomate. 3. Cocer garbanzos y leche de coco 10 min.', 25, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe'),
('Brownie de Chocolate', 'Postre clásico, muy denso y jugoso por dentro.', '1. Fundir chocolate y mantequilla. 2. Mezclar huevos y azúcar. 3. Hornear a 180º 20 min.', 40, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c'),
('Tacos al Pastor', 'Auténtico sabor de la calle mexicana en tu propia casa.', '1. Macerar pollo con achiote. 2. Freír en sartén. 3. Servir en tortillas con piña y cilantro.', 30, 'https://images.unsplash.com/photo-1565299585323-38d6b0865bfc'),
('Batido Verde', 'Smoothie detox con espinacas y manzana, ideal después de entrenar.', '1. Lavar ingredientes. 2. Triturar todo en la batidora con hielo picado.', 5, 'https://images.unsplash.com/photo-1610832958506-aa56368176cf');

-- 4. Ingredientes
SET @id_pizza = (SELECT id FROM recetas WHERE titulo = 'Pizza Margarita' LIMIT 1);
INSERT INTO ingredientes (receta_id, nombre, cantidad, unidad) VALUES 
(@id_pizza, 'Masa para pizza', 1, 'unidad'), (@id_pizza, 'Salsa de tomate', 150, 'ml'), (@id_pizza, 'Queso mozzarella', 200, 'g');

SET @id_ensalada = (SELECT id FROM recetas WHERE titulo = 'Ensalada César' LIMIT 1);
INSERT INTO ingredientes (receta_id, nombre, cantidad, unidad) VALUES 
(@id_ensalada, 'Lechuga romana', 1, 'unidad'), (@id_ensalada, 'Pechuga de pollo', 200, 'g'), (@id_ensalada, 'Salsa César', 50, 'ml');

SET @id_tortitas = (SELECT id FROM recetas WHERE titulo = 'Tortitas de Avena' LIMIT 1);
INSERT INTO ingredientes (receta_id, nombre, cantidad, unidad) VALUES 
(@id_tortitas, 'Avena', 60, 'g'), (@id_tortitas, 'Huevo', 1, 'unidad'), (@id_tortitas, 'Plátano maduro', 1, 'unidad'), (@id_tortitas, 'Leche o bebida vegetal', 50, 'ml');

SET @id_curry = (SELECT id FROM recetas WHERE titulo = 'Curry de Garbanzos' LIMIT 1);
INSERT INTO ingredientes (receta_id, nombre, cantidad, unidad) VALUES 
(@id_curry, 'Garbanzos cocidos', 400, 'g'), (@id_curry, 'Espinacas frescas', 150, 'g'), (@id_curry, 'Leche de coco', 250, 'ml'), (@id_curry, 'Curry en polvo', 2, 'cucharadas');

SET @id_brownie = (SELECT id FROM recetas WHERE titulo = 'Brownie de Chocolate' LIMIT 1);
INSERT INTO ingredientes (receta_id, nombre, cantidad, unidad) VALUES 
(@id_brownie, 'Chocolate negro 70%', 200, 'g'), (@id_brownie, 'Mantequilla', 100, 'g'), (@id_brownie, 'Huevos', 3, 'unidades'), (@id_brownie, 'Azúcar', 150, 'g'), (@id_brownie, 'Harina', 80, 'g');

SET @id_tacos = (SELECT id FROM recetas WHERE titulo = 'Tacos al Pastor' LIMIT 1);
INSERT INTO ingredientes (receta_id, nombre, cantidad, unidad) VALUES 
(@id_tacos, 'Pollo', 500, 'g'), (@id_tacos, 'Tortillas de maíz', 8, 'unidades'), (@id_tacos, 'Piña en trozos', 100, 'g');

SET @id_batido = (SELECT id FROM recetas WHERE titulo = 'Batido Verde' LIMIT 1);
INSERT INTO ingredientes (receta_id, nombre, cantidad, unidad) VALUES 
(@id_batido, 'Espinacas', 1, 'taza'), (@id_batido, 'Manzana verde', 1, 'unidad');

-- 5. Recetas-Categorías
-- Pizza(Cenas=5, Vegetariano=1)
INSERT INTO receta_categorias (receta_id, categoria_id) VALUES (@id_pizza, 5), (@id_pizza, 1);
-- Ensalada(Comidas=4)
INSERT INTO receta_categorias (receta_id, categoria_id) VALUES (@id_ensalada, 4);
-- Tortitas(Desayunos=3, Vegetariano=1, Rápido=8)
INSERT INTO receta_categorias (receta_id, categoria_id) VALUES (@id_tortitas, 3), (@id_tortitas, 1), (@id_tortitas, 8);
-- Curry(Vegano=2, Comidas=4, Sin Gluten=7)
INSERT INTO receta_categorias (receta_id, categoria_id) VALUES (@id_curry, 2), (@id_curry, 4), (@id_curry, 7);
-- Brownie(Postres=6, Vegetariano=1)
INSERT INTO receta_categorias (receta_id, categoria_id) VALUES (@id_brownie, 6), (@id_brownie, 1);
-- Tacos(Comidas=4, Cenas=5, Sin Gluten=7)
INSERT INTO receta_categorias (receta_id, categoria_id) VALUES (@id_tacos, 4), (@id_tacos, 5), (@id_tacos, 7);
-- Batido(Desayunos=3, Vegano=2, Rápido=8, Sin Gluten=7)
INSERT INTO receta_categorias (receta_id, categoria_id) VALUES (@id_batido, 3), (@id_batido, 2), (@id_batido, 8), (@id_batido, 7);

-- 6. Favoritos y Listas
SET @id_borja = (SELECT id FROM usuarios WHERE nombre = 'Borja' LIMIT 1);
SET @id_ana = (SELECT id FROM usuarios WHERE nombre = 'Ana' LIMIT 1);
SET @id_carlos = (SELECT id FROM usuarios WHERE nombre = 'Carlos' LIMIT 1);

-- Listas por defecto de Borja
INSERT INTO listas (usuario_id, nombre) VALUES 
(@id_borja, 'DESAYUNO'), (@id_borja, 'ALMUERZO'), (@id_borja, 'COMIDA'), (@id_borja, 'MERIENDA'), (@id_borja, 'CENA');

-- Favoritos
INSERT INTO favoritos (usuario_id, receta_id) VALUES 
(@id_borja, @id_pizza), (@id_ana, @id_curry), (@id_carlos, @id_tacos);

-- Añadimos recetas a Listas de Borja
SET @lista_cena_borja = (SELECT id FROM listas WHERE nombre = 'CENA' AND usuario_id = @id_borja LIMIT 1);
INSERT INTO lista_recetas (lista_id, receta_id) VALUES 
(@lista_cena_borja, @id_pizza), (@lista_cena_borja, @id_tacos);

-- Listas de Ana y Carlos
INSERT INTO listas (usuario_id, nombre) VALUES (@id_ana, 'Detox / Saludable'), (@id_carlos, 'Cheat Meals');

SET @lista_detox_ana = (SELECT id FROM listas WHERE nombre = 'Detox / Saludable' AND usuario_id = @id_ana LIMIT 1);
INSERT INTO lista_recetas (lista_id, receta_id) VALUES (@lista_detox_ana, @id_batido), (@lista_detox_ana, @id_curry);

SET @lista_cheat_carlos = (SELECT id FROM listas WHERE nombre = 'Cheat Meals' AND usuario_id = @id_carlos LIMIT 1);
INSERT INTO lista_recetas (lista_id, receta_id) VALUES (@lista_cheat_carlos, @id_brownie), (@lista_cheat_carlos, @id_pizza);
