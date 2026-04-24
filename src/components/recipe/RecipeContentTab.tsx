'use client';
import { Recipe } from '@/types';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface RecipeContentTabProps {
  recipe: Recipe;
  onChange: (updates: Partial<Recipe>) => void;
}

export function RecipeContentTab({ recipe, onChange }: RecipeContentTabProps) {
  return (
    <div className="p-5 space-y-5">
      <Input
        label="Title"
        value={recipe.title}
        onChange={e => onChange({ title: e.target.value })}
      />
      <Input
        label="Subtitle"
        value={recipe.subtitle}
        onChange={e => onChange({ subtitle: e.target.value })}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-pine-800">Prep Time (min)</label>
          <input
            type="number"
            value={recipe.prepTime}
            onChange={e => onChange({ prepTime: parseInt(e.target.value) || 0 })}
            className="rounded-md border border-cream-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pine-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-pine-800">Cook Time (min)</label>
          <input
            type="number"
            value={recipe.cookTime}
            onChange={e => onChange({ cookTime: parseInt(e.target.value) || 0 })}
            className="rounded-md border border-cream-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pine-500"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-pine-800">Servings</label>
        <input
          type="number"
          value={recipe.servings}
          onChange={e => onChange({ servings: parseInt(e.target.value) || 1 })}
          className="w-32 rounded-md border border-cream-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pine-500"
        />
      </div>
      <Input
        label="Cuisine Inspiration"
        value={recipe.cuisineInspiration}
        onChange={e => onChange({ cuisineInspiration: e.target.value })}
      />
      <Input
        label="Style Tag"
        value={recipe.styleTag}
        onChange={e => onChange({ styleTag: e.target.value })}
      />
    </div>
  );
}
