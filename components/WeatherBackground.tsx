import React, { useMemo } from 'react';
import { WeatherType, TimeOfDay } from '../types';

interface WeatherBackgroundProps {
  condition: WeatherType;
  timeOfDay: TimeOfDay;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ condition, timeOfDay }) => {

  const getGradient = () => {
    switch (condition) {
      case WeatherType.Sunny:
        return timeOfDay === TimeOfDay.Night 
          ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-[#0f172a] to-black' 
          : 'bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-sky-400 via-blue-200 to-indigo-50';
      case WeatherType.Cloudy:
        return timeOfDay === TimeOfDay.Night
          ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-black'
          : 'bg-gradient-to-br from-slate-300 via-gray-200 to-slate-100';
      case WeatherType.Rainy:
        return 'bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950';
      case WeatherType.Stormy:
        return 'bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-black';
      case WeatherType.Snowy:
        return timeOfDay === TimeOfDay.Night
          ? 'bg-gradient-to-b from-slate-800 via-slate-900 to-black'
          : 'bg-gradient-to-b from-blue-100 via-white to-blue-50';
      default:
        return 'bg-blue-500';
    }
  };

  // Enhanced Rain Drops with Parallax
  const RainDrops = useMemo(() => {
    const layers = [
      { count: 30, speed: 0.5, opacity: 0.6, width: '1px', height: '15vh' }, // Back
      { count: 30, speed: 0.7, opacity: 0.8, width: '2px', height: '20vh' }, // Mid
      { count: 20, speed: 0.9, opacity: 1, width: '2px', height: '25vh' }    // Front
    ];

    return layers.map((layer, layerIdx) => (
      <div key={`rain-layer-${layerIdx}`} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: layer.count }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20 + 20}vh`,
              width: layer.width,
              height: layer.height,
              opacity: layer.opacity,
              animation: `fall ${layer.speed + Math.random() * 0.2}s linear infinite`,
              animationDelay: `-${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    ));
  }, []);

  // Enhanced Snow Flakes with Parallax
  const SnowFlakes = useMemo(() => {
    const layers = [
      { count: 30, speed: 8, size: 2, opacity: 0.4 },
      { count: 25, speed: 6, size: 4, opacity: 0.7 },
      { count: 15, speed: 4, size: 6, opacity: 0.9 } 
    ];

    return layers.map((layer, layerIdx) => (
      <div key={`snow-layer-${layerIdx}`} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: layer.count }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${layer.size}px`,
              height: `${layer.size}px`,
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              animation: `fall ${layer.speed + Math.random() * 2}s linear infinite`,
              animationDelay: `-${Math.random() * 5}s`,
              opacity: layer.opacity
            }}
          />
        ))}
      </div>
    ));
  }, []);

  // Enhanced Clouds
  const Clouds = useMemo(() => {
    // Generate organic cloud shapes using multiple overlapping circles
    const cloudLayers = [
       { count: 3, duration: 60, opacity: 0.3, scale: 0.8, zIndex: 0 }, // Background
       { count: 4, duration: 40, opacity: 0.5, scale: 1.0, zIndex: 1 }, // Mid
       { count: 3, duration: 25, opacity: 0.7, scale: 1.2, zIndex: 2 }, // Foreground
    ];

    return cloudLayers.map((layer, layerIdx) => (
       <div key={`cloud-layer-${layerIdx}`} className="absolute inset-0 pointer-events-none" style={{ zIndex: layer.zIndex }}>
          {Array.from({ length: layer.count }).map((_, i) => (
             <div
               key={i}
               className="absolute rounded-full bg-white blur-3xl"
               style={{
                 width: `${300 * layer.scale + Math.random() * 100}px`,
                 height: `${150 * layer.scale + Math.random() * 50}px`,
                 left: `${Math.random() * 120 - 20}%`,
                 top: `${Math.random() * 50 - 10}%`,
                 opacity: layer.opacity,
                 animation: `drift ${layer.duration + Math.random() * 10}s ease-in-out infinite alternate`,
                 animationDelay: `-${Math.random() * 20}s`
               }}
             />
          ))}
       </div>
    ));
  }, []);

  // Stars for clear night
  const Stars = useMemo(() => {
     return Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
             width: Math.random() > 0.9 ? '3px' : '1px',
             height: Math.random() > 0.9 ? '3px' : '1px',
             top: `${Math.random() * 60}%`,
             left: `${Math.random() * 100}%`,
             opacity: Math.random() * 0.8 + 0.2,
             animationDuration: `${Math.random() * 3 + 2}s`
          }}
        />
     ));
  }, []);

  return (
    <div className={`fixed inset-0 z-0 transition-all duration-1000 ${getGradient()}`}>
      {/* Sun / Moon Orb */}
      {(condition === WeatherType.Sunny || condition === WeatherType.Cloudy) && (
         <div 
           className={`absolute rounded-full blur-2xl transition-all duration-1000
             ${timeOfDay === TimeOfDay.Night 
               ? 'w-24 h-24 bg-slate-200/20 top-16 right-10 animate-[pulse-glow_5s_ease-in-out_infinite]' 
               : 'w-40 h-40 bg-yellow-400/30 top-[-20px] right-[-20px] animate-[pulse-glow_8s_ease-in-out_infinite]'}`}
         ></div>
      )}
      
      {/* Stars if Night and Clear/Cloudy */}
      {timeOfDay === TimeOfDay.Night && (condition === WeatherType.Sunny || condition === WeatherType.Cloudy) && Stars}

      {/* Dynamic Elements */}
      {condition === WeatherType.Rainy && RainDrops}
      {condition === WeatherType.Stormy && RainDrops}
      {condition === WeatherType.Snowy && SnowFlakes}
      
      {/* Clouds Layered */}
      {(condition === WeatherType.Cloudy || condition === WeatherType.Rainy || condition === WeatherType.Stormy) && Clouds}
      
      {/* Sun Rays for Sunny Day (subtle) */}
      {condition === WeatherType.Sunny && timeOfDay !== TimeOfDay.Night && (
         <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-yellow-200/20 via-transparent to-transparent pointer-events-none"></div>
      )}

      {/* Lightning for Storm */}
      {condition === WeatherType.Stormy && (
        <div className="absolute inset-0 bg-indigo-200 pointer-events-none mix-blend-overlay animate-[flash_6s_infinite] z-20"></div>
      )}
    </div>
  );
};

export default WeatherBackground;