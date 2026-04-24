import { BatchPlan, BudgetMode, KitchenPacket, LeftoverRole, PantryFingerprint, RecipeConcept } from '@/types';
import { MOCK_BATCH_PLAN, MOCK_KITCHEN_PACKET } from './mockData';

export interface BatchOptions {
  servings: number;
  budgetMode: BudgetMode;
  usePantryFingerprint: boolean;
  useLeftoverChainMode: boolean;
  pantryFingerprintId?: string;
}

export function getBudgetMultiplier(mode: BudgetMode): number {
  switch (mode) {
    case 'cheapest': return 0.65;
    case 'balanced': return 1.0;
    case 'premium': return 1.55;
  }
}

export function getChainDescription(role: LeftoverRole, sourceTitle?: string): string {
  switch (role) {
    case 'upstream': return 'Anchors the chain — feeds into later recipes';
    case 'downstream': return sourceTitle ? `Uses leftovers from: ${sourceTitle}` : 'Uses leftovers from a previous recipe';
    case 'standalone': return 'Independent recipe';
  }
}

export function calculatePantryOverlap(ingredients: string[], pantry: PantryFingerprint): number {
  const selectedNames = pantry.ingredients
    .filter(i => i.selected)
    .map(i => i.name.toLowerCase());
  if (ingredients.length === 0) return 0;
  const matches = ingredients.filter(ing =>
    selectedNames.some(s => s.includes(ing.toLowerCase()) || ing.toLowerCase().includes(s))
  );
  return Math.round((matches.length / ingredients.length) * 100);
}

export function generateBatchPlan(protein: string, options: BatchOptions): BatchPlan {
  const multiplier = getBudgetMultiplier(options.budgetMode);
  const servingsRatio = options.servings / 4;

  const recipes: RecipeConcept[] = MOCK_BATCH_PLAN.recipes.map(r => ({
    ...r,
    coreProtein: protein,
    servings: options.servings,
    costEstimate: {
      perServing: parseFloat((r.costEstimate.perServing * multiplier).toFixed(2)),
      weeklyTotal: parseFloat((r.costEstimate.weeklyTotal * multiplier * servingsRatio).toFixed(2)),
      currency: 'USD',
    },
    leftoverRole: options.useLeftoverChainMode ? r.leftoverRole : 'standalone',
    leftoverTargetRecipeIds: options.useLeftoverChainMode ? r.leftoverTargetRecipeIds : [],
    leftoverSourceRecipeId: options.useLeftoverChainMode ? r.leftoverSourceRecipeId : undefined,
  }));

  const totalCost = recipes.reduce((sum, r) => sum + r.costEstimate.weeklyTotal, 0);
  const avgCookTime = Math.round(recipes.reduce((sum, r) => sum + r.cookTime, 0) / recipes.length);

  return {
    ...MOCK_BATCH_PLAN,
    id: `batch-${Date.now()}`,
    coreProtein: protein,
    servingsPerRecipe: options.servings,
    budgetMode: options.budgetMode,
    usePantryFingerprint: options.usePantryFingerprint,
    useLeftoverChainMode: options.useLeftoverChainMode,
    pantryFingerprintId: options.pantryFingerprintId,
    recipes,
    leftoverLinks: options.useLeftoverChainMode ? MOCK_BATCH_PLAN.leftoverLinks : [],
    weeklyBudgetEstimate: {
      perServing: parseFloat((totalCost / (recipes.length * options.servings)).toFixed(2)),
      weeklyTotal: parseFloat(totalCost.toFixed(2)),
      currency: 'USD',
    },
    avgCookTime,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function buildKitchenPacket(batch: BatchPlan): KitchenPacket {
  const chainRelationships = batch.leftoverLinks.length;
  const avgCookTime = Math.round(batch.recipes.reduce((s, r) => s + r.cookTime, 0) / batch.recipes.length);
  const pantryOverlapPct = Math.round(batch.recipes.reduce((s, r) => s + r.pantryOverlapScore, 0) / batch.recipes.length);

  return {
    ...MOCK_KITCHEN_PACKET,
    id: `packet-${Date.now()}`,
    batchId: batch.id,
    title: `${batch.title} — Kitchen Packet`,
    generatedAt: new Date().toISOString(),
    summary: {
      recipeCount: batch.recipes.length,
      avgCookTime,
      pantryOverlapPct,
      weeklyCost: batch.weeklyBudgetEstimate,
      chainRelationships,
    },
  };
}
