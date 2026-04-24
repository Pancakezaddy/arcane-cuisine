import { LeftoverRole } from '@/types';
import { ArrowRight, ArrowLeft, Circle, Link } from 'lucide-react';

interface ChainIndicatorProps {
  role: LeftoverRole;
  position: number;
  total: number;
  sourceTitle?: string;
  targetTitles?: string[];
  compact?: boolean;
}

export default function ChainIndicator({ role, position, total, sourceTitle, targetTitles, compact }: ChainIndicatorProps) {
  if (role === 'standalone') {
    return compact ? (
      <span className="inline-flex items-center gap-1 text-xs" style={{ color: '#a68c62' }}>
        <Circle className="w-3 h-3" /> Standalone
      </span>
    ) : null;
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        {role === 'upstream' && (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: '#eef8f1', color: '#2d5a3d', border: '1px solid #aad9b8' }}>
            <Link className="w-3 h-3" />
            Chain Anchor · {position}/{total}
          </span>
        )}
        {role === 'downstream' && (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: '#fdf8ee', color: '#a88a30', border: '1px solid #e8c96d' }}>
            <ArrowLeft className="w-3 h-3" />
            Leftover Use · {position}/{total}
          </span>
        )}
      </div>
      {!compact && (
        <div className="space-y-1">
          {role === 'downstream' && sourceTitle && (
            <p className="text-xs flex items-center gap-1" style={{ color: '#a68c62' }}>
              <ArrowLeft className="w-3 h-3" style={{ color: '#c9a84c' }} />
              Uses: <span className="font-medium" style={{ color: '#6b5a3e' }}>{sourceTitle}</span>
            </p>
          )}
          {role === 'upstream' && targetTitles && targetTitles.length > 0 && (
            <p className="text-xs flex items-center gap-1" style={{ color: '#a68c62' }}>
              <ArrowRight className="w-3 h-3" style={{ color: '#4a8c5c' }} />
              Feeds: <span className="font-medium" style={{ color: '#6b5a3e' }}>{targetTitles.join(', ')}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
