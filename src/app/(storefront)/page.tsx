import BestSellers from '@/modules/core/components/storefront/BestSellerSection';
import CategoriesSection from '@/modules/core/components/storefront/CategoriesSection';
import FeaturedProductsSection from '@/modules/core/components/storefront/FeaturedProductsSection';
import HeroBanner from '@/modules/core/components/storefront/HeroBanner';

export default async function Storefront({}) {
  return (
    <>
      <HeroBanner />
      <CategoriesSection />
      <FeaturedProductsSection />
      <BestSellers />
    </>
  );
}
