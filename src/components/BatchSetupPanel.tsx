'use client';

import { useBatch } from '@/context/BatchContext';
import { BudgetMode } from '@/types';
import { Zap, Scale, Crown, ChefHat, Leaf, Link2 } from 'lucide-react';
import clsx from 'clsx';
import React from 'react';

const BUDGET_OPTIONS: { mode: BudgetMode; label: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; desc: string }[] = [
  { mode: 'cheapest', label: 'Cheapest', icon: Zap, desc: 'Budget-friendly pantry picks' },
  { mode: 'balanced', label: 'Balanced', icon: Scale, desc: 'Quality without excess' },
  { mode: 'premium', label: 'Premium', icon: Crown, desc: 'Best-in-class ingredients' },
];

const SERVINGS_OPTIONS = [2, 4, 6, 8];

export default function BatchSetupPanel() {
  const {
    protein, setProtein,
    servings, setServings,
    budgetMode, setBudgetMode,
    usePantryFingerprint, setUsePantryFingerprint,
    useLeftoverChainMode, setUseLeftoverChainMode,
    generateBatch,
    currentBatch,
  } = useBatch();

  return (
    <aside className="w-72 flex-shrink-0 p-5 overflow-y-auto border-r" style={{ borderColor: '#e8e0d5', backgroundColor: '#faf7f2' }}>
      <h2 className="font-serif text-base font-bold mb-5" style={{ color: '#1a3a2a' }}>Batch Setup</h2>

      {/* Core Protein */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6b5a3e' }}>
          Core Protein
        </label>
        <input
          type="text"
          value={protein}
          onChange={e => setProtein(e.target.value)}
          placeholder="e.g. Chicken, Salmon, Tofu"
          className="w-full px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 transition-all"
          style={{
            backgroundColor: 'white',
            borderColor: '#d4b896',
            color: '#1c1c1c',
          }}
        />
      </div>

      {/* Servings */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6b5a3e' }}>
          Servings per Recipe
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {SERVINGS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setServings(s)}
              className="py-2 rounded-lg text-sm font-medium border transition-all"
              style={servings === s
                ? { backgroundColor: '#2d5a3d', color: 'white', borderColor: '#2d5a3d' }
                : { backgroundColor: 'white', color: '#6b5a3e', borderColor: '#d4b896' }
              }
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Mode */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6b5a3e' }}>
          Budget Guardrail
        </label>
        <div className="space-y-1.5">
          {BUDGET_OPTIONS.map(({ mode, label, icon: Icon, desc }) => (
            <button
              key={mode}
              onClick={() => setBudgetMode(mode)}
              className="w-full flex items-start gap-3 px-3 py-2.5 rounded-lg border transition-all text-left"
              style={budgetMode === mode
                ? { backgroundColor: '#eef8f1', borderColor: '#4a8c5c' }
                : { backgroundColor: 'white', borderColor: '#e8e0d5' }
              }
            >
              <Icon className={clsx('w-4 h-4 mt-0.5 flex-shrink-0')}
                style={{ color: budgetMode === mode ? '#3a6e4a' : '#a68c62' }} />
              <div>
                <div className="text-sm font-medium" style={{ color: budgetMode === mode ? '#1a3a2a' : '#3d2c1e' }}>
                  {label}
                </div>
                <div className="text-xs" style={{ color: '#8a7350' }}>{desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="mb-6 space-y-3">
        <Toggle
          label="Pantry Fingerprint"
          description="Match recipes to your pantry"
          value={usePantryFingerprint}
          onChange={setUsePantryFingerprint}
          icon={Leaf}
        />
        <Toggle
          label="Leftover Chain Mode"
          description="Link recipes via leftovers"
          value={useLeftoverChainMode}
          onChange={setUseLeftoverChainMode}
          icon={Link2}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={generateBatch}
        className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all active:scale-95"
        style={{ backgroundColor: '#2d5a3d' }}
      >
        <ChefHat className="w-4 h-4" />
        Generate Batch
      </button>

      {/* Batch Stats */}
      {currentBatch && (
        <div className="mt-5 p-4 rounded-xl border" style={{ backgroundColor: 'white', borderColor: '#e8e0d5' }}>
          <h3 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#6b5a3e' }}>Batch Stats</h3>
          <div className="space-y-2 text-xs">
            <StatRow label="Recipes" value={`${currentBatch.recipes.length}`} />
            <StatRow label="Avg Cook Time" value={`${currentBatch.avgCookTime}m`} />
            <StatRow label="Weekly Cost" value={`$${currentBatch.weeklyBudgetEstimate.weeklyTotal.toFixed(0)}`} />
            <StatRow label="Pantry Overlap" value={`${currentBatch.avgPantryOverlap}%`} />
            {currentBatch.useLeftoverChainMode && (
              <StatRow label="Chain Links" value={`${currentBatch.leftoverLinks.length}`} />
            )}
          </div>
        </div>
      )}
    </aside>
  );
}

function Toggle({ label, description, value, onChange, icon: Icon }: {
  label: string; description: string; value: boolean;
  onChange: (v: boolean) => void; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border"
      style={{ backgroundColor: value ? '#eef8f1' : 'white', borderColor: value ? '#aad9b8' : '#e8e0d5' }}>
      <div className="flex items-center gap-2">
        <Icon className="w-3.5 h-3.5" style={{ color: value ? '#2d5a3d' : '#a68c62' }} />
        <div>
          <div className="text-xs font-medium" style={{ color: '#1c1c1c' }}>{label}</div>
          <div className="text-xs" style={{ color: '#8a7350' }}>{description}</div>
        </div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className="w-9 h-5 rounded-full relative transition-all flex-shrink-0"
        style={{ backgroundColor: value ? '#2d5a3d' : '#d4b896' }}
      >
        <span
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all"
          style={{ left: value ? '18px' : '2px' }}
        />
      </button>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span style={{ color: '#8a7350' }}>{label}</span>
      <span className="font-medium" style={{ color: '#1c1c1c' }}>{value}</span>
    </div>
  );
}
