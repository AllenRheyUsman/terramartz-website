'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateProduct } from '@/modules/core/actions/product.action'; // Assuming updateProduct API function is defined
import * as yup from 'yup';
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

const productSchema = yup.object().shape({
    name: yup.string().required('Product name is required'),
    price: yup
        .number()
        .typeError('Price must be a number')
        .positive('Price must be greater than 0')
        .required('Price is required'),
    originalPrice: yup
        .number()
        .typeError('Original price must be a number')
        .nullable()
        .transform((v, o) => (o === '' ? null : v)),
    category: yup.string().required('Category is required'),
    stock: yup
        .number()
        .typeError('Stock must be a number')
        .integer('Stock must be an integer')
        .min(0, 'Stock cannot be negative')
        .required('Stock is required'),
    description: yup.string().max(500, 'Description too long'),
});

interface UpdateProductPageProps {
    productId: string;
    onBack?: () => void;
    onUpdate?: (productData: any) => void;
}

export default function UpdateProductPage({
    productId,
    onBack,
    onUpdate,
}: UpdateProductPageProps) {
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
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
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

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        setIsUploading(true);
        const newImages: string[] = [];
        const newFiles: File[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            newFiles.push(file);
            newImages.push(URL.createObjectURL(file));
        }

        setProductData((prev) => ({
            ...prev,
            images: [...prev.images, ...newImages],
        }));

        setUploadedFiles((prev) => [...prev, ...newFiles]);

        setIsUploading(false);
    };

    const handleRemoveImage = (imageToRemove: string) => {
        setProductData((prev) => ({
            ...prev,
            images: prev.images.filter((img) => img !== imageToRemove),
        }));
    };

    const handleSave = async () => {
        try {
            await productSchema.validate(productData, { abortEarly: false });
            setErrors({});
        } catch (validationError: any) {
            const newErrors: Record<string, string> = {};
            validationError.inner.forEach((err: any) => {
                if (err.path) newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
            return;
        }

        setIsSaving(true);

        try {
            const formData = new FormData();
            formData.append('title', productData.name);
            formData.append('description', productData.description);
            formData.append('price', productData.price);
            formData.append('originalPrice', productData.originalPrice || '');
            formData.append('stockQuantity', productData.stock);
            formData.append('organic', String(productData.isOrganic));
            formData.append('featured', String(productData.isFeatured));
            formData.append('status', productData.status);
            formData.append('productType', productData.isOrganic ? 'organic' : 'conventional');
            formData.append('category', productData.category);
            uploadedFiles.forEach((file) => {
                formData.append('productImages', file);
            });
            productData.tags.forEach(tag => {
                formData.append('tags', tag);
            });

            const result = await updateProduct(productId, formData);
            const resetForm = () => {
                setProductData({
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
                setCurrentTag('');
            };

            if (result.success) {
                console.log('Product updated successfully:', result.data);
                const updatedProduct = {
                    ...productData,
                    id: result.data?.id || Date.now(),
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
                onUpdate?.(updatedProduct);
                alert('Product updated successfully!');
                resetForm();
            } else {
                console.error('Failed to update product:', result.error);
                alert(`Failed to update product: ${result.error}`);
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert('An error occurred while saving the product');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <VendorDashboardSubHeaderHeader
                    title="Update Product"
                    subtitle="Edit your product details"
                    backLabel="Back to Dashboard"
                    backHref="/vendor/dashboard"
                    actions={
                        <>
                            <Button
                                variant="outline"
                                onClick={onBack}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                disabled={isSaving}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="bg-green-500 hover:bg-green-600 text-white"
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
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
                                            disabled={isSaving}
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                                                disabled={isSaving}
                                            />
                                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
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
                                                disabled={isSaving}
                                            />
                                            {errors.originalPrice && (
                                                <p className="text-red-500 text-sm mt-1">{errors.originalPrice}</p>
                                            )}
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
                                                disabled={isSaving}
                                            >
                                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
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
                                                disabled={isSaving}
                                            />
                                            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
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
                                            disabled={isSaving}
                                        />
                                        {errors.description && (
                                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                        )}
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
                                                    disabled={isSaving}
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
                                                    disabled={isSaving}
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
                                                    disabled={isSaving}
                                                >
                                                    <ImageWithFallback
                                                        src={image}
                                                        alt={`Sample ${index + 5}`}
                                                        className="w-full h-full object-cover rounded"
                                                    />
                                                </Button>
                                            ))}
                                        </div>
                                        <div className="relative inline-block">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleFileUpload}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <Button
                                                asChild
                                                variant="outline"
                                                disabled={isUploading}
                                                className="border-amber-300 text-amber-700 hover:bg-amber-50"
                                            >
                                                <span>
                                                    <Upload className="w-4 h-4 mr-2" />
                                                    {isUploading ? 'Uploading...' : 'Upload Images'}
                                                </span>
                                            </Button>
                                        </div>
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
                                            disabled={isSaving}
                                        />
                                        <Button
                                            onClick={handleAddTag}
                                            variant="outline"
                                            className="border-amber-300 text-amber-700 hover:bg-amber-50"
                                            disabled={isSaving}
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
                                                    disabled={isSaving}
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
                                            disabled={isSaving}
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
                                            disabled={isSaving}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={productData.status}
                                            onValueChange={(value) =>
                                                handleInputChange('status', value)
                                            }
                                            disabled={isSaving}
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
