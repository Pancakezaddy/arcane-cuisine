import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  return (
    <header className="h-14 border-b border-cream-300 bg-white/80 backdrop-blur-sm flex items-center px-6 gap-4">
      <div className="flex-1">
        {title && (
          <div>
            <h1 className="text-base font-semibold text-pine-900">{title}</h1>
            {subtitle && <p className="text-xs text-pine-500">{subtitle}</p>}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        <button className="p-2 rounded-md hover:bg-cream-100 text-pine-500 transition-colors">
          <Search size={16} />
        </button>
        <button className="p-2 rounded-md hover:bg-cream-100 text-pine-500 transition-colors">
          <Bell size={16} />
        </button>
        <div className="w-8 h-8 rounded-full bg-pine-700 flex items-center justify-center text-cream-50 text-xs font-semibold">
          AK
        </div>
      </div>
    </header>
  );
}
