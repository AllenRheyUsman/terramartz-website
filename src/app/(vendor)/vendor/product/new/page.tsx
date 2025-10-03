'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageWithFallback } from '@/modules/core/components/common/ImageWithFallback';
import { Badge } from '@/modules/core/components/ui/badge';
import { Button } from '@/modules/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { Input } from '@/modules/core/components/ui/input';
import { Label } from '@/modules/core/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/core/components/ui/select';
import { Switch } from '@/modules/core/components/ui/switch';
import { Textarea } from '@/modules/core/components/ui/textarea';
import VendorDashboardSubHeaderHeader from '@/modules/core/components/vendor/VendorDashboardSubHeader';
import { Plus, Save, Upload, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface AddProductPageProps {
  onBack?: () => void;
  onSave?: (productData: any) => void;
}

export default function AddProductPage({
  onBack,
  onSave,
}: AddProductPageProps) {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    description: '',
    stock: '',
    tags: [] as string[],
    images: [] as string[],
    isOrganic: false,
    isFeatured: false,
    status: 'active',
  });

  const [currentTag, setCurrentTag] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    'Vegetables',
    'Fruits',
    'Herbs',
    'Dairy',
    'Grains',
    'Nuts & Seeds',
    'Spices',
    'Honey & Sweeteners',
  ];

  const sampleImages = [
    'https://images.unsplash.com/photo-1757332334678-e76d258c49c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yZ2FuaWMlMjB0b21hdG9lc3xlbnwxfHx8fDE3NTg1NDYzNTZ8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1603462903957-566630607cc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNhcnJvdHMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1ODU0NjM1OXww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1741515042603-70545daeb0c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwbGV0dHVjZSUyMGdyZWVuc3xlbnwxfHx8fDE3NTg1NDYzNjN8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1609869882409-a5274ce68923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJlbGwlMjBwZXBwZXJzfGVufDF8fHx8MTc1ODU0NjM2Nnww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1683688684067-b87a189c7503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwYXBwbGVzJTIwZnJ1aXR8ZW58MXx8fHwxNzU4NTQ2MzY5fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1710528184650-fc75ae862c13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN0cmF3YmVycmllcyUyMGJlcnJpZXN8ZW58MXx8fHwxNzU4NTQ2Mzc0fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1662422325326-19089df23d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGhlcmJzJTIwYmFzaWx8ZW58MXx8fHwxNzU4NTQ2Mzc4fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1602193815349-525071f27564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwc3BpbmFjaCUyMGxlYXZlc3xlbnwxfHx8fDE3NTg1NDYzODF8MA&ixlib=rb-4.1.0&q=80&w=400',
  ];

  const handleInputChange = (field: string, value: any) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !productData.tags.includes(currentTag.trim())) {
      setProductData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setProductData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddImage = (imageUrl: string) => {
    if (!productData.images.includes(imageUrl)) {
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }));
    }
  };

  const handleRemoveImage = (imageToRemove: string) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== imageToRemove),
    }));
  };

  const handleSave = () => {
    // Validate required fields
    if (
      !productData.name ||
      !productData.price ||
      !productData.category ||
      !productData.stock
    ) {
      alert('Please fill in all required fields');
      return;
    }

    const newProduct = {
      ...productData,
      id: Date.now(), // Generate a simple ID
      price: parseFloat(productData.price),
      originalPrice: productData.originalPrice
        ? parseFloat(productData.originalPrice)
        : undefined,
      stock: parseInt(productData.stock),
      rating: 0,
      reviews: 0,
      sales: 0,
      views: 0,
      image: productData.images[0] || sampleImages[0],
    };

    onSave?.(newProduct);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <VendorDashboardSubHeaderHeader
          title="Add New Product"
          subtitle="Create a new product listing for your farm"
          backLabel="Back to Dashboard"
          backHref="/vendor/dashboard"
          actions={
            <>
              <Button
                variant="outline"
                onClick={onBack}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Product
              </Button>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-amber-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="productName">Product Name *</Label>
                    <Input
                      id="productName"
                      value={productData.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      placeholder="e.g., Organic Roma Tomatoes"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={productData.price}
                        onChange={(e) =>
                          handleInputChange('price', e.target.value)
                        }
                        placeholder="4.99"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="originalPrice">Original Price ($)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={productData.originalPrice}
                        onChange={(e) =>
                          handleInputChange('originalPrice', e.target.value)
                        }
                        placeholder="6.99"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={productData.category}
                        onValueChange={(value) =>
                          handleInputChange('category', value)
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock Quantity *</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={productData.stock}
                        onChange={(e) =>
                          handleInputChange('stock', e.target.value)
                        }
                        placeholder="50"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={productData.description}
                      onChange={(e) =>
                        handleInputChange('description', e.target.value)
                      }
                      placeholder="Describe your product, growing methods, freshness, etc."
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-amber-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {productData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <ImageWithFallback
                          src={image}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-amber-200"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveImage(image)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="border-2 border-dashed border-amber-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <p className="text-gray-600 mb-4">
                      Upload product images or select from samples
                    </p>

                    {/* Sample Images */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {sampleImages.slice(0, 4).map((image, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-16 p-1 border-amber-300"
                          onClick={() => handleAddImage(image)}
                        >
                          <ImageWithFallback
                            src={image}
                            alt={`Sample ${index + 1}`}
                            className="w-full h-full object-cover rounded"
                          />
                        </Button>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {sampleImages.slice(4, 8).map((image, index) => (
                        <Button
                          key={index + 4}
                          variant="outline"
                          size="sm"
                          className="h-16 p-1 border-amber-300"
                          onClick={() => handleAddImage(image)}
                        >
                          <ImageWithFallback
                            src={image}
                            alt={`Sample ${index + 5}`}
                            className="w-full h-full object-cover rounded"
                          />
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      disabled={isUploading}
                      className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {isUploading ? 'Uploading...' : 'Upload Images'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-amber-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Add a tag (e.g., organic, fresh, local)"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                    <Button
                      onClick={handleAddTag}
                      variant="outline"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {productData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-amber-100 text-amber-800 hover:bg-amber-200"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-amber-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Product Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="organic">Organic Product</Label>
                    <Switch
                      id="organic"
                      checked={productData.isOrganic}
                      onCheckedChange={(checked) =>
                        handleInputChange('isOrganic', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Featured Product</Label>
                    <Switch
                      id="featured"
                      checked={productData.isFeatured}
                      onCheckedChange={(checked) =>
                        handleInputChange('isFeatured', checked)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={productData.status}
                      onValueChange={(value) =>
                        handleInputChange('status', value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-amber-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      {productData.images[0] ? (
                        <ImageWithFallback
                          src={productData.images[0]}
                          alt="Product preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Upload className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {productData.name || 'Product Name'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {productData.category || 'Category'}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-bold text-green-600">
                          ${productData.price || '0.00'}
                        </span>
                        {productData.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${productData.originalPrice}
                          </span>
                        )}
                      </div>
                      {productData.isOrganic && (
                        <Badge className="mt-2 bg-green-100 text-green-800">
                          Organic
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
