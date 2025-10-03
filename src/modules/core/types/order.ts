export default interface Order {
  id: string;
  date: string;
  total: number;
  status: 'delivered' | 'shipping' | 'processing' | 'cancelled';
  items: number;
  trackingNumber?: string;
}
