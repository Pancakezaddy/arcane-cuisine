import { Header } from '@/components/layout/Header';

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header title="Settings" subtitle="Manage your account and preferences" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl space-y-6">
          <div className="bg-white border border-cream-300 rounded-lg p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-pine-900 mb-4">Profile</h2>
            <div className="space-y-3">
              {['Display Name', 'Email'].map(field => (
                <div key={field} className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-pine-800">{field}</label>
                  <input
                    className="rounded-md border border-cream-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pine-500"
                    placeholder={field === 'Email' ? 'you@example.com' : 'Your name'}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-cream-300 rounded-lg p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-pine-900 mb-4">Preferences</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-pine-800">Default Theme</p>
                  <p className="text-xs text-pine-500">Applied to new batches</p>
                </div>
                <select className="text-sm border border-cream-300 rounded-md px-3 py-1.5 focus:outline-none">
                  <option>Arcane Editorial</option>
                  <option>Ayurvedic Kitchen</option>
                  <option>Rustic Pantry</option>
                  <option>Meal Prep Clean</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-pine-800">Default Batch Size</p>
                  <p className="text-xs text-pine-500">Number of recipes per batch</p>
                </div>
                <select className="text-sm border border-cream-300 rounded-md px-3 py-1.5 focus:outline-none">
                  {[3,4,5,6,7].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-pine-700 hover:bg-pine-800 text-cream-50 rounded-md text-sm font-medium transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
