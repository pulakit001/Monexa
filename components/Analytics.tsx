import React, { useMemo } from 'react';
import { Theme, Expense, BudgetConfig } from '../types';
import { formatCurrency } from '../constants';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine } from 'recharts';

interface AnalyticsProps {
  theme: Theme;
  expenses: Expense[];
  budget: BudgetConfig;
  currency: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ theme, expenses, budget, currency }) => {
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  
  // Category Breakdown
  const categoryData = useMemo(() => {
    const map = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(map)
      .map(([name, value]: [string, number]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  // Last 7 Days Activity
  const dailyData = useMemo(() => {
    const days = [];
    for(let i=6; i>=0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const amount = expenses.filter(e => e.date === dateStr).reduce((acc, c) => acc + c.amount, 0);
        days.push({ name: dateStr.slice(5), fullDate: dateStr, amount });
    }
    return days;
  }, [expenses]);

  // Monthly Estimation
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  const thisMonthExpenses = expenses.filter(e => e.date.startsWith(currentMonth));
  const monthTotal = thisMonthExpenses.reduce((acc, c) => acc + c.amount, 0);
  const monthBudgetStatus = budget.monthly - monthTotal;

  // Recurring detection (Simple: Same description & amount > 1 time)
  const recurring = useMemo(() => {
     const counts: Record<string, {count: number, amount: number, desc: string}> = {};
     expenses.forEach(e => {
         const key = `${e.description}-${e.amount}`;
         if(!counts[key]) counts[key] = {count: 0, amount: e.amount, desc: e.description};
         counts[key].count++;
     });
     return Object.values(counts).filter(c => c.count > 1).sort((a,b) => b.count - a.count);
  }, [expenses]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${theme.bg} border ${theme.border} p-2 text-xs font-mono shadow-none`}>
          <p className="uppercase">{label}</p>
          <p>{formatCurrency(payload[0].value, currency)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 w-full space-y-8">
      
      {/* High Level Stats Grid - Mobile Optimized (2x2) */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`p-3 border ${theme.border} flex flex-col justify-between h-28`}>
            <span className="text-[9px] uppercase opacity-60 tracking-wider">Lifetime</span>
            <span className="text-lg font-bold truncate tracking-tighter">{formatCurrency(totalSpent, currency)}</span>
        </div>
        <div className={`p-3 border ${theme.border} flex flex-col justify-between h-28`}>
            <span className="text-[9px] uppercase opacity-60 tracking-wider">Avg. Tx</span>
            <span className="text-lg font-bold truncate tracking-tighter">
                {formatCurrency(expenses.length > 0 ? totalSpent / expenses.length : 0, currency)}
            </span>
        </div>
        <div className={`p-3 border ${theme.border} flex flex-col justify-between h-28`}>
            <span className="text-[9px] uppercase opacity-60 tracking-wider">Month Burn</span>
            <span className="text-lg font-bold truncate tracking-tighter">{formatCurrency(monthTotal, currency)}</span>
             <div className="w-full bg-current h-1 opacity-20 mt-1 relative">
                <div 
                    className={`absolute top-0 left-0 h-full ${theme.accent}`} 
                    style={{ width: `${Math.min((monthTotal / budget.monthly) * 100, 100)}%` }}
                />
             </div>
        </div>
        <div className={`p-3 border ${theme.border} flex flex-col justify-between h-28 ${monthBudgetStatus < 0 ? 'border-dashed' : ''}`}>
             <span className="text-[9px] uppercase opacity-60 tracking-wider">Month Left</span>
             <span className={`text-lg font-bold truncate tracking-tighter ${monthBudgetStatus < 0 ? 'line-through' : ''}`}>
                 {formatCurrency(monthBudgetStatus, currency)}
             </span>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="space-y-3">
        <h3 className="text-[10px] uppercase font-bold tracking-widest border-b border-current pb-2">Weekly_Flux</h3>
        <div className="h-48 w-full border border-current p-2">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                    <XAxis dataKey="name" tick={{fill: 'currentColor', fontSize: 9}} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent', opacity: 0.1}} />
                    <ReferenceLine y={budget.daily} stroke="currentColor" strokeDasharray="3 3" />
                    <Bar dataKey="amount" fill="currentColor" radius={[2, 2, 0, 0]} barSize={24} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col gap-8">
          {/* Category Pie */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase font-bold tracking-widest border-b border-current pb-2">Sector_Map</h3>
            <div className="h-56 w-full border border-current flex items-center justify-center relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            fill="currentColor"
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'currentColor' : 'transparent'} stroke="currentColor" strokeWidth={1} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="text-center">
                         <div className="text-[10px] uppercase">Top</div>
                         <div className="font-bold text-sm truncate w-24">{categoryData[0]?.name || 'N/A'}</div>
                     </div>
                 </div>
            </div>
            <div className="text-[10px] grid grid-cols-2 gap-x-4 gap-y-2">
                {categoryData.slice(0, 6).map(c => (
                    <div key={c.name} className="flex justify-between border-b border-current border-opacity-20 pb-1">
                        <span className="uppercase font-bold opacity-80">{c.name}</span>
                        <span>{formatCurrency(c.value, currency)}</span>
                    </div>
                ))}
            </div>
          </div>

          {/* Recurring / Insights */}
          <div className="space-y-3">
             <h3 className="text-[10px] uppercase font-bold tracking-widest border-b border-current pb-2">Pattern_Rec</h3>
             <div className="border border-current p-3 min-h-[10rem]">
                 {recurring.length === 0 ? (
                     <div className="text-center opacity-50 text-[10px] py-10 uppercase tracking-wide">No Patterns</div>
                 ) : (
                     <table className="w-full text-[10px] text-left">
                         <thead>
                             <tr className="opacity-50 uppercase">
                                 <th className="pb-2 font-normal">Item</th>
                                 <th className="pb-2 font-normal">Freq</th>
                                 <th className="pb-2 font-normal text-right">Val</th>
                             </tr>
                         </thead>
                         <tbody>
                             {recurring.slice(0, 5).map((r, i) => (
                                 <tr key={i} className="border-t border-current border-opacity-10">
                                     <td className="py-2 font-bold truncate max-w-[100px]">{r.desc}</td>
                                     <td className="py-2">x{r.count}</td>
                                     <td className="py-2 text-right">{formatCurrency(r.amount, currency)}</td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 )}
             </div>
          </div>
      </div>
    </div>
  );
};

export default Analytics;
