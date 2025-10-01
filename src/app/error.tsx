'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log error (send to monitoring service if needed later )
  useEffect(() => {
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex h-screen items-center justify-center bg-gray-100 text-center">
        <div className="max-w-md rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-700 mb-6">
            {error.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => reset()}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
