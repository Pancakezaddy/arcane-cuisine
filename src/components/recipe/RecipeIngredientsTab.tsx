'use client';

import { Ingredient, Recipe } from '@/types';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface RecipeIngredientsTabProps {
  recipe: Recipe;
  onChange: (updates: Partial<Recipe>) => void;
}

export function RecipeIngredientsTab({ recipe, onChange }: RecipeIngredientsTabProps) {
  const updateIngredient = (index: number, updates: Partial<Ingredient>) => {
    const updated = recipe.ingredients.map((ing, i) =>
      i === index ? { ...ing, ...updates } : ing
    );
    onChange({ ingredients: updated });
  };

  const addIngredient = () => {
    onChange({
      ingredients: [...recipe.ingredients, { name: '', amount: '', unit: '', note: '' }],
    });
  };

  const removeIngredient = (index: number) => {
    onChange({ ingredients: recipe.ingredients.filter((_, i) => i !== index) });
  };

  return (
    <div className="p-5 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-pine-800">
          {recipe.ingredients.length} ingredient{recipe.ingredients.length !== 1 ? 's' : ''}
        </p>
        <Button variant="secondary" size="sm" onClick={addIngredient}>
          <Plus size={13} className="mr-1" /> Add
        </Button>
      </div>

      <div className="space-y-2">
        {recipe.ingredients.map((ing, i) => (
          <div key={i} className="flex items-center gap-2 p-2.5 bg-cream-50 rounded-md border border-cream-200">
            <GripVertical size={14} className="text-pine-300 shrink-0" />
            <input
              placeholder="Amount"
              value={ing.amount}
              onChange={e => updateIngredient(i, { amount: e.target.value })}
              className="w-16 rounded border border-cream-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-pine-500"
            />
            <input
              placeholder="Unit"
              value={ing.unit ?? ''}
              onChange={e => updateIngredient(i, { unit: e.target.value })}
              className="w-16 rounded border border-cream-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-pine-500"
            />
            <input
              placeholder="Ingredient name"
              value={ing.name}
              onChange={e => updateIngredient(i, { name: e.target.value })}
              className="flex-1 rounded border border-cream-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-pine-500"
            />
            <input
              placeholder="Note (optional)"
              value={ing.note ?? ''}
              onChange={e => updateIngredient(i, { note: e.target.value })}
              className="w-28 rounded border border-cream-300 px-2 py-1 text-xs text-pine-400 focus:outline-none focus:ring-1 focus:ring-pine-500"
            />
            <button
              onClick={() => removeIngredient(i)}
              className="p-1 rounded hover:bg-red-50 text-pine-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
