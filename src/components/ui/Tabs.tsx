'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  children: (activeTab: string) => React.ReactNode;
}

export function Tabs({ tabs, defaultTab, className, children }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id ?? '');

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex border-b border-cream-300 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors',
              active === tab.id
                ? 'border-b-2 border-pine-700 text-pine-800 -mb-px'
                : 'text-pine-500 hover:text-pine-700 hover:bg-cream-50'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1">{children(active)}</div>
    </div>
  );
}
