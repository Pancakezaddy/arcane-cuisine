'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Palette,
  Download,
  Settings,
  ChefHat,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/batches', label: 'Batches', icon: BookOpen },
  { href: '/themes', label: 'Themes', icon: Palette },
  { href: '/exports', label: 'Exports', icon: Download },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-56 bg-pine-900 text-cream-100 h-screen fixed left-0 top-0 z-40">
      <div className="px-5 py-5 border-b border-pine-800">
        <div className="flex items-center gap-2.5">
          <ChefHat size={22} className="text-brass-400" />
          <div>
            <p className="font-semibold text-cream-50 text-sm leading-tight">Arcane</p>
            <p className="text-xs text-pine-300 leading-tight">Kitchen Studio</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors',
                isActive
                  ? 'bg-pine-700 text-cream-50 font-medium'
                  : 'text-pine-200 hover:bg-pine-800 hover:text-cream-100'
              )}
            >
              <Icon size={16} className={isActive ? 'text-brass-400' : 'text-pine-400'} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-pine-800">
        <div className="text-xs text-pine-400">
          <p className="font-medium text-pine-300">Studio Alpha</p>
          <p>v0.1.0</p>
        </div>
      </div>
    </aside>
  );
}
