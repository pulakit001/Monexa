import React from 'react';
import { Theme, Expense } from '../types';
import { formatCurrency } from '../constants';
import { Trash2 } from 'lucide-react';

interface HistoryProps {
  theme: Theme;
  expenses: Expense[];
  onDelete: (id: string) => void;
  currency: string;
}

const History: React.FC<HistoryProps> = ({ theme, expenses, onDelete, currency }) => {
  // Group by date
  const grouped = expenses.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = [];
    acc[curr.date].push(curr);
    return acc;
  }, {} as Record<string, Expense[]>);

  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="p-4 w-full space-y-6">
      {expenses.length === 0 && (
        <div className="text-center opacity-50 py-20 uppercase border-2 border-dashed border-current text-xs tracking-widest">
          Log Empty
        </div>
      )}

      {sortedDates.map(date => {
        const dayTotal = grouped[date].reduce((sum, item) => sum + item.amount, 0);
        return (
          <div key={date} className="space-y-0">
             {/* Sticky Date Header */}
            <div className={`sticky top-0 z-10 ${theme.bg} border-b-2 ${theme.border} py-3 flex justify-between items-end mb-2`}>
              <h2 className="text-sm font-bold uppercase tracking-wide">{new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</h2>
              <span className="font-bold text-sm bg-current text-transparent bg-clip-text filter invert grayscale contrast-200 mix-blend-difference">{formatCurrency(dayTotal, currency)}</span>
            </div>

            <div className={`border-l-2 ${theme.border} ml-1 pl-3 space-y-3 pb-6`}>
              {grouped[date].map(exp => (
                <div key={exp.id} className="group relative flex justify-between items-start py-1">
                  <div className="flex-grow pr-4">
                    <div className="font-bold text-sm uppercase break-words leading-tight">{exp.description}</div>
                    <div className="text-[10px] opacity-60 uppercase tracking-wider mt-1">[{exp.category}]</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                     <div className="font-mono font-bold text-sm">{formatCurrency(exp.amount, currency)}</div>
                     <button 
                        onClick={() => onDelete(exp.id)}
                        className="text-[10px] uppercase opacity-40 hover:opacity-100 hover:text-red-500 font-bold tracking-widest"
                     >
                        DEL
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;
