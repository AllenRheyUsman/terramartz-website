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
import { getProducts, deleteProducts } from '../../actions/product.action';

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
  handleDeleteProduct: (productId: string | number) => Promise<void>;

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
  loadingProducts: boolean;
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
  const [sellerProducts, setSellerProducts] = useState<ProductWithSellerData[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // --- Analytics state ---
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  const [year, setYear] = useState<number>(new Date().getFullYear());

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

  const fetchSellerProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await getProducts(1, 10);

      if (res.success && res.data) {
        const productsArray = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];
        const normalized = productsArray.map((p: any) => ({
          id: p._id,
          name: p.title,
          description: p.description,
          price: p.price,
          originalPrice: p.originalPrice,
          category: p.category?.name || 'Uncategorized',
          stock: p.stockQuantity || p.performance?.currentStock || 0,
          sales: p.totalSold || p.performance?.totalSales || 0,
          rating: p.performance?.rating || 0,
          views: p.performance?.views || 0,
          status: p.status,
          image: p.productImages?.[0] || '/images/placeholder.png',
          seller: p.seller,
        }));

        setSellerProducts(normalized);
      } else {
        console.error('Failed to load seller products:', res.error);
      }
    } catch (err) {
      console.error('Error fetching seller products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleDeleteProduct = async (productId: string | number) => {
    try {
      const res = await deleteProducts(String(productId));
      if (res.success) {
        setSellerProducts((prev) =>
          prev.filter((p) => String(p.id) !== String(productId))
        );
        console.log('Product deleted successfully');
      } else {
        console.error('Failed to delete product:', res.error);
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  useEffect(() => {
    refreshAnalytics(year);
    fetchSellerProducts();
  }, []);

  const recentOrders: OrderWithSellerData[] = [
    {
      id: 'ORD-2024-001',
      customer: 'Sarah Johnson',
      items: ['Organic Tomatoes', 'Fresh Basil'],
      total: 12.99,
      status: 'pending',
      date: '2025-01-20',
      address: '123 Main St, Cityville',
    },
    {
      id: 'ORD-2024-002',
      customer: 'Mike Chen',
      items: ['Avocados', 'Lettuce Mix'],
      total: 18.5,
      status: 'processing',
      date: '2025-01-20',
      address: '456 Oak Ave, Downtown',
    },
    {
      id: 'ORD-2024-003',
      customer: 'Emma Davis',
      items: ['Organic Strawberries'],
      total: 8.99,
      status: 'shipped',
      date: '2025-01-19',
      address: '789 Pine Rd, Suburbs',
    },
    {
      id: 'ORD-2024-004',
      customer: 'David Wilson',
      items: ['Farm Eggs', 'Raw Honey'],
      total: 15.99,
      status: 'delivered',
      date: '2025-01-18',
      address: '321 Elm St, Uptown',
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
        handleDeleteProduct,
        loadingProducts,
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
