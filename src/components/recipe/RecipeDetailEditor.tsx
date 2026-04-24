'use client';
import { useState } from 'react';
import { Recipe } from '@/types';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { RecipeContentTab } from './RecipeContentTab';
import { RecipeIngredientsTab } from './RecipeIngredientsTab';
import { RecipeStepsTab } from './RecipeStepsTab';
import { RecipeNotesTab } from './RecipeNotesTab';
import { RecipeStyleTab } from './RecipeStyleTab';
import { RecipePreviewTab } from './RecipePreviewTab';
import { Save, Eye } from 'lucide-react';
import { formatTime } from '@/lib/utils';

interface RecipeDetailEditorProps {
  recipe: Recipe;
  onSave?: (recipe: Recipe) => Promise<void>;
  themeId?: string;
}

const TABS = [
  { id: 'content', label: 'Content' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'steps', label: 'Steps' },
  { id: 'notes', label: 'Notes' },
  { id: 'style', label: 'Style' },
  { id: 'preview', label: 'Preview' },
];

export function RecipeDetailEditor({ recipe: initialRecipe, onSave, themeId }: RecipeDetailEditorProps) {
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (updates: Partial<Recipe>) => {
    setRecipe(prev => ({ ...prev, ...updates }));
    setSaved(false);
  };

  const handleSave = async () => {
    if (!onSave) return;
    setIsSaving(true);
    await onSave(recipe);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-5 py-3.5 border-b border-cream-200 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-pine-900 truncate">{recipe.title}</h2>
          <p className="text-xs text-pine-500">
            {formatTime(recipe.prepTime + recipe.cookTime)} · Serves {recipe.servings}
          </p>
        </div>
        {onSave && (
          <Button size="sm" onClick={handleSave} isLoading={isSaving}>
            <Save size={13} className="mr-1.5" />
            {saved ? 'Saved!' : 'Save'}
          </Button>
        )}
      </div>

      <Tabs tabs={TABS} className="flex-1 overflow-hidden">
        {activeTab => (
          <div className="h-full overflow-y-auto">
            {activeTab === 'content' && <RecipeContentTab recipe={recipe} onChange={handleChange} />}
            {activeTab === 'ingredients' && <RecipeIngredientsTab recipe={recipe} onChange={handleChange} />}
            {activeTab === 'steps' && <RecipeStepsTab recipe={recipe} onChange={handleChange} />}
            {activeTab === 'notes' && <RecipeNotesTab recipe={recipe} onChange={handleChange} />}
            {activeTab === 'style' && <RecipeStyleTab recipe={recipe} onChange={handleChange} />}
            {activeTab === 'preview' && <RecipePreviewTab recipe={recipe} themeId={themeId} />}
          </div>
        )}
      </Tabs>
    </div>
  );
}
