'use client';

import { RecipeConcept, BatchPlan } from '@/types';
import { Clock, Users, ChevronRight } from 'lucide-react';
import ChainIndicator from './ChainIndicator';
import OverlapBar from './OverlapBar';
import BudgetBadge from './BudgetBadge';

interface RecipeCardProps {
  recipe: RecipeConcept;
  batch: BatchPlan;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function RecipeCard({ recipe, batch, isSelected, onClick }: RecipeCardProps) {
  const sourceRecipe = recipe.leftoverSourceRecipeId
    ? batch.recipes.find(r => r.id === recipe.leftoverSourceRecipeId)
    : undefined;
  const targetTitles = recipe.leftoverTargetRecipeIds
    .map(id => batch.recipes.find(r => r.id === id)?.title)
    .filter((t): t is string => !!t);

  const displayIngredients = recipe.ingredients.slice(0, 5);
  const remainingCount = recipe.ingredients.length - 5;

  return (
    <div
      onClick={onClick}
      className="rounded-xl border p-4 cursor-pointer transition-all duration-200 group"
      style={{
        backgroundColor: isSelected ? '#eef8f1' : 'white',
        borderColor: isSelected ? '#4a8c5c' : '#e8e0d5',
        boxShadow: isSelected ? '0 0 0 2px #4a8c5c22' : '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold" style={{ color: '#4a8c5c' }}>
              {recipe.chainPosition} / {batch.recipes.length}
            </span>
            <BudgetBadge mode={batch.budgetMode} perServing={recipe.costEstimate.perServing} />
          </div>
          <h3 className="font-serif text-base font-bold leading-tight" style={{ color: '#1c1c1c' }}>
            {recipe.title}
          </h3>
        </div>
        <ChevronRight className="w-4 h-4 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: '#4a8c5c' }} />
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: '#6b5a3e' }}>
        {recipe.description}
      </p>

      {/* Chain indicator */}
      {batch.useLeftoverChainMode && recipe.leftoverRole !== 'standalone' && (
        <div className="mb-3">
          <ChainIndicator
            role={recipe.leftoverRole}
            position={recipe.chainPosition}
            total={batch.recipes.length}
            sourceTitle={sourceRecipe?.title}
            targetTitles={targetTitles}
          />
        </div>
      )}

      {/* Ingredients preview */}
      <div className="flex flex-wrap gap-1 mb-3">
        {displayIngredients.map(ing => (
          <span key={ing}
            className="text-xs px-2 py-0.5 rounded"
            style={{ backgroundColor: '#f5f0e8', color: '#6b5a3e' }}>
            {ing}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="text-xs px-2 py-0.5 rounded"
            style={{ backgroundColor: '#e8e0d5', color: '#8a7350' }}>
            +{remainingCount} more
          </span>
        )}
      </div>

      {/* Footer stats */}
      <div className="flex items-center gap-3 text-xs mb-3" style={{ color: '#8a7350' }}>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {recipe.cookTime}m
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {recipe.servings} srv
        </span>
        {recipe.prepNotes.length > 0 && (
          <span className="flex items-center gap-1">
            📋 {recipe.prepNotes.length} notes
          </span>
        )}
      </div>

      {/* Pantry overlap */}
      <OverlapBar score={recipe.pantryOverlapScore} />
    </div>
  );
}
