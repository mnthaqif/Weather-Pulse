export enum WeatherType {
  Sunny = 'Sunny',
  Cloudy = 'Cloudy',
  Rainy = 'Rainy',
  Snowy = 'Snowy',
  Stormy = 'Stormy'
}

export enum TimeOfDay {
  Morning = 'Morning',
  Day = 'Day',
  Evening = 'Evening',
  Night = 'Night'
}

export interface HourlyData {
  time: string;
  temp: number;
  icon: WeatherType;
  precipChance: number;
}

export interface DailyData {
  day: string;
  minTemp: number;
  maxTemp: number;
  icon: WeatherType;
  precipChance: number;
}

export interface WeatherData {
  location: string;
  currentTemp: number;
  condition: WeatherType;
  high: number;
  low: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  hourly: HourlyData[];
  daily: DailyData[];
  description: string;
  aqi: number;
}

export type TempUnit = 'C' | 'F';
