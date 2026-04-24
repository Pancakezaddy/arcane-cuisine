'use client';

import { useState } from 'react';
import { useBatch } from '@/context/BatchContext';
import { DEFAULT_PANTRY_PRESETS } from '@/lib/mockData';
import { PantryIngredient, IngredientCategory } from '@/types';
import PantryChip from '@/components/PantryChip';
import { Save, Leaf, Plus } from 'lucide-react';

const CATEGORY_LABELS: Record<IngredientCategory, string> = {
  oils: 'Oils & Fats',
  grains: 'Grains & Starches',
  canned: 'Canned Goods',
  spices: 'Spices & Dried Herbs',
  aromatics: 'Aromatics & Fresh Herbs',
  condiments: 'Condiments & Sauces',
  supporting: 'Supporting Ingredients',
};

const CATEGORY_ORDER: IngredientCategory[] = ['aromatics', 'oils', 'grains', 'spices', 'canned', 'condiments', 'supporting'];

export default function PantryPage() {
  const { pantry, setPantry, currentBatch } = useBatch();
  const [saved, setSaved] = useState(false);
  const [customInputs, setCustomInputs] = useState<Partial<Record<IngredientCategory, string>>>({});

  const toggleIngredient = (id: string) => {
    setPantry({
      ...pantry,
      ingredients: pantry.ingredients.map(i => i.id === id ? { ...i, selected: !i.selected } : i),
      updatedAt: new Date().toISOString(),
    });
  };

  const applyPreset = (presetId: string) => {
    const preset = DEFAULT_PANTRY_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    setPantry({
      ...pantry,
      activePresetId: presetId,
      ingredients: pantry.ingredients.map(i => ({
        ...i,
        selected: preset.ingredients.includes(i.id),
      })),
      updatedAt: new Date().toISOString(),
    });
  };

  const addCustomIngredient = (category: IngredientCategory) => {
    const name = customInputs[category]?.trim();
    if (!name) return;
    const id = `custom-${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    setPantry({
      ...pantry,
      ingredients: [...pantry.ingredients, { id, name, category, selected: true }],
    });
    setCustomInputs(prev => ({ ...prev, [category]: '' }));
  };

  const savePantry = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const selectedCount = pantry.ingredients.filter(i => i.selected).length;
  const totalCount = pantry.ingredients.length;

  const batchOverlap = currentBatch
    ? Math.round(currentBatch.recipes.reduce((s, r) => s + r.pantryOverlapScore, 0) / currentBatch.recipes.length)
    : null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold mb-1" style={{ color: '#1a3a2a' }}>
            Pantry Fingerprint
          </h1>
          <p className="text-sm" style={{ color: '#6b5a3e' }}>
            Select the staple ingredients you always keep in your kitchen. This improves recipe matches and reduces grocery trips.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {batchOverlap !== null && (
            <div className="text-center px-4 py-2 rounded-xl border" style={{ backgroundColor: '#eef8f1', borderColor: '#aad9b8' }}>
              <div className="font-serif text-xl font-bold" style={{ color: '#1a3a2a' }}>{batchOverlap}%</div>
              <div className="text-xs" style={{ color: '#4a8c5c' }}>batch overlap</div>
            </div>
          )}
          <button
            onClick={savePantry}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ backgroundColor: saved ? '#4a8c5c' : '#2d5a3d' }}>
            {saved ? '✓ Saved!' : <><Save className="w-4 h-4" /> Save Fingerprint</>}
          </button>
        </div>
      </div>

      {/* Presets */}
      <div className="mb-8">
        <h2 className="font-serif text-base font-bold mb-3" style={{ color: '#1a3a2a' }}>Quick Presets</h2>
        <div className="grid grid-cols-3 gap-3">
          {DEFAULT_PANTRY_PRESETS.map(preset => {
            const isActive = pantry.activePresetId === preset.id;
            return (
              <div key={preset.id}
                className="rounded-xl p-4 border transition-all"
                style={{
                  backgroundColor: isActive ? '#eef8f1' : 'white',
                  borderColor: isActive ? '#4a8c5c' : '#e8e0d5',
                }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4" style={{ color: isActive ? '#2d5a3d' : '#a68c62' }} />
                    <h3 className="font-serif text-sm font-bold" style={{ color: '#1a3a2a' }}>
                      {preset.name}
                    </h3>
                  </div>
                  {isActive && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: '#d5eedd', color: '#1a3a2a' }}>Active</span>
                  )}
                </div>
                <p className="text-xs mb-3" style={{ color: '#6b5a3e' }}>{preset.description}</p>
                <button
                  onClick={() => applyPreset(preset.id)}
                  className="w-full py-1.5 rounded-lg text-xs font-medium border transition-all"
                  style={isActive
                    ? { backgroundColor: '#d5eedd', borderColor: '#4a8c5c', color: '#1a3a2a' }
                    : { backgroundColor: 'white', borderColor: '#d4b896', color: '#6b5a3e' }}>
                  {isActive ? '✓ Applied' : 'Apply Preset'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 mb-6 p-3 rounded-xl border"
        style={{ backgroundColor: 'white', borderColor: '#e8e0d5' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4a8c5c' }} />
          <span className="text-sm font-medium" style={{ color: '#1c1c1c' }}>{selectedCount} selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#e8e0d5' }} />
          <span className="text-sm" style={{ color: '#8a7350' }}>{totalCount - selectedCount} unselected</span>
        </div>
        <div className="ml-auto">
          <div className="h-2 w-48 rounded-full overflow-hidden" style={{ backgroundColor: '#e8e0d5' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${(selectedCount / totalCount) * 100}%`, backgroundColor: '#4a8c5c' }} />
          </div>
        </div>
        <span className="text-sm font-medium" style={{ color: '#2d5a3d' }}>
          {Math.round((selectedCount / totalCount) * 100)}% pantry coverage
        </span>
      </div>

      {/* Ingredient categories */}
      <div className="space-y-6">
        {CATEGORY_ORDER.map(category => {
          const catIngredients = pantry.ingredients.filter((i: PantryIngredient) => i.category === category);
          const selectedInCat = catIngredients.filter((i: PantryIngredient) => i.selected).length;

          return (
            <div key={category} className="rounded-xl border p-5" style={{ backgroundColor: 'white', borderColor: '#e8e0d5' }}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-serif text-sm font-bold" style={{ color: '#1a3a2a' }}>
                    {CATEGORY_LABELS[category]}
                  </h3>
                  <p className="text-xs" style={{ color: '#8a7350' }}>
                    {selectedInCat} of {catIngredients.length} selected
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {catIngredients.map((ing: PantryIngredient) => (
                    <div key={ing.id} className="w-2 h-2 rounded-sm"
                      style={{ backgroundColor: ing.selected ? '#4a8c5c' : '#e8e0d5' }} />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {catIngredients.map((ing: PantryIngredient) => (
                  <PantryChip
                    key={ing.id}
                    ingredient={ing}
                    onToggle={toggleIngredient}
                  />
                ))}
              </div>

              {/* Add custom ingredient */}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={customInputs[category] || ''}
                  onChange={e => setCustomInputs(prev => ({ ...prev, [category]: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && addCustomIngredient(category)}
                  placeholder={`Add ${CATEGORY_LABELS[category].split(' ')[0].toLowerCase()}...`}
                  className="flex-1 text-xs px-3 py-1.5 rounded-lg border focus:outline-none"
                  style={{ borderColor: '#d4b896', backgroundColor: '#faf7f2' }}
                />
                <button
                  onClick={() => addCustomIngredient(category)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"
                  style={{ backgroundColor: '#eef8f1', color: '#2d5a3d', border: '1px solid #aad9b8' }}>
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom save button */}
      <div className="mt-8 flex items-center justify-between py-4 border-t" style={{ borderColor: '#e8e0d5' }}>
        <p className="text-sm" style={{ color: '#8a7350' }}>
          Changes are applied immediately to your current batch.
        </p>
        <button
          onClick={savePantry}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: saved ? '#4a8c5c' : '#2d5a3d' }}>
          {saved ? '✓ Saved!' : <><Save className="w-4 h-4" /> Save Fingerprint</>}
        </button>
      </div>
    </div>
  );
}
