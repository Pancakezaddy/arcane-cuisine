// Pantry Fingerprint
export type IngredientCategory = 'oils' | 'grains' | 'canned' | 'spices' | 'aromatics' | 'condiments' | 'supporting';

export interface PantryIngredient {
  id: string;
  name: string;
  category: IngredientCategory;
  selected: boolean;
}

export interface PantryPreset {
  id: string;
  name: string;
  description: string;
  ingredients: string[]; // ingredient ids
}

export interface PantryFingerprint {
  id: string;
  userId: string;
  name: string;
  ingredients: PantryIngredient[];
  activePresetId?: string;
  createdAt: string;
  updatedAt: string;
}

// Leftover Chain
export type LeftoverRole = 'upstream' | 'downstream' | 'standalone';

export interface LeftoverLink {
  sourceRecipeId: string;
  targetRecipeId: string;
  description: string;
}

// Budget
export type BudgetMode = 'cheapest' | 'balanced' | 'premium';

export interface CostEstimate {
  perServing: number;
  weeklyTotal: number;
  currency: string;
}

// Recipe Concept
export interface RecipeConcept {
  id: string;
  title: string;
  description: string;
  coreProtein: string;
  ingredients: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  tags: string[];
  leftoverRole: LeftoverRole;
  leftoverSourceRecipeId?: string;
  leftoverTargetRecipeIds: string[];
  leftoverNote?: string;
  chainPosition: number;
  chainNote?: string;
  costEstimate: CostEstimate;
  pantryOverlapScore: number;
  pantryOverlapIngredients: string[];
  instructions: string[];
  prepNotes: string[];
}

// Batch Plan
export interface BatchPlan {
  id: string;
  title: string;
  coreProtein: string;
  servingsPerRecipe: number;
  budgetMode: BudgetMode;
  usePantryFingerprint: boolean;
  useLeftoverChainMode: boolean;
  pantryFingerprintId?: string;
  recipes: RecipeConcept[];
  leftoverLinks: LeftoverLink[];
  weeklyBudgetEstimate: CostEstimate;
  avgPantryOverlap: number;
  avgCookTime: number;
  createdAt: string;
  updatedAt: string;
}

// Kitchen Packet
export interface GroceryItem {
  ingredient: string;
  quantity: string;
  recipeIds: string[];
  isPantryStaple: boolean;
}

export interface PrepNote {
  recipeId: string;
  recipeTitle: string;
  notes: string[];
  suggestedDay: number;
}

export interface KitchenPacket {
  id: string;
  batchId: string;
  title: string;
  generatedAt: string;
  summary: {
    recipeCount: number;
    avgCookTime: number;
    pantryOverlapPct: number;
    weeklyCost: CostEstimate;
    chainRelationships: number;
  };
  groceryList: GroceryItem[];
  prepPlan: PrepNote[];
  leftoverMap: LeftoverLink[];
  cookOrder: Array<{ day: number; recipeId: string; recipeTitle: string }>;
  sections: {
    groceryList: boolean;
    prepNotes: boolean;
    leftoverMap: boolean;
    cookOrder: boolean;
    recipeZines: boolean;
  };
}
