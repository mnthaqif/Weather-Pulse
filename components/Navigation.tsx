import React from 'react';
import { Home, Clock, Calendar, Heart, Settings } from 'lucide-react';

export type NavTab = 'home' | 'hourly' | 'daily' | 'favorites' | 'settings';

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: NavTab; icon: React.ElementType; label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'hourly', icon: Clock, label: 'Hourly' },
    { id: 'daily', icon: Calendar, label: '7-Day' },
    { id: 'favorites', icon: Heart, label: 'Saved' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 nav-glass flex items-center justify-around px-2 z-50 rounded-t-3xl">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
              isActive ? 'bg-slate-200/50 dark:bg-white/20 translate-y-[-5px] shadow-lg' : 'hover:bg-slate-100/30 dark:hover:bg-white/5'
            }`}
          >
            <Icon size={24} className={`transition-colors duration-300 ${isActive ? 'text-indigo-600 dark:text-white' : 'text-slate-500 dark:text-white/50'}`} />
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;