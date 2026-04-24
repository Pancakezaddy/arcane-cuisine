'use client';
import { useState } from 'react';
import { BatchInputs, CoreProtein, PantryIngredient, PantryRuleMode, SeasonalMode, BalanceProfile } from '@/types';
import { CORE_PROTEINS, PANTRY_INGREDIENTS } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';
import { Sparkles, Leaf, Thermometer, Clock } from 'lucide-react';

interface BatchSetupPanelProps {
  initialInputs?: Partial<BatchInputs>;
  onGenerate: (inputs: BatchInputs) => void;
  isGenerating?: boolean;
}

const defaultInputs: BatchInputs = {
  name: '',
  coreProtein: 'chicken-thighs',
  batchSize: 5,
  pantryIngredients: ['onions', 'garlic', 'herbs'],
  pantryRuleMode: 'Standard',
  seasonalMode: 'Any',
  balanceProfile: 'Balanced',
  exclusions: [],
  maxCookTime: 60,
  preferredStyle: '',
};

export function BatchSetupPanel({ initialInputs, onGenerate, isGenerating }: BatchSetupPanelProps) {
  const [inputs, setInputs] = useState<BatchInputs>({ ...defaultInputs, ...initialInputs });
  const [exclusionText, setExclusionText] = useState('');

  const togglePantry = (item: PantryIngredient) => {
    setInputs(prev => ({
      ...prev,
      pantryIngredients: prev.pantryIngredients.includes(item)
        ? prev.pantryIngredients.filter(i => i !== item)
        : [...prev.pantryIngredients, item],
    }));
  };

  const addExclusion = () => {
    if (exclusionText.trim()) {
      setInputs(prev => ({ ...prev, exclusions: [...prev.exclusions, exclusionText.trim()] }));
      setExclusionText('');
    }
  };

  const removeExclusion = (ex: string) => {
    setInputs(prev => ({ ...prev, exclusions: prev.exclusions.filter(e => e !== ex) }));
  };

  const handleSubmit = () => {
    if (!inputs.name.trim()) return;
    onGenerate(inputs);
  };

  const pantryGroups = PANTRY_INGREDIENTS.reduce<Record<string, typeof PANTRY_INGREDIENTS>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  return (
    <aside className="w-[280px] flex flex-col bg-white border-r border-cream-300 h-full overflow-y-auto">
      <div className="px-4 py-4 border-b border-cream-200">
        <h2 className="text-sm font-semibold text-pine-900">Batch Setup</h2>
        <p className="text-xs text-pine-500 mt-0.5">Configure your weekly recipe plan</p>
      </div>

      <div className="flex-1 px-4 py-4 space-y-5">
        {/* Batch Name */}
        <Input
          label="Batch Name"
          placeholder="e.g. Autumn Chicken Week"
          value={inputs.name}
          onChange={e => setInputs(prev => ({ ...prev, name: e.target.value }))}
        />

        {/* Core Protein */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-pine-800">Core Protein</label>
          <div className="space-y-1.5">
            {CORE_PROTEINS.map(p => (
              <button
                key={p.value}
                onClick={() => setInputs(prev => ({ ...prev, coreProtein: p.value as CoreProtein }))}
                className={cn(
                  'w-full text-left px-3 py-2.5 rounded-md border text-sm transition-colors',
                  inputs.coreProtein === p.value
                    ? 'border-pine-600 bg-pine-50 text-pine-900'
                    : 'border-cream-300 hover:border-cream-400 text-pine-700'
                )}
              >
                <div className="font-medium">{p.label}</div>
                <div className="text-xs text-pine-500">{p.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Batch Size */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-pine-800 flex items-center gap-1.5">
            <Sparkles size={13} className="text-brass-500" />
            Recipes in Batch
          </label>
          <div className="flex gap-2">
            {[3, 4, 5, 6, 7].map(n => (
              <button
                key={n}
                onClick={() => setInputs(prev => ({ ...prev, batchSize: n }))}
                className={cn(
                  'flex-1 py-1.5 rounded-md border text-sm font-medium transition-colors',
                  inputs.batchSize === n
                    ? 'border-pine-600 bg-pine-700 text-cream-50'
                    : 'border-cream-300 text-pine-700 hover:border-pine-400'
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Max Cook Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-pine-800 flex items-center gap-1.5">
            <Clock size={13} className="text-pine-500" />
            Max Cook Time: {inputs.maxCookTime}m
          </label>
          <input
            type="range"
            min={20}
            max={120}
            step={5}
            value={inputs.maxCookTime}
            onChange={e => setInputs(prev => ({ ...prev, maxCookTime: parseInt(e.target.value) }))}
            className="w-full accent-pine-700"
          />
          <div className="flex justify-between text-xs text-pine-400">
            <span>20m</span><span>120m</span>
          </div>
        </div>

        {/* Pantry Ingredients */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-pine-800 flex items-center gap-1.5">
            <Leaf size={13} className="text-pine-500" />
            Pantry Staples
          </label>
          {Object.entries(pantryGroups).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs text-pine-400 mb-1">{group}</p>
              <div className="flex flex-wrap gap-1">
                {items.map(item => (
                  <button
                    key={item.value}
                    onClick={() => togglePantry(item.value)}
                    className={cn(
                      'px-2 py-1 rounded text-xs border transition-colors',
                      inputs.pantryIngredients.includes(item.value)
                        ? 'border-pine-600 bg-pine-700 text-cream-50'
                        : 'border-cream-300 text-pine-600 hover:border-pine-400'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pantry Rule Mode */}
        <Select
          label="Pantry Rule Mode"
          value={inputs.pantryRuleMode}
          onChange={e => setInputs(prev => ({ ...prev, pantryRuleMode: e.target.value as PantryRuleMode }))}
          options={[
            { value: 'Strict', label: 'Strict – only pantry items' },
            { value: 'Standard', label: 'Standard – mostly pantry' },
            { value: 'Flexible', label: 'Flexible – pantry inspired' },
          ]}
        />

        {/* Seasonal Mode */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-pine-800 flex items-center gap-1.5">
            <Thermometer size={13} className="text-pine-500" />
            Season
          </label>
          <div className="flex flex-wrap gap-1.5">
            {(['Any', 'Spring', 'Summer', 'Autumn', 'Winter'] as SeasonalMode[]).map(s => (
              <button
                key={s}
                onClick={() => setInputs(prev => ({ ...prev, seasonalMode: s }))}
                className={cn(
                  'px-2.5 py-1 rounded-md border text-xs font-medium transition-colors',
                  inputs.seasonalMode === s
                    ? 'border-pine-600 bg-pine-700 text-cream-50'
                    : 'border-cream-300 text-pine-600 hover:border-pine-400'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Balance Profile */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-pine-800">Balance Profile</label>
          <div className="grid grid-cols-2 gap-1.5">
            {(['Warming', 'Cooling', 'Grounding', 'Balanced'] as BalanceProfile[]).map(b => (
              <button
                key={b}
                onClick={() => setInputs(prev => ({ ...prev, balanceProfile: b }))}
                className={cn(
                  'py-1.5 rounded-md border text-xs font-medium transition-colors',
                  inputs.balanceProfile === b
                    ? 'border-pine-600 bg-pine-700 text-cream-50'
                    : 'border-cream-300 text-pine-600 hover:border-pine-400'
                )}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Exclusions */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-pine-800">Exclusions</label>
          <div className="flex gap-1.5">
            <input
              type="text"
              placeholder="e.g. nuts"
              value={exclusionText}
              onChange={e => setExclusionText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addExclusion()}
              className="flex-1 rounded border border-cream-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-pine-500"
            />
            <button
              onClick={addExclusion}
              className="px-2 py-1 text-xs bg-cream-200 hover:bg-cream-300 rounded border border-cream-300 text-pine-700"
            >
              Add
            </button>
          </div>
          {inputs.exclusions.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {inputs.exclusions.map(ex => (
                <span
                  key={ex}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 border border-red-200 rounded text-xs text-red-700"
                >
                  {ex}
                  <button onClick={() => removeExclusion(ex)} className="hover:text-red-900">×</button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-4 border-t border-cream-200">
        <Button
          className="w-full"
          onClick={handleSubmit}
          isLoading={isGenerating}
          disabled={!inputs.name.trim() || isGenerating}
        >
          <Sparkles size={14} className="mr-1.5" />
          {isGenerating ? 'Generating…' : 'Generate Concepts'}
        </Button>
      </div>
    </aside>
  );
}
