'use client';

import { useState } from 'react';
import { KitchenPacket } from '@/types';
import { useBatch } from '@/context/BatchContext';
import { Download, FileText, ShoppingCart, Calendar, Link2, Check } from 'lucide-react';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function KitchenPacketPanel() {
  const { kitchenPacket, generatePacket, currentBatch } = useBatch();
  const [sections, setSections] = useState({
    groceryList: true,
    prepNotes: true,
    leftoverMap: true,
    cookOrder: true,
    recipeZines: false,
  });

  if (!kitchenPacket || !currentBatch) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-6">
        <FileText className="w-10 h-10 mb-3" style={{ color: '#d4b896' }} />
        <p className="text-sm font-medium mb-1" style={{ color: '#6b5a3e' }}>No packet generated</p>
        <p className="text-xs mb-4" style={{ color: '#a68c62' }}>Generate a batch first, then build your packet.</p>
        <button onClick={generatePacket}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{ backgroundColor: '#2d5a3d' }}>
          Build Packet
        </button>
      </div>
    );
  }

  const toggleSection = (key: keyof typeof sections) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="h-full overflow-y-auto p-5 space-y-5">
      {/* Summary Card */}
      <div className="p-4 rounded-xl border" style={{ backgroundColor: '#eef8f1', borderColor: '#aad9b8' }}>
        <h3 className="font-serif text-sm font-bold mb-3" style={{ color: '#1a3a2a' }}>{kitchenPacket.title}</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <SummaryItem label="Recipes" value={`${kitchenPacket.summary.recipeCount}`} />
          <SummaryItem label="Avg Cook" value={`${kitchenPacket.summary.avgCookTime}m`} />
          <SummaryItem label="Pantry Match" value={`${kitchenPacket.summary.pantryOverlapPct}%`} />
          <SummaryItem label="Weekly Cost" value={`$${kitchenPacket.summary.weeklyCost.weeklyTotal.toFixed(0)}`} />
          <SummaryItem label="Chain Links" value={`${kitchenPacket.summary.chainRelationships}`} />
          <SummaryItem label="Per Serving" value={`$${kitchenPacket.summary.weeklyCost.perServing.toFixed(2)}`} />
        </div>
      </div>

      {/* Section toggles */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6b5a3e' }}>Include Sections</h3>
        <div className="space-y-1.5">
          {[
            { key: 'groceryList' as const, label: 'Grocery List', icon: ShoppingCart },
            { key: 'prepNotes' as const, label: 'Prep Notes', icon: FileText },
            { key: 'leftoverMap' as const, label: 'Leftover Map', icon: Link2 },
            { key: 'cookOrder' as const, label: 'Cook Order', icon: Calendar },
            { key: 'recipeZines' as const, label: 'Recipe Zines', icon: FileText },
          ].map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => toggleSection(key)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg border text-sm transition-all"
              style={sections[key]
                ? { backgroundColor: '#eef8f1', borderColor: '#aad9b8', color: '#1a3a2a' }
                : { backgroundColor: 'white', borderColor: '#e8e0d5', color: '#8a7350' }}>
              <Icon className="w-3.5 h-3.5" />
              <span className="flex-1 text-left">{label}</span>
              {sections[key] && <Check className="w-3.5 h-3.5" style={{ color: '#4a8c5c' }} />}
            </button>
          ))}
        </div>
      </div>

      {/* Export buttons */}
      <div className="flex gap-2">
        <button className="flex-1 py-2 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all"
          style={{ backgroundColor: '#2d5a3d' }}>
          <Download className="w-3.5 h-3.5" /> Export PDF
        </button>
        <button className="flex-1 py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all"
          style={{ backgroundColor: 'white', borderColor: '#d4b896', color: '#6b5a3e' }}>
          <FileText className="w-3.5 h-3.5" /> Separate Pages
        </button>
      </div>

      {/* Grocery preview */}
      {sections.groceryList && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6b5a3e' }}>
            Grocery List Preview
          </h3>
          <div className="space-y-1">
            {kitchenPacket.groceryList.slice(0, 8).map((item, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b text-xs"
                style={{ borderColor: '#ede8dc' }}>
                <div className="flex items-center gap-2">
                  {item.isPantryStaple && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4a8c5c' }} />
                  )}
                  <span style={{ color: '#1c1c1c' }}>{item.ingredient}</span>
                  {item.isPantryStaple && <span className="text-xs" style={{ color: '#7ec495' }}>pantry</span>}
                </div>
                <span style={{ color: '#8a7350' }}>{item.quantity}</span>
              </div>
            ))}
            {kitchenPacket.groceryList.length > 8 && (
              <p className="text-xs pt-1" style={{ color: '#a68c62' }}>
                +{kitchenPacket.groceryList.length - 8} more items
              </p>
            )}
          </div>
        </div>
      )}

      {/* Cook order preview */}
      {sections.cookOrder && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6b5a3e' }}>
            Cook Order
          </h3>
          <div className="space-y-1.5">
            {kitchenPacket.cookOrder.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg"
                style={{ backgroundColor: i === 0 ? '#eef8f1' : '#faf7f2' }}>
                <span className="text-xs font-bold w-8 text-center flex-shrink-0"
                  style={{ color: '#4a8c5c' }}>
                  {DAY_NAMES[item.day]}
                </span>
                <span className="text-xs flex-1" style={{ color: '#3d2c1e' }}>{item.recipeTitle}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center p-2 rounded-lg" style={{ backgroundColor: 'white' }}>
      <span style={{ color: '#6b5a3e' }}>{label}</span>
      <span className="font-semibold" style={{ color: '#1a3a2a' }}>{value}</span>
    </div>
  );
}
