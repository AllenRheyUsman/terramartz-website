/* eslint-disable @next/next/no-img-element */
import { motion } from 'motion/react';

interface LogoProps {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  animate?: boolean;
}

export default function Logo({
  onClick,
  size = 'md',
  showText,
  className = '',
  animate = true,
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-lg sm:text-xl lg:text-2xl',
    lg: 'text-xl sm:text-2xl lg:text-3xl',
    xl: 'text-2xl sm:text-3xl lg:text-4xl',
  };

  const subTextSizeClasses = {
    sm: 'text-xs',
    md: 'text-xs sm:text-sm',
    lg: 'text-sm sm:text-base',
    xl: 'text-base sm:text-lg',
  };

  const logoContent = (
    <div
      className={`flex items-center space-x-3 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        <img
          src="./logo.png"
          alt="Terramartz Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text visibility logic */}
      {showText === true && (
        // Show on all screen sizes when explicitly true
        <div className="flex flex-col leading-tight">
          <h1
            className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent`}
          >
            Terramartz
          </h1>
          <span
            className={`${subTextSizeClasses[size]} text-gray-600 font-medium -mt-1`}
          >
            Marketplace
          </span>
        </div>
      )}

      {showText === undefined && (
        // Default behavior: hide on mobile, show on tablet+
        <div className="hidden md:flex flex-col leading-tight">
          <h1
            className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent`}
          >
            Terramartz
          </h1>
          <span
            className={`${subTextSizeClasses[size]} text-gray-600 font-medium -mt-1`}
          >
            Marketplace
          </span>
        </div>
      )}
    </div>
  );

  if (!animate || !onClick) {
    return <div onClick={onClick}>{logoContent}</div>;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={onClick}
    >
      {logoContent}
    </motion.div>
  );
}
