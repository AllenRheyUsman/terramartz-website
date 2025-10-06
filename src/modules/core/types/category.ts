
export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  color: string;
  productCount: number;
}

export interface CategoryCardProps {
  category: Category;
  viewMode: 'grid' | 'list';
  onCategoryClick?: (category: Category) => void;
}
