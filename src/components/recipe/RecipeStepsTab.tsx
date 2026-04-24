'use client';
import { RecipeStep, Recipe } from '@/types';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';

interface RecipeStepsTabProps {
  recipe: Recipe;
  onChange: (updates: Partial<Recipe>) => void;
}

export function RecipeStepsTab({ recipe, onChange }: RecipeStepsTabProps) {
  const updateStep = (index: number, updates: Partial<RecipeStep>) => {
    const updated = recipe.steps.map((s, i) => (i === index ? { ...s, ...updates } : s));
    onChange({ steps: updated });
  };

  const addStep = () => {
    const newStep: RecipeStep = {
      number: recipe.steps.length + 1,
      instruction: '',
      duration: undefined,
      tip: '',
    };
    onChange({ steps: [...recipe.steps, newStep] });
  };

  const removeStep = (index: number) => {
    const updated = recipe.steps
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, number: i + 1 }));
    onChange({ steps: updated });
  };

  return (
    <div className="p-5 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-pine-800">
          {recipe.steps.length} step{recipe.steps.length !== 1 ? 's' : ''}
        </p>
        <Button variant="secondary" size="sm" onClick={addStep}>
          <Plus size={13} className="mr-1" /> Add Step
        </Button>
      </div>

      <div className="space-y-3">
        {recipe.steps.map((step, i) => (
          <div key={i} className="p-3.5 bg-cream-50 rounded-md border border-cream-200">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-pine-700 text-cream-50 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {step.number}
              </div>
              <div className="flex-1 space-y-2">
                <textarea
                  placeholder="Step instruction…"
                  value={step.instruction}
                  onChange={e => updateStep(i, { instruction: e.target.value })}
                  rows={2}
                  className="w-full rounded border border-cream-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-pine-500 resize-none"
                />
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs text-pine-500">Duration (min)</label>
                    <input
                      type="number"
                      value={step.duration ?? ''}
                      onChange={e => updateStep(i, { duration: parseInt(e.target.value) || undefined })}
                      className="w-16 rounded border border-cream-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-pine-500"
                    />
                  </div>
                </div>
                <input
                  placeholder="Chef tip (optional)"
                  value={step.tip ?? ''}
                  onChange={e => updateStep(i, { tip: e.target.value })}
                  className="w-full rounded border border-cream-300 px-2 py-1 text-xs text-pine-500 focus:outline-none focus:ring-1 focus:ring-pine-500"
                />
              </div>
              <button
                onClick={() => removeStep(i)}
                className="p-1 rounded hover:bg-red-50 text-pine-300 hover:text-red-500 transition-colors shrink-0"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
