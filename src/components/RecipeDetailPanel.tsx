'use client';

import { RecipeConcept, BatchPlan } from '@/types';
import { Clock, Users, ChefHat, Check } from 'lucide-react';
import OverlapBar from './OverlapBar';
import ChainIndicator from './ChainIndicator';

interface RecipeDetailPanelProps {
  recipe: RecipeConcept;
  batch: BatchPlan;
}

export default function RecipeDetailPanel({ recipe, batch }: RecipeDetailPanelProps) {
  const sourceRecipe = recipe.leftoverSourceRecipeId
    ? batch.recipes.find(r => r.id === recipe.leftoverSourceRecipeId)
    : undefined;
  const targetTitles = recipe.leftoverTargetRecipeIds
    .map(id => batch.recipes.find(r => r.id === id)?.title)
    .filter((t): t is string => !!t);

  return (
    <div className="h-full overflow-y-auto p-5">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold" style={{ color: '#4a8c5c' }}>
            Recipe {recipe.chainPosition} of {batch.recipes.length}
          </span>
        </div>
        <h2 className="font-serif text-xl font-bold mb-2" style={{ color: '#1a3a2a' }}>{recipe.title}</h2>
        <p className="text-sm leading-relaxed" style={{ color: '#6b5a3e' }}>{recipe.description}</p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm mb-5 p-3 rounded-lg" style={{ backgroundColor: '#f5f0e8' }}>
        <span className="flex items-center gap-1.5" style={{ color: '#6b5a3e' }}>
          <Clock className="w-4 h-4" /> {recipe.prepTime + recipe.cookTime}m total
        </span>
        <span className="flex items-center gap-1.5" style={{ color: '#6b5a3e' }}>
          <Users className="w-4 h-4" /> {recipe.servings} servings
        </span>
        <span className="font-medium" style={{ color: '#2d5a3d' }}>
          ${recipe.costEstimate.perServing.toFixed(2)}/srv
        </span>
      </div>

      {/* Chain info */}
      {batch.useLeftoverChainMode && recipe.leftoverRole !== 'standalone' && (
        <div className="mb-5 p-3 rounded-lg border" style={{ backgroundColor: '#fdf8ee', borderColor: '#e8c96d' }}>
          <ChainIndicator
            role={recipe.leftoverRole}
            position={recipe.chainPosition}
            total={batch.recipes.length}
            sourceTitle={sourceRecipe?.title}
            targetTitles={targetTitles}
          />
          {recipe.leftoverNote && (
            <p className="text-xs mt-2 italic" style={{ color: '#8a7350' }}>{recipe.leftoverNote}</p>
          )}
        </div>
      )}

      {/* Pantry overlap */}
      <div className="mb-5 p-3 rounded-lg" style={{ backgroundColor: '#f5f0e8' }}>
        <OverlapBar score={recipe.pantryOverlapScore} />
        {recipe.pantryOverlapIngredients.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {recipe.pantryOverlapIngredients.slice(0, 6).map(ing => (
              <span key={ing} className="text-xs px-2 py-0.5 rounded-full border"
                style={{ backgroundColor: '#eef8f1', color: '#2d5a3d', borderColor: '#aad9b8' }}>
                ✓ {ing}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Ingredients */}
      <div className="mb-5">
        <h3 className="font-serif text-sm font-bold mb-2" style={{ color: '#1a3a2a' }}>Ingredients</h3>
        <ul className="space-y-1">
          {recipe.ingredients.map(ing => {
            const inPantry = recipe.pantryOverlapIngredients.includes(ing);
            return (
              <li key={ing} className="flex items-center gap-2 text-sm">
                {inPantry
                  ? <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#4a8c5c' }} />
                  : <span className="w-3.5 h-3.5 flex-shrink-0 flex items-center justify-center rounded-full border text-xs" style={{ borderColor: '#d4b896', color: '#a68c62' }}>·</span>
                }
                <span style={{ color: inPantry ? '#1a3a2a' : '#6b5a3e' }}>{ing}</span>
                {inPantry && <span className="text-xs" style={{ color: '#7ec495' }}>pantry</span>}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Instructions */}
      <div className="mb-5">
        <h3 className="font-serif text-sm font-bold mb-3" style={{ color: '#1a3a2a' }}>Instructions</h3>
        <ol className="space-y-3">
          {recipe.instructions.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: '#2d5a3d' }}>
                {i + 1}
              </span>
              <span style={{ color: '#3d2c1e' }}>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Prep notes */}
      {recipe.prepNotes.length > 0 && (
        <div className="p-3 rounded-lg" style={{ backgroundColor: '#eef8f1' }}>
          <h3 className="font-serif text-sm font-bold mb-2 flex items-center gap-1.5" style={{ color: '#1a3a2a' }}>
            <ChefHat className="w-4 h-4" /> Prep Notes
          </h3>
          <ul className="space-y-1">
            {recipe.prepNotes.map((note, i) => (
              <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: '#2d5a3d' }}>
                <span style={{ color: '#4a8c5c' }}>→</span> {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
