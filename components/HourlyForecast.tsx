import React from 'react';
import { HourlyData, WeatherType } from '../types';
import { Cloud, CloudLightning, CloudRain, CloudSnow, Sun } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

interface HourlyForecastProps {
  data: HourlyData[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  const getIcon = (type: WeatherType) => {
    const size = 20;
    switch (type) {
      case WeatherType.Sunny: return <Sun size={size} className="text-yellow-500 dark:text-yellow-300" />;
      case WeatherType.Rainy: return <CloudRain size={size} className="text-blue-500 dark:text-blue-300" />;
      case WeatherType.Snowy: return <CloudSnow size={size} className="text-slate-600 dark:text-white" />;
      case WeatherType.Stormy: return <CloudLightning size={size} className="text-purple-600 dark:text-purple-300" />;
      default: return <Cloud size={size} className="text-gray-500 dark:text-gray-300" />;
    }
  };

  return (
    <div className="flex flex-col h-full pt-6 pb-24 px-4 overflow-hidden z-10">
      <h2 className="text-2xl font-bold text-primary mb-6 px-2">Next 24 Hours</h2>
      
      {/* Chart Section */}
      <div className="h-48 w-full mb-6 card-glass rounded-3xl p-4">
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fca5a5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#fca5a5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                 contentStyle={{ backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: '12px', border: 'none' }}
                 labelStyle={{ color: '#aaa' }}
                 itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="temp" stroke="#fca5a5" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={3} />
            </AreaChart>
         </ResponsiveContainer>
      </div>

      {/* Horizontal Cards */}
      <div className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar">
        {data.map((hour, idx) => (
          <div key={idx} className="flex-shrink-0 w-20 h-32 card-glass rounded-3xl flex flex-col items-center justify-center space-y-2 snap-center hover:bg-white/40 dark:hover:bg-white/20 transition-colors">
            <span className="text-sm text-secondary">{hour.time}</span>
            <div>{getIcon(hour.icon)}</div>
            <span className="text-lg font-bold text-primary">{Math.round(hour.temp)}°</span>
            {hour.precipChance > 0 && (
               <span className="text-[10px] text-blue-500 dark:text-blue-300 font-bold">{hour.precipChance}%</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;