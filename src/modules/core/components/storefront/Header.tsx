'use client';
import { Button } from '@/modules/core/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import {
  Badge,
  Bell,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  User,
  Wallet,
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
interface HeaderProps {
  cartCount?: number;
  cartIconRef?: React.RefObject<HTMLButtonElement>;
  isSignedIn?: boolean;
  userEmail?: string;
  userName?: string;
  onNavigateHome?: () => void;
  onNavigateToProducts?: () => void;
  onNavigateToCategories?: () => void;
  onNavigateToCart?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToContact?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToWallet?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToSignIn?: () => void;
  onSignOut?: () => void;
  onSearch?: (query: string) => void;
}

export default function Header({
  cartCount = 0,
  cartIconRef,
  isSignedIn = false,
  userEmail = 'john.doe@example.com',
  userName = 'John Doe',
  onNavigateHome,
  onNavigateToProducts,
  onNavigateToCategories,
  onNavigateToCart,
  onNavigateToAbout,
  onNavigateToContact,
  onNavigateToSettings,
  onNavigateToWallet,
  onNavigateToDashboard,
  onNavigateToSignIn,
  onSignOut,
  onSearch,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e as React.FormEvent);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-amber-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            onClick={onNavigateHome}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Terramartz Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Terramartz
              </h1>
              <span className="text-xs sm:text-sm text-gray-600 font-medium -mt-1">
                Marketplace
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Categories', 'Product', 'Contact'].map(
              (item) => (
                <motion.button
                  key={item}
                  onClick={
                    item === 'Home'
                      ? onNavigateHome
                      : item === 'About'
                      ? onNavigateToAbout
                      : item === 'Categories'
                      ? onNavigateToCategories
                      : item === 'Product'
                      ? onNavigateToProducts
                      : item === 'Contact'
                      ? onNavigateToContact
                      : undefined
                  }
                  className="text-gray-700 hover:text-amber-600 transition-colors duration-200 relative bg-transparent border-none cursor-pointer"
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ),
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search */}
            <div className="hidden lg:flex items-center">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  placeholder="Search fresh products..."
                  className="w-48 xl:w-64 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent placeholder-amber-500 transition-all duration-200"
                />
              </form>
            </div>

            {/* Notifications */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative hidden sm:block"
            >
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-amber-600 hover:bg-amber-50 p-2"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <Badge className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
                  3
                </Badge>
              </Button>
            </motion.div>

            {/* Cart */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                ref={cartIconRef}
                onClick={onNavigateToCart}
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-amber-600 hover:bg-amber-50 p-2"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    <Badge className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 p-0 flex items-center justify-center bg-green-500 text-white text-xs">
                      {cartCount}
                    </Badge>
                  </motion.div>
                )}
              </Button>
            </motion.div>

            {/* User Authentication */}
            {isSignedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full p-0 hover:bg-amber-50"
                    >
                      <Avatar className="h-10 w-10 border-2 border-amber-200 hover:border-amber-300 transition-colors">
                        <AvatarImage src="./logo.png" alt="User avatar" />
                        <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                          {userName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 mt-2 bg-white border border-amber-200 shadow-lg"
                >
                  <div className="px-3 py-2 border-b border-amber-100">
                    <p className="font-medium text-gray-900">{userName}</p>
                    <p className="text-sm text-gray-500">{userEmail}</p>
                  </div>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-amber-50 text-gray-700"
                    onClick={onNavigateToDashboard}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-amber-50 text-gray-700"
                    onClick={onNavigateToSettings}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-amber-50 text-gray-700"
                    onClick={onNavigateToWallet}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Wallet
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-amber-100" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-red-50 text-red-600"
                    onClick={onSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/became-a-seller">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-2 border-amber-500 text-amber-600 hover:bg-amber-50 hover:border-amber-600 bg-transparent text-sm px-3 py-2"
                    >
                      <span className="hidden sm:inline">Become a seller</span>
                      <span className="sm:hidden">Sell</span>
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={onNavigateToSignIn}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 text-sm px-3 py-2"
                    size="sm"
                  >
                    <User className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4 border-t border-amber-100"
          >
            <div className="flex flex-col space-y-4 pt-4">
              {['Home', 'About', 'Categories', 'Product', 'Contact'].map(
                (item) => (
                  <button
                    key={item}
                    onClick={
                      item === 'Home'
                        ? onNavigateHome
                        : item === 'About'
                        ? onNavigateToAbout
                        : item === 'Categories'
                        ? onNavigateToCategories
                        : item === 'Product'
                        ? onNavigateToProducts
                        : item === 'Contact'
                        ? onNavigateToContact
                        : undefined
                    }
                    className="text-left text-gray-700 hover:text-amber-600 transition-colors duration-200 px-2 py-1 bg-transparent border-none cursor-pointer"
                  >
                    {item}
                  </button>
                ),
              )}
              <div className="pt-2">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-full bg-amber-50 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-amber-500"
                  />
                </form>
              </div>
              {!isSignedIn && (
                <div className="pt-4 space-y-2">
                  <Button
                    onClick={onNavigateToSellerSignUp}
                    variant="outline"
                    className="w-full border-2 border-amber-500 text-amber-600 hover:bg-amber-50 hover:border-amber-600 bg-transparent"
                    size="sm"
                  >
                    Become a seller
                  </Button>
                  <Button
                    onClick={onNavigateToSignIn}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0"
                    size="sm"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
}
