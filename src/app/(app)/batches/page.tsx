import { Header } from '@/components/layout/Header';
import { SAMPLE_BATCHES } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Plus, ChevronRight } from 'lucide-react';

export default function BatchesPage() {
  const batches = SAMPLE_BATCHES;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header
        title="Batches"
        subtitle={`${batches.length} batch${batches.length !== 1 ? 'es' : ''}`}
        actions={
          <Link
            href="/batches/new"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pine-700 hover:bg-pine-800 text-cream-50 rounded-md text-sm font-medium transition-colors"
          >
            <Plus size={14} /> New Batch
          </Link>
        }
      />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl space-y-3">
          {batches.map(batch => (
            <Link
              key={batch.id}
              href={`/batches/${batch.id}`}
              className="flex items-center gap-4 bg-white border border-cream-300 rounded-lg px-5 py-4 shadow-sm hover:border-pine-400 hover:shadow-md transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-pine-900">{batch.inputs.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                    batch.status === 'reviewing' ? 'bg-brass-400/20 text-brass-600' :
                    batch.status === 'complete' ? 'bg-green-100 text-green-700' :
                    'bg-cream-200 text-pine-600'
                  }`}>
                    {batch.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-pine-500">
                  <span className="capitalize">{batch.inputs.coreProtein.replace(/-/g, ' ')}</span>
                  <span>{batch.concepts.length} concepts</span>
                  <span>{batch.recipes.length} recipes</span>
                  <span>{batch.inputs.seasonalMode}</span>
                  <span>Updated {formatDate(batch.updatedAt)}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-pine-400" />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
