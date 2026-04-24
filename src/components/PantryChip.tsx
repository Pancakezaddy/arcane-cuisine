import { PantryIngredient } from '@/types';
import clsx from 'clsx';

interface PantryChipProps {
  ingredient: PantryIngredient;
  onToggle?: (id: string) => void;
  inOverlap?: boolean;
}

export default function PantryChip({ ingredient, onToggle, inOverlap }: PantryChipProps) {
  return (
    <button
      onClick={() => onToggle?.(ingredient.id)}
      className={clsx(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
        onToggle ? 'cursor-pointer' : 'cursor-default'
      )}
      style={ingredient.selected
        ? {
            backgroundColor: inOverlap ? '#d5eedd' : '#2d5a3d',
            color: inOverlap ? '#1a3a2a' : 'white',
            borderColor: inOverlap ? '#4a8c5c' : '#1a3a2a',
          }
        : {
            backgroundColor: 'white',
            color: '#6b5a3e',
            borderColor: '#d4b896',
          }
      }
    >
      {inOverlap && <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: '#4a8c5c' }} />}
      {ingredient.name}
    </button>
  );
}
