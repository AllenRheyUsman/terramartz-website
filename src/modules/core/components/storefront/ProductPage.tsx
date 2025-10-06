/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ImageWithFallback } from '@/modules/core/components/common/ImageWithFallback';
import ProductCard from '@/modules/core/components/common/ProductCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/modules/core/components/ui/breadcrumb';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/core/components/ui/select';
import { ChevronRight, Filter, Home, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';

interface ProductListPageClientProps {
  allProducts: any[];
  categories: string[];
  onProductClick?: (product: any) => void;
  onAddToCart?: (product: any, sourceElement: HTMLElement) => void;
  onBack?: () => void;
  onNavigateToCategories?: () => void;
  initialCategory?: string;
  initialSearchTerm?: string;
}

export default function ProductListPageClient({
  allProducts,
  categories,
  onProductClick,
  onAddToCart,
  onBack,
  onNavigateToCategories,
  initialCategory = 'All',
  initialSearchTerm = '',
}: ProductListPageClientProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Search filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (p) => p.category === selectedCategory || p.badge === selectedCategory,
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, allProducts]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden bg-[#FED15E]">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Fresh <span className="text-amber-600">Products</span>
            </h1>
            <p className="text-lg text-gray-600">
              Discover our full collection of farm-fresh produce and premium
              foods
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1568583922678-3d514ca09711?..."
              alt="Fresh basket"
              className="w-full max-w-lg h-96 object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={onBack}
                  className="cursor-pointer hover:text-amber-600 flex items-center"
                >
                  <Home className="w-4 h-4 mr-1" /> Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="w-4 h-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={onNavigateToCategories}
                  className="cursor-pointer hover:text-amber-600 text-gray-600"
                >
                  Categories
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="w-4 h-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-amber-600 font-medium">
                  Products
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-4 mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl"
        >
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-amber-200 focus:ring-2 focus:ring-amber-300"
            />
          </div>

          {/* Category Select */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full lg:w-48 bg-white border-amber-200">
              <Filter className="w-4 h-4 mr-2 text-amber-600" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort Select */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48 bg-white border-amber-200">
              <span className="text-amber-600 mr-2">Sort</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -8,
                transition: { type: 'spring', stiffness: 400, damping: 17 },
              }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden cursor-pointer"
              onClick={() => onProductClick?.(product)}
            >
              <ProductCard
                type="animated"
                index={0}
                product={product}
                onProductClick={(p) => console.log('clicked', p)}
                onAddToCart={(p) => console.log('add to cart', p)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
