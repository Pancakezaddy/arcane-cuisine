'use client';
import { useState } from 'react';
import { Batch, ConceptStatus, RecipeConcept } from '@/types';
import { RecipeBoardCard } from './RecipeBoardCard';

type SortKey = 'overlapScore' | 'title' | 'estimatedCookTime';

interface RecipeBoardProps {
  batch: Batch;
  selectedConceptId?: string;
  onSelectConcept: (concept: RecipeConcept) => void;
  onConceptStatusChange: (conceptId: string, status: ConceptStatus) => void;
  onExpandConcept: (conceptId: string) => void;
}

export function RecipeBoard({
  batch,
  selectedConceptId,
  onSelectConcept,
  onConceptStatusChange,
  onExpandConcept,
}: RecipeBoardProps) {
  const [sortKey, setSortKey] = useState<SortKey>('overlapScore');
  const [showRejected, setShowRejected] = useState(false);

  const sorted = [...batch.concepts]
    .filter(c => showRejected || c.status !== 'rejected')
    .sort((a, b) => {
      if (sortKey === 'overlapScore') return b.overlapScore - a.overlapScore;
      if (sortKey === 'estimatedCookTime') return a.estimatedCookTime - b.estimatedCookTime;
      return a.title.localeCompare(b.title);
    });

  const approvedCount = batch.concepts.filter(c => c.status === 'approved').length;
  const pendingCount = batch.concepts.filter(c => c.status === 'pending').length;
  const rejectedCount = batch.concepts.filter(c => c.status === 'rejected').length;

  return (
    <div className="flex flex-col h-full bg-cream-50">
      <div className="px-5 py-3 bg-white border-b border-cream-300 flex items-center gap-3">
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-pine-900">Recipe Concepts</h2>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-xs text-green-700 font-medium">{approvedCount} approved</span>
            <span className="text-xs text-pine-500">{pendingCount} pending</span>
            {rejectedCount > 0 && (
              <span className="text-xs text-red-500">{rejectedCount} rejected</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sortKey}
            onChange={e => setSortKey(e.target.value as SortKey)}
            className="text-xs border border-cream-300 rounded px-2 py-1 bg-white text-pine-700 focus:outline-none"
          >
            <option value="overlapScore">Sort by Overlap</option>
            <option value="title">Sort by Title</option>
            <option value="estimatedCookTime">Sort by Time</option>
          </select>
          {rejectedCount > 0 && (
            <button
              onClick={() => setShowRejected(!showRejected)}
              className="text-xs text-pine-500 hover:text-pine-800"
            >
              {showRejected ? 'Hide' : 'Show'} rejected
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <p className="text-pine-500 text-sm">No concepts yet.</p>
            <p className="text-pine-400 text-xs mt-1">Configure the batch and click Generate.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {sorted.map(concept => (
              <RecipeBoardCard
                key={concept.id}
                concept={concept}
                isSelected={selectedConceptId === concept.id}
                onSelect={() => onSelectConcept(concept)}
                onStatusChange={status => onConceptStatusChange(concept.id, status)}
                onExpand={() => onExpandConcept(concept.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
