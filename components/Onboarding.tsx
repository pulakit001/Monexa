import React, { useState, useEffect } from 'react';
import { Theme, BudgetConfig } from '../types';
import { ArrowRight, Zap, Shield, PieChart, Check, X, Plus, Search } from 'lucide-react';
import { CURRENCIES } from '../constants';

interface OnboardingProps {
  theme: Theme;
  onComplete: () => void;
  setBudget: React.Dispatch<React.SetStateAction<BudgetConfig>>;
  currency: string;
  setCurrency: (c: string) => void;
  categories: string[];
  setCategories: (c: string[]) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ theme, onComplete, setBudget, currency, setCurrency, categories, setCategories }) => {
  const [step, setStep] = useState(0);
  // Temporary state for the budget form
  const [localDaily, setLocalDaily] = useState('');
  const [localMonthly, setLocalMonthly] = useState('');
  // Temporary state for tags input
  const [newTag, setNewTag] = useState('');
  // Search state for currency
  const [currencySearch, setCurrencySearch] = useState('');

  // Auto-advance splash screen
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => {
        setStep(1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleSkipBudget = () => {
    setBudget({ daily: 0, monthly: 0 });
    onComplete();
  };

  const handleSaveBudget = () => {
    const d = parseFloat(localDaily) || 0;
    const m = parseFloat(localMonthly) || 0;
    setBudget({ daily: d, monthly: m });
    onComplete();
  };

  const addTag = () => {
    if (newTag && !categories.includes(newTag.toUpperCase())) {
      setCategories([...categories, newTag.toUpperCase()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setCategories(categories.filter(c => c !== tag));
  };

  const filteredCurrencies = CURRENCIES.filter(c => 
    c.code.toLowerCase().includes(currencySearch.toLowerCase()) ||
    c.name.toLowerCase().includes(currencySearch.toLowerCase()) ||
    c.symbol.toLowerCase().includes(currencySearch.toLowerCase())
  );

  // --- Step 0: Splash Screen ---
  if (step === 0) {
    return (
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${theme.bg} ${theme.text} font-mono animate-in fade-in duration-700`}>
        <div className="text-4xl font-bold tracking-tighter uppercase mb-4">Monexa</div>
        <div className="text-xs uppercase tracking-[0.3em] opacity-60">By Snippetz Labs</div>
      </div>
    );
  }

  // --- Steps 1-3: Slideshow ---
  const slides = [
    {
      icon: <Zap size={48} strokeWidth={1.5} />,
      title: "Rapid Log",
      desc: "Capture expenses in seconds. Optimized for speed and minimal friction."
    },
    {
      icon: <Shield size={48} strokeWidth={1.5} />,
      title: "Local Core",
      desc: "Your data lives on your device. No clouds. No accounts. 100% Private."
    },
    {
      icon: <PieChart size={48} strokeWidth={1.5} />,
      title: "Deep Stats",
      desc: "Visualize spending patterns with high-contrast, monochrome analytics."
    }
  ];

  if (step > 0 && step <= slides.length) {
    const slideIndex = step - 1;
    const slide = slides[slideIndex];
    const totalSteps = slides.length + 3; // Slides + Currency + Tags + Budget (last one not shown in dots usually)

    return (
      <div className={`fixed inset-0 z-[100] flex flex-col ${theme.bg} ${theme.text} font-mono p-6`}>
        <div className="flex-grow flex flex-col items-center justify-center text-center space-y-8 animate-in slide-in-from-right duration-300">
          <div className={`p-6 border-2 ${theme.border} rounded-full`}>
            {slide.icon}
          </div>
          <div className="space-y-4 max-w-xs">
            <h2 className="text-2xl font-bold uppercase tracking-widest">{slide.title}</h2>
            <p className="text-sm opacity-70 leading-relaxed">{slide.desc}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-6 border-t border-current border-opacity-20">
          <div className="flex gap-2">
            {[...Array(totalSteps)].map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full ${idx === slideIndex ? 'bg-current' : 'bg-current opacity-20'}`} 
              />
            ))}
          </div>
          <button 
            onClick={() => setStep(step + 1)}
            className={`flex items-center gap-2 font-bold uppercase text-sm tracking-widest hover:underline`}
          >
            Next <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // --- Step 4: Currency Selection ---
  if (step === 4) {
    return (
      <div className={`fixed inset-0 z-[100] flex flex-col ${theme.bg} ${theme.text} font-mono p-6 animate-in slide-in-from-right duration-300`}>
        <div className="flex-grow flex flex-col overflow-hidden">
          <div className="text-center space-y-2 mb-6 mt-6 shrink-0">
            <h2 className="text-xl font-bold uppercase tracking-widest">Select Currency</h2>
            <p className="text-xs opacity-60 uppercase tracking-wide">Choose your primary unit</p>
          </div>
          
          <div className="relative mb-4 shrink-0">
             <Search className="absolute left-0 top-1/2 -translate-y-1/2 opacity-40" size={18} />
             <input 
                type="text"
                placeholder="SEARCH COUNTRY OR CODE..."
                value={currencySearch}
                onChange={(e) => setCurrencySearch(e.target.value)}
                className={`w-full bg-transparent border-b-2 ${theme.border} py-2 pl-8 font-bold uppercase focus:outline-none placeholder-opacity-40 text-sm`}
                autoFocus
             />
          </div>

          <div className="flex-grow overflow-y-auto space-y-0 pr-2 pb-4">
            {filteredCurrencies.map(c => (
              <button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                className={`w-full flex items-center justify-between p-4 border-b ${theme.border} text-left transition-all ${currency === c.code ? 'bg-current bg-opacity-5 border-l-4 border-l-current pl-5' : 'hover:bg-current hover:bg-opacity-5 opacity-70 hover:opacity-100 border-l-0'}`}
              >
                <div className="flex flex-col">
                  <span className="font-bold text-sm">{c.code}</span>
                  <span className="text-[10px] opacity-60 uppercase">{c.name}</span>
                </div>
                <div className="text-lg font-bold opacity-80">{c.symbol}</div>
              </button>
            ))}
            {filteredCurrencies.length === 0 && (
                <div className="text-center opacity-40 text-[10px] uppercase py-8">
                    No matching currency found
                </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-current border-opacity-20 flex justify-end shrink-0">
          <button 
            onClick={() => setStep(step + 1)}
            className={`flex items-center gap-2 font-bold uppercase text-sm tracking-widest hover:underline`}
          >
            Confirm <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // --- Step 5: Tag Selection ---
  if (step === 5) {
    return (
      <div className={`fixed inset-0 z-[100] flex flex-col ${theme.bg} ${theme.text} font-mono p-6 animate-in slide-in-from-right duration-300`}>
         <div className="flex-grow flex flex-col">
            <div className="text-center space-y-2 mb-8 mt-10">
              <h2 className="text-xl font-bold uppercase tracking-widest">Setup Tags</h2>
              <p className="text-xs opacity-60 uppercase tracking-wide">Categorize your spending</p>
            </div>

            <div className="flex gap-2 mb-6">
                <input 
                    type="text" 
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="ADD CUSTOM..."
                    className={`flex-grow bg-transparent border-2 ${theme.border} p-3 text-sm font-bold focus:outline-none uppercase rounded-none placeholder-opacity-40`}
                    onKeyDown={(e) => e.key === 'Enter' && addTag()}
                />
                <button onClick={addTag} className={`px-4 border-2 ${theme.border} hover:invert font-bold`}>
                  <Plus size={20} />
                </button>
            </div>

            <div className="flex flex-wrap gap-2 content-start overflow-y-auto">
                {categories.map(c => (
                    <div key={c} className={`group border-2 ${theme.border} px-3 py-2 text-xs font-bold uppercase flex items-center gap-2 cursor-default bg-current bg-opacity-5`}>
                        {c}
                        <button onClick={() => removeTag(c)} className="opacity-40 group-hover:opacity-100 hover:text-red-500">
                            <X size={12} />
                        </button>
                    </div>
                ))}
            </div>
         </div>

         <div className="pt-6 border-t border-current border-opacity-20 flex justify-end">
          <button 
            onClick={() => setStep(step + 1)}
            className={`flex items-center gap-2 font-bold uppercase text-sm tracking-widest hover:underline`}
          >
            Confirm <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // --- Step 6: Budget Setup ---
  return (
    <div className={`fixed inset-0 z-[100] flex flex-col ${theme.bg} ${theme.text} font-mono p-6 animate-in slide-in-from-right duration-300`}>
       <div className="flex-grow flex flex-col justify-center space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold uppercase tracking-widest">Budget Goals</h2>
            <p className="text-xs opacity-60 uppercase tracking-wide">Optional spending limits</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase opacity-60 block tracking-widest">Daily Limit ({currency})</label>
              <input
                type="number"
                value={localDaily}
                onChange={(e) => setLocalDaily(e.target.value)}
                placeholder="Ex: 50"
                className={`w-full bg-transparent text-3xl font-bold border-b-2 ${theme.border} py-2 focus:outline-none placeholder-opacity-20`}
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase opacity-60 block tracking-widest">Monthly Limit ({currency})</label>
              <input
                type="number"
                value={localMonthly}
                onChange={(e) => setLocalMonthly(e.target.value)}
                placeholder="Ex: 1500"
                className={`w-full bg-transparent text-3xl font-bold border-b-2 ${theme.border} py-2 focus:outline-none placeholder-opacity-20`}
              />
            </div>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-4 pt-6">
         <button 
           onClick={handleSkipBudget}
           className={`py-4 border-2 ${theme.border} uppercase font-bold text-xs tracking-widest opacity-60 hover:opacity-100`}
         >
           Skip
         </button>
         <button 
           onClick={handleSaveBudget}
           className={`py-4 border-2 ${theme.border} ${theme.bg} uppercase font-bold text-xs tracking-widest hover:invert flex justify-center items-center gap-2`}
         >
           Initialize <Check size={14} />
         </button>
       </div>
    </div>
  );
};

export default Onboarding;