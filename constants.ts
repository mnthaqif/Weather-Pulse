import { WeatherType, WeatherData, TimeOfDay, HourlyData, DailyData } from './types';

// Helper to generate mock data
export const generateMockWeather = (location: string): WeatherData => {
  // Randomize weather slightly based on location name length for "determinism"
  const seed = location.length;
  const conditions = Object.values(WeatherType);
  const currentCondition = conditions[seed % conditions.length];
  
  const hourly: HourlyData[] = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    temp: 20 + Math.sin(i / 3) * 5,
    icon: conditions[(seed + i) % conditions.length],
    precipChance: Math.floor(Math.random() * 30),
  }));

  const daily: DailyData[] = Array.from({ length: 7 }, (_, i) => {
     const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
     const today = new Date().getDay();
     return {
       day: days[(today + i) % 7],
       minTemp: 15 + Math.random() * 5,
       maxTemp: 25 + Math.random() * 5,
       icon: conditions[(seed + i) % conditions.length],
       precipChance: Math.floor(Math.random() * 60)
     }
  });

  return {
    location,
    currentTemp: 22,
    condition: currentCondition,
    high: 26,
    low: 18,
    feelsLike: 24,
    humidity: 65,
    windSpeed: 12,
    uvIndex: 4,
    sunrise: '06:30 AM',
    sunset: '07:45 PM',
    hourly,
    daily,
    description: `Expect ${currentCondition.toLowerCase()} conditions throughout the day.`,
    aqi: 35
  };
};

export const MOCK_LOCATIONS = [
  "San Francisco, CA",
  "New York, NY",
  "London, UK",
  "Tokyo, JP",
  "Sydney, AU"
];
