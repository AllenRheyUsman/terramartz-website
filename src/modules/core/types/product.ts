
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
