import ProductListPageClient from '@/modules/core/components/storefront/ProductPage';

export default async function ProductListPage() {
  const categories = ['All', 'Fruits', 'Vegetables', 'Organic', 'Premium'];
  const allProducts = [
    {
      id: 1,
      name: 'Organic Bananas Abhay',
      price: 3.99,
      originalPrice: 4.99,
      rating: 4.8,
      reviews: 124,
      image:
        'https://images.unsplash.com/photo-1757332050958-b797a022c910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhbmFuYXMlMjB5ZWxsb3d8ZW58MXx8fHwxNzU4MDczNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: 'Organic',
      badgeColor: 'bg-green-500',
      category: 'Fruits',
      description: 'Sweet, nutritious, and perfectly ripe organic bananas.',
    },
    {
      id: 2,
      name: 'Fresh Orange',
      price: 2.5,
      originalPrice: null,
      rating: 4.6,
      reviews: 89,
      image:
        'https://images.unsplash.com/photo-1663002976076-de02deea5fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2VzJTIwY2l0cnVzJTIwZnJ1aXR8ZW58MXx8fHwxNzU4MDczNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: 'Fresh',
      badgeColor: 'bg-orange-500',
      category: 'Fruits',
      description: 'Juicy, vitamin C-rich oranges picked at peak freshness.',
    },
    {
      id: 3,
      name: 'Vine Tomatoes',
      price: 4.25,
      originalPrice: 5.0,
      rating: 4.9,
      reviews: 156,
      image:
        'https://images.unsplash.com/photo-1700064165267-8fa68ef07167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZWQlMjB0b21hdG9lcyUyMGZyZXNofGVufDF8fHx8MTc1ODA3MzcwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: 'Premium',
      badgeColor: 'bg-red-500',
      category: 'Vegetables',
      description: 'Premium vine-ripened tomatoes with exceptional flavor.',
    },
    {
      id: 4,
      name: 'Green Vegetables Mix',
      price: 6.99,
      originalPrice: null,
      rating: 4.7,
      reviews: 203,
      image:
        'https://images.unsplash.com/photo-1757332334626-8dadb145540d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHZlZ2V0YWJsZXMlMjBicm9jY29saXxlbnwxfHx8fDE3NTgwNzM3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: 'Bundle',
      badgeColor: 'bg-emerald-500',
      category: 'Vegetables',
      description: 'A nutritious mix of fresh green vegetables.',
    },
    {
      id: 5,
      name: 'Red Apples',
      price: 3.25,
      originalPrice: null,
      rating: 4.5,
      reviews: 67,
      image:
        'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBhcHBsZXMlMjBmcmVzaHxlbnwxfHx8fDE3NTgwNzg0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: 'Fresh',
      badgeColor: 'bg-red-400',
      category: 'Fruits',
      description: 'Crisp and sweet red apples, perfect for snacking.',
    },
    {
      id: 6,
      name: 'Fresh Carrots',
      price: 2.75,
      originalPrice: 3.25,
      rating: 4.4,
      reviews: 92,
      image:
        'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNhcnJvdHMlMjBvcmFuZ2V8ZW58MXx8fHwxNzU4MDc4NDIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: 'Organic',
      badgeColor: 'bg-orange-500',
      category: 'Vegetables',
      description: 'Fresh organic carrots, rich in vitamins and minerals.',
    },
    {
      id: 7,
      name: 'Baby Spinach',
      price: 4.5,
      originalPrice: null,
      rating: 4.8,
      reviews: 134,
      image:
        'https://images.unsplash.com/photo-1576045057995-568f588f82fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc3BpbmFjaCUyMGdyZWVufGVufDF8fHx8MTc1ODA3ODQyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: 'Organic',
      badgeColor: 'bg-green-500',
      category: 'Vegetables',
      description: 'Tender baby spinach leaves, perfect for salads.',
    },
    {
      id: 8,
      name: 'Avocado',
      price: 1.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 78,
      image:
        'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwZnJ1aXQlMjBncmVlbnxlbnwxfHx8fDE3NTgwNzg0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: 'Premium',
      badgeColor: 'bg-green-600',
      category: 'Fruits',
      description: 'Creamy, nutritious avocados perfect for any meal.',
    },
    {
      id: 9,
      name: 'Fresh Farm Vegetables',
      price: 12.99,
      originalPrice: 15.99,
      rating: 4.9,
      reviews: 342,
      sold: 1250,
      image:
        'https://images.unsplash.com/photo-1603403887668-a23fbcd4d8be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMHZlZ2V0YWJsZXMlMjBiYXNrZXR8ZW58MXx8fHwxNzU4MDczNzA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      discount: 20,
      category: 'Vegetables',
      description:
        'A premium assortment of fresh farm vegetables including tomatoes, lettuce, carrots, and more. Perfect for healthy cooking and meal prep.',
      badge: 'Best Seller',
      badgeColor: 'bg-red-500',
    },
    {
      id: 10,
      name: 'Organic Fruit Bundle',
      price: 18.5,
      originalPrice: 22.0,
      rating: 4.8,
      reviews: 268,
      sold: 980,
      image:
        'https://images.unsplash.com/photo-1757332050958-b797a022c910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhbmFuYXMlMjB5ZWxsb3d8ZW58MXx8fHwxNzU4MDczNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      discount: 16,
      category: 'Fruits',
      description:
        'An organic selection of seasonal fruits including bananas, apples, oranges, and berries. All certified organic and sustainably grown.',
      badge: 'Organic',
      badgeColor: 'bg-green-500',
    },
    {
      id: 11,
      name: 'Premium Tomato Pack',
      price: 8.75,
      originalPrice: 10.5,
      rating: 4.7,
      reviews: 189,
      sold: 756,
      image:
        'https://images.unsplash.com/photo-1700064165267-8fa68ef07167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZWQlMjB0b21hdG9lcyUyMGZyZXNofGVufDF8fHx8MTc1ODA3MzcwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      discount: 17,
      category: 'Vegetables',
      description:
        'Premium vine-ripened tomatoes with exceptional flavor and perfect texture. Ideal for salads, sauces, or fresh cooking.',
      badge: 'Premium',
      badgeColor: 'bg-amber-500',
    },
    {
      id: 12,
      name: 'Organic Bananas',
      price: 3.99,
      originalPrice: 4.99,
      rating: 4.8,
      reviews: 124,
      image:
        'https://images.unsplash.com/photo-1757332050958-b797a022c910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhbmFuYXMlMjB5ZWxsb3d8ZW58MXx8fHwxNzU4MDczNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badges: [
        {
          label: 'Best Seller',
          color: 'bg-gradient-to-r from-orange-400 to-orange-500',
        },
        {
          label: "Farmer's Choice",
          color: 'bg-gradient-to-r from-emerald-400 to-emerald-500',
        },
      ],
      category: 'Fruits',
      description:
        'Sweet, nutritious, and perfectly ripe organic bananas. Great for smoothies, baking, or healthy snacking.',
    },
    {
      id: 13,
      name: 'Fresh Orange',
      price: 2.5,
      originalPrice: null,
      rating: 4.6,
      reviews: 89,
      image:
        'https://images.unsplash.com/photo-1663002976076-de02deea5fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2VzJTIwY2l0cnVzJTIwZnJ1aXR8ZW58MXx8fHwxNzU4MDczNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badges: [
        {
          label: "Farmer's Choice",
          color: 'bg-gradient-to-r from-emerald-400 to-emerald-500',
        },
      ],
      category: 'Fruits',
      description:
        'Juicy, vitamin C-rich oranges picked at peak freshness. Perfect for fresh juice or healthy snacking.',
    },
    {
      id: 14,
      name: 'Vine Tomatoes',
      price: 4.25,
      originalPrice: 5.0,
      rating: 4.9,
      reviews: 156,
      image:
        'https://images.unsplash.com/photo-1700064165267-8fa68ef07167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB0b21hdG9lcyUyMGZyZXNofGVufDF8fHx8MTc1ODA3MzcwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badges: [
        {
          label: 'Top Rated',
          color: 'bg-gradient-to-r from-amber-400 to-yellow-500',
        },
        {
          label: 'Best Seller',
          color: 'bg-gradient-to-r from-orange-400 to-orange-500',
        },
      ],
      category: 'Vegetables',
      description:
        'Premium vine-ripened tomatoes with exceptional flavor and texture. Perfect for salads, cooking, or sandwiches.',
    },
    {
      id: 15,
      name: 'Green Vegetables Mix',
      price: 6.99,
      originalPrice: null,
      rating: 4.7,
      reviews: 203,
      image:
        'https://images.unsplash.com/photo-1757332334626-8dadb145540d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHZlZ2V0YWJsZXMlMjBicm9jY29saXxlbnwxfHx8fDE3NTgwNzM3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badges: [
        {
          label: "Farmer's Choice",
          color: 'bg-gradient-to-r from-emerald-400 to-emerald-500',
        },
        {
          label: 'Top Rated',
          color: 'bg-gradient-to-r from-amber-400 to-yellow-500',
        },
      ],
      category: 'Vegetables',
      description:
        'A nutritious mix of fresh green vegetables including broccoli, spinach, and kale. Perfect for healthy meals.',
    },
  ];
  return (
    <ProductListPageClient
      allProducts={allProducts}
      categories={categories}
      initialCategory="All"
      initialSearchTerm=""
    />
  );
}
