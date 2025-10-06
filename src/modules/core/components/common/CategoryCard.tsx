import { ImageWithFallback } from '@/modules/core/components/common/ImageWithFallback';
import { Badge } from '@/modules/core/components/ui/badge';
import { Button } from '@/modules/core/components/ui/button';
import { CategoryCardProps } from '@/modules/core/types/category';

export default function CategoryCard({
  category,
  viewMode,
  onCategoryClick,
}: CategoryCardProps) {
  return (
    <div
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${
        viewMode === 'list' ? 'flex items-center' : ''
      }`}
      onClick={() => onCategoryClick?.(category)}
    >
      <div
        className={`relative overflow-hidden ${
          viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : ''
        }`}
      >
        <ImageWithFallback
          src={category.image}
          alt={category.name}
          className={`${
            viewMode === 'grid'
              ? 'w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300'
              : 'w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
          }`}
        />
        <div
          className="absolute inset-0 opacity-90 group-hover:opacity-80 transition-opacity duration-300"
          style={{ backgroundColor: category.color }}
        ></div>

        <Badge className="absolute top-3 right-3 bg-white text-gray-800 border-0 shadow-md">
          {category.productCount} items
        </Badge>
      </div>

      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-200 text-xl">
          {category.name}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {category.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {category.productCount} products available
          </span>

          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onCategoryClick?.(category);
            }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
}
