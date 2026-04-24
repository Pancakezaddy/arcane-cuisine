'use client';

import Link from 'next/link';
import { useBatch } from '@/context/BatchContext';
import { DEFAULT_PANTRY, DEFAULT_PANTRY_PRESETS } from '@/lib/mockData';
import BudgetBadge from '@/components/BudgetBadge';
import OverlapBar from '@/components/OverlapBar';
import { ArrowRight, Clock, Package, Link2, TrendingDown, Download } from 'lucide-react';

const CATEGORY_LABELS: Record<string, string> = {
  oils: 'Oils & Fats',
  grains: 'Grains',
  canned: 'Canned Goods',
  spices: 'Spices',
  aromatics: 'Aromatics',
  condiments: 'Condiments',
  supporting: 'Supporting',
};

export default function DashboardPage() {
  const { batches, currentBatch } = useBatch();
  const pantry = DEFAULT_PANTRY;

  const totalSelected = pantry.ingredients.filter(i => i.selected).length;
  const avgOverlap = batches.length
    ? Math.round(batches.reduce((s, b) => s + b.avgPantryOverlap, 0) / batches.length)
    : 0;
  const avgCost = batches.length
    ? (batches.reduce((s, b) => s + b.weeklyBudgetEstimate.weeklyTotal, 0) / batches.length).toFixed(0)
    : '0';

  const chainBatches = batches.filter(b => b.useLeftoverChainMode).length;

  const categories = Array.from(new Set(pantry.ingredients.map(i => i.category)));

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold mb-1" style={{ color: '#1a3a2a' }}>Arcane Kitchen</h1>
        <p className="text-base" style={{ color: '#6b5a3e' }}>Batch Recipe Planning Studio</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Batches', value: batches.length, icon: Package, sub: 'this session' },
          { label: 'Avg Pantry Match', value: `${avgOverlap}%`, icon: TrendingDown, sub: 'ingredient overlap' },
          { label: 'Avg Weekly Cost', value: `$${avgCost}`, icon: Clock, sub: 'all batches' },
          { label: 'Chain Batches', value: chainBatches, icon: Link2, sub: 'leftover chains active' },
        ].map(({ label, value, icon: Icon, sub }) => (
          <div key={label} className="rounded-xl p-4 border" style={{ backgroundColor: 'white', borderColor: '#e8e0d5' }}>
            <div className="flex items-start justify-between mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#eef8f1' }}>
                <Icon className="w-4 h-4" style={{ color: '#2d5a3d' }} />
              </div>
            </div>
            <div className="text-2xl font-serif font-bold" style={{ color: '#1a3a2a' }}>{value}</div>
            <div className="text-xs mt-0.5" style={{ color: '#8a7350' }}>{label}</div>
            <div className="text-xs" style={{ color: '#a68c62' }}>{sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Batches */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-bold" style={{ color: '#1a3a2a' }}>Recent Batches</h2>
            <Link href="/batch/new" className="flex items-center gap-1 text-sm font-medium"
              style={{ color: '#2d5a3d' }}>
              New Batch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {batches.map(batch => (
              <Link key={batch.id} href={`/batch/${batch.id}`}>
                <div className="rounded-xl p-4 border transition-all hover:shadow-md"
                  style={{ backgroundColor: 'white', borderColor: '#e8e0d5' }}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-sm font-bold leading-tight" style={{ color: '#1a3a2a' }}>
                      {batch.title}
                    </h3>
                    <BudgetBadge mode={batch.budgetMode} />
                  </div>

                  <p className="text-xs mb-3" style={{ color: '#8a7350' }}>
                    {batch.recipes.length} recipes · {batch.coreProtein}
                  </p>

                  <div className="flex items-center gap-3 text-xs mb-3" style={{ color: '#a68c62' }}>
                    {batch.useLeftoverChainMode && (
                      <span className="flex items-center gap-1">
                        <Link2 className="w-3 h-3" style={{ color: '#4a8c5c' }} />
                        {batch.leftoverLinks.length} chains
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {batch.avgCookTime}m avg
                    </span>
                    <span className="font-medium" style={{ color: '#2d5a3d' }}>
                      ${batch.weeklyBudgetEstimate.weeklyTotal.toFixed(0)}/wk
                    </span>
                  </div>

                  <OverlapBar score={batch.avgPantryOverlap} />
                </div>
              </Link>
            ))}

            {/* New batch CTA */}
            <Link href="/batch/new">
              <div className="rounded-xl p-4 border border-dashed flex flex-col items-center justify-center min-h-32 transition-all text-center"
                style={{ borderColor: '#aad9b8', backgroundColor: '#fafffe' }}>
                <div className="text-2xl mb-1">+</div>
                <p className="text-sm font-medium" style={{ color: '#2d5a3d' }}>New Batch</p>
                <p className="text-xs" style={{ color: '#7ec495' }}>Plan your next week</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Pantry Fingerprint */}
          <div className="rounded-xl p-4 border" style={{ backgroundColor: 'white', borderColor: '#e8e0d5' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-serif text-sm font-bold" style={{ color: '#1a3a2a' }}>Pantry Fingerprint</h2>
              <Link href="/pantry" className="text-xs" style={{ color: '#2d5a3d' }}>Edit →</Link>
            </div>
            <p className="text-xs mb-3" style={{ color: '#8a7350' }}>
              {totalSelected} ingredients selected
            </p>

            <div className="space-y-2">
              {categories.slice(0, 4).map(cat => {
                const catIngredients = pantry.ingredients.filter(i => i.category === cat);
                const selectedCount = catIngredients.filter(i => i.selected).length;
                return (
                  <div key={cat} className="flex items-center justify-between text-xs">
                    <span style={{ color: '#6b5a3e' }}>{CATEGORY_LABELS[cat]}</span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-0.5">
                        {catIngredients.slice(0, 6).map(ing => (
                          <div key={ing.id} className="w-2 h-2 rounded-sm"
                            style={{ backgroundColor: ing.selected ? '#4a8c5c' : '#e8e0d5' }} />
                        ))}
                      </div>
                      <span style={{ color: '#a68c62' }}>{selectedCount}/{catIngredients.length}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t flex flex-wrap gap-1" style={{ borderColor: '#e8e0d5' }}>
              {DEFAULT_PANTRY_PRESETS.map(preset => (
                <span key={preset.id} className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: '#eef8f1', color: '#2d5a3d' }}>
                  {preset.name}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Exports */}
          <div className="rounded-xl p-4 border" style={{ backgroundColor: 'white', borderColor: '#e8e0d5' }}>
            <h2 className="font-serif text-sm font-bold mb-3" style={{ color: '#1a3a2a' }}>Recent Packets</h2>
            {currentBatch ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: '#faf7f2' }}>
                  <div>
                    <p className="text-xs font-medium" style={{ color: '#1c1c1c' }}>{currentBatch.title}</p>
                    <p className="text-xs" style={{ color: '#8a7350' }}>{currentBatch.recipes.length} recipes</p>
                  </div>
                  <button className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg"
                    style={{ backgroundColor: '#eef8f1', color: '#2d5a3d' }}>
                    <Download className="w-3 h-3" /> Export
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs" style={{ color: '#a68c62' }}>No packets yet. Generate a batch first.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
