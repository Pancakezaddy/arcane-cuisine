'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Recipe } from '@/types';
import { SAMPLE_BATCHES } from '@/lib/mock-data';
import { RecipeDetailEditor } from '@/components/recipe/RecipeDetailEditor';
import { Header } from '@/components/layout/Header';
import { updateRecipe } from '@/lib/api';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RecipeDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [recipe, setRecipe] = useState<Recipe | null>(() => {
    for (const batch of SAMPLE_BATCHES) {
      const found = batch.recipes.find(r => r.id === id);
      if (found) return found;
    }
    return null;
  });

  const handleSave = async (updated: Recipe) => {
    await updateRecipe(updated.id, updated);
    setRecipe(updated);
  };

  if (!recipe) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <Header title="Recipe" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-pine-500">Recipe not found.</p>
        </div>
      </div>
    );
  }

  const batchId = recipe.batchId;
  const theme = SAMPLE_BATCHES.find(b => b.id === batchId)?.activeTheme;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header
        title={recipe.title}
        subtitle={`Batch: ${SAMPLE_BATCHES.find(b => b.id === batchId)?.inputs.name ?? batchId}`}
        actions={
          <Link
            href={`/batches/${batchId}`}
            className="inline-flex items-center gap-1 text-sm text-pine-600 hover:text-pine-900"
          >
            <ArrowLeft size={14} /> Back to Batch
          </Link>
        }
      />
      <div className="flex-1 overflow-hidden">
        <RecipeDetailEditor recipe={recipe} onSave={handleSave} themeId={theme} />
      </div>
    </div>
  );
}
