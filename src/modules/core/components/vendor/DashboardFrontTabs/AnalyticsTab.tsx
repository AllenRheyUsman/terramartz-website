'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { useDashboard } from '@/modules/core/contexts/vendor/DashboardContext';

export const AnalyticsTab = () => {
  const {
    analytics,
    loadingAnalytics,
    analyticsError,
    year,
    setYear,
    refreshAnalytics,
  } = useDashboard();

  const repeatRate =
    analytics && analytics.totalCustomers > 0
      ? (
          ((analytics.repeatCustomers ?? 0) / (analytics.totalCustomers ?? 1)) *
          100
        ).toFixed(1)
      : '0';

  const currency = (n: number) =>
    n?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <div className="space-y-6">
      {/* --- Year Selector --- */}
      <div className="flex justify-end">
        <select
          value={year}
          onChange={(e) => {
            const newYear = Number(e.target.value);
            setYear(newYear);
            refreshAnalytics(newYear);
          }}
          className="border rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 max-h-40 overflow-y-auto"
        >
          {Array.from({ length: new Date().getFullYear() - 1998 }, (_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      {loadingAnalytics ? (
        <div className="text-center py-10 text-gray-600">
          Loading analytics…
        </div>
      ) : analyticsError ? (
        <div className="text-center py-10 text-red-600">{analyticsError}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* --- Sales Analytics --- */}
          <Card className="border-amber-200 shadow-sm">
            <CardHeader>
              <CardTitle>Sales Analytics ({year})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Total Revenue:{' '}
                  <span className="font-bold text-amber-600">
                    {currency(analytics?.lifetimeSales?.totalRevenue || 0)}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Total Orders:{' '}
                  <span className="font-semibold text-gray-700">
                    {analytics?.lifetimeSales?.totalOrders ?? '--'}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* --- Customer Insights --- */}
          <Card className="border-amber-200 shadow-sm">
            <CardHeader>
              <CardTitle>Customer Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                  <span className="text-gray-700">Total Customers</span>
                  <span className="font-bold text-gray-900">
                    {analytics?.totalCustomers ?? '--'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Repeat Customers</span>
                  <span className="font-bold text-green-600">
                    {repeatRate}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Average Order Value</span>
                  <span className="font-bold text-blue-600">
                    {currency(analytics?.averageOrderValue || 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Customer Lifetime Value</span>
                  <span className="font-bold text-purple-600">
                    {currency(analytics?.customerLifetimeValue || 0)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
