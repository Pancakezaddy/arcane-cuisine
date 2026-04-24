import { Header } from '@/components/layout/Header';
import { SAMPLE_BATCHES } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Plus, BookOpen, Clock, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const batches = SAMPLE_BATCHES;
  const totalRecipes = batches.flatMap(b => b.recipes).length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header
        title="Dashboard"
        subtitle="Welcome back to your kitchen studio"
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
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Batches', value: batches.length, icon: BookOpen, color: 'text-pine-700' },
            { label: 'Total Recipes', value: totalRecipes, icon: TrendingUp, color: 'text-brass-500' },
            { label: 'In Review', value: batches.filter(b => b.status === 'reviewing').length, icon: Clock, color: 'text-olive-500' },
            { label: 'Complete', value: batches.filter(b => b.status === 'complete').length, icon: BookOpen, color: 'text-green-700' },
          ].map(stat => (
            <div key={stat.label} className="bg-white border border-cream-300 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-pine-500">{stat.label}</span>
                <stat.icon size={14} className={stat.color} />
              </div>
              <div className="text-2xl font-bold text-pine-900">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Recent Batches */}
        <div>
          <h2 className="text-sm font-semibold text-pine-900 mb-3">Recent Batches</h2>
          <div className="grid grid-cols-2 gap-4">
            {batches.map(batch => (
              <Link
                key={batch.id}
                href={`/batches/${batch.id}`}
                className="bg-white border border-cream-300 rounded-lg p-5 shadow-sm hover:border-pine-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-pine-900">{batch.inputs.name}</h3>
                    <p className="text-xs text-pine-500 mt-0.5 capitalize">
                      {batch.inputs.coreProtein.replace(/-/g, ' ')} · {batch.inputs.seasonalMode}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                    batch.status === 'reviewing' ? 'bg-brass-400/20 text-brass-600' :
                    batch.status === 'complete' ? 'bg-green-100 text-green-700' :
                    batch.status === 'generating' ? 'bg-blue-100 text-blue-700' :
                    'bg-cream-200 text-pine-600'
                  }`}>
                    {batch.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-pine-500">
                  <span>{batch.concepts.length} concepts</span>
                  <span>{batch.recipes.length} recipes</span>
                  <span>{formatDate(batch.updatedAt)}</span>
                </div>
              </Link>
            ))}
            <Link
              href="/batches/new"
              className="bg-cream-50 border-2 border-dashed border-cream-300 rounded-lg p-5 hover:border-pine-400 hover:bg-cream-100 transition-all flex items-center justify-center gap-2 text-pine-500 hover:text-pine-700"
            >
              <Plus size={18} />
              <span className="font-medium">New Batch</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
