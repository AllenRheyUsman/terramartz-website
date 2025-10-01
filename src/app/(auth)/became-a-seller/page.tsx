'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/modules/core/components/ui/button';
import { Card, CardContent } from '@/modules/core/components/ui/card';
import { Checkbox } from '@/modules/core/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/modules/core/components/ui/dialog';
import { Input } from '@/modules/core/components/ui/input';
import { Label } from '@/modules/core/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/modules/core/components/ui/tabs';

import {
  CheckCircle,
  Eye,
  EyeOff,
  Mail,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface SellerSignUpPageProps {
  onBack: () => void;
  onSignUp: (email: string, password: string, farmName: string) => void;
  onSignIn: (email: string, password: string) => void;
}

export default function SellerSignUpPage({
  onBack,
  onSignUp,
  onSignIn,
}: SellerSignUpPageProps) {
  const [activeTab, setActiveTab] = useState<'signup' | 'signin'>('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP Verification State
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpMethod, setOtpMethod] = useState<'email' | 'phone'>('email');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [pendingSignUpData, setPendingSignUpData] = useState<any>(null);

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    farmName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    agreeTerms: false,
    agreeMarketing: false,
  });

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!signUpData.agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    // Store the sign up data and show OTP modal
    setPendingSignUpData(signUpData);
    setOtpMethod(signUpData.phone ? 'phone' : 'email');
    setShowOTPModal(true);
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otp = otpCode.join('');
    if (otp.length !== 6) {
      setOtpError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    setOtpError('');

    // Simulate OTP verification (in real app, verify with backend)
    setTimeout(() => {
      if (otp === '123456') {
        // Demo OTP code
        setIsVerifying(false);
        setShowOTPModal(false);
        // Proceed with sign up
        onSignUp(
          pendingSignUpData.email,
          pendingSignUpData.password,
          pendingSignUpData.farmName,
        );
      } else {
        setIsVerifying(false);
        setOtpError('Invalid OTP code. Try again or use 123456 for demo.');
      }
    }, 2000);
  };

  const resendOTP = () => {
    setOtpCode(['', '', '', '', '', '']);
    setOtpError('');
    // In real app, trigger OTP resend
    alert(
      `OTP resent to your ${otpMethod === 'email' ? 'email' : 'phone number'}`,
    );
  };

  const switchOTPMethod = () => {
    if (pendingSignUpData?.phone && pendingSignUpData?.email) {
      setOtpMethod(otpMethod === 'email' ? 'phone' : 'email');
      setOtpCode(['', '', '', '', '', '']);
      setOtpError('');
    }
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(signInData.email, signInData.password);
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Grow Your Business',
      description:
        'Reach thousands of customers and increase your sales with our marketplace platform.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure & Trusted',
      description:
        'Built-in payment protection and verified customer reviews to build your reputation.',
    },
    {
      icon: Users,
      title: 'Community Support',
      description:
        'Join a network of local farmers and get ongoing support to succeed online.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Active Farmers', color: 'text-green-600' },
    { number: '10k+', label: 'Monthly Orders', color: 'text-amber-600' },
    { number: '4.8★', label: 'Average Rating', color: 'text-orange-600' },
    { number: '24hr', label: 'Fast Payouts', color: 'text-emerald-600' },
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Benefits & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Join Terramartz
                <span className="block text-3xl lg:text-4xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Seller Portal
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with thousands of customers who value fresh, local
                produce. Start selling your farm-fresh products today and grow
                your business with our trusted platform.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm"
                >
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side - Sign Up/In Forms */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
              <CardContent className="p-8">
                <Tabs
                  value={activeTab}
                  onValueChange={(value) =>
                    setActiveTab(value as 'signup' | 'signin')
                  }
                >
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="signup" className="text-base py-3">
                      Sign Up
                    </TabsTrigger>
                    <TabsTrigger value="signin" className="text-base py-3">
                      Sign In
                    </TabsTrigger>
                  </TabsList>

                  {/* Sign Up Form */}
                  <TabsContent value="signup" className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Start Your Farmer Journey
                      </h2>
                      <p className="text-gray-600">
                        Create your seller account and join our community
                      </p>
                    </div>

                    <form onSubmit={handleSignUpSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="farmName">Farm/Business Name *</Label>
                        <Input
                          id="farmName"
                          type="text"
                          placeholder="e.g., Green Valley Farm"
                          value={signUpData.farmName}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              farmName: e.target.value,
                            })
                          }
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={signUpData.email}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              email: e.target.value,
                            })
                          }
                          required
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={signUpData.phone}
                            onChange={(e) =>
                              setSignUpData({
                                ...signUpData,
                                phone: e.target.value,
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            type="text"
                            placeholder="City, State"
                            value={signUpData.location}
                            onChange={(e) =>
                              setSignUpData({
                                ...signUpData,
                                location: e.target.value,
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative mt-1">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a strong password"
                            value={signUpData.password}
                            onChange={(e) =>
                              setSignUpData({
                                ...signUpData,
                                password: e.target.value,
                              })
                            }
                            required
                            className="pr-10"
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

                      <div>
                        <Label htmlFor="confirmPassword">
                          Confirm Password *
                        </Label>
                        <div className="relative mt-1">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            value={signUpData.confirmPassword}
                            onChange={(e) =>
                              setSignUpData({
                                ...signUpData,
                                confirmPassword: e.target.value,
                              })
                            }
                            required
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeTerms"
                            checked={signUpData.agreeTerms}
                            onCheckedChange={(checked) =>
                              setSignUpData({
                                ...signUpData,
                                agreeTerms: checked as boolean,
                              })
                            }
                            className="mt-1"
                          />
                          <Label
                            htmlFor="agreeTerms"
                            className="text-sm leading-relaxed"
                          >
                            I agree to the{' '}
                            <span className="text-green-600 hover:underline cursor-pointer">
                              Terms of Service
                            </span>{' '}
                            and{' '}
                            <span className="text-green-600 hover:underline cursor-pointer">
                              Privacy Policy
                            </span>
                          </Label>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeMarketing"
                            checked={signUpData.agreeMarketing}
                            onCheckedChange={(checked) =>
                              setSignUpData({
                                ...signUpData,
                                agreeMarketing: checked as boolean,
                              })
                            }
                            className="mt-1"
                          />
                          <Label
                            htmlFor="agreeMarketing"
                            className="text-sm leading-relaxed"
                          >
                            I would like to receive marketing emails about new
                            features and seller tips
                          </Label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-base font-semibold"
                        disabled={!signUpData.agreeTerms}
                      >
                        Create Seller Account
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Sign In Form */}
                  <TabsContent value="signin" className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome Back
                      </h2>
                      <p className="text-gray-600">
                        Sign in to your seller account
                      </p>
                    </div>

                    <form onSubmit={handleSignInSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="signinEmail">Email Address</Label>
                        <Input
                          id="signinEmail"
                          type="email"
                          placeholder="your@email.com"
                          value={signInData.email}
                          onChange={(e) =>
                            setSignInData({
                              ...signInData,
                              email: e.target.value,
                            })
                          }
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="signinPassword">Password</Label>
                        <div className="relative mt-1">
                          <Input
                            id="signinPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={signInData.password}
                            onChange={(e) =>
                              setSignInData({
                                ...signInData,
                                password: e.target.value,
                              })
                            }
                            required
                            className="pr-10"
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

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="rememberMe"
                            checked={signInData.rememberMe}
                            onCheckedChange={(checked) =>
                              setSignInData({
                                ...signInData,
                                rememberMe: checked as boolean,
                              })
                            }
                          />
                          <Label htmlFor="rememberMe" className="text-sm">
                            Remember me
                          </Label>
                        </div>
                        <span className="text-sm text-green-600 hover:underline cursor-pointer">
                          Forgot password?
                        </span>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-base font-semibold"
                      >
                        Sign In to Seller Portal
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Social Proof */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-3">
                      Trusted by farmers across the country
                    </p>
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        4.8/5 from 500+ sellers
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <Dialog open={showOTPModal} onOpenChange={setShowOTPModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-gray-900">
              Verify Your Account
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Method indicator */}
            <div className="text-center">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  otpMethod === 'email'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-green-100 text-green-600'
                }`}
              >
                {otpMethod === 'email' ? (
                  <Mail className="w-8 h-8" />
                ) : (
                  <Smartphone className="w-8 h-8" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                We have sent a 6-digit code to your{' '}
                {otpMethod === 'email' ? 'email' : 'phone number'}:
              </p>
              <p className="font-semibold text-gray-900">
                {otpMethod === 'email'
                  ? pendingSignUpData?.email
                  : pendingSignUpData?.phone}
              </p>
            </div>

            {/* OTP Input */}
            <div className="space-y-4">
              <div className="flex justify-center space-x-2">
                {otpCode.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-green-500"
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-red-500 text-sm text-center">{otpError}</p>
              )}
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleVerifyOTP}
              disabled={isVerifying || otpCode.join('').length !== 6}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3"
            >
              {isVerifying ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verify Account</span>
                </div>
              )}
            </Button>

            {/* Resend and Switch Method */}
            <div className="text-center space-y-2">
              <button
                onClick={resendOTP}
                className="text-sm text-green-600 hover:underline"
              >
                {"Didn't receive the code? Resend"}
              </button>

              {pendingSignUpData?.phone && pendingSignUpData?.email && (
                <div>
                  <button
                    onClick={switchOTPMethod}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Verify via {otpMethod === 'email' ? 'phone' : 'email'}{' '}
                    instead
                  </button>
                </div>
              )}
            </div>

            {/* Demo Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-700 text-center">
                <strong>Demo:</strong> Use code <strong>123456</strong> to
                complete verification
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
