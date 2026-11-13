import { AuthUser, ServerOrder, ServerOrderItem } from '../types/auth';

const TOKEN_KEY = 'maktab_auth_token';
const LOCAL_USERS_KEY = 'maktab_static_users_v1';
const LOCAL_ORDERS_KEY = 'maktab_static_orders_v1';

interface LocalUserRecord extends AuthUser {
  passwordHash: string;
}

async function sha256Hex(input: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  return input;
}

async function getLocalUsers(): Promise<LocalUserRecord[]> {
  try {
    const raw = window.localStorage.getItem(LOCAL_USERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as LocalUserRecord[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Ignore storage read errors
  }
  const demoHash = await sha256Hex('fatemi1405');
  const seeded: LocalUserRecord[] = [
    {
      id: 'usr_demo_reader',
      fullName: 'علیرضا محمدی',
      email: 'reader@maktab.ir',
      phone: '09123456789',
      passwordHash: demoHash
    }
  ];
  try {
    window.localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(seeded));
  } catch {
    // Ignore
  }
  return seeded;
}

function saveLocalUsers(users: LocalUserRecord[]) {
  try {
    window.localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch {
    // Ignore
  }
}

function getLocalOrders(): ServerOrder[] {
  try {
    const raw = window.localStorage.getItem(LOCAL_ORDERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ServerOrder[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Ignore
  }
  return [];
}

function saveLocalOrders(orders: ServerOrder[]) {
  try {
    window.localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
  } catch {
    // Ignore
  }
}

async function tryServerJson<T>(
  url: string,
  options: RequestInit
): Promise<{ status: number; data: T } | null> {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';
    if (res.status === 404 || res.status === 405 || !contentType.includes('application/json')) {
      return null;
    }
    const data = (await res.json()) as T;
    return { status: res.status, data };
  } catch {
    return null;
  }
}

export function getStoredToken(): string | null {
  try {
    return window.sessionStorage.getItem(TOKEN_KEY) || window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function storeToken(token: string | null) {
  try {
    if (token) {
      window.sessionStorage.setItem(TOKEN_KEY, token);
      window.localStorage.setItem(TOKEN_KEY, token);
    } else {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // Ignore
  }
}

export async function loginAccount(
  email: string,
  password: string
): Promise<{ user: AuthUser; token: string }> {
  const serverRes = await tryServerJson<{ user?: AuthUser; token?: string; error?: string }>(
    '/api/auth/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }
  );

  if (serverRes) {
    if (serverRes.status >= 400 || !serverRes.data.user || !serverRes.data.token) {
      throw new Error(serverRes.data.error || 'ایمیل یا رمز عبور نادرست است.');
    }
    storeToken(serverRes.data.token);
    return { user: serverRes.data.user, token: serverRes.data.token };
  }

  // Static hosting (GitHub Pages) fallback
  const cleanEmail = email.trim().toLowerCase();
  const users = await getLocalUsers();
  const found = users.find((u) => u.email === cleanEmail);
  const hash = await sha256Hex(password);
  if (!found || found.passwordHash !== hash) {
    throw new Error('ایمیل یا رمز عبور نادرست است.');
  }
  const token = `static:${found.id}`;
  storeToken(token);
  return {
    user: { id: found.id, fullName: found.fullName, email: found.email, phone: found.phone },
    token
  };
}

export async function registerAccount(payload: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}): Promise<{ user: AuthUser; token: string }> {
  const serverRes = await tryServerJson<{ user?: AuthUser; token?: string; error?: string }>(
    '/api/auth/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
  );

  if (serverRes) {
    if (serverRes.status >= 400 || !serverRes.data.user || !serverRes.data.token) {
      throw new Error(serverRes.data.error || 'خطا در ثبت‌نام حساب کاربری.');
    }
    storeToken(serverRes.data.token);
    return { user: serverRes.data.user, token: serverRes.data.token };
  }

  // Static hosting (GitHub Pages) fallback
  const cleanEmail = payload.email.trim().toLowerCase();
  if (payload.password.length < 6) {
    throw new Error('رمز عبور باید دست‌کم ۶ کاراکتر باشد.');
  }
  const users = await getLocalUsers();
  if (users.some((u) => u.email === cleanEmail)) {
    throw new Error('این ایمیل پیش‌تر ثبت شده است. لطفاً وارد شوید.');
  }
  const newUser: LocalUserRecord = {
    id: `usr_${Date.now().toString(36)}`,
    fullName: payload.fullName.trim(),
    email: cleanEmail,
    phone: payload.phone.trim(),
    passwordHash: await sha256Hex(payload.password)
  };
  users.push(newUser);
  saveLocalUsers(users);

  const token = `static:${newUser.id}`;
  storeToken(token);
  return {
    user: {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone
    },
    token
  };
}

export async function restoreSession(): Promise<{ user: AuthUser; token: string } | null> {
  const token = getStoredToken();
  const serverRes = await tryServerJson<{ user?: AuthUser }>('/api/auth/me', {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });

  if (serverRes) {
    if (serverRes.status === 200 && serverRes.data.user && token) {
      return { user: serverRes.data.user, token };
    }
    return null;
  }

  if (token && token.startsWith('static:')) {
    const uid = token.slice(7);
    const users = await getLocalUsers();
    const found = users.find((u) => u.id === uid);
    if (found) {
      return {
        user: { id: found.id, fullName: found.fullName, email: found.email, phone: found.phone },
        token
      };
    }
  }
  return null;
}

export async function logoutAccount(): Promise<void> {
  await tryServerJson('/api/auth/logout', { method: 'POST' });
  storeToken(null);
}

export async function fetchUserOrders(token: string | null): Promise<ServerOrder[]> {
  const serverRes = await tryServerJson<{ orders?: ServerOrder[] }>('/api/orders', {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (serverRes) {
    if (serverRes.status === 200 && Array.isArray(serverRes.data.orders)) {
      return serverRes.data.orders;
    }
    return [];
  }

  if (token && token.startsWith('static:')) {
    const uid = token.slice(7);
    return getLocalOrders().filter((o) => o.userId === uid);
  }
  return [];
}

export async function submitOrder(
  token: string | null,
  payload: {
    customerName: string;
    phone: string;
    city: string;
    address: string;
    postalCode: string;
    paymentMethod: 'online' | 'cod';
    items: ServerOrderItem[];
  }
): Promise<ServerOrder> {
  const serverRes = await tryServerJson<{ order?: ServerOrder; error?: string }>('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(payload)
  });

  if (serverRes) {
    if (serverRes.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    if (serverRes.status >= 400 || !serverRes.data.order) {
      throw new Error(serverRes.data.error || 'خطا در ثبت سفارش.');
    }
    return serverRes.data.order;
  }

  if (!token || !token.startsWith('static:')) {
    throw new Error('UNAUTHORIZED');
  }

  const uid = token.slice(7);
  const subtotalToman = payload.items.reduce(
    (sum, item) => sum + item.unitPriceToman * item.quantity,
    0
  );
  const shippingToman = subtotalToman >= 800000 ? 0 : 45000;
  const order: ServerOrder = {
    orderCode: `MF-${Math.floor(100000 + Math.random() * 899999)}`,
    userId: uid,
    customerName: payload.customerName,
    phone: payload.phone,
    city: payload.city,
    address: payload.address,
    postalCode: payload.postalCode,
    paymentMethod: payload.paymentMethod,
    items: payload.items,
    subtotalToman,
    shippingToman,
    totalToman: subtotalToman + shippingToman,
    createdAt: new Date().toISOString()
  };

  const existing = getLocalOrders();
  existing.unshift(order);
  saveLocalOrders(existing);
  return order;
}
