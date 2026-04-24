import { PublicLayout } from '@/components/layout/PublicLayout';
import { SAMPLE_BATCHES } from '@/lib/mock-data';
import { formatTime } from '@/lib/utils';
import { Clock, ChefHat } from 'lucide-react';

export default function SamplesPage() {
  const recipes = SAMPLE_BATCHES.flatMap(b => b.recipes);

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pine-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Sample Recipes
          </h1>
          <p className="text-pine-600">A taste of what Arcane Kitchen produces.</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <div key={recipe.id} className="bg-white border border-cream-300 rounded-xl shadow-sm overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-pine-100 to-cream-200 flex items-center justify-center">
                <ChefHat size={32} className="text-pine-400" />
              </div>
              <div className="p-5">
                <div className="text-xs font-medium text-brass-500 mb-1">{recipe.styleTag}</div>
                <h3 className="font-semibold text-pine-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {recipe.title}
                </h3>
                <p className="text-xs text-pine-500 mb-3">{recipe.subtitle}</p>
                <div className="flex items-center gap-3 text-xs text-pine-500">
                  <span className="flex items-center gap-1"><Clock size={11} /> {formatTime(recipe.prepTime + recipe.cookTime)}</span>
                  <span>Serves {recipe.servings}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {recipe.balanceTags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-pine-50 text-pine-700 rounded-full text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
