'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  showArrow?: boolean;
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
  showArrow = true,
}: ButtonLinkProps) {
  const base =
    'group inline-flex items-center gap-2 px-7 py-3.5 text-xs uppercase tracking-editorial font-body font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]';

  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600',
    secondary: 'bg-charcoal text-white hover:bg-charcoal/90',
    outline: 'border border-charcoal/20 text-charcoal hover:bg-charcoal/5',
    ghost: 'text-charcoal hover:text-orange-600',
  };

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  disabled?: boolean;
  showArrow?: boolean;
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className,
  disabled,
  showArrow,
}: ButtonProps) {
  const base =
    'group inline-flex items-center gap-2 px-7 py-3.5 text-xs uppercase tracking-editorial font-body font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600',
    secondary: 'bg-charcoal text-white hover:bg-charcoal/90',
    outline: 'border border-charcoal/20 text-charcoal hover:bg-charcoal/5',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], className)}
    >
      {children}
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </motion.button>
  );
}
