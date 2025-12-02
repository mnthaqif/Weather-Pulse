import React, { useState, useEffect } from 'react';
import WeatherBackground from './components/WeatherBackground';
import Navigation, { NavTab } from './components/Navigation';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import Favorites from './components/Favorites';
import Settings from './components/Settings';
import { generateMockWeather } from './constants';
import { WeatherData, TimeOfDay } from './types';
import { getAIWeatherInsight } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [weatherData, setWeatherData] = useState<WeatherData>(generateMockWeather("San Francisco, CA"));
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(TimeOfDay.Day);
  
  // Theme State
  const [darkMode, setDarkMode] = useState(true);

  // AI State
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    // Determine Time of Day based on hour
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setTimeOfDay(TimeOfDay.Morning);
    else if (hour >= 12 && hour < 17) setTimeOfDay(TimeOfDay.Day);
    else if (hour >= 17 && hour < 20) setTimeOfDay(TimeOfDay.Evening);
    else setTimeOfDay(TimeOfDay.Night);

    // Initial AI Insight
    refreshAiInsight(weatherData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshAiInsight = async (data: WeatherData) => {
    setIsAiLoading(true);
    const insight = await getAIWeatherInsight(data);
    setAiInsight(insight);
    setIsAiLoading(false);
  };

  const handleSearch = (city: string) => {
    const newData = generateMockWeather(city);
    setWeatherData(newData);
    // Reset AI insight when location changes
    setAiInsight(null);
    refreshAiInsight(newData);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <CurrentWeather 
            data={weatherData} 
            onSearch={handleSearch} 
            isAiLoading={isAiLoading}
            aiInsight={aiInsight}
            onRefreshAi={() => refreshAiInsight(weatherData)}
          />
        );
      case 'hourly':
        return <HourlyForecast data={weatherData.hourly} />;
      case 'daily':
        return <DailyForecast data={weatherData.daily} />;
      case 'favorites':
        return <Favorites onSelect={(loc) => {
             handleSearch(loc);
             setActiveTab('home');
        }} />;
      case 'settings':
        return <Settings isDarkMode={darkMode} onToggleTheme={() => setDarkMode(!darkMode)} />;
      default:
        return null;
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="relative w-full h-screen overflow-hidden font-sans select-none bg-slate-100 dark:bg-slate-950 transition-colors duration-500">
        <WeatherBackground condition={weatherData.condition} timeOfDay={timeOfDay} />
        
        {/* Main Content Area */}
        <main className="absolute inset-0 z-10 flex flex-col">
          <div className="flex-grow relative">
             {renderContent()}
          </div>
        </main>

        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default App;