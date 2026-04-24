'use client';

// eslint-disable-next-line react-hooks/exhaustive-deps
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBatch } from '@/context/BatchContext';

export default function NewBatchPage() {
  const router = useRouter();
  const { generateBatch, currentBatch } = useBatch();

  useEffect(() => {
    generateBatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentBatch) {
      router.push(`/batch/${currentBatch.id}`);
    }
  }, [currentBatch, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-3"
          style={{ borderColor: '#2d5a3d', borderTopColor: 'transparent' }} />
        <p className="text-sm" style={{ color: '#6b5a3e' }}>Generating batch...</p>
      </div>
    </div>
  );
}
