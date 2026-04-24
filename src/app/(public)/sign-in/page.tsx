import { PublicLayout } from '@/components/layout/PublicLayout';
import Link from 'next/link';
import { ChefHat } from 'lucide-react';

export default function SignInPage() {
  return (
    <PublicLayout>
      <div className="max-w-md mx-auto px-6 pt-16 pb-20">
        <div className="bg-white border border-cream-300 rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="inline-flex w-12 h-12 bg-pine-100 rounded-full items-center justify-center mb-4">
              <ChefHat size={22} className="text-pine-700" />
            </div>
            <h1 className="text-2xl font-bold text-pine-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Sign In
            </h1>
            <p className="text-pine-500 text-sm mt-1">Access your Arcane Kitchen studio</p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-pine-800">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-md border border-cream-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pine-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-pine-800">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-md border border-cream-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pine-500"
              />
            </div>
            <Link
              href="/dashboard"
              className="block w-full text-center py-2.5 bg-pine-700 hover:bg-pine-800 text-cream-50 rounded-lg font-medium text-sm transition-colors"
            >
              Sign In
            </Link>
          </div>
          <p className="text-center text-xs text-pine-500 mt-6">
            No account?{' '}
            <Link href="/pricing" className="text-pine-700 hover:underline font-medium">
              Get started free
            </Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
