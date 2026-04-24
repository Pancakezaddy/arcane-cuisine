import { BudgetMode } from '@/types';
import { DollarSign } from 'lucide-react';

interface BudgetBadgeProps {
  mode: BudgetMode;
  perServing?: number;
  size?: 'sm' | 'md';
}

const modeConfig = {
  cheapest: { label: 'Cheapest', dots: 1, bg: '#eef8f1', text: '#2d5a3d', border: '#aad9b8' },
  balanced: { label: 'Balanced', dots: 2, bg: '#faf7f2', text: '#a68c62', border: '#d4b896' },
  premium: { label: 'Premium', dots: 3, bg: '#fdf8ee', text: '#a88a30', border: '#e8c96d' },
};

export default function BudgetBadge({ mode, perServing, size = 'sm' }: BudgetBadgeProps) {
  const config = modeConfig[mode];
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium border ${padding}`}
      style={{ backgroundColor: config.bg, color: config.text, borderColor: config.border }}
    >
      {Array.from({ length: config.dots }).map((_, i) => (
        <DollarSign key={i} className="w-3 h-3" />
      ))}
      {config.label}
      {perServing !== undefined && <span className="ml-1 opacity-70">${perServing.toFixed(2)}/srv</span>}
    </span>
  );
}
