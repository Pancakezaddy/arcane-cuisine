export type CoreProtein = 'chicken-thighs' | 'ground-beef' | 'sirloin-steak';

export type PantryIngredient =
  | 'onions' | 'garlic' | 'potatoes' | 'rice' | 'lentils'
  | 'canned-tomatoes' | 'herbs' | 'citrus' | 'ginger' | 'turmeric'
  | 'yogurt' | 'beans' | 'greens';

export type PantryRuleMode = 'Strict' | 'Standard' | 'Flexible';
export type SeasonalMode = 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'Any';
export type BalanceProfile = 'Warming' | 'Cooling' | 'Grounding' | 'Balanced';
export type RecipeFormat = 'roast-tray-bake' | 'bowl-rice' | 'skillet' | 'lighter-leftover' | 'comfort';
export type ThemeId = 'arcane-editorial' | 'ayurvedic-kitchen' | 'rustic-pantry' | 'meal-prep-clean';
export type BatchStatus = 'draft' | 'generating' | 'reviewing' | 'complete';
export type ConceptStatus = 'pending' | 'approved' | 'swapped' | 'rejected';
export type ExportFormat = 'pdf' | 'png' | 'web';

export interface Ingredient {
  name: string;
  amount: string;
  unit?: string;
  note?: string;
}

export interface RecipeStep {
  number: number;
  instruction: string;
  duration?: number;
  tip?: string;
}

export interface Recipe {
  id: string;
  conceptId: string;
  batchId: string;
  title: string;
  subtitle: string;
  coreProtein: CoreProtein;
  servings: number;
  cookTime: number;
  prepTime: number;
  styleTag: string;
  cuisineInspiration: string;
  format: RecipeFormat;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  chefNote: string;
  wellnessNote: string;
  leftoverNote: string;
  balanceTags: string[];
  overlapScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeConcept {
  id: string;
  batchId: string;
  recipeId?: string;
  title: string;
  subtitle: string;
  format: RecipeFormat;
  styleTag: string;
  cuisineInspiration: string;
  estimatedCookTime: number;
  balanceTags: string[];
  overlapScore: number;
  status: ConceptStatus;
}

export interface BatchInputs {
  name: string;
  coreProtein: CoreProtein;
  batchSize: number;
  pantryIngredients: PantryIngredient[];
  pantryRuleMode: PantryRuleMode;
  seasonalMode: SeasonalMode;
  balanceProfile: BalanceProfile;
  exclusions: string[];
  maxCookTime: number;
  preferredStyle: string;
}

export interface Batch {
  id: string;
  inputs: BatchInputs;
  concepts: RecipeConcept[];
  recipes: Recipe[];
  status: BatchStatus;
  activeTheme: ThemeId;
  createdAt: string;
  updatedAt: string;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  colors: {
    background: string;
    surface: string;
    text: string;
    accent: string;
    muted: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  cardDensity: 'compact' | 'comfortable' | 'spacious';
  noteStyle: 'bordered' | 'inset' | 'highlighted';
  imageFraming: 'full-bleed' | 'inset' | 'circular';
}

export interface Export {
  id: string;
  batchId: string;
  format: ExportFormat;
  themeId: ThemeId;
  status: 'pending' | 'processing' | 'complete' | 'failed';
  url?: string;
  createdAt: string;
}
