'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, LayoutDashboard, ChefHat, Refrigerator } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/batch/new', label: 'New Batch', icon: ChefHat },
  { href: '/pantry', label: 'Pantry Fingerprint', icon: Refrigerator },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 min-h-screen flex flex-col" style={{ backgroundColor: '#1a3a2a' }}>
      <div className="p-6 border-b" style={{ borderColor: '#2d5a3d' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4a8c5c' }}>
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-white leading-tight">Arcane</h1>
            <p className="text-xs" style={{ color: '#7ec495' }}>Kitchen Studio</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active ? 'text-white' : 'hover:text-white'
              )}
              style={active
                ? { backgroundColor: '#2d5a3d', color: 'white' }
                : { color: '#aad9b8' }
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 m-4 rounded-lg" style={{ backgroundColor: '#2d5a3d' }}>
        <p className="text-xs font-medium mb-1" style={{ color: '#7ec495' }}>Current Season</p>
        <p className="text-sm font-serif text-white">Winter Kitchen</p>
        <p className="text-xs mt-1" style={{ color: '#aad9b8' }}>Root veg & slow cooks</p>
      </div>
    </nav>
  );
}
