'use client';

import { OrderWithSellerData } from '@/modules/core/types/order';
import { ProductWithSellerData } from '@/modules/core/types/product';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Package,
  Truck,
  XCircle,
} from 'lucide-react';
import {
  createContext,
  JSX,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import { getSalesAnalytics } from '@/modules/core/actions/sales.action';
import { getSellerOrders } from '@/modules/core/actions/order.actions';

interface AnalyticsData {
  status: string;
  totalCustomers: number;
  repeatCustomers: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  lifetimeSales: { totalRevenue: number; totalOrders: number };
  dailySales?: Record<string, number>;
  weeklySales?: Record<string, number>;
  monthlySales?: Record<string, number>;
  yearlySales?: number;
}
interface DashboardContextProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // product modals
  viewProduct: ProductWithSellerData | null;
  setViewProduct: (product: ProductWithSellerData | null) => void;
  deleteProduct: ProductWithSellerData | null;
  setDeleteProduct: (product: ProductWithSellerData | null) => void;

  // data
  sellerProducts: ProductWithSellerData[];
  recentOrders: OrderWithSellerData[];

  // analytics
  analytics: AnalyticsData | null;
  loadingAnalytics: boolean;
  analyticsError: string | null;
  year: number;
  setYear: (year: number) => void;
  refreshAnalytics: (year?: number) => Promise<void>;

  // helpers
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;

  // orders loading + refresh
  loadingOrders: boolean;
  refreshOrders: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(
  undefined,
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [viewProduct, setViewProduct] = useState<ProductWithSellerData | null>(
    null,
  );
  const [deleteProduct, setDeleteProduct] =
    useState<ProductWithSellerData | null>(null);

  // --- Analytics state ---
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  // --- Orders state ---
  const [recentOrders, setRecentOrders] = useState<OrderWithSellerData[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // ✅ Fetch seller orders from API
  const fetchSellerOrders = async () => {
    try {
      setLoadingOrders(true);
      console.log('🚀 Fetching seller orders...');
      const res = await getSellerOrders(1, 10, 'recent');
      console.log('📥 Orders API Response:', res);

      if (res.success && res.data) {
        // safely unwrap
        const ordersArray = Array.isArray(res.data)
          ? res.data
          : res.data.orders || res.data.data || [];

        console.log('🧩 Raw Orders from API:', ordersArray);

        // normalize to match your frontend component structure
        const normalized = ordersArray.map((o: any) => {
          const product = o.products || {};
          const buyer = o.buyer || {};
          const address = o.shippingAddress || {};

          const total = (product.price || 0) * (product.quantity || 1);

          const fullName =
            [buyer.firstName, buyer.lastName].filter(Boolean).join(' ') ||
            buyer.email ||
            'Unknown Customer';

          const addressText = [
            address.address,
            address.apartment,
            address.city,
            address.state,
            address.zip,
            address.country,
          ]
            .filter(Boolean)
            .join(', ');

          return {
            id: o.orderId || o._id || 'N/A',
            customer: fullName,
            items: [product.product || 'Unknown Product'],
            total,
            status: o.status || 'pending',
            date: o.createdAt || new Date().toISOString(),
            address: addressText || 'No address provided',
          };
        });

        console.log('🎯 Final normalized orders:', normalized);
        setRecentOrders(normalized);
      } else {
        console.error('❌ Failed to fetch orders:', res.error);
      }
    } catch (err) {
      console.error('🔥 Error fetching seller orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Allow manual refresh
  const refreshOrders = async () => {
    await fetchSellerOrders();
  };

  // --- Fetch analytics ---
  const refreshAnalytics = async (selectedYear?: number) => {
    setLoadingAnalytics(true);
    setAnalyticsError(null);
    try {
      const res = await getSalesAnalytics(selectedYear || year);
      if (res.success && res.status === 'success') {
        setAnalytics(res);
      } else {
        setAnalyticsError(res.error || 'Failed to fetch analytics');
      }
    } catch (err) {
      console.error('Failed to load analytics:', err);
      setAnalyticsError('Something went wrong while loading analytics');
    } finally {
      setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    refreshAnalytics(year);
    fetchSellerOrders();
  }, []);

  // const recentOrders: OrderWithSellerData[] = [
  //   {
  //     id: 'ORD-2024-001',
  //     customer: 'Sarah Johnson',
  //     items: ['Organic Tomatoes', 'Fresh Basil'],
  //     total: 12.99,
  //     status: 'pending',
  //     date: '2025-01-20',
  //     address: '123 Main St, Cityville',
  //   },
  //   {
  //     id: 'ORD-2024-002',
  //     customer: 'Mike Chen',
  //     items: ['Avocados', 'Lettuce Mix'],
  //     total: 18.5,
  //     status: 'processing',
  //     date: '2025-01-20',
  //     address: '456 Oak Ave, Downtown',
  //   },
  //   {
  //     id: 'ORD-2024-003',
  //     customer: 'Emma Davis',
  //     items: ['Organic Strawberries'],
  //     total: 8.99,
  //     status: 'shipped',
  //     date: '2025-01-19',
  //     address: '789 Pine Rd, Suburbs',
  //   },
  //   {
  //     id: 'ORD-2024-004',
  //     customer: 'David Wilson',
  //     items: ['Farm Eggs', 'Raw Honey'],
  //     total: 15.99,
  //     status: 'delivered',
  //     date: '2025-01-18',
  //     address: '321 Elm St, Uptown',
  //   },
  // ];

  const sellerProducts: ProductWithSellerData[] = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      price: 4.99,
      stock: 50,
      category: 'Vegetables',
      status: 'in-stock',
      sales: 234,
      rating: 4.8,
      image:
        'https://images.unsplash.com/photo-1757332334678-e76d258c49c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yZ2FuaWMlMjB0b21hdG9lc3xlbnwxfHx8fDE3NTg1NDYzNTZ8MA&ixlib=rb-4.1.0&q=80&w=400',
      views: 1234,
    },
    {
      id: 2,
      name: 'Fresh Basil',
      price: 2.99,
      stock: 0,
      category: 'Herbs',
      status: 'out-of-stock',
      sales: 156,
      rating: 4.9,
      image:
        'https://images.unsplash.com/photo-1662422325326-19089df23d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGhlcmJzJTIwYmFzaWx8ZW58MXx8fHwxNzU4NTQ2Mzc4fDA&ixlib=rb-4.1.0&q=80&w=400',
      views: 856,
    },
    {
      id: 3,
      name: 'Organic Spinach',
      price: 3.49,
      stock: 30,
      category: 'Vegetables',
      status: 'in-stock',
      sales: 189,
      rating: 4.7,
      image:
        'https://images.unsplash.com/photo-1602193815349-525071f27564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwc3BpbmFjaCUyMGxlYXZlc3xlbnwxfHx8fDE3NTg1NDYzODF8MA&ixlib=rb-4.1.0&q=80&w=400',
      views: 2134,
    },
    {
      id: 4,
      name: 'Fresh Strawberries',
      price: 6.99,
      stock: 25,
      category: 'Fruits',
      status: 'in-stock',
      sales: 298,
      rating: 4.9,
      image:
        'https://images.unsplash.com/photo-1710528184650-fc75ae862c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN0cmF3YmVycmllcyUyMGJlcnJpZXN8ZW58MXx8fHwxNzU4NTQ2Mzc0fDA&ixlib=rb-4.1.0&q=80&w=400',
      views: 1789,
    },
  ];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };
  return (
    <DashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        viewProduct,
        setViewProduct,
        deleteProduct,
        setDeleteProduct,
        sellerProducts,
        recentOrders,
        analytics,
        loadingAnalytics,
        analyticsError,
        year,
        setYear,
        refreshAnalytics,
        getStatusColor,
        getStatusIcon,
        loadingOrders,
        refreshOrders,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx)
    throw new Error('useDashboard must be used inside DashboardProvider');
  return ctx;
};
