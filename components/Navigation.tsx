import React from 'react';
import { Compass, Clock, CalendarDays, MapPin, UserRound } from 'lucide-react';

export type NavTab = 'home' | 'hourly' | 'daily' | 'favorites' | 'settings';

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: NavTab; icon: React.ElementType; label: string }[] = [
    { id: 'home', icon: Compass, label: 'Explore' },
    { id: 'hourly', icon: Clock, label: 'Hourly' },
    { id: 'daily', icon: CalendarDays, label: 'Daily' },
    { id: 'favorites', icon: MapPin, label: 'Saved' },
    { id: 'settings', icon: UserRound, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 nav-glass pb-safe pt-2 px-6 z-50 rounded-t-[2.5rem] h-[90px] flex justify-center shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
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
                className={`absolute w-14 h-14 rounded-2xl transition-all duration-500 ease-spring origin-center
                  ${isActive 
                    ? 'scale-100 opacity-100 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 dark:from-blue-400/30 dark:to-purple-400/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                    : 'scale-50 opacity-0 bg-transparent'}`}
              />

              {/* Icon */}
              <div className={`relative z-10 transition-all duration-500 ease-spring transform ${isActive ? '-translate-y-1' : 'group-hover:-translate-y-1'}`}>
                 <Icon 
                   size={28} 
                   strokeWidth={isActive ? 2.5 : 2}
                   // Fill the icon when active for a "selected" state
                   fill={isActive ? "currentColor" : "none"}
                   className={`transition-all duration-300
                     ${isActive 
                       ? 'text-blue-600 dark:text-blue-300 drop-shadow-md' 
                       : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                     }`} 
                 />
              </div>

              {/* Label */}
              <span 
                 className={`absolute bottom-2 text-[10px] font-bold tracking-wider transition-all duration-500 ease-spring
                   ${isActive 
                     ? 'opacity-100 translate-y-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300' 
                     : 'opacity-0 translate-y-2 text-slate-400'}`}
              >
                {tab.label}
              </span>
              
               {/* Small dot indicator */}
               <div 
                  className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-300 dark:to-purple-300 transition-all duration-300 delay-75
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