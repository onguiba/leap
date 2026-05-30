-- Insertion des données initiales pour MALAP METSI

-- Insertion des magasins
INSERT INTO stores (name, logo, address, phone, hours, delivery, delivery_fee, min_order, rating, latitude, longitude) VALUES
('Mahima Akwa', '🏪', 'Boulevard de la Liberté, Akwa, Douala', '+237 233 42 56 78', '8h00 - 21h00', true, 500, 5000, 4.5, 4.0511, 9.7679),
('Casino Bonanjo', '🎰', 'Rue Joffre, Bonanjo, Douala', '+237 233 42 67 89', '7h30 - 22h00', true, 500, 5000, 4.3, 4.0483, 9.7043),
('Carrefour Market', '🛒', 'Avenue Charles de Gaulle, Douala', '+237 233 42 78 90', '8h00 - 22h00', true, 500, 5000, 4.6, 4.0469, 9.7071),
('Santa Lucia', '⭐', 'Rue de la Joie, Bonapriso, Douala', '+237 233 42 89 01', '7h00 - 21h30', true, 500, 5000, 4.4, 4.0556, 9.7125),
('Score Supermarché', '🏆', 'Boulevard de la République, Douala', '+237 233 42 90 12', '8h00 - 21h00', true, 500, 5000, 4.2, 4.0489, 9.7098),
('Orca Deco', '🐋', 'Rue Franqueville, Akwa, Douala', '+237 233 43 01 23', '8h30 - 21h30', true, 500, 5000, 4.3, 4.0502, 9.7654),
('Leader Price', '💰', 'Avenue Ahidjo, Douala', '+237 233 43 12 34', '7h30 - 22h00', true, 500, 5000, 4.1, 4.0478, 9.7112),
('Super U Douala', '🅿️', 'Carrefour Ndokoti, Douala', '+237 233 43 23 45', '8h00 - 21h00', true, 500, 5000, 4.4, 4.0445, 9.7189);

-- Insertion des produits (30 produits)
INSERT INTO products (name, image, category, barcode, description) VALUES
('Lait Entier Bio 1L', '🥛', 'Produits laitiers', '3760074380534', 'Lait entier biologique de qualité supérieure'),
('Pain Complet 500g', '🍞', 'Boulangerie', '3760074380535', 'Pain complet frais du jour'),
('Œufs Bio x12', '🥚', 'Produits frais', '3760074380536', 'Œufs biologiques de poules élevées en plein air'),
('Huile d''Olive 1L', '🫒', 'Épicerie', '3760074380537', 'Huile d''olive extra vierge première pression'),
('Riz Basmati 2kg', '🍚', 'Épicerie', '3760074380538', 'Riz basmati de qualité premium'),
('Supermont 1kg', '🧂', 'Épicerie', '6170001002020', 'Supermont, sel iodé de qualité supérieure');

-- Insertion des prix (tous les produits dans tous les magasins)
INSERT INTO prices (product_id, store_id, price, stock) VALUES
-- Lait Entier Bio 1L (product_id = 1)
(1, 1, 2200, 50),  -- Mahima Akwa
(1, 2, 2350, 30),  -- Casino Bonanjo
(1, 3, 2300, 45),  -- Carrefour Market
(1, 4, 2250, 40),  -- Santa Lucia
(1, 5, 2400, 25),  -- Score Supermarché
(1, 6, 2150, 60),  -- Orca Deco
(1, 7, 2100, 70),  -- Leader Price
(1, 8, 2280, 35),  -- Super U Douala

-- Pain Complet 500g (product_id = 2)
(2, 1, 1550, 80),  -- Mahima Akwa
(2, 2, 1600, 90),  -- Casino Bonanjo
(2, 3, 1600, 80),  -- Carrefour Market
(2, 4, 1500, 100), -- Santa Lucia
(2, 5, 1650, 60),  -- Score Supermarché
(2, 6, 1520, 75),  -- Orca Deco
(2, 7, 1500, 100), -- Leader Price
(2, 8, 1580, 85),  -- Super U Douala

-- Œufs Bio x12 (product_id = 3)
(3, 1, 3100, 40),  -- Mahima Akwa
(3, 2, 3250, 35),  -- Casino Bonanjo
(3, 3, 3200, 45),  -- Carrefour Market
(3, 4, 3200, 40),  -- Santa Lucia
(3, 5, 3300, 20),  -- Score Supermarché
(3, 6, 3100, 35),  -- Orca Deco
(3, 7, 3000, 50),  -- Leader Price
(3, 8, 3150, 30),  -- Super U Douala

-- Huile d'Olive 1L (product_id = 4)
(4, 1, 4500, 30),  -- Mahima Akwa
(4, 2, 4700, 25),  -- Casino Bonanjo
(4, 3, 4650, 35),  -- Carrefour Market
(4, 4, 4600, 28),  -- Santa Lucia
(4, 5, 4800, 20),  -- Score Supermarché
(4, 6, 4550, 32),  -- Orca Deco
(4, 7, 4400, 40),  -- Leader Price
(4, 8, 4620, 27),  -- Super U Douala

-- Riz Basmati 2kg (product_id = 5)
(5, 1, 3800, 60),  -- Mahima Akwa
(5, 2, 3950, 50),  -- Casino Bonanjo
(5, 3, 3900, 55),  -- Carrefour Market
(5, 4, 3850, 65),  -- Santa Lucia
(5, 5, 4000, 40),  -- Score Supermarché
(5, 6, 3750, 70),  -- Orca Deco
(5, 7, 3700, 80),  -- Leader Price
(5, 8, 3880, 58),  -- Super U Douala

-- Supermont 1kg (product_id = 6)
(6, 1, 850, 120),  -- Mahima Akwa
(6, 2, 900, 100),  -- Casino Bonanjo
(6, 3, 875, 110),  -- Carrefour Market
(6, 5, 950, 80),   -- Score Supermarché
(6, 7, 800, 150);  -- Leader Price

-- Insertion d'un utilisateur de test
INSERT INTO users (name, email, phone, address, wallet_balance, loyalty_points, loyalty_level) VALUES
('Jean Dupont', 'jean.dupont@example.com', '+237 670 12 34 56', 'Bonapriso, Douala', 15000, 2450, 'Gold');

-- Insertion d'un livreur
INSERT INTO delivery_drivers (name, phone, vehicle, rating, active) VALUES
('Mohamed A.', '+237 670 12 34 56', 'Moto - ABC 123', 4.8, true);
