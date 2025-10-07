import { Button } from '@/modules/core/components/ui/button';
import { useTabContext } from '@/modules/core/contexts/customer/TabContext';
import { Heart, Map, Package, Star, TrendingUp } from 'lucide-react';

const NavigationTabs = () => {
  const { activeTab, setActiveTab } = useTabContext();

  return (
    <div className="flex space-x-1 mb-6 bg-amber-100 p-1 rounded-lg w-fit">
      {[
        { key: 'overview', label: 'Overview', icon: TrendingUp },
        { key: 'local-map', label: 'Local Map', icon: Map },
        { key: 'orders', label: 'Recent Orders', icon: Package },
        { key: 'favorites', label: 'Favorites', icon: Heart },
        { key: 'reviews', label: 'Reviews', icon: Star },
      ].map(({ key, label, icon: Icon }) => (
        <Button
          key={key}
          variant={activeTab === key ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab(key)}
          className={
            activeTab === key
              ? 'bg-white text-amber-700 shadow-sm'
              : 'text-amber-700 hover:bg-amber-50'
          }
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </Button>
      ))}
    </div>
  );
};

export default NavigationTabs;
