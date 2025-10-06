import { Product } from '@/modules/core/types/product';

export interface StorefrontProps {
  onShopNow?: () => void;
  onSellWithUs?: () => void;
}
export interface LocalMapProps {
  onAddToCart?:(product: Product, sourceElement: HTMLElement) => void;
  onNavigateToLocalMap?:() => void;
}
