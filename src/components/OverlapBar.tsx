interface OverlapBarProps {
  score: number; // 0–100
  showLabel?: boolean;
  className?: string;
}

export default function OverlapBar({ score, showLabel = true, className = '' }: OverlapBarProps) {
  const color = score >= 75 ? '#4a8c5c' : score >= 50 ? '#c9a84c' : '#a88a30';

  return (
    <div className={`space-y-1 ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs" style={{ color: '#8a7350' }}>
          <span>Pantry overlap</span>
          <span className="font-medium" style={{ color: score >= 75 ? '#2d5a3d' : '#a88a30' }}>{score}%</span>
        </div>
      )}
      <div className="h-1.5 rounded-full" style={{ backgroundColor: '#ede8dc' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
