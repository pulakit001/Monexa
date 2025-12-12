import React from 'react';
import { NavLink } from 'react-router-dom';
import { Theme } from '../types';
import { Plus, History, PieChart, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  theme: Theme;
}

const Layout: React.FC<LayoutProps> = ({ children, theme }) => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center w-full h-full border-r ${theme.border} last:border-r-0 hover:bg-opacity-10 hover:bg-current transition-colors duration-0 ${isActive ? 'font-bold underline decoration-2 underline-offset-4' : 'opacity-60'}`;

  return (
    <div className={`min-h-screen w-full font-mono flex flex-col items-center bg-zinc-900`}>
      {/* Mobile Container */}
      <div className={`w-full max-w-md min-h-screen flex flex-col relative shadow-2xl ${theme.bg} ${theme.text} transition-colors duration-300`}>
        
        <header className={`p-4 border-b ${theme.border} flex justify-between items-center sticky top-0 z-50 ${theme.bg}`}>
          <h1 className="text-xl tracking-tighter font-bold uppercase">Monexa</h1>
          <div className="text-[10px] opacity-50 uppercase tracking-widest">Sys.Ready</div>
        </header>
        
        <main className="flex-grow overflow-y-auto pb-20 scroll-smooth">
          {children}
        </main>

        <nav className={`fixed bottom-0 w-full max-w-md h-16 border-t ${theme.border} ${theme.bg} flex justify-around items-center z-50`}>
          <NavLink to="/" className={navClass}>
            <Plus size={24} strokeWidth={2.5} />
          </NavLink>
          <NavLink to="/history" className={navClass}>
            <History size={20} strokeWidth={2.5} />
          </NavLink>
          <NavLink to="/analytics" className={navClass}>
            <PieChart size={20} strokeWidth={2.5} />
          </NavLink>
          <NavLink to="/settings" className={navClass}>
            <Settings size={20} strokeWidth={2.5} />
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Layout;