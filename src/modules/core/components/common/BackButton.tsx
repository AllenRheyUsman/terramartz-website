'use client';

import { Button } from '@/modules/core/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  label?: string;
  fallbackHref?: string; // default route if no history exists
  onClick?: () => void; // optional override
}

const BackButton = ({
  label = 'Back',
  fallbackHref = '/vendor',
  onClick,
}: BackButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onClick) {
      onClick();
      return;
    }

    // Try going back if history exists
    if (document.referrer && document.referrer !== window.location.href) {
      router.back();
    } else {
      // Fallback to a safe route
      router.push(fallbackHref);
    }
  };

  return (
    <Button
      onClick={handleBack}
      variant="ghost"
      size="sm"
      className="hover:bg-amber-100 text-amber-700"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
};

export default BackButton;
