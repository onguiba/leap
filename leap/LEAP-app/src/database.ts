// Service de base de données pour MALAP METSI avec magasins par ville

export interface Product {
  id: number;
  name: string;
  image: string;       // emoji fallback
  imageUrl?: string;   // vraie photo URL
  category: string;
  barcode: string;
  description?: string;
  prices: Array<{
    store: string;
    price: number;
    stock?: number;
  }>;
}

export interface Store {
  id: number;
  name: string;
  logo: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  delivery: boolean;
  deliveryFee: number;
  minOrder: number;
  rating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  walletBalance: number;
  loyaltyPoints: number;
  loyaltyLevel: string;
  createdAt: string;
  orders: string[];
}

export interface Order {
  id: string;
  userId: number;
  date: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered';
  items: Array<{
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    store: string;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  deliveryAddress: string;
  deliveryDriver?: {
    name: string;
    phone: string;
    vehicle: string;
    rating: number;
  };
}

// ============================================================
// NOMS DE SUPERMARCHÉS: remplacés par lettres A–R
// A = Supermarché A (ex Mahima Akwa)
// B = Supermarché B (ex Casino Bonanjo)
// C = Supermarché C (ex Carrefour Market)
// D = Supermarché D (ex Santa Lucia)
// E = Supermarché E (ex Score)
// F = Supermarché F (ex Orca Deco)
// G = Supermarché G (ex Leader Price)
// H = Supermarché H (ex Super U Ndokoti)
// I = Boulangerie I (ex Calafatas)
// J = Marché J (ex Sandaga)
// K = Supermarché K (ex Spar Douala)
// L = Boulangerie L (ex Le Fournil)
// M = Supermarché M (ex Dovv)
// N = Boucherie N
// O = Supermarché O (ex Mahima Yaoundé)
// P = Supermarché P (ex Casino Bastos)
// Q = Marché Q (ex Central Yaoundé)
// R = Marché R (ex Mokolo)
// ============================================================

export const PRODUCTS: Product[] = [
  // ---- 10 PRODUITS POPULAIRES avec vraies images ----
  {
    id: 1,
    name: "Lait Entier Frais 1L",
    image: "lait",
    imageUrl: "/IMAGES/Lait Entier Frais 1L.jpg",
    category: "Produits laitiers",
    barcode: "3760074380534",
    prices: [
      { store: "Supermarché A", price: 2200 }, { store: "Supermarché B", price: 2350 },
      { store: "Boulangerie I", price: 2180 }, { store: "Supermarché K", price: 2250 },
      { store: "Supermarché O", price: 2100 }, { store: "Supermarché P", price: 2300 },
      { store: "Supermarché C Yaoundé", price: 2150 }, { store: "Supermarché H Bafoussam", price: 2250 }
    ]
  },
  {
    id: 2,
    name: "Pain Complet 500g",
    image: "pain",
    imageUrl: "/IMAGES/Pain Complet 500g.jpg",
    category: "Boulangerie",
    barcode: "3760074380535",
    prices: [
      { store: "Supermarché G", price: 1500 }, { store: "Boulangerie I", price: 1450 },
      { store: "Boulangerie L", price: 1480 }, { store: "Boulangerie I Yaoundé", price: 1450 },
      { store: "Boulangerie L Yaoundé", price: 1470 }, { store: "Marché Bafoussam", price: 1400 }
    ]
  },
  {
    id: 3,
    name: "Oeufs Frais x12",
    image: "oeufs",
    imageUrl: "/IMAGES/Oeufs Frais x12.jpg",
    category: "Produits frais",
    barcode: "3760074380536",
    prices: [
      { store: "Supermarché D", price: 3200 }, { store: "Supermarché F", price: 3100 },
      { store: "Supermarché M", price: 3150 }, { store: "Supermarché D Yaoundé", price: 3150 },
      { store: "Supermarché K Yaoundé", price: 3180 }, { store: "Marché Garoua", price: 2900 }
    ]
  },
  {
    id: 4,
    name: "Huile Végétale Mayor 1L",
    image: "huile",
    imageUrl: "/IMAGES/Huile Végétale Mayor 1L.webp",
    category: "Épicerie",
    barcode: "6171200010116",
    prices: [
      { store: "Supermarché C", price: 2500 }, { store: "Supermarché B", price: 2600 },
      { store: "Supermarché K", price: 2550 }, { store: "Supermarché E", price: 2580 },
      { store: "Supermarché C Yaoundé", price: 2500 }, { store: "Supermarché P", price: 2580 },
      { store: "Supermarché K Yaoundé", price: 2540 }
    ]
  },
  {
    id: 5,
    name: "Riz Basmati 2kg",
    image: "riz",
    imageUrl: "/IMAGES/Riz Basmati 2kg.jpg",
    category: "Épicerie",
    barcode: "3760074380538",
    prices: [
      { store: "Supermarché E", price: 5800 }, { store: "Supermarché H", price: 5900 },
      { store: "Supermarché M", price: 5850 }, { store: "Marché Q", price: 5700 },
      { store: "Supermarché M Yaoundé", price: 5750 }, { store: "Marché Bamenda", price: 5650 }
    ]
  },
  {
    id: 6,
    name: "Eau Minérale Tangui 1.5L",
    image: "eau",
    imageUrl: "/IMAGES/Eau Minérale Tangui 1.5L.png",
    category: "Boissons",
    barcode: "6170001000016",
    prices: [
      { store: "Supermarché A", price: 500 }, { store: "Supermarché B", price: 550 },
      { store: "Supermarché G", price: 480 }, { store: "Supermarché K", price: 520 },
      { store: "Supermarché O", price: 500 }, { store: "Supermarché P", price: 530 },
      { store: "Marché Q", price: 450 }, { store: "Supermarché H Bafoussam", price: 490 }
    ]
  },
  {
    id: 7,
    name: "Bouillon Maggi Etoile 4g",
    image: "maggi",
    imageUrl: "/IMAGES/Bouillon Maggi Etoile 4g.jpg",
    category: "Épicerie",
    barcode: "6173001000012",
    prices: [
      { store: "Supermarché A", price: 50 }, { store: "Supermarché B", price: 50 },
      { store: "Supermarché G", price: 45 }, { store: "Marché J", price: 40 },
      { store: "Supermarché O", price: 50 }, { store: "Marché Q", price: 45 },
      { store: "Marché R", price: 40 }, { store: "Marché Bafoussam", price: 40 }
    ]
  },
  {
    id: 8,
    name: "Bière 33 Export 65cl",
    image: "biere",
    imageUrl: "/IMAGES/Bière 33 Export 65cl.png",
    category: "Boissons",
    barcode: "6170001001013",
    prices: [
      { store: "Supermarché A", price: 650 }, { store: "Supermarché B", price: 700 },
      { store: "Supermarché E", price: 680 }, { store: "Supermarché H", price: 690 },
      { store: "Supermarché O", price: 650 }, { store: "Supermarché P", price: 680 },
      { store: "Supermarché M Yaoundé", price: 670 }
    ]
  },
  {
    id: 9,
    name: "Tomates Fraîches 1kg",
    image: "tomates",
    imageUrl: "/IMAGES/Tomates Fraîches 1kg.jpg",
    category: "Fruits & Légumes",
    barcode: "3760074380540",
    prices: [
      { store: "Supermarché B", price: 2000 }, { store: "Supermarché D", price: 1900 },
      { store: "Marché Q", price: 1800 }, { store: "Marché Bafoussam", price: 1700 }
    ]
  },
  {
    id: 10,
    name: "Bananes Plantain 1kg",
    image: "bananes",
    imageUrl: "/IMAGES/Bananes Plantain 1kg.jpg",
    category: "Fruits & Légumes",
    barcode: "3760074380541",
    prices: [
      { store: "Supermarché A", price: 1500 }, { store: "Supermarché F", price: 1450 },
      { store: "Marché R", price: 1350 }, { store: "Marché Garoua", price: 1300 }
    ]
  },

  // ---- Produits supplémentaires ----
  { id: 11, name: "Pâtes Spaghetti 500g", image: "pates", category: "Épicerie", barcode: "3760074380544", prices: [
    { store: "Supermarché E", price: 1200 }, { store: "Supermarché A", price: 1250 },
    { store: "Casino Yaoundé", price: 1220 }, { store: "Marché Bafoussam", price: 1180 }
  ]},
  { id: 12, name: "Sauce Tomate 400g", image: "sauce", category: "Épicerie", barcode: "3760074380545", prices: [
    { store: "Supermarché B", price: 800 }, { store: "Supermarché C", price: 850 },
    { store: "Marché Q", price: 780 }, { store: "Marché Garoua", price: 750 }
  ]},
  { id: 13, name: "Café Moulu 250g", image: "cafe", category: "Boissons", barcode: "3760074380546", prices: [
    { store: "Supermarché G", price: 3200 }, { store: "Supermarché D", price: 3300 },
    { store: "Supermarché O", price: 3250 }, { store: "Supermarché H Bafoussam", price: 3150 }
  ]},
  { id: 14, name: "Thé Vert x20", image: "the", category: "Boissons", barcode: "3760074380547", prices: [
    { store: "Supermarché F", price: 1800 }, { store: "Supermarché H", price: 1850 },
    { store: "Casino Yaoundé", price: 1820 }, { store: "Marché Maroua", price: 1750 }
  ]},
  { id: 15, name: "Jus d'Orange 1L", image: "jus", category: "Boissons", barcode: "3760074380548", prices: [
    { store: "Supermarché A", price: 2500 }, { store: "Supermarché B", price: 2600 },
    { store: "Marché R", price: 2450 }, { store: "Marché Bamenda", price: 2400 }
  ]},
  { id: 16, name: "Eau Minérale Supermont 1.5L", image: "eau2", category: "Boissons", barcode: "6171100010018", prices: [
    { store: "Supermarché C", price: 600 }, { store: "Supermarché D", price: 620 },
    { store: "Supermarché F", price: 590 }, { store: "Supermarché C Yaoundé", price: 600 },
    { store: "Supermarché K Yaoundé", price: 610 }, { store: "Marché Bafoussam", price: 550 }
  ]},
  { id: 17, name: "Beurre Doux 250g", image: "beurre", category: "Produits laitiers", barcode: "3760074380550", prices: [
    { store: "Supermarché C", price: 2200 }, { store: "Supermarché D", price: 2150 },
    { store: "Casino Yaoundé", price: 2180 }, { store: "Supermarché H Bafoussam", price: 2100 }
  ]},
  { id: 18, name: "Sucre Sosucam 1kg", image: "sucre", category: "Épicerie", barcode: "6171500040011", prices: [
    { store: "Supermarché A", price: 1200 }, { store: "Supermarché B", price: 1250 },
    { store: "Supermarché G", price: 1180 }, { store: "Supermarché K", price: 1220 },
    { store: "Supermarché O", price: 1200 }, { store: "Supermarché P", price: 1240 },
    { store: "Marché Q", price: 1150 }
  ]},
  { id: 19, name: "Yaourt Nature Dolait", image: "yaourt", category: "Produits laitiers", barcode: "6171300020014", prices: [
    { store: "Supermarché A", price: 300 }, { store: "Supermarché D", price: 320 },
    { store: "Boulangerie I", price: 310 }, { store: "Supermarché O", price: 300 },
    { store: "Supermarché D Yaoundé", price: 310 }, { store: "Boulangerie I Yaoundé", price: 305 }
  ]},
  { id: 20, name: "Chocolat Mambo (Chococam)", image: "chocolat", category: "Confiserie", barcode: "6171400030112", prices: [
    { store: "Supermarché C", price: 1500 }, { store: "Supermarché B", price: 1600 },
    { store: "Supermarché F", price: 1550 }, { store: "Supermarché C Yaoundé", price: 1500 },
    { store: "Supermarché P", price: 1580 }, { store: "Supermarché H Bafoussam", price: 1520 }
  ]},
  { id: 21, name: "Maltina / Malta Guinness", image: "malta", category: "Boissons", barcode: "6170002001012", prices: [
    { store: "Supermarché C", price: 550 }, { store: "Supermarché D", price: 580 },
    { store: "Supermarché F", price: 560 }, { store: "Supermarché C Yaoundé", price: 550 },
    { store: "Supermarché D Yaoundé", price: 570 }, { store: "Supermarché H Bafoussam", price: 540 }
  ]},
  { id: 22, name: "Sardines Broli (Conserve)", image: "sardines", category: "Poissons", barcode: "6171600050119", prices: [
    { store: "Supermarché C", price: 800 }, { store: "Supermarché D", price: 850 },
    { store: "Supermarché E", price: 820 }, { store: "Supermarché C Yaoundé", price: 800 },
    { store: "Supermarché D Yaoundé", price: 840 }, { store: "Supermarché M Yaoundé", price: 810 }
  ]},
  { id: 23, name: "Savon Azur (Toilette)", image: "savon", category: "Hygiène", barcode: "6171700060018", prices: [
    { store: "Supermarché C", price: 350 }, { store: "Supermarché D", price: 380 },
    { store: "Supermarché F", price: 360 }, { store: "Supermarché C Yaoundé", price: 350 },
    { store: "Supermarché D Yaoundé", price: 370 }, { store: "Supermarché K Yaoundé", price: 360 }
  ]},
  { id: 24, name: "Détergent Madar (Sachet)", image: "detergent", category: "Hygiène", barcode: "6111234567890", prices: [
    { store: "Supermarché A", price: 150 }, { store: "Supermarché B", price: 180 },
    { store: "Supermarché G", price: 140 }, { store: "Marché J", price: 130 },
    { store: "Supermarché O", price: 150 }, { store: "Marché Q", price: 140 },
    { store: "Marché R", price: 130 }, { store: "Marché Bafoussam", price: 120 }
  ]},
  { id: 25, name: "Poulet Fermier 1kg", image: "poulet", category: "Viandes", barcode: "3760074380539", prices: [
    { store: "Supermarché G", price: 8500 }, { store: "Supermarché A", price: 8700 },
    { store: "Boucherie N Yaoundé", price: 8400 }, { store: "Marché Maroua", price: 8200 }
  ]},
  { id: 26, name: "Poisson Frais 1kg", image: "poisson", category: "Poissons", barcode: "3760074380558", prices: [
    { store: "Supermarché E", price: 7500 }, { store: "Supermarché A", price: 7600 },
    { store: "Marché R", price: 7300 }, { store: "Marché Bamenda", price: 7200 }
  ]},
  { id: 27, name: "Bœuf Haché 500g", image: "boeuf", category: "Viandes", barcode: "3760074380560", prices: [
    { store: "Supermarché G", price: 6500 }, { store: "Supermarché D", price: 6600 },
    { store: "Boucherie N Yaoundé", price: 6450 }, { store: "Marché Garoua", price: 6300 }
  ]},
  { id: 28, name: "Bière Castel Beer 65cl", image: "castel", category: "Boissons", barcode: "6170001001051", prices: [
    { store: "Supermarché G", price: 600 }, { store: "Supermarché K", price: 650 },
    { store: "Marché J", price: 580 }, { store: "Marché Q", price: 600 },
    { store: "Marché R", price: 590 }, { store: "Marché Garoua", price: 570 }
  ]},
  { id: 29, name: "Top Orange 60cl", image: "top", category: "Boissons", barcode: "6170001002010", prices: [
    { store: "Supermarché A", price: 400 }, { store: "Supermarché B", price: 450 },
    { store: "Boulangerie I", price: 420 }, { store: "Supermarché M", price: 430 },
    { store: "Supermarché O", price: 400 }, { store: "Supermarché P", price: 440 },
    { store: "Boulangerie I Yaoundé", price: 410 }
  ]},
  { id: 30, name: "Carottes 1kg", image: "carottes", category: "Fruits & Légumes", barcode: "3760074380557", prices: [
    { store: "Supermarché F", price: 1500 }, { store: "Supermarché H", price: 1550 },
    { store: "Marché Q", price: 1450 }, { store: "Marché Maroua", price: 1400 }
  ]},
  {
    id: 31,
    name: "Supermont 1kg",
    image: "🧂",
    category: "Épicerie",
    barcode: "6170001002020",
    description: "Sel iodé Supermont de qualité supérieure",
    prices: [
      { store: "Supermarché G", price: 800, stock: 150 },   // Leader Price
      { store: "Supermarché A", price: 850, stock: 120 },   // Mahima Akwa
      { store: "Supermarché C", price: 875, stock: 110 },   // Carrefour Market
      { store: "Supermarché B", price: 900, stock: 100 },   // Casino Bonanjo
      { store: "Supermarché E", price: 950, stock: 80 }     // Score Supermarché
    ]
  }
];

export const STORES: Store[] = [
  // Douala
  { id: 1, name: "Supermarché A", logo: "A", city: "Douala", address: "Boulevard de la Liberté, Akwa", phone: "+237 233 42 56 78", hours: "8h00 - 21h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.5, coordinates: { lat: 4.0511, lng: 9.7679 } },
  { id: 2, name: "Supermarché B", logo: "B", city: "Douala", address: "Rue Joffre, Bonanjo", phone: "+237 233 42 67 89", hours: "7h30 - 22h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.3, coordinates: { lat: 4.0483, lng: 9.7043 } },
  { id: 3, name: "Supermarché C", logo: "C", city: "Douala", address: "Avenue Charles de Gaulle", phone: "+237 233 42 78 90", hours: "8h00 - 22h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.6, coordinates: { lat: 4.0469, lng: 9.7071 } },
  { id: 4, name: "Supermarché D", logo: "D", city: "Douala", address: "Rue de la Joie, Bonapriso", phone: "+237 233 42 89 01", hours: "7h00 - 21h30", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.4, coordinates: { lat: 4.0556, lng: 9.7125 } },
  { id: 5, name: "Supermarché E", logo: "E", city: "Douala", address: "Boulevard de la République", phone: "+237 233 42 90 12", hours: "8h00 - 21h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.2, coordinates: { lat: 4.0489, lng: 9.7098 } },
  { id: 6, name: "Supermarché F", logo: "F", city: "Douala", address: "Rue Franqueville, Akwa", phone: "+237 233 43 01 23", hours: "8h30 - 21h30", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.3, coordinates: { lat: 4.0502, lng: 9.7654 } },
  { id: 7, name: "Supermarché G", logo: "G", city: "Douala", address: "Avenue Ahidjo", phone: "+237 233 43 12 34", hours: "7h30 - 22h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.1, coordinates: { lat: 4.0478, lng: 9.7112 } },
  { id: 8, name: "Supermarché H", logo: "H", city: "Douala", address: "Carrefour Ndokoti", phone: "+237 233 43 23 45", hours: "8h00 - 21h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.4, coordinates: { lat: 4.0445, lng: 9.7189 } },
  { id: 28, name: "Boulangerie I", logo: "I", city: "Douala", address: "Rue des Cocotiers, Akwa", phone: "+237 233 43 34 56", hours: "6h00 - 20h00", delivery: true, deliveryFee: 300, minOrder: 2000, rating: 4.6, coordinates: { lat: 4.0523, lng: 9.7691 } },
  { id: 29, name: "Marché J", logo: "J", city: "Douala", address: "Quartier Sandaga", phone: "+237 233 43 45 67", hours: "6h00 - 19h00", delivery: false, deliveryFee: 0, minOrder: 0, rating: 4.0, coordinates: { lat: 4.0501, lng: 9.7123 } },
  { id: 30, name: "Supermarché K", logo: "K", city: "Douala", address: "Boulevard de la Réunification", phone: "+237 233 43 56 78", hours: "8h00 - 21h30", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.3, coordinates: { lat: 4.0467, lng: 9.7089 } },
  { id: 31, name: "Boulangerie L", logo: "L", city: "Douala", address: "Rue Joss, Bonanjo", phone: "+237 233 43 67 89", hours: "6h00 - 21h00", delivery: true, deliveryFee: 300, minOrder: 2000, rating: 4.7, coordinates: { lat: 4.0491, lng: 9.7056 } },
  { id: 33, name: "Supermarché M", logo: "M", city: "Douala", address: "Rue de Verdun, Bali", phone: "+237 233 43 89 01", hours: "8h00 - 21h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.2, coordinates: { lat: 4.0534, lng: 9.7145 } },
  { id: 34, name: "Boucherie N", logo: "N", city: "Douala", address: "Avenue de Gaulle, Akwa", phone: "+237 233 43 90 12", hours: "7h00 - 20h00", delivery: true, deliveryFee: 400, minOrder: 4000, rating: 4.4, coordinates: { lat: 4.0498, lng: 9.7667 } },

  // Yaoundé
  { id: 9, name: "Supermarché O", logo: "O", city: "Yaoundé", address: "Avenue Kennedy, Centre-ville", phone: "+237 222 23 45 67", hours: "8h00 - 21h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.5, coordinates: { lat: 3.8480, lng: 11.5021 } },
  { id: 10, name: "Supermarché P", logo: "P", city: "Yaoundé", address: "Boulevard du 20 Mai, Bastos", phone: "+237 222 23 56 78", hours: "7h30 - 22h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.4, coordinates: { lat: 3.8667, lng: 11.5167 } },
  { id: 11, name: "Marché Q", logo: "Q", city: "Yaoundé", address: "Quartier du Marché Central", phone: "+237 222 23 67 89", hours: "6h00 - 20h00", delivery: false, deliveryFee: 0, minOrder: 0, rating: 4.2, coordinates: { lat: 3.8578, lng: 11.5181 } },
  { id: 12, name: "Marché R", logo: "R", city: "Yaoundé", address: "Quartier Mokolo", phone: "+237 222 23 78 90", hours: "6h00 - 19h00", delivery: false, deliveryFee: 0, minOrder: 0, rating: 4.0, coordinates: { lat: 3.8689, lng: 11.5234 } },
  { id: 13, name: "Boulangerie I Yaoundé", logo: "I", city: "Yaoundé", address: "Avenue de l'Indépendance", phone: "+237 222 23 89 01", hours: "6h00 - 21h00", delivery: true, deliveryFee: 300, minOrder: 3000, rating: 4.6, coordinates: { lat: 3.8556, lng: 11.5089 } },
  { id: 14, name: "Boucherie N Yaoundé", logo: "N", city: "Yaoundé", address: "Quartier Nlongkak", phone: "+237 222 23 90 12", hours: "7h00 - 20h00", delivery: true, deliveryFee: 400, minOrder: 4000, rating: 4.3, coordinates: { lat: 3.8712, lng: 11.5298 } },
  { id: 35, name: "Supermarché C Yaoundé", logo: "C", city: "Yaoundé", address: "Avenue Charles Atangana", phone: "+237 222 24 01 23", hours: "8h00 - 22h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.5, coordinates: { lat: 3.8623, lng: 11.5134 } },
  { id: 36, name: "Supermarché D Yaoundé", logo: "D", city: "Yaoundé", address: "Quartier Hippodrome", phone: "+237 222 24 12 34", hours: "7h30 - 21h30", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.4, coordinates: { lat: 3.8701, lng: 11.5212 } },
  { id: 37, name: "Supermarché K Yaoundé", logo: "K", city: "Yaoundé", address: "Boulevard de l'OCAM", phone: "+237 222 24 23 45", hours: "8h00 - 21h30", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.3, coordinates: { lat: 3.8589, lng: 11.5167 } },
  { id: 38, name: "Boulangerie L Yaoundé", logo: "L", city: "Yaoundé", address: "Rue Joseph Essono Balla", phone: "+237 222 24 34 56", hours: "6h00 - 21h00", delivery: true, deliveryFee: 300, minOrder: 2000, rating: 4.7, coordinates: { lat: 3.8645, lng: 11.5198 } },
  { id: 40, name: "Supermarché M Yaoundé", logo: "M", city: "Yaoundé", address: "Avenue Foch, Centre-ville", phone: "+237 222 24 56 78", hours: "8h00 - 21h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.2, coordinates: { lat: 3.8612, lng: 11.5145 } },

  // Bafoussam
  { id: 15, name: "Supermarché H Bafoussam", logo: "H", city: "Bafoussam", address: "Avenue Général de Gaulle", phone: "+237 233 44 12 34", hours: "8h00 - 20h00", delivery: true, deliveryFee: 400, minOrder: 4000, rating: 4.3, coordinates: { lat: 5.4781, lng: 10.4178 } },
  { id: 16, name: "Marché Bafoussam", logo: "Mch", city: "Bafoussam", address: "Marché Central", phone: "+237 233 44 23 45", hours: "6h00 - 19h00", delivery: false, deliveryFee: 0, minOrder: 0, rating: 4.1, coordinates: { lat: 5.4756, lng: 10.4189 } },

  // Garoua
  { id: 19, name: "Marché Garoua", logo: "Mch", city: "Garoua", address: "Grand Marché", phone: "+237 222 27 12 34", hours: "6h00 - 19h00", delivery: false, deliveryFee: 0, minOrder: 0, rating: 4.0, coordinates: { lat: 9.3012, lng: 13.3964 } },
  { id: 20, name: "Supermarché Garoua", logo: "S", city: "Garoua", address: "Avenue Ahmadou Ahidjo", phone: "+237 222 27 23 45", hours: "8h00 - 20h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.1, coordinates: { lat: 9.3045, lng: 13.3989 } },

  // Bamenda
  { id: 22, name: "Marché Bamenda", logo: "Mch", city: "Bamenda", address: "Main Market", phone: "+237 233 36 12 34", hours: "6h00 - 19h00", delivery: false, deliveryFee: 0, minOrder: 0, rating: 4.0, coordinates: { lat: 5.9631, lng: 10.1591 } },
  { id: 23, name: "Supermarché Bamenda", logo: "S", city: "Bamenda", address: "Commercial Avenue", phone: "+237 233 36 23 45", hours: "8h00 - 20h00", delivery: true, deliveryFee: 400, minOrder: 4000, rating: 4.1, coordinates: { lat: 5.9656, lng: 10.1612 } },

  // Maroua
  { id: 25, name: "Marché Maroua", logo: "Mch", city: "Maroua", address: "Grand Marché Central", phone: "+237 222 29 12 34", hours: "6h00 - 19h00", delivery: false, deliveryFee: 0, minOrder: 0, rating: 4.0, coordinates: { lat: 10.5906, lng: 14.3159 } },
  { id: 26, name: "Supermarché Maroua", logo: "S", city: "Maroua", address: "Avenue de la République", phone: "+237 222 29 23 45", hours: "8h00 - 20h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.1, coordinates: { lat: 10.5934, lng: 14.3178 } }
];

// Fonctions utilitaires
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductByBarcode(barcode: string): Product | undefined {
  return PRODUCTS.find(p => p.barcode === barcode);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.barcode.includes(q) ||
    p.category.toLowerCase().includes(q)
  );
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(p => p.category === category);
}

export function getAllStores(): Store[] {
  return STORES;
}

export function getStoreById(id: number): Store | undefined {
  return STORES.find(s => s.id === id);
}

export function getStoresByCity(city: string): Store[] {
  return STORES.filter(s => s.city === city);
}
