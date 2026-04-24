import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

type BadgeVariant = 'default' | 'pine' | 'brass' | 'olive' | 'cream' | 'success' | 'warning' | 'danger';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const base = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium';
  const variants: Record<BadgeVariant, string> = {
    default: 'bg-cream-200 text-pine-800',
    pine: 'bg-pine-100 text-pine-800',
    brass: 'bg-cream-300 text-brass-600',
    olive: 'bg-olive-400/20 text-olive-600',
    cream: 'bg-cream-200 text-pine-700',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  };
  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
