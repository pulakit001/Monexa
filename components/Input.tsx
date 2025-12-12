import React, { useState } from 'react';
import { Theme, Expense, BudgetConfig } from '../types';
import { formatCurrency } from '../constants';

interface InputProps {
  theme: Theme;
  categories: string[];
  budget: BudgetConfig;
  onAdd: (expense: Omit<Expense, 'id' | 'timestamp'>) => void;
  currentDailyTotal: number;
  currency: string;
}

const Input: React.FC<InputProps> = ({ theme, categories, onAdd, budget, currentDailyTotal, currency }) => {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !desc) return;

    onAdd({
      amount: parseFloat(amount),
      description: desc,
      category,
      date,
    });

    setAmount('');
    setDesc('');
  };

  const remaining = budget.daily - currentDailyTotal;
  const isOverBudget = remaining < 0;

  return (
    <div className="flex flex-col h-full p-4 w-full space-y-6">
      
      {/* Budget Status Widget - Only visible if budget is set */}
      {budget.daily > 0 && (
        <div className={`border-2 ${theme.border} p-4 mt-2`}>
          <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-2">Daily_Buffer</div>
          <div className="flex justify-between items-end">
            <div className="text-[10px] uppercase font-bold opacity-60 leading-tight">
              MAX: {formatCurrency(budget.daily, currency)}<br/>
              USE: {formatCurrency(currentDailyTotal, currency)}
            </div>
            <div className={`text-3xl font-bold tracking-tighter ${isOverBudget ? 'line-through decoration-2' : ''}`}>
              {formatCurrency(remaining, currency)}
            </div>
          </div>
          {isOverBudget && (
            <div className="mt-2 text-[10px] font-bold uppercase text-red-500 animate-pulse">
              ! EXCEEDED BY {formatCurrency(Math.abs(remaining), currency)}
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex-grow flex flex-col gap-6">
        <div className="space-y-2 mt-4">
          <label className="text-[10px] font-bold uppercase opacity-60 block tracking-widest">Amount</label>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className={`w-full bg-transparent text-5xl font-bold border-b-2 ${theme.border} py-2 focus:outline-none focus:border-opacity-100 placeholder-opacity-20`}
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase opacity-60 block tracking-widest">Description</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="ITEM NAME"
            className={`w-full bg-transparent text-lg font-bold p-3 border-2 ${theme.border} focus:outline-none rounded-none`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase opacity-60 block tracking-widest">Type</label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full bg-transparent text-sm font-bold p-3 border-2 ${theme.border} appearance-none rounded-none focus:outline-none uppercase`}
              >
                {categories.map(c => <option key={c} value={c} className="text-black">{c}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-[10px]">▼</div>
            </div>
          </div>
          <div className="space-y-2">
             <label className="text-[10px] font-bold uppercase opacity-60 block tracking-widest">Date</label>
             <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full bg-transparent text-sm font-bold p-3 border-2 ${theme.border} appearance-none rounded-none focus:outline-none uppercase`}
             />
          </div>
        </div>

        <div className="flex-grow"></div>

        <button
          type="submit"
          className={`w-full py-5 border-2 ${theme.border} ${theme.bg} hover:invert transition-all text-lg font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]`}
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default Input;