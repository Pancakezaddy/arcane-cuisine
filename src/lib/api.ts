import { Batch, BatchInputs, Recipe, RecipeConcept, ThemeConfig, Export, ThemeId } from '@/types';
import { SAMPLE_BATCHES, THEMES, generateMockBatch } from './mock-data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchBatches(): Promise<Batch[]> {
  await delay(500);
  return SAMPLE_BATCHES;
}

export async function fetchBatch(id: string): Promise<Batch | null> {
  await delay(500);
  return SAMPLE_BATCHES.find(b => b.id === id) ?? null;
}

export async function createBatch(inputs: BatchInputs): Promise<Batch> {
  await delay(800);
  return generateMockBatch(inputs);
}

export async function updateBatch(id: string, updates: Partial<Batch>): Promise<Batch> {
  await delay(400);
  const batch = SAMPLE_BATCHES.find(b => b.id === id);
  if (!batch) throw new Error('Batch not found');
  return { ...batch, ...updates, updatedAt: new Date().toISOString() };
}

export async function deleteBatch(id: string): Promise<void> {
  await delay(400);
  console.log(`[stub] Deleted batch ${id}`);
}

export async function generateConcepts(batchId: string): Promise<RecipeConcept[]> {
  await delay(1500);
  const batch = SAMPLE_BATCHES.find(b => b.id === batchId);
  return batch?.concepts ?? [];
}

export async function updateConcept(
  batchId: string,
  conceptId: string,
  updates: Partial<RecipeConcept>
): Promise<RecipeConcept> {
  await delay(300);
  const batch = SAMPLE_BATCHES.find(b => b.id === batchId);
  const concept = batch?.concepts.find(c => c.id === conceptId);
  if (!concept) throw new Error('Concept not found');
  return { ...concept, ...updates };
}

export async function expandConcept(conceptId: string): Promise<Recipe> {
  await delay(1200);
  const batch = SAMPLE_BATCHES.find(b => b.concepts.some(c => c.id === conceptId));
  const recipe = batch?.recipes.find(r => r.conceptId === conceptId);
  if (!recipe) throw new Error('Recipe not generated yet');
  return recipe;
}

export async function fetchRecipe(id: string): Promise<Recipe | null> {
  await delay(400);
  for (const batch of SAMPLE_BATCHES) {
    const recipe = batch.recipes.find(r => r.id === id);
    if (recipe) return recipe;
  }
  return null;
}

export async function updateRecipe(id: string, updates: Partial<Recipe>): Promise<Recipe> {
  await delay(400);
  for (const batch of SAMPLE_BATCHES) {
    const recipe = batch.recipes.find(r => r.id === id);
    if (recipe) return { ...recipe, ...updates, updatedAt: new Date().toISOString() };
  }
  throw new Error('Recipe not found');
}

export async function fetchThemes(): Promise<ThemeConfig[]> {
  await delay(200);
  return THEMES;
}

export async function setActiveTheme(batchId: string, themeId: ThemeId): Promise<void> {
  await delay(300);
  console.log(`[stub] Set theme ${themeId} for batch ${batchId}`);
}

export async function createExport(
  batchId: string,
  themeId: ThemeId,
  format: string
): Promise<Export> {
  await delay(1000);
  return {
    id: `export-${Date.now()}`,
    batchId,
    format: format as Export['format'],
    themeId,
    status: 'complete',
    url: '#',
    createdAt: new Date().toISOString(),
  };
}

export async function fetchExports(batchId?: string): Promise<Export[]> {
  await delay(400);
  const base: Export[] = [
    {
      id: 'export-1',
      batchId: 'batch-1',
      format: 'pdf',
      themeId: 'arcane-editorial',
      status: 'complete',
      url: '#',
      createdAt: '2024-11-01T12:00:00Z',
    },
    {
      id: 'export-2',
      batchId: 'batch-1',
      format: 'png',
      themeId: 'arcane-editorial',
      status: 'complete',
      url: '#',
      createdAt: '2024-11-01T12:05:00Z',
    },
  ];
  return batchId ? base.filter(e => e.batchId === batchId) : base;
}
