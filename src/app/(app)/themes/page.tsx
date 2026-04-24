'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { THEMES } from '@/lib/mock-data';
import { ThemeCard } from '@/components/themes/ThemeCard';
import { ThemePreview } from '@/components/themes/ThemePreview';
import { ThemeId } from '@/types';

export default function ThemesPage() {
  const [activeTheme, setActiveTheme] = useState<ThemeId>('arcane-editorial');
  const theme = THEMES.find(t => t.id === activeTheme) ?? THEMES[0];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header title="Themes" subtitle="Choose a visual style for your recipe guides" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-[1fr_380px] gap-8">
            <div>
              <h2 className="text-sm font-semibold text-pine-800 mb-4">Available Themes</h2>
              <div className="grid grid-cols-2 gap-4">
                {THEMES.map(t => (
                  <ThemeCard
                    key={t.id}
                    theme={t}
                    isActive={activeTheme === t.id}
                    onSelect={() => setActiveTheme(t.id)}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-pine-800 mb-4">Live Preview</h2>
              <ThemePreview theme={theme} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
