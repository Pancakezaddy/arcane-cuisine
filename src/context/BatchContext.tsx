'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { BatchPlan, KitchenPacket, PantryFingerprint, RecipeConcept, BudgetMode } from '@/types';
import { MOCK_BATCH_PLAN, MOCK_KITCHEN_PACKET, DEFAULT_PANTRY } from '@/lib/mockData';
import { generateBatchPlan, buildKitchenPacket, BatchOptions } from '@/lib/planner';

interface BatchContextValue {
  currentBatch: BatchPlan | null;
  kitchenPacket: KitchenPacket | null;
  pantry: PantryFingerprint;
  selectedRecipe: RecipeConcept | null;
  protein: string;
  servings: number;
  budgetMode: BudgetMode;
  usePantryFingerprint: boolean;
  useLeftoverChainMode: boolean;
  batches: BatchPlan[];
  setProtein: (p: string) => void;
  setServings: (s: number) => void;
  setBudgetMode: (m: BudgetMode) => void;
  setUsePantryFingerprint: (v: boolean) => void;
  setUseLeftoverChainMode: (v: boolean) => void;
  setSelectedRecipe: (r: RecipeConcept | null) => void;
  generateBatch: () => void;
  setPantry: (p: PantryFingerprint) => void;
  generatePacket: () => void;
}

const BatchContext = createContext<BatchContextValue | null>(null);

export function BatchProvider({ children }: { children: React.ReactNode }) {
  const [currentBatch, setCurrentBatch] = useState<BatchPlan | null>(MOCK_BATCH_PLAN);
  const [kitchenPacket, setKitchenPacket] = useState<KitchenPacket | null>(MOCK_KITCHEN_PACKET);
  const [pantry, setPantry] = useState<PantryFingerprint>(DEFAULT_PANTRY);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeConcept | null>(null);
  const [protein, setProtein] = useState('Chicken');
  const [servings, setServings] = useState(4);
  const [budgetMode, setBudgetMode] = useState<BudgetMode>('balanced');
  const [usePantryFingerprint, setUsePantryFingerprint] = useState(true);
  const [useLeftoverChainMode, setUseLeftoverChainMode] = useState(true);
  const [batches, setBatches] = useState<BatchPlan[]>([MOCK_BATCH_PLAN]);

  const generateBatch = useCallback(() => {
    const options: BatchOptions = {
      servings,
      budgetMode,
      usePantryFingerprint,
      useLeftoverChainMode,
      pantryFingerprintId: usePantryFingerprint ? pantry.id : undefined,
    };
    const newBatch = generateBatchPlan(protein, options);
    setCurrentBatch(newBatch);
    setSelectedRecipe(null);
    setBatches(prev => [newBatch, ...prev.slice(0, 4)]);
    const packet = buildKitchenPacket(newBatch);
    setKitchenPacket(packet);
  }, [protein, servings, budgetMode, usePantryFingerprint, useLeftoverChainMode, pantry.id]);

  const generatePacket = useCallback(() => {
    if (currentBatch) {
      setKitchenPacket(buildKitchenPacket(currentBatch));
    }
  }, [currentBatch]);

  return (
    <BatchContext.Provider value={{
      currentBatch, kitchenPacket, pantry, selectedRecipe,
      protein, servings, budgetMode, usePantryFingerprint, useLeftoverChainMode,
      batches,
      setProtein, setServings, setBudgetMode, setUsePantryFingerprint,
      setUseLeftoverChainMode, setSelectedRecipe, generateBatch,
      setPantry, generatePacket,
    }}>
      {children}
    </BatchContext.Provider>
  );
}

export function useBatch() {
  const ctx = useContext(BatchContext);
  if (!ctx) throw new Error('useBatch must be used within BatchProvider');
  return ctx;
}
