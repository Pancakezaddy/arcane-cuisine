import { PublicLayout } from '@/components/layout/PublicLayout';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for exploring the studio',
    features: ['2 batches per month', '3 recipes per batch', '1 theme', 'PNG export'],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Studio',
    price: '$12',
    period: '/month',
    description: 'For active food creators',
    features: ['Unlimited batches', 'Up to 7 recipes per batch', 'All 4 themes', 'PDF + PNG + Web export', 'Chef notes & wellness notes'],
    cta: 'Start Studio',
    highlighted: true,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For culinary professionals',
    features: ['Everything in Studio', 'Custom brand themes', 'White-label PDF', 'Priority generation', 'API access'],
    cta: 'Start Pro',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pine-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Simple Pricing
          </h1>
          <p className="text-pine-600">Choose the plan that fits your creative workflow.</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`rounded-xl border-2 p-6 ${plan.highlighted ? 'border-pine-600 bg-pine-900 text-cream-50' : 'border-cream-300 bg-white'}`}
            >
              <h2 className={`text-xl font-bold mb-1 ${plan.highlighted ? 'text-cream-50' : 'text-pine-900'}`}>
                {plan.name}
              </h2>
              <p className={`text-sm mb-4 ${plan.highlighted ? 'text-pine-300' : 'text-pine-500'}`}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-cream-50' : 'text-pine-900'}`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={plan.highlighted ? 'text-pine-300' : 'text-pine-500'}>{plan.period}</span>
                )}
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={14} className={plan.highlighted ? 'text-brass-400' : 'text-pine-600'} />
                    <span className={plan.highlighted ? 'text-pine-200' : 'text-pine-700'}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  plan.highlighted
                    ? 'bg-brass-500 hover:bg-brass-600 text-white'
                    : 'bg-pine-700 hover:bg-pine-800 text-cream-50'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
