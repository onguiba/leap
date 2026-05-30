import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Nettoyer la base de données
  await prisma.walletTransaction.deleteMany();
  await prisma.review.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.deliveryDriver.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.authEvent.deleteMany();
  await prisma.user.deleteMany();
  await prisma.price.deleteMany();
  await prisma.product.deleteMany();
  await prisma.store.deleteMany();

  console.log('✅ Database cleaned');

  // Créer les magasins
  const stores = await Promise.all([
    // Douala
    prisma.store.create({ data: { name: "Supermarché A", logo: "A", city: "Douala", address: "Boulevard de la Liberté, Akwa", phone: "+237 233 42 56 78", hours: "8h00 - 21h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.5, latitude: 4.0511, longitude: 9.7679 }}),
    prisma.store.create({ data: { name: "Supermarché B", logo: "B", city: "Douala", address: "Rue Joffre, Bonanjo", phone: "+237 233 42 67 89", hours: "7h30 - 22h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.3, latitude: 4.0483, longitude: 9.7043 }}),
    prisma.store.create({ data: { name: "Supermarché C", logo: "C", city: "Douala", address: "Avenue Charles de Gaulle", phone: "+237 233 42 78 90", hours: "8h00 - 22h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.6, latitude: 4.0469, longitude: 9.7071 }}),
    prisma.store.create({ data: { name: "Supermarché D", logo: "D", city: "Douala", address: "Rue de la Joie, Bonapriso", phone: "+237 233 42 89 01", hours: "7h00 - 21h30", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.4, latitude: 4.0556, longitude: 9.7125 }}),
    prisma.store.create({ data: { name: "Supermarché E", logo: "E", city: "Douala", address: "Boulevard de la République", phone: "+237 233 42 90 12", hours: "8h00 - 21h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.2, latitude: 4.0489, longitude: 9.7098 }}),
    prisma.store.create({ data: { name: "Supermarché F", logo: "F", city: "Douala", address: "Rue Franqueville, Akwa", phone: "+237 233 43 01 23", hours: "8h30 - 21h30", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.3, latitude: 4.0502, longitude: 9.7654 }}),
    prisma.store.create({ data: { name: "Supermarché G", logo: "G", city: "Douala", address: "Avenue Ahidjo", phone: "+237 233 43 12 34", hours: "7h30 - 22h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.1, latitude: 4.0478, longitude: 9.7112 }}),
    prisma.store.create({ data: { name: "Supermarché H", logo: "H", city: "Douala", address: "Carrefour Ndokoti", phone: "+237 233 43 23 45", hours: "8h00 - 21h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.4, latitude: 4.0445, longitude: 9.7189 }}),
    // Yaoundé
    prisma.store.create({ data: { name: "Supermarché O", logo: "O", city: "Yaoundé", address: "Avenue Kennedy, Centre-ville", phone: "+237 222 23 45 67", hours: "8h00 - 21h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.5, latitude: 3.8480, longitude: 11.5021 }}),
    prisma.store.create({ data: { name: "Supermarché P", logo: "P", city: "Yaoundé", address: "Boulevard du 20 Mai, Bastos", phone: "+237 222 23 56 78", hours: "7h30 - 22h00", delivery: true, deliveryFee: 500, minOrder: 5000, rating: 4.4, latitude: 3.8667, longitude: 11.5167 }}),
  ]);

  console.log(`✅ Created ${stores.length} stores`);

  // Créer les produits
  const products = await Promise.all([
    prisma.product.create({ data: { name: "Lait Entier Frais 1L", image: "lait", imageUrl: "/IMAGES/Lait Entier Frais 1L.jpg", category: "Produits laitiers", barcode: "3760074380534" }}),
    prisma.product.create({ data: { name: "Pain Complet 500g", image: "pain", imageUrl: "/IMAGES/Pain Complet 500g.jpg", category: "Boulangerie", barcode: "3760074380535" }}),
    prisma.product.create({ data: { name: "Oeufs Frais x12", image: "oeufs", imageUrl: "/IMAGES/Oeufs Frais x12.jpg", category: "Produits frais", barcode: "3760074380536" }}),
    prisma.product.create({ data: { name: "Huile Végétale Mayor 1L", image: "huile", imageUrl: "/IMAGES/Huile Végétale Mayor 1L.webp", category: "Épicerie", barcode: "6171200010116" }}),
    prisma.product.create({ data: { name: "Riz Basmati 2kg", image: "riz", imageUrl: "/IMAGES/Riz Basmati 2kg.jpg", category: "Épicerie", barcode: "3760074380538" }}),
    prisma.product.create({ data: { name: "Eau Minérale Tangui 1.5L", image: "eau", imageUrl: "/IMAGES/Eau Minérale Tangui 1.5L.png", category: "Boissons", barcode: "6170001000016" }}),
    prisma.product.create({ data: { name: "Bouillon Maggi Etoile 4g", image: "maggi", imageUrl: "/IMAGES/Bouillon Maggi Etoile 4g.jpg", category: "Épicerie", barcode: "6173001000012" }}),
    prisma.product.create({ data: { name: "Bière 33 Export 65cl", image: "biere", imageUrl: "/IMAGES/Bière 33 Export 65cl.png", category: "Boissons", barcode: "6170001001013" }}),
    prisma.product.create({ data: { name: "Tomates Fraîches 1kg", image: "tomates", imageUrl: "/IMAGES/Tomates Fraîches 1kg.jpg", category: "Fruits & Légumes", barcode: "3760074380540" }}),
    prisma.product.create({ data: { name: "Bananes Plantain 1kg", image: "bananes", imageUrl: "/IMAGES/Bananes Plantain 1kg.jpg", category: "Fruits & Légumes", barcode: "3760074380541" }}),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // Créer les prix
  const prices = [];
  for (const product of products) {
    for (let i = 0; i < Math.min(stores.length, 5); i++) {
      const store = stores[i];
      const basePrice = 1000 + Math.floor(Math.random() * 5000);
      prices.push(
        prisma.price.create({
          data: {
            productId: product.id,
            storeId: store.id,
            price: basePrice,
            stock: Math.floor(Math.random() * 100) + 10
          }
        })
      );
    }
  }
  await Promise.all(prices);

  console.log(`✅ Created ${prices.length} prices`);

  // Créer un utilisateur de test
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@malapmetsi.cm",
      phone: "+237690000000",
      passwordHash: hashedPassword,
      address: "Douala, Akwa",
      walletBalance: 50000,
      loyaltyPoints: 1000,
      loyaltyLevel: "Gold"
    }
  });

  console.log(`✅ Created test user: ${user.email}`);

  // Créer des livreurs
  const drivers = await Promise.all([
    prisma.deliveryDriver.create({ data: { name: "Leaticia Priscille", phone: "+237690123456", vehicle: "Moto Yamaha", rating: 4.8, active: true }}),
    prisma.deliveryDriver.create({ data: { name: "Jean K.", phone: "+237690234567", vehicle: "Moto Honda", rating: 4.6, active: true }}),
    prisma.deliveryDriver.create({ data: { name: "Paul M.", phone: "+237690345678", vehicle: "Voiture Toyota", rating: 4.9, active: true }}),
  ]);

  console.log(`✅ Created ${drivers.length} delivery drivers`);

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
