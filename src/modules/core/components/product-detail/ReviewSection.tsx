'use client';

import { Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function ReviewSection({ productId }: { productId: number }) {
  const reviews = [
    { id: 1, name: 'Jane S.', rating: 5, comment: 'Excellent quality!' },
    { id: 2, name: 'Mark T.', rating: 4, comment: 'Pretty good overall.' },
  ];

  const average =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Customer Reviews
      </h3>
      <div className="text-4xl font-bold text-amber-600 mb-4">
        {average.toFixed(1)}
      </div>
      {reviews.map((r) => (
        <div key={r.id} className="border-b border-gray-100 pb-4 mb-4">
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < r.rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="font-semibold">{r.name}</p>
          <p className="text-gray-600">{r.comment}</p>
        </div>
      ))}
    </motion.div>
  );
}
