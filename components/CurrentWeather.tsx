
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Wind, Droplets, Sun, CloudRain, CloudSnow, CloudLightning, Cloud, ThermometerSun, AlertCircle, Loader2, X } from 'lucide-react';
import { WeatherData, WeatherType } from '../types';
import { searchLocations } from '../services/locationService';

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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm.length >= 2 && showInput) {
        setIsLoadingSuggestions(true);
        setShowSuggestions(true);
        try {
          const results = await searchLocations(searchTerm);
          setSuggestions(results);
        } catch (error) {
          console.error("Search failed", error);
        } finally {
          setIsLoadingSuggestions(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, showInput]);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
    
    // Click outside listener
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowInput(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showInput]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      resetSearch();
    }
  };

  const handleSuggestionClick = (city: string) => {
    onSearch(city);
    resetSearch();
  };

  const resetSearch = () => {
    setSearchTerm('');
    setShowInput(false);
    setShowSuggestions(false);
    setSuggestions([]);
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
    <div className="flex flex-col h-full pt-4 pb-24 px-6 overflow-y-auto no-scrollbar relative">
      {/* Header / Search */}
      <div className="flex justify-between items-center mb-8 z-20 h-10 relative" ref={searchContainerRef}>
        <div className={`flex items-center space-x-2 text-primary transition-all duration-300 ${showInput ? 'w-full' : 'w-auto'}`}>
          <MapPin size={20} className={`text-primary flex-shrink-0 transition-opacity duration-300 ${showInput ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`} />
          
          {showInput ? (
            <div className="relative w-full">
              <form onSubmit={handleSearchSubmit} className="relative w-full flex items-center">
                <Search size={18} className="absolute left-3 text-slate-500 dark:text-slate-400" />
                <input 
                  ref={inputRef}
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/60 dark:bg-black/30 backdrop-blur-md rounded-2xl pl-10 pr-10 py-2.5 text-base text-primary focus:outline-none focus:ring-2 focus:ring-blue-400/50 shadow-lg border border-white/20 dark:border-white/10 placeholder-slate-500 dark:placeholder-slate-400"
                  placeholder="Search city..."
                />
                {isLoadingSuggestions ? (
                  <Loader2 size={18} className="absolute right-3 text-blue-500 animate-spin" />
                ) : searchTerm ? (
                  <button 
                    type="button" 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                ) : null}
              </form>

              {/* Autocomplete Dropdown */}
              {showSuggestions && (suggestions.length > 0 || searchTerm.length >= 2) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-white/20 dark:border-white/5 overflow-hidden max-h-64 overflow-y-auto no-scrollbar animate-[fall_0.2s_ease-out]">
                  {suggestions.length > 0 ? (
                    suggestions.map((city, idx) => (
                      <button
                        key={idx}
                        // Use onMouseDown to prevent input blur from firing before click
                        onMouseDown={() => handleSuggestionClick(city)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-white/10 text-primary text-sm flex items-center space-x-3 transition-colors border-b border-slate-100 dark:border-white/5 last:border-none group"
                      >
                        <MapPin size={14} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                        <span>{city}</span>
                      </button>
                    ))
                  ) : (
                    !isLoadingSuggestions && (
                      <div className="px-4 py-3 text-sm text-secondary text-center">
                        No locations found
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ) : (
            <span 
              className="text-xl font-medium tracking-wide cursor-pointer text-primary hover:opacity-80 transition-opacity truncate max-w-[200px]" 
              onClick={() => setShowInput(true)}
            >
              {data.location}
            </span>
          )}
        </div>
        
        {!showInput && (
          <button onClick={() => setShowInput(true)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Search size={20} className="text-primary" />
          </button>
        )}
      </div>

      {/* Main Info */}
      <div className={`flex flex-col items-center justify-center flex-grow space-y-4 z-10 transition-opacity duration-300 ${showInput ? 'opacity-50 blur-[2px]' : 'opacity-100'}`}>
        <div className="drop-shadow-2xl hover:scale-105 transition-transform duration-500">
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
      <div className={`grid grid-cols-2 gap-4 mt-12 z-10 w-full max-w-md mx-auto transition-all duration-500 ${showInput ? 'translate-y-10 opacity-50' : 'translate-y-0 opacity-100'}`}>
        <div className="card-glass p-4 rounded-3xl flex flex-col items-center hover:bg-white/50 dark:hover:bg-white/10 transition-colors">
          <Wind className="text-secondary mb-2" size={24} />
          <span className="text-primary font-bold">{data.windSpeed} km/h</span>
          <span className="text-xs text-secondary">Wind</span>
        </div>
        <div className="card-glass p-4 rounded-3xl flex flex-col items-center hover:bg-white/50 dark:hover:bg-white/10 transition-colors">
          <Droplets className="text-secondary mb-2" size={24} />
          <span className="text-primary font-bold">{data.humidity}%</span>
          <span className="text-xs text-secondary">Humidity</span>
        </div>
        <div className="card-glass p-4 rounded-3xl flex flex-col items-center hover:bg-white/50 dark:hover:bg-white/10 transition-colors">
          <ThermometerSun className="text-secondary mb-2" size={24} />
          <span className="text-primary font-bold">{data.feelsLike}°</span>
          <span className="text-xs text-secondary">Feels Like</span>
        </div>
         <div className="card-glass p-4 rounded-3xl flex flex-col items-center hover:bg-white/50 dark:hover:bg-white/10 transition-colors">
          <AlertCircle className="text-secondary mb-2" size={24} />
          <span className="text-primary font-bold">{data.aqi}</span>
          <span className="text-xs text-secondary">AQI</span>
        </div>
      </div>

      {/* AI Insight Card */}
      <div className={`mt-6 w-full max-w-md mx-auto z-10 mb-6 transition-all duration-500 ${showInput ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
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
