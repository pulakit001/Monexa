import React, { useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Input from './components/Input';
import History from './components/History';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import Onboarding from './components/Onboarding';
import { useStickyState } from './services/storage';
import { Expense, BudgetConfig, DEFAULT_CATEGORIES } from './types';
import { THEMES } from './constants';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  // --- Global State ---
  const [expenses, setExpenses] = useStickyState<Expense[]>([], 'mono-expenses-v1');
  const [categories, setCategories] = useStickyState<string[]>(DEFAULT_CATEGORIES, 'mono-categories-v1');
  const [budget, setBudget] = useStickyState<BudgetConfig>({ daily: 0, monthly: 0 }, 'mono-budget-v1');
  const [themeId, setThemeId] = useStickyState<string>('ink-white', 'mono-theme-v1');
  const [currency, setCurrency] = useStickyState<string>('USD', 'mono-currency-v1');
  
  // Device Identity - Ensures unique persistence per device
  const [deviceId] = useStickyState<string>(uuidv4(), 'mono-device-id-v1');
  
  // Onboarding State
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useStickyState<boolean>(false, 'mono-onboarding-v1');

  // --- Derived State ---
  const currentTheme = useMemo(() => THEMES.find(t => t.id === themeId) || THEMES[0], [themeId]);

  const today = new Date().toISOString().split('T')[0];
  const currentDailyTotal = useMemo(() => 
    expenses
      .filter(e => e.date === today)
      .reduce((sum, e) => sum + e.amount, 0)
  , [expenses, today]);

  // --- Actions ---
  const addExpense = (data: Omit<Expense, 'id' | 'timestamp'>) => {
    const newExpense: Expense = {
      ...data,
      id: uuidv4(),
      timestamp: Date.now()
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const exportData = () => {
    const dataStr = JSON.stringify({ expenses, categories, budget, currency, deviceId });
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `monoledger_backup_${new Date().toISOString().slice(0,10)}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if(data.expenses && Array.isArray(data.expenses)) setExpenses(data.expenses);
      if(data.categories && Array.isArray(data.categories)) setCategories(data.categories);
      if(data.budget) setBudget(data.budget);
      if(data.currency) setCurrency(data.currency);
      alert('SYSTEM RESTORE SUCCESSFUL');
    } catch (e) {
      alert('DATA CORRUPT. ABORTING.');
    }
  };

  const resetData = () => {
    setExpenses([]);
    setCategories(DEFAULT_CATEGORIES);
    setBudget({ daily: 0, monthly: 0 });
    // Optional: Reset onboarding? Probably not for a data reset, but explicit if requested.
    // setHasCompletedOnboarding(false); 
  };

  if (!hasCompletedOnboarding) {
    return (
      <Onboarding 
        theme={currentTheme}
        onComplete={() => setHasCompletedOnboarding(true)}
        setBudget={setBudget}
        currency={currency}
        setCurrency={setCurrency}
        categories={categories}
        setCategories={setCategories}
      />
    );
  }

  return (
    <HashRouter>
      <Layout theme={currentTheme}>
        <Routes>
          <Route path="/" element={
            <Input 
              theme={currentTheme} 
              categories={categories} 
              onAdd={addExpense} 
              budget={budget}
              currentDailyTotal={currentDailyTotal}
              currency={currency}
            />
          } />
          <Route path="/history" element={
            <History 
              theme={currentTheme} 
              expenses={expenses} 
              onDelete={deleteExpense}
              currency={currency}
            />
          } />
          <Route path="/analytics" element={
            <Analytics 
              theme={currentTheme} 
              expenses={expenses} 
              budget={budget}
              currency={currency}
            />
          } />
          <Route path="/settings" element={
            <Settings 
              theme={currentTheme}
              categories={categories}
              budget={budget}
              setThemeId={setThemeId}
              setCategories={setCategories}
              setBudget={setBudget}
              exportData={exportData}
              importData={importData}
              resetData={resetData}
              currency={currency}
              setCurrency={setCurrency}
              deviceId={deviceId}
            />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;