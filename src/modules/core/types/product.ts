
export interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category: string;
  unit?: string;
  farmName?: string;
  distance?: number;
  deliveryTime?: string;
  isOrganic?: boolean;
  rating?: number;
  reviews?: number;
  farmId?: number;
}

export interface ProductWithSellerData extends Product {
  stock: number;
  status: 'in-stock' | 'out-of-stock';
  sales: number;
  views: number;
}
