import express from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'maktab-fatemi-archival-session-key-2026';

interface StoredUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
}

interface OrderRecord {
  orderCode: string;
  userId: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  postalCode: string;
  paymentMethod: 'online' | 'cod';
  items: Array<{
    bookId: string;
    title: string;
    quantity: number;
    unitPriceToman: number;
  }>;
  subtotalToman: number;
  shippingToman: number;
  totalToman: number;
  createdAt: string;
}

interface StoreState {
  users: StoredUser[];
  orders: OrderRecord[];
}

const DATA_DIR = path.join(__dirname, '.data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function verifyPassword(password: string, salt: string, storedHash: string): boolean {
  const derived = crypto.scryptSync(password, salt, 64);
  const storedBuf = Buffer.from(storedHash, 'hex');
  if (derived.length !== storedBuf.length) return false;
  return crypto.timingSafeEqual(derived, storedBuf);
}

function createInitialStore(): StoreState {
  const demoSalt = 'maktab-demo-salt-1405';
  const demoUser: StoredUser = {
    id: 'usr_demo_reader',
    fullName: 'علیرضا محمدی',
    email: 'reader@maktab.ir',
    phone: '09123456789',
    salt: demoSalt,
    passwordHash: hashPassword('fatemi1405', demoSalt),
    createdAt: new Date().toISOString()
  };
  return {
    users: [demoUser],
    orders: []
  };
}

function loadStore(): StoreState {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, 'utf-8');
      const parsed = JSON.parse(raw) as StoreState;
      if (Array.isArray(parsed.users) && Array.isArray(parsed.orders)) {
        return parsed;
      }
    }
  } catch {
    // Fallback to in-memory seed if filesystem read fails
  }
  return createInitialStore();
}

let store: StoreState = loadStore();

function saveStore(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
  } catch {
    // Keep running cleanly in memory if disk write is restricted
  }
}

function signToken(userId: string): string {
  const payload = Buffer.from(
    JSON.stringify({ uid: userId, iat: Date.now() }),
    'utf-8'
  ).toString('base64url');
  const sig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('base64url');
  return `${payload}.${sig}`;
}

function verifyToken(token: string): string | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expectedSig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('base64url');
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }
  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as {
      uid?: string;
    };
    return typeof decoded.uid === 'string' ? decoded.uid : null;
  } catch {
    return null;
  }
}

function extractSessionUser(req: express.Request): StoredUser | null {
  let token: string | null = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  }
  if (!token && req.headers.cookie) {
    const cookies = req.headers.cookie.split(';');
    for (const cookie of cookies) {
      const [k, ...rest] = cookie.trim().split('=');
      if (k === 'maktab_session') {
        token = decodeURIComponent(rest.join('='));
        break;
      }
    }
  }
  if (!token) return null;
  const uid = verifyToken(token);
  if (!uid) return null;
  return store.users.find((u) => u.id === uid) || null;
}

function sanitizeUser(user: StoredUser) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone
  };
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.post('/api/auth/register', (req, res) => {
    const { fullName, email, phone, password } = req.body as {
      fullName?: string;
      email?: string;
      phone?: string;
      password?: string;
    };

    const cleanName = (fullName || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPhone = (phone || '').trim();
    const cleanPassword = password || '';

    if (!cleanName || cleanName.length < 2) {
      res.status(400).json({ error: 'لطفاً نام و نام خانوادگی معتبر وارد کنید.' });
      return;
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      res.status(400).json({ error: 'لطفاً نشانی ایمیل معتبر وارد کنید.' });
      return;
    }
    if (cleanPassword.length < 6) {
      res.status(400).json({ error: 'رمز عبور باید دست‌کم ۶ کاراکتر باشد.' });
      return;
    }

    const exists = store.users.some((u) => u.email === cleanEmail);
    if (exists) {
      res.status(409).json({ error: 'این ایمیل پیش‌تر ثبت شده است. لطفاً وارد شوید.' });
      return;
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const newUser: StoredUser = {
      id: `usr_${crypto.randomBytes(6).toString('hex')}`,
      fullName: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      salt,
      passwordHash: hashPassword(cleanPassword, salt),
      createdAt: new Date().toISOString()
    };

    store.users.push(newUser);
    saveStore();

    const token = signToken(newUser.id);
    res.setHeader(
      'Set-Cookie',
      `maktab_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
    );
    res.status(201).json({ user: sanitizeUser(newUser), token });
  });

  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body as { email?: string; password?: string };
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = password || '';

    if (!cleanEmail || !cleanPassword) {
      res.status(400).json({ error: 'لطفاً ایمیل و رمز عبور را وارد کنید.' });
      return;
    }

    const user = store.users.find((u) => u.email === cleanEmail);
    if (!user || !verifyPassword(cleanPassword, user.salt, user.passwordHash)) {
      res.status(401).json({ error: 'ایمیل یا رمز عبور نادرست است.' });
      return;
    }

    const token = signToken(user.id);
    res.setHeader(
      'Set-Cookie',
      `maktab_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
    );
    res.json({ user: sanitizeUser(user), token });
  });

  app.get('/api/auth/me', (req, res) => {
    const user = extractSessionUser(req);
    if (!user) {
      res.status(401).json({ error: 'احراز هویت انجام نشده است.' });
      return;
    }
    res.json({ user: sanitizeUser(user) });
  });

  app.post('/api/auth/logout', (_req, res) => {
    res.setHeader(
      'Set-Cookie',
      'maktab_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'
    );
    res.json({ ok: true });
  });

  app.get('/api/orders', (req, res) => {
    const user = extractSessionUser(req);
    if (!user) {
      res.status(401).json({ error: 'برای مشاهده سوابق خرید باید وارد حساب کاربری شوید.' });
      return;
    }
    const userOrders = store.orders
      .filter((o) => o.userId === user.id)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    res.json({ orders: userOrders });
  });

  app.post('/api/orders', (req, res) => {
    const user = extractSessionUser(req);
    if (!user) {
      res.status(401).json({
        error: 'امکان خرید کتاب بدون ورود به حساب کاربری وجود ندارد. لطفاً ابتدا وارد شوید.'
      });
      return;
    }

    const body = req.body as Partial<OrderRecord>;
    if (
      !body.customerName?.trim() ||
      !body.phone?.trim() ||
      !body.city?.trim() ||
      !body.address?.trim() ||
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      res.status(400).json({ error: 'مشخصات ارسال یا اقلام سبد خرید ناقص است.' });
      return;
    }

    const subtotalToman = body.items.reduce(
      (sum, item) => sum + Number(item.unitPriceToman || 0) * Number(item.quantity || 1),
      0
    );
    const shippingToman = subtotalToman >= 800000 ? 0 : 45000;
    const totalToman = subtotalToman + shippingToman;
    const randomDigits = Math.floor(100000 + Math.random() * 899999);

    const record: OrderRecord = {
      orderCode: `MF-${randomDigits}`,
      userId: user.id,
      customerName: body.customerName.trim(),
      phone: body.phone.trim(),
      city: body.city.trim(),
      address: body.address.trim(),
      postalCode: (body.postalCode || '').trim(),
      paymentMethod: body.paymentMethod === 'cod' ? 'cod' : 'online',
      items: body.items.map((item) => ({
        bookId: String(item.bookId),
        title: String(item.title),
        quantity: Math.max(1, Number(item.quantity || 1)),
        unitPriceToman: Math.max(0, Number(item.unitPriceToman || 0))
      })),
      subtotalToman,
      shippingToman,
      totalToman,
      createdAt: new Date().toISOString()
    };

    store.orders.push(record);
    saveStore();
    res.status(201).json({ order: record });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
