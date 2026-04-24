'use client';
import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { SAMPLE_BATCHES } from '@/lib/mock-data';
import { ExportCenter } from '@/components/export/ExportCenter';
import { fetchExports } from '@/lib/api';
import { Export } from '@/types';

export default function ExportsPage() {
  const [exports, setExports] = useState<Export[]>([]);
  const batch = SAMPLE_BATCHES[0];

  useEffect(() => {
    fetchExports().then(setExports);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header title="Exports" subtitle="Manage and download your recipe exports" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl">
          <ExportCenter batch={batch} existingExports={exports} />
        </div>
      </main>
    </div>
  );
}
