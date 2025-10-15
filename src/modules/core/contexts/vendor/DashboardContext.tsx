"use client";
import { OrderWithSellerData } from "@/modules/core/types/order";
import { ProductWithSellerData } from "@/modules/core/types/product";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
import {
  createContext,
  JSX,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { getSalesAnalytics } from "@/modules/core/actions/sales.action";
import { getSellerOrders } from "@/modules/core/actions/order.actions";
import { getProducts, deleteProducts } from "../../actions/product.action";

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
  viewProduct: ProductWithSellerData | null;
  setViewProduct: (product: ProductWithSellerData | null) => void;
  deleteProduct: ProductWithSellerData | null;
  setDeleteProduct: (product: ProductWithSellerData | null) => void;
  handleDeleteProduct: (productId: string | number) => Promise<void>;
  sellerProducts: ProductWithSellerData[];
  recentOrders: OrderWithSellerData[];
  analytics: AnalyticsData | null;
  loadingAnalytics: boolean;
  analyticsError: string | null;
  year: number;
  setYear: (year: number) => void;
  refreshAnalytics: (year?: number) => Promise<void>;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
  loadingProducts: boolean;
  loadingOrders: boolean;
  refreshOrders: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [viewProduct, setViewProduct] = useState<ProductWithSellerData | null>(
    null
  );
  const [deleteProduct, setDeleteProduct] =
    useState<ProductWithSellerData | null>(null);
  const [sellerProducts, setSellerProducts] = useState<ProductWithSellerData[]>(
    []
  );
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [recentOrders, setRecentOrders] = useState<OrderWithSellerData[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const fetchSellerOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await getSellerOrders(1, 10, "recent");
      if (res.success && res.data) {
        const ordersArray = Array.isArray(res.data)
          ? res.data
          : res.data.orders || res.data.data || [];
        const normalized = ordersArray.map((o: any) => {
          const product = o.products || {};
          const buyer = o.buyer || {};
          const address = o.shippingAddress || {};
          const total = (product.price || 0) * (product.quantity || 1);
          const fullName =
            [buyer.firstName, buyer.lastName].filter(Boolean).join(" ") ||
            buyer.email ||
            "Unknown Customer";
          const addressText = [
            address.address,
            address.apartment,
            address.city,
            address.state,
            address.zip,
            address.country,
          ]
            .filter(Boolean)
            .join(", ");
          return {
            id: o.orderId || o._id || "N/A",
            customer: fullName,
            items: [product.product || "Unknown Product"],
            total,
            status: o.status || "pending",
            date: o.createdAt || new Date().toISOString(),
            address: addressText || "No address provided",
          };
        });
        setRecentOrders(normalized);
      } else {
        console.error("Failed to fetch orders:", res.error);
      }
    } catch (err) {
      console.error("Error fetching seller orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const refreshOrders = async () => {
    await fetchSellerOrders();
  };

  const refreshAnalytics = async (selectedYear?: number) => {
    setLoadingAnalytics(true);
    setAnalyticsError(null);
    try {
      const res = await getSalesAnalytics(selectedYear || year);
      if (res.success && res.status === "success") {
        setAnalytics(res);
      } else {
        setAnalyticsError(res.error || "Failed to fetch analytics");
      }
    } catch (err) {
      console.error("Failed to load analytics:", err);
      setAnalyticsError("Something went wrong while loading analytics");
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
          category: p.category?.name || "Uncategorized",
          stock: p.stockQuantity || p.performance?.currentStock || 0,
          sales: p.totalSold || p.performance?.totalSales || 0,
          rating: p.performance?.rating || 0,
          views: p.performance?.views || 0,
          status: p.status,
          image: p.productImages?.[0] || "/images/placeholder.png",
          seller: p.seller,
        }));

        setSellerProducts(normalized);
      } else {
        console.error("Failed to load seller products:", res.error);
      }
    } catch (err) {
      console.error("Error fetching seller products:", err);
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
      } else {
        console.error("Failed to delete product:", res.error);
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  useEffect(() => {
    refreshAnalytics(year);
    fetchSellerProducts();
    fetchSellerOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "in-stock":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "processing":
        return <Package className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
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
        handleDeleteProduct,
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
    throw new Error("useDashboard must be used inside DashboardProvider");
  return ctx;
};
