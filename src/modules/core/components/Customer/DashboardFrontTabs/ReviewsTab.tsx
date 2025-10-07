import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

const ReviewsTab = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-amber-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Your Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Summary Section */}
            <div className="text-center py-8">
              <Star className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                You’ve written <strong>100 reviews</strong> so far!
              </p>
              <button className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded">
                Shop & Review More Products
              </button>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-4">
              {[
                {
                  product: 'Organic Tomatoes',
                  rating: 5,
                  review:
                    'Amazing quality tomatoes! Fresh, juicy, and perfect for salads. Will definitely order again.',
                  date: '3 days ago',
                  image:
                    'https://images.unsplash.com/photo-1546470427-e2a323f21d5a?w=100',
                },
                {
                  product: 'Fresh Basil',
                  rating: 4,
                  review:
                    'Great flavor, perfect for pesto! A bit more expensive than I expected, but worth it.',
                  date: '5 days ago',
                  image:
                    'https://images.unsplash.com/photo-1575347117-1c79e0e52847?w=100',
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="border border-amber-200 rounded-lg p-4"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.image}
                      alt={review.product}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {review.product}
                      </h4>
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(review.rating)].map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className="w-4 h-4 text-amber-400 fill-current"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{review.review}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Reviewed {review.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReviewsTab;
