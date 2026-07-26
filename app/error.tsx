'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-ivory">
      <div className="container-narrow text-center">
        <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-4">
          Something went wrong
        </p>
        <h2 className="font-display text-charcoal text-4xl md:text-6xl font-medium leading-tight mb-6">
          We hit a snag.
        </h2>
        <p className="text-charcoal/60 text-lg max-w-md mx-auto mb-10">
          An unexpected error occurred. Please try again or contact us on WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] justify-center"
          >
            Try Again
          </button>
          <a
            href="https://wa.me/233548883475"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-charcoal/20 text-charcoal hover:bg-charcoal/5 px-8 py-4 text-xs uppercase tracking-editorial font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] justify-center"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
