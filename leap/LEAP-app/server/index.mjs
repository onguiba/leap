import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

const DB_DIR = path.resolve(process.cwd(), 'database');
const ORDERS_FILE = path.join(DB_DIR, 'orders.json');

function readJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJsonAtomic(filePath, value) {
  const tmp = `${filePath}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2), 'utf-8');
  fs.renameSync(tmp, filePath);
}

function loadOrders() {
  const orders = readJson(ORDERS_FILE, []);
  return Array.isArray(orders) ? orders : [];
}

function saveOrders(orders) {
  writeJsonAtomic(ORDERS_FILE, orders);
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// --- Orders ---
app.post('/api/orders', (req, res) => {
  const body = req.body || {};
  const orderId = body.id || `PC-${Date.now()}`;

  const orders = loadOrders();
  const idx = orders.findIndex(o => o.id === orderId);

  const normalized = {
    id: orderId,
    userId: body.userId ?? 1,
    date: body.date ?? new Date().toLocaleDateString('fr-FR'),
    status: body.status ?? 'pending',
    items: Array.isArray(body.items) ? body.items : [],
    subtotal: Number(body.subtotal ?? 0),
    deliveryFee: Number(body.deliveryFee ?? 0),
    total: Number(body.total ?? Number(body.subtotal ?? 0) + Number(body.deliveryFee ?? 0)),
    paymentMethod: body.paymentMethod ?? '',
    deliveryAddress: body.deliveryAddress ?? '',
    deliveryDriver: body.deliveryDriver
  };

  if (idx === -1) orders.unshift(normalized);
  else orders[idx] = { ...orders[idx], ...normalized };

  saveOrders(orders);
  res.json({ ok: true, order: normalized });
});

app.get('/api/orders/:id', (req, res) => {
  const orders = loadOrders();
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ ok: false, message: 'Order not found' });
  res.json({ ok: true, order });
});

app.get('/api/orders/pending', (_req, res) => {
  const orders = loadOrders();
  const pending = orders.filter(o => o.status === 'pending');
  res.json({ ok: true, orders: pending });
});

app.patch('/api/orders/:id/status', (req, res) => {
  const orders = loadOrders();
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ ok: false, message: 'Order not found' });

  const status = req.body?.status;
  const deliveryDriver = req.body?.deliveryDriver;

  if (typeof status === 'string') order.status = status;
  if (deliveryDriver) order.deliveryDriver = deliveryDriver;

  saveOrders(orders);
  res.json({ ok: true, order });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[API] listening on http://localhost:${PORT}`);
});

