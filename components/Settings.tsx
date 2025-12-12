import React, { useState } from 'react';
import { Theme, BudgetConfig, DEFAULT_CATEGORIES } from '../types';
import { THEMES, CURRENCIES } from '../constants';
import { Download, Upload, RefreshCw, X } from 'lucide-react';

interface SettingsProps {
  theme: Theme;
  categories: string[];
  budget: BudgetConfig;
  setThemeId: (id: string) => void;
  setCategories: (cats: string[]) => void;
  setBudget: (b: BudgetConfig) => void;
  exportData: () => void;
  importData: (json: string) => void;
  resetData: () => void;
  currency: string;
  setCurrency: (c: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  theme, categories, budget, setThemeId, setCategories, setBudget, exportData, importData, resetData, currency, setCurrency
}) => {
  const [newTag, setNewTag] = useState('');
  const [importText, setImportText] = useState('');
  const [showImporter, setShowImporter] = useState(false);

  const addTag = () => {
    if (newTag && !categories.includes(newTag.toUpperCase())) {
      setCategories([...categories, newTag.toUpperCase()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setCategories(categories.filter(c => c !== tag));
  };

  const shuffleTags = () => {
    setCategories([...categories].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="p-4 w-full space-y-10 pb-32">
      
      {/* Theme Matrix */}
      <section>
        <h3 className="text-[10px] uppercase font-bold tracking-widest border-b border-current pb-2 mb-4">Visual_Core</h3>
        <div className="grid grid-cols-4 gap-2">
          {THEMES.map(t => (
             <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                className={`p-2 text-left border ${theme.border} ${theme.id === t.id ? 'ring-2 ring-current ring-offset-1' : 'opacity-60'}`}
             >
                <div className={`w-full h-6 mb-1 border border-black ${t.bg}`}></div>
             </button>
          ))}
        </div>
        <div className="mt-2 text-center text-[10px] uppercase font-bold">{THEMES.find(t => t.id === theme.id)?.name}</div>
      </section>

      {/* Currency Selection */}
      <section>
        <h3 className="text-[10px] uppercase font-bold tracking-widest border-b border-current pb-2 mb-4">Currency_Unit</h3>
        <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            className={`w-full p-3 bg-transparent border-2 ${theme.border} text-sm font-bold uppercase rounded-none focus:outline-none`}
        >
            {CURRENCIES.map(c => (
                <option key={c.code} value={c.code} className="bg-black text-white">{c.code} - {c.name}</option>
            ))}
        </select>
      </section>

      {/* Budget Control */}
      <section>
        <h3 className="text-[10px] uppercase font-bold tracking-widest border-b border-current pb-2 mb-4">Budget_Limits</h3>
        <div className="flex flex-col gap-6">
           <div className="space-y-1">
             <label className="text-[10px] uppercase opacity-70">Daily Limit</label>
             <input 
                type="number"
                value={budget.daily}
                onChange={(e) => setBudget({...budget, daily: parseFloat(e.target.value) || 0})}
                className={`w-full bg-transparent border-b-2 ${theme.border} text-2xl font-bold focus:outline-none`}
             />
           </div>
           <div className="space-y-1">
             <label className="text-[10px] uppercase opacity-70">Monthly Limit</label>
             <input 
                type="number"
                value={budget.monthly}
                onChange={(e) => setBudget({...budget, monthly: parseFloat(e.target.value) || 0})}
                className={`w-full bg-transparent border-b-2 ${theme.border} text-2xl font-bold focus:outline-none`}
             />
           </div>
        </div>
      </section>

      {/* Tag Management */}
      <section>
        <h3 className="text-[10px] uppercase font-bold tracking-widest border-b border-current pb-2 mb-4">Class_Tags</h3>
        <div className="flex gap-2 mb-4">
            <input 
                type="text" 
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="NEW TAG..."
                className={`flex-grow bg-transparent border-2 ${theme.border} p-2 text-xs font-bold focus:outline-none uppercase rounded-none`}
            />
            <button onClick={addTag} className={`px-4 border-2 ${theme.border} hover:bg-current hover:bg-opacity-10 font-bold`}>+</button>
            <button onClick={shuffleTags} className={`px-3 border-2 ${theme.border} hover:bg-current hover:bg-opacity-10`} title="Shuffle">
                <RefreshCw size={14} />
            </button>
        </div>
        <div className="flex flex-wrap gap-2">
            {categories.map(c => (
                <div key={c} className={`group border ${theme.border} px-2 py-1 text-[10px] font-bold uppercase flex items-center gap-2 cursor-default`}>
                    {c}
                    <button onClick={() => removeTag(c)} className="opacity-40 group-hover:opacity-100 hover:text-red-500">
                        <X size={10} />
                    </button>
                </div>
            ))}
        </div>
      </section>

      {/* Data IO */}
      <section>
        <h3 className="text-[10px] uppercase font-bold tracking-widest border-b border-current pb-2 mb-4">System_Data</h3>
        <div className="grid grid-cols-2 gap-3">
            <button onClick={exportData} className={`border ${theme.border} p-3 flex flex-col items-center justify-center hover:bg-current hover:bg-opacity-5 gap-2`}>
                <Download size={20} />
                <span className="text-[10px] uppercase font-bold">Export</span>
            </button>
            <button onClick={() => setShowImporter(!showImporter)} className={`border ${theme.border} p-3 flex flex-col items-center justify-center hover:bg-current hover:bg-opacity-5 gap-2`}>
                <Upload size={20} />
                <span className="text-[10px] uppercase font-bold">Import</span>
            </button>
        </div>
        
        {showImporter && (
            <div className={`mt-4 border ${theme.border} p-3 space-y-3`}>
                <textarea 
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    className={`w-full h-24 bg-transparent border ${theme.border} p-2 text-[10px] font-mono focus:outline-none`}
                    placeholder="PASTE JSON DATA HERE..."
                />
                <button onClick={() => importData(importText)} className={`w-full py-2 border ${theme.border} hover:bg-current hover:bg-opacity-10 text-[10px] uppercase font-bold`}>
                    OVERWRITE_DATA
                </button>
            </div>
        )}

        <div className="mt-10 pt-6 border-t border-dashed border-red-500 border-opacity-30">
            <button onClick={() => { if(confirm('INITIATE SYSTEM WIPE? ALL DATA WILL BE LOST.')) resetData() }} className="text-red-500 text-[10px] uppercase font-bold hover:underline w-full text-center">
                [DANGER] FACTORY RESET
            </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
