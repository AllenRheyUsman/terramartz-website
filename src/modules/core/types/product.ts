
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  unit?: string;
  farmName?: string;
  distance?: number;
  deliveryTime?: string;
  isOrganic?: boolean;
  rating?: number | 0;
  reviews?: number;
  farmId?: number;
 inStock?: boolean;

}

export interface ProductWithSellerData extends Product {
  stock: number;
  status: 'in-stock' | 'out-of-stock';
  sales: number;
  views: number;
}

export interface FeaturedProduct extends Product {
  originalPrice?: number | null;
  badges: { label: string; color: string }[];
  description: string;
}

export interface BestSellerProduct extends Product {
  originalPrice: number;
  sold: number;
  discount: number;
  description: string;
  badge: string;
  badgeColor: string;
}
