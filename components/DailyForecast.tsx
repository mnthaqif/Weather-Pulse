import React from 'react';
import { DailyData, WeatherType } from '../types';
import { Cloud, CloudLightning, CloudRain, CloudSnow, Sun, Droplets } from 'lucide-react';

interface DailyForecastProps {
  data: DailyData[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ data }) => {
   const getIcon = (type: WeatherType) => {
    const size = 24;
    switch (type) {
      case WeatherType.Sunny: return <Sun size={size} className="text-yellow-500 dark:text-yellow-300" />;
      case WeatherType.Rainy: return <CloudRain size={size} className="text-blue-500 dark:text-blue-300" />;
      case WeatherType.Snowy: return <CloudSnow size={size} className="text-slate-600 dark:text-white" />;
      case WeatherType.Stormy: return <CloudLightning size={size} className="text-purple-600 dark:text-purple-300" />;
      default: return <Cloud size={size} className="text-gray-500 dark:text-gray-300" />;
    }
  };

  return (
    <div className="flex flex-col h-full pt-6 pb-24 px-4 overflow-y-auto no-scrollbar z-10">
       <h2 className="text-2xl font-bold text-primary mb-6 px-2">7-Day Forecast</h2>
       <div className="space-y-3">
         {data.map((day, idx) => (
           <div key={idx} className="flex items-center justify-between card-glass p-4 rounded-3xl hover:scale-[1.02] transition-transform duration-200">
             <span className="w-16 font-medium text-primary">{day.day}</span>
             
             <div className="flex flex-col items-center w-10">
               {getIcon(day.icon)}
               {day.precipChance > 20 && (
                 <div className="flex items-center mt-1 space-x-0.5">
                    <Droplets size={8} className="text-blue-500 dark:text-blue-300"/>
                    <span className="text-[10px] text-blue-500 dark:text-blue-300">{day.precipChance}%</span>
                 </div>
               )}
             </div>

             <div className="flex items-center space-x-4 w-32 justify-end">
                <span className="text-secondary text-sm">{Math.round(day.minTemp)}°</span>
                <div className="w-16 h-1.5 bg-slate-300/50 dark:bg-white/20 rounded-full overflow-hidden relative">
                   <div 
                     className="absolute h-full bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full"
                     style={{ 
                       left: '10%', 
                       right: '10%' // Mock visual bar
                     }} 
                   />
                </div>
                <span className="text-primary font-bold">{Math.round(day.maxTemp)}°</span>
             </div>
           </div>
         ))}
       </div>
    </div>
  );
};

export default DailyForecast;