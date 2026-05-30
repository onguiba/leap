-- Base de données MALAP METSI
-- Schéma SQL pour PostgreSQL/MySQL

-- Table des produits
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(10),
    category VARCHAR(100) NOT NULL,
    barcode VARCHAR(13) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des magasins
CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(10),
    address TEXT NOT NULL,
    phone VARCHAR(20),
    hours VARCHAR(50),
    delivery BOOLEAN DEFAULT true,
    delivery_fee INTEGER DEFAULT 500,
    min_order INTEGER DEFAULT 5000,
    rating DECIMAL(2,1) DEFAULT 0.0,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des prix (relation produit-magasin)
CREATE TABLE prices (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    store_id INTEGER REFERENCES stores(id),
    price INTEGER NOT NULL,
    stock INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, store_id)
);

-- Table des utilisateurs (auth + profil)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    last_login_at TIMESTAMP,
    address TEXT,
    wallet_balance INTEGER DEFAULT 0,
    loyalty_points INTEGER DEFAULT 0,
    loyalty_level VARCHAR(20) DEFAULT 'Bronze',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Journal des connexions (audit)
CREATE TABLE auth_events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    identifier VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    status VARCHAR(20) NOT NULL CHECK (status IN ('success', 'failed')),
    reason VARCHAR(100),
    occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Table des commandes
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'pending',
    subtotal INTEGER NOT NULL,
    delivery_fee INTEGER DEFAULT 0,
    total INTEGER NOT NULL,
    payment_method VARCHAR(50),
    delivery_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des articles de commande
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    store_id INTEGER REFERENCES stores(id),
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL
);

-- Table des livreurs
CREATE TABLE delivery_drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    vehicle VARCHAR(100),
    rating DECIMAL(2,1) DEFAULT 0.0,
    active BOOLEAN DEFAULT true
);

-- Table des livraisons
CREATE TABLE deliveries (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES orders(id),
    driver_id INTEGER REFERENCES delivery_drivers(id),
    status VARCHAR(20) DEFAULT 'pending',
    estimated_time VARCHAR(50),
    actual_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des avis
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES products(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des transactions wallet
CREATE TABLE wallet_transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(10) CHECK (type IN ('credit', 'debit')),
    amount INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_prices_product ON prices(product_id);
CREATE INDEX idx_prices_store ON prices(store_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_auth_events_identifier ON auth_events(identifier);
CREATE INDEX idx_auth_events_occurred_at ON auth_events(occurred_at);
