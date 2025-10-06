/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageWithFallback } from '@/modules/core/components/common/ImageWithFallback';

export default function CategoryCard({ category }: { category: any }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
      style={{ backgroundColor: category.bgColor }}
    >
      <div className="p-4 h-full">
        <div className="aspect-square relative overflow-hidden rounded-xl mb-4">
          <ImageWithFallback
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors duration-300"></div>
          <div className="absolute top-2 right-2 text-2xl bg-white/90 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
            {category.icon}
          </div>
        </div>
        <h3 className="font-semibold text-gray-800 text-center transition-colors duration-200">
          {category.name}
        </h3>
      </div>
    </div>
  );
}
