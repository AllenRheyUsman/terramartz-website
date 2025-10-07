'use client';
import { Button } from '@/modules/core/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/core/components/ui/card';
import { Input } from '@/modules/core/components/ui/input';
import { Label } from '@/modules/core/components/ui/label';
import { Separator } from '@/modules/core/components/ui/separator';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

interface SignInPageProps {
  onBack: () => void;
  onSignIn: (email: string, password: string) => void;
}

export default function SignInPage({ onBack, onSignIn }: SignInPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login success
    setTimeout(() => {
      //onSignIn(email, password);

      // ✅ Redirect after login success
      router.push('/customer/dashboard');

      setIsLoading(false);
    }, 1000);
  };

  const handleDemoSignIn = () => {
    setEmail('john.doe@example.com');
    setPassword('demo123');

    setTimeout(() => {
      //  onSignIn('john.doe@example.com', 'demo123');
      router.push('/customer/dashboard'); // ✅ redirect here too
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Sign In Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-xl">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🌱</span>
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Welcome to Terramartz
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to your account to continue shopping
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="relative">
                <Separator className="bg-amber-200" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-2 text-sm text-gray-500">
                    or
                  </span>
                </div>
              </div>

              {/* Demo Sign In Button */}
              <Button
                onClick={handleDemoSignIn}
                variant="outline"
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400"
              >
                Try Demo Account
              </Button>

              {/* Additional Options */}
              <div className="text-center space-y-2">
                <button className="text-sm text-amber-600 hover:text-amber-700 transition-colors">
                  Forgot your password?
                </button>
                <div className="text-sm text-gray-600">
                  Don&apos;t have an account?{' '}
                  <button className="text-amber-600 hover:text-amber-700 transition-colors">
                    Sign Up
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                🌿
              </div>
              <span>Fresh Products</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                🚚
              </div>
              <span>Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                🏆
              </div>
              <span>Top Quality</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
