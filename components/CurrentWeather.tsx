import React, { useState } from 'react';
import { Search, MapPin, Wind, Droplets, Sun, CloudRain, CloudSnow, CloudLightning, Cloud, ThermometerSun, AlertCircle } from 'lucide-react';
import { WeatherData, WeatherType } from '../types';

interface CurrentWeatherProps {
  data: WeatherData;
  onSearch: (city: string) => void;
  isAiLoading: boolean;
  aiInsight: string | null;
  onRefreshAi: () => void;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, onSearch, isAiLoading, aiInsight, onRefreshAi }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm('');
      setShowInput(false);
    }
  };

  const getWeatherIcon = (type: WeatherType) => {
    switch (type) {
      case WeatherType.Sunny: return <Sun className="w-24 h-24 text-yellow-500 animate-[spin_10s_linear_infinite]" />;
      case WeatherType.Rainy: return <CloudRain className="w-24 h-24 text-blue-400" />;
      case WeatherType.Snowy: return <CloudSnow className="w-24 h-24 text-white" />;
      case WeatherType.Stormy: return <CloudLightning className="w-24 h-24 text-purple-400" />;
      case WeatherType.Cloudy: return <Cloud className="w-24 h-24 text-gray-400" />;
      default: return <Sun className="w-24 h-24" />;
    }
  };

  return (
    <div className="flex flex-col h-full pt-4 pb-24 px-6 overflow-y-auto no-scrollbar">
      {/* Header / Search */}
      <div className="flex justify-between items-center mb-8 z-10">
        <div className="flex items-center space-x-2 text-primary">
          <MapPin size={20} className="text-primary" />
          {showInput ? (
            <form onSubmit={handleSearch}>
              <input 
                autoFocus
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => !searchTerm && setShowInput(false)}
                className="bg-white/40 dark:bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-sm text-primary focus:outline-none placeholder-slate-500 dark:placeholder-white/50"
                placeholder="City name..."
              />
            </form>
          ) : (
            <span className="text-xl font-medium tracking-wide cursor-pointer text-primary" onClick={() => setShowInput(true)}>{data.location}</span>
          )}
        </div>
        <button onClick={() => setShowInput(!showInput)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <Search size={20} className="text-primary" />
        </button>
      </div>

      {/* Main Info */}
      <div className="flex flex-col items-center justify-center flex-grow space-y-4 z-10">
        <div className="drop-shadow-2xl">
          {getWeatherIcon(data.condition)}
        </div>
        <div className="text-center">
          <h1 className="text-8xl font-thin text-primary tracking-tighter drop-shadow-lg">
            {Math.round(data.currentTemp)}°
          </h1>
          <p className="text-2xl font-light text-secondary mt-2">{data.condition}</p>
          <div className="flex items-center justify-center space-x-4 mt-2 text-secondary">
            <span>H: {Math.round(data.high)}°</span>
            <span>L: {Math.round(data.low)}°</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mt-12 z-10 w-full max-w-md mx-auto">
        <div className="card-glass p-4 rounded-3xl flex flex-col items-center">
          <Wind className="text-secondary mb-2" size={24} />
          <span className="text-primary font-bold">{data.windSpeed} km/h</span>
          <span className="text-xs text-secondary">Wind</span>
        </div>
        <div className="card-glass p-4 rounded-3xl flex flex-col items-center">
          <Droplets className="text-secondary mb-2" size={24} />
          <span className="text-primary font-bold">{data.humidity}%</span>
          <span className="text-xs text-secondary">Humidity</span>
        </div>
        <div className="card-glass p-4 rounded-3xl flex flex-col items-center">
          <ThermometerSun className="text-secondary mb-2" size={24} />
          <span className="text-primary font-bold">{data.feelsLike}°</span>
          <span className="text-xs text-secondary">Feels Like</span>
        </div>
         <div className="card-glass p-4 rounded-3xl flex flex-col items-center">
          <AlertCircle className="text-secondary mb-2" size={24} />
          <span className="text-primary font-bold">{data.aqi}</span>
          <span className="text-xs text-secondary">AQI</span>
        </div>
      </div>

      {/* AI Insight Card */}
      <div className="mt-6 w-full max-w-md mx-auto z-10 mb-6">
         <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/30 dark:to-purple-500/30 backdrop-blur-md rounded-3xl p-5 border border-indigo-200/30 dark:border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-400/50 dark:via-white/50 to-transparent opacity-30 group-hover:animate-[drift_2s_linear_infinite]"></div>
            <div className="flex justify-between items-start">
               <h3 className="text-sm font-semibold text-indigo-600 dark:text-purple-200 mb-2 uppercase tracking-wider">WeatherPulse AI</h3>
               <button onClick={onRefreshAi} disabled={isAiLoading} className="text-xs text-primary bg-white/30 dark:bg-white/10 hover:bg-white/50 px-2 py-1 rounded transition-colors">
                 {isAiLoading ? 'Thinking...' : 'Refresh'}
               </button>
            </div>
            <p className="text-primary text-sm leading-relaxed">
              {aiInsight || "Tap refresh to get AI-powered weather advice for your outfit and activities."}
            </p>
         </div>
      </div>
    </div>
  );
};

export default CurrentWeather;