import { ButtonLink } from '@/components/ui/button-link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-ivory">
      <div className="container-narrow text-center">
        <p className="text-orange-600 text-xs uppercase tracking-editorial-wide mb-4">
          404
        </p>
        <h1 className="font-display text-charcoal text-5xl md:text-7xl font-medium leading-tight mb-6">
          Page not found.
        </h1>
        <p className="text-charcoal/60 text-lg max-w-md mx-auto mb-10">
          The page you are looking for does not exist or has been moved.
        </p>
        <ButtonLink href="/">Return Home</ButtonLink>
      </div>
    </div>
  );
}
