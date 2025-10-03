export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'delivered' | 'shipping' | 'processing' | 'cancelled';
  items: number;
  trackingNumber?: string;
}

export interface OrderWithSellerData extends Omit<Order, 'status' | 'items'> {
  customer: string;
  items: string[];
  address: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}
