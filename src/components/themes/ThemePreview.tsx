import { ThemeConfig } from '@/types';
import { Clock, Users } from 'lucide-react';

interface ThemePreviewProps {
  theme: ThemeConfig;
}

export function ThemePreview({ theme }: ThemePreviewProps) {
  return (
    <div
      className="rounded-xl overflow-hidden border shadow-sm"
      style={{ borderColor: theme.colors.accent + '40', background: theme.colors.background }}
    >
      <div className="px-6 py-5" style={{ background: theme.colors.surface }}>
        <div
          className="text-xs font-medium uppercase tracking-widest mb-2"
          style={{ color: theme.colors.accent }}
        >
          Rustic European · Tray Bake
        </div>
        <h2
          className="text-xl font-bold mb-1"
          style={{ color: theme.colors.text, fontFamily: theme.typography.headingFont }}
        >
          Roasted Thighs with Lemon & Herbs
        </h2>
        <p className="text-sm mb-4" style={{ color: theme.colors.muted }}>
          Golden tray-baked thighs with roasted potatoes and a bright herb finish
        </p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-sm" style={{ color: theme.colors.muted }}>
            <Clock size={13} /> 60m total
          </span>
          <span className="flex items-center gap-1.5 text-sm" style={{ color: theme.colors.muted }}>
            <Users size={13} /> Serves 4
          </span>
        </div>
      </div>

      <div className="px-6 py-4">
        <h3
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: theme.colors.accent }}
        >
          Ingredients
        </h3>
        <ul className="space-y-1">
          {['8 pieces Chicken thighs', '600g Potatoes', '8 cloves Garlic', '2 Lemons', '6 sprigs Thyme'].map(
            (item, i) => (
              <li key={i} className="text-sm" style={{ color: theme.colors.text }}>
                {item}
              </li>
            )
          )}
        </ul>
      </div>

      <div
        className="px-6 py-3 border-t"
        style={{ borderColor: theme.colors.accent + '20', background: theme.colors.accent + '10' }}
      >
        <p className="text-xs italic" style={{ color: theme.colors.text }}>
          ✦ Chef: The key is really dry chicken skin — pat it thoroughly with kitchen paper.
        </p>
      </div>
    </div>
  );
}
