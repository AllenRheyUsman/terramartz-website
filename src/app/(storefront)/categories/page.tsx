/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import CategoryCard from '@/modules/core/components/common/CategoryCard';
import CategoryStatsBanner from '@/modules/core/components/common/CategoryStatsBanner';
import { ImageWithFallback } from '@/modules/core/components/common/ImageWithFallback';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/modules/core/components/ui/breadcrumb';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/core/components/ui/select';
import { Select } from '@radix-ui/react-select';
import { ChevronRight, Grid, Home, List, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
const categories = [
  {
    id: 1,
    name: 'Fresh Fruits',
    description: 'Sweet and nutritious fruits picked at peak ripeness',
    image:
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    productCount: 45,
    color: '#FDCF60',
  },
  {
    id: 2,
    name: 'Fresh Vegetables',
    description: 'Farm-fresh vegetables bursting with flavor and nutrients',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    productCount: 38,
    color: '#82DBA1',
  },
  {
    id: 3,
    name: 'Organic Produce',
    description: 'Certified organic fruits and vegetables',
    image:
      'https://images.unsplash.com/photo-1506976785307-8732e854ad03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    productCount: 52,
    color: '#AAD261',
  },
  {
    id: 4,
    name: 'Herbs & Spices',
    description: 'Fresh herbs and aromatic spices for every kitchen',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    productCount: 23,
    color: '#8DD8D4',
  },
];

interface CategoryPageProps {
  onCategoryClick?: (category: any) => void;
  onBack?: () => void;
  onNavigateToProducts?: () => void;
}

export default function CategoryPage({
  onCategoryClick,
  onBack,
  onNavigateToProducts,
}: CategoryPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCategories = useMemo(() => {
    let filtered = categories;

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    filtered.sort((a, b) =>
      sortBy === 'products'
        ? b.productCount - a.productCount
        : a.name.localeCompare(b.name),
    );

    return filtered;
  }, [searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative py-12 overflow-hidden"
        style={{ backgroundColor: '#FED15E' }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              >
                Browse <span className="text-amber-600">Categories</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-600 max-w-lg"
              >
                Explore our curated categories of fresh, premium produce from
                local farms.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1648090229186-6188eaefcc6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Fresh vegetables basket"
                className="w-full max-w-lg h-96 object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

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
                  <Home className="w-4 h-4 mr-1" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="w-4 h-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-amber-600 font-medium">
                  Categories
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
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-amber-200 focus:ring-2 focus:ring-amber-300 transition-all"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48 bg-white border-amber-200 focus:ring-amber-300">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A–Z</SelectItem>
              <SelectItem value="products">Most Products</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex bg-white rounded-full border border-amber-200 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-all ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-gray-500 hover:text-amber-600'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-all ${
                viewMode === 'list'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-gray-500 hover:text-amber-600'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Category Cards */}
        <div
          className={`${
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
          }`}
        >
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: viewMode === 'grid' ? -8 : 0,
                transition: { type: 'spring', stiffness: 400, damping: 17 },
              }}
              onClick={() => onCategoryClick?.(category)}
            >
              <CategoryCard category={category} viewMode={viewMode} />
            </motion.div>
          ))}
        </div>
        <CategoryStatsBanner />
      </div>
    </div>
  );
}
