'use client';
import { Button } from '@/modules/core/components/ui/button';
import { CallToAction } from '@/modules/core/types/offerBanners';
import Link from 'next/link';

export default function CallToActionSection({
  title,
  description,
  primaryButton,
  secondaryButton,
}: CallToAction) {
  return (
    <section className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          {title}
        </h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryButton.href}>
            <Button
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              {primaryButton.label}
            </Button>
          </Link>

          {secondaryButton &&
            (secondaryButton.href ? (
              <Link href={secondaryButton.href}>
                <Button
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50 px-8 py-4 rounded-full"
                  size="lg"
                >
                  {secondaryButton.label}
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-50 px-8 py-4 rounded-full"
                size="lg"
              >
                {secondaryButton.label}
              </Button>
            ))}
        </div>
      </div>
    </section>
  );
}
