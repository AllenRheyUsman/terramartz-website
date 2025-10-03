import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { Progress } from '@/modules/core/components/ui/progress';
import { BarChart3 } from 'lucide-react';

const PerformanceOverview = () => {
  return (
    <Card className="border-amber-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Performance Overview</CardTitle>
          <BarChart3 className="w-5 h-5 text-amber-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Store Views</span>
              <span className="font-medium">100</span>
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-xs text-green-600">+15% from last month</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Conversion Rate</span>
              <span className="font-medium">78%</span>
            </div>
            <Progress value={100} className="h-2" />
            <p className="text-xs text-green-600">+0.5% from last month</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Customer Satisfaction</span>
              <span className="font-medium">100%</span>
            </div>
            <Progress value={100} className="h-2" />
            <p className="text-xs text-green-600">+2% from last month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default PerformanceOverview;
