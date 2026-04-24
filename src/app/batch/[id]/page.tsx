'use client';

import { useState } from 'react';
import { useBatch } from '@/context/BatchContext';
import BatchSetupPanel from '@/components/BatchSetupPanel';
import RecipeCard from '@/components/RecipeCard';
import RecipeDetailPanel from '@/components/RecipeDetailPanel';
import KitchenPacketPanel from '@/components/KitchenPacketPanel';
import { ChefHat, Package } from 'lucide-react';

type RightPanelTab = 'preview' | 'packet';

export default function BatchPage() {
  const { currentBatch, selectedRecipe, setSelectedRecipe } = useBatch();
  const [rightTab, setRightTab] = useState<RightPanelTab>('preview');

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#faf7f2' }}>
      {/* Left panel */}
      <BatchSetupPanel />

      {/* Center - Recipe Board */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="mb-5">
            <h1 className="font-serif text-2xl font-bold" style={{ color: '#1a3a2a' }}>
              {currentBatch ? currentBatch.title : "This Week's Batch"}
            </h1>
            {currentBatch && (
              <p className="text-sm mt-0.5" style={{ color: '#6b5a3e' }}>
                {currentBatch.recipes.length} recipes · {currentBatch.coreProtein} ·&nbsp;
                {currentBatch.useLeftoverChainMode ? `${currentBatch.leftoverLinks.length} leftover chains` : 'no chains'}
              </p>
            )}
          </div>

          {!currentBatch ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ChefHat className="w-12 h-12 mb-4" style={{ color: '#d4b896' }} />
              <h2 className="font-serif text-lg font-bold mb-2" style={{ color: '#1a3a2a' }}>No Batch Generated</h2>
              <p className="text-sm" style={{ color: '#8a7350' }}>
                Configure your options in the left panel and click Generate Batch.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {currentBatch.recipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  batch={currentBatch}
                  isSelected={selectedRecipe?.id === recipe.id}
                  onClick={() => {
                    setSelectedRecipe(recipe);
                    setRightTab('preview');
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-80 flex-shrink-0 flex flex-col border-l overflow-hidden"
        style={{ borderColor: '#e8e0d5', backgroundColor: 'white' }}>
        {/* Tab switcher */}
        <div className="flex border-b" style={{ borderColor: '#e8e0d5' }}>
          <button
            onClick={() => setRightTab('preview')}
            className="flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors"
            style={rightTab === 'preview'
              ? { borderColor: '#2d5a3d', color: '#2d5a3d' }
              : { borderColor: 'transparent', color: '#8a7350' }}>
            <ChefHat className="w-3.5 h-3.5" /> Preview
          </button>
          <button
            onClick={() => setRightTab('packet')}
            className="flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors"
            style={rightTab === 'packet'
              ? { borderColor: '#2d5a3d', color: '#2d5a3d' }
              : { borderColor: 'transparent', color: '#8a7350' }}>
            <Package className="w-3.5 h-3.5" /> Kitchen Packet
          </button>
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-hidden">
          {rightTab === 'preview' ? (
            selectedRecipe && currentBatch ? (
              <RecipeDetailPanel recipe={selectedRecipe} batch={currentBatch} />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 p-6 text-center">
                <ChefHat className="w-8 h-8 mb-3" style={{ color: '#d4b896' }} />
                <p className="text-sm" style={{ color: '#8a7350' }}>
                  Click a recipe card to preview its details here.
                </p>
              </div>
            )
          ) : (
            <KitchenPacketPanel />
          )}
        </div>
      </div>
    </div>
  );
}
