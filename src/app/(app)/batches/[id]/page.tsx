'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Batch, BatchInputs, ConceptStatus, RecipeConcept, ThemeId } from '@/types';
import { SAMPLE_BATCHES } from '@/lib/mock-data';
import { BatchSetupPanel } from '@/components/batch/BatchSetupPanel';
import { RecipeBoard } from '@/components/batch/RecipeBoard';
import { LivePreview } from '@/components/batch/LivePreview';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { ExportCenter } from '@/components/export/ExportCenter';
import { Modal } from '@/components/ui/Modal';
import { Download } from 'lucide-react';

export default function BatchDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [batch, setBatch] = useState<Batch | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<RecipeConcept | null>(null);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    if (id === 'new') {
      const newBatch: Batch = {
        id: 'new',
        inputs: {
          name: '',
          coreProtein: 'chicken-thighs',
          batchSize: 5,
          pantryIngredients: ['onions', 'garlic', 'herbs'],
          pantryRuleMode: 'Standard',
          seasonalMode: 'Any',
          balanceProfile: 'Balanced',
          exclusions: [],
          maxCookTime: 60,
          preferredStyle: '',
        },
        concepts: [],
        recipes: [],
        status: 'draft',
        activeTheme: 'arcane-editorial',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setBatch(newBatch);
    } else {
      const found = SAMPLE_BATCHES.find(b => b.id === id);
      if (found) setBatch(found);
    }
  }, [id]);

  const handleGenerate = async (inputs: BatchInputs) => {
    if (!batch) return;
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 1200));
    setBatch(prev => prev ? { ...prev, inputs, status: 'reviewing' } : prev);
    setIsGenerating(false);
  };

  const handleConceptStatusChange = (conceptId: string, status: ConceptStatus) => {
    setBatch(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        concepts: prev.concepts.map(c => c.id === conceptId ? { ...c, status } : c),
      };
    });
  };

  const handleThemeChange = (themeId: ThemeId) => {
    setBatch(prev => prev ? { ...prev, activeTheme: themeId } : prev);
  };

  if (!batch) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-pine-500">Loading batch…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header
        title={batch.inputs.name || 'New Batch'}
        subtitle={batch.status === 'draft' ? 'Configure and generate concepts' : `${batch.concepts.length} concepts · ${batch.recipes.length} recipes`}
        actions={
          batch.recipes.length > 0 ? (
            <Button size="sm" variant="secondary" onClick={() => setShowExport(true)}>
              <Download size={13} className="mr-1" /> Export
            </Button>
          ) : undefined
        }
      />

      {/* Three-panel layout */}
      <div className="flex-1 flex overflow-hidden">
        <BatchSetupPanel
          initialInputs={batch.inputs}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
        <div className="flex-1 overflow-hidden">
          <RecipeBoard
            batch={batch}
            selectedConceptId={selectedConcept?.id}
            onSelectConcept={setSelectedConcept}
            onConceptStatusChange={handleConceptStatusChange}
            onExpandConcept={conceptId => {
              const concept = batch.concepts.find(c => c.id === conceptId);
              if (concept) setSelectedConcept(concept);
            }}
          />
        </div>
        <LivePreview
          batch={batch}
          selectedConcept={selectedConcept}
          onThemeChange={handleThemeChange}
        />
      </div>

      <Modal
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        title="Export Batch"
        size="lg"
      >
        <div className="p-5">
          <ExportCenter batch={batch} />
        </div>
      </Modal>
    </div>
  );
}
