import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// ============================================================
// MIDDLEWARE D'AUTHENTIFICATION
// ============================================================

interface AuthRequest extends Request {
  userId?: number;
  userRole?: string;
}

function authenticateToken(req: AuthRequest, res: Response, next: Function) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ ok: false, message: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(403).json({ ok: false, message: 'Token invalide' });
  }
}

// ============================================================
// ROUTES PUBLIQUES
// ============================================================

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'API is running' });
});

// ============================================================
// AUTHENTIFICATION
// ============================================================

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().min(9),
  password: z.string().min(6),
  address: z.string().optional()
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    
    // Vérifier si l'utilisateur existe
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { phone: data.phone },
          ...(data.email ? [{ email: data.email }] : [])
        ]
      }
    });

    if (existing) {
      return res.status(400).json({ ok: false, message: 'Utilisateur déjà existant' });
    }

    // Hasher le mot de passe
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        passwordHash,
        address: data.address
      }
    });

    // Générer le token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      ok: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(400).json({ ok: false, message: 'Erreur lors de l\'inscription' });
  }
});

const loginSchema = z.object({
  identifier: z.string(), // email ou phone
  password: z.string()
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    // Trouver l'utilisateur
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.identifier },
          { phone: data.identifier }
        ]
      }
    });

    if (!user) {
      await prisma.authEvent.create({
        data: {
          identifier: data.identifier,
          status: 'failed',
          reason: 'User not found'
        }
      });
      return res.status(401).json({ ok: false, message: 'Identifiants incorrects' });
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(data.password, user.passwordHash);
    if (!validPassword) {
      await prisma.authEvent.create({
        data: {
          userId: user.id,
          identifier: data.identifier,
          status: 'failed',
          reason: 'Invalid password'
        }
      });
      return res.status(401).json({ ok: false, message: 'Identifiants incorrects' });
    }

    // Mettre à jour la dernière connexion
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    // Logger l'événement
    await prisma.authEvent.create({
      data: {
        userId: user.id,
        identifier: data.identifier,
        role: user.role,
        status: 'success'
      }
    });

    // Générer le token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      ok: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        walletBalance: user.walletBalance,
        loyaltyPoints: user.loyaltyPoints,
        loyaltyLevel: user.loyaltyLevel
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(400).json({ ok: false, message: 'Erreur lors de la connexion' });
  }
});

// ============================================================
// PRODUITS
// ============================================================

app.get('/api/products', async (_req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        prices: {
          include: {
            store: true
          }
        }
      }
    });

    res.json({ ok: true, products });
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ ok: false, message: 'Erreur lors de la récupération des produits' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        prices: {
          include: {
            store: true
          }
        },
        reviews: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ ok: false, message: 'Produit non trouvé' });
    }

    res.json({ ok: true, product });
  } catch (err) {
    console.error('Get product error:', err);
    res.status(500).json({ ok: false, message: 'Erreur lors de la récupération du produit' });
  }
});

app.get('/api/products/barcode/:barcode', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { barcode: req.params.barcode },
      include: {
        prices: {
          include: {
            store: true
          }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ ok: false, message: 'Produit non trouvé' });
    }

    res.json({ ok: true, product });
  } catch (err) {
    console.error('Get product by barcode error:', err);
    res.status(500).json({ ok: false, message: 'Erreur lors de la récupération du produit' });
  }
});

app.get('/api/products/search', async (req, res) => {
  try {
    const query = req.query.q as string;
    
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
          { barcode: { contains: query } }
        ]
      },
      include: {
        prices: {
          include: {
            store: true
          }
        }
      }
    });

    res.json({ ok: true, products });
  } catch (err) {
    console.error('Search products error:', err);
    res.status(500).json({ ok: false, message: 'Erreur lors de la recherche' });
  }
});

// ============================================================
// MAGASINS
// ============================================================

app.get('/api/stores', async (_req, res) => {
  try {
    const stores = await prisma.store.findMany();
    res.json({ ok: true, stores });
  } catch (err) {
    console.error('Get stores error:', err);
    res.status(500).json({ ok: false, message: 'Erreur lors de la récupération des magasins' });
  }
});

app.get('/api/stores/city/:city', async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      where: { city: req.params.city }
    });
    res.json({ ok: true, stores });
  } catch (err) {
    console.error('Get stores by city error:', err);
    res.status(500).json({ ok: false, message: 'Erreur lors de la récupération des magasins' });
  }
});

// ============================================================
// COMMANDES (PROTÉGÉES)
// ============================================================

app.post('/api/orders', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { items, subtotal, deliveryFee, total, paymentMethod, deliveryAddress } = req.body;

    const order = await prisma.order.create({
      data: {
        id: `PC-${Date.now()}`,
        userId: req.userId!,
        status: 'pending',
        subtotal,
        deliveryFee,
        total,
        paymentMethod,
        deliveryAddress,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            storeId: item.storeId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true,
            store: true
          }
        }
      }
    });

    res.json({ ok: true, order });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ ok: false, message: 'Erreur lors de la création de la commande' });
  }
});

app.get('/api/orders/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: {
        items: {
          include: {
            product: true,
            store: true
          }
        },
        delivery: {
          include: {
            driver: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ ok: false, message: 'Commande non trouvée' });
    }

    // Vérifier que l'utilisateur est propriétaire de la commande
    if (order.userId !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ ok: false, message: 'Accès refusé' });
    }

    res.json({ ok: true, order });
  } catch (err) {
    console.error('Get order error:', err);
    res.status(500).json({ ok: false, message: 'Erreur lors de la récupération de la commande' });
  }
});

app.get('/api/orders', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.userId },
      include: {
        items: {
          include: {
            product: true,
            store: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ ok: true, orders });
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ ok: false, message: 'Erreur lors de la récupération des commandes' });
  }
});

app.patch('/api/orders/:id/status', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { status, driverId } = req.body;

    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status }
    });

    // Si un livreur est assigné, créer/mettre à jour la livraison
    if (driverId) {
      await prisma.delivery.upsert({
        where: { orderId: order.id },
        create: {
          orderId: order.id,
          driverId,
          status: 'assigned',
          estimatedTime: '30-45 minutes'
        },
        update: {
          driverId,
          status: 'assigned'
        }
      });
    }

    res.json({ ok: true, order });
  } catch (err) {
    console.error('Update order status error:', err);
    res.status(500).json({ ok: false, message: 'Erreur lors de la mise à jour de la commande' });
  }
});

// ============================================================
// PROFIL UTILISATEUR (PROTÉGÉ)
// ============================================================

app.get('/api/user/profile', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        walletBalance: true,
        loyaltyPoints: true,
        loyaltyLevel: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ ok: false, message: 'Utilisateur non trouvé' });
    }

    res.json({ ok: true, user });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ ok: false, message: 'Erreur lors de la récupération du profil' });
  }
});

// ============================================================
// DÉMARRAGE DU SERVEUR
// ============================================================

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API listening on http://localhost:${PORT}`);
  console.log(`📊 Database: ${process.env.DATABASE_URL ? 'PostgreSQL' : 'Not configured'}`);
});

// Gestion de la fermeture propre
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
