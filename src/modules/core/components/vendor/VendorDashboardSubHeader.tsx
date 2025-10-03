import BackButton from '@/modules/core/components/common/BackButton';
import { ReactNode } from 'react';

interface VendorDashboardSubHeaderProps {
  title?: string; // page title
  subtitle?: string; // subtitle text
  backLabel?: string; // back button label
  backHref?: string; // fallback link for back
  actions?: ReactNode; // buttons/links to render on right side
}

const VendorDashboardSubHeaderHeader = ({
  title = 'Seller Dashboard',
  subtitle = 'Welcome back, Green Valley Farm! 🌱',
  backLabel = 'Back to Store',
  backHref = '/vendor/dashboard',
  actions,
}: VendorDashboardSubHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <BackButton label={backLabel} fallbackHref={backHref} />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center space-x-3">{actions}</div>
    </div>
  );
};

export default VendorDashboardSubHeaderHeader;
