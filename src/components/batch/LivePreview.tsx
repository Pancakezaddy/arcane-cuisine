'use client';
import { Batch, RecipeConcept, ThemeId } from '@/types';
import { THEMES } from '@/lib/mock-data';
import { formatTime, cn } from '@/lib/utils';
import { Palette, Clock, ChefHat, Leaf } from 'lucide-react';

interface LivePreviewProps {
  batch: Batch;
  selectedConcept?: RecipeConcept | null;
  onThemeChange: (themeId: ThemeId) => void;
}

export function LivePreview({ batch, selectedConcept, onThemeChange }: LivePreviewProps) {
  const activeTheme = THEMES.find(t => t.id === batch.activeTheme) ?? THEMES[0];
  const recipe = selectedConcept?.recipeId
    ? batch.recipes.find(r => r.id === selectedConcept.recipeId)
    : null;

  return (
    <aside className="w-[320px] flex flex-col bg-white border-l border-cream-300 h-full">
      {/* Theme Selector */}
      <div className="px-4 py-3 border-b border-cream-200">
        <div className="flex items-center gap-2 mb-2">
          <Palette size={14} className="text-brass-500" />
          <span className="text-sm font-semibold text-pine-900">Active Theme</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={cn(
                'text-left px-2.5 py-2 rounded-md border text-xs transition-colors',
                batch.activeTheme === theme.id
                  ? 'border-pine-600 bg-pine-50 text-pine-900'
                  : 'border-cream-300 hover:border-cream-400 text-pine-600'
              )}
            >
              <div
                className="w-full h-1.5 rounded-full mb-1.5"
                style={{ background: theme.colors.accent }}
              />
              <div className="font-medium leading-tight">{theme.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-y-auto">
        {selectedConcept ? (
          <div className="p-4">
            <div
              className="rounded-lg overflow-hidden border"
              style={{
                borderColor: activeTheme.colors.accent + '40',
                background: activeTheme.colors.background,
              }}
            >
              {/* Recipe card header */}
              <div
                className="px-4 py-5"
                style={{ background: activeTheme.colors.surface }}
              >
                <div
                  className="text-xs font-medium mb-1 uppercase tracking-wider"
                  style={{ color: activeTheme.colors.accent }}
                >
                  {selectedConcept.styleTag}
                </div>
                <h3
                  className="text-lg font-bold leading-snug mb-1"
                  style={{ color: activeTheme.colors.text, fontFamily: activeTheme.typography.headingFont }}
                >
                  {selectedConcept.title}
                </h3>
                <p className="text-xs" style={{ color: activeTheme.colors.muted }}>
                  {selectedConcept.subtitle}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <span
                    className="flex items-center gap-1 text-xs"
                    style={{ color: activeTheme.colors.muted }}
                  >
                    <Clock size={11} />
                    {formatTime(selectedConcept.estimatedCookTime)}
                  </span>
                  <span
                    className="flex items-center gap-1 text-xs"
                    style={{ color: activeTheme.colors.muted }}
                  >
                    <ChefHat size={11} />
                    {selectedConcept.cuisineInspiration}
                  </span>
                </div>
              </div>

              {recipe ? (
                <div className="px-4 py-3 space-y-3">
                  {/* Ingredients preview */}
                  <div>
                    <div
                      className="text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: activeTheme.colors.accent }}
                    >
                      Ingredients
                    </div>
                    <ul className="space-y-1">
                      {recipe.ingredients.slice(0, 5).map((ing, i) => (
                        <li key={i} className="flex gap-2 text-xs" style={{ color: activeTheme.colors.text }}>
                          <span className="font-medium min-w-[60px]">{ing.amount} {ing.unit}</span>
                          <span>{ing.name}</span>
                        </li>
                      ))}
                      {recipe.ingredients.length > 5 && (
                        <li className="text-xs" style={{ color: activeTheme.colors.muted }}>
                          +{recipe.ingredients.length - 5} more…
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Chef note */}
                  <div
                    className="rounded-md px-3 py-2.5 text-xs italic"
                    style={{
                      background: activeTheme.colors.accent + '15',
                      color: activeTheme.colors.text,
                      borderLeft: `3px solid ${activeTheme.colors.accent}`,
                    }}
                  >
                    {recipe.chefNote}
                  </div>

                  {/* Balance tags */}
                  <div className="flex flex-wrap gap-1">
                    {selectedConcept.balanceTags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          background: activeTheme.colors.accent + '25',
                          color: activeTheme.colors.text,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="px-4 py-6 text-center">
                  <Leaf size={20} className="mx-auto mb-2" style={{ color: activeTheme.colors.muted }} />
                  <p className="text-xs" style={{ color: activeTheme.colors.muted }}>
                    Approve concept to generate full recipe
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-16 text-center px-4">
            <Palette size={28} className="text-pine-300 mb-3" />
            <p className="text-sm text-pine-500">Select a concept to preview it with the active theme</p>
          </div>
        )}
      </div>

      {/* Batch summary */}
      <div className="px-4 py-3 border-t border-cream-200 bg-cream-50">
        <p className="text-xs font-medium text-pine-700 mb-2">Batch Overview</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white rounded p-2 border border-cream-200">
            <div className="text-lg font-bold text-pine-800">
              {batch.concepts.filter(c => c.status === 'approved').length}
            </div>
            <div className="text-xs text-pine-400">Approved</div>
          </div>
          <div className="bg-white rounded p-2 border border-cream-200">
            <div className="text-lg font-bold text-pine-800">{batch.recipes.length}</div>
            <div className="text-xs text-pine-400">Recipes</div>
          </div>
          <div className="bg-white rounded p-2 border border-cream-200">
            <div className="text-lg font-bold text-brass-500">
              {Math.round(batch.concepts.reduce((a, c) => a + c.overlapScore, 0) / Math.max(batch.concepts.length, 1))}%
            </div>
            <div className="text-xs text-pine-400">Avg Score</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
