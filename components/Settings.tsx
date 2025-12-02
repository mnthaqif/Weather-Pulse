import React from 'react';
import { Bell, Moon, Thermometer, Info, Sun } from 'lucide-react';

interface SettingsProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, onToggleTheme }) => {
    return (
        <div className="flex flex-col h-full pt-6 pb-24 px-4 z-10 overflow-y-auto no-scrollbar">
             <h2 className="text-2xl font-bold text-primary mb-6 px-2">Settings</h2>
             
             <div className="space-y-6">
                 {/* Units */}
                 <div className="card-glass rounded-3xl p-6">
                     <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center space-x-3">
                             <Thermometer className="icon-primary" />
                             <span className="text-lg text-primary">Temperature Unit</span>
                         </div>
                     </div>
                     <div className="flex bg-slate-200 dark:bg-black/20 rounded-full p-1">
                         <button className="flex-1 py-2 rounded-full bg-white dark:bg-white/10 text-slate-900 dark:text-white font-bold shadow-md">Celsius (°C)</button>
                         <button className="flex-1 py-2 rounded-full text-slate-500 dark:text-white/60 hover:text-slate-800 dark:hover:text-white transition-colors">Fahrenheit (°F)</button>
                     </div>
                 </div>

                 {/* Notifications */}
                 <div className="card-glass rounded-3xl p-6 flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                         <Bell className="icon-primary" />
                         <span className="text-lg text-primary">Notifications</span>
                      </div>
                      <div className="w-12 h-6 bg-green-400 rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                 </div>

                 {/* Theme */}
                 <div className="card-glass rounded-3xl p-6 flex justify-between items-center cursor-pointer" onClick={onToggleTheme}>
                      <div className="flex items-center space-x-3">
                         {isDarkMode ? <Moon className="icon-primary" /> : <Sun className="icon-primary" />}
                         <span className="text-lg text-primary">Dark Mode</span>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${isDarkMode ? 'left-7' : 'left-1'}`}></div>
                      </div>
                 </div>
                 
                 {/* About */}
                 <div className="card-glass rounded-3xl p-6">
                     <div className="flex items-center space-x-3 mb-2">
                         <Info className="icon-primary" />
                         <span className="text-lg text-primary">About WeatherPulse</span>
                     </div>
                     <p className="text-sm text-secondary leading-relaxed">
                         WeatherPulse v1.1.0. Designed with precision and AI-powered insights.
                     </p>
                 </div>
             </div>
        </div>
    );
};

export default Settings;