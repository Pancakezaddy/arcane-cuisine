'use client';
import { Recipe, RecipeFormat } from '@/types';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';

interface RecipeStyleTabProps {
  recipe: Recipe;
  onChange: (updates: Partial<Recipe>) => void;
}

const FORMAT_OPTIONS: { value: RecipeFormat; label: string }[] = [
  { value: 'roast-tray-bake', label: 'Roast / Tray Bake' },
  { value: 'bowl-rice', label: 'Bowl / Rice' },
  { value: 'skillet', label: 'Skillet' },
  { value: 'lighter-leftover', label: 'Lighter Leftover' },
  { value: 'comfort', label: 'Comfort Dish' },
];

export function RecipeStyleTab({ recipe, onChange }: RecipeStyleTabProps) {
  return (
    <div className="p-5 space-y-5">
      <Select
        label="Recipe Format"
        value={recipe.format}
        onChange={e => onChange({ format: e.target.value as RecipeFormat })}
        options={FORMAT_OPTIONS}
      />
      <Input
        label="Style Tag"
        value={recipe.styleTag}
        onChange={e => onChange({ styleTag: e.target.value })}
        hint="e.g. Rustic European, Ayurvedic, Modern Asian"
      />
      <Input
        label="Cuisine Inspiration"
        value={recipe.cuisineInspiration}
        onChange={e => onChange({ cuisineInspiration: e.target.value })}
        hint="e.g. French Bistro, South Asian, Mediterranean"
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-pine-800">Overlap Score</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={100}
            value={recipe.overlapScore}
            onChange={e => onChange({ overlapScore: parseInt(e.target.value) })}
            className="flex-1 accent-pine-700"
          />
          <span className="text-sm font-bold text-pine-800 w-10 text-right">
            {recipe.overlapScore}%
          </span>
        </div>
        <p className="text-xs text-pine-400">
          How well this recipe uses the batch pantry ingredients
        </p>
      </div>
    </div>
  );
}
