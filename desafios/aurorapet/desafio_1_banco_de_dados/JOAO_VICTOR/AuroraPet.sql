-- Criar o banco de dados
CREATE DATABASE AuroraPet;

USE AuroraPet;

-- =============================
-- 1. TABELA DONO
-- =============================

CREATE TABLE Dono (
    Cod_Dono INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL,
    Sobrenome VARCHAR(50) NOT NULL,
    CPF CHAR(11) UNIQUE NOT NULL,
    Cidade VARCHAR(50),
    Estado CHAR(2)
);

-- =============================
-- 2. TABELA ANIMAL (FK → Dono)
-- =============================

CREATE TABLE Animal (
    Cod_Animal INT AUTO_INCREMENT PRIMARY KEY,
    Nome_Animal VARCHAR(50) NOT NULL,
    Especie VARCHAR(30),
    Raca VARCHAR(30),
    Idade INT,
    Cod_Dono INT NOT NULL,

    CONSTRAINT fk_animal_dono
        FOREIGN KEY (Cod_Dono)
        REFERENCES Dono(Cod_Dono)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- =============================
-- 3. TABELA ESTOQUE (Serviços/Produtos)
-- =============================

CREATE TABLE Estoque (
    Cod_Estoque INT AUTO_INCREMENT PRIMARY KEY,
    Nome_Servico VARCHAR(50) NOT NULL,
    Preco DECIMAL(10,2) NOT NULL,
    Descricao TEXT
);

-- =============================
-- 4. TABELA PEDIDO (FK → Dono)
-- =============================

CREATE TABLE Pedido (
    Cod_Pedido INT AUTO_INCREMENT PRIMARY KEY,
    Cod_Dono INT NOT NULL,
    Data_Pedido DATE NOT NULL,
    Subtotal DECIMAL(10,2),

    CONSTRAINT fk_pedido_dono
        FOREIGN KEY (Cod_Dono)
        REFERENCES Dono(Cod_Dono)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ======================================
-- 5. TABELA PEDIDO_ITEM (Pedido x Estoque)
-- ======================================

CREATE TABLE Pedido_Item (
    Cod_Item INT AUTO_INCREMENT PRIMARY KEY,
    Cod_Pedido INT NOT NULL,
    Cod_Estoque INT NOT NULL,
    Quantidade INT NOT NULL DEFAULT 1,
    Valor DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_item_pedido
        FOREIGN KEY (Cod_Pedido)
        REFERENCES Pedido(Cod_Pedido)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_item_estoque
        FOREIGN KEY (Cod_Estoque)
        REFERENCES Estoque(Cod_Estoque)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
INSERT INTO Dono (Nome, Sobrenome, CPF, Cidade, Estado) VALUES
('Marcos', 'Andrade', '12345678901', 'Recife', 'PE'),
('Beatriz', 'Lima', '98765432100', 'Jaboatão', 'PE'),
('Carla', 'Santos', '45678912345', 'Olinda', 'PE');

INSERT INTO Animal (Nome_Animal, Especie, Raca, Idade, Cod_Dono) VALUES
('Rex', 'Cachorro', 'Pastor Alemão', 5, 1),
('Mimi', 'Gato', 'Persa', 3, 2),
('Thor', 'Cachorro', 'Husky', 2, 1),
('Luna', 'Gato', 'Siamês', 4, 3);

INSERT INTO Estoque (Nome_Servico, Preco, Descricao) VALUES
('Banho', 40.00, 'Banho completo para o pet'),
('Tosa', 55.00, 'Tosa higiênica e estilizada'),
('Consulta Veterinária', 120.00, 'Avaliação completa pelo veterinário'),
('Vacina V8', 90.00, 'Vacinação para cães – proteção completa');

INSERT INTO Pedido (Cod_Dono, Data_Pedido, Subtotal) VALUES
(1, '2025-11-10', 160.00),
(2, '2025-11-15', 40.00),
(3, '2025-11-17', 120.00);



