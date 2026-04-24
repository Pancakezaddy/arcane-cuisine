'use client';
import { Recipe } from '@/types';

interface RecipeNotesTabProps {
  recipe: Recipe;
  onChange: (updates: Partial<Recipe>) => void;
}

const NoteField = ({
  label,
  value,
  onChange,
  placeholder,
  accentColor,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  accentColor: string;
}) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-pine-800 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
      {label}
    </label>
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full rounded-md border border-cream-300 bg-white px-3 py-2 text-sm text-pine-900 focus:outline-none focus:ring-2 focus:ring-pine-500 resize-none"
    />
  </div>
);

export function RecipeNotesTab({ recipe, onChange }: RecipeNotesTabProps) {
  return (
    <div className="p-5 space-y-5">
      <NoteField
        label="Chef Note"
        value={recipe.chefNote}
        onChange={val => onChange({ chefNote: val })}
        placeholder="Share a professional tip or technique insight…"
        accentColor="#b08d3f"
      />
      <NoteField
        label="Wellness Note"
        value={recipe.wellnessNote}
        onChange={val => onChange({ wellnessNote: val })}
        placeholder="Describe nutritional or wellness benefits of this recipe…"
        accentColor="#3a9070"
      />
      <NoteField
        label="Leftover Note"
        value={recipe.leftoverNote}
        onChange={val => onChange({ leftoverNote: val })}
        placeholder="How to repurpose or store leftovers creatively…"
        accentColor="#747638"
      />
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-pine-800">Balance Tags</label>
        <div className="flex flex-wrap gap-2">
          {['Warming', 'Cooling', 'Grounding', 'Balanced'].map(tag => (
            <button
              key={tag}
              onClick={() => {
                const current = recipe.balanceTags;
                const updated = current.includes(tag)
                  ? current.filter(t => t !== tag)
                  : [...current, tag];
                onChange({ balanceTags: updated });
              }}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                recipe.balanceTags.includes(tag)
                  ? 'bg-pine-700 text-cream-50 border-pine-700'
                  : 'bg-white text-pine-600 border-cream-300 hover:border-pine-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
