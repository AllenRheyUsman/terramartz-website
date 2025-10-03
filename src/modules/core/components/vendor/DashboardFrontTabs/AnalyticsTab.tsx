import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { BarChart3 } from 'lucide-react';

export const AnalyticsTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-amber-200 shadow-sm">
        <CardHeader>
          <CardTitle>Sales Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BarChart3 className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Detailed analytics charts would appear here
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Including sales trends, product performance, and customer insights
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 shadow-sm">
        <CardHeader>
          <CardTitle>Customer Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
              <span className="text-gray-700">Total Customers</span>
              <span className="font-bold text-gray-900">--</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">Repeat Customers</span>
              <span className="font-bold text-green-600">68%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Average Order Value</span>
              <span className="font-bold text-blue-600">$23.45</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-700">Customer Lifetime Value</span>
              <span className="font-bold text-purple-600">$156.78</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
