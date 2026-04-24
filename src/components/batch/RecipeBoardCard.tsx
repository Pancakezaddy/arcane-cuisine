'use client';
import { RecipeConcept, ConceptStatus } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatTime, cn } from '@/lib/utils';
import { Check, RefreshCw, X, Clock, ChefHat, Star } from 'lucide-react';

interface RecipeBoardCardProps {
  concept: RecipeConcept;
  isSelected?: boolean;
  onSelect?: () => void;
  onStatusChange?: (status: ConceptStatus) => void;
  onExpand?: () => void;
}

const FORMAT_LABELS: Record<string, string> = {
  'roast-tray-bake': 'Tray Bake',
  'bowl-rice': 'Rice Bowl',
  'skillet': 'Skillet',
  'lighter-leftover': 'Leftover',
  'comfort': 'Comfort',
};

const STATUS_COLORS: Record<ConceptStatus, string> = {
  pending: 'text-pine-500',
  approved: 'text-green-700',
  swapped: 'text-brass-600',
  rejected: 'text-red-500',
};

export function RecipeBoardCard({
  concept,
  isSelected,
  onSelect,
  onStatusChange,
  onExpand,
}: RecipeBoardCardProps) {
  const scoreColor =
    concept.overlapScore >= 85
      ? 'text-green-700'
      : concept.overlapScore >= 75
      ? 'text-brass-600'
      : 'text-pine-500';

  return (
    <div
      className={cn(
        'bg-white border rounded-lg shadow-sm transition-all cursor-pointer',
        isSelected
          ? 'border-pine-600 ring-1 ring-pine-600'
          : 'border-cream-300 hover:border-cream-400 hover:shadow-md',
        concept.status === 'rejected' && 'opacity-50'
      )}
      onClick={onSelect}
    >
      <div className="px-4 py-3 border-b border-cream-100 flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-1.5 py-0.5 bg-cream-100 text-pine-600 rounded font-medium">
              {FORMAT_LABELS[concept.format] ?? concept.format}
            </span>
            {concept.status !== 'pending' && (
              <span className={cn('text-xs font-medium capitalize', STATUS_COLORS[concept.status])}>
                {concept.status}
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-pine-900 truncate">{concept.title}</h3>
          <p className="text-xs text-pine-500 mt-0.5 line-clamp-2">{concept.subtitle}</p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={cn('text-sm font-bold', scoreColor)}>{concept.overlapScore}%</span>
          <span className="text-xs text-pine-400">overlap</span>
        </div>
      </div>

      <div className="px-4 py-2.5 flex items-center gap-3 text-xs text-pine-500">
        <span className="flex items-center gap-1">
          <Clock size={11} />
          {formatTime(concept.estimatedCookTime)}
        </span>
        <span className="flex items-center gap-1">
          <ChefHat size={11} />
          {concept.cuisineInspiration}
        </span>
      </div>

      <div className="px-4 py-2 flex flex-wrap gap-1">
        {concept.balanceTags.map(tag => (
          <Badge key={tag} variant="pine" className="text-xs">
            {tag}
          </Badge>
        ))}
        <Badge variant="cream" className="text-xs">{concept.styleTag}</Badge>
      </div>

      <div
        className="px-4 py-2.5 border-t border-cream-100 flex items-center gap-1.5"
        onClick={e => e.stopPropagation()}
      >
        {concept.status !== 'approved' && (
          <button
            onClick={() => onStatusChange?.('approved')}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 transition-colors"
          >
            <Check size={11} /> Approve
          </button>
        )}
        {concept.status !== 'swapped' && (
          <button
            onClick={() => onStatusChange?.('swapped')}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-cream-50 hover:bg-cream-100 text-brass-600 border border-cream-300 transition-colors"
          >
            <RefreshCw size={11} /> Swap
          </button>
        )}
        {concept.status !== 'rejected' && (
          <button
            onClick={() => onStatusChange?.('rejected')}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
          >
            <X size={11} /> Reject
          </button>
        )}
        {concept.recipeId && (
          <button
            onClick={() => onExpand?.()}
            className="ml-auto flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-pine-700 hover:bg-pine-800 text-cream-50 transition-colors"
          >
            <Star size={11} /> View
          </button>
        )}
      </div>
    </div>
  );
}
