import * as React from 'react';
import { cn } from './utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-10 w-full min-w-0 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-base text-gray-900 md:text-sm',
        'placeholder:text-gray-400',
        'file:inline-flex file:h-7 file:items-center file:justify-center file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:text-sm file:font-medium file:text-gray-700',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-red-500 aria-invalid:ring-red-500/20',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
