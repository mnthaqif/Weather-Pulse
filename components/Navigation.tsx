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
    <div className="fixed bottom-0 left-0 right-0 nav-glass pb-safe pt-2 px-6 z-50 rounded-t-[2.5rem] h-[88px] flex justify-center">
      <div className="flex items-center justify-between w-full max-w-lg h-full pb-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="group relative flex flex-col items-center justify-center w-14 h-16 outline-none"
            >
              {/* Active Glow Background */}
              <div 
                className={`absolute w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 dark:from-blue-400/20 dark:to-indigo-400/20 transition-all duration-500 ease-spring origin-center
                  ${isActive ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
              />

              {/* Icon */}
              <div className={`relative z-10 transition-all duration-500 ease-spring transform ${isActive ? '-translate-y-2' : 'group-hover:-translate-y-1'}`}>
                 <Icon 
                   size={26} 
                   strokeWidth={isActive ? 2.5 : 2}
                   className={`transition-all duration-300
                     ${isActive 
                       ? 'text-blue-600 dark:text-blue-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
                       : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                     }`} 
                 />
              </div>

              {/* Label */}
              <span 
                 className={`absolute bottom-2 text-[10px] font-bold tracking-wider transition-all duration-500 ease-spring
                   ${isActive 
                     ? 'opacity-100 translate-y-0 text-blue-600 dark:text-blue-300' 
                     : 'opacity-0 translate-y-2 text-slate-400'}`}
              >
                {tab.label}
              </span>
              
               {/* Small dot indicator */}
               <div 
                  className={`absolute -bottom-1 w-1 h-1 rounded-full bg-blue-500 dark:bg-blue-300 transition-all duration-300 delay-75
                    ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
               />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;