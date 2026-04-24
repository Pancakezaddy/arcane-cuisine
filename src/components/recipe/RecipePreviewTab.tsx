'use client';
import { Recipe } from '@/types';
import { THEMES } from '@/lib/mock-data';
import { formatTime } from '@/lib/utils';
import { Clock, Users } from 'lucide-react';

interface RecipePreviewTabProps {
  recipe: Recipe;
  themeId?: string;
}

export function RecipePreviewTab({ recipe, themeId = 'arcane-editorial' }: RecipePreviewTabProps) {
  const theme = THEMES.find(t => t.id === themeId) ?? THEMES[0];

  return (
    <div className="p-5">
      <div
        className="rounded-lg overflow-hidden border"
        style={{ borderColor: theme.colors.accent + '40', background: theme.colors.background }}
      >
        {/* Header */}
        <div className="px-6 py-6" style={{ background: theme.colors.surface }}>
          <div
            className="text-xs font-medium uppercase tracking-widest mb-2"
            style={{ color: theme.colors.accent }}
          >
            {recipe.styleTag} · {recipe.cuisineInspiration}
          </div>
          <h2
            className="text-2xl font-bold leading-tight mb-1"
            style={{ color: theme.colors.text, fontFamily: theme.typography.headingFont }}
          >
            {recipe.title}
          </h2>
          <p className="text-sm mb-4" style={{ color: theme.colors.muted }}>
            {recipe.subtitle}
          </p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-sm" style={{ color: theme.colors.muted }}>
              <Clock size={14} /> {formatTime(recipe.prepTime + recipe.cookTime)} total
            </span>
            <span className="flex items-center gap-1.5 text-sm" style={{ color: theme.colors.muted }}>
              <Users size={14} /> Serves {recipe.servings}
            </span>
          </div>
        </div>

        {/* Ingredients */}
        <div className="px-6 py-4">
          <h3
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: theme.colors.accent }}
          >
            Ingredients
          </h3>
          <ul className="space-y-1.5">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex gap-3 text-sm" style={{ color: theme.colors.text }}>
                <span className="font-medium w-20 shrink-0 text-right">
                  {ing.amount} {ing.unit}
                </span>
                <span>
                  {ing.name}
                  {ing.note && <span style={{ color: theme.colors.muted }}> — {ing.note}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="px-6 py-4 border-t" style={{ borderColor: theme.colors.accent + '20' }}>
          <h3
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: theme.colors.accent }}
          >
            Method
          </h3>
          <ol className="space-y-3">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm" style={{ color: theme.colors.text }}>
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ background: theme.colors.accent, color: '#fff' }}
                >
                  {step.number}
                </span>
                <div>
                  <p>{step.instruction}</p>
                  {step.tip && (
                    <p className="text-xs mt-1 italic" style={{ color: theme.colors.muted }}>
                      ✦ {step.tip}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Notes */}
        <div className="px-6 py-4 border-t space-y-3" style={{ borderColor: theme.colors.accent + '20' }}>
          {recipe.chefNote && (
            <div
              className="rounded-md px-4 py-3 text-sm italic"
              style={{
                background: theme.colors.accent + '15',
                borderLeft: `3px solid ${theme.colors.accent}`,
                color: theme.colors.text,
              }}
            >
              <span className="font-semibold not-italic">Chef: </span>{recipe.chefNote}
            </div>
          )}
          {recipe.wellnessNote && (
            <div
              className="rounded-md px-4 py-3 text-sm italic"
              style={{
                background: '#3a907015',
                borderLeft: '3px solid #3a9070',
                color: theme.colors.text,
              }}
            >
              <span className="font-semibold not-italic">Wellness: </span>{recipe.wellnessNote}
            </div>
          )}
          {recipe.leftoverNote && (
            <div
              className="rounded-md px-4 py-3 text-sm italic"
              style={{
                background: '#74763815',
                borderLeft: '3px solid #747638',
                color: theme.colors.text,
              }}
            >
              <span className="font-semibold not-italic">Leftovers: </span>{recipe.leftoverNote}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
