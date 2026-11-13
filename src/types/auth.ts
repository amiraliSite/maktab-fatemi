export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface ServerOrderItem {
  bookId: string;
  title: string;
  quantity: number;
  unitPriceToman: number;
}

export interface ServerOrder {
  orderCode: string;
  userId: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  postalCode: string;
  paymentMethod: 'online' | 'cod';
  items: ServerOrderItem[];
  subtotalToman: number;
  shippingToman: number;
  totalToman: number;
  createdAt: string;
}
