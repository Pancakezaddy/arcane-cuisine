import { ThemeConfig } from '@/types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ThemeCardProps {
  theme: ThemeConfig;
  isActive?: boolean;
  onSelect?: () => void;
}

export function ThemeCard({ theme, isActive, onSelect }: ThemeCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'text-left w-full rounded-xl border-2 overflow-hidden transition-all',
        isActive
          ? 'border-pine-600 shadow-md'
          : 'border-cream-300 hover:border-cream-400 hover:shadow-sm'
      )}
    >
      {/* Colour swatches */}
      <div className="flex h-3">
        {Object.values(theme.colors).map((color, i) => (
          <div key={i} className="flex-1" style={{ background: color }} />
        ))}
      </div>

      <div className="p-4" style={{ background: theme.colors.background }}>
        <div className="flex items-start justify-between">
          <div>
            <h3
              className="font-semibold text-base"
              style={{ color: theme.colors.text, fontFamily: theme.typography.headingFont }}
            >
              {theme.name}
            </h3>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: theme.colors.muted }}>
              {theme.description}
            </p>
          </div>
          {isActive && (
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-2"
              style={{ background: theme.colors.accent }}
            >
              <Check size={13} color="#fff" />
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span
            className="px-2 py-0.5 rounded text-xs"
            style={{ background: theme.colors.accent + '20', color: theme.colors.text }}
          >
            {theme.cardDensity}
          </span>
          <span
            className="px-2 py-0.5 rounded text-xs"
            style={{ background: theme.colors.accent + '20', color: theme.colors.text }}
          >
            {theme.imageFraming}
          </span>
          <span
            className="px-2 py-0.5 rounded text-xs"
            style={{ background: theme.colors.accent + '20', color: theme.colors.text }}
          >
            {theme.noteStyle}
          </span>
        </div>
      </div>
    </button>
  );
}
