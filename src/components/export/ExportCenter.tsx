'use client';
import { useState } from 'react';
import { Batch, Export, ExportFormat, ThemeId } from '@/types';
import { THEMES } from '@/lib/mock-data';
import { createExport } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate, cn } from '@/lib/utils';
import { Download, FileText, Image as ImageIcon, Globe, CheckCircle, Loader } from 'lucide-react';

interface ExportCenterProps {
  batch: Batch;
  existingExports?: Export[];
}

const FORMAT_OPTIONS: { value: ExportFormat; label: string; icon: React.ReactNode; description: string }[] = [
  { value: 'pdf', label: 'PDF', icon: <FileText size={18} />, description: 'Print-ready PDF booklet' },
  { value: 'png', label: 'PNG Cards', icon: <ImageIcon size={18} />, description: 'Individual recipe cards' },
  { value: 'web', label: 'Web Page', icon: <Globe size={18} />, description: 'Shareable web link' },
];

export function ExportCenter({ batch, existingExports = [] }: ExportCenterProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(batch.activeTheme);
  const [isExporting, setIsExporting] = useState(false);
  const [exports, setExports] = useState<Export[]>(existingExports);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const result = await createExport(batch.id, selectedTheme, selectedFormat);
      setExports(prev => [result, ...prev]);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-sm font-semibold text-pine-900">Export Settings</h3>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Format */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-pine-800">Format</label>
            <div className="grid grid-cols-3 gap-2">
              {FORMAT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedFormat(opt.value)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-3 rounded-lg border-2 text-sm transition-colors',
                    selectedFormat === opt.value
                      ? 'border-pine-600 bg-pine-50 text-pine-900'
                      : 'border-cream-300 hover:border-cream-400 text-pine-600'
                  )}
                >
                  <span className={selectedFormat === opt.value ? 'text-pine-700' : 'text-pine-400'}>
                    {opt.icon}
                  </span>
                  <span className="font-medium">{opt.label}</span>
                  <span className="text-xs text-pine-400 text-center">{opt.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-pine-800">Theme</label>
            <div className="grid grid-cols-2 gap-2">
              {THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={cn(
                    'flex items-center gap-2.5 p-2.5 rounded-lg border-2 text-left transition-colors',
                    selectedTheme === theme.id
                      ? 'border-pine-600 bg-pine-50'
                      : 'border-cream-300 hover:border-cream-400'
                  )}
                >
                  <div
                    className="w-5 h-5 rounded-full shrink-0"
                    style={{ background: theme.colors.accent }}
                  />
                  <div>
                    <div className="text-xs font-medium text-pine-900">{theme.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button className="w-full" onClick={handleExport} isLoading={isExporting}>
            <Download size={14} className="mr-1.5" />
            {isExporting ? 'Preparing Export…' : 'Export Batch'}
          </Button>
        </CardContent>
      </Card>

      {exports.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold text-pine-900">Export History</h3>
          </CardHeader>
          <div className="divide-y divide-cream-200">
            {exports.map(exp => (
              <div key={exp.id} className="px-5 py-3 flex items-center gap-3">
                {exp.status === 'complete' ? (
                  <CheckCircle size={16} className="text-green-600 shrink-0" />
                ) : (
                  <Loader size={16} className="text-pine-400 animate-spin shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-pine-800 uppercase">{exp.format}</span>
                    <Badge variant="cream">{exp.themeId.replace(/-/g, ' ')}</Badge>
                  </div>
                  <p className="text-xs text-pine-400">{formatDate(exp.createdAt)}</p>
                </div>
                {exp.url && exp.status === 'complete' && (
                  <a
                    href={exp.url}
                    className="text-xs font-medium text-pine-700 hover:text-pine-900 flex items-center gap-1"
                  >
                    <Download size={12} /> Download
                  </a>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
