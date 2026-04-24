import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ChefHat, Sparkles, BookOpen, Download, Palette } from 'lucide-react';

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-pine-100 text-pine-700 rounded-full text-sm font-medium mb-6">
          <Sparkles size={13} />
          Batch Recipe Planning Studio
        </div>
        <h1 className="text-5xl font-bold text-pine-900 mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
          One protein.<br />
          <span className="text-brass-500">A full week of recipes.</span>
        </h1>
        <p className="text-lg text-pine-600 max-w-2xl mx-auto mb-10">
          Arcane Kitchen turns your core protein and pantry staples into a beautifully
          structured, styled week of recipes — ready to publish, print, or share.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-pine-700 hover:bg-pine-800 text-cream-50 rounded-lg font-medium transition-colors"
          >
            Open Studio
          </Link>
          <Link
            href="/samples"
            className="px-6 py-3 bg-cream-200 hover:bg-cream-300 text-pine-800 rounded-lg font-medium transition-colors"
          >
            View Samples
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-4 gap-5">
          {[
            { icon: ChefHat, title: 'Smart Batch Planning', desc: 'Select a protein and pantry preferences — the studio generates a coherent week of recipes.' },
            { icon: Sparkles, title: 'AI-Assisted Concepts', desc: 'Review, approve, swap, or reject AI-generated recipe concepts before expanding to full recipes.' },
            { icon: Palette, title: 'Beautiful Themes', desc: 'Four distinct editorial themes to style your recipe guides for print, web, or social.' },
            { icon: Download, title: 'Multi-Format Export', desc: 'Export as PDF, PNG cards, or a shareable web page — all styled and production-ready.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-cream-300 rounded-xl p-5 shadow-sm">
              <div className="w-9 h-9 bg-pine-100 rounded-lg flex items-center justify-center mb-3">
                <Icon size={18} className="text-pine-700" />
              </div>
              <h3 className="font-semibold text-pine-900 mb-1.5">{title}</h3>
              <p className="text-sm text-pine-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pine-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-cream-50 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to plan your kitchen week?
          </h2>
          <p className="text-pine-300 mb-8">
            Join chefs and food creators using Arcane Kitchen to streamline their recipe workflow.
          </p>
          <Link
            href="/sign-in"
            className="inline-block px-8 py-3 bg-brass-500 hover:bg-brass-600 text-white rounded-lg font-medium transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
