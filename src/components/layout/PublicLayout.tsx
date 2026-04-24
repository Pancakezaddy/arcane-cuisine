import Link from 'next/link';
import { ChefHat } from 'lucide-react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-cream-50">
      <nav className="border-b border-cream-300 bg-white/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ChefHat size={22} className="text-pine-700" />
            <span className="font-semibold text-pine-900">Arcane Kitchen</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-sm text-pine-600 hover:text-pine-900 transition-colors">
              Pricing
            </Link>
            <Link href="/samples" className="text-sm text-pine-600 hover:text-pine-900 transition-colors">
              Samples
            </Link>
            <Link
              href="/sign-in"
              className="text-sm bg-pine-700 hover:bg-pine-800 text-cream-50 px-4 py-2 rounded-md transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="border-t border-cream-300 mt-20 py-8 px-6 text-center text-sm text-pine-500">
        <p>© 2024 Arcane Kitchen. All rights reserved.</p>
      </footer>
    </div>
  );
}
